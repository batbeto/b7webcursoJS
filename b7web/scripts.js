const char = createKnight('Adalberto');

const monster = createLitleMonster();

stage.start(
  char,
  monster,
  document.querySelector('#char'),
  document.querySelector('#monster')
);