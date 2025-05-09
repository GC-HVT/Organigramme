import { chargerGroupes, chargerMembres } from '../modules/modulesMembres.js'; // Importation des fonctions du module

// Initialisation de JointJS
const graph = new joint.dia.Graph();
const paper = new joint.dia.Paper({
    el: document.getElementById('organigramme'),
    model: graph,
    width: 1200,
    height: 800,
    gridSize: 10,
    drawGrid: true,
    linkPinning: false
});

// Fonction pour créer un bloc (nœud)
function ajouterBloc(x, y, name) {
    const bloc = new joint.shapes.standard.Rectangle();
    bloc.position(x, y);
    bloc.resize(160, 60);
    bloc.attr({
        body: {
            fill: '#FFCC00',
            stroke: '#000000',
            strokeWidth: 1
        },
        label: {
            text: name,
            fontSize: 12,
            fill: '#000000'
        }
    });
    bloc.addTo(graph);
}

// Fonction pour ajouter un lien entre deux blocs
function ajouterLien(source, target) {
    const lien = new joint.shapes.standard.Link();
    lien.source(source);
    lien.target(target);
    lien.attr({
        line: {
            stroke: '#000000',
            strokeWidth: 2
        }
    });
    lien.addTo(graph);
}

// Fonction pour supprimer un lien
function supprimerLien() {
    const selection = paper.selection.collection;
    selection.forEach(element => {
        if (element.isLink()) {
            element.remove();
        }
    });
}

// Fonction pour exporter l'organigramme en PDF (en SVG pour avoir un export vectoriel)
function exporterPDF() {
    const svgContent = paper.svg;
    const blob = new Blob([svgContent.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organigramme.svg';
    a.click();
}

// Événements des boutons
document.getElementById('addBloc').addEventListener('click', () => {
    ajouterBloc(100, 100, 'Nouveau bloc');
});

document.getElementById('addLien').addEventListener('click', () => {
    const selected = paper.selection.collection;
    if (selected.length === 2) {
        ajouterLien(selected.at(0), selected.at(1));
    } else {
        alert("Sélectionnez deux blocs pour ajouter un lien.");
    }
});

document.getElementById('supprimerLien').addEventListener('click', supprimerLien);
document.getElementById('exporterPDF').addEventListener('click', exporterPDF);

// Charger les groupes au démarrage
chargerGroupes();

// Charger les membres lorsque le bouton est cliqué
document.getElementById('loadMembersBtn').addEventListener('click', () => {
    chargerMembres((membres) => {
        afficherMembres(membres);
    });
});

// Afficher les membres dans la sidebar
function afficherMembres(membres) {
    const membersList = document.getElementById("membersList");
    membersList.innerHTML = "";
    membres.forEach(member => {
        const div = document.createElement("div");
        div.className = "member-card";
        div.draggable = true;
        div.textContent = member.displayName;
        div.dataset.id = member.id;

        div.addEventListener("dragstart", (event) => {
            const memberData = {
                key: member.id,
                name: member.displayName || "",
                poste: member.jobTitle || "",
                tel: member.telephoneNumber || "",
                mail: member.mail || ""
            };
            event.dataTransfer.setData("application/json", JSON.stringify(memberData));
        });

        membersList.appendChild(div);
    });
}

