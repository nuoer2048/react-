import axios from 'axios';
import {API} from '../const/host';
const FETCH_BANNER ="FETCH_BANNER";
const FETCH_RECOMMOND="FETCH_RECOMMOND";
const FETCH_SONGS="FETCH_SONGS";
const initialState={
bannerData:[],
    recommondData:[],
    songsData:[]
};

/**
 * reducer
 */
export function quku(state=initialState,action) {
    switch(action.type){
        case FETCH_BANNER:
            return {...state,bannerData:action.payload};
        case FETCH_RECOMMOND:
            return {...state,recommondData:action.payload}
        case FETCH_SONGS:
            return {...state,songsData:action.payload}
        default:
            return state;
    }
}

/**
 * action
 */
function bannerDate(data) {
    return{
        type:FETCH_BANNER,
        payload:data
    }
}
function recommondDate(data) {
    return{
        type:FETCH_RECOMMOND,
        payload:data
    }
}function songsDate(data) {
    return{
        type:FETCH_SONGS,
        payload:data
    }
}
export function fetchBanner(){
    return dispatch=>{
        axios.get(`${API}/mock/banner.json`).then(res=>{
            let data = res.data;

            if(data.result){

                dispatch(bannerDate(data.data))
            }
        })
    }
}
export function fetchRecommond(){
    return dispatch=>{
        axios.get(`${API}/mock/recommend.json`).then(res=>{
            let data = res.data;
            if(data.result){
                dispatch(recommondDate(data.data))
            }
        })
    }
}
export function fetchSongs(){
    return dispatch=>{
        axios.get(`${API}/mock/songs.json`).then(res=>{
            let data = res.data;
            console.log(res)
            if(data.result){
                dispatch(songsDate(data.data))
            }
        })
    }
}