import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './reduxToolkit/store.js'
// import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <AuthProvider> */}
      <App />
      {/* </AuthProvider> */}
    </Provider>
  </StrictMode>,
)
