import { Swipe, SwipeItem,Button,Icon,Popup } from 'vant';

//放入数组
let plugins=[
    Swipe, SwipeItem,Button,Icon,Popup
]

export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}

