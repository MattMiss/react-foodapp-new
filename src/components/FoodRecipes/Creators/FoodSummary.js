import React from 'react';
import FoodRecipeItemTest from '../FoodRecipeItem/FoodRecipeItemTest';
import {Container, Row, Col } from 'react-bootstrap';

const FoodSummary = ({showSummary, item, cancelSave, continueSave}) => {
    console.log(item)

    

    const summary = showSummary ? <div >
        <FoodRecipeItemTest item={item} clicked={item => console.log(item)}/>
        <Container>
            <Row>
                <Col>
                    <button className="btn btn-sm btn-block btn-danger" onClick={cancelSave}>No</button>
                </Col>
                <Col>
                    <button className="btn btn-sm btn-block btn-success" onClick={continueSave}>Yes</button>
                </Col>
            </Row>
        </Container>
    </div> : null;

    return summary;
};

export default FoodSummary;