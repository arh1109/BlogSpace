const posts = document.getElementsByClassName('posts')[0];
const form = document.getElementById('post-form');
const title = document.getElementById('form-title');
const body = document.getElementById('form-body');
let postsArray = [];

(async () => {
    let postsData = await fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    let postsJson = await postsData.json();
    postsArray = postsJson.slice(0, 5);
    postsArray.forEach((post, idx) => {
        createPost(idx, post);
    })
})();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let formData = {title: title.value, body: body.value}
    fetchPostData('https://apis.scrimba.com/jsonplaceholder/todos', formData)
        .then(data => {
            // append or prepend new post here
            postsArray.push(data);
            createPost(postsArray.length, data)
            form.reset();
        });
})

function createPost(idx, post) {
    posts.innerHTML = 
        `<div class="post" id="post-${idx}">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
            <hr>
        </div>` + posts.innerHTML;
}

async function fetchPostData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}