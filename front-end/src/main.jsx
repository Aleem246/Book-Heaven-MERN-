import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import {Provider} from "react-redux"
import store from "/src/store/index"
import {BrowserRouter as Router} from "react-router-dom"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </Router>
  </StrictMode>,
)
