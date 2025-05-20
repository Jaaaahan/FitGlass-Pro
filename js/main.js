document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 简单的轮播效果
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        const slider = document.querySelector('.testimonial-slider');
        const testimonialWidth = testimonials[0].offsetWidth + 30; // 加上间距
        slider.scrollTo({
            left: testimonialWidth * index,
            behavior: 'smooth'
        });
        currentTestimonial = index;
    }
    
    // 自动轮播
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 英雄区域视差效果
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollTop * 0.1}px)`;
        }
        
        // 技术部分视差效果
        const techImage = document.querySelector('.tech-image img');
        if (techImage) {
            const techSection = document.querySelector('.technology');
            const techOffset = techSection.offsetTop;
            const techScroll = scrollTop - techOffset + 500;
            
            if (techScroll > 0) {
                techImage.style.transform = `translateY(${techScroll * 0.05}px)`;
            }
        }
    });

    // 添加淡入效果
    const fadeElements = document.querySelectorAll('.feature-card, .tech-item, .design-image, .price-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(element);
    });
    
    document.addEventListener('scroll', function() {
        fadeElements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            if (position.top < window.innerHeight * 0.9) {
                element.style.opacity = '1';
            }
        });
    });
});

// 添加CSS类
document.head.insertAdjacentHTML('beforeend', `
<style>
.fade-in {
    opacity: 1 !important;
}
</style>
`);