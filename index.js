import inquirer from "inquirer";

const start = async () => {
  let { result } = await inquirer.prompt({
    name: "result",
    type: "Input",
    message: "What is your name?",
  });
  return result;
};

const display = async () => {
  try {
    let response = await start();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

display();
