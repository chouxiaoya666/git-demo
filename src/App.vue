<template>

 <router-view></router-view>
 <FootMusicVue v-show="$store.state.isFooterMusic"></FootMusicVue>
</template>
<script>
import FootMusicVue from './components/home/item/FootMusic.vue'
export default{

components:{
  FootMusicVue
}
}
</script>
<style lang="less">
*{
  margin: 0;
  padding:0;
    box-sizing: border-box;
}
van-icon{
  width:0.4rem;
  height: 1rem;
}
a{
  color:black
}
</style>
