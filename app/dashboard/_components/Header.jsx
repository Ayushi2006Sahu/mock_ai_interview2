"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';
function Header() {
    const router = useRouter();
    const path = usePathname();
    useEffect(()=>{
        console.log(path)
    },[])
    return (
        <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-8 py-4 shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/dashboard')}>
            <div className="p-1 rounded-xl transition-transform duration-300">
              <Image src="/logo.svg" width={35} height={35} alt="Logo" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight uppercase">
              MOCK_AI_INTERVIEW
            </span>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex gap-10">
              {['Dashboard', 'Questions', 'Upgrade', 'How it Works?'].map((item) => {
                const link = `/dashboard${item === 'Dashboard' ? '' : '/' + item.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`;
                const isActive = path === link;
                return (
                  <li
                    key={item}
                    onClick={() => router.push(link)}
                    className={`relative text-sm font-semibold cursor-pointer transition-all duration-300 hover:text-primary
                      ${isActive ? 'text-primary' : 'text-gray-500'}
                    `}
                  >
                    {item.toUpperCase()}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in slide-in-from-left-2 duration-500" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
      );
}

export default Header