import {FaArrowDown, FaArrowUp} from "react-icons/fa"

/**
 * Propiedades del componente TimerSetting.
 *
 * @interface TimerSetterProps
 * @property {number} time - El tiempo actual configurado para el temporizador.
 * @property {(time: number) => void} setTime - Función para actualizar el tiempo del temporizador.
 * @property {number} min - El valor mínimo permitido para el tiempo.
 * @property {number} max - El valor máximo permitido para el tiempo.
 * @property {number} interval - El intervalo de tiempo para incrementar o decrementar.
 * @property {"break" | "session"} type - Indica si el temporizador es de descanso o de sesión.
 */
interface TimerSetterProps {
    time: number; // El tiempo actual configurado para el temporizador.
    setTime: (time: number) => void; // Función para actualizar el tiempo del temporizador.
    min: number; // El valor mínimo permitido para el tiempo.
    max: number; // El valor máximo permitido para el tiempo.
    interval: number; // El intervalo de tiempo para incrementar o decrementar.
    type: "break" | "session"; // Indica si el temporizador es de descanso o de sesión.
}

/**
 * Componente TimerSetting que permite ajustar el tiempo de un temporizador.
 *
 * @component
 * @param {TimerSetterProps} props - Las propiedades del componente TimerSetting.
 * @returns {JSX.Element} - Un elemento JSX que representa el componente TimerSetting.
 *
 * @example
 * // Ejemplo de uso del componente TimerSetting
 * <TimerSetting 
 *     time={300}
 *     setTime={setTimeFunction}
 *     min={60}
 *     max={3600}
 *     interval={60}
 *     type="session"
 * />
 */
const TimerSetting: React.FC<TimerSetterProps> = ({
    // El tiempo actual del temporizador, que se pasa como prop.
    // La función para actualizar el tiempo del temporizador, que se pasa como prop.
    // El tiempo mínimo permitido, que se pasa como prop.
    // El tiempo máximo permitido, que se pasa como prop.
    // El intervalo de tiempo para aumentar o disminuir el temporizador, que se pasa como prop.
    // El tipo de temporizador, que puede ser "break" o "session", que se pasa como prop.
    time, setTime, min, max, interval, type,
}) => {
    
  return (
    <div className="text-center mb-3">
        <button 
        className="btn btn-danger" 
        onClick={() => (time > min ? setTime(time-interval) : null)} // Evento al hacer clic que disminuye el tiempo si no está en el mínimo. 
        id = {`${type}-decrement`}> {/* ID único para este botón, basado en el tipo de temporizador. */}
            <FaArrowDown />
        </button>
        <span id={`${type}-length`} // ID único para el span, basado en el tipo de temporizador.
         className="mx-3">{time / interval}</span> {/* Muestra el tiempo actual dividido por el intervalo para visualizar el ajuste. */}
        <button className="btn btn-success"
         onClick={() => (time < max ? setTime(time+interval) : null)} // Evento al hacer clic que aumenta el tiempo si no está en el máximo.
         id = {`${type}-increment`}> {/* ID único para este botón, basado en el tipo de temporizador. */}
            <FaArrowUp />
        </button>
    </div>
  )
}

export default TimerSetting // Exporta el componente TimerSetting para que pueda ser utilizado en App.tsx.