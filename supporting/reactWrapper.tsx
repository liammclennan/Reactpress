import { render as singleRender } from "../templates/Single";
import { render as homeRender } from "../templates/Home";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {apiFactory} from "./api";
declare function require(name:string);
var config = require("../config");

export function home(fetch, cache) {
  cache = cache || {};
  let renderResult = homeRender(apiFactory(fetch, cache, ""));
  return renderResult.then((result) => {
    return {
      result, cache
    };
  });
}

export function single(slug, fetch, cache) {
  cache = cache || {};
  let renderResult = singleRender(apiFactory(fetch, cache, slug));
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
