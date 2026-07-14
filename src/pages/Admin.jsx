import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // حالت ورود یا ثبت‌نام
  
  const { 
    handleSubmit, 
    register, 
    reset,
    formState: { errors }
  } = useForm({
    mode: "onChange"
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (data?.token) {
        const twoHours = 1 * 60 * 60 * 1000;

        localStorage.setItem("token", data.token);
        localStorage.setItem("expireTime", Date.now() + twoHours);

        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("expireTime"));
        console.log(data);

        navigate("/AdminPanel");
      } else {
        alert("login failed");
      }
    },

    onError: () => {
      reset();
      alert("error logging in");
    },
  });

  const handleLogin = (data) => {
    mutate(data);
  };

  // الگوی ایمیل برای ثبت‌نام
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
      {/* پس‌زمینه با ترکیب رنگ‌های تیره‌تر و افکت‌های هندسی */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* المان‌های تزیینی هندسی با رنگ‌های ملایم‌تر */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-purple-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-blue-400 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border-4 border-indigo-400 rounded-full"></div>
        <div className="absolute bottom-1/2 right-10 w-28 h-28 border-4 border-purple-400 rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-purple-500/20">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            {isLogin ? (
              // حالت لاگین: فیلد یوزرنیم بدون اعتبارسنجی ایمیل
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                placeholder="Username"
                className={`w-full px-4 py-3 bg-zinc-800/80 border ${
                  errors.username ? "border-red-500" : "border-zinc-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.username 
                    ? "focus:ring-red-500" 
                    : "focus:ring-purple-500"
                } transition-all duration-200`}
              />
            ) : (
              // حالت ثبت‌نام: فیلد ایمیل با اعتبارسنجی
              <input
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: emailPattern,
                    message: "Please enter a valid email address",
                  },
                })}
                type="text"
                placeholder="Email"
                className={`w-full px-4 py-3 bg-zinc-800/80 border ${
                  errors.username ? "border-red-500" : "border-zinc-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.username 
                    ? "focus:ring-red-500" 
                    : "focus:ring-purple-500"
                } transition-all duration-200`}
              />
            )}
            {errors.username && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠</span> {errors.username.message}
              </p>
            )}
          </div>

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 bg-zinc-800/80 border ${
              errors.password ? "border-red-500" : "border-zinc-700"
            } rounded-lg text-white mb-1 focus:outline-none focus:ring-2 ${
              errors.password 
                ? "focus:ring-red-500" 
                : "focus:ring-purple-500"
            } transition-all duration-200`}
          />
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm flex items-center mb-4">
              <span className="mr-1">⚠</span> {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
        </form>

        {/* لینک تغییر حالت بین ورود و ثبت‌نام */}
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                reset(); // ریست فرم هنگام تغییر حالت
              }}
              className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        <p className="text-center text-zinc-500 text-xs mt-4">
          Demo: mor_2314@gmail.com / 83r5^_
        </p>
      </div>
    </div>
  );
}