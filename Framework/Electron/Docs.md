# Electron

Electron is a framework that enables you to create desktop applications with JavaScript, HTML, and CSS. These applications can then be packaged to run directly on macOS, Windows, or Linux, or distributed via the Mac App Store or the Microsoft Store.

Electron consists of three main pillars:

- Chromium for displaying web content.
- Node.js for working with the local filesystem and the operating system.
- Custom APIs for working with often-needed OS native functions.

Basic electron folder structure:

```
my-electron-app/
├── package.json
├── main.js
└── index.html
```

Install Electron (inside my-electron-app folder)

```
npm init -y
npm i
npm i --save electron
```

Basic main electron script

```js
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");
}

app.whenReady().then(() => createWindow());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().lenght === 0) {
    createWindow();
  }
});
```

Main renderer Processes
As it was mentioned before, Electron has two types of processes:

Main:

- The Main process creates web pages by creating BrowserWindow instances.
  Each BrowserWindow instance runs the web page in its Renderer process.
  When a BrowserWindow instance is destroyed, the corresponding Renderer
  process gets terminated as well.
- The Main process manages all web pages and their corresponding
  Renderer processes.

Renderer

- The Renderer process manages only the corresponding web page.
  A crash in one Renderer process does not affect other Renderer processes.
- The Renderer process communicates with the Main process via IPC to perform
  GUI operations in a web page. Calling native GUI-related APIs from the Renderer
  process directly is restricted due to security concerns and potential
  resource leakage.

---

### ipcMain (Process Main)

The <code>ipcMain</code> module is an Event Emitter. When used in the main process, it handles asynchronous and synchronous message sent from a renderer process (web page). Messages sent from a renderer will be emitted to this module.

```js
// In main process.
const { ipcMain } = require("electron");
ipcMain.on("asynchronous-message", (event, arg) => {
  console.log(arg); // prints "ping"
  event.reply("asynchronous-reply", "pong");
});

ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg); // prints "ping"
  event.returnValue = "pong";
});

// In renderer process (web page).
const { ipcRenderer } = require("electron");
console.log(ipcRenderer.sendSync("synchronous-message", "ping")); // prints "pong"

ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(arg); // prints "pong"
});
ipcRenderer.send("asynchronous-message", "ping");
```

### ipcRenderer (Process Renderer)

The <code>ipcRenderer</code> module is and Event Emitter. It provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process. YOu can also receive replies from the main process.

##### Basic example of communication between the main and the renderer process

```js
// Main.js
const { app, BrowserWindow, ipcMain } = require("electron");
let win = null;

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 0, height: 0, show: false });
  win.loadUrl(`file://${__dirname}/index.html`);
});

ipcMain.on("online-status-change", (event, status) => {
  console.log(status);
});
```

```js
// Renderer.js
const { ipcRenderer } = require('electron')
const updateOnlineStatus = () => {
  const status = navigator.onLine ? 'online' : 'offline')
  ipcRenderer.send('online-status-changes', status)
}

// Listeners for status change
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

// Call updateOnlineStatus on windows load
updateOnlineStatus();

```
