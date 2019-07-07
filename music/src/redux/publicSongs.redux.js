import axios from 'axios';
import {Toast} from 'antd-mobile';
const GET_SONGS="GET_SONGS";
const MARK_SONG ="MARK_SONG";
const BEGIN_PLAY ="BEGIN_PLAY";
const STOP_PLAY="STOP_PLAY";
const DEL_SONGS="DEL_SONGS";
const CLEAR_SONG="CLEAR_SONG";
const initialState={
    songs:'',
    play:false
};
export function publicSongs(state=initialState,action){
    switch (action.type){
        case GET_SONGS:
            return{...state,songs:action.payload}
        case BEGIN_PLAY:
            return {...state,play:true}
        case STOP_PLAY:
            return{...state,play:false}
        case CLEAR_SONG:
            return{...state,songs:''}
        case DEL_SONGS:
            return{...state,songs:action.payload}
        default:
            return state
    }
}
function clearSongAction() {
    return {
        type:CLEAR_SONG
    }
}
function getSongsAction(data) {
    return{
        type:GET_SONGS,
        payload:data
    }
}
export function beginPlay() {
    return{
        type:BEGIN_PLAY
    }
}
export function stopPlay() {
    return{
        type:STOP_PLAY
    }
}
export function getSongs(url) {
    return dispatch=>{
        dispatch(clearSongAction());
        axios.get(url).then(res=>{
            let data=res.data;
            if(data.result){
                dispatch(getSongsAction(data.data))
            }
        })
    }
}
export function delSongAction(data) {
    return{
        type:DEL_SONGS,
        payload:data
    }
}
export function delSong() {
    let canDel=true;
    return (dispatch,getState)=>{
        let songList = getState().publicSongs.songs.filter(v=>v.marked);
        let currentSongs = getState().musicPlayer.currentSongs;
           songList.map(v=>{
               if(v.src===currentSongs.src){
                   canDel=false;
               }
           })
        if(canDel){
            dispatch(delSongAction(getState().publicSongs.songs.filter(v=>!v.marked)))
        }
    }
}
function markSongsAction(data) {
    return{
        type:MARK_SONG,
        payload:data
    }

}
export function markSongs(id,all) {
    return (dispatch,getState)=>{
        let songList = getState().publicSongs.songs;
        songList.forEach(v=>{
            if(!id && all){
                v.marked = true
            }else if(!id && !all){
                v.marked = false
            } else{
                if(v.id === id){
                    if(!v.marked){

                        v.marked = true
                    }else{
                        v.marked = false
                    }
                }
            }
        });
        dispatch(markSongsAction(songList))
    }
}