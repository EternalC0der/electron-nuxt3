import { ipcMain, BrowserWindow } from 'electron'

// Helpers
// =======
const getWindowFromEvent = (event: Electron.IpcMainInvokeEvent) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  return win
}

// Module
// ======
export default (mainWindow: BrowserWindow) => {
  ipcMain.handle('isMaximized:app', (event) => {
    const win = getWindowFromEvent(event)
    return win?.isMaximized()
  })

  ipcMain.handle('titlebar:action', (event, action: 'toggleMaximize' | 'minimize') => {
    const win = getWindowFromEvent(event)
    if (!win) return
    switch (action) {
      case 'toggleMaximize':
        win.isMaximized() ? win.unmaximize() : win.maximize()
        break
      case 'minimize':
        win.minimize()
        break
    }
  })

  ipcMain.handle('close:app', (event) => {
    const win = getWindowFromEvent(event)
    if (!win) return
    win.close()
  })

  ipcMain.handle('get:windowVisible', (_event) => {
    return mainWindow.isVisible()
  })

  mainWindow.on('maximize', () => mainWindow.webContents.send('window:maximizeChanged', true))
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('window:maximizeChanged', false))
  mainWindow.on('enter-full-screen', () => mainWindow.webContents.send('window:fullscreenChanged', true))
  mainWindow.on('leave-full-screen', () => mainWindow.webContents.send('window:fullscreenChanged', false))

  console.log('[-] MODULE::titleBarActions Initialized')
}

// https://www.electronjs.org/docs/latest/tutorial/ipc
