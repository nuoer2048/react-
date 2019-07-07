import React from 'react';
import './Stylelist.less';
import {connect} from 'react-redux';
import {getStyleSongsList} from '../../redux/discovery.redux';
import PinkHeader from '../pinkHeader/PinkHeader'
import{Link} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
import {HOST} from '../../const/host'
@connect(state=>state.discovery,{getStyleSongsList})
class Stylelist extends React.Component{
constructor(props){
    super(props)
    this.state = {
        styleInfo:""
    }
}
    componentDidMount(){
        this.setState({
            styleInfo:JSON.parse(sessionStorage.getItem("styleInfo"))
        },()=>{
            this.props.getStyleSongsList(this.state.styleInfo.id);
        });
    }
render(){
    return(<div className="styleList-box">
           <div className="styleList-header">
               <PinkHeader title={this.state.styleInfo.name}> </PinkHeader>
           </div>
        <div className="stylelist-wrapper">
            <QueueAnim delay={300} type="top">
            {
                this.props.styleSongList?this.props.styleSongList.map(v=>(<div >

                    <Link to={{
                        pathname: `${HOST}/stylelistdetail`,
                        state: {id:v.id,name:v.name},
                    }} className="styleList-item">
                        <div className="style-left"><img src={v.cover} alt=""/></div>
                        <div className="style-right">
                            <div className="style-right-top"> {v.name}</div>
                            <div className="style-right-bottom"> {`总共${v.num}首`}</div>
                        </div>
                    </Link>
                </div>)):""
            }
            </QueueAnim>
        </div>

    </div>)
}

}
export default Stylelist;