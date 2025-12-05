import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["free", "paid", "pending"],
      default: "free",
    },
    paymentDetails: {
      transactionId: { type: String },
      method: { type: String },
      amount: { type: Number },
      status: { type: String },
      paidAt: { type: Date },
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], // add this
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
