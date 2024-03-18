const reservados = []
let reserva = false
const cantDias = 5
const minutosPuntual = "00"
const minutosMedia = "30"
let horas = []

/**
 * Mapeo para los dias de la semana
 * @returns dias
 */
const mapeoDias = () => {
    let dias = {}
    for (i = 0; i < cantDias; i++) {
        switch (i) {
            case 0: { dias['lunes'] = i; break; }
            case 1: { dias['martes'] = i; break; }
            case 2: { dias['miercoles'] = i; break; }
            case 3: { dias['jueves'] = i; break; }
            case 4: { dias['viernes'] = i; break; }
            default: break;
        }
    }
    return dias;
}

const getDias = mapeoDias();

/**
 * Carga las horas disponibles
 * @returns 
 */
const _getHoras = () => {
    for (i = 10; i < 20; i++) {
        horas.push({ hora: i, minutos: minutosPuntual });
        horas.push({ hora: i, minutos: minutosMedia });
    }
    return horas
}

const totalHoras = _getHoras()

/**
 * Carga los turnos disponibles
 * @returns turnos
 */
const _cargarTurnos = () => {
    let turnos = {}
    for (i = 0; i < cantDias; i++) {
        turnos[i] = [...horas]
    }
    return turnos
}

const totalTurnos = _cargarTurnos()

/**
 * Reserva el turno dado un dia y una hora
 * @param {*} dia 
 * @param {*} hora 
 */
const _reservarTurno = (dia, hora) => {
    reserva = true
    reservados.push({ dia, hora })
    alert("Gracias por reservar el turno el dia " + dia + " a las " + hora)
}

/**
 * Busca el dia ingresado por el usuario
 * @param {*} diaBuscado 
 * @returns 
 */
const _buscarDia = (diaBuscado) => {
    for (let d in getDias) {
        if (`${d}` == diaBuscado) {
            return true
        }
    }
    return false
}

/**
 * Busca la hora ingresada por el usuario
 * @param {*} dia 
 * @param {*} hora 
 * @returns 
 */
const _buscarHora = (dia, hora) => {
    let tiempoSeparado = hora.split(":");
    let h = tiempoSeparado[0];
    let minutos = tiempoSeparado[1];
    let d = getDias[dia]
    for (let t in totalTurnos) {
        if (t == d) {
            for (let i = 0; i < totalTurnos[t].length; i++) {
                //console.log(`${t}: ${totalTurnos[t][i]['hora']}:${totalTurnos[t][i]['minutos']} `);
                if (totalTurnos[t][i]['hora'] == h && totalTurnos[t][i]['minutos'] == minutos) {
                    return true
                }
            }
        }
    }
    return false
}

/**
 * Funcion para finalizar la simulacion
 */
const _adios = () => {
    alert("Nos vemos la proxima")
}

/**
 * Solicita al usuario el horario del turno
 * @param {*} dia 
 */
const _mostrarHorarios = (dia) => {
    let hora = prompt("¿A que hora quieres el turno? Los horarios son a partir de las 10:00, hasta las 20:00  y se dan cada media hora")
    let hay = _buscarHora(dia, hora)
    if (hay) {
        _reservarTurno(dia, hora)
    } else {
        alert("No hay turno en ese horario")
        let otraHora = confirm("¿Quieres ingresar otro horario?")
        if (otraHora) {
            _mostrarHorarios(dia)
        } else {
            let otroDia = confirm("¿Quieres ingresar otro dia?")
            if (otroDia) {
                _dia()
            } else {
                _adios()
            }
        }
    }

}

/**
 * funcion que solicita el dia al usuario y comienza a buscar los turnos
 */
const _dia = () => {
    let dia = prompt("Ingresa el dia que quieres el turno")
    dia = dia.toLowerCase()
    if (_buscarDia(dia)) {
        _mostrarHorarios(dia)
    } else {
        let resp = confirm("No hay turnos para ese dia, ¿queres reservar un turno otro dia?")
        if (resp) {
            _dia()
        } else
            _adios()
    }
}

if (!reserva) {
    alert("Bienvenido al sitio de reservas de turnos para la barberia");
    let nombre = prompt("Ingresa tu nombre")
    let resp = confirm("¿Queres reservar un turno " + nombre + "?")
    if (resp) {
        _dia()
    } else {
        _adios()
    }
}