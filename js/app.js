/**
 * ShoreSquad - Interactive App Features
 * Mobile-first, performance-optimized JavaScript
 */

// ============================================
// STATE MANAGEMENT
// ============================================
const app = {
    map: null,
    darkMode: localStorage.getItem('darkMode') === 'true' || 
              (window.matchMedia('(prefers-color-scheme: dark)').matches),
    userLocation: null,
    events: [],
    crew: {
        members: 0,
        cleanups: 0,
        totalWeight: 0
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadInitialData();
    if (app.darkMode) toggleDarkMode();
});

function initializeApp() {
    // Request geolocation permission
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                app.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                initializeMap();
            },
            error => {
                console.warn('Geolocation error:', error);
                // Default to popular beach location
                app.userLocation = { lat: 34.0195, lng: -118.4912 };
                initializeMap();
            }
        );
    }
}

// ============================================
// MAP FUNCTIONALITY (Leaflet Integration)
// ============================================
function initializeMap() {
    const { lat, lng } = app.userLocation;
    
    app.map = L.map('map-element').setView([lat, lng], 12);
    
    // Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        accessibility: true
    }).addTo(app.map);
    
    // User location marker
    const userMarker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: '#0066CC',
        color: '#0066CC',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(app.map).bindPopup('Your Location');
    
    // Add event markers (mock data)
    addEventMarkersToMap();
}

function addEventMarkersToMap() {
    const mockEvents = [
        { 
            id: 1, 
            name: 'Venice Beach Cleanup', 
            lat: 33.9850, 
            lng: -118.4695,
            time: '9:00 AM - 12:00 PM',
            date: '2025-12-07'
        },
        { 
            id: 2, 
            name: 'Santa Monica Pier Cleanup', 
            lat: 34.0195, 
            lng: -118.4912,
            time: '10:00 AM - 1:00 PM',
            date: '2025-12-08'
        },
        { 
            id: 3, 
            name: 'Manhattan Beach Sweep', 
            lat: 33.8815, 
            lng: -118.4110,
            time: '2:00 PM - 5:00 PM',
            date: '2025-12-09'
        }
    ];
    
    app.events = mockEvents;
    
    mockEvents.forEach(event => {
        const marker = L.marker([event.lat, event.lng], {
            icon: L.divIcon({
                html: `<div class="event-marker">🏖️</div>`,
                iconSize: [32, 32],
                className: 'custom-marker'
            })
        }).addTo(app.map);
        
        marker.bindPopup(`
            <strong>${event.name}</strong><br>
            📅 ${event.date}<br>
            🕐 ${event.time}
        `);
        
        marker.on('click', () => showEventModal(event));
    });
}

// ============================================
// EVENT MODAL
// ============================================
function showEventModal(event) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('eventModalBody');
    
    modalBody.innerHTML = `
        <div class="event-details">
            <div class="detail-item">
                <strong>📅 Date:</strong> ${event.date}
            </div>
            <div class="detail-item">
                <strong>🕐 Time:</strong> ${event.time}
            </div>
            <div class="detail-item">
                <strong>📍 Location:</strong> ${event.name}
            </div>
            <div class="detail-item">
                <strong>👥 Attendees:</strong> <span id="attendeeCount">0</span>
            </div>
            <div class="detail-item">
                <strong>📋 Description:</strong>
                <p>Join us for an exciting beach cleanup! Bring friends, family, and enthusiasm. 
                   All supplies provided. Help us keep our beaches clean! 🌊</p>
            </div>
        </div>
    `;
    
    const joinBtn = document.getElementById('joinEventBtn');
    joinBtn.onclick = () => {
        alert(`🎉 You've joined ${event.name}! Check your inbox for details.`);
        modal.classList.remove('active');
        // Update stats
        app.crew.cleanups++;
        updateCrewStats();
    };
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('eventModal').classList.remove('active');
}

// ============================================
// WEATHER INTEGRATION
// ============================================
function loadWeatherData() {
    // Mock weather data (replace with real API call)
    const weatherData = [
        {
            location: 'Venice Beach',
            temp: 72,
            condition: 'Sunny',
            humidity: 65,
            windSpeed: 8,
            tide: 'Low - 2:30 PM'
        },
        {
            location: 'Santa Monica',
            temp: 71,
            condition: 'Partly Cloudy',
            humidity: 68,
            windSpeed: 10,
            tide: 'High - 8:45 PM'
        }
    ];
    
    renderWeatherCards(weatherData);
}

function renderWeatherCards(data) {
    const container = document.getElementById('weatherContainer');
    container.innerHTML = data.map(weather => `
        <div class="weather-card" role="article" aria-label="Weather for ${weather.location}">
            <h4>${weather.location}</h4>
            <div class="weather-metric">
                <label>Temperature:</label>
                <value>${weather.temp}°F</value>
            </div>
            <div class="weather-metric">
                <label>Condition:</label>
                <value>${weather.condition}</value>
            </div>
            <div class="weather-metric">
                <label>Humidity:</label>
                <value>${weather.humidity}%</value>
            </div>
            <div class="weather-metric">
                <label>Wind:</label>
                <value>${weather.windSpeed} mph</value>
            </div>
            <div class="weather-metric">
                <label>Tide:</label>
                <value>${weather.tide}</value>
            </div>
        </div>
    `).join('');
}

// ============================================
// EVENTS RENDERING
// ============================================
function loadEventsData() {
    renderEventCards(app.events);
}

function renderEventCards(events) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = events.map(event => `
        <article class="event-card" role="button" tabindex="0" aria-label="Event: ${event.name}">
            <div class="event-card-image">🏖️</div>
            <div class="event-card-content">
                <h3>${event.name}</h3>
                <div class="event-meta">
                    <div class="event-meta-item">📅 ${event.date}</div>
                    <div class="event-meta-item">🕐 ${event.time}</div>
                </div>
                <div class="event-attendees">
                    <span>👥 ${Math.floor(Math.random() * 20 + 5)} attending</span>
                </div>
            </div>
        </article>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.event-card').forEach((card, index) => {
        card.addEventListener('click', () => showEventModal(events[index]));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') showEventModal(events[index]);
        });
    });
}

// ============================================
// CREW STATS
// ============================================
function updateCrewStats() {
    app.crew.members = Math.floor(Math.random() * 1000 + 100);
    app.crew.totalWeight = Math.floor(Math.random() * 50000 + 10000);
    
    const statsHtml = `
        <div class="stat-box">
            <div class="stat-number">${app.crew.members}</div>
            <div class="stat-label">Squad Members</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">${app.crew.cleanups}</div>
            <div class="stat-label">Total Cleanups</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">${(app.crew.totalWeight / 1000).toFixed(1)}K</div>
            <div class="stat-label">Lbs Collected</div>
        </div>
    `;
    
    document.getElementById('crewStats').innerHTML = statsHtml;
}

// ============================================
// THEME TOGGLE (Dark Mode)
// ============================================
function toggleDarkMode() {
    app.darkMode = !app.darkMode;
    document.documentElement.style.colorScheme = app.darkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', app.darkMode);
    
    const btn = document.getElementById('toggleThemeBtn');
    if (btn) {
        btn.textContent = app.darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function setupMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navMenu.classList.contains('active'));
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Navigation
    setupMobileNav();
    
    // Buttons
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    const useMyLocationBtn = document.getElementById('useMyLocationBtn');
    if (useMyLocationBtn) {
        useMyLocationBtn.addEventListener('click', () => {
            if (app.map && app.userLocation) {
                app.map.setView([app.userLocation.lat, app.userLocation.lng], 12);
            }
        });
    }
    
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', toggleDarkMode);
    }
    
    const inviteCrewBtn = document.getElementById('inviteCrewBtn');
    if (inviteCrewBtn) {
        inviteCrewBtn.addEventListener('click', () => {
            const text = `Check out ShoreSquad! Rally your crew and hit the next beach cleanup. 🌊 https://shoresquad.app`;
            if (navigator.share) {
                navigator.share({
                    title: 'ShoreSquad',
                    text: text,
                    url: window.location.href
                });
            } else {
                prompt('Share this link:', text);
            }
        });
    }
    
    // Modal close
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}

// ============================================
// DATA LOADING
// ============================================
function loadInitialData() {
    // Simulate loading delay for better UX
    setTimeout(() => {
        loadWeatherData();
        loadEventsData();
        updateCrewStats();
    }, 500);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Intersection Observer for lazy loading
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.event-card, .weather-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// ACCESSIBILITY
// ============================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Announce to screen readers
function announce(message) {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 3000);
}

// ============================================
// SERVICE WORKER (PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('SW registration failed:', err);
        });
    });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = app;
}
