
import {Table} from "react-bootstrap";
import ResultTableRow from "./ResultTableRow.tsx";
import { CarParkData } from '../data/CarParkData.ts';



type Props = {
    carParkData: CarParkData
    searchedVehicle: string
}

export default function ResultTable({carParkData , searchedVehicle}: Props) {
    return (
        <>

            <Table  striped bordered hover >
                <thead>
                <tr style={{fontSize: "15px"}}>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Total Vacancy</th>
                    <th>Google Map</th>
                </tr>
                </thead>
                <tbody>
                {
                   carParkData.results.map((result) => (
                       <ResultTableRow result={result} searchedVehicle={searchedVehicle}/>
                   ))
                }

                </tbody>
            </Table>

        </>
    )
}