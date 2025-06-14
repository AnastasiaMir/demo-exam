import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


// Custom APIs for renderer
const api = {
  getPartners: () => ipcRenderer.invoke('getPartners'),
  updatePartner: (partner) => ipcRenderer.invoke('updatePartner', partner),
  createPartner: (partner) => ipcRenderer.invoke('createPartner', partner),
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
