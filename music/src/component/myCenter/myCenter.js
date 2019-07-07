import React from 'react';
import './myCenter.less';
import PinkHeader from '../pinkHeader/PinkHeader'
import WhiteSpace from '../WhiteSpace';
import {getUserInfo} from '../../redux/person.redux';
import {connect} from 'react-redux';
import { ImagePicker } from 'antd-mobile';
@connect(state=>state.person,{
    getUserInfo
})
class myCenter extends React.Component{
constructor(props){
    super(props)
}
componentDidMount(){
    this.props.getUserInfo(this.props.match.params.id);
}
render(){
    return(<div className="user-center">
        <div className="user-center-header">
            <PinkHeader title="修改资料">
        </PinkHeader></div>
        <div className="user-center-avtar">
              <div className="user-center-img">
                  <img src='./bg.jpg' alt=""/>
              </div>
            <div className="user-center-upload">
                <span>点击上传头像</span>
                <input type="file"/>
            </div>
        </div>
        <WhiteSpace> </WhiteSpace>
        <div className="user-center-info">
            <span > 昵称:</span>
            <div>
                <input type="text" id="nikeName" value={this.props.userInfo.nickName}/>
            </div>
        </div>
    </div>)
}
}
export default myCenter;