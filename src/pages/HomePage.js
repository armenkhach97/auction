import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../routes";

import DashboardOverview from "./dashboard/DashboardOverview";
import Signin from "./sections/Signin";
import Signup from "./sections/Signup";
import NotFoundPage from "./sections/NotFound";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import AddAuction from "./sections/AddAuction";
import ShowAuction from "./sections/ShowAuction";
import { useAuth } from "../contexts/AuthContext";

const RouteWithLoader = ({ component: Component, ...rest }) => {
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, []);

    return (<Route {...rest}
                   render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />);
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [ loaded, setLoaded ] = useState(false);
    const history = useHistory();
    const { currentUser } = useAuth();

    useEffect(() => {

        if(!currentUser){
            history.push('/sign-in');
        }

        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, []);

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }

    const [ showSettings, setShowSettings ] = useState(localStorageIsSettingsVisible);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem('settingsVisible', !showSettings);
    }

    return (<Route {...rest} render={props => (<>
                <Preloader show={loaded ? false : true} />
                <Sidebar />

                <main className="content">
                    <Navbar />
                    <Component {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
                </main>
            </>)}
        />);
};

export default () => (<Switch>
        <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
        <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />

        <RouteWithSidebar exact path={Routes.AddAuction.path} component={AddAuction} />
        <RouteWithSidebar exact path={Routes.ShowAuction.path} component={ShowAuction} />

        <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
        <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
        <Redirect to={Routes.NotFound.path} />
    </Switch>);
