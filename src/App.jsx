import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer'
import AppRoutes from './router/Routes.jsx'
import { activateTooltips } from './services/utils'

function App() {
  activateTooltips();
  return (
    <div style={{minHeight: '100vh'}}>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App