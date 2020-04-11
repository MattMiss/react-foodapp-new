import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col, Button} from 'react-bootstrap';

const NutrientDiv = styled.div`
    
    margin: .5em auto;
    border: 2px solid #ccc;
    border-radius: 3px;
    padding: .5em 1em 1.5em 1em;
    font-size: 80%;
`;

const ListItemDiv = styled(Row)`
    border-bottom: 1px solid #eee;
    
`;

const DltBtn = styled.div`
    background-color: red;
    cursor: pointer;
    border-radius: 3px;
    width: 80%;
    height: 80%;

`;



const singleDayMealList = (props) => {

    

    const editing = props.meal.meal ? props.meal.editing.toString() : 'No meal';

    const buttonDiv = props.meal.editing ? <Row>
        <Col>
            <Button variant="danger" size="sm" block className="mt-3" onClick={props.cancelMealSave} > 
                CANCEL
            </Button>
        </Col>
        <Col>
            <Button variant="success" size="sm" block className="mt-3" onClick={props.addItemHandler} > 
                SAVE
            </Button>
        </Col>
    </Row> : null;

    let meals = props.meal.meal ? props.meal.meal.meals.map((result, index) => {
        //console.log(result)
        return <ListItemDiv key={result.name + index}>
                    <Col xs={5} className="px-1 text-left">
                        {result.name}
                    </Col>
                    <Col className="px-1">
                        {result.calories}
                    </Col>
                    <Col className="px-1">
                        {result.servSize} {result.servSizeDesc}
                    </Col>
                    <Col xs={1 }className="px-0 my-auto">
                        <DltBtn onClick={() => props.deleteItem(result)}>x</DltBtn>
                    </Col>
                </ListItemDiv>;   
    }) : null;

    return (
        <NutrientDiv>
            <Container>
                <Row>
                    <Col sm={5} className="px-1">
                        Items
                    </Col>
                    <Col className="px-1">
                        Calories
                    </Col>
                    <Col className="px-1">
                        Servings
                    </Col>
                    <Col sm={1}>
                    
                    </Col>
                </Row>
                <hr />
                {meals}
                <Button variant="primary" size="sm" block className="mt-3" onClick={props.addItemHandler} > 
                    ADD
                </Button>
                {buttonDiv}
                {editing}
            </Container>
            
            
            
        </NutrientDiv>
    );
};

export default singleDayMealList;