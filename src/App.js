import './App.css';
import Header from './component/Header';
import Shop from './component/Shop';
import Review from './component/Review';
import NotFound from './component/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductDetails from './component/ProductDetails';
import Shipment from './component/Shipment';
import Login from './component/Login';
import { createContext, useState } from 'react';
import PrivetRoute from './component/PrivetRoute';
import Inventory from './component/Inventory';

export const UserContext = createContext();

function App() {
  const [logedInUser, setLogedInUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={[logedInUser, setLogedInUser]}>
        <Router>
          {logedInUser.email}
          <Header />
          <Switch>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <PrivetRoute path="/shipment">
              <Shipment />
            </PrivetRoute>
            <Route path="/login">
              <Login />
            </Route>
            <PrivetRoute path="/inventory">
              <Inventory/>
            </PrivetRoute>
            <Route path="/product/:productKey">
              <ProductDetails />
            </Route>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
