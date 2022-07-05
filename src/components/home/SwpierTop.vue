
<template>
    <van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in state.images" :key="image">
    <img :src="image.pic" />
  </van-swipe-item>
</van-swipe>
</template>
<script>

import axios from 'axios'
import {getBanner} from '../../request/api/home.js'
import {onMounted,reactive} from 'vue'
import { ContactList } from 'vant';

export default {
  setup() {

    const state = reactive({images:[]});

    onMounted(async ()=>{
        // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
        //     console.log(res)
        //     state.images=res.data.banners
        // })
        let res = await getBanner();
       console.log(res)
        state.images=res.data.banners
    })
    return { state };
  },
};
</script>

<style lang="less" >
.van-swipe{
    width: 100%;
    height: 3rem;
   
        .van-swipe-item{
            padding: 0 0.2rem;
            img{
                height: 100%;
                width: 100%;
               border-radius: 0.2rem;
            }
        }
    .van-swipe__indicator--active{
            background-color: rgb(219, 130, 130);
    }
    }
    

</style>