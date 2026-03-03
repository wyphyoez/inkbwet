import Image from 'next/image';
import { currentUser } from '@/lib/data';

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-4">
        <Image
          src={currentUser.avatar!}
          alt={currentUser.name}
          width={72}
          height={72}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{currentUser.name}</h1>
          <p className="text-sm text-slate-500">{currentUser.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">Bio</p>
          <p className="mt-1 text-slate-800">{currentUser.bio || 'No bio yet.'}</p>
        </div>
      </div>
    </div>
  );
}
