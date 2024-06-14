const inputAjouterTache = document.getElementById('inputAjout')
const buttonAjouterTache = document.getElementById('boutonAjout')

// ecouter le bouton plus pour ajouter la tache
buttonAjouterTache.addEventListener('click', ajout)


// fonction d'ajout
function ajout() {
    let valeurTache = inputAjouterTache.value
    if (valeurTache !== '') {
        let TaskList = document.getElementById('listeTache')

        // creer la liste c-à-d la ligne qui va contenir le nom de la tache et les boutons et icones
        const create = document.createElement('div')
        create.classList.add('border-bottom', 'shadow', 'm-3', 'p-3', 'bg-white', 'd-flex', 'align-items-center', 'justify-content-between')

        // creer un span qui va contenir le nom de la tache comme ça quand on va modifier cela ne va pas affecter les boutons 
        const taskText = document.createElement('span')
        taskText.textContent=valeurTache
        create.appendChild(taskText)


        TaskList.appendChild(create)
        inputAjouterTache.value = '';

        // creer le bouton to-do
        const boutonTODO = document.createElement('button');
        boutonTODO.textContent = 'to-do';
        boutonTODO.classList.add('btn', 'btn-outline-danger', 'border-none', 'rounded', 'p-1');
        boutonTODO.addEventListener('click', function () {
            create.classList.remove('bg-white');
            create.classList.add('bg-danger');
            boutonTODO.classList.add('btn', 'border-white', 'rounded', 'p-1', 'text-white');
        });
        create.appendChild(boutonTODO);

        // creer le bouton DOING
        const boutonDOING = document.createElement('button');
        boutonDOING.textContent = 'doing';
        boutonDOING.classList.add('btn', 'btn-outline-warning', 'border-none', 'rounded', 'p-1');
        boutonDOING.addEventListener('click', function () {
            create.classList.remove('bg-white');
            create.classList.remove('bg-danger');
            create.classList.add('bg-warning');
            boutonDOING.classList.add('btn', 'border-white', 'rounded', 'p-1', 'text-white');
        });
        create.appendChild(boutonDOING);

        // creer le bouton DONE
        const boutonDONE = document.createElement('button');
        boutonDONE.textContent = 'done';
        boutonDONE.classList.add('btn', 'btn-outline-success', 'border-none', 'rounded', 'p-1');
        boutonDONE.addEventListener('click', function () {
            create.classList.remove('bg-white');
            create.classList.remove('bg-danger');
            create.classList.remove('bg-warning');
            create.classList.add('bg-success');
            boutonDONE.classList.add('btn', 'border-white', 'rounded', 'p-1', 'text-white');
        });
        create.appendChild(boutonDONE);

        // creer l'icone supprimer
        const iconeSupprimer = document.createElement('div');
        iconeSupprimer.innerHTML = '<i class="fa-solid fa-trash" style="color: #000;"></i>'
        iconeSupprimer.classList.add('p-2');
        iconeSupprimer.addEventListener('click', () => {
            create.remove()
        })
        create.appendChild(iconeSupprimer)

        // Créer l'icône de modification
        const iconeModifier = document.createElement('div');
        iconeModifier.innerHTML = '<i class="fa-solid fa-pen" style="color: #000;"></i>';

        // Ajouter un événement de clic à l'icône de modification
        iconeModifier.addEventListener('click', () => {
            let tacheModiff = prompt('Entrez le nouveau nom:');
            if (tacheModiff !== null && tacheModiff.trim() !== '') {
                taskText.textContent = tacheModiff;
            }
        });

        // Ajouter l'icône de modification à l'élément
        create.appendChild(iconeModifier);

    } else {
        alert('veuillez indiquer la tâche')
    }

}

