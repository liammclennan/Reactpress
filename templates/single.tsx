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
