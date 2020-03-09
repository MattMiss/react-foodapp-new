import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>My Food</NavigationItem>
        <NavigationItem link="/meals">Meals</NavigationItem>
    </ul>
);

export default navigationItems;