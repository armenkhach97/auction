import React from "react";
import { Card, Container } from '@themesberg/react-bootstrap';
import { PageVisitsTable } from "../../components/Tables";
import { useAuth } from "../../contexts/AuthContext";

export default () => {

    return (<>
        <Container>
            <Card>
                <PageVisitsTable />
            </Card>
        </Container>
    </>);
};
