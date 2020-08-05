import {ModeSelector} from "./modeselector"
import { Converter } from "./converter";
import { InputValidator } from "./inputvalidator";


const modes: NodeListOf<HTMLButtonElement> = document.querySelectorAll("#mode-list .mode");
const input: HTMLInputElement|null = document.getElementById("input") as HTMLInputElement;

const converter: Converter = new Converter("0123456789ABCDEF", 10);
new ModeSelector(modes, converter);
new InputValidator(input, converter);

converter.onconvert = (result: string) => {
    input.value = result;
};