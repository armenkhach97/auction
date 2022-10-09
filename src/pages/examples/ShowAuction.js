import React, {useEffect, useState} from "react"

import {useHistory} from 'react-router-dom';

import { Card, Container, Form } from "@themesberg/react-bootstrap";

export default () => {
    const history = useHistory()
    const [startDate, setStartDate] = useState(new Date());
    const [values, setValue] = React.useState({});
    const [items, setItems] = React.useState([]);

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

        localStorage.setItem("items", JSON.stringify([...items, data]));

        history.push("/");
    };

    useEffect(() => {
        async function getItems() {
            const response = await JSON.parse(localStorage.getItem('items')) ?? '';
            setItems(response);
        }

        getItems();
    }, []);

    return (
        <>
            <Container>
                <Card>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                </Card>
            </Container>
        </>
    )
}
