/* ============================================
   VastraVault — Dashboard & Inner Pages JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sidebar Toggle (Mobile) ----
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---- Toast System ----
  window.showToast = function(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ---- Init Based on Page ----
  const page = document.body.dataset.page;

  if (page === 'dashboard') initDashboard();
  if (page === 'pos') initPOS();
  if (page === 'inventory') initInventory();
  if (page === 'customers') initCustomers();
  if (page === 'analytics') initAnalytics();
  if (page === 'whatsapp') initWhatsApp();
});

/* ============================================
   DASHBOARD
   ============================================ */
function initDashboard() {
  // KPI values
  document.getElementById('kpiRevenue').textContent = VastraData.formatCurrency(VastraData.getTodayRevenue());
  document.getElementById('kpiPendingWA').textContent = VastraData.getPendingWhatsAppOrders().length;
  document.getElementById('kpiDeadStock').textContent = VastraData.getDeadStock(30).length;
  document.getElementById('kpiLowStock').textContent = VastraData.getLowStock().length;

  // Recent Orders Table
  const tbody = document.getElementById('recentOrdersBody');
  if (tbody) {
    const recentOrders = VastraData.orders.slice(0, 6);
    tbody.innerHTML = recentOrders.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customerName}</td>
        <td>${o.items.map(i => i.name).join(', ')}</td>
        <td><span class="channel-badge ${o.channel}">${o.channel === 'whatsapp' ? '💬 WhatsApp' : '🏪 Walk-in'}</span></td>
        <td><strong>${VastraData.formatCurrency(o.totalAmount)}</strong></td>
        <td><span class="status-badge ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
        <td>${VastraData.formatDate(o.createdAt)}</td>
      </tr>
    `).join('');
  }

  // Weekly Sales Chart
  const ctx = document.getElementById('weeklySalesChart');
  if (ctx && typeof Chart !== 'undefined') {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: VastraData.weeklySales.map(d => d.day),
        datasets: [{
          label: 'Revenue',
          data: VastraData.weeklySales.map(d => d.amount),
          borderColor: '#6B2D3E',
          backgroundColor: 'rgba(107,45,62,0.08)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#6B2D3E',
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: v => '₹' + (v/1000) + 'k' }
          }
        }
      }
    });
  }
}

/* ============================================
   POS / NEW SALE
   ============================================ */
function initPOS() {
  let cart = [];

  const searchInput = document.getElementById('posSearch');
  const productList = document.getElementById('posProductList');
  const cartItems = document.getElementById('cartItems');

  function renderProducts(filter = '') {
    const filtered = VastraData.products.filter(p =>
      p.stockCount > 0 && (
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.toLowerCase()) ||
        p.barcode.includes(filter)
      )
    );
    productList.innerHTML = filtered.map(p => `
      <div class="product-card" onclick="addToCart('${p.id}')">
        <div class="product-card-image">${p.image ? `<img src="${p.image}" alt="${p.name}" />` : getCategoryEmoji(p.category)}</div>
        <div class="product-card-info">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-category">${p.category} · ${p.color} · ${p.size}</div>
          <div class="product-card-bottom">
            <span class="product-card-price">${VastraData.formatCurrency(p.price)}</span>
            <span class="product-card-stock">${p.stockCount} pcs</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.addToCart = function(productId) {
    const product = VastraData.getProductById(productId);
    if (!product) return;
    const existing = cart.find(c => c.id === productId);
    if (existing) {
      if (existing.qty >= product.stockCount) { showToast('Max stock reached', 'error'); return; }
      existing.qty++;
    } else {
      cart.push({ id: productId, name: product.name, price: product.price, qty: 1 });
    }
    renderCart();
    showToast(`${product.name} added to cart`, 'success');
  };

  window.removeFromCart = function(productId) {
    cart = cart.filter(c => c.id !== productId);
    renderCart();
  };

  window.updateQty = function(productId, delta) {
    const item = cart.find(c => c.id === productId);
    if (!item) return;
    const product = VastraData.getProductById(productId);
    item.qty += delta;
    if (item.qty <= 0) { window.removeFromCart(productId); return; }
    if (item.qty > product.stockCount) { item.qty = product.stockCount; showToast('Max stock reached', 'error'); }
    renderCart();
  };

  function renderCart() {
    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-state"><div class="icon">🛒</div><h3>Cart is empty</h3><p>Search and click products to add</p></div>';
    } else {
      cartItems.innerHTML = cart.map(c => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${c.name}</div>
            <div class="cart-item-price">${VastraData.formatCurrency(c.price)} each</div>
          </div>
          <div class="cart-item-qty">
            <button onclick="updateQty('${c.id}', -1)">−</button>
            <span>${c.qty}</span>
            <button onclick="updateQty('${c.id}', 1)">+</button>
          </div>
          <div class="cart-item-total">${VastraData.formatCurrency(c.price * c.qty)}</div>
          <button class="cart-item-remove" onclick="removeFromCart('${c.id}')">✕</button>
        </div>
      `).join('');
    }

    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const gst = Math.round(subtotal * 0.05);
    const discount = parseFloat(document.getElementById('discountInput')?.value || 0);
    const total = subtotal + gst - discount;

    document.getElementById('cartSubtotal').textContent = VastraData.formatCurrency(subtotal);
    document.getElementById('cartGST').textContent = VastraData.formatCurrency(gst);
    document.getElementById('cartDiscount').textContent = '- ' + VastraData.formatCurrency(discount);
    document.getElementById('cartTotal').textContent = VastraData.formatCurrency(total);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderProducts(e.target.value));
  }

  // Generate Invoice
  const generateBtn = document.getElementById('generateInvoice');
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      if (cart.length === 0) { showToast('Cart is empty!', 'error'); return; }
      showToast('Invoice generated successfully! 🧾', 'success');
      cart = [];
      renderCart();
    });
  }

  const discountInput = document.getElementById('discountInput');
  if (discountInput) {
    discountInput.addEventListener('input', renderCart);
  }

  renderProducts();
  renderCart();
}

/* ============================================
   INVENTORY
   ============================================ */
function initInventory() {
  const gridEl = document.getElementById('inventoryGrid');
  const categoryFilter = document.getElementById('filterCategory');
  const stockFilter = document.getElementById('filterStock');
  const searchInput = document.getElementById('inventorySearch');

  function renderInventory() {
    let items = [...VastraData.products];
    const cat = categoryFilter?.value || 'all';
    const stock = stockFilter?.value || 'all';
    const search = searchInput?.value.toLowerCase() || '';

    if (cat !== 'all') items = items.filter(p => p.category === cat);
    if (stock === 'in-stock') items = items.filter(p => p.stockCount > p.lowStockThreshold);
    if (stock === 'low-stock') items = items.filter(p => p.stockCount > 0 && p.stockCount <= p.lowStockThreshold);
    if (stock === 'out-of-stock') items = items.filter(p => p.stockCount === 0);
    if (stock === 'dead-stock') {
      const deadIds = VastraData.getDeadStock(30).map(d => d.id);
      items = items.filter(p => deadIds.includes(p.id));
    }
    if (search) items = items.filter(p => p.name.toLowerCase().includes(search) || p.barcode.includes(search));

    gridEl.innerHTML = items.map(p => {
      const now = new Date('2026-03-15');
      const lastSold = new Date(p.lastSoldDate);
      const daysSince = Math.floor((now - lastSold) / (1000 * 60 * 60 * 24));
      let stockStatus = 'in-stock';
      let stockLabel = 'In Stock';
      if (p.stockCount === 0) { stockStatus = 'out-of-stock'; stockLabel = 'Out of Stock'; }
      else if (daysSince >= 45) { stockStatus = 'dead-stock'; stockLabel = `Dead ${daysSince}d`; }
      else if (daysSince >= 30) { stockStatus = 'dead-stock'; stockLabel = `Aging ${daysSince}d`; }
      else if (p.stockCount <= p.lowStockThreshold) { stockStatus = 'low-stock'; stockLabel = 'Low Stock'; }

      return `
        <div class="product-card">
          <div class="product-card-image">
            ${p.image ? `<img src="${p.image}" alt="${p.name}" />` : getCategoryEmoji(p.category)}
            <span class="stock-badge ${stockStatus}">${stockLabel}</span>
          </div>
          <div class="product-card-info">
            <div class="product-card-name">${p.name}</div>
            <div class="product-card-category">${p.category} · ${p.color} · ${p.size}</div>
            <div class="product-card-bottom">
              <span class="product-card-price">${VastraData.formatCurrency(p.price)}</span>
              <span class="product-card-stock">${p.stockCount} pcs</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (items.length === 0) {
      gridEl.innerHTML = '<div class="empty-state"><div class="icon">📦</div><h3>No products found</h3><p>Try adjusting your filters</p></div>';
    }
  }

  if (categoryFilter) categoryFilter.addEventListener('change', renderInventory);
  if (stockFilter) stockFilter.addEventListener('change', renderInventory);
  if (searchInput) searchInput.addEventListener('input', renderInventory);

  renderInventory();
}

/* ============================================
   CUSTOMERS
   ============================================ */
function initCustomers() {
  const listEl = document.getElementById('customerList');
  const detailEl = document.getElementById('customerDetail');
  const searchInput = document.getElementById('customerSearch');

  function renderList(filter = '') {
    const filtered = VastraData.customers.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.phone.includes(filter)
    );

    listEl.innerHTML = filtered.map(c => `
      <div class="customer-card" onclick="showCustomerDetail('${c.id}')">
        <div class="customer-avatar">${c.name.charAt(0)}</div>
        <div class="customer-info">
          <div class="customer-name">${c.name}</div>
          <div class="customer-phone">${c.phone}</div>
          <div class="customer-tags">
            ${c.styleProfile.preferredCategories.map(cat => `<span class="customer-tag">${cat}</span>`).join('')}
          </div>
        </div>
        <div class="customer-stats">
          <div class="customer-total-spent">${VastraData.formatCurrency(c.totalSpent)}</div>
          <div class="customer-last-visit">Last: ${VastraData.formatDate(c.lastVisit)}</div>
        </div>
      </div>
    `).join('');
  }

  window.showCustomerDetail = function(id) {
    const c = VastraData.getCustomerById(id);
    if (!c) return;

    detailEl.style.display = 'block';
    listEl.style.display = 'none';

    const purchaseRows = c.purchaseHistory.map(ph => {
      const itemNames = ph.items.map(pid => {
        const p = VastraData.getProductById(pid);
        return p ? p.name : pid;
      }).join(', ');
      return `<tr><td>${ph.orderId}</td><td>${VastraData.formatDate(ph.date)}</td><td>${itemNames}</td><td><strong>${VastraData.formatCurrency(ph.totalAmount)}</strong></td></tr>`;
    }).join('');

    detailEl.innerHTML = `
      <button class="btn btn-ghost" onclick="hideCustomerDetail()" style="margin-bottom:16px">← Back to Customers</button>
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px">
        <div class="customer-avatar" style="width:64px;height:64px;font-size:1.5rem">${c.name.charAt(0)}</div>
        <div>
          <h2 style="font-family:var(--font-heading);font-size:1.4rem;font-weight:700">${c.name}</h2>
          <p style="color:var(--gray-500);font-size:0.9rem">${c.phone} · ${c.email}</p>
          <p style="color:var(--maroon);font-weight:600;margin-top:4px">Total Spent: ${VastraData.formatCurrency(c.totalSpent)}</p>
        </div>
        <div style="margin-left:auto">
          <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${c.name}! 👋\n\nWe have exciting new arrivals at our boutique that match your style! Visit us to check out the latest collection. 🧵✨\n\n— वस्त्रVault`)}" target="_blank" class="btn btn-whatsapp btn-sm">💬 Send WhatsApp</a>
        </div>
      </div>
      <div class="profile-section">
        <div class="profile-card">
          <h3>🎨 Style Profile</h3>
          <p style="margin-bottom:8px"><strong>Preferred Categories:</strong> ${c.styleProfile.preferredCategories.join(', ')}</p>
          <p style="margin-bottom:8px"><strong>Preferred Colors:</strong> ${c.styleProfile.preferredColors.join(', ')}</p>
          <p><strong>Sizes:</strong> ${c.styleProfile.sizes.join(', ')}</p>
        </div>
        <div class="profile-card">
          <h3>🏆 Recommended Products</h3>
          ${getRecommendations(c).map(r => `<p style="margin-bottom:6px">• ${r.name} — ${VastraData.formatCurrency(r.price)}</p>`).join('')}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">📦 Purchase History</div></div>
        <div class="panel-body no-padding">
          <table class="data-table">
            <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Amount</th></tr></thead>
            <tbody>${purchaseRows}</tbody>
          </table>
        </div>
      </div>
    `;
  };

  window.hideCustomerDetail = function() {
    detailEl.style.display = 'none';
    listEl.style.display = 'flex';
  };

  if (searchInput) searchInput.addEventListener('input', (e) => renderList(e.target.value));
  renderList();
}

function getRecommendations(customer) {
  return VastraData.products
    .filter(p => customer.styleProfile.preferredCategories.includes(p.category) && p.stockCount > 0)
    .slice(0, 3);
}

/* ============================================
   ANALYTICS
   ============================================ */
function initAnalytics() {
  // Dead Stock Table
  const deadStockBody = document.getElementById('deadStockBody');
  if (deadStockBody) {
    const deadStock = VastraData.getDeadStock(30);
    deadStockBody.innerHTML = deadStock.map(p => `
      <tr class="dead-stock-row ${p.daysSinceLastSale >= 45 ? 'danger' : 'warning'}">
        <td><div class="product-cell">
          <div class="product-thumb">${p.image ? `<img src="${p.image}" alt="${p.name}"/>` : getCategoryEmoji(p.category)}</div>
          <div><strong>${p.name}</strong><br><span style="font-size:0.75rem;color:var(--gray-500)">${p.category}</span></div>
        </div></td>
        <td>${p.stockCount}</td>
        <td><strong>${p.daysSinceLastSale} days</strong></td>
        <td>${VastraData.formatCurrency(p.price)}</td>
        <td><span class="discount-badge ${p.daysSinceLastSale >= 45 ? 'red' : 'yellow'}">${p.recommendedDiscount}% OFF</span></td>
        <td><button class="btn btn-sm btn-gold" onclick="showToast('Flash discount applied! ⚡', 'success')">Apply</button></td>
      </tr>
    `).join('');
  }

  // Sales by Category Donut Chart
  const catCtx = document.getElementById('categoryChart');
  if (catCtx && typeof Chart !== 'undefined') {
    new Chart(catCtx, {
      type: 'doughnut',
      data: {
        labels: VastraData.categoryBreakdown.map(c => c.category),
        datasets: [{
          data: VastraData.categoryBreakdown.map(c => c.revenue),
          backgroundColor: ['#6B2D3E', '#C5985A', '#5B2C6F', '#D4A59A', '#3498DB'],
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } }
        }
      }
    });
  }

  // Demand Forecast Bar Chart
  const forecastCtx = document.getElementById('forecastChart');
  if (forecastCtx && typeof Chart !== 'undefined') {
    new Chart(forecastCtx, {
      type: 'bar',
      data: {
        labels: VastraData.demandForecast.map(d => d.category),
        datasets: [{
          label: 'Confidence %',
          data: VastraData.demandForecast.map(d => d.confidence),
          backgroundColor: VastraData.demandForecast.map(d => d.trend === 'up' ? '#6B2D3E' : d.trend === 'steady' ? '#C5985A' : '#D4A59A'),
          borderRadius: 8,
          barThickness: 40,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y}% confidence` } }
        },
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } },
        }
      }
    });
  }

  // Monthly Revenue Trend
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx && typeof Chart !== 'undefined') {
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: VastraData.monthlySales.map(m => m.month),
        datasets: [{
          label: 'Revenue',
          data: VastraData.monthlySales.map(m => m.amount),
          borderColor: '#C5985A',
          backgroundColor: 'rgba(197,152,90,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#C5985A',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { callback: v => '₹' + (v/1000) + 'k' } }
        }
      }
    });
  }
}

/* ============================================
   WHATSAPP ORDERS
   ============================================ */
function initWhatsApp() {
  const ordersBody = document.getElementById('waOrdersBody');
  const statusFilter = document.getElementById('waStatusFilter');

  function renderOrders() {
    const status = statusFilter?.value || 'all';
    let waOrders = VastraData.orders.filter(o => o.channel === 'whatsapp');
    if (status !== 'all') waOrders = waOrders.filter(o => o.status === status);

    ordersBody.innerHTML = waOrders.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customerName}</td>
        <td>${o.items.map(i => `${i.name} (×${i.qty})`).join(', ')}</td>
        <td><strong>${VastraData.formatCurrency(o.totalAmount)}</strong></td>
        <td><span class="status-badge ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
        <td>${VastraData.formatDate(o.createdAt)}</td>
        <td>
          ${o.status === 'pending' ? `<button class="btn btn-sm btn-success" onclick="updateOrderStatus('${o.id}', 'confirmed')">Confirm</button>` : ''}
          ${o.status === 'confirmed' ? `<button class="btn btn-sm btn-maroon" onclick="updateOrderStatus('${o.id}', 'delivered')">Deliver</button>` : ''}
          <button class="btn btn-sm btn-whatsapp" onclick="copyWAMessage('${o.id}')" title="Copy WhatsApp message">💬</button>
        </td>
      </tr>
    `).join('');
  }

  window.updateOrderStatus = function(orderId, newStatus) {
    const order = VastraData.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      renderOrders();
      showToast(`Order ${orderId} marked as ${newStatus}! ✅`, 'success');
    }
  };

  window.copyWAMessage = function(orderId) {
    const order = VastraData.orders.find(o => o.id === orderId);
    if (!order) return;
    const msg = `🧵 *वस्त्रVault Order Summary*\n\n📋 Order: ${order.id}\n👤 Customer: ${order.customerName}\n\n🛍️ Items:\n${order.items.map(i => `  • ${i.name} × ${i.qty} — ${VastraData.formatCurrency(i.priceAtSale * i.qty)}`).join('\n')}\n\n💰 Total: *${VastraData.formatCurrency(order.totalAmount)}*\n📊 GST: ${VastraData.formatCurrency(order.gstAmount)}\n📦 Status: ${order.status.toUpperCase()}\n\nThank you for shopping with us! ❤️`;

    navigator.clipboard.writeText(msg).then(() => {
      showToast('WhatsApp message copied! 📋', 'success');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = msg;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('WhatsApp message copied! 📋', 'success');
    });
  };

  // New order form
  const newOrderBtn = document.getElementById('newWAOrder');
  const orderModal = document.getElementById('orderModal');
  if (newOrderBtn && orderModal) {
    newOrderBtn.addEventListener('click', () => orderModal.classList.add('active'));
  }
  const closeModal = document.getElementById('closeOrderModal');
  if (closeModal) {
    closeModal.addEventListener('click', () => orderModal.classList.remove('active'));
  }

  const submitOrder = document.getElementById('submitOrder');
  if (submitOrder) {
    submitOrder.addEventListener('click', () => {
      const name = document.getElementById('waCustomerName')?.value;
      const product = document.getElementById('waProduct')?.value;
      const qty = parseInt(document.getElementById('waQty')?.value || '1');
      if (!name || !product) { showToast('Please fill all fields', 'error'); return; }
      const p = VastraData.products.find(pr => pr.id === product);
      if (!p) return;
      const newOrder = {
        id: 'WA' + String(VastraData.orders.length + 1).padStart(3, '0'),
        customerId: '',
        customerName: name,
        channel: 'whatsapp',
        status: 'pending',
        items: [{ productId: p.id, name: p.name, qty, priceAtSale: p.price }],
        totalAmount: p.price * qty,
        paymentMode: 'Pending',
        gstAmount: Math.round(p.price * qty * 0.05),
        createdAt: '2026-03-15',
      };
      VastraData.orders.unshift(newOrder);
      orderModal.classList.remove('active');
      renderOrders();
      showToast('WhatsApp order logged! 💬', 'success');
    });
  }

  if (statusFilter) statusFilter.addEventListener('change', renderOrders);
  renderOrders();
}


/* ============================================
   HELPERS
   ============================================ */
function getCategoryEmoji(category) {
  const emojis = {
    'Saree': '🥻',
    'Kurti': '👚',
    'Western': '👗',
    'Fabric': '🧶',
    'Accessories': '👜',
  };
  return emojis[category] || '👔';
}
