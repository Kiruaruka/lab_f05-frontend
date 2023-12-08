export interface CarParkDataVacancy {
    results: Result[];
}

export interface Result {
    park_Id:     string;
    privateCar?: Hgv[];
    LGV?:        Hgv[];
    HGV?:        Hgv[];
    motorCycle?: Hgv[];
    coach?:      Hgv[];
}

export interface Hgv {
    vacancy:     number;

}
