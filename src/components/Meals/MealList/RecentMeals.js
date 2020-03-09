import React from 'react';
import styled from 'styled-components';

const MealListDiv = styled.div`
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
`;

const RecentMealDiv = styled.div`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #00a5ff;
    color: #00a5ff;
    margin: .5em 1em;
    padding: 0.25em 1em;
    text-align: center;

    &:hover {
        background-color: #4682c0;
        cursor: pointer;
    }
`
const recentMeals = (props) => {

    const clickedHandler = (item) => {
        //console.log("clicked", item)
        props.clicked(item);
    }

    let recentMeals = props.items.map((result, index) => {
        //console.log(result)
        return <RecentMealDiv key={result.id} onClick={() => clickedHandler(result)}>{result.id}</RecentMealDiv>
    })
      

    return (
        <MealListDiv>
            {recentMeals}
        </MealListDiv>
    );
};

export default recentMeals;