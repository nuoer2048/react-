import React from 'react';
import './MySongList.less';
import { Link,withRouter } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { Modal } from 'antd-mobile';
import {connect} from 'react-redux';
import{DelSongList} from '../../redux/person.redux'
import {HOST} from "../../const/host";
@withRouter
    @connect(state=>state,{
        DelSongList
    })
class MySongList extends React.Component{
    constructor(props){
        super(props)
        this.deleteSongList=this.deleteSongList.bind(this);
    }
    deleteSongList(id){
        Modal.alert('确认删除歌单？', '歌单内的歌曲会一并删除', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                this.props.DelSongList(id)
                } },
        ])
    }
    render(){
        return(<div className="mySongList">
            <QueueAnim delay={300} type="top">
                {this.props.data?this.props.data.map(v=>(<div className="mysong-item">
                    <Link to={`${HOST}/createSongsListDetail/${v.id}`} className="mysong-item-left">
                        <div className="item-left-pic"><img src={v.cover} alt=""/></div>
                        <div className="item-left-intro">
                            <div className="item-left-intro-top"> {v.name}</div>
                            <div className="item-left-intro-bottom">{`总共${v.num}首`}</div></div>
                    </Link>
                    <div className="mysong-item-right" onClick={()=>this.deleteSongList(v.id)}>
                        删除
                    </div>
                </div>)):""}
            </QueueAnim>
        </div>)
    }
}
export default MySongList;