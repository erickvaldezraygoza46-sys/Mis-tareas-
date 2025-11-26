import React, { useState } from "react";// Importamos useState para manejar el estado del componente
import "./App.css";// Importamos los estilos
// Componente principal
function GestorUsuarios() {// Definimos el estado inicial del formulario y la lista de usuarios
  const [form, setForm] = useState({// Estado para los campos del formulario
    nombre: "",// Campo nombre
    apellido: "",// Campo apellido
    edad: "",// Campo edad
    correo: "",// Campo correo
  });// Estado para la lista de usuarios

  const [usuarios, setUsuarios] = useState([]);// Lista de usuarios

  const handleChange = (e) => {// Manejador de cambios en los campos del formulario
    setForm({ ...form, [e.target.name]: e.target.value });// Actualizamos el estado del formulario
  };// Manejador de envío del formulario

  const handleSubmit = (e) => {// Manejador de envío del formulario
    e.preventDefault();// Prevenimos el comportamiento por defecto del formulario
    if (!form.nombre || !form.apellido || !form.edad || !form.correo) {// Validamos que todos los campos estén llenos
      alert("Por favor llena todos los campos ");// Mostramos una alerta si algún campo está vacío
      return;// Salimos de la función
    }

    setUsuarios([...usuarios, form]);// Agregamos el nuevo usuario a la lista
    setForm({ nombre: "", apellido: "", edad: "", correo: "" });// Reseteamos el formulario
  };// Función para eliminar un usuario de la lista

  const eliminarUsuario = (index) => {// Función para eliminar un usuario
    const nuevaLista = usuarios.filter((_, i) => i !== index);// Filtramos la lista para eliminar el usuario en el índice dado
    setUsuarios(nuevaLista);// Actualizamos el estado de la lista de usuarios
  };// Renderizamos el componente

  return (// Retornamos el JSX del componente
    <div className="container">
      <h1>Gestor de Usuarios</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"// Tipo de input
          name="nombre"// Nombre del campo
          value={form.nombre}// Valor del campo
          onChange={handleChange}// Manejador de cambios
          placeholder="Nombre"//  Placeholder del campo
        />
        <input
          type="text"// Tipo de input
          name="apellido"//ejercicios Nombre del campo
          value={form.apellido}// Valor del campo
          onChange={handleChange}//
          placeholder="Apellido"
        />
        <input
          type="number"
          name="edad"
          value={form.edad}
          onChange={handleChange}
          placeholder="Edad"
        />
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="Correo"
        />
        <button type="submit">Agregar</button>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={index}>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.edad}</td>
              <td>{u.correo}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarUsuario(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestorUsuarios;
