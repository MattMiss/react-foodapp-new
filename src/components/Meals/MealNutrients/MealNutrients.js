import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';


const NutrientContainer = styled(Container)`
    
    margin: .5em auto;
    border: 2px solid #ccc;
    border-radius: 3px;
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

const noMeal = {
    meal: {
        nutrientTotals: {
            calcium: 0,
            calories: 0,
            carbs: 0,
            cholesterol: 0,
            fat: 0,
            fiber: 0,
            iron: 0,
            monoFat: 0,
            polyFat: 0,
            potassium: 0,
            protein: 0,
            saturatedFat: 0,
            sodium: 0,
            sugars: 0,
            transFat: 0,
            vitaminA: 0,
            vitaminC: 0
        } 
    },
    editing: false        
}

const mealNutrients = (props) => {
    
    const meal = props.meal.meal ? props.meal : noMeal;

    const row1 = [
        {label: "Cal", val: meal.meal.nutrientTotals.calories},
        {label: "Fat", val: meal.meal.nutrientTotals.fat},
        {label: "S Fat", val: meal.meal.nutrientTotals.saturatedFat}
    ];

    const row2 = [
        
        {label: "P Fat", val: meal.meal.nutrientTotals.polyFat},
        {label: "M Fat", val: meal.meal.nutrientTotals.monoFat},
        {label: "T Fat", val: meal.meal.nutrientTotals.transFat}
    ];

    const row3 = [
        
        {label: "Chol", val: meal.meal.nutrientTotals.cholesterol},
        {label: "Sodium", val: meal.meal.nutrientTotals.sodium},
        {label: "Carbs", val: meal.meal.nutrientTotals.carbs}
    ];

    const row4 = [
        {label: "Fiber", val: meal.meal.nutrientTotals.fiber},
        {label: "Sugar", val: meal.meal.nutrientTotals.sugars},
        {label: "Protein", val: meal.meal.nutrientTotals.protein}
    ];

    const row5 = [
        {label: "Calcium", val: meal.meal.nutrientTotals.calcium},
        {label: "Iron", val: meal.meal.nutrientTotals.iron},
        {label: "Potass", val: meal.meal.nutrientTotals.potassium}
    ];

    const row6 = [
        {label: "Vitamin A", val: meal.meal.nutrientTotals.vitaminA},
        {label: "Vitamin C", val: meal.meal.nutrientTotals.vitaminC}
    ];

    return (
        <NutrientContainer>
            <div>Nutrients</div>
            <hr />
            <NutrientRow items={row1}/>
            <NutrientRow items={row2}/>
            <NutrientRow items={row3}/>
            <NutrientRow items={row4}/>
            <NutrientRow items={row5}/>
            <NutrientRow items={row6}/>
        </NutrientContainer>
    );
};

export default mealNutrients;