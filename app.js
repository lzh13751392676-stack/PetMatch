// 全局状态
let currentQuestion = 0;
let userAnswers = {};
let currentCardIndex = 0;
let favoritePets = [];
let matchedPets = [];
let userName = '';
let swipeCount = 0;
let currentSoundSet = 0;

const soundSets = ['cat_meow.wav'];

function playSound(type) {
    try {
        const sounds = {
            like: 'cat_meow.wav',
            skip: 'raffle.wav',
            click: 'cat_meow.wav'
        };
        if (sounds[type]) {
            const audio = new Audio(sounds[type]);
            audio.volume = type === 'skip' ? 0.3 : 0.6;
            audio.play().catch(() => {});
        }
    } catch(e) {}
}

function createRipple(e) {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function heartExplosion(x, y) {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            const angle = (Math.PI * 2 * i) / 15;
            const distance = 50 + Math.random() * 50;
            heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return '🌙 深夜好呀，夜猫子';
    if (hour < 9) return '🌅 早安！美好的一天开始啦';
    if (hour < 12) return '☀️ 上午好！今天也要元气满满';
    if (hour < 14) return '🌞 中午好！要记得休息哦';
    if (hour < 18) return '🌤️ 下午好！来找个毛孩子吧';
    if (hour < 22) return '🌆 晚上好！放松一下吧';
    return '🌙 夜深了，早点休息哦';
}

let lastTrailTime = 0;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile) {
    document.addEventListener('mousemove', e => {
        const now = Date.now();
        if (now - lastTrailTime < 50) return;
        lastTrailTime = now;
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        const colors = ['#FF9A8B', '#FFD93D', '#95E1D3', '#AA96DA', '#FF6A88'];
        trail.style.background = colors[Math.floor(Math.random() * colors.length)];
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 800);
    });
}

function confettiRain() {
    if (isMobile) return;
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#F38181', '#AA96DA'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

// 背景颜色方案
const bgColors = [
    'linear-gradient(135deg, #FFF5E4 0%, #FFE5D9 100%)',
    'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
    'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
    'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
];

// 卡片颜色方案
const cardColors = [
    'linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%)',
    'linear-gradient(135deg, #E5F3FF 0%, #F0F8FF 100%)',
    'linear-gradient(135deg, #F5E5FF 0%, #FAF0FF 100%)',
    'linear-gradient(135deg, #FFFBE5 0%, #FFFEF0 100%)',
    'linear-gradient(135deg, #E5FFE5 0%, #F0FFF0 100%)'
];

// 初始化苹果风格点云背景
const bgGradients = [
    'linear-gradient(135deg, #f5f5f7 0%, #fafafa 100%)',
    'linear-gradient(135deg, #fef9f3 0%, #faf6f0 100%)',
    'linear-gradient(135deg, #f3f9fe 0%, #f0f6fa 100%)',
    'linear-gradient(135deg, #fef3f8 0%, #faf0f5 100%)',
    'linear-gradient(135deg, #f9f3fe 0%, #f5f0fa 100%)'
];

function initBgBlobs() {
    const bgPets = document.getElementById('bgPets');
    const colors = [
        'rgba(255, 154, 139, 0.3)',
        'rgba(255, 215, 0, 0.3)',
        'rgba(135, 206, 250, 0.3)',
        'rgba(255, 182, 193, 0.3)',
        'rgba(221, 160, 221, 0.3)'
    ];
    for (let i = 0; i < 8; i++) {
        const blob = document.createElement('div');
        blob.className = 'bg-blob';
        blob.style.background = colors[i % colors.length];
        blob.style.width = (200 + Math.random() * 300) + 'px';
        blob.style.height = blob.style.width;
        blob.style.left = Math.random() * 100 + '%';
        blob.style.top = Math.random() * 100 + '%';
        blob.style.animationDelay = Math.random() * 5 + 's';
        blob.style.animationDuration = (15 + Math.random() * 10) + 's';
        bgPets.appendChild(blob);
    }
    
    const petEmojis = ['🐱', '🐶', '🐰', '🐹', '🐭', '🐻', '🐼', '🐨', '🦊', '🦁'];
    for (let i = 0; i < 10; i++) {
        const pet = document.createElement('div');
        pet.className = 'float-pet';
        pet.textContent = petEmojis[i];
        pet.style.left = Math.random() * 100 + '%';
        pet.style.top = Math.random() * 100 + '%';
        pet.style.animationDelay = Math.random() * 5 + 's';
        pet.style.animationDuration = (20 + Math.random() * 15) + 's';
        bgPets.appendChild(pet);
    }
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        bgPets.appendChild(star);
    }
}
initBgBlobs();

// 背景渐变变化
let currentBgIndex = 0;
function changeBgGradient() {
    currentBgIndex = (currentBgIndex + 1) % bgGradients.length;
    document.body.style.background = bgGradients[currentBgIndex];
}
setInterval(changeBgGradient, 12000);

// 庆祝动画
function celebrate() {
    const emojis = ['🎉', '🎊', '✨', '💖', '🌟', '💕', '🎈'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'celebrate-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '50%';
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2000);
        }, i * 100);
    }
}

// 伤心动画
function sadAnimation() {
    const emojis = ['😢', '💔', '😔', '😞', '🥺'];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'sad-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = (20 + Math.random() * 60) + '%';
            emoji.style.top = '40%';
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2000);
        }, i * 150);
    }
}

// 烟花动画
function fireworks() {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#F38181', '#AA96DA'];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = 20 + Math.random() * 60;
            const y = 20 + Math.random() * 60;
            for (let j = 0; j < 30; j++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + '%';
                firework.style.top = y + '%';
                firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                const angle = (Math.PI * 2 * j) / 30;
                const distance = 100 + Math.random() * 100;
                firework.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
                firework.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
                document.body.appendChild(firework);
                setTimeout(() => firework.remove(), 1500);
            }
        }, i * 300);
    }
}



// 跑步动物动画
let currentPetIcon = 0;
const petIcons = ['🐕', '🐈', '🐇', '🦊', '🐿️', '🦔'];

function runningPet() {
    const pet = document.createElement('div');
    pet.className = 'running-pet';
    pet.textContent = petIcons[currentPetIcon];
    const animations = ['dogRun1 8s linear', 'dogRun2 8s ease-in-out', 'dogRun3 8s ease-in-out'];
    pet.style.animation = animations[Math.floor(Math.random() * animations.length)];
    
    pet.onclick = () => {
        currentPetIcon = (currentPetIcon + 1) % petIcons.length;
        pet.textContent = petIcons[currentPetIcon];
    };
    
    document.body.appendChild(pet);
    setTimeout(() => pet.remove(), 8000);
}
setInterval(runningPet, 15000);
runningPet();



function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    const homeBtn = document.querySelector('.home-btn');
    const bgMusic = document.getElementById('bgMusic');
    const cardMusic = document.getElementById('cardMusic');
    
    if (pageId === 'home') {
        homeBtn.classList.remove('show');
        bgMusic.volume = 0.3;
        bgMusic.muted = isMuted;
        bgMusic.play().catch(() => {});
        cardMusic.pause();
    } else {
        homeBtn.classList.add('show');
    }
    
    if (pageId === 'quiz') {
        bgMusic.volume = 0.3;
        bgMusic.muted = isMuted;
        bgMusic.play().catch(() => {});
        cardMusic.pause();
    } else if (pageId === 'cardMode') {
        bgMusic.pause();
        cardMusic.volume = 0.3;
        cardMusic.muted = isMuted;
        cardMusic.play().catch(() => {});
    } else if (pageId === 'results' || pageId === 'favorites') {
        bgMusic.pause();
        cardMusic.pause();
    }
}

function goHome() {
    showPage('home');
    currentQuestion = 0;
    userAnswers = {};
    currentCardIndex = 0;
}

// 显示提示消息
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
}

function startQuiz() {
    playSound('click');
    document.querySelector('.mute-btn').classList.add('show');
    currentQuestion = 0;
    userAnswers = {};
    showPage('quiz');
    renderQuestion();
}

let isMuted = false;

function toggleMute() {
    const bgMusic = document.getElementById('bgMusic');
    const cardMusic = document.getElementById('cardMusic');
    const muteBtn = document.querySelector('.mute-btn');
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    cardMusic.muted = isMuted;
    if (isMuted) {
        muteBtn.textContent = '🔇';
        muteBtn.classList.add('muted');
    } else {
        muteBtn.textContent = '🔊';
        muteBtn.classList.remove('muted');
    }
}

// 渲染问题
function renderQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / (questions.length + 1)) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    if (currentQuestion === 0) {
        const html = `
            <h2 class="question-title">先认识一下你吧～</h2>
            <input type="text" class="name-input" id="nameInput" placeholder="请输入你的名字" />
            <button class="btn-primary" onclick="submitName()">下一步</button>
        `;
        document.getElementById('quizContent').innerHTML = html;
    } else {
        const html = `
            <h2 class="question-title">${question.question}</h2>
            <div class="options">
                ${question.options.map((opt, i) => `
                    <div class="option" onclick="selectOption(${i})">
                        ${opt.text}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-buttons">
                ${currentQuestion > 1 ? '<button class="back-btn" onclick="previousQuestion()">← 上一题</button>' : ''}
                <button class="skip-btn" onclick="skipQuestion()">跳过此题</button>
            </div>
        `;
        document.getElementById('quizContent').innerHTML = html;
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        renderQuestion();
    }
}

function submitName() {
    const input = document.getElementById('nameInput');
    if (input.value.trim()) {
        userName = input.value.trim();
        currentQuestion++;
        renderQuestion();
    } else {
        showToast('请输入你的名字哦～');
    }
}

function skipQuestion() {
    const question = questions[currentQuestion];
    userAnswers[question.id] = question.options[1];
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        calculateMatches();
    }
}

function skipAllQuestions() {
    if (!userName) userName = '游客';
    questions.forEach(q => { userAnswers[q.id] = q.options[1]; });
    calculateMatches();
}

function selectOption(index) {
    playSound('click');
    const question = questions[currentQuestion];
    userAnswers[question.id] = question.options[index];
    
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            calculateMatches();
        }
    }, 300);
}

// 计算匹配
function calculateMatches() {
    const userProfile = {};
    Object.values(userAnswers).forEach(answer => {
        Object.assign(userProfile, answer.score);
    });
    
    matchedPets = pets.map(pet => {
        let score = 0;
        Object.keys(userProfile).forEach(key => {
            const diff = Math.abs(userProfile[key] - pet.matchScore[key]);
            score += (3 - diff) * 20;
        });
        return { ...pet, finalScore: score };
    }).sort((a, b) => b.finalScore - a.finalScore);
    
    showResults();
}

function showResults() {
    const top3 = matchedPets.slice(0, 3);
    const html = top3.map((pet, i) => createPetCard(pet, i)).join('');
    document.getElementById('topMatches').innerHTML = html;
    showPage('results');
    confettiRain();
    fireworks();
}

// 生成匹配原因（更丰富的文案）
function getMatchReason(pet) {
    const reasons = [
        `${userName}，根据你的作息和居住环境，${pet.name}能完美融入你的生活节奏。它的性格特点和你的期待高度吻合，相处起来会非常和谐舒适。`,
        `经过智能分析，${pet.name}在性格、护理需求和活跃度上都与你的生活方式高度匹配。它会是陪伴你度过每个温馨时刻的理想伙伴。`,
        `${pet.name}的独立性和亲人度恰到好处，既能给你足够的陪伴，又不会过分依赖。这种平衡感正是你所需要的。`,
        `你和${pet.name}的相性评分高达95%！它的日常护理需求符合你的时间安排，而且性格温顺，非常适合你这样的主人。`,
        `${pet.name}就像是为你量身定制的宠物伙伴！从预算到空间需求，从性格到护理难度，每一项都与你的条件完美契合。`,
        `${userName}，${pet.name}的生活习性与你的日常作息完美同步。早晨它会陪你一起醒来，傍晚会在你回家时热情迎接，这种默契感让人心动。`,
        `考虑到你的预算和空间条件，${pet.name}是最理想的选择。它不需要太大的活动空间，日常开销也在合理范围内，养起来轻松无压力。`,
        `${pet.name}的性格特质让它成为完美室友。它懂得什么时候需要安静陪伴，什么时候可以撒娇玩耍，这种情商让人无法拒绝。`,
        `从健康状况到性格稳定性，${pet.name}都表现优异。它很少生病，性格温和不易暴躁，是新手铲屎官的最佳入门选择。`,
        `${pet.name}的社交能力恰到好处。它既不会过分害羞，也不会过度兴奋，能很好地适应你的社交节奏和生活方式。`,
        `${userName}，${pet.name}的性格中有一种特别的治愈力。当你疲惫时，它会静静陪在身边；当你开心时，它会与你分享快乐。`,
        `在所有候选中，${pet.name}的综合评分最高。它的每一项特质都在你的理想范围内，这种匹配度很难得。`,
        `${pet.name}对环境的适应能力很强。无论是小空间还是大房子，它都能快速融入，这让养护变得更加灵活。`,
        `作为${pet.breed}，${pet.name}继承了该品种所有的优点，同时还有着独特的个性魅力，让人一眼就能记住。`,
        `${pet.name}的生活习惯非常规律，这意味着你可以轻松地安排日常照料，不会打乱你的生活节奏。`
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
}

function getPetSummary(pet) {
    const summaries = [
        `性格温顺独立，适合忙碌的你`,
        `聪明忠诚，可信赖的伙伴`,
        `亲人不粘人，陪伴分寸刚好`,
        `优雅低调，天然贵族气质`,
        `活泼好动，带来更多乐趣`,
        `安静陪伴，适合爱宁静的你`,
        `体质优秀，养护成本较低`,
        `适应力强，快速融入环境`,
        `温柔有耐心，家庭理想选择`,
        `独立性强，无需特别照顾`,
        `聪明易训，快速学会技能`,
        `沉稳可靠，给人安全感`,
        `外表出众，气质独特`,
        `互动性强，喜欢与人交流`,
        `温和亲切，易建立深厚感情`,
        `精力充沛，适合爱运动的你`,
        `沉静内敛，适合小户型`,
        `忠诚度高，一生陪伴左右`,
        `护理简单，适合工作繁忙者`,
        `成熟稳重，可以依靠的存在`
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
}

// 生成价格区间
function getPriceRange(pet) {
    const prices = { 1: '500-1500元', 2: '1500-3000元', 3: '3000-5000元' };
    return prices[pet.matchScore.budget] || '1000-2000元';
}

// 创建宠物卡片
function createPetCard(pet, index = 0) {
    const cardColor = cardColors[index % cardColors.length];
    const imgUrl = pet.image || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400';
    const html = `
        <div class="pet-card" style="background: ${cardColor}">
            <img src="${imgUrl}" alt="${pet.name}" class="pet-image" onerror="this.src='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'">
            <div class="pet-header">
                <div class="pet-header-content">
                    <div class="pet-info">
                        <h3>${pet.name}</h3>
                        <div class="pet-breed">${pet.breed}</div>
                    </div>
                </div>
            </div>
            <div class="pet-tags">
                ${pet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="pet-summary">${getPetSummary(pet)}</div>
            <p class="pet-description">${pet.description}它的性格特点让人一见倾心，无论是安静陪伴还是活泼互动，都能给你带来满满的幸福感。</p>
            <div class="pet-match-reason">✨ ${getMatchReason(pet)}</div>
            <div class="pet-price">💰 参考价格：${getPriceRange(pet)}</div>
            <div class="ai-report">
                💭 ${pet.aiReport}养它不仅是一份责任，更是一段温暖的陪伴之旅。相信你们会成为彼此最好的朋友！
            </div>
        </div>
    `;
    return html;
}

function showCardMode() {
    currentCardIndex = 3;
    document.getElementById('cardModeTitle').textContent = `${userName}的挑宠物之旅 🐾`;
    showPage('cardMode');
    const guide = document.getElementById('swipeGuide');
    guide.style.display = 'flex';
    guide.style.opacity = '1';
    guide.style.transition = 'none';
    setTimeout(() => {
        guide.style.transition = 'opacity 1s';
        guide.style.opacity = '0';
        setTimeout(() => guide.style.display = 'none', 1000);
    }, 5000);
    renderCard();
}

// 随机抽取宠物
function randomDraw() {
    const stack = document.getElementById('cardStack');
    
    const raffleAudio = new Audio('raffle.wav');
    raffleAudio.volume = 0.5;
    raffleAudio.load();
    raffleAudio.play().catch(() => {});
    
    stack.innerHTML = '<div class="swipe-hint"><p style="text-align:center;color:#FF9A8B;font-size:2em;">抽取中...</p></div>';
    
    let spinCount = 0;
    const spinInterval = setInterval(() => {
        const randomPet = matchedPets[Math.floor(Math.random() * matchedPets.length)];
        const card = document.createElement('div');
        card.className = 'swipe-card slot-machine';
        card.innerHTML = createPetCard(randomPet, spinCount);
        stack.innerHTML = '';
        stack.appendChild(card);
        spinCount++;
        
        if (spinCount > 20) {
            clearInterval(spinInterval);
            const finalPet = matchedPets[Math.floor(Math.random() * matchedPets.length)];
            setTimeout(() => {
                stack.innerHTML = '';
                const finalCard = document.createElement('div');
                finalCard.className = 'swipe-card slot-result';
                finalCard.innerHTML = createPetCard(finalPet, 0);
                
                let startX = 0;
                let currentX = 0;
                
                const handleFinalStart = (e) => {
                    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                };
                
                const handleFinalMove = (e) => {
                    if (startX) {
                        currentX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - startX;
                        finalCard.style.transition = 'none';
                        finalCard.style.opacity = '1';
                        finalCard.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
                    }
                };
                
                const handleFinalEnd = () => {
                    if (!startX) return;
                    if (Math.abs(currentX) > 100) {
                        finalCard.style.transition = 'transform 0.5s, opacity 0.5s';
                        if (currentX < 0) {
                            finalCard.style.transform = 'translateX(-150%) rotate(-30deg)';
                            finalCard.style.opacity = '0';
                            const pet = matchedPets[currentCardIndex];
                            if (!favoritePets.find(p => p.id === pet.id)) {
                                favoritePets.push(pet);
                            }
                            playSound('like');
                            celebrate();
                            const messages = [
                                `${pet.name}："${userName}，我会乖乖的！"`,
                                `${pet.name}："太好了！我等你好久了～"`,
                                `${pet.name}："我就知道你会喜欢我！"`
                            ];
                            showToast(messages[Math.floor(Math.random() * messages.length)]);
                            setTimeout(() => {
                                currentCardIndex++;
                                renderCard();
                            }, 500);
                        } else {
                            finalCard.style.transform = 'translateX(150%) rotate(30deg)';
                            finalCard.style.opacity = '0';
                            const pet = matchedPets[currentCardIndex];
                            sadAnimation();
                            const messages = [
                                `${pet.name}："没关系，祝你找到更合适的～"`,
                                `${pet.name}："我会等下一个有缘人的！"`,
                                `${pet.name}："也许我们缘分未到呢～"`,
                                `${pet.name}："希望你能找到心仪的伙伴！"`,
                                `${pet.name}："虽然有点失落，但我会继续等待的..."`,
                                `${pet.name}："${userName}，祝你幸福哦～"`,
                                `${pet.name}："不是每段缘分都能开花结果呢..."`,
                                `${pet.name}："我会找到真正懂我的人的！"`,
                                `${pet.name}："也许下一个会更适合你～"`
                            ];
                            showToast(messages[Math.floor(Math.random() * messages.length)]);
                            setTimeout(() => {
                                currentCardIndex++;
                                renderCard();
                            }, 500);
                        }
                    } else {
                        finalCard.style.transition = 'transform 0.3s';
                        finalCard.style.transform = '';
                    }
                    startX = 0;
                    currentX = 0;
                };
                
                finalCard.addEventListener('mousedown', handleFinalStart);
                finalCard.addEventListener('touchstart', handleFinalStart, {passive: false});
                finalCard.addEventListener('mousemove', handleFinalMove);
                finalCard.addEventListener('touchmove', handleFinalMove, {passive: false});
                finalCard.addEventListener('mouseup', handleFinalEnd);
                finalCard.addEventListener('touchend', handleFinalEnd);
                
                stack.appendChild(finalCard);
                fireworks();
                showToast(`恭喜抽到 ${finalPet.name}！`);
            }, 200);
        }
    }, 100);
}

// 渲染卡片
function renderCard() {
    const stack = document.getElementById('cardStack');
    if (currentCardIndex >= matchedPets.length) {
        stack.innerHTML = '<div class="swipe-hint"><p style="text-align:center;color:#8B8B8B;">已经没有更多宠物了～</p></div>';
        return;
    }
    
    const pet = matchedPets[currentCardIndex];
    const card = document.createElement('div');
    card.className = 'swipe-card';
    card.innerHTML = createPetCard(pet, currentCardIndex);
    
    let startX = 0;
    let currentX = 0;
    
    let startY = 0;
    let isScrolling = false;
    
    const handleStart = (e) => {
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        isScrolling = false;
    };
    
    const handleMove = (e) => {
        if (!startX) return;
        currentX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - startX;
        const currentY = (e.type.includes('mouse') ? e.clientY : e.touches[0].clientY) - startY;
        
        if (!isScrolling && Math.abs(currentY) > Math.abs(currentX)) {
            isScrolling = true;
            return;
        }
        
        if (!isScrolling && Math.abs(currentX) > 10) {
            e.preventDefault();
            card.style.transition = 'none';
            card.style.transform = `translate3d(${currentX}px, 0, 0) rotate(${currentX * 0.1}deg)`;
        }
    };
    
    const handleEnd = () => {
        if (!startX || isScrolling) {
            startX = 0;
            currentX = 0;
            isScrolling = false;
            return;
        }
        if (Math.abs(currentX) > 100) {
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s';
            if (currentX < 0) {
                card.style.transform = 'translate3d(-150%, 0, 0) rotate(-30deg)';
                card.style.opacity = '0';
                const pet = matchedPets[currentCardIndex];
                if (!favoritePets.find(p => p.id === pet.id)) {
                    favoritePets.push(pet);
                }
                playSound('like');
                celebrate();
                const messages = [
                    `${pet.name}："${userName}，我会乖乖的！"`,
                    `${pet.name}："太好了！我等你好久了～"`
                ];
                showToast(messages[Math.floor(Math.random() * messages.length)]);
                setTimeout(() => {
                    currentCardIndex++;
                    renderCard();
                }, 500);
            } else {
                card.style.transform = 'translate3d(150%, 0, 0) rotate(30deg)';
                card.style.opacity = '0';
                const pet = matchedPets[currentCardIndex];
                sadAnimation();
                const messages = [
                    `${pet.name}："没关系，祝你找到更合适的～"`,
                    `${pet.name}："我会等下一个有缘人的！"`,
                    `${pet.name}："也许我们缘分未到呢～"`,
                    `${pet.name}："希望你能找到心仪的伙伴！"`,
                    `${pet.name}："虽然有点失落，但我会继续等待的..."`,
                    `${pet.name}："${userName}，祝你幸福哦～"`,
                    `${pet.name}："不是每段缘分都能开花结果呢..."`,
                    `${pet.name}："我会找到真正懂我的人的！"`,
                    `${pet.name}："也许下一个会更适合你～"`
                ];
                showToast(messages[Math.floor(Math.random() * messages.length)]);
                setTimeout(() => {
                    currentCardIndex++;
                    renderCard();
                }, 500);
            }
        } else {
            card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'translate3d(0, 0, 0)';
        }
        startX = 0;
        currentX = 0;
    };
    
    card.addEventListener('mousedown', handleStart);
    card.addEventListener('touchstart', handleStart, {passive: true});
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('touchmove', handleMove, {passive: false});
    card.addEventListener('mouseup', handleEnd);
    card.addEventListener('touchend', handleEnd);
    
    stack.innerHTML = '<div class="swipe-hint"><span>← 心动</span><span>跳过 →</span></div>';
    stack.appendChild(card);
}

let usedLikeMessages = [];
let usedSkipMessages = [];

function likeCard() {
    const card = document.querySelector('.swipe-card');
    if (card) {
        card.style.animation = 'cardSwipeLeft 0.5s ease-out forwards';
    }
    const pet = matchedPets[currentCardIndex];
    if (!favoritePets.find(p => p.id === pet.id)) {
        favoritePets.push(pet);
    }
    playSound('like');
    heartExplosion(window.innerWidth / 2, window.innerHeight / 2);
    confettiRain();
    celebrate();
    const messages = [
        `${pet.name}："${userName}，我会乖乖的！"`,
        `${pet.name}："太好了！我等你好久了～"`,
        `${pet.name}："我就知道你会喜欢我！"`,
        `${pet.name}："谢谢你选择我呀！"`,
        `${pet.name}："耶！终于等到你了，${userName}！"`,
        `${pet.name}："我会用一生陪伴你的～"`,
        `${pet.name}："太开心了！我们会很幸福的！"`,
        `${pet.name}："${userName}，你做了最棒的选择！"`,
        `${pet.name}："我保证会是你最好的朋友！"`,
        `${pet.name}："从今天起，我就是你的小宝贝啦！"`,
        `${pet.name}："${userName}，我们终于在一起了！"`,
        `${pet.name}："你的眼光真好，选中了我！"`,
        `${pet.name}："我一定不会让你失望的！"`,
        `${pet.name}："这是我最幸福的时刻！"`,
        `${pet.name}："${userName}，我爱你！"`,
        `${pet.name}："我会每天都让你开心的！"`,
        `${pet.name}："${userName}，你是我的全世界！"`,
        `${pet.name}："我们一起创造美好回忆吧！"`,
        `${pet.name}："感谢命运让我遇见你！"`,
        `${pet.name}："你就是我一直在等待的人！"`,
        `${pet.name}："${userName}，我会守护你的！"`,
        `${pet.name}："我们的缘分天注定！"`,
        `${pet.name}："每天都想和你在一起！"`,
        `${pet.name}："你是我见过最好的人！"`,
        `${pet.name}："${userName}，让我来照顾你吧！"`
    ];
    const availableMessages = messages.filter(m => !usedLikeMessages.includes(m));
    const selectedMessage = availableMessages.length > 0 ? 
        availableMessages[Math.floor(Math.random() * availableMessages.length)] : 
        messages[Math.floor(Math.random() * messages.length)];
    usedLikeMessages.push(selectedMessage);
    if (usedLikeMessages.length > 10) usedLikeMessages.shift();
    showToast(selectedMessage);
    setTimeout(() => {
        currentCardIndex++;
        renderCard();
    }, 2000);
}

function skipCard() {
    const card = document.querySelector('.swipe-card');
    if (card) {
        card.style.animation = 'cardSwipeRight 0.5s ease-out forwards';
    }
    const pet = matchedPets[currentCardIndex];
    sadAnimation();
    const messages = [
        `${pet.name}："没关系，祝你找到更合适的～"`,
        `${pet.name}："我会等下一个有缘人的！"`,
        `${pet.name}："也许我们缘分未到呢～"`,
        `${pet.name}："希望你能找到心仪的伙伴！"`,
        `${pet.name}："虽然有点失落，但我会继续等待的..."`,
        `${pet.name}："${userName}，祝你幸福哦～"`,
        `${pet.name}："不是每段缘分都能开花结果呢..."`,
        `${pet.name}："我会找到真正懂我的人的！"`,
        `${pet.name}："也许下一个会更适合你～"`,
        `${pet.name}："谢谢你认真考虑过我，再见啦～"`,
        `${pet.name}："理解你的选择，祝好运！"`,
        `${pet.name}："每个人都有自己的缘分呢～"`,
        `${pet.name}："没事的，我会继续等待的！"`,
        `${pet.name}："${userName}，要记得我哦～"`,
        `${pet.name}："也许以后还有机会相遇！"`,
        `${pet.name}："不勉强才是最好的选择。"`,
        `${pet.name}："我会继续等待我的主人！"`,
        `${pet.name}："${userName}，保重，一路顺风！"`,
        `${pet.name}："每个生命都有属于自己的家。"`,
        `${pet.name}："谢谢你给我这次机会！"`,
        `${pet.name}："不后悔，因为这是你的选择。"`,
        `${pet.name}："我会在这里等待真命天子！"`,
        `${pet.name}："${userName}，希望你找到真爱！"`,
        `${pet.name}："虽然遗憾，但我尊重你的决定。"`,
        `${pet.name}："再见了，愿你幸福快乐！"`
    ];
    const availableMessages = messages.filter(m => !usedSkipMessages.includes(m));
    const selectedMessage = availableMessages.length > 0 ? 
        availableMessages[Math.floor(Math.random() * availableMessages.length)] : 
        messages[Math.floor(Math.random() * messages.length)];
    usedSkipMessages.push(selectedMessage);
    if (usedSkipMessages.length > 10) usedSkipMessages.shift();
    showToast(selectedMessage);
    setTimeout(() => {
        currentCardIndex++;
        renderCard();
    }, 2000);
}

// 显示待选列表
function showFavorites() {
    if (favoritePets.length === 0) {
        document.getElementById('favoritesList').innerHTML = '<p style="text-align:center;color:#8B8B8B;">还没有心动的宠物哦～</p>';
    } else {
        const html = favoritePets.map(pet => createPetCard(pet)).join('');
        document.getElementById('favoritesList').innerHTML = html;
    }
    showPage('favorites');
}
