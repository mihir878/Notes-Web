let addBtn = document.querySelector('#addBtn');

showNotes();

//Click on button to add note on local storage
addBtn.addEventListener('click', function (e) {
    let addTxt = document.querySelector('#addTxt');
    let addTitle=document.querySelector('#addTitle');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('title');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    notesObj.push(addTxt.value);
    titlesObj.push(addTitle.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("title", JSON.stringify(titlesObj));
    addTxt.value = "";
    addTitle.value="";
    console.log(notesObj);
    console.log(titlesObj);
    showNotes();
});

//Function to show notes added by user
function showNotes(){
    let notes=localStorage.getItem('notes');
    let titles = localStorage.getItem('title');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    let html="";
    notesObj.forEach( function(value,index){
        html+=`
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${titlesObj[index]}</h5>
                  <p class="card-text"> ${value}</p>
                  <a onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</a>
                </div>
              </div>
        `
    });
    let notesSpace=document.querySelector('#notes');
    if(notesObj.length!=0){
    notesSpace.innerHTML=html;
    }
    else{
        notesSpace.innerHTML=`Nothing to show here! Add your notes by clicking on add notes button`;
    }

}

//Function to delete a note
function deleteNote(index){
    console.log("Something deleted");
    let notes=localStorage.getItem('notes');
    let titles = localStorage.getItem('title');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    notesObj.splice(index,1);
    titlesObj.splice(index,1);
    notes=JSON.stringify(notesObj);
    titles=JSON.stringify(titlesObj);
    localStorage.setItem('notes',notes);
    localStorage.setItem('title',titles);
    showNotes();
}

//Search specific things on notes
let searchTxt=document.querySelector('#searchTxt');
searchTxt.addEventListener('input',function(){
    let inputVal=searchTxt.value.toLowerCase();
    console.log("we are searching something",inputVal);
    let noteCards=document.querySelectorAll('.noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText=element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardText.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    });
});