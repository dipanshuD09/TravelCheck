import express from "express";
import {
  getLists,
  getTasks,
  createList,
  removeList,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/listController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, createList)
  .get(protect, getLists)
  .delete(protect, removeList);
router
  .route("/task")
  .get(protect, getTasks)
  .post(protect, addTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
