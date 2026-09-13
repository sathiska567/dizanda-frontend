import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParallaxImage from './ParallaxImage';

const EVENTS = [
  {
    id: 1,
    title: 'Royal Wedding Reception',
    person: 'Featured at a private celebrity wedding, Colombo',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Red Carpet Gala',
    person: 'Centerpiece dessert, Film Awards Night',
    img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Milestone Birthday',
    person: 'Custom sculpture cake for a celebrity milestone birthday',
    img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Celebrity Baby Shower',
    person: 'Bespoke dessert table, private residence',
    img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Private Yacht Celebration',
    person: 'Anniversary dessert display, exclusive charter',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Fashion Week After-Party',
    person: 'Signature cake bar for an industry celebration',
    img: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Studio Album Launch',
    person: 'Custom-designed cake for an exclusive music event',
    img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Charity Gala Dinner',
    person: 'Dessert centerpiece for a high-profile fundraiser',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop'
  }
];

// Rendered twice back-to-back so the auto-scroll can loop seamlessly —
// once scrollLeft passes the first copy, it silently wraps to 0.
const LOOP_EVENTS = [...EVENTS, ...EVENTS];

export default function EventsSection() {
  const scrollRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const paused = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollByAmount = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const amount = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const handlePointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    paused.current = true;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
    setIsDragging(false);
  };

  // Dragging shouldn't trigger the card's click-through link.
  const handleClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Attached natively (not passive) so vertical wheel/trackpad input can
  // drive this horizontal strip — React's synthetic wheel listener is
  // passive by default and can't preventDefault the page scroll.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        paused.current = true;
        clearTimeout(resumeTimeout.current);
        resumeTimeout.current = setTimeout(() => {
          paused.current = false;
        }, 1200);
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Continuous auto-scroll that visually drifts left-to-right (cards travel
  // from the left edge toward the right); pauses on drag/wheel and resumes
  // shortly after. Starts mid-way through the doubled list so it always has
  // room to decrement before wrapping back around.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame;
    const SPEED = 1.1; // px per frame (~66px/s)

    el.scrollLeft = el.scrollWidth / 2;

    const step = () => {
      if (!paused.current) {
        const halfWidth = el.scrollWidth / 2;
        el.scrollLeft -= SPEED;
        if (el.scrollLeft <= 0) {
          el.scrollLeft += halfWidth;
        }
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const resumeTimeout = useRef(null);

  const pauseAutoScroll = () => {
    paused.current = true;
  };

  const resumeAutoScroll = () => {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      paused.current = false;
    }, 1200);
  };

  return (
    <section className="py-24 px-4 sm:px-6 md:px-12 bg-luxury-sand overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-center md:text-left max-w-2xl">
            <p className="text-sm uppercase tracking-extreme text-luxury-muted mb-3">As Seen At</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal mb-4">Celebrity Events</h2>
            <p className="text-sm text-luxury-muted font-light leading-relaxed">
              Trusted by high-profile hosts for their most photographed occasions. Swipe to explore.
            </p>
          </div>

          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => {
                pauseAutoScroll();
                scrollByAmount(-1);
                resumeAutoScroll();
              }}
              aria-label="Scroll left"
              className="w-10 h-10 flex items-center justify-center border border-luxury-charcoal/30 hover:bg-luxury-charcoal hover:text-luxury-cream transition-all"
            >
              ←
            </button>
            <button
              onClick={() => {
                pauseAutoScroll();
                scrollByAmount(1);
                resumeAutoScroll();
              }}
              aria-label="Scroll right"
              className="w-10 h-10 flex items-center justify-center border border-luxury-charcoal/30 hover:bg-luxury-charcoal hover:text-luxury-cream transition-all"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={() => {
            endDrag();
            resumeAutoScroll();
          }}
          onMouseLeave={() => {
            endDrag();
            resumeAutoScroll();
          }}
          onClickCapture={handleClickCapture}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {LOOP_EVENTS.map((event, idx) => (
            <motion.div
              key={`${event.id}-${idx}`}
              data-card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group cursor-pointer flex-shrink-0 w-[70%] sm:w-[42%] md:w-[30%] lg:w-[23%]"
            >
              <ParallaxImage
                src={event.img}
                alt={event.title}
                className="bg-luxury-cream aspect-[3/4] mb-4"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </ParallaxImage>
              <h3 className="text-base tracking-wide text-luxury-charcoal mb-1">{event.title}</h3>
              <p className="text-sm text-luxury-muted leading-relaxed font-light">{event.person}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
