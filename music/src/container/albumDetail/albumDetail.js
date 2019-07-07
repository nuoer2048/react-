import React from 'react';
import './albumDetail.less';
import 'antd-mobile/dist/antd-mobile.css'
import {connect} from 'react-redux';
import { Tabs} from 'antd-mobile';
import{StickyContainer, Sticky} from 'react-sticky';
import {getAlbumDetail} from "../../redux/albumDetail.redux";
import {getComment,clearComment} from "../../redux/comment.redux";
import Header from "../../component/Header/Header";
import CommentList from "../../component/commentList/commentList"
import SongsList from "../../component/SongsList/SongsList";
function renderTabBar(props) {
    return (<Sticky topOffset={-40}>
        {({ style }) => <div style={{ ...style, top:40,zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
@connect(state=>state,{
    getAlbumDetail,getComment,clearComment
})
class albumDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tabs: [
                {title: "全部歌曲"},
                {title: "简介"},
                {title: "评论"},
            ]
        }
        this.tabChange=this.tabChange.bind(this);
    };
    componentDidMount(){

        this.props.getAlbumDetail(this.props.match.params.id);

    }
    tabChange(tab,index){
        if(index===2&&!this.props.commentDetail.hasRequested){
            this.props.getComment(this.props.match.params.id)
        }
    }
    componentWillUnmount(){
        this.props.clearComment();
        window.removeEventListener('scroll', this.albumScroll);
    }

    render(){

        const blur=this.props.albumDetail.albumDetailData?{
            background:`url(${this.props.albumDetail.albumDetailData.img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',

        }:null;
        return(
            <div className="album">
                {
                    this.props.albumDetail.albumDetailData?<div className="album-wrapper">
                        <div className="album-header">
                            <div className="album-header-img-box" >
                                <div className="header-img" style={blur}> </div>
                            </div>
                            <div className="album-header-center">
                                <Header text="专辑列表"> </Header>
                            </div>
                            <div className="album-header-info">
                                <div className="album-info-img">
                                    <img src={this.props.albumDetail.albumDetailData.img} alt=""/>
                                </div>
                                <div className="album-info-message">
                                    <div className="album-info-title">
                                        <h3>   {this.props.albumDetail.albumDetailData.name}</h3>
                                    </div>
                                    <div className="album-info-body">
                                        <div>{this.props.albumDetail.albumDetailData.artist} </div>
                                        <div> {this.props.albumDetail.albumDetailData.date}</div></div>
                                </div>

                            </div>


                        </div>
                        <StickyContainer className="album-content">
                            <Tabs tabs={this.state.tabs}
                                  initialPage={0}
                                  onChange={(tab,index) => { this.tabChange(tab,index); }}
                                  tabBarUnderlineStyle={{width:"25%",marginLeft:'4%'}}
                                  renderTabBar={renderTabBar}
                            >


                                <SongsList songs={this.props.albumDetail.albumDetailData.songs}> </SongsList>
                                <div className="album-intro">{this.props.albumDetail.albumDetailData.introduction}</div>
                                    <CommentList comments={this.props.commentDetail.comment.data}>

                                    </CommentList>

                            </Tabs>
                        </StickyContainer>


                    </div>:""
                }
            </div>
        )
    }
}
export default albumDetail;