import m from "mithril";
import Make from "./types/Make";
import MakeExtend from "./types/MakeExtend";
import Piano from "./types/Piano";
import pianodb from "./models/pianodb";
import MakeInfo from "./views/MakeInfo";
import Pianos from "./views/Pianos";

export default function() {
    let makes: Make[] = [];
    let make: MakeExtend;
    let width: number;
    let height: number;
    let pianos: Piano[] = [];
    let grandPianos: Piano[] = [];
    let uprightPianos: Piano[] = [];
    const getMakes = () => pianodb.getMakes().then(reply => makes = reply);
    const getMake = (id: number) => {
        pianodb.getMake(id).then(reply => {
            make = reply;
            width = make.videoWidth;
            height = make.videoHeight;
            if (window.outerWidth < width) {
                const scale: number = height / width;
                width = Math.floor(window.outerWidth * .975);
                height = Math.floor(width * scale);
            }
            pianodb.getPianos(id).then(reply => {
                pianos = reply;
                grandPianos = pianos.filter((piano: Piano) => piano.type === 'Grand');
                uprightPianos = pianos.filter((piano: Piano) => piano.type === 'Upright');
            });
        });
    };

    return {
        oninit: getMakes,
        view: () => {
            return [
                m(".mh2.f7.sans-serif", [
                    m("header.flex.flex-wrap.mb2", [
                        m("a.no-underline.near-black.f4.mt2.mr2.fw9.avenir.tracked-tight", {href: ""}, "pianod♭"),
                        m("nav.mr2", [
                            m("select.mt2.pv1.w-15", {name: "makes", onchange: (e: any) => getMake(e.target.value)}, [
                                m("option.dn", {value: ""}, "Select a make"),
                                makes.map((makeNotShadow: Make) => {return m("option", {value: makeNotShadow.id}, makeNotShadow.name);})
                            ])
                        ]),
                        m('',
                            m('a.link.dim.br1.ph3.pv2.mt2.dib.white.bg-dark-pink', {href: pianodb.openAPI}, "API")
                        ),
                        m(MakeInfo, {"make": make ? make : undefined})
                    ]),
                    m('', make ? [
                        m("main.flex.flex-wrap", [
                            m(Pianos, {"pianos": grandPianos}),
                            m(Pianos, {"pianos": uprightPianos}),
                            m("iframe#video.bn", {
                                allowFullscreen: true,
                                style: "object-fit: contain",
                                src: make.video,
                                width: width.toString(),
                                height: height.toString()
                            })
                        ])
                    ] : ''),
                ])
            ];
        }
    }
};