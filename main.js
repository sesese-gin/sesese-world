/* main.js */
/* main.js の一番上に書く */

// ▼ 作品データ（ここを増やすだけで自動でカードが増えます！）
const worksData = [
    {
        title: "自室探索ゲーム",
        desc: "HTML/CSS/JS",
        image: "image-home/room_picture.jpg", // 画像がない場合は空文字か、デフォルト画像を指定
        link: "my-room-game/index-game.html"
    },
    {
        title: "Coming Soon...",
        desc: "Preparation",
        image: "", // 画像がない場合は空文字か、デフォルト画像を指定
        link: "#"
    },
    // 将来、新しい作品ができたらここにデータを足すだけ！
];

/* main.js に追記 */

// ▼ HTMLを生成して表示する関数
const renderWorks = () => {
    const worksGrid = document.getElementById('js-works-grid');
    
    // データ1つ1つに対して処理をする（ループ）
    worksData.forEach(work => {
        // 画像がない時のための背景色設定（仮）
        const bgStyle = work.image ? `background-image: url('${work.image}');` : 'background-color: #333;';

        // HTMLのテンプレート（バッククォート `` で囲むと改行できる！）
        const html = `
            <a href="${work.link}" class="work-card js-fade-up">
                <div class="card-img" style="${bgStyle}"></div>
                <div class="card-text">
                    <h4>${work.title}</h4>
                    <p>${work.desc}</p>
                </div>
            </a>
        `;

        // 生成したHTMLをグリッドに追加
        worksGrid.insertAdjacentHTML('beforeend', html);
    });
};


/* ===============================================
   スマホ用ハンバーガーメニューの動き
   =============================================== */
const hamburger = document.getElementById('js-hamburger');
const spNav = document.getElementById('js-sp-nav');
const spNavLinks = document.querySelectorAll('.sp-nav-link');

// 1. ボタンを押した時の動き（開閉）
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active'); // ボタンを×にする
        spNav.classList.toggle('active');     // メニューを出す
    });
}

// 2. メニューのリンクを押した時の動き（閉じる）
spNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active'); // ボタンを戻す
        spNav.classList.remove('active');     // メニューを隠す
    });
});


/* ===============================================
   スクロール時のフェードインアニメーション
   =============================================== */
// 監視する要素（js-fade-upクラスがついているやつ全部）
const targets = document.querySelectorAll('.js-fade-up');

// 監視の設定
const options = {
    root: document.querySelector('.right-side'), // 右側のスクロール領域を監視
    rootMargin: '-20% 0px', // 画面の下から20%のラインを超えたら発動
    threshold: 0
};

// 監視員さん（Intersection Observer）
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // 一度出たら監視終了
        }
    });
}, options);

// 要素を監視リストに登録
targets.forEach(target => {
    observer.observe(target);
});

/* ===============================================
   スクロール時のフェードインアニメーション（修正版）
   =============================================== */

// アニメーション設定の関数化
const initScrollAnimation = () => {
    const targets = document.querySelectorAll('.js-fade-up');
    
    const options = {
        root: document.querySelector('.right-side'),
        rootMargin: '-20% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    targets.forEach(target => {
        observer.observe(target);
    });
};

// ★ここが大事！
// 「カードを作ってから」→「アニメーションをセットする」順番にする
renderWorks();      // 1. カードを作る
initScrollAnimation(); // 2. そのカードを監視対象にする