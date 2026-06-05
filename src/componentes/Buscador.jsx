import React from "react";
//destrectu... desestructuración. CUALQUIERA
export default function Buscador({ busqueda, setBusqueda }) {
  return (
    <div className="todo-container">
      <input
        type="text"
        placeholder="Buscar personaje (ej: Ichigo)..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="todo-input"
      />
    </div>
  );
}
