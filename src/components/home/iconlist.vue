<template>
    
<div class="iconlist">
    <div class="icon">
        <van-icon name="service" size="1.3rem"></van-icon>
    <span class="code">每日推荐</span>
   
    </div>
     <div class="icon">
        <van-icon name="contact" size="1.3rem"></van-icon>
     <span class="code">私人FM</span>
    </div>
     <div class="icon">
         <van-icon name="music" size="1.3rem"></van-icon>
         <span class="code">歌单</span>
    </div>
     <div class="icon">
         <van-icon name="bar-chart-o" size="1.3rem">  </van-icon>
       <span class="code"> 排行榜</span>
    </div>
</div>

</template>
<style lang="less">
.iconlist{
     width: 100%;
     height:2rem;
    
     display: flex;
     justify-content: space-around;
     text-align: center;
     align-items: center;
     .icon{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 0.2rem;
        .code{
            line-height: 100%;
            font-size: 0.2rem;
        }
     }
     
 }
</style>
