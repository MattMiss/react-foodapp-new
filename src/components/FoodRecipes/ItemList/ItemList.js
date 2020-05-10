import React from 'react';
//import FoodRecipeItem from '../FoodRecipeItem/FoodRecipeItem';
import FoodRecipeItemTest from '../FoodRecipeItem/FoodRecipeItemTest';
import styled from 'styled-components';

const ItemListDiv = styled.div`
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
`;

const itemList = ( {items, clicked, editItem} ) => {

    const clickedHandler = (item) => {
        clicked(item);
    }

    let allItems = items.map((result, index) => {
        //console.log(result)
        return <FoodRecipeItemTest key={result.id} item={result} clicked={() => clickedHandler(result)} editItem={editItem}/>;   
    })
      

    return (
        <ItemListDiv>
                {allItems}
        </ItemListDiv>
    );
};

export default itemList;