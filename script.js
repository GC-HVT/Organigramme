const organisation = {
  "directeur travaux": {
    poste: "Directeur des Travaux",
    description: "Supervise l'ensemble des opérations de travaux.",
    mail: "directeur.travaux@example.com",
    tel: "01 23 45 67 89",
    subordonnes: {
      "manager": {
        poste: "Manager",
        description: "Gère plusieurs équipes et projets.",
        mail: "manager@example.com",
        tel: "02 34 56 78 90",
        subordonnes: {
          "assistante": {
            poste: "Assistante de Direction",
            description: "Assiste le manager dans ses tâches administratives.",
            mail: "assistante@example.com",
            tel: "03 45 67 89 01",
            subordonnes: {}
          },
          "responsable études": {
            poste: "Responsable des Études",
            description: "Dirige l'équipe des chargés d'études.",
            mail: "responsable.etudes@example.com",
            tel: "04 56 78 90 12",
            subordonnes: {
              "charge d'études": {
                poste: "Chargé d'Études",
                description: "Réalise les études techniques des projets.",
                mail: "charge.etudes@example.com",
                tel: "05 67 89 01 23",
                subordonnes: {}
              }
            }
          },
          "responsable de chantier": {
            poste: "Responsable de Chantier",
            description: "Supervise l'exécution des travaux sur les chantiers.",
            mail: "responsable.chantier@example.com",
            tel: "06 78 90 12 34",
            subordonnes: {
              "manœuvre": {
                poste: "Manœuvre",
                description: "Effectue des tâches manuelles sur les chantiers.",
                mail: "manoeuvre@example.com",
                tel: "07 89 01 23 45",
                subordonnes: {}
              }
            }
          },
          "responsable mise en service": {
            poste: "Responsable Mise en Service",
            description: "Coordonne et réalise la mise en service des installations.",
            mail: "responsable.mes@example.com",
            tel: "08 90 12 34 56",
            subordonnes: {
              "metteur au point": {
                poste: "Metteur au point",
                description: "Effectue les réglages et les tests de mise en service.",
                mail: "metteur.au.point@example.com",
                tel: "09 01 23 45 67",
                subordonnes: {}
              }
            }
          }
        }
      }
    }
  }
};

const graph = new joint.dia.Graph();

const paper = new joint.dia.Paper({
  el: document.getElementById('chart-container'),
  model: graph,
  width: 800,
  height: 600,
  gridSize: 1,
  interactive: true
});

const elements = [];
const liens = [];
const positions = {};

let xBase = 50;
const yBase = 50;
const deltaX = 250;
const deltaY = 150;

function creerBlocEmploye(nom, poste, description, mail, tel, x, y) {
  return new joint.shapes.standard.Rectangle({
    position: { x: x, y: y },
    size: { width: 180, height: 100 },
    attrs: {
      body: { fill: 'lightblue', stroke: 'black', 'stroke-width': 2, rx: 5, ry: 5 },
      label: {
        text: nom,
        fill: 'black',
        'font-size': 14,
        'font-weight': 'bold'
      },
      poste: {
        text: poste,
        fill: 'black',
        'font-size': 12,
        ref: 'label',
        refY: '1.5em'
      },
      description: {
        text: description,
        fill: 'gray',
        'font-size': 10,
        ref: 'poste',
        refY: '1.2em',
        'text-wrap': { width: 160 }
      },
      mail: {
        text: `Mail: ${mail}`,
        fill: 'black',
        'font-size': 10,
        ref: 'description',
        refY: '1.2em'
      },
      tel: {
        text: `Tél: ${tel}`,
        fill: 'black',
        'font-size': 10,
        ref: 'mail',
        refY: '1.2em'
      }
    },
    data: {
      nom: nom,
      poste: poste,
      description: description,
      mail: mail,
      tel: tel
    }
  });
}

function creerLien(source, cible) {
  return new joint.shapes.standard.Link({
    source: { id: source.id },
    target: { id: cible.id },
    attrs: {
      line: {
        stroke: 'black',
        'stroke-width': 2
      },
      arrowHeadTarget: {
        d: 'M 10 0 L 0 5 L 10 10 z'
      }
    }
  });
}

function parcourirOrganisation(niveau, subordonnes, parentElement = null, x = xBase, y = yBase, niveauActuel = 0) {
  let xOffset = 0;
  for (const nom in subordonnes) {
    const employe = subordonnes[nom];
    const nouvelElement = creerBlocEmploye(nom, employe.poste, employe.description, employe.mail, employe.tel, x + xOffset, y + niveauActuel * deltaY);
    elements.push(nouvelElement);
    positions[nom] = { x: x + xOffset, y: y + niveauActuel * deltaY };

    if (parentElement) {
      liens.push(creerLien(parentElement, nouvelElement));
    }

    if (Object.keys(employe.subordonnes).length > 0) {
      parcourirOrganisation(niveau + 1, employe.subordonnes, nouvelElement, x + xOffset, y, niveauActuel + 1);
    }
    xOffset += deltaX;
  }
}

const directeur = Object.keys(organisation)[0];
const infoDirecteur = organisation[directeur];
const elementDirecteur = creerBlocEmploye(directeur, infoDirecteur.poste, infoDirecteur.description, infoDirecteur.mail, infoDirecteur.tel, xBase, yBase);
elements.push(elementDirecteur);
positions[directeur] = { x: xBase, y: yBase };

parcourirOrganisation(1, organisation[directeur].subordonnes, elementDirecteur, xBase, yBase);

// graph.add(elements);
graph.add(liens);
