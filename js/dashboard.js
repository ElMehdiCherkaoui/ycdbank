export function dashboardMenu() {
    const btn = document.getElementById("dropdownBtn");
    const menu = document.getElementById("dropdownMenu");


    if (!btn || !menu) {
        console.warn("Dropdown elements not found (check IDs: dropdownBtn, dropdownMenu)");
        return;
    }

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add("hidden");
        }
    });
}

export function headerMenu() {
    const notifBtn = document.getElementById('notifBtn');
    const notifMenu = document.getElementById('notifMenu');

    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!notifBtn.contains(e.target) && !notifMenu.contains(e.target)) {
            notifMenu.classList.add('hidden');
        }
    });
}

export function sidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('-translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
        }
    });
}