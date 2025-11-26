import React from 'react';

function App() {
  const contenedorColumnas = {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
  };

  const estiloPrimero = {
    width: '20%',
    padding: '10px',
  };

  const estiloSegundo = {
    width: '60%',
    padding: '10px',
    fontWeight: 'bold',
    border: '2px solid blue',
  };

  const estiloTercero = {
    width: '20%',
    padding: '10px',
  };

  const estiloLista = {
    listStyle: 'none',
    padding: 0,
  };

  const estiloElemento = (index) => ({
    color: (index % 3 === 0) ? 'red' : 'black', // 1, 4, 7, 10 en rojo
  });

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1 style={{ color: 'yellow' }}>
        Este es un título amarillo
        <br />
        No es rojo porque el rojo puede ser demasiado agresivo y no es verde porque el verde puede ser demasiado relajante.
      </h1>

      {/* Íconos o etiquetas */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <span>Hombre</span>
        <span>Mujer</span>
        <span>Niño</span>
        <span>Niña</span>
        <span>Caminata</span>
        <span>Escalar</span>
      </div>

      {/* Columnas */}
      <div style={contenedorColumnas}>
        <div style={estiloPrimero}>Primero</div>
        <div style={estiloSegundo}>Segundo</div>
        <div style={estiloTercero}>Tercero</div>
      </div>

      {/* Lista */}
      <ul style={estiloLista}>
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} style={estiloElemento(i)}>
            Elemento {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
