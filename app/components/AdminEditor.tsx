'use client';

import { useState, useEffect } from 'react';
import { updateProfile, addSkill, deleteSkill, updateSkill, addProject, deleteProject, updateProject } from '@/app/actions';
import { createClient } from '@supabase/supabase-js';
import {
    Save, Home, Loader2, Plus, Trash2, Code2, Layers, User, Briefcase,
    Mail, Phone, Github, Linkedin, Globe, Tag, Image as ImageIcon, UploadCloud, X, Pencil,
    ChevronRight, Search
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Helper Components ---
const FormInput = ({ label, value, onChange, placeholder, icon: Icon, disabled }: any) => (
    <div className="flex flex-col gap-2 mb-4">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            {Icon && <Icon size={12} className="text-blue-400" />}
            {label}
        </label>
        <input
            disabled={disabled}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
        />
    </div>
);

const FormTextarea = ({ label, value, onChange, placeholder, style }: any) => (
    <div className="flex flex-col gap-2 mb-4">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {label}
        </label>
        <textarea
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px] resize-y"
            placeholder={placeholder}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            style={style}
        />
    </div>
);

const FormSelect = ({ label, value, onChange, options }: any) => (
    <div className="flex flex-col gap-2 mb-4 w-full">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {label}
        </label>
        <div className="relative">
            <select
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>
    </div>
);

export default function AdminEditor({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('projects');

    const [profile, setProfile] = useState(initialData?.profile || {});
    const [skills, setSkills] = useState(initialData?.skills || []);
    const [projects, setProjects] = useState(initialData?.projects || []);

    // UI States
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // --- EDIT STATE ---
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null); // null = Create Mode

    const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend Development' });
    const [newProject, setNewProject] = useState({
        title: '', description: '', link: '', image: '', category: 'Flagship Projects', tags: '', label: ''
    });

    const defaultSkillCategories = ['Frontend Development', 'Backend & Database', 'DevOps & Tools', 'Automation & Martech', 'Landing Page Projects'];
    const defaultProjectCategories = ['Flagship Projects', 'Full Ownership Projects', 'Internal Projects', 'Ongoing Maintenance', 'Landing Page Projects'];
    const getUniqueCategories = (items: any[]) => Array.from(new Set(items.map(item => item.category).filter(Boolean)));
    const displaySkillCategories = Array.from(new Set([...defaultSkillCategories, ...getUniqueCategories(skills)]));

    useEffect(() => {
        if (initialData?.profile) setProfile(initialData.profile);
        if (initialData?.skills) setSkills(initialData.skills);
        if (initialData?.projects) setProjects(initialData.projects);
    }, [initialData]);

    // --- Helpers ---
    const convertToWebP = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) { reject(new Error('Canvas context not available')); return; }
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => { if (blob) resolve(blob); else reject(new Error('Conversion failed')); }, 'image/webp', 0.8);
            };
            img.onerror = (err) => reject(err);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        setIsUploading(true);
        try {
            const webpBlob = await convertToWebP(file);
            const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            const cleanName = originalName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
            const finalName = cleanName ? `${cleanName}-${Date.now()}.webp` : `image-${Date.now()}.webp`;
            const filePath = `projects/${finalName}`;
            const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, webpBlob, { contentType: 'image/webp', cacheControl: '3600', upsert: false });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath);
            setNewProject(prev => ({ ...prev, image: publicUrl }));
        } catch (error) { console.error('Upload failed:', error); alert('Upload failed.'); } finally { setIsUploading(false); }
    };
    const handleRemoveImage = () => setNewProject(prev => ({ ...prev, image: '' }));

    // --- CRUD ---
    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault(); setIsSaving(true);
        try { await updateProfile(profile); router.refresh(); alert('Saved!'); } catch (err) { alert('Error'); } finally { setIsSaving(false); }
    };

    const handleSaveSkill = async () => {
        if (!newSkill.name) return; setIsSaving(true);
        try {
            if (editingSkillId) { await updateSkill({ ...newSkill, id: editingSkillId }); setEditingSkillId(null); }
            else { await addSkill(newSkill); }
            setNewSkill({ ...newSkill, name: '' }); router.refresh();
        } catch (error) { console.error(error); } finally { setIsSaving(false); }
    };
    const handleEditSkill = (skill: any) => { setNewSkill({ name: skill.name, category: skill.category }); setEditingSkillId(skill.id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const handleCancelEditSkill = () => { setNewSkill({ ...newSkill, name: '' }); setEditingSkillId(null); };
    const handleDeleteSkill = async (id: string) => { if (confirm('Delete?')) { setIsSaving(true); await deleteSkill(id); router.refresh(); setIsSaving(false); } };

    // --- PROJECT LOGIC ---
    const handleCreateNewProjectClick = () => {
        setNewProject({ title: '', description: '', link: '', image: '', category: 'Flagship Projects', tags: '', label: '' });
        setEditingProjectId(null);
    };

    const handleProjectSelect = (project: any) => {
        setNewProject({
            title: project.title, description: project.description, link: project.link || '', image: project.image || '',
            category: project.category, tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags, label: project.label || ''
        });
        setEditingProjectId(project.id);
    };

    const handleSaveProject = async () => {
        if (!newProject.title) return; setIsSaving(true);
        try {
            if (editingProjectId) { await updateProject({ ...newProject, id: editingProjectId }); }
            else {
                const newP = await addProject(newProject);
                // @ts-ignore
                if (newP && newP.id) setEditingProjectId(newP.id); // Auto select after create
            }
            router.refresh();
        } catch (error) { console.error(error); } finally { setIsSaving(false); }
    };

    const handleDeleteCurrentProject = async () => {
        if (!editingProjectId) return;
        if (confirm('Delete this project?')) {
            setIsSaving(true);
            await deleteProject(editingProjectId);
            handleCreateNewProjectClick();
            router.refresh();
            setIsSaving(false);
        }
    };

    // --- Grouping Logic ---
    const projectGroups = [
        { id: 'flagship', label: 'Flagship', color: 'text-blue-400', filter: (p: any) => p.category.includes('Flagship') },
        { id: 'ownership', label: 'Full Ownership', color: 'text-purple-400', filter: (p: any) => (p.category.includes('Ownership') || p.category.includes('Internal')) && !p.category.includes('Flagship') },
        { id: 'landing', label: 'Landing Pages', color: 'text-orange-400', filter: (p: any) => p.category.includes('Landing Page') },
        {
            id: 'maintenance', label: 'Maintenance', color: 'text-green-400', filter: (p: any) =>
                !p.category.includes('Flagship') &&
                !p.category.includes('Ownership') &&
                !p.category.includes('Internal') &&
                !p.category.includes('Landing Page')
        }
    ];

    const menuItems = [{ id: 'profile', label: 'User Profile', icon: User }, { id: 'skills', label: 'Skills & Tech', icon: Code2 }, { id: 'projects', label: 'Projects', icon: Layers }];

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">A</div>
                        <div><h1 className="font-bold text-sm">Admin Panel</h1><p className="text-xs text-gray-500">Manage Portfolio</p></div>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <div className="text-xs font-bold text-gray-500 uppercase px-3 mb-2 tracking-wider">Menu</div>
                    {menuItems.map((item) => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.id ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}>
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5"><Home size={18} /> View Site</Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 h-screen overflow-hidden bg-[#050505]">

                {activeTab === 'projects' ? (
                    <div className="flex w-full h-full">
                        {/* LEFT COLUMN: Project List */}
                        <div className="w-[350px] bg-[#0c0c0c] border-r border-white/10 flex flex-col h-full">
                            <div className="p-4 border-b border-white/10">
                                <button onClick={handleCreateNewProjectClick} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition mb-4 shadow-lg shadow-blue-900/20">
                                    <Plus size={18} /> New Project
                                </button>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        className="w-full bg-[#151515] border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2 space-y-6">
                                {projectGroups.map((group) => {
                                    const groupProjects = projects.filter(p =>
                                        group.filter(p) && p.title.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                    if (groupProjects.length === 0) return null;

                                    return (
                                        <div key={group.id}>
                                            <h3 className={`text-[10px] font-bold ${group.color} uppercase tracking-wider px-3 mb-2 flex items-center gap-2`}>
                                                {group.label} <span className="bg-white/10 text-gray-400 px-1.5 rounded text-[9px]">{groupProjects.length}</span>
                                            </h3>
                                            <div className="space-y-1">
                                                {groupProjects.map(p => (
                                                    <button
                                                        key={p.id}
                                                        onClick={() => handleProjectSelect(p)}
                                                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 group ${editingProjectId === p.id ? 'bg-blue-600/10 border-blue-600/30' : 'bg-[#121212] border-transparent hover:bg-[#1a1a1a] hover:border-white/5'}`}
                                                    >
                                                        <div className="w-10 h-10 bg-black rounded overflow-hidden shrink-0 border border-white/10">
                                                            {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-700"><ImageIcon size={14} /></div>}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className={`text-sm font-bold truncate ${editingProjectId === p.id ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'}`}>{p.title}</div>
                                                            <div className="text-[10px] text-gray-500 truncate">{p.category}</div>
                                                        </div>
                                                        {editingProjectId === p.id && <ChevronRight size={14} className="text-blue-500" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Edit Form */}
                        <div className="flex-1 flex flex-col bg-[#050505] h-full overflow-hidden">
                            <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-sm shrink-0">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-white">
                                        {editingProjectId ? 'Edit Project' : 'Create New Project'}
                                    </h2>
                                    {editingProjectId && <span className="text-xs px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-500/20">ID: {editingProjectId.slice(0, 8)}...</span>}
                                </div>
                                <div className="flex items-center gap-3">
                                    {editingProjectId && (
                                        <button onClick={handleDeleteCurrentProject} disabled={isSaving} className="text-red-400 hover:bg-red-900/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    )}
                                    <button onClick={handleSaveProject} disabled={isSaving || isUploading} className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition disabled:opacity-50">
                                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                        {editingProjectId ? 'Save Changes' : 'Publish Project'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 lg:px-12">
                                <div className="max-w-3xl mx-auto space-y-8 pb-20">
                                    <div className="space-y-4">
                                        <FormInput label="Project Title" placeholder="e.g. E-Commerce Platform" value={newProject.title} onChange={(v: any) => setNewProject({ ...newProject, title: v })} />
                                        <FormTextarea label="Description" placeholder="Project details..." value={newProject.description} onChange={(v: any) => setNewProject({ ...newProject, description: v })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">Cover Image</label>
                                        {!newProject.image ? (
                                            <div className="border border-dashed border-gray-700 rounded-xl h-48 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition cursor-pointer relative bg-[#0f0f0f]">
                                                {isUploading ? <div className="flex flex-col items-center gap-2 text-blue-400"><Loader2 className="animate-spin" size={24} /><span className="text-xs">Processing...</span></div> : <><UploadCloud size={24} className="mb-2" /><span className="text-xs">Click to upload</span></>}
                                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" onChange={handleImageUpload} disabled={isUploading} accept="image/*" />
                                            </div>
                                        ) : (
                                            <div className="relative w-full aspect-video bg-[#0f0f0f] rounded-xl border border-gray-800 overflow-hidden group">
                                                <img src={newProject.image} alt="Preview" className="w-full h-full object-cover object-top" />
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-sm">
                                                    <button onClick={handleRemoveImage} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-xs"><X size={14} /> Remove</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <FormSelect label="Category" value={newProject.category} onChange={(v: any) => setNewProject({ ...newProject, category: v })} options={defaultProjectCategories.map(cat => ({ value: cat, label: cat }))} />
                                        <FormInput label="Website Link" placeholder="https://..." value={newProject.link} onChange={(v: any) => setNewProject({ ...newProject, link: v })} />
                                        <FormInput label="Tech Stack Tags" placeholder="React, Next.js, Supabase" value={newProject.tags} onChange={(v: any) => setNewProject({ ...newProject, tags: v })} />
                                        <FormInput label="Label Badge (Optional)" placeholder="e.g. New / High Traffic" value={newProject.label} onChange={(v: any) => setNewProject({ ...newProject, label: v })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // --- NORMAL LAYOUT FOR PROFILE & SKILLS ---
                    <div className="p-8 h-full overflow-y-auto">
                        <header className="flex justify-between items-center mb-8">
                            <div><h2 className="text-2xl font-bold flex items-center gap-3">{menuItems.find(m => m.id === activeTab)?.label}</h2></div>
                            {activeTab === 'profile' && (
                                <button onClick={handleProfileUpdate} disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50">
                                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
                                </button>
                            )}
                        </header>

                        <div>
                            {activeTab === 'profile' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#101010] p-6 rounded-2xl border border-gray-800">
                                            <h3 className="text-lg font-bold mb-4 text-gray-300">Basic Info</h3>
                                            <FormInput icon={User} label="Display Name" value={profile.name} onChange={(v: any) => setProfile({ ...profile, name: v })} placeholder="Your Name" />
                                            <FormInput icon={Briefcase} label="Job Role" value={profile.role} onChange={(v: any) => setProfile({ ...profile, role: v })} placeholder="e.g. Full Stack Developer" />
                                            <FormInput icon={Tag} label="Availability Status" value={profile.availability} onChange={(v: any) => setProfile({ ...profile, availability: v })} placeholder="e.g. Open to work" />
                                        </div>
                                        <div className="bg-[#101010] p-6 rounded-2xl border border-gray-800 h-full">
                                            <h3 className="text-lg font-bold mb-4 text-gray-300">Bio</h3>
                                            <FormTextarea label="About Me" value={profile.about} onChange={(v: any) => setProfile({ ...profile, about: v })} placeholder="Write something about yourself..." style={{ minHeight: '228px' }} />
                                        </div>
                                    </div>
                                    <div className="bg-[#101010] p-6 rounded-2xl border border-gray-800">
                                        <h3 className="text-lg font-bold mb-6 text-gray-300">Contact Details</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput icon={Mail} label="Email" value={profile.email} onChange={(v: any) => setProfile({ ...profile, email: v })} />
                                            <FormInput icon={Phone} label="Phone" value={profile.phone} onChange={(v: any) => setProfile({ ...profile, phone: v })} />
                                            <FormInput icon={Github} label="GitHub URL" value={profile.githubUrl} onChange={(v: any) => setProfile({ ...profile, githubUrl: v })} />
                                            <FormInput icon={Linkedin} label="LinkedIn URL" value={profile.linkedinUrl} onChange={(v: any) => setProfile({ ...profile, linkedinUrl: v })} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className={`bg-[#101010] p-6 rounded-2xl border ${editingSkillId ? 'border-blue-500/50' : 'border-gray-800'} shadow-lg transition-colors`}>
                                        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                            {editingSkillId ? <Pencil size={18} className="text-blue-400" /> : <Plus size={18} />} {editingSkillId ? 'Edit Skill' : 'Add New Skill'}
                                        </h3>
                                        <div className="flex flex-col md:flex-row gap-4 items-end">
                                            <div className="flex-1 w-full"><FormInput label="Skill Name" placeholder="e.g. React" value={newSkill.name} onChange={(v: any) => setNewSkill({ ...newSkill, name: v })} /></div>
                                            <div className="w-full md:w-1/3"><FormSelect label="Category" value={newSkill.category} onChange={(v: any) => setNewSkill({ ...newSkill, category: v })} options={defaultSkillCategories.map(cat => ({ value: cat, label: cat }))} /></div>
                                            <div className="pb-[18px] flex gap-2">
                                                <button onClick={handleSaveSkill} disabled={isSaving} className={`${editingSkillId ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'} text-white h-[48px] px-6 rounded-lg font-bold flex items-center gap-2 transition`}>
                                                    {isSaving ? <Loader2 className="animate-spin" /> : (editingSkillId ? <Save size={18} /> : <Plus size={18} />)} {editingSkillId ? 'Update' : 'Add'}
                                                </button>
                                                {editingSkillId && <button onClick={handleCancelEditSkill} disabled={isSaving} className="bg-gray-700 hover:bg-gray-600 text-white h-[48px] px-4 rounded-lg font-bold flex items-center gap-2 transition"><X size={18} /> Cancel</button>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        {displaySkillCategories.map((category: any) => {
                                            const catSkills = skills.filter((s: any) => s.category === category);
                                            if (catSkills.length === 0) return null;
                                            return (
                                                <div key={category} className="bg-[#151515] border border-gray-800 rounded-2xl p-6">
                                                    <h3 className="text-md font-bold text-blue-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2 flex items-center gap-2"><Layers size={16} /> {category}</h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                        {catSkills.map((s: any) => (
                                                            <div key={s.id} className="bg-black/40 border border-gray-700 p-3 rounded-xl flex justify-between items-center group hover:border-blue-500/30 transition">
                                                                <span className="font-bold text-gray-200 text-sm">{s.name}</span>
                                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                                                    <button onClick={() => handleEditSkill(s)} className="text-gray-400 hover:text-blue-400 bg-black/60 p-1.5 rounded-lg"><Pencil size={14} /></button>
                                                                    <button onClick={() => handleDeleteSkill(s.id)} className="text-gray-400 hover:text-red-400 bg-black/60 p-1.5 rounded-lg"><Trash2 size={14} /></button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}