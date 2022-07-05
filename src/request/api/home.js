
import service from "..";
//获取首页轮播图数据
 export function getBanner(){
    return service({
        method:"get",
        url:"/banner?type=2"
    })
}
//获取歌单
export function getMusicList(){
    return service({
        method:"get",
        url:"/personalized?limit=10"
    })
}
//实现搜索
export function getSearchMusic(data){
    return service({
        method:"get",
        url:`/search?keywords=${data}`
    })
}
//登录
export function getPhoneLogin(data){
    return service({
        method:"get",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}