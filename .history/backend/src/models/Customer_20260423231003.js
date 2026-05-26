// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Khách" },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);