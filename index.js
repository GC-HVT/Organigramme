import { chargerGroupes, chargerMembres } from './moduleRecuperationDonnees.js';

let membresDuGroupe = [];
let structureOrganigramme = {}; // Objet pour stocker la hiérarchie (enfant -> parent)

document.addEventListener('DOMContentLoaded', chargerGroupes);

document.getElementById("groupSelect").addEventListener("change", () => {
    chargerMembres(initialiserMembresDraggables);
});

function initialiserMembresDraggables(membres) {
    membresDuGroupe = membres;
    const zoneDepot = document.getElementById("zoneDepotOrganigramme");
    zoneDepot.innerHTML = "";

    const chefDiv = document.createElement("div");
    chefDiv.id = "zoneChefGroupe";
    chefDiv.className = "zone-depot";
    chefDiv.textContent = "Déposer le chef de groupe ici";
    chefDiv.addEventListener("dragover", allowDrop);
    chefDiv.addEventListener("drop", (event) => dropSurZoneChef(event));
    zoneDepot.appendChild(chefDiv);

    membres.forEach(membre => {
        const membreDiv = document.createElement("div");
        membreDiv.className = "membre-draggable";
        membreDiv.textContent = membre.displayName;
        membreDiv.dataset.userId = membre.userId;
        membreDiv.draggable = true;
        membreDiv.addEventListener("dragstart", drag);
        membreDiv.addEventListener("dragover", allowDrop);
        membreDiv.addEventListener("drop", (event) => dropSurMembre(event, membre.userId)); // Déposer sur un membre
        zoneDepot.appendChild(membreDiv);
    });

    const afficherBtn = document.createElement("button");
    afficherBtn.textContent = "Afficher l'Organigramme";
    afficherBtn.addEventListener("click", afficherOrganigrammeFinal);
    zoneDepot.appendChild(afficherBtn);
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.userId);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropSurZoneChef(event) {
    event.preventDefault();
    const userId = event.dataTransfer.getData("text/plain");
    structureOrganigramme[userId] = null; // Le chef n'a pas de parent
    console.log("Structure actuelle :", structureOrganigramme);
}

function dropSurMembre(event, parentId) {
    event.preventDefault();
    const userId = event.dataTransfer.getData("text/plain");
    if (userId !== parentId) { // Empêcher de se déposer sur soi-même
        structureOrganigramme[userId] = parentId;
        console.log("Structure actuelle :", structureOrganigramme);
    }
}

function afficherOrganigrammeFinal() {
    const organigrammeData = creerStructureHTMLOrgChart(structureOrganigramme, membresDuGroupe);
    const organigrammeContainer = document.getElementById("organigrammeVisuel");
    organigrammeContainer.innerHTML = organigrammeData;

    $(organigrammeContainer).orgchart();
}

function creerStructureHTMLOrgChart(structure, membres) {
    let html = '<ul>';
    const chef = membres.find(membre => structure[membre.userId] === null);

    if (chef) {
        html += `<li>${genererNoeudHTML(chef)}`;
        const subordonnesNiveau1 = membres.filter(membre => structure[membre.userId] === chef.userId);
        if (subordonnesNiveau1.length > 0) {
            html += '<ul>';
            subordonnesNiveau1.forEach(subordonne1 => {
                html += `<li>${genererNoeudHTML(subordonne1)}`;
                const subordonnesNiveau2 = membres.filter(membre => structure[membre.userId] === subordonne1.userId);
                if (subordonnesNiveau2.length > 0) {
                    html += '<ul>';
                    subordonnesNiveau2.forEach(subordonne2 => {
                        html += `<li>${genererNoeudHTML(subordonne2)}</li>`;
                        // ... et ainsi de suite pour les niveaux inférieurs
                    });
                    html += '</ul>';
                }
                html += '</li>';
            });
            html += '</ul>';
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
}

function genererNoeudHTML(membre) {
    return `
        <span>${membre.displayName}</span>
        <div>${membre.jobTitle || ''}</div>
        <div>${membre.email || ''}</div>
        <div>${membre.mobilePhone || ''}</div>
    `;
}
