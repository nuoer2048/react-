import axios from 'axios';
import {API} from "../const/host";
const GET_COMMENT="GET_COMMENT";
const ClEAR_COMMENT="ClEAR_COMMENT";
const NO_COMMENT="NO_COMMENT";
const NO_MORECOMMENT="NO_MORECOMMENT";
const initialState={
    comment:'',
    msg:'',
    hasRequested:false
};
export function commentDetail(state=initialState,action){
    switch (action.type){
        case GET_COMMENT:
            return{...state,comment:action.payload, hasRequested:true};
        case ClEAR_COMMENT:
            return{...state,comment:'',hasRequested:false};
        default:
            return state;
    }
}
function clearCommentAction() {
    return{
        type:ClEAR_COMMENT
    }
}
export function clearComment() {
    return dispatch=>{
      dispatch(clearCommentAction)
    }
}
function getCommentAction(data) {
    return{
        type:GET_COMMENT,
        payload:data
    }
}

export function getComment(id) {
    return dispatch=>{
        axios.get(`${API}/mock/albumDetail/comment${id}/comment1.json`).then(res=>{
            let data = res.data;

            if(data.result){

                dispatch(getCommentAction(data))
            }
        })
    }
}