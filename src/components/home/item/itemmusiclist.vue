<template>
    
    <div class="itemmusiclist">
        <div class="listtop">
          <div> <span class="sg"></span><van-icon name="play" size=".6rem"></van-icon><span>播放全部</span><span class="words">(共{{List.length}}首)</span></div>
            
            <div class="sub">
                <van-icon name="contact" size=".6rem"></van-icon>收藏（{{subscribedCount}}）
            </div>
       </div>

       <div class="list">
           <div class="item" v-for="(item,i) in List" key="i">
            <div class="itemleft" @click="playMusic(i)">
           <div>{{i + 1}}</div>
           <div class="song">
           <p>{{item.name}}</p>
           <span class="ar" v-for="(item1,index) in item.ar" key="index">
           {{item1.name}}
           </span>
                
           </div>
           </div>
                 <div class="itemright">

              <van-icon name="info-o" size=".6rem"  v-if='item.mv != 0' ></van-icon>
              <van-icon name="wap-nav" size=".6rem" ></van-icon>
           </div>
           </div>
        </div>
         </div>
  
</template>

<script>
import { mapMutations } from 'vuex'
export default{

setup(props){

    console.log(props)

},
    props:['List','subscribedCount'],
    methods:{
        playMusic:function(i){
            this.updatePlayList(this.List),
            
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    }
}

</script>

<style lang="less">
.itemmusiclist{
    width: 100%;
    margin-top:.8rem;
    border: .02rem solid white;
    background-color: white;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
   
    .listtop{
        display: flex;
        width: 100%;
        height: 1rem;
         justify-content: space-between;
        align-items: center;
        .words{
            font-size: 0.22rem;
            opacity:0.4
        }
        .sub{
            float: right;
           align-items: center;
            border-radius: 0.4rem;
            background-color: red;
            color: white
            
            }
    }
    .list{
       
        width: 100%;
        .item{
            width: 100%;
            height: 1.4rem;
            display: flex;
             min-width: 0;
            justify-content: space-between;
            .itemleft{
                align-items: center;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                display: flex;
                width:65% ;
     
                .song{
                  
                    font-weight: 700;
                    margin-left: .2rem;
                    .ar{
                        font-size: .22rem;
                        opacity: 0.4;
                    }
                }
            }
            .itemright{
                display: flex;
                justify-content: flex-end;
                width: 25%;
                align-items: center;
            }
        }
    }
}

</style>