const GET_MUSIC="GET_MUSIC";
const ADD_MUSIC ="ADD_MUSIC";
const DEL_MUSIC="DEL_MUSIC";
const THIS_MUSIC="THIS_MUSIC";
const ENDED ="ENDED";
const songsDate=[
    {
        src:"http://qqma.tingge123.com:83/123/2016/10/青蛙乐队 - 小跳蛙.mp3",
        artist:"青蛙乐队",
        name:"小跳蛙",
        img:"http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg",
        id:"66575568441"
    },
    {
        src:"http://qqma.tingge123.com:83/20081119/甜甜的.mp3",
        artist:"周杰伦",
        name:"甜甜的",
        img:"http://singerimg.kugou.com/uploadpic/softhead/400/20171026/20171026100450393.jpg",
        id:"66575568442"
    },
    {
        src:"http://qqma.tingge123.com:83/20081120/不得不爱.mp3",
        artist:"潘玮柏",
        name:"不得不爱",
        img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=781787101,1026788150&fm=27&gp=0.jpg",
        id:"66575568443"
    },
    {
        src:"http://qqma.tingge123.com:83/123/2016/07/张韶涵 - 再见之前.mp3",
        artist:"张韶涵",
        name:"再见之前",
        img:"http://games.enet.com.cn/jzimages/201009/s1283410316.jpg",
        id:"66575568444"
    },
    {
        src:"http://qqma.tingge123.com:83/123/2016/05/G.E.M.邓紫棋 - 画.mp3",
        artist:"邓紫棋",
        name:"画",
        img:"http://img.18183.com/uploads/allimg/140510/41-140510145612.jpg",
        id:"66575568445"
    },
    {
        src:"http://qqma.tingge123.com:83/123/2014/12/无字碑-张靓颖.mp3",
        artist:"张靓颖",
        name:"无字碑",
        img:"http://singerimg.kugou.com/uploadpic/softhead/400/20170628/20170628110356447.jpg",
        id:"66575568446"
    },
    {
        src:"http://qqma.tingge123.com:83/123/2010/09/叶子-阿桑.mp3",
        artist:"阿桑",
        name:"叶子",
        img:"http://star.kuwo.cn/star/starheads/180/66/26/1776695622.jpg",
        id:"66575568447"
    },
    {
        src:"http://qqma.tingge123.com:83/20081117/认真的雪.mp3",
        artist:"薛之谦",
        name:"认真的雪",
        img:"http://img14.3lian.com/201512/02/9478d19283ce6f990741fbac92203132.jpg",
        id:"66575568449"
    },

    {
        src:"http://qqma.tingge123.com:83/20081117/杀手.mp3",
        artist:"林俊杰",
        name:"杀手",
        img:"http://wenwen.soso.com/p/20070621/20070621060503-1458706809.jpg",
        id:"66575568448"
    },
];
const initialState={
currentSongs:'',
    songs:[],
    shouldRender:false
};
export function musicPlayer(state=initialState,action){
    switch (action.type){
        case GET_MUSIC:
            return {...state,shouldRender:true}
        case ADD_MUSIC:
            return {...state,songs:this.songsData}
        case DEL_MUSIC:
            return {...state,songs:action.payload}
        case THIS_MUSIC:
            return {...state,currentSongs:action.payload}
        default:return state
    }
}
let currentIndex=-1;
function getMusicAction() {
    return {
        type:GET_MUSIC
    }
}
export function getMusic() {
    return dispatch=>{
        dispatch(getMusicAction())
    }
}
function addMusicAction() {
    return{
        type:ADD_MUSIC
    }
}
export function addMusic(data) {
    this.songsData.push(data);
    return dispatch=>{
          dispatch(addMusicAction())
    }
}
function delMusicAction(data) {
    return{
        type:DEL_MUSIC,
        payload:data
    }
}
export function delMusic(id) {
    let index ='';
  this.songsData.forEach((v,i)=>{
      if(v.id==id){
          index = i;
      }
  });
    this.songsData.splice(index,1);
    return delMusicAction(this.songsData)
}
function playThisAction(data) {
    return{
        type:THIS_MUSIC,
        payload:data
    }
}
export function playThis(data) {
    return (dispatch, getState) => {
        dispatch(playThisAction(data));
        if (getState().publicSongs.play) {
            let songList = getState().publicSongs.songs;
            let currentSong = getState().musicPlayer.currentSongs;
            songList.forEach((v, i) => {
                if (v.id === currentSong.id) {
                    currentIndex = i
                }
            });
            console.log(currentIndex)
            if (currentIndex === songList.length - 1) {
                currentIndex = -1
                console.log(`复位${currentIndex}`);
            }
        }

    }

}
export function playThisList() {
    return (dispatch,getState)=>{
        let songList = getState().publicSongs.songs;
        if(getState().publicSongs.play){
            dispatch(playThisAction(songList[currentIndex+1]))
        }
    }
}
export function reserCurrent() {
    return (dispatch,getState)=>{
        let songList = getState().publicSongs.songs
        let currentSong =  getState().musicPlayer.currentSong
        songList.forEach((v,i)=>{
            if(v.id === currentSong.id){
                currentIndex = i
            }
        });
        if(currentIndex===songList.length-1){
            currentIndex=-1
            console.log(`复位${currentIndex}`);
        }
    }
}