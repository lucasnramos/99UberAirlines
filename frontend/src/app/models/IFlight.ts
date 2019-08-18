import { IVoo } from './IVoo';

export interface IFlight {
    origem: string;
    destino: string;
    date: string;
    voos: IVoo[];
    valorTotal?: number;
    tempoTotalVoo?: number;
}
