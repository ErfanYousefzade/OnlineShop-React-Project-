import Products from "../components/Products";

export default function Home({ data }) {
  const randomProducts = [...data] .slice(0, 4);

  return (
    <>
    <div className="h1"><h1 className="text-red-600 font-bold md:text-right text-[30px] flex justify-end md:px-10 mb-10 text-center px-0 ">محصولات پر فروش</h1></div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-9 mt-[40px]">
      {randomProducts.map((item) => (
        <Products
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          description={item.description}
        />
      ))}
    </div>
    </>
  );
}