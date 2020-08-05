import { Converter } from "./converter";

export class ModeSelector {
    private list: NodeListOf<HTMLButtonElement>;
    private converter: Converter;
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
            
            node.addEventListener("click", callback);
        }
    }

    private getNodeValue(node: HTMLButtonElement): number|null {
        let val: string|null = node.getAttribute("value");
        if(val == null) {
            return null;
        }
        return parseInt(val);
    }
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