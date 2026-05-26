import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ===== REVENUE BY DAY =====
export const getRevenueByDayService = async () => {
  return await Order.aggregate([
    {
      $match: {
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalRevenue: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);
};

// ===== REVENUE BY MONTH =====
export const getRevenueByMonthService = async () => {
  return await Order.aggregate([
    {
      $match: {
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalRevenue: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};

// ===== BEST SELLER PRODUCTS =====
export const getBestSellerService = async () => {
  return await Product.find()
    .sort({ soldCount: -1 })
    .limit(10)
    .select("name soldCount price image");
};

// ===== DASHBOARD SUMMARY =====
export const getDashboardSummaryService = async () => {
  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 },
      },
    },
  ]);

  const totalCustomers = await Order.distinct("customer");

  return {
    totalRevenue: totalRevenue[0]?.revenue || 0,
    totalOrders: totalRevenue[0]?.orders || 0,
    totalCustomers: totalCustomers.length,
  };
};