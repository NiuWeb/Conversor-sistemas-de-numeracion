import { Converter } from "./converter";

export class InputValidator {
    private input: HTMLInputElement;
    private converter: Converter;
    constructor(input: HTMLInputElement, converter: Converter) {
        this.input = input;
        this.converter = converter;
        const call = () => {
            this.validate();
        }
        this.input.addEventListener("keyup", call);
        this.input.addEventListener("keydown", call);
        this.input.addEventListener("keypress", call);
        this.input.addEventListener("change", call);
    }

    private validate(): void {
        let str: string = this.input.value.toUpperCase();
        let valid: string[] = str.split('').filter((c: string) => {
            return this.converter.symbols.indexOf(c) >= 0 || c == '.';
        });
        this.input.value = valid.join("");
        this.converter.input = this.input.value;
    }
}