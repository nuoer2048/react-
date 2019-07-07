import axios from 'axios';
import {API} from "../const/host";
const GET_SONG_LIST_DETAIL="GET_SONG_LIST_DETAIL";
const initialState={
    data:''
};
export function songListDetail(state=initialState,action) {
    switch (action.type){
        case GET_SONG_LIST_DETAIL:
            return{...state,data:action.payload};
        default:
            return state;
    }
}

function getSongListDetailAction(data) {
    return{
        type:GET_SONG_LIST_DETAIL,
        payload:data
    }
}
export function getSongListDetail(id) {
    return dispatch=>{
        axios.get(`${API}/mock/songListDetail/detail${id}.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getSongListDetailAction(data.data))
            }
        })
    }
}