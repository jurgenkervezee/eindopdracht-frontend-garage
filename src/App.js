import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReceptionPage from './pages/ReceptionPage';
import SignInPage from "./pages/SignInPage";
import MechanicPage from "./pages/MechanicPage";
import CashierPage from "./pages/CashierPage";
import TopMenu from "./components/TopMenu";

function App() {
    return (
        <>
            <div className="outer-container">
                <TopMenu/ >
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route exact path="/signin">
                            <SignInPage/>
                        </Route>
                        <Route exact path="/reception">
                            <ReceptionPage/>
                        </Route>
                        <Route exact path="/mechanic">
                            <MechanicPage/>
                        </Route>
                        <Route exact path="/cashier">
                            <CashierPage/>
                        </Route>
                    </Switch>
            </div>
        </>
);
}

export default App;
