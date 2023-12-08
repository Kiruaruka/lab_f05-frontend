import axios from "axios";
import {CombinedCarParkData, Result} from "../data/CombinedCarParkData.ts";
import {CarParkData} from "../data/CarParkData.ts";
import {CarParkDataVacancy} from "../data/CarParkDataVacancy.ts";

export const getApiData = async () : Promise <CombinedCarParkData> => {
    const response1
        = await axios.get<CarParkData>("https://api.data.gov.hk/v1/carpark-info-vacancy");
    const response2
        = await axios.get<CarParkDataVacancy>("https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy");


    const combinedData: CombinedCarParkData = {
        results: [],
    };

    for (const result of response1.data.results) {
        const vacancyResult = response2.data.results.find(
            (value) => value.park_Id === result.park_Id);
        const combinedResult: Result = {
            ...result,
            ...vacancyResult,
        };
        combinedData.results.push(combinedResult);
    }
    return combinedData;
}