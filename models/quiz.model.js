// models/quiz.model.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    questions: [
      {
        questionText: { type: String, required: true },

        options: {
          type: [String],
          required: true,
        },

        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
