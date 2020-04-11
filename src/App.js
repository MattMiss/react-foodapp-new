  
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './containers/Main';
import Meals from './containers/Meals';
import Layout from './hoc/Layout';
import styled from 'styled-components';

const AppDiv = styled.div`
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <AppDiv>
        <Layout>
          <Switch>
            <Route path="/meals" component={Meals} />
            <Route path="/" exact component={Main} />
            
          </Switch> 
        </Layout> 
      </AppDiv>
    );
  }
}

export default App;