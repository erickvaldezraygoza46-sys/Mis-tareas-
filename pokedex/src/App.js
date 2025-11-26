import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [editando, setEditando] = useState(false);
  const [tema, setTema] = useState("default"); // default, light, dark
  const [indexActivo, setIndexActivo] = useState(0);
  const [mostrarConfig, setMostrarConfig] = useState(false);

  // NUEVAS CONFIGURACIONES
  const [tipoLetra, setTipoLetra] = useState("Arial");
  const [formaTarjeta, setFormaTarjeta] = useState("redonda"); // redonda o cuadrada

  const [nuevo, setNuevo] = useState({
    nombre: "",
    tipo: "",
    nivel: "",
    daño: "",
    ataque: "",
    imagen: "",
  });

  const [edicion, setEdicion] = useState({
    tipo: "",
    nivel: "",
    daño: "",
    ataque: "",
  });

  const cargarPokemons = () => {
    axios
      .get("http://localhost/pokedex_api/obtener_pokemons.php")
      .then((res) => {
        setPokemons(res.data);
        if (res.data.length > 0) setSelected(res.data[0]);
      })
      .catch((err) => console.error("Error al cargar Pokémon:", err));
  };

  useEffect(() => {
    cargarPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      const intervalo = setInterval(() => {
        setIndexActivo((prev) => (prev + 1) % pokemons.length);
      }, 2500);
      return () => clearInterval(intervalo);
    }
  }, [pokemons]);

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const agregarPokemon = (e) => {
    e.preventDefault();
    if (
      !nuevo.nombre ||
      !nuevo.tipo ||
      !nuevo.nivel ||
      !nuevo.daño ||
      !nuevo.ataque ||
      !nuevo.imagen
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    axios
      .post("http://localhost/pokedex_api/agregar_pokemon.php", nuevo)
      .then((res) => {
        alert(res.data.mensaje);
        setNuevo({
          nombre: "",
          tipo: "",
          nivel: "",
          daño: "",
          ataque: "",
          imagen: "",
        });
        cargarPokemons();
      })
      .catch((err) => console.error("Error al registrar Pokémon:", err));
  };

  const eliminarPokemon = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este Pokémon?")) {
      axios
        .post("http://localhost/pokedex_api/eliminar_pokemon.php", { id })
        .then(() => {
          alert("Pokémon eliminado");
          cargarPokemons();
        })
        .catch((err) => console.error("Error al eliminar:", err));
    }
  };

  const activarEdicion = (pokemon) => {
    setEditando(true);
    setEdicion({
      tipo: pokemon.tipo,
      nivel: pokemon.nivel,
      daño: pokemon.daño,
      ataque: pokemon.ataque,
    });
  };

  const guardarEdicion = () => {
    axios
      .post("http://localhost/pokedex_api/editar_pokemon.php", {
        id: selected.id,
        tipo: edicion.tipo,
        nivel: edicion.nivel,
        daño: edicion.daño,
        ataque: edicion.ataque,
      })
      .then(() => {
        alert("Pokémon actualizado correctamente");
        setEditando(false);
        cargarPokemons();
      })
      .catch((err) => console.error("Error al editar Pokémon:", err));
  };

  const cambiarTema = () => {
    setTema((prev) =>
      prev === "default" ? "light" : prev === "light" ? "dark" : "default"
    );
  };

  return (
    <div
      className={`pokedex-retro theme-${tema}`}
      style={{ fontFamily: tipoLetra }}
    >
      <header className="header">
        Pokédex
        <div style={{ float: "right", display: "flex", gap: "8px" }}>
          <button className="boton-tema" onClick={cambiarTema}>
            Cambiar Tema
          </button>
          <button
            className="boton-config"
            onClick={() => setMostrarConfig(!mostrarConfig)}
          >
            ⚙️ Configuraciones
          </button>
        </div>
      </header>

      {/* PANEL DE CONFIGURACIONES */}
      {mostrarConfig && (
        <div className="panel-config">
          <h3>⚙️ Configuraciones</h3>

          {/* Cambiar tipo de letra */}
          <label>Tipo de letra:</label>
          <select
            value={tipoLetra}
            onChange={(e) => setTipoLetra(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>

          {/* Forma de tarjeta */}
          <label style={{ marginTop: "10px" }}>Forma de tarjeta de datos:</label>
          <select
            value={formaTarjeta}
            onChange={(e) => setFormaTarjeta(e.target.value)}
          >
            <option value="redonda">Redonda</option>
            <option value="cuadrada">Cuadrada</option>
          </select>

          <button onClick={() => setMostrarConfig(false)}>Cerrar</button>
        </div>
      )}

      <main className="main">
        <section className="left-panel">
          <h2 className="pokemon-name">
            {selected ? selected.nombre : "Selecciona un Pokémon"}
          </h2>

          {selected && (
            <>
              <div className="sprite-box">
                <img src={selected.imagen} alt={selected.nombre} />
              </div>

              <div
                className={`seen-owned ${
                  formaTarjeta === "cuadrada"
                    ? "tarjeta-cuadrada"
                    : "tarjeta-redonda"
                }`}
              >
                <p>Tipo: {selected.tipo}</p>
                <p>Nivel: {selected.nivel}</p>
                <p>Ataque: {selected.ataque}</p>
                <p>Daño: {selected.daño}</p>
              </div>

              <button
                className="boton-editar"
                onClick={() => activarEdicion(selected)}
              >
                ✏️ Editar Pokémon
              </button>

              {editando && (
                <div className="form-editar">
                  <h4>Editar Pokémon</h4>
                  <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo"
                    value={edicion.tipo}
                    onChange={(e) =>
                      setEdicion({ ...edicion, tipo: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="nivel"
                    placeholder="Nivel"
                    value={edicion.nivel}
                    onChange={(e) =>
                      setEdicion({ ...edicion, nivel: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="ataque"
                    placeholder="Ataque"
                    value={edicion.ataque}
                    onChange={(e) =>
                      setEdicion({ ...edicion, ataque: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="daño"
                    placeholder="Daño"
                    value={edicion.daño}
                    onChange={(e) =>
                      setEdicion({ ...edicion, daño: e.target.value })
                    }
                  />
                  <div className="editar-botones">
                    <button onClick={guardarEdicion}>Guardar</button>
                    <button
                      className="btn-cancelar"
                      onClick={() => setEditando(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Panel derecho */}
        <aside className="right-panel">
          <button
            className="boton-toggle"
            onClick={() => setMostrarLista(!mostrarLista)}
          >
            {mostrarLista ? "Ocultar Pokémon" : "Ver Pokémon Registrados"}
          </button>

          {mostrarLista && (
            <ul className="dex-list">
              {pokemons.map((p) => (
                <li key={p.id}>
                  <button
                    className={`dex-button ${
                      selected && p.id === selected.id ? "active" : ""
                    }`}
                    onClick={() => setSelected(p)}
                  >
                    {p.nombre}
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarPokemon(p.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <h3>Registrar Nuevo Pokémon</h3>
          <form onSubmit={agregarPokemon} className="formulario">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo"
              value={nuevo.tipo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="nivel"
              placeholder="Nivel"
              value={nuevo.nivel}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ataque"
              placeholder="Ataque"
              value={nuevo.ataque}
              onChange={handleChange}
            />
            <input
              type="text"
              name="daño"
              placeholder="Daño"
              value={nuevo.daño}
              onChange={handleChange}
            />
            <input
              type="text"
              name="imagen"
              placeholder="URL de la imagen"
              value={nuevo.imagen}
              onChange={handleChange}
            />
            <button type="submit">Agregar Pokémon</button>
          </form>
        </aside>
      </main>

      {/* Carrusel */}
      <div className="caja-carrusel">
        <h3>Pokémon Registrados</h3>
        <div className="carrusel-lineal">
          {pokemons.map((p, i) => {
            const pos = (i - indexActivo + pokemons.length) % pokemons.length;
            const offset = (pos - 2) * 160;
            const scale = pos === 2 ? 1.3 : 1;
            const opacity = pos === 2 ? 1 : 0.5;

            return (
              <div
                key={p.id}
                className="pokemon-item-lineal"
                style={{
                  transform: `translateX(${offset}px) scale(${scale})`,
                  opacity,
                  zIndex: pos === 2 ? 2 : 1,
                }}
                onClick={() => setSelected(p)}
              >
                <img src={p.imagen} alt={p.nombre} />
                <p>{p.nombre}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
