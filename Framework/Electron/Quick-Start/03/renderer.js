const { ipcRenderer } = require("electron");

const alertOnlineStatus = () => {
  const status = navigator.onLine ? "The user is Online" : "The user is Offline" 
  ipcRenderer.send("online-status-changed", status);
  window.alert(status);
};

window.addEventListener("online", alertOnlineStatus);
window.addEventListener("offline", alertOnlineStatus);

alertOnlineStatus();
