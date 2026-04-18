/* ── Intro Splash Screen Logic ───────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // Step 1: Show MGM for 1s, then trigger reveal
    setTimeout(() => {
        loader.classList.add('reveal-name');
    }, 1000);

    // Step 2: After reveal animation, slide whole loader up
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    }, 2800);

    // Step 3: Remove loader from DOM entirely after 4s (cleanup)
    setTimeout(() => {
        loader.style.display = 'none';
    }, 4000);
});

/* ── Typed.js ─────────────────────────────────────────────── */
const typed = new Typed('.typed-text', {
    strings: [
        'Passionate Web Developer',
        'UI / UX Designer',
        'Creative Thinker',
        'Lifelong Learner'
    ],
    typeSpeed: 65,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: false
});

/* ── Navbar scroll ───────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
});

/* ── Hamburger menu ──────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navbar    = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('open');
    // Animate bars
    const bars = hamburger.querySelectorAll('span');
    if (navbar.classList.contains('open')) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
});

navbar.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(b => {
            b.style.transform = ''; b.style.opacity = '';
        });
    });
});

/* ── Active nav link on scroll ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}

/* ── Reveal on scroll (IntersectionObserver) ─────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── Toast notification ──────────────────────────────────── */
function showToast(msg, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = msg;
    toast.className = `toast ${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

/* ── Contact form — opens mail client with message pre-filled ── */
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body    = encodeURIComponent(
        `Hi Mohith,\n\nYou received a message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent via Portfolio Contact Form`
    );

    // Open Gmail compose with all details pre-filled in To, Subject & Body
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=maridhu4@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailURL, '_blank');

    const btn = e.target.querySelector('button[type="submit"]');
    const origHTML = btn.innerHTML;
    btn.innerHTML = '<i class="bx bx-check"></i> Opening Mail...';
    btn.style.background = 'linear-gradient(135deg,#34d399,#22d3ee)';
    showToast('✅ Gmail opened with your message! Click Send in Gmail.', 'success');
    e.target.reset();

    setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.style.background = '';
    }, 3500);
});


/* ── Subtle parallax on hero image ──────────────────────── */
document.addEventListener('mousemove', e => {
    const wrap = document.querySelector('.profile-wrap');
    if (!wrap) return;
    const x = (e.clientX / window.innerWidth  - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    wrap.style.transform = `translate(${x}px, ${y}px)`;
});

/* ── Premium Background: Neural Aurora Network ─────────── */
(function initNeuralAurora() {
    const canvas = document.getElementById('particles-canvas');
    const ctx    = canvas.getContext('2d');

    // ── Configuration ─────────────────────────────────────────
    const WORDS = [
        'Mohith', 'MGM', 'Web Dev', 'UI Design', 'UX',
        'HTML5', 'CSS3', 'JavaScript', 'Responsive',
        'Video Editing', 'Photo Edit', 'Poster Design',
        'Thumbnail', 'Creative', 'Frontend', '9.31 CGPA',
        '</code>', '<dev/>', '{ innovation }'
    ];
    const COLORS   = ['#ff8c42', '#9b6ff7', '#4f9cf9', '#22d4ee'];
    const DOT_COUNT = 60;
    const MAX_DIST  = 160;

    let nodes = [];
    let words = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        spawnAll();
    }
    window.addEventListener('resize', resize);
    resize();

    function makeNode() {
        return {
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            vx:    (Math.random() - 0.5) * 0.35,
            vy:    (Math.random() - 0.5) * 0.35,
            r:     Math.random() * 1.5 + 0.5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.3 + 0.1,
            pulse: Math.random() * Math.PI * 2
        };
    }

    function makeWord(text) {
        return {
            text,
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            vx:    (Math.random() - 0.5) * 0.2,
            vy:    (Math.random() - 0.2) * 0.15,
            alpha: Math.random() * 0.06 + 0.03,
            size:  Math.random() * 6 + 10,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            angle: (Math.random() - 0.5) * 0.2
        };
    }

    function spawnAll() {
        nodes = Array.from({ length: DOT_COUNT }, makeNode);
        words = WORDS.map(makeWord);
    }

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Update and Draw Connections (Neural Mesh)
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            
            // Move nodes
            a.x += a.vx;
            a.y += a.vy;
            if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
            if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DIST) {
                    const lineAlpha = (1 - dist / MAX_DIST) * 0.2;
                    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                    grad.addColorStop(0, a.color);
                    grad.addColorStop(1, b.color);

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = grad;
                    ctx.globalAlpha = lineAlpha;
                    ctx.lineWidth   = 0.8;
                    ctx.stroke();
                }
            }
        }

        // 2. Draw Glowing Nodes
        nodes.forEach(n => {
            n.pulse += 0.02;
            const p = Math.sin(n.pulse) * 0.3 + 0.7;
            
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2);
            ctx.fillStyle = n.color;
            ctx.globalAlpha = n.alpha * p;
            ctx.fill();

            // Glow aura
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 8);
            g.addColorStop(0, n.color + '44');
            g.addColorStop(1, n.color + '00');
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 8, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.globalAlpha = n.alpha * 0.4;
            ctx.fill();
        });

        // 3. Draw Floating Skill Words
        words.forEach(w => {
            w.x += w.vx;
            w.y += w.vy;
            if (w.x < -150) w.x = canvas.width + 100;
            if (w.x > canvas.width + 150) w.x = -100;
            if (w.y < -50) w.y = canvas.height + 50;
            if (w.y > canvas.height + 50) w.y = -50;

            ctx.save();
            ctx.translate(w.x, w.y);
            ctx.rotate(w.angle);
            ctx.font = `600 ${w.size}px 'Space Grotesk', sans-serif`;
            ctx.fillStyle = w.color;
            ctx.globalAlpha = w.alpha;
            ctx.letterSpacing = '0.05em';
            ctx.fillText(w.text, 0, 0);
            ctx.restore();
        });

        requestAnimationFrame(tick);
    }
    tick();
})();


