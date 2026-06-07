import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Modal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const visit = localStorage.getItem("Modal");
    if (!visit) {
      setOpen(true);
    }
  }, []);
  const closeModal = () => {
    localStorage.setItem("Modal", "true");
    setOpen(false);
  };
  const handleRegister = () => {
    localStorage.setItem("Modal", "true");
    setOpen(false);
  };
  if (!open) return null; 

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-2">
      <div className="relative w-[75%] max-md:w-[90%] bg-slate-600 rounded-xl p-6">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-[44px] cursor-pointer"
        >
          ×
        </button>

        <div className="mb-6 text-[#4f1623] text-center ">
          برای اطلاع از جشواره های پاییزی همین الان ثبت نام کن تا بهت اطلاع بدیم
        </div>

        {/* close button */}
        <button
          onClick={closeModal}
          className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          متوجه شدم
        </button>
        <Link to="/Admin">
          <button
            className=" block bg-blue-600 font-bold  px-5 py-2 my-3 rounded-lg   hover:bg-red-900 transition durration-7000 "
            onClick={handleRegister}
          >
            ثبت نام{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
