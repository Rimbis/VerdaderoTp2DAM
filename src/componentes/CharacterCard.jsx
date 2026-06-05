import React from "react";

export default function CharacterCard({ personaje, esFav, onToggleFavorito, esSeccionFavoritos }) {
  return (
    <div className="card">
      <img src={personaje.images?.jpg?.image_url} alt={personaje.name} className="card-image" />
      
      {/* Envolvemos todo el bloque de texto*/}
      <div className="card-text">
        <h3 
          className="card-title" 
          style={{ color: esSeccionFavoritos ? "#333" : (personaje.role === "Main" ? "#d32f2f" : "#4caf50") }}
        >
          {personaje.name}
        </h3>
        
        <p className="card-role">
          {esSeccionFavoritos ? "Favorito" : `Rol: ${personaje.role}`}
        </p>
        
        <button 
          onClick={() => onToggleFavorito(personaje)} 
          className="btn"
          style={{ 
            background: esSeccionFavoritos ? "#ef5350" : (esFav ? "#ffca28" : "#2196f3"), 
            color: esSeccionFavoritos ? "#fff" : (esFav ? "#333" : "#fff"), 
          }}
        >
          {esSeccionFavoritos ? "Quitar ★" : (esFav ? "★ Favorito" : "☆ Agregar")}
        </button>
      </div>
    </div>
  );
}