import * as joint from 'jointjs';

function createBloc(data, x, y) {
const element = new joint.shapes.standard.Rectangle();
element.position(x, y);
element.resize(160, 80);
element.attr({
body: {
fill: '#e0f7fa',
stroke: '#00796b',
strokeWidth: 2,
rx: 6,
ry: 6
},
label: {
text: data.poste || 'Poste',
fill: '#000',
fontSize: 12,
fontWeight: 'bold'
}
});

element.prop('customData', data);

element.on('element:pointerdblclick', () => {
const editor = document.getElementById('blocEditor');
editor.classList.add('visible');

editor.querySelector('#editName').value = data.name || '';
editor.querySelector('#editPoste').value = data.poste || '';
editor.querySelector('#editDesc').value = data.desc || '';
editor.querySelector('#editTel').value = data.tel || '';
editor.querySelector('#editMail').value = data.mail || '';

editor.dataset.targetId = element.id;

});

return element;
}

function createLink(source, target) {
return new joint.shapes.standard.Link({
source: { id: source.id },
target: { id: target.id },
attrs: {
line: {
stroke: '#333',
strokeWidth: 2,
targetMarker: {
type: 'path',
d: 'M 10 -5 0 0 10 5 z'
}
}
}
});
}

export { createBloc, createLink };
