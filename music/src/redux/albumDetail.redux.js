import axios from 'axios';
import {API} from "../const/host";
const GET_ALBUM_DETAIL="GET_ALBUM_DETAIL";
const initailState={
albumDetailData:''
};
export function albumDetail(state=initailState,action){
    switch (action.type){
        case GET_ALBUM_DETAIL:
            return{...state,albumDetailData:action.payload};
        default:
            return state;
    }
}
function getAlbumDtailAction(data) {
    return{
        type:GET_ALBUM_DETAIL,
        payload:data
    }
}

export function getAlbumDetail(id) {
    return dispatch=>{
        axios.get(`${API}/mock/albumDetail/detail${id}.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(getAlbumDtailAction(data.data))
            }
        })
    }
}