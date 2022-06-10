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




export interface CovidNacional {
    UpdatedAt: string;
    Lista:     FechaValor[];
}

export interface Region {
    Nombre:    string;
    CodRegion: string;
}

export interface Comunas {
    Region:    Regiones;
    CodRegion: string;
    Comuna:    string;
    CodComuna: string;
    Poblacion: number;
}

export enum Regiones {
    Antofagasta = "Antofagasta",
    AricaYParinacota = "Arica y Parinacota",
    Atacama = "Atacama",
    Aysen = "Aysen",
    Biobio = "Biobio",
    Coquimbo = "Coquimbo",
    DelLibertadorGeneralBernardoOHiggins = "Del Libertador General Bernardo O’Higgins",
    LaAraucania = "La Araucania",
    LosLagos = "Los Lagos",
    LosRios = "Los Rios",
    MagallanesYLaAntartica = "Magallanes y la Antartica",
    Maule = "Maule",
    Metropolitana = "Metropolitana",
    Nuble = "Nuble",
    Tarapaca = "Tarapaca",
    Valparaiso = "Valparaiso",
}


export interface ActivosComuna {
    UpdatedAt: string;
    Lista:     Lista[];
}

export interface Lista {
    C: string;
    D: D[];
}

export interface D {
    F: string;
    V: number;
}



export interface ActivosRegion {
    UpdatedAt: string;
    Lista:     ListaRegion[];
}

export interface ListaRegion {
    CodRegion: string;
    Poblacion: number;
    Data:      DataRegion[];
}

export interface DataRegion {
    Fecha: string;
    Valor: number;
}




