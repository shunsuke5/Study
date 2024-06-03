// Create needed constants
const list = document.querySelector("ul");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const form = document.querySelector("form");
const submitBtn = document.querySelector("form button");

// 開いているデータベースを格納するために、dbオブジェクトのインスタンスを作成する。
let db;

// データベースを開く。データベースがまだ存在しない場合は作成される。
// (後述の upgradeneedハンドラーを参照)。
const openRequest = window.indexedDB.open("notes_db", 1);

// error ハンドラーは、データベースがうまく開けなかったことを意味する。
openRequest.addEventListener("error", () => 
    console.error("Database failed to open"),
);

// success ハンドラーは、データベースがうまく開けたことを意味する。
openRequest.addEventListener("success", () => {
    console.log("Database opened successfully");

    // 開いたデータベースオブジェクトを db という変数に記憶する。
    // これは以降で頻繁に使われる。
    db = openRequest.result;

    // IDB 内の既存のメモ書きを表示するために、displayData()関数を実行する。
    displayData();
});

// データベースのテーブルがまだ存在しない場合は、それを設定する。
openRequest.addEventListener("upgradeneeded", (e) => {
    db = e.target.result;

    // 自動増加するキーを含んだ、メモを格納するためのObjectStoreを
    // 作成する(基本的に単一の表のように)
    const objectStore = db.createObjectStore("notes_os", {
        keyPath: "id",
        autoIncrement: true,
    });

    // objectStore にどのようなデータ項目を格納するかを定義する。
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("body", "body", { unique: false });

    console.log("Database setup complete");
});

// submit イベントハンドラーを作成し、フォームが送信されたときに
// addData()関数が実行されるようにする。
form.addEventListener("submit", addData);

// addData()関数を定義する。
function addData(e) {
    // 既定の動作を抑止する。従来通りの方法でフォームを送信したくないから。
    e.preventDefault();

    // フォームのフィールドに入力された値を取得し、
    // DB に挿入できるようにオブジェクトに格納する。
    const newItem = { title: titleInput.value, body: bodyInput.value };

    // 読み書きのデータベーストランザクションを開いて、データの追加に備える。
    const transaction = db.transaction(["notes_os"], "readwrite");

    // すでにデータベースに追加されているオブジェクトストアを呼び出す。
    const objectStore = transaction.objectStore("notes_os");

    // newItem オブジェクトをオブジェクトストアに追加するリクエストを行う。
    const addRequest = objectStore.add(newItem);

    addRequest.addEventListener("success", () => {
        titleInput.value = "";
        bodyInput.value = "";
    });

    // トランザクションが完了し、完全に終了した場合の成功を報告する。
    transaction.addEventListener("complete", () => {
        console.log("Transaction completed: database modification finished.");

        // 表示データの更新を行い、新しく追加された項目を表示するために
        // 再度 displayData() を実行する。
        displayData();
    });

    transaction.addEventListener("error", () => 
        console.log("Transaction not opened due to error")
    );
}

// displayData()関数を定義する。
function displayData() {
    // ここでは、表示が更新されるたびに、リスト要素の中身を空にしている。
    // これを行わないと、新しいメモが追加されるたびに、重複して掲載されてしまう。
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // オブジェクトストアを開き、カーソルを取得する。カーソルはストア内の
    // 異なるデータ項目をすべて反復処理する。
    const objectStore = 
    db.transaction("notes_os").objectStore("notes_os");
    objectStore.openCursor().addEventListener("success", (e) => {
        // カーソルへの参照を取得する。
        const cursor = e.target.result;

        // 反復処理を行うべき別のデータ項目がまだあれば、このコードを実行し続ける。
        if (cursor) {
            // リスト項目、h3、p を作成し、表示する際に各データ項目を中に入れる。
            // HTML フラグメントを構成し、リストの中に追加する。
            const listItem = document.createElement("li");
            const h3 = document.createElement("h3");
            const para = document.createElement("p");

            listItem.appendChild(h3);
            listItem.appendChild(para);
            list.appendChild(listItem);

            // h3 および para の内部に、カーソルからのデータを入れる。
            h3.textContent = cursor.value.title;
            para.textContent = cursor.value.body;

            // listItem の属性内部に、このデータ項目のIDを保存する。こうすると、
            // どの項目に対応しているのかがわかる。これは、後で項目を削除したくなった時に有用。
            listItem.setAttribute("data-note-id", cursor.value.id);

            // ボタンを作成し、それを各 listItem の内部に設置する。
            const deleteBtn = document.createElement("button");
            listItem.appendChild(deleteBtn);
            deleteBtn.textContent = "Delete";

            // ボタンがクリックされたら deleteItem()関数が実行されるように
            // イベントハンドラーを設定する。
            deleteBtn.addEventListener("click", deleteItem);

            // カーソルの次の項目へ反復処理を行う。
            cursor.continue();
        } else {
            // Again, if list item is empty, display a "No notes stored" message
            if (!list.firstChild) {
                const listItem = document.createElement("li");
                listItem.textContent = "No notes stored.";
                list.appendChild(listItem);
            }
            // 反復処理をすべきカーソルの項目がこれ以上無い場合、そのように示す。
            console.log("Notes all displayed");
        }
    });
}

// deleteItem()関数を定義する。
function deleteItem(e) {
    // 削除したいタスクの名前を取得する。
    // IDB で使用する前に、これを数値に変換する必要がある。
    // IDB のキー値は型が重視される。
    const noteId = Number(e.target.parentNode.getAttribute("data-note-id"));

    // データベーストランザクションを開き、タスクを削除する。
    // 上で取得した id を使用してタスクを探す。
    const transaction = db.transaction(["notes_os"], "readwrite");
    const objectStore = transaction.objectStore("notes_os");
    const deleteRequest = objectStore.delete(noteId);

    // データ項目を削除したことを報告する。
    transaction.addEventListener("complete", () => {
        // ボタンの親、すなわちリスト項目を削除する。
        // すると、それは表示されなくなる。
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        console.log(`Note ${noteId} deleted.`);

        // この場合も、リスト項目が空であれば、「メモが格納されていない」メッセージを表示。
        if (!list.firstChild) {
            const listItem = document.createElement("li");
            listItem.textContent = "No notes stored.";
            list.appendChild(listItem);
        }
    });
}