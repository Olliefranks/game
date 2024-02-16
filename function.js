import { Person, ZombieHorde } from "./class";

let name = new Person();

const zombieAttack = () => {
  if (answers["level1"] === "Wait for the lift?") {
    console.log(
      `${name} has decided to wait for the lift. BUT! while waiting a Horde of zombies appears and attacks!. you manage to escape with a few cuts and bruises`
    );
  }
  Person.health - ZombieHorde.attack;
};

const banditAttack = () => {};
