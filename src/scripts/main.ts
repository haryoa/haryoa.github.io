// Observer configurations
const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -70% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

const contentObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -10% 0px",
};

// Type declarations for window object
declare global {
  interface Window {
    pubFilter: string;
    setPubFilter: (filter: string) => void;
  }
}

// Helper functions
function handleSectionIntersection(entries: IntersectionObserverEntry[]) {
  const visibleEntries = entries.filter((entry) => entry.isIntersecting);

  if (visibleEntries.length > 0) {
    const mostVisible = visibleEntries.reduce((prev, current) => {
      return prev.intersectionRatio > current.intersectionRatio ? prev : current;
    });

    document.querySelectorAll(".section-nav-item").forEach((item) => {
        item.classList.remove("active", "text-[#16A085]");
        item.classList.add("text-[#2C3E50]");
    });
  }
}

function handleContentIntersection(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("stagger-children")) {
        entry.target.querySelectorAll(":scope > *").forEach((child, index) => {
          setTimeout(() => {
            (child as HTMLElement).style.opacity = "1";
            (child as HTMLElement).style.transform = "translateY(0)";
          }, index * 100);
        });
      }
    }
  });
}

function handleScroll(lastScroll: number, elements: any) {
  const currentScroll = window.scrollY;
  const scrollingDown = currentScroll > lastScroll;

  // Navbar and sidebar behavior
  if (currentScroll <= 0) {
    elements.navbar?.classList.remove("-translate-y-full");
    elements.navbar?.classList.add("translate-y-0");
    if (elements.profileSidebar) elements.profileSidebar.style.transform = "translateY(0)";
    if (elements.sectionNav) elements.sectionNav.style.top = "4rem";
  } else if (scrollingDown) {
    elements.navbar?.classList.remove("translate-y-0");
    elements.navbar?.classList.add("-translate-y-full");
    if (elements.profileSidebar) elements.profileSidebar.style.transform = "translateY(-4rem)";
    if (elements.sectionNav) elements.sectionNav.style.top = "0";
  } else {
    elements.navbar?.classList.remove("-translate-y-full");
    elements.navbar?.classList.add("translate-y-0");
    if (elements.profileSidebar) elements.profileSidebar.style.transform = "translateY(0)";
    if (elements.sectionNav) elements.sectionNav.style.top = "4rem";
  }

  // Back to top button
  if (elements.backToTop) {
    if (currentScroll > 300) {
      elements.backToTop.classList.remove("translate-y-12", "opacity-0");
    } else {
      elements.backToTop.classList.add("translate-y-12", "opacity-0");
    }
  }

  // Progress bar
  if (elements.progressBar) {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (currentScroll / height) * 100;
    elements.progressBar.style.width = `${scrolled}%`;
  }

  return currentScroll;
}

function handleResize() {
  const profileSidebar = document.querySelector("#profile-sidebar");
  if (window.innerWidth >= 1024) {
    (profileSidebar as HTMLElement)?.style.setProperty("maxHeight", "");
    profileSidebar?.classList.remove("expanded");
  }
}

// Main initialization functions
export function initializeObservers() {
  const sectionObserver = new IntersectionObserver(handleSectionIntersection, observerOptions);
  const contentObserver = new IntersectionObserver(handleContentIntersection, contentObserverOptions);

  document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });

  document.querySelectorAll(".section-transition").forEach((section) => {
    contentObserver.observe(section);
  });

  document.querySelectorAll(".space-y-24 > div").forEach((section) => {
    section.classList.add("stagger-children");
    contentObserver.observe(section);
  });
}

export function initializeScrollHandlers() {
  let lastScroll = 0;
  const elements = {
    navbar: document.querySelector("#main-navbar"),
    backToTop: document.querySelector("#back-to-top"),
    profileSidebar: document.querySelector("#profile-sidebar"),
    sectionNav: document.querySelector("#section-nav"),
    progressBar: document.querySelector(".progress-bar"),
  };

  window.addEventListener("scroll", () => {
    lastScroll = handleScroll(lastScroll, elements);
  });
  window.addEventListener("resize", handleResize);

  // Back to top click handler
  elements.backToTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

export function initializePublicationFilter() {
  window.pubFilter = "all";
  window.setPubFilter = (filter: string) => {
    window.pubFilter = filter;
    
    // Update publication visibility
    document.querySelectorAll("[data-pub]").forEach((pub) => {
      if (window.pubFilter === "all" || (pub as HTMLElement).dataset.type === window.pubFilter) {
        (pub as HTMLElement).style.display = "block";
      } else {
        (pub as HTMLElement).style.display = "none";
      }
    });

    // Update button states
    document.querySelectorAll("[data-filter-btn]").forEach((btn) => {
      if ((btn as HTMLElement).dataset.filterBtn === filter) {
        btn.classList.remove("bg-white/50", "text-[#2C3E50]", "hover:bg-[#2C3E50]/10");
        btn.classList.add("bg-[#2C3E50]", "text-white");
      } else {
        btn.classList.remove("bg-[#2C3E50]", "text-white");
        btn.classList.add("bg-white/50", "text-[#2C3E50]", "hover:bg-[#2C3E50]/10");
      }
    });
  };
}

function initializeSectionNavigation() {
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    link.addEventListener('click', () => {
      const sectionId = link.getAttribute('data-nav-link')?.replace(/\s+/g, '');
      const section = document.getElementById(sectionId!);
      if (section) {
        const headerOffset = 100; // Adjust this value based on your header height + some padding
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeObservers();
  initializeScrollHandlers();
  initializePublicationFilter();
  initializeSectionNavigation();
});
