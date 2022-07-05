<template>
<img  class="back" :src="musicList.al.picUrl" alt="">
  <div class="detailtop">
      <div class="topleft">
        <van-icon name="arrow-left" size=".6rem" @click="backhome"></van-icon>
        <div class="message">
            <Vue3Marquee>
            <p>{{musicList.name}}</p>
         </Vue3Marquee>
            
            <span v-for="item in musicList.ar" key="item">
                {{item.name}}
            </span> 
            <van-icon name="arrow" size=".2rem" color="#999"></van-icon>
        </div>
      </div>
      <div class="topright">

        <van-icon name="question" size=".6rem"></van-icon>
      </div>
  </div>

  <div class="detailConten" v-show="!isLyricshow">
<img src="@/assets/needle.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
<img src="@/assets/disc-plus.png" alt="" class="img_cd">
<img :src="musicList.al.picUrl" alt="" class="img_ar" @click="isLyricshow=true" :class="{img_ar_active:!isbtnShow,img_ar_pause:isbtnShow}">
  </div>
  <div class="musicLyric" ref="musicLyric"  v-show="isLyricshow">
     <p v-for="item in lyric" :key="item" :class="{active: (currentTime*1000>=item.time && currentTime*1000<item.pre)}">
     {{item.lrc}}
     </p>
      </div>
  <div class="detailfoot">
      <div class="footTop">
          <van-icon name="like-o" size=".7rem"></van-icon>
          <van-icon name="down" size=".7rem"></van-icon>
          <van-icon name="music-o" size=".7rem"></van-icon>
          <van-icon name="chat" size=".7rem"></van-icon>
          <van-icon name="more-o" size=".7rem"></van-icon>
      </div>
      
<div class="footContent">

    <input type="range" class="range" min="0" :max="duration" step="0.05" v-model="currentTime">

</div>
<div class="footer">
    <van-icon name="exchange" size=".5rem"></van-icon>
          <van-icon name="arrow-left" size=".5rem" @click="goPlay(-1)"></van-icon>
          <van-icon name="play-circle-o" size="1rem" @click="play" v-if="isbtnShow"></van-icon>
           <van-icon name="pause-circle-o" size="1rem" @click="play" v-else></van-icon>
          <van-icon name="arrow" size=".5rem" @click="goPlay(1)"></van-icon>
          <van-icon name="ascending" size=".5rem"></van-icon>
</div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex';

export default {
    data(){
        isLyricshow:false
    },
    computed:{
        
       ...mapState(['lyriclist','currentTime','playListIndex','playList','duration']) ,
        lyric:function(){
        let arr;
        if(this.lyriclist.lyric){
                arr = this.lyriclist.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                let min=item.slice(1,3);
                let sec = item.slice(4,6);
                let mill = item.slice(7,10);
                let lrc = item.slice(11,item.length)
                let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill) 
                if(isNaN(Number(mill))){
                    mill=item.slice(7,9)
                    lrc=item.slice(10,item.length)
                     time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)  
                }
                 
                 //console.log(min,sec,Number(mill),lrc,time);
                  return {min,sec,mill,lrc,time}
            })
            arr.forEach((item,i) => {
                    if(i===arr.length-1 ||isNaN(arr[i+1].time)){
                        item.pre=0
                    }else{
                        item.pre=arr[i+1].time
                    }
                });
        }
        
       // console.log(arr);
        return arr;
        },
    },
    mounted(){
       // console.log(this.musicList)
      // console.log(this.lyriclist.lyric);
      this.addDuration(0)
    },
  props: ['musicList','isbtnShow','play','addDuration'],
  methods:{
      backhome:function(){
          this.isLyricshow = false;
          this.updateDetailShow()
      },
      goPlay:function(num){
          let index = this.playListIndex+num
            if(index<0){
                index = this.playList.length-1
                
    }else if(index ==this.playList.length){
        index=0
    }
    this.updatePlayListIndex(index)
      },
     ...mapMutations(['updateDetailShow','updatePlayListIndex']) 
  },
  watch:{
      currentTime:function(newvalue){
          let p=document.querySelector("p.active")
          //console.log([p]);
          if(p){
          if(p.offsetTop>300){
              this.$refs.musicLyric.scrollTop=p.offsetTop-300;
          }
          }
          if(newvalue==this.duration){
              
              if(this.playListIndex===this.playList.length-1){
                  this.updatePlayListIndex(0)
                  this.play()
              }else{
                  this.updatePlayListIndex(this.playListIndex+1)
              }
          }
        //  console.log(this.$refs.musicLyric)
      }
  },
  components:{
      Vue3Marquee
  }
  
};
</script>
<style lang="less">
.back{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(1.6rem);
}
.detailtop{
    width: 100%;
    height:1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;
     
    color:white;
    .topleft{
        color: white;
        display: flex;
        width: 30%;
        align-items: center;
        justify-content:space-between ;
        .message{
            margin-left: .2rem;
        }
            span{
                color: white;
                opacity: .5;
                font-size: .25rem;
            }
           
    }
}

.detailConten{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img_needle{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-14deg);
        transition: all 2s;
    }
    .img_needle_active{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }
    .img_cd{
        width: 5rem;
        height: 5rem;
        position:absolute;
        bottom: 2.3rem;
        z-index: -1;
    }
    .img_ar{
        position: absolute;
       
         width: 3.15rem;
        height: 3.15rem;
        top: 2.63rem;
        border-radius: 50%;
        animation: rotate_ar 10s linear infinite;
    }
    .img_ar_active{
        animation-play-state: running;
    }
    .img_ar_pause{
        animation-play-state: paused;
    }
    @keyframes rotate_ar {
        0%{
            transform: rotateZ(0deg);
        }
        100%{
        transform: rotateZ(360deg);
        }
    }
}
.musicLyric{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:.3rem;
    overflow: scroll;
   p{
       color: rgb(190, 181, 181);
       margin-bottom: .4rem;
    }
    .active{
        color: white;
        font-size: .5rem;

    }
}
.detailfoot{
    color: white;
        width: 100%;
        height: 3rem;
        position:absolute;
        align-items: center;
        bottom: 0;
    .footTop{
        align-items: center;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
    }
    .footContent{
          width: 100%;
        height: 1rem;
    }
    .range{
        width: 100%;
        height: 0.06rem;
    }
    .footer{
       align-items: center;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
    
    }
}

</style>