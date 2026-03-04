// ── PROJECT DATA ──────────────────────────────────────────────
const projects = [
     {
        icon: '💰',
        title: 'Payback Period Calculator',
        description: 'Interactive model to calculate payback period, discounted payback, for any cash flow stream. Built with Python, Excel and HTML',
        tags: ['Excel + VBA', 'DCF', 'Graphs'],
        status: 'Completed',
        year: '2026',
        link: 'HTML/payback.html',
        modelCount: 3,
        category: 'model' // ← Added Category
    },
    {
        icon: '📊',
        title: 'Portfolio Optimization Model',
        description: 'Built using Modern Portfolio Theory (MPT) to find the optimal asset allocation. Includes Efficient Frontier, Max Sharpe Ratio, and Minimum Variance portfolios.',
        tags: ['Python', 'NumPy', 'Monte Carlo', 'MPT','Graphs'],
        status: 'Coming Soon',
        year: '2026',
        link: null,
        modelCount: 4,
        category: 'model' // ← Added Category
    },
    {
        icon: '🩺',
        title: 'Apollo Hospitals Equity Research',
        description: 'A fundamental analysis report evaluating Apollo Hospitals, featuring industry analysis, financial performance ratios, relative valuation, and an investment recommendation.',
        tags: ['Equity Research', 'Fundamental Analysis', 'Valuation'],
        status: 'Completed',
        year: '2025',
        link: 'HTML/apollo.html', 
        modelCount: 0,
        category: 'research' // ← Added Category
    },
    {
        icon: '🚗',
        title: 'Tata Motors Financial Analysis',
        description: 'A comprehensive evaluation of Tata Motors\' financial health through income statements, balance sheets, cash flow trends, and core financial ratios.',
        tags: ['Financial Analysis', 'Ratio Analysis', 'Corporate Finance'],
        status: 'Completed',
        year: '2024',
        link: 'HTML/tata-motors.html', 
        modelCount: 0,
        category: 'research' // ← Added Category
    }
]

// ── INJECT PROJECT CARDS ──────────────────────────────────────
function renderProjects() {
    const modelsGrid = document.getElementById('models-grid')
    const researchGrid = document.getElementById('research-grid')
    
    if(modelsGrid) modelsGrid.innerHTML = ''
    if(researchGrid) researchGrid.innerHTML = ''

    projects.forEach(p => {
        const statusColor = p.status === 'Completed'   ? '#00e599'
                          : p.status === 'In Progress' ? '#f0c040'
                          : '#606070'

        const tags   = p.tags.map(t => `<span class="tag">${t}</span>`).join('')
        
        // Dynamically change button text based on category
        const buttonText = p.category === 'research' ? 'View Report →' : 'Open Model →'
        
        const button = p.link
            ? `<a href="${p.link}" class="btn-primary" style="font-size:0.85rem; padding:8px 20px;">
                   ${buttonText}
               </a>`
            : `<span style="font-size:0.82rem; color:var(--text-muted); font-style:italic;">
                   Coming Soon
               </span>`

        const cardHTML = `
                <div class="project-card" ${!p.link ? 'style="opacity:0.65; cursor:not-allowed;"' : ''}>
                <div class="project-icon">${p.icon}</div>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tags">${tags}</div>
                <div class="project-footer">
                    <span style="color:${statusColor}; font-weight:600;">● ${p.status}</span>
                    <span>${p.year}</span>
                </div>
                <div style="margin-top:1.2rem;">
                    ${button}
                </div>
            </div>
        `

        // Inject into the correct section
        if (p.category === 'model' && modelsGrid) {
            modelsGrid.innerHTML += cardHTML
        } else if (p.category === 'research' && researchGrid) {
            researchGrid.innerHTML += cardHTML
        }
    })
}

// ── ANIMATE STATS COUNTER ─────────────────────────────────────
// Counts up from 0 to target number on page load
function animateCounter(id, target, duration = 1500) {
    const el = document.getElementById(id)
    if (!el) return                        // ← Add this guard
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
        current += step
        if (current >= target) {
            current = target
            clearInterval(timer)
        }
        el.textContent = Math.floor(current)
    }, 16)
}

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────────
// Adds shadow to navbar when user scrolls down
function initNavbar() {
    const navbar = document.getElementById('navbar')
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)'
        } else {
            navbar.style.boxShadow = 'none'
        }
    })
}

// ── SMOOTH ACTIVE NAV LINKS ───────────────────────────────────
// Highlights the nav link for whichever section is on screen
function initScrollSpy() {
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.nav-links a')

    window.addEventListener('scroll', () => {
        let current = ''
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 100) {
                current = s.getAttribute('id')
            }
        })
        navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${current}`
                ? 'var(--accent)'
                : 'var(--text-secondary)'
        })
    })
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderProjects()
    
    // 1. Calculate active projects (you can base this on the whole array, or just ones not "Coming Soon")
    const totalProjects = projects.length;
    
    // 2. Dynamically sum up the 'modelCount' from all projects
    const totalModels = projects.filter(p => p.status === 'Completed').length;
    
    // 3. Dynamically count unique tools from the 'tags' arrays
    // .flatMap puts all tags into one giant array, and 'new Set()' removes all duplicates!
    const uniqueToolsCount = new Set(projects.flatMap(p => p.tags)).size;

    // Trigger animations with the dynamic variables
    animateCounter('stat-projects', totalProjects)
    animateCounter('stat-models', totalModels)
    animateCounter('stat-tools', uniqueToolsCount)
    
    initNavbar()
    if (document.querySelectorAll('section').length > 1) {
        initScrollSpy()
    }

        const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // ── SCROLL TO TOP ─────────────────────────────────────────
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── FOOTER YEAR ───────────────────────────────────────────
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
})