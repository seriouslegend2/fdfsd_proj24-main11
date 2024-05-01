 // Get the current page URL
 var currentPage = window.location.pathname;

 // Update the class of the corresponding link based on the current page
 var links = document.querySelectorAll('#mySidenav a');
 links.forEach(function(link) {
     if (link.getAttribute('href') === currentPage) {
         link.classList.add('present');
     }
 });



/*
const badgesData = [
    { type: 'participation', label: 'Participation Badge', image: './imgs/bdg1.png' }, { type: 'position1', label: '1st Position Badge', image: './imgs/bdg1.png' },
    { type: 'position2', label: '2nd Position Badge', image: './imgs/bdg1.png' },
    { type: 'position3', label: '3rd Position Badge', image: './imgs/bdg1.png' },
    { type: 'participation', label: 'Participation Badge', image: './imgs/bdg1.png' },
    { type: 'position1', label: '1st Position Badge', image: './imgs/bdg1.png' },
    { type: 'position2', label: '2nd Position Badge', image: './imgs/bdg1.png' },
    { type: 'participation', label: 'Participation Badge', image: './imgs/bdg1.png' },
    { type: 'position3', label: '3rd Position Badge', image: './imgs/bdg1.png' },
    { type: 'participation', label: 'Participation Badge', image: './imgs/bdg1.png' },
    { type: 'position1', label: '1st Position Badge', image: './imgs/bdg1.png' },
    { type: 'position2', label: '2nd Position Badge', image: './imgs/bdg1.png' },
    { type: 'position3', label: '3rd Position Badge', image: './imgs/bdg1.png' },
    { type: 'position2', label: '2nd Position Badge', image: './imgs/bdg1.png' },
    { type: 'position1', label: '1st Position Badge', image: './imgs/bdg1.png' },
    { type: 'position3', label: '3rd Position Badge', image: './imgs/bdg1.png' },
    // Add more badges with image paths as needed
];
*/

const badgesContainer = document.querySelector('.badges');

async function displayBadges(filter) {
    const badgesData = await fetch('http://localhost:3030/badges')
        .then(data => data.json())
        .then(data => data.badges);
    console.log(badgesData);

    badgesContainer.innerHTML = '';

    badgesData.forEach(badge => {
        if (filter === 'all' || badge.kind === filter) {
            const badgeElement = document.createElement('div');
            badgeElement.classList.add('badge', badge.kind);
            
            // Create and append the image element
            const imgElement = document.createElement('img');
            imgElement.src = badge.image;
            badgeElement.appendChild(imgElement);
            
            // Create and append the label element
            const labelElement = document.createElement('span');
            labelElement.textContent = badge.label;
            badgeElement.appendChild(labelElement);
            
            badgesContainer.appendChild(badgeElement);
        }
    });
}

displayBadges('all');

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        displayBadges(filter);
    });
});

