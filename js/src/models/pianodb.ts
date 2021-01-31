import m from "mithril";
import Make from "../types/Make";
import MakeExtend from "../types/MakeExtend";
import Piano from "../types/Piano";

export default {
    link: "http://localhost:8080/",
    // link: "https://www.pianodb.com:8081/",
    openAPI: "https://app.swaggerhub.com/apis/rknight/pianodb.com/1.0.0",
    getMakes(): Promise<Make[]> { return m.request({url: this.link + "makes"}) },
    getMake(id: number): Promise<MakeExtend> { return m.request({url: `${this.link}make/${id}`}) },
    getPianos(id: number): Promise<Piano[]> { return m.request({url: `${this.link}pianos/${id}`}) }
};