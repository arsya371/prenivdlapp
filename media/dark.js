function initDarkMode() {
   const darkModeToggle = document.getElementById('darkModeToggle');
   const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
   const htmlElement = document.documentElement;
   const savedTheme = localStorage.getItem('theme');
   if (savedTheme === 'light') {
      htmlElement.classList.remove('dark');
   } else {
      htmlElement.classList.add('dark');
   }

   function toggleDarkMode() {
      htmlElement.classList.toggle('dark');
      const isDark = htmlElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
   }
   if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
   }
   if (darkModeToggleMobile) {
      darkModeToggleMobile.addEventListener('click', toggleDarkMode);
   }
   document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'd') {
         e.preventDefault();
         toggleDarkMode();
      }
   });
}

function scrolling() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
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
   window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      let current = '';
      sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;
         if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
         }
      });
      navLinks.forEach(link => {
         link.classList.remove('font-bold', 'text-blue-800', 'dark:text-blue-300');
         if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('font-bold', 'text-blue-800', 'dark:text-blue-300');
         }
      });
   });
}
document.addEventListener('contextmenu', function(e) {
   if (!e.target.closest('input, textarea')) e.preventDefault();
});
document.addEventListener('keydown', function(e) {
   const key = e.key.toUpperCase();
   if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) || (e.ctrlKey && ['U', 'S', 'P'].includes(key))) {
      e.preventDefault();
   }
});
setInterval(function() {
   const before = performance.now();
   debugger;
   const after = performance.now();
   if (after - before > 100) window.location.href = 'about:blank';
}, 1000);
if (window.location.href.includes("chrome-extension://") || window.location.protocol === 'chrome-extension:') {
   window.location.href = "about:blank";
}
let devtoolsOpened = false;
const threshold = 160;
setInterval(() => {
   if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
      if (!devtoolsOpened) {
         devtoolsOpened = true;
         window.location.href = 'about:blank';
      }
   }
}, 1000);
document.addEventListener('selectstart', (e) => {
   if (!e.target.closest('input, textarea')) e.preventDefault();
});
document.addEventListener('dragstart', (e) => e.preventDefault());
if (document.documentElement.outerHTML.includes('<html')) {
   //window.location.href = 'about:blank';
}
document.addEventListener('DOMContentLoaded', () => {
   initDarkMode();
   scrolling();
});
