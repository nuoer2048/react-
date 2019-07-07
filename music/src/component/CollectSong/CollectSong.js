import  React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import './CollectSong.less';
import {Button} from 'antd-mobile';
class CollectSong extends React.Component{
    constructor(props){
        super(props)
    }

    /**
     * 关闭弹出层
     */
    colseCollect(){
this.props.closeCollect();
    }
    render(){
        return(<div className="collect-songs">

               <CSSTransitionGroup

                    transitionName="collect-inner-wrap"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}

                >
                   {this.props.show?<div className="collect-inner" onClick={()=>this.colseCollect()}>

                     </div>:""}
                </CSSTransitionGroup>
            <CSSTransitionGroup
                transitionName="collect-inner-slide"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {
                    this.props.show?<div className="collect-container">
                        <div className="container-header item">收藏歌曲到</div>
                        <div className="container-title item">我收藏的歌单</div>
                        <div className="container-add"><input type="text" placeholder="添加到我的歌单"/></div>
                           <div className="collect-list">
                               <div className="lists-name">
                                   {
                                       this.props.data.map(v=>(
                                           <div className="select-item-wrapper item" key={v.id}>
                                               <div className="select-item">
                                                   {v.name}
                                               </div>

                                           </div>
                                       ))
                                   }
                               </div>
                               <div className="create-list">
                                   <div className="create-input">
                                       <label htmlFor="create-song">创建歌单:</label>
                                       <input type="text" placeholder="请输入歌单名字" className="create-song" id="create-song"/>
                                   </div>
                                   <Button type="primary">确定</Button>
                               </div>
                           </div>

                    </div>:''
                }

            </CSSTransitionGroup>




        </div>)
    }
}
export default CollectSong;