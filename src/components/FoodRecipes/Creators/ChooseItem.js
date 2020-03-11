import React from 'react';
import styled from 'styled-components';


const FoodRecipeDiv = styled.div`
    display: block;
    width: 80%;
    height: 100px;
    background-color: #00a5ff;
    border-radius: 4px;
    text-align: center;
    padding: .5em;
    vertical-align: middle;
    font-size: 1.3em;
    line-height: 80px;
    margin: 1em auto;
    color: white;

    &:hover {
        cursor: pointer;
        color: #00a5ff;
        background-color: #182955;
    }
`;

const ChooseItem = (props) => {

    return (
        props.show ? <div>
            <FoodRecipeDiv onClick={() => props.clicked('food')}>
                FOOD
            </FoodRecipeDiv>
            <FoodRecipeDiv onClick={() => props.clicked('recipe')}>
                RECIPE
            </FoodRecipeDiv>
        </div> : null
    );
};

export default ChooseItem;