const getData = (pageUrl) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.responseText);
            } else {
                reject(this.responseText);
            }
        };
        request.open("get", pageUrl, true);
        request.send();
    });
};


function load(container_selector, pageUrl, page_id, page_title, push = true) {
    console.log("Loading page " + page_id + "from file " + pageUrl + " into container " + container_selector);
    document.querySelector(container_selector).innerHTML = "";
    getData(pageUrl)
        .then((resolve) => {
            var resp = resolve;
            if (push)
                history.pushState({ page: page_id, selector: container_selector, title: page_title, url: pageUrl }, page_title, "?page=" + page_id);

            document.querySelector(container_selector).innerHTML = resp;
            document.querySelector(container_selector).style.opacity = 0;
            setTimeout(function() {
                document.querySelector(container_selector).style.opacity = 1;
            }, 200)
            console.log(pageUrl);
            console.log(resolve);
            initializer(page_id)
        })
        .catch((reject) => {
            console.error(reject);
        });
}

function linkClick(event) {
    console.log("Loading link!");
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    loadLink(event.target);
}

function loadLink(linkElement) {
    load("#main-container", linkElement.getAttribute("href"), linkElement.getAttribute("page-id"), linkElement.getAttribute("page-title"), true);
    return false;
}

window.addEventListener('popstate', (event) => {
    var url = null;

    if (event.state && event.state.url) {
        url = event.state.url;
    } else {
        url = 'index.html'; // or whatever your initial url was
    }
    console.log("Pop state!");
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    load(event.state.selector, event.state.url, event.state.page, event.state.title, false);
});


function initializer(pageId) {
    switch (pageId) {
        case "1":
            document.getElementById("generate-grid").onsubmit = function() {
                return (onSubmitForm());
            };
            initSliders();
            break;
        case "2":
            break;
        case "page3":
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadLink(document.getElementById("home-link"));
    var links = document.getElementsByClassName("nav-link");
    for (const link of links) {
        link.addEventListener("click", function(event) {
            linkClick(event);
        });
    }
})