// API URL，取得分類為6的表演活動
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// 建立 XMLHttpRequest 請求
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

// 當資料載入完成後處理資料
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var dataset = JSON.parse(this.responseText);
    addNewData(dataset); // 將資料加進表格
  }
};

// 將資料顯示在網頁表格中
function addNewData(dataset) {
  var myTable = document.getElementById("csie");

  dataset.forEach(function (data, index) {
    var row = myTable.insertRow(-1); // 在表格末端插入一列

    // 插入標題欄位
    row.insertCell(0).innerHTML = data['title'];

    // 插入地點欄位
    row.insertCell(1).innerHTML = data['showInfo'][0]['location'];

    // 插入票價欄位
    row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
  });
}