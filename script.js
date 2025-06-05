document.addEventListener('DOMContentLoaded', function() {
    // Efecto de partículas para el header
    const header = document.querySelector('header');
    if (header) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(41, 98, 255, ${Math.random() * 0.5 + 0.1})`;
            particle.style.position = 'absolute';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.borderRadius = '50%';
            particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            header.appendChild(particle);
        }
    }

    // Smooth scroll mejorado
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Cambiar clase activa
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('section, .servicio');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuración inicial para animaciones
    document.querySelectorAll('section, .servicio').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar
    
    // Manejo del formulario con efecto de terminal
    const formulario = document.getElementById('formulario-contacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const boton = this.querySelector('button');
            const icono = boton.querySelector('i');
            const textoOriginal = boton.innerHTML;
            
            // Efecto de carga
            boton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Procesando...';
            boton.disabled = true;
            
            // Simular envío a la nube
            setTimeout(() => {
                const nombre = document.getElementById('nombre').value;
                
                // Crear notificación
                const notificacion = document.createElement('div');
                notificacion.className = 'notificacion';
                notificacion.innerHTML = `
                    <p><i class="fas fa-check-circle" style="color: var(--color-acento);"></i> Mensaje enviado a la nube</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Gracias ${nombre}, nos pondremos en contacto pronto.</p>
                `;
                document.body.appendChild(notificacion);
                
                // Mostrar notificación
                setTimeout(() => {
                    notificacion.classList.add('mostrar');
                }, 100);
                
                // Ocultar notificación después de 5 segundos
                setTimeout(() => {
                    notificacion.classList.remove('mostrar');
                    setTimeout(() => {
                        notificacion.remove();
                    }, 500);
                }, 5000);
                
                // Restablecer formulario
                formulario.reset();
                boton.innerHTML = textoOriginal;
                boton.disabled = false;
            }, 2000);
        });
    }
    
    // Cambiar clase activa según scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Efecto de escritura para el título
    const titulo = document.querySelector('header h1');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        let i = 0;
        const velocidad = 150; // ms entre caracteres
        
        function typeWriter() {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(typeWriter, velocidad);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});