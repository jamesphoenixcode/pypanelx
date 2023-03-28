const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({width:1000,height:800})
    mainWindow.loadFile('editor.html')
}

app.whenReady().then(() => {
    createWindow()
})

exports.app = app