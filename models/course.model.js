import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    instructor: { type: String, required: true },
    category: { type: String, required: true },
    batchName: { type: String, required: true },
    thumbnail: { type: String, required: true },
    lessons: {
      type: [lessonSchema],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "A course must have at least one lesson",
      },
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
