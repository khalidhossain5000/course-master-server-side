import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
