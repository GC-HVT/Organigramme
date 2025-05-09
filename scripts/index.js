document.addEventListener('DOMContentLoaded', function () {
  // Création du graph
  const graph = new joint.dia.Graph();

  // Création de la paper (le canvas où l'organigramme sera affiché)
  const paper = new joint.dia.Paper({
    el: document.getElementById('graph-container'),
    model: graph,
    width: 800,
    height: 600,
    gridSize: 10,
    drawGrid: true
  });

  // Création d'un élément de base (un membre avec un rectangle)
  const member = new joint.shapes.standard.Rectangle();
  member.position(100, 100);
  member.resize(150, 60);
  member.attr({
    body: {
      fill: '#6c8e23',
      stroke: '#4b5320',
      strokeWidth: 2
    },
    label: {
      text: 'Membre 1',
      fill: 'white'
    }
  });
  member.addTo(graph);

  // Ajouter un autre membre pour l'exemple
  const member2 = new joint.shapes.standard.Rectangle();
  member2.position(300, 100);
  member2.resize(150, 60);
  member2.attr({
    body: {
      fill: '#6c8e23',
      stroke: '#4b5320',
      strokeWidth: 2
    },
    label: {
      text: 'Membre 2',
      fill: 'white'
    }
  });
  member2.addTo(graph);

  // Créer un lien entre les deux membres (représentation de la hiérarchie)
  const link = new joint.shapes.standard.Link();
  link.source(member);
  link.target(member2);
  link.addTo(graph);

  // Gérer l'ajout de membres via l'interface
  const addMemberButton = document.getElementById('add-member');
  addMemberButton.addEventListener('click', () => {
    const memberName = document.getElementById('member-name').value;
    if (memberName) {
      const newMember = new joint.shapes.standard.Rectangle();
      newMember.position(100, 100);
      newMember.resize(150, 60);
      newMember.attr({
        body: {
          fill: '#6c8e23',
          stroke: '#4b5320',
          strokeWidth: 2
        },
        label: {
          text: memberName,
          fill: 'white'
        }
      });
      newMember.addTo(graph);

      // Réinitialiser l'input
      document.getElementById('member-name').value = '';
    }
  });
});
