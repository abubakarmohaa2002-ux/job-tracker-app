import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
