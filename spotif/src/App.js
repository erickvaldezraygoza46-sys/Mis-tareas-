import { useState, useEffect, useRef } from "react";// React
import "./App.css";// CSS
// IMPORTS
function App() {// Componente principal
  const [vista, setVista] = useState("login");// login, registro, spotify, config
  const [activeIndex, setActiveIndex] = useState(0);// carrusel
  // FORMULARIO
  const [usuario, setUsuario] = useState("");// usuario
  const [password, setPassword] = useState("");// contraseña
  const [email, setEmail] = useState("");// correo
  // PLAYLISTS
  const [playlists, setPlaylists] = useState({// canciones
    Chido: [],// ejemplo
    Rojo: [],// ejemplo
  });// playlists
// REPRODUCCIÓN
  const [currentSong, setCurrentSong] = useState(null);// canción actual
  const audioRef = useRef(null);// referencia al audio
  // FUNCION GENERAL PARA LLAMAR PHP
  const enviarForm = async (url, datos) => {// enviar datos al servidor
    try {// intento
      const formData = new FormData();// formulario
      for (const key in datos) formData.append(key, datos[key]);// agregar datos al formulario
// llamada fetch
      const resp = await fetch(url, {// llamada
        method: "POST",// método
        mode: "cors",// modo
        body: formData,// cuerpo
        headers: {// encabezados
          Accept: "application/json",// acepto JSON
        },// encabezados
      });// llamada fetch
// leer respuesta
      const text = await resp.text();// leer texto
// intentar parsear JSON
      try {// intento
        const data = JSON.parse(text);// parsear JSON
        return data;// devolver datos
      } catch (e) {// error
        console.error(" El servidor NO devolvió JSON. Respuesta:", text);// error
        alert("Error en el servidor: revisa add_song.php, delete_song.php, login.php, etc.");// alerta
        return null;// devolver null
      }// intentar parsear JSON
    } catch (error) {// error
      console.error(" Error en enviarForm:", error);// error
      alert("No se pudo conectar con el servidor (ver consola)");// alerta
      return null;// devolver null
    }// intento
  };// enviar datos al servidor
  // LOGIN / REGISTRO / MODIFICAR
  const registrarBD = async () => {// registrar en BD
    const data = await enviarForm("http://localhost/spotify/registrar.php", {// llamar PHP
      usuario, email, password,// datos
    });// llamar PHP
// revisar respuesta
    if (data?.status === "ok") {// éxito
      alert("Cuenta creada correctamente");// alerta
      setVista("login");// cambiar vista
    } else {// error
      alert("No se pudo registrar");// alerta
    }// revisar respuesta
  };// registrar en BD

  const loginBD = async () => {// login en BD
    const data = await enviarForm("http://localhost/spotify/login.php", {// llamar PHP
      usuario, password,// datos
    });// llamar PHP

    if (data?.status === "ok") {// éxito
      setVista("spotify");// cambiar vista
    } else {// error
      alert("Usuario o contraseña incorrectos");// alerta
    }// revisar respuesta
  };// login en BD

  const modificarBD = async () => {// modificar en BD
    const data = await enviarForm("http://localhost/spotify/modificar.php", {// llamar PHP
      usuario, email, password,// datos
    });// llamar PHP

    if (data?.status === "ok") {// éxito
      alert("Datos modificados");// alerta
      setVista("spotify");// cambiar vista
    } else {// error
      alert("No se pudo modificar");// alerta
    }// revisar respuesta
  };// modificar en
  // PLAYLIST: AGREGAR / ELIMINAR / REPRODUCIR
  const agregarCancion = async (playlistName) => {// agregar canción
    const title = prompt("Nombre de la canción:")?.trim();// pedir nombre
    if (!title) return;// si no hay nombre, salir
// crear objeto canción
    const newId = Date.now();// id único
    const newSong = { id: newId, title };// nueva canción
// agregar al estado
    setPlaylists((prev) => {// actualizar estado
      const copy = { ...prev };// copia
      copy[playlistName] = [...copy[playlistName], newSong];// agregar canción
      return copy;// devolver copia
    });// actualizar estado
    // guardar en BD (solo nombre)
    await enviarForm("http://localhost/spotify/add_song.php", {// llamar PHP
      playlist: playlistName,// playlist
      title// título
    });// llamar PHP
  };// agregar canción
// eliminar canción
  const eliminarCancion = async (playlistName, songId) => {// eliminar canción
    if (!window.confirm("¿Eliminar canción?")) return;// confirmar

    setPlaylists((prev) => {// actualizar estado
      const copy = { ...prev };// copia
      copy[playlistName] = copy[playlistName].filter((s) => s.id !== songId);// eliminar canción
      return copy;// devolver copia
    });// actualizar estado

    await enviarForm("http://localhost/spotify/delete_song.php", {// llamar PHP
      playlist: playlistName,// playlist
      songId,// id canción
    });// llamar PHP

    if (currentSong?.id === songId) {// si es la canción actual
      setCurrentSong(null);// quitar canción actual
      if (audioRef.current) {// si hay audio
        audioRef.current.pause();// pausar audio
        audioRef.current.src = "";// limpiar fuente
      }// si hay audio
    }// si es la canción actual
  };// eliminar canción

  const playSong = (playlistName, song) => {// reproducir canción
    // SIN URL → simplemente no reproducirá, pero no truena
    setCurrentSong({ ...song, playlist: playlistName });  // establecer canción actual
  };// reproducir canción
  // EFECTO: cuando cambia la canción actual, actualizar el audio
  useEffect(() => {// efecto cuando cambia la canción actual
    if (!audioRef.current) return;// si no hay audio, salir
    if (currentSong) {// si hay canción actual
      audioRef.current.pause();// pausar audio
      audioRef.current.src = "";// limpiar fuente
    }// si hay canción actual
  }, [currentSong]);// efecto cuando cambia la canción actual
  // CARRUSEL AUTOMÁTICO
  const albums = [// álbumes
    { name: "Thriller", img: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png" },// Thriller
    { name: "Bad", img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png" },// Bad
    { name: "Dangerous", img: "https://cdn-p.smehost.net/sites/28d35d54a3c64e2b851790a18a1c4c18/wp-content/uploads/2018/12/181214_dangerous_feat.jpg" },// Dangerous
    { name: "HIStory", img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/MichaelsNumberOnes.JPG/250px-MichaelsNumberOnes.JPG" },// HIStory
  ];// álbumes
// efecto para carrusel automático
  useEffect(() => {// efecto para carrusel automático
    const interval = setInterval(() => {// intervalo
      setActiveIndex((prev) => (prev + 1) % albums.length);// actualizar índice
    }, 2000);// cada 2 segundos
    return () => clearInterval(interval);// limpiar intervalo
  }, []);// efecto para carrusel automático
  // INTERFAZ
  return (// JSX
    <div>
      {/* LOGIN */}
      {vista === "login" && (// login
        <div className="auth-container">
          <div className="auth-card">
            <h2>Iniciar Sesión</h2>

            <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />

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

            <input type="text" placeholder="Nuevo Usuario" onChange={(e) => setUsuario(e.target.value)} />
            <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={registrarBD}>Registrar</button>

            <p className="link" onClick={() => setVista("login")}>
              ¿Ya tienes cuenta? <b>Inicia Sesión</b>
            </p>
          </div>
        </div>
      )}

      {/* SPOTIFY */}
      {vista === "spotify" && (
        <div className="spotify-clone">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-nav">
              <div className="sidebar-item">Inicio</div>
              <div className="sidebar-item">Buscar</div>
              <div className="sidebar-item">Biblioteca</div>

              <div className="sidebar-item config-btn" onClick={() => setVista("config")}>
                ⚙ Modificar Cuenta
              </div>
            </div>

            <div className="sidebar-playlists">
              {Object.keys(playlists).map((plName) => (// por cada playlist
                <div key={plName} className="playlist-item">
                  <img
                    src={// imagen de la playlist
                      plName === "Chido"// ejemplo
                        ? "https://static.vecteezy.com/system/resources/previews/004/268/938/non_2x/vintage-vinyl-record-icon-design-element-isolated-on-white-background-free-vector.jpg"// ejemplo
                        : "https://static.vecteezy.com/system/resources/previews/004/268/938/non_2x/vintage-vinyl-record-icon-design-element-isolated-on-white-background-free-vector.jpg"// otro ejemplo
                    }// imagen de la playlist
                    className="playlist-cover"//ejercicios5
                    alt={plName}// alt
                    onClick={() =>// al hacer clic
                      playlists[plName].length > 0 &&// si hay canciones
                      playSong(plName, playlists[plName][0])// reproducir primera canción
                    }// al hacer clic
                  />

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0 }}>{plName}</p>
                    <small style={{ color: "#9b9b9b" }}>{playlists[plName].length} canciones</small>
                  </div>

                  <button onClick={() => agregarCancion(plName)}>➕</button>
                </div>
              ))}
            </div>
          </aside>

          {/* MAIN */}
          <main className="main-container">
            <header className="main-header">
              <input type="text" placeholder="¿Qué quieres reproducir?" className="search-bar" />
            </header>

            <section className="content-area">
              <div className="main-content">

                {/* CARRUSEL */}
                <div className="carousel-container">
                  {albums.map((album, index) => (// por cada álbum
                    <div key={index} className={"carousel-item " + (index === activeIndex ? "active" : "")}>
                      <img src={album.img} alt={album.name} />
                      <p>{album.name}</p>
                    </div>// por cada álbum
                  ))}
                </div>

                {/* CANCIONES */}
                <div style={{ marginTop: 30 }}>
                  {Object.keys(playlists).map((plName) => (// por cada playlist
                    <div key={plName} style={{ marginBottom: 20 }}>
                      <h3>{plName}</h3>

                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {playlists[plName].length === 0 && (// si no hay canciones
                          <div style={{ opacity: 0.6 }}>Sin canciones</div>
                        )}
                        {playlists[plName].map((s) => (// por cada canción
                          <div
                            key={s.id}
                            style={{// estilo de la canción
                              background: "#222",// fondo
                              padding: 8,// padding
                              borderRadius: 8,// borde redondeado
                              minWidth: 180,// ancho mínimo
                              display: "flex",// flex
                              flexDirection: "column",// columna
                              gap: 8,// espacio entre elementos
                            }}// estilo de la canción
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <strong>{s.title}</strong>

                              <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => playSong(plName, s)}>▶</button>
                                <button onClick={() => eliminarCancion(plName, s.id)}>🗑</button>
                              </div>
                            </div>

                            {/* YA NO SE MUESTRA s.url */}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PANEL DERECHA */}
              <div className="now-playing-details">
                <h2>{currentSong ? currentSong.title : albums[activeIndex].name}</h2>
                <p>{currentSong ? currentSong.playlist : "Michael Jackson"}</p>

                <img
                  src={// imagen de la canción o álbum
                    currentSong// si hay canción actual
                      ? "https://via.placeholder.com/300x300?text=Now+Playing"// imagen genérica
                      : albums[activeIndex].img// imagen del álbum
                  }// imagen de la canción o álbum
                  className="now-playing-cover"//ejercicios
                  alt=""// alt
                />
              </div>
            </section>
          </main>

          {/* PLAYER */}
          <footer className="playback-bar">
            <div className="song-info-small">
              {currentSong
                ? `${currentSong.title} - ${currentSong.playlist}`// canción actual
                : `${albums[activeIndex].name} - Michael Jackson`}
            </div>

            <div className="controls">
              <button
                className="control-btn"// botón de control
                onClick={() => {// al hacer clic
                  if (!currentSong) return;// si no hay canción actual, salir
                  const pl = playlists[currentSong.playlist] || [];// obtener playlist
                  const idx = pl.findIndex((s) => s.id === currentSong.id);// índice de la canción actual
                  if (idx > 0) playSong(currentSong.playlist, pl[idx - 1]);// reproducir canción anterior
                }}// al hacer clic
              >
                ⏪
              </button>

              <button
                className="control-btn play-btn"// botón de play/pause
                onClick={() => {// al hacer clic
                  if (!audioRef.current) return;// si no hay referencia al audio, salir
                  if (audioRef.current.paused) audioRef.current.play();// si está pausado, reproducir
                  else audioRef.current.pause();// si está reproduciendo, pausar
                }}// al hacer clic
              >
                ⏯
              </button>

              <button
                className="control-btn"// botón de control
                onClick={() => {// al hacer clic
                  if (!currentSong) return;// si no hay canción actual, salir
                  const pl = playlists[currentSong.playlist] || [];// obtener playlist
                  const idx = pl.findIndex((s) => s.id === currentSong.id);// índice de la canción actual
                  if (idx < pl.length - 1) playSong(currentSong.playlist, pl[idx + 1]);// reproducir canción siguiente
                }}// al hacer clic
              >
                ⏩
              </button>
            </div>

            <div className="time-info">
              {audioRef.current && !audioRef.current.paused ? "▶ Reproduciendo" : "⏸"}
            </div>

            <audio ref={audioRef} controls style={{ display: "none" }} />
          </footer>
        </div>
      )}

      {/* CONFIGURACIÓN */}
      {vista === "config" && (// configuración
        <div className="auth-container">
          <div className="auth-card">
            <h2>Modificar Cuenta</h2>
            <input type="text" placeholder="Nuevo Usuario" onChange={(e) => setUsuario(e.target.value)} />
            <input type="email" placeholder="Nuevo Correo" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Nueva Contraseña" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={modificarBD}>Guardar Cambios</button>
            <button onClick={() => setVista("spotify")}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );// JSX
}// Componente principal
// EXPORTAR
export default App;// exportar componente
