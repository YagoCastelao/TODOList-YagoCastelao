import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getTodos = async () => {
  const response = await fetch(
    "https://playground.4geeks.com/todo/users/yago",
    { method: "GET" }
  );
  const { todos } = await response.json();
  return todos;
};

const addTodo = async (label) => {
  const response = await fetch(
    "https://playground.4geeks.com/todo/todos/yago",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ its_done: false, label }),
    }
  );
  const todo = await response.json();
  return todo;
};

const deleteTodo = async (id) => {
  await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
    method: "DELETE",
  });
};

function App() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = async () => {
    const todoList = await getTodos();
    setState(todoList);
  };

  const agregar = async () => {
    if (input.trim() !== "") {
      await addTodo(input);
      await atualizarLista();
      setInput("");
    }
  };

  const eliminarItem = async (id) => {
    await deleteTodo(id);
    await atualizarLista();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      agregar();
    }
  };

  return (
    <>
      <motion.div
        id="app-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My TODO List</h1>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Introduce una tarea..."
        />
        <ul>
          {state.length === 0 ? (
            <li className="empty-message">
              Sin tareas, agrega tus tareas pendientes
            </li>
          ) : (
            state.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <span>{item.label}</span>
                <button
                  onClick={() => eliminarItem(item.id)}
                  className="invisible group-hover:visible"
                >
                  x
                </button>
              </motion.li>
            ))
          )}
        </ul>
        <footer>
          {state.length === 0
            ? "No tienes tareas pendientes."
            : `Tareas pendientes: ${state.length}`}
        </footer>
      </motion.div>
    </>
  );
}

export default App;
