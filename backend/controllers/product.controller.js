import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subCategory,
      newPrice,
      oldPrice,
      description,
      sizes,
      bestSeller,
      newCollection,
      ratings,
      reviews,
    } = req.body;

    // Parse the sizes string back into an array
    const parsedSizes = JSON.parse(sizes);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    const imageUrls = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
          folder: "Trendz",
        });
        return {
          // public_id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    // Validate numeric fields
    const productData = {
      name,
      category,
      subCategory,
      image: imageUrls,
      newPrice: Number(newPrice),
      oldPrice: Number(oldPrice),
      description,
      sizes: parsedSizes, // Use the parsed sizes array
      bestSeller: bestSeller === "true" ? true : false,
      newCollection: newCollection === "true" ? true : false,
      rating: Number(ratings) || 0,
      reviews: Number(reviews) || 0,
    };

    // Validate required fields
    if (
      !name ||
      !category ||
      !subCategory ||
      !newPrice ||
      !oldPrice ||
      !description ||
      !parsedSizes.length // Validate sizes array
    ) {
      const error = new Error("Please provide all required fields");
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.create(productData);

    res.status(200).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (!products || products.length === 0) {
      const error = new Error("No products found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      products: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      const error = new Error("Product not deleted");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: `product id: ${req.params.id}`,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
