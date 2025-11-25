document.addEventListener("DOMContentLoaded", () => {
  cargarPaises();
});

const listaPaises = document.getElementById("countries-list");

const modal = document.createElement("div");
modal.id = "modal";
modal.classList.add("hidden");
document.body.appendChild(modal);

async function cargarPaises() {
  try {
    const respuesta = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital"
    );
    const paises = await respuesta.json();

    paises.sort((a, b) => {
      const nombreA = a.name.common.toUpperCase();
      const nombreB = b.name.common.toUpperCase();
      return nombreA.localeCompare(nombreB);
    });

    paises.forEach((pais) => pintarPais(pais));

  } catch (error) {
    console.log("Error al cargar los países:", error);
  }
}

function pintarPais(pais) {
  const div = document.createElement("div");
  div.classList.add("country-card");

  div.innerHTML = `
        <img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}">
        <h3>${pais.name.common}</h3>
    `;

  div.addEventListener("click", () => mostrarModal(pais));

  listaPaises.appendChild(div);
}

function mostrarModal(pais) {
  modal.innerHTML = `
        <div class="modal-content">
            <button id="cerrar">X</button>
            <img src="${pais.flags.png}" class="modal-flag">
            <h2>${pais.name.common}</h2>
            <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "Sin datos"}</p>
            <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
            <p><strong>Se conduce por:</strong> ${pais.car.side === "right" ? "la derecha" : "la izquierda"}</p>
        </div>
    `;

  modal.classList.remove("hidden");

  document.getElementById("cerrar").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
