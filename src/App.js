import './App.css'; // Aquí van tus estilos
import { useState } from 'react'; // Hook de estado
import ListaTareas from './listaTareas'; // Nuestro componente de lista


function App() {
  // Estado que guarda las tareas (inicialmente un array vacío)
  const [tareas, setTareas] = useState([]);

  // Estado que guarda lo que el usuario escribe en el input
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Función que maneja el envío del formulariok
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // Validamos que no esté vacío el input
    if (nuevaTarea.trim() === '') return;

    // Creamos un objeto con la nueva tarea
    const nueva = {
      id: Date.now(),       // ID único basado en la fecha
      texto: nuevaTarea,    // Texto escrito por el usuario
      completada: false     // Estado inicial: no completada
    };

    // Actualizamos el estado con la nueva tarea
    setTareas([...tareas, nueva]);

    // Limpiamos el input
    setNuevaTarea('');
  };

  // Función para marcar/desmarcar una tarea como completada
  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id 
          ? { ...tarea, completada: !tarea.completada } // Cambia el valor de completada
          : tarea
      )
    );
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div className="App">
      <h1>Mi lista de tareas</h1>

      {/* Formulario para agregar tareas */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      {/* Mostramos la lista de tareas */}
      <ListaTareas 
        tareas={tareas}
        toggleCompletada={toggleCompletada}
        eliminarTarea={eliminarTarea}
      />
    </div>
  );
}

export default App;