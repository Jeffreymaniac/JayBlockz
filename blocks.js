export const allBlocks = [
  {
    name:"when game starts",
    category:1,
    type:'hatBlock',
    color:'limegreen'
  },
  {
    name:"set scene background color to @@",
    altName:"set scene background color to",
    category:1,
    scriptX:'window.canvasColor="red"||window.curBPval'
  },
  {
    name:"alert()",
    altName:"alert",
    category:1,
    color:'red',
    scriptX:'window.close()'
  },

  {
    name:"set variable()",
    category:1
  },
  {
    name:"open URL in new browser tab()",
    category:1
  },
  {
    name:"wait in seconds()",
    category:1
  },
  {
    name:"when battery is charging",
    category:2,
    type:'hatBlock'
  },
  {
    name:"when battery is not charging",
    category:2,
    type:'hatBlock'
  },
]

export function findBlockByName(blockName) {
  return allBlocks.find(block => block.name == blockName);
}
export function findBlockByAltName(blockAltName) {
  return allBlocks.find(block => block.altName == blockAltName);
}