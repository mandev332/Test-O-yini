let fs = require("fs");
let rl = require("readline");

let ques = fs.readFileSync("questions.json", "utf-8");
let questions = ques ? JSON.parse(ques) : [];

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let array = ["A", "B", "C", "Tog'ri"];
let newarray = [];
function* gener() {
  for (let i of array) {
    yield i;
  }
}

let gen = gener();
let generet = 4;

readline.setPrompt("Yangi savolni kiriting: \n>> ");
readline.prompt();
readline.on("line", (text) => {
  newarray.push(text);
  let variant = gen.next().value;
  if (variant || !array.includes(newarray[generet++].toUpperCase())) {
    readline.setPrompt((variant || "To'g'ri") + " variantni kiriting: \n>> ");
    readline.prompt();
  } else {
    console.log("Yangi savol qo'shildi!");
    let savoli =
      newarray[0].trim() +
      "\n" +
      "a)" +
      newarray[1].trim() +
      "   b)" +
      newarray[2].trim() +
      "   c)" +
      newarray[3].trim() +
      "\n>>";
    let object = {
      id: questions.length,
      question: savoli,
      answer: newarray[generet - 1].toLowerCase().trim(),
    };
    questions.push(object);
    fs.writeFileSync("questions.json", JSON.stringify(questions, null, 4));
    return readline.close();
  }
});
