import React from 'react';
import styled from 'styled-components'
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
            {props.val} 
        </Col>
    </>
);

const NutrientRow = (props) => {
    const columns = props.items.map(item => {
        return (<NutrientCol key={item.label} label={item.label} val={item.val}/>);
    })

    return(
        <Row>
            {columns}      
        </Row>
    );
};

const FoodRecipeItem = (props) => {
     
    const nutrients = props.item.servings[0].nutrients;

    const nutrientRows = {
        row1: [
            {label: "Cal", val: nutrients.calories},
            {label: "Fat", val: nutrients.fat},
            {label: "S Fat", val: nutrients.saturatedFat}
        ],
        row2: [
            
            {label: "P Fat", val: nutrients.polyFat},
            {label: "M Fat", val: nutrients.monoFat},
            {label: "T Fat", val: nutrients.transFat}
        ],
        row3: [
            
            {label: "Chol", val: nutrients.cholesterol},
            {label: "Sodium", val: nutrients.sodium},
            {label: "Carbs", val: nutrients.carbs}
        ],
        row4: [
            {label: "Fiber", val: nutrients.fiber},
            {label: "Sugar", val: nutrients.sugars},
            {label: "Protein", val: nutrients.protein}
        ],
        row5: [
            {label: "Calcium", val: nutrients.calcium},
            {label: "Iron", val: nutrients.iron},
            {label: "Potass", val: nutrients.potassium}
        ],
        row6: [
            {label: "Vit A", val: nutrients.vitaminA},
            {label: "Vit C", val: nutrients.vitaminC}
        ]
    }

    const nutrientTrigger = <NutCollapseTrigger className={props.item.type}>
        Nutrients
    </NutCollapseTrigger>;

    console.log(props.item)
    return (
        <ItemDiv className={props.item.type} onClick={item => props.clicked(item)}>
                
                <Container>
                    <Row>
                        <Col className="text-left">
                            {props.item.name}
                        </Col>
                        <Col>
                            {props.item.brand ? 'BRAND' : 'GENERIC'}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-left">
                            <svg 
                                className="categoryIcon mx-1 mb-1" 
                                width="15" 
                                height="15" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 487.85 487.85"
                                fill={props.item.type === 'food' ? '#4682c0' : 'palevioletred'}>
                                <g>
                                    <path d="M479,215.275l-83.5-113.9c-11-15-33.3-26.3-51.8-26.3H39.2c-21.6,0-39.2,17.6-39.2,39.2v259.3c0,21.6,17.6,39.2,39.2,39.2
                                            h304.5c18.6,0,40.9-11.3,51.8-26.3l83.5-113.9C490.8,256.575,490.8,231.375,479,215.275z M457.2,256.775l-83.5,113.9
                                            c-5.8,8-20.2,15.2-30.1,15.2H39.2c-6.7,0-12.2-5.5-12.2-12.2v-259.4c0-6.7,5.5-12.2,12.2-12.2h304.5c9.9,0,24.2,7.3,30.1,15.2
                                            l83.5,113.9C462.1,237.875,462.1,250.075,457.2,256.775z"/>
                                </g>
                            </svg>
                            {props.item.category}
                        </Col>
                        <Col>
                            {props.item.brand ? props.item.brand : null}
                        </Col>
                    </Row>
                    <hr className={"my-1"}/>
                    <Row>
                        <Col>
                            {props.item.type === 'recipe' ? props.item.description : null}  
                        </Col>
                                              
                    </Row>
                </Container>
                <Collapsible trigger={nutrientTrigger}>
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
    );
};

export default FoodRecipeItem;