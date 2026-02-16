'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';

interface SearchComponentProps {
  onSearch: (username: string) => void;
}

const Search_Component = memo(function SearchComponent({ onSearch }: SearchComponentProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && value.trim() !== '') {
        onSearch(value.trim());
      }
    },
    [onSearch, value]
  );

  return (
    <div className="w-full relative text-text">
      <div className="relative">
        <Image
          src="/icons/Search.svg"
          width={24}
          height={24}
          alt=""
          loading="eager"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60 z-10"
        />
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="username"
          aria-label="Search GitHub username"
          className="w-full h-14 md:h-16 rounded-2xl bg-slate-700/40 backdrop-blur-md pl-14 pr-6 text-sm md:text-base placeholder:text-slate-400 text-white focus:outline-none border border-slate-600/50 focus:border-slate-500 transition-all duration-200 shadow-lg hover:bg-slate-700/50 focus:bg-slate-700/60"
        />
      </div>
    </div>
  );
});

Search_Component.displayName = 'SearchComponent';

export default Search_Component;
