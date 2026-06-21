import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function AdminPanel() {
  const [editingItemId, setEditingItemId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const { handleSubmit, register, reset } = useForm();

  const { mutate } = useMutation({
    mutationFn: (id) =>
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),

    onSuccess: () => {
      alert("delete is done");
    },

    onError: (error) => {
      console.error(error);
      alert("error deleting product");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, newData }) =>
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }).then((res) => res.json()),

    onSuccess: () => {
      alert("product updated successfully");
      setEditingItemId(null);
    },

    onError: (error) => {
      console.error(error);
      alert("error updating product");
    },
  });

  const editSubmitHandler = (data) => {
    updateMutate({
      id: editingItemId,
      newData: data,
    });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <h1>manage products</h1>

      <table className="max-w-3xl mx-auto">
        <thead>
          <tr>
            <th>عکس محصول</th>
            <th>عنوان محصول</th>
            <th>قیمت</th>
            <th>دسته بندی</th>
            <th>مدیریت</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-slate-300/50" : ""}
            >
              <td className="py-4">
                <img src={item.image} className="w-12" alt={item.title} />
              </td>

              <td className="py-4">{item.title}</td>
              <td className="py-4">{item.price}</td>
              <td className="py-4">{item.category}</td>

              <td className="flex gap-2 items-baseline h-full mt-4">
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => mutate(item.id)}
                >
                  delete
                </button>

                <button
                  className="px-4 py-1 bg-yellow-500 text-white rounded-md"
                  onClick={() => {
                    reset({
                      title: item.title,
                      description: item.description,
                      price: item.price,
                    });

                    setEditingItemId(item.id);
                  }}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItemId && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white border border-blue-900 rounded-xl p-6">
          <button
            className="absolute top-4 left-4"
            onClick={() => setEditingItemId(null)}
          >
            X
          </button>

          <form onSubmit={handleSubmit(editSubmitHandler)}>
            <div className="mb-4">
              <label>title:</label>
              <input
                className="border w-full"
                type="text"
                {...register("title")}
              />
            </div>

            <div className="mb-4">
              <label>description:</label>
              <textarea
                className="border w-full"
                {...register("description")}
              />
            </div>

            <div className="mb-4">
              <label>price:</label>
              <input
                className="border w-full"
                type="text"
                {...register("price")}
              />
            </div>

            <input
              type="submit"
              value="save changes"
              className="bg-blue-400 text-white px-4 py-2 rounded-md"
            />
          </form>
        </div>
      )}
    </div>
  );
}