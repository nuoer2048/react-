import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Carousel}from 'antd-mobile';
import{fetchBanner,fetchRecommond,fetchSongs} from "../redux/quku.redux";
import WhiteSpace from './WhiteSpace';
import Title from './Title'
import './Quku.css';
import SongsList from './SongsList/SongsList';
import {HOST} from "../const/host";

@connect(
    state=>state.quku,
    {fetchBanner,fetchRecommond,fetchSongs}
)
class Quku extends  React.Component{
    constructor(props) {
        super(props);
        this.state ={};
    }
    componentDidMount(){
        this.props.fetchBanner();
        this.props.fetchRecommond();
        this.props.fetchSongs()
    }
    render(){

        return(
            <div id="quku">
                <div className="banner">
                    {

                        this.props.bannerData?
                            <Carousel
                                autoplay={true}
                                infinite
                                selectedIndex={1}
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => console.log('slide to', index)}
                            >
                                {
                                    this.props.bannerData.map(v=>(
                                        <Link
                                            to={`${HOST}/albumDetail/3`}
                                            key={v} style={{ display: 'inline-block', width: '100%'}}>
                                            <img src={v} alt={v} className="banner-img"  onLoad={() => {
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}/>
                                        </Link>
                                    ))
                                }

                            </Carousel>
                            :""
                    }
                </div>
                <WhiteSpace> </WhiteSpace>
                <Title title="每日推荐"> </Title>
                <div className="recommond">
                    {
                        this.props.recommondData?<div className="recommond-item">
                            {
                                this.props.recommondData.map(v=>(
                                    <Link to={`${HOST}/songListDetail/${v.id}`} key={v.src} >
                                        <img src={v.src} alt={v.src} className="recommond-img"/>
                                            <div className="recommond-name">{v.name}</div>
                                    </Link>
                                ))
                            }
                        </div>:""
                    }
                </div>
                <WhiteSpace> </WhiteSpace>
                <Title title="曲库好歌"> </Title>
                <div className="songList">
                    {
                        this.props.songsData?<SongsList songs={this.props.songsData}> </SongsList>:""
                    }
                </div>
            </div>
        )
    }
}
export default Quku;