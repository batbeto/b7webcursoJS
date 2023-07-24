const defaultCharacter = {
  life: 1,
  maxLife: 1,
  attack: 0,
  defense: 0
}

const createKnight = (name) => {
  return {
    ...defaultCharacter,
    name,
    life: 100,
    maxLife: 100,
    attack: 10,
    defense: 8
  }

}

const createSorcerer = (name) => {
  return {
    ...defaultCharacter,
    name,
    life: 80,
    maxLife: 80,
    attack: 15,
    defense: 3
  }
}

const createLitleMonster = () => {
  return {
    ...defaultCharacter,
    name: 'LitleMonster',
    life: 40,
    maxLife: 40,
    attack: 4,
    defense: 4

  }
}


const createBigMonster = () =>{
  return {
    ...defaultCharacter,
    name: 'BigMonster',
    life: 120,
    maxLife: 120,
    attack: 12,
    defense: 8
  }
}


const stage = {

  start(fighter1,fighter2, fighter1El, fighter2El) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;

    this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.attack(this.fighter1, this.fighter2));
    this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.attack(this.fighter2, this.fighter1));

    this.update();
  },

  update(){
    this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)}HP`;
    let f1Pct = (this.fighter1.life / this.fighter1.maxLife) *100;
    this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
    this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)}HP`;
    let f2Pct = (this.fighter2.life / this.fighter2.maxLife) *100;
    this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
  },

  attack(attacking, attacked){
    if(attacking.life <= 0 || attacked.life <= 0){
      console.log('Jogador morreu!');
      return;
    }

    const attackFactor = (Math.random() * 2).toFixed(2);
    const defenseFactor = (Math.random() * 2).toFixed(2);

    const actualAttack = (attacking.attack * attackFactor).toFixed(2);
    const actualDefense = (attacked.defense * defenseFactor).toFixed(2);

    if(actualAttack > actualDefense){
      attacked.life -= actualAttack;
      attacked.life = attacked.life < 0 ? 0 : attacked.life;
      log.addMessage(`${attacking.name} causou ${actualAttack} de dano em ${attacked.name}`);
    }else{
      log.addMessage(`${attacked.name} conseguiu defender`)
    }
    
    this.update();
  },

  log(){

  }
}

const log = {
  list: [],
  addMessage(msg){
    this.list.push(msg);
    this.render();
  },

  render (){
    const logEl = document.querySelector('.log');
    logEl.innerHTML = '';

    for (let i in this.list){
      logEl.innerHTML += `<li>${this.list[i]}</li>`
    }
  }
}
