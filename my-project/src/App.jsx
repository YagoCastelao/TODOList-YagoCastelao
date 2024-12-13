import { useState } from "react";
import { motion } from "framer-motion";

const lista = [];

function App() {
  const [state, setState] = useState(lista);
  const [input, setInput] = useState("");

  const agregar = () => {
    if (input.trim() !== "") {
      setState([...state, { tarea: input }]);
      setInput("");
    }
  };

  const eliminarItem = (listItemIndex) => {
    const list = state.filter((_, index) => index !== listItemIndex);
    setState(list);
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
            <li className="empty-message">Sin tareas, agrega tus tareas pendientes</li>
          ) : (
            state.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <span>{item.tarea}</span>
                <button
                  onClick={() => eliminarItem(index)}
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