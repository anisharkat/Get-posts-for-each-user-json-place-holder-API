document.querySelectorAll('.left-div, .right-div').forEach(div => {
    div.addEventListener('wheel', function(e) {
        this.scrollTop += e.deltaY;
    });
});

function getUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users/");
    request.responseType = "json";
    request.send();
    request.onload = function () {
        let users = request.response;
        if (request.status >= 200 && request.status < 300) {
            for (let user of users) {
                let divid = user.id;
                document.getElementById("left-div").innerHTML += `
                    <div onclick="userCardClicked(${divid})" id="${divid}" class="user-card">
                        <h3 class="username">${user.name}</h3>
                        <h5 class="usermail">${user.email}</h5>
                    </div>
                `;
            }
        } else {
            alert("There is a problem on the server!!");
        }
    }
}

getUsers();

function userCardClicked(userId) {
    let request = new XMLHttpRequest();
    let link = "https://jsonplaceholder.typicode.com/posts?userId=" + userId;
    request.open("GET", link);
    request.responseType = "json";
    request.send();
    request.onload = function () {
        let posts = request.response;
        if (request.status >= 200 && request.status < 300) {
            document.getElementById("right-div").innerHTML = '';
            let userCards = document.getElementsByClassName("user-card");
            for (let card of userCards) {
                card.style.boxShadow = "";
            }
            document.getElementById(userId).style.boxShadow = "inset 0 0 0 2px #ffffff";
            for (let post of posts) {
                document.getElementById("right-div").innerHTML += `
                    <div class="user-card selected">
                        <h3 class="post_title">${post.title}</h3>
                        <p class="post_body">${post.body}</p>
                    </div>
                `;
            }
        } else {
            alert("There is a problem on the server!!");
        }
    }
}