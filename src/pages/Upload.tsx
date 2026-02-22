import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Upload as UploadIcon, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { schoolsData } from '@/src/data/schools';
import { useState } from 'react';

interface UploadForm {
  name: string;
  email: string;
  branch: string;
  classYear: string;
  description: string;
  photos: FileList;
  consent: boolean;
}

export default function Upload() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UploadForm>();

  const onSubmit = async (data: UploadForm) => {
    setStatus('loading');
    // Simulate upload
    setTimeout(() => {
      console.log('Form Data:', data);
      setStatus('success');
      reset();
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-primary/10 rounded-full mb-6"
          >
            <UploadIcon className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-serif font-bold mb-4">Upload Your Memories</h1>
          <p className="text-slate-500">
            Share your school memories with us! Upload photos from sports days, cultural fests, or classroom moments to be featured in our gallery.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
              <p className="text-slate-500 mb-8">Thank you for sharing your memories. Our team will review and add them to the gallery soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Upload More
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address *</label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Branch *</label>
                  <select
                    {...register('branch', { required: 'Please select a branch' })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select Branch</option>
                    {schoolsData.map(s => <option key={s.id} value={s.id}>{s.shortName}</option>)}
                  </select>
                  {errors.branch && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.branch.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Class / Year</label>
                  <input
                    {...register('classYear')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. Class XII, 2025"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Description / Caption *</label>
                <textarea
                  {...register('description', { required: 'Description is required', maxLength: 200 })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about these photos..."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Photos (Max 5, JPEG/PNG) *</label>
                <div className="relative group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register('photos', { required: 'Please select at least one photo' })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full px-4 py-8 rounded-xl border-2 border-dashed border-slate-200 group-hover:border-primary group-hover:bg-primary/5 transition-all text-center">
                    <UploadIcon className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-sm text-slate-500">Click or drag photos here to upload</p>
                  </div>
                </div>
                {errors.photos && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.photos.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  {...register('consent', { required: 'You must agree to the terms' })}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label className="text-sm text-slate-600">
                  I agree that these photos can be used by the school for gallery and promotional purposes.
                </label>
              </div>
              {errors.consent && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.consent.message}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Submit Memories <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
