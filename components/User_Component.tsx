'use client';

import { memo } from 'react';
import Image from 'next/image';

export interface UserData {
  avatar_url?: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  location?: string;
  login?: string;
}

interface UserComponentProps {
  userData?: UserData | null;
}

const User_Component = memo(function UserComponent({ userData }: UserComponentProps) {
  if (!userData) return null;

  const { avatar_url, name, bio, followers, following, location } = userData;

  return (
    <main className="w-full text-text">
      <div className="container mx-auto px-4 md:py-12">
        <div className="mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-end">
            {/* Avatar */}
            <div className="shrink-0 border-background border-[6px] md:border-8 rounded-3xl overflow-hidden -mt-16 md:-mt-20">
              {avatar_url && (
                <Image
                  src={avatar_url}
                  alt={name || 'User avatar'}
                  width={140}
                  height={140}
                  priority
                  className="rounded-2xl shadow-lg"
                />
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-col p-2.5">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Followers */}
                <StatCard label="Followers" value={followers?.toLocaleString() || '0'} />
                {/* Following */}
                <StatCard label="Following" value={following?.toLocaleString() || '0'} />
                {/* Location */}
                <StatCard label="Location" value={location || 'Not specified'} />
              </div>
            </div>
          </div>

          {/* Name + Bio */}
          <div className="mt-6 mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
            <p className="text-slate-300 text-base md:text-lg">{bio}</p>
          </div>
        </div>
      </div>
    </main>
  );
});

User_Component.displayName = 'UserComponent';

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard = memo(function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex items-center bg-secoundary w-fit rounded-xl px-4 py-4 border border-slate-600/30 shrink-0">
      <p className="text-slate-400 text-sm md:text-base border-r border-slate-600 pr-5 mr-2">
        {label}
      </p>
      <p className="pl-5">{value}</p>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default User_Component;
