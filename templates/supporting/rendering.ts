import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

interface ComponentWithProps {
    component: any,
    props: any
}

export function serverRender({component, props}) {
    let factory = React.createFactory(component);
    return ReactDOMServer.renderToString(factory(props));
}