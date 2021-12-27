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
    
    await fetch(process.env.REACT_APP_BACKEND+"/subscribe", {
        method: "POST",
        body: JSON.stringify(sw),
        credentials: 'include',
        headers: {
        "content-type": "application/json"
        }
    });
}