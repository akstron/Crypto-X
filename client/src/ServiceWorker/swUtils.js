export function determineAppServerKey(){
    const publicVapidKey ="BK98XHGx5T0BI5AChax_SD0WOw495hr2tMU286nWNQWTgEi2OTlswzSWsSfXl-Kf0lscLmq6coyMhaYILBL2uZE";
    console.log("publicVapidKey: ",publicVapidKey);
    return urlBase64ToUint8Array(publicVapidKey);
}

export function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}