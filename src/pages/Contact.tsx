import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, Globe } from 'lucide-react';
import { schoolsData } from '@/src/data/schools';

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Get in Touch</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Have questions about admissions, fees, or our programs? We're here to help. Contact any of our branches directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {schoolsData.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-primary/20 transition-all"
            >
              <h3 className="text-xl font-bold mb-6 text-primary">{school.shortName}</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-sm text-slate-600">{school.contact.address}</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div className="space-y-1">
                    {school.contact.phone.map(p => <p key={p} className="text-sm text-slate-600">{p}</p>)}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div className="space-y-1">
                    {school.contact.email.map(e => <p key={e} className="text-sm text-slate-600">{e}</p>)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-serif font-bold mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Name</label>
                  <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all">
                  <option>Admission Inquiry</option>
                  <option>Fee Related</option>
                  <option>Academic Query</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you?" />
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-8">
            <div className="bg-slate-100 rounded-3xl h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/map/800/600?blur=2" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                <p className="text-slate-500 text-sm">Our branches are located in peaceful, accessible areas of Jharkhand. Visit us to experience our campus.</p>
              </div>
            </div>

            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Office Hours
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-bold">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-bold">8:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-bold text-red-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
