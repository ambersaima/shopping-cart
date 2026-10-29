
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="w-full">
      <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl dark:bg-violet-700/20" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-700/20" />

        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-24">
          <div>
            <span className="inline-flex rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm font-bold text-violet-700 dark:border-violet-800 dark:bg-slate-900/70 dark:text-violet-300">
              YOUR PERSONAL PRODUCT COLLECTION
            </span>

            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
              Everything you need,
              <span className="block text-violet-700 dark:text-violet-300">
                in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Add your favourite products, save their details, and keep
              your collection organised in one simple application.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-xl bg-violet-600 px-6 py-4 font-bold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Explore Products →
              </Link>

              <Link
                to="/products"
                className="rounded-xl border border-slate-300 bg-white/70 px-6 py-4 font-bold text-slate-800 transition hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                Add a Product +
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[2rem] border border-white/80 bg-white/60 p-7 shadow-2xl shadow-violet-900/10 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    YOUR COLLECTION
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                    Product Manager
                  </h2>
                </div>
                <span className="rounded-2xl bg-violet-100 p-4 text-3xl dark:bg-violet-950">
                  🛍️
                </span>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  ["🎧", "Electronics", "Keep product links together"],
                  ["⌚", "Accessories", "Save prices and descriptions"],
                  ["📦", "Your collection", "Add new products anytime"],
                ].map(([icon, title, description]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/70"
                  >
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 py-14 dark:bg-slate-950 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1600px] gap-6 sm:grid-cols-3">
          {[
            ["01", "Add Products", "Enter product details in a simple form."],
            ["02", "Save Your Data", "Store products in your JSON file."],
            ["03", "Manage Easily", "View saved products without reloading the page."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <span className="text-sm font-extrabold tracking-widest text-violet-600 dark:text-violet-300">
                {number}
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
