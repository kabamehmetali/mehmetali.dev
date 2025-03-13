// Asynchronously load partial HTML files and attach event listeners.
async function loadPartials() {
    try {
      // Load navigation
      const navResponse = await fetch('/navigation.html');
      if (!navResponse.ok) throw new Error('Failed to load navigation');
      const navHtml = await navResponse.text();
      document.getElementById('navbar').innerHTML = navHtml;
      
      // Load footer
      const footerResponse = await fetch('/footer.html');
      if (!footerResponse.ok) throw new Error('Failed to load footer');
      const footerHtml = await footerResponse.text();
      document.getElementById('footer').innerHTML = footerHtml;
      
      // Attach event listeners after partials have been loaded.
      const menuToggle = document.querySelector('.menu-toggle');
      const closeBtn = document.querySelector('.close-btn');
      if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
      }
      if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
      }
    } catch (error) {
      console.error('Error loading partials:', error);
    }
}
  
function toggleMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}
  
// Star background animation code with moderate speeds
function initStars() {
    const canvas = document.getElementById("star-canvas");
    if (!canvas) {
        console.error("Star canvas not found");
        return;
    }
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const stars = [];

    // Create a new star with random properties, including rotation
    function createStar() {
        const star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0,
            maxRadius: Math.random() * 3 + 2,  // Maximum radius between 2 and 5
            opacity: 1,
            growth: Math.random() * 0.02 + 0.01, // Growth rate between 0.01 and 0.03 per frame (moderate)
            angle: Math.random() * Math.PI * 2,   // Starting rotation angle
            spin: Math.random() * 0.01 + 0.005      // Spin rate between 0.005 and 0.015 radians per frame (moderate)
        };
        stars.push(star);
    }

    // Function to draw a star shape with rotation
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, opacity, angle) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -outerRadius);
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;
        for (let i = 0; i < spikes; i++) {
            let x = Math.cos(rot) * outerRadius;
            let y = Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            x = Math.cos(rot) * innerRadius;
            y = Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(0, -outerRadius);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Increase star appearance frequency for more dots
        if (Math.random() < 0.2) {
            createStar();
        }

        // Update and draw each star
        for (let i = stars.length - 1; i >= 0; i--) {
            const star = stars[i];
            star.radius += star.growth;
            // Update rotation angle
            star.angle += star.spin;
            // Begin fading once maximum radius is reached
            if (star.radius >= star.maxRadius) {
                star.opacity -= 0.01; // moderate fade-out speed
            }
            if (star.opacity <= 0) {
                stars.splice(i, 1);
                continue;
            }
            // Draw a 5-pointed star using the current angle for rotation
            drawStar(ctx, star.x, star.y, 5, star.radius, star.radius / 2, star.opacity, star.angle);
        }
        requestAnimationFrame(animate);
    }

    animate();

    // Adjust canvas size when the window is resized.
    window.addEventListener('resize', resizeCanvas);
}

// Load the partials and start the star animation after the DOM content is loaded.
document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
    initStars();
});
