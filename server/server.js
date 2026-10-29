import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "product.json");

app.use(cors());
app.use(express.json());

// Read products from JSON file
function readProducts() {
  const data = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(data || "[]");

  if (!Array.isArray(products)) {
    throw new Error("product.json must contain an array.");
  }

  return products;
}

// Save products to JSON file
function saveProducts(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

// Validate product details
function validateProduct(product) {
  return (
    product &&
    typeof product.name === "string" &&
    product.name.trim() !== "" &&
    typeof product.link === "string" &&
    product.link.trim() !== "" &&
    typeof product.description === "string" &&
    product.description.trim() !== "" &&
    product.price !== "" &&
    product.price !== null &&
    Number.isFinite(Number(product.price)) &&
    Number(product.price) >= 0 &&
    (product.image === undefined ||
      typeof product.image === "string")
  );
}

// GET: Fetch all products
app.get("/api/products", (req, res) => {
  try {
    res.json(readProducts());
  } catch (error) {
    console.error("Read products error:", error);
    res.status(500).json({ message: "Could not load products." });
  }
});

// POST: Add product
app.post("/api/products", (req, res) => {
  if (!validateProduct(req.body)) {
    return res.status(400).json({
      message: "Please enter valid product details.",
    });
  }

  try {
    const products = readProducts();

    const newProduct = {
      id: Date.now().toString(),
      name: req.body.name.trim(),
      link: req.body.link.trim(),
      description: req.body.description.trim(),
      price: Number(req.body.price),
      image: req.body.image?.trim() || "",
    };

    products.push(newProduct);
    saveProducts(products);

    res.status(201).json({
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Could not save product." });
  }
});

// PUT: Update product
app.put("/api/products/:id", (req, res) => {
  if (!validateProduct(req.body)) {
    return res.status(400).json({
      message: "Please enter valid product details.",
    });
  }

  try {
    const products = readProducts();

    const index = products.findIndex(
      (item) => String(item.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not found." });
    }

    const updatedProduct = {
      id: products[index].id,
      name: req.body.name.trim(),
      link: req.body.link.trim(),
      description: req.body.description.trim(),
      price: Number(req.body.price),
      image: req.body.image?.trim() || "",
    };

    products[index] = updatedProduct;
    saveProducts(products);

    res.json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Could not update product." });
  }
});

// DELETE: Remove product
app.delete("/api/products/:id", (req, res) => {
  try {
    const products = readProducts();

    const updatedProducts = products.filter(
      (item) => String(item.id) !== String(req.params.id)
    );

    if (updatedProducts.length === products.length) {
      return res.status(404).json({ message: "Product not found." });
    }

    saveProducts(updatedProducts);

    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Could not delete product." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});