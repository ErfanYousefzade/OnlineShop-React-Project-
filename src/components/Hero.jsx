import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
      <div
        className="
          grid
          lg:grid-cols-2
          items-center
          gap-10
        "
      >
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="
              inline-block
              px-4 py-2
              rounded-full
              bg-indigo-100
              text-indigo-700
              text-sm
              font-medium
              mb-4
            "
          >
            ✨ New Collection 2026
          </span>

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              leading-tight
              text-slate-900
            "
          >
            Discover Your
            <span className="text-indigo-600"> Perfect Style</span>
          </h1>

          <p
            className="
              text-slate-600
              text-base
              mt-5
              max-w-xl
            "
          >
            Explore premium fashion collections designed for comfort, confidence
            and everyday elegance.
          </p>

          <div className="flex gap-4 mt-7 flex-wrap">
            <Link to="/Products">
              <button
                className="
                  bg-indigo-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-indigo-700
                  transition
                "
              >
                Shop Now
              </button>
            </Link>

            <Link to="/Products">
              <button
                className="
                  border
                  border-slate-300
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-50
                  transition
                "
              >
                View Collection
              </button>
            </Link>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <img
            src="public/collection.jpg"
            alt="Fashion Collection"
            className="
              w-full
              rounded-3xl
              shadow-xl
              object-cover
              hover:scale-[1.02]
              transition
              duration-500
            "
          />
        </motion.div>
      </div>
    </section>
  );
}
