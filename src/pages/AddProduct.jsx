import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/products";

const emptyForm = {
  name: "",
  link: "",
  description: "",
  price: "",
  image: "",
};

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const isEditing = Boolean(product);

  const [form, setForm] = useState({ ...emptyForm });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        link: product.link || "",
        description: product.description || "",
        price: String(product.price ?? ""),
        image: product.image || "",
      });
    } else {
      setForm({ ...emptyForm });
    }
  }, [product]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (
      !form.name.trim() ||
      !form.link.trim() ||
      !form.description.trim() ||
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      setMessage("Please enter valid details in all required fields.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        isEditing ? `${API}/${product.id}` : API,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            link: form.link.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            image: form.image.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Could not ${isEditing ? "update" : "add"} product.`
        );
      }

      sessionStorage.setItem(
        "productSuccessMessage",
        data.message ||
          (isEditing
            ? "Product updated successfully!"
            : "Product added successfully!")
      );

      navigate("/products", { replace: true });
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold">
          {isEditing ? "Update Product" : "Add New Product"}
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {isEditing
            ? "Edit your product information."
            : "Enter the details of your new product."}
        </p>

        {message && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-300 bg-red-100 px-4 py-3 font-semibold text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-semibold">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div>
            <label htmlFor="link" className="mb-2 block font-semibold">
              Product Link
            </label>
            <input
              id="link"
              name="link"
              type="url"
              value={form.link}
              onChange={handleChange}
              required
              placeholder="https://example.com/product"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div>
            <label htmlFor="image" className="mb-2 block font-semibold">
              Product Image URL (Optional)
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div>
            <label htmlFor="price" className="mb-2 block font-semibold">
              Price (₹)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your product"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "+ Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}