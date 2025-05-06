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

    const explication = document.createElement("p");
    explication.textContent = "Faites glisser les membres sur leur supérieur hiérarchique pour construire l'organigramme. Mathieu BAC est le chef par défaut.";
    zoneDepot.appendChild(explication);

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

        if (membre.displayName === "BAC Mathieu") {
            structureOrganigramme[membre.userId] = null; // Mathieu BAC est le chef par défaut
            membreDiv.draggable = false; // Empêcher de le déplacer
            membreDiv.classList.add("chef-indraguable"); // Classe pour le style visuel
            membreDiv.removeEventListener("dragstart", drag);
            membreDiv.removeEventListener("dragover", allowDrop);
            membreDiv.removeEventListener("drop", (event) => dropSurMembre(event, membre.userId));
        }
    });

    const afficherBtnContainer = document.getElementById("afficherOrganigrammeContainer");
    afficherBtnContainer.innerHTML = ""; // Nettoyer si nécessaire
    const afficherBtn = document.createElement("button");
    afficherBtn.textContent = "Afficher l'Organigramme";
    afficherBtn.addEventListener("click", afficherOrganigrammeFinal);
    afficherBtnContainer.appendChild(afficherBtn);
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.userId);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropSurZoneChef(event) {
    // Cette fonction n'est plus nécessaire car le chef est par défaut
    event.preventDefault();
    const userId = event.dataTransfer.getData("text/plain");
    structureOrganigramme[userId] = null; // Définir comme chef (pourrait être réactivé si besoin)
    console.log("Structure actuelle (drop sur ancienne zone chef) :", structureOrganigramme);
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
