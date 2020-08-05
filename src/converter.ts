export class Converter {
    private _symbols: string;
    private _mode: number;
    private _input: string = "";
    public onconvert: null|((result: string) => void) = null;
    constructor(symbols: string, mode: number) {
        this._symbols = symbols;
        this._mode = mode;
    }
    public get symbols(): string {
        return this._symbols.substring(0, this._mode);
    }
    public get mode(): number {
        return this._mode;
    }
    public get result(): string {
        return this._input;
    }
    public set input(input: string) {
        this._input = input;
    }

    public set mode(mode: number) {
        this._input = this.convert(mode);
        this.onconvert?.apply(this, [this._input]);
        this._mode = mode;
    }

    private convert(to: number): string {
        let res:string = this._input;
        let dec:number = 0;
        for(let i = res.length - 1; i >= 0; i--) {
            let val: number = res.length - 1 - i;
            let chr: string = res[i];
            let pos: number = this._symbols.indexOf(chr);
            dec += pos * this._mode ** val;
        }
        res = "";
        while(dec > 0) {
            let mod = dec % to;
            dec = Math.floor(dec/to);
            res = this._symbols[mod] + res;
        }
        return res;
    }
}