(function () {
    let size = 11;
    let maxSize;
    let href = window.location.href;
    async function createBlog(container) {

        const articleList = document.createElement('ul');
        const pagesList = document.createElement('ul');
        pagesList.classList.add('pagination');

        let a = href.indexOf('=') + 1;
        a > 0 ? page = Number(href.slice(a)) : page = 1;

        size = Math.floor(page / 10) * 10 + 11;

        await createListArticle(articleList);
        fillPageList(pagesList);

        container.append(articleList);
        container.append(pagesList);
    }

    async function createArticle(container) {
        let a = href.indexOf('=') + 1;
        let articleData = await loadArticle(href.slice(a));
        const articleTitle = document.createElement('h1');
        articleTitle.textContent = articleData.data.title;
        const articleBody = document.createElement('p');
        articleBody.textContent = articleData.data.body;
        const articleComment = document.createElement('dl');

        const commentData = await loadComment(href.slice(-4));
        for (let i = 0; i < 10; i++) {
            let name = document.createElement('dt');
            name.textContent = commentData.data[i].name;
            let comment = document.createElement('dd');
            comment.textContent = commentData.data[i].body;
            articleComment.append(name, comment);
        }

        container.append(articleTitle);
        container.append(articleBody);
        container.append(articleComment);
    }

    async function createListArticle(articleList) {
        let listData = await loadListArticle(page);
        for (let i = 0; i < 10; i++) {
            let article = document.createElement('li');
            article.id = await listData.data[i].id;
            let articleLink = document.createElement('a');
            articleLink.textContent = listData.data[i].title;
            articleLink.href = `post.html?id=${article.id}`;

            article.appendChild(articleLink);
            articleList.append(article);
        }
    }

    async function loadListArticle() {
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
        const listData = await response.json();
        maxSize = listData.meta.pagination.pages;
        return listData;
    }

    async function loadArticle(articleId) {
        const response = await fetch(`https://gorest.co.in/public-api/posts/${articleId}`);
        const articleData = await response.json();
        return articleData;
    }

    async function loadComment(articleId) {
        const response = await fetch(`https://gorest.co.in/public-api/comments?post_id${articleId}`);
        const commentData = await response.json();
        return commentData;
    }

    function fillPageList(pagesList) {
        let previous = createPageListElement('Previous', '&laquo');
        let next = createPageListElement('Next', '&raquo');
        pagesList.append(previous);

        for (let i = size - 10; i < size; i++) {
            const pageNumber = document.createElement('li');
            pageNumber.classList.add('page-item');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            pageLink.href = `index.html?page=${i}`;
            pageNumber.append(pageLink);
            pagesList.append(pageNumber);
            if (i == maxSize) {
                console.log(maxSize);
                break;
            }
        }
        pagesList.append(next);
    }

    function createPageListElement(ariaLabel, title) {
        const element = document.createElement('li');
        element.classList.add('page-item');
        const symbol = document.createElement('a');
        symbol.classList.add('page-link');
        symbol.ariaLabel = ariaLabel;
        const item = document.createElement('span');
        item.innerHTML = title;
        if (symbol.ariaLabel === 'Next') {
            symbol.href = `index.html?page=${size}`;
            if (page === maxSize) {
                symbol.href = '#';
            }
        } else {
            symbol.href = `index.html?page=${size - 20}`;
            if (page == 1) {
                symbol.href = '#';
            }
        }

        symbol.append(item);
        element.append(symbol);
        return element;
    }

    window.createBlog = createBlog;
    window.createArticle = createArticle;
})();