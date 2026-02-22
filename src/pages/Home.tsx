import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, BookOpen, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { useSchools } from '@/src/hooks/useSchools';

export default function Home() {
  const { schools, loading } = useSchools();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/school1/1920/1080"
            alt="School Campus"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground font-bold text-sm mb-6 uppercase tracking-widest">
              Excellence in Education
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              Nurturing Minds, <br />
              <span className="text-primary">Building Futures</span>
            </h1>
            <p className="text-lg text-slate-200 mb-8 leading-relaxed">
              Welcome to Esteem Group of Schools. We provide a student-centered learning environment focused on discovery, projects, and personality development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30 flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-6">
            {[
              { label: 'Students', value: '2000+', icon: Users },
              { label: 'Teachers', value: '150+', icon: GraduationCap },
              { label: 'Experience', value: '14 Years', icon: Zap },
              { label: 'Toppers', value: '90%+', icon: Trophy },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 text-white"
              >
                <div className="bg-primary/30 p-3 rounded-xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest font-semibold opacity-60">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Branches</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Each of our branches is equipped with modern facilities and a dedicated team of educators to provide the best learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {schools.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${school.id}/800/600`}
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                    {school.shortName}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {school.overview}
                  </p>
                  <Link
                    to={`/branch/${school.id}`}
                    className="inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all"
                  >
                    Explore Branch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://picsum.photos/seed/students/800/1000"
              alt="Students"
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-3xl shadow-2xl hidden md:block">
              <p className="text-4xl font-bold mb-1">14+</p>
              <p className="text-sm uppercase tracking-widest font-bold opacity-80">Years of Legacy</p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Why Esteem Group?</h2>
              <p className="text-slate-600 leading-relaxed">
                We believe in a holistic approach to education that goes beyond textbooks. Our curriculum is designed to foster critical thinking, creativity, and character.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Smart Learning', icon: Zap, desc: 'Interactive smart classes and tech integration.' },
                { title: 'Safe Campus', icon: ShieldCheck, desc: 'CCTV monitored and secure environment.' },
                { title: 'Expert Faculty', icon: Users, desc: 'Qualified and passionate educators.' },
                { title: 'Holistic Growth', icon: BookOpen, desc: 'Focus on sports, arts, and values.' },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
