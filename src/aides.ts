/**
 * Interfaz que define el estado de visualización del temporizador.
 * 
 * @interface DisplayState
 * @property {number} time - El tiempo restante en segundos.
 * @property {"Session" | "Break"} timeType - Indica si el temporizador está en modo de sesión o descanso.
 * @property {boolean} timerRunning - Indica si el temporizador está actualmente en funcionamiento.
 */
export interface DisplayState {
    time: number; // El tiempo restante en segundos.
    timeType: "Session" | "Break"; // El tipo de temporizador: sesión o descanso.
    timerRunning: boolean; // Estado del temporizador: verdadero si está en ejecución, falso de lo contrario.
}

/**
 * Formatea el tiempo en segundos a una cadena con el formato "MM:SS".
 * 
 * @function formatTime
 * @param {number} time - El tiempo en segundos a formatear.
 * @returns {string} - El tiempo formateado como una cadena en el formato "MM:SS".
 * 
 * @example
 * // Retorna "05:30"
 * formatTime(330);
 * 
 * @example
 * // Retorna "01:05"
 * formatTime(65);
 */
export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calcula los minutos.
    const seconds = time % 60; /// Calcula los minutos.
    return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
        seconds <10 ? "0" + seconds.toString(): seconds
    }`; // Devuelve el tiempo formateado.
};