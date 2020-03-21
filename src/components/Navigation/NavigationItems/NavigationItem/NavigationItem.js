import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItemLi = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;

    & > a {
        color: #5C9210;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
    }

    &:hover {
        background-color: red;
    }

    @media (min-width: 500px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;

        & > a {
            color: white;
            height: 100%;
            padding: 16px 10px;
            border-bottom: 4px solid transparent;
        }

        &:hover {
            background-color: #8F5C2C;
            border-bottom: 4px solid #40A4C8;
            color: white;
        }
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