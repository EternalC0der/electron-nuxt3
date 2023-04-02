import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

// Logger
// ======
autoUpdater.logger = log
;(autoUpdater.logger as typeof log).transports.file.level = 'info'

// Config
// ======
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

// Module
// ======
export default (mainWindow: BrowserWindow) => {
  const isMac = process.platform === 'darwin'
  if (isMac) {
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = false
  }

  // Helpers
  // =======
  let readyToInstall = false
  function sendUpdaterStatus(...args: any[]) {
    mainWindow.webContents.send('updater:statusChanged', args)
  }

  autoUpdater.on('checking-for-update', () => {
    sendUpdaterStatus('check-for-update')
  })
  autoUpdater.on('update-available', (_info) => {
    sendUpdaterStatus('update-available')
  })
  autoUpdater.on('update-not-available', (_info) => {
    sendUpdaterStatus('update-not-available')
  })
  autoUpdater.on('error', (_err) => {
    sendUpdaterStatus('update-error')
  })
  autoUpdater.on('download-progress', (progress) => {
    sendUpdaterStatus('downloading', progress)
  })
  autoUpdater.on('update-downloaded', (_info) => {
    sendUpdaterStatus('update-downloaded')
    mainWindow.webContents.send('updater:readyToInstall')
    readyToInstall = true
  })

  // IPC Listeners
  // =============
  ipcMain.handle('updater:check', async (_event) => {
    return await autoUpdater.checkForUpdates()
  })

  ipcMain.handle('updater:quitAndInstall', (_event) => {
    if (!readyToInstall) return
    autoUpdater.quitAndInstall()
  })

  autoUpdater.checkForUpdates()

  // Check for updates every 2 hours
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 1000 * 60 * 60 * 2)

  console.log('[-] MODULE::updater Initialized')
}
