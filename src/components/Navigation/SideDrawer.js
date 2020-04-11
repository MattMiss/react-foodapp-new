import React, { Fragment } from 'react';
import NavigationItems from './NavigationItems';
import BackDrop from '../UI/Backdrop';
import styled from 'styled-components';

const SideDrawerDiv = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3 ease-out;

    &.Open {
        transform: translateX(0);
    }

    &.Closed {
        transform: translateX(-100%);
    }

    @media (min-width: 500px) {
        visibility: none;
    }
`;


const sideDrawer = (props) => {

    let attachedClass = "Closed";

    if (props.open){
        attachedClass = "Open";
    }

    return (
        <>
            <BackDrop show={props.open} clicked={props.closed} />
            <SideDrawerDiv className={attachedClass} >
                <nav>
                    <NavigationItems close={props.closed} />
                </nav>
            </SideDrawerDiv>
        </>   
    );
};

export default sideDrawer;