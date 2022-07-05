<template>
    <div>
    <div class="searchtop">
        <van-icon name="arrow-left" size=".6rem" class="icon" @click="$router.go(-1)"></van-icon>
        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterkey">
    </div>
    <div class="history">
        <span class="searchspan">历史</span>
        <span v-for="item in keyworldlist" :key="item" class="spankey" @click="searchhistory(item)">
            {{item}}
        </span>
        <van-icon name="delete" size=".5rem" class="icon2" @click="delhistory"></van-icon>
    </div>
      <div class="list">
           <div class="item" v-for="(item,i) in searchList" key="i">
            <div class="itemleft" @click="updateIndex(item)">
           <div>{{i + 1}}</div>
           <div class="song">
           <p>{{item.name}}</p>
           <span class="ar" v-for="(item1,index) in item.artists" key="index">
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
import {getSearchMusic} from  '@/request/api/home.js'
export default{
    data(){
        return{
            keyworldlist:[],
            searchKey:"",
            searchList:[],
        }
    },
    mounted(){
        //this.keyworldlist=JSON.parse(localStorage.getItem('keyworldlist')) 
        this.keyworldlist =JSON.parse(localStorage.getItem('keyworldlist')) ? JSON.parse(localStorage.getItem('keyworldlist')): []
    },
    methods:{
            enterkey: async function(){
                  // console.log(this.searchKey);
                if(this.searchKey!=""){
              // console.log(searchKey);
             
                this.keyworldlist.unshift(this.searchKey);
               this.keyworldlist = [...new Set(this.keyworldlist)];
               if(this.keyworldlist.length>10){
                   this.keyworldlist.splice(this.keyworldlist.length-1)
               }
             //  localStorage.setItem("keyworldlist",JSON.stringify(this.keyworldlist))
              localStorage.setItem("keyworldlist",JSON.stringify(this.keyworldlist))
                 let res = await getSearchMusic(this.searchKey)
                 console.log(res);
                this.searchList = res.data.result.songs
             this.searchKey=""
            }
           
            },  
            delhistory:function(){
                localStorage.removeItem("keyworldlist")
                this.keyworldlist=[]
            },
            searchhistory:async function(item){
                let res = await getSearchMusic(item)
                console.log(res);
                this.searchList = res.data.result.songs
            },
            updateIndex:function(item){
                item.al =item.album
                item.al.picUrl = item.album.artist.img1v1Url
                console.log(item.album.artist.img1v1Url);
                this.$store.commit("pushPlayList",item)
                this.$store.commit("updatePlayListIndex", this.$store.state.playList.length-1)
            }
    }
}
</script>
<style lang="less">
.searchtop{
    width: 100%;
    height:1rem;
    padding: 0 .2rem;
    align-items: center;
    .icon{
        margin-top: .2rem;
    }
    input{
        margin-left:.2rem;
        border: none;
        border-bottom: 0.02rem solid #999;
        width: 85%;
        padding:.1rem

    };
}
.history{
    width:100%;
    padding: .2rem;  
    position: relative;
    .searchspan{
        font-size: .4rem;
        font-weight: 700;
    };
    .spankey{
        padding: .1rem .2rem;
        background-color: #999;
        border-radius: 20%;
        margin:.1rem .2rem;
        display: inline-block ;
    }
    .icon2{
    position:absolute;
    right: .2rem;
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
</style>