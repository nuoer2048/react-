import React from 'react';
import PinkHeader from '../pinkHeader/PinkHeader'
import './MyCollectSongs.less';
import {connect} from 'react-redux';
import SongEditList from '../SongEditList/SongEditList'
import {getSongs} from '../../redux/publicSongs.redux';
import {API} from "../../const/host";

@connect(state=>state.publicSongs,{getSongs})
class MyCollectSongs extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:""
        }
    }
    componentDidMount(){
        let url=`${API}/mock/personal5/songsInSongList33.json`
        // this.props.getCollectSongs(33)
        // axios.get(`${API}/mock/personal5/songsInSongList33.json`).then(res=>{
        //     let data = res.data;
        //
        //     if(data.result){
        //         console.log(data.data)
        //         this.setState({
        //             data:data.data
        //         })
        //     }
        // })
        this.props.getSongs(url)
    }
    render(){
        return(<div className="mycollect-song">
            <PinkHeader title="收藏歌曲"> </PinkHeader>{

                console.log(this.props.songs)

             // this.props.collectSongs?<SongEditList  style={{"position":"fixed","top":"40px","left":"0"}} listStyle={{"marginTop":"90px"}}  option={true} data={this.props.collectSongs}>
             // </SongEditList>:""
        }
        </div>)
    }
}
export default MyCollectSongs