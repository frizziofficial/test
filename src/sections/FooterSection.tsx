import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Send, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FooterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Newsletter entrance
      gsap.fromTo(
        newsletterRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer columns entrance
      const columns = footerRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        gsap.fromTo(
          columns,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    'Customer Care': ['Shipping', 'Returns', 'FAQ', 'Size Guide'],
    'Company': ['About', 'Careers', 'Sustainability'],
    'Social': ['Instagram', 'Pinterest', 'TikTok'],
    'Legal': ['Privacy', 'Terms'],
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#E8EEF3] py-16 lg:py-24"
      style={{ zIndex: 100 }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Newsletter */}
        <div
          ref={newsletterRef}
          className="liquid-glass-card p-8 lg:p-12 mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="font-heading font-black text-3xl lg:text-4xl text-[#111827] mb-3">
                GET 15% OFF
              </h2>
              <p className="text-[#6B7280]">
                Subscribe for drops, deals, and early access.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="glass-input w-full sm:w-72"
                required
              />
              <button
                type="submit"
                className="liquid-glass-button text-white font-accent font-bold tracking-wider px-8 py-3 rounded-full flex items-center justify-center gap-2"
              >
                {isSubscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div
          ref={footerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-column">
              <h3 className="font-accent font-bold text-sm tracking-wider text-[#111827] mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#6B7280] hover:text-[#7C3AED] transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-2xl tracking-wider text-[#111827]">
              BREEZE
            </span>
          </div>

          <p className="text-[#6B7280] text-sm text-center">
            © 2026 BREEZE QuickShopping. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-[#111827]" />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-[#111827]" />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-[#111827]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
