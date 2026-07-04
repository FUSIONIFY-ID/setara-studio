import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Calendar,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   DATA TYPES & STRUCTS
============================================ */
interface PortfolioItem {
  id: number;
  src: string;
  cat: "portrait" | "wedding" | "fashion" | "family" | "product" | "commercial";
  title: string;
  span: "tall" | "short" | "normal";
}

// Testimonial interface removed

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=75&auto=format",
    cat: "portrait",
    title: "Quiet Light",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=75&auto=format",
    cat: "wedding",
    title: "Amélie & Thomas",
    span: "short",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=75&auto=format",
    cat: "fashion",
    title: "Maison Velours",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=75&auto=format",
    cat: "family",
    title: "The Beaumonts",
    span: "normal",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=75&auto=format",
    cat: "product",
    title: "Atelier Noir",
    span: "short",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=75&auto=format",
    cat: "commercial",
    title: "Velvet Campaign",
    span: "tall",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=75&auto=format",
    cat: "fashion",
    title: "Silhouette",
    span: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=500&q=75&auto=format",
    cat: "portrait",
    title: "Graduate",
    span: "short",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=75&auto=format",
    cat: "wedding",
    title: "Golden Hour Vows",
    span: "tall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=75&auto=format",
    cat: "portrait",
    title: "The Architect",
    span: "normal",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=75&auto=format",
    cat: "product",
    title: "Sculpted",
    span: "normal",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=75&auto=format",
    cat: "fashion",
    title: "Couture Editorial",
    span: "short",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=75&auto=format",
    cat: "wedding",
    title: "First Look",
    span: "normal",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=75&auto=format",
    cat: "portrait",
    title: "Reflections",
    span: "tall",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=500&q=75&auto=format",
    cat: "commercial",
    title: "Pulse Campaign",
    span: "short",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&q=75&auto=format",
    cat: "product",
    title: "Timepiece",
    span: "normal",
  },
];

const MOTION_ITEMS = [
  {
    id: "m1",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=75&auto=format",
    cat: "Fashion",
    title: "Maison Velours",
  },
  {
    id: "m2",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=75&auto=format",
    cat: "Wedding",
    title: "Amélie & Thomas",
  },
  {
    id: "m3",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=75&auto=format",
    cat: "Portrait",
    title: "Quiet Light",
  },
  {
    id: "m4",
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=75&auto=format",
    cat: "Product",
    title: "Atelier Noir",
  },
  {
    id: "m5",
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=75&auto=format",
    cat: "Portrait",
    title: "The Architect",
  },
];

// TESTIMONIALS data removed

// HERO SLIDES data


const NAV_LINKS = [
  { label: "Studio", id: "#home" },
  { label: "Portfolio", id: "#portfolio" },
  { label: "Narrative", id: "#about" },
  { label: "Disciplines", id: "#services" },
  { label: "Collections", id: "#pricing" },
  { label: "Contact", id: "#contact" },
];

function App() {
  /* ============================================
     REACT STATES & REFS
  ============================================ */
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isLoaderFinished, setLoaderFinished] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isLoaderFinished) return;

    const sections = ["home", "portfolio", "about", "services", "pricing", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoaderFinished]);
  const [activeFilter, setActiveFilter] = useState<
    | "all"
    | "portrait"
    | "wedding"
    | "fashion"
    | "family"
    | "product"
    | "commercial"
  >("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom Lightbox State
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxImg, setLightboxImg] = useState("");
  const [lightboxList, setLightboxList] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Custom Select Dropdown State
  const [selectedService, setSelectedService] = useState("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarActiveDate, setCalendarActiveDate] = useState(new Date());

  // Stats Counters
  const statsRef = useRef<HTMLDivElement>(null);
  const statsStarted = useRef(false);
  const statYearsRef = useRef<HTMLDivElement>(null);
  const statClientsRef = useRef<HTMLDivElement>(null);
  const statAwardsRef = useRef<HTMLDivElement>(null);
  const statRateRef = useRef<HTMLDivElement>(null);

  // Mouse Positions for Cursor and Service Glow — use refs to avoid re-renders
  const mousePosRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Testimonials Slider State (Unused)
  const hScrollRef = useRef<HTMLDivElement>(null);
  const motionSectionRef = useRef<HTMLDivElement>(null);

  // Parallax — direct DOM updates via refs
  const heroBgRef = useRef<HTMLDivElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  /* ============================================
     GSAP & ANIMATIONS
  ============================================ */
  useGSAP(
    () => {
      if (!isLoaderFinished) return;

      // Enable reveal animations now that JS is ready
      document.documentElement.classList.add("reveal-ready");

      // Observe all reveal variants
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );

      document
        .querySelectorAll(".reveal, .reveal-mask, .reveal-left, .reveal-scale, .reveal-blur")
        .forEach((el) => observer.observe(el));

      // Stagger hero text with blur-to-sharp cinematic entrance
      gsap.fromTo(
        "#heroTitle .reveal-mask span",
        { y: "110%", filter: "blur(6px)" },
        {
          y: "0%",
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          delay: 0.2,
          stagger: 0.2,
        },
      );
      gsap.fromTo(
        ["#heroSub", "#heroCtas", "#heroScroll"],
        { opacity: 0, y: 24, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.8,
          stagger: 0.15,
        },
      );

      // Horizontal Pinned Scroll with GSAP ScrollTrigger
      if (hScrollRef.current && motionSectionRef.current) {
        const pinTrigger = motionSectionRef.current;
        const scrollElement = hScrollRef.current;

        const totalScrollWidth = scrollElement.scrollWidth;
        const viewportWidth = window.innerWidth;
        const amountToScroll = totalScrollWidth - viewportWidth;

        if (amountToScroll > 0) {
          gsap.to(scrollElement, {
            x: -amountToScroll - 96, // Keep offset padding
            ease: "none",
            scrollTrigger: {
              trigger: pinTrigger,
              pin: true,
              scrub: 1.2,
              start: "top top",
              end: () => `+=${totalScrollWidth}`,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      return () => observer.disconnect();
    },
    { dependencies: [isLoaderFinished] },
  );

  /* ============================================
     SMOOTH SCROLLING (Lenis) & PARALLAX — direct DOM updates
  ============================================ */
  useEffect(() => {
    // Lenis instance
    let lenis: Lenis | null = null;

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Scroll listener — direct DOM manipulation (no React state)
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Header scroll state — toggle class directly
        const header = document.getElementById("mainHeader");
        if (header) {
          if (scrollY > 50) {
            header.classList.add("header-scrolled");
            header.classList.remove("header-top");
          } else {
            header.classList.remove("header-scrolled");
            header.classList.add("header-top");
          }
        }

        // Hero image parallax — direct transform
        if (scrollY < window.innerHeight && heroBgRef.current) {
          const offset = scrollY * 0.35;
          heroBgRef.current.style.transform = `translateY(${offset}px) scale(${1.1 + offset * 0.0003})`;
        }

        // CTA Background parallax — direct transform
        if (ctaSectionRef.current && ctaBgRef.current) {
          const rect = ctaSectionRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.15;
            ctaBgRef.current.style.transform = `translateY(${offset}px) scale(1.1)`;
          }
        }

        // Stats counters trigger when in view
        if (statsRef.current && !statsStarted.current) {
          const rect = statsRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) {
            statsStarted.current = true;
            animateStats();
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ============================================
     ANIMATE STATS COUNTER
  ============================================ */
  const animateStats = () => {
    const duration = 2000;
    const start = performance.now();
    const targets = { years: 8, clients: 5000, awards: 120, rate: 98 };

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic Ease-Out

      const currentYears = Math.floor(targets.years * eased);
      const currentClients = Math.floor(targets.clients * eased);
      const currentAwards = Math.floor(targets.awards * eased);
      const currentRate = Math.floor(targets.rate * eased);

      if (statYearsRef.current) {
        statYearsRef.current.textContent = String(currentYears);
      }
      if (statClientsRef.current) {
        statClientsRef.current.textContent = currentClients.toLocaleString();
      }
      if (statAwardsRef.current) {
        statAwardsRef.current.textContent = String(currentAwards);
      }
      if (statRateRef.current) {
        statRateRef.current.textContent = `${currentRate}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  /* ============================================
     CINEMATIC LOADER — skip delay, show content immediately
  ============================================ */
  useEffect(() => {
    setLoaderProgress(100);
    setLoaderFinished(true);
  }, []);

  /* ============================================
     CUSTOM CURSOR — direct DOM updates (no React re-renders)
  ============================================ */
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      // Update dot position directly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerpRing = () => {
      const prev = ringPosRef.current;
      const target = mousePosRef.current;
      const dx = target.x - prev.x;
      const dy = target.y - prev.y;
      prev.x += dx * 0.18;
      prev.y += dy * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${prev.x}px`;
        cursorRingRef.current.style.top = `${prev.y}px`;
      }
      animationFrameId = requestAnimationFrame(lerpRing);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(lerpRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Global hover listener to scale cursor ring (via class toggle on root)
  useEffect(() => {
    const addHover = () => rootRef.current?.classList.add("cursor-hover");
    const removeHover = () => rootRef.current?.classList.remove("cursor-hover");

    const elements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"], .portfolio-item, .service-card',
    );
    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [isLoaderFinished, activeFilter]);

  /* ============================================
     PORTFOLIO FILTER & LIGHTBOX HELPERS
  ============================================ */
  const handleFilterChange = (filter: typeof activeFilter) => {
    setActiveFilter(filter);
  };

  const handleOpenLightbox = (src: string) => {
    // Generate active image pool for navigation
    const pool = PORTFOLIO_ITEMS.filter(
      (item) => activeFilter === "all" || item.cat === activeFilter,
    ).map((item) => item.src);

    // Add motion items to the pool as well if requested
    const motionSrcs = MOTION_ITEMS.map((i) => i.src);
    const fullPool = [...pool, ...motionSrcs];

    const index = fullPool.indexOf(src);
    setLightboxList(fullPool);
    setLightboxIndex(index !== -1 ? index : 0);
    setLightboxImg(src);
    setLightboxActive(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseLightbox = () => {
    setLightboxActive(false);
    document.body.style.overflow = "";
  };

  const handleNextLightbox = () => {
    const nextIdx = (lightboxIndex + 1) % lightboxList.length;
    setLightboxIndex(nextIdx);
    setLightboxImg(lightboxList[nextIdx]);
  };

  const handlePrevLightbox = () => {
    const prevIdx =
      (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    setLightboxIndex(prevIdx);
    setLightboxImg(lightboxList[prevIdx]);
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxActive) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxActive, lightboxIndex, lightboxList]);

  /* ============================================
     MAGNETIC BUTTON SPRING EFFECT
  ============================================ */
  const handleMagneticMove = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transition = "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  };

  const handleMagneticLeave = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const el = e.currentTarget;
    el.style.transition = "transform 300ms cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform = "translate(0, 0)";
  };

  // Testimonials Slider Navigation (Deprecated in favor of Editorial Layout)

  /* ============================================
     FORMS & TOAST ACTIONS
  ============================================ */
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const startDayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    
    for (let i = adjustedStartDay - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 12 : month;
      const prevYear = month === 0 ? year - 1 : year;
      days.push({
        dateStr: `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(prevMonthLastDate - i).padStart(2, "0")}`,
        dayNum: prevMonthLastDate - i,
        isCurrentMonth: false,
      });
    }

    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
        dayNum: i,
        isCurrentMonth: true,
      });
    }

    const totalCells = 42;
    const nextMonthDaysNeeded = totalCells - days.length;
    for (let i = 1; i <= nextMonthDaysNeeded; i++) {
      const nextMonth = month === 11 ? 1 : month + 2;
      const nextYear = month === 11 ? year + 1 : year;
      days.push({
        dateStr: `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
        dayNum: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    triggerToast(
      `Thank you, ${name.split(" ")[0]}. Our atelier concierge will contact you shortly.`,
    );
    e.currentTarget.reset();
  };

  // handleNewsletterSubmit removed

  /* ============================================
     SMOOTH NAVIGATE ANCHORS
  ============================================ */
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetId, {
        offset: -20,
        duration: 1.5,
      });
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({
          top: top,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div ref={rootRef}>
      {/* 1. Cinematic Loading Screen */}
      <div
        className={`loader fixed inset-0 z-[var(--z-loader)] bg-bg flex items-center justify-center flex-col transition-[opacity,transform] duration-500 ease-out ${
          isLoaderFinished
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="font-display text-2xl md:text-3xl text-text/70 tracking-widest uppercase">
            Setara Studio
          </div>
          <div className="w-48 md:w-64 h-px bg-white/10 overflow-hidden">
            <div
              className="loader-bar h-full bg-accent transition-[width] duration-100"
              style={{ width: `${loaderProgress}vw` }}
            ></div>
          </div>
          <div className="font-sans text-xs tracking-[0.4em] text-text/40 uppercase">
            {String(loaderProgress).padStart(3, "0")}
          </div>
        </div>
      </div>

      {/* 2. Brand Ambient Layers */}
      <div className="noise-overlay"></div>
      <div className="vignette"></div>

      {/* 3. Custom Interlocking Cursor */}
      <div
        ref={cursorRingRef}
        className="cursor-ring hidden md:block"
      ></div>
      <div
        ref={cursorDotRef}
        className="cursor-dot hidden md:block"
      ></div>

      {/* 4. Interactive Feedback Toast */}
      <div
        className={`toast fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-toast)] transition-all duration-500 pointer-events-none ${
          toastMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="glass px-6 py-4 rounded-full text-sm flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent"></span>
          <span>{toastMessage}</span>
        </div>
      </div>

      {/* 5. Custom Full-Featured Lightbox */}
      <div
        className={`lightbox fixed inset-0 z-[var(--z-modal-backdrop)] bg-bg/95 backdrop-blur-xl transition-all items-center justify-center ${
          lightboxActive ? "active" : ""
        }`}
      >
        <button
          onClick={handleCloseLightbox}
          className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-text hover:text-accent transition-colors"
          aria-label="Close preview"
        >
          <X size={20} />
        </button>
        <button
          onClick={handlePrevLightbox}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-text hover:text-accent transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <img
          src={lightboxImg}
          alt="Immersive studio view"
          className="max-w-[85vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
        />
        <button
          onClick={handleNextLightbox}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-text hover:text-accent transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 6. Navigation Header */}
      <nav id="mainHeader" className="bg-surface/60 dark:bg-surface/60 backdrop-blur-xl fixed w-full top-0 border-b border-white/10 dark:border-white/10 z-50 transition-all duration-500 ease-in-out header-top">
        <div className="flex justify-between items-center w-full px-6 md:px-20 py-6 max-w-[1440px] mx-auto">
          {/* Brand Logo */}
          <a
            className="text-headline-md font-headline-md tracking-widest text-on-surface dark:text-on-surface uppercase hover:opacity-70 transition-all duration-700 ease-in-out z-10 relative"
            href="#home"
            onClick={(e) => handleAnchorClick(e, "#home")}
          >
            SETARA STUDIO
          </a>
          
          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.id}
                  onClick={(e) => handleAnchorClick(e, link.id)}
                  className={
                    isActive
                      ? "text-primary font-bold after:content-[''] after:block after:w-1 after:h-1 after:bg-primary after:rounded-full after:mx-auto after:mt-1 text-label-caps font-label-caps uppercase hover:opacity-70 transition-all duration-700 ease-in-out scale-95"
                      : "text-on-surface-variant hover:text-on-surface transition-colors duration-500 text-label-caps font-label-caps uppercase hover:opacity-70 ease-in-out"
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Trailing Action */}
          <div className="flex items-center gap-3">
            <a
              className="hidden lg:inline-flex magnetic-btn bg-primary-container text-[#080808] px-6 py-3 text-label-caps font-label-caps uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors duration-300"
              href="#booking"
              onClick={(e) => handleAnchorClick(e, "#booking")}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              BOOK SESSION
            </a>
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-on-surface p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 transition-all duration-500 ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-5"
          }`}
          style={{ visibility: mobileMenuOpen ? "visible" : "hidden" }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-on-surface hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id.slice(1);
            return (
              <a
                key={link.label}
                href={link.id}
                onClick={(e) => handleAnchorClick(e, link.id)}
                className={`text-headline-md font-headline-md transition-colors duration-300 uppercase tracking-widest ${
                  isActive ? "text-primary font-bold" : "text-on-surface hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#booking"
            onClick={(e) => handleAnchorClick(e, "#booking")}
            className="mt-4 bg-primary-container text-[#080808] px-10 py-4 text-label-caps font-label-caps tracking-widest"
          >
            BOOK SESSION
          </a>
        </div>
      </nav>

      {/* 7. HERO SECTION — Asymmetric editorial layout */}
      <main id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Imagery (Parallax Layer 1) */}
        <div className="absolute inset-0 w-full h-full z-0 parallax-layer" ref={heroBgRef}>
          <img
            src={`${import.meta.env.BASE_URL}hero_bg.png`}
            alt="Studio loft background"
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10"></div>
        </div>

        {/* Hero Content Grid (Asymmetrical) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-4 md:grid-cols-12 gap-8 h-full items-center">
          {/* Left Typography Block */}
          <div className="col-span-4 md:col-span-6 flex flex-col justify-center parallax-layer">
            <h1 className="text-display-lg-mobile md:text-display-xl font-display-xl text-on-surface uppercase leading-none mix-blend-difference mb-8">
              <span className="block overflow-hidden"><span className="block transform translate-y-full opacity-0 animate-reveal" style={{ animationDelay: "0.05s" }}>Visual</span></span>
              <span className="block overflow-hidden"><span className="block transform translate-y-full opacity-0 animate-reveal text-primary" style={{ animationDelay: "0.15s" }}>Poetry</span></span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md mt-4 animate-fade-in opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              A specialized studio crafting high-end editorial narratives. We blend architectural precision with raw human emotion.
            </p>
            
            <div className="mt-12 animate-fade-in opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              <a
                href="#portfolio"
                onClick={(e) => handleAnchorClick(e, "#portfolio")}
                className="inline-flex items-center space-x-4 group"
              >
                <span className="w-12 h-[1px] bg-outline-variant group-hover:w-24 group-hover:bg-primary transition-all duration-500"></span>
                <span className="text-label-caps font-label-caps text-on-surface uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
                  Explore Selected Works
                </span>
              </a>
            </div>
          </div>

          {/* Right Image Offset (Parallax Layer 2) */}
          <div className="hidden md:block md:col-span-6 md:col-start-7 relative parallax-layer mt-16 flex items-center justify-center">
            <div className="relative w-full aspect-[3/2] flex items-center justify-center">
              <img
                className="object-contain w-full h-full filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] transform scale-120 hover:scale-110 transition-transform duration-1000 ease-out"
                src={`${import.meta.env.BASE_URL}hero_detail.png`}
                alt="Detail shot"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-fade-in opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <span className="text-label-caps font-label-caps text-outline-variant uppercase mb-4 rotate-90 tracking-widest">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-outline-variant to-transparent"></div>
        </div>
      </main>

      {/* 8. INFINITE MARQUEE STRIP */}
      <section className="relative py-8 border-y border-white/5 overflow-hidden bg-secondary">
        <div className="flex whitespace-nowrap marquee-track">
          <div className="flex items-center gap-12 px-6">
            <span className="font-cormorant italic text-3xl text-text/80">
              Portrait
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Wedding
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Fashion
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Commercial
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Family
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Graduation
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Editorial
            </span>
            <span className="text-accent">✦</span>
          </div>
          <div className="flex items-center gap-12 px-6">
            <span className="font-cormorant italic text-3xl text-text/80">
              Portrait
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Wedding
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Fashion
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Commercial
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Family
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Graduation
            </span>
            <span className="text-accent">✦</span>
            <span className="font-cormorant italic text-3xl text-text/80">
              Editorial
            </span>
            <span className="text-accent">✦</span>
          </div>
        </div>
      </section>

      {/* 9. PORTFOLIO WITH DYNAMIC MASONS */}
      <section
        id="portfolio"
        className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <h2 className="heading-xl text-6xl md:text-8xl reveal-blur">
              The <span className="heading-italic text-accent">Portfolio</span>
            </h2>
          </div>
          <p className="max-w-sm text-text/55 font-light leading-relaxed reveal">
            A curated selection of recent commissions — each frame composed with
            intention, lit with patience, and finished by hand.
          </p>
        </div>

        {/* Dynamic Category Filters */}
        <div
          className="flex flex-wrap gap-8 mb-12 text-sm tracking-[0.2em] uppercase text-text/60 reveal"
          id="filters"
        >
          {(
            [
              "all",
              "portrait",
              "wedding",
              "fashion",
              "family",
              "product",
              "commercial",
            ] as const
          ).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`filter-pill uppercase tracking-widest ${activeFilter === filter ? "active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Interactive Responsive Masonry-like Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          id="portfolioGrid"
        >
          {PORTFOLIO_ITEMS.filter(
            (item) => activeFilter === "all" || item.cat === activeFilter,
          ).map((item) => {
            const heightClass =
              item.span === "tall"
                ? "h-[640px]"
                : item.span === "short"
                  ? "h-[300px]"
                  : "h-[440px]";
            const rowSpanClass = item.span === "tall" ? "row-span-2" : "";

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item.src)}
                className={`portfolio-item cursor-none ${rowSpanClass} ${heightClass} reveal in-view`}
              >
                <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                <div className="glare"></div>
                <div className="meta">
                  <span className="text-xs tracking-[0.3em] uppercase text-accent mb-2">
                    {item.cat}
                  </span>
                  <span className="font-cormorant italic text-2xl">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center reveal">
          <a
            href="#booking"
            onClick={(e) => handleAnchorClick(e, "#booking")}
            className="underline-link text-sm tracking-[0.25em] uppercase text-text/70 hover:text-accent"
          >
            Request Full Lookbook →
          </a>
        </div>
      </section>

      {/* 10. DRAGGABLE HORIZONTAL SHOWCASE STRIP */}
      <section
        ref={motionSectionRef}
        className="relative py-24 bg-secondary flex flex-col justify-center min-h-screen overflow-hidden"
      >
        <div className="px-6 md:px-12 mb-12 max-w-[1600px] mx-auto w-full">
          <div className="flex items-end justify-between gap-8">
            <h3 className="heading-xl text-4xl md:text-6xl reveal">
              In <span className="heading-italic text-accent">Motion</span>
            </h3>
            <p className="text-text/50 text-sm max-w-xs hidden md:block">
              Scroll down to explore the cinematic reel.
            </p>
          </div>
        </div>

        <div
          ref={hScrollRef}
          className="flex gap-6 px-6 md:px-12 pb-6 select-none"
          style={{ willChange: "transform", width: "max-content" }}
        >
          {MOTION_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item.src)}
              className="flex-shrink-0 w-[80vw] md:w-[460px] h-[600px] portfolio-item cursor-none"
            >
              <img
                src={item.src}
                alt={item.title}
                className="pointer-events-none"
                loading="lazy"
                decoding="async"
              />
              <div className="glare"></div>
              <div className="meta">
                <span className="text-xs tracking-[0.3em] uppercase text-accent mb-2">
                  {item.cat}
                </span>
                <span className="font-cormorant italic text-2xl">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. ABOUT — Visual Poetry in Every Frame */}
      <section
        id="about"
        className="relative py-40 md:py-[160px] px-6 md:px-20 max-w-[1440px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content — 5 columns */}
          <div className="md:col-span-5 md:col-start-1 z-10 reveal">
            <p className="label-caps text-accent mb-8">About The Studio</p>
            <h2
              className="font-display text-text mb-8 leading-tight"
              style={{ fontSize: "clamp(2.625rem, 6vw, 5rem)" }}
            >
              Visual Poetry{" "}
              <br />
              <span className="italic text-on-surface-variant">in Every Frame.</span>
            </h2>
            <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-md mb-12" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.01em" }}>
              We don't just capture images; we architect moments. Rooted in editorial
              minimalism, SETARA STUDIO seeks the profound in the subtle, elevating
              wedding, portraiture, and conceptual narrative into timeless art pieces.
            </p>
            <a
              href="#portfolio"
              onClick={(e) => handleAnchorClick(e, "#portfolio")}
              className="inline-flex items-center gap-2 label-caps text-accent border-b border-accent/30 pb-1 hover:border-accent transition-colors duration-300"
            >
              Read Our Manifesto
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Asymmetrical Imagery — 7 columns */}
          <div className="md:col-span-7 relative mt-16 md:mt-0 reveal" style={{ transitionDelay: "200ms" }}>
            {/* Main Vertical Portrait */}
            <div className="w-full md:w-[80%] ml-auto overflow-hidden group relative">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format"
                alt="Editorial portrait in cinematic studio lighting"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Overlapping Detail Shot */}
            <div className="absolute -bottom-12 -left-4 md:-left-12 w-1/2 md:w-[45%] border-4 border-[#080808] overflow-hidden z-20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80&auto=format"
                alt="Camera lens detail reflecting warm studio light"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Stats Counter Grid — below the about content */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 mt-20 border-t border-white/8"
        >
          <div className="reveal">
            <div ref={statYearsRef} className="font-display text-4xl md:text-5xl text-text">
              0
            </div>
            <div className="label-caps text-on-surface-variant mt-3">
              Years Experience
            </div>
          </div>
          <div className="reveal">
            <div ref={statClientsRef} className="font-display text-4xl md:text-5xl text-text">
              0
            </div>
            <div className="label-caps text-on-surface-variant mt-3">
              Happy Clients
            </div>
          </div>
          <div className="reveal">
            <div ref={statAwardsRef} className="font-display text-4xl md:text-5xl text-text">
              0
            </div>
            <div className="label-caps text-on-surface-variant mt-3">
              Awards Won
            </div>
          </div>
          <div className="reveal">
            <div ref={statRateRef} className="font-display text-4xl md:text-5xl text-text">
              0%
            </div>
            <div className="label-caps text-on-surface-variant mt-3">
              Return Rate
            </div>
          </div>
        </div>
      </section>

      {/* Thin separator */}
      <div className="w-full h-px bg-white/5 max-w-[1440px] mx-auto my-24"></div>

      {/* 12. SERVICES — Editorial Disciplines */}
      <section
        id="services"
        className="relative py-40 md:py-[160px] max-w-[1440px] mx-auto"
      >
        {/* Section Header */}
        <div className="px-6 md:px-20 mb-20 flex justify-between items-end border-b border-white/10 pb-8">
          <h2 className="font-display text-text" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "120%" }}>
            Disciplines
          </h2>
        </div>

        {/* Editorial alternating blocks */}
        <div className="flex flex-col gap-20 md:gap-24 px-6 md:px-20">

          {/* Discipline 01 — Text Left, Image Right */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal md:sticky md:top-[120px] bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_-25px_60px_rgba(0,0,0,0.8)]">
            <div className="md:col-span-5 order-2 md:order-1 relative z-10">
              <span className="font-display text-accent leading-none block mb-6 opacity-50" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>01</span>
              <h3 className="font-display text-text text-2xl md:text-[32px] mb-6" style={{ lineHeight: "130%" }}>
                Editorial Fashion
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
                Avant-garde compositions and meticulous styling. We produce high-impact visual narratives designed for publications, campaigns, and lookbooks.
              </p>
              <a
                href="#portfolio"
                onClick={(e) => handleAnchorClick(e, "#portfolio")}
                className="label-caps text-accent border-b border-accent pb-1 hover:text-text hover:border-text transition-colors duration-300"
              >
                Explore Portfolio
              </a>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 overflow-hidden w-full h-[300px] md:h-[450px] group rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80&auto=format"
                alt="High-fashion editorial photograph with dramatic studio lighting"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>

          {/* Discipline 02 — Image Left, Text Right */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal md:sticky md:top-[150px] bg-[#101010] border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_-25px_60px_rgba(0,0,0,0.8)]">
            <div className="md:col-span-7 overflow-hidden w-full h-[300px] md:h-[450px] group rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80&auto=format"
                alt="Cinematic wedding photograph capturing an intimate moment between a couple"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="md:col-span-5 relative z-10 md:pl-16">
              <span className="font-display text-accent leading-none block mb-6 opacity-50" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>02</span>
              <h3 className="font-display text-text text-2xl md:text-[32px] mb-6" style={{ lineHeight: "130%" }}>
                Wedding Stories
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
                Documentary-style elegance. We capture the raw emotion and sophisticated details of your celebration, transforming transient moments into cinematic heirlooms.
              </p>
              <a
                href="#portfolio"
                onClick={(e) => handleAnchorClick(e, "#portfolio")}
                className="label-caps text-accent border-b border-accent pb-1 hover:text-text hover:border-text transition-colors duration-300"
              >
                View Stories
              </a>
            </div>
          </article>

          {/* Discipline 03 — Text Left, Image Right */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center reveal md:sticky md:top-[180px] bg-[#161616] border border-white/5 rounded-3xl p-8 md:p-12 shadow-[0_-25px_60px_rgba(0,0,0,0.8)]">
            <div className="md:col-span-5 order-2 md:order-1 relative z-10">
              <span className="font-display text-accent leading-none block mb-6 opacity-50" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>03</span>
              <h3 className="font-display text-text text-2xl md:text-[32px] mb-6" style={{ lineHeight: "130%" }}>
                Fine Portraiture
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
                Intimate, powerful, and deeply personal. Our studio portraiture leverages masterful lighting techniques to reveal character and command presence.
              </p>
              <a
                href="#portfolio"
                onClick={(e) => handleAnchorClick(e, "#portfolio")}
                className="label-caps text-accent border-b border-accent pb-1 hover:text-text hover:border-text transition-colors duration-300"
              >
                Discover Series
              </a>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 overflow-hidden w-full h-[300px] md:h-[450px] group rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80&auto=format"
                alt="Dramatic fine art portrait with masterful studio lighting"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>

        </div>
      </section>

      {/* 13. THE EDITORIAL STANDARD — Why Choose Us */}
      <section className="relative py-40 md:py-[160px] px-6 md:px-20 max-w-[1440px] mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-24 reveal-blur">
          <h2
            className="font-display text-text mb-6"
            style={{ fontSize: "clamp(2.625rem, 8vw, 7.5rem)", lineHeight: "110%", letterSpacing: "-0.02em" }}
          >
            The Editorial<br />Standard
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            A meticulous approach to image-making, designed for brands and individuals
            who demand uncompromising quality and aesthetic rigor.
          </p>
        </div>

        {/* Sticky image + scrolling text grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
          {/* Large Hero Image — sticky on desktop */}
          <div className="md:col-span-7 md:col-start-1 h-[500px] md:h-[800px] md:sticky md:top-32 overflow-hidden group reveal-scale">
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&q=80&auto=format"
              alt="Photographer directing a subject in a vast, industrial studio space"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              loading="lazy"
              decoding="async"
            />
            {/* Mobile gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080808]/80 md:hidden pointer-events-none"></div>
          </div>

          {/* Scrolling Cinematic Text Blocks — right column */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-32 md:gap-64 mt-12 md:mt-32 pb-32">
            {/* Point 01 */}
            <div className="reveal relative z-10">
              <span
                className="font-display text-accent leading-none block mb-4 opacity-50"
                style={{ fontSize: "clamp(4rem, 10vw, 7.5rem)" }}
              >
                01
              </span>
              <h3 className="font-display text-text text-2xl md:text-[32px] mb-4" style={{ lineHeight: "130%" }}>
                Curated Direction
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Every shoot is treated as an editorial spread. We meticulously plan every
                element — from mood boards to lighting schemas — ensuring a cohesive visual
                language that speaks volumes before a single word is read.
              </p>
            </div>

            {/* Point 02 */}
            <div className="reveal relative z-10">
              <span
                className="font-display text-accent leading-none block mb-4 opacity-50"
                style={{ fontSize: "clamp(4rem, 10vw, 7.5rem)" }}
              >
                02
              </span>
              <h3 className="font-display text-text text-2xl md:text-[32px] mb-4" style={{ lineHeight: "130%" }}>
                Masterful Light
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Lighting is our signature. We sculpt with shadows and paint with highlights
                to create depth, drama, and emotion. Our aesthetic leans into the darkness,
                using contrast to force focus onto the subject.
              </p>
            </div>

            {/* Point 03 */}
            <div className="reveal relative z-10">
              <span
                className="font-display text-accent leading-none block mb-4 opacity-50"
                style={{ fontSize: "clamp(4rem, 10vw, 7.5rem)" }}
              >
                03
              </span>
              <h3 className="font-display text-text text-2xl md:text-[32px] mb-4" style={{ lineHeight: "130%" }}>
                Timeless Craft
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Beyond the capture, our post-production process is rigorous and nuanced.
                We eschew fleeting trends in favor of classic, filmic grades that ensure
                your imagery remains potent and relevant for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. TESTIMONIALS (The Muse & The Word) */}
      <section
        id="testimonials"
        className="py-40 md:py-[160px] px-6 md:px-20 max-w-[1440px] mx-auto relative border-t border-white/5"
      >
        <div className="mb-32 reveal-blur">
          <h2 className="text-4xl md:text-5xl font-display mb-4 text-text">The Muse</h2>
          <p className="text-lg text-on-surface-variant max-w-xl font-light">
            Voices of those who have stepped before the lens. A testament to the collaborative art of capturing essence over mere likeness.
          </p>
        </div>

        {/* Editorial Layout 1 */}
        <div className="relative min-h-[600px] md:min-h-[819px] flex flex-col md:flex-row items-center mb-32 reveal">
          <div className="w-full md:w-5/12 z-10 md:pr-12 mb-12 md:mb-0 relative">
            <span className="text-[200px] leading-none font-display absolute -top-24 -left-12 opacity-5 text-primary pointer-events-none">"</span>
            <h3 className="text-2xl md:text-[32px] font-display text-text mb-8 relative z-10 leading-snug">
              "An experience that felt less like a photo session and more like a <span className="italic text-primary">cinematic deep dive</span> into my own narrative."
            </h3>
            <div className="border-l border-white/10 pl-6">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1">ELARA VANCE</p>
              <p className="text-sm text-on-surface-variant">Creative Director, VOU Magazine</p>
            </div>
          </div>
          <div className="w-full md:w-7/12 relative h-[400px] md:h-[600px] overflow-hidden group rounded-2xl shadow-2xl">
            <img
              alt="Elara Vance Portrait"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0khps4jskUakTh__bHk9FDZROPUnmCyQhMmdLQqw3aRfN1FEsRS83kszWICEAQpQfqQ2LiKZFIZ7qG3OGkJU1Ox6nHozIaS33L9pjklb2RyvUTqBk9gsw9wFnKjUTRF7kixitJXstmHrGUL84k1YFNotUNJCSZyLy37X50vsU0pGxXNbZIwhVR6C6-TcU2faEzyCgxOKqCXOHvoKYSqQxx5HunyOXiMHmT4_R1Vs5Vq8xvL7JqG58"
            />
          </div>
        </div>

        {/* Editorial Layout 2 (Asymmetrical Reverse) */}
        <div className="relative min-h-[600px] md:min-h-[819px] flex flex-col-reverse md:flex-row items-center reveal">
          <div className="w-full md:w-6/12 relative h-[450px] md:h-[700px] overflow-hidden group rounded-2xl shadow-2xl mt-12 md:mt-0 md:-ml-12">
            <img
              alt="Julian Thorne Portrait"
              className="w-full h-full object-cover grayscale transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl0JMEDCSOmGQtm-526Zq9RFinBr_X1SkpKruxv6DcK7Ioa-QwN9fWttt8I9YbaUcqxG9OhbCcsvtnXuyMict0A1rJLBzZpIaaV4EDRaf9gBEN3-C5U4Hi4VocGKelb_pPgFctwcT4wC9Rj6Ct-A3Ygzczu-cTiBNylX4YUa-WwGnltNdCQdexX13SxImZy9ni4W-F9nEEYNgFSP5jEMaxIflcHAIdPaKOKYv6AkHSf6zGtU64rTKG"
            />
          </div>
          <div className="w-full md:w-6/12 z-10 md:pl-24 relative">
            <div className="absolute -right-12 top-1/4 text-[100px] md:text-[120px] font-display opacity-5 text-outline hidden md:block whitespace-nowrap transform rotate-90 origin-bottom-right">
              THE WORD
            </div>
            <h3 className="text-2xl md:text-[32px] font-display text-text mb-8 relative z-10 leading-snug">
              "Setara possesses a rare ability to see past the facade. The resulting imagery was <span className="italic text-primary">unflinchingly honest</span>."
            </h3>
            <div className="border-l border-white/10 pl-6">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1">JULIAN THORNE</p>
              <p className="text-sm text-on-surface-variant">Author & Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* 15. CURATED COLLECTIONS — Packages */}
      <section
        id="pricing"
        className="relative py-24 md:py-32 bg-[#101112] border-t border-white/5 z-20"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="px-6 md:px-20 mb-20 text-center relative z-10">
          <div className="w-12 h-[1px] bg-accent mx-auto mb-6"></div>
          <h2 className="font-display text-text mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "120%" }}>
            Curated Collections
          </h2>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Transparent investments for unparalleled artistry. Select the narrative scope that aligns with your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 relative z-10 max-w-[1440px] mx-auto">

          {/* Tier 1 — Essential */}
          <div className="border border-white/10 hover:border-accent/40 bg-surface/30 backdrop-blur-md p-8 md:p-10 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group reveal">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold block mb-2">Tier 01 // Essential</span>
              <h4 className="font-display text-text text-2xl md:text-3xl mb-4" style={{ lineHeight: "130%" }}>The Narrative</h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl md:text-4xl font-display text-text font-light">$1,500</span>
                <span className="text-xs text-text/40 tracking-wider uppercase font-sans">Investment</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                For focused sessions requiring succinct, powerful storytelling and editorial vision.
              </p>
            </div>
            
            <div className="w-full h-px bg-white/5 my-6"></div>
            
            <div className="mb-10 flex-grow">
              <ul className="space-y-4 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  2 Hours of Session Coverage
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  50 Custom Retouched Images
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Private Digital Atelier Gallery
                </li>
              </ul>
            </div>
            
            <a
              href="#booking"
              onClick={(e) => handleAnchorClick(e, "#booking")}
              className="w-full text-center label-caps py-4 rounded-lg border border-white/20 text-text group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-500 block"
            >
              Reserve Session
            </a>
          </div>

          {/* Tier 2 — Professional (Highlighted) */}
          <div className="border border-accent/40 bg-surface-container/70 shadow-[0_20px_60px_rgba(212,175,55,0.03)] backdrop-blur-md p-8 md:p-10 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(212,175,55,0.06)] group relative reveal">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-black px-5 py-1 text-[9px] tracking-[0.3em] font-semibold uppercase rounded-full shadow-lg">
              Most Requested
            </div>
            <div className="mb-8 mt-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold block mb-2">Tier 02 // Professional</span>
              <h4 className="font-display text-text text-2xl md:text-3xl mb-4" style={{ lineHeight: "130%" }}>The Editorial</h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl md:text-4xl font-display text-accent font-light">$2,800</span>
                <span className="text-xs text-accent/50 tracking-wider uppercase font-sans">Investment</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                A comprehensive high-fashion approach capturing depth, detail, and cinematic scale.
              </p>
            </div>
            
            <div className="w-full h-px bg-accent/10 my-6"></div>
            
            <div className="mb-10 flex-grow">
              <ul className="space-y-4 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Half-Day Session Coverage (5 Hours)
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  150 High-End Retouched Images
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Creative Direction Consultation
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Atelier Fine Art Print Collection
                </li>
              </ul>
            </div>
            
            <a
              href="#booking"
              onClick={(e) => handleAnchorClick(e, "#booking")}
              className="btn-luxury w-full text-center label-caps py-4 rounded-lg bg-accent text-[#080808] border border-accent hover:bg-transparent hover:text-accent transition-all duration-500 block"
            >
              Reserve Session
            </a>
          </div>

          {/* Tier 3 — Signature */}
          <div className="border border-white/10 hover:border-accent/40 bg-surface/30 backdrop-blur-md p-8 md:p-10 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group reveal">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold block mb-2">Tier 03 // Signature</span>
              <h4 className="font-display text-text text-2xl md:text-3xl mb-4" style={{ lineHeight: "130%" }}>The Masterpiece</h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl md:text-4xl font-display text-text font-light">$4,900</span>
                <span className="text-xs text-text/40 tracking-wider uppercase font-sans">Investment</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                An uncompromising, full-scale production for iconic, legacy-building portfolios.
              </p>
            </div>
            
            <div className="w-full h-px bg-white/5 my-6"></div>
            
            <div className="mb-10 flex-grow">
              <ul className="space-y-4 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Full-Day Session Coverage (10+ Hours)
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Complete Curated Digital Gallery
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Second Atelier Photographer
                </li>
                <li className="flex items-start text-text/80">
                  <span className="text-accent mr-3 mt-1 text-[10px]">✦</span>
                  Custom Hand-Bound Silk Album
                </li>
              </ul>
            </div>
            
            <a
              href="#booking"
              onClick={(e) => handleAnchorClick(e, "#booking")}
              className="w-full text-center label-caps py-4 rounded-lg border border-white/20 text-text group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-500 block"
            >
              Reserve Session
            </a>
          </div>
        </div>
      </section>

      {/* 16. BOOKING RESERVATION */}
      <section
        id="booking"
        className="relative py-24 md:py-32 px-6 md:px-20 flex flex-col justify-center bg-[#080808] border-t border-white/10 md:sticky md:top-0 z-30 shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1280&q=75&auto=format"
            alt="Studio atmosphere"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg"></div>
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="accent-rule mb-8 reveal-left"></div>
            <h2 className="heading-xl text-5xl md:text-7xl mb-8 reveal">
              Reserve your
              <br />
              <span className="heading-italic text-accent">session</span>.
            </h2>
            <p className="text-text/65 font-light leading-relaxed mb-10 reveal">
              Share a few details about your vision. Our atelier concierge will
              respond within 24 hours with availability, a tailored proposal,
              and a private consultation invitation.
            </p>

            <div className="space-y-6 reveal">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-text/50 mb-1">
                    Atelier Concierge
                  </div>
                  <div className="font-display text-lg">+33 1 42 86 90 12</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-text/50 mb-1">
                    Private Enquiries
                  </div>
                  <div className="font-display text-lg">
                    studio@setarastudio.com
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-text/50 mb-1">
                    Flagship Atelier
                  </div>
                  <div className="font-display text-lg">
                    18 Rue Cambon, Paris 75001
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleBookingSubmit}
              className="glass rounded-2xl p-6 md:p-10 w-full reveal"
              id="bookingForm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label
                    className="text-xs tracking-[0.25em] uppercase text-text/50 block mb-2"
                    htmlFor="bf-name"
                  >
                    Full Name
                  </label>
                  <input
                    className="lux-input"
                    type="text"
                    id="bf-name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-xs tracking-[0.25em] uppercase text-text/50 block mb-2"
                    htmlFor="bf-email"
                  >
                    Email
                  </label>
                  <input
                    className="lux-input"
                    type="email"
                    id="bf-email"
                    name="email"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-xs tracking-[0.25em] uppercase text-text/50 block mb-2"
                    htmlFor="bf-phone"
                  >
                    Phone
                  </label>
                  <input
                    className="lux-input"
                    type="tel"
                    id="bf-phone"
                    name="phone"
                    placeholder="+33 ..."
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-xs tracking-[0.25em] uppercase text-text/50 block mb-2"
                    htmlFor="bf-type"
                  >
                    Photography Type
                  </label>
                  <div className="relative">
                    {/* Hidden input to preserve standard HTML form submission behavior */}
                    <input type="hidden" name="type" value={selectedService} required />
                    
                    {/* Select Trigger */}
                    <button
                      type="button"
                      onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
                      className="lux-input flex items-center justify-between w-full text-left"
                    >
                      <span className={selectedService ? "text-text" : "text-text/30"}>
                        {selectedService || "Select a service"}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`text-text/40 transition-transform duration-300 ${
                          isServiceDropdownOpen ? "rotate-90 text-accent" : ""
                        }`}
                      />
                    </button>

                    {/* Custom Dropdown List */}
                    {isServiceDropdownOpen && (
                      <>
                        {/* Overlay backdrop to close dropdown when clicking outside */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsServiceDropdownOpen(false)}
                        />
                        <ul className="absolute left-0 right-0 mt-2 bg-[#121414] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-[fadeIn_0.2s_ease-out]">
                          {[
                            "Wedding",
                            "Portrait",
                            "Fashion",
                            "Graduation",
                            "Corporate",
                            "Product",
                            "Commercial Campaign",
                            "Drone & Aerial",
                          ].map((service) => (
                            <li key={service}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedService(service);
                                  setIsServiceDropdownOpen(false);
                                }}
                                className={`w-full text-left px-5 py-3.5 text-sm transition-colors cursor-interactive ${
                                  selectedService === service
                                    ? "bg-accent/10 text-accent font-medium border-l-2 border-accent"
                                    : "text-text/75 hover:bg-white/5 hover:text-text"
                                }`}
                              >
                                {service}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label
                    className="text-xs tracking-[0.25em] uppercase text-text/50 block mb-2"
                    htmlFor="bf-date"
                  >
                    Preferred Date
                  </label>
                  <div className="relative group">
                    {/* Hidden field for form validation/submit */}
                    <input
                      type="hidden"
                      name="date"
                      value={selectedDate}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen((prev) => !prev)}
                      className="lux-input flex items-center justify-between w-full text-left cursor-interactive"
                    >
                      <span className={selectedDate ? "text-text" : "text-text/30"}>
                        {selectedDate ? formatDate(selectedDate) : "Select a date"}
                      </span>
                      <Calendar size={16} className="text-text/40 group-hover:text-accent transition-colors" />
                    </button>

                    {/* Custom Luxury Calendar Dropdown */}
                    {isCalendarOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsCalendarOpen(false)}
                        />
                        <div className="absolute left-0 right-0 mt-2 bg-[#121414] border border-white/10 rounded-2xl p-5 shadow-2xl z-50 animate-[fadeIn_0.2s_ease-out] w-80 mx-auto md:w-auto">
                          {/* Calendar Navigation Header */}
                          <div className="flex justify-between items-center mb-6">
                            <button
                              type="button"
                              onClick={() => {
                                setCalendarActiveDate(
                                  new Date(calendarActiveDate.getFullYear(), calendarActiveDate.getMonth() - 1, 1)
                                );
                              }}
                              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-colors cursor-interactive"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="font-display text-text text-sm tracking-wider uppercase">
                              {calendarActiveDate.toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setCalendarActiveDate(
                                  new Date(calendarActiveDate.getFullYear(), calendarActiveDate.getMonth() + 1, 1)
                                );
                              }}
                              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-colors cursor-interactive"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>

                          {/* Days of Week Header */}
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                              <span key={day} className="text-[10px] tracking-wider uppercase text-text/30 font-semibold">
                                {day}
                              </span>
                            ))}
                          </div>

                          {/* Calendar Grid Cells */}
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {getDaysInMonth(calendarActiveDate.getFullYear(), calendarActiveDate.getMonth()).map((cell, idx) => {
                              const isSelected = selectedDate === cell.dateStr;
                              const isToday = new Date().toISOString().split("T")[0] === cell.dateStr;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDate(cell.dateStr);
                                    setIsCalendarOpen(false);
                                  }}
                                  className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-colors cursor-interactive ${
                                    isSelected
                                      ? "bg-accent text-black font-semibold"
                                      : !cell.isCurrentMonth
                                      ? "text-text/20 hover:bg-white/5"
                                      : isToday
                                      ? "border border-accent/40 text-accent font-medium hover:bg-white/5"
                                      : "text-text/70 hover:bg-white/5 hover:text-text"
                                  }`}
                                >
                                  {cell.dayNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label
                    className="text-xs tracking-[0.25em] uppercase text-text/50 block mb-2"
                    htmlFor="bf-message"
                  >
                    Vision & Details
                  </label>
                  <textarea
                    className="lux-input resize-none"
                    id="bf-message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your project, location, and any particular mood..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="btn-luxury w-full py-5 border border-accent text-accent text-xs tracking-[0.3em] uppercase rounded-full flex items-center justify-center gap-3 magnetic transition-transform duration-100"
              >
                Request Booking
                <ArrowRight size={14} />
              </button>
              <p className="text-center text-text/40 text-xs mt-5">
                We respond personally within 24 hours · No automated replies
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 17. FINAL CTA BANNER */}
      <section
        ref={ctaSectionRef}
        id="contact"
        className="relative py-32 md:py-48 overflow-hidden"
      >
        <div className="absolute inset-0" id="ctaBg">
          <div
            ref={ctaBgRef}
            className="w-full h-full"
            style={{
              transform: "translateY(0px) scale(1.1)",
              willChange: "transform",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1280&q=75&auto=format"
              alt="Couple in golden hour"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 bg-bg/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-4 text-xs tracking-[0.4em] uppercase text-accent mb-8 reveal">
            <span className="w-12 h-px bg-accent/60 block"></span>
            <span>Limited 2025 Calendar</span>
            <span className="w-12 h-px bg-accent/60 block"></span>
          </div>
          <h2 className="heading-xl mb-10 reveal-blur" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Some moments
            <br />
            <span className="heading-italic text-accent">only come once</span>.
          </h2>
          <p className="text-text/70 text-lg max-w-xl mx-auto mb-12 font-light reveal">
            Book your session before our 2025 calendar closes. We accept a
            limited number of commissions each season to ensure every project
            receives our full creative attention.
          </p>
          <a
            href="#booking"
            onClick={(e) => handleAnchorClick(e, "#booking")}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="btn-luxury inline-flex items-center gap-3 px-10 py-5 border border-accent text-accent text-xs tracking-[0.3em] uppercase rounded-full magnetic transition-transform duration-100"
          >
            Reserve Your Session
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* 18. FOOTER */}
      <footer className="relative bg-[#0b0c0c] border-t border-white/10 mt-16 overflow-hidden z-40 shadow-[0_-30px_80px_rgba(0,0,0,0.9)]">
        {/* Large Brand Background Monogram */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden select-none">
          <span className="font-display text-[22vw] leading-none whitespace-nowrap text-text uppercase">
            SETARA
          </span>
        </div>

        <div className="flex flex-col w-full px-6 md:px-20 py-20 max-w-[1440px] mx-auto relative z-10">
          {/* Top Footer Section: Nav & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
            {/* Main Branding & Intro */}
            <div className="md:col-span-5">
              <h2 className="text-4xl md:text-5xl font-display text-text mb-8">
                SETARA STUDIO
              </h2>
              <p className="text-base text-on-surface-variant max-w-sm mb-12 font-light leading-relaxed">
                Capturing the ephemeral. Defining modern editorial luxury through the lens.
              </p>
              <a
                href="#booking"
                onClick={(e) => handleAnchorClick(e, "#booking")}
                className="inline-flex items-center space-x-4 group cursor-interactive"
              >
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <ArrowRight className="text-text group-hover:text-black transition-colors" size={18} />
                </span>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-text group-hover:text-accent transition-colors duration-300">
                  Start a Conversation
                </span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-3 flex flex-col space-y-6">
              <h3 className="text-xs font-semibold tracking-[0.25em] text-accent/80 uppercase">
                Explore
              </h3>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.id}
                  onClick={(e) => handleAnchorClick(e, link.id)}
                  className="text-on-surface-variant hover:text-text hover:pl-2 transition-all duration-500 text-sm font-light"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact & Socials */}
            <div className="md:col-span-4 flex flex-col space-y-12">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.25em] text-accent/80 uppercase mb-6">
                  Inquiries
                </h3>
                <a
                  href="mailto:hello@setarastudio.com"
                  className="block text-base text-text mb-2 hover:text-accent transition-colors cursor-interactive"
                >
                  hello@setarastudio.com
                </a>
                <p className="text-sm text-on-surface-variant font-light">+1 (212) 555-0193</p>
                <p className="text-sm text-on-surface-variant mt-4 font-light">
                  New York — Paris — Tokyo
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-[0.25em] text-accent/80 uppercase mb-6">
                  Socials
                </h3>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-text hover:tracking-widest transition-all duration-500 text-xs font-semibold uppercase tracking-widest"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-text hover:tracking-widest transition-all duration-500 text-xs font-semibold uppercase tracking-widest"
                  >
                    Vimeo
                  </a>
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-text hover:tracking-widest transition-all duration-500 text-xs font-semibold uppercase tracking-widest"
                  >
                    Behance
                  </a>
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-text hover:tracking-widest transition-all duration-500 text-xs font-semibold uppercase tracking-widest"
                  >
                    Journal
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Gallery Preview (Curated Feed) */}
          <div className="w-full mb-20 border-t border-white/[0.08] pt-16">
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                Curated Feed
              </h3>
              <a
                href="#"
                className="text-xs font-semibold tracking-[0.15em] text-accent underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity"
              >
                @setarastudio
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square overflow-hidden bg-[#161616] relative group cursor-interactive rounded-xl">
                <img
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  alt="Instagram feed 1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7RoYpjarLDgPWtRtkkQBMeIsJ4PifUK3N-Gr-YjK_wa6JdFkOyy7Ho50Q9vSgzUj4PnXTk0rI09h_is5I0CWbwmPa5vKG4sv-n_N-01A7cn3s6308cNy4zSiNTMopFFx-u7OxSMVOsoOgX5YZ3krCDUsf1Yb1M5PPCNtoI-edIOJ25u4DvRSnkpcMqgR5Qe55GGD0w8KaB1SvvwfQluYx5yD8fx2wQ-yYfPuh2xHGHsobTdeVjX67"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg">♥</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden bg-[#161616] relative group cursor-interactive rounded-xl mt-8 md:mt-12">
                <img
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  alt="Instagram feed 2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA1gfClXjgANHGm4qzaRocsfWBE2U8S5EENo1U-sYePvCQfZKzLWm6lyc9RtghIgrIAUNK9eaFIWdjzfOUbkT_OU-SjTQwB6Dlff_xNgWweKmT5lCJWdUVGOk4J2vw_mD0RtMW9IJ-_4aADH-tUO4DMNyyM6EqAnaaFRnxnzSnp0BydNPyOtKhpbryrQbSxoYXuW0my15Z465v3etEL4Hj_6lGzZYpFuzCM4r4RRZqHm83CuoMbQso"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg">♥</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden bg-[#161616] relative group cursor-interactive rounded-xl">
                <img
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  alt="Instagram feed 3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS_-DX9jjZ534nIMatzHuz1rtDInduwVPGG_fxrrKlGOr9-nuvTfy2qF2Ibcf8i2v_YEg42AO_iiYrIGsOGg2M1B349qIlUmQaNzimssbxxG00WhxWmkH9VcnePJv07PJB7AYj1bxhF7ue4ktGtSHFvV8rQao7Gs0biCWO-SgmqysbMUb8quN0Wr_rD15p1jzJUc2cK-JympSRruRJbUh9BolD5ryC2d7_dbqAOoFE0yMxDHCx-1jD"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg">♥</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden bg-[#161616] relative group cursor-interactive rounded-xl mt-8 md:mt-12">
                <img
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  alt="Instagram feed 4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD-XRcW6UDpkyEfwAsxzuqAun7U33N7Qh0DcmlALrGkEDTMINuGMb4Tf5Lw5MBODmuRD7I-m7ezKrqltRig28an6ZNrUAnneSi14t3YHKua8LVg5FOh6yATUijzc2eX6ZhxLm05TMutcx1ibTPbDBNceBvsut5YgQoKXKLZYGuL0qHZsAyR7wyJeLFzz6pXB1XGUYNpZXIq9ora9c4hHm5wLD7Wzbjps2_V6HJVKhxPzR90zf2MsLv"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg">♥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer: Copyright & Legal */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4 md:mb-0">
              <p className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
                © {new Date().getFullYear()} SETARA STUDIO. ALL RIGHTS RESERVED.
              </p>
              <span className="hidden md:inline text-on-surface-variant/30">|</span>
              <p className="text-xs tracking-widest text-on-surface-variant/60 uppercase">
                Designed by{" "}
                <a
                  href="https://fusionify.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary transition-colors duration-300"
                >
                  Fusionify Digital Group
                </a>
              </p>
            </div>
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-xs font-semibold tracking-widest text-on-surface-variant hover:text-text uppercase transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs font-semibold tracking-widest text-on-surface-variant hover:text-text uppercase transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
