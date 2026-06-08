import { getResumeData, getMessages } from '@/app/actions';
import AdminEditor from '../components/AdminEditor';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const data = await getResumeData();
  const messages = await getMessages();

  return <AdminEditor initialData={data} initialMessages={messages} />;
}
