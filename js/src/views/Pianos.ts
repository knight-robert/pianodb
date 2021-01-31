import m from "mithril";
import Piano from "../types/Piano";

export default function() {
    const getMetric = (size: number) => size !== 0 ? `${size} cm` : 'N/A';
    const getImperial = (size: number) => {
        if (size === 0) return 'N/A';
        const sizeInInches: number = parseInt((size / 2.54).toFixed(0));
        const feet: number = Math.floor(sizeInInches / 12);
        const inches: number = sizeInInches % 12;
        return `${feet}'${inches}"`;
    };

    return {
        view: (vnode: any) => {
            return [
                m('table.collapse.ba.br2.b--black-10.pv2.ph3', [
                    m('thead', [
                        m('tr.striped--light-silver', [
                            m('th.tl.f6.ttu.fw6.pv2.ph3', 'Model'),
                            m('th.tr.f6.ttu.fw6.pv2.ph3', 'Size'),
                            m('th.tr.f6.ttu.fw6.pv2.ph3', 'Type')
                        ])
                    ]),
                    m('tbody', [
                        vnode.attrs.pianos.map((piano: Piano) => {
                            return m('tr.stripe-dark', [
                                m('td.tl.pv2.ph3', piano.model),
                                m('td.tr.pv2.ph3', getMetric(piano.size)),
                                m('td.tr.pv2.ph3', piano.type)
                            ])
                        })
                    ])
                ])
            ];
        }
    }
};