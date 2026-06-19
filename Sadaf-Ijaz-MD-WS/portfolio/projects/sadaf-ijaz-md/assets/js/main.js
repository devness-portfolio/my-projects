/**
 * main.js
 * Site orchestration entry point.
 */
document.addEventListener("DOMContentLoaded", () => {
  const navbarShrinker = new NavbarShrinker(".navbar", { threshold: 80 });
  const scrollSpy = new ScrollSpy(".nav-links a[href^='#']", { offset: 120 });
  const scrollManager = new ScrollManager([navbarShrinker, scrollSpy]);

  [
    new FooterYear(),
    new ExperienceYears(),
    new MobileNavigation(),
    new MotionPreferences(),
    new HeroVideoControl(),
    new HeroPetals(),
    new LogoScrollToTop(),
    scrollManager,
    new PortraitReveal(),
  ].forEach((feature) => {
    feature.start();
  });
});
