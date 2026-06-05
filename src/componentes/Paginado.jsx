
import React from "react";

export default function Paginacion({ paginas, paginaActual, setPaginaActual }) {
  // Si solo hay una página o ninguna, no hace falta mostrar los botones
  if (paginas.length <= 1) return null;

  return (

    <div className="pagination-container">
      {paginas.map((numPagina) => (
        <button
          key={`pag-${numPagina}`} 
          onClick={() => setPaginaActual(numPagina)}
          className={`page-btn ${paginaActual === numPagina ? 'active' : ''}`}
        >
          {numPagina}
        </button>
      ))}
    </div>
  );
}
