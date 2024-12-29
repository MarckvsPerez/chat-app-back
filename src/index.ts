import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import socketIO from "socket.io";
import http from "http";

dotenv.config();

const app = express();

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
