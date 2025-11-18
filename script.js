console.log("script.js loaded successfully");

// ===== Lightbox (click to enlarge) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Only run if lightbox elements exist on the page
if (lightbox && lightboxImg) {
  document.querySelectorAll(".enlargeable").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex"; // Changed from "block" to "flex"
      lightboxImg.src = img.src;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  lightbox.addEventListener("click", (e) => {
    // Close if clicking the background (but not the wrapper or image)
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = searchInput.value.trim().toLowerCase();
      if (!keyword) return;

      // Map keywords to pages
      const routes = {
        "pengenalan": "index.html",
        "syarat": "index.html",
        "kelebihan": "index.html",
        "spm": "pembelajaran.html",
        "pembelajaran": "pembelajaran.html",
        "etika": "pembelajaran.html",
        "pengajian": "pembelajaran.html",
        "halatuju": "pembelajaran.html",
        "fasiliti": "fasiliti.html",
        "surau": "fasiliti.html",
        "ruangan pelajar": "fasiliti.html",
        "kelas": "fasiliti.html",
        "pengangkutan": "fasiliti.html",
        "bas": "fasiliti.html",
        "asrama": "fasiliti.html",
        "dewan": "fasiliti.html",
        "kafeteria": "fasiliti.html",
        "atm": "fasiliti.html",
        "parking": "fasiliti.html",
        "pengawal": "fasiliti.html",
        "aktiviti": "fasiliti.html",
        "bangunan": "fasiliti.html",
        "testimoni": "testimoni.html",
        "batch": "testimoni.html",
        "alamat": "hubungi.html",
        "alamat": "hubungi.html",
        "hubungi": "hubungi.html",
        "whatsapp": "hubungi.html",
        "laman web": "hubungi.html",
        "instagram": "hubungi.html",
        "facebook": "hubungi.html",
        "tiktok": "hubungi.html",
      };

      let targetPage = "index.html"; // default
      for (const key in routes) {
        if (keyword.includes(key)) {
          targetPage = routes[key];
          break;
        }
      }

      window.location.href = `${targetPage}?search=${encodeURIComponent(keyword)}`;
    });
  }

  // Highlight function on each page
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  if (searchTerm) {
    highlightAndScroll(searchTerm);
  }
});

// Highlight + scroll to first match
function highlightAndScroll(term) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const regex = new RegExp(term, "gi");
  let firstMatchElement = null;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (regex.test(node.nodeValue)) {
      const span = document.createElement("mark");
      span.innerHTML = node.nodeValue.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      const wrapper = document.createElement("span");
      wrapper.innerHTML = span.innerHTML;
      node.parentNode.replaceChild(wrapper, node);

      if (!firstMatchElement) {
        firstMatchElement = wrapper.querySelector(".highlight");
      }
    }
  }

  if (firstMatchElement) {
    firstMatchElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded successfully");

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger) {
    console.error("❌ Hamburger element not found in DOM!");
    return;
  }

  if (!navLinks) {
    console.error("❌ navLinks element not found in DOM!");
    return;
  // ```javascript
  }

  console.log("✅ Hamburger and navLinks found!");

  hamburger.addEventListener("click", () => {
    console.log("🍔 Hamburger clicked!");
    navLinks.classList.toggle("show");
  });

  // Dropdown menu toggle (for mobile click functionality)
  const dropdownLinks = document.querySelectorAll('.dropdown > a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only prevent default and toggle on mobile/tablet
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = link.parentElement;
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      }
      // On desktop, let the link work normally (hover still works)
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
});


function openModal(id) {
      document.getElementById(id).style.display = "flex";
    }
    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }
    window.onclick = function(e) {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }

// === Updated Popup logic with Ads ===
window.addEventListener('load', () => {
  const adsPopup = document.getElementById('adsPopup');
  const closeAdsBtn = document.getElementById('closeAdsPopup');
  const userPopup = document.getElementById('userPopup');
  const closeBtn = document.getElementById('closePopup');
  const form = document.getElementById('popupForm');
  const welcomePopup = document.getElementById('welcomePopup');
  const closeWelcome = document.getElementById('closeWelcome');
  const welcomeOk = document.getElementById('welcomeOk');

  // Show ads popup first if not shown in this session (only if adsPopup exists)
  if (adsPopup) {
    if (!sessionStorage.getItem('adsShown')) {
      adsPopup.style.display = 'flex';
    } else if (userPopup) {
      // If ads already shown but user popup not shown, show user popup
      if (!sessionStorage.getItem('popupShown')) userPopup.style.display = 'flex';
    }
  }

  // Close ads popup and show user registration popup
  if (closeAdsBtn && adsPopup) {
    closeAdsBtn.addEventListener('click', () => {
      adsPopup.style.display = 'none';
      sessionStorage.setItem('adsShown', 'true');
      
      // Show user registration popup if not shown yet
      if (userPopup && !sessionStorage.getItem('popupShown')) {
        userPopup.style.display = 'flex';
      }
    });
  }

  // Close registration popup manually
  if (closeBtn && userPopup) {
    closeBtn.addEventListener('click', () => {
      userPopup.style.display = 'none';
      sessionStorage.setItem('popupShown', 'true');
    });
  }

  // Form submission — show inline errors under each field (no alerts)
  if (form) {
    form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emelEl = document.getElementById('emel');
    const phoneEl = document.getElementById('phone');
    const emelError = document.getElementById('emelError');
    const phoneError = document.getElementById('phoneError');
    const emelField = document.getElementById('emelField');
    const phoneField = document.getElementById('phoneField');

    // clear previous errors
    emelError.textContent = '';
    phoneError.textContent = '';
    emelEl.classList.remove('input-invalid');
    phoneEl.classList.remove('input-invalid');
    emelField.classList.remove('has-error');
    phoneField.classList.remove('has-error');

    const emel = emelEl.value.trim();
    const phone = phoneEl.value.trim();

    let hasError = false;

    // Email validation: must contain @
    if (!emel || emel.indexOf('@') === -1) {
      emelError.textContent = 'Sila masukkan alamat emel yang sah.';
      emelEl.classList.add('input-invalid');
      emelField.classList.add('has-error');
      hasError = true;
    }

    // Phone validation: must start with 01 and be 10-11 digits
    const phonePattern = /^01\d{8,9}$/;
    if (!phonePattern.test(phone)) {
      phoneError.textContent = 'Sila masukkan nombor telefon yang sah.';
      phoneEl.classList.add('input-invalid');
      phoneField.classList.add('has-error');
      hasError = true;
    }

    if (hasError) {
      // keep popup open and let user correct
      return;
    }

    // No errors -> proceed with previous flow
    userPopup.style.display = 'none';
    welcomePopup.style.display = 'flex';
    sessionStorage.setItem('popupShown', 'true');

    const scriptURL = "https://script.google.com/macros/s/AKfycbwz7XG3NEy32RV1JGUlHrHZKrUjcf06sYxZSzEivrdzurcxTAXbh5pIrh2SjzQBJTA/exec";
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: emel, phone }),
      });
    } catch (error) {
      console.error('Error!', error && error.message ? error.message : error);
    }
  });
  }

  // Close welcome popup
  const closeWelcomePopup = () => {
    welcomePopup.style.display = "none";
  };

  closeWelcome.addEventListener('click', closeWelcomePopup);
  welcomeOk.addEventListener('click', closeWelcomePopup);

  // Clear errors as user types
  try {
    const _emel = document.getElementById('emel');
    const _phone = document.getElementById('phone');
    const _emelError = document.getElementById('emelError');
    const _phoneError = document.getElementById('phoneError');
    const _emelField = document.getElementById('emelField');
    const _phoneField = document.getElementById('phoneField');

    if (_emel) {
      _emel.addEventListener('input', () => {
        if (_emelError) _emelError.textContent = '';
        _emel.classList.remove('input-invalid');
        if (_emelField) _emelField.classList.remove('has-error');
      });
    }

    if (_phone) {
      _phone.addEventListener('input', () => {
        if (_phoneError) _phoneError.textContent = '';
        _phone.classList.remove('input-invalid');
        if (_phoneField) _phoneField.classList.remove('has-error');
      });
    }
  } catch (err) {
    // non-critical
  }
});

// === Lightbox logic ===
document.querySelectorAll('.popup-img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'block';
  });
});

// === FAQ Accordion Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const faqCategories = document.querySelectorAll('.faq-category-header');
  
  faqCategories.forEach(header => {
    header.addEventListener('click', () => {
      const category = header.parentElement;
      const isActive = category.classList.contains('active');
      
      // Close all other categories
      document.querySelectorAll('.faq-category').forEach(cat => {
        cat.classList.remove('active');
      });
      
      // Toggle current category
      if (!isActive) {
        category.classList.add('active');
      }
    });
  });
});

// === Support Widget Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const supportIcon = document.getElementById('supportIcon');
  const supportFormContainer = document.getElementById('supportFormContainer');
  const supportClose = document.getElementById('supportClose');
  const supportForm = document.getElementById('supportForm');

  // Toggle form visibility
  if (supportIcon) {
    supportIcon.addEventListener('click', () => {
      supportFormContainer.classList.toggle('show');
    });
  }

  // Close form
  if (supportClose) {
    supportClose.addEventListener('click', () => {
      supportFormContainer.classList.remove('show');
    });
  }

  // Handle form submission
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('supportName').value.trim();
      const phone = document.getElementById('supportPhone').value.trim();
      const email = document.getElementById('supportEmail').value.trim();
      const question = document.getElementById('supportQuestion').value.trim();

      // Validate phone number (Malaysian format)
      const phoneRegex = /^01\d{8,9}$/;
      if (!phoneRegex.test(phone)) {
        alert('Sila masukkan nombor telefon yang sah (bermula dengan 01 dan 10-11 digit)');
        return;
      }

      // Create WhatsApp message
      const whatsappNumber = '601118558600'; // Your WhatsApp number (without + and spaces)
      let message = `*Pertanyaan Baru dari Website SMTAA*\n\n`;
      message += `👤 *Nama:* ${name}\n`;
      message += `📱 *Telefon:* ${phone}\n`;
      if (email) {
        message += `📧 *Email:* ${email}\n`;
      }
      message += `\n❓ *Soalan:*\n${question}`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with pre-filled message
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');

      // Optional: Save to localStorage for record keeping
      const inquiry = {
        timestamp: new Date().toISOString(),
        name: name,
        phone: phone,
        email: email,
        question: question
      };

      // Get existing inquiries or create new array
      let inquiries = JSON.parse(localStorage.getItem('smtaaInquiries') || '[]');
      inquiries.push(inquiry);
      localStorage.setItem('smtaaInquiries', JSON.stringify(inquiries));

      // Reset form and close
      supportForm.reset();
      supportFormContainer.classList.remove('show');
      
      // Show success message
      alert('Terima kasih! Soalan anda akan dibuka di WhatsApp. Sila hantar mesej tersebut.');
    });
  }

  // Close form when clicking outside
  document.addEventListener('click', (e) => {
    if (supportFormContainer && 
        supportFormContainer.classList.contains('show') &&
        !supportFormContainer.contains(e.target) &&
        !supportIcon.contains(e.target)) {
      supportFormContainer.classList.remove('show');
    }
  });
});

// === Dropdown arrow toggle (Hubungi → FAQs) ===
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const link = dropdown.querySelector('a'); // "Hubungi"
    const content = dropdown.querySelector('.dropdown-content');

    if (arrow) {
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        content.classList.toggle('active');
      });
    }

    // Ensure Hubungi link works normally on mobile
    link.addEventListener('click', (e) => {
      // Only apply this fix for small screens
      if (window.innerWidth <= 768) {
        // Let the browser navigate normally
        window.location.href = link.getAttribute('href');
      }
    });
  });
});

  const intro = document.getElementById("introScreen");
  const video = document.getElementById("introVideo");
  const startButton = document.getElementById("startButton");

  // Only run intro logic if the intro elements exist (home page)
  if (intro && startButton && video) {
    // Check session
    if (sessionStorage.getItem("introShown")) {
      intro.style.display = "none";
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        video.style.display = "block";
        video.play().then(() => {
          video.volume = 1.0;
        }).catch(err => {
          console.log("Autoplay blocked:", err);
        });

        video.addEventListener("ended", () => {
          intro.style.transition = "opacity 1s ease";
          intro.style.opacity = "0";
          setTimeout(() => {
            intro.style.display = "none";
            document.body.style.overflow = "auto";
            sessionStorage.setItem("introShown", "true");
          }, 1000);
        });
      });
    }
  } else {
    // If intro elements are not present, ensure body can scroll
    document.body.style.overflow = document.body.style.overflow || 'auto';
  }

// Hide spinner after page load
    window.addEventListener('load', function() {
      setTimeout(function() {
        document.getElementById('spinner').classList.add('hidden');
      }, 1000);
    });

    // Add smooth interaction effects
    const flexSlides = document.querySelectorAll('.flex-slide');
    
    flexSlides.forEach(slide => {
      slide.addEventListener('mouseenter', function() {
        // Add active class for additional effects if needed
        this.classList.add('active');
      });
      
      slide.addEventListener('mouseleave', function() {
        this.classList.remove('active');
      });
    });

    // Mobile touch support
    if ('ontouchstart' in window) {
      flexSlides.forEach(slide => {
        slide.addEventListener('touchstart', function() {
          flexSlides.forEach(s => s.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

// Team Members Data - UPDATE THIS WITH YOUR ACTUAL TEAM INFO
const teamMembers = [
  { name: "John Doe", role: "Founder & CEO" },
  { name: "Jane Smith", role: "Director of Education" },
  { name: "Ali Khan", role: "Head of Operations" },
  { name: "Mary Lim", role: "Program Coordinator" },
  { name: "Sarah Johnson", role: "Academic Director" },
  { name: "Michael Chen", role: "Technology Lead" },
  { name: "Fatimah Ahmad", role: "Student Affairs" },
  { name: "David Lee", role: "Research Coordinator" },
  { name: "Aisha Rahman", role: "Communications Manager" },
  { name: "Robert Wong", role: "Finance Director" },
  { name: "Nurul Huda", role: "Program Developer" },
  { name: "James Anderson", role: "Quality Assurance" },
  { name: "Siti Aminah", role: "Community Relations" }
];

// Initialize carousel once DOM is ready and only if carousel exists on page
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  if (!cards || cards.length === 0) return; // nothing to do on pages without the carousel

  const dots = document.querySelectorAll('.dot');
  const memberName = document.querySelector('.member-name');
  const memberRole = document.querySelector('.member-role');
  const leftArrow = document.querySelector('.nav-arrow.left');
  const rightArrow = document.querySelector('.nav-arrow.right');
  let currentIndex = 0;
  let isAnimating = false;

  function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;
      card.classList.remove('center', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');

      if (offset === 0) {
        card.classList.add('center');
      } else if (offset === 1) {
        card.classList.add('right-1');
      } else if (offset === 2) {
        card.classList.add('right-2');
      } else if (offset === cards.length - 1) {
        card.classList.add('left-1');
      } else if (offset === cards.length - 2) {
        card.classList.add('left-2');
      } else {
        card.classList.add('hidden');
      }
    });

    if (dots && dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (memberName) memberName.style.opacity = '0';
    if (memberRole) memberRole.style.opacity = '0';

    setTimeout(() => {
      if (memberName) memberName.textContent = teamMembers[currentIndex].name;
      if (memberRole) memberRole.textContent = teamMembers[currentIndex].role;
      if (memberName) memberName.style.opacity = '1';
      if (memberRole) memberRole.style.opacity = '1';
    }, 300);

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  if (leftArrow) leftArrow.addEventListener('click', () => updateCarousel(currentIndex - 1));
  if (rightArrow) rightArrow.addEventListener('click', () => updateCarousel(currentIndex + 1));

  if (dots && dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => updateCarousel(i));
    });
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => updateCarousel(i));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateCarousel(currentIndex - 1);
    else if (e.key === 'ArrowRight') updateCarousel(currentIndex + 1);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) updateCarousel(currentIndex + 1);
      else updateCarousel(currentIndex - 1);
    }
  }

  // Initialize
  updateCarousel(0);
});

// === Education Carousel Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('education-carousel');
  if (!carousel) return; // Exit if carousel doesn't exist on this page

  const carouselCells = document.querySelectorAll('#education-carousel li');
  const carouselDots = document.querySelectorAll('#carousel-dots li');
  const prevBtn = document.querySelector('#education-carousel-nav .carousel-nav.prev');
  const nextBtn = document.querySelector('#education-carousel-nav .carousel-nav.next');
  let currentIndex = 0;

  // Only run if carousel exists
  if (carouselCells.length === 0) return;

  function updateCarousel() {
    // Remove all item classes from all cards
    carouselCells.forEach(card => {
      card.className = 'education-card'; // Reset to base class
    });

    // Apply positioning based on current index
    carouselCells.forEach((card, index) => {
      let position = index - currentIndex;
      
      // Wrap around for circular behavior
      if (position < -1) position += carouselCells.length;
      if (position > 1) position -= carouselCells.length;

      // Apply item classes based on position
      if (position === 0) {
        card.classList.add('item-1', 'featured'); // Center card gets featured class
      } else if (position === 1) {
        card.classList.add('item-2'); // Right
      } else if (position === -1) {
        card.classList.add('item-3'); // Left
      } else {
        card.classList.add('item-hidden'); // Hidden
      }
    });

    // Update dots
    carouselDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    console.log('Carousel updated to index:', currentIndex);
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % carouselCells.length;
      updateCarousel();
      console.log('Next clicked, index now:', currentIndex);
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + carouselCells.length) % carouselCells.length;
      updateCarousel();
      console.log('Prev clicked, index now:', currentIndex);
    });
  }

  // Card clicks
  carouselCells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => {
      // Don't trigger if clicking on button
      if (e.target.classList.contains('card-btn') || e.target.closest('.card-btn')) {
        return;
      }
      currentIndex = index;
      updateCarousel();
    });
  });

  // Prevent button clicks from triggering card click
  const cardButtons = document.querySelectorAll('.education-card .card-btn');
  cardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Add your button action here
      console.log('Button clicked');
    });
  });

  // Pagination dots
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      updateCarousel();
    });
  });

  // Left/Right arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) { // Left arrow
      currentIndex = (currentIndex - 1 + carouselCells.length) % carouselCells.length;
      updateCarousel();
      e.preventDefault();
    } else if (e.keyCode === 39) { // Right arrow
      currentIndex = (currentIndex + 1) % carouselCells.length;
      updateCarousel();
      e.preventDefault();
    }
  });

  // Initialize
  updateCarousel();
  console.log('Education carousel initialized with', carouselCells.length, 'cards');

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swipe right - previous
          currentIndex = (currentIndex - 1 + carouselCells.length) % carouselCells.length;
        } else {
          // Swipe left - next
          currentIndex = (currentIndex + 1) % carouselCells.length;
        }
        updateCarousel();
      }
    }, { passive: true });
  }
});

// === Career Page Split Screen Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const fulltimeBtn = document.getElementById('fulltimeBtn');
  const internshipBtn = document.getElementById('internshipBtn');
  const fulltimeForm = document.getElementById('fulltimeForm');
  const internshipForm = document.getElementById('internshipForm');
  const closeFulltimeForm = document.getElementById('closeFulltimeForm');
  const closeInternshipForm = document.getElementById('closeInternshipForm');

  // Exit if not on career page
  if (!fulltimeBtn || !internshipBtn) return;

  // Fulltime Apply Now - toggle form on right
  fulltimeBtn.addEventListener('click', () => {
    // Toggle fulltime form
    fulltimeForm.classList.toggle('active');
    // Close internship form if open
    internshipForm.classList.remove('active');
  });

  // Internship Apply Now - toggle form on left
  internshipBtn.addEventListener('click', () => {
    // Toggle internship form
    internshipForm.classList.toggle('active');
    // Close fulltime form if open
    fulltimeForm.classList.remove('active');
  });

  // Close Fulltime Form
  closeFulltimeForm.addEventListener('click', () => {
    fulltimeForm.classList.remove('active');
  });

  // Close Internship Form
  closeInternshipForm.addEventListener('click', () => {
    internshipForm.classList.remove('active');
  });

  // Form submissions
  const careerForms = document.querySelectorAll('.career-form');
  careerForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(e.target);
      
      // Simple validation passed - show success message
      alert('Terima kasih! Permohonan anda telah diterima. Kami akan menghubungi anda tidak lama lagi.');
      
      // Reset form and close overlay
      e.target.reset();
      fulltimeForm.classList.remove('active');
      internshipForm.classList.remove('active');
      
      // Here you can add actual form submission logic
      // e.g., send to Google Sheets, backend API, etc.
    });
  });

  // Close form when clicking outside
  fulltimeForm.addEventListener('click', (e) => {
    if (e.target === fulltimeForm) {
      fulltimeForm.classList.remove('active');
    }
  });

  internshipForm.addEventListener('click', (e) => {
    if (e.target === internshipForm) {
      internshipForm.classList.remove('active');
    }
  });

  // ESC key to close forms
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fulltimeForm.classList.remove('active');
      internshipForm.classList.remove('active');
    }
  });
});

// Parallax scroll effects for corporate shapes
    window.addEventListener('scroll', () => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      const navbar = document.querySelector('#navbar');
      const welcomeSection = document.querySelector('#welcome-section');
      const shapes = document.querySelectorAll('.shape');

      // Navbar background on scroll
      if (scrollPos + 100 >= window.innerHeight) {
        navbar.classList.add('bg-active');
      } else {
        navbar.classList.remove('bg-active');
      }

      // Parallax shapes effect
      shapes.forEach((shape, index) => {
        if (scrollPos <= window.innerHeight) {
          const speed = 0.3 + (index * 0.1);
          shape.style.transform = `translateY(${scrollPos * speed}px) ${index === 1 ? 'rotate(45deg)' : ''}`;
        }
      });

      // Hide welcome section when scrolled past
      if (welcomeSection) {
        if (scrollPos - 100 <= window.innerHeight) {
          welcomeSection.style.visibility = 'visible';
        } else {
          welcomeSection.style.visibility = 'hidden';
        }
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Intersection Observer for business items animation
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all business items
    document.querySelectorAll('.business-item').forEach(item => {
      observer.observe(item);
    });

    // Add hover animation to cards
    const cards = document.querySelectorAll('.experience-card, .business-item');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 300ms cubic-bezier(0.77, 0, 0.175, 1)';
      });
    });