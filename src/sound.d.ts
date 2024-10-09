/**
 * Declaración de un módulo para manejar archivos de audio en formato MP3.
 * 
 * Esto permite que TypeScript reconozca los archivos MP3 importados en el proyecto
 * como módulos y los trate como cadenas que representan la ruta del archivo.
 * 
 * @module '*.mp3'
 * 
 * @example
 * // Ejemplo de uso en un archivo TypeScript
 * import soundFile from './audio/mySound.mp3';
 * 
 * // `soundFile` ahora contendrá la ruta del archivo MP3 como una cadena.
 */
declare module '*.mp3' {
    const src: string; // Define `src` como una constante de tipo string.
    export default src; // Exporta `src` como la exportación predeterminada del módulo.
  }
  