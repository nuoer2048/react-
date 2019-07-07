import React from 'react';
import{withRouter} from 'react-router-dom';
import SongList from "../../component/SongsList/SongsList";
import {connect} from 'react-redux'
import {getSongListDetail} from '../../redux/songListDetail.redux';
import WhiteSpace from '../../component/WhiteSpace'
import Title from '../../component/Title'
import './songListDetail.css'
import Header from '../../component/Header/Header'
@withRouter
@connect(state=>state.songListDetail,
    {getSongListDetail})
class songListDetail extends React.Component{
       constructor(props){
           super(props)
       }
    componentDidMount(){
      this.props.getSongListDetail(this.props.match.params.id);

    }
    render() {
        const blur=this.props.data?{
            background:`url(${this.props.data.img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',

        }:null;

        return (<div className="song-list-detail">
            {
               this.props.data?<div className="song-list-wrapper">
                  <div className="song-list-header">

                      <div className="header-wrapper">
                          <div className="header-img" style={blur}> </div>
                      </div>
                      <div className="center">
                          <Header text="歌单详情"> </Header>
                      </div>
                      <div className="header-info">
                          <div className="info-img">
                              <img src={this.props.data.img} alt=""/>
                          </div>

                          <div className="header-message">
                              <div className="message-name">
                                  {this.props.data.name}
                              </div>
                              <div className="message-tags">
                                  <span>标签：</span>
                                  {this.props.data.tags.map(v=>(<div className="tag-item">
                                      {v}
                                  </div>))}
                              </div>
                          </div>

                      </div>

                  </div>
                   <div className="song-detail">
                      <div className="detail-broadcast">
                          <div>{`收藏（${this.props.data.collect}）`}</div>
                          <div>{`评论（${this.props.data.comment}）`}</div>
                          <div>{`分享（${this.props.data.share}）`}</div>
                      </div>
                       <div className="detail-intro">{"简介："+this.props.data.introduction}</div>
                   </div>
                   <WhiteSpace> </WhiteSpace>
                   <div className="song-lists">
                       <Title title="歌曲列表"> </Title>
                       <SongList songs={this.props.data.list}> </SongList>
                   </div>

               </div>:""
            }
        </div>)
    }


}
export default songListDetail;