<template >
  <div class="musiclist">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more">
        <a href="">查看更多</a>
      </div>
    </div>
    <div class="musiccontent">
      <van-swipe 
      :loop="false" 
      :width="150" 
      :show-indicators="false" 
      class="my-swpie"
      >
       <van-swipe-item v-for="item in state.musiclist" :key="item">
        <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
        <img :src="item.picUrl" alt="">
        <span class="playcount">
        <van-icon name="play" class="left" size="0.3rem" color="#ccc"></van-icon>
      <span class="i">{{changeCount(item.playCount)}}</span> 
       </span>
       <span class="name">
           {{item.name}}
       </span>
       </router-link>
       </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { reactive,onMounted } from 'vue';
import { getMusicList } from "../../request/api/home.js";
export default {
    //vue2
//   data() {
//     return {
//       musiclist: [],
//     };
//   },
//   methods: {
//     async getMusicList() {
//       let res = await getMusicList();
//       console.log(res);
//       this.musiclist = res.data.result;
//     },

//     changeCount(num){
//         if(num>= 100000000){
//         return (num/100000000).toFixed(1)+"亿"
//     }else if(num>10000){
//         return (num/10000).toFixed(1)+"万"
//     }
//   }
//   },
//   mounted() {
//     this.getMusicList();
//   },
//vue3
setup(){
    const state = reactive({
        musiclist:[]
    })
    function   changeCount(num){
        if(num>= 100000000){
        return (num/100000000).toFixed(1)+"亿"
    }else if(num>10000){
        return (num/10000).toFixed(1)+"万"
    }
  }
    onMounted(async ()=>{
        let res = await getMusicList();
         console.log(res);
       state.musiclist = res.data.result;
    });
    return {state,changeCount}
}
}
</script>
<style lang="less">
.musiclist {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musiccontent{
      width: 100%;
      height: 3rem;
      .my-swpie{
          height: 100%;
          position: relative;
          .playcount{
              position: absolute;
                bottom: 2.6rem;
                right:.3rem;
                .i{
                    color: #ccc;
                }
             
          }
          .name{
              font-size: 0.25rem;
          }
          img{
              width: 100%;
              height: 1.8rem
          }
      }
  }
}
</style>