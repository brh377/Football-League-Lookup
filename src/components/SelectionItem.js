import React from 'react';
import './SelectionItem.css';
import {leagueData} from '../actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

 class SelectionItem extends React.Component{
     render(){
    return (
            <Link onClick={() => this.props.leagueData(this.props.country.code)} to={`/Leagues/${this.props.country.country}`} className= "name">
                <div >
                    {this.props.country.country}
                </div>
            </Link>
    )
     }
}

const mapStateToProps = state =>{
    return{leagues:state.leagues[0]}
}

export default connect(mapStateToProps,{leagueData})(SelectionItem);