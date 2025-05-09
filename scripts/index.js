document.addEventListener('DOMContentLoaded', function () {
    const blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {
        const select = block.querySelector('.name-selector');
        
        select.addEventListener('change', function () {
            const selectedValue = select.value;

            let name, poste, description, email, tel;

            // Change the values based on the selected person
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

            // Update the block's values dynamically
            block.querySelector('.name-value').textContent = name;
            block.querySelector('.poste-value').textContent = poste;
            block.querySelector('.description-value').textContent = description;
            block.querySelector('.email-value').textContent = email;
            block.querySelector('.tel-value').textContent = tel;
        });
    });
});
