import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navigation: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WOMEN', href: '#new-arrivals' },
    { label: 'MEN', href: '#trending' },
    { label: 'ACCESSORIES', href: '#accessories' },
    { label: 'SALE', href: '#sale' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'nav-glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-black text-xl tracking-wider text-[#111827] hover:text-[#7C3AED] transition-colors"
          >
            BREEZE
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-accent text-xs font-bold tracking-[0.14em] text-[#111827] hover:text-[#7C3AED] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7C3AED] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#111827]" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-white/50 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#111827]" />
              {totalItems > 0 && (
                <span className="cart-badge absolute -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#111827]" />
              ) : (
                <Menu className="w-5 h-5 text-[#111827]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 nav-glass py-6 px-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-accent text-sm font-bold tracking-[0.14em] text-[#111827] hover:text-[#7C3AED] transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
