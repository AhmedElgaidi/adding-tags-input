const ul = document.querySelector("ul"),
    input = document.querySelector("input"),
    tagsNumber = document.querySelector(".details span"),
    removeBtn = document.querySelector(".details button");

let maxTags = 10,// maximum allowed tags.
    tags = ["One", "Two"];// our placeholder tags.

countTags();
createTag();

function countTags(){
    input.focus();// for focuing in the input element.
    tagsNumber.innerText = maxTags - tags.length;
}

function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li>${tag} <i class='bx bx-x bx-tada bx-rotate-90' onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}

function remove(element, tag){
    let index  = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTags();
}

function addTag(e){
    if(e.key == "Enter"){// if user pressed "enter button"
        // this regex for replacing any spaces into only ' '
        let tag = e.target.value.replace(/\s+/g, ' ');
        if(tag.length > 1 && !tags.includes(tag)){// don't add if it's repeated
            if(tags.length < 10){
                tag.split(',').forEach(tag => {
                    tags.push(tag);
                    createTag();
                });
            }
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag);


removeBtn.addEventListener("click", () =>{
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
    countTags();
});


// Tip: use this package whenever you want to do this tags model
// github: https://github.com/yairEO/tagify
// video explaining: https://youtu.be/G1-7yRQlmlk