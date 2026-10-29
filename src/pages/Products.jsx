import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

const API = "http://localhost:5000/api/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const pendingMessage = sessionStorage.getItem("productSuccessMessage");

    if (pendingMessage) {
      setMessage(pendingMessage);
      setMessageType("success");
      sessionStorage.removeItem("productSuccessMessage");
    }

    async function loadProducts() {
      try {
        const response = await fetch(API);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load products.");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        setMessage(error.message || "Could not load products.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function handleEdit(product) {
    navigate("/add-product", { state: { product } });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setMessage("");

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete product.");
      }

      setProducts((previous) =>
        previous.filter((item) => String(item.id) !== String(id))
      );

      setMessage(data.message || "Product deleted successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Could not delete product.");
      setMessageType("error");
    }
  }

  const filteredProducts = products.filter((product) =>
    String(product.name || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Our Products</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Browse, search and manage your products.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/add-product")}
            className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            + Add Product
          </button>
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products by name..."
          aria-label="Search products by name"
          className="mt-8 w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-5 rounded-xl border px-4 py-3 font-semibold ${
              messageType === "error"
                ? "border-red-300 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                : "border-green-300 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-6 text-slate-500 dark:text-slate-400">
          {filteredProducts.length} product(s) found
        </p>

        <section className="mt-5">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="py-8 text-slate-500 dark:text-slate-400">
              {search.trim()
                ? `No products found for "${search}".`
                : "No products yet. Click Add Product to get started."}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}