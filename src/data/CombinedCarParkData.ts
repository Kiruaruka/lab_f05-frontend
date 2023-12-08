export interface CombinedCarParkData {
    results: Result [];
}

export interface Result {
    park_Id: string,
    name: string,
    displayAddress: string,
    district?: string,
    latitude: number,
    longitude: number,
    renditionUrls?: RenditionUrls,
    privateCar?: Hgv[];
    LGV?:        Hgv[];
    HGV?:        Hgv[];
    motorCycle?: Hgv[];
    coach?:      Hgv[];
}

export interface RenditionUrls {
    carpark_photo?: string
    square?:        string;
    thumbnail?:     string;
    banner?:        string;

}

export interface Hgv {
    vacancy:     number;
}
