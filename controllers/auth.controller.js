import User from "../models/user.model.js";
import { registerValidation } from "../validators/auth.validation.js";
import bcrypt from "bcrypt";

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

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
