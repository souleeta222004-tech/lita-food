// src/server.js
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const startServer = async () => {
  try {
    // 🔌 Connect DB
    await connectDB();
    console.log("✅ Database connected");

    // Start server
    const server = app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("🛑 Shutting down server...");
      server.close(() => {
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