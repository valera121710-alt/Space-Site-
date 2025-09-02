// Создание звездного фона
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.getElementById('stars');
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Разное время анимации для мерцания
        const animationDuration = Math.random() * 5 + 3;
        star.style.animationDuration = `${animationDuration}s`;
        
        // Случайная задержка анимации
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Анимация планет
    const planets = {
        mercury: document.getElementById('mercury'),
        venus: document.getElementById('venus'),
        earth: document.getElementById('earth'),
        mars: document.getElementById('mars'),
        jupiter: document.getElementById('jupiter')
    };
    
    let speed = 1;
    let isPaused = false;
    let animationId;
    let startTime = Date.now();
    let pausedTime = 0;
    let pauseStart = 0;
    
    function animatePlanets() {
        if (isPaused) return;
        
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime - pausedTime) * 0.001;
        
        planets.mercury.style.transform = `rotate(${elapsedTime * 4.1}rad) translateX(70px) rotate(-${elapsedTime * 4.1}rad)`;
        planets.venus.style.transform = `rotate(${elapsedTime * 1.6}rad) translateX(100px) rotate(-${elapsedTime * 1.6}rad)`;
        planets.earth.style.transform = `rotate(${elapsedTime}rad) translateX(140px) rotate(-${elapsedTime}rad)`;
        planets.mars.style.transform = `rotate(${elapsedTime * 0.5}rad) translateX(180px) rotate(-${elapsedTime * 0.5}rad)`;
        planets.jupiter.style.transform = `rotate(${elapsedTime * 0.08}rad) translateX(230px) rotate(-${elapsedTime * 0.08}rad)`;
        
        animationId = requestAnimationFrame(animatePlanets);
    }
    
    // Управление анимацией
    document.getElementById('speedUp').addEventListener('click', () => {
        speed *= 1.5;
        updateSpeed();
    });
    
    document.getElementById('speedDown').addEventListener('click', () => {
        speed /= 1.5;
        updateSpeed();
    });
    
    document.getElementById('pause').addEventListener('click', () => {
        isPaused = !isPaused;
        document.getElementById('pause').textContent = isPaused ? 'Продолжить' : 'Пауза';
        
        if (isPaused) {
            pauseStart = Date.now();
            cancelAnimationFrame(animationId);
        } else {
            pausedTime += Date.now() - pauseStart;
            animatePlanets();
        }
    });
    
    document.getElementById('reset').addEventListener('click', () => {
        speed = 1;
        isPaused = false;
        startTime = Date.now();
        pausedTime = 0;
        document.getElementById('pause').textContent = 'Пауза';
        updateSpeed();
        animatePlanets();
    });
    
    function updateSpeed() {
        // Обновляем время начала с учетом новой скорости
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime - pausedTime) * 0.001;
        startTime = currentTime - elapsedTime * 1000 / speed - pausedTime;
        pausedTime = 0;
        
        if (!isPaused) {
            cancelAnimationFrame(animationId);
            animatePlanets();
        }
    }
    
    // Запуск анимации
    animatePlanets();
    
    // Добавляем немного случайности в орбиты
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach(orbit => {
        // Случайный наклон орбиты
        orbit.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;
    });
});
