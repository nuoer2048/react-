import React from 'react';
import './Player.less'
import{playThis,playThisList} from "../../redux/musicPlay.redux";

import {stopPlay} from "../../redux/publicSongs.redux";
import {connect} from 'react-redux';
let rotateTimer = 0;
@connect(state=>state,{
    playThis,playThisList,stopPlay
})
class Player extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isPaused:false,
            totalTime:"00:00",
            playedTime:"00:00",
            playPer:0,
            bufferedPer:0,
            playedLeft:0,
            detailPlayedLeft:0,
            volumnLeft:0,
            angle:0,
            mouseDown:false,
            musicListShow:false,
            currentMusic:{},
            isPlayed:false,
            playDetail:false,
            mode:"顺序"
        }
    }

    rotate(){
        if(this.state.playDetail){

        }
        rotateTimer = setInterval(()=>{
            this.setState({
                angle:this.state.angle+1
            },()=>{
                this.refs.musicAvatar.style.transform = `rotate(${this.state.angle}deg)`;

            })
        },30)
    }
    play() {
       
        clearInterval(rotateTimer);
        let audio = this.refs.audio;
        if (audio.paused && this.state.currentMusic.src) {
            this.props.playThis(this.state.currentMusic);
            audio.play();
            this.setState({
                isPaused: true,
                isPlayed: true
            }, () => {
                this.rotate()

            })
        } else {
            audio.pause();
            this.setState({
                isPaused: false
            }, () => {
                clearInterval(rotateTimer)
            })
        }
    }

    /**
     * 接受新的props改变的时候执行
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        //当播放器当前没有播放歌曲时候，点击歌曲列表的某一首歌，开始播放
        if (nextProps.currentSongs !== this.state.currentMusic && nextProps.currentSongs !== undefined) {
            this.setState({
                currentMusic: nextProps.currentSongs,
                angle: 0
            }, () => {
                this.play()
            })
        }
    }

render(){
    return(<div className="player-wrapper">
           <div className="play-inner">
             <div className="img-box">
                 {
                     this.props.musicPlayer.currentSongs.src? <img src={this.props.musicPlayer.currentSongs.img} alt="图片丢失了"/>:
                         <img src={require('./little.png')} alt="图片丢失了" ref="musicAvatar"/>
                 }
             </div>
               <div className="play-control">
                   <div className="play-pre"><svg t="1561804675185" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2759" width="32" height="32"><path d="M862.208 824.448a63.872 63.872 0 0 1-65.664-3.2l-384-256a64 64 0 0 1-0.064-106.496l384-256A64.021333 64.021333 0 0 1 896 256v512a64.106667 64.106667 0 0 1-33.792 56.448zM320 832H192c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64z" fill="" p-id="2760"></path></svg></div>
                   <div className="play-py" onClick={()=>this.play()}> <svg t="1561804734004" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3537" width="32" height="32"><path d="M810.4 465.8 253.6 134.4c-6.8-4-13.8-6.4-21.8-6.4-21.8 0-39.6 18-39.6 40L192 168l0 688 0.2 0c0 22 17.8 40 39.6 40 8.2 0 15-2.8 22.4-6.8l556.2-331c13.2-11 21.6-27.6 21.6-46.2C832 493.4 823.6 477 810.4 465.8z" p-id="3538"></path></svg></div>
                   <div className="play-next"><svg t="1561804287039" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1972" width="32" height="32"><path d="M161.792 824.448A64.106667 64.106667 0 0 1 128 768V256a64.021333 64.021333 0 1 1 99.52-53.248l384 256a64 64 0 0 1-0.064 106.496l-384 256a63.872 63.872 0 0 1-65.664 3.2zM704 832c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64h-128z" fill="" p-id="1973"></path></svg></div>
               </div>
               <audio src={this.state.currentMusic.src?this.state.this.state.currentMusic.src:''} ref="audio"> </audio>
           </div>
    </div>)
}
}
export default Player;