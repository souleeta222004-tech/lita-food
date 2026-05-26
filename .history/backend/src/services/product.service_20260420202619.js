import Product from "../models/Product.js";

// ===== PUBLIC (MENU / QR) =====

// GET MENU (có filter + search)
export const getProductsService = async (query) => {
  const { keyword, category } = query;

  let filter = { isAvailable: true };

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return products;
};

// GET PRODUCT DETAIL
export const getProductByIdService = async (id) => {
  const product = await Product.findById(id).populate("category", "name");
  if (!product) throw new Error("Product not found");

  return product;
};

// ===== ADMIN =====

// CREATE
export const createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

// UPDATE
export const updateProductService = async (id, data) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  Object.assign(product, data);
  await product.save();

  return product;
};

// DELETE
export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");

  return { message: "Product deleted" };
};

// TOGGLE AVAILABLE (ẩn/hiện món)
export const toggleProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  product.isAvailable = !product.isAvailable;
  await product.save();

  return product;
};