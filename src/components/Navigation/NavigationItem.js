import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItemLi = styled.li`
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 10px;

    & > a {
        color: rgb(41, 116, 187);
        text-decoration: none;
        width: 100%;
        font-size: 1.2em;
        font-weight: 500;
        box-sizing: border-box;
        display: block;
    }

    &:hover {
        background-color: #182955;
    }

    @media (min-width: 500px) {
        height: 100%;
        width: auto;
        align-items: center;
        padding: 0;
        
        & > a {
            color: white;
            padding: 16px 10px;
            font-size: 1.1em;
            box-sizing: border-box;
        }

        &:hover {
            background-color: #182955;
            border-bottom: 4px solid palevioletred;
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