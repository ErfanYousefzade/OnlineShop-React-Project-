import { motion } from "framer-motion";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      {/* Blur Background */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-[180px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-200 rounded-full blur-[180px] opacity-20 pointer-events-none" />

      {/* Hero */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="w-[85%] mx-auto pt-24"
      >
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-black via-gray-600 to-gray-400 bg-clip-text text-transparent">
          ساخته شده برای تیم‌هایی که
        </h1>

        <h1 className="text-5xl md:text-7xl font-black text-gray-300 mt-2">
          وقت برایشان طلاست
        </h1>

        <p className="text-gray-500 mt-8 max-w-2xl leading-8 text-lg">
          ما از یک مشکل واقعی شروع کردیم — ابزارهای پیچیده‌ای که بیشتر از اینکه
          کمک کنند، وقت می‌گرفتند. هدفمان ساختن محصولی بود که از روز اول با تیم
          شما کار کند؛ بدون پیکربندی دردسرساز و بدون یادگیری طولانی.
        </p>
      </motion.div>

      {/* About */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-[85%] mx-auto py-32"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8">
              فراتر از یک فروشگاه آنلاین
            </h2>

            <p className="text-gray-500 leading-9 text-lg">
              ما باور داریم خرید آنلاین باید سریع، شفاف و لذت‌بخش باشد. به همین
              دلیل بستری ساخته‌ایم که مشتریان بتوانند با اطمینان کامل محصولات
              مورد نیاز خود را پیدا کرده و در کوتاه‌ترین زمان ممکن تحویل بگیرند.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[32px] p-10 shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <h3 className="text-3xl font-bold mb-4">ماموریت ما</h3>

            <p className="text-gray-500 leading-8">
              ایجاد تجربه‌ای متفاوت از خرید آنلاین با تمرکز بر کیفیت، پشتیبانی
              واقعی و ارسال سریع.
            </p>

            <hr className="my-8" />

            <h3 className="text-3xl font-bold mb-4">چشم‌انداز ما</h3>

            <p className="text-gray-500 leading-8">
              تبدیل شدن به یکی از معتبرترین پلتفرم‌های خرید آنلاین و ارائه
              بهترین خدمات به میلیون‌ها مشتری.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-32"
      >
        {[
          { number: "12K", text: "تیم فعال" },
          { number: "98%", text: "رضایت مشتریان" },
          { number: "40+", text: "کشور" },
        ].map((item, index) => (
          <div
            key={index}
            className="group bg-white border rounded-[30px] p-10 text-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-500"
          >
            <h4 className="text-6xl font-black bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent">
              {item.number}
            </h4>

            <p className="text-gray-500 mt-4 text-lg">{item.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-[85%] mx-auto pb-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "ارسال سریع",
              desc: "تحویل سفارش در کمترین زمان",
            },
            {
              title: "کیفیت تضمینی",
              desc: "ارائه محصولات با کیفیت بالا",
            },
            {
              title: "پشتیبانی 24/7",
              desc: "پاسخگویی در تمام روزهای هفته",
            },
            {
              title: "پرداخت امن",
              desc: "خرید مطمئن و ایمن آنلاین",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[30px] p-10 shadow-xl border hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-all">
                {item.title}
              </h2>

              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quote */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-[85%] mx-auto pb-24"
      >
        <div className="bg-black text-white rounded-[40px] py-24 px-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.3)]">
          <h2 className="text-4xl md:text-5xl font-black leading-relaxed">
            «فروش فقط تحویل کالا نیست؛
            <br />
            ساختن اعتماد است.»
          </h2>

          <p className="text-gray-300 mt-8 text-lg">
            این جمله پایه و اساس تمام تصمیم‌هایی است که در مجموعه ما گرفته
            می‌شود.
          </p>
        </div>
      </motion.div>
    </div>
  );
}