// =====================
// DB
// =====================
function getDB(){
    return JSON.parse(
      localStorage.getItem("db") || "{}"
    );
  }
  
  // =====================
  // 表格
  // =====================
function viewTable(){

    const db = getDB();

    let html = `
        <table class="table">

        <tr>
            <th></th>
            <th>姓名</th>
            <th>年齡</th>
            <th>Email</th>

            <th>P1分數</th>
            <th>時長</th>
            <th>時間</th>

            <th>P2分數</th>
            <th>時長</th>
            <th>時間</th>

            <th>P3分數</th>
            <th>時長</th>
            <th>時間</th>

            <th>P4分數</th>
            <th>時長</th>
            <th>時間</th>
        </tr>
    `;

    for(const name in db){

        const d = db[name];

        html += `
        <tr>

            <td>
                <button class="delete-btn"
                    onclick="deleteUser('${name}')">
                    🗑刪除
                </button>
            </td>

            <td class="name-cell">${name}</td>

            <td>${d.age || "-"}</td>
            <td>${d.email || "-"}</td>

            <td>${d.score?.p1 ?? "-"}</td>
            <td>${d.time?.p1 ?? "-"}</td>
            <td>${d.testTime?.p1?.readable ?? "-"}</td>

            <td>${d.score?.p2 ?? "-"}</td>
            <td>${d.time?.p2 ?? "-"}</td>
            <td>${d.testTime?.p2?.readable ?? "-"}</td>

            <td>${d.score?.p3 ?? "-"}</td>
            <td>${d.time?.p3 ?? "-"}</td>
            <td>${d.testTime?.p3?.readable ?? "-"}</td>

            <td>${d.score?.p4 ?? "-"}</td>
            <td>${d.time?.p4 ?? "-"}</td>
            <td>${d.testTime?.p4?.readable ?? "-"}</td>

        </tr>
        `;
    }

    html += `</table>`;

    document.getElementById("content").innerHTML = html;
}

  
  // =====================
  // 匯出 CSV
  // =====================
  function exportCSV(){

    const db = getDB();
  
    let csv =
    "\uFEFF" +   // ✅ Excel UTF-8 BOM（關鍵）
    "Name,Age,Email," +
    "P1分數,時長,時間," +
    "P2分數,時長,時間," +
    "P3分數,時長,時間," +
    "P4分數,時長,時間\n";
  
    for(const name in db){
  
      const d = db[name];
  
      csv +=
        `${name},` +
        `${d.age || ""},` +
        `${d.email || ""},` +
  
        `${d.score?.p1 ?? ""},` +
        `${d.time?.p1 ?? ""},` +
        `${d.testTime?.p1?.readable ?? ""},` +
  
        `${d.score?.p2 ?? ""},` +
        `${d.time?.p2 ?? ""},` +
        `${d.testTime?.p2?.readable ?? ""},` +
  
        `${d.score?.p3 ?? ""},` +
        `${d.time?.p3 ?? ""},` +
        `${d.testTime?.p3?.readable ?? ""},` +

        `${d.score?.p4 ?? ""},` +
        `${d.time?.p4 ?? ""},` +
        `${d.testTime?.p4?.readable ?? ""}` +
  
        `\n`;
    }
  
    let blob = new Blob([csv], {
      type: "text/csv;charset=utf-8"
    });
  
    let url = URL.createObjectURL(blob);
  
    let a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
  
    a.click();
  
    URL.revokeObjectURL(url);
}

function deleteUser(name){

    let db = getDB();

    if(!confirm(`確定要刪除 ${name} 嗎？`)){
        return;
    }

    delete db[name];

    localStorage.setItem("db", JSON.stringify(db));

    viewTable(); //刷新畫面
}
