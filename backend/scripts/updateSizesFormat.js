import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
import Product from "../models/product.model.js";

const updateSizesFormat = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");

    // Find all products
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);

    if (!products || products.length === 0) {
      console.log("No products found.");
      return;
    }

    let updatedCount = 0;
    let errorCount = 0;

    // Update each product
    for (const product of products) {
      try {
        let sizes = product.sizes;

        // Handle different possible current formats
        if (typeof sizes === "string") {
          sizes = JSON.parse(sizes);
        }

        if (
          Array.isArray(sizes) &&
          sizes.length > 0 &&
          typeof sizes[0] === "string"
        ) {
          try {
            // Try parsing if sizes[0] is a stringified array
            const parsed = JSON.parse(sizes[0]);
            if (Array.isArray(parsed)) {
              sizes = parsed;
            }
          } catch (e) {
            // Leave it if it's not a parsable stringified array
          }
        }

        // Flatten nested arrays
        if (Array.isArray(sizes) && Array.isArray(sizes[0])) {
          sizes = sizes.flat();
        }

        // Ensure all items are strings
        sizes = sizes.map((size) => String(size));

        // Update the document
        await Product.findByIdAndUpdate(product._id, { sizes });
        updatedCount++;
        console.log(
          `✅ Successfully updated product: ${
            product._id
          } with sizes: ${JSON.stringify(sizes)}`
        );
      } catch (error) {
        errorCount++;
        console.error(`Error updating product ${product._id}:`, error);
      }
    }

    console.log(`
    Update Complete:
    - Total products processed: ${products.length}
    - Successfully updated: ${updatedCount}
    - Errors encountered: ${errorCount}
    `);
  } catch (error) {
    console.error("Script failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

updateSizesFormat();
