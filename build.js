const fs = require("fs");
const e = JSON.stringify;
let output = "";

for(const file of fs.readdirSync("screens")){
  const names = file.split(".");
  names.pop();
  const name = names.join("_");
  
  output += `app.template(${e(name)}, ${e(fs.readFileSync("screens/" + file, "utf-8"))});\n`
}

for(const file of fs.readdirSync("components")){
  const names = file.split(".");
  names.pop();
  const name = names.join("_");
  
  output += `app.component(${e(name)}, (screen) => {\n${fs.readFileSync("components/" + file, "utf-8")}\n});\n`
}

for(const file of fs.readdirSync("pages")){
  const names = file.split(".");
  names.pop();
  const name = names.join("_");
  
  output += `app.screen(${e(name)}, async (params) => {\n${fs.readFileSync("pages/" + file, "utf-8")}\n});\n`
}

for (const file of fs.readdirSync("actions")) {
  const names = file.split(".");
  names.pop();
  const name = names.join("_");

  output += `app.action(${e(name)}, async (params, form) => {\n${fs.readFileSync("actions/" + file, "utf-8")}\n});\n`
}

fs.writeFileSync("js/build.js", output);
console.log("Build completo")