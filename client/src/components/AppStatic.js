import React, {createElement} from 'react';
import {StaticRouter, Route} from 'react-router-dom';
import routes from '../data/routeComps';
import ScrollToTop from './ScrollToTop';

function AppStatic(props) {
  return (
    <StaticRouter location={props.location} context={{}}>
      <div>
        {routes.map(route => (
          <Route
            exact
            render={p => createElement(ScrollToTop(route.comp), {...props, ...p, ...route.props})}
            path={route.path}
            key={route.path}
          />
        ))}
      </div>
    </StaticRouter>
  );
}

export default AppStatic;
