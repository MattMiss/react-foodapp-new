import React from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
    margin: 0 auto;
    display: grid;
    grid-gap: 1rem;
`;

const CatCard = styled.div`
    background-color: dodgerblue;
    color: white;
    padding: 1rem;
    height: 4rem;
    cursor: pointer;
    
    &:hover {
        background-color: #4CAF50;
    }
`;

const categoryGrid = (props) => {
    const tmpCategories = ['Breakfast', 'Lunch', 'Dinner', 'Alcohol'];

    const categories = tmpCategories.map(cat => {
        return (
            <CatCard className='justify-content-center' key={cat} onClick={() => props.selected(cat)}>
                {cat}
            </CatCard>
        );
    });

    return(
        <div>
            <span>Select category!!</span>
            <CategoryContainer>
                {categories}
            </CategoryContainer>
            
        </div>
    );
};

export default categoryGrid;