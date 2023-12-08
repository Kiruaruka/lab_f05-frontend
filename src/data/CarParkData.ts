export interface CarParkData {
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


}

export interface RenditionUrls {
    carpark_photo?: string
    square?:        string;
    thumbnail?:     string;
    banner?:        string;

}
