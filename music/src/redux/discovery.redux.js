import {API} from '../const/host';
import axios from 'axios';
const GET_DATA="GET_DATA";
const GET_RANKING_LIST="GET_RANKING_LIST";
const GET_RANKING_COVER ="GET_RANKING_COVER";
const STYLE_SONG_LIST="STYLE_SONG_LIST";
const initialState={
    data:"",
    rankingList:'',
    rankingCover:"",
    styleSongList:""
};
export function discovery(state=initialState,action){
    switch(action.type){
        case GET_DATA:
            return {...state,data:action.payload};
        case GET_RANKING_LIST:
            return {...state,rankingList:action.payload};
        case GET_RANKING_COVER:
            return {...state,rankingCover:action.payload};
        case STYLE_SONG_LIST:
            return {...state,styleSongList:action.payload}
            default:
            return state;
    }
}
function getDiscoveryDateAction(data){
    return{
        type:GET_DATA,
        payload:data
    }
}
function getRankingListAction(data){
    return{
        type:GET_RANKING_LIST,
        payload:data
    }
}
function getStyleSongListAction(data){
    return{
        type: STYLE_SONG_LIST,
        payload:data
    }
}
export function getStyleSongsList(id){
    return dispatch=>{
        axios.get(`${API}/mock/discovery/style/styleSongList${id}.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getStyleSongListAction(data.data))
            }
        })
    }
}
function getRankingCoverAction(data){
    return{
        type:GET_RANKING_COVER,
        payload:data
    }
}
export function getRankingList(id){
    return dispatch=>{
        axios.get(`${API}/mock/discovery/ranking-detail${id}list1.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getRankingListAction(data.data))
            }
        })
    }
}

export function getRankingCover(id){
    return dispatch=>{
        axios.get(`${API}/mock/discovery/ranking-detail${id}.json`).then(res=>{
            let data = res.data;
            if(data.result){
                console.log(data.data.cover);
                dispatch(getRankingCoverAction(data.data))
            }
        })
    }
}

export function getDiscovery(){
    return dispatch=>{
        axios.get(`${API}/mock/discovery/discovery.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getDiscoveryDateAction(data.data))
            }
        })
    }
}