'use client';

import Search_Component from '@/components/Search_Component';
import User_Component, { UserData } from '@/components/User_Component';
import Repositories_Component, { Repository } from '@/components/Repositories_Component';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [repos, setRepos] = useState<Repository[]>([]);

  const handleSearch = async (username: string) => {
    if (!username || username.trim() === '') {
      setUserData(undefined);
      setRepos([]);
      return;
    }

    try {
      const userController = new AbortController();
      const repoController = new AbortController();

      const [userRes, repoRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          signal: userController.signal,
        }),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`, {
          signal: repoController.signal,
        }),
      ]);

      if (!userRes.ok || !repoRes.ok) {
        console.error('Failed to fetch GitHub data');
        setUserData(undefined);
        setRepos([]);
        return;
      }

      const userData = await userRes.json();
      const repoData = await repoRes.json();

      setUserData(userData);
      setRepos(Array.isArray(repoData) ? repoData : []);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Search error:', error.message);
      }
      setUserData(undefined);
      setRepos([]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero */}
      <header className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/hero-image-github-profile.jpg"
          alt="Hero image"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/30" />

        {/* Search */}
        <div className="absolute inset-x-0 top-8 md:top-12 lg:top-16 flex justify-center px-4">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <Search_Component onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* User Section */}
      <div className="relative z-10 -mt-10 md:-mt-20 lg:-mt-10 px-4 sm:px-6 md:px-8">
        <User_Component userData={userData} />
      </div>

      {/* Repositories */}
      <div className="">
        <Repositories_Component repositories={repos} username={userData?.login} />
      </div>
    </div>
  );
}
