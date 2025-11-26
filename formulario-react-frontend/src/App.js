import React, { useState } from "react";//Formulario de login y registro de usuarios
import axios from "axios";//manejo de peticiones HTTP
import "./App.css";//estilos
import GestorUsuarios from "./GestorUsuarios";//componente para gestionar usuarios
//componente principal de la aplicación
function App() {//estado para mostrar formulario de login o registro
  const [mostrarLogin, setMostrarLogin] = useState(true);//estado para el correo electrónico
  const [correo, setCorreo] = useState("");//estado para la contraseña
  const [contraseña, setContraseña] = useState("");//estado para saber si el usuario está logeado
  const [logeado, setLogeado] = useState(false);//función para manejar el login
//función para manejar el registro
  const manejarLogin = async (e) => {//prevenir el comportamiento por defecto del formulario
    e.preventDefault();//intentar hacer la petición al servidor
    try {//petición POST al endpoint de login
      const res = await axios.post("http://localhost/api_usuarios/login.php", {//enviar correo y contraseña
        correo,//correo electrónico
        contraseña,//contraseña
      });//si el login es exitoso, actualizar el estado de logeado
      if (res.data.login) {//alerta de éxito
        setLogeado(true);//alerta de éxito
      } else {//alerta de fallo
        alert("Correo o contraseña incorrectos ");//mensaje de error
      }//capturar errores de conexión
    } catch (err) {//alerta de error
      alert("Error de conexión con el servidor.");//mensaje de error
    }//fin de la función manejarLogin
  };//función para manejar el registro
//función para manejar el registro
  const manejarRegistro = async (e) => {//prevenir el comportamiento por defecto del formulario
    e.preventDefault();//intentar hacer la petición al servidor
    try {//petición POST al endpoint de registro
      const res = await axios.post("http://localhost/api_usuarios/registro.php", {//enviar
        correo,//correo electrónico
        contraseña,//contraseña
      });//alerta de éxito
      alert(res.data.mensaje || "Registrado correctamente ");//volver al formulario de login
      setMostrarLogin(true);//capturar errores de conexión
    } catch (err) {//alerta de error
      alert("Error al registrar usuario.");//mensaje de error
    }//fin de la función manejarRegistro
  };//si el usuario está logeado, mostrar el gestor de usuarios
//si el usuario está logeado, mostrar el gestor de usuarios
  if (logeado) return <GestorUsuarios />;//formulario de login y registro
//si no está logeado, mostrar el formulario correspondiente
  return (
    <div className="login-container">
      <div className="tabs">
        <button
          className={mostrarLogin ? "activo" : ""}//si está en el formulario de login, agregar clase activa
          onClick={() => setMostrarLogin(true)}//al hacer clic, mostrar formulario de login
        >
          INICIAR SESIÓN
        </button>
        <button
          className={!mostrarLogin ? "activo" : ""}//si está en el formulario de registro, agregar clase activa
          onClick={() => setMostrarLogin(false)}//al hacer clic, mostrar formulario de registro
        >
          REGISTRARSE
        </button>
      </div>

      {mostrarLogin ? (//Formulario de login
        <form className="formulario" onSubmit={manejarLogin}>
          <h2>Iniciar Sesión</h2>
          <input
            type="email"//correo electrónico
            placeholder="Email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}//actualizar estado del correo
          />
          <input
            type="password"//entrada de contraseña
            placeholder="Contraseña"// contraseña
            value={contraseña}//actualizar estado de la contraseña
            onChange={(e) => setContraseña(e.target.value)}//actualizar estado de la contraseña
          />
          <button type="submit">INICIAR SESIÓN</button>++
        </form>
      ) : (
        <form className="formulario" onSubmit={manejarRegistro}>
          <h2>Registrarse</h2>
          <input
            type="email"//entrada de correo electrónico
            placeholder="Email"// correo electrónico
            value={correo}//actualizar estado del correo
            onChange={(e) => setCorreo(e.target.value)}//actualizar estado del correo
          />
          <input
            type="password"//que la entrada sea de tipo contraseña
            placeholder="Contraseña"// contraseña
            value={contraseña}//actualizar estado de la contraseña
            onChange={(e) => setContraseña(e.target.value)}//actualizar estado de la contraseña
          />
          <button type="submit">REGISTRARSE</button>
        </form>
      )}
    </div>
  );//fin del return
}//exportar el componente App

export default App;//exportar el componente App
