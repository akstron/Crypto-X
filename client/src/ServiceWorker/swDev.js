export default async function swDev(){
    function determineAppServerKey(){
        
        const publicVapidKey ="BK98XHGx5T0BI5AChax_SD0WOw495hr2tMU286nWNQWTgEi2OTlswzSWsSfXl-Kf0lscLmq6coyMhaYILBL2uZE";
        console.log("publicVapidKey: ",publicVapidKey);
        return urlBase64ToUint8Array(publicVapidKey);
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

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
    console.log("Sending Push...");
    await fetch("http://localhost:8000/subscribe", {
        method: "POST",
        body: JSON.stringify(sw),
        headers: {
        "content-type": "application/json"
        }
    }).then((res)=>console.log(res));
    console.log("Push Sent...");
}
