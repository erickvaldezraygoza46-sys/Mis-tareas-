import React from "react";
import "./Pokedex.css";

function Pokedex() {
  return (
    <div className="container" role="application" aria-label="Pokedex estática responsiva">
      <header className="pokedex-header" role="banner">
        <div className="brand">
          <div className="logo" aria-hidden>
            PK
          </div>
          <div>
            <h1>Pokedex - Interfaz</h1>
            <p className="lead">
              Ejercicio de front-end — HTML semántico, CSS responsivo y JS básico
            </p>
          </div>
        </div>

        <form
          className="search"
          role="search"
          aria-label="Buscar Pokemon"
          onSubmit={(e) => e.preventDefault()}
        >
          <input id="q" type="search" placeholder="Buscar por nombre o id" aria-label="Buscar Pokemon" />
          <button aria-label="Buscar">🔍</button>
        </form>
      </header>

      <main className="pokedex-main" role="main">
        <section className="card left" aria-labelledby="pokemon-name">
          <figure className="sprite" aria-hidden>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pikachu sprite oficial"
            />
          </figure>

          <div className="basic-info">
            <div className="name-id">
              <div id="pokemon-name" className="name">
                Pikachu
              </div>
              <div className="id">#025 — Ratón Eléctrico</div>
            </div>

            <div className="types" aria-hidden>
              <div className="type electric">Eléctrico</div>
              <div className="type normal">Normal</div>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              HP <span>35</span>
              <div className="bar">
                <i style={{ width: "30%" }}></i>
              </div>
            </div>
            <div className="stat">
              Ataque <span>55</span>
              <div className="bar">
                <i style={{ width: "55%" }}></i>
              </div>
            </div>
            <div className="stat">
              Defensa <span>40</span>
              <div className="bar">
                <i style={{ width: "40%" }}></i>
              </div>
            </div>
            <div className="stat">
              Velocidad <span>90</span>
              <div className="bar">
                <i style={{ width: "90%" }}></i>
              </div>
            </div>
          </div>
        </section>

        <aside className="card right" aria-labelledby="descripcion-titulo">
          <h2 id="descripcion-titulo">Descripción</h2>
          <p className="description">
            Pikachu almacena electricidad en las bolsas de sus mejillas. Cuando concentra demasiada, la sacude de la cola
            en forma de chispas para eliminarla. Se le encuentra en zonas boscosas y es muy querido por los entrenadores
            por su energía y lealtad.
          </p>

          <div className="attributes" role="list">
            <div className="attr" role="listitem">
              <b>Altura</b>
              <span>0.4 m</span>
            </div>
            <div className="attr" role="listitem">
              <b>Peso</b>
              <span>6.0 kg</span>
            </div>
            <div className="attr" role="listitem">
              <b>Habilidad</b>
              <span>Electricidad estática</span>
            </div>
            <div className="attr" role="listitem">
              <b>Color</b>
              <span>Amarillo</span>
            </div>
            <div className="attr" role="listitem">
              <b>Generación</b>
              <span>Primera</span>
            </div>
            <div className="attr" role="listitem">
              <b>Hábitat</b>
              <span>Bosque</span>
            </div>
          </div>

          <div className="evolution">
            <h3>Evolución</h3>
            <p className="description">
              Pichu → <strong>Pikachu</strong> → Raichu
            </p>
          </div>
        </aside>
      </main>

      <footer className="pokedex-footer" role="contentinfo" aria-label="Pokemons list">
        {[
          "#001 Bulbasaur",
          "#004 Charmander",
          "#007 Squirtle",
          "#025 Pikachu",
          "#039 Jigglypuff",
          "#133 Eevee",
          "#150 Mewtwo",
          "#151 Mew",
        ].map((poke) => (
          <button
            key={poke}
            className="poke-btn"
            aria-pressed="false"
            onClick={(e) => {
              document.querySelectorAll(".poke-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
              e.target.setAttribute("aria-pressed", "true");
            }}
          >
            {poke}
          </button>
        ))}
      </footer>
    </div>
  );
}

export default Pokedex;