// ============================================================
// 🔥 FIXED: AOS Fallback - Prevents "AOS is not defined" error
// ============================================================

// Check if AOS exists, if not create a fallback
if (typeof AOS === 'undefined') {
    window.AOS = {
        init: function(options) { 
            console.log('✅ AOS fallback: init called');
        },
        refresh: function() { 
            console.log('✅ AOS fallback: refresh called');
        }
    };
    console.log('✅ AOS fallback initialized');
}

// Initialize AOS safely
try {
    AOS.init({ duration: 800, once: true });
    console.log('✅ AOS initialized');
} catch (e) {
    console.log('⚠️ AOS init error (using fallback):', e.message);
}

// ============================================================
// BACKEND API URL - ✅ FIXED FOR PRODUCTION
// ============================================================
const API_BASE_URL = 'https://tamyokiy-backend-1.onrender.com/api';

// ============================================================
// MOUSE GLOW EFFECT
// ============================================================
const glow = document.getElementById("mouseGlow");
if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

// ============================================================
// FLOATING PARTICLES
// ============================================================
const particlesContainer = document.getElementById("particles");
if (particlesContainer) {
    for (let i = 0; i < 60; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        const size = Math.random() * 5 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = Math.random() * 10 + 5 + "s";
        p.style.animationDelay = Math.random() * 10 + "s";
        particlesContainer.appendChild(p);
    }
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
const typewriterEl = document.getElementById("typewriter");
if (typewriterEl) {
    const phrase = "Delivering Confidence. Driving Success. Connecting The Future.";
    let index = 0;
    function typeWriter() {
        if (index < phrase.length) {
            typewriterEl.innerHTML += phrase.charAt(index);
            index++;
            setTimeout(typeWriter, 70);
        }
    }
    typeWriter();
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
const counters = [
    { id: "stat1", target: 99.9, suffix: "%", isFloat: true },
    { id: "stat2", target: 24, suffix: "/7", isFloat: false },
    { id: "stat3", target: 150, suffix: "+", isFloat: false },
    { id: "stat4", target: 100, suffix: "%", isFloat: false }
];
let counted = false;

function startCounters() {
    if (counted) return;
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        counted = true;
        counters.forEach(c => {
            let current = 0;
            const target = c.target;
            const step = target / 50;
            const elem = document.getElementById(c.id);
            if (!elem) return;
            const interval = setInterval(() => {
                if (c.isFloat) current += step;
                else current += Math.ceil(step);
                if (current >= target) {
                    elem.innerText = (c.isFloat ? target.toFixed(1) : Math.floor(target)) + c.suffix;
                    clearInterval(interval);
                } else {
                    elem.innerText = (c.isFloat ? current.toFixed(1) : Math.floor(current)) + c.suffix;
                }
            }, 25);
        });
    }
}

window.addEventListener("scroll", startCounters);
startCounters();

// ============================================================
// HONESTY METER ANIMATION
// ============================================================
const meterFill = document.querySelector('.meter-fill');
if (meterFill) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                meterFill.style.animation = "fillBar 2s ease-out";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(meterFill);
}

// ============================================================
// ACTIVE NAVIGATION LINK
// ============================================================
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #D4AF37, #FFD700)' : 'linear-gradient(135deg, #dc3545, #c82333)'};
        color: ${type === 'success' ? '#050505' : '#fff'};
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================================
// ESCAPE HTML
// ============================================================
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ============================================================
// FORMAT NOTIFICATION TIME
// ============================================================
function formatNotificationTime(date) {
    const diff = new Date() - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

// ============================================================
// GLOBAL NOTIFICATION FUNCTIONS - ✅ FIXED URLs
// ============================================================
async function loadNotifications() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
        const res = await fetch(`${API_BASE_URL}/notifications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        const badge = document.getElementById('notificationBadge');
        if (badge && data.unreadCount > 0) {
            badge.style.display = 'inline-block';
            badge.innerText = data.unreadCount > 99 ? '99+' : data.unreadCount;
        } else if (badge) {
            badge.style.display = 'none';
        }
        
        const list = document.getElementById('notificationList');
        if (list) {
            if (data.notifications.length === 0) {
                list.innerHTML = '<p style="text-align:center; padding:20px;">No notifications</p>';
                return;
            }
            
            list.innerHTML = data.notifications.map(n => `
                <div class="notification-item ${!n.isRead ? 'unread' : ''}" onclick="markAsRead('${n._id}')">
                    <div class="notification-title">${escapeHtml(n.title)}</div>
                    <div class="notification-message">${escapeHtml(n.message)}</div>
                    <div class="notification-time">${formatNotificationTime(n.createdAt)}</div>
                </div>
            `).join('');
        }
    } catch (err) {
        console.error('Error loading notifications:', err);
    }
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (!dropdown) return;
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        loadNotifications();
    } else {
        dropdown.style.display = 'none';
    }
}

async function markAsRead(id) {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
        await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadNotifications();
        
        const badge = document.getElementById('notificationBadge');
        if (badge && badge.innerText) {
            const newCount = parseInt(badge.innerText) - 1;
            if (newCount <= 0) {
                badge.style.display = 'none';
            } else {
                badge.innerText = newCount;
            }
        }
    } catch (err) {
        console.error('Error marking as read:', err);
    }
}

async function markAllRead() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
        await fetch(`${API_BASE_URL}/notifications/read-all`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadNotifications();
        
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.style.display = 'none';
        }
    } catch (err) {
        console.error('Error marking all as read:', err);
    }
}

// ============================================================
// 🔥 UPDATED: UPDATE NAVIGATION WITH FLEET, WAREHOUSE, ROUTE, REAL-TIME & SUPPORT LINKS
// ============================================================
function updateAuthNavigation() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const authLink = document.getElementById('authNavLink');
    const profileLink = document.getElementById('profileNavLink');
    const adminLink = document.getElementById('adminNavLink');
    const forecastLink = document.getElementById('forecastNavLink');
    const userNameSpan = document.getElementById('userNameDisplay');
    
    // ===== REAL-TIME DASHBOARD LINK =====
    const realtimeLink = document.getElementById('realtimeNavLink');
    
    // ===== FLEET MANAGEMENT LINK =====
    const fleetLink = document.getElementById('fleetNavLink');
    
    // ===== SUPPORT TICKETS LINK =====
    const ticketsLink = document.getElementById('ticketsNavLink');
    
    // ===== WAREHOUSE NAVIGATION LINKS =====
    const warehouseMgmtLink = document.getElementById('warehouseMgmtLink');
    const warehouseInventoryLink = document.getElementById('warehouseInventoryLink');
    const warehouseServiceLink = document.getElementById('warehouseServiceLink');
    const driverWarehouseLink = document.getElementById('driverWarehouseLink');
    
    // ===== ROUTE NAVIGATION LINKS =====
    const routesLink = document.getElementById('routesNavLink');
    const createRouteLink = document.getElementById('createRouteNavLink');
    const myRouteLink = document.getElementById('myRouteNavLink');
    
    console.log('🔍 Updating navigation...');
    console.log('Token:', !!token);
    console.log('User role:', user.role);
    
    if (token && user.name) {
        // --- Auth Link (Logout) ---
        if (authLink) {
            authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            authLink.href = '#';
            authLink.onclick = function(e) {
                e.preventDefault();
                logoutUser();
                return false;
            };
            authLink.style.display = 'inline-block';
        }
        
        // --- Profile Link ---
        if (profileLink) {
            profileLink.style.display = 'inline-block';
        }
        
        // --- Forecast Link: Admin only ---
        if (forecastLink) {
            if (user.role === 'admin') {
                forecastLink.style.display = 'inline-block';
                console.log('✅ Forecast link VISIBLE (admin)');
            } else {
                forecastLink.style.display = 'none';
                console.log('❌ Forecast link HIDDEN (not admin)');
            }
        }
        
        // --- Admin Link: Admin only ---
        if (adminLink) {
            if (user.role === 'admin') {
                adminLink.style.display = 'inline-block';
                console.log('✅ Admin link VISIBLE');
            } else {
                adminLink.style.display = 'none';
                console.log('❌ Admin link HIDDEN');
            }
        }
        
        // ============================================================
        // 🆕 FLEET MANAGEMENT - Admin only
        // ============================================================
        if (fleetLink) {
            if (user.role === 'admin') {
                fleetLink.style.display = 'inline-block';
                console.log('✅ Fleet VISIBLE (admin)');
            } else {
                fleetLink.style.display = 'none';
                console.log('❌ Fleet HIDDEN (not admin)');
            }
        }
        
        // ============================================================
        // 🆕 REAL-TIME DASHBOARD - Admin only
        // ============================================================
        if (realtimeLink) {
            if (user.role === 'admin') {
                realtimeLink.style.display = 'inline-block';
                console.log('✅ Live Dashboard VISIBLE (admin)');
            } else {
                realtimeLink.style.display = 'none';
                console.log('❌ Live Dashboard HIDDEN (not admin)');
            }
        }
        
        // ============================================================
        // 🆕 SUPPORT TICKETS - Client & Admin (Different pages)
        // ============================================================
        if (ticketsLink) {
            if (user.role === 'admin') {
                ticketsLink.href = 'admin-tickets.html';
                ticketsLink.innerHTML = '<i class="fas fa-ticket-alt"></i> Tickets';
                ticketsLink.style.display = 'inline-block';
                console.log('✅ Tickets VISIBLE (admin)');
            } else if (user.role === 'client') {
                ticketsLink.href = 'support-tickets.html';
                ticketsLink.innerHTML = '<i class="fas fa-ticket-alt"></i> Support';
                ticketsLink.style.display = 'inline-block';
                console.log('✅ Support VISIBLE (client)');
            } else {
                ticketsLink.style.display = 'none';
                console.log('❌ Tickets HIDDEN (not client/admin)');
            }
        }
        
        // ============================================================
        // 🏢 WAREHOUSE NAVIGATION - ROLE BASED
        // ============================================================
        
        // --- Warehouse Management (Admin only) ---
        if (warehouseMgmtLink) {
            if (user.role === 'admin') {
                warehouseMgmtLink.style.display = 'inline-block';
                console.log('✅ Warehouse Mgmt VISIBLE (admin)');
            } else {
                warehouseMgmtLink.style.display = 'none';
                console.log('❌ Warehouse Mgmt HIDDEN (not admin)');
            }
        }
        
        // --- Warehouse Inventory (Admin only) ---
        if (warehouseInventoryLink) {
            if (user.role === 'admin') {
                warehouseInventoryLink.style.display = 'inline-block';
                console.log('✅ Inventory Mgmt VISIBLE (admin)');
            } else {
                warehouseInventoryLink.style.display = 'none';
                console.log('❌ Inventory Mgmt HIDDEN (not admin)');
            }
        }
        
        // --- Warehouse Service (Client only) ---
        if (warehouseServiceLink) {
            if (user.role === 'client') {
                warehouseServiceLink.style.display = 'inline-block';
                console.log('✅ My Storage VISIBLE (client)');
            } else {
                warehouseServiceLink.style.display = 'none';
                console.log('❌ My Storage HIDDEN (not client)');
            }
        }
        
        // --- Driver Warehouse (Driver only) ---
        if (driverWarehouseLink) {
            if (user.role === 'driver') {
                driverWarehouseLink.style.display = 'inline-block';
                console.log('✅ Pickups VISIBLE (driver)');
            } else {
                driverWarehouseLink.style.display = 'none';
                console.log('❌ Pickups HIDDEN (not driver)');
            }
        }
        
        // ============================================================
        // 🗺️ ROUTE NAVIGATION - ROLE BASED
        // ============================================================
        
        // --- Routes (Admin only) ---
        if (routesLink) {
            if (user.role === 'admin') {
                routesLink.style.display = 'inline-block';
                console.log('✅ Routes VISIBLE (admin)');
            } else {
                routesLink.style.display = 'none';
                console.log('❌ Routes HIDDEN (not admin)');
            }
        }
        
        // --- Create Route (Admin only) ---
        if (createRouteLink) {
            if (user.role === 'admin') {
                createRouteLink.style.display = 'inline-block';
                console.log('✅ Create Route VISIBLE (admin)');
            } else {
                createRouteLink.style.display = 'none';
                console.log('❌ Create Route HIDDEN (not admin)');
            }
        }
        
        // --- My Route (Admin and Driver) ---
        if (myRouteLink) {
            if (user.role === 'admin' || user.role === 'driver') {
                myRouteLink.style.display = 'inline-block';
                console.log('✅ My Route VISIBLE (admin/driver)');
            } else {
                myRouteLink.style.display = 'none';
                console.log('❌ My Route HIDDEN (client)');
            }
        }
        
        // --- User Name Display with Profile Picture ---
        fetch(`${API_BASE_URL}/user/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(userData => {
            if (userData && userData.profilePicture) {
                const profilePicUrl = `https://tamyokiy-backend-1.onrender.com${userData.profilePicture}`;
                if (userNameSpan) {
                    userNameSpan.style.display = 'inline-flex';
                    userNameSpan.style.alignItems = 'center';
                    userNameSpan.style.gap = '8px';
                    userNameSpan.style.background = 'rgba(212, 175, 55, 0.15)';
                    userNameSpan.style.padding = '5px 12px 5px 8px';
                    userNameSpan.style.borderRadius = '40px';
                    userNameSpan.innerHTML = `
                        <img src="${profilePicUrl}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #D4AF37;">
                        <span>${user.name}</span>
                    `;
                }
            } else {
                if (userNameSpan) {
                    userNameSpan.style.display = 'inline-flex';
                    userNameSpan.style.alignItems = 'center';
                    userNameSpan.style.gap = '8px';
                    userNameSpan.style.background = 'rgba(212, 175, 55, 0.15)';
                    userNameSpan.style.padding = '5px 12px 5px 8px';
                    userNameSpan.style.borderRadius = '40px';
                    userNameSpan.innerHTML = `<i class="fas fa-user-circle" style="font-size: 1.2rem;"></i> ${user.name}`;
                }
            }
        })
        .catch(err => {
            console.error('Error fetching profile:', err);
            if (userNameSpan) {
                userNameSpan.style.display = 'inline-flex';
                userNameSpan.style.alignItems = 'center';
                userNameSpan.style.gap = '8px';
                userNameSpan.style.background = 'rgba(212, 175, 55, 0.15)';
                userNameSpan.style.padding = '5px 12px 5px 8px';
                userNameSpan.style.borderRadius = '40px';
                userNameSpan.innerHTML = `<i class="fas fa-user-circle" style="font-size: 1.2rem;"></i> ${user.name}`;
            }
        });
        
    } else {
        // --- LOGGED OUT ---
        if (authLink) {
            authLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            authLink.href = 'login.html';
            authLink.onclick = null;
            authLink.style.display = 'inline-block';
        }
        
        if (profileLink) {
            profileLink.style.display = 'none';
        }
        
        if (forecastLink) {
            forecastLink.style.display = 'none';
            console.log('❌ Forecast link HIDDEN (not logged in)');
        }
        
        if (adminLink) {
            adminLink.style.display = 'none';
        }
        
        // Hide Fleet link when logged out
        if (fleetLink) {
            fleetLink.style.display = 'none';
        }
        
        // Hide Real-Time Dashboard link when logged out
        if (realtimeLink) {
            realtimeLink.style.display = 'none';
        }
        
        // Hide Support Tickets link when logged out
        if (ticketsLink) {
            ticketsLink.style.display = 'none';
        }
        
        // Hide all warehouse links when logged out
        if (warehouseMgmtLink) warehouseMgmtLink.style.display = 'none';
        if (warehouseInventoryLink) warehouseInventoryLink.style.display = 'none';
        if (warehouseServiceLink) warehouseServiceLink.style.display = 'none';
        if (driverWarehouseLink) driverWarehouseLink.style.display = 'none';
        
        // Hide all route links when logged out
        if (routesLink) routesLink.style.display = 'none';
        if (createRouteLink) createRouteLink.style.display = 'none';
        if (myRouteLink) myRouteLink.style.display = 'none';
        
        if (userNameSpan) {
            userNameSpan.style.display = 'none';
        }
    }
}

// ============================================================
// ADD NOTIFICATION BELL
// ============================================================
function addNotificationBellIfNeeded() {
    if (window.location.pathname.includes('admin.html')) return;
    
    const existingBell = document.querySelector('.notification-bell');
    if (!existingBell) {
        const navLinks = document.querySelector('.nav-links');
        const authLink = document.getElementById('authNavLink');
        
        if (navLinks) {
            const bellHtml = `
                <div class="notification-bell" onclick="toggleNotifications()">
                    <i class="fas fa-bell"></i>
                    <span id="notificationBadge" class="notification-badge" style="display: none;">0</span>
                </div>
            `;
            
            if (authLink) {
                authLink.insertAdjacentHTML('beforebegin', bellHtml);
            } else {
                navLinks.insertAdjacentHTML('beforeend', bellHtml);
            }
        }
    }
    
    if (!document.getElementById('notificationDropdown')) {
        const dropdownHtml = `
            <div id="notificationDropdown" class="notification-dropdown" style="display: none;">
                <div class="notification-header">
                    <h4>Notifications</h4>
                    <button onclick="markAllRead()" class="mark-read-btn">Mark all read</button>
                </div>
                <div id="notificationList" class="notification-list">
                    <p style="text-align:center; padding:20px;">Loading...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', dropdownHtml);
    }
}

// ============================================================
// CLOSE NOTIFICATION DROPDOWN
// ============================================================
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationDropdown');
    const bell = document.querySelector('.notification-bell');
    if (dropdown && bell && !bell.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// ============================================================
// LOGOUT FUNCTION
// ============================================================
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ============================================================
// CAREER APPLICATION HANDLERS
// ============================================================
window.applyForJob = function(position) {
    const name = prompt("Enter your full name:");
    if (!name) return;
    const email = prompt("Enter your email address:");
    if (!email) return;
    submitApplication(name, email, position);
};

window.openApplication = function() {
    const name = prompt("Enter your full name:");
    if (!name) return;
    const email = prompt("Enter your email address:");
    if (!email) return;
    const position = prompt("What position are you interested in?");
    if (!position) return;
    submitApplication(name, email, position);
};

async function submitApplication(name, email, position) {
    try {
        const response = await fetch(`${API_BASE_URL}/careers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, position })
        });
        const data = await response.json();
        if (data.success) {
            showToast(`✅ Application submitted for ${position}!`, 'success');
        } else {
            showToast('❌ Error: ' + data.message, 'error');
        }
    } catch (error) {
        showToast('❌ Connection error', 'error');
    }
}

// ============================================================
// SHIPMENT TRACKING
// ============================================================
window.trackShipment = async function() {
    const trackingNumber = document.getElementById('trackingNumber')?.value.trim();
    if (!trackingNumber) {
        showToast('Please enter a tracking number', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/tracking/${trackingNumber}`);
        const shipment = await response.json();
        if (shipment.message === 'Shipment not found') {
            showToast('Shipment not found', 'error');
            return;
        }
        displayShipment(shipment);
    } catch (error) {
        showToast('Error tracking shipment', 'error');
    }
};

function displayShipment(shipment) {
    const statusMap = {
        'pending': '📋 Pending',
        'picked_up': '📦 Picked Up',
        'in_transit': '🚚 In Transit',
        'out_for_delivery': '🚛 Out for Delivery',
        'delivered': '✅ Delivered'
    };
    
    const resultDiv = document.getElementById('trackingResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div class="result-card glass-card">
                <h3 style="color:#D4AF37;">Shipment Details</h3>
                <p><strong>Tracking:</strong> ${shipment.trackingNumber}</p>
                <p><strong>Status:</strong> ${statusMap[shipment.status]}</p>
                <p><strong>From:</strong> ${shipment.senderName} (${shipment.senderAddress})</p>
                <p><strong>To:</strong> ${shipment.receiverName} (${shipment.receiverAddress})</p>
                <p><strong>Weight:</strong> ${shipment.weight} kg</p>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
}

// ============================================================
// ON PAGE LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, updating navigation...');
    updateAuthNavigation();
    addNotificationBellIfNeeded();
    setTimeout(() => {
        if (localStorage.getItem('token')) {
            loadNotifications();
        }
    }, 500);
});

window.addEventListener('load', function() {
    console.log('📄 Window loaded, updating navigation...');
    updateAuthNavigation();
    addNotificationBellIfNeeded();
});

// ============================================================
// AUTO-REFRESH NOTIFICATIONS EVERY 30 SECONDS
// ============================================================
setInterval(() => {
    if (localStorage.getItem('token')) {
        loadNotifications();
    }
}, 30000);

// ============================================================
// ANIMATION STYLES
// ============================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-bell {
        position: relative;
        cursor: pointer;
        margin-left: 15px;
        font-size: 1.2rem;
        color: #D4AF37;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
    }
    .notification-bell:hover {
        transform: scale(1.05);
        color: #FFD700;
    }
    .notification-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff6b6b;
        color: white;
        font-size: 0.65rem;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 50%;
        min-width: 18px;
        text-align: center;
    }
    .notification-dropdown {
        position: fixed;
        top: 70px;
        right: 20px;
        width: 350px;
        max-height: 450px;
        background: #1a1a2e;
        border-radius: 16px;
        border: 1px solid rgba(212,175,55,0.3);
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        overflow: hidden;
        z-index: 10000;
    }
    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background: rgba(212,175,55,0.1);
        border-bottom: 1px solid rgba(212,175,55,0.2);
    }
    .notification-header h4 {
        color: #D4AF37;
        margin: 0;
        font-size: 1rem;
    }
    .mark-read-btn {
        background: transparent;
        border: 1px solid rgba(212,175,55,0.5);
        color: #D4AF37;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.7rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .mark-read-btn:hover {
        background: rgba(212,175,55,0.2);
    }
    .notification-list {
        max-height: 380px;
        overflow-y: auto;
    }
    .notification-list::-webkit-scrollbar {
        width: 4px;
    }
    .notification-list::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.05);
    }
    .notification-list::-webkit-scrollbar-thumb {
        background: #D4AF37;
        border-radius: 10px;
    }
    .notification-item {
        padding: 12px 15px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        cursor: pointer;
        transition: background 0.3s ease;
    }
    .notification-item:hover {
        background: rgba(212,175,55,0.08);
    }
    .notification-item.unread {
        background: rgba(212,175,55,0.05);
        border-left: 3px solid #D4AF37;
    }
    .notification-title {
        font-weight: 600;
        margin-bottom: 5px;
        color: #e0e0e0;
        font-size: 0.9rem;
    }
    .notification-message {
        font-size: 0.8rem;
        color: #b0b0b0;
        line-height: 1.4;
    }
    .notification-time {
        font-size: 0.65rem;
        color: #666;
        margin-top: 5px;
    }
`;
document.head.appendChild(style);

console.log('✅ script.js loaded successfully');