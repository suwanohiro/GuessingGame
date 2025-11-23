export default class MainApplication {
    static main() {
        new MainApplication().start();
    }
    start() {
        this.__addCounterEvent();
        this.__addResetEvent();
        const done = document.getElementById("done");
        done.addEventListener("click", () => {
            const numbers = document.getElementsByClassName("number");
            const counters = document.getElementsByClassName("counter");
            const result = new Array(0);
            let winner = undefined;
            for (let cnt = 0; cnt < numbers.length; cnt++) {
                const num = parseInt(numbers[cnt].innerHTML);
                const count = parseInt(counters[cnt].innerHTML);
                if (count < 1)
                    continue;
                if (winner === undefined && count == 1) {
                    winner = { value: num, count: count };
                }
                result.push({ value: num, count: count });
            }
            result.reverse();
            const json = JSON.stringify({
                winner: (winner === undefined) ? "undefined" : winner,
                data: result
            });
            const encodeJSON = encodeURI(json);
            location.href = `./result.html?${encodeJSON}`;
        });

        document.addEventListener("keydown", (event) => {
            // スラッシュキーが押されたら
            if (event.key !== "/") return;

            const value = prompt("カウントを増やす数字を入力してください");
            if (value === null) return;
            const numValue = parseInt(value);
            if (isNaN(numValue)) return;

            // 1 - 100の範囲でなければ無視
            if (numValue < 1 || numValue > 100) return;

            // 対応する数字のカウントを増やす
            const add = document.getElementsByClassName("add");
            add[100 - numValue].click();
        });
    }
    /**
     * リセットボタンを押した時の処理追加
     */
    __addResetEvent() {
        const reset = document.getElementById("reset");
        reset.addEventListener("click", () => {
            const flg = confirm("カウント値をリセットしますか？");
            if (!flg)
                return;
            const counters = document.getElementsByClassName("counter");
            for (let cnt = 0; cnt < counters.length; cnt++) {
                counters[cnt].innerHTML = "0";
            }
        });
    }
    /**
     * カウント用ボタンを押した時の処理追加
     */
    __addCounterEvent() {
        const counter = document.getElementsByClassName("counter");
        for (let cnt = 0; cnt < counter.length; cnt++) {
            const addBtn = document.getElementsByClassName("add")[cnt];
            const subBtn = document.getElementsByClassName("sub")[cnt];
            addBtn.addEventListener("click", () => {
                const num = parseInt(counter[cnt].innerHTML);
                counter[cnt].innerHTML = (num + 1).toString();
            });
            subBtn.addEventListener("click", () => {
                const num = parseInt(counter[cnt].innerHTML);
                // 0未満にさせない
                if (num < 1)
                    return;
                counter[cnt].innerHTML = (num - 1).toString();
            });
        }
    }
}
