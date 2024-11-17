// Simulate user data (normally fetched from a server or stored in localStorage)
const name = localStorage.getItem('userName') || "John Doe";
const Email = localStorage.getItem('userEmail') || "example@example.com";
const likedAlbums = JSON.parse(localStorage.getItem('likedAlbums')) || [
    { title: 'Starboy', artist: 'The Weeknd' },
    { title: 'Back In Black', artist: 'AC/DC' },
];

// Display user info
document.getElementById('user-name').textContent = name;
document.getElementById('user-email').textContent = Email;

// Generate liked albums list
const likedAlbumsList = document.getElementById('liked-albums-list');
likedAlbums.forEach(album => {
    const listItem = document.createElement('li');
    listItem.textContent = `${album.title} by ${album.artist}`;
    likedAlbumsList.appendChild(listItem);
});

// Theme toggle functionality (reuse your existing code)
function toggleTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
