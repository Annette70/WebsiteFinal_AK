//sets the beginning stats for the human
var human = {
    food: 10,
    drink: 10,
    fitness: 10,

    //makes an adjustment function to adjust the human's stats
    adjustStat: function (food, drink, fitness){
        this.food += food;
        this.drink += drink;
        this.fitness += fitness;
    }
};

//sets the action choices
var actions = [
    {name: "drink water", food: 0, drink: 6, fitness: 0, image:"images/water.gif"},
    {name: "eat doritos", food: 6, drink: -3, fitness: -6, image: "images/doritos.gif"},
    {name: "take a walk", food: -3, drink: -3, fitness: +3, image: "images/walk.gif"},

    {name: "drink gatorade", food: 0, drink: 3, fitness: -3, image:"images/gatorade.gif"},
    {name: "eat saltines", food: 3, drink: -6, fitness: 0, image:"images/saltines.gif"},
    {name: "run a marathon", food: -6, drink: -9, fitness: +12, image:"images/marathon.gif"},

    {name: "drink coffee", food: -3, drink: 6, fitness: +1, image:"images/coffee.gif"},
    {name: "eat a salad", food: +3, drink: +3, fitness: 0, image: "images/salad.gif"},
    {name: "do sit-ups", food:-3, drink: -6, fitness: +6, image: "images/situps.gif"}
];

//sets the option array to hold the randomly generated action choices
//sets the default image src to blank
var option = [{image:"images/blank.jpg"},
    {image:"images/blank.jpg"},
    {image:"images/blank.jpg"},
    {image:"images/blank.jpg"}];

//creates a variable to keep track of the game status
var gameActive = true;

//runs Init on page load
$(Init);

function Init(){
    //displays the humans stats on the page
    drawStats();
    SetOptions();
    $(".choice").click(Start);
}

function SetOptions(){
    clearText();

    //gets a random number from randomActionIndex and stores it in the index variable
    //puts the random action into option[1]
    var index = randomActionIndex();
    option[1] = actions[index];

    index = randomActionIndex();
    //generates a random action for option[2]
    option[2] = actions[index];
    //if both actions are the same a new option is generated for option 2
    while (option[1] === option[2]) {
        index = randomActionIndex();
        option[2] = actions[index];
    }

    index = randomActionIndex();
    //generates a random action for option[3]
    option[3] = actions[index];
    //if option 1 or 2 has the same action as option 3,
    //option 3 must randomly generate a different action until all actions are different
    while (option[2] === option[1] || option[3] === option[2]){
        index = randomActionIndex();
        option[2] = actions[index];
    }
    //displays the names of the random options on buttons
    $("#1").text(option[1].name);
    $("#2").text(option[2].name);
    $("#3").text(option[3].name);
}

/**
 * Randomly generates a number for the action index and returns it
 *
 * @return {number}
 */
function randomActionIndex() {
    return (Math.floor(Math.random() * actions.length));
}

function Start(event) {
    //checks if the game is not finished
    if(gameActive) {
        //sets the index to the id of the button clicked
        var index = event.target.id;
        //sets the game image to the corresponding choice
        $("#gameImage").attr("src", option[index].image);
        changeStat(index);
        SetOptions(index);
        endGameTest();
    }
}

function changeStat(index) {
    //updates the humans stats
    human.adjustStat(option[index].food, option[index].drink, option[index].fitness);
}

function endGameTest() {
    //displays the human's current stats
    drawStats();

    //checks to see if the player won the game
    if(human.food > 29 && human.drink > 29 && human.fitness > 29){
        //displays a win message on the web-page
        $("#endGameMessage").text("You win! You chose a healthy balance of food, liquids, and exercise.");
        gameActive = false;
        $("#gameImage").attr("src", "images/blank.png");
    }
    //checks to see if the player lost the game and displays the appropriate message on the web-page
    if(human.food <= 0){
        $("#endGameMessage").text("You died of hunger, humans cannot function without food.");
        gameActive = false;
        $("#gameImage").attr("src", "images/blank.jpg");
    }
    if(human.fitness <= 0){
        $("#endGameMessage").text("You died, because you ate and/or drank so much that you could no longer move.");
        gameActive = false;
        $("#gameImage").attr("src", "images/blank.jpg");
    }
    if(human.drink <= 0){
        $("#endGameMessage").text("You died of thirst, humans are made of over 50% water and cannot function without liquids.");
        gameActive = false;
        $("#gameImage").attr("src", "images/blank.jpg");
    }
}

function drawStats() {
    //displays the human's stats
    $("#food").text(human.food);
    $("#drink").text(human.drink);
    $("#fitness").text(human.fitness);
}

function clearText() {
    $("#endGameMessage").text("");
}