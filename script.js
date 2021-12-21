const gameContainer = document.getElementById("game");
const section= document.querySelector('#noMatch');
const start = document.querySelector('h1 .start')
const t = document.querySelector('table')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    
    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

gameContainer.style="pointer-events: none"
  
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
let targets = [];
let storage = [];
let lowest = []
let matches = 0;
let tracker = 0;

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    
    newDiv.addEventListener('click', function(e){
      newDiv.style.backgroundColor = color;
      targets.push(e.target)

      tracker++    
      let html = `<tr><th>SCORE</th></tr><tr><th>${tracker}</th></tr>`
      t.innerHTML = html
      
      
      if(targets[0].classList.value!== e.target.classList.value && targets.length !==1){
        gameContainer.style="pointer-events: none"
        const h2 = document.createElement('h2')
        h2.style.fontSize = '20px'
        h2.style.margin = 0;
        h2.style.color = 'red'
        h2.innerText = 'NO MATCH'
        section.append(h2)
        
        setTimeout(function(){
          gameContainer.style="pointer-events: auto"
          targets[0].style.backgroundColor = 'white'
          targets[1].style.backgroundColor = 'white'
          h2.remove()
          targets = []
        }, 2000)
        
      }
      else if(targets[0].classList.value === e.target.classList.value && targets.length !==1){
        targets = []
        matches++
        
        if(matches === 5){
          const restart = document.createElement('button');
          restart.innerText = 'RESTART';
          section.append(restart)
          restart.addEventListener('click', function(){
            lowest.push(tracker)
            function lowestInLocal(array){
              let low = [array[0]]
              for(let i = 1; i < array.length; i++){
                
                if(array[i] < low){
                  low.splice(0,1,array[i])
                }
              }
              return low
            }
            let finalLowest = lowestInLocal(lowest)
            localStorage.clear()
            localStorage.setItem("low-score", JSON.stringify({lowest:finalLowest}))
            matches = 0;
            tracker = 0;
            restart.remove();
            let html = `<tr><th>SCORE</th></tr><tr><th>${tracker}</th></tr>`
            t.innerHTML = html
            //location.reload()
            gameContainer.innerHTML = ''
            shuffle(COLORS)
            createDivsForColors(shuffledColors)
            
            
          })
          console.log('you won')
          
        }
      }
      //console.log(e.target.classList.value)
    })
  
    // call a function handleCardClick when a div is clicked on
    //newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    

  }
}

start.addEventListener('click', function(){
  gameContainer.style="pointer-events: auto";
  start.remove()
  
}) 
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
