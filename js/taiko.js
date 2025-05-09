/**
 * Created by yuanyaoqi on 16/7/27.
 */
var username;
var taikoList=[]; //Drum note array
//1.Small red drum 2.Small blue drum 3.Big red drum 4.Big blue drum
var taikoValueList=[
    1,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,//Prelude
    1,1,0,0,1,2,0,0,1,1,0,0,1,2,0,0,//Verse
    1,1,0,0,1,2,0,0,1,1,0,0,1,2,0,0,
    1,0,2,0,1,0,1,0,1,0,2,0,1,0,1,0,//Transition
    2,0,2,0,1,0,2,0,2,0,2,0,1,0,2,0,1,0,1,0,2,0,2,0,
    3,0,3,0,1,0,2,0,1,2,1,0,1,2,1,0,//Chorus
    4,0,4,0,1,0,2,0,2,1,2,0,2,1,2,0,
    3,0,3,0,1,0,2,0,1,2,1,0,1,2,1,0,
    4,0,4,0,1,0,2,0,2,1,2,0,2,1,2,0,
    1,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,//Interlude
    1,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,
    1,0,2,0,1,0,1,0,1,0,2,0,1,0,1,0,//Transition
    2,0,2,0,1,0,2,0,2,0,2,0,1,0,2,0,1,0,1,0,2,0,2,0,
    3,0,3,0,1,0,2,0,1,2,1,0,1,2,1,0,//Chorus
    4,0,4,0,1,0,2,0,2,1,2,0,2,1,2,0,
    3,0,3,0,1,0,2,0,1,2,1,0,1,2,1,0,
    4,0,4,0,1,0,2,0,2,1,2,0,2,1,2,0];
var taikoValueOrder=0; //Drum note order
var scoreNumber=0; //Score
var taikoCreat;
var taikoMove;
var dancerMove;
var dancerList=[];
window.onload=function () {
    document.getElementById("bgmusic").play();
    setTimeout(function () {
        document.getElementById("title_call").play();
    },500);
}
function gameStart() {
    username=document.getElementById("username").value;
    if(username==""){
        document.getElementById("startBox").getElementsByTagName("h4")[0].innerHTML="Please enter your username";
    }
    else if(username!==""){
        document.getElementById("startBox").style.display="none";
        document.getElementById("ruleBox").style.display="block";
    }
}
function gamePlay() {
    document.getElementById("ruleBox").style.display="none";
    document.getElementById("startBox").style.display="none";
    document.getElementById("endBox").style.display="none";
    document.getElementById("taikoBox").style.display="block";
    //Clear
    taikoList=[];
    dancerList=[];
    taikoValueOrder=0;
    clearInterval(taikoCreat);
    clearInterval(taikoMove);
    clearInterval(dancerMove);
    scoreNumber=0;
    document.getElementById("scoreBoard").innerHTML=scoreNumber;
    document.getElementById("pauseChoice").style.display="none";
    //Background music
    document.getElementById("bgmusic").pause();
    document.getElementById("endmusic").pause();
    document.getElementById("gamestart").play();
    setTimeout(function () {
        document.getElementById("bg_travel").currentTime=0;
        document.getElementById("bg_travel").play();
    },2000);
    //Taiko drum notes
    var roadCtx=document.getElementById("roadCtx").getContext("2d");
    var taikoComb=document.getElementById("taikoComb");
    setTimeout(function () {
        taikoCreat=setInterval(function () {
            creatTaiko(roadCtx,taikoComb);
        },60000/138);
        taikoMove=setInterval(function () {taikoListMove(roadCtx);},1);
    },770);
    //Dancing characters
    var dancerCtx=document.getElementById("dancerCtx").getContext("2d");
    var dancerTaikopng=document.getElementById("dancerTaiko");
    var dancer_1=document.getElementById("dancer_1");
    var dancergirlpng=document.getElementById("dancergirl");
    var dancerTaiko1=new dancerPrototype(dancerCtx,dancerTaikopng,340,7);
    var dancerTaiko2=new dancerPrototype(dancerCtx,dancerTaikopng,460,7);
    dancerList.push(dancerTaiko1,dancerTaiko2);
    setTimeout(function () {
        var dancer_1left=new dancerPrototype(dancerCtx,dancer_1,240,20);
        var dancer_1right=new dancerPrototype(dancerCtx,dancer_1,560,20);
        var dancer_2left=new dancerPrototype(dancerCtx,dancer_1,140,20);
        var dancer_2right=new dancerPrototype(dancerCtx,dancer_1,660,20);
        dancerList.push(dancer_1left,dancer_1right,dancer_2left,dancer_2right);
    },10000);
    setTimeout(function () {
        var dancergirl=new dancerGirltype(dancerCtx,dancergirlpng);
        dancerList.push(dancergirl);
    },85000);
    dancerMove=setInterval(function () {
        dancerCtx.clearRect(0,0,900,260);
        for(var i=0;i<dancerList.length;i++){
            dancerList[i].draw();
        }
    },120000/138/9);
    //Execute end function when music finishes
    setTimeout(function () {
        gameEnd();
        saveScore();
    },145000);
}
function gamePause() {
    clearInterval(taikoCreat);
    clearInterval(taikoMove);
    clearInterval(dancerMove);
    document.getElementById("bg_travel").pause();
    document.getElementById("pauseChoice").style.display="block";
}
function gameContinue() {
    document.getElementById("pauseChoice").style.display="none";
    var roadCtx=document.getElementById("roadCtx").getContext("2d");
    var dancerCtx=document.getElementById("dancerCtx").getContext("2d");
    var taikoComb=document.getElementById("taikoComb");
    var dancergirl=document.getElementById("dancergirl");
    taikoCreat=setInterval(function () {
        creatTaiko(roadCtx,taikoComb);
    },60000/138);
    taikoMove=setInterval(function () {taikoListMove(roadCtx);},1);
    dancerMove=setInterval(function () {
        dancerCtx.clearRect(0,0,900,260);
        for(var i=0;i<dancerList.length;i++){
            dancerList[i].draw();
        }
    },120000/138/9);
    document.getElementById("bg_travel").play();
}

//Keyboard press, trigger drum sound and drum surface effect, check if the drum note is hit
window.onkeydown=function () {
    //Get drum images and drum sounds
    var taikored=document.getElementsByClassName("taikoRed");
    var taikoblue=document.getElementsByClassName("taikoBlue");
    var dong=document.getElementById("dongmusic");
    var ka=document.getElementById("kamusic");
    var k = window.event || arguments[0];
    //C
    if (k.keyCode == 67) {
        imgDisplay(taikoblue[0]);
        ka.currentTime=0;
        ka.play();
        //Check blue drum note
        taikoCheck("Blue");
    }
    //V
    if (k.keyCode == 86) {
        imgDisplay(taikored[0]);
        dong.currentTime=0;
        dong.play();
        //Check red drum note
        taikoCheck("Red");
    }
    //B
    if (k.keyCode == 66) {
        imgDisplay(taikored[1]);
        dong.currentTime=0;
        dong.play();
        //Check red drum note
        taikoCheck("Red");
    }
    //N
    if (k.keyCode == 78) {
        imgDisplay(taikoblue[1]);
        ka.currentTime=0;
        ka.play();
        //Check blue drum note
        taikoCheck("Blue");
    }
}
window.onkeyup=function () {
    var taikored=document.getElementsByClassName("taikoRed");
    var taikoblue=document.getElementsByClassName("taikoBlue");
    var k = window.event || arguments[0];
    if (k.keyCode == 67) {
        imgDisAppear(taikoblue[0]);
    }
    if (k.keyCode == 86) {
        imgDisAppear(taikored[0]);
    }
    if (k.keyCode == 66) {
        imgDisAppear(taikored[1]);
    }
    if (k.keyCode == 78) {
        imgDisAppear(taikoblue[1]);
    }
}
function creatTaiko(ctx,imgnode) {
    var newTaiko;
    if(taikoValueList[taikoValueOrder]==0){
        taikoValueOrder++;
        return;
    }
    if(taikoValueList[taikoValueOrder]==1){
        newTaiko=new taikoPrototype(ctx,imgnode,1,18,"DON~~");
    }
    if(taikoValueList[taikoValueOrder]==2){
        newTaiko=new taikoPrototype(ctx,imgnode,2,18,"KA~~");
    }
    if(taikoValueList[taikoValueOrder]==3){
        newTaiko=new taikoPrototype(ctx,imgnode,3,8,"DON(Loud)~");
    }
    if(taikoValueList[taikoValueOrder]==4){
        newTaiko=new taikoPrototype(ctx,imgnode,4,8,"KA(Loud)~");
    }
    taikoList.push(newTaiko);
    taikoValueOrder++;
}
//Taiko drum note object
function taikoPrototype(ctx,imgnode,value,drawY,text) {
    switch (value){
        case 1: this.color="Red";
                this.size="Small";
                this.drawW=50;
                break;
        case 2: this.color="Blue";
                this.size="Small";
                this.drawW=50;
                break;
        case 3: this.color="Red";
                this.size="Big";
                this.drawW=70;
                break;
        case 4: this.color="Blue";
                this.size="Big";
                this.drawW=70;
                break;
    }
    this.ctx=ctx;
    this.imgNode=imgnode;
    this.cutX=(value-1)*250;
    this.cutY=0;
    this.cutW=250;
    this.drawX=645;
    this.drawY=drawY;
    this.speed=1;
    this.draw=function () {
        this.ctx.beginPath();
        this.ctx.drawImage(this.imgNode,this.cutX,this.cutY,this.cutW,this.cutW,this.drawX,this.drawY,this.drawW,this.drawW);
        this.ctx.stroke();
        this.ctx.fillStyle="black";
        this.ctx.font="16px Microsoft YaHei";
        this.ctx.fillText(text,this.drawX+this.drawW/2-18,113);
    }
    this.move=function () {
        this.drawX-=this.speed;
    }
}
//Drum note movement
function taikoListMove(ctx) {
    ctx.clearRect(0,0,645,120);
    for(var i=0;i<taikoList.length;i++){
        if(taikoList[i].drawX>-taikoList[i].drawW){
            taikoList[i].draw();
            taikoList[i].move();
        }
        else{
            taikoList.splice(0,1);
        }
    }
}
//Judge drum note
function taikoCheck(taikovalue){
    var taikocheckvalue=false; //Default hit state is false
    var scoreBoard=document.getElementById("scoreBoard");
    var taikosmile=document.getElementById("taikoSmile");
    var taikoCheckDistance;
    for(var i=0;i<taikoList.length;i++){
        if(taikoList[i].size=="Small"){
            taikoCheckDistance=22; //Judgment center for small drum notes
        }
        else{taikoCheckDistance=12;} //Judgment center for big drum notes
        //Judge if it's "OK"
        if(taikoList[i].drawX>taikoCheckDistance-50&&taikoList[i].drawX<taikoCheckDistance+50&&taikoList[i].color==taikovalue){
            taikocheckvalue=true; //1.Change hit state
            //2.Temporarily display taiko smiley face
            taikosmile.style.display="block";
            setTimeout(function () {
                taikosmile.style.display="none";
            },100);
            //3.Further judge if it's "Great"
            if(taikoList[i].drawX>taikoCheckDistance-30&&taikoList[i].drawX<taikoCheckDistance+30){
                judgement(0); //4.Display judgment pattern and text
                scoreNumber+=100;
            }
            else{
                judgement(1);
                scoreNumber+=50;
            }
            taikoList.splice(i,1); //5.Clear the drum note
            scoreBoard.innerHTML=scoreNumber; //6.Update score
        }
    }
    if(taikocheckvalue==false){
        var judgementCtx=document.getElementById("judgementCtx").getContext("2d");
        var judgementText=document.getElementById("judgementText");
        judgementCtx.beginPath();
        judgementCtx.drawImage(judgementText,0,50,63,25,12,100,76,30);
        judgementCtx.stroke();
        setTimeout(function () {
            judgementCtx.clearRect(0,0,650,250);
        },200);
    } //When missed, temporarily display "Miss"
}
//Display judgment pattern and text
function judgement(a) {
    //When a=0, display "Great" and yellow halo; when a=1, display "OK" and white halo
    var i=0; //Starting frame number is 0
    var judgementCtx=document.getElementById("judgementCtx").getContext("2d");
    var judgementText=document.getElementById("judgementText");
    var judgementHalo=document.getElementById("judgementHalo");
    judgementDraw();
    function judgementDraw() {
        judgementCtx.clearRect(0,0,650,250);
        judgementCtx.beginPath();
        judgementCtx.drawImage(judgementHalo,i*140,a*140,140,140,-19,93,140,140);
        judgementCtx.stroke();
        judgementCtx.beginPath();
        judgementCtx.drawImage(judgementText,0,a*25,63,25,12,100,76,30);
        judgementCtx.stroke();
        i++;
        if(i<4){
            setTimeout(judgementDraw,100); //When frame number is less than 4, continue calling the function
        }
        if(i==4){
            judgementCtx.clearRect(0,0,650,250); //When frame number equals 4, animation ends, clear the canvas
        }
    }
}
//Dancing character
function dancerPrototype(ctx,imgnode,drawX,time) {
    this.ctx=ctx;
    this.imgNode=imgnode;
    this.cutX=0;
    this.drawX=drawX;
    this.draw=function () {
        this.ctx.beginPath();
        this.ctx.drawImage(this.imgNode,this.cutX,0,120,170,this.drawX,10,120,170);
        this.ctx.stroke();
        //Change the image cutting position for the next draw
        this.cutX+=120;
        if(this.cutX==120*time){  //Time is the number of dance moves of the character, restart after one cycle
            this.cutX=0;
        }
    }
}
function dancerGirltype(ctx,imgnode) {
    this.ctx=ctx;
    this.imgNode=imgnode;
    this.cutY=0;
    this.time=0;
    this.draw=function () {
        this.ctx.beginPath();
        this.ctx.drawImage(this.imgNode,0,this.cutY,900,190,0,68,900,190);
        this.ctx.stroke();
        //Time is the number of dance moves of the character, change move every four beats
        this.time++;
        if(this.time==4){  
            this.cutY=193;
        }
        else if(this.time==8){
            this.cutY=0;
            this.time=0;
        }
    }
}
//Display image
function imgDisplay(img) {
    img.style.display="block";
}
//Hide image
function imgDisAppear(img) {
    img.style.display="none";
}
//Game over
function gameEnd() {
    clearInterval(taikoCreat);
    clearInterval(taikoMove);
    clearInterval(dancerMove);
    document.getElementById("taikoBox").style.display="none";
    document.getElementById("endBox").style.display="block";
    document.getElementById("bg_travel").pause();
    document.getElementById("endmusic").play();
    queryScore();
}
// 保存用户分数
// 使用IndexedDB替代Web SQL
function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("TaikoGame", 1);
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const store = db.createObjectStore("scoreRank", { keyPath: "id", autoIncrement: true });
            store.createIndex("byScore", "score", { unique: false });
        };
        
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        
        request.onerror = function(event) {
            reject(new Error("Database error: " + event.target.errorCode));
        };
    });
}

// 保存分数到IndexedDB
async function saveScore() {
    try {
        const db = await initDatabase();
        const transaction = db.transaction(["scoreRank"], "readwrite");
        const store = transaction.objectStore("scoreRank");
        
        store.add({ username, score: scoreNumber, timestamp: new Date() });
        
        transaction.oncomplete = function() {
            console.log("Score saved successfully");
        };
        
        transaction.onerror = function(event) {
            console.error("Error saving score:", event.target.error);
        };
    } catch (error) {
        console.error("Database error:", error);
    }
}

// 从IndexedDB获取排行榜数据
async function queryScore() {
    try {
        const db = await initDatabase();
        const transaction = db.transaction(["scoreRank"], "readonly");
        const store = transaction.objectStore("scoreRank");
        const index = store.index("byScore");
        
        // 获取所有分数并按降序排列
        const request = index.openCursor(null, "prev");
        const scores = [];
        
        request.onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                scores.push(cursor.value);
                cursor.continue();
            } else {
                updateLeaderboard(scores);
            }
        };
        
        request.onerror = function(event) {
            console.error("Error querying scores:", event.target.error);
        };
    } catch (error) {
        console.error("Database error:", error);
    }
}

// 更新排行榜UI
function updateLeaderboard(scores) {
    const scoreRank = document.getElementById("scoreRank");
    
    if (scores.length === 0) {
        scoreRank.innerHTML = `
            <tr><td><div id="firstIcon"></div></td><td>No data</td><td>No data</td></tr>
            <tr><td><div id="secondIcon"></div></td><td>No data</td><td>No data</td></tr>
            <tr><td><div id="thirdIcon"></div></td><td>No data</td><td>No data</td></tr>
        `;
        return;
    }
    
    let html = '';
    
    // 最多显示前三名
    for (let i = 0; i < Math.min(3, scores.length); i++) {
        const iconId = i === 0 ? "firstIcon" : i === 1 ? "secondIcon" : "thirdIcon";
        html += `
            <tr>
                <td><div id="${iconId}"></div></td>
                <td>${scores[i].username}</td>
                <td>${scores[i].score}</td>
            </tr>
        `;
    }
    
    // 填充空行
    for (let i = scores.length; i < 3; i++) {
        const iconId = i === 0 ? "firstIcon" : i === 1 ? "secondIcon" : "thirdIcon";
        html += `
            <tr>
                <td><div id="${iconId}"></div></td>
                <td>No data</td>
                <td>No data</td>
            </tr>
        `;
    }
    
    scoreRank.innerHTML = html;
}
// 在taiko.js文件中添加以下代码

// Solana钱包连接相关变量
let wallet;
let connection;
let publicKey;

// 初始化Solana连接
function initSolana() {
  // 连接到Solana devnet网络
  connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl('devnet'),
    'confirmed'
  );
  
  // 初始化可用的钱包适配器
  const wallets = [
    new WalletAdaptersWallets.PhantomWalletAdapter(),
    new WalletAdaptersWallets.SolflareWalletAdapter(),
    // 可以添加更多支持的钱包
  ];
  
  return { connection, wallets };
}

// 连接钱包
async function connectWallet() {
  try {
    const { wallets } = initSolana();
    
    // 尝试连接Phantom钱包
    wallet = wallets.find(wallet => wallet.name === 'Phantom');
    
    if (!wallet) {
      alert('Phantom wallet not found. Please install Phantom extension.');
      return;
    }
    
    // 监听钱包连接状态变化
    wallet.on('connect', (publicKey) => {
      console.log('Wallet connected:', publicKey.toBase58());
      updateWalletUI(publicKey);
    });
    
    wallet.on('disconnect', () => {
      console.log('Wallet disconnected');
      updateWalletUI(null);
    });
    
    // 连接钱包
    await wallet.connect();
    publicKey = wallet.publicKey;
    updateWalletUI(publicKey);
    
    // 可以在这里添加连接成功后的逻辑，如记录用户钱包地址等
    console.log('Wallet connected successfully');
    
  } catch (error) {
    console.error('Error connecting wallet:', error);
    alert('Failed to connect wallet: ' + error.message);
  }
}

// 断开钱包连接
async function disconnectWallet() {
  if (wallet) {
    try {
      await wallet.disconnect();
      updateWalletUI(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      alert('Failed to disconnect wallet: ' + error.message);
    }
  }
}

// 更新钱包UI显示
function updateWalletUI(publicKey) {
  const connectBtn = document.getElementById('connectWalletBtn');
  const walletInfo = document.getElementById('walletInfo');
  const walletAddress = document.getElementById('walletAddress');
  
  if (publicKey) {
    connectBtn.style.display = 'none';
    walletInfo.style.display = 'inline-block';
    walletAddress.textContent = publicKey.toBase58();
  } else {
    connectBtn.style.display = 'inline-block';
    walletInfo.style.display = 'none';
  }
}

// 获取钱包余额
async function getWalletBalance() {
  if (!publicKey || !connection) return 0;
  
  try {
    const balance = await connection.getBalance(publicKey);
    return solanaWeb3.LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
}

// 初始化钱包连接功能
function initWalletConnection() {
  const connectBtn = document.getElementById('connectWalletBtn');
  const disconnectBtn = document.getElementById('disconnectWalletBtn');
  
  if (connectBtn && disconnectBtn) {
    connectBtn.addEventListener('click', connectWallet);
    disconnectBtn.addEventListener('click', disconnectWallet);
  }
}

// 在window.onload中初始化钱包连接
window.onload = function() {
  document.getElementById("bgmusic").play();
  setTimeout(function () {
    document.getElementById("title_call").play();
  },500);
  
  // 初始化钱包连接功能
  initWalletConnection();
};
// Solana钱包连接相关变量
let wallet;
let connection;
let publicKey;

// 初始化Solana连接
function initSolana() {
  try {
    // 检查库是否正确加载
    if (!window.SolanaWalletAdapterWALLETS) {
      throw new Error('Solana wallet adapter library not loaded');
    }
    
    // 连接到Solana devnet网络
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('devnet'),
      'confirmed'
    );
    
    // 初始化可用的钱包适配器
    const wallets = [
      new window.SolanaWalletAdapterWALLETS.PhantomWalletAdapter(),
      new window.SolanaWalletAdapterWALLETS.SolflareWalletAdapter(),
    ];
    
    return { connection, wallets };
  } catch (error) {
    console.error('Failed to initialize Solana:', error);
    alert('Failed to load Solana wallet support: ' + error.message);
    throw error;
  }
}

// 连接钱包
async function connectWallet() {
  try {
    const { wallets } = initSolana();
    
    // 尝试连接Phantom钱包
    wallet = wallets.find(wallet => wallet.name === 'Phantom');
    
    if (!wallet) {
      alert('Phantom wallet not found. Please install Phantom extension.');
      return;
    }
    
    // 监听钱包连接状态变化
    wallet.on('connect', (publicKey) => {
      console.log('Wallet connected:', publicKey.toBase58());
      updateWalletUI(publicKey);
    });
    
    wallet.on('disconnect', () => {
      console.log('Wallet disconnected');
      updateWalletUI(null);
    });
    
    // 连接钱包
    await wallet.connect();
    publicKey = wallet.publicKey;
    updateWalletUI(publicKey);
    
    console.log('Wallet connected successfully');
    
  } catch (error) {
    console.error('Error connecting wallet:', error);
    alert('Failed to connect wallet: ' + error.message);
  }
}
// Solana钱包连接功能
let wallet;
let connection;
let publicKey;

// 初始化Solana连接
function initSolana() {
  try {
    // 检查钱包适配器库是否加载
    if (!window.SolanaWalletAdapterWALLETS) {
      throw new Error('钱包适配器库未加载，请刷新页面重试');
    }
    
    // 连接到Solana网络（可切换为mainnet-beta）
    connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('devnet'),
      'confirmed'
    );
    
    // 可用的钱包适配器列表
    const wallets = [
      new window.SolanaWalletAdapterWALLETS.PhantomWalletAdapter(),
      new window.SolanaWalletAdapterWALLETS.SolflareWalletAdapter(),
      new window.SolanaWalletAdapterWALLETS.SlopeWalletAdapter(),
      // 添加更多支持的钱包...
    ];
    
    return { connection, wallets };
  } catch (error) {
    console.error('Solana初始化失败:', error);
    showToast('连接钱包失败: ' + error.message, 'error');
    throw error;
  }
}

// 连接钱包
async function connectWallet() {
  try {
    // 显示加载状态
    const connectBtn = document.getElementById('connectWalletBtn');
    connectBtn.disabled = true;
    connectBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 连接中...';
    
    const { wallets } = initSolana();
    
    // 尝试自动连接已授权的钱包
    wallet = wallets.find(w => w.autoConnect && w.name === 'Phantom');
    
    if (!wallet) {
      // 如果没有自动连接的钱包，使用第一个可用钱包
      wallet = wallets[0];
    }
    
    // 监听连接状态变化
    wallet.on('connect', (pk) => {
      console.log('钱包已连接:', pk.toBase58());
      publicKey = pk;
      updateWalletUI(pk);
      showToast('钱包连接成功!', 'success');
    });
    
    wallet.on('disconnect', () => {
      console.log('钱包已断开');
      publicKey = null;
      updateWalletUI(null);
    });
    
    // 连接钱包
    await wallet.connect();
    
  } catch (error) {
    console.error('连接钱包失败:', error);
    
    // 特定错误处理
    if (error.message.includes('User rejected the request')) {
      showToast('用户拒绝了连接请求', 'warning');
    } else if (error.message.includes('No wallet found')) {
      showToast('未找到钱包插件，请安装Phantom钱包', 'error');
      setTimeout(() => {
        window.open('https://phantom.app/', '_blank');
      }, 1000);
    } else {
      showToast('连接钱包失败: ' + error.message, 'error');
    }
    
  } finally {
    // 恢复按钮状态
    const connectBtn = document.getElementById('connectWalletBtn');
    connectBtn.disabled = false;
    connectBtn.innerHTML = '<i class="fa fa-wallet mr-2"></i> 连接钱包';
  }
}

// 断开钱包连接
async function disconnectWallet() {
  try {
    if (wallet) {
      await wallet.disconnect();
      showToast('钱包已断开连接', 'info');
    }
  } catch (error) {
    console.error('断开钱包失败:', error);
    showToast('断开钱包失败: ' + error.message, 'error');
  }
}

// 更新钱包UI
function updateWalletUI(pubkey) {
  const connectBtn = document.getElementById('connectWalletBtn');
  const walletInfo = document.getElementById('walletInfo');
  const walletAddress = document.getElementById('walletAddress');
  
  if (pubkey) {
    connectBtn.classList.add('hidden');
    walletInfo.classList.remove('hidden');
    walletAddress.textContent = pubkey.toBase58().substring(0, 4) + '...' + pubkey.toBase58().substring(38);
  } else {
    connectBtn.classList.remove('hidden');
    walletInfo.classList.add('hidden');
  }
}

// 显示通知提示
function showToast(message, type = 'info') {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'fixed bottom-4 right-4 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg transform transition-all duration-500';
  
  // 根据类型设置样式
  if (type === 'success') {
    toastContainer.classList.add('bg-green-500', 'text-white');
  } else if (type === 'error') {
    toastContainer.classList.add('bg-red-500', 'text-white');
  } else if (type === 'warning') {
    toastContainer.classList.add('bg-yellow-500', 'text-white');
  } else {
    toastContainer.classList.add('bg-blue-500', 'text-white');
  }
  
  toastContainer.innerHTML = `
    <i class="fa fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-2"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toastContainer);
  
  // 显示动画
  setTimeout(() => {
    toastContainer.classList.add('translate-y-0');
  }, 10);
  
  // 自动关闭
  setTimeout(() => {
    toastContainer.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
      document.body.removeChild(toastContainer);
    }, 500);
  }, 3000);
}

// 初始化钱包连接
function initWalletConnection() {
  const connectBtn = document.getElementById('connectWalletBtn');
  const disconnectBtn = document.getElementById('disconnectWalletBtn');
  
  if (connectBtn && disconnectBtn) {
    connectBtn.addEventListener('click', connectWallet);
    disconnectBtn.addEventListener('click', disconnectWallet);
  }
  
  // 检查是否已有授权的钱包
  setTimeout(() => {
    if (window.solana && window.solana.isPhantom) {
      // 显示快速连接提示
      showToast('点击"连接钱包"可快速授权', 'info');
    }
  }, 1000);
}

// 在页面加载时初始化
window.onload = function() {
  // 原有游戏初始化代码...
  
  // 初始化钱包连接
  initWalletConnection();
}
