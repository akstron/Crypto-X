let cacheData="appV1";

this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/favicon.ico',
                '/manifest.json',
                '/static/js/vendors~main.chunk.js',
                '/logo192.png ',
                '/'
            ])
        })
    )
})

this.addEventListener("fetch",(event)=>{

    if(!navigator.onLine){
        if(event.request.url === "http://localhost:3000/static/js/main.chunk.js"){
            event.waitUntil(
                this.registration.showNotification("Baniya-Trade",{
                    body:"Looks like we just lost you. Please check your connection.",
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp)=>{
                if(resp){
                    return resp;
                }
            })
        )
    }
})

this.addEventListener("push", e => {
  const data = e.data.json();
  this.registration.showNotification(data.title, {
    body: data.body,
    icon: "./logo512.png"
  });
});