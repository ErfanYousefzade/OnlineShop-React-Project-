import { motion } from "framer-motion";

export default function Endweb() {
  const features = [
    {
      title: "Fast Delivery",
      desc: "ارسال سریع در کمترین زمان",
      icon: "🚚",
    },
    {
      title: "Secure Payment",
      desc: "پرداخت امن و مطمئن",
      icon: "🔒",
    },
    {
      title: "Premium Quality",
      desc: "کیفیت تضمین شده محصولات",
      icon: "💎",
    },
    {
      title: "24/7 Support",
      desc: "پشتیبانی همیشه در دسترس",
      icon: "📞",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      {/* IMAGE (فقط اولی مونده) */}
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/bale.jpg"
          alt="Collection"
          className="
            w-full
            lg:w-[85%]
            mx-auto
            rounded-3xl
            shadow-2xl
            object-cover
            hover:scale-[1.02]
            transition-all
            duration-500
            mb-12
          "
        />
      </motion.div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="
              bg-white
              border border-slate-200
              rounded-2xl
              p-6
              text-center
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <div className="text-3xl mb-3">{item.icon}</div>

            <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>

            <p className="text-sm text-slate-500 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
