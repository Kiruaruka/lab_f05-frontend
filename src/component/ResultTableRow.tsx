import {Button} from 'react-bootstrap'
import {Hgv, Result} from "../data/CombinedCarParkData.ts";


type Props = {
    result: Result
    searchedVehicle: string
}

export default function ResultTableRow({result, searchedVehicle}: Props) {

    const handleOnclickMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${result.latitude},${result.longitude}`)
    }

    // const vehicleArray = result[searchedVehicle as keyof Result] as Hgv[];
    // const vacancy = vehicleArray?.[0]?.vacancy;
    return (
        <>
            <tr style={{fontSize: "12px"}}>
                <td>
                    {
                        result.renditionUrls && result.renditionUrls.carpark_photo ?
                            <img width="80px" src={result.renditionUrls?.carpark_photo}/> :
                            result.renditionUrls && result.renditionUrls.square ?
                                <img width="80px" src={result.renditionUrls?.square}/> :
                                result.renditionUrls && result.renditionUrls.thumbnail ?
                                    <img width="80px" src={result.renditionUrls?.thumbnail}/> :
                                    result.renditionUrls && result.renditionUrls.banner ?
                                        <img width="80px" src={result.renditionUrls?.banner}/> :
                                        <p>404</p>
                    }


                </td>
                <td>{result.name}</td>
                <td>{result.displayAddress}</td>
                {/*<td>?</td>*/}
                <td>
                    {
                        (result[searchedVehicle as keyof Result] as Hgv[])?.[0]?.vacancy

                    }</td>
                {/*<td>{vacancy}</td>*/}

                <Button variant="primary"
                        style={{
                            backgroundColor: "rgb(23, 162, 184)",
                            border: "1px rgb(23, 162, 184) solid",
                            color: "white",
                            fontSize: '14px'
                        }}
                        size="sm" id="button-1"
                        onClick={handleOnclickMap}>
                    Map
                </Button>
            </tr>

        </>
    )
}