import React from 'react';
import './StyleListDetail.less'
import {HOST} from '../../const/host'
import {getSongs} from '../../redux/publicSongs.redux';
import PinkHeader from '../pinkHeader/PinkHeader'

import {connect} from 'react-redux';
import SongsList from "../../component/SongsList/SongsList";
@connect(state=>state.publicSongs,{getSongs})
class StyleListDetail extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){

        let url = `${HOST}/mock/discovery/style/styleSongListDetail${this.props.location.state.id}.json`;
        this.props.getSongs(url)

    }
    render(){
        return(<div className="styleListDetail">
            <div className="styleDetail-header">
                <PinkHeader title={this.props.location.state.name}> </PinkHeader>


            </div>
            {
                this.props.songs?<SongsList songs={this.props.songs}>

                </SongsList>:""
            }
        </div>)
    }
}
export default StyleListDetail;