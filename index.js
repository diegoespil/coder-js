let turnos = {
    "lunes": ["10", "10:30", "11:00"]
};

const reservados = []

alert("Bienvenido al sitio de reservas de turnos para la barberia");
const nombre = prompt("Ingresa tu nombre")

const _reservarTurno = (dia, hora) => {
    console.log(dia + " " + hora);
}

const _mostrarTurnos = () => {
    for (let dia of turnos) {
        const resp = confirm("Hay turnos disponibles el dia " + dia + ", ¿queres reservar en este dia?")
        if (resp) {
            const horas = turnos[dia]
            for (i = 0; i < horas.length; i++) {
                resp = confirm("Turno disponible el " + dia + " a las " + horas[i] + ", queres reservarlo?")
                _reservarTurno(dia, horas[i])
            }
        }
    }
}

const _adios = () => {
    alert("Nos vemos la proxima")
}

const resp = confirm("¿Queres reservar un turno " + nombre + "?")
if (resp) {
    _mostrarTurnos()
} else {
    _adios()
}



