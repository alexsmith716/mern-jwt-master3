
import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
import routeOptions from './routes';
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

class App extends Component {

  render() {

    let routes = routeOptions.routes.map(({ path, component, exact }, i) =>

      <Route key={Math.random() + 'ROUTE_'} exact={exact} path={path} component={component} />

    );

    return (

      <div>

        <Switch>

          {routes}

        </Switch>

      </div>

    );

  }

}
export default App;