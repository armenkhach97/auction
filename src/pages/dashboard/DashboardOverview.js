import React, { useEffect, useState } from "react";
import { Card, Container } from '@themesberg/react-bootstrap';
import { PageVisitsTable } from "../../components/Tables";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";

export default () => {

    const [auctions, setActions] = useState([]);
    const auctionCollectionRef = collection(db, "auction")
    const getAuctions = async () => {
        const data = await getDocs(auctionCollectionRef);
        setActions(data._docs.map(doc=>({...doc.data(), id:doc.id})))
    }
    const removeAuction = async (id) => {
        const auction = doc(db, "auction", id)
        await deleteDoc(auction)
        getAuctions();
    }
    useEffect(()=>{
        getAuctions()
        // eslint-disable-next-line
    },[]);
    return (<>
        <Container style={{ height: '80vh' }}>
            <Card>
                <PageVisitsTable data={auctions} removeAuction={removeAuction}/>
            </Card>
        </Container>
    </>);
};
