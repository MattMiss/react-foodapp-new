import React from 'react';
import NavigationItems from './NavigationItems';
import DrawerToggle from './DrawerToggle';
import styled from 'styled-components';


const ToolbarHeader = styled.header`
    height: 56px;
    width: 100%;
    padding-left: 20px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(41, 116, 187);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    z-index: 90;
`;

const DesktopOnly = styled.div`
    @media (max-width: 499px) {
        display: none;
        position: relative;
    }
`;

const toolbar = (props) => (
    <ToolbarHeader>
        <DrawerToggle clicked={props.drawerToggleClicked}/>

        <DesktopOnly className="DESKTOP">
            <NavigationItems/>
        </DesktopOnly>
        
    </ToolbarHeader>
);

export default toolbar;