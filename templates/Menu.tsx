import * as React from "react";
import * as ReactDOM from "react-dom";

export function Menu(props) {
  return (
    <ul>
        {props.model.map((category) => 
            <Category key={category.id} category={category} />         
        )}   
    </ul>);
}

function Category(props) {
  return (
    <li><a key={props.category.id} href={props.category.link.replace("startsat60.com", "foo.com")}>{props.category.name}</a>
        {props.category.children ? <Menu model={props.category.children} /> : null}
    </li>);
}