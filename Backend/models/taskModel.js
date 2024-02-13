import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    listitem: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    completed: { type: Boolean, required: false, default: false },

    list: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
