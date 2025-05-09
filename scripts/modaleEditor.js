function setupEditor() {
const editor = document.getElementById('blocEditor');
const form = editor.querySelector('form');

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
cell.attr('label/text', data.poste);

editor.classList.remove('visible');

});

editor.querySelector('.cancel-btn').addEventListener('click', () => {
editor.classList.remove('visible');
});
}

export { setupEditor };
