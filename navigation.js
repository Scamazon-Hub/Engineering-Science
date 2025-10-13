document.addEventListener('DOMContentLoaded', () => {
    const NAV_ITEMS = [
        // General
        { href: 'index.html', label: '🏠 Home', category: 'general' },
        { href: 'units.html', label: '📐 Units & Notation', category: 'general' },

        // Core Mathematics
        { href: 'core-algebra.html', label: '➗ Core Algebra', category: 'core-math' },
        { href: 'linear-methods.html', label: '📊 Linear Methods', category: 'core-math' },
        { href: 'sine-wave-fundamentals.html', label: '🌊 Sine Wave Fundamentals', category: 'core-math' },
        { href: 'trigonometry.html', label: '📐 Trigonometry', category: 'core-math' },
        { href: 'vectors.html', label: '➡️ Vectors', category: 'core-math' },
        { href: 'sine-cosine-calculus.html', label: '📈 Sine/Cosine Calculus', category: 'core-math' },

        // Calculus
        { href: 'calculus-fundamentals.html', label: '📚 Calculus Fundamentals', category: 'calculus' },
        { href: 'advanced-calculus.html', label: '⚡ Advanced Calculus', category: 'calculus' },
        { href: 'rate-of-change.html', label: '📈 Rate of Change', category: 'calculus' },
        { href: 'chainrule.html', label: '⛓️ Chain Rule', category: 'calculus' },
        { href: 'differential-equations.html', label: '⛓️ Differential Equations', category: 'calculus' },
        { href: 'inverse-trig-derivatives.html', label: '🔄 Inverse Trig Derivatives', category: 'calculus' },
        { href: 'higher-order-differentiation.html', label: '🔄 Higher-Order Differentiation', category: 'calculus' },
        { href: 'turning_points.html', label: '📊 Max/Min Turning Points', category: 'calculus' },
        { href: 'quotient-rule.html', label: '➗ Quotient Rule', category: 'calculus' },
        { href: 'exponential-calculus.html', label: '📈 Exponential Calculus', category: 'calculus' },
        { href: 'max-min.html', label: '📈 Maximum and Minimum', category: 'calculus' },

        // Applied & Specialized Topics
        { href: 'ac-circuits-analysis.html', label: '⚡ AC Circuit Analysis', category: 'applied' },
        { href: 'applied-mechanics.html', label: '⚙️ Applied Mechanics', category: 'applied' },
        { href: 'economics.html', label: '💰 Financial Economics', category: 'applied' },
        { href: 'numerical-methods.html', label: '🔢 Numerical Methods', category: 'applied' },
        { href: 'statistics.html', label: '📊 Statistics', category: 'applied' },

        // Statistics
        { href: 'statistical-methods-1.html', label: 'Stats1', category: 'applied' },
        { href: 'statistical-methods-2.html', label: 'Stats2', category: 'applied' },
        { href: 'statistical-methods-3.html', label: 'Stats3', category: 'applied' },
        { href: 'statistical-methods-4.html', label: 'Stats4', category: 'applied' },
        { href: 'statistical-methods-5.html', label: 'Stats5', category: 'applied' }
    ];

    const CATEGORIES = {
        'general': { label: 'General', icon: '📁' },
        'core-math': { label: 'Core Mathematics', icon: '🧮' },
        'calculus': { label: 'Calculus', icon: '📚' },
        'applied': { label: 'Applied Topics', icon: '⚡' }
    };

    const placeholder = document.getElementById('navigation-placeholder');
    if (!placeholder) return;

    const currentPath = normalizePath(location.pathname);

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main Navigation');

    // Create header
    const header = document.createElement('div');
    header.className = 'nav-header';

    const h2 = document.createElement('h2');
    h2.textContent = '📚 HNC Mathematics';
    header.appendChild(h2);

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Complete Reference Guide';
    subtitle.className = 'nav-subtitle';
    header.appendChild(subtitle);

    nav.appendChild(header);

    // Group items by category
    const categorizedItems = {};
    Object.keys(CATEGORIES).forEach(cat => {
        categorizedItems[cat] = NAV_ITEMS.filter(item => item.category === cat);
    });

    // Create category sections
    Object.entries(CATEGORIES).forEach(([catKey, catInfo]) => {
        const items = categorizedItems[catKey];
        if (items.length === 0) return;

        const section = document.createElement('div');
        section.className = 'nav-section';

        const sectionHeader = document.createElement('h3');
        sectionHeader.innerHTML = `${catInfo.icon} ${catInfo.label}`;
        section.appendChild(sectionHeader);

        const ul = document.createElement('ul');

        items.forEach(({ href, label }) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href;
            a.innerHTML = label;

            const itemPath = normalizePath(new URL(href, location.href).pathname);
            if (itemPath === currentPath) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        section.appendChild(ul);
        nav.appendChild(section);
    });

    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'nav-search';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search topics...';
    searchInput.className = 'search-input';

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allLinks = nav.querySelectorAll('a');

        allLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                link.parentElement.style.display = 'block';
                // Highlight matching section
                link.closest('.nav-section').style.display = 'block';
            } else {
                link.parentElement.style.display = 'none';
            }
        });

        // Hide empty sections
        document.querySelectorAll('.nav-section').forEach(section => {
            const visibleLinks = section.querySelectorAll('li[style=""]', 'li:not([style*="display: none"])');
            if (visibleLinks.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });

    searchContainer.appendChild(searchInput);
    nav.insertBefore(searchContainer, nav.children[1]); // Insert after header

    placeholder.replaceChildren(nav);

    function normalizePath(pathname) {
        let p = pathname.replace(/\/index\.html?$/i, '/');
        if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
        return p;
    }
});
