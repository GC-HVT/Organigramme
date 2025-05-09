// Entrée principale : initialisation et événements DOM

import { initGraph, generateStructure } from './jointService.js';
import { setupBlocInteraction } from './ui.js';
import { setupEditor } from './modaleEditor.js';
import { setupStorage } from './storage.js';

let graph, paper;

document.addEventListener('DOMContentLoaded', () => {
({ graph, paper } = initGraph('myDiagramDiv'));

document.getElementById('generateBtn').addEventListener('click', () => {
generateStructure(graph);
});

setupEditor();
setupStorage(graph);
});
