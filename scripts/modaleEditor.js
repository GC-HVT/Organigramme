import * as joint from 'jointjs';
import { createBloc, createLink } from './ui.js';

function setupEditor() {
  const editor = document.getElementById('blocEditor');
  const form = editor.querySelector('form');
  const addBtn = document.getElementById('addChildBtn');
  const delBtn = document.getElementById('deleteBlocBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const graph = window.graph;
    const cell = graph.getCell(editor.dataset.targetId);
    const data = cell.prop('customData') || {};

    data.name = form.editName.value;
    data.poste = form.editPoste.value;
    data.desc = form.editDesc.value;
    data.tel = form.editTel.value;
    data.mail = form.editMail.value;

    cell.prop('customData', data);
    cell.attr('label/text', `${data.poste}\n${data.name}`);

    editor.classList.remove('visible');
  });

  document.querySelector('.cancel-btn').addEventListener('click', () => {
    editor.classList.remove('visible');
  });

  addBtn.addEventListener('click', () => {
    const graph = window.graph;
    const parent = graph.getCell(editor.dataset.targetId);
    const parentPosition = parent.position();
    const children = graph.getConnectedLinks(parent, { outbound: true }).filter(l => l.get('target').id);

    if (children.length >= 2) {
      alert('Ce bloc a déjà deux enfants.');
      return;
    }

    const offsetY = 120;
    const offsetX = (children.length === 0) ? -100 : 100;
    const child = createBloc({ name: '', poste: 'Nouveau Bloc' }, parentPosition.x + offsetX, parentPosition.y + offsetY);

    graph.addCells([child, createLink(parent, child)]);
  });

  delBtn.addEventListener('click', () => {
    const graph = window.graph;
    const cell = graph.getCell(editor.dataset.targetId);

    const protectedPostes = ['Directeur Travaux', 'Manager Activité', 'Assistante'];
    const data = cell.prop('customData') || {};
    if (protectedPostes.includes(data.poste)) {
      alert('Ce bloc est protégé et ne peut pas être supprimé.');
      return;
    }

    graph.removeCells([cell, ...graph.getConnectedLinks(cell)]);
    editor.classList.remove('visible');
  });
}

export { setupEditor };
