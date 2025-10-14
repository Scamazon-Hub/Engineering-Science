document.addEventListener('DOMContentLoaded', () => {
    const NAV_ITEMS = [
        // General
        { href: 'index.html', label: '🏠 Home', category: 'general' },

        // Core Mechanical Principles
        { href: '#', label: '⚙️ Statics & Dynamics', category: 'core' },
        { href: '#', label: '🔬 Materials Science', category: 'core' },
        { href: '#', label: '🔥 Thermodynamics', category: 'core' },
        { href: '#', label: '💧 Fluid Mechanics', category: 'core' },

        // Applied Engineering Topics
        { href: '#', label: '🔩 Solid Mechanics', category: 'applied' },
        { href: '#', label: '🕹️ Control Systems', category: 'applied' },
        { href: '#', label: '⚡ Electrical Principles', category: 'applied' },
        
        // Advanced Topics
        { href: '#', label: '📈 Engineering Mathematics', category: 'advanced' },
    ];

    const CATEGORIES = {
        'general': { label: 'General', icon: '📁' },
        'core': { label: 'Core Principles', icon: '📚' },
        'applied': { label: 'Applied Engineering', icon: '⚙️' },
        'advanced': { label: 'Advanced Topics', icon: '⚡' }
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
    h2.textContent = '🔧 HNC Mechanical Engineering';
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
                link.closest('.nav-section').style.display = 'block';
            } else {
                link.parentElement.style.display = 'none';
            }
        });

        // Hide empty sections
        document.querySelectorAll('.nav-section').forEach(section => {
            const visibleLinks = section.querySelectorAll('li:not([style*="display: none"])');
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
