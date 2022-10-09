import React, { useEffect, useState } from "react"

import { useHistory } from 'react-router-dom';
import Datetime from "react-datetime";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "@themesberg/react-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";

export default () => {
    const history = useHistory()
    const [ date, setDate ] = useState(new Date());
    const [ startDate, setStartDate ] = useState(new Date());
    const [ values, setValue ] = React.useState({});
    const [ items, setItems ] = React.useState([]);

    const submitForm = (event) => {
        event.preventDefault()
        const data = {
            id: Date.now(),
            name: event.target.name.value,
            username: event.target.username.value,
            bid: event.target.bid.value,
            description: event.target.description.value,
            startDate: startDate,
        }

        localStorage.setItem("items", JSON.stringify([ ...items, data ]));

        history.push("/");
    };

    useEffect(() => {
        async function getItems() {
            const response = await JSON.parse(localStorage.getItem('items')) ?? '';
            setItems(response);
        }

        getItems();
    }, []);

    return (<>
            <main>
                <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                    <Container>
                        <Card className="p-4">
                            <Form>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Starting Bid</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows="3" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
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
                                    </Col>
                                    <Col lg={12} className={'d-flex justify-content-center mt-4'}>
                                        <Button variant="success" className="m-1">Success</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Container>
                </section>
            </main>
        </>)
}
