import React from 'react';
import './SidebarOption.css';
import {Link} from 'react-router-dom';

function SidebarOption({url,Icon,league_id}){
    return(
        <Link to = {{pathname: url,state:{id:league_id}}} className="sidebarOption">
        <div>
            <Icon/>
        </div>
        </Link>
    );
}
export default SidebarOption;