// HorizonSec - Interactive JavaScript

// ================================
// Smooth Scroll for Navigation Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active nav link
            updateActiveNavLink(this);
        }
    });
});

// ================================
// Update Active Navigation Link
// ================================
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// ================================
// Scroll-based Active Link Update
// ================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.nav').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ================================
// Intersection Observer for Scroll Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe download options
document.querySelectorAll('.download-option').forEach((option, index) => {
    option.style.opacity = '0';
    option.style.transform = 'translateY(30px)';
    option.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(option);
});

// Observe stats
document.querySelectorAll('.stat').forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(stat);
});

// Observe contributor cards
document.querySelectorAll('.contributor-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// ================================
// Parallax Effect for Hero Background
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ================================
// Terminal Typing Animation Enhancement
// ================================
const terminalCommands = [
    'nmap -sV target.local',
    'metasploit -q',
    'aircrack-ng -w wordlist.txt',
    'sqlmap -u "http://target.com"',
    'hydra -L users.txt -P pass.txt'
];

let currentCommandIndex = 0;

function rotateTerminalCommand() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
        typingElement.textContent = terminalCommands[currentCommandIndex];
    }
}

// Rotate command every 6 seconds
setInterval(rotateTerminalCommand, 6000);

// ================================
// Add Glow Effect on Mouse Move (Greek-inspired)
// ================================
document.addEventListener('mousemove', (e) => {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, hsla(25, 85%, 55%, 0.1) 0%, transparent 70%);
        pointer-events: none;
        left: ${e.clientX - 150}px;
        top: ${e.clientY - 150}px;
        z-index: 9999;
        transition: opacity 0.3s;
        opacity: 0;
    `;

    document.body.appendChild(glow);

    setTimeout(() => {
        glow.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        glow.style.opacity = '0';
        setTimeout(() => glow.remove(), 300);
    }, 500);
});

// ================================
// Button Click Ripple Effect
// ================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// Counter Animation for Stats
// ================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valueElement = entry.target.querySelector('.stat-value');
            const text = valueElement.textContent;

            // Only animate if it's a number
            if (!isNaN(text) && text.trim() !== '') {
                const target = parseInt(text);
                animateCounter(valueElement, target);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ================================
// Greek Pattern Generator (Decorative)
// ================================
function createGreekPattern() {
    const patterns = ['◆', '◇', '▪', '▫', '●', '○'];
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const pattern = document.createElement('div');
            pattern.className = 'greek-pattern';
            pattern.textContent = patterns[index % patterns.length];
            pattern.style.cssText = `
                position: absolute;
                font-size: 10rem;
                color: hsla(30, 30%, 22%, 0.1);
                top: ${Math.random() * 50}%;
                ${Math.random() > 0.5 ? 'left' : 'right'}: 5%;
                pointer-events: none;
                user-select: none;
                animation: float 8s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
            `;
            section.appendChild(pattern);
        }
    });
}

createGreekPattern();

// ================================
// Navbar Background on Scroll
// ================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(18, 16, 15, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(18, 16, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// ================================
// Download Button Handlers
// ================================
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Create notification
        const notification = document.createElement('div');
        notification.textContent = 'Download will begin shortly...';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, hsl(25, 85%, 55%), hsl(25, 85%, 45%));
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 40px hsla(25, 85%, 55%, 0.3);
            z-index: 10000;
            animation: slideInFromRight 0.5s ease;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    });
});

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideStyle);

// ================================
// Console Easter Egg
// ================================
console.log('%c🔒 HorizonSec', 'font-size: 24px; font-weight: bold; color: #E67E22;');
console.log('%cArch-Based Penetration Testing OS', 'font-size: 14px; color: #F39C12;');
console.log('%cBuilt for security professionals who demand excellence.', 'font-size: 12px; color: #95A5A6;');
console.log('%c\n⚠️  Remember: Always obtain proper authorization before testing!', 'font-size: 12px; color: #E74C3C; font-weight: bold;');

// ================================
// Performance Optimization
// ================================
// Lazy load images if any are added
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('✅ HorizonSec website loaded successfully!');
