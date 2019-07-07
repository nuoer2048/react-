import React from 'react';
import {getSummary} from '../redux/person.redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MySongList from './MysongList/MySongList'
import WhiteSpace from './WhiteSpace'
import { Icon,Modal } from 'antd-mobile';
import './Me.less'
import {HOST} from "../const/host";
@connect(state=>state.person,{
    getSummary
})
class Me extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            userId:""
        }
    }
    componentDidMount(){
        this.setState({
            userId:sessionStorage.getItem('userId')
        },()=>{
            this.props.getSummary(this.state.userId)
        })
    }
    newSongList(){
        prompt(
            '新建歌单', '请输入歌单名称', [
                { text: '取消' },
                { text: '确定', onPress: value => console.log(`输入的内容:${value}`) },
            ]
        )}

    render(){
        return(
            <div className="me-box">
               <div className="me-header">
                   <Link className="me-header-box" to={`${HOST}/mycenter/${this.state.userId}`}>
                       <div className="me-header-left">
                           {
                               console.log(this.props.summary)
                           }
                           <img src={this.props.summary.avatar} alt=""/>
                           <div>{this.props.summary.nickName}</div>
                       </div>
                       <div className="me-header-right"> 修改资料></div>
                   </Link>
               </div>
                <div className="me-collect-songs">
                    <Link >收藏的歌曲</Link>
                </div>
                <div className="me-collect-songsList">
                    <Link>收藏的歌单</Link>
                </div>
                <WhiteSpace> </WhiteSpace>
                <div className="me-create-song">
                    <div className="me-create-top">
                        <div className="create-left">我创建的歌单</div>
                        <div className="create-right" onClick={()=>{this.newSongList()}} >
                            <span>创建</span><span>+</span>
                        </div>
                    </div>
                    {
                        this.props.summary.mySongList?<MySongList data = {this.props.summary.mySongList}> </MySongList>:<div className="me-no-list"> 暂时没有数据，请创建</div>

                    }
                </div>
            </div>
        )
    }
}
export default Me;