import * as joint from 'jointjs';
import { createBloc, createLink } from './ui.js';

let paper, graph;

function initGraph(containerId) {
graph = new joint.dia.Graph();

paper = new joint.dia.Paper({
el: document.getElementById(containerId),
model: graph,
width: '100%',
height: '100%',
gridSize: 10,
drawGrid: true,
interactive: true,
background: { color: '#ffffff' },
});

return { graph, paper };
}

function generateStructure(graph) {
graph.clear();

const chef = createBloc({ name: 'Mathieu BAC', poste: 'Directeur Travaux' }, 400, 50);
const manager = createBloc({ name: '', poste: 'Manager Activité' }, 400, 150);
const assistante = createBloc({ name: '', poste: 'Assistante' }, 600, 150);

const respEtudes = createBloc({ name: '', poste: 'Resp. Études' }, 200, 300);
const respProd = createBloc({ name: '', poste: 'Resp. Production' }, 400, 300);
const respMes = createBloc({ name: '', poste: 'Resp. Mise en service' }, 600, 300);

// Liens hiérarchiques
graph.addCells([
chef, manager, assistante,
respEtudes, respProd, respMes,
createLink(chef, manager),
createLink(manager, assistante),
createLink(manager, respEtudes),
createLink(manager, respProd),
createLink(manager, respMes)
]);
}

export { initGraph, generateStructure };
