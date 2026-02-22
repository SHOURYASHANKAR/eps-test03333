import { motion } from 'motion/react';
import { schoolsData } from '@/src/data/schools';

export default function Gallery() {
  const images = [
    { id: 1, branch: 'Chaliyama', title: 'Annual Sports Day', url: 'https://picsum.photos/seed/sports/800/600' },
    { id: 2, branch: 'BM DAV', title: 'Science Exhibition', url: 'https://picsum.photos/seed/science/800/600' },
    { id: 3, branch: 'Tungri', title: 'Cultural Fest', url: 'https://picsum.photos/seed/culture/800/600' },
    { id: 4, branch: 'Chaliyama', title: 'Smart Classroom', url: 'https://picsum.photos/seed/class/800/600' },
    { id: 5, branch: 'BM DAV', title: 'Library Session', url: 'https://picsum.photos/seed/library/800/600' },
    { id: 6, branch: 'Tungri', title: 'Morning Assembly', url: 'https://picsum.photos/seed/assembly/800/600' },
    { id: 7, branch: 'Chaliyama', title: 'Computer Lab', url: 'https://picsum.photos/seed/computer/800/600' },
    { id: 8, branch: 'BM DAV', title: 'Yoga Class', url: 'https://picsum.photos/seed/yoga/800/600' },
    { id: 9, branch: 'Chaliyama', title: 'Campus Greenery', url: 'https://picsum.photos/seed/green/800/600' },
  ];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Our Gallery</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A glimpse into the vibrant life at Esteem Group of Schools. From academic milestones to creative expressions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1">{img.branch}</span>
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
