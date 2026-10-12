const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Deixa o audio do jogo tocar sem exigir clique previo
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (!app.requestSingleInstanceLock()) { app.quit(); }

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 640,
    minHeight: 400,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    title: 'Quarto de Despejo',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, backgroundThrottling: false }
  });
  win.loadFile(path.join(__dirname, 'game', 'index.html'));
  // F11 alterna tela cheia (Esc continua sendo "pausar" dentro do jogo)
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    }
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
