// ==================== 
// Particles Animation
// ====================

function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 245, 255, 0.8), transparent);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;

        container.appendChild(particle);
    }
}

// ==================== 
// Navigation Scroll Effect
// ====================

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==================== 
// Active Navigation Link
// ====================

const sections = document.querySelectorAll('.section, .hero-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== 
// Smooth Scrolling
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 
// Counter Animation
// ====================

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const isDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== 
// Intersection Observer for Animations
// ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate counters when stat cards become visible
            if (entry.target.classList.contains('stat-card')) {
                const counter = entry.target.querySelector('.stat-number');
                // Only animate if it has a data-count attribute (numeric values)
                if (counter && !counter.classList.contains('animated') && counter.hasAttribute('data-count')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that should fade in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.experience-item, .project-card, .contact-item, .stat-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ==================== 
// Text Glitch Effect (Subtle)
// ====================

function glitchEffect() {
    const glitchElements = document.querySelectorAll('.text-glitch');

    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const originalText = element.textContent;
            const glitchChars = '!@#$%^&*()';
            let iterations = 0;

            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');

                iterations += 1 / 3;

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
            }, 30);
        });
    });
}

// ==================== 
// Cursor Glow Effect
// ====================

function createCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// ==================== 
// Initialize Everything
// ====================

window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    glitchEffect();
    createCursorGlow();

    // Add initial fade-in class to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Trigger fade-in after a short delay
    setTimeout(() => {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// ==================== 
// Performance Optimization
// ====================

// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler if needed for performance
const debouncedScroll = debounce(() => {
    // Additional scroll handlers can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==================== 
// Mobile Menu Toggle (if needed for future)
// ====================

// Placeholder for mobile menu functionality
// Can be expanded based on requirements

console.log('Portfolio initialized successfully! 🚀');
