<template>
  <itemmusictop :playlist="state.playlist"></itemmusictop>
  <itemmusiclist :List="state.List" :subscribedCount="state.playlist.subscribedCount"></itemmusiclist>
</template>

<script>
import itemmusictop from '@/components/home/item/itemmusictop.vue'
import {useRoute} from 'vue-router'
import { onMounted, reactive } from 'vue'
import {getmusicitemlist,getlist} from '../request/api/item.js'
import itemmusiclist from '../components/home/item/itemmusiclist.vue'
export default{

setup(){
    const state = reactive({

        playlist:{ },
        List:{}
    })
    onMounted(async ()=>{
        let id =useRoute().query.id
        //获取歌单详情
        let res =  await getmusicitemlist(id)
        
        state.playlist = res.data.playlist
        //获取歌单歌曲
        let result = await getlist(id)
        console.log(result)

        state.List= result.data.songs
        //防止页面刷新造成数据丢失
        sessionStorage.setItem('itemDetail',JSON.stringify(state))
    })
    return {state}
},
components:{
    itemmusictop,
    itemmusiclist
}


}
</script>