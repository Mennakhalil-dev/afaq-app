"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = locale === 'ar' ? 'en' : 'ar';
  const switchPath = pathname ? pathname.replace(`/${locale}`, `/${switchLocale}`) : `/${switchLocale}`;

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/properties`, label: t('properties') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/security`, label: t('security') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 py-5 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
               <img src="/images/logo.png" alt="Afaq Logo" className="h-12 w-auto cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 rtl:space-x-reverse items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-bold transition-all duration-300 relative ${
                    isActive ? 'text-gold' : 'text-dark-100 hover:text-gold'
                  }`}
                >
                  {link.label}
                  {/* Underline indicator */}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}></span>
                </Link>
              );
            })}
            
            {/* Language Switcher */}
            <a 
              href={switchPath} 
              className="text-gold font-bold px-4 py-1 border-2 border-gold rounded hover:bg-gold hover:text-white transition-all text-sm"
            >
              {locale === 'ar' ? 'English' : 'العربية'}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-100 hover:text-gold transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-100 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 text-base font-bold rounded-md transition-colors relative border-l-4 rtl:border-l-0 rtl:border-r-4 ${
                    isActive ? 'text-gold border-gold bg-gold/5' : 'text-dark-100 border-transparent hover:text-gold hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 px-3">
              <a 
                href={switchPath} 
                className="block w-full text-center text-gold font-bold px-4 py-2 border-2 border-gold rounded hover:bg-gold hover:text-white transition-all text-sm"
              >
                {locale === 'ar' ? 'English' : 'العربية'}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
