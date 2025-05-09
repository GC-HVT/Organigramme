import { chargerGroupes, chargerMembres } from "./modules/modulesMembres.js";

let selectedLink = null;

function initialiserOrganigramme() {
    const paper = new joint.dia.Paper({
        el: document.getElementById("organigramme"),
        width: 2000,
        height: 1500,
        gridSize: 10,
        model: new joint.dia.Graph(),
        interactive: { linkMove: false },
        defaultLink: new joint.dia.Link({
            attrs: { 
                '.connection': { stroke: '#000000' },
                '.marker-target': { fill: '#000000', d: 'M 10 0 L 0 5 L 10 10 z' }
            }
        })
    });

    const graph = paper.model;

    document.getElementById("addBloc").addEventListener("click", () => {
        const rect = new joint.shapes.standard.Rectangle();
        rect.position(100, 100);
        rect.resize(180, 80);
        rect.attr({
            body: {
                fill: "#f0f0f0",
                stroke: "#333",
                rx: 10,
                ry: 10
            },
            label: {
                text: "Bloc",
                fill: "#000",
                fontSize: 14
            }
        });

        // Ajout d’un bouton de suppression dans le coin
        const removeButton = new joint.shapes.standard.Rectangle();
        removeButton.position(260, 90);
        removeButton.resize(20, 20);
        removeButton.attr({
            body: { fill: "#ff4d4d" },
            label: { text: "X", fill: "#fff", fontSize: 14 }
        });

        rect.addTo(graph);

        // Clique pour supprimer ce bloc
        rect.on("element:pointerdblclick", () => {
            rect.remove();
        });
    });

    document.getElementById("addLien").addEventListener("click", () => {
        const elements = graph.getElements();
        if (elements.length >= 2) {
            const link = new joint.dia.Link({
                source: { id: elements[0].id },
                target: { id: elements[1].id },
                attrs: {
                    line: {
                        stroke: "#333",
                        strokeWidth: 2,
                        targetMarker: {
                            type: "path",
                            d: "M 10 -5 0 0 10 5 Z"
                        }
                    }
                }
            });
            link.addTo(graph);
        }
    });

    document.getElementById("supprimerLien").addEventListener("click", () => {
        if (selectedLink) {
            selectedLink.remove();
            selectedLink = null;
        }
    });

    paper.on("link:pointerclick", function(linkView) {
        selectedLink = linkView.model;
    });

    document.getElementById("exporterPDF").addEventListener("click", () => {
        const svgElement = document.querySelector("#organigramme svg");
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "organigramme.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

export { initialiserOrganigramme };
