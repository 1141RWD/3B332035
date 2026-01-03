window.onload = function() {
    // 1. 保留原本的輪播圖片定位功能
    if (!window.location.hash) {
        window.location.hash = 'p1';
    }

    // 2. 標題打字機效果
    const h2s = document.querySelectorAll('article h2');
    h2s.forEach(h2 => {
        const text = h2.innerText;
        h2.innerText = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                h2.innerText += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        // 延遲一點點執行，讓畫面載入後再開始打字
        setTimeout(type, 300);
    });

    // 3. 捲動觸發：滑入效果 (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('article section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        observer.observe(section);
    });

    // 4. 獻出心臟點擊特效
    document.addEventListener('click', function(e) {
        const heart = document.createElement('div');
        heart.className = 'heart-effect';
        heart.innerHTML = '🖤';
        
        // 計算位置 (考慮到頁面捲動)
        heart.style.left = (e.pageX - 12) + 'px';
        heart.style.top = (e.pageY - 12) + 'px';
        
        document.body.appendChild(heart);

        // 動畫結束後移除元素，避免佔用記憶體
        setTimeout(() => {
            heart.remove();
        }, 1000);
    });
};