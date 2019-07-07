import React from 'react';
import QueAnmi from 'rc-queue-anim';
import './SongsList.less'
import CollectSong from '../CollectSong/CollectSong';
import axios from 'axios';
import {API} from "../../const/host";
import {playThis,addMusic} from "../../redux/musicPlay.redux";
import {connect} from 'react-redux';

@connect(state=>state,{playThis,addMusic})

class SongsList extends React.Component{
constructor(props){
    super(props);
    this.state={
        show:false,
        collectSongList:[]

    }
}

colseCollet(){
    this.setState({
        show:false
    })
}

    /**
     * 找出收藏的歌单
     * @param id
     */
    collectSong(id){
         axios.get(`${API}/mock/personal${sessionStorage.getItem('userId')}/collectSongList.json`).then(res=>{
            let data = res.data;
            if(data.result){
                 this.setState({
                     collectSongList:data.data
                 })

            }else {
                this.setState({
                    collectSongList:""
                })
            }
        });
        this.setState({
            show:true
        })

}

playThis(data){
        console.log(data);
this.props.playThis(data)
}




render(){

    return(
        <div className="song-list" >
            <QueAnmi delay={300} type="top">
                {
                    this.props.songs.map((v,i)=>(

                            <div className={v.src===this.props.musicPlayer.currentSongs?"song-item current-played":"song-item"}>
                                <div className="item-left" onClick={()=>this.playThis(v)}>
                                    <div className="item-name">{v.name}</div>
                                    <div className="item-artist">{v.artist}</div>
                                </div>
                                <div className="item-right">
                                    <div className="item-collect" onClick={()=>this.collectSong(v.id)}>收藏</div>
                                    <div className="item-add">+</div></div>
                            </div>


                        )

                    )
                }
            </QueAnmi>
            <CollectSong show={this.state.show} closeCollect={()=>this.colseCollet()} data={this.state.collectSongList}>

            </CollectSong>

        </div>
    )
}
}
export default SongsList;