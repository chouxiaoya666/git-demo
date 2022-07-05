
import service from "..";

//获取歌单详情页数据

export function getmusicitemlist(data){
    return service({
        method:"get",
        url: `/playlist/detail?id=${data}`
    })
}

//获取歌单的所有歌曲
export function getlist(data){
    return service({
        method:"get",
        url:`/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}

export function getMusicLyric(data){

    return service({
        method:"get",
        url:`/lyric?id=${data}`
    })
}