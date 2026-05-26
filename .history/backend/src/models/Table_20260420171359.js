// src/models/Table.js
import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Bàn 1, Bàn 2

  qrCode: String,

  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available",
  },
});

export default mongoose.model("Table", tableSchema);