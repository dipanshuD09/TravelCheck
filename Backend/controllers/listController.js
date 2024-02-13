import mongoose from "mongoose";
import List from "../models/listModel.js";
import Task from "../models/taskModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({
    $or: [
      {
        users: {
          $all: [req.user.email],
        },
      },
      { creator: req.user._id },
    ],
  });
  res.status(200).json(lists);
});

export const removeList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  if (list) {
    if (list.creator.toString() !== req.user._id.toString()) {
      if (list.users.indexOf(req.user.email)) {
        list.users.pull(req.user.email);
      }
    } else {
      await list.deleteOne({ _id: list._id });
      res.json({ message: "List deleted" });
    }
  } else {
    res.status(404);
    throw new Error("List not found");
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ list: req.list._id });
  res.status(200).json(tasks);
});

export const createList = asyncHandler(async (req, res) => {
  const { listTitle, userlist } = req.body;

  const creator = req.user._id;
  const list = new List({
    listTitle: listTitle,
    creator: creator,
    users: userlist,
  });

  const r = await list.save();
  res.status(201).json(r);
});

export const addTask = (io, T) => {
  const newTask = new Task(T);
  const r = newTask.save();
  if (r) {
    io.emit("TaskAdded", r);
  }
};

export const updateTask = (io, T) => {
  let result;
  Task.findOneAndUpdate({ _id: T._id }, T, { new: true }, (err, task) => {
    if (err) {
      result = { success: false, message: "Some Error", error: err };
      console.log(result);
    } else {
      result = { success: true, message: "Todo Updated Successfully", task };
      io.emit("TaskUpdated", result);
    }
  });
};

export const deleteTask = (io, T) => {
  let result;
  Todo.findByIdAndRemove(T._id, (err, task) => {
    if (err) {
      result = { success: false, message: "Some Error", error: err };
      console.log(result);
    } else {
      result = { success: true, message: "Todo deleted successfully", task };
      io.emit("TaskDeleted", result);
    }
  });
};
