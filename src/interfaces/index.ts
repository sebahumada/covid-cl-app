export interface CovidResumen {
    UpdatedAt: string;
    Data:      ItemCantidad[];
}

export interface ItemCantidad {
    Item:     string;
    Cantidad: FechaValor[];
}

export interface FechaValor {
    Fecha: string;
    Valor: number;
}

export interface UpdatedAt {
    UpdatedDate: string;
    ProcessDate: string;
}

