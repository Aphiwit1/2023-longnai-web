import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import TagManager from 'react-gtm-module'

const longnaiStagingGTM = 'KD629CM2'
 
const tagManagerArgs = {
    gtmId: longnaiStagingGTM
}
 
TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
