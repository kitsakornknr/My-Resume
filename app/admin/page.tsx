import { getResumeData } from '@/app/actions';
import AdminEditor from '../components/AdminEditor';

export default async function AdminPage() {
  const data = await getResumeData();

  return <AdminEditor initialData={data} />;
}