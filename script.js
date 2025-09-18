const colors = {
    primary: '#9c27b0',
    secondary: '#69f0ae',
    accent: '#ff4081',
    dark: '#2a004e',
    light: '#f5f5f5'
};

let animationState = {
    currentAnimation: '',
    currentColor: colors.primary
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function applyAnimation(elementId, animationClass) {
    const element = document.getElementById(elementId);
    
    if (!element) {
        console.error(`Element with ID ${elementId} not found!`);
        return false;
    }
    
    resetAnimations(elementId);
    
    element.classList.add(animationClass);
    
    animationState.currentAnimation = animationClass;
    
    return true;
}

function resetAnimations(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('animate-spin', 'animate-bounce', 'animate-shake', 'animate-pulse');
        element.style.backgroundColor = animationState.currentColor;
        animationState.currentAnimation = '';
    }
}

function changeElementColor(elementId, color) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundColor = color;
        animationState.currentColor = color;
        return true;
    }
    return false;
}

function showAnimationInfo(animationName) {
    const messages = {
        'animate-spin': 'Spin animation applied!',
        'animate-bounce': 'Bounce animation applied!',
        'animate-shake': 'Shake animation applied!',
        'animate-pulse': 'Pulse animation applied!'
    };
    
    return messages[animationName] || 'Animation applied!';
}

function initAnimationControls() {
    const spinBtn = document.getElementById('spin-btn');
    const bounceBtn = document.getElementById('bounce-btn');
    const shakeBtn = document.getElementById('shake-btn');
    const pulseBtn = document.getElementById('pulse-btn');
    const colorBtn = document.getElementById('color-btn');
    const resetBtn = document.getElementById('reset-btn');
    const animatedObject = document.getElementById('animated-object');
    
    spinBtn.addEventListener('click', function() {
        const success = applyAnimation('animated-object', 'animate-spin');
        if (success) {
            const message = showAnimationInfo('animate-spin');
            console.log(message);
        }
    });
    
    bounceBtn.addEventListener('click', function() {
        const success = applyAnimation('animated-object', 'animate-bounce');
        if (success) {
            const message = showAnimationInfo('animate-bounce');
            console.log(message);
        }
    });
    
    shakeBtn.addEventListener('click', function() {
        const success = applyAnimation('animated-object', 'animate-shake');
        if (success) {
            const message = showAnimationInfo('animate-shake');
            console.log(message);
            setTimeout(function() {
                animatedObject.classList.remove('animate-shake');
            }, 500);
        }
    });
    
    pulseBtn.addEventListener('click', function() {
        const success = applyAnimation('animated-object', 'animate-pulse');
        if (success) {
            const message = showAnimationInfo('animate-pulse');
            console.log(message);
        }
    });
    
    colorBtn.addEventListener('click', function() {
        const randomColor = getRandomColor();
        changeElementColor('animated-object', randomColor);
    });
    
    resetBtn.addEventListener('click', function() {
        resetAnimations('animated-object');
    });
    
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 1000);
            
            if (index === 0) {
                applyAnimation('animated-object', 'animate-spin');
            } else if (index === 1) {
                applyAnimation('animated-object', 'animate-bounce');
            } else if (index === 2) {
                const randomColor = getRandomColor();
                changeElementColor('animated-object', randomColor);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initAnimationControls();
    
    setTimeout(function() {
        applyAnimation('animated-object', 'animate-pulse');
    }, 1000);
});