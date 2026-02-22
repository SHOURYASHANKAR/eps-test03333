import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { schoolsData } from '@/src/data/schools';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-white leading-none">
                Esteem Group
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                of Schools
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed">
            Empowering the next generation with quality education, modern technology, and strong moral values. Established in 2012 with a vision for holistic growth.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Our Group</Link></li>
            <li><Link to="/academics" className="hover:text-primary transition-colors">Academic Programs</Link></li>
            <li><Link to="/admissions" className="hover:text-primary transition-colors">Admissions 2026</Link></li>
            <li><Link to="/facilities" className="hover:text-primary transition-colors">Campus Facilities</Link></li>
            <li><Link to="/upload" className="hover:text-primary transition-colors">Upload Memories</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Branches */}
        <div>
          <h4 className="text-white font-serif font-bold text-lg mb-6">Our Branches</h4>
          <ul className="space-y-4 text-sm">
            {schoolsData.map(school => (
              <li key={school.id}>
                <Link to={`/branch/${school.id}`} className="hover:text-primary transition-colors">
                  {school.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-serif font-bold text-lg mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Chaliyama, Saraikela Kharsawan, Jharkhand 833219</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+91 6207753060</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>epscbsa@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Esteem Group of Schools. All Rights Reserved. Designed for Excellence.</p>
      </div>
    </footer>
  );
}
