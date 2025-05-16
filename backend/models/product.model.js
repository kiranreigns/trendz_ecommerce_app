import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    required: true,
  },

  image: {
    type: Array,
    required: true,
  },

  newPrice: {
    type: Number,
    required: true,
  },

  oldPrice: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  sizes: {
    type: [String], // This explicitly defines an array of strings
    required: [true, "Please select at least one size"],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "At least one size must be selected",
    },
  },

  bestSeller: {
    type: Boolean,
    default: false,
  },

  newCollection: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    validate: {
      validator: function (v) {
        return !isNaN(v) && v >= 0 && v <= 5;
      },
      message: (props) => `${props.value} is not a valid rating number!`,
    },
  },

  reviews: {
    type: Number,
    default: 0,
    min: 0,
    validate: {
      validator: function (v) {
        return !isNaN(v) && v >= 0;
      },
      message: (props) => `${props.value} is not a valid review count!`,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
