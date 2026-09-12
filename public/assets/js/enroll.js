
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

// Enroll Form
const registrationButton = document.getElementById("enroll-old");
const loginButton = document.getElementById("enroll-new");
const container = document.getElementById("container");

registrationButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");  
});

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