document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.display table');

    table.addEventListener('click', (event) => {
        const target = event.target;

        // Handle Edit button click
        if (target.classList.contains('edit-btn')) {
            const row = target.closest('tr');
            row.querySelectorAll('.view-mode').forEach(el => el.classList.add('hidden'));  // Hide view mode
            row.querySelectorAll('.edit-mode').forEach(el => el.classList.remove('hidden'));  // Show edit mode
            row.querySelector('.save-btn').classList.remove('hidden'); // Show save button
            row.querySelector('.cancel-btn').classList.remove('hidden'); // Show cancel button
        } 

        // Handle Save button click
        else if (target.classList.contains('save-btn')) {
            const row = target.closest('tr');
            const studentID = row.dataset.studentId;  // Get student ID from the row's data attribute
            const updatedData = {
                studentID: Number(studentID),
                firstname: row.querySelector('input[type="text"]').value,
                middlename: row.querySelectorAll('input[type="text"]')[1].value,
                lastname: row.querySelectorAll('input[type="text"]')[2].value,
                course: row.querySelectorAll('input[type="text"]')[3].value,
                year: parseInt(row.querySelector('input[type="number"]').value, 10),
                status: row.querySelector('select').value,
            };

            console.log('Updated Data:', updatedData);

            // Make the API request to save the data
            fetch('/students/update-student', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Server Response:', data);
                if (data.message) {
                    alert(data.message);  // Alert success message from the server

                    // Update view mode after saving
                    row.querySelector('.view-mode:nth-child(2)').textContent = updatedData.firstname;
                    row.querySelector('.view-mode:nth-child(3)').textContent = updatedData.middlename;
                    row.querySelector('.view-mode:nth-child(4)').textContent = updatedData.lastname;
                    row.querySelector('.view-mode:nth-child(5)').textContent = updatedData.course;
                    row.querySelector('.view-mode:nth-child(6)').textContent = updatedData.year;
                    row.querySelector('.view-mode:nth-child(7)').textContent = updatedData.status;

                    // Switch back to view mode
                    row.querySelectorAll('.view-mode').forEach(el => el.classList.remove('hidden'));
                    row.querySelectorAll('.edit-mode').forEach(el => el.classList.add('hidden'));
                    row.querySelector('.save-btn').classList.add('hidden'); // Hide save button
                    row.querySelector('.cancel-btn').classList.add('hidden'); // Hide cancel button
                }
            })
            .catch(error => console.error('Error:', error));
        } 

        // Handle Cancel button click
        else if (target.classList.contains('cancel-btn')) {
            const row = target.closest('tr');
            row.querySelectorAll('.view-mode').forEach(el => el.classList.remove('hidden'));
            row.querySelectorAll('.edit-mode').forEach(el => el.classList.add('hidden'));
            row.querySelector('.save-btn').classList.add('hidden'); // Hide save button
            row.querySelector('.cancel-btn').classList.add('hidden'); // Hide cancel button
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
