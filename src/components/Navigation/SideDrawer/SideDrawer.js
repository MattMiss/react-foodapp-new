import React, { Fragment } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]

    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Fragment>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} >
            
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Fragment>
        
        
    );
};

export default sideDrawer;