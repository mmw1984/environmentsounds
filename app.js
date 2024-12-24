document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有分類按鈕和聲音容器
    const categoryButtons = document.querySelectorAll('.category-btn');
    const soundContainers = document.querySelectorAll('.sound-container');
    const audioElements = document.querySelectorAll('audio');

    // 分類過濾功能
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活動按鈕狀態
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 過濾聲音
            const category = button.dataset.category;
            soundContainers.forEach(container => {
                if (category === 'all' || container.dataset.category === category) {
                    container.style.display = 'block';
                    container.style.animation = 'fadeIn 0.5s ease';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });

    // 當一個音頻開始播放時暫停其他音頻
    audioElements.forEach(audio => {
        audio.addEventListener('play', () => {
            audioElements.forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });

        // 添加錯誤處理
        audio.addEventListener('error', (e) => {
            console.error('音頻加載錯誤:', e);
            const soundContainer = audio.closest('.sound-container');
            if (soundContainer) {
                const soundName = soundContainer.querySelector('.sound-name');
                if (soundName) {
                    soundName.style.color = '#ff0000';
                    soundName.textContent += ' (加載失敗)';
                }
            }
        });
    });
});
