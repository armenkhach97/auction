import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faEye,
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Table } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";

export const PageVisitsTable = ({ removeAuction, data = [] }) => {
    const history = useHistory()
    const addNewAuction = () => {
        history.push("/add");
    }
    const showAuction = (id) => {
        history.push(`/show/${id}`);
    }
    const TableRow = (props) => {
        const { id, name, username, bid, description, end_date } = props;
        return (<tr>
            <th scope="row">{id}</th>
            <th scope="row">{name}</th>
            <th scope="row">{username}</th>
            <th scope="row">{bid}</th>
            <th scope="row">{description}</th>
            <th scope="row">{moment(end_date.toDate()).format("MM/DD/YYYY")}</th>
            <td>
                <Button
                    variant="light"
                    className="m-1"
                    size="sm"
                    onClick={() => showAuction(id)}>
                        <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button
                    variant="light"
                    className="m-1"
                    size="sm"
                    onClick={() => removeAuction(id)}>
                        <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
        </tr>);
    };

    return (<Card border="light" className="shadow-sm">
        <Card.Header>
            <Row className="align-items-center">
                <Col>
                    <h5>Auctions</h5>
                </Col>
                <Col className="text-end">
                    <Button variant="secondary" size="sm" onClick={addNewAuction}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" />New Action
                    </Button>
                </Col>
            </Row>
        </Card.Header>
        <Table responsive className="align-items-center table-flush">
            <thead className="thead-light">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Product</th>
                <th scope="col">Seller</th>
                <th scope="col">Top Bid</th>
                <th scope="col">Description</th>
                <th scope="col">Time Remaining</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((pv) => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
            </tbody>
        </Table>
    </Card>);
};