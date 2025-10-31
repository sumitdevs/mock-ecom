import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/receipt' element={<Receipt/>} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
