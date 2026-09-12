document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.display table');

    table.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('edit-btn')) {
            const row = target.closest('tr');
            row.querySelectorAll('.view-mode').forEach(el => el.classList.add('hidden'));
            row.querySelectorAll('.edit-mode').forEach(el => el.classList.remove('hidden'));
        } 
        
        else if (target.classList.contains('save-btn')) {
            const row = target.closest('tr');
            const updatedInstructor = {
                id: Number(row.dataset.id),  // Ensure the id is treated as a number
                firstname: row.querySelector('input[type="text"]').value,
                middlename: row.querySelectorAll('input[type="text"]')[1].value || 'N/A',
                lastname: row.querySelectorAll('input[type="text"]')[2].value,
                status: row.querySelector('select').value,
            };

            fetch('/instructors/update-instructor', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedInstructor),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);

                    // Update the view mode content
                    const viewMode = row.querySelectorAll('.view-mode');
                    viewMode[0].textContent = updatedInstructor.firstname;
                    viewMode[1].textContent = updatedInstructor.middlename;
                    viewMode[2].textContent = updatedInstructor.lastname;
                    viewMode[3].textContent = updatedInstructor.status;

                    // Switch back to view mode
                    row.querySelectorAll('.view-mode').forEach(el => el.classList.remove('hidden'));
                    row.querySelectorAll('.edit-mode').forEach(el => el.classList.add('hidden'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save changes.');
            });
        } 
        
        else if (target.classList.contains('cancel-btn')) {
            const row = target.closest('tr');
            row.querySelectorAll('.view-mode').forEach(el => el.classList.remove('hidden'));
            row.querySelectorAll('.edit-mode').forEach(el => el.classList.add('hidden'));
        }
    });
});

//------------------DASHBOARD---------------// 
const sideMenu =document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');

const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click',() =>{
    sideMenu.style.display="block"
})
closeBtn.addEventListener('click', () =>{
    sideMenu.style.display="none"
})

themeToggler.addEventListener('click', () =>{
    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})

// ---------------Show Menu-------------//
const showMenu = (toggleId, navId) =>{
    const toggle =document.getElementById(toggleId),
    nav = document.getElementById(navId)

    toggle.addEventListener('click', () =>{
        nav.classList.toggle('show-menu')
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle',nav-menu)