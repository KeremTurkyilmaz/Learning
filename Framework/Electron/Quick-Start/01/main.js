/*
Step 01:  First, you import the app and BrowserWindow modules 
         of the electron package to be able to manage your application's 
         lifecycle events, as well as create and control browser windows.

Step 02:  After that, you define a function that creates a new browser 
         window with node integration enabled, loads index.html file into 
         this window.

Step 03: You create a new browser window by invoking the createWindow 
         function once the Electron application is initialized.

Step 04: You add a new listener that tries to quit the application when 
         it no longer has any open windows. This listener is a no-op on 
         macOS due to the operating system's window management behavior.

Step 05: You add a new listener that creates a new browser window only if 
         when the application has no visible windows after being activated. 
         For example, after launching the application for the first time, 
         or re-launching the already running application.

*/

const { app, BrowserWindow } = require("electron");

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
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
