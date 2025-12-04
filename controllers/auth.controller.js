import User from "../models/user.model.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/auth.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//regiser controller
export const registerUser = async (req, res) => {
  try {
    //validate user body here
    const { error, value } = registerValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const { name, email, password } = value;

    //  Check if user already exists

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    //if not exist then create new user here

    const hashedPassword = await bcrypt.hash(password, 10);

    //save user in the db
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // generate token after registration
    // generate JWT
    const accessToken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // short-lived
    );

    const refreshToken = jwt.sign(
      { userId: newUser._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" } // long-lived
    );

    // refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // dev mode
      sameSite: "lax",
      path: "/",
    });

    // response
    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//login controller

export const loginUser = async (req, res) => {
  try {
    // validate request body
    const { error, value } = loginValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }
    const { email, password } = value;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid email or password" });

    // generate JWT
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );
console.log(refreshToken,accessToken,'this is acres and ref token')
    // refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: newUser.avatar 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//refresh token controller api here

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken; //cookie taking refresh token here
    if (!token)
      return res.status(401).json({ message: "No refresh token is founded" });
    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      //  access token generate
      const accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      // response
      res.json({
        user: { id: user._id, name: user.name, email: user.email ,profileImage:user.avatar,role:user.role},
        accessToken,
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//LOG OUT API STARTS HERE 

export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,  // dev mode
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
