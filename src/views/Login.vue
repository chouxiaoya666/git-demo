<template>
    <div class="login">
        <div class="top">
            欢迎登陆
        </div>

        <div class="shuru">
            <div><input v-model="phone" type="text" name="phone" class="phone" placeholder="请输入手机号码"></div>
            <div>
            <input  v-model="password" type="text" name="password" class="password" placeholder="请输入密码">
            </div>
           <button class="btn" @click="Login">登录</button>
       </div>
         
    </div>
</template>
<script>
export default{
    data(){
        return{
            phone:'',
            password:''
        }
    },
    methods:{
        Login:function(){
           let res= this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
          console.log(res);
          if(res.data.code ===200)
            {
                this.$store.commit('updateLogin',true)
                this.$router.push('/infoUser')
            }else{
                alert("手机号码或者密码错误")
                this.password=''
            }
        }
    }
}
</script>
<style lang="less">
.login{
    background-color: chocolate;
    width: 100%;
    height: 16.24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
        margin-top: 3rem;
        font-size: 1rem;    
        color:white;
    }
    .shuru{
        height: 6rem;
        margin-top:1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .phone, .password{
            height: 1rem;
            width: 4.5rem;
        }
        .btn{
            width: 2.5rem;
        }
    }
    
}
</style>