(function () {
    var toggle = document.querySelector('.sidebar-toggle');
    var layout = document.querySelector('.admin-layout');
    var sidebar = document.querySelector('.admin-sidebar');
    if (!toggle || !layout || !sidebar) return;

    function setMobileOpen(open) {
        if (open) {
            layout.classList.add('sidebar-open');
            toggle.setAttribute('aria-expanded', 'true');
            var first = sidebar.querySelector('nav a');
            if (first) first.focus();
        } else {
            layout.classList.remove('sidebar-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    }

    function toggleDesktopCollapsed() {
        var collapsed = layout.classList.contains('sidebar-collapsed');
        if (collapsed) {
            layout.classList.remove('sidebar-collapsed');
            toggle.setAttribute('aria-expanded', 'true');
            sidebar.setAttribute('aria-hidden', 'false');
            // restore focusability
            sidebar.querySelectorAll('a,button,input').forEach(function (el) { el.removeAttribute('tabindex'); });
        } else {
            layout.classList.add('sidebar-collapsed');
            toggle.setAttribute('aria-expanded', 'false');
            sidebar.setAttribute('aria-hidden', 'true');
            // remove from keyboard order
            sidebar.querySelectorAll('a,button,input').forEach(function (el) { el.setAttribute('tabindex', '-1'); });
        }
    }

    toggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 880) {
            // mobile behavior: overlay panel
            var open = layout.classList.contains('sidebar-open');
            setMobileOpen(!open);
        } else {
            // desktop: collapse/expand sidebar
            toggleDesktopCollapsed();
        }
    });

    // close sidebar when clicking a nav link on small screens
    sidebar.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (!a) return;
        if (window.innerWidth <= 880) setMobileOpen(false);
    });
})();
