'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getResumeData() {
  const profile = await prisma.profile.findFirst();
  const skills = await prisma.skill.findMany();
  // เรียงลำดับ Project จากใหม่ไปเก่า (createdAt desc) หรือตามต้องการ
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

  await prisma.project.create({
    data: {
      title: projectData.title,
      description: projectData.description,
      link: projectData.link,
      image: projectData.image, // <--- เพิ่มบรรทัดนี้ ไม่งั้นสร้างใหม่รูปไม่มา
      category: projectData.category,
      label: projectData.label || '',
      tags: tagsArray,
    },
  });
  revalidatePath('/');
  return { success: true };
}

export async function updateProject(data: any) {
  await prisma.project.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      link: data.link,
      image: data.image, // <--- ตรงนี้จะหายแดงหลังจากรัน npx prisma generate
      category: data.category,
      // เช็ค type tags ให้ชัวร์ก่อน split
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
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true };
  }

  return { success: false };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}