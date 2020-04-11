import React from 'react';
import styled from 'styled-components'
import { BrandIcon, GenericIcon } from '../../../icons/TypeIcon';
import {Container, Row, Col} from 'react-bootstrap';
import Collapsible from 'react-collapsible';


const ItemDiv = styled.div`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #00a5ff;
    color: #00a5ff;
    margin: .5em 1em;
    padding: 0.25em 0;

    &.recipe{
        border: 2px solid palevioletred;
        color: palevioletred;
    }
`

const NutrientContainer = styled(Container)`
    
    margin: .5em auto;
    padding: .5em 1em;
    font-size: 80%;
`;

const BoldLabel = styled.span`
    font-weight: bold;
`;

const NutCollapseTrigger = styled.div`
    text-align: center;

    &:hover {
        background-color: #4682c0;
        color: white;
        cursor: pointer;
    }

    &.recipe:hover {
        background-color: #b95673;
        color: white;
    }
`;

const NutrientCol = (props) => (
    <>
        <Col className="px-1 text-right">
            <BoldLabel>
                {props.label} 
            </BoldLabel>
        </Col>
        <Col className="px-1 text-left">
            {props.val} {props.size}
        </Col>
    </>
);

const NutrientRow = (props) => {
    const columns = props.items.map(item => {
        return (<NutrientCol key={item.label} label={item.label} val={checkNull(item.val)} size={item.size}/>);
    })

    return(
        <Row>
            {columns}      
        </Row>
    );
};

// returns a 0 if supplied nutrient is null
const checkNull = (item) => {
    return item ? Math.round((Number(item) + Number.EPSILON) * 100) / 100 : "0";
};



const FoodRecipeFullResult = (props) => {


    const cancelHandler = () => {
        props.cancelHandler()
    };
    
    const selectHandler = () => {
        props.chosenItem(props.item);
    };


    console.log(props)
    const isFood = props.item["food_name"] ? true : false;
    
    // if it's a food item, it either has a servings array or a single serving
    const nutrients = isFood ? (props.item.servings.serving[0] ? props.item.servings.serving[0] : props.item.servings.serving) : props.item["serving_sizes"].serving;
    
    const name = isFood ? props.item["food_name"] : props.item["recipe_name"];
    const type = isFood ? "food" : "recipe";
    const itemType = isFood ? (props.item.food_type === "Brand" ? props.item.brand_name : "Generic") : null;
    const icon = isFood ? (props.item.brand_name ? <BrandIcon brand={props.item.brand_name}/> : <GenericIcon />) : null;

    const nutrientRows = {
        row1: [
            {label: "Cal", val: nutrients.calories, size: "kcal"},
            {label: "Fat", val: nutrients.fat, size: "g"},
            {label: "S Fat", val: nutrients["saturated_fat"], size: "g"}
        ],
        row2: [
            
            {label: "P Fat", val: nutrients["polyunsaturated_fat"], size: "g"},
            {label: "M Fat", val: nutrients["monounsaturated_fat"], size: "g"},
            {label: "T Fat", val: nutrients["trans_fat"], size: "g"}
        ],
        row3: [
            
            {label: "Chol", val: nutrients.cholesterol, size: "mg"},
            {label: "Sodium", val: nutrients.sodium, size: "mg"},
            {label: "Carbs", val: nutrients.carbohydrate, size: "g"}
        ],
        row4: [
            {label: "Fiber", val: nutrients.fiber, size: "g"},
            {label: "Sugar", val: nutrients.sugar, size: "g"},
            {label: "Protein", val: nutrients.protein, size: "g"}
        ],
        row5: [
            {label: "Calcium", val: nutrients.calcium, size: "%"},
            {label: "Iron", val: nutrients.iron, size: "%"},
            {label: "Potass", val: nutrients.potassium, size: "mg"}
        ],
        row6: [
            {label: "Vit A", val: nutrients["vitamin_a"], size: "%"},
            {label: "Vit C", val: nutrients["vitamin_c"], size: "%"}
        ]
    }

    const nutrientTrigger = <NutCollapseTrigger className={type}>
        Nutrients
    </NutCollapseTrigger>;

    //console.log(props.item)
    return (
        <>
            <ItemDiv className={type} >   
                <Container>
                    <Row>
                        <Col xs={8} className="text-left">
                            {name}
                        </Col>
                        <Col xs={3} className="text-right">
                            {itemType}
                        </Col>
                        <Col xs={1}>
                            {icon}
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col className={"text-right"}>
                            {props.item.brand ? props.item.brand : null}
                        </Col>
                    </Row>
                    <hr className={"my-1"}/>
                    <Row>
                        <Col>
                            {props.item.type === 'recipe' ? props.item.description : null}  
                        </Col>                        
                    </Row>
                    <Row>
                        <Col className="text-left">
                            {isFood ? (nutrients.serving_description + " (" + nutrients.metric_serving_amount + nutrients.metric_serving_unit + ")") : null}
                        </Col>
                    </Row>
                </Container>
                <Collapsible trigger={nutrientTrigger} open={true}>
                    <NutrientContainer>
                        <NutrientRow items={nutrientRows.row1} />
                        <NutrientRow items={nutrientRows.row2} />
                        <NutrientRow items={nutrientRows.row3} />
                        <NutrientRow items={nutrientRows.row4} />
                        <NutrientRow items={nutrientRows.row5} />
                        <NutrientRow items={nutrientRows.row6} />
                    </NutrientContainer>
                </Collapsible>
            </ItemDiv>
            <Container>
                <Row>
                    <Col>
                        <button className="btn btn-sm btn-block btn-danger" onClick={cancelHandler}>Cancel</button>
                    </Col>
                    <Col>
                        <button className="btn btn-sm btn-block btn-success" onClick={selectHandler}>Select</button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FoodRecipeFullResult;