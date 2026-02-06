import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Starburst, Plus, Spiral, Donut } from '@/components/Doodles';
import { useCart } from '@/context/CartContext';
import type { Category } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ProductSectionProps {
  category: Category;
  index: number;
  showSaleBadge?: boolean;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  category,
  index,
  showSaleBadge = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);
  const { addToCart, setIsCartOpen } = useCart();

  const zIndex = 20 + index * 10;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      // Headline from left
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-60vw', rotation: -3, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards from right with stagger
      const cards = cardsRef.current?.querySelectorAll('.product-card-wrapper');
      if (cards) {
        cards.forEach((card, i) => {
          scrollTl.fromTo(
            card,
            { x: '60vw', scale: 0.96, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, ease: 'none' },
            i * 0.06
          );
        });
      }

      // Doodles entrance
      const doodles = doodlesRef.current?.querySelectorAll('.doodle, .doodle-slow');
      if (doodles) {
        doodles.forEach((doodle, i) => {
          scrollTl.fromTo(
            doodle,
            { scale: 0.7, rotation: -10, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, ease: 'none' },
            0.05 + i * 0.03
          );
        });
      }

      // SETTLE (30%-70%): Static - no animation needed

      // EXIT (70%-100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Cards exit
      if (cards) {
        cards.forEach((card, i) => {
          scrollTl.fromTo(
            card,
            { y: 0, opacity: 1 },
            { y: '-10vh', opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.02
          );
        });
      }

      // Doodles exit
      if (doodles) {
        doodles.forEach((doodle, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          scrollTl.fromTo(
            doodle,
            { x: 0, y: 0, opacity: 1 },
            { x: `${direction * 8}vw`, y: `${direction * 5}vh`, opacity: 0, ease: 'power2.in' },
            0.72 + i * 0.02
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (product: Category['products'][0]) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id={category.id}
      className="pinned-section section-bg"
      style={{ zIndex }}
    >
      {/* Doodles */}
      <div ref={doodlesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[34vw] top-[8vh]">
          <Starburst className="scale-75" />
        </div>
        <div className="absolute right-[4vw] top-[10vh]">
          <Plus className="scale-75" />
        </div>
        <div className="absolute left-[4vw] bottom-[10vh]">
          <Spiral className="scale-75" />
        </div>
        <div className="absolute right-[6vw] bottom-[12vh]">
          <Donut className="scale-75" />
        </div>
      </div>

      {/* Left Headline Card */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[16vh] w-[28vw] h-[68vh] liquid-glass-card flex flex-col justify-between p-8"
      >
        {showSaleBadge && (
          <span className="sale-badge self-start">UP TO 50% OFF</span>
        )}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-heading font-black text-[clamp(32px,3.2vw,52px)] leading-[1] tracking-[0.01em] text-[#111827] uppercase whitespace-pre-line">
            {category.headline}
          </h2>
          <p className="text-[#6B7280] mt-4 text-lg">{category.subheadline}</p>
        </div>
        <a
          href={`#${category.id}`}
          className="font-accent text-sm font-bold tracking-wider text-[#7C3AED] hover:text-[#111827] transition-colors flex items-center gap-2 group"
        >
          View all {category.name.toLowerCase()}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Product Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[38vw] top-[16vh] right-[6vw] h-[68vh] flex gap-[2vw]"
      >
        {category.products.map((product, i) => (
          <div
            key={product.id}
            className="product-card-wrapper flex-1 h-full"
            style={{ marginLeft: i === 0 ? 0 : undefined }}
          >
            <div className="product-card h-full flex flex-col">
              {/* Product Image */}
              <div className="flex-1 relative overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-[#7C3AED] text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-medium text-[#111827] text-sm truncate">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 bg-[#7C3AED]/10 hover:bg-[#7C3AED] text-[#7C3AED] hover:text-white rounded-full transition-all"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
