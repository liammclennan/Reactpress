declare function require(name:string);
var config = require("../config");

export function apiFactory(fetch, cache, slug) {
    return {
        getPost: getPostFactory(slug, fetch, cache),
        getCategories: getCategoriesFactory(fetch, cache),
        getRecentPosts: getRecentPostsFactory(fetch, cache)
    };
}

function getRecentPostsFactory(fetch, cache) {
    let recentPostsUrl = `${config.apiEndpoint}/posts`;

    return function getRecentPosts() {
        if (cache && cache.getRecentPostsFactory) {
            return Promise.resolve(cache.getRecentPostsFactory);
        }
        return fetch(recentPostsUrl)
            .then((response) => response.json())
            .then((posts) => posts.map(swapDomains))
            .then((posts) => {
                cache.getRecentPostsFactory = posts;
                return posts;
            });
    }
}

function swapDomains(post) {
    post.content.rendered = post.content.rendered.replace(config.previousDomain, config.newDomain);
    post.link = post.link.replace(config.previousDomain, config.newDomain);
    return post;
}

function getPostFactory(slug, fetch, cache) {
    let postBySlugUrl = `${config.apiEndpoint}/posts?slug=${slug}`;
    
    return function getPost() {
        if (cache && cache.getPostFactory) {
            return Promise.resolve(cache.getPostFactory);
        }
        return fetch(postBySlugUrl)
        .then((response) => response.json())
        .then((posts) => {
            if (posts.length === 0) return null;
            posts.map(swapDomains);
            return posts[0];
        }).then((post) => {
            cache.getPostFactory = post;
            return post;
        });
    };
}

function getCategoriesFactory(fetch, cache) {
    let categoriesUrl = `${config.apiEndpoint}/categories`;
    
    return function getCategories () {
        if (cache && cache.getCategories) {
        return Promise.resolve(cache.getCategories);
        }
        return fetch(categoriesUrl)
        .then((r) => r.json())
        .then((json) => {
            json.forEach((category) => {
            category.link = category.link.replace(config.previousDomain, config.newDomain);
            });
            cache.getCategories = json;
            return json;
        });
    };
}