// 遊戲狀態變數
let score = 0;
let correct = 0;
let total = 0;
let startTime = null;
let lastKeyTime = null;
let keyPressCount = 0;
let consecutiveWrong = 0; // 持續累加，直到正確才歸零

function addPenaltyChars() {
    const container = document.getElementById('container');
    for (let i = 0; i < 6; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char penalty'; // 多加 penalty class
        charSpan.textContent = getRandomChar();
        container.appendChild(charSpan);
    }

    const allChars = container.querySelectorAll('.char');
    allChars.forEach(char => char.classList.remove('current'));
    if (allChars.length > 0) {
        allChars[0].classList.add('current');
    }
}

// 產生隨機字母 (只包含小寫字母)
function getRandomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

// 產生新的字元
function add_new_chars() {
    const container = document.getElementById('container');
    // 隨機決定要產生1-3個字元
    const numChars = 1 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numChars; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = getRandomChar();
        container.appendChild(charSpan);
    }
    
    // 標記第一個字元為當前要輸入的字元
    const firstChar = container.querySelector('.char');
    if (firstChar) {
        firstChar.classList.add('current');
    }
}

// 更新統計數據
function updateStats() {
    document.getElementById('score').textContent = `得分: ${score}`;
    
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
    document.getElementById('accuracy').textContent = `準確率: ${accuracy}%`;
    
    // 計算打字速度 (字母/分鐘)
    if (startTime && keyPressCount > 10) {
        const minutes = (Date.now() - startTime) / 60000;
        const speed = Math.round(keyPressCount / minutes);
        document.getElementById('speed').textContent = `速度: ${speed} 字母/分鐘`;
    }
    
    // 更新進度條
    const progress = Math.min(100, score);
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressBar').textContent = `${progress}%`;
}

// 當網頁載入完成時
window.onload = function() {
    const container = document.getElementById('container');
    
    // 初始產生字元
    add_new_chars();
    updateStats();

    // 監聽鍵盤事件
    document.addEventListener("keydown", function(e) {
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
    
        if (!startTime) {
            startTime = Date.now();
        }
    
        keyPressCount++;
        total++;
    
        const firstChar = container.querySelector('.char.current');
    
        if (firstChar && e.key.toLowerCase() === firstChar.textContent.toLowerCase()) {
            firstChar.remove();
            correct++;
            score++;
            consecutiveWrong = 0; // 正確就歸零
    
            if (container.querySelectorAll('.char').length === 0) {
                add_new_chars();
            } else {
                const newFirstChar = container.querySelector('.char');
                if (newFirstChar) {
                    newFirstChar.classList.add('current');
                }
            }
        } else {
            score = Math.max(0, score - 0.5);
            consecutiveWrong++;
    
            // 每 3 次錯誤就加懲罰字母（例如第3,6,9次...）
            if (consecutiveWrong % 3 === 0) {
                addPenaltyChars();
            }
        }
    
        updateStats();
        lastKeyTime = Date.now();
    });

    // 點擊時自動聚焦
    container.addEventListener('click', function() {
        this.focus();
    });

    // 初始聚焦
    container.focus();
    
    // 自動產生新字元 (每3秒檢查一次)
    setInterval(function() {
        if (container.querySelectorAll('.char').length < 5) {
            add_new_chars();
        }
    }, 3000);
};



