/// <reference path="../dts/atom-shell.d.ts" />
import app = require('app');
import BrowserWindow = require('browser-window');
import globalShortcut = require('global-shortcut');


var mainWindow: BrowserWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }    
});

app.on('ready', () => {  
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  globalShortcut.register('ctrl+i',() => {
    mainWindow.openDevTools();
  });

  globalShortcut.register('ctrl+r',() => {
    mainWindow.reload();
  });

  mainWindow.loadUrl('file://' + __dirname + '/../../index.html');
  mainWindow.on('closed', function() {    
    mainWindow = null;
  });
});
