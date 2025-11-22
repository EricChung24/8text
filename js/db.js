/* ----------------------------------------------------------------
           1. 基礎資料庫 (Stems, Branches, NaYin)
           ---------------------------------------------------------------- */
        const STEMS = [
            { char: '甲', el: 'wood', yinYang: 'yang' }, { char: '乙', el: 'wood', yinYang: 'yin' },
            { char: '丙', el: 'fire', yinYang: 'yang' }, { char: '丁', el: 'fire', yinYang: 'yin' },
            { char: '戊', el: 'earth', yinYang: 'yang' }, { char: '己', el: 'earth', yinYang: 'yin' },
            { char: '庚', el: 'gold', yinYang: 'yang' }, { char: '辛', el: 'gold', yinYang: 'yin' },
            { char: '壬', el: 'water', yinYang: 'yang' }, { char: '癸', el: 'water', yinYang: 'yin' }
        ];

        const BRANCHES = [
            { char: '子', el: 'water', hidden: ['癸'] },
            { char: '丑', el: 'earth', hidden: ['己', '癸', '辛'] },
            { char: '寅', el: 'wood', hidden: ['甲', '丙', '戊'] },
            { char: '卯', el: 'wood', hidden: ['乙'] },
            { char: '辰', el: 'earth', hidden: ['戊', '乙', '癸'] },
            { char: '巳', el: 'fire', hidden: ['丙', '戊', '庚'] },
            { char: '午', el: 'fire', hidden: ['丁', '己'] },
            { char: '未', el: 'earth', hidden: ['己', '丁', '乙'] },
            { char: '申', el: 'gold', hidden: ['庚', '壬', '戊'] },
            { char: '酉', el: 'gold', hidden: ['辛'] },
            { char: '戌', el: 'earth', hidden: ['戊', '辛', '丁'] },
            { char: '亥', el: 'water', hidden: ['壬', '甲'] }
        ];

        const NA_YIN = {
            '甲子': '海中金', '乙丑': '海中金', '丙寅': '爐中火', '丁卯': '爐中火', '戊辰': '大林木', '己巳': '大林木',
            '庚午': '路旁土', '辛未': '路旁土', '壬申': '劍鋒金', '癸酉': '劍鋒金', '甲戌': '山頭火', '乙亥': '山頭火',
            '丙子': '澗下水', '丁丑': '澗下水', '戊寅': '城頭土', '己卯': '城頭土', '庚辰': '白蠟金', '辛巳': '白蠟金',
            '壬午': '楊柳木', '癸未': '楊柳木', '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
            '戊子': '霹靂火', '己丑': '霹靂火', '庚寅': '松柏木', '辛卯': '松柏木', '壬辰': '長流水', '癸巳': '長流水',
            '甲午': '砂中金', '乙未': '砂中金', '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
            '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金', '甲辰': '覆燈火', '乙巳': '覆燈火',
            '丙午': '天河水', '丁未': '天河水', '戊申': '大驛土', '己酉': '大驛土', '庚戌': '釵釧金', '辛亥': '釵釧金',
            '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水', '丙辰': '沙中土', '丁巳': '沙中土',
            '戊午': '天上火', '己未': '天上火', '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
        };

        // 五行生剋: 木(0) -> 火(1) -> 土(2) -> 金(3) -> 水(4) -> 木(0)
        const FIVE_ELS = ['wood', 'fire', 'earth', 'gold', 'water'];
        const EL_NAMES = { wood: '木', fire: '火', earth: '土', gold: '金', water: '水' };
        
        // 生我者為印(4)，同我者為比(0)，我生者為食(1)，我剋者為財(2)，剋我者為官(3)
        // 索引差: target - self
        
        /* ----------------------------------------------------------------
           2. 詳解資料庫 (Suggestion & Detailed Fortunes)
           ---------------------------------------------------------------- */

        // 補運建議
        const SUGGESTIONS = {
            wood: {
                color: '<span class="text-green-400">綠色、青色</span>',
                direction: '東方',
                number: '3、8',
                item: '木質飾品、植物盆栽、書籍',
                action: '多接觸大自然、森林浴、早起運動、閱讀進修'
            },
            fire: {
                color: '<span class="text-red-400">紅色、紫色、粉色</span>',
                direction: '南方',
                number: '2、7',
                item: '電子產品、紅色飾品、蠟燭/燈飾',
                action: '多曬太陽、保持熱情、參加社交活動、吃溫熱食物'
            },
            earth: {
                color: '<span class="text-yellow-400">黃色、棕色、咖啡色</span>',
                direction: '中央、東北、西南',
                number: '5、10',
                item: '玉石、水晶、陶藝品',
                action: '赤腳踩草地、爬山、園藝、誠信待人、存錢'
            },
            gold: {
                color: '<span class="text-gray-200">白色、金色、銀色</span>',
                direction: '西方',
                number: '4、9',
                item: '金屬飾品、手錶、機械類',
                action: '重量訓練、整理收納、果斷決策、佩戴金銀飾品'
            },
            water: {
                color: '<span class="text-blue-400">黑色、藍色</span>',
                direction: '北方',
                number: '1、6',
                item: '水景、魚缸、黑曜石',
                action: '游泳、泡澡、多喝水、思考沈澱、保持靈活'
            }
        };

        // 十神流年詳解庫
        const FORTUNE_DETAILS = {
            'friend': { // 比肩
                title: '比肩運 (同伴/競爭)',
                wealth: '財運持平，容易有與朋友合資或借貸情況，錢財進出頻繁，宜守不宜攻。',
                career: '合作機會多，但競爭也大。適合團隊工作，切勿獨斷獨行。',
                side_wealth: '偏財運普通，切勿聽信小道消息投資，易因人損財。',
                romance: '易有競爭者出現，或因朋友聚會認識對象。有伴者需防固執爭吵。',
                health: '注意肝膽保養，避免熬夜，情緒容易亢奮或急躁。',
                social: '社交活動頻繁，人氣旺，老友重逢，但需防口舌之爭。'
            },
            'rob_wealth': { // 劫財
                title: '劫財運 (消耗/人際)',
                wealth: '財富波動大，易有意外大筆支出（如罰單、修繕、請客）。',
                career: '職場競爭白熱化，需防小人背後中傷。保持低調，做好份內事。',
                side_wealth: '極差，絕對禁止高風險投資或賭博，逢賭必輸。',
                romance: '感情關係可能有波動或外部干擾，建議加強溝通與信任。',
                health: '注意手腳受傷、呼吸道感染，或因情緒激動導致的身體不適。',
                social: '朋友多但知心少，易被朋友拖累或利用，交友需謹慎。'
            },
            'eating_god': { // 食神
                title: '食神運 (福氣/才華)',
                wealth: '財源穩定，多勞多得。適合靠專業技術或才華賺錢。',
                career: '靈感湧現，適合規劃、設計、學習新知。工作氛圍較輕鬆愉快。',
                side_wealth: '不錯，偶有小幸運，適合穩健型的投資理財。',
                romance: '心情愉悅，魅力提升，人際與家庭關係皆有正向發展。',
                health: '心寬體胖，注意體重控制與腸胃消化問題，享受美食要節制。',
                social: '人緣極佳，善解人意，聚餐機會多，是拓展人脈的好時機。'
            },
            'hurting_officer': { // 傷官
                title: '傷官運 (變革/叛逆)',
                wealth: '大起大落，敢於冒險。適合創新模式賺錢，但要防衝動消費。',
                career: '不滿現狀，想轉職或創業。才華洋溢但易頂撞上司，需修口德。',
                side_wealth: '有投機運，但風險極高。眼光獨到，能發現冷門商機。',
                romance: '情緒起伏較大，與伴侶或親密關係可能有磨擦，建議注意表達與傾聽。',
                health: '注意神經衰弱、失眠、意外受傷。情緒管理是健康關鍵。',
                social: '言語犀利，容易得罪人而不自知。雖有才華吸引人，但知音難尋。'
            },
            'direct_wealth': { // 正財
                title: '正財運 (穩定/收穫)',
                wealth: '正財旺盛，薪水穩定增長。適合儲蓄、置產，累積財富。',
                career: '工作表現穩健，按部就班即有收穫。適合簽訂合約、長期規劃。',
                side_wealth: '不宜貪求偏財，腳踏實地為上策。中獎機率低。',
                romance: '感情運勢穩定，適合規劃長期關係與家庭事務。',
                health: '健康狀況良好，生活規律。只需注意久坐導致的痠痛。',
                social: '交往對象多為務實之人，社交圈穩定，無太多驚喜也無驚嚇。'
            },
            'indirect_wealth': { // 偏財
                title: '偏財運 (機會/流動)',
                wealth: '現金流動快，有額外收入或獎金。適合經商、業務推廣。',
                career: '業績提升，有外派或出差機會。商業嗅覺靈敏。',
                side_wealth: '極佳，投資眼光精準，可嘗試股票或副業，但見好就收。',
                romance: '社交與異性緣旺盛，機會多但也需謹慎選擇對象與把握分寸。',
                health: '交際應酬多，注意菸酒過量與肝臟負擔。',
                social: '八面玲瓏，慷慨大方，容易結識有錢或有地位的朋友。'
            },
            'direct_officer': { // 正官
                title: '正官運 (地位/名聲)',
                wealth: '財運隨著職位提升而增加，名利雙收。不宜走旁門左道。',
                career: '升遷機率高，易得主管賞識。適合考試、考證照、爭取管理職。',
                side_wealth: '保守為宜，名譽比金錢重要。避免涉及灰色地帶的錢財。',
                romance: '婚姻與伴侶關係是重點，需以責任感與溝通建立穩固關係。',
                health: '壓力稍大，注意精神緊張與頭痛問題，保持睡眠充足。',
                social: '接觸的層次提高，多與長官、長輩打交道，言行需得體。'
            },
            'seven_killings': { // 七殺
                title: '七殺運 (壓力/突破)',
                wealth: '險中求財，壓力大但獲利可能也大。需防意外破財或官司糾紛。',
                career: '責任加重，任務艱鉅。適合大破大立、改革、開疆闢土。',
                side_wealth: '起伏劇烈，心臟要夠強。勿因貪念涉險。',
                romance: '情感界線需謹慎，易遇感情糾紛或不穩定關係，建議保持警覺與理性。',
                health: '最需注意的一年。防血光之災、意外、過勞。忌衝動行事。',
                social: '易犯小人，與人發生衝突。需忍辱負重，以柔克剛。'
            },
            'direct_resource': { // 正印
                title: '正印運 (貴人/休養)',
                wealth: '平穩無虞，多得長輩資助或遺產繼承。不缺錢花。',
                career: '貴人運強，事半功倍。適合進修、深造、建立品牌形象。',
                side_wealth: '普通，心態保守，對投資興趣缺缺。',
                romance: '感情平淡見真情，追求精神契合。適合見雙方家長。',
                health: '身心放鬆，體重易增加。適合調養身體、接觸宗教心靈。',
                social: '多得長輩緣，受人照顧。人際關係和諧溫暖。'
            },
            'indirect_resource': { // 偏印
                title: '偏印運 (靈感/孤獨)',
                wealth: '靠冷門知識或特殊技能賺錢。一般財運不穩定，易誤判情勢。',
                career: '思緒獨特，適合研究、發明、藝術創作。不喜受體制約束。',
                side_wealth: '時好時壞，直覺雖強但易鑽牛角尖。',
                romance: '多疑敏感，容易冷戰或覺得孤獨。雙方溝通出現隔閡。',
                health: '注意慢性病復發、神經系統敏感、失眠多夢。',
                social: '喜靜不喜動，給人距離感。適合與志同道合的少數人深交。'
            }
        };

        /* ----------------------------------------------------------------
           3. 核心演算法 (Pure Frontend)
           ---------------------------------------------------------------- */

        function getStem(idx) { return STEMS[idx % 10]; }
        function getBranch(idx) { return BRANCHES[idx % 12]; }

        // 節氣簡易法 (月柱用)
        function getSolarMonthIndex(m, d) {
            const termDays = [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 8, 7];
            // Jan=0. Check if passed term.
            // Term passed -> next branch.
            // Branch: Feb(1) -> 寅(2). Formula: if passed, (m+2)%12 else (m+1)%12 ?
            // Correct Map:
            // Jan(0) < 6 -> 子(0). >=6 -> 丑(1)
            // Feb(1) < 4 -> 丑(1). >=4 -> 寅(2)
            // ...
            // Dec(11) < 7 -> 亥(11). >=7 -> 子(0)
            
            // Logic: Month m corresponds to Branch m (roughly). 
            // But Branch 2 (Tiger) starts in Month 1 (Feb).
            // So standard: Month m -> Branch (m+1)%12 if passed term?
            // Let's verify: 
            // Feb(1) >= 4 -> Tiger(2). (1+1)=2. Matches.
            // Jan(0) >= 6 -> Ox(1). (0+1)=1. Matches.
            // Jan(0) < 6 -> Rat(0). Matches.
            
            const limit = termDays[m];
            return d >= limit ? (m + 1) % 12 : m % 12;
        }

        function calculateBaZi() {
            const dateStr = document.getElementById('birthDate').value;
            const hourVal = parseInt(document.getElementById('birthHour').value);
            const gender = document.getElementById('genderSelect') ? document.getElementById('genderSelect').value : 'unspecified';

            if (!dateStr) { alert("請輸入出生日期"); return; }

            const date = new Date(dateStr);
            const y = date.getFullYear();
            const m = date.getMonth();
            const d = date.getDate();

            // 1. 排盤
            // 年柱 (立春分界簡易版: m=1 d=4)
            let yIdx = (y - 4) % 60;
            if (m < 1 || (m === 1 && d < 4)) yIdx = (yIdx - 1 + 60) % 60;
            
            const yStemIdx = yIdx % 10;
            const yBranchIdx = yIdx % 12;

            // 月柱
            const mBranchIdx = getSolarMonthIndex(m, d);
            // 年干推月干 (五虎遁): 甲己之年丙作首(2)
            // Base stems for Tiger month(2): 甲0->2, 乙1->4, 丙2->6, 丁3->8, 戊4->0
            const mStemBase = (yStemIdx % 5) * 2 + 2; 
            // Offset from Tiger(2). 
            // If mBranch is 2, offset 0. If mBranch is 0 (Rat), offset is ... 10?
            let offset = mBranchIdx - 2;
            if (offset < 0) offset += 12;
            const mStemIdx = (mStemBase + offset) % 10;

            // 日柱 (1900/1/1 = 甲戌 0,10)
            const base = new Date(1900, 0, 1);
            const diff = Math.floor((Date.UTC(y, m, d) - Date.UTC(1900, 0, 1)) / 86400000);
            const dStemIdx = (0 + diff) % 10;
            let dBranchIdx = (10 + diff) % 12;
            // Fix Javascript negative modulo
            if (dStemIdx < 0) dStemIdx += 10;
            if (dBranchIdx < 0) dBranchIdx += 12; // Should handle loop

            // 時柱
            let hStemIdx = -1, hBranchIdx = -1;
            if (hourVal !== -1) {
                hBranchIdx = hourVal;
                // 日干推時干 (五鼠遁): 甲己還加甲(0)
                const hStemBase = (dStemIdx % 5) * 2;
                hStemIdx = (hStemBase + hBranchIdx) % 10;
            }

            // 2. 渲染四柱 UI
            const pillars = [
                { id: 'year', s: yStemIdx, b: yBranchIdx },
                { id: 'month', s: mStemIdx, b: mBranchIdx },
                { id: 'day', s: dStemIdx, b: dBranchIdx },
                { id: 'hour', s: hStemIdx, b: hBranchIdx }
            ];

            const elementsCount = { wood: 0, fire: 0, earth: 0, gold: 0, water: 0 };
            // 用於判斷身強弱的分數
            let dayMasterScore = 0; 
            let totalScore = 0;

            const dayMasterEl = STEMS[dStemIdx].el;
            // 生我者 (印)
            const resourceEl = FIVE_ELS[(FIVE_ELS.indexOf(dayMasterEl) + 4) % 5];

            pillars.forEach(p => {
                if (p.s === -1) {
                    document.getElementById(p.id+'Stem').textContent = "—";
                    document.getElementById(p.id+'Branch').textContent = "—";
                    return;
                }
                const s = getStem(p.s);
                const b = getBranch(p.b);
                
                // 顯示文字與顏色
                const sDiv = document.getElementById(p.id+'Stem');
                const bDiv = document.getElementById(p.id+'Branch');
                sDiv.textContent = s.char;
                sDiv.className = `gan-zhi-text mb-2 ${s.el}`;
                bDiv.textContent = b.char;
                bDiv.className = `gan-zhi-text ${b.el}`;
                
                // 納音
                const ny = NA_YIN[s.char + b.char] || "";
                document.getElementById(p.id+'NaYin').textContent = ny;

                // 計算能量 (簡易權重: 月支x2, 日支x1.5, 其他x1)
                let weight = 1;
                if (p.id === 'month' && p.id.includes('Branch')) weight = 2.5; // 月令最重
                if (p.id === 'day' && p.id.includes('Branch')) weight = 1.5; // 日支次之

                // 天干計分
                elementsCount[s.el] += 10;
                totalScore += 10;
                if (s.el === dayMasterEl || s.el === resourceEl) dayMasterScore += 10;

                // 地支計分 (含藏干，這裡簡化為本氣)
                elementsCount[b.el] += (10 * weight);
                totalScore += (10 * weight);
                if (b.el === dayMasterEl || b.el === resourceEl) dayMasterScore += (10 * weight);
            });

            // 3. 判斷身強 / 身弱
            // 閾值: 黨派能量 > 45% (簡易判斷)
            const strengthRatio = dayMasterScore / totalScore;
            const isStrong = strengthRatio >= 0.45;
            
            // 4. 決定喜用神
            // 身強: 喜 剋(官殺)、洩(食傷)、耗(財)
            // 身弱: 喜 生(印)、助(比劫)
            // 這裡做一個簡單的智慧選擇：選對立面中能量最弱的，或最需要的
            let usefulGods = [];
            let usefulEl = '';

            if (isStrong) {
                // 找 克洩耗 (Output, Wealth, Officer)
                // Wood(0): Fire(1), Earth(2), gold(3)
                const idx = FIVE_ELS.indexOf(dayMasterEl);
                const candidates = [
                    FIVE_ELS[(idx + 1) % 5], // 食傷
                    FIVE_ELS[(idx + 2) % 5], // 財
                    FIVE_ELS[(idx + 3) % 5]  // 官殺
                ];
                // 選擇其中分數最低的作為第一喜用 (補不足)
                candidates.sort((a, b) => elementsCount[a] - elementsCount[b]);
                usefulGods = candidates;
                usefulEl = candidates[0];
            } else {
                // 找 生助 (Resource, Friend)
                // Wood(0): Water(4), Wood(0)
                const idx = FIVE_ELS.indexOf(dayMasterEl);
                const candidates = [
                    FIVE_ELS[(idx + 4) % 5], // 印
                    FIVE_ELS[idx]            // 比
                ];
                // 身弱通常先取印(生)，除非印太旺
                candidates.sort((a, b) => elementsCount[a] - elementsCount[b]);
                usefulGods = candidates;
                usefulEl = candidates[0]; // 這裡簡化取一個
            }

            // 5. 渲染能量圖表與建議（依使用者選擇的性別顯示相對應日主性格）
            renderAnalysis(elementsCount, totalScore, isStrong, usefulEl, dayMasterEl, gender);

            // 6. 產生未來10年運勢（性別已在一開始選擇，流年詳解使用中性文本）
            generateFortunes(STEMS[dStemIdx], 2026, gender);

            // 顯示
            const res = document.getElementById('resultSection');
            res.classList.remove('hidden');
            res.scrollIntoView({ behavior: 'smooth' });
        }

    function renderAnalysis(counts, total, isStrong, usefulEl, dmEl, gender) {
            // 1. Bar Chart
            const chart = document.getElementById('fiveElementsChart');
            chart.innerHTML = '';
            FIVE_ELS.forEach(el => {
                const val = counts[el];
                const pct = ((val / total) * 100).toFixed(1);
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="flex justify-between text-xs text-gray-400 mb-1">
                        <span>${EL_NAMES[el]} (${el})</span>
                        <span>${pct}%</span>
                    </div>
                    <div class="w-full bg-gray-800 rounded-full h-2">
                        <div class="h-2 rounded-full ${el}" style="width: ${pct}%; background-color: currentColor;"></div>
                    </div>
                `;
                chart.appendChild(div);
            });

            // 2. Strength Tag
            const tag = document.getElementById('strengthTag');
            tag.textContent = isStrong ? "命盤偏強 (喜剋洩)" : "命盤偏弱 (喜生助)";
            tag.className = isStrong 
                ? "text-xs px-3 py-1 bg-red-900/50 text-red-200 rounded border border-red-800"
                : "text-xs px-3 py-1 bg-blue-900/50 text-blue-200 rounded border border-blue-800";

            // 3. Useful God & Suggestions
            const suggestion = SUGGESTIONS[usefulEl];
            document.getElementById('usefulGodText').innerHTML = `
                <span class="${usefulEl}">${EL_NAMES[usefulEl]}</span> 
                <span class="text-sm text-gray-500 font-normal">為您的首選喜用神</span>
            `;
            
            document.getElementById('luckyAdvice').innerHTML = `
                <p><span class="text-[#d4b483]">● 開運色：</span>${suggestion.color}</p>
                <p><span class="text-[#d4b483]">● 吉利數字：</span>${suggestion.number}</p>
                <p><span class="text-[#d4b483]">● 吉利方位：</span>${suggestion.direction}</p>
                <p><span class="text-[#d4b483]">● 開運飾品：</span>${suggestion.item}</p>
                <p><span class="text-[#d4b483]">● 補運行為：</span>${suggestion.action}</p>
            `;

            // 4. Day Master Character (male/female/neutral)
            const DM_TRAITS_MALE = {
                wood: "仁慈、正直，具向上生長與責任感，為人正直但偶有固執，適合擔當領導或教導角色。",
                fire: "熱情外向、勇於表現，行動力強、具感染力；需注意情緒管理與急躁。",
                earth: "穩重踏實、可靠，是團隊的支柱；務實有耐性，但有時保守不易接受改變。",
                gold: "果斷堅毅、做事效率高，重視原則與責任，可能顯得嚴肅或過於尖銳。",
                water: "思維靈活、適應力強，善於策略與溝通，但情緒波動可能影響決策。"
            };
            const DM_TRAITS_FEMALE = {
                wood: "溫柔體貼、擅長培養與照顧他人，具有耐心與包容力，適合教育或社群經營。",
                fire: "魅力十足、熱情表達，具創造力與感染力；需留意衝動與情緒管理。",
                earth: "穩重踏實、可靠，擅長理財與實務執行，是家庭或團隊的穩定力量。",
                gold: "堅毅果斷、注重原則與品質，行事有條理但有時顯得嚴謹或高要求。",
                water: "直覺敏銳、情感細膩，善於溝通與協調，但情緒起伏可能影響判斷。"
            };
            const DM_TRAITS_NEUTRAL = {
                wood: "仁慈、正直，有向上生長的意志，但也容易固執。",
                fire: "熱情、禮貌，充滿活力與感染力，但也容易急躁。",
                earth: "穩重、誠信，包容力強，喜歡安穩，有時反應較慢。",
                gold: "剛毅、果斷，講義氣，執行力強，有時過於尖銳。",
                water: "聰明、靈活，適應力強，心思細膩，有時想法多變。"
            };

            let DM_TRAITS = DM_TRAITS_NEUTRAL;
            if (gender === 'male') DM_TRAITS = DM_TRAITS_MALE;
            else if (gender === 'female') DM_TRAITS = DM_TRAITS_FEMALE;

            document.getElementById('dayMasterAnalysis').textContent = 
                `您的日主五行屬【${EL_NAMES[dmEl]}】。${DM_TRAITS[dmEl]} ` +
                (isStrong ? "命盤能量偏強，適合主動承擔責任與領導；建議多用策略與耐心平衡強勢。" : "命盤能量偏弱，適合以合作取勝、吸納他人支持；建議強化自信與持續學習。");
        }

    function generateFortunes(dmStem, startYear, gender) {
            const container = document.getElementById('fortuneContainer');
            container.innerHTML = '';

            // 2026 丙午
            // 丙(2) 午(6)
            let yStemBase = 2; 
            let yBranchBase = 6;

            for (let i = 0; i <= 10; i++) {
                const year = startYear + i;
                const sIdx = (yStemBase + i) % 10;
                const bIdx = (yBranchBase + i) % 12;
                const stem = STEMS[sIdx];
                const branch = BRANCHES[bIdx];

                // 計算流年十神 (以天干為主，地支為輔的綜合氣場 - 這裡簡化以天干定十神主軸)
                const god = getTenGod(dmStem, stem);
                const detail = FORTUNE_DETAILS[god.key];

                const card = document.createElement('div');
                card.className = "scroll-border p-5 rounded-lg hover:border-[#d4b483] transition duration-300";
                card.innerHTML = `
                    <div class="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                        <div>
                            <span class="text-2xl font-bold text-[#d4b483]">${year}</span>
                            <span class="text-sm text-gray-400 ml-1">${stem.char}${branch.char}年</span>
                        </div>
                        <div class="lucky-tag">${detail.title}</div>
                    </div>
                    
                    <div class="space-y-0">
                        <div class="fortune-detail-item">
                            <span class="fortune-label">財富</span> ${detail.wealth}
                        </div>
                        <div class="fortune-detail-item">
                            <span class="fortune-label">事業</span> ${detail.career}
                        </div>
                        <div class="fortune-detail-item">
                            <span class="fortune-label">偏財</span> ${detail.side_wealth}
                        </div>
                        <div class="fortune-detail-item">
                            <span class="fortune-label">桃花</span> ${detail.romance}
                        </div>
                        <div class="fortune-detail-item">
                            <span class="fortune-label">健康</span> ${detail.health}
                        </div>
                        <div class="fortune-detail-item">
                            <span class="fortune-label">人際</span> ${detail.social}
                        </div>
                    </div>
                `;
                container.appendChild(card);
            }
        }

        function getTenGod(self, target) {
            const selfIdx = FIVE_ELS.indexOf(self.el);
            const targetIdx = FIVE_ELS.indexOf(target.el);
            // 0:同, 1:我生, 2:我剋, 3:剋我, 4:生我
            const rel = (targetIdx - selfIdx + 5) % 5;
            const sameYinYang = self.yinYang === target.yinYang;
            
            const map = [
                { yy: 'friend', ny: 'rob_wealth' },       // 同
                { yy: 'eating_god', ny: 'hurting_officer' }, // 我生
                { yy: 'indirect_wealth', ny: 'direct_wealth' }, // 我剋 (同性偏財)
                { yy: 'seven_killings', ny: 'direct_officer' }, // 剋我 (同性七殺)
                { yy: 'indirect_resource', ny: 'direct_resource' } // 生我 (同性偏印)
            ];

            // 注意：傳統十神陰陽定義
            // 我剋者為財：同性為偏財，異性為正財
            // 剋我者為官：同性為七殺，異性為正官
            // 生我者為印：同性為偏印，異性為正印
            // 同我者為比：同性為比肩，異性為劫財
            // 我生者為食：同性為食神，異性為傷官
            
            const key = sameYinYang ? map[rel].yy : map[rel].ny;
            return { key: key };
        }
        
        // Default Date
        document.getElementById('birthDate').valueAsDate = new Date();
