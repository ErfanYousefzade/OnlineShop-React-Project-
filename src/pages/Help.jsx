import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function Helps() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "زمان ارسال سفارش چقدر است؟",
      answer:
        "تمام سفارش‌ها بین 1 تا 3 روز کاری پردازش و ارسال می‌شوند.",
    },
    {
      question: "آیا امکان بازگشت کالا وجود دارد؟",
      answer:
        "بله، تا 7 روز پس از دریافت سفارش امکان بازگشت کالا وجود دارد.",
    },
    {
      question: "روش‌های پرداخت چیست؟",
      answer:
        "پرداخت آنلاین، کارت به کارت و پرداخت در محل برای برخی مناطق.",
    },
    {
      question: "چگونه سفارش خود را پیگیری کنم؟",
      answer:
        "از بخش سفارشات حساب کاربری می‌توانید وضعیت سفارش را مشاهده کنید.",
    },
  ];

  const cards = [
    {
      icon: <Truck size={35} />,
      title: "ارسال سریع",
      desc: "تحویل سفارش در کوتاه‌ترین زمان ممکن",
    },
    {
      icon: <ShieldCheck size={35} />,
      title: "ضمانت کیفیت",
      desc: "تمام محصولات دارای تضمین اصالت هستند",
    },
    {
      icon: <CreditCard size={35} />,
      title: "پرداخت امن",
      desc: "پرداخت کاملاً رمزنگاری شده و مطمئن",
    },
    {
      icon: <Headphones size={35} />,
      title: "پشتیبانی 24/7",
      desc: "همیشه پاسخگوی سوالات شما هستیم",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
      {/* Lights */}
      <div className="fixed top-0 left-0 w-[450px] h-[450px] bg-blue-200 rounded-full blur-[180px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[450px] h-[450px] bg-purple-200 rounded-full blur-[180px] opacity-20 pointer-events-none" />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] max-w-7xl mx-auto pt-28 pb-24 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-black via-gray-600 to-gray-300 bg-clip-text text-transparent">
          مرکز راهنمایی
        </h1>

        <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto leading-8">
          هر سوالی دارید اینجاست. از پیگیری سفارش گرفته تا بازگشت کالا و
          پشتیبانی فنی.
        </p>
      </motion.section>

      {/* Cards */}
      <section className="w-[90%] max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-white rounded-[35px] p-8 border border-gray-100 shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:left-[100%] transition-all duration-1000" />

              <div className="mb-5">{card.icon}</div>

              <h3 className="font-bold text-xl mb-3">
                {card.title}
              </h3>

              <p className="text-gray-500">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-[90%] max-w-5xl mx-auto pb-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-5xl font-black text-center mb-14"
        >
          سوالات متداول
        </motion.h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-[25px] overflow-hidden shadow-lg"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6"
              >
                <span className="font-bold text-lg">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-all duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  open === index
                    ? "max-h-40 pb-6 px-6"
                    : "max-h-0"
                }`}
              >
                <p className="text-gray-500">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-[90%] max-w-6xl mx-auto pb-24"
      >
        <div className="relative overflow-hidden rounded-[50px] bg-gradient-to-br from-black via-gray-900 to-black text-white p-16 text-center">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

          <h2 className="text-5xl font-black mb-6">
            هنوز سوالی دارید؟
          </h2>

          <p className="text-gray-400 mb-10">
            تیم پشتیبانی ما آماده پاسخگویی به شماست.
          </p>

          <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300">
            تماس با پشتیبانی
          </button>
        </div>
      </motion.section>
    </div>
  );
}