// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle.js for background effects
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ff7d00"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff7d00",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Scroll to section when clicking on nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (!link.classList.contains('btn')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                }
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Scroll down button in hero section
    const scrollDownBtn = document.getElementById('scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const gamemodesSection = document.getElementById('gamemodes');
            if (gamemodesSection) {
                window.scrollTo({
                    top: gamemodesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Fade-in animation for elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // If element is in viewport
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('appear');
            }
        });
    }
    
    // Check elements on load
    checkFade();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkFade);

    // Simulate player count (in a real scenario, you would fetch this from your server API)
    simulatePlayerCount();
    
    // Update server status
    updateServerStatus();
});

// Copy server IP to clipboard
function copyIP() {
    const ip = document.getElementById('ip').innerText;
    navigator.clipboard.writeText(ip).then(() => {
        // Create a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.innerText = 'IP Copied!';
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 2 seconds
        setTimeout(() => {
            tooltip.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 500);
        }, 1500);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Could not copy IP. Please copy it manually: play.FeatheryMC.org');
    });
}

// Simulate player count
function simulatePlayerCount() {
    // In a real scenario, you would fetch this data from your server API
    const minPlayers = 25;
    const maxPlayers = 150;
    const maxCapacity = 200;
    
    function updateCount() {
        const randomPlayers = Math.floor(Math.random() * (maxPlayers - minPlayers + 1)) + minPlayers;
        
        // Update player count display
        const playerCountElement = document.getElementById('player-count');
        if (playerCountElement) {
            playerCountElement.textContent = `${randomPlayers}/${maxCapacity}`;
        }
        
        // Update current players in server status
        const currentPlayersElement = document.getElementById('current-players');
        if (currentPlayersElement) {
            currentPlayersElement.textContent = `${randomPlayers}/${maxCapacity}`;
        }
        
        // Update progress bar
        const playersBar = document.getElementById('players-bar');
        if (playersBar) {
            const percentage = (randomPlayers / maxCapacity) * 100;
            playersBar.style.width = `${percentage}%`;
        }
        
        // Schedule next update (every 30-60 seconds)
        setTimeout(updateCount, Math.random() * 30000 + 30000);
    }
    
    // Initial update
    updateCount();
}

// Update server status
function updateServerStatus() {
    // In a real scenario, you would fetch this data from your server API
    const isOnline = Math.random() > 0.1; // 90% chance of being online for simulation
    
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const serverTps = document.getElementById('server-tps');
    
    if (statusDot && statusText) {
        if (isOnline) {
            statusDot.className = 'dot online';
            statusText.textContent = 'Online';
            
            // Simulate TPS (Ticks Per Second)
            if (serverTps) {
                const tps = (19 + Math.random()).toFixed(1);
                serverTps.textContent = tps;
            }
        } else {
            statusDot.className = 'dot offline';
            statusText.textContent = 'Offline';
            
            if (serverTps) {
                serverTps.textContent = 'N/A';
            }
        }
    }
    
    // Update uptime
    const uptimeElement = document.getElementById('server-uptime');
    if (uptimeElement) {
        const hours = Math.floor(Math.random() * 72) + 1;
        uptimeElement.textContent = `${hours} hours`;
    }
    
    // Schedule next update (every 1-2 minutes)
    setTimeout(updateServerStatus, Math.random() * 60000 + 60000);
}

// Add CSS for the copy tooltip
const style = document.createElement('style');
style.textContent = `
.copy-tooltip {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 125, 0, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 9999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: tooltip-appear 0.3s ease-out;
}

.copy-tooltip.fade-out {
    animation: tooltip-disappear 0.5s ease-out forwards;
}

@keyframes tooltip-appear {
    from { opacity: 0; transform: translate(-50%, -60%); }
    to { opacity: 1; transform: translate(-50%, -50%); }
}

@keyframes tooltip-disappear {
    from { opacity: 1; transform: translate(-50%, -50%); }
    to { opacity: 0; transform: translate(-50%, -40%); }
}

.scroll-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
}

.scroll-top.show {
    opacity: 1;
    visibility: visible;
}

.scroll-top:hover {
    background: var(--primary-dark);
    transform: translateY(-5px);
}
`;
document.head.appendChild(style);
