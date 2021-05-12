$(document).ready(function(){
    const RSS_URL = `https://www.theverge.com/rss/front-page/index.xml`;

    $.ajax(RSS_URL, {
    accepts: {
        xml: "application/rss+xml"
    },

    dataType: "xml",

    success: function(data) {
        const items = data.querySelectorAll("entry");
        const title = data.querySelectorAll("title");
        const favicon = data.querySelector("icon");

        document.getElementById("title").innerHTML = title[0].textContent; 
        var elem = document.createElement("link");
        elem.setAttribute("href", favicon.textContent);
        elem.setAttribute("rel", "icon");
        
        var headcontainer = document.getElementsByTagName("head");
        headcontainer[0].appendChild(elem);

        formatArticleItems(items);
    }
    });
});

function formatArticleItems(item ){
    var count = 1; 
    var mainContainer = document.getElementById("main-article-container");
    item.forEach(el => {
        var published = el.querySelector("published"); 
        var update = el.querySelector("updated"); 
        var title = el.querySelector("title"); 
        var summary = el.querySelector("content"); 
        var author = el.querySelector("author"); 
        var link = el.querySelector("link");

        var div_container = document.createElement("div");
        div_container.id = "article_"+count;
        div_container.className ="article_container " + "article_"+count;  

        var table = document.createElement("table");
        table.id="table_article_" + count; 
        
        var row = table.insertRow(0); 
        var cell1 = row.insertCell(0);
        cell1.innerHTML = createTitleElem(title); 
        cell1.setAttribute("colspan" , 2);

        var row = table.insertRow(1); 
        var cell2 = row.insertCell(0);
        var cell3 = row.insertCell(1);
        cell2.innerHTML = createAuthorElem(author); 
        cell3.innerHTML = createPublishedDate(published); 

        var row = table.insertRow(2); 
        var cell4 = row.insertCell(0);
        cell4.innerHTML = createSummary(summary);
        cell4.setAttribute("colspan" , 2);

        div_container.appendChild(table);

        if(count%3 ==0){
            count = 1;
        }else{
            count++;
        }

        //create link 
        var linkelem = createLinkElem(link);
        linkelem.appendChild(div_container);
        
        //append to maincontainer
        mainContainer.appendChild(linkelem);

    });
}

function createLinkElem(link){
    var elem = document.createElement("a"); 
    var href = link.getAttribute("href"); 
    elem.setAttribute("href", href);
    return elem;
}


function createTitleElem(title){
    var title_elem = document.createElement("h1"); 
    title_elem.innerHTML = title.textContent; 
    title_elem.className="artitleTitle";
    return title_elem.outerHTML;
}

function createAuthorElem(author){
    var elem = document.createElement("h4"); 
    elem.innerHTML = author.textContent; 
    elem.className="authorElem";
    return elem.outerHTML;
}

function createPublishedDate(published){
    var elem = document.createElement("h4"); 
    var date = new Date(published.textContent)
                .toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}); 
    elem.innerHTML = date; 
    elem.className="publishDate";
    return elem.outerHTML;
}

function createSummary(summary){
    var elem = document.createElement("h6"); 
    elem.innerHTML = summary.textContent; 
    elem.className="summary";
    return elem.outerHTML;
}

function extractImagefromSummary(summary){
    var image = summary.querySelector("img");
    var elem = document.createElement("img"); 
    elem.innerHTML = summary.textContent; 
    return elem.outerHTML;
}


function filterArticle() {
    var input = document.getElementById("searchTitle");
    var filter = input.value.toLowerCase();
    var titleList = document.getElementsByClassName("artitleTitle"); 

    if(filter != ""){
        hideAllArticles();
        var i = 0 ; 
        for (i = 0; i < titleList.length; i++) {
            var title = titleList[i].textContent; 
            if (title.toLowerCase().indexOf(filter) > -1) {
                var closestDiv = titleList[i].closest(".article_container");
                closestDiv.style.display = "block";
            } 
        }
    }else{
        showAllArticles();
    }
    
}

function hideAllArticles() {
    var list = document.getElementsByClassName("article_container"); 

    var i = 0 ; 
    for (i = 0; i < list.length; i++) {
        list[i].style.display = "none";
    }
}

function showAllArticles() {
    var list = document.getElementsByClassName("article_container"); 

    var i = 0 ; 
    for (i = 0; i < list.length; i++) {
        list[i].style.display = "block";
    }
}