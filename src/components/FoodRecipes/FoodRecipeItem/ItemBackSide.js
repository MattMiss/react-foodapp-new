import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';

const NutrientContainer = styled(Container)`
    font-size: 80%;
`;

const BoldLabel = styled.span`
    font-weight: bold;
`;  


const NutrientCol = ( {label, val} ) => (
    <>
        <Col className="px-1 text-right">
            <BoldLabel>
                {label} 
            </BoldLabel>
        </Col>
        <Col className="px-1 text-left">
            {val} 
        </Col>
    </>
);

const NutrientRow = ({items}) => {
    const columns = items.map(i => {
        return (<NutrientCol key={i.label} label={i.label} val={i.val}/>);
    })

    return(
        <Row>
            {columns}      
        </Row>
    );
};

const ItemBackSide = ({item}) => {
    
    const nutrients = item.servings[0].nutrients;

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
    
    return(<NutrientContainer>
        <NutrientRow items={nutrientRows.row1} />
        <NutrientRow items={nutrientRows.row2} />
        <NutrientRow items={nutrientRows.row3} />
        <NutrientRow items={nutrientRows.row4} />
        <NutrientRow items={nutrientRows.row5} />
        <NutrientRow items={nutrientRows.row6} />
    </NutrientContainer>);
    
};

export default ItemBackSide;