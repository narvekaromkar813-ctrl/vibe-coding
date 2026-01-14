document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // Confetti Animation
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#900C3F', '#A0C878', '#DDEB9D', '#FAF6E9', '#FFC107'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 3 + 1;
            this.angle = Math.random() * 2 * Math.PI;
            this.spin = Math.random() * 0.2 - 0.1;
        }

        update() {
            this.y += this.speed;
            this.angle += this.spin;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function initConfetti() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Wish Button
    const wishBtn = document.getElementById('wishBtn');
    if (wishBtn) {
        wishBtn.addEventListener('click', () => {
            alert('🎉 Thank you for your wishes! Happy Makar Sankranti! 🪁');
            // Burst more confetti or similar effect could go here
            for (let i = 0; i < 20; i++) {
                particles.push(new Particle());
            }
        });
    }

    // Mobile Menu Toggle (Simple)
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(toggle) {
        toggle.addEventListener('click', () => {
           // Toggle class for showing menu
           // For simplicity, just logging or toggling display type can be done via class
           // Ideally update CSS to show/hide based on a class 'active'
           navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
           if(navLinks.style.display === 'flex') {
               navLinks.style.flexDirection = 'column';
               navLinks.style.position = 'absolute';
               navLinks.style.top = '70px';
               navLinks.style.right = '20px';
               navLinks.style.background = 'white';
               navLinks.style.padding = '1rem';
               navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
               navLinks.style.borderRadius = '10px';
           } else {
               navLinks.style.boxShadow = 'none';
           }
        });
    }
});
