import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Home from './pages/Home';
import Client from './pages/Client';
import Sales from './pages/Sale';
import Login from './pages/Login';
import Stocks from './pages/Stock';
import AddClient from './pages/AddClient';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/home' exact component={Home} />
        <Route path='/AddClient' exact component={AddClient} />
        <Route path='/client' exact component={Client} />
        <Route path='/venda' exact component={Sales} />
        <Route path='/estoque' exact component={Stocks} />

        {/* <PrivateRoute path='/home' component={Home} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
