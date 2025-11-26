import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [vista, setVista] = useState("login");
  const [activeIndex, setActiveIndex] = useState(0);

  // CAMPOS DEL FORMULARIO
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // ----------- FUNCIONES PARA ENVIAR FORMULARIOS A PHP -----------
  const enviarForm = async (url, datos) => {
    try {
      const formData = new FormData();
      for (const key in datos) formData.append(key, datos[key]);

      const resp = await fetch(url, {
        method: "POST",
        body: formData
      });

      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
      alert("No se pudo conectar con el servidor");
      return null;
    }
  };

  const registrarBD = async () => {
    const data = await enviarForm("http://localhost/spotify/registrar.php", {
      usuario,
      email,
      password
    });

    if (data && data.status === "ok") {
      alert("Cuenta creada correctamente");
      setVista("login");
    } else {
      alert("No se pudo registrar");
    }
  };

  const loginBD = async () => {
    const data = await enviarForm("http://localhost/spotify/login.php", {
      usuario,
      password
    });

    if (data && data.status === "ok") {
      setVista("spotify");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const modificarBD = async () => {
    const data = await enviarForm("http://localhost/spotify/modificar.php", {
      usuario,
      email,
      password
    });

    if (data && data.status === "ok") {
      alert("Datos modificados");
      setVista("spotify");
    }
  };

  // ----------- CARRUSEL -----------
  const albums = [
    {
      name: "Thriller",
      img: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    },
    {
      name: "Bad",
      img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
    },
    {
      name: "Dangerous",
      img: "https://cdn-p.smehost.net/sites/28d35d54a3c64e2b851790a18a1c4c18/wp-content/uploads/2018/12/181214_dangerous_feat.jpg",
    },
    {
      name: "HIStory",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/MichaelsNumberOnes.JPG/250px-MichaelsNumberOnes.JPG",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % albums.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [albums.length]);

  // ----------- UI -----------
  return (
    <div>
      {/* LOGIN */}
      {vista === "login" && (
        <div className="auth-container">
          <div className="auth-card">
            <h2>Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginBD}>Entrar</button>

            <p className="link" onClick={() => setVista("registro")}>
              ¿No tienes cuenta? <b>Regístrate</b>
            </p>
          </div>
        </div>
      )}

      {/* REGISTRO */}
      {vista === "registro" && (
        <div className="auth-container">
          <div className="auth-card">
            <h2>Crear Cuenta</h2>

            <input
              type="text"
              placeholder="Nuevo Usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={registrarBD}>Registrar</button>

            <p className="link" onClick={() => setVista("login")}>
              ¿Ya tienes cuenta? <b>Inicia Sesión</b>
            </p>
          </div>
        </div>
      )}

      {/* SPOTIFY CLONE */}
      {vista === "spotify" && (
        <div className="spotify-clone">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-nav">
              <div className="sidebar-item">Inicio</div>
              <div className="sidebar-item">Buscar</div>
              <div className="sidebar-item">Biblioteca</div>

              <div
                className="sidebar-item config-btn"
                onClick={() => setVista("config")}
              >
                ⚙ Modificar Cuenta
              </div>
            </div>

            <div className="sidebar-playlists">
              <div className="playlist-item">
                <img
                  src="https://i.pinimg.com/564x/1e/07/67/1e07670a5ffb5f62b6eec7a570c6f8be.jpg"
                  className="playlist-cover"
                  alt=""
                />
                <p>Chido</p>
              </div>

              <div className="playlist-item">
                <img
                  src="https://i.pinimg.com/564x/81/27/d7/8127d7b07e5d2ea4674e8682d0c24911.jpg"
                  className="playlist-cover"
                  alt=""
                />
                <p>Rojo</p>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="main-container">
            <header className="main-header">
              <input
                type="text"
                placeholder="¿Qué quieres reproducir?"
                className="search-bar"
              />
            </header>

            <section className="content-area">
              <div className="main-content">
                <div className="carousel-container">
                  {albums.map((album, index) => (
                    <div
                      key={index}
                      className={
                        "carousel-item " +
                        (index === activeIndex ? "active" : "")
                      }
                    >
                      <img src={album.img} alt="" />
                      <p>{album.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="now-playing-details">
                <h2>{albums[activeIndex].name}</h2>
                <p>Michael Jackson</p>
                <img
                  src={albums[activeIndex].img}
                  className="now-playing-cover"
                  alt=""
                />
              </div>
            </section>
          </main>

          {/* PLAYER ABAJO FIJO */}
          <footer className="playback-bar">
            <div className="song-info-small">
              {albums[activeIndex].name} - Michael Jackson
            </div>

            <div className="controls">
              <button className="control-btn">⏪</button>
              <button className="control-btn play-btn">⏯</button>
              <button className="control-btn">⏩</button>
            </div>

            <div className="time-info">3:45</div>
          </footer>
        </div>
      )}

      {/* CONFIG */}
      {vista === "config" && (
        <div className="auth-container">
          <div className="auth-card">
            <h2>Modificar Cuenta</h2>

            <input
              type="text"
              placeholder="Nuevo Usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="email"
              placeholder="Nuevo Correo"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nueva Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={modificarBD}>Guardar Cambios</button>
            <button onClick={() => setVista("spotify")}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
