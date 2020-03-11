import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';

const NavigationItemsUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-flow: row;
    }
`;


const navigationItems = (props) => (
    <NavigationItemsUl>
        <NavigationItem clicked ={props.close} link="/" exact>My Food</NavigationItem>
        <NavigationItem clicked ={props.close} link="/meals">Meals</NavigationItem>
    </NavigationItemsUl>
);

export default navigationItems;