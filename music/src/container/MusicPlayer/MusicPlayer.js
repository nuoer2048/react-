import React from 'react';
import './MusicPlayer.css'
import Player from '../Player/Player';
import {getMusic,delMusic} from "../../redux/musicPlay.redux";
import {connect}from'react-redux';
@connect(
    state=>state,
    {getMusic,delMusic}
)
class MusicPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            music:""
        }
        this.delSong=this.delSong.bind(this)
    }
    componentWillMount(){
        this.props.getMusic();
    }
    componentWillReceiveProps(nextProps){

        //设置播放列表
        if(nextProps.musicPlayer !== this.state.music){
            this.setState({
                music:nextProps.musicPlayer
            })
        }

    }
    delSong(id){
        this.props.delMusic(id)
    }
    render(){
        return(
            <div className="music-player">
            <Player
                onDel={this.delSong}
                currentSong={this.props.musicPlayer.currentSongs}
                info={this.props.musicPlayer.songs}
            > </Player>
            </div>
        )
    }
}
export default MusicPlayer;