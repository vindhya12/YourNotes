console.log("Welcome to Notes website");
showNotes();

// If a user add a note, add it to the localStorage
let add_btn = document.getElementById("add_btn");
add_btn.addEventListener("click", function (e) {
  let add_txt = document.getElementById("add_txt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(add_txt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  add_txt.value = "";
  //console.log(notesObj);

  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="shadow-xl note_card my-2 mx-2 card" style="width: 18rem;">
            <div class="bg-zinc-900 text-white card-header">
              Note ${index + 1}
            </div>
            <div class="card-body">              
              <p class="bg-white p-2 rounded mb-3 card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="bg-green-600 hover:bg-green-400  btn btn-primary">Delete note</button>
            </div>
        </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Currently you do not have any notes please add notes in the above "Write Note" box then click "Add Note" to save your notes. <br> Thank you`;
  }
}

//function to delete note
function deleteNote(index) {
  //console.log("I am deleteing this note", index);
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search=document.getElementById("search_txt");
search.addEventListener("input",function(){

    let inputVal=search.value.toLowerCase();
    //console.log("Input evenet fired",inputVal);
    let note_card=document.getElementsByClassName("note_card");
    Array.from(note_card).forEach(function(element){
        let card_txt=element.getElementsByTagName("p")[0].innerText;
        if(card_txt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        //console.log(card_txt);

    });


});


/* Some features we can add to improve this project :
1. Add title
2. Mark a note as important
3. seperate notes by user
4. sink with server and host to a web server
*/