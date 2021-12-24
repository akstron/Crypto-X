console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  console.log(data.info);
  self.registration.showNotification(data.title, {
    body: data.info,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});
