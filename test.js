let fs = require("fs");
let rl = require("readline");
let ques = fs.readFileSync("questions.json", "utf-8");
let user = fs.readFileSync("users.json", "utf-8");
let questions = ques ? JSON.parse(ques) : [];
let users = user ? JSON.parse(user) : [];

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.round(Math.random() * i);
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

let arr = [];
for (let n = 1; n < questions.length; n++) {
  arr.push(n);
}

let arr2 = shuffle(arr);
arr2.unshift(0);

function* gener() {
  for (let i of arr2) {
    yield i;
  }
}
let gen = gener();
let son = true;
let Username;
let nomer = 1;
let ansverTrue = 0;
let ansverFalse = 0;
let n = 0;

let genearator_array = [];
readline.setPrompt(questions[gen.next().value].question + " ");
readline.prompt();
readline.on("line", (javob) => {
  let num = gen.next().value;
  genearator_array.push(num);

  if (!num) {
    if (questions[genearator_array[n]].answer == javob.toLowerCase()) {
      console.log("To'g'ri");
      ansverTrue++;
    } else {
      console.log("Xato");
      ansverFalse++;
    }

    let obj = {
      ism: Username,
      togri: ansverTrue,
      xato: ansverFalse,
      ball: ansverTrue,
      savol_soni: questions.length - 1,
    };
    users.push(obj);
    console.log("O'yin tugadi!");
    console.table([obj]);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 4));
    return readline.close();
  }
  if (son == true) {
    console.log(javob, "Oyin boshlandi!");
    Username = javob;
    son = false;
  } else {
    if (questions[genearator_array[n++]].answer == javob.toLowerCase()) {
      console.log("To'g'ri");
      ansverTrue++;
    } else {
      console.log("Xato");
      ansverFalse++;
    }
  }

  readline.setPrompt(nomer++ + "-" + questions[num].question);
  readline.prompt();
});
