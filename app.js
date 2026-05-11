


//以上是試錯用

let state = {
    user: null,
    vocab: [],
    i: 0,
    ans: [],
    wrongWords: [],
    phase: ""
};

function go(pageId){
    document.querySelectorAll(".page")
        .forEach(p => p.classList.add("hidden"));

    document.getElementById(pageId)
        .classList.remove("hidden");
} 

function login(){

    let db = getDB();

    let name = document.getElementById("name")?.value?.trim();
    let age = document.getElementById("age")?.value?.trim();
    let email = document.getElementById("email")?.value?.trim();

    // 管理員入口
    if(name === "0" && age === "0" && email === "0"){

        window.location.href = "admin.html";

        return;
    }

    /*沒名字*/
    if(!name){
        alert("輸入名字");
        return;
    }

    state.user = name;

    if(!db[name]){

        db[name] = {
            age: age || "",
            email: email || "",
            vocabSet: localStorage.getItem("activeSet") || "A",
    
            score:{p1:null,p2:null,p3:null,p4:null},
            time:{p1:null,p2:null,p3:null,p4:null},
            testTime:{p1:null,p2:null,p3:null,p4:null},
    
            created: Date.now()
        };
    }
    
    saveDB(db);
    
    // 初始化 vocab
    state.vocab = getUserVocab();

    go("intro");
}

//測驗注意事項 + 選階段
function startPhase(){

    state.phase =
        document.getElementById("phase").value; 
        
    let db = getDB();

    // 已做過
    if(db[state.user].score[state.phase] !== null){
    
        alert("這個測驗階段已完成!");
    
        return;
    }
    

    go("study");

    startStudy();
}

function startStudy(){
    let html = state.vocab
        .map(v => v.en + " - " + v.zh)
        .join("<br>");

    document.getElementById("words").innerHTML = html;    

    let t = 10;

    let timer = setInterval(() => {
        document.getElementById("timer").textContent = "剩餘時間: " + t + " 秒";
        t--;
        
        if(t < 0){
            clearInterval(timer);
            startTest();
        }
    },1000);
}

function startTest(){

    state.startTime = Date.now();

    state.i = 0;
    state.ans = [];

    state.wrongWords = [];

    go("test");

    showQ();
}

function showQ(){

    document.getElementById("q").innerText =
        state.vocab[state.i].zh;

    document.getElementById("progress").innerText =
        `第 ${state.i + 1} / ${state.vocab.length} 題`;
}

function submit(){

    state.ans[state.i] = 
        document.getElementById("ans").value;

    let correct = state.vocab[state.i].en;

    document.getElementById("fb").innerText =
    state.ans[state.i]
        ?.trim()
        .toLowerCase()
    ===
    correct
        .trim()
        .toLowerCase()
    ? "正確"
    : "錯誤 " + correct;
}

function next(){

    document.getElementById("ans").value = "";
    document.getElementById("fb").innerText = "";

    state.i++;

    if(state.i >= state.vocab.length){
        finish();
        return;
    }

    showQ();
}

function finish(){
    let score = 0;

    state.ans.forEach((a, i) => {

        let correct =
            state.vocab[i].en;
        let userAns =
            a?.trim().toLowerCase();
        let correctAns =
            correct.trim().toLowerCase();

            // 正確
        if(userAns === correctAns){
    
            score++;
        }
        // 錯誤
        else{
    
            state.wrongWords.push({
                zh: state.vocab[i].zh,
                correct: correct,
                user: a
            });
        }
    });

    let db = getDB();

    let spendTime =
        Math.floor((Date.now() - state.startTime)/1000);
    
    let now = new Date();
    

    db[state.user].score[state.phase] = score;

    db[state.user].time = db[state.user].time || {};
    db[state.user].time[state.phase] = spendTime;
    
    db[state.user].testTime = db[state.user].testTime || {};
    db[state.user].testTime[state.phase] = {
        readable: now.toLocaleString(),
        iso: now.toISOString()
    };

    db[state.user].wrongWords =
    db[state.user].wrongWords || {};

    db[state.user].wrongWords[state.phase] =
    state.wrongWords;

    saveDB(db);

    go("result");

    let msg = "";

    if (state.phase === "p1") {
        msg = "這是第一次測試，請在一天後進行第二次測試 !";
    }
    else if (state.phase === "p2") {
        msg = "這是第二次測試，請在三天後進行第三次測試 !";
    }
    else if (state.phase === "p3") {
        msg = "這是第三次測試，請在三天後進行第四次測試 !";
    }
    else if(state.phase === "p4"){
        msg = "所有測驗已完成，感謝你的參與 !";
    }

    document.getElementById("out").innerHTML =
        `分數 : ${score}/20<br>
        時間 : ${spendTime}秒<br>
        <span class="warning-text">${msg}</span>`;
   
}



