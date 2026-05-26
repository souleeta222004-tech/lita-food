import http from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

// fix __dirname cho ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
  try {
    // ================= DB =================
    await connectDB();
    console.log("✅ Database connected");

    // ================= HTTP SERVER =================
    const httpServer = http.createServer(app);

    // ================= SOCKET =================
    const io = new Server(httpServer, {
      cors: {
        origin: ENV.CLIENT_URL || "*",
        credentials: true,
      },
    });

    app.set("io", io);

    io.on("connection", (socket) => {
      console.log("🟢 Client connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId);
        console.log("👤 User joined:", userId);
      });

      socket.on("joinOrder", (orderId) => {
        socket.join(orderId);
        console.log("📦 Joined order:", orderId);
      });

      socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
      });
    });

    // ================= SERVE FRONTEND =================
    const distPath = path.join(__dirname, "../../frontend/dist");

    app.use(express.static(distPath));
    console.log("DIST PATH:", distPath);

    // ⚠️ fallback cho React Router (KHÔNG dùng app.get("*"))
    app.use((req, res, next) => {
  // ❌ bỏ qua API
  if (req.path.startsWith("/api")) return next();

  // ❌ bỏ qua file static (.js, .css, .png...)
  if (req.path.includes(".")) return next();

  // ✅ còn lại trả React
  res.sendFile(path.join(distPath, "index.html"));
});

    // ================= START SERVER =================
    httpServer.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });

    // ================= SHUTDOWN =================
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