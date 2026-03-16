import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'pretendard-gov/dist/web/variable/pretendardvariable-gov-dynamic-subset.css'
import 'pretendard-gov/dist/web/static/pretendard-gov.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
