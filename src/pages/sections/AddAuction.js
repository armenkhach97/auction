import React, { useState } from "react"

import { useHistory } from 'react-router-dom';
import Datetime from "react-datetime";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "@themesberg/react-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";

export default () => {
    const history = useHistory()
    const [ date, setDate ] = useState(new Date());
    const auctionCollectionRef = collection(db, "auction")

    const submitForm = async (event) => {
        event.preventDefault()
        const data = {
            name: event.target.name.value,
            username: event.target.username.value,
            bid: event.target.bid.value,
            description: event.target.description.value,
            end_date: new Date(date),
        }

        await addDoc(auctionCollectionRef, data);

        history.push("/");
    };

    return (<>
            <main style={{height: '80vh'}}>
                <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                    <Container>
                        <Card className="p-4">
                            <Form onSubmit={submitForm}>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control name='name' type="text" placeholder="name" required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Starting Bid</Form.Label>
                                            <Form.Control name='bid' type="number" placeholder="number" required />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control name='username' type="text" placeholder="username" required />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>End Date</Form.Label>
                                            <Datetime
                                                timeFormat={false}
                                                closeOnSelect={false}
                                                onChange={setDate}
                                                renderInput={(props, openCalendar) => (
                                                    <InputGroup>
                                                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            value={date ? moment(date).format("MM/DD/YYYY") : ""}
                                                            placeholder="mm/dd/yyyy"
                                                            onFocus={openCalendar}
                                                            onChange={() => { }} />
                                                    </InputGroup>
                                                )} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control name="description" as="textarea" rows="3" />
                                    </Col>
                                    <Col lg={12} className={'d-flex justify-content-center mt-4'}>
                                        <Button type='submit' variant="success" className="m-1 mb-2">Save</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Container>
                </section>
            </main>
        </>)
}
