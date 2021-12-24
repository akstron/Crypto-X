import {determineAppServerKey} from './swUtils'

export default async function swRegister(){
    let  swUrl =`${process.env.PUBLIC_URL}/sw.js`
    let sw = await navigator.serviceWorker.register(swUrl).then((response)=>{
        return response.pushManager.getSubscription().then(function(subscription){
            return response.pushManager.subscribe({
                userVisibleOnly:true,
                applicationServerKey: determineAppServerKey(),
            })
        })
    })
    console.log(sw);
    console.log("Posting Subscribe...");
    await fetch("http://localhost:8000/subscribe", {
        method: "POST",
        body: JSON.stringify(sw),
        headers: {
        "content-type": "application/json"
        }
    }).then((res)=>console.log(res));
    console.log("Subscription Sent...");
}