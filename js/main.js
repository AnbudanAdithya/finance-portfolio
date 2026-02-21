// ── PROJECT DATA ──────────────────────────────────────────────
// Add or remove projects here — cards are auto-generated
const projects = [
     {
        icon: '💰',
        title: 'NPV, IRR and Payback Period Model',
        description: 'Interactive business investment model with Simple & Discounted Payback Period, NPV, IRR, and Sensitivity Analysis. Handles multi-year investment outlays.',
        tags: ['Python', 'Excel', 'DCF', 'IRR'],
        status: 'In Progress',
        year: '2024'
    },
    {
        icon: '📊',
        title: 'Portfolio Optimization Model',
        description: 'Built using Modern Portfolio Theory (MPT) to find the optimal asset allocation. Includes Efficient Frontier, Max Sharpe Ratio, and Minimum Variance portfolios.',
        tags: ['Python', 'NumPy', 'Monte Carlo', 'MPT'],
        status: 'Coming Soon',
        year: '2026'
    },
    {
        icon: '📈',
        title: 'DCF Valuation Model',
        description: 'Discounted Cash Flow model for equity valuation using real company financials. Includes scenario analysis and sensitivity tables.',
        tags: ['Excel', 'Valuation', 'DCF', 'Finance'],
        status: 'Coming Soon',
        year: '2026'
    },
    {
        icon: '🏦',
        title: 'LBO Model',
        description: 'Leveraged Buyout model simulating a private equity acquisition with full debt schedules, returns analysis, IRR and MOIC outputs.',
        tags: ['Excel', 'Private Equity', 'LBO', 'IRR'],
        status: 'Coming Soon',
        year: '2026'
    },
]

// ── INJECT PROJECT CARDS ──────────────────────────────────────
function renderProjects() {
    const grid = document.getElementById('projects-grid')
    grid.innerHTML = ''

    projects.forEach(p => {
        const statusColor = p.status === 'Completed'    ? '#00e599' 
                          : p.status === 'In Progress'  ? '#f0c040' 
                          : '#ffffff'

        const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('')

        grid.innerHTML += `
            <div class="project-card">
                <div class="project-icon">${p.icon}</div>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tags">${tags}</div>
                <div class="project-footer">
                    <span style="color:${statusColor}; font-weight:600;">● ${p.status}</span>
                    <span>${p.year}</span>
                </div>
            </div>
        `
    })
}

// ── ANIMATE STATS COUNTER ─────────────────────────────────────
// Counts up from 0 to target number on page load
function animateCounter(id, target, duration = 1500) {
    const el = document.getElementById(id)
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
    animateCounter('stat-projects', projects.length)
    animateCounter('stat-models', 8)
    animateCounter('stat-tools', 5)
    initNavbar()
    initScrollSpy()
})