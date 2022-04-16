import './App.css';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReceptionPage from './pages/ReceptionPage';
import SignInPage from "./pages/SignInPage";
import TopMenu from "./components/TopMenu";

function App() {
    return (
        <Router>
            <TopMenu />
            <Switch>
                <Route path="/">
                    <HomePage/>
                </Route>
                <Route exact path="/reception">
                    <ReceptionPage/>
                </Route>
                <Route exact path="/signin">
                    <SignInPage/>
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
