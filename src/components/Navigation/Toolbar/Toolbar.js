import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styled from 'styled-components';


const ToolbarHeader = styled.header`
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(41, 116, 187);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;
`;

const DesktopOnly = styled.div`
    @media (max-width: 499px) {
        display: none;
    }
`;

const toolbar = (props) => (
    <ToolbarHeader>
        <DrawerToggle clicked={props.drawerToggleClicked}/>

        <DesktopOnly>
            <NavigationItems/>
        </DesktopOnly>
        
    </ToolbarHeader>
);

export default toolbar;