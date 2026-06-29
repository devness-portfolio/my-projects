document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const currentYearSpan = document.getElementById('current-year');
  const donateButton = document.getElementById('donate-button');

  // Mobile Menu Toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('menu-hidden');
      mobileMenu.classList.toggle('menu-visible');
      // Optional: Change button icon (hamburger/close)
      // Add accessibility attributes (aria-expanded) if desired
    });
  }

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Donate Button Action (Placeholder for now)
  if (donateButton) {
    donateButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      alert(
        'Donation functionality (e.g., redirecting to Zelle) will be implemented later.'
      );
      // Later, this could redirect or open a modal:
      // window.location.href = 'YOUR_ZELLE_LINK_OR_INFO_PAGE';
    });
  }

  // Optional: Close mobile menu if clicking outside of it
  document.addEventListener('click', (event) => {
    if (
      mobileMenu &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      if (mobileMenu.classList.contains('menu-visible')) {
        mobileMenu.classList.remove('menu-visible');
        mobileMenu.classList.add('menu-hidden');
      }
    }
  });

  // Optional: Highlight active nav link based on URL (Simple version)
  const navLinks = document.querySelectorAll('header nav ul li a'); // Desktop links
  const mobileNavLinks = document.querySelectorAll('#mobile-menu ul li a'); // Mobile links
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Get current file name

  const setActiveLink = (links) => {
    links.forEach((link) => {
      const linkPage =
        link.getAttribute('href').split('/').pop() || 'index.html';

      // Remove active styles from all links first (adjust classes as needed)
      link.classList.remove(
        'border-b-2',
        'border-green-600',
        'pb-1',
        'bg-green-50'
      );

      // Add active styles to the matching link
      if (linkPage === currentPage) {
        if (link.closest('#mobile-menu')) {
          // Mobile link styling
          link.classList.add('bg-green-50');
        } else {
          // Desktop link styling
          link.classList.add('border-b-2', 'border-green-600', 'pb-1');
          link.classList.add('text-green-600'); // Make sure active link is visually distinct
          link.classList.remove('text-gray-600');
        }
      } else {
        if (!link.closest('#mobile-menu')) {
          // Ensure non-active desktop links have default color
          link.classList.add('text-gray-600');
          link.classList.remove('text-green-600');
        }
      }
    });
  };

  setActiveLink(navLinks);
  setActiveLink(mobileNavLinks);
});
