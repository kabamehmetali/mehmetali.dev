// main.js

async function loadPartials() {
    try {
      // Load Navigation Partial
      const navResponse = await fetch('/navigation.html');
      if (!navResponse.ok) throw new Error('Failed to load navigation');
      const navHtml = await navResponse.text();
      document.getElementById('navbar').innerHTML = navHtml;
  
      // Load Footer Partial
      const footerResponse = await fetch('/footer.html');
      if (!footerResponse.ok) throw new Error('Failed to load footer');
      const footerHtml = await footerResponse.text();
      document.getElementById('footer').innerHTML = footerHtml;
  
      // After partials load, attach events for toggling nav
      attachMenuToggle();
  
      // Always run star animation (stars now appear on all pages, including resume)
      initStars();
    } catch (error) {
      console.error('Error loading partials:', error);
    }
  }
  
  function attachMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const nav = document.querySelector('nav');
  
    function toggleMenu() {
      nav.classList.toggle('active');
    }
  
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', toggleMenu);
    }
  }
  
  /* The star animation, used on all pages */
  function initStars() {
    const canvas = document.getElementById("star-canvas");
    if (!canvas) {
      console.warn("No star-canvas found on this page. Skipping star animation.");
      return;
    }
  
    const ctx = canvas.getContext("2d");
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
  
    const stars = [];
    function createStar() {
      const star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 3 + 2,
        opacity: 1,
        growth: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.01 + 0.005
      };
      stars.push(star);
    }
  
    function drawStar(cx, cy, spikes, outerRadius, innerRadius, opacity, angle) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -outerRadius);
      let rot = (Math.PI / 2) * 3;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Chance to create a new star
      if (Math.random() < 0.2) {
        createStar();
      }
      // Update & draw each star
      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.radius += star.growth;
        star.angle += star.spin;
        if (star.radius >= star.maxRadius) {
          star.opacity -= 0.01;
        }
        if (star.opacity <= 0) {
          stars.splice(i, 1);
          continue;
        }
        drawStar(star.x, star.y, 5, star.radius, star.radius / 2, star.opacity, star.angle);
      }
      requestAnimationFrame(animate);
    }
  
    animate();
    window.addEventListener('resize', resizeCanvas);
  }
  
  // Load everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
  });
  