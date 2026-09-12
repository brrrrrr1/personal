document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.edit-btn').forEach(editButton => {
        editButton.addEventListener('click', () => {
            const row = editButton.closest('tr');
            row.querySelectorAll('.view-mode').forEach(el => el.classList.add('hidden'));
            row.querySelectorAll('.edit-mode').forEach(el => el.classList.remove('hidden'));
        });
    });

    document.querySelectorAll('.cancel-btn').forEach(cancelButton => {
        cancelButton.addEventListener('click', () => {
            const row = cancelButton.closest('tr');
            row.querySelectorAll('.edit-mode').forEach(el => el.classList.add('hidden'));
            row.querySelectorAll('.view-mode').forEach(el => el.classList.remove('hidden'));
        });
    });

    document.querySelectorAll('.save-btn').forEach(saveButton => {
        saveButton.addEventListener('click', () => {
            const row = saveButton.closest('tr');
            const updatedSubjectCode = row.querySelector('input[type="text"]').value;
            const updatedSubjectDis = row.querySelector('input[type="text"]').value;
            const updatedDays = row.querySelector('input[type="text"]').value;
            const updatedUnits = row.querySelector('input[type="text"]').value;

            // Here you would typically send these updates to a server or update them in your data array
            // For example:
            console.log('Updated values:', updatedSubjectCode, updatedSubjectDis, updatedDays, updatedUnits);
            
            // Update the view-mode with the new values
            row.querySelector('.view-mode:nth-child(1)').textContent = updatedSubjectCode;
            row.querySelector('.view-mode:nth-child(2)').textContent = updatedSubjectDis;
            row.querySelector('.view-mode:nth-child(3)').textContent = updatedDays;
            row.querySelector('.view-mode:nth-child(4)').textContent = updatedUnits;

            row.querySelectorAll('.edit-mode').forEach(el => el.classList.add('hidden'));
            row.querySelectorAll('.view-mode').forEach(el => el.classList.remove('hidden'));
        });
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

