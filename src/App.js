  
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './containers/Main/Main';
import Meals from './containers/Meals/Meals';
import Layout from './hoc/Layout/Layout';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path="/meals" component={Meals} />
            <Route path="/" exact component={Main} />
            
          </Switch> 
        </Layout> 
      </div>
    );
  }
}

export default App;