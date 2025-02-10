import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import pg from 'pg'


const getPartners = async () => {
  const {Client} = pg;
  const client = new Client({
    database: 'postgres',
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '1234'
  })
  await client.connect()
  try {
    const res = await client.query(`
    SELECT t1.*,
company_types.name as company_type_name,
    CASE WHEN sum(t2.product_quantity) > 300000 THEN 15
    WHEN sum(t2.product_quantity) > 50000 THEN 10
    WHEN sum(t2.product_quantity) > 10000 THEN 5
    ELSE 0 
    END as discount
    from partners as T1
    LEFT JOIN purchases as T2 on T1.id = T2.partner_id
	LEFT JOIN company_types on company_types.id = T1.company_type
    GROUP BY T1.id, company_types.name
    `)
    return res.rows
  } catch (e) {
    console.log(e.message)
  }
}

const updatePartner = async (event, partner) => {
  const { id, tax_number, name, director, email, phone, address, rating, company_type_name} = partner;
  const {Client} = pg;
  const client = new Client({
    database: 'postgres',
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '1234'
  })
  await client.connect()
  console.log(partner)
  try {
    await client.query(`
    UPDATE partners SET company_type = (
      select id from company_types where name='${company_type_name}'
    ), name = '${name}', director = '${director}', email = '${email}', phone = '${phone}', address = '${address}', rating = ${parseInt(rating)}, tax_number = '${tax_number}'
    WHERE id = ${id};
    `)
    dialog.showMessageBox({ message: 'Данные обновлены' })
    return;
  } catch (e) {
    dialog.showErrorBox('Ошибка', e.message)
    return("error");
  }
}

const createPartner = async (event, partner) => {
  const { id, tax_number, name, director, email, phone, address, rating, company_type_name} = partner;
  const {Client} = pg;
  const client = new Client({
    database: 'postgres',
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '1234'
  })
  await client.connect()
  try {
    await client.query(`
    INSERT INTO partners (company_type, name, director, email, phone, address, rating, tax_number) VALUES 
    ((select id from company_types where name='${company_type_name}'),'${name}','${director}','${email}',
    '${phone}','${address}', ${parseInt(rating)}, '${tax_number}');
    `)
    dialog.showMessageBox({ message: 'Партнер добавлен' })
    return;
  } catch (e) {
    dialog.showErrorBox('Ошибка', e.message)
    return("error");
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: join(__dirname, '../../resources/icon.ico'),
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    devtools: true,
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  ipcMain.handle('getPartners', getPartners)
  ipcMain.handle('updatePartner', updatePartner)
  ipcMain.handle('createPartner', createPartner)
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })



  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

