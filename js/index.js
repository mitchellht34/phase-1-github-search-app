document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userList = document.getElementById('user-list');
        const repoList = document.getElementById('repos-list');
        userList.innerHTML = '';
        repoList.innerHTML = '';
        fetch(`https://api.github.com/search/users?q=${input.value}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.items);
                data.items.forEach((element) => {
                    const user = document.createElement('li');
                    user.innerText = element.login;
                    userList.appendChild(user);
                    input.value = '';

                    user.addEventListener('click', () => {
                        fetch(`https://api.github.com/users/${user.innerText}/repos`)
                            .then((response) => response.json())
                            .then((data) => {
                                repoList.innerHTML = '';
                                data.forEach((el) => {
                                    const repo = document.createElement('li');
                                    repo.innerText = el.name;
                                    repoList.appendChild(repo);
                                })
                            })
                    })
                })
            })
    })
})