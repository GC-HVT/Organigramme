import { chargerGroupes, chargerMembres } from "../modules/moduleMembres.js";
import { initialiserOrganigramme, ajouterBloc, ajouterLien, supprimerLien, exporterPDF, injecterMembresSidebar } from "../modules/moduleOrganigramme.js";

document.addEventListener("DOMContentLoaded", () => {
    chargerGroupes();
    initialiserOrganigramme();

    document.getElementById("loadMembersBtn").addEventListener("click", () => {
        chargerMembres(injecterMembresSidebar);
    });

    document.getElementById("addBloc").addEventListener("click", ajouterBloc);
    document.getElementById("addLien").addEventListener("click", ajouterLien);
    document.getElementById("supprimerLien").addEventListener("click", supprimerLien);
    document.getElementById("exporterPDF").addEventListener("click", exporterPDF);
});
