export default class MainApplication {
    static main() {
        new MainApplication().start();
    }
    constructor() {
        this._data = new Array(0);
        this._viewIndex = 0;
        this._returnFlg = false;
        const urldata = location.href.split("?");
        if (urldata.length < 2) {
            alert("データがありません。設定画面へ移動します");
            location.href = "./setting.html";
            return;
        }
        const data = JSON.parse(decodeURI(urldata[1]));
        this._winner = (data.winner == "undefined") ? undefined : data.winner;
        this._data = data.data;
        const number = document.getElementById("number");
        number.innerHTML = data.data.length.toString();
    }
    start() {
        const number = document.getElementById("number");
        const count = document.getElementById("count");
        const same = document.getElementById("same");
        count.style.opacity = "0";
        same.style.opacity = "0";
        this.__setNextData();
        window.addEventListener("keydown", (event) => {
            if (event.key != "Enter")
                return;
            const number = document.getElementById("number");
            const count = document.getElementById("count");
            const same = document.getElementById("same");
            const count_opacity = parseInt(count.style.opacity);
            const same_opacity = parseInt(same.style.opacity);
            // 両方とも表示されていれば
            if (same_opacity * count_opacity == 1) {
                if (this._returnFlg) {
                    const flg = confirm("値設定画面に戻りますか？");
                    if (flg) {
                        location.href = "./setting.html";
                    }
                    return;
                }
                if (this._viewIndex >= this._data.length) {
                    number.innerHTML = "1番大きくて誰とも被らなかった人は";
                    count.innerHTML = (this._winner === undefined) ? "いませんでした" : `${this._winner.value} 番`;
                    same.innerHTML = (this._winner === undefined) ? "" : "を書いた方です！";
                    this._returnFlg = true;
                    return;
                }
                // 非表示に戻す
                count.style.opacity = "0";
                same.style.opacity = "0";
                // 次の項目の情報をセットする
                this.__setNextData();
            }
            if (count_opacity == 0)
                count.style.opacity = Math.abs(count_opacity - 1).toString();
            if (count_opacity == 1 && same_opacity == 0)
                same.style.opacity = Math.abs(same_opacity - 1).toString();
        });
    }
    __setNextData() {
        const number = document.getElementById("number");
        const count = document.getElementById("count");
        const same = document.getElementById("same");
        // 次の項目の情報をセットする
        const target = this._viewIndex;
        const nowData = this._data[target];
        count.innerHTML = `${nowData.value} 番`;
        same.innerHTML = `同じ数の人は ${nowData.count} 人いました`;
        number.innerHTML = `${this._data.length - this._viewIndex} 番目に大きな数は`;
        this._viewIndex++;
    }
}
