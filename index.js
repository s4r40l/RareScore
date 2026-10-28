const form = document.getElementById("rarezaForm");
const resultado = document.getElementById("resultado");
const porcentaje = document.getElementById("porcentaje");
const barraRareza = document.getElementById("barraRareza");
const descripcion = document.getElementById("descripcion");
const rasgosDestacados = document.getElementById("rasgosDestacados");

const rarezas = {
    ojos: {
        marrones: 70,
        azules: 8,
        verdes: 2,
        grises: 1,
        ambar: 0.5
    },

    pelo: {
        negro: 40,
        castano: 45,
        rubio: 13,
        pelirrojo: 2
    },

    cabello: {
        liso: 45,
        ondulado: 35,
        rizado: 15,
        afro: 5
    },

    mano: {
        diestra: 89,
        zurda: 10,
        ambidiestra: 1
    },

    hoyuelos: {
        si: 20,
        no: 100
    },

    sangre: {
        "o+": 38,
        "o-": 7,
        "a+": 27,
        "a-": 6,
        "b+": 9,
        "b-": 2,
        "ab+": 4,
        "ab-": 1
    }
};

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const datos = {
        ojos: document.getElementById("colorOjos").value,
        pelo: document.getElementById("pelo").value,
        cabello: document.getElementById("cabello").value,
        mano: document.getElementById("mano").value,
        hoyuelos: document.getElementById("hoyuelos").value,
        sangre: document.getElementById("sangre").value
    };

    const hayCamposVacios = Object.values(datos).some(
        valor => valor === ""
    );

    if (hayCamposVacios) {
        alert("Debes responder todas las preguntas.");
        return;
    }

    let puntuacionTotal = 0;
    let rasgosRaros = [];
    let rasgosCalculados = 0;

    for (const categoria in datos) {

        const respuesta = datos[categoria];

        if (categoria === "sangre" && respuesta === "NS") {
            continue;
        }

        const frecuencia = rarezas[categoria][respuesta];
        const rareza = 100 - frecuencia;

        puntuacionTotal += rareza;
        rasgosCalculados++;

        if (frecuencia <= 20) {
            rasgosRaros.push({
                nombre: obtenerNombreRasgo(categoria, respuesta),
                frecuencia
            });
        }
    }

    let porcentajeFinal = Math.round(
        puntuacionTotal / rasgosCalculados
    );

    porcentajeFinal = Math.max(0, Math.min(100, porcentajeFinal));

    mostrarResultado(
        porcentajeFinal,
        rasgosRaros
    );

});

function mostrarResultado(
    porcentajeRareza,
    rasgosRaros
) {

    resultado.classList.remove("oculto");

    porcentaje.textContent =
        `${porcentajeRareza}%`;

    barraRareza.style.width =
        `${porcentajeRareza}%`;

    descripcion.textContent =
        obtenerDescripcion(porcentajeRareza);

    rasgosDestacados.innerHTML = "";

    rasgosRaros.sort(
        (a, b) => a.frecuencia - b.frecuencia
    );

    if (rasgosRaros.length === 0) {

        rasgosDestacados.innerHTML = `
            <div>
                No tienes ningún rasgo especialmente raro,
                pero tu combinación sigue siendo única.
            </div>
        `;

    } else {

        rasgosRaros.forEach(rasgo => {

            const div = document.createElement("div");

            div.innerHTML = `
                ✨ <strong>${rasgo.nombre}</strong>
                <br>
                Solo lo tiene aproximadamente el
                ${rasgo.frecuencia}% de la población.
            `;

            rasgosDestacados.appendChild(div);

        });

    }

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

function obtenerDescripcion(porcentaje) {

    if (porcentaje <= 20) {
        return "🙂 Tus rasgos son muy comunes dentro de la población mundial.";
    }

    if (porcentaje <= 40) {
        return "😊 Tienes algunas características poco frecuentes, aunque la mayoría son habituales.";
    }

    if (porcentaje <= 60) {
        return "😎 Tu combinación de rasgos es bastante interesante.";
    }

    if (porcentaje <= 80) {
        return "🤩 Posees varios rasgos poco habituales que aumentan tu nivel de rareza.";
    }

    if (porcentaje <= 95) {
        return "🦄 Eres realmente raro. Tus características no son nada comunes.";
    }

    return "💎 ¡Increíble! Eres una auténtica joya genética y tu combinación de rasgos es extremadamente poco frecuente.";
}

function obtenerNombreRasgo(
    categoria,
    valor
) {

    const nombres = {

        ojos: {
            marrones: "Ojos marrones",
            azules: "Ojos azules",
            verdes: "Ojos verdes",
            grises: "Ojos grises",
            ambar: "Ojos ámbar"
        },

        pelo: {
            negro: "Pelo negro",
            castano: "Pelo castaño",
            rubio: "Pelo rubio",
            pelirrojo: "Pelo pelirrojo"
        },

        cabello: {
            liso: "Cabello liso",
            ondulado: "Cabello ondulado",
            rizado: "Cabello rizado",
            afro: "Cabello muy rizado"
        },

        mano: {
            diestra: "Persona diestra",
            zurda: "Persona zurda",
            ambidiestra: "Persona ambidiestra"
        },

        hoyuelos: {
            si: "Tiene hoyuelos",
            no: "No tiene hoyuelos"
        },

        sangre: {
            "o+": "Grupo O+",
            "o-": "Grupo O-",
            "a+": "Grupo A+",
            "a-": "Grupo A-",
            "b+": "Grupo B+",
            "b-": "Grupo B-",
            "ab+": "Grupo AB+",
            "ab-": "Grupo AB-"
        }

    };

    return nombres[categoria][valor];

}