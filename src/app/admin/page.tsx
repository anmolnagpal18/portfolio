"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function SkillInput({ onAdd }: { onAdd: (val: string) => void }) {
  const [val, setVal] = useState("");
  const submit = () => { const t = val.trim(); if (t) { onAdd(t); setVal(""); } };
  return (
    <div className="flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submit())}
        placeholder="Add skill & press Enter"
        className="flex-1 bg-dark/50 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-primary outline-none"
      />
      <button onClick={submit} className="px-4 py-2 bg-primary text-dark rounded-xl text-sm font-bold hover:opacity-90 transition">+</button>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [data, setData] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchSubmissions = () => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(d => setSubmissions(Array.isArray(d) ? d : []))
      .catch(() => setSubmissions([]));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error(err));
    fetchSubmissions();
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (file: File, index: number) => {
    setIsUploading(index);
    try {
      const base64 = await fileToBase64(file);
      const newProjects = [...data.projects];
      newProjects[index].image = base64;
      setData({ ...data, projects: newProjects });
      setMessage("Image processed! Remember to click 'Save' below.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error processing image");
    } finally {
      setIsUploading(null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "anmol123") {
      setIsLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Incorrect password");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Send only the data for the current tab to prevent "413 Payload Too Large" error
      const payloadData = { [activeTab]: data[activeTab] };
      
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: payloadData }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage("Changes saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(result.error || "Save failed");
      }
    } catch (err) {
      setMessage("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem]"
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">Portfolio <span className="text-primary italic font-display">Admin</span></h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-widest">Admin Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all font-mono"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-dark font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
            {message && <p className="text-red-400 text-sm text-center font-medium">{message}</p>}
          </form>
        </motion.div>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen bg-dark text-white flex items-center justify-center">Loading Data...</div>;

  return (
    <div className="min-h-screen bg-dark text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
      <header className="flex flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm hidden md:block">Manage your projects, experience, and academic journey.</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-sm italic hidden md:block">Each section saves individually</p>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <span className="w-6 h-0.5 bg-white rounded" />
              <span className="w-6 h-0.5 bg-white rounded" />
              <span className="w-4 h-0.5 bg-white rounded" />
            </button>
          </div>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Slide-in Drawer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: mobileMenuOpen ? '0%' : '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 left-0 h-full w-72 bg-[#111] border-r border-white/10 z-50 lg:hidden flex flex-col shadow-2xl"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="text-lg font-bold text-white">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Drawer Nav Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {['profile', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'submissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'submissions') fetchSubmissions();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold capitalize transition-all flex items-center justify-between ${
                  activeTab === tab ? 'bg-primary text-dark shadow-xl' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab}
                {tab === 'submissions' && submissions.length > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    activeTab === tab ? 'bg-dark/20 text-dark' : 'bg-primary/20 text-primary'
                  }`}>{submissions.length}</span>
                )}
              </button>
            ))}
          </nav>
        </motion.div>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-primary/20 border border-primary/30 text-primary rounded-2xl text-center font-bold"
          >
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* Sidebar — desktop only */}
          <nav className="space-y-2 hidden lg:block">
            {['profile', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'submissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); if (tab === 'submissions') fetchSubmissions(); }}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold capitalize transition-all flex items-center justify-between ${activeTab === tab ? 'bg-primary text-dark shadow-xl' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                {tab}
                {tab === 'submissions' && submissions.length > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === tab ? 'bg-dark/20 text-dark' : 'bg-primary/20 text-primary'}`}>
                    {submissions.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Editor Area */}
          <main className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl">

            {activeTab === 'profile' && data?.profile && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold italic font-display text-primary">Profile & Photos</h2>

                {/* Text fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Your Name</label>
                    <input value={data.profile.name || ''} onChange={(e) => setData({...data, profile: {...data.profile, name: e.target.value}})} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Title / Role</label>
                    <input value={data.profile.title || ''} onChange={(e) => setData({...data, profile: {...data.profile, title: e.target.value}})} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Hero Bio</label>
                  <textarea rows={3} value={data.profile.bio || ''} onChange={(e) => setData({...data, profile: {...data.profile, bio: e.target.value}})} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none" />
                </div>

                {/* Photo uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Hero Photo */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Hero Section Photo</label>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-dark/50 border border-white/10">
                      {data.profile.heroImage && <img src={data.profile.heroImage} alt="Hero" className="w-full h-full object-contain" />}
                    </div>
                    <label className="flex items-center justify-center gap-2 border border-primary/30 rounded-xl py-3 cursor-pointer hover:bg-primary/10 transition-all text-white text-xs font-bold uppercase tracking-widest">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      Upload Hero Photo
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        try {
                          const base64 = await fileToBase64(file);
                          setData({...data, profile: {...data.profile, heroImage: base64}});
                          setMessage("Hero photo processed! Click 'Save Profile' to apply.");
                          setTimeout(() => setMessage(""), 3000);
                        } catch (err) {
                          setMessage("Error processing image");
                        }
                      }} />
                    </label>
                  </div>
                  {/* Experience Photo */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Experience Section Photo</label>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-dark/50 border border-white/10">
                      {data.profile.experienceImage && <img src={data.profile.experienceImage} alt="Experience" className="w-full h-full object-contain" />}
                    </div>
                    <label className="flex items-center justify-center gap-2 border border-primary/30 rounded-xl py-3 cursor-pointer hover:bg-primary/10 transition-all text-white text-xs font-bold uppercase tracking-widest">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      Upload Experience Photo
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        try {
                          const base64 = await fileToBase64(file);
                          setData({...data, profile: {...data.profile, experienceImage: base64}});
                          setMessage("Experience photo processed! Click 'Save Profile' to apply.");
                          setTimeout(() => setMessage(""), 3000);
                        } catch (err) {
                          setMessage("Error processing image");
                        }
                      }} />
                    </label>
                  </div>
                </div>

                {/* CV / Resume Upload */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">CV / Resume (PDF)</label>
                  <div className="flex items-center gap-4 p-4 bg-dark/50 border border-white/10 rounded-xl">
                    <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-medium truncate">
                          {data.profile.cvPath ? data.profile.cvPath.split('/').pop()?.replace(/^\d+-/, '') : 'No CV uploaded'}
                        </p>
                        {data.profile.cvPath && (
                          <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 font-bold uppercase tracking-wider">PDF</span>
                        )}
                      </div>
                      {data.profile.cvPath && (
                        <div className="flex items-center gap-3 mt-1">
                          <a href="/api/cv" target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">Preview / Download</a>
                          <span className="text-[10px] text-gray-500 italic">File format is preserved securely</span>
                        </div>
                      )}
                    </div>
                    <label className="flex-shrink-0 flex items-center gap-2 border border-primary/30 rounded-xl px-4 py-2 cursor-pointer hover:bg-primary/10 transition-all text-white text-xs font-bold uppercase tracking-widest">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      Upload PDF
                      <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setMessage("Processing CV...");
                        try {
                          const base64 = await fileToBase64(file);
                          setData({...data, profile: {...data.profile, cvPath: base64}});
                          setMessage("CV processed! Click 'Save Profile' to apply.");
                          setTimeout(() => setMessage(""), 4000);
                        } catch (err) {
                          setMessage("Error processing PDF");
                        }
                      }} />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button onClick={handleSave} disabled={isSaving} className="bg-primary text-dark px-8 py-3 rounded-xl font-bold uppercase text-sm hover:shadow-[0_0_20px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50">
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'about' && data?.about !== undefined && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold italic font-display text-primary">About Content</h2>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Scrolling Quote</label>
                  <textarea
                    rows={4}
                    value={data.about.quote || ''}
                    onChange={(e) => setData({...data, about: {...data.about, quote: e.target.value}})}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Greeting Text (e.g. Hallo!)</label>
                  <input
                    value={data.about.greeting || ''}
                    onChange={(e) => setData({...data, about: {...data.about, greeting: e.target.value}})}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Focus Statement (large text)</label>
                  <textarea
                    rows={5}
                    value={data.about.focus || ''}
                    onChange={(e) => setData({...data, about: {...data.about, focus: e.target.value}})}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
                  />
                </div>

                {/* Marquee Roles */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Scrolling Role Tags (below Hero)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(data.about.marqueeRoles || []).map((role: string, ri: number) => (
                      <span key={ri} className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white font-bold uppercase tracking-widest">
                        {role}
                        <button
                          onClick={() => setData({...data, about: {...data.about, marqueeRoles: (data.about.marqueeRoles || []).filter((_: string, i: number) => i !== ri)}})}
                          className="text-gray-400 hover:text-red-400 ml-1 font-bold"
                        >×</button>
                      </span>
                    ))}
                  </div>
                  <SkillInput onAdd={(val) => {
                    const roles = data.about.marqueeRoles || [];
                    if (!roles.includes(val.toUpperCase())) {
                      setData({...data, about: {...data.about, marqueeRoles: [...roles, val.toUpperCase()]}});
                    }
                  }} />
                  <p className="text-gray-600 text-xs">Type a role and press Enter or + to add. Text will auto-uppercase.</p>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button onClick={handleSave} disabled={isSaving} className="bg-primary text-dark px-8 py-3 rounded-xl font-bold uppercase text-sm hover:shadow-[0_0_20px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50">
                    {isSaving ? 'Saving...' : 'Save About'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'skills' && data?.skills && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold italic font-display text-primary">Skills & Technologies</h2>
                  <button
                    onClick={() => setData({...data, skills: [...data.skills, { category: "New Category", items: [] }]})}
                    className="text-xs font-bold uppercase tracking-widest border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-all text-white"
                  >
                    Add Category +
                  </button>
                </div>
                {data.skills.map((skillCat: any, ci: number) => (
                  <div key={ci} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      <input
                        value={skillCat.category}
                        onChange={(e) => {
                          const newSkills = [...data.skills];
                          newSkills[ci].category = e.target.value;
                          setData({...data, skills: newSkills});
                        }}
                        className="flex-1 bg-dark/50 border border-white/10 rounded-xl px-4 py-2 text-white font-bold focus:border-primary outline-none"
                      />
                      <button
                        onClick={() => setData({...data, skills: data.skills.filter((_: any, i: number) => i !== ci)})}
                        className="text-red-400 text-xs font-bold uppercase hover:underline"
                      >Delete Category</button>
                    </div>
                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2">
                      {skillCat.items.map((item: string, ii: number) => (
                        <span key={ii} className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                          {item}
                          <button
                            onClick={() => {
                              const newSkills = [...data.skills];
                              newSkills[ci].items = newSkills[ci].items.filter((_: string, i: number) => i !== ii);
                              setData({...data, skills: newSkills});
                            }}
                            className="text-gray-400 hover:text-red-400 ml-1 font-bold"
                          >×</button>
                        </span>
                      ))}
                    </div>
                    {/* Add skill input */}
                    <SkillInput onAdd={(val) => {
                      const newSkills = [...data.skills];
                      if (!newSkills[ci].items.includes(val)) newSkills[ci].items.push(val);
                      setData({...data, skills: newSkills});
                    }} />
                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <button onClick={handleSave} disabled={isSaving} className="bg-primary text-dark px-6 py-2 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_15px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50">
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center mb-4">
                   <h2 className="text-2xl font-bold italic font-display text-primary">Managed Projects</h2>
                   <button 
                    onClick={() => setData({...data, projects: [...data.projects, { id: Date.now().toString(), title: "New Project", tagline: "Tagline", tags: [], description: "", liveLink: "#", githubLink: "https://github.com/anmolnagpal18", image: "/project_learning.png", date: "Present" }]})}
                    className="text-xs font-bold uppercase tracking-widest border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-all text-white"
                   >
                    Add Project +
                   </button>
                </div>
                {data.projects.map((p: any, i: number) => (
                  <div key={p.id} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Project Title</label>
                        <input 
                          value={p.title} 
                          onChange={(e) => {
                            const newProjects = [...data.projects];
                            newProjects[i].title = e.target.value;
                            setData({...data, projects: newProjects});
                          }}
                          className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Project Photo</label>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-4">
                             <label className={`cursor-pointer bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-sm font-bold uppercase transition-all text-white ${isUploading === i ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-dark'}`}>
                               {isUploading === i ? "Uploading..." : "Choose from Laptop"}
                               <input 
                                 type="file" 
                                 className="hidden" 
                                 accept="image/*"
                                 onChange={(e) => {
                                   if (e.target.files?.[0]) {
                                     handleImageUpload(e.target.files[0], i);
                                   }
                                 }}
                                 disabled={isUploading !== null}
                               />
                             </label>
                             {p.image && (
                               <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                 <span className="text-[10px] text-gray-400 font-mono truncate max-w-[200px]">{p.image}</span>
                                 <div className="w-8 h-8 rounded-md overflow-hidden relative border border-white/10">
                                   <img src={p.image} alt="Preview" className="object-cover w-full h-full" />
                                 </div>
                               </div>
                             )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Live Link</label>
                        <input 
                          value={p.liveLink || p.link} 
                          onChange={(e) => {
                            const newProjects = [...data.projects];
                            newProjects[i].liveLink = e.target.value;
                            delete newProjects[i].link; // Clean up old field if present
                            setData({...data, projects: newProjects});
                          }}
                          className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">GitHub Link</label>
                        <input 
                          value={p.githubLink || ""} 
                          onChange={(e) => {
                            const newProjects = [...data.projects];
                            newProjects[i].githubLink = e.target.value;
                            setData({...data, projects: newProjects});
                          }}
                          placeholder="https://github.com/..."
                          className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Technology / Languages (Comma separated)</label>
                      <input 
                        value={p.tags?.join(", ") || ""} 
                        onChange={(e) => {
                          const newProjects = [...data.projects];
                          newProjects[i].tags = e.target.value.split(",").map(t => t.trim());
                          setData({...data, projects: newProjects});
                        }}
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" 
                      />
                    </div>

                    <div className="space-y-2 text-dark">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Tagline</label>
                      <input 
                        value={p.tagline} 
                        onChange={(e) => {
                          const newProjects = [...data.projects];
                          newProjects[i].tagline = e.target.value;
                          setData({...data, projects: newProjects});
                        }}
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Description</label>
                      <textarea 
                        value={p.description} 
                        onChange={(e) => {
                          const newProjects = [...data.projects];
                          newProjects[i].description = e.target.value;
                          setData({...data, projects: newProjects});
                        }}
                        rows={3}
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none" 
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Project Date (e.g. March 2026)</label>
                       <input 
                         value={p.date || ""} 
                         onChange={(e) => {
                           const newProjects = [...data.projects];
                           newProjects[i].date = e.target.value;
                           setData({...data, projects: newProjects});
                         }} 
                         placeholder="Month Year" 
                         className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" 
                       />
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <button 
                        onClick={() => {
                          const newProjects = data.projects.filter((_: any, idx: number) => idx !== i);
                          setData({...data, projects: newProjects});
                        }}
                        className="text-red-400 text-xs font-bold uppercase hover:underline"
                      >
                        Delete Project
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-dark px-6 py-2 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_15px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Saving..." : "Save Project"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center mb-4 text-dark">
                   <h2 className="text-2xl font-bold italic font-display text-primary">Professional Experience</h2>
                   <button 
                    onClick={() => setData({...data, experience: [...data.experience, { company: "New Company", role: "Role", period: "2026", status: "Running", description: "", link: "#" }]})}
                    className="text-xs font-bold uppercase tracking-widest border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-all text-white"
                   >
                    Add Experience +
                   </button>
                </div>
                {data.experience.map((exp: any, i: number) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Company</label>
                        <input value={exp.company} onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[i].company = e.target.value;
                          setData({...data, experience: newExp});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Status</label>
                        <select value={exp.status} onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[i].status = e.target.value;
                          setData({...data, experience: newExp});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none">
                          <option value="Running">Running</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Role</label>
                        <input value={exp.role} onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[i].role = e.target.value;
                          setData({...data, experience: newExp});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Period (e.g. March 2026 — Present)</label>
                        <input value={exp.period} onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[i].period = e.target.value;
                          setData({...data, experience: newExp});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Company Link (URL)</label>
                      <input value={exp.link || ""} onChange={(e) => {
                        const newExp = [...data.experience];
                        newExp[i].link = e.target.value;
                        setData({...data, experience: newExp});
                      }} placeholder="https://..." className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Description</label>
                      <textarea 
                        value={exp.description} 
                        onChange={(e) => {
                          const newExp = [...data.experience];
                          newExp[i].description = e.target.value;
                          setData({...data, experience: newExp});
                        }}
                        rows={3}
                        className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none" 
                      />
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <button 
                        onClick={() => {
                          const newExp = data.experience.filter((_: any, idx: number) => idx !== i);
                          setData({...data, experience: newExp});
                        }}
                        className="text-red-400 text-xs font-bold uppercase hover:underline"
                      >
                        Delete Experience
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-dark px-6 py-2 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_15px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Saving..." : "Save Experience"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-12">
                <h2 className="text-2xl font-bold italic font-display text-primary mb-4">Education History</h2>
                {data.education.map((edu: any, i: number) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">School / University</label>
                        <input value={edu.school} onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[i].school = e.target.value;
                          setData({...data, education: newEdu});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">CGPA / Percentage</label>
                        <input value={edu.details} onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[i].details = e.target.value;
                          setData({...data, education: newEdu});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Degree / Class</label>
                        <input value={edu.degree} onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[i].degree = e.target.value;
                          setData({...data, education: newEdu});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Status</label>
                        <select value={edu.status} onChange={(e) => {
                          const newEdu = [...data.education];
                          newEdu[i].status = e.target.value;
                          setData({...data, education: newEdu});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none">
                          <option value="Running">Running</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Period (e.g. August 2023 — Present)</label>
                      <input value={edu.period} onChange={(e) => {
                        const newEdu = [...data.education];
                        newEdu[i].period = e.target.value;
                        setData({...data, education: newEdu});
                      }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                    </div>
                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-dark px-6 py-2 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_15px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Saving..." : "Save Education"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold italic font-display text-primary">Certifications</h2>
                  <button 
                    onClick={() => setData({...data, certifications: [...data.certifications, { title: "New Certificate", issuer: "Issuer", date: "Month Year", link: "#" }]})}
                    className="text-xs font-bold uppercase tracking-widest border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-all text-white"
                  >
                    Add Certificate +
                  </button>
                </div>
                {data.certifications.map((cert: any, i: number) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Certificate Title</label>
                        <input value={cert.title} onChange={(e) => {
                          const newCerts = [...data.certifications];
                          newCerts[i].title = e.target.value;
                          setData({...data, certifications: newCerts});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Issuer</label>
                        <input value={cert.issuer} onChange={(e) => {
                          const newCerts = [...data.certifications];
                          newCerts[i].issuer = e.target.value;
                          setData({...data, certifications: newCerts});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Date</label>
                        <input value={cert.date} onChange={(e) => {
                          const newCerts = [...data.certifications];
                          newCerts[i].date = e.target.value;
                          setData({...data, certifications: newCerts});
                        }} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Credential Link (URL)</label>
                       <input value={cert.link || ""} onChange={(e) => {
                         const newCerts = [...data.certifications];
                         newCerts[i].link = e.target.value;
                         setData({...data, certifications: newCerts});
                       }} placeholder="https://..." className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <button 
                        onClick={() => {
                          const newCerts = data.certifications.filter((_: any, idx: number) => idx !== i);
                          setData({...data, certifications: newCerts});
                        }}
                        className="text-red-400 text-xs font-bold uppercase hover:underline"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-dark px-6 py-2 rounded-xl text-xs font-bold uppercase hover:shadow-[0_0_15px_rgba(190,253,74,0.3)] transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold italic font-display text-primary">Contact Submissions</h2>
                  <button onClick={fetchSubmissions} className="text-xs font-bold uppercase tracking-widest border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-all text-white">
                    Refresh
                  </button>
                </div>
                {submissions.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <p className="font-bold text-lg">No submissions yet</p>
                    <p className="text-sm mt-1">Form responses will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((sub: any) => (
                      <div key={sub._id || sub.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-white text-lg">{sub.name}</p>
                            <a href={`mailto:${sub.email}`} className="text-primary text-sm hover:underline">{sub.email}</a>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-xs">{new Date(sub.createdAt || sub.submittedAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            <p className="text-gray-500 text-xs">{new Date(sub.createdAt || sub.submittedAt || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap bg-white/3 rounded-xl p-4 border border-white/5 mb-4">{sub.message}</p>
                        <div className="flex justify-between items-center">
                          <a href={`mailto:${sub.email}?subject=Re: Your Portfolio Inquiry`} className="text-xs font-bold uppercase text-primary hover:underline">Reply via Email →</a>
                          <button
                            onClick={async () => {
                              if (!confirm('Are you sure you want to delete this message?')) return;
                              await fetch(`/api/contact?id=${sub._id || sub.id}`, { method: 'DELETE' });
                              fetchSubmissions();
                            }}
                            className="text-red-400 text-xs font-bold uppercase hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
