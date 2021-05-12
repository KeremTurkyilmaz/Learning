const { app, BrowserWindow, ipcMain } = require("electron");

// Create window when app is read
app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");
});

ipcMain.on("online-status-changed", (event, status) => {
  console.log(status);
});
