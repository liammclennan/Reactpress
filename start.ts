import * as reactWrapper from "./supporting/reactWrapper";

if (typeof window !== "undefined") {
    window["renderSingleIn"] = function (slug, containerId, cache) {
        reactWrapper.single(slug, fetch, cache).then(({result}) => {
            reactWrapper.renderIn(containerId, result);
        });
    };
}

