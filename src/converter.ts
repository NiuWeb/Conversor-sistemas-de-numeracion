export class Converter {
    private _symbols: string;
    private _mode: number;
    private _input: string = "";
    public onconvert: null|((result: string) => void) = null;

    /**
     * Crea un nuevo convertidor de sistemas de numeración
     * @param symbols El set de símbolos a usar como base del sistema
     * @param mode La base del sistema
     */
    constructor(symbols: string, mode: number) {
        this._symbols = symbols;
        this._mode = mode;
    }
    /**
     * Devuelve el set de símbolos VÁLIDO para la base actual del sistema
     */
    public get symbols(): string {
        return this._symbols.substring(0, this._mode);
    }
    /**
     * Obtiene la base actual del sistema
     */
    public get mode(): number {
        return this._mode;
    }
    /**
     * Obtiene el resultado de la conversión
     */
    public get result(): string {
        return this._input;
    }
    /**
     * Establece el valor a convertir
     */
    public set input(input: string) {
        this._input = input;
    }
    /**
     * Asigna la nueva base del sistema y hace la conversión
     */
    public set mode(mode: number) {
        this._input = this.convert(mode);
        this.onconvert?.apply(this, [this._input]);
        this._mode = mode;
    }
    /**
     * Convierte el número desde la base actual a la base nueva.
     * @param to Nueva base del sistema
     */
    private convert(to: number): string {
        // obtener parte entera y parte decimal
        let parts:string[] = this._input.split(/\.+/);

        // convertir parte entera
        let res:string = parts[0];
        let dec:number = 0;
        for(let i = res.length - 1; i >= 0; i--) {
            let val: number = res.length - 1 - i;
            let chr: string = res[i];
            let pos: number = this._symbols.indexOf(chr);
            dec += pos * this._mode ** val;
        }
        res = "";
        while(dec > 0) {
            let mod:number = dec % to;
            dec = Math.floor(dec/to);
            res = this._symbols[mod] + res;
        }

        //aproximar parte decimal, si existe.
        let res2:string = "";
        if(parts.length == 2) {
            dec = 0;
            res2 = parts[1];
            for(let i = 0; i < res2.length; i++) {
                let val: number = -1 - i;
                let chr: string = res2[i];
                let pos: number = this._symbols.indexOf(chr);
                dec += pos * this._mode ** val;
            }
            res2 = "";
            let approx: number = 5;
            while(approx-- > 0) {
                dec *= to;
                let int = Math.floor(dec);
                res2 += this._symbols[int];
                dec -= int;
            }
        }
        // unir parte entera con parte decimal
        return res + (res2 == "" ? "": "." + res2);
    }
}