const modal = document.getElementById('content-modal');
const content = document.querySelector('.content');
console.log(content);
content.addEventListener('click', () => {
    modal.style.display = "grid";
});