import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import BranchDetail from './pages/BranchDetail';
import Upload from './pages/Upload';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/branch/:id" element={<BranchDetail />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin" element={<Admin />} />
              {/* Fallback routes for other menu items to show home or a simple message */}
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
        
        {/* Tawk.to Live Chat Integration */}
        <LiveChat />
      </div>
    </Router>
  );
}

function LiveChat() {
  // This is a placeholder for the Tawk.to script integration
  // In a real app, you'd add the script to index.html or use a hook
  return null;
}
