import { DisplayState, formatTime } from "./aides";
import { FaPause, FaPlay, FaUndo } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Propiedades del componente Display.
 *
 * @interface DisplayProps
 * @property {DisplayState} displayState - Estado actual del temporizador que incluye el tiempo restante, tipo de temporizador y estado de ejecución.
 * @property {() => void} reset - Función para reiniciar el temporizador.
 * @property {(displayState: DisplayState) => void} startStop - Función para iniciar o detener el temporizador.
 */
interface DisplayProps {
    displayState: DisplayState; // Estado actual del temporizador, que se pasa como prop.
    reset: () => void; // Función que se ejecuta para reiniciar el temporizador.
    startStop: (displayState: DisplayState) => void; // Función que se ejecuta para iniciar o detener el temporizador.
}

/**
 * Componente Display que muestra el estado del temporizador y controla su ejecución.
 *
 * @component
 * @param {DisplayProps} props - Las propiedades del componente Display.
 * @returns {JSX.Element} - Un elemento JSX que representa el componente Display.
 *
 * @example
 * // Ejemplo de uso del componente Display
 * <Display 
 *     displayState={currentDisplayState}
 *     reset={resetTimer}
 *     startStop={toggleTimer}
 * />
 */
const Display: React.FC<DisplayProps> = ({
    // El estado del temporizador, que incluye tiempo, tipo y si está en ejecución.
    // Función para reiniciar el temporizador.
    // Función para iniciar o detener el temporizador.
    displayState, reset, startStop,
}) => {
  return (
    <div className="display">
        <h4 id="timer-label">{displayState.timeType}</h4> {/* Muestra el tipo de temporizador (Sesión o Descanso). */}
        <span id="time-left" // ID para el elemento que muestra el tiempo restante.
            style={{color: `${displayState.timerRunning ? "red" : "white"}`}} // Cambia el color del texto según si el temporizador está en ejecución o no.
            > 
            {formatTime(displayState.time)} {/* Formatea y muestra el tiempo restante utilizando la función formatTime. */}
        </span>
        <div className="mt-3">
            <button id = "start_stop" // ID para el botón de inicio/detención.
                className="btn btn-primary" 
                onClick={() => startStop(displayState)} //Evento al hacer clic que inicia o detiene el temporizador.
                >
                {displayState.timerRunning ? <FaPause /> : <FaPlay />} {/* Muestra el ícono de pausa si el temporizador está en ejecución, de lo contrario muestra el ícono de reproducción. */}
            </button>
            <button id="reset"// ID para el botón de reinicio.
                className="btn btn-secondary" 
                onClick={reset} // Evento al hacer clic que reinicia el temporizador.
                > 
                <FaUndo />
            </button>
        </div>
    </div>
  )
}

export default Display // Exporta el componente Display para que pueda ser utilizado en App.tsx