import React, { useEffect, useState } from "react"

import { useHistory, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";

import { Button, Card, Col, Container, Form, InputGroup, Row } from "@themesberg/react-bootstrap";
import { db } from "../../firebase";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

export default () => {
    const history = useHistory()
    const params = useParams();
    const [ bid, setBid ] = useState();
    const [ auction, setAuction ] = useState({});

    useEffect(() => {
        async function getItems() {
            const auction = doc(db, 'auction', params.id);
            const docAuction = await getDoc(auction);
            setAuction(docAuction.data())
        }

        getItems();
        // eslint-disable-next-line
    }, []);

    const saveBid = async () => {
        const oldAuction = doc(db, 'auction', params.id);
        await updateDoc(oldAuction, {bid: bid || auction.bid});
        history.push('/')
    }
    return (<>
        <main style={{ height: '80vh' }}>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Card className="p-4">
                        <Form>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control name='name' type="text" defaultValue={auction.name}
                                                      placeholder="name" readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control name="description" as="textarea" rows="1" readOnly
                                                      defaultValue={auction.description} />
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control name='username' type="text" defaultValue={auction.username}
                                                      placeholder="username" readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>End Date</Form.Label>
                                        <Datetime
                                            timeFormat={false}
                                            closeOnSelect={false}
                                            renderInput={(props, openCalendar) => (<InputGroup>
                                                    <InputGroup.Text><FontAwesomeIcon
                                                        icon={faCalendarAlt} /></InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        value={moment(auction?.end_date?.toDate()).format("MM/DD/YYYY")}
                                                        placeholder="mm/dd/yyyy"
                                                        onChange={() => {
                                                        }}
                                                    />
                                                </InputGroup>)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Starting Bid</Form.Label>
                                    <Form.Control name='bid' type="number"
                                                  defaultValue={bid || auction.bid}
                                                  onChange={(e) => setBid(e.target.value)}
                                                  placeholder="number"
                                                  required />
                                </Col>
                                <Col lg={12} className={'d-flex justify-content-center mt-4'}>
                                    <Button variant="success" onClick={saveBid} className="m-1 mb-2">Bid</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Container>
            </section>
        </main>
    </>)
}
