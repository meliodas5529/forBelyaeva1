//Модальное окно
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.whitepace-user-modal');
    const loginTrigger = document.querySelector('.login-btn');
    const closeModal = document.querySelector('.whitepace-close-form');
    const switcherLinks = document.querySelectorAll('.whitepace-switcher a');
    const forms = document.querySelectorAll('.whitepace-form');
    
    
    if (loginTrigger) {
        loginTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('is-visible');
            document.querySelector('#whitepace-login').style.display = 'block';
        });
    }
    

    closeModal.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-visible');
    });
    

    switcherLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            

            document.querySelectorAll('.whitepace-user-modal-container > div').forEach(function(form) {
                form.style.display = 'none';
            });
            
            
            const target = this.getAttribute('href');
            if (target === '#0') {
                const text = this.textContent.trim();
                if (text === 'Sign in') {
                    document.querySelector('#whitepace-login').style.display = 'block';
                } else if (text === 'New account') {
                    document.querySelector('#whitepace-signup').style.display = 'block';
                }
            }
        });
    });
    
    
    document.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('is-visible');
        }
    });
    
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission would happen here in a real implementation');
            modal.classList.remove('is-visible');
        });
    });
});

//----------------------------------------------------------------------------------------//


//Скроллы//


document.addEventListener('DOMContentLoaded', function() {
   
    const navItems = document.querySelectorAll('.nav__item a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const menuItemText = this.textContent.trim();
            
            let targetSection;
            
            switch(menuItemText) {
                case 'Products':
                    targetSection = document.querySelector('.hero__content');
                    break;
                case 'Pricing':
                    targetSection = document.querySelector('.pricing__wrapper');
                    break;
                case 'Solutions':
                    targetSection = document.querySelector('.main-content__wrapper');
                    break;
                case 'Resources':
                    targetSection = document.querySelector('.integration__wrapper');
                    break;
                default:
                    return; 
            }
            
            if (targetSection) {

                const offset = 100; 
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});




//----------------------------------------------------------------------------------------//


//кнопка скролла вверх когда пользовательно дойдет до конца сайта//

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.title = 'Наверх';
    document.body.appendChild(scrollToTopBtn);
   
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '30px';
    scrollToTopBtn.style.right = '30px';
    scrollToTopBtn.style.zIndex = '999';
    scrollToTopBtn.style.width = '50px';
    scrollToTopBtn.style.height = '50px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = '#4F9CF9';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.fontSize = '20px';
    scrollToTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollToTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
    

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
   
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
});


// карточки с ценой//
document.addEventListener('DOMContentLoaded', function() {
   
    const cards = document.querySelectorAll('.pricing__card');
    
    const animateCards = () => {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.animation = 'fadeInUp 0.6s forwards';
            }
        });
    };
  
    animateCards();
    window.addEventListener('scroll', animateCards);
    
   
    const buttons = document.querySelectorAll('.pricing-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});




//----------------------------------------------------------------------------------------//
//Слайдер точками//

document.addEventListener('DOMContentLoaded', function() {
    const testimonialDots = document.querySelectorAll('.testimonial__dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    let currentIndex = 0;
    let slideInterval;

   
    function activateTestimonial(index) {
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        testimonialCards.forEach(card => card.classList.remove('active'));
        
        testimonialDots[index].classList.add('active');
        testimonialCards[index].classList.add('active');
        currentIndex = index;
        
        if (window.innerWidth < 992) {
            const container = document.querySelector('.testimonials__wrapper');
            container.insertBefore(testimonialCards[index], container.firstChild);
        }
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            activateTestimonial(currentIndex);
        }, 5000); 
    }

   
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval); 
            activateTestimonial(index);
            startAutoSlide(); 
        });
    });

   
    const testimonialSection = document.querySelector('.testimonials');
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSection.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

  
    activateTestimonial(0);
    startAutoSlide();
});


//----------------------------------------------------------------------------------------//
//( мухехе, не работает пкм?:Отключение пкм на сайте )//
function f1() {
  if (document.all) { return false; }
}

function f2(e) {
  if (document.layers || (document.getElementById && !document.all)) {
    if (e.which == 2 || e.which == 3) { return false; }
  }
}

if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = f1;
} else {
  document.onmouseup = f2;
  document.oncontextmenu = f1;
}

document.oncontextmenu = function() { return false; }; 


//----------------------------------------------------------------------------------------//
 