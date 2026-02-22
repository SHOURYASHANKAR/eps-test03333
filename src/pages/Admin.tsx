import { useState } from 'react';
import { useSchools } from '@/src/hooks/useSchools';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, LayoutDashboard, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { BranchData } from '../data/schools';

export default function Admin() {
  const { schools, loading, updateSchool } = useSchools();
  const [selectedSchool, setSelectedSchool] = useState<BranchData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (loading) return <div className="pt-32 text-center">Loading Dashboard...</div>;

  const handleSave = async () => {
    if (!selectedSchool) return;
    setIsSaving(true);
    const success = await updateSchool(selectedSchool);
    setIsSaving(false);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleAchievementAdd = () => {
    if (!selectedSchool) return;
    const newAchievements = [...(selectedSchool.achievements || []), { title: 'New Achievement', value: '90%' }];
    setSelectedSchool({ ...selectedSchool, achievements: newAchievements });
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" /> Admin Panel
          </h2>
          <nav className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Manage Branches</p>
            {schools.map(school => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedSchool?.id === school.id ? 'bg-primary text-white' : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                {school.shortName}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-8">
        {!selectedSchool ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Settings className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-xl font-medium">Select a branch to edit information</p>
          </div>
        ) : (
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold">Editing: {selectedSchool.name}</h2>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : <><Save className="w-5 h-5" /> Save Changes</>}
              </button>
            </div>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/10 text-secondary p-4 rounded-xl border border-secondary/20 flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> Changes saved successfully!
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Info */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <h3 className="font-bold text-lg border-b pb-2">Basic Information</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">School Name</label>
                  <input
                    value={selectedSchool.name}
                    onChange={e => setSelectedSchool({ ...selectedSchool, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Overview</label>
                  <textarea
                    value={selectedSchool.overview}
                    onChange={e => setSelectedSchool({ ...selectedSchool, overview: e.target.value })}
                    rows={4}
                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <h3 className="font-bold text-lg border-b pb-2">Contact Details</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Address</label>
                  <input
                    value={selectedSchool.contact.address}
                    onChange={e => setSelectedSchool({ ...selectedSchool, contact: { ...selectedSchool.contact, address: e.target.value } })}
                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Phone (Comma separated)</label>
                  <input
                    value={selectedSchool.contact.phone.join(', ')}
                    onChange={e => setSelectedSchool({ ...selectedSchool, contact: { ...selectedSchool.contact, phone: e.target.value.split(',').map(s => s.trim()) } })}
                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 md:col-span-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-bold text-lg">Achievements & Toppers</h3>
                  <button
                    onClick={handleAchievementAdd}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-bold"
                  >
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedSchool.achievements?.map((ach, i) => (
                    <div key={i} className="flex gap-2 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex-grow space-y-2">
                        <input
                          value={ach.title}
                          onChange={e => {
                            const newAch = [...(selectedSchool.achievements || [])];
                            newAch[i].title = e.target.value;
                            setSelectedSchool({ ...selectedSchool, achievements: newAch });
                          }}
                          className="w-full p-2 bg-white rounded border border-slate-200 text-sm"
                          placeholder="Title"
                        />
                        <input
                          value={ach.value}
                          onChange={e => {
                            const newAch = [...(selectedSchool.achievements || [])];
                            newAch[i].value = e.target.value;
                            setSelectedSchool({ ...selectedSchool, achievements: newAch });
                          }}
                          className="w-full p-2 bg-white rounded border border-slate-200 text-sm font-bold"
                          placeholder="Value"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newAch = selectedSchool.achievements?.filter((_, index) => index !== i);
                          setSelectedSchool({ ...selectedSchool, achievements: newAch });
                        }}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
