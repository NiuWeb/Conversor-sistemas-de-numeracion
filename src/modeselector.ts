import { Converter } from "./converter";

export class ModeSelector {
    private list: NodeListOf<HTMLButtonElement>;
    private converter: Converter;
    /**
     * Crea un selector de base numérica
     * @param list La lista de botones con sus respectivos atributos value="base"
     * @param converter El convertidor a usar
     */
    constructor(list: NodeListOf<HTMLButtonElement>, converter: Converter) {
        this.list = list;
        this.converter = converter;

        for(let i = 0; i < this.list.length; i++) {
            const node: HTMLButtonElement = this.list[i];
            const value: number|null = this.getNodeValue(node);

            const callback = () => {
                this.selectMode(node);
            };
            if(value == this.converter.mode) {
                callback();
            }
            // seleccionar botón actual al clickearlo
            node.addEventListener("click", callback);
        }
    }
    // Obtener la base numérica del botón
    private getNodeValue(node: HTMLButtonElement): number|null {
        let val: string|null = node.getAttribute("value");
        if(val == null) {
            return null;
        }
        return parseInt(val);
    }
    /**
     * Selecciona la base numérica del botón dado.
     * @param node El botón cuya base seleccionar
     */
    private selectMode(node: HTMLButtonElement): void {
        const value:number|null = this.getNodeValue(node);
        if(value == null) {
            return;
        }
        this.converter.mode = value;
        for(let i = 0; i < this.list.length; i++) {
            const _node: HTMLButtonElement = this.list[i];
            if(node == _node) {
                _node.setAttribute("class", "mode selected");
            }
            else {
                _node.setAttribute("class", "mode");
            }
        }
    }
}