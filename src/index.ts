import {ModeSelector} from "./modeselector"
import { Converter } from "./converter";
import { InputValidator } from "./inputvalidator";

// Lista de botones para cambiar base del sistema
const modes: NodeListOf<HTMLButtonElement> = document.querySelectorAll("#mode-list .mode");
// Entrada de número a convertir
const input: HTMLInputElement|null = document.getElementById("input") as HTMLInputElement;

// Convertidor de números, con la secuencia de caracteres alfanumérica (16) y
// base decimal por defecto.
const converter: Converter = new Converter("0123456789ABCDEF", 10);
new ModeSelector(modes, converter);   // Iniciar selección de modos
new InputValidator(input, converter); // Iniciar validación de datos del input

// Cambiar valor del input cuando el convertidor realice una operación
converter.onconvert = (result: string) => {
    input.value = result;
};