import { useState } from 'react'


const lista = [{
  tarea: "lavar Louça",
  hora: "12:40"
}]

function App() {
  const [state, setState] = useState(lista)

  const agregar = () => {
    setState([...state, {tarea: "Tarea"}])
  }

  return (
    <>
        <h1>My TODO List</h1>
          <button onClick={agregar}>Agregar Tarea</button>
          <ul>
            {state.map((item) => {
              return (<>
                <li>
                  {item.tarea}
                </li>
              </>)
            })}
          </ul>
    </>
  )
}

export default App  
