import React from 'react';
import './App.css';
import {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReceptionPage from './pages/ReceptionPage';
import SignInPage from "./pages/SignInPage";
import MechanicPage from "./pages/MechanicPage";
import CashierPage from "./pages/CashierPage";
import TopMenu from "./components/TopMenu";
import {AuthContext} from "./context/AuthContext";

function App() {

    const { isAuth, user } = useContext(AuthContext);

    return (
        <>
            <div className="outer-container">
                <TopMenu/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route exact path="/signin">
                            <SignInPage/>
                        </Route>
                        <Route exact path="/reception">
                            { isAuth && user.role === "ROLE_RECEPTION" ?  <ReceptionPage/> : <Redirect to="/signin"/>}
                        </Route>
                        <Route exact path="/mechanic">
                            { isAuth && user.role === "ROLE_MECHANIC" ?  <MechanicPage/> : <Redirect to="/signin"/>}
                        </Route>
                        <Route exact path="/cashier">
                            { isAuth && user.role === "ROLE_CASHIER" ?  <CashierPage/> : <Redirect to="/signin"/>}
                        </Route>
                    </Switch>
            </div>
        </>
);
}

export default App;
