import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    listTitle: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    users: Array,
  },
  {
    timestamps: true,
  }
)

const List = mongoose.model("List", listSchema)

export default List
