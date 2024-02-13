import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { createList, deleteTask, updateTask, addTask } from "./controllers/listController.js";
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';

connectDB();
import http from "http";

import { Server } from "socket.io";

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRoutes);
app.use('/api/list', listRoutes);

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/", (req, res) => {
  res.send("API is running...");
});

io.on("connection", (socket) => {
  console.log("Connected to Socket!!" + socket.id);

  socket.on("add-task", (Task) => {
    console.log("socketData: " + JSON.stringify(Task));
    listController.addTask(io, Task);
  });

  socket.on("update-Task", (Task) => {
    console.log("socketData: " + JSON.stringify(Task));
    listController.updateTask(io, Task);
  });

  socket.on("deleteTask", (Task) => {
    console.log("socketData: " + JSON.stringify(Task));
    listController.deleteTask(io, Task);
  });
});

