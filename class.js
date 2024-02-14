class Person {
  constructor(name, health, weapon) {
    (this.name = name), (this.health = 100), (this.weapon = weapon);
  }
}

class ZombieHorde {
  constructor(name, health, attack) {
    this.name = "Zombies";
    this.health = 500;
    this.attack = 50;
  }
}

class Bandits {
  constructor(name, health, attack) {
    this.name = "Bandit";
    this.health = 50;
    this.attack = 40;
  }
}
