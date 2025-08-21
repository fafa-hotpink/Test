const listContent = [];

document.getElementById("input").addEventListener("keydown",  function(e) {
  if (e.key === "Enter") {
    document.getElementById("input").blur();
  }
});

document.getElementById("input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      add();
    }
});

function add() {
  
  const input = document.getElementById("input").value.trim();
  
  if (input !== "") {
    for (var i = 0; i < listContent.length; i++) {
      if (input.toLowerCase() === listContent[i].toLowerCase()) {
        alert("Gibt's schon, yo")
        return;
      }
    }
    
    listContent.push(input);
    console.log(listContent);
    
    const ul = document.getElementById("tasks-list")
    const li = document.createElement("li");
    const div = document.createElement("div");
    const task = document.createTextNode(input);
    const buttonDelete = document.createElement("button");
    
    ul.append(li);
      li.append(div);
        div.append(task);
      li.append(buttonDelete);
        buttonDelete.append(document.createTextNode("Löschen"))
    
    div.addEventListener("click", (e) => {
	    li.classList.toggle("done");
		});
    
    buttonDelete.addEventListener('click', (e) => {
    	li.remove();
    	listContent.pop();
    	console.log(listContent);
    }) 
    
    document.getElementById("input").value = "";
} else {
  alert("Du musst schon was eingeben, Diggi")
  }
}
