// src/app.js
import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API LITA running...");
});

// middleware xử lý lỗi (LUÔN đặt cuối)
app.use(notFound);
app.use(errorHandler);

export default app;