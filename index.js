import inquirer from "inquirer";
import { Person, ZombieHorde } from "./class.js";

let person;
let zombieHorde;

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

  callback(name, weapon);
};
const display = (name, weapon) => {
  person = new Person(name);
  person.updateWeapon(weapon);

  console.log(`${name} has selected ${weapon} as their weapon`);

  console.table(person);
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
        zombieHorde = new ZombieHorde();
        if (answers["level1"] === "Take the stairs?") {
          console.log(
            `${name} has decided to take the stairs. and safely makes it to level 2`
          );

          resolve();
        } else if (answers["level1"] === "Wait for the lift?") {
          console.log(
            `${name} has decided to wait for the lift. BUT! while waiting a Horde of zombies appears and attacks!. you manage to escape with a few cuts and bruises`
          );

          const damage = zombieHorde.attack;
          person.update(person.health - damage);

          resolve();
        } else if (
          answers["level1"] === "Curl up in a ball and wait for help to arrive?"
        ) {
          console.log(
            `${name} has decided to curl up in a ball and wait for help to arrive. but the horde of zombies have surrounded you!.`,
            "The game has ended. You have been defeated. Better luck next time."
          );
          process.exit();
        }
        console.table(person);
      });
  });
};

const level2 = (name, weapon) => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          message: `Level 2: ${name}, You have made it to the next floor!, But you hear a cry for help down the corridor, Do you go towards the sound or carry on to the roof?`,
          type: "list",
          choices: [
            "Go find who is shouting for help",
            "carry on up the stairs to thr roof",
          ],
          name: "level2",
        },
      ])
      .then((answers) => {
        if (answers["level2"] === "carry on up the stairs to thr roof") {
          console.log(` ${name}'s decided to keep going. to the roof`);
          goToLevel3(name, weapon);
        } else if (answers["level2"] === "Go find who is shouting for help") {
          console.log(
            `${name} went looking for whoever was shouting for help But!...`
          );

          goToLevel3(name, weapon);
        }
        console.table(person);
        resolve();
      });
  });
};

start((name) => {
  selectWeapon(name, (name, weapon) => {
    display(name, weapon);
    level1(name, weapon)
      .then(() => {
        return level2(name, weapon);
      })
      .then(() => {
        console.log("Game over!");
      })

      .catch((error) => {
        console.error(error);
      });
  });
});
