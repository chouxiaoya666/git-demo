import { createStore } from 'vuex'
import {getMusicLyric} from '@/request/api/item.js'
import {getPhoneLogin} from '@/request/api/home.js'
export default createStore({
  state: {
    playList:[{//默认值
     al:{
      id: 128462572,
      name: "做勇敢的大人",
      pic: 109951166058539620,
      picUrl: "https://p2.music.126.net/TR-VPkh_dLqe8DV_vCDs-g==/109951166058539622.jpg",
      pic_str: "109951166058539622"
     },
     id: 1850504171

    }],
    isFooterMusic:true,
    playListIndex:0,//默认下标为0,
    isbtnShow:true,//暂停按钮的显示
    detailShow:false,//歌词
    lyriclist:{},
    currentTime:0,
    isLogin:false,
    duration:0,//歌曲总时长
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex = value
    },
    updateDetailShow:function(state){
      state.detailShow = !state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyriclist = value
    },
    updateCurrentTime:function(state,value){
     // console.log(state.currentTime);
      state.currentTime = value
    },
    updateDuration:function(state,value){
      state.duration = value
    },
    updateLogin:function(state,value){
      state.isLogin = value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      //console.log(res)
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin: async function(context,value){
      let res=await getPhoneLogin(value)
      //console.log(res);
      return res
    }
  },
  modules: {
  }
})
