export default function About() {
  return (
    <>
      <div className="ml-10 mt-20">
        <h1 className="font bold text-[35px]">ساخته شده برای تیم‌هایی که</h1>
        <h1 className="text-gray-600 text-[35px]">وقت برایشان طلاس</h1>
        <p className=" text-gray-500 max-w-[40%] mb-12">
          ما از یک مشکل واقعی شروع کردیم — ابزارهای پیچیده‌ای که بیشتر از اینکه
          کمک کنند، وقت می‌گرفتند. هدفمان ساختن محصولی بود که از روز اول با تیم
          شما کار کند؛ بدون پیکربندی دردسرساز، بدون یادگیری طولانی. امروز،
          هزاران تیم در سراسر دنیا از آن استفاده می‌کنند.
        </p>
      </div>
      <div className="w-[80%] mx-auto py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              فراتر از یک فروشگاه آنلاین
            </h2>

            <p className="text-gray-500 leading-8">
              ما باور داریم خرید آنلاین باید سریع، شفاف و لذت‌بخش باشد. به همین
              دلیل بستری ساخته‌ایم که مشتریان بتوانند با اطمینان کامل محصولات
              مورد نیاز خود را پیدا کرده و در کوتاه‌ترین زمان ممکن تحویل بگیرند.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">ماموریت ما</h3>

            <p className="text-gray-500 leading-8">
              ایجاد تجربه‌ای متفاوت از خرید آنلاین با تمرکز بر کیفیت، پشتیبانی
              واقعی و ارسال سریع.
            </p>

            <hr className="my-6" />

            <h3 className="text-2xl font-bold mb-4">چشم‌انداز ما</h3>

            <p className="text-gray-500 leading-8">
              تبدیل شدن به یکی از معتبرترین پلتفرم‌های خرید آنلاین در منطقه و
              ارائه بهترین خدمات به میلیون‌ها مشتری.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[50%] mx-auto justify-items-center  grid md:grid-cols-3 grid-cols-1 container    mb-30 text-center ">
        <div className=" text-black-500 box w-[61%] mt-10  bg-gray-200 text-white ">
          <h4 className="text-[black] text-[30px] font-bold">12K</h4>
          <p className="text-[gray] tetx-[26px]">تیم فعال </p>
        </div>
        <div className=" text-black-500 box w-[61%] mt-10 bg-gray-200 text-white ">
          <h4 className="text-[black] text-[30px] font-bold">98%</h4>
          <p className="text-[gray] tetx-[26px]">رضایت مشتریان </p>
        </div>
        <div className=" text-black-500 box w-[61%] mt-10 bg-gray-200 text-white ">
          <h4 className="text-[black] text-[30px] font-bold">40</h4>
          <p className="text-[gray] tetx-[26px]">کشور</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-60 w-[80%] mx-auto justify-items-center text-center">
        <div className="h-[100px] w-[60%] shadow-xl border rounded">
          <h2 className="font-bold mb-3 mt-3">ارسال سریع</h2>
          <p>تحویل سفارش در کمترین زمان</p>
        </div>

        <div className="h-[100px] w-[60%] shadow-xl border rounded">
          <h2 className="font-bold mb-3 mt-3">کیفیت تضمینی</h2>
          <p>ارائه محصولات با کیفیت بالا</p>
        </div>

        <div className="h-[100px] w-[60%] shadow-xl border rounded">
          <h2 className="font-bold mb-3 mt-3">پشتیبانی 24/7</h2>
          <p>پاسخگویی در تمام روزهای هفته</p>
        </div>

        <div className="h-[100px] w-[60%] shadow-xl border rounded">
          <h2 className="font-bold mb-3 mt-3">پرداخت امن</h2>
          <p>خرید مطمئن و ایمن آنلاین</p>
        </div>
      </div>
      <div className="w-[80%] mx-auto text-center py-20">
        <h2 className="text-3xl font-bold mb-8">
          «فروش فقط تحویل کالا نیست؛ ساختن اعتماد است.»
        </h2>

        <p className="text-gray-500">
          این جمله پایه و اساس تمام تصمیم‌هایی است که در مجموعه ما گرفته می‌شود.
        </p>
      </div>
    </>
  );
}
