/**
 * कथा (Katha) – every little has a story | Kids Fashion
 * Main JavaScript Engine
 * Centralized Store for Products, Categories, Stories & Config
 */

// Brand Configuration
const KATHA_CONFIG = {
  brandName: "कथा (Katha)",
  tagline: "every little has a story",
  whatsappNumber: "919876543210", // REPLACE with brand's real WhatsApp number with country code
  instagramHandle: "@katha.kidsfashion",
  defaultEnquiryMessage: "Hello Katha Kids! I would love to enquire about: ",
  generalEnquiryMessage: "Hello Katha Kids! I loved your collection and would like to see your catalogue."
};

// 6. Featured Products Data Store (Easily editable by user)
const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "Gulab Gota Chanderi Kurta Set",
    category: "Ethnic / Festive",
    price: 1850,
    tag: "Festive",
    tagClass: "tag-festive",
    imagePrimary: "assets/images/prod-1a.jpg",
    imageHover: "assets/images/prod-1b.jpg",
    description: "Handcrafted pure chanderi kurta with delicate gotta patti work and soft mulmul lining for toddlers."
  },
  {
    id: "prod-2",
    name: "Neelkanth Linen Nehru Jacket & Kurta",
    category: "Festive Boys",
    price: 2199,
    tag: "New",
    tagClass: "tag-new",
    imagePrimary: "assets/images/prod-2a.jpg",
    imageHover: "assets/images/prod-2b.jpg",
    description: "Breathable royal indigo linen jacket paired with organic cotton slub kurta for little princes."
  },
  {
    id: "prod-3",
    name: "Chandani Muslin Tiered Frock",
    category: "Girls Party Wear",
    price: 1650,
    tag: "Bestseller",
    tagClass: "tag-bestseller",
    imagePrimary: "assets/images/prod-3a.jpg",
    imageHover: "assets/images/prod-3b.jpg",
    description: "Airy muslin frock with whimsical fairy flutter sleeves and delicate gold accents."
  },
  {
    id: "prod-4",
    name: "Mishri Organic Cotton Baby Romper",
    category: "Newborn (0–12M)",
    price: 990,
    tag: "100% Organic",
    tagClass: "tag-organic",
    imagePrimary: "assets/images/prod-4a.jpg",
    imageHover: "assets/images/prod-4b.jpg",
    description: "Ultra-gentle GOTS certified organic cotton romper with easy snap buttons for quick diaper changes."
  },
  {
    id: "prod-5",
    name: "Saawan Blockprint Summer Co-ord Set",
    category: "Casual Everyday",
    price: 1450,
    tag: "Hand Blockprint",
    tagClass: "tag-new",
    imagePrimary: "assets/images/prod-5a.jpg",
    imageHover: "assets/images/prod-5b.jpg",
    description: "Artisan hand-blockprinted breathable short-and-shirt set designed for endless play."
  },
  {
    id: "prod-6",
    name: "Titli Embroidered Organza Dress",
    category: "Girls (4–7Y)",
    price: 2450,
    tag: "Festive",
    tagClass: "tag-festive",
    imagePrimary: "assets/images/prod-6a.jpg",
    imageHover: "assets/images/prod-6b.jpg",
    description: "Celebration-ready pastel lavender organza dress with embroidered butterfly motifs and soft satin underlay."
  },
  {
    id: "prod-7",
    name: "Lori Cloud-Soft Cotton Sleepsuit",
    category: "Sleep & Comfort",
    price: 1150,
    tag: "Cloud Soft",
    tagClass: "tag-organic",
    imagePrimary: "assets/images/prod-7a.jpg",
    imageHover: "assets/images/prod-7b.jpg",
    description: "Bedtime perfection made with combed Indian cotton, tagless seams, and calming bedtime prints."
  },
  {
    id: "prod-8",
    name: "Kesariya Bandhani Angrakha Dhoti Set",
    category: "Festive / Ethnic",
    price: 1999,
    tag: "Festive",
    tagClass: "tag-festive",
    imagePrimary: "assets/images/prod-8a.jpg",
    imageHover: "assets/images/prod-8b.jpg",
    description: "Traditional Jaipuri bandhani angrakha with adjustable ties and pre-stitched comfort dhoti."
  }
];

// Helper: Format Indian Rupee currency
function formatINR(amount) {
  return "₹" + amount.toLocaleString('en-IN');
}

// Generate WhatsApp Link helper
function getWhatsAppLink(message) {
  return `https://wa.me/${KATHA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Initialize Application once DOM is fully parsed
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  setupPreloader();
  setupHeaderBehavior();
  setupMobileMenu();
  setupSmoothScroll();
  setupAnimations();
  setupWhatsAppLinks();
});

/* ========================================================
   RENDER FEATURED PRODUCTS
   ======================================================== */
function renderFeaturedProducts() {
  const container = document.getElementById("featuredProductsGrid");
  if (!container) return;

  container.innerHTML = FEATURED_PRODUCTS.map((prod) => {
    const waEnquiryMsg = `${KATHA_CONFIG.defaultEnquiryMessage} *${prod.name}* (Code: ${prod.id}, Price: ${formatINR(prod.price)}). Can you share available sizes?`;
    const waLink = getWhatsAppLink(waEnquiryMsg);

    return `
      <div class="product-card" data-product-id="${prod.id}">
        <div class="product-img-wrap">
          <span class="product-tag ${prod.tagClass}">${prod.tag}</span>
          <img src="${prod.imagePrimary}" alt="${prod.name}" class="product-img product-img-primary" loading="lazy" />
          <img src="${prod.imageHover}" alt="${prod.name} back view" class="product-img product-img-hover" loading="lazy" />
          <div class="product-enquire-overlay">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="product-enquire-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.531 1.77.818 2.796.818 3.181 0 5.767-2.586 5.768-5.766.001-3.182-2.585-5.768-5.768-5.768zm0 10.455c-.911 0-1.637-.251-2.434-.725l-.174-.103-1.802.473.481-1.758-.114-.181c-.538-.854-.823-1.579-.823-2.396 0-2.614 2.127-4.741 4.742-4.741 2.615 0 4.742 2.127 4.742 4.742s-2.127 4.743-4.742 4.743z"/>
              </svg>
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
        <div class="product-info">
          <div class="product-cat">${prod.category}</div>
          <h3 class="product-name">${prod.name}</h3>
          <div class="product-price">${formatINR(prod.price)}</div>
        </div>
      </div>
    `;
  }).join("");
}

/* ========================================================
   0. PRELOADER ANIMATION (GSAP)
   ======================================================== */
function setupPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove("no-scroll");
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }
  });

  document.body.classList.add("no-scroll");

  // Step 1: "कथा" gently fades and lifts up
  tl.to(".loader-wordmark", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  })
  // Step 2: Baby elephant pops up over wordmark with a soft bounce
  .to(".loader-elephant", {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.5,
    ease: "back.out(2)"
  }, "-=0.2")
  // Step 3: Elephant gives a cute playful wiggle/wave
  .to(".loader-elephant", {
    rotation: 10,
    duration: 0.15,
    yoyo: true,
    repeat: 3,
    ease: "sine.inOut"
  })
  // Step 4: Tagline and Kids Fashion line fade in
  .to(".loader-tagline", {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.2")
  .to(".loader-kids-line", {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.3")
  // Pause briefly for parent to take in the brand beauty
  .to({}, { duration: 0.4 })
  // Step 5: Screen slides up gracefully to reveal the site
  .to(preloader, {
    yPercent: -100,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      document.body.classList.remove("no-scroll");
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }
  })
  // Reveal hero items
  .from(".hero-headline", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.3")
  .from(".hero-subline", {
    y: 25,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.5")
  .from(".hero-cta-group", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.4")
  .from(".hero-card", {
    scale: 0.85,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "back.out(1.4)"
  }, "-=0.6");
}

/* ========================================================
   1. HEADER BEHAVIOR (Sticky, Blur & Hide on Scroll Down)
   ======================================================== */
function setupHeaderBehavior() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Background blur when scrolled past 60px
    if (currentScrollY > 60) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    // Hide on scroll down, show on scroll up (beyond hero)
    if (currentScrollY > 250 && currentScrollY > lastScrollY) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ========================================================
   MOBILE MENU TOGGLE
   ======================================================== */
function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const menuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-menu-cta .btn");

  if (!toggleBtn || !menuOverlay) return;

  function toggleMenu() {
    const isOpen = toggleBtn.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  toggleBtn.addEventListener("click", toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
}

/* ========================================================
   SMOOTH SCROLL (LENIS + ANCHORS)
   ======================================================== */
function setupSmoothScroll() {
  // Only enable Lenis on desktop (> 991px). Native mobile scroll is faster and doesn't conflict with ScrollTrigger
  if (window.innerWidth > 991 && typeof Lenis !== "undefined") {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== "undefined") {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
}

/* ========================================================
   GSAP & SCROLLTRIGGER ANIMATIONS
   ======================================================== */
function setupAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  // On mobile devices, ensure cards are immediately visible and not delayed by scroll triggers
  if (window.innerWidth <= 991) {
    document.querySelectorAll('.age-card, .product-card, .cat-tile, .story-chapter').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // 1. Hero floating cards (infinite subtle floating)
  gsap.to(".hero-card-1", {
    y: -14,
    rotation: -2,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".hero-card-2", {
    y: 12,
    rotation: 5,
    duration: 4.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });

  gsap.to(".hero-card-3", {
    y: -10,
    rotation: 1,
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
  });

  // Mouse Parallax for hero cards on desktop only
  if (window.innerWidth > 991) {
    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual) {
      heroVisual.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = heroVisual.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(".hero-card-1", { x: x * 20, y: y * 20, duration: 0.8, ease: "power1.out" });
        gsap.to(".hero-card-2", { x: -x * 25, y: -y * 25, duration: 0.8, ease: "power1.out" });
        gsap.to(".hero-card-3", { x: x * 15, y: -y * 15, duration: 0.8, ease: "power1.out" });
      });

      heroVisual.addEventListener("mouseleave", () => {
        gsap.to(".hero-card-1, .hero-card-2, .hero-card-3", { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
      });
    }
  }

  // 2. Cosmic stars background slow drifting parallax
  gsap.to(".hero-cosmic-bg", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: 100
  });

  // 3. Brand Promise Strip items stagger reveal
  gsap.from(".promise-item", {
    scrollTrigger: {
      trigger: ".promise-strip",
      start: "top 85%"
    },
    opacity: 0,
    y: 30,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out"
  });

  // 4. Shop By Age cards reveal
  gsap.from(".age-card", {
    scrollTrigger: {
      trigger: ".shop-age-section",
      start: "top 85%",
      once: true
    },
    opacity: 0,
    y: 35,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out"
  });

  // 5. Category tiles reveal
  gsap.from(".cat-tile", {
    scrollTrigger: {
      trigger: ".shop-cat-section",
      start: "top 85%",
      once: true
    },
    opacity: 0,
    y: 30,
    stagger: 0.08,
    duration: 0.7,
    ease: "power2.out"
  });

  // 6. Featured Products stagger reveal
  gsap.from(".product-card", {
    scrollTrigger: {
      trigger: ".featured-collection-section",
      start: "top 85%",
      once: true
    },
    opacity: 0,
    y: 35,
    stagger: 0.08,
    duration: 0.8,
    ease: "power2.out"
  });

  // 7. Festive Banner parallax image & text
  gsap.from(".festive-image-wrap", {
    scrollTrigger: {
      trigger: ".festive-banner-section",
      start: "top 80%"
    },
    scale: 0.94,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // 8. Story Chapters fade-in
  document.querySelectorAll(".story-chapter").forEach((chapter) => {
    gsap.from(chapter, {
      scrollTrigger: {
        trigger: chapter,
        start: "top 85%"
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out"
    });
  });

  // 9. Elephant Wave on Footer Entry
  const footerElephant = document.querySelector(".footer-elephant-peek");
  if (footerElephant) {
    ScrollTrigger.create({
      trigger: ".site-footer",
      start: "top 85%",
      onEnter: () => {
        gsap.timeline()
          .to(footerElephant, { y: -16, duration: 0.4, ease: "back.out(2)" })
          .to(footerElephant, { rotation: 12, duration: 0.16, yoyo: true, repeat: 3, ease: "sine.inOut" })
          .to(footerElephant, { y: 0, rotation: 0, duration: 0.3, ease: "power2.out" });
      }
    });
  }
}

/* ========================================================
   GLOBAL WHATSAPP LINK ENRICHMENT
   ======================================================== */
function setupWhatsAppLinks() {
  // Bind general WhatsApp CTA buttons
  document.querySelectorAll("[data-wa-action='general']").forEach(btn => {
    btn.href = getWhatsAppLink(KATHA_CONFIG.generalEnquiryMessage);
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  // Bind newsletter / phone input form
  const newsletterForm = document.getElementById("whatsappNewsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById("whatsappPhoneInput");
      const phoneVal = phoneInput ? phoneInput.value.trim() : "";
      const msg = `Hello Katha Kids! Please add me to your VIP WhatsApp catalogue broadcast. My number is ${phoneVal || "this number"}.`;
      window.open(getWhatsAppLink(msg), "_blank");
      if (phoneInput) phoneInput.value = "";
    });
  }
}
