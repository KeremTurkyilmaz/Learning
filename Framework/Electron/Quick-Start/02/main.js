const { app, BrowserWindow, Notification } = require("electron");

function showNotification(){
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the main process'
  }
  new Notification(notification).show();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");
}

// Create window when app is read
app.whenReady().then(createWindow).then(showNotification)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
