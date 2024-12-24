document.addEventListener('DOMContentLoaded', () => {
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const soundContainers = document.querySelectorAll('.sound-container');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter sounds
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

    // Pause other audio when one starts playing
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
