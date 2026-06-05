# API => PERSONAJES DE BLEACH

Proyecto de Personajes de Bleach. Es una aplicación web construida con React y Vite que se conecta a una API externa para listar, buscar y paginar los personajes del anime Bleach, permitiendo además guardar favoritos. Cuenta con paginado.

# CARACTERISTICAS:

Cuenta con la API de Jikan (MyAnimeList)
Filtramos por nombre y por rol, utilizando metodos como .trim() para evitar los espacios vacios.  
.some() para poder interactuar en Favoritos
.toLowerCase para llevar todo a minusculas
Math.ceil() para redondear numeros (especial en personajes)
.map() para renderizar una lista de elementos

Contamos con un control de errores y de cargado ("Cargando el Gotei 13...)

# ESTRUCTURA:
App.jsx - Principal, conectamos la API y verificamos errores. (Cuerpo).
App.css - Decoración para que se vea ultra mega piola.

Componentes:
CharacterCard.jsx - Renderizar tarjeta de personaje.
Paginado.jsx - Botones inferiores. Hacer paginas de 15 personajes c/u.
Buscador.jsx - Componente Input de busqueda.

# TECNOLOGÍAS UTILIZADAS:

React (Hooks: useState, useEffect)
-
Vite (como empaquetador/servidor de desarrollo)
-
CSS Grid y Flexbox (para el diseño limpio y el centrado del buscador)
-
API: Jikan API (v4)