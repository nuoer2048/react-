import React from 'react';
import './CreateSongsList.less';
import {connect} from 'react-redux';
import {getSongs} from '../../redux/publicSongs.redux'
import PinkHeader from '../pinkHeader/PinkHeader'
import SongEditList from '../SongEditList/SongEditList';
import {API}from '../../const/host';
@connect(state=>state.publicSongs,{
    getSongs
})
class CreatSongsListDetail extends React.Component{
   constructor(props){
      super(props)
   }
    componentDidMount(){
       let id = this.props.match.params.id;
       let url =`${API}/mock/personal5/songsInSongList${id}.json`;
       this.props.getSongs(url);
    }
   render(){
       return(<div className="createSongsList-box">
           <PinkHeader title="歌单详情"> </PinkHeader>
           {

               this.props.songs? <SongEditList option={true} data={this.props.songs} style={{"position":"fixed","top":"40px","left":"0"}} listStyle={{"marginTop":"90px"}} />:<div className="createListNotFound"> 歌曲上新中，请耐心的等待 </div>
           }
       </div>)
   }
}
export default CreatSongsListDetail