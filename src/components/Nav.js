import React from 'react';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SidebarOption from './SidebarOption';

import {Router} from 'react-router-dom';
import history from '../history'

import './Nav.css';

function Nav({country,team,league}){
        return(
            <div className = "options">
                <Router history={history}>
                    <SidebarOption Icon={HomeRoundedIcon} url={"/"}/>
                    {country && league?<SidebarOption Icon = {SportsSoccerIcon} url = {`/Leagues/${country}/Info`} league_id={league}/>:null}
                   
                </Router>
            </div>
        );
    }

export default Nav;