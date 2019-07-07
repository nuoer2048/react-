import axios from 'axios';
import {API} from '../const/host';
import {HOST} from '../const/host';
const GET_COLLECT_SONGS="GET_COLLECT_SONGS";
const GET_USERINFO="GET_USERINFO";
const GET_COLLECT_LIST="GET_COLLECT_LIST";
const GET_SUMMARY="GET_SUMMARY";
const DEL_SONG="DEL_SONG";


const initialState={
    collectSongs:"",
    userInfo:"",
    collectSongList:"",
    summary:""
};
export function person(state=initialState,action) {
    switch (action.type){
        case GET_COLLECT_SONGS:
            return {...state,collectSongs:action.payload};
        case GET_USERINFO:
            return {...state,userInfo:action.payload};
               case GET_COLLECT_LIST:
            return {...state,collectSongList:action.payload};
        case GET_SUMMARY:
            return {...state,summary:action.payload};
        case DEL_SONG:
            return {...state,collectSongList:action.payload}
        default:
            return state;
    }
}
function DelAction(data){
    return{
        type:DEL_SONG,
        payload:data
    }
}
export function DelSongList(id){
    return (dispatch,getState)=>{
        let currentList = window.location.pathname === `${HOST}/me`?getState().person.summary.mySongList : getState().person.collectSongList;
        let delIndex = currentList.findIndex((value,index,arr)=>{

            return value.id ===id
        });
        console.log(delIndex)
        currentList.splice(delIndex,1)
        console.log(currentList)
        dispatch(DelAction(currentList))

    }
}
function getSummaryAction(data){
    return {
        type:GET_SUMMARY,
        payload:data
    }
}
export function getSummary(id){
    return dispatch=>{
        axios.get(`${API}/mock/personal${id}/summary.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSummaryAction(data.data))
            }
        })
    }
}

function getUserInfoAction(data) {
    return {
        type:GET_USERINFO,
        payload:data
    }
}
export function getUserInfo(id){
    return dispatch=>{
        axios.get(`${API}/mock/personal${id}/userInfo.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getUserInfoAction(data.data))
            }
        })
    }
}
function getCollectSongsAction(data) {
    return{
        type:GET_COLLECT_SONGS,
        payload:data
    }
}
function getCollectListAction(data) {
    return{
        type:GET_COLLECT_SONGS,
        payload:data
    }
}
export function getCollectSongs(id) {
   return dispatch=>{
       axios.get(`${API}/mock/personal5/songsInSongList${id}.json`).then(res=>{
           let data = res.data;

           if(data.result){
             console.log(data.data)
               dispatch(getCollectSongsAction(data.data))
           }
       })
   }

}
export function getCollectSongsList(id) {
    return dispatch=>{
        axios.get(`${API}/mock/personal5${id}/collectSongList.json`).then(res=>{
            let data = res.data;

            if(data.result){

                dispatch(getCollectListAction(data.data))
            }
        })
    }

}