// Entrée principale : initialisation et événements DOM

import { chargerGroupes, chargerMembres } from '../modules/modulesMembres.js';
import { initGraph, generateStructure } from './jointService.js';
import { setupBlocInteraction } from './ui.js';
import { setupEditor } from './modaleEditor.js';
import { setupStorage } from './storage.js';

let graph, paper;
let currentGroup = 'Groupe A';

document.addEventListener('DOMContentLoaded', () => {
  ({ graph, paper } = initGraph('myDiagramDiv'));
  window.graph = graph;

  const groupSelector = document.getElementById('groupSelector');
  currentGroup = groupSelector.value;

  loadGroupData(currentGroup);

  document.getElementById('generateBtn').addEventListener('click', () => {
    generateStructure(graph);
    saveGroupData(currentGroup);
  });

  groupSelector.addEventListener('change', () => {
    currentGroup = groupSelector.value;
    loadGroupData(currentGroup);
  });

  setupEditor();
  setupStorage(graph, () => saveGroupData(currentGroup));
});

function saveGroupData(group) {
  const json = JSON.stringify(graph.toJSON());
  localStorage.setItem(`organigramme_${group}`, json);
}

function loadGroupData(group) {
  const data = localStorage.getItem(`organigramme_${group}`);
  if (data) {
    graph.fromJSON(JSON.parse(data));
  } else {
    graph.clear();
  }
}
