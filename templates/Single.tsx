import * as React from "react";
import * as ReactDOM from "react-dom";
import { Menu } from "./Menu";
import {Timer} from "../supporting/Timer";

export function render(api) {
    return Promise.all([api.getPost()])
        .then(([post]) => {
            return {
                component: Single,
                props: { post }
            };
        });
}

function Single({post}) {
    return (<div>
        <Post model={post} />
        <Timer />
    </div>);
}

export function Post(props) {
  return (
    <div>
        <header className="header">
            <div><h2><a href="/">Without the loop</a></h2></div>
            <div className="content-wrap">
                <h1 dangerouslySetInnerHTML={{__html: props.model.title.rendered}}></h1>
                <p className="author">Written by <span className="author">Liam McLennan</span></p>
            </div>
        </header>
        <div id="content">
            <div className="content-wrap">
                <article className="article">
                    <section className="content" dangerouslySetInnerHTML={{__html: props.model.content.rendered}} />
                </article>
            </div>
        </div>
    </div>);
}
