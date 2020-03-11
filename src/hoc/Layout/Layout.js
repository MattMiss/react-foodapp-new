import React, {Component, Fragment} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import styled from 'styled-components';

const MainContent = styled.main`
    margin-top: 72px;
`;

class Layout extends Component {
    state = {
        showSideDrawer: false
    }


    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <MainContent>
                    {this.props.children}
                </MainContent>
            </Fragment>
        )
    };       
};

export default Layout;