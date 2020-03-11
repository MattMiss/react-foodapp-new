import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItemLi = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;

    &:hover {
        background-color: red;
    }

    @media (min-width: 500px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
    }
`;



const navigationItem = (props) => (
    <NavigationItemLi>
        <NavLink 
            to={props.link}
            exact = {props.exact}
            onClick={props.clicked}>
            {props.children}
            
        </NavLink>
    </NavigationItemLi>
);

export default navigationItem;