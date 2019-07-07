import React from 'react';
import './discovery.less'
import {Link} from 'react-router-dom';
import {Carousel,Icon} from 'antd-mobile';
import Title from "./Title";
import WhileSpace from './WhiteSpace';
import {HOST} from '../const/host'
import {connect} from 'react-redux';
import {getDiscovery} from '../redux/discovery.redux';

@connect(state=>state.discovery,{getDiscovery})
class Discovery extends  React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.getDiscovery();
    }
    storeInfo(id,name){
        let styleInfo={
            id,name
        };
        sessionStorage.setItem("styleInfo",JSON.stringify(styleInfo))
    }
    render(){
        return(
            <div className="discovery-box">
                <Link className="search-btn">
                  <div className="search-inner">
                      <Icon type="search" size="sm"> </Icon>
                      <div>搜索歌曲名单</div>
                  </div>
                </Link>
                <Title title="排行榜"> </Title>
                <div className="ranking-list">
                    <Carousel
                        autoplay={true}
                        infinite
                        selectedIndex={1}
                        dotStyle={{"display":"none"}}
                        dotActiveStyle={{"display":"none"}}
                    >
                        {
                            this.props.data?this.props.data.ranking.map(v=>(
                                <Link to={{
                                    pathname: `${HOST}/ranking`,
                                    state: {id:v.id,name:v.name},
                                }} className="ranking-list-item">
                                    <div className="list-left"><img src={v.cover} alt=""/></div>
                                        <div className="list-right">
                                            <div className="dis-list-top">{v.name} </div>
                                            <div className="dis-list-bottom"> {v.desc}</div>
                                        </div>

                                </Link>
                            )):""

                        }
                    </Carousel>
                </div>
                <WhileSpace> </WhileSpace>
                <Title title="风格"> </Title>
                <div className="discovery-style">
                    {
                      this.props.data.style?this.props.data.style.map(v=>(<Link to={`${HOST}/stylelist`} onClick={()=>this.storeInfo(v.id,v.name)} className="style-item">
                          <img src={v.cover} alt=""/>
                            <div className="style-intro">{v.name}</div>
                      </Link>)):""
                    }
                </div>
            </div>
        )
    }
}
export default Discovery;