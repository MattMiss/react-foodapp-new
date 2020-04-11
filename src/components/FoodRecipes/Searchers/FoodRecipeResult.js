import React from 'react';
import {BrandIcon, GenericIcon } from '../../../icons/TypeIcon'; 
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const RowItem = styled(Row)`
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid #00a5ff;
    color: #00a5ff;
    border-radius: 3px;

    &.recipe{
        border: 2px solid palevioletred;
        color: palevioletred;
    }

    &:hover {
        background-color: #4682c0;
        color: white;
        cursor: pointer;
    }

    &.recipe:hover {
        background-color: #b95673;
        color: white;
        cursor: pointer;
    }
`;

const NameCol = styled(Col)`
    font-size: 1.2em;
    font-weight: bold;
`;


const NutCol = styled(Col)`
    font-size: .8em;
`;

const DescCol = styled(Col)`
    font-size: .8em;
`;

const FoodRecipeResult = (props) => {
    console.log(props)
    const itemName = props.isFood ? props.item.food_name : props.item.recipe_name;
    const itemType = props.isFood ? (props.item.food_type === "Brand" ? props.item.brand_name : "Generic") : null;
    const icon = props.isFood ? (props.item.food_type === "Brand"? <BrandIcon /> : <GenericIcon />) : null;
    const description = props.isFood ? props.item.food_description : props.item.recipe_description;
    const descSplit = props.isFood ? description.split(' - ') : null;
    const nutrientSplit = props.isFood ? descSplit[1].split(' | ') : null;

    const recipeDescRow = props.isFood ? null : <Row><DescCol className="text-left">{description}</DescCol></Row>;

    const itemDiv = <RowItem className={props.isFood ? 'food' : 'recipe'} onClick={props.clicked}>
        <Col>
            <Row className="no-gutters my-1">
                <Col xs={8} className="text-left">
                    {itemName}
                </Col>
                <Col xs={3} className="text-right">
                    {itemType}
                </Col>
                <Col xs={1}>
                    {icon}
                </Col>
            </Row>
            {recipeDescRow}
            <hr className="my-1"/>
            <Row className="no-gutters my-1">
                <NutCol className="text-left">
                    {props.isFood ? descSplit[0] : null}
                </NutCol>
                <NutCol className="text-left"> 
                    {props.isFood ? nutrientSplit[0] : "Calories: " + props.item.recipe_nutrition.calories + "kcals"}
                </NutCol>
                <NutCol className="text-left">
                    {props.isFood ? nutrientSplit[1] : "Carbs: " + props.item.recipe_nutrition.carbohydrate + "g"}
                </NutCol>
                <NutCol className="text-left">
                    {props.isFood ? nutrientSplit[2] : "Fat: " + props.item.recipe_nutrition.fat + "g"}
                </NutCol>
                <NutCol className="text-left">
                    {props.isFood ? nutrientSplit[3] : "Protein: " + props.item.recipe_nutrition.protein + "g"}
                </NutCol>
            </Row>
        </Col>  
    </RowItem>;

    return itemDiv;
};

export default FoodRecipeResult;