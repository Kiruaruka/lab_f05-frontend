import SearchForm from "../../../component/SearchForm.tsx";
import ResultTable from "../../../component/ResultTable.tsx";
// import mockData1 from './response.json';
// import mockData2 from './responseVacancy.json';
import React from "react";
import {Container} from "react-bootstrap";
import {CombinedCarParkData, Hgv, Result} from "../../../data/CombinedCarParkData.ts";
import * as CarParkApi from "../../../api/CarParkApi.ts";
import TableLoadingSpinner from "../../../component/TableLoadingSpinner.tsx";


type Props = {}
type State = {
    searchDistrict: string,
    searchedVehicle: string,
    combinedCarParkData: CombinedCarParkData | undefined,
    // carriedSearchedVehicle: string,
}

export default class CarParkPage extends React.Component <Props, State> {
    carrySearchedVehicle: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            searchedVehicle: "privateCar",
            searchDistrict: "",
            combinedCarParkData: undefined,
            // carriedSearchedVehicle: this.state.searchedVehicle,
        };
        this.carrySearchedVehicle= this.state.searchedVehicle
    }

    // combineCarParkData = (data1: CarParkData, data2: CarParkDataVacancy): CombinedCarParkData => {
    //     const combinedData: CombinedCarParkData = {
    //         results: [],
    //     };
    //     for (const result of data1.results) {
    //         const vacancyResult = data2.results.find(
    //             (value) => value.park_Id === result.park_Id);
    //         const combinedResult: Result = {
    //             ...result,
    //             ...vacancyResult,
    //         };
    //         combinedData.results.push(combinedResult);
    //     }
    //     return combinedData;
    // }

    getCombinedData = async () => {

        return await CarParkApi.getApiData()
    }


    componentDidMount() {
        // const combinedData: CombinedCarParkData = this.combineCarParkData(mockData1, mockData2);
        // console.log(combinedData);
        //
        // this.setState({
        //         combinedCarParkData: combinedData
        //     }
        // )
        // const combinedData = CarParkApi.getApiData();

        setTimeout(async () => {
            this.setState({
                combinedCarParkData: await CarParkApi.getApiData()
            });
        }, 100);
    }

    handleDistrictInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {
                searchDistrict: event.target.value
            }
        );
    }

    handleSearchResult = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        this.setState(
            {
                combinedCarParkData: undefined
            }
        )

        const combinedData: CombinedCarParkData = await CarParkApi.getApiData()
        //filter district
        const districtResult: Result[] = combinedData.results.filter((carParkResult) => {
            if (!carParkResult.district) {
                if (carParkResult.displayAddress.includes(this.state.searchDistrict)) {
                    return true;
                }
            } else if (!carParkResult.district.toLowerCase().includes(this.state.searchDistrict)) {
                return false;
            } else {
                return true;
            }
        });
        //filter VehicleTypeNoEmptyResult
        const typeNoEmptyResult: Result[] = districtResult.filter((carParkResult) => {
            return (
                // this.state.searchedVehicle === "privateCar" ? carParkResult.privateCar && carParkResult.privateCar?.length > 0 :
                //     this.state.searchedVehicle === "LGV" ? carParkResult.LGV && carParkResult.LGV?.length > 0 :
                //         this.state.searchedVehicle === "HGV" ? carParkResult.HGV && carParkResult.HGV?.length > 0 :
                //             this.state.searchedVehicle === "coach" ? carParkResult.coach && carParkResult.coach?.length > 0 :
                //                 this.state.searchedVehicle === "motorCycle" ? carParkResult.motorCycle && carParkResult.motorCycle?.length > 0 :
                //                     carParkResult

                (carParkResult[this.state.searchedVehicle as keyof Result] as Hgv[])?.[0]?.vacancy >= 0
            )
        });


        const updatedData: CombinedCarParkData = {
            results: typeNoEmptyResult
        }

        console.log(updatedData)

        setTimeout(() => {
                this.setState({
                    combinedCarParkData: updatedData
                })
            }, 100
        )
    }


    handleVehicleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)

        this.setState(
            {
                searchedVehicle: event.target.value
            }
        )
        this.carrySearchedVehicle = this.state.searchedVehicle
    }


    render() {
        return (
            <>
                <Container>

                    <SearchForm
                        searchDistrict={this.state.searchDistrict}
                        handleDistrictInput={this.handleDistrictInput}
                        handleSearchResult={this.handleSearchResult}
                        searchedVehicle={this.state.searchedVehicle}
                        handleVehicleSelect={this.handleVehicleSelect}
                    />

                    {
                        this.state.combinedCarParkData ?
                            <ResultTable
                                carParkData={this.state.combinedCarParkData}
                                searchedVehicle={this.carrySearchedVehicle}
                            />
                            : <TableLoadingSpinner/>
                    }
                </Container>

            </>
        )
    }
}