import React from 'react';
import FoodRecipeItem from '../FoodRecipeItem/FoodRecipeItem';
import styled from 'styled-components';

const ItemListDiv = styled.div`
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
`;

const itemList = (props) => {

    const clickedHandler = (item) => {
        props.clicked(item);
    }

    let allItems = props.items.map((result, index) => {
        //console.log(result)
        return <FoodRecipeItem key={result.id} item={result} clicked={() => clickedHandler(result)}/>;   
    })
      

    return (
        <ItemListDiv>
                {allItems}
        </ItemListDiv>
    );
};

export default itemList;