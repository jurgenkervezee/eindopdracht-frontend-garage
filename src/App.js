import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReceptionPage from './pages/ReceptionPage';
import SignInPage from "./pages/SignInPage";
import TopMenu from "./components/TopMenu";

function App() {
    return (
        <>
            <TopMenu/ >
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/reception">
                    <ReceptionPage />
                </Route>
                <Route exact path="/signin">
                    <SignInPage />
                </Route>
            </Switch>
        </>
    );
}
            
export default App;
