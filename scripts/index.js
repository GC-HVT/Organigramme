document.addEventListener('DOMContentLoaded', function () {
  // Création du graph
  const graph = new joint.dia.Graph();

  // Création de la paper
  const paper = new joint.dia.Paper({
    el: document.getElementById('graph-container'),
    model: graph,
    width: 800,
    height: 600,
    gridSize: 10,
    drawGrid: true,
    interactive: { linkMove: false }  // Empêche de déplacer les liens pour l'instant
  });

  // Fonction pour ajouter un bloc à l'organigramme
  function addBlock(name) {
    // Position initiale du bloc (il sera ajouté avec un petit décalage)
    const position = {
      x: Math.random() * 600, // Positionnement aléatoire pour l'exemple
      y: Math.random() * 400
    };

    // Création du bloc (Rectangle)
    const block = new joint.shapes.standard.Rectangle();
    block.position(position.x, position.y);
    block.resize(150, 60);
    block.attr({
      body: {
        fill: '#6c8e23',
        stroke: '#4b5320',
        strokeWidth: 2
      },
      label: {
        text: name,
        fill: 'white'
      }
    });

    // Ajout du bloc au graph
    block.addTo(graph);
  }

  // Fonction pour ajouter un lien entre deux blocs
  function addLink(sourceBlock, targetBlock) {
    const link = new joint.shapes.standard.Link();
    link.source(sourceBlock);
    link.target(targetBlock);
    link.addTo(graph);
  }

  // Gestion de l'ajout d'un bloc via l'interface
  const addMemberButton = document.getElementById('add-member');
  addMemberButton.addEventListener('click', () => {
    const memberName = document.getElementById('member-name').value;
    if (memberName) {
      addBlock(memberName); // Ajouter un bloc avec le nom donné
      document.getElementById('member-name').value = ''; // Réinitialiser le champ de texte
    }
  });
});
