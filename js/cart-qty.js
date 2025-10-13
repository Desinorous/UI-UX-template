(function () {
    var cart = document.querySelector('.cart-wrapper');
    if (!cart) return;

    function parsePrice(str) {
        return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
    }

    function formatPrice(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
    }

    function updateLineTotal(row) {
        var unitCell = row.querySelector('.unit-price');
        var qtyInput = row.querySelector('.qty-input');
        var lineCell = row.querySelector('.line-total');
        if (!unitCell || !qtyInput || !lineCell) return;
        var unit = parsePrice(unitCell.textContent);
        var qty = parseInt(qtyInput.value, 10) || 0;
        var total = unit * qty;
        lineCell.textContent = formatPrice(total);
    }

    function updateTotalsSummary() {
        var rows = cart.querySelectorAll('tr[data-row]');
        var subtotal = 0;
        rows.forEach(function (r) {
            var lt = r.querySelector('.line-total');
            subtotal += parsePrice(lt.textContent);
        });
        var totals = document.querySelector('.cart-summary .totals');
        if (!totals) return;
        var spans = totals.querySelectorAll('span');
        var discount = 2000000; // sample
        var shipping = 0;
        var total = subtotal - discount + shipping;
        if (spans[0]) spans[0].textContent = 'Tạm tính: ' + formatPrice(subtotal);
        if (spans[1]) spans[1].textContent = 'Giảm giá: -' + formatPrice(discount) + ' (Flash Sale)';
        if (spans[2]) spans[2].textContent = 'Phí vận chuyển: ' + formatPrice(shipping);
        if (spans[3]) spans[3].innerHTML = '<strong>Tổng cộng: ' + formatPrice(total) + '</strong>';
    }

    var confirmOverlay = document.querySelector('.confirm-overlay');
    var rowPendingRemoval = null;

    function openConfirm(row) {
        rowPendingRemoval = row;
        if (confirmOverlay) {
            confirmOverlay.classList.add('show');
            confirmOverlay.setAttribute('aria-hidden', 'false');
            // focus the cancel button for accessibility
            var noBtn = confirmOverlay.querySelector('.confirm-no');
            if (noBtn) noBtn.focus();
        }
    }

    function closeConfirm() {
        rowPendingRemoval = null;
        if (confirmOverlay) {
            confirmOverlay.classList.remove('show');
            confirmOverlay.setAttribute('aria-hidden', 'true');
        }
    }

    // handle overlay clicks (outside card) to cancel
    if (confirmOverlay) {
        confirmOverlay.addEventListener('click', function (ev) {
            if (ev.target === confirmOverlay) closeConfirm();
        });
        // keyboard: escape to cancel
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' && confirmOverlay.classList.contains('show')) closeConfirm();
        });
        // action buttons
        var yes = confirmOverlay.querySelector('.confirm-yes');
        var no = confirmOverlay.querySelector('.confirm-no');
        if (yes) yes.addEventListener('click', function () {
            if (rowPendingRemoval && rowPendingRemoval.parentNode) {
                rowPendingRemoval.parentNode.removeChild(rowPendingRemoval);
                updateTotalsSummary();
            }
            closeConfirm();
        });
        if (no) no.addEventListener('click', function () { closeConfirm(); });
    }

    cart.addEventListener('click', function (e) {
        var qtyBtn = e.target.closest('.qty-btn');
        if (qtyBtn) {
            var action = qtyBtn.getAttribute('data-action');
            var row = qtyBtn.closest('tr[data-row]');
            if (!row) return;
            var input = row.querySelector('.qty-input');
            var current = parseInt(input.value, 10) || 0;
            if (action === 'increase') current++;
            if (action === 'decrease') current = Math.max(1, current - 1);
            input.value = current;
            updateLineTotal(row);
            updateTotalsSummary();
            return;
        }

        var removeBtn = e.target.closest('.remove-btn');
        if (removeBtn) {
            var row = removeBtn.closest('tr[data-row]');
            if (!row) return;
            // open confirmation modal instead of immediate removal
            openConfirm(row);
            return;
        }
    });

    cart.addEventListener('change', function (e) {
        if (e.target.classList && e.target.classList.contains('qty-input')) {
            var input = e.target;
            var val = parseInt(input.value, 10) || 1;
            if (val < 1) val = 1;
            input.value = val;
            var row = input.closest('tr[data-row]');
            if (row) updateLineTotal(row);
            updateTotalsSummary();
        }
    });

    // initialize
    document.querySelectorAll('tr[data-row]').forEach(function (r) { updateLineTotal(r); });
    updateTotalsSummary();
})();
