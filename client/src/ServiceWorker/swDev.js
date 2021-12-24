// export default async function swDev(){
//     function determineAppServerKey(){
//         const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
//         return urlBase64ToUint8Array(publicVapidKey);
//     }

//     function urlBase64ToUint8Array(base64String) {
//         const padding = "=".repeat((4 - base64String.length % 4) % 4);
//         const base64 = (base64String + padding)
//             .replace(/\-/g, "+")
//             .replace(/_/g, "/");

//         const rawData = window.atob(base64);
//         const outputArray = new Uint8Array(rawData.length);

//         for (let i = 0; i < rawData.length; ++i) {
//             outputArray[i] = rawData.charCodeAt(i);
//         }
//         return outputArray;
//     }

//     let  swUrl =`${process.env.PUBLIC_URL}/sw.js`
//     let sw = await navigator.serviceWorker.register(swUrl).then((response)=>{
//         return response.pushManager.getSubscription().then(function(subscription){
//             return response.pushManager.subscribe({
//                 userVisibleOnly:true,
//                 applicationServerKey: determineAppServerKey(),
//             })
//         })
//     })

//     console.log("SW:",sw);
    
//     await fetch("http://localhost:8000/subscribe", {
//         method: "POST",
//         body: JSON.stringify(sw),
//         credentials: 'include',
//         headers: {
//           "content-type": "application/json"
//         }
//     });
// }

export default function swDev(){

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().then((result) => console.log(result)).catch(err => console.error(err));
}



// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  let  swUrl =`${process.env.PUBLIC_URL}/sw.js`
  const register = await navigator.serviceWorker.register(swUrl, {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  await fetch("http://localhost:8000/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
  });
  console.log("Push Sent...");
}

// document.querySelector('#notify').addEventListener('click', () => {
//   fetch("/notify");
//   console.log("Push Sent...");
// })

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
}
