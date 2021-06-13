// Create a notification inside the renderer process

const myNotification = new Notification("Notification From Renderer Process", {
  body: "Notification from the Renderer Process",
});

myNotification.onclick = (e) => {
  console.log("Notification Clicked", e.target);
};
