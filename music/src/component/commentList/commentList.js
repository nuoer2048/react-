import React from 'react';
import {connect} from 'react-redux';
import './commentList.less'
@connect(
    state=>state.commentDetail
)
class commentList extends React.Component{
    render(){
        return(<div className="comment-box">
            {

                // console.log(this.props.comments)
                this.props.comments?<div className="comment-wrapper">
                    {
                    this.props.comments.map((v,i)=>(<div className="comment-items">

                        <div className="item-left">
                            <div className="left-top">
                                <div className="left-top-img">
                                    {v.avatar? <img src={v.avatar} alt=""/>:""}
                                </div>
                                <div className="left-top-author">{v.nickName} </div>
                            </div>
                            <div className="left-bottom"> {v.content}</div>
                        </div>
                        <div className="item-right">{v.createDate}</div>
                    </div>))

                    }
                </div>:""
            }
        </div>)
    }
}
export default commentList;