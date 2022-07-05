
<template>
<div class="home">
<TopNavVue></TopNavVue>
<SwpierTop></SwpierTop>
<iconlistVue></iconlistVue>
<MusicList></MusicList>
</div>
</template>

<script>
// @ is an alias to /src
import TopNavVue from '@/components/home/TopNav.vue'
import SwpierTop from '../components/home/SwpierTop.vue'
import iconlistVue from '@/components/home/iconlist.vue'
import MusicList from '@/components/home/MusicList.vue'
export default {
  name: 'HomeView',
  components: {
    TopNavVue,
    SwpierTop,
    iconlistVue,
    MusicList,
  }
}
</script>
