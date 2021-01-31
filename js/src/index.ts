import m from "mithril";
import Blueprint from "./Blueprint";

m.route(document.body, "/", {
    "/": {
        render: () => {
            return m(Blueprint);
        }
    }
});