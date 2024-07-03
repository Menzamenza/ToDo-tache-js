
const inputAjouterTache = document.getElementById('inputAjout');
const buttonAjouterTache = document.getElementById('boutonAjout');
const TaskList = document.getElementById('listeTache');

// Charger les tâches depuis le localStorage
window.addEventListener('load', () => {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        ajout(task.text, task.status, false);
    });
});

// Écouter le bouton plus pour ajouter la tâche
buttonAjouterTache.addEventListener('click', () => {
    ajout(inputAjouterTache.value);
    saveTasks();
});

// Fonction d'ajout
function ajout(valeurTache, status = 'to-do', save = true) {
    if (valeurTache !== '') {
        // Créer la ligne qui va contenir le nom de la tâche et les boutons et icônes
        const create = document.createElement('div');
        create.classList.add('border-bottom', 'shadow', 'm-3', 'p-3', 'bg-white', 'd-flex', 'align-items-center', 'justify-content-between');

        // Créer un span qui va contenir le nom de la tâche
        const taskText = document.createElement('span');
        taskText.textContent = valeurTache;
        create.appendChild(taskText);

        // Créer les boutons et icônes
        const boutonTODO = createButton('to-do', 'btn-outline-danger', 'bg-danger', create);
        const boutonDOING = createButton('doing', 'btn-outline-warning', 'bg-warning', create);
        const boutonDONE = createButton('done', 'btn-outline-success', 'bg-success', create);

        // Ajouter les boutons à la ligne de tâche
        create.appendChild(boutonTODO);
        create.appendChild(boutonDOING);
        create.appendChild(boutonDONE);

        // Créer l'icône supprimer
        const iconeSupprimer = document.createElement('div');
        iconeSupprimer.innerHTML = '<i class="fa-solid fa-trash" style="color: #000;"></i>';
        iconeSupprimer.classList.add('p-2');
        iconeSupprimer.addEventListener('click', () => {
            create.remove();
            saveTasks();
        });
        create.appendChild(iconeSupprimer);

        // Créer l'icône de modification
        const iconeModifier = document.createElement('div');
        iconeModifier.innerHTML = '<i class="fa-solid fa-pen" style="color: #000;"></i>';
        iconeModifier.addEventListener('click', () => {
            let tacheModiff = prompt('Entrez le nouveau nom:');
            if (tacheModiff !== null && tacheModiff.trim() !== '') {
                taskText.textContent = tacheModiff;
                saveTasks();
            }
        });
        create.appendChild(iconeModifier);

        // Ajouter la ligne de tâche à la liste des tâches
        TaskList.appendChild(create);
        inputAjouterTache.value = '';

        // Définir l'état initial de la tâche
        setStatus(create, status);

        // Sauvegarder les tâches dans le localStorage
        if (save) {
            saveTasks();
        }
    } else {
        alert('veuillez indiquer la tâche');
    }
}

function createButton(text, btnClass, bgClass, parent) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('btn', btnClass, 'border-none', 'rounded', 'p-1');
    button.addEventListener('click', () => {
        parent.classList.remove('bg-white', 'bg-danger', 'bg-warning', 'bg-success');
        parent.classList.add(bgClass);
        updateButtonStyles(parent, button);
        saveTasks();
    });
    return button;
}

function setStatus(parent, status) {
    parent.classList.remove('bg-white', 'bg-danger', 'bg-warning', 'bg-success');
    if (status === 'to-do') {
        parent.classList.add('bg-white');
    } else if (status === 'doing') {
        parent.classList.add('bg-warning');
    } else if (status === 'done') {
        parent.classList.add('bg-success');
    }
    updateButtonStyles(parent);
}

function updateButtonStyles(parent, activeButton = null) {
    const buttons = parent.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('btn-danger', 'btn-warning', 'btn-success', 'text-white');
        button.classList.add(button.textContent === 'to-do' ? 'btn-outline-danger' : button.textContent === 'doing' ? 'btn-outline-warning' : 'btn-outline-success');
        if (button === activeButton) {
            button.classList.add(button.textContent === 'to-do' ? 'btn-danger' : button.textContent === 'doing' ? 'btn-warning' : 'btn-success', 'text-white');
        }
    });
}

function saveTasks() {
    let tasks = [];
    TaskList.querySelectorAll('div').forEach(task => {
        let taskTextElement = task.querySelector('span');
        if (taskTextElement) {
            let taskText = taskTextElement.textContent;
            let status = '';
            if (task.classList.contains('bg-white')) {
                status = 'to-do';
            } else if (task.classList.contains('bg-warning')) {
                status = 'doing';
            } else if (task.classList.contains('bg-success')) {
                status = 'done';
            }
            tasks.push({ text: taskText, status: status });
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
