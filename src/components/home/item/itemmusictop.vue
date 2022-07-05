<template>
  <div class="itemmusictop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemleft">
      <van-icon
        name="arrow-left"
        class="icon"
        size="0.6rem"
        @click="$router.go(-1)"
      ></van-icon>

      <span class="gedan">歌单</span>
    </div>
    <div class="itemright">
      <van-icon name="search" class="icon" size="0.6rem"></van-icon>
      <van-icon name="bars" class="icon" size="0.6rem"></van-icon>
    </div>
  </div>
  <div class="itemmusiccenter">
    <div class="leftinfo">
      <img :src="playlist.coverImgUrl" alt="" class="centerimg" />
    <span class="bofang"> <van-icon name="play" class="icon" size="0.26rem"></van-icon>{{changeCount(playlist.playCount)}}</span>
    </div>
    <div class="rightinfo">
      <div class="f">{{ playlist.name }}</div>
      <div class="avatar">
        <img :src="playlist.creator.avatarUrl" alt="" /><span
          >{{ playlist.creator.nickname
          }}<van-icon name="arrow" class="icon" size="0.2rem"></van-icon
        ></span>
      </div>
      <div class="t">
        {{ playlist.creator.signature
        }}<van-icon name="arrow" class="icon" size="0.2rem"></van-icon>
      </div>
    </div>
  </div>

  <div class="itemmusicbottom">
    <div class="icon">
      <van-icon name="chat" size="1rem"></van-icon>
      <span class="code">{{ playlist.commentCount }}</span>
    </div>
    <div class="icon">
      <van-icon name="share" size="1rem"></van-icon>
      <span class="code">{{ playlist.shareCount }}</span>
    </div>
    <div class="icon">
      <van-icon name="down" size="1rem"></van-icon>
      <span class="code">下载</span>
    </div>
    <div class="icon">
      <van-icon name="certificate" size="1rem"> </van-icon>
      <span class="code">多选</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    console.log(props);
    //通过props进行传值，哦按段如果数据拿不到就获取sessionStorage中的
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return {changeCount}
  },

  props: ["playlist"],
};
</script>

<style lang="less">
.itemmusiccenter {
  width: 100%;
  height: 3rem;
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
    
  .leftinfo {
    width: 33%;
    position: relative;
    .centerimg {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
        
    }
    .bofang{
            position: absolute;
            top:0;
            right: .2rem;
            color:white
        }
  }

  .rightinfo {
    width: 66%;
    font-weight: 900;
    height: 100%;
    color: white;
    margin-left: 0.4rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .avatar {
      font-weight: 100;
      align-items: center;
    }
    .t {
      font-weight: 100;
      font-size: 0.25rem;
    }
    img {
      width: 0.8rem;
      border-radius: 50%;
    }
  }
}

.itemmusictop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.1rem;
  position: relative;
  color: #fff;
  .itemleft,
  .itemright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    .gedan {
      font-size: 0.4rem;
      color: #fff;
    }
  }
  .bgimg {
    width: 100%;
    height: 13rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
}

.itemmusicbottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  margin-top: 0.2rem;
  color: #fff;
  .icon {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 20%;
  }
}
</style>