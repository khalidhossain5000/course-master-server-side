// import mongoose from "mongoose";

// const lessonSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   videoUrl: { type: String, required: true },
// });

// const courseSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     isFree: { type: Boolean, default: false },
//     price: { type: Number, default: 0 },
//     instructor: { type: String, required: true },
//     category: { type: String, required: true },
//     batchName: { type: String, required: true },
//     thumbnail: { type: String, required: true },
//     lessons: {
//       type: [lessonSchema],
//       validate: {
//         validator: function (v) {
//           return v.length > 0;
//         },
//         message: "A course must have at least one lesson",
//       },
//     },
//      enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model("Course", courseSchema);

// export default Course;








//test code



import mongoose from "mongoose";

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
});

// Main Course Schema
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
    quizzes: [quizSchema],           // <-- Add quizzes here
    assignments: [assignmentSchema], // <-- Add assignments here
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
