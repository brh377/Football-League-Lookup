import React from 'react';
import './App.css';
import Leagues from './leagues'
import Selection from './Selection';
import LeagueInfo from './LeagueInfo';
import Schedule from './Schedule';
import {Route,Router,Switch} from 'react-router-dom';
import history from '../history'
import Fixture from './Fixture';


class App extends React.Component{

    render(){
        return(
            <div className = "wrapper">
                <div className="outside-container">
                    <div className = "container">
                        
                        <div className = "main-interface-container">
                            <Router history={history}>
                                <Switch>
                                    <Route path='/'exact component={Selection}/>
                                    <Route path = '/Leagues/:id' exact component = {Leagues}/>
                                    <Route path = '/Leagues/:id/Info' exact component ={LeagueInfo}/>
                                    <Route path = '/Leagues/:id/Schedule' exact component ={Schedule}/>
                                    <Route path = '/Leagues/fixtures/:id' exact component = {Fixture}/>
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;