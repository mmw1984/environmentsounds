document.addEventListener('DOMContentLoaded', () => {
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const soundContainers = document.querySelectorAll('.sound-container');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;
            
            soundContainers.forEach(container => {
                if (category === 'all' || container.dataset.category === category) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });

    // Lazy loading for audio
    const lazyLoadAudio = () => {
        const audioElements = document.querySelectorAll('audio[data-src]');
        audioElements.forEach(audio => {
            if (audio.dataset.src) {
                audio.src = audio.dataset.src;
                audio.removeAttribute('data-src');
            }
        });
    };

    // Optional: Add loading animation
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('play', (e) => {
            const container = e.target.closest('.sound-container');
            container.classList.add('playing');
        });
        
        audio.addEventListener('pause', (e) => {
            const container = e.target.closest('.sound-container');
            container.classList.remove('playing');
        });
    });
});
