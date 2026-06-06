export default function Admin() {
  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: "url('/download.jpg')",
      }}
    >
      <div className=" md:w-[32%] w-[50%] bg-black/90 rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <form className="">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 outline-none focus:border-purple-500 transition mb-3"
          />

          <button
            
            className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg transition duration-300 hover:bg-green-600"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-5">
          <a
            href="https://www.vecteezy.com/free-png/face-password"
            className="text-purple-400 hover:text-green-400 transition "
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
