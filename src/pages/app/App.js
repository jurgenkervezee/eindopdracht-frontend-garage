import React from 'react';
import './App.css';
import {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from '../home/HomePage';
import ReceptionPage from '../reception/ReceptionPage';
import SignInPage from "../signin/SignInPage";
import MechanicPage from "../MechanicPage";
import CashierPage from "../CashierPage";
import TopMenu from "../../components/topmenu/TopMenu";
import {AuthContext} from "../../context/AuthContext";

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
