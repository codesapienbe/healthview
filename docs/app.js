// Global variables
let heartRateChart = null;
let respiratoryChart = null;
let demoInterval = null;
let heroInterval = null;
let isMonitoring = false;

// Demo data for simulation
const demoData = {
    heartRate: [],
    respiratoryRate: [],
    timestamps: []
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeHeroAnimation();
    initializeEventListeners();
    initializeScrollEffects();
});

// Initialize Chart.js charts
function initializeCharts() {
    const heartRateCtx = document.getElementById('heartRateChart');
    const respiratoryCtx = document.getElementById('respiratoryChart');
    
    if (heartRateCtx) {
        heartRateChart = new Chart(heartRateCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Heart Rate (BPM)',
                    data: [],
                    borderColor: '#007BFF',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        backgroundColor: '#007BFF'
                    }
                }
            }
        });
    }
    
    if (respiratoryCtx) {
        respiratoryChart = new Chart(respiratoryCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Respiratory Rate (/min)',
                    data: [],
                    borderColor: '#28A745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 10,
                        max: 25,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        backgroundColor: '#28A745'
                    }
                }
            }
        });
    }
}

// Initialize hero section animation
function initializeHeroAnimation() {
    const heroHr = document.getElementById('hero-hr');
    const heroRr = document.getElementById('hero-rr');
    
    if (heroHr && heroRr) {
        heroInterval = setInterval(() => {
            const baseHr = 72;
            const baseRr = 16;
            const hrVariation = Math.floor(Math.random() * 6) - 3; // -3 to +3
            const rrVariation = Math.floor(Math.random() * 4) - 2; // -2 to +2
            
            heroHr.textContent = `${baseHr + hrVariation} BPM`;
            heroRr.textContent = `${baseRr + rrVariation} /min`;
        }, 2000);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Demo controls
    const startDemoBtn = document.getElementById('start-demo');
    const stopDemoBtn = document.getElementById('stop-demo');
    
    if (startDemoBtn) {
        startDemoBtn.addEventListener('click', startVitalSignsDemo);
    }
    
    if (stopDemoBtn) {
        stopDemoBtn.addEventListener('click', stopVitalSignsDemo);
    }
    
    // Modal close listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Form submissions
    const forms = document.querySelectorAll('.contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .use-case-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Start vital signs demo
function startVitalSignsDemo() {
    if (isMonitoring) return;
    
    isMonitoring = true;
    const startBtn = document.getElementById('start-demo');
    const stopBtn = document.getElementById('stop-demo');
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    
    // Update UI
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-flex';
    statusIndicator.classList.add('active');
    statusText.textContent = 'Monitoring active...';
    
    // Initialize demo data
    demoData.heartRate = [];
    demoData.respiratoryRate = [];
    demoData.timestamps = [];
    
    // Start generating data
    demoInterval = setInterval(() => {
        generateVitalSignsData();
        updateCharts();
        updateVitalDisplays();
    }, 1000);
    
    // Show initial progress
    setTimeout(() => {
        statusText.textContent = 'Analyzing facial video...';
    }, 2000);
    
    setTimeout(() => {
        statusText.textContent = 'Extracting vital signs...';
    }, 4000);
    
    setTimeout(() => {
        statusText.textContent = 'Real-time monitoring active';
    }, 6000);
}

// Stop vital signs demo
function stopVitalSignsDemo() {
    isMonitoring = false;
    const startBtn = document.getElementById('start-demo');
    const stopBtn = document.getElementById('stop-demo');
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    
    // Clear interval
    if (demoInterval) {
        clearInterval(demoInterval);
        demoInterval = null;
    }
    
    // Update UI
    startBtn.style.display = 'inline-flex';
    stopBtn.style.display = 'none';
    statusIndicator.classList.remove('active');
    statusText.textContent = 'Monitoring stopped';
    
    setTimeout(() => {
        statusText.textContent = 'Ready to start';
    }, 2000);
}

// Generate simulated vital signs data
function generateVitalSignsData() {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    
    // Generate realistic heart rate data (65-85 BPM with some variation)
    const baseHeartRate = 72;
    const heartRateVariation = (Math.sin(Date.now() / 5000) * 5) + (Math.random() * 4 - 2);
    const heartRate = Math.round(baseHeartRate + heartRateVariation);
    
    // Generate realistic respiratory rate data (14-20 breaths/min)
    const baseRespiratoryRate = 16;
    const respiratoryVariation = (Math.sin(Date.now() / 8000) * 2) + (Math.random() * 2 - 1);
    const respiratoryRate = Math.round(baseRespiratoryRate + respiratoryVariation);
    
    // Add to demo data arrays
    demoData.heartRate.push(heartRate);
    demoData.respiratoryRate.push(respiratoryRate);
    demoData.timestamps.push(timestamp);
    
    // Keep only last 20 data points
    if (demoData.heartRate.length > 20) {
        demoData.heartRate.shift();
        demoData.respiratoryRate.shift();
        demoData.timestamps.shift();
    }
}

// Update charts with new data
function updateCharts() {
    if (heartRateChart) {
        heartRateChart.data.labels = demoData.timestamps;
        heartRateChart.data.datasets[0].data = demoData.heartRate;
        heartRateChart.update('none');
    }
    
    if (respiratoryChart) {
        respiratoryChart.data.labels = demoData.timestamps;
        respiratoryChart.data.datasets[0].data = demoData.respiratoryRate;
        respiratoryChart.update('none');
    }
}

// Update vital sign displays
function updateVitalDisplays() {
    const currentHr = document.getElementById('current-hr');
    const currentRr = document.getElementById('current-rr');
    const currentBp = document.getElementById('current-bp');
    const currentStress = document.getElementById('current-stress');
    
    if (demoData.heartRate.length > 0) {
        const latestHr = demoData.heartRate[demoData.heartRate.length - 1];
        const latestRr = demoData.respiratoryRate[demoData.respiratoryRate.length - 1];
        
        if (currentHr) currentHr.textContent = latestHr;
        if (currentRr) currentRr.textContent = latestRr;
        
        // Generate simulated blood pressure based on heart rate
        const systolic = Math.round(110 + (latestHr - 72) * 0.8 + Math.random() * 6 - 3);
        const diastolic = Math.round(70 + (latestHr - 72) * 0.4 + Math.random() * 4 - 2);
        if (currentBp) currentBp.textContent = `${systolic}/${diastolic}`;
        
        // Generate simulated stress index
        const stressBase = Math.max(0, Math.min(100, 25 + (latestHr - 72) * 2 + Math.random() * 10 - 5));
        if (currentStress) currentStress.textContent = Math.round(stressBase);
    }
}

// Modal functions
function openScheduleModal() {
    const modal = document.getElementById('schedule-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Form submission handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitButton.textContent = 'Request Sent!';
        submitButton.style.background = '#28A745';
        
        setTimeout(() => {
            // Close modal and reset form
            const modal = form.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 2000);
    }, 1500);
}

// Scroll to demo section
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility functions for smooth animations
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    const startTime = performance.now();
    const difference = end - start;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = start + (difference * easeOutCubic(progress));
        element.textContent = Math.round(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        if (heroInterval) {
            clearInterval(heroInterval);
        }
        if (demoInterval && isMonitoring) {
            clearInterval(demoInterval);
        }
    } else {
        // Resume animations when page becomes visible
        if (!heroInterval) {
            initializeHeroAnimation();
        }
        if (isMonitoring && !demoInterval) {
            demoInterval = setInterval(() => {
                generateVitalSignsData();
                updateCharts();
                updateVitalDisplays();
            }, 1000);
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (heroInterval) clearInterval(heroInterval);
    if (demoInterval) clearInterval(demoInterval);
});

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based navbar styling
const handleScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Initialize progressive loading for better performance
function initializeProgressiveLoading() {
    const imageElements = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        imageElements.forEach(img => imageObserver.observe(img));
    }
}

// Call progressive loading initialization
initializeProgressiveLoading();