// Inizializza librerie quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons
  try {
    if (window.lucide) lucide.createIcons();
  } catch (error) {
    console.error('Errore nell\'inizializzazione di Lucide:', error);
  }

  // AOS (Animate On Scroll)
  try {
    if (window.AOS) {
      AOS.init({
        duration: 700, // durata animazioni
        once: true,    // le animazioni avvengono una sola volta
        offset: 50     // offset dal viewport
      });
    }
  } catch (error) {
    console.error('Errore nell\'inizializzazione di AOS:', error);
  }

  // Menu mobile
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuButton) return;
    mobileMenu.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-label', 'Apri menu di navigazione');
  }

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute(
        'aria-expanded',
        mobileMenu.classList.contains('hidden') ? 'false' : 'true'
      );
      mobileMenuButton.setAttribute('aria-label', mobileMenu.classList.contains('hidden') ? 'Apri menu di navigazione' : 'Chiudi menu di navigazione');
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
        mobileMenuButton.focus();
      }
    });
  }

  // Chiudi menu mobile dopo il click su un link
  const allNavLinks = document.querySelectorAll('#mobile-menu a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Lazy loading per le immagini
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback per browser che non supportano IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
});
