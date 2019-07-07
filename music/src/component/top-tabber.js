import React from 'react';
import {NavLink} from 'react-router-dom';

import './top-tabber.css';
import {HOST} from"../const/host"
class TopTabber extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            entry: [
                {
                    name:"曲库",
                    path:`${HOST}/quku`},
                {
                    name:'发现',
                    path:  `${HOST}/discovery`
                },
                {
                    name:'我',
                    path: `${HOST}/me`
                }



            ]

        }

    }
    render(){
        return(
            <div className="top-tabber">
                {
this.state.entry.map(v=>(<NavLink   key={v.path}
                              to={v.path}
                              activeClassName="current">
    <div>
        {v.name}
    </div>

    </NavLink>)

)
                }
            </div>
        )
    }
}
export default TopTabber;