const flow1Url = "https://510d1700ccf0e18d8838a85b3b1f29.f8.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/22669dcdd1844e2f9f4cb2c33f8b1b29/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=510d1700-ccf0-e18d-8838-a85b3b1f29f8&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yTRYkTzWv_SwRguyhGi705cPWAsXmEoiYFMYvgdeaqM";
const flow2Url = "https://510d1700ccf0e18d8838a85b3b1f29.f8.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3785e3f025114a9e91f473a5eea86efb/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=510d1700-ccf0-e18d-8838-a85b3b1f29f8&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ThRN4vDSsDK-KmzKm5FWhgVJoWma_WZpL_FvexTj3Pc";

// Fonction pour charger les groupes
async function chargerGroupes() {
    const groupSelect = document.getElementById("groupSelect");
    try {
        const response = await fetch(flow1Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        const groupes = data.groups || [];
        remplirSelectGroupes(groupes);
    } catch (error) {
        alert("Erreur lors du chargement des groupes : " + error.message);
    }
}

// Remplir la liste des groupes dans le select HTML
function remplirSelectGroupes(groupes) {
    const groupSelect = document.getElementById("groupSelect");
    groupSelect.innerHTML = '<option value="">-- Choisir un groupe --</option>';
    groupes.forEach(group => {
        const option = document.createElement("option");
        option.value = group.id;
        option.textContent = group.displayName;
        groupSelect.appendChild(option);
    });
}

// Fonction pour charger les membres d'un groupe
async function chargerMembres(callback) {
    const groupId = document.getElementById("groupSelect").value;
    if (!groupId) {
        alert("Veuillez choisir un groupe.");
        return;
    }

    try {
        const response = await fetch(flow2Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupId })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        if (callback) {
            callback(data.members || []);
        }
    } catch (error) {
        alert("Erreur lors du chargement des membres : " + error.message);
    }
}

export { chargerGroupes, chargerMembres };
