import { useEffect, useState } from "react";

export default function Task() {
  const [text, setText] = useState("");
  const [show, setShow] = useState([]);

  // خواندن اطلاعات از LocalStorage هنگام اولین رندر
  useEffect(() => {
    const data = localStorage.getItem("show");

    if (data) {
      setShow(JSON.parse(data));
    }
  }, []);

  // ذخیره اطلاعات هر بار که show تغییر کند
  useEffect(() => {
    localStorage.setItem("show", JSON.stringify(show));
  }, [show]);

  function addToSee() {
    if (text.trim() === "") return;

    setShow([
      ...show,
      {
        id: Date.now(),
        title: text,
        completed: false,
      },
    ]);

    setText("");
  }

  function removeTodo(id) {
    setShow(show.filter((item) => item.id !== id));
  }

  function completeTodo(id) {
    setShow(
      show.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  return (
    <>
      <h2>Total Todos: {show.length}</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addToSee}>
        Add
      </button>

      <ul>
        {show.map((item) => (
          <li key={item.id}>
            <span
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {item.title}
            </span>

            <button onClick={() => completeTodo(item.id)}>
              {item.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => removeTodo(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}