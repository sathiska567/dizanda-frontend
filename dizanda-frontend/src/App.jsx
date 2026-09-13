import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomOrderModal from './components/CustomOrderModal';
import CustomerOrderBanner from './components/CustomerOrderBanner';
import CartDrawer from './components/CartDrawer';
import SplashScreen from './components/SplashScreenHandwritten';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Gallery from './pages/Gallery/Gallery';
import Collection from './pages/Collection/Collection';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';

function App() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('dizanda_splash_shown'));

  useEffect(() => {
    if (!showSplash) return;
    sessionStorage.setItem('dizanda_splash_shown', 'true');
    const timer = setTimeout(() => setShowSplash(false), 5200);
    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <CartProvider>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-luxury-cream text-luxury-charcoal overflow-x-hidden">
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/collection" element={<Collection />} />
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