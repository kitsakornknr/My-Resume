'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifySessionToken,
} from '@/lib/auth';

export async function getResumeData() {
  const profile = await prisma.profile.findFirst();
  const skills = await prisma.skill.findMany();
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' } 
  });

  return { profile, skills, projects };
}

export async function updateProfile(formData: any) {
  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: {
        name: formData.name,
        role: formData.role,
        about: formData.about,
        email: formData.email,
        phone: formData.phone,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
        availability: formData.availability,
      }
    });
  } else {
    await prisma.profile.create({
      data: {
        name: formData.name,
        role: formData.role,
        about: formData.about,
        email: formData.email,
        phone: formData.phone,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
        availability: formData.availability,
        btnWorkText: "View Work",
        btnContactText: "Contact Me"
      }
    });
  }

  revalidatePath('/');
  return { success: true };
}

export async function addSkill(skillData: any) {
  await prisma.skill.create({
    data: {
      name: skillData.name,
      category: skillData.category,
    },
  });
  revalidatePath('/');
  return { success: true };
}

export async function deleteSkill(skillId: string) {
  await prisma.skill.delete({
    where: { id: skillId },
  });
  revalidatePath('/');
  return { success: true };
}

export async function updateSkill(data: any) {
  await prisma.skill.update({
    where: { id: data.id },
    data: {
      name: data.name,
      category: data.category,
    },
  });
  revalidatePath('/admin');
}

export async function addProject(projectData: any) {
  const tagsArray = projectData.tags 
    ? (typeof projectData.tags === 'string' ? projectData.tags.split(',') : projectData.tags).map((t: string) => t.trim()).filter((t: string) => t !== '')
    : [];
  const newProject = await prisma.project.create({
    data: {
      title: projectData.title,
      description: projectData.description,
      link: projectData.link,
      image: projectData.image,
      category: projectData.category,
      label: projectData.label || '',
      tags: tagsArray,
    },
  });

  revalidatePath('/');
  return { success: true, id: newProject.id }; 
}

export async function updateProject(data: any) {
  await prisma.project.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      image: data.image,
      category: data.category,
      tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags,
      label: data.label,
    },
  });
  revalidatePath('/admin');
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({
    where: { id: projectId },
  });
  revalidatePath('/');
  return { success: true };
}

export async function verifyLogin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (
    username === process.env.ADMIN_USERNAME && 
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = await createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });

    return { success: true };
  }

  return { success: false };
}

// Server-side guard for admin-only actions. Throws if the session is missing/invalid.
async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    throw new Error('Unauthorized');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/login');
}

// ---------- Contact messages ----------

// Public: called from the contact form on the homepage.
export async function createMessage(formData: { name: string; email: string; message: string }) {
  const name = (formData.name || '').trim();
  const email = (formData.email || '').trim();
  const message = (formData.message || '').trim();

  if (!name || !email || !message) {
    return { success: false, error: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'รูปแบบอีเมลไม่ถูกต้อง' };
  }
  if (message.length > 5000 || name.length > 200 || email.length > 200) {
    return { success: false, error: 'ข้อความยาวเกินกำหนด' };
  }

  await prisma.message.create({ data: { name, email, message } });
  return { success: true };
}

// Admin only.
export async function getMessages() {
  await requireAdmin();
  return prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function markMessageRead(id: string, isRead: boolean) {
  await requireAdmin();
  await prisma.message.update({ where: { id }, data: { isRead } });
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.message.delete({ where: { id } });
  revalidatePath('/admin');
  return { success: true };
}