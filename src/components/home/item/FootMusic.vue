<template>
    
    <div class="FootMusic">

<div class="footleft" @click="updateDetailShow">
       
    <img :src="playList[playListIndex].al.picUrl" alt="">
    <div class="word">
        <p class="a">{{playList[playListIndex].name}}</p>
        <span class="b">横滑切换上下首哦</span>
    </div>
</div>
<div class="footright">
<van-icon  class="icon" name="play" size=".6rem" @click="play" v-if="isbtnShow"> </van-icon>
<van-icon  class="icon" name="stop" size=".6rem" @click="play" v-else> </van-icon>
<van-icon class="icon" name="wap-nav" size=".6rem"> </van-icon>
</div>
<audio 
ref="audio" 
:src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`" ></audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width:'100%' }" >
    <MusicDetail 
    :musicList="playList[playListIndex]" 
    :play="play" 
    :isbtnShow="isbtnShow"
    :addDuration="addDuration"
    ></MusicDetail>
    </van-popup>
</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MusicDetail from '@/components/home/item/MusicDetail.vue'
export default{
    data(){
        return
        {
            interVal:0
        }
    },
computed:{
    ...mapState(['playList','playListIndex',"isbtnShow","detailShow"])
    
},
    updated(){
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
    this.addDuration()
  },
    mounted(){
       this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        //console.log(this.$refs.audio);
   
   },
    methods:{
        play:function(){
            //判断音乐是否播放
            if(this.$refs.audio.paused){
                     this.$refs.audio.play();
                      this.updateIsbtnShow(false)
                      this.updateTime()//播放就调用函数进行传值
            }else{
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)//暂停便清除定时器
            }
           
        },
        addDuration:function() {
            this.updateDuration(this.$refs.audio.duration)
        },
        updateTime:function(){
           this.interVal= setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },1000)
        },
        ...mapMutations(["updateIsbtnShow","updateDetailShow","updateCurrentTime","updateDuration"])
    },
    watch:{
        playListIndex:function(){ //监听下标如果发生改变自动发生改变
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){//本来是暂停状态，改变图标
                this.updateIsbtnShow(false)
            }
        },
        playList:function(){
            if(this.isbtnShow){
                this.$refs.audio.autoplay=true
            }
        }
    },
    components:{
        MusicDetail
    }
}

</script>
<style lang="less" scoped>
.FootMusic{

    width: 100%;
    height: 1.4rem;
    background-color: white;
    position: fixed;
    border-top:1px solid #999;
    bottom: 0;
    display: flex;
    padding: .2rem;
    justify-content: space-between;
    .footleft{

        display: flex;
        justify-content: space-around;
        width: 60%;
        height: 100%;
        align-items: center;
        .word{
        margin-right: .4rem;
           .a{
               font-weight: 800;
           }
           .b{
            font-size: .22rem;
            opacity: 0.4;
        }
        }
    
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }
    .footright{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: .6rem;
            height: .6rem;
        }
    }

}

</style>