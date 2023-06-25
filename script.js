
let headlines = ['Testüberschrift', '1,2'];
let notes = ['Hallo', 'Testnotiz'];
let binHeadlines = [];
let binNotes = [];
let date = new Date();
let time = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + '/' + date.getHours() + ':' + date.getMinutes();
load();
loadBin();

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function show() {

    document.getElementById('icon-description-container').classList.add('icon-description-container-show');

}

function disappear() {

    document.getElementById('icon-description-container').classList.remove('icon-description-container-show');

}


function render() {

    let notesarea = document.getElementById('notes-area');
    notesarea.innerHTML = '';

    for (let i = 0; i < headlines.length; i++) {

        const headline = headlines[i];
        const note = notes[i];

        notesarea.innerHTML += `
    
        <div class="notes">
        <p>${time}</p>
        <h1>${headline}</h1>
        <p>${note}</p>
        <button class="btn" id="delete" onclick="deleteNotes(${i})">Löschen</button>
        </div>
    
        `
    }
}

function addNotes() {

    let headline = document.getElementById('headline').value;
    let note = document.getElementById('textarea').value;

    headlines.push(headline);
    notes.push(note);

    saveArray();

    render();

}

function deleteNotes(i) {

    binHeadlines.push(headlines[i]);
    binNotes.push(notes[i]);

    headlines.splice(i, 1);
    notes.splice(i, 1);

    saveArray();

    render();
}

function saveArray() {
    localStorage.setItem('headlines', JSON.stringify(headlines));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('binHeadlines', JSON.stringify(binHeadlines));
    localStorage.setItem('binNotes', JSON.stringify(binNotes));
}

function load() {
    let headlinesInText = localStorage.getItem('headlines');
    let notesInText = localStorage.getItem('notes');
    if (headlinesInText && notesInText) {
        headlines = JSON.parse(headlinesInText);
        notes = JSON.parse(notesInText);
    }
}

function showBin() {

    let binarea = document.getElementById('bin-area');
    binarea.innerHTML = '';

    for (let i = 0; i < binHeadlines.length; i++) {

        const binheadline = binHeadlines[i];
        const binnote = binNotes[i];

        binarea.innerHTML += /*html*/`
        
            <div class="notes">
            <h1>${binheadline}</h1>
            <p>${binnote}</p>
            <button id="delete" onclick="deleteNotesBin(${i})">Löschen</button>
            <button id="recover-btn" onclick="recover(${i})">Wiederherstellen</button>
            </div>
        
            `
    }
}


function deleteNotesBin(i) {

    binHeadlines.splice(i, 1);
    binNotes.splice(i, 1);

    showBin();
    saveArray();
}


function loadBin() {
    let headlinesInText = localStorage.getItem('binHeadlines');
    let notesInText = localStorage.getItem('binNotes');
    if (headlinesInText && notesInText) {
        binHeadlines = JSON.parse(headlinesInText);
        binNotes = JSON.parse(notesInText);
    }
}

function recover(i) {
    headlines.push(binHeadlines[i]);
    notes.push(binNotes[i]);
    binHeadlines.splice(i, 1);
    binNotes.splice(i, 1);
    saveArray();
    showBin();
}