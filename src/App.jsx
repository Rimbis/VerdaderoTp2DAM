import React, { useState, useEffect } from "react";
import CharacterCard from "./componentes/CharacterCard"; //iMPORTAO... Importamos las card completas de personajes
import Buscador from "./componentes/Buscador"; // Importamos el componente del buscador
import Paginacion from "./componentes/Paginado"; // Importamos el componente de la paginación
import './App.css';

export default function App() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState([]); 
  const [cargando, setCargando] = useState(true);

  const [paginas, setProxiPagina] = useState([]); // Guardará la lista de números de páginas
  const [paginaActual, setPaginaActual] = useState(1);
  const personajesPorPagina = 15; //y aca da la cantidad que debe tener

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime/269/characters") //CARGA LA API
      .then((res) => res.json())
      .then((data) => {
        setPersonajes(data.data || []);
        setCargando(false); //EXPLICAR ESTO QUE SI ES IMPORTANTE
      })
      .catch((err) => { //EN CASO DE QUE NO CONECTE AVISA, finalmente sé poner esto de errores
        console.error("Error al traer datos:", err);
        setCargando(false);
      });
  }, []);

  const personajesFiltrados = personajes.filter((p) => {
    const nombre = p.character.name.toLowerCase();
    const rol = p.role.toLowerCase();
    const termino = busqueda.toLowerCase().trim(); //El dato que busco
    return nombre.includes(termino) || rol.includes(termino); //EL .trim() para limpiar los espacios raros al escribir
  });

  useEffect(() => {
    const totalPaginas = Math.ceil(personajesFiltrados.length / personajesPorPagina); //Divide entre la cantidad de personajes y lo que queremos mostrar
    const arregloPaginas = []; //1, 2, 3, 4, 5, 6...
    
    for (let i = 1; i <= totalPaginas; i++) { //Crea un array por cada pagina
      arregloPaginas.push(i);
    }
    setProxiPagina(arregloPaginas);
    setPaginaActual(1); // Resetea a la primera página si el usuario busca algo nuevo
  }, [busqueda, personajes]); //solo cambia cuando se cambia de busqueda de personaje


  // Calcula el índice final del último personaje para la página actual
  const indiceUltimoPersonaje = paginaActual * personajesPorPagina; 

  // Calcula el índice inicial restando la cantidad de personajes por página
  const indicePrimerPersonaje = indiceUltimoPersonaje - personajesPorPagina;

  // Corta el array original para obtener solo los personajes que se deben mostrar en esta página
  const personajesPaginados = personajesFiltrados.slice(indicePrimerPersonaje, indiceUltimoPersonaje);


  const toggleFavorito = (personaje) => { //agregar o eliminar fav
    const yaEsFavorito = favoritos.some((fav) => fav.mal_id === personaje.mal_id); //verifica si al menos uno cumple con ser fav
    if (yaEsFavorito) {
      setFavoritos(favoritos => favoritos.filter((fav) => fav.mal_id !== personaje.mal_id)); //si ya esta en la lista lo elimina
    } else {
      setFavoritos([...favoritos, personaje]); //si no estaba, lo integra
    }
  };

  if (cargando) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Cargando el Gotei 13...</h2>;

  return (
    <div className="container">
      <h1 className="titulo">Bleach Personajes</h1>

      {/* BUSCADOR - Ahora mandado a freir churros en componentes */}
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
      
      <hr></hr>

      {/* SECCIÓN DE FAVORITOS */}
      {favoritos.length > 0 && (
        <section className="fav-section">
          <h2 style={{color: "#1565c0", marginTop: 0, marginBottom: "20px"}}>FAVORITOS</h2>
          <div className="character-grid">
            {favoritos.map((fav) => (
              <CharacterCard 
                key={`fav-${fav.mal_id}`}
                personaje={fav}
                esFav={true}
                onToggleFavorito={toggleFavorito}
                esSeccionFavoritos={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* LISTA PRINCIPAL DE PERSONAJES */}
      <section>
        <h2 style={{marginBottom: "20px", color: "#ff0000"}}>Todos los Personajes</h2>
        <hr></hr>

        {personajesFiltrados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No se encontraron personajes para "{busqueda}"</p>
        ) : (
          <>
            {/* Renderizamos personajes de la página actual con todos sus bonitos datitos */}
            <div className="character-grid">
              {personajesPaginados.map((p) => {
                const charData = {
                  mal_id: p.character.mal_id,
                  name: p.character.name,
                  images: p.character.images,
                  role: p.role
                };

                const esFav = favoritos.some((fav) => fav.mal_id === charData.mal_id);

                return (
                  <CharacterCard 
                    key={charData.mal_id}
                    personaje={charData}
                    esFav={esFav}
                    onToggleFavorito={toggleFavorito}
                    esSeccionFavoritos={false}
                  />
                );
              })}
            </div>

            {/* CONTROLADOR DE PÁGINA - y la otra parte la meti en paginado.jsx*/}
            <Paginacion 
              paginas={paginas} 
              paginaActual={paginaActual} 
              setPaginaActual={setPaginaActual} 
            />
          </>
        )}
      </section>
    </div>
  );
}