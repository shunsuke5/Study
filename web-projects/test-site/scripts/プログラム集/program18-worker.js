// メインスレッドからのメッセージを待ち受けする
// メッセージのコマンドが"generate"であれば、
// `generatePrimes()`を呼び出す
addEventListener("message", (message) => {
    if (message.data.command === "generate") {
        generatePrimes(message.data.quota);
    }
});

// 素数を生成(とても非効率)
function generatePrimes(quota) {
    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n & c === 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const maximum = 100000;

    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }

    // 完了したら、生成した素数の個数を記載したメッセージを
    // メインスレッドに送信する
    postMessage(primes.length);
}