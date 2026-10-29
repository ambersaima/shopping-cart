export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full bg-slate-100 object-contain dark:bg-slate-800"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800">
          No image added
        </div>
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold">{product.name}</h3>

        <p className="mt-2 min-h-12 text-sm text-slate-600 dark:text-slate-300">
          {product.description}
        </p>

        <p className="my-4 text-2xl font-extrabold text-violet-600">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        <a
          href={product.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          View Product ↗
        </a>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex-1 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white hover:bg-amber-600"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}