import { app, BrowserWindow, Menu } from 'electron'

// Helpers
// =======
const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = []

// Module
// ======
export default (mainWindow: BrowserWindow) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (process.platform === 'darwin') {
    // OS X
    const name = 'electron-nuxt3'
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit()
          }
        },
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click() {
            // Reload the current window
            if (mainWindow) {
              mainWindow.reload()
            }
          }
        },
        ...(isDevelopment
          ? [
              {
                label: 'Toggle Developer Tools',
                accelerator: 'Alt+Command+I',
                click() {
                  // Open the DevTools.
                  if (mainWindow) {
                    mainWindow.webContents.toggleDevTools()
                  }
                }
              }
            ]
          : [])
      ]
    })

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    console.log('[-] MODULE::macMenu Initialized')
  }
}
