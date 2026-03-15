/* ============================================
   VastraVault — Mock Data Store
   All demo data for the hackathon MVP
   ============================================ */

const VastraData = (() => {

  // ========== PRODUCTS ==========
  const products = [
    { id: 'P001', name: 'Banarasi Silk Saree', category: 'Saree', subCategory: 'Silk', color: 'Purple', size: 'Free', price: 8500, costPrice: 5200, stockCount: 12, lowStockThreshold: 5, barcode: '8901234001', lastSoldDate: '2026-03-14', createdAt: '2026-01-10', supplier: 'Surat Silk House', image: 'assets/banarasi-silk.png' },
    { id: 'P002', name: 'Indo-Western Gown', category: 'Western', subCategory: 'Gown', color: 'Maroon', size: 'M', price: 8500, costPrice: 4800, stockCount: 5, lowStockThreshold: 8, barcode: '8901234002', lastSoldDate: '2026-03-10', createdAt: '2026-02-01', supplier: 'Mumbai Textiles', image: 'assets/indo-western-gown.png' },
    { id: 'P003', name: 'Bandhani Fabric', category: 'Fabric', subCategory: 'Cotton', color: 'Red', size: '30m', price: 450, costPrice: 250, stockCount: 30, lowStockThreshold: 10, barcode: '8901234003', lastSoldDate: '2026-03-12', createdAt: '2026-01-15', supplier: 'Jaipur Fabrics', image: 'assets/bandhani-fabric.png' },
    { id: 'P004', name: 'Chanderi Cotton Kurti', category: 'Kurti', subCategory: 'Cotton', color: 'Beige', size: 'L', price: 2200, costPrice: 1100, stockCount: 25, lowStockThreshold: 8, barcode: '8901234004', lastSoldDate: '2026-03-13', createdAt: '2026-01-20', supplier: 'Jaipur Fabrics', image: '' },
    { id: 'P005', name: 'Georgette Lehenga', category: 'Saree', subCategory: 'Georgette', color: 'Pink', size: 'S', price: 12000, costPrice: 7500, stockCount: 3, lowStockThreshold: 5, barcode: '8901234005', lastSoldDate: '2026-02-28', createdAt: '2025-12-15', supplier: 'Surat Silk House', image: '' },
    { id: 'P006', name: 'Palazzo Pants Set', category: 'Western', subCategory: 'Casual', color: 'Navy', size: 'M', price: 1800, costPrice: 900, stockCount: 18, lowStockThreshold: 6, barcode: '8901234006', lastSoldDate: '2026-03-11', createdAt: '2026-02-10', supplier: 'Mumbai Textiles', image: '' },
    { id: 'P007', name: 'Chikankari Kurta', category: 'Kurti', subCategory: 'Chikan', color: 'White', size: 'XL', price: 3500, costPrice: 2000, stockCount: 8, lowStockThreshold: 5, barcode: '8901234007', lastSoldDate: '2026-03-08', createdAt: '2026-01-25', supplier: 'Jaipur Fabrics', image: '' },
    { id: 'P008', name: 'Kalamkari Dupatta', category: 'Accessories', subCategory: 'Dupatta', color: 'Multi', size: 'Free', price: 850, costPrice: 400, stockCount: 40, lowStockThreshold: 10, barcode: '8901234008', lastSoldDate: '2026-03-14', createdAt: '2026-02-05', supplier: 'Jaipur Fabrics', image: '' },
    { id: 'P009', name: 'Embroidered Anarkali', category: 'Kurti', subCategory: 'Anarkali', color: 'Emerald', size: 'M', price: 4200, costPrice: 2500, stockCount: 2, lowStockThreshold: 5, barcode: '8901234009', lastSoldDate: '2026-01-20', createdAt: '2025-11-10', supplier: 'Surat Silk House', image: '' },
    { id: 'P010', name: 'Patola Silk Saree', category: 'Saree', subCategory: 'Silk', color: 'Green', size: 'Free', price: 15000, costPrice: 9000, stockCount: 4, lowStockThreshold: 3, barcode: '8901234010', lastSoldDate: '2026-03-01', createdAt: '2025-12-20', supplier: 'Surat Silk House', image: '' },
    { id: 'P011', name: 'Block Print Kurti', category: 'Kurti', subCategory: 'Print', color: 'Yellow', size: 'S', price: 1500, costPrice: 750, stockCount: 0, lowStockThreshold: 5, barcode: '8901234011', lastSoldDate: '2026-01-05', createdAt: '2025-10-15', supplier: 'Jaipur Fabrics', image: '' },
    { id: 'P012', name: 'Silk Clutch Bag', category: 'Accessories', subCategory: 'Bags', color: 'Gold', size: 'Free', price: 1200, costPrice: 600, stockCount: 15, lowStockThreshold: 5, barcode: '8901234012', lastSoldDate: '2026-02-10', createdAt: '2025-12-01', supplier: 'Mumbai Textiles', image: '' },
    { id: 'P013', name: 'Organza Saree', category: 'Saree', subCategory: 'Organza', color: 'Lavender', size: 'Free', price: 6800, costPrice: 3800, stockCount: 7, lowStockThreshold: 4, barcode: '8901234013', lastSoldDate: '2026-03-05', createdAt: '2026-01-05', supplier: 'Surat Silk House', image: '' },
    { id: 'P014', name: 'Cotton Kaftan', category: 'Western', subCategory: 'Kaftan', color: 'Teal', size: 'Free', price: 2800, costPrice: 1400, stockCount: 10, lowStockThreshold: 4, barcode: '8901234014', lastSoldDate: '2026-03-09', createdAt: '2026-02-15', supplier: 'Mumbai Textiles', image: '' },
    { id: 'P015', name: 'Jamdani Cotton Saree', category: 'Saree', subCategory: 'Cotton', color: 'Off-White', size: 'Free', price: 5500, costPrice: 3200, stockCount: 6, lowStockThreshold: 4, barcode: '8901234015', lastSoldDate: '2026-01-15', createdAt: '2025-11-20', supplier: 'Jaipur Fabrics', image: '' },
  ];

  // ========== CUSTOMERS ==========
  const customers = [
    {
      id: 'C001', name: 'Meera Sharma', phone: '+91 98765 43210', email: 'meera@email.com',
      purchaseHistory: [
        { orderId: 'O001', date: '2026-03-14', items: ['P001', 'P008'], totalAmount: 9350 },
        { orderId: 'O005', date: '2026-02-20', items: ['P005'], totalAmount: 12000 },
        { orderId: 'O009', date: '2026-01-10', items: ['P004', 'P008'], totalAmount: 3050 },
      ],
      styleProfile: { preferredCategories: ['Saree', 'Accessories'], preferredColors: ['Purple', 'Gold', 'Multi'], sizes: ['Free', 'L'] },
      lastVisit: '2026-03-14', totalSpent: 24400
    },
    {
      id: 'C002', name: 'Anita Patel', phone: '+91 87654 32109', email: 'anita@email.com',
      purchaseHistory: [
        { orderId: 'O002', date: '2026-03-12', items: ['P006', 'P004'], totalAmount: 4000 },
        { orderId: 'O006', date: '2026-02-14', items: ['P002'], totalAmount: 8500 },
      ],
      styleProfile: { preferredCategories: ['Western', 'Kurti'], preferredColors: ['Navy', 'Beige', 'Maroon'], sizes: ['M', 'L'] },
      lastVisit: '2026-03-12', totalSpent: 12500
    },
    {
      id: 'C003', name: 'Priya Reddy', phone: '+91 76543 21098', email: 'priya@email.com',
      purchaseHistory: [
        { orderId: 'O003', date: '2026-03-10', items: ['P010'], totalAmount: 15000 },
        { orderId: 'O007', date: '2026-01-22', items: ['P007', 'P003'], totalAmount: 3950 },
      ],
      styleProfile: { preferredCategories: ['Saree', 'Kurti', 'Fabric'], preferredColors: ['Green', 'White', 'Red'], sizes: ['Free', 'XL'] },
      lastVisit: '2026-03-10', totalSpent: 18950
    },
    {
      id: 'C004', name: 'Divya Joshi', phone: '+91 65432 10987', email: 'divya@email.com',
      purchaseHistory: [
        { orderId: 'O004', date: '2026-03-08', items: ['P009', 'P012'], totalAmount: 5400 },
      ],
      styleProfile: { preferredCategories: ['Kurti', 'Accessories'], preferredColors: ['Emerald', 'Gold'], sizes: ['M', 'Free'] },
      lastVisit: '2026-03-08', totalSpent: 5400
    },
    {
      id: 'C005', name: 'Sunita Verma', phone: '+91 54321 09876', email: 'sunita@email.com',
      purchaseHistory: [
        { orderId: 'O008', date: '2026-02-01', items: ['P013', 'P014'], totalAmount: 9600 },
      ],
      styleProfile: { preferredCategories: ['Saree', 'Western'], preferredColors: ['Lavender', 'Teal'], sizes: ['Free'] },
      lastVisit: '2026-02-01', totalSpent: 9600
    },
    {
      id: 'C006', name: 'Kavita Singh', phone: '+91 43210 98765', email: 'kavita@email.com',
      purchaseHistory: [
        { orderId: 'O010', date: '2026-01-15', items: ['P015', 'P011'], totalAmount: 7000 },
      ],
      styleProfile: { preferredCategories: ['Saree', 'Kurti'], preferredColors: ['Off-White', 'Yellow'], sizes: ['Free', 'S'] },
      lastVisit: '2026-01-15', totalSpent: 7000
    },
  ];

  // ========== ORDERS ==========
  const orders = [
    { id: 'O001', customerId: 'C001', customerName: 'Meera Sharma', channel: 'walkin', status: 'delivered', items: [{ productId: 'P001', name: 'Banarasi Silk Saree', qty: 1, priceAtSale: 8500 }, { productId: 'P008', name: 'Kalamkari Dupatta', qty: 1, priceAtSale: 850 }], totalAmount: 9350, paymentMode: 'UPI', gstAmount: 468, createdAt: '2026-03-14' },
    { id: 'O002', customerId: 'C002', customerName: 'Anita Patel', channel: 'walkin', status: 'delivered', items: [{ productId: 'P006', name: 'Palazzo Pants Set', qty: 1, priceAtSale: 1800 }, { productId: 'P004', name: 'Chanderi Cotton Kurti', qty: 1, priceAtSale: 2200 }], totalAmount: 4000, paymentMode: 'Card', gstAmount: 200, createdAt: '2026-03-12' },
    { id: 'O003', customerId: 'C003', customerName: 'Priya Reddy', channel: 'whatsapp', status: 'delivered', items: [{ productId: 'P010', name: 'Patola Silk Saree', qty: 1, priceAtSale: 15000 }], totalAmount: 15000, paymentMode: 'Cash', gstAmount: 750, createdAt: '2026-03-10' },
    { id: 'O004', customerId: 'C004', customerName: 'Divya Joshi', channel: 'whatsapp', status: 'delivered', items: [{ productId: 'P009', name: 'Embroidered Anarkali', qty: 1, priceAtSale: 4200 }, { productId: 'P012', name: 'Silk Clutch Bag', qty: 1, priceAtSale: 1200 }], totalAmount: 5400, paymentMode: 'UPI', gstAmount: 270, createdAt: '2026-03-08' },
    { id: 'O005', customerId: 'C001', customerName: 'Meera Sharma', channel: 'walkin', status: 'delivered', items: [{ productId: 'P005', name: 'Georgette Lehenga', qty: 1, priceAtSale: 12000 }], totalAmount: 12000, paymentMode: 'Card', gstAmount: 600, createdAt: '2026-02-20' },
    { id: 'O006', customerId: 'C002', customerName: 'Anita Patel', channel: 'whatsapp', status: 'delivered', items: [{ productId: 'P002', name: 'Indo-Western Gown', qty: 1, priceAtSale: 8500 }], totalAmount: 8500, paymentMode: 'UPI', gstAmount: 425, createdAt: '2026-02-14' },
    { id: 'WA001', customerId: 'C003', customerName: 'Priya Reddy', channel: 'whatsapp', status: 'pending', items: [{ productId: 'P007', name: 'Chikankari Kurta', qty: 2, priceAtSale: 3500 }], totalAmount: 7000, paymentMode: 'Pending', gstAmount: 350, createdAt: '2026-03-15' },
    { id: 'WA002', customerId: 'C005', customerName: 'Sunita Verma', channel: 'whatsapp', status: 'confirmed', items: [{ productId: 'P013', name: 'Organza Saree', qty: 1, priceAtSale: 6800 }], totalAmount: 6800, paymentMode: 'UPI', gstAmount: 340, createdAt: '2026-03-14' },
    { id: 'WA003', customerId: 'C006', customerName: 'Kavita Singh', channel: 'whatsapp', status: 'pending', items: [{ productId: 'P004', name: 'Chanderi Cotton Kurti', qty: 3, priceAtSale: 2200 }], totalAmount: 6600, paymentMode: 'Pending', gstAmount: 330, createdAt: '2026-03-15' },
  ];

  // ========== ANALYTICS DATA ==========
  const weeklySales = [
    { day: 'Mon', amount: 12500 },
    { day: 'Tue', amount: 8200 },
    { day: 'Wed', amount: 15600 },
    { day: 'Thu', amount: 9800 },
    { day: 'Fri', amount: 22000 },
    { day: 'Sat', amount: 28500 },
    { day: 'Sun', amount: 18000 },
  ];

  const monthlySales = [
    { month: 'Oct', amount: 185000 },
    { month: 'Nov', amount: 245000 },
    { month: 'Dec', amount: 320000 },
    { month: 'Jan', amount: 198000 },
    { month: 'Feb', amount: 215000 },
    { month: 'Mar', amount: 178000 },
  ];

  const categoryBreakdown = [
    { category: 'Saree', sales: 42, revenue: 195000 },
    { category: 'Kurti', sales: 28, revenue: 78000 },
    { category: 'Western', sales: 15, revenue: 52000 },
    { category: 'Fabric', sales: 20, revenue: 45000 },
    { category: 'Accessories', sales: 35, revenue: 32000 },
  ];

  const demandForecast = [
    { category: 'Saree', confidence: 92, trend: 'up' },
    { category: 'Kurti', confidence: 85, trend: 'up' },
    { category: 'Western', confidence: 78, trend: 'steady' },
    { category: 'Accessories', confidence: 72, trend: 'up' },
    { category: 'Fabric', confidence: 65, trend: 'down' },
  ];

  // ========== HELPER FUNCTIONS ==========

  function getDeadStock(daysThreshold = 45) {
    const now = new Date('2026-03-15');
    return products.filter(p => {
      const lastSold = new Date(p.lastSoldDate);
      const daysSince = Math.floor((now - lastSold) / (1000 * 60 * 60 * 24));
      return daysSince >= daysThreshold && p.stockCount > 0;
    }).map(p => {
      const daysSince = Math.floor((new Date('2026-03-15') - new Date(p.lastSoldDate)) / (1000 * 60 * 60 * 24));
      let recommendedDiscount = 0;
      if (daysSince >= 60) recommendedDiscount = 30;
      else if (daysSince >= 45) recommendedDiscount = 20;
      else if (daysSince >= 30) recommendedDiscount = 10;
      return { ...p, daysSinceLastSale: daysSince, recommendedDiscount };
    });
  }

  function getLowStock() {
    return products.filter(p => p.stockCount > 0 && p.stockCount <= p.lowStockThreshold);
  }

  function getOutOfStock() {
    return products.filter(p => p.stockCount === 0);
  }

  function getTodayRevenue() {
    return orders.filter(o => o.createdAt === '2026-03-15' || o.createdAt === '2026-03-14')
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }

  function getPendingWhatsAppOrders() {
    return orders.filter(o => o.channel === 'whatsapp' && o.status === 'pending');
  }

  function getCustomerById(id) {
    return customers.find(c => c.id === id);
  }

  function getProductById(id) {
    return products.find(p => p.id === id);
  }

  function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  // ========== PUBLIC API ==========
  return {
    products,
    customers,
    orders,
    weeklySales,
    monthlySales,
    categoryBreakdown,
    demandForecast,
    getDeadStock,
    getLowStock,
    getOutOfStock,
    getTodayRevenue,
    getPendingWhatsAppOrders,
    getCustomerById,
    getProductById,
    formatCurrency,
    formatDate,
  };

})();
