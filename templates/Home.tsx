import * as React from "react";
import * as ReactDOM from "react-dom";
import { Post } from "./Single";
import {Timer} from "../supporting/Timer";

export function render(api) {
    return Promise.all([api.getRecentPosts()])
        .then(([posts]) => {
            return {
                component: Home,
                props: { posts }
            };
        });
}

function Home({posts}) {
    return (<div>
        <h1>Without The Loop</h1>
        <hr />
        <div id="content">
            <div className="content-wrap">
                <article className="article">
                    {posts.map((post) => <div><a href={post.link}><h2>{post.title.rendered}</h2></a></div>)}
                </article>
            </div>
        </div>
        <Timer />
    </div>);
}
