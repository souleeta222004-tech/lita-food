// backend/src/controllers/product.controller.js
import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  toggleProductService,
} from "../services/product.service.js";

// ===== PUBLIC =====

// GET MENU
export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService(req.query);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DETAIL
export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== ADMIN =====

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// TOGGLE AVAILABLE
export const toggleProduct = async (req, res) => {
  try {
    const product = await toggleProductService(req.params.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};