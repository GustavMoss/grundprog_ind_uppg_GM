// Globala variablar
let mainCon = document.getElementsByClassName("main_content");
let newPost = document.getElementsByClassName("new_post")[0];
let newPostBtn = document.getElementsByClassName("new_post_button")[0];
let closePostBtn = document.getElementsByClassName("close_new_post")[0];
let createPostBtn = document.getElementsByClassName("create_post_button");
let likeBtn = document.createElement("button");
let likeNmbr = document.createElement("span");
let postStorage = [];
let postCon;
let likeCon;

// Hämta data från localstorage eller dummyjson
if (JSON.parse(localStorage.getItem("posts"))) {
    getLocalData();
} else {
    getRemoteData();
}

// Hämta data från dummyjson
function getRemoteData() {
    fetch("https://dummyjson.com/posts?select=title,reactions,body,tags")
        .then((res) => res.json())
        .then((post) => {
            for (let i = 0; i < post.posts.length; i++) {
                // creating the elements for the content dynamically
                postCon = document.createElement("article");
                postCon.classList.add("post_container");

                let postTitle = document.createElement("h2");
                postTitle.classList.add("post_title");

                let postText = document.createElement("p");
                postText.classList.add("post_text");

                let postTags = document.createElement("span");
                postTags.classList.add("post_tags");

                likeCon = document.createElement("div");
                likeCon.classList.add("reaction_container");

                likeNmbr = document.createElement("span");
                likeNmbr.classList.add("reaction_number");

                likeBtn = document.createElement("button");
                likeBtn.addEventListener("click", likes);
                likeBtn.classList.add("btn");
                likeBtn.classList.add("like_button");
                likeBtn.innerText = "Like";
                likeBtn.append();
                likeCon.append(likeNmbr, likeBtn);

                postStorage.push(post.posts[i]);
                localStorage.setItem("posts", JSON.stringify(postStorage));
                postTitle.innerText = post.posts[i].title;
                postText.innerText = post.posts[i].body;
                postTags.innerText = post.posts[i].tags;
                likeNmbr.innerText = post.posts[i].reactions;

                postCon.append(postTitle, postText, postTags, likeCon);
                mainCon[0].append(postCon);
            }
        });
}

// Skapa en ny post
function createPost() {
    postCon = document.createElement("article");
    postCon.classList.add("post_container");

    let inputTitle = document.getElementById("post_title");
    let inputTags = document.getElementById("post_tags");
    let inputText = document.getElementById("post_text");

    let postTitle = document.createElement("h2");
    postTitle.classList.add("post_title");

    let postText = document.createElement("p");
    postText.classList.add("post_text");

    let postTags = document.createElement("span");
    postTags.classList.add("post_tags");

    likeCon = document.createElement("div");
    likeCon.classList.add("reaction_container");

    let likeNmbr = document.createElement("span");
    likeNmbr.classList.add("reaction_number");

    likeBtn = document.createElement("button");
    likeBtn.addEventListener("click", likes);
    likeBtn.classList.add("btn");
    likeBtn.classList.add("like_button");
    likeBtn.innerText = "Like";
    likeBtn.append();
    likeCon.append(likeNmbr, likeBtn);

    const userPost = {
        title: inputTitle.value,
        body: inputText.value,
        tags: inputTags.value,
        reactions: 0,
    };

    postStorage.push(userPost);
    localStorage.setItem("posts", JSON.stringify(postStorage));

    postTitle.innerText = inputTitle.value;
    postText.innerText = inputText.value;
    postTags.innerText = inputTags.value;
    likeNmbr.innerText = 0;

    postCon.append(postTitle, postText, postTags, likeCon);
    mainCon[0].append(postCon);

    closenewPost();
}


// Hämta data från localstorage
function getLocalData() {
    postStorage = JSON.parse(localStorage.getItem("posts"));
    for (let i = 0; i < postStorage.length; i++) {
        postCon = document.createElement("article");
        postCon.classList.add("post_container");

        let postTitle = document.createElement("h2");
        postTitle.classList.add("post_title");

        let postText = document.createElement("p");
        postText.classList.add("post_text");

        let postTags = document.createElement("span");
        postTags.classList.add("post_tags");

        likeCon = document.createElement("div");
        likeCon.classList.add("reaction_container");

        likeNmbr = document.createElement("span");
        likeNmbr.classList.add("reaction_number");

        likeBtn = document.createElement("button");
        likeBtn.addEventListener("click", likes);
        likeBtn.classList.add("btn");
        likeBtn.classList.add("like_button");
        likeBtn.innerText = "Like";
        likeBtn.append();

        likeCon.append(likeNmbr, likeBtn);

        postTitle.innerText = postStorage[i].title;
        postText.innerText = postStorage[i].body;
        postTags.innerText = postStorage[i].tags;
        likeNmbr.innerText = postStorage[i].reactions;

        postCon.append(postTitle, postText, postTags, likeCon);
        mainCon[0].append(postCon);
    }
}

//likefunktionen funkar inte som den ska, vill inte spara (började för sent för att be dig om hjälp)

function likes(l) {
    let element = l.currentTarget.parentElement.querySelector(".reaction_number");
    counter =
        l.currentTarget.parentElement.querySelector(".reaction_number").innerText;
    let elementId = l.currentTarget.parentElement.parentElement.dataset.id;  
    counter++;
    element.innerText = counter;
    editLikes(elementId, counter);
}

function editLikes(id, value) {
    let items = JSON.parse(localStorage.getItem('posts'));
    items = items.map(function (item) {
        if (item.id === parseInt(id)) {
            item.reactions = value;
        }
        return item;
    });
    localStorage.setItem("posts", JSON.stringify(items));
}

// Hanterar knapptryck på sidan
newPostBtn.addEventListener("click", opennewPost);
closePostBtn.addEventListener("click", closenewPost);
createPostBtn[0].addEventListener("click", createPost);

function opennewPost() {
    newPost.classList.remove("hide_new_post");
}

function closenewPost() {
    newPost.classList.add("hide_new_post");
}