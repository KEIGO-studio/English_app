/*onClickAdd = () => {
  document.getElementById("answer-button").remove();
  const correctButton = document.createElement("button");
  document.getElementById("correct-area").appendChild(correctButton);
};

const btn = document.querySelectorAll(".answer-button");

btn.forEach((button) => {
  button.addEventListener("click", onClickAdd);
});*/

//.addEventListener("click", onClickAdd);

const problems = [
  {
    answerWords: ["of", "It", "a", "takes", "time", "lot"],
    correctOrder: ["It", "takes", "a", "lot", "of", "time"],
  },
  {
    answerWords: ["new", "I", "books", "bought", "a"],
    correctOrder: ["I", "bought", "a", "new", "books"],
  },
];

let currentProblemIndex = 0;
let correctCount = 0; // 正解数をカウントする変数
let clickedOrder = []; // クリックされた順序を保存する配列

const correctArea = document.getElementById("correct-area");
const resultDiv = document.getElementById("result");
const answerList = document.getElementById("answer-list");
const nextButton = document.getElementById("next-button");
const endButton = document.getElementById("end-button");

function loadProblem(index) {
  const problem = problems[index];
  const answerWords = problem.answerWords;
  const correctOrder = problem.correctOrder;
  clickedOrder = [];
  correctArea.innerHTML = "";
  resultDiv.textContent = "";

  answerList.innerHTML = "";
  answerWords.forEach((word) => {
    const button = document.createElement("button");
    button.classList.add("answer-button");
    button.textContent = word;
    answerList.appendChild(button);

    // ボタンがクリックされたときの処理
    button.addEventListener("click", function () {
      correctArea.appendChild(this);
      clickedOrder.push(this.textContent); // クリックされた順序を保存
      checkOrder(correctOrder);
    });
  });
}

function checkOrder(correctOrder) {
  if (!correctOrder) {
    console.error("correctOrder is undefined");
    return;
  }
  if (clickedOrder.length === correctOrder.length) {
    let isCorrect = true;
    for (let i = 0; i < clickedOrder.length; i++) {
      if (clickedOrder[i] !== correctOrder[i]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      resultDiv.textContent = "正解！";
      correctCount++;
      amazingSample();
    } else {
      resultDiv.textContent = "不正解。";
    }
  }
  function amazingSample() {
    swal
      .fire({
        title: "すばらしい！！",
        text: "ボタンをクリックできましたね！",
        icon: "success",
        confirmButtonText: "次へ",
        width: "60%",
        height: "60%",
      })
      .then(() => {
        nextProblem();
      });
  }
}

function nextProblem() {
  currentProblemIndex++;
  if (currentProblemIndex < problems.length) {
    loadProblem(currentProblemIndex);
  } else {
    nextButton.style.display = "none";
    endButton.style.display = "block";
  }
}

function resetGame() {
  currentProblemIndex = 0;
  loadProblem(currentProblemIndex);
  nextButton.style.display = "block";
  endButton.style.display = "none";
}

loadProblem(currentProblemIndex);

// 次の問題ボタンのイベントリスナー
nextButton.addEventListener("click", nextProblem);

// 終了ボタンのイベントリスナー

endButton.addEventListener("click", function () {
  Swal.fire({
    title: "結果",
    text: `正解数: ${correctCount} / ${problems.length}`,
    icon: "info",
    confirmButtonText: "OK",
  }).then(() => {
    resetGame();
  });
});
