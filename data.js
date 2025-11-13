const questions = [
    {
        id: 1,
        question: "你的居住环境是？",
        options: [
            { text: "小户型/宿舍（<40㎡）", value: "small", score: { size: 1 } },
            { text: "中等户型（40-80㎡）", value: "medium", score: { size: 2 } },
            { text: "大户型/独栋（>80㎡）", value: "large", score: { size: 3 } }
        ]
    },
    {
        id: 2,
        question: "你的作息时间？",
        options: [
            { text: "朝九晚五，规律上班", value: "regular", score: { time: 2 } },
            { text: "经常加班/出差", value: "busy", score: { time: 1 } },
            { text: "在家办公/时间自由", value: "flexible", score: { time: 3 } }
        ]
    },
    {
        id: 3,
        question: "你希望宠物的性格是？",
        options: [
            { text: "安静独立，不粘人", value: "independent", score: { personality: 1 } },
            { text: "温顺亲人，喜欢陪伴", value: "affectionate", score: { personality: 3 } },
            { text: "活泼好动，精力充沛", value: "energetic", score: { personality: 2 } }
        ]
    },
    {
        id: 4,
        question: "你能接受的护理程度？",
        options: [
            { text: "简单护理就好", value: "low", score: { care: 1 } },
            { text: "定期护理", value: "medium", score: { care: 2 } },
            { text: "精心护理", value: "high", score: { care: 3 } }
        ]
    },
    {
        id: 5,
        question: "你的月度预算？",
        options: [
            { text: "500元以内", value: "low", score: { budget: 1 } },
            { text: "500-1500元", value: "medium", score: { budget: 2 } },
            { text: "1500元以上", value: "high", score: { budget: 3 } }
        ]
    }
];

const pets = [
    { id: 1, name: "橘老板", breed: "橘猫", type: "cat", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400", tags: ["#温顺亲人", "#适合新手"], description: "午后阳光里的小憨憨", aiReport: "你和它的作息出奇一致，都爱午后的小憩", matchScore: { size: 2, time: 2, personality: 3, care: 1, budget: 1 }, radar: { 亲人度: 90, 活跃度: 60, 独立性: 50, 安静度: 70, 护理难度: 30 } },
    { id: 2, name: "爱德华公爵", breed: "英国短毛猫", type: "cat", image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400", tags: ["#安静伴侣", "#适合上班族"], description: "有点傲娇的小可爱", aiReport: "独处时也不孤单，它能听懂沉默", matchScore: { size: 1, time: 1, personality: 1, care: 2, budget: 2 }, radar: { 亲人度: 70, 活跃度: 40, 独立性: 80, 安静度: 90, 护理难度: 40 } },
    { id: 3, name: "柴柴表情包", breed: "柴犬", type: "dog", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400", tags: ["#忠诚可靠", "#表情包"], description: "永远的微笑天使", aiReport: "它需要每天散步，但会用无限的忠诚回报你", matchScore: { size: 2, time: 3, personality: 2, care: 2, budget: 2 }, radar: { 亲人度: 85, 活跃度: 80, 独立性: 60, 安静度: 50, 护理难度: 50 } },
    { id: 4, name: "卷毛小可爱", breed: "泰迪犬", type: "dog", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400", tags: ["#小巧可爱", "#聪明"], description: "小小的身体，大大的聪明", aiReport: "它体型小巧，适合小户型", matchScore: { size: 1, time: 2, personality: 3, care: 3, budget: 2 }, radar: { 亲人度: 95, 活跃度: 70, 独立性: 40, 安静度: 60, 护理难度: 60 } },
    { id: 5, name: "微笑天使", breed: "萨摩耶", type: "dog", image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400", tags: ["#天使笑容", "#温柔"], description: "行走的棉花糖", aiReport: "它的温柔和笑容值得所有付出", matchScore: { size: 3, time: 3, personality: 3, care: 3, budget: 3 }, radar: { 亲人度: 100, 活跃度: 85, 独立性: 50, 安静度: 60, 护理难度: 80 } },
    { id: 6, name: "喵喵话痨", breed: "暹罗猫", type: "cat", image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400", tags: ["#话痨猫", "#粘人精"], description: "猫界的话痨", aiReport: "如果你喜欢热闹，它会是最好的陪伴", matchScore: { size: 1, time: 3, personality: 3, care: 2, budget: 2 }, radar: { 亲人度: 95, 活跃度: 75, 独立性: 30, 安静度: 40, 护理难度: 35 } },
    { id: 7, name: "田园守护者", breed: "中华田园猫", type: "cat", image: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400", tags: ["#身体强壮", "#省心"], description: "最朴实的陪伴", aiReport: "田园猫身体素质好，很少生病", matchScore: { size: 2, time: 1, personality: 2, care: 1, budget: 1 }, radar: { 亲人度: 75, 活跃度: 65, 独立性: 70, 安静度: 65, 护理难度: 20 } },
    { id: 8, name: "短腿小王子", breed: "柯基犬", type: "dog", image: "https://images.unsplash.com/photo-1612536981610-2e8a36a0e5f1?w=400", tags: ["#小短腿", "#活泼"], description: "腿短志气高", aiReport: "柯基体型适中，适合公寓饲养", matchScore: { size: 2, time: 2, personality: 2, care: 2, budget: 2 }, radar: { 亲人度: 88, 活跃度: 85, 独立性: 55, 安静度: 50, 护理难度: 45 } },
    { id: 9, name: "仙女喵", breed: "布偶猫", type: "cat", image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400", tags: ["#仙女猫", "#温柔"], description: "猫界的仙女", aiReport: "布偶猫性格极其温顺", matchScore: { size: 2, time: 3, personality: 3, care: 3, budget: 3 }, radar: { 亲人度: 98, 活跃度: 50, 独立性: 45, 安静度: 85, 护理难度: 75 } },
    { id: 10, name: "暖男金金", breed: "金毛寻回犬", type: "dog", image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400", tags: ["#暖男", "#聪明"], description: "永远的大暖男", aiReport: "金毛是最适合家庭的大型犬", matchScore: { size: 3, time: 3, personality: 3, care: 2, budget: 3 }, radar: { 亲人度: 100, 活跃度: 80, 独立性: 55, 安静度: 70, 护理难度: 55 } }
];
