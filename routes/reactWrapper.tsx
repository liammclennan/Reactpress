import { render as singleRender } from "../templates/single";
import * as React from "react";
import * as ReactDOM from "react-dom";
declare function require(name:string);
var config = require("../config");

export function single(slug, fetch, cache) {
  cache = cache || {};
  let renderResult = singleRender(getPostFactory(slug, fetch, cache), getCategories(fetch, cache));
  return renderResult.then((result) => {
    return {
      result, cache
    };
  });
}


export function renderIn(elementId, componentWithProps) {
  let Components = {
    c: componentWithProps.component
  };
  ReactDOM.render(<Components.c {...componentWithProps.props} />,
      document.getElementById(elementId)
  );
}

if (typeof window !== "undefined") {
    window["single"] = single;
}

function getPostFactory(slug, fetch, cache) {
  let postBySlugUrl = `${config.apiEndpoint}/posts?slug=${slug}`;
  
  return function () {
    if (cache && cache.getPostFactory) {
      return Promise.resolve(cache.getPostFactory);
    }
    return fetch(postBySlugUrl)
      .then((response) => response.json())
      .then((posts) => {
        if (posts.length === 0) return null;
        posts[0].content.rendered = posts[0].content.rendered.replace(config.previousDomain, config.newDomain);
        return posts[0];
      }).then((post) => {
        cache.getPostFactory = post;
        return post;
      });
  };
}

function getCategories(fetch, cache) {
  let categoriesUrl = `${config.apiEndpoint}/categories`;
  
  return function () {
    if (cache && cache.getCategories) {
      return Promise.resolve(cache.getCategories);
    }
    return fetch(categoriesUrl)
      .then((r) => r.json())
      .then((json) => {
        cache.getCategories = json;
        return json;
      });
  };
}
