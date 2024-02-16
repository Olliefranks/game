import inquirer from "inquirer";
import { Person, ZombieHorde, Bandits } from "./class.js";

let person;
let zombieHorde;
let bandits;

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
            `${name} has decided to wait for the lift. BUT! while waiting a Horde of zombies appears and attacks!. you manage to escape with a few cuts and bruises, But your health has taken damage!`
          );

          resolve();
        } else if (
          answers["level1"] === "Curl up in a ball and wait for help to arrive?"
        ) {
          console.log(
            `${name} has decided to curl up in a ball and wait for help to arrive. but the horde of zombies have surrounded you!.`,
            "The game has ended. You have been defeated. Better luck next time."
          );
          console.log("Game over!");
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
        bandits = new Bandits();
        if (answers["level2"] === "carry on up the stairs to thr roof") {
          console.log(
            ` ${name} decided to keep going  up the stairs to the roof`
          );
          resolve();
        } else if (answers["level2"] === "Go find who is shouting for help") {
          console.log(
            `${name} went looking for whoever was shouting for help But!...`
          );
          console.log(
            `It was a group of Bandits setting a trap!, You fought them off but your injuries are not looking great`
          );
          const damage1 = bandits.attack;
          person.update(person.health - damage1);

          resolve();
        }
        console.table(person);
        resolve();
      });
  });
};

const level3 = (name, weapon) => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          message: `Level 3: ${name}, You have finally made it to the roof and the helicopter is waiting But!, The pilot has been bitten while waiting for you to arrive.. what do you do?`,
          type: "list",
          choices: [
            "Try and fly the helicopter yourslef out of here",
            "find another escape route out of the Hospital",
          ],
          name: "level3",
        },
      ])
      .then((answers) => {
        if (
          answers.level3 === "Try and fly the helicopter yourslef out of here"
        ) {
          console.log(
            `${name} decided to try and fly the helicopter(somehow), but managed to fly away into the sunset safely`
          );
          console.table(person);
          console.log(`Congratulations! you survived `);
          resolve();
        } else if (
          answers.level3 === "find another escape route out of the Hospital"
        ) {
          console.log(
            `${name} decided to run back into the building but now you are complety surrounded by zombies`
          );
          console.log("Game over!");

          process.exit();
        } else {
          console.log("Invalid selection, please try again.");
          resolve();
        }
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
        return level3(name, weapon);
      })
      .then(() => {
        console.log("Game over!");
      })

      .catch((error) => {
        console.error(error);
      });
  });
});
