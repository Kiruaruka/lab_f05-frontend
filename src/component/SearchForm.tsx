import {Container, Form, Navbar} from 'react-bootstrap'
import {Button} from 'react-bootstrap';
import './SearchForm.css'
import React from "react";

type Props = {
    searchDistrict: string,
    handleDistrictInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSearchResult: (event: React.FormEvent<HTMLFormElement>) => void
    searchedVehicle: string,
    handleVehicleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchForm(props: Props) {

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <div className="container">

                    <Navbar.Brand >Park Vacancy</Navbar.Brand>
                </div>
            </Navbar>


            <Container id="form-container">
                <Form onSubmit={props.handleSearchResult}>
                    <Form.Group className="mt-3 mb-3 d-flex align-items-center" controlId="formBasicEmail">
                        <Form.Label  className="col-2">District</Form.Label>
                        <Form.Control type="text"
                                      placeholder="e.g. Kwun Tong"
                                      value={props.searchDistrict}
                                      onChange={props.handleDistrictInput}/>
                    </Form.Group>


                    <Form.Group className="d-flex align-items-center">
                        <Form.Label className="col-2">Vehicle Type</Form.Label>
                        <Form.Select value={props.searchedVehicle} onChange={props.handleVehicleSelect} >
                            <option value="privateCar">Private Car</option>
                            <option value="LGV">LGV</option>
                            <option value="HGV">HGV</option>
                            <option value="coach">Coach</option>
                            <option value="motorCycle">Motorcycle</option>
                        </Form.Select>
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit" >
                        Search
                    </Button>
                </Form>
            </Container>



        </>
    )
}