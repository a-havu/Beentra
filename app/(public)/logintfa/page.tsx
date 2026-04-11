import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VerifyLogin from '@/components/login/VerifyLogin';

export default async function LoginTfaPage() {
  const cookieStore = await cookies();
  const tempToken = cookieStore.get('tfa-temp-token')?.value;
  if (!tempToken) {
    redirect('/login?error=no_token');
  }
  return <VerifyLogin tempToken={tempToken} />;
}
