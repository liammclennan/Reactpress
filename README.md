ReactPress: React templates and universal / isomorphic rendering for Wordpress
================

What
----

ReactPress is a standalone server that pulls content from the wordpress API and renders views using React.js. The views are rendered and returned from the server and then the React components are re-attached in the browser. This provides the benefits of server rendering (speed and SEO) with the benefits of React in the browser (interactivity). It also allows Wordpress to be used for content creation without requiring Wordpress or php for rendering. 

Why?
----

I'm really not sure. Because we can? Not because it is easy, but because it is hard?

Get Started
-----------

Create a wordpress instance, standalone or on [wordpress.com](https://wordpress.com).

Implement the [wordpress template files](https://codex.wordpress.org/Theme_Development#Template_Files_List) as React components. E.g. to render a post create a file `Single.tsx` with content like:

```javascript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Menu } from "./Menu";
import {Timer} from "./supporting/Timer";

export function render(getPost, getCategories) {
    return Promise.all([getPost(), getCategories()])
        .then(([post, categories]) => {
            return {
                component: Single,
                props: { post, categories }
            };
        });
}

export function Single({post, categories}) {
    return (<div>
        <Menu model={categories} />
        <Post model={post} />
        <Timer />
    </div>);
}

export function Post(props) {
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{__html: props.model.title.rendered}}></h1>
      <p>{props.model.date}</p>
      <p dangerouslySetInnerHTML={{__html: props.model.excerpt.rendered}} />
      <div dangerouslySetInnerHTML={{__html: props.model.content.rendered}} />
    </div>);
}
```

This is regular React code with no restrictions, other than being able to run in the browser. 

`getPost` and `getCategories` functions provide access to wordpress data. `getPost` returns data for the post identified by the posts slug, extracted from the url. 