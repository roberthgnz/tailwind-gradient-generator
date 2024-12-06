import { createRoot } from 'react-dom/client'

import { store } from './store/index'
import { Provider } from 'react-redux'

import './main.css'
import App from './App.js'

const root = document.getElementById('root')!

createRoot(root).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
