import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addMusic,playThis,reserCurrent } from '../../redux/musicPlay.redux';
import { markSongs,delSong,beginPlay } from '../../redux/publicSongs.redux';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import { HOST } from "../../const/host";
import './SongEditList.less'

@connect(
    state=>state,
    { addMusic,playThis,markSongs,delSong,beginPlay,reserCurrent }
)
class SongEditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit:false,
            allSelected:false,
            clickToCollect:false,
            songsList:"",
        };
        this.edit = this.edit.bind(this);
        this.done = this.done.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.removeSong = this.removeSong.bind(this);
        this.beginPlay = this.beginPlay.bind(this);
        this.closeCollect = this.closeCollect.bind(this);
        this.complete = this.complete.bind(this);
    }
    edit(){
        this.setState({
            edit:true
        })
    }
    done(){
        this.setState({
            edit:false
        })
    }
    beginPlay(){
        this.props.beginPlay();
        this.props.playThis(this.props.data[0])
    }
    //选择歌曲
    selectSongs(data){
        console.log(data)
        this.props.markSongs(data.id)
    }
    //全选歌曲
    selectAll(){
        if(this.props.data.filter(v => v.marked).length === this.props.data.length){
            console.log("取消全选");
            this.props.markSongs(false,false)
        }else{
            console.log("全选");
            this.props.markSongs(false,true)
        }
    }

    //移除歌曲
    removeSong(){
        this.props.delSong()
        this.props.reserCurrent()
    }
    //点击播放歌曲
    playThis(data){
        this.props.playThis(data)
    }
    //添加进播放列表
    addToList(i,data){
        let isExist = false;
        this.props.musicPlayer.songs.map(v=>{
            if(data.src === v.src){
                isExist = true
            }
        })
        if(!isExist){
            this.props.addMusic(data);

        }
    }
    complete(id){


    }
    //收藏歌曲
    collectSong(id){
        //请求收藏的歌单
        axios.get(`${HOST}/mock/personal${sessionStorage.getItem("userId")}/collectSongList.json`).then(res=>{
            let data = res.data;
            if(data.result){
                this.setState({
                    songsList:data.data
                });
            }else{
                this.setState({
                    songsList:"0"
                })
            }

        })
    }
    //关闭收藏弹出层
    closeCollect(){
        this.setState({
            clickToCollect:false
        })
    }

    render() {
        let allSelected = false;
        if(this.props.data.filter(v => v.marked).length === this.props.data.length){
            allSelected=true
        }
        return (
            <div id="edit-list">
                <div className="option" style={this.props.style}>
                    <div className="left">
                        {
                            this.state.edit && this.props.data.length!==0?
                                <div className={allSelected?"select all-selected":"select"} onClick={this.selectAll}><div> </div> <span>全选</span></div>
                                :
                                ""
                        }
                        <div className="search" onClick={this.beginPlay}>播放</div>
                    </div>
                    {
                        !this.state.edit && this.props.option?
                            <div className="edit" onClick={this.edit}>操作</div>
                            :
                            ""
                    }

                    {
                        this.state.edit && this.props.data.length!==0?
                            <div className="operate">
                                <div className="remove" onClick={this.removeSong}>移除</div>
                                <div className="done" onClick={this.done}>取消</div>
                            </div>
                            :
                            ""
                    }
                </div>
                {/*内容*/}
                <div className="song-edit-list" style={this.props.listStyle}>
                    <QueueAnim delay={300} type="top">
                        {
                               // console.log(this.props.data)
                            this.props.data.map((v,i)=>(
                                <div key={v.id} className={ v.src === this.props.musicPlayer.currentSongs.src? "single-song current-played":"single-song"} >
                                    <div className="left">
                                        {
                                            this.state.edit?
                                                <div className={v.marked?"select selected":"select"} onClick={()=>{this.selectSongs(v)}}><div></div></div>
                                                :
                                                ""
                                        }
                                        {
                                            this.props.order?
                                                <div className="order">{i+1}</div>
                                                :
                                                ""
                                        }
                                        <div className="songs-info" onClick={()=>{this.playThis(v)}}>
                                            <div className="name">{v.name}</div>
                                            <div className="artist">{v.artist}</div>
                                        </div>
                                    </div>


                                    <div className="right" >
                                        {

                                                <div className="collect-song-btn"  onClick={()=>{this.collectSong(v.id)}}>
                                                    收藏
                                                </div>

                                        }
                                        <div className="add-to-list" onClick={()=>{this.addToList(i,v)}}>
                                            +
                                        </div>

                                    </div>

                                </div>
                            ))
                        }
                    </QueueAnim>
                </div>
                {/*{*/}
                    {/*this.state.balls.map(v=>(*/}
                        {/*<Ball ref="ball"*/}
                              {/*key={v.id}*/}
                              {/*terminal={{x:v.terminalX,y:v.terminalY}}*/}
                              {/*origin={{x:v.originX,y:v.originY}}*/}
                              {/*id={v.id}*/}
                              {/*complete={this.complete}*/}
                        {/*/>*/}
                    {/*))*/}
                {/*}*/}
                {/*<CollectSongsPicker*/}
                    {/*show={this.state.clickToCollect}*/}
                    {/*data={this.state.songsList}*/}
                    {/*closeCollect={this.closeCollect}*/}
                {/*/>*/}

            </div>

        )
    }
}
export default SongEditList