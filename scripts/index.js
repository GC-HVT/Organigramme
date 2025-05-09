// Entrée principale : initialisation et événements DOM
import { initGraph, generateStructure } from './jointService.js';
import { setupBlocInteraction } from './ui.js';

let graph, paper;

document.addEventListener('DOMContentLoaded', () => {
({ graph, paper } = initGraph('myDiagramDiv'));

document.getElementById('generateBtn').addEventListener('click', () => {
generateStructure(graph);
});
});
