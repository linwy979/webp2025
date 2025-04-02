var container = document.getElementById('container');
window.onload=function(){
  const randomChars = addNewChar(2);
  container.textContent += randomChars;
}
    

window.addEventListener("keyup", function(e) {
  console.log(container.textContent);
  if(e.key===" "){
    const randomChars =       addNewChar(Math.floor(Math.random() * (3-1+1))+1);
    container.textContent += randomChars;
  }
  else if (e.key === 'Escape') {
  container.textContent = "";
  }
  else if(e.key===container.textContent.charAt(0)){
    container.textContent = container.textContent.slice(1)
  }
 
  
});

function addNewChar(length){
   const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
