import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  MapPin, Phone, Mail, GraduationCap, BookOpen, 
  Trophy, Users, CheckCircle2, ArrowLeft, 
  ExternalLink, Calendar, ShieldCheck, Globe
} from 'lucide-react';
import { schoolsData } from '@/src/data/schools';
import { useSchools } from '@/src/hooks/useSchools';
import { cn } from '@/src/lib/utils';

export default function BranchDetail() {
  const { id } = useParams();
  const { schools, loading } = useSchools();
  const school = schools.find(s => s.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Branch Not Found</h2>
          <Link to="/" className="text-primary font-bold flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={`https://picsum.photos/seed/${school.id}-hero/1920/1080`}
            alt={school.name}
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Branches
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{school.name}</h1>
            <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {school.contact.address}
              </div>
              {school.contact.udise && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  UDISE: {school.contact.udise}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-primary" /> Overview & History
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>{school.overview}</p>
                <p>{school.history}</p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{school.vision}</p>
              </div>
              <div className="bg-secondary/5 p-8 rounded-3xl border border-secondary/10">
                <div className="bg-secondary text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{school.mission}</p>
              </div>
            </div>

            {/* Academics */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" /> Academic Programs
              </h2>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Classes & Board</h4>
                  <p className="text-slate-600">{school.academics.classes}</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Teaching Approach</h4>
                  <p className="text-slate-600">{school.academics.approach}</p>
                </div>
                {school.academics.extra && (
                  <div>
                    <h4 className="font-bold text-lg mb-2">Co-Scholastic</h4>
                    <p className="text-slate-600">{school.academics.extra}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-primary" /> Campus Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {school.facilities.map((facility, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span className="font-medium text-slate-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {school.achievements && (
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-primary" /> Academic Excellence
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {school.achievements.map((ach, i) => (
                    <div key={i} className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-2xl border border-primary/5">
                      <p className="text-primary font-bold text-2xl mb-1">{ach.value}</p>
                      <p className="text-slate-500 text-sm font-medium">{ach.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Admissions Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl sticky top-24">
              <h3 className="text-2xl font-serif font-bold mb-4">Admissions 2026</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {school.admissions.process}
              </p>
              {school.admissions.link ? (
                <a
                  href={school.admissions.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  Apply Online <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="block w-full text-center bg-white text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all"
                >
                  Contact for Admission
                </Link>
              )}
              
              <div className="mt-8 pt-8 border-t border-slate-800 space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500">Quick Resources</h4>
                {school.contact.paymentLink && (
                  <a href={school.contact.paymentLink} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" /> Online Fee Payment
                  </a>
                )}
                {school.contact.tcLink && (
                  <a href={school.contact.tcLink} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" /> Transfer Certificate (TC)
                  </a>
                )}
                {school.contact.website && (
                  <a href={school.contact.website} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" /> Official Website
                  </a>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold mb-4">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-slate-100 p-2 rounded-lg h-fit">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                    {school.contact.phone.map(p => <p key={p} className="text-slate-700 font-medium">{p}</p>)}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-slate-100 p-2 rounded-lg h-fit">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                    {school.contact.email.map(e => <p key={e} className="text-slate-700 font-medium">{e}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

function Info(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}
