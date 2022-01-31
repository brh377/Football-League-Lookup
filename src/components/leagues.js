import React from 'react';
import './leagues.css';
import LeagueItem from './LeagueItem';

import {connect} from 'react-redux';

class leagues extends React.Component{
    
    handleClick =() =>{
        this.setState({hidden:true});
    }


    showLeft = () => {
        if(this.props.leagues !== undefined){
            return(
                <div className = "left">
                    <img src={this.props.leagues[0].flag} alt= {this.props.leagues.country}/>
                    <div>
                        <h2 className = "country-header" style={{fontSize:40}}>{this.props.leagues[0].country}</h2>
                    </div>
                </div>
            )
        }
    }
    getLeagues=  () =>{
        if(this.props.leagues !== undefined){
            return this.props.leagues.map(leagues=>{
                    return(   
                        <LeagueItem leagues = {leagues} key={leagues.league_id}/>
                    )
            })
            
        }
    }

    render(){
        return (
            <div className = "league-container" >
                    {this.showLeft()}
                <div className="right">
                    {this.getLeagues()}
                </div>
            </div>
        );
    };

}
const mapStateToProps = state => {
    return {
        leagues:state.leagues[0],
    }
}
export default connect(mapStateToProps)(leagues);