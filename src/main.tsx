import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource-variable/geist/index.css'
import '@fontsource-variable/geist-mono/index.css'
import App from './App'
import './index.scss'

const root = document.getElementById('root')!
const app = <React.StrictMode><App /></React.StrictMode>

// Prerendered pages hydrate in place; the dev server's empty shell renders fresh.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
