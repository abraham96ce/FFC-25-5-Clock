import { useEffect, useState } from 'react';
import TimerSetting from './TimerSetting';
import Display from './Display';
import AlarmSound from './assets/AlarmSound.mp3';
import { DisplayState } from './aides';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Definiciones de tiempo por defecto y límites
const defaultBreakTime = 5 * 60; // Tiempo de descanso por defecto (5 minutos en segundos).
const defaultSessionTime = 25 * 60; // Tiempo de sesión por defecto (25 minutos en segundos).
const min = 60; // Tiempo mínimo en segundos (1 minuto).
const max = 60 * 60; // Tiempo máximo en segundos (60 minutos).
const interval = 60; // Definiciones de tiempo por defecto y límites


/**
 * Componente principal de la aplicación que maneja el temporizador.
 *
 * @component
 * @returns {JSX.Element} - Un elemento JSX que representa el componente App.
 */
function App() {
  // Estado para el tiempo de descanso y sesión
  const[breakTime, setBreakTime] = useState(defaultBreakTime); // Estado que guarda el tiempo de descanso.
  const[sessionTime, setSessionTime] = useState(defaultSessionTime); // Estado que guarda el tiempo de sesión.
  const[displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  }); // Estado para el temporizador que incluye tiempo restante, tipo y estado de ejecución
  
  // Efecto para manejar el temporizador
useEffect(() => {
  let timerID: number; // Identificador del temporizador.
  if (!displayState.timerRunning) return; // Si el temporizador no está en ejecución, no hace nada.
  timerID = window.setInterval(decrementDisplay, 1000); // Inicia el temporizador.
  
  return () => {
    window.clearInterval(timerID);
  }; // Limpia el intervalo al desmontar o detener el temporizador.

}, [displayState.timerRunning]);

  // Efecto para manejar el sonido de la alarma cuando el tiempo llega a 0.
  useEffect(() => {
    // Reproduce el sonido de alarma cuando el tiempo llega a 0.
    if (displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 0; // Reinicia el sonido de alarma.
      audio.play().catch((err) => console.log(err)); // Reproduce el sonido de alarma.
  
      // Cambia el estado al tipo de temporizador opuesto (sesión o descanso) después de un segundo.
      setTimeout(() => {
        setDisplayState((prev) => {
          const newTimeType = prev.timeType === "Session" ? "Break" : "Session";
          const newTime = newTimeType === "Session" ? sessionTime : breakTime;
  
          return {
            ...prev,
            timeType: newTimeType,
            time: newTime,
          };
        });
      }, 1000); // Asegura que el 00:00 se muestre durante 1 segundo
    }
  }, [displayState.time, breakTime, sessionTime]);
  
  // Resetea el temporizador a los valores por defecto.
  const reset = () => {
    setBreakTime(defaultBreakTime); // Restablece el tiempo de descanso a su valor por defecto.
    setSessionTime(defaultSessionTime); // Restablece el tiempo de sesión a su valor por defecto.
    setDisplayState({
      time: defaultSessionTime, // Restablece el tiempo mostrado a la duración de la sesión.
      timeType: "Session", // Establece el tipo de temporizador a "Session".
      timerRunning: false, // Detiene el temporizador.
    });
    
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause(); // Detiene el sonido de alarma.
    audio.currentTime = 0; // Reinicia el sonido de alarma.
  };  
  
   // Inicia o detiene el temporizador.
  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning, // Cambia el estado de ejecución del temporizador.
    }));
  }
  
  // Cambia el tiempo de descanso si el temporizador no está en ejecución.
  const changeBreakTime = (time: number) => {
    if(displayState.timerRunning) return; // No permite cambiar el tiempo si el temporizador está en ejecución.
    setBreakTime(time); // Establece el nuevo tiempo de descanso.
  }
  
  // Cambia el tiempo de sesión y resetea el temporizador.
  const changeSessionTime = (time: number) => {
    if(displayState.timerRunning) return; // No permite cambiar el tiempo si el temporizador está en ejecución.
    setSessionTime(time); // Establece el nuevo tiempo de sesión.
    setDisplayState({
      time: time, // Establece el tiempo mostrado a la nueva duración de la sesión.
      timeType: "Session", // Establece el tipo de temporizador a "Session".
      timerRunning: false, // Detiene el temporizador.
    })
  }

  // Decrementa el tiempo del temporizador en 1 segundo.
  const decrementDisplay = () => {
    setDisplayState((prev) => {
      if (prev.time <= 0) {
        return prev; // No permite que el temporizador baje de 0
      }
      return {
        ...prev,
        time: prev.time - 1, // Decrementa el tiempo en 1 segundo.
      };
    });
  };
  
  
  return (
    <div className="clock text-center mt-5">
      <h1 className="mb-4">25 + 5 Clock</h1>
      <div className="setters">
        <div className="break">
          <h4 className="mb-4" id="break-label">Break Length</h4>
          <TimerSetting 
            time = {breakTime}
            setTime = {changeBreakTime}
            min = {min}
            max = {max}
            interval = {interval}
            type = "break"
          />
        </div>
        <div className="session col-md-6">
          <h4 id="session-label">Session Length</h4>
          <TimerSetting 
            time = {sessionTime}
            setTime = {changeSessionTime}
            min = {min}
            max = {max}
            interval = {interval}
            type = "session"
          />
        </div>
      </div>
      <Display 
        displayState = {displayState}
        reset = {reset}
        startStop = {startStop}
      />
      <audio id = "beep" src={AlarmSound} /> {/* Componente de audio para el sonido de alarma */}
    </div>
  );
}

export default App;
