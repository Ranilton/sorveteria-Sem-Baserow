function scrollToSection(sectionId) {
  document
    .querySelector(sectionId)
    .scrollIntoView({ behavior: "smooth" });
}

function viewProduct(name, image) {
  const url = `product-details.html?name=${encodeURIComponent(
    name
  )}&image=${encodeURIComponent(image)}`;
  window.location.href = url;
}

function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
      section.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
      });
  }
}

/* aparecero menu responsivo*/

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links li');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

document.addEventListener('click', (event) => {
  if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
    navLinks.classList.remove('active');
  }
});