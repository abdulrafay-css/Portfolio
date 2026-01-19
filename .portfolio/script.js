// ==================== SCROLL REVEAL ANIMATION ====================
// This function makes elements fade in and slide up when they scroll into view

// Select all elements with the "reveal" class
const reveals = document.querySelectorAll(".reveal");

// Function to check if elements are in viewport and reveal them
function revealOnScroll() {
    // Loop through each element that needs to be revealed
    reveals.forEach(el => {
        // Get the height of the browser window
        const windowHeight = window.innerHeight;

        // Get the distance from the top of the element to the top of the viewport
        const elementTop = el.getBoundingClientRect().top;

        // Check if element is in view (100px before it enters viewport)
        if (elementTop < windowHeight - 100) {
            // Make element visible
            el.style.opacity = "1";
            // Move element to its original position (remove translateY)
            el.style.transform = "translateY(0)";
            // Smooth transition effect
            el.style.transition = "0.8s ease";
        }
    });
}

// Run the reveal function when user scrolls
window.addEventListener("scroll", revealOnScroll);

// Run reveal function on page load (for elements already in view)
revealOnScroll();


// ==================== SMOOTH NAVBAR SCROLL EFFECT ====================
// Add background to navbar when scrolling down

// Get the navbar element
const navbar = document.querySelector("nav");

// Function to handle navbar background on scroll
function handleNavbarScroll() {
    // Check if page is scrolled more than 50 pixels
    if (window.scrollY > 50) {
        // Add darker background and shadow when scrolled
        navbar.style.background = "rgba(17, 17, 34, 0.95)";
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    } else {
        // Return to original transparent background at top
        navbar.style.background = "rgba(255,255,255,0.08)";
        navbar.style.boxShadow = "none";
    }
}

// Listen for scroll events
window.addEventListener("scroll", handleNavbarScroll);


// ==================== CARD TILT EFFECT ====================
// Add 3D tilt effect to cards when hovering

// Select all project cards
const cards = document.querySelectorAll(".card");

// Loop through each card and add mouse move listener
cards.forEach(card => {
    // When mouse moves over the card
    card.addEventListener("mousemove", (e) => {
        // Get card dimensions and position
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left; // X position within the card
        const y = e.clientY - rect.top;  // Y position within the card

        // Calculate rotation values based on mouse position
        // Center is 0, edges are ±15 degrees
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Vertical tilt (inverted)
        const rotateY = ((x - centerX) / centerX) * 10;  // Horizontal tilt

        // Apply 3D transform to card
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // When mouse leaves the card, reset to original position
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
});


// ==================== FORM SUBMISSION HANDLER ====================
// Handle contact form submission (for contact.html)

// This function will run when the form is submitted
function handleSubmit(event) {
    // Prevent default form submission (page reload)
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Show success message
    alert(`Thank you ${name}! Your message has been sent. I'll get back to you at ${email} soon!`);

    // Reset form fields
    event.target.reset();

    // Here you would typically send the data to a server
    // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify({name, email, subject, message}) })
}


// ==================== PARALLAX SCROLL EFFECT ====================
// Create parallax effect on hero section

// Get the hero section
const hero = document.querySelector(".hero");

// Only add parallax if hero exists on current page
if (hero) {
    window.addEventListener("scroll", () => {
        // Get scroll position
        const scrolled = window.scrollY;

        // Move hero content slower than scroll speed for parallax effect
        // This creates depth illusion
        const parallaxElements = hero.querySelectorAll("h1, p, button");

        parallaxElements.forEach((el, index) => {
            // Each element moves at slightly different speed
            const speed = (index + 1) * 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}


// ==================== ANIMATED COUNTER ====================
// Animate numbers counting up (useful for stats sections)

function animateCounter(element, target, duration = 2000) {
    // Start from 0
    let current = 0;

    // Calculate increment per frame
    const increment = target / (duration / 16); // 16ms per frame (60fps)

    // Create interval to update number
    const timer = setInterval(() => {
        current += increment;

        // Check if we've reached the target
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer); // Stop the counter
        } else {
            // Update the displayed number (rounded)
            element.textContent = Math.floor(current);
        }
    }, 16); // Run every 16ms (60fps)
}

// Example usage: animateCounter(document.querySelector('.stat-number'), 100);


// ==================== TYPING EFFECT ====================
// Create typewriter effect for text

function typeWriter(element, text, speed = 100) {
    // Start with empty text
    let i = 0;
    element.textContent = "";

    // Add one character at a time
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer); // Stop when complete
        }
    }, speed);
}

// Example usage: typeWriter(document.querySelector('h1'), 'Welcome to my portfolio!', 100);


// ==================== LAZY LOADING IMAGES ====================
// Load images only when they're about to enter viewport (performance optimization)

// Get all images with lazy-load class
const lazyImages = document.querySelectorAll("img[data-src]");

// Create intersection observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If image is in viewport
        if (entry.isIntersecting) {
            const img = entry.target;

            // Replace src with data-src (actual image)
            img.src = img.dataset.src;

            // Remove lazy-load class
            img.classList.remove("lazy");

            // Stop observing this image
            observer.unobserve(img);
        }
    });
});

// Start observing all lazy images
lazyImages.forEach(img => imageObserver.observe(img));


// ==================== SMOOTH SCROLL TO SECTION ====================
// Smooth scroll to specific section when clicking nav links

// Get all anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

// Add click listener to each anchor link
anchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        // Prevent default jump behavior
        e.preventDefault();

        // Get target section ID
        const targetId = link.getAttribute("href");

        // Find the target element
        const targetSection = document.querySelector(targetId);

        // Scroll to target smoothly
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ==================== MOUSE TRAIL EFFECT ====================
// Create trailing dots that follow mouse cursor (optional cool effect)

// Store mouse coordinates
let mouseX = 0;
let mouseY = 0;

// Array to store trail dots
let dots = [];

// Track mouse movement
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Function to create trail effect (call this only if you want the effect)
function createMouseTrail() {
    // Create a dot element
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.width = "5px";
    dot.style.height = "5px";
    dot.style.backgroundColor = "#6c63ff";
    dot.style.borderRadius = "50%";
    dot.style.pointerEvents = "none"; // Don't interfere with clicking
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
    dot.style.opacity = "0.6";
    dot.style.zIndex = "9999";

    // Add to page
    document.body.appendChild(dot);

    // Remove after animation
    setTimeout(() => {
        dot.style.transition = "opacity 0.5s";
        dot.style.opacity = "0";
        setTimeout(() => dot.remove(), 500);
    }, 100);
}

// Uncomment below to enable mouse trail effect
// setInterval(createMouseTrail, 50);


// ==================== SCROLL PROGRESS BAR ====================
// Show page scroll progress at top of screen

// Create progress bar element
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.background = "linear-gradient(90deg, #6c63ff, #5b4bff)";
progressBar.style.zIndex = "10000";
progressBar.style.transition = "width 0.1s";

// Add to page
document.body.appendChild(progressBar);

// Update progress bar on scroll
window.addEventListener("scroll", () => {
    // Calculate scroll percentage
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    // Update progress bar width
    progressBar.style.width = scrolled + "%";
});


// ==================== BACK TO TOP BUTTON ====================
// Show button when scrolled down, click to scroll to top

// Create back to top button
const backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = "↑"; // Up arrow
backToTopBtn.style.position = "fixed";
backToTopBtn.style.bottom = "30px";
backToTopBtn.style.right = "30px";
backToTopBtn.style.width = "50px";
backToTopBtn.style.height = "50px";
backToTopBtn.style.borderRadius = "50%";
backToTopBtn.style.background = "#6c63ff";
backToTopBtn.style.color = "white";
backToTopBtn.style.border = "none";
backToTopBtn.style.fontSize = "24px";
backToTopBtn.style.cursor = "pointer";
backToTopBtn.style.opacity = "0";
backToTopBtn.style.zIndex = "1000";
backToTopBtn.style.transition = "all 0.3s ease";
backToTopBtn.style.boxShadow = "0 4px 12px rgba(108, 99, 255, 0.4)";

// Add to page
document.body.appendChild(backToTopBtn);

// Show/hide based on scroll position
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        // Show button when scrolled 300px
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "auto";
    } else {
        // Hide button at top of page
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
    }
});

// Scroll to top when clicked
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener("mouseenter", () => {
    backToTopBtn.style.transform = "scale(1.1)";
    backToTopBtn.style.boxShadow = "0 6px 20px rgba(108, 99, 255, 0.6)";
});

backToTopBtn.addEventListener("mouseleave", () => {
    backToTopBtn.style.transform = "scale(1)";
    backToTopBtn.style.boxShadow = "0 4px 12px rgba(108, 99, 255, 0.4)";
});


// ==================== PAGE LOAD ANIMATION ====================
// Fade in page content when page loads

window.addEventListener("load", () => {
    // Add loaded class to body
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s";

    // Fade in after short delay
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});


// ==================== CONSOLE MESSAGE ====================
// Fun message in browser console for developers

console.log("%cWelcome to my Portfolio! 👋", "color: #6c63ff; font-size: 20px; font-weight: bold;");
console.log("%cLike what you see? Let's work together!", "color: #fff; font-size: 14px;");
console.log("%cContact: yourname@email.com", "color: #6c63ff; font-size: 12px;");