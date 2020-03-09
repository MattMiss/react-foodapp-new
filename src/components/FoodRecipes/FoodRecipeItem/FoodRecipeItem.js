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

const NutrientCol = (props) => (
    <React.Fragment>
        <Col className="px-1 text-right">
            <BoldLabel>
                {props.label} 
            </BoldLabel>
        </Col>
        <Col className="px-1 text-left">
            {props.val} 
        </Col>
    </React.Fragment>
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

    const row1 = [
        {label: "Cal", val: nutrients.calories},
        {label: "Fat", val: nutrients.fat},
        {label: "S Fat", val: nutrients.saturatedFat}
    ];

    const row2 = [
        
        {label: "P Fat", val: nutrients.polyFat},
        {label: "M Fat", val: nutrients.monoFat},
        {label: "T Fat", val: nutrients.transFat}
    ];

    const row3 = [
        
        {label: "Chol", val: nutrients.cholesterol},
        {label: "Sodium", val: nutrients.sodium},
        {label: "Carbs", val: nutrients.carbs}
    ];

    const row4 = [
        {label: "Fiber", val: nutrients.fiber},
        {label: "Sugar", val: nutrients.sugars},
        {label: "Protein", val: nutrients.protein}
    ];

    const row5 = [
        {label: "Calcium", val: nutrients.calcium},
        {label: "Iron", val: nutrients.iron},
        {label: "Potass", val: nutrients.potassium}
    ];

    const row6 = [
        {label: "Vitamin A", val: nutrients.vitaminA},
        {label: "Vitamin C", val: nutrients.vitaminC}
    ];

    //console.log(props.item)
    return (
        <ItemDiv className={props.item.type} onClick={item => props.clicked(item)}>
                
                <Container>
                    <Row>
                        <Col>
                            {props.item.name}
                        </Col>
                        <Col>
                            {props.item.brand ? 'BRAND' : 'GENERIC'}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                <Collapsible trigger="Nutrients">
                    <NutrientContainer>
                        <NutrientRow items={row1} />
                        <NutrientRow items={row2} />
                        <NutrientRow items={row3} />
                        <NutrientRow items={row4} />
                        <NutrientRow items={row5} />
                        <NutrientRow items={row6} />
                    </NutrientContainer>
                </Collapsible>
        </ItemDiv>
    );
};

export default FoodRecipeItem;