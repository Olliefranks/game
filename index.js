import inquirer from "inquirer";
import { Person } from "./class.js";
const person = new Person();

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
    choices: ["Nerf gun", "Sword", "Rubber duck", "Spoon"],
  });

  callback(weapon);
};

const display = (name, weapon) => {
  console.log(`${name} has selected ${weapon} as their weapon`);
};

const level1 = async (name, weapon) => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          name: "message1",
          type: "input",
          message: `Level 1: ${name}, You have just woken up from a 6 week coma to find that you are in the middle of a zombie apocalypse.`,
        },
        {
          message: `The mission is to get yourself to the roof so that the military can evacuate anyone that is left, What do you want to do?`,
          type: "list",
          choices: [
            "Take the stairs?",
            "Wait for the lift?",
            "Curl up in a ball and wait for help to arrive?",
          ],
          name: "level1",
        },
      ])
      .then((answers) => {
        if (answers.level1 === "Take the stairs?") {
          console.log(
            `${name} has decided to take the stairs. and safely makes it to level 2`
          );
          resolve();
        } else if (answers.level1 === "Wait for the lift?") {
          console.log(
            `${name} has decided to wait for the lift. BUT! while waiting a Horde of zombies appears and attacks!. you manage to escape with a few cuts and bruises`
          );
          resolve();
        } else if (
          answers.level1 === "Curl up in a ball and wait for help to arrive?"
        ) {
          console.log(
            `${name} has decided to curl up in a ball and wait for help to arrive. but the horde of zombies have surrounded you!.`,
            "The game has ended. You have been defeated. Better luck next time."
          );
          process.exit();
        }
      });
  });
};

const level2 = (name, weapon) => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          message: `${name}, You have made it to level 2!, But you hear a cry for help down the corridor, do you Go towards the sound or carry on to the roof?`,
          type: "list",
          choices: [
            "Go find who is shouting for help",
            "carry on up the stairs to thr roof",
          ],
          name: "level2",
        },
      ])
      .then((answers) => {
        if (answers.level2 === "carry on up the stairs to thr roof") {
          console.log(` ${name}'s decided to keep going. to the roof`);
          goToLevel3(name, weapon);
        } else if (answers.level1 === "Go find who is shouting for help") {
          console.log(
            `${name} went looking for whoever was shouting for help But!...`
          );

          goToLevel3(name, weapon);
        }
        resolve();
      });
  });
};

start((name) => {
  selectWeapon(name, (weapon) => {
    display(name, weapon);
    level1(name, weapon)
      .then(() => {
        level2(name, weapon);
      })

      .catch((error) => {
        console.error(error);
      });
  });
});
