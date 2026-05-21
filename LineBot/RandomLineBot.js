//程式碼開始
var CHANNEL_ACCESS_TOKEN = ""; // 請填入您的 Line Channel Access Token
var triggerKeywords = ["/r", "/random"]; // 可自訂觸發隨機選擇的關鍵字陣列

//接收使用者訊息
function doPost(e) {
    var userData = JSON.parse(e.postData.contents);
    console.log(userData);

    // 取出 replyToken 和發送的訊息文字
    var replyToken = userData.events[0].replyToken;
    var clientID = userData.events[0].source.userId;

    try {
        var clientMessage = userData.events[0].message.text;

        // 檢查訊息是否以任何觸發關鍵字開頭
        var detectedTrigger = null;
        for (var i = 0; i < triggerKeywords.length; i++) {
            if (clientMessage.toLowerCase().startsWith(triggerKeywords[i].toLowerCase())) {
                detectedTrigger = triggerKeywords[i];
                break;
            }
        }

        // 如果沒有偵測到觸發關鍵字，則不回應
        if (!detectedTrigger) {
            return;
        }

        // 移除觸發關鍵字，取得選項內容
        var optionsText = clientMessage.substring(detectedTrigger.length).trim();

        // 如果沒有提供選項，回覆使用說明
        if (!optionsText) {
            var replyMessage = "請在關鍵字後輸入選項，每個選項一行。\n\n範例：\n/r\n選項A\n選項B\n選項C";
            sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, replyMessage);
            return;
        }

        // 執行隨機選擇
        var result = getRandomItem(optionsText);

        if (!result) {
            var replyMessage = "請至少輸入一個有效的選項！";
            sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, replyMessage);
            return;
        }

        // 回覆隨機選擇的結果
        var replyMessage = "🎲 隨機選擇結果：\n\n" + result;
        sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, replyMessage);

    } catch (err) {
        console.log("Error: " + err);
        return;
    }
}

//隨機選擇函數（改編自 script.js）
function getRandomItem(text) {
    if (!text) return null;

    // 以換行符號分割並過濾空白行
    var items = text.split('\n')
        .map(function (item) { return item.trim(); })
        .filter(function (item) { return item.length > 0; });

    if (items.length === 0) return null;

    var randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

//回送 Line Bot 訊息給使用者
function sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, replyMessage) {
    var url = 'https://api.line.me/v2/bot/message/reply';
    UrlFetchApp.fetch(url, {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
            'replyToken': replyToken,
            'messages': [{
                'type': 'text',
                'text': replyMessage,
            }],
        }),
    });
}
//程式碼結束
