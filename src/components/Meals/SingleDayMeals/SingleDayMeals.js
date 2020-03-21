import React from 'react';
import styled from 'styled-components';
import MealNutrients from '../MealNutrients/MealNutrients';
import SingleDayMealList from '../SingleDayMealList/SingleDayMealList';
import {Container, Row, Col} from 'react-bootstrap';


const MealsDayDiv = styled.div`
    margin: .5em auto;
    `;



const singleDayMeals = (props) => {


    return (
        <MealsDayDiv>
            <Container>
                <Row>
                    <Col sm className="px-1">
                        <MealNutrients 
                            meal={props.mealChoice} />
                    </Col>
                    <Col sm className="px-1">
                        <SingleDayMealList 
                            meal={props.mealChoice} 
                            addItemHandler={props.addItemHandler} 
                            deleteItem={item => props.deleteItemHandler(item)}
                            cancelMealSave = {props.cancelMealSave}/>
                    </Col>
                </Row>
            </Container>

        </MealsDayDiv>
    );
};

export default singleDayMeals;