import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function Admin() {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();

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
        localStorage.setItem("token", data.token);
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

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/download.jpg')",
      }}
    >
      <div className="md:w-[32%] w-[50%] bg-black/90 rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white mb-4"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white mb-4"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
