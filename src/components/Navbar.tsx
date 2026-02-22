import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, GraduationCap, Phone, Image as ImageIcon, Info, BookOpen, Trophy, Upload, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSchools } from '@/src/hooks/useSchools';

export default function Navbar() {
  const { schools } = useSchools();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowBranches(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Info },
    { name: 'Academics', href: '/academics', icon: BookOpen },
    { name: 'Facilities', href: '/facilities', icon: GraduationCap },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Contact', href: '/contact', icon: Phone },
    { name: 'Upload', href: '/upload', icon: Upload },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3',
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md py-2' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={cn("font-serif font-bold text-xl leading-none", isScrolled ? "text-primary" : "text-slate-900")}>
              Esteem Group
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold opacity-70">
              of Schools
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button
              onClick={() => setShowBranches(!showBranches)}
              className={cn(
                "flex items-center gap-1 font-medium hover:text-primary transition-colors",
                isScrolled ? "text-slate-700" : "text-slate-900"
              )}
            >
              Branches <ChevronDown className={cn("w-4 h-4 transition-transform", showBranches && "rotate-180")} />
            </button>
            <AnimatePresence>
              {showBranches && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                  {schools.map((school) => (
                    <Link
                      key={school.id}
                      to={`/branch/${school.id}`}
                      className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50"
                    >
                      <p className="font-semibold text-sm text-primary">{school.shortName}</p>
                      <p className="text-xs text-slate-500 truncate">{school.name}</p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "font-medium hover:text-primary transition-colors animated-underline",
                isScrolled ? "text-slate-700" : "text-slate-900",
                location.pathname === link.href && "text-primary after:w-full"
              )}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/admissions"
            className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Branches</p>
                {schools.map((school) => (
                  <Link
                    key={school.id}
                    to={`/branch/${school.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium">{school.shortName}</span>
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Menu</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <link.icon className="w-5 h-5 text-primary/60" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
              <Link
                to="/admissions"
                className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold shadow-lg"
              >
                Apply for Admission
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
