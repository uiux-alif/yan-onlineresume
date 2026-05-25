/* ═══════════════════════════════════════════════
   Yan Abellino — Online Resume
   script.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Download Resume (print to PDF) ── */
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ── Active nav highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  /* ── Stack items: tooltip on touch devices ── */
  const stackItems = document.querySelectorAll('.stack-item');
  stackItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('title');
      if (title) {
        item.setAttribute('data-tooltip-visible', 'true');
        setTimeout(() => item.removeAttribute('data-tooltip-visible'), 1500);
      }
    });
  });

  /* ── Smooth entrance for right panel cards ── */
  const cards = document.querySelectorAll('.card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(card => cardObserver.observe(card));

  /* ── Copy email on click ── */
  const emailLinks = document.querySelectorAll('a[href^="mailto"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const email = link.getAttribute('href').replace('mailto:', '');
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          const original = link.textContent;
          link.textContent = 'Copied!';
          link.style.color = 'var(--accent)';
          setTimeout(() => {
            link.textContent = original;
            link.style.color = '';
          }, 1500);
        });
      }
    });
  });

});
