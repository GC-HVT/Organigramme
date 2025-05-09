function setupStorage(graph) {
document.getElementById('exportBtn').addEventListener('click', () => {
const json = JSON.stringify(graph.toJSON(), null, 2);
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'organigramme.json';
a.click();
URL.revokeObjectURL(url);

});

document.getElementById('importBtn').addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = () => {
  const data = JSON.parse(reader.result);
  graph.fromJSON(data);
};
reader.readAsText(file);

});
}

export { setupStorage };
