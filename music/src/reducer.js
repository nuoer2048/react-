import {quku} from './redux/quku.redux';
import {musicPlayer} from "./redux/musicPlay.redux";
import {publicSongs} from "./redux/publicSongs.redux";
import {songListDetail} from "./redux/songListDetail.redux";
import {albumDetail} from "./redux/albumDetail.redux";
import {commentDetail} from "./redux/comment.redux";
import {discovery} from "./redux/discovery.redux";
import {person} from "./redux/person.redux";
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    quku,
    musicPlayer,
    publicSongs,
    songListDetail,
    albumDetail,
    commentDetail,
    discovery,
    person
});
export default rootReducer;