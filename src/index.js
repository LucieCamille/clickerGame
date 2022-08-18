const gameContainer = document.querySelector(".containerJeu");
const ennemiesContainer = document.querySelector(".enemies");
const renderLevel = document.querySelector(".lvl");
const renderLives = document.querySelector('.lf');
const gun = document.querySelector(".spriteGun");


//constructor:
function Enemy(id, statut, hit) {
  this.id = id;
  this.active = statut;
  this.hit = hit;
}

let enemy1 = new Enemy("e1", false, false);
let enemy2 = new Enemy("e2", false, false);
let enemy3 = new Enemy("e3", false, false);
let enemy4 = new Enemy("e4", false, false);
let enemy5 = new Enemy("e5", false, false);
let enemy6 = new Enemy("e6", false, false);

let enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


let currentEnemy;
let lives;
let level;
let maxIt = 20;
let currentIt = 0;

let LoopInterval


//----DECLARATION DES FONCTIONS-----------------------
//Fonction initiale
const init = () => {
  gameContainer.addEventListener('click', handleClick)
}

//Fonction de gestion du click
const handleClick = (ev) => {
  gun.classList.toggle("gunAnimation");
  lacible = ev.target;
  console.log(lacible.classList.value)
  if(lacible.classList.value === "enemy active"){
    //enemy touché meurt => hit = true
    // console.log(lacible)
    enemies.forEach(enemy => {
      if(enemy.id === lacible.id) {
        //console.log(enemy.hit)
        enemy.hit = true;
        //console.log(enemy.hit)
        lacible.classList.add("dead")
      }
    })
    //console.log(lacible.id)
  }
  else if(lacible.classList.contains("start")){
    NewGame();
  }
  else{
    if(lives !== 0){
      lives -= 1;
    }

    console.log(lives);
  }
}

//Fonction de début du jeu
const NewGame = () => {
  //vie mises à 5
  lives = 5;
  //level commence à 1
  level = 1;
  //Appeler fonction rendu:
  GenerateGame();
  //Nettoyer l'interval
  clearInterval();
  //Appelerla boucle avec timer
  LoopInterval = setInterval(Loop, 1000);
}

//Instruction pour le timer
const Loop = () => {
  DeactivateEnemies();
  ActivateEnemies();
  RenderGame();
  CheckState();
};

//Fonction de rendu au début du jeu
const GenerateGame = () => {
  let template = "";
  let templateLevel = `${level}`;
  let templateLives = `${"🖤".repeat(lives)}`;
  enemies.forEach(enemy => {
    template += `<div class="enemy" id="${enemy.id}"></div>`
  })
  ennemiesContainer.innerHTML = template;
  renderLevel.innerHTML = templateLevel;
  renderLives.innerHTML = templateLives;
}
// let mort = 0;
//Fonction pour désactiver ennemies
const DeactivateEnemies = () => {
    enemies = enemies.map(e => ({...e, active: false}))
    console.log(enemies)
}

//Fonction pour activer un ennemy random
const ActivateEnemies = () => {
  do{
    currentEnemyIndex = Math.floor(Math.random() * enemies.length);
  } while(enemies[currentEnemyIndex].hit === true && enemies.find(e => e.hit === false))
  
  enemies[currentEnemyIndex].active = true;
  
  console.log(enemies[currentEnemyIndex].hit);
}

//Fonction de rendu pendant le jeu
const RenderGame = () => {
  let template = "";
  let templateLives = `${"🖤".repeat(lives)}`;
  enemies.forEach(enemy => {
    template += `<div class="enemy ${enemy.active ? "active" : ""}" id="${enemy.id}"></div>`
  })
  ennemiesContainer.innerHTML = template;
  renderLives.innerHTML = templateLives;
}

//Fonction de rendu quand on gagne
const RenderWon = () => {
  let template = `
    <div class="won">
      <h1>You made it</h1>
      <img src="src/img/won.png" alt="Happy Trump"/>
      <p>You got it in you boy!</p>
      <p>Get ready for level 2</p>
      <button class="btn start">Come get some!</button>
    </div>
  `
  gameContainer.innerHTML = template;
}

//Fonction de rendu quand GameOver
const RenderOver = () => {
  let template = `
    <div class="lose">
      <h1>Game over</h1>
      <img src="src/img/lose.png" alt="Fuck it Trump"/>
      <p>You're weak. Useless...</p>
      <p>Worthless piece of shit.</p>
      <button class="btn start">Try again, looser!</button>
    </div>
  `
  gameContainer.innerHTML = template;
}

//Fonction checker les statuts:
const CheckState = () => {
  // let test = enemies.find(e => e.hit === undefined)
  // console.log(enemies)
  //enemies.length < 1
  if(enemies.find(e => e.hit === false) === undefined){
    //won
    clearInterval(LoopInterval)
    alert("c'est gagné!")
    RenderWon();
  }
  else if(lives < 1){
    //game over
    clearInterval(LoopInterval)
    alert("game over")
    RenderOver();
  }  

}

//-----APPEL DE FONCTIONS-----------------
//Fonction init
init();

//Fonction nouveau jeu
NewGame();

//clearInterval(LoopInterval);