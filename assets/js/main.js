// ========== ФУНКЦІЯ ДЛЯ ВІДОБРАЖЕННЯ TOAST ПОВІДОМЛЕННЯ ==========
// Показує спливаюче повідомлення при натисканні на кнопку "CONSULTATION"
function showConsultationToast() {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// ========== ФУНКЦІЯ ДЛЯ ПІДПИСКИ НА НОВИНИ ==========
// Валідує email та показує повідомлення про успішну підписку
function subscribeNewsletter() {
  const emailInput = document.getElementById('newsletterEmail');
  const email = emailInput?.value.trim();
  if (!email || !email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address');
    return;
  }
  alert(`✅ Successfully subscribed! (${email}) Thank you for joining.`);
  emailInput.value = '';
}

// ========== ГЛОБАЛЬНІ ЗМІННІ ДЛЯ ГРАФІКІВ ==========
let growthChart = null; // Лінійний графік зростання
let pieChart = null;    // Кругова діаграма

// ========== ІНІЦІАЛІЗАЦІЯ ГРАФІКІВ ==========
function initCharts() {
  const growthCanvas = document.getElementById('growthChart');
  const pieCanvas = document.getElementById('pieChartCanvas');
  
  // Створення лінійного графіку (показує зростання доходів)
  if (growthCanvas && !growthChart) {
    growthChart = new Chart(growthCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          data: [240, 310, 480, 520, 680, 790, 920, 980, 1150],
          borderColor: '#a78bfa',
          backgroundColor: 'rgba(167, 139, 250, 0.2)',
          borderWidth: 4,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 7,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#a78bfa'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e1a3a',
            titleColor: '#e9d5ff',
            bodyColor: '#d8b4fe',
            callbacks: { label: (ctx) => `💰 $${ctx.raw}k` }
          }
        },
        scales: {
          y: { 
            grid: { color: 'rgba(167, 139, 250, 0.1)' }, 
            ticks: { color: '#9ca3af', callback: (val) => '$' + val + 'k' } 
          },
          x: { 
            grid: { display: false }, 
            ticks: { color: '#a78bfa' } 
          }
        }
      }
    });
  }
  
  // Створення кругової діаграми (розподіл відсотків)
  if (pieCanvas && !pieChart) {
    pieChart = new Chart(pieCanvas, {
      type: 'pie',
      data: {
        labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        datasets: [{
          data: [28, 25, 22, 16, 9],
          backgroundColor: ['#8b5cf6', '#a78bfa', '#c026d3', '#6d28d9', '#4f46e5'],
          borderColor: '#120d24',
          borderWidth: 6,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#262254',
            callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` }
          }
        },
        animation: { 
          animateRotate: true, 
          duration: 1600, 
          easing: 'easeOutElastic' 
        }
      }
    });
  }
}

// ========== ОНОВЛЕННЯ КРУГОВОЇ ДІАГРАМИ ПРИ НАТИСКАННІ ==========
// Генерує випадкові дані та оновлює діаграму з анімацією
function setupRefreshPie() {
  const refreshBtn = document.getElementById('refreshPieBtn');
  if (!refreshBtn) return;
  
  refreshBtn.addEventListener('click', () => {
    if (pieChart) {
      // Генерація випадкових відсотків
      const randomData = [
        Math.floor(15 + Math.random() * 25),
        Math.floor(12 + Math.random() * 22),
        Math.floor(10 + Math.random() * 18),
        Math.floor(8 + Math.random() * 14),
        Math.floor(5 + Math.random() * 12)
      ];
      const total = randomData.reduce((a, b) => a + b, 0);
      const normalized = randomData.map(v => Math.round((v / total) * 100));
      pieChart.data.datasets[0].data = normalized;
      pieChart.update({ duration: 800, easing: 'easeOutBounce' });
      
      // Анімація кнопки оновлення
      refreshBtn.style.transform = 'rotate(180deg)';
      setTimeout(() => { refreshBtn.style.transform = ''; }, 400);
    }
  });
}

// ========== АНІМАЦІЯ ШАПКИ ПРИ ПРОКРУЧУВАННІ ==========
// Змінює прозорість фону шапки при скролі
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(15, 10, 44, 0.95)';
      header.style.backdropFilter = 'blur(16px)';
    } else {
      header.style.background = 'rgba(15, 10, 44, 0.85)';
      header.style.backdropFilter = 'blur(12px)';
    }
  });
}

// ========== НАВІГАЦІЯ МІЖ СЕКЦІЯМИ ==========
// Перемикає видимість секцій при кліку на пункти меню
function initNavigation() {
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const sections = {
    home: document.getElementById('home-section'),
    solutions: document.getElementById('solutions-section'),
    resources: document.getElementById('resources-section'),
    company: document.getElementById('company-section')
  };
  
  // Функція для показу вибраної секції
  function showSection(sectionId) {
    Object.values(sections).forEach(section => {
      if (section) section.style.display = 'none';
    });
    if (sections[sectionId]) {
      sections[sectionId].style.display = 'block';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Додаємо обробники подій для пунктів меню
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      const sectionId = this.getAttribute('data-section');
      if (sectionId && sections[sectionId]) {
        showSection(sectionId);
        localStorage.setItem('activeSection', sectionId); // Зберігаємо активну секцію
      }
    });
  });
  
  // Відновлюємо останню активну секцію після перезавантаження
  const savedSection = localStorage.getItem('activeSection');
  if (savedSection && sections[savedSection]) {
    showSection(savedSection);
    navLinks.forEach(link => {
      if (link.getAttribute('data-section') === savedSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// ========== ІНІЦІАЛІЗАЦІЯ МОБІЛЬНОГО МЕНЮ ==========
// Відкриття/закриття меню на мобільних пристроях
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('closeMobileNav');
  const overlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.desktop-nav a');
  
  if (!mobileMenuBtn || !mobileNav || !closeBtn || !overlay) {
    console.warn('Mobile menu elements not found');
    return;
  }
  
  function openMobileNav() {
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
  }
  
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  mobileMenuBtn.addEventListener('click', openMobileNav);
  closeBtn.addEventListener('click', closeMobileNav);
  overlay.addEventListener('click', closeMobileNav);
  
  // Закриття по клавіші Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });
  
  // Обробка кліків по посиланнях в мобільному меню
  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      closeMobileNav();
      
      mobileLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        // Ховаємо всі секції
        document.querySelectorAll('.page-section').forEach(section => {
          section.style.display = 'none';
        });
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) targetSection.style.display = 'block';
        
        // Оновлюємо активний стан в десктопному меню
        desktopLinks.forEach(deskLink => {
          deskLink.classList.remove('active');
          if (deskLink.getAttribute('data-section') === sectionId) {
            deskLink.classList.add('active');
          }
        });
        
        localStorage.setItem('activeSection', sectionId);
      }
    });
  });
}

// ========== ЗАПУСК ВСІХ ФУНКЦІЙ ПІСЛЯ ЗАВАНТАЖЕННЯ СТОРІНКИ ==========
document.addEventListener('DOMContentLoaded', () => {
  initCharts();          // Ініціалізуємо графіки
  setupRefreshPie();     // Налаштовуємо оновлення кругової діаграми
  initHeaderScroll();    // Додаємо анімацію шапки
  initNavigation();      // Налаштовуємо навігацію між секціями
  initMobileMenu();      // Налаштовуємо мобільне меню
  
  // Кнопка консультації
  const consultBtn = document.getElementById('consultationBtn');
  if (consultBtn) {
    consultBtn.addEventListener('click', showConsultationToast);
  }
  
  // Кнопка підписки на новини
  const subscribeBtn = document.getElementById('subscribeBtn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', subscribeNewsletter);
  }
  
  // Підписка по натисканню Enter у полі email
  const newsletterInput = document.getElementById('newsletterEmail');
  if (newsletterInput) {
    newsletterInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') subscribeNewsletter();
    });
  }
});
