import m from "mithril";

export default function() {
    return {
        view: (vnode: any) => {
            return [
                m('', vnode.attrs.make !== undefined ? [
                    m('img.mt1.h2.mw4.br1.ph3.pv2.dib.bg-light-blue', {src: vnode.attrs.make.logo})
                ] : ''),
                m('', vnode.attrs.make !== undefined ? [
                    m('a.link.dim.br1.ph3.pv2.mt2.dib.white.bg-purple', {href: vnode.attrs.make.website}, vnode.attrs.make.website.replace(/^https?:\/\/www\./i, ""))
                ] : ''),
                m('', vnode.attrs.make !== undefined ? [
                    m('.link.br1.ph3.pv2.mt2.white.bg-dark-gray', `established in ${vnode.attrs.make.established}`),
                ] : '')
            ];
        }
    }
};