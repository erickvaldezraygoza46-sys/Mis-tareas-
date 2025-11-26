import React from "react";

// Recibe las tres props que necesita: los datos (tareas) y las dos funciones.
function ListaTareas({ tareas, toggleCompletada, eliminarTarea }) { 
    return (
        <ul>
            {tareas.map((tarea) => (
                <li key={tarea.id}
                    style={{textDecoration: tarea.completada ? 'line-through' : 'none'}}
                >
                    {/* Las funciones ahora están definidas porque vienen en las props */}
                    <span onClick={() => toggleCompletada(tarea.id)}> 
                        {tarea.texto}
                    </span>
                    <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
}
export default ListaTareas;