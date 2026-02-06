import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { DoodleSet } from '@/components/Doodles';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image card entrance
      loadTl.fromTo(
        imageRef.current,
        { x: '-60vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 }
      );

      // Headline lines entrance
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        loadTl.fromTo(
          headlineLines,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          '-=0.5'
        );
      }

      // Subheadline entrance
      loadTl.fromTo(
        subheadlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTA entrance
      loadTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Microcopy entrance
      loadTl.fromTo(
        microcopyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Doodles entrance
      const doodles = doodlesRef.current?.querySelectorAll('.doodle, .doodle-slow');
      if (doodles) {
        loadTl.fromTo(
          doodles,
          { scale: 0.6, rotation: -12, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' },
          '-=0.5'
        );
      }

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([imageRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, microcopyRef.current], {
              opacity: 1, x: 0, y: 0, rotation: 0,
            });
            if (doodles) {
              gsap.set(doodles, { opacity: 1, x: 0, y: 0, rotation: 0 });
            }
          },
        },
      });

      // ENTRANCE (0%-30%): Hold at settle state
      // SETTLE (30%-70%): Static
      // EXIT (70%-100%): Elements exit

      // Image exit
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '-18vw', y: '10vh', rotation: -2, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exit
      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Microcopy exit
      scrollTl.fromTo(
        microcopyRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.76
      );

      // Doodles exit
      if (doodles) {
        doodles.forEach((doodle, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          scrollTl.fromTo(
            doodle,
            { x: 0, y: 0, rotation: 0, opacity: 1 },
            { x: `${direction * 10}vw`, y: `${direction * 5}vh`, rotation: direction * 15, opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.02
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section section-bg z-10"
    >
      {/* Doodles */}
      <div ref={doodlesRef} className="absolute inset-0 pointer-events-none">
        <DoodleSet variant="hero" />
      </div>

      {/* Left Image Card */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] liquid-glass-card overflow-hidden"
      >
        <img
          src="/hero_model.jpg"
          alt="Fashion Model"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="absolute left-[56vw] top-[26vh] w-[38vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-6">
          <h1 className="font-heading font-black text-[clamp(36px,4vw,64px)] leading-[0.95] tracking-[0.02em] text-[#111827] uppercase">
            <span className="headline-line block">Fashion That</span>
            <span className="headline-line block">Moves With You</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-[#6B7280] text-lg leading-relaxed mb-8 max-w-md"
        >
          New drops, everyday prices. Shop the latest before they're gone.
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="liquid-glass-button text-white font-accent font-bold tracking-[0.1em] px-10 py-4 rounded-full flex items-center gap-3 group"
        >
          SHOP NEW ARRIVALS
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Microcopy */}
        <p
          ref={microcopyRef}
          className="text-[#6B7280] text-sm mt-6"
        >
          Free shipping over $75. Easy returns.
        </p>
      </div>
    </section>
  );
};
