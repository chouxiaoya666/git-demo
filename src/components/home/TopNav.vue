<template>

<div class="topnav">  
    <div class="Topleft">
    <van-icon name="wap-nav" class="left" size="0.4rem"></van-icon>
    </div>
   
    <div class="topContent">
        <span @click="$router.push('/infoUser')">我的</span>
        <span class="active">发现</span>
        <span>云村</span>
        <span>视频</span>

    </div>
    <div class="Topright">
    <van-icon name="search" size="0.4rem" @click="$router.push('/search')"></van-icon>
    </div>

</div>
    
  
</template>

<style lang="less" scoped>
.topnav{
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;

justify-content: space-between;
    .topContent{
        width: 65%;
        display: flex;
        height: 100%;
        justify-content: space-around;
        //align-items: center;
      font-size:0.3rem;
      .active{
          font-weight: 900;
      }
    }
    
}

</style>

