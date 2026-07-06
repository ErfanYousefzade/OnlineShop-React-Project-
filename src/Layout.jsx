import Header from "./components/Header";
import Foter from "./components/Foter";
import Timer from "./components/Timer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-100">
      <div className="w-full max-w-screen-7xl">
        <Header />
        

        <main className="flex-1">
          {children}
        </main>

        <Foter />
      </div>
    </div>
  );
}