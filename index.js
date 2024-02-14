import inquirer from "inquirer";

const start = async (callback) => {
  let { name } = await inquirer.prompt({
    name: "name",
    type: "Input",
    message: "Hello survivor, What is your name?",
  });
  callback(name);
};

const selectWeapon = async (name, callback) => {
  let { weapon } = await inquirer.prompt({
    name: "weapon",
    type: "list",
    message: `${name}, please select your weapon:`,
    choices: ["Nerf gun", "sword", "Rubber duck", "spoon"],
  });

  callback(weapon);
};

const display = (name, weapon) => {
  console.log(`${name} has selected ${weapon} as their weapon`);
};

start((name) => {
  selectWeapon(name, (weapon) => {
    display(name, weapon);
  });
});

start();
