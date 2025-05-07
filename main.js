// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });
    
    // Active link switching
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after click
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
    
    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.querySelector('#keahlian');
    
    function animateProgressBars() {
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > skillsSectionTop - windowHeight + skillsSectionHeight / 3) {
            progressBars.forEach(progressBar => {
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            });
            
            // Remove the scroll event listener after animation
            window.removeEventListener('scroll', animateProgressBars);
        }
    }
    
    window.addEventListener('scroll', animateProgressBars);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted with values:', formValues);
            
            // Show success message (you can replace this with a more elegant solution)
            alert('Pesan Anda berhasil dikirim! Terima kasih telah menghubungi.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Portfolio items hover effect for touch devices
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            const wasActive = this.classList.contains('active-touch');
            
            // Remove active class from all items
            portfolioItems.forEach(i => i.classList.remove('active-touch'));
            
            // Add active class to current item if it wasn't already active
            if (!wasActive) {
                this.classList.add('active-touch');
            }
        }, { passive: true });
    });
    
    // Typing effect for hero section
    const roles = ["Web Developer", "UI/UX Designer", "Frontend Developer", "Freelancer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    const erasingDelay = 100;
    const newRoleDelay = 2000;
    
    function typeEffect() {
        const heroContentP = document.querySelector('.hero-content p');
        
        if (heroContentP) {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Removing characters
                heroContentP.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                // Adding characters
                heroContentP.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200;
            }
            
            // If finished typing the current role
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = newRoleDelay;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            setTimeout(typeEffect, typingDelay);
        }
    }
    // Fix untuk memastikan section tidak overlap
function fixSectionLayout() {
    const pengalamanSection = document.getElementById('pengalaman');
    const hubungiSection = document.getElementById('hubungi');
    
    // Memastikan position dan display yang tepat
    if (pengalamanSection && hubungiSection) {
        // Memastikan section Hubungi Saya berada di bawah section Pengalaman
        const clearBreak = document.querySelector('.clear-section-break');
        
        if (clearBreak) {
            clearBreak.style.display = 'block';
            clearBreak.style.clear = 'both';
        }
        
        // Untuk memastikan layout berfungsi pada semua browser
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }
}
    
    // Initialize typing effect
    // Uncomment the line below if you want to use the typing effect
    // setTimeout(typeEffect, 1000);
    
    // AOS initialization for animations (if you want to add AOS library)
    // AOS.init({
    //     duration: 1000,
    //     once: true,
    //     mirror: false
    // });
});