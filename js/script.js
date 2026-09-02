const searchInput = document.getElementById("searchInput");
const mangaCards = document.querySelectorAll(".library-card");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase().trim();

        mangaCards.forEach(function (card) {

            const mangaName = card
                .querySelector("h2")
                .textContent
                .toLowerCase();

            if (mangaName.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}

const latestChapters = document.getElementById("latestChapters");

if (latestChapters) {

    const chapters = [
        {
            manga: "El Veredicto de Asura",
            chapter: "Capítulo 3",
            link: "mangas/capitulos/capitulo-3.html",
            image: "images/asura.jpg"
        },
        {
            manga: "El Veredicto de Asura",
            chapter: "Capítulo 2",
            link: "mangas/capitulos/capitulo-2.html",
            image: "images/asura.jpg"
        },
        {
            manga: "El Veredicto de Asura",
            chapter: "Capítulo 1",
            link: "mangas/capitulos/capitulo-1.html",
            image: "images/asura.jpg"
        }
    ];

    chapters.forEach(function (chapter) {

        const chapterElement = document.createElement("div");

        chapterElement.className = "latest-chapter";

        chapterElement.innerHTML = `
            <img src="${chapter.image}" alt="${chapter.manga}">
            
            <div class="latest-chapter-info">
                <strong>${chapter.manga}</strong>
                <span>${chapter.chapter}</span>
            </div>

            <a href="${chapter.link}">
                LEER →
            </a>
        `;

        latestChapters.appendChild(chapterElement);

    });
}

// GENERADOR AUTOMÁTICO DE PÁGINAS

const readerPages = document.querySelector(".reader-pages");

if (readerPages) {

    const manga = readerPages.dataset.manga;
    const capitulo = readerPages.dataset.capitulo;
    const totalPaginas = Number(readerPages.dataset.paginas);

    const paginasJpg = readerPages.dataset.jpg
        ? readerPages.dataset.jpg.split(",").map(Number)
        : [];

    for (let numero = 1; numero <= totalPaginas; numero++) {

        const pagina = String(numero).padStart(2, "0");

        const extension = paginasJpg.includes(numero)
            ? "jpg"
            : "png";

        const imagen = document.createElement("img");

        imagen.src =
            `../../images/${manga}/${capitulo}/pagina-${pagina}.${extension}`;

        imagen.alt = `Página ${numero}`;

        readerPages.appendChild(imagen);
    }
}

// BUSCADOR DE INICIO

const searchButton = document.getElementById("searchButton");

if (searchButton && searchInput) {

    const mangasDisponibles = [
        {
            nombre: "El Veredicto de Asura",
            ruta: "mangas/veredicto-de-asura.html"
        }
    ];

    function buscarDesdeInicio() {

        const texto = searchInput.value
            .toLowerCase()
            .trim();

        if (texto === "") {
            return;
        }

        const resultados = mangasDisponibles.filter(function(manga) {

            return manga.nombre
                .toLowerCase()
                .includes(texto);

        });

        if (resultados.length === 0) {

            alert("No se encontró ningún manga.");
            return;

        }

        if (resultados.length === 1) {

            window.location.href = resultados[0].ruta;
            return;

        }

        let mensaje = "Se encontraron estos mangas:\n\n";

        resultados.forEach(function(manga, indice) {

            mensaje += `${indice + 1}. ${manga.nombre}\n`;

        });

        const seleccion = prompt(
            mensaje + "\nEscribe el número del manga que quieres abrir:"
        );

        const numero = Number(seleccion);

        if (
            numero >= 1 &&
            numero <= resultados.length
        ) {

            window.location.href = resultados[numero - 1].ruta;

        }

    }

    searchButton.addEventListener("click", buscarDesdeInicio);

    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            buscarDesdeInicio();
        }

    });

}