// Banner promos
(function () {
    var slider = document.querySelector('[data-hero-slider]');
    if (!slider) return;

    var track = slider.querySelector('.banner-promos-track');
    var cards = Array.from(track.children);
    if (!cards.length) return;

    var prevBtn = slider.querySelector('[data-hero-direction="prev"]');
    var nextBtn = slider.querySelector('[data-hero-direction="next"]');
    var dotsContainer = slider.querySelector('[data-hero-dots]');
    var dots = [];
    var currentIndex = 0;
    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    var timer = null;
    var delay = 5000;

    function getVisibleCount() {
        return window.innerWidth >= 1100 ? 2 : 1;
    }

    function maxIndex() {
        return Math.max(cards.length - getVisibleCount(), 0);
    }

    function clamp(index) {
        var max = maxIndex();
        if (index < 0) return max;
        if (index > max) return 0;
        return index;
    }

    function updateDots() {
        if (!dots.length) return;
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
            dot.disabled = i === currentIndex;
        });
    }

    function updateSlider() {
        var cardWidth = cards[0].getBoundingClientRect().width;
        var offset = currentIndex * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        updateDots();
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function start() {
        stop();
        if (maxIndex() <= 0) return;
        timer = setInterval(function () {
            currentIndex = clamp(currentIndex + 1);
            updateSlider();
        }, delay);
    }

    function buildDots() {
        if (!dotsContainer) return;
        var max = maxIndex();
        dotsContainer.innerHTML = '';
        if (max <= 0) {
            dots = [];
            dotsContainer.classList.add('is-hidden');
            stop();
            return;
        }
        dotsContainer.classList.remove('is-hidden');
        for (var i = 0; i <= max; i++) {
            (function (page) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'hero-dot' + (page === currentIndex ? ' active' : '');
                dot.dataset.page = page;
                dot.setAttribute('aria-label', 'Trang ' + (page + 1));
                dot.addEventListener('click', function () {
                    currentIndex = clamp(page);
                    updateSlider();
                    start();
                });
                dotsContainer.appendChild(dot);
            })(i);
        }
        dots = Array.from(dotsContainer.children);
        updateDots();
        start();
    }

    function handleResize() {
        gap = parseFloat(getComputedStyle(track).gap) || 0;
        currentIndex = clamp(currentIndex);
        buildDots();
        updateSlider();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex = clamp(currentIndex - 1);
            updateSlider();
            start();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentIndex = clamp(currentIndex + 1);
            updateSlider();
            start();
        });
    }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    window.addEventListener('resize', handleResize);

    buildDots();
    updateSlider();
})();

// Featured devices
(function () {
    var slider = document.querySelector('[data-slider]');
    if (!slider) return;

    var track = slider.querySelector('.device-track');
    var cards = Array.from(track.children);
    if (!cards.length) return;

    var prevBtn = slider.querySelector('.slider-btn[data-direction="prev"]');
    var nextBtn = slider.querySelector('.slider-btn[data-direction="next"]');
    var dotsContainer = slider.querySelector('[data-slider-dots]');
    var dots = [];
    var currentIndex = 0;
    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    var timer = null;
    var delay = 6000;

    function getVisibleCount() {
        if (window.innerWidth >= 1100) return 4;
        if (window.innerWidth >= 700) return 2;
        return 1;
    }

    function maxIndex() {
        return Math.max(cards.length - getVisibleCount(), 0);
    }

    function clamp(index) {
        var max = maxIndex();
        if (index < 0) return max;
        if (index > max) return 0;
        return index;
    }

    function updateDots() {
        if (!dots.length) return;
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
            dot.disabled = i === currentIndex;
        });
    }

    function updateSlider() {
        var cardWidth = cards[0].getBoundingClientRect().width;
        var offset = currentIndex * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        updateDots();
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function start() {
        stop();
        if (maxIndex() <= 0) return;
        timer = setInterval(function () {
            currentIndex = clamp(currentIndex + 1);
            updateSlider();
        }, delay);
    }

    function buildDots() {
        if (!dotsContainer) return;
        var max = maxIndex();
        dotsContainer.innerHTML = '';
        if (max <= 0) {
            dots = [];
            dotsContainer.classList.add('is-hidden');
            stop();
            return;
        }
        dotsContainer.classList.remove('is-hidden');
        for (var i = 0; i <= max; i++) {
            (function (page) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'slider-dot' + (page === currentIndex ? ' active' : '');
                dot.dataset.page = page;
                dot.setAttribute('aria-label', 'Trang ' + (page + 1));
                dot.addEventListener('click', function () {
                    currentIndex = clamp(page);
                    updateSlider();
                    start();
                });
                dotsContainer.appendChild(dot);
            })(i);
        }
        dots = Array.from(dotsContainer.children);
        updateDots();
        start();
    }

    function handleResize() {
        gap = parseFloat(getComputedStyle(track).gap) || 0;
        currentIndex = clamp(currentIndex);
        buildDots();
        updateSlider();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex = clamp(currentIndex - 1);
            updateSlider();
            start();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentIndex = clamp(currentIndex + 1);
            updateSlider();
            start();
        });
    }

    window.addEventListener('resize', handleResize);
    buildDots();
    updateSlider();
})();

(function () {
    var menu = document.querySelector('[data-category-menu]');
    if (!menu) return;

    var toggleBtn = menu.querySelector('[data-category-toggle]');
    var panel = menu.querySelector('[data-category-panel]');
    if (!toggleBtn || !panel) return;

    toggleBtn.addEventListener('click', function () {
        panel.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target)) {
            panel.classList.remove('show');
        }
    });
})();

(function () {
    var groups = document.querySelectorAll('[data-pagination]');
    groups.forEach(function (control) {
        var target = control.dataset.pagination;
        var container = document.querySelector('[data-paginated="' + target + '"]');
        if (!container) return;

        var pages = Array.from(container.querySelectorAll('.device-page'));
        var buttons = Array.from(control.querySelectorAll('button[data-page]'));

        function activate(index) {
            pages.forEach(function (page, i) {
                page.classList.toggle('is-active', i === index);
            });
            buttons.forEach(function (btn, i) {
                btn.classList.toggle('active', i === index);
                btn.disabled = i === index;
            });
        }

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var index = parseInt(btn.dataset.page, 10);
                if (!Number.isNaN(index)) {
                    activate(index);
                }
            });
        });

        activate(0);
    });
})();
