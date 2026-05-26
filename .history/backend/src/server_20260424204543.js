import http from "http";
import { Server } from "socket.io";
import express from "express"; // 👈 THÊM DÒNG NÀY

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import path from "path";

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: ENV.CLIENT_URL || "http://localhost:5173",
        credentials: true,
      },
    });

    app.set("io", io);

    io.on("connection", (socket) => {
      console.log("🟢 Client connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId);
      });

      socket.on("joinOrder", (orderId) => {
        socket.join(orderId);
      });

      socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
      });
    });

    // 👇 PHẢI đặt ở đây (trước listen)
    app.use(express.static("dist"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });

    httpServer.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });

    process.on("SIGINT", () => {
      console.log("🛑 Shutting down server...");
      httpServer.close(() => {
        console.log("❌ Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ Server start failed:", error);
    process.exit(1);
  }
};

startServer();