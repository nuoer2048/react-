import React from 'react';
import './Ranking.less';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import SongsList from "../../component/SongsList/SongsList";
import{getRankingCover}from '../../redux/discovery.redux'
import {getSongs} from '../../redux/publicSongs.redux';
import {HOST} from '../../const/host'
@connect(state=>state,{

    getRankingCover,
    getSongs
})
class Ranking extends  React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let data = this.props.location.state;
        this.props.getRankingCover(data.id);
        let url = `${HOST}/mock/discovery/ranking-detail${data.id}list1.json`
        this.props.getSongs(url);
        console.log(data);

    }
    render(){
        return(<div className=" ranking-box">
          <div className="ranking-header">
              <div className="ranking-top">
                  <Header text={`${this.props.location.state.name}`}> </Header>
                  <div className="top-img">
                      {
                          // console.log(this.props.name)
                          this.props.discovery.rankingCover.cover?<img src={this.props.discovery.rankingCover.cover} alt=""/>:<img src="./bg.jpg" alt=""/>
                      //
                      }
                  </div>
              </div>
          </div>
            <div className="ranking-content">
                {
                  this.props.publicSongs.songs?<SongsList songs={this.props.publicSongs.songs}> </SongsList>:""
                }
            </div>
        </div>)
    }
}
export default Ranking;