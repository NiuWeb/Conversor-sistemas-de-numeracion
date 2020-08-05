import { Converter } from "./converter";

export class InputValidator {
    private input: HTMLInputElement; // <input> a validar
    private converter: Converter;    // convertidor a manejar

    /**
     * Crea un nuevo validador que escuche y controle los cambios de 
     * contenido de un <input>
     * @param input El elemento <input> a validar
     * @param converter El convertidor a manejar
     */
    constructor(input: HTMLInputElement, converter: Converter) {
        this.input = input;
        this.converter = converter;

        // método de validación sin perder el this
        const call = () => {
            this.validate();
        }

        // reconocer cambios de valor en el input
        this.input.addEventListener("keyup", call);
        this.input.addEventListener("keydown", call);
        this.input.addEventListener("keypress", call);
        this.input.addEventListener("change", call);
    }
    /**
     * Limpiar caracteres inválidos
     */
    private validate(): void {
        // convertir a mayúsculas
        let str: string = this.input.value.toUpperCase();
        // buscar solo caracteres que estén en el set de símbolos del convertidor
        let valid: string[] = str.split('').filter((c: string) => {
            return this.converter.symbols.indexOf(c) >= 0 || c == '.';
        });
        // unir caracteres
        this.input.value = valid.join("");
        // establecer como valor del convertidor
        this.converter.input = this.input.value;
    }
}