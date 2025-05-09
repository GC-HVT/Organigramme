document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour ajouter un bloc
    function addBlock(row) {
        const newBlock = document.createElement('div');
        newBlock.classList.add('block');
        
        newBlock.innerHTML = `
            <select class="name-selector">
                <option value="john">John Doe</option>
                <option value="alice">Alice Dupont</option>
                <option value="marc">Marc Leclerc</option>
            </select>
            <p class="name">Nom: <span class="name-value">John Doe</span></p>
            <p class="poste">Poste: <span class="poste-value">Développeur</span></p>
            <p class="description">Description: <span class="description-value">Développement de fonctionnalités</span></p>
            <p class="email">Email: <span class="email-value">john.doe@example.com</span></p>
            <p class="tel">Téléphone: <span class="tel-value">+123456789</span></p>
        `;
        
        row.appendChild(newBlock);
    }

    // Fonction pour supprimer un bloc
    function removeBlock(block) {
        block.remove();
    }

    // Gérer l'ajout de blocs dans la troisième ligne
    const addButton = document.getElementById('add-block');
    const removeButton = document.getElementById('remove-block');
    const thirdRow = document.querySelector('.third-row');

    addButton.addEventListener('click', () => {
        addBlock(thirdRow);
    });

    removeButton.addEventListener('click', () => {
        const blocks = thirdRow.querySelectorAll('.block');
        if (blocks.length > 1) {
            removeBlock(blocks[blocks.length - 1]);
        }
    });

    // Gérer la modification dynamique des informations dans chaque bloc
    const blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {
        const select = block.querySelector('.name-selector');
        
        select.addEventListener('change', function () {
            const selectedValue = select.value;

            let name, poste, description, email, tel;

            // Mettre à jour les valeurs en fonction du membre sélectionné
            if (selectedValue === 'john') {
                name = 'John Doe';
                poste = 'Développeur';
                description = 'Développement de fonctionnalités';
                email = 'john.doe@example.com';
                tel = '+123456789';
            } else if (selectedValue === 'alice') {
                name = 'Alice Dupont';
                poste = 'Chef de projet';
                description = 'Gestion de projet et coordination';
                email = 'alice.dupont@example.com';
                tel = '+987654321';
            } else if (selectedValue === 'marc') {
                name = 'Marc Leclerc';
                poste = 'Designer';
                description = 'Création de designs visuels';
                email = 'marc.leclerc@example.com';
                tel = '+1122334455';
            }

            // Mettre à jour dynamiquement les informations dans le bloc
            block.querySelector('.name-value').textContent = name;
            block.querySelector('.poste-value').textContent = poste;
            block.querySelector('.description-value').textContent = description;
            block.querySelector('.email-value').textContent = email;
            block.querySelector('.tel-value').textContent = tel;
        });
    });
});
