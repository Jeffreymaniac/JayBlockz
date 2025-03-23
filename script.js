import { allBlocks, findBlockByName,findBlockByAltName } from './blocks.js';

window.unsaved=false;
// value of parameter for blocks
window.curBPval = null;
window.canvasColor='red';
function unloadPage(){ 
  if(unsaved==true){
      return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
  }
}
      
window.onbeforeunload = unloadPage;
const theToolbar = document.getElementById('theToolbar');
const theWorkspace = document.getElementById('theWorkspace');

var zzi = document.getElementById("blockCTXmenu").style;
if (document.addEventListener) {
  document.getElementById('theWorkspace').addEventListener('contextmenu', function(e) {
    var posX = e.clientX;
    var posY = e.clientY;
    menu(posX, posY);
    e.preventDefault();
  }, false);
  document.addEventListener('click', function(e) {
    zzi.opacity = "0";
    setTimeout(function() {
      zzi.visibility = "hidden";
    }, 501);
  }, false);
} else {
  document.getElementById('theWorkspace').attachEvent('oncontextmenu', function(e) {
    var posX = e.clientX;
    var posY = e.clientY;
    menu(posX, posY);
    e.preventDefault();
  });
  document.attachEvent('onclick', function(e) {
    zzi.opacity = "0";
    setTimeout(function() {
      zzi.visibility = "hidden";
    }, 501);
  });
}

function menu(x, y) {
  zzi.top = y + "px";
  zzi.left = x + "px";
  zzi.visibility = "visible";
  zzi.opacity = "1";
}
for(let i = 0; i < allBlocks.length; i++) {
  let obj = allBlocks[i];
  let mNm = obj.name.replaceAll('()','')
  theToolbar.innerHTML += `<svg id="toolbarBlock${i}" draggable="true" ondragstart="dragFromTB(event)" class="draggableBlock${obj.type=='hatBlock'?' hatBlock' : ''}" data-jName="${obj.name}"data-jAltName="${obj.altName}" version="1.1"
  baseProfile="full"
  width="500" height="80"
  xmlns="http://www.w3.org/2000/svg">
  ${obj.type=='hatBlock' ? `
  <path stroke="${obj.color ? 'black' : '#3373CC'}" fill="${obj.color || 'chocolate'}" d="M 0 16 c 25,-22 71,-22 96,0 L ${obj.name.length >= 12 ?  (obj.name.length)*8 : 137} 16 a 4 4 0 0 1 4 4 L ${obj.name.length >= 12 ?  (obj.name.length)*8 : 141} 60 a 4 4 0 0 1 -4 4 L 48 64 c -2 0 -3 1 -4 2 l -4 4 c -1 1 -2 2 -4 2 h -12 c -2 0 -3 -1 -4 -2 l -4 -4 c -1 -1 -2 -2 -4 -2 L 4 64 a 4 4 0 0 1 -4 -4 Z"/>
  ` : `
  <path stroke="${obj.color ? 'black' : '#3373CC'}" fill="${obj.color || '#4C97FF'}" fill-opacity="1" d="m 0,4 A 4,4 0 0,1 4,0 H 12 c 2,0 3,1 4,2 l 4,4 c 1,1 2,2 4,2 h 12 c 2,0 3,-1 4,-2 l 4,-4 c 1,-1 2,-2 4,-2 H ${obj.name.length >= 12 ?  (obj.name.length)*8 : 58.3670997619629} a 4,4 0 0,1 4,4 v 40  a 4,4 0 0,1 -4,4 H 48   c -2,0 -3,1 -4,2 l -4,4 c -1,1 -2,2 -4,2 h -12 c -2,0 -3,-1 -4,-2 l -4,-4 c -1,-1 -2,-2 -4,-2 H 4 a 4,4 0 0,1 -4,-4 z"></path>
  `}

<text style="white-space:none;fill:white" x="5" y="${obj.type=='hatBlock'?42.5:30}">${mNm}</text>
${obj.name.includes('()')||obj.name.includes('@@')?`<foreignObject x="${mNm.length*8}" y="12" width="20" height="160"><input type="${obj.altName=='set scene background color to'?'color':'text'}" /></foreignObject>`:''}
</svg>`;
}
function showToasts() {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl)
  })
  toastList.forEach(toast => toast.show()) 
}
document.getElementById("runProjectBTN").addEventListener("click", runProject);

function runProject() {
  const elements = document.querySelectorAll('#theWorkspace > svg');
  const hatElements = document.querySelectorAll('#theWorkspace > svg.hatBlock');

  if (elements.length === 0) {
    alert('There are no blocks to run!');
    return;
  }
  if (hatElements.length === 0) {
    alert('There are no hat blocks, so no code can be run');
    return;
  }
  alert('project running');
  document.getElementsByTagName('canvas')[0].style.zIndex=9000;
  
  Array.from(elements).forEach((element, index) => {
    let blockName = element.innerHTML;

    // Extract all content between <text></text> tags using regex
    let matches;
    let results = [];
    const regex = /<text[^>]*>(.*?)<\/text>/g;

    // Use exec to get all matches of <text></text> content
    while ((matches = regex.exec(blockName)) !== null) {
      results.push(matches[1]); // Add the matched text to results
    }

    // If there are no matches, skip this block
    if (results.length === 0) {
      alert(`No <text> tags found in block at index ${index}`);
      return;
    }

    blockName = results; // blockName is now an array of the extracted texts

    // Check if blockName is valid
    if (blockName.length > 0) {
      const block = findBlockByName(blockName) || findBlockByAltName(blockName.replace(/\)/g, "").replace(/\(/g, ""));

      // Check if the block was found
      if (block) {
        window.curBPval = element.querySelector('svg foreignObject')[0];
        window.curBPval = window.curBPval.querySelector('input')[0].value;

        window.curBPval=window.curBPval;
        eval(block.scriptX);
      } else {
        alert(`No block found with name: ${blockName}`);
      }
    } else {
      alert(`Element at index ${index} has no valid <text> content.`);
    }

  });


}
new Sortable(theToolbar, {
  group: {
      name: 'shared',
      pull: 'clone',
      put: false // Do not allow items to be put into this list
  },
  animation: 150,
  sort: false // To disable sorting: set sort to false
});

new Sortable(theWorkspace, {
  group: 'shared',
  animation: 150
});