document.addEventListener('DOMContentLoaded', () => {
    const NAV_ITEMS = [
        // General
        { href: 'index.html', label: '🏠 Home', category: 'general' },
        { href: 'systems-of-units.html', label: 'Units & Systems', category: 'general' },
        { href: 'collecting-and-organising-data.html', label: '📊 Collecting Data', category: 'general' },

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

    // This logic correctly determines the current page to highlight it in the nav
    const currentPath = location.pathname.split('/').pop();

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main Navigation');

    const h2 = document.createElement('h2');
    h2.textContent = '🔧 HNC Engineering';
    nav.appendChild(h2);

    // Group items by category
    Object.entries(CATEGORIES).forEach(([catKey, catInfo]) => {
        const items = NAV_ITEMS.filter(item => item.category === catKey);
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

            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        section.appendChild(ul);
        nav.appendChild(section);
    });

    placeholder.replaceChildren(nav);
});