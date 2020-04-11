import React from 'react';
import NavigationItem from './NavigationItem';
import styled from 'styled-components';

const NavigationItemsUl = styled.ul`
    padding-left: 0;
    padding-top: 20px;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;

    @media (min-width: 500px) {
        flex-flow: row;
        position: absolute;
        top: 0;
        padding-top: 0;
        height: 100%;
    }
`;


const navigationItems = (props) => (
    <NavigationItemsUl className="NAVUL">
        <NavigationItem clicked ={props.close} link="/" exact>My Food</NavigationItem>
        <NavigationItem clicked ={props.close} link="/meals">Meals</NavigationItem>
    </NavigationItemsUl>
);

export default navigationItems;