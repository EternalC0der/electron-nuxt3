# electorn-nuxt3

🚀 The perfect Electron + Nuxt3 quick start that you can deploy with or without electron!

## ✅ Features

-   Perfect structure for parallel development of electron and nuxt 🏢
-   Deploy with or without electron! 🚀
-   Typescript (you can use javascript too) 📍
-   electron-updater 🎉
-   custom electron-builder config 🎩
-   Latest versions of `electron` and `nuxt` ✨
-   Great DX and Extensibility 🍕
-   Parallel transpilation and hot-reloading 🧪
-   `useElectron` composable for easy access to electron APIs and IPC 🎨
-   Vue-Devtools support, ESLint & Prettier, and more! 🔥

# ⚙️ Setup 

```bash
# Clone the repository
git clone https://github.com/EternalC0der/electron-nuxt3.git

# Change directory to the template
cd electron-nuxt3/template

# Install dependencies
npm install

# Start the app in development mode (in electron)
npm run dev:electron
# Note: Use 'npm run dev:electron:win' if you're using a windows machine!

# Fire up vscode
code .
```

# 📡 Usage

### Development

```bash
# Start the app in development mode (in electron)
npm run dev:electron

# Start the app in development mode (in browser)
npm run dev
```

### Build

```bash
# Generate static build
npm run build

# Build electron app for production
npm run build:electron
```
