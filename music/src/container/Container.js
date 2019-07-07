import React from 'react';
import {Route,withRouter} from 'react-router-dom';
import Discovery from '../component/Discovery';
import Me from '../component/Me'
import Quku from '../component/Quku'
import SongListDetail from './songListDetail/songListDetail'
import AlbumDetail from './albumDetail/albumDetail';
import Ranking from '../component/Ranking/Ranking'
import Stylelist from '../component/StyleList/Stylelist'
import StyleListDetail from '../component/StyleListDetail/StyleListDetail'
import MyCollectSongs from '../component/MyCollectSongs/MyCollectSongs';
import myCenter from '../component/myCenter/myCenter'
import CreatSongsListDetail from '../component/createSongsList/CreatSongsListDetail'
import {HOST} from '../const/host';
import {setRoute} from "../util/backTo"

@withRouter
class Container extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){

        console.log(window.location.pathname);
        if(window.location.pathname === `${HOST}/`){
            this.props.history.push(`${HOST}/quku`)
        }
    }
    componentWillUpdate(){
        setRoute(this.props.location.pathname)
    }
    render(){
return(
    <div className="container">
        <Route path={`${HOST}/quku`} component={Quku}/>
        <Route path={`${HOST}/me`} component={Me}/>
        <Route path={`${HOST}/discovery`} component={Discovery}/>
        <Route path={`${HOST}/songListDetail/:id`} component={SongListDetail}/>
        <Route path={`${HOST}/albumDetail/:id`} component={AlbumDetail}/>
        <Route path={`${HOST}/ranking`} component={Ranking}/>
        <Route path={`${HOST}/stylelist`} component={Stylelist}/>
        <Route path={`${HOST}/stylelistdetail`} component={StyleListDetail}/>
        <Route path={`${HOST}/mycollectsongs/:id`} component={MyCollectSongs}/>
        <Route path={`${HOST}/mycenter/:id`} component={myCenter}/>
        <Route path={`${HOST}/createSongsListDetail/:id`} component={CreatSongsListDetail}/>




    </div>
)
    }
}
export default Container;