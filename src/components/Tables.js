import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown, faArrowUp, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Table } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";

export const PageVisitsTable = ({ data = [] }) => {
    const history = useHistory()
    const addNewAuction = () => {
        history.push("/add");
    }
    const TableRow = (props) => {
        const { pageName, views, returnValue, bounceRate } = props;
        const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
        const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

        return (<tr>
                <th scope="row">{pageName}</th>
                <td>{views}</td>
                <td>${returnValue}</td>
                <td>
                    <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
                    {Math.abs(bounceRate)}%
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
                {data.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
                </tbody>
            </Table>
        </Card>);
};