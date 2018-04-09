$(window).ready(() => {
  createRabbits();
})

$('button').on('click', () => {
  generateOffspring();
})

$('article'). on('click', 'img', (e) => {
  selectRabbits(e.target);
})

const article = $('article');
const windowHeight = 550;
let latestGen = 0;

//takes a min and a max to generate random numbers
randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

//initial creation of 3 rabbits
createRabbits = () => {
  const rabbits = [];
  for (let i = 0; i < 3; i++) {
    const x = randomNumberGenerator(0, $(window).width());
    const y = randomNumberGenerator(0, windowHeight);
    rabbits.push(`<img style="width: 50px; position: absolute; top: ${ y }px; left: ${ x }px;" src="../images/bunny.svg" >`);
  }
  article.append(`<div id='1'>${ rabbits.join('') }</div>`);
  latestGen = 1;
} 


generateOffspring = () => {
  //grab the number of parents, theri size and id to create the next generation
  const numberOfParents = ($(`#${latestGen}`).children()).length;
  const currSize = $(`#${latestGen}`).children().first().width();
  const currId = parseInt($(`#${latestGen}`).attr('id'));
  const newOffspring = [];

  //loop through all of the parents and grab their position on the window
  //then, each parent will have a number of offspring created
  for (let j = 0; j < numberOfParents; j++) {
    const parentPosition = $($(`#${latestGen}`).children()[j]).position();
    const parentX = parentPosition.left;
    const parentY = parentPosition.top;

    //create 0 to 5 new offspring with a semi-random position from the parent
    for(let i = 0; i < randomNumberGenerator(0, 5); i++) {
      const x = createPosition(parentX);
      const y = createPosition(parentY);
      const size = currSize * (2/3);
      newOffspring.push(`<img style="width: ${size}px; position: absolute; top: ${y}px; left: ${x}px;" src="../images/bunny.svg" >`)
    };
  };
 
  article.append(`<div id='${currId+1}'>${newOffspring.join('')}</div>`);
  //increment the latest generation by one
  latestGen = currId+1;
};  

//There is a 60% chance that a new position will be made closer to the parent
//if the current position of the new rabbit is more than 50 away from the parent
createPosition = (currPosition) => {
  const position = randomNumberGenerator(0, $(window).width());
  const positionRegen = randomNumberGenerator(0, 1) > 0.4 ? true : false;
  if (positionRegen && position > (currPosition + 50)) {
    position = randomNumberGenerator(0, (currPosition + 50))
  };
  return position
};

//Grabs the selected rabbit and finds the parent generation
//changes the css of the parent generation to aliceblue
//changes the css of the child generation to salmon
selectRabbits = (target) => {
  const generationId = $(target.closest('div')).attr('id');
  console.log(parseInt(generationId))
  const parentGeneration = $(target.closest('div')).children();
  $(target.closest('div')).children().each((index, value) => {
    $(value).css('background-color', 'aliceblue')
  })

  $(`#${parseInt(generationId) + 1}`).children().each((index, value) => {
    $(value).css('background-color', 'salmon')
  })
};
