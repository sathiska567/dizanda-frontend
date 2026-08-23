import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomOrderModal from './components/CustomOrderModal';
import CustomerOrderBanner from './components/CustomerOrderBanner';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Gallery from './pages/Gallery/Gallery';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';

function App() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-luxury-cream text-luxury-charcoal overflow-x-hidden">
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
          <CustomerOrderBanner onOpen={() => setIsCustomModalOpen(true)} />
          <CustomOrderModal open={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)} />
          <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;