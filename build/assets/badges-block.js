if (void 0 !== wp.blockEditor) {
    const {registerBlockType: e, getBlockType: t} = wp.blocks, {__: a} = wp.i18n, {useState: l, useEffect: c} = wp.element, n = wp.apiFetch, {InspectorControls: m} = wp.blockEditor, {PanelBody: s, ToggleControl: g, SelectControl: i, RangeControl: o, Placeholder: d, Spinner: r, TextControl: b} = wp.components;
    t("pbc/badges-block") || e("pbc/badges-block", {
        title: a("User Badges", "pathwise-badge-connect"),
        icon: "awards",
        category: "widgets",
        attributes: {
            layout: {
                type: "string",
                default: "grid"
            },
            showBadgeName: {
                type: "boolean",
                default: !0
            },
            showBadgeImage: {
                type: "boolean",
                default: !0
            },
            columns: {
                type: "number",
                default: 3
            },
            imageWidth: {
                type: "string",
                default: "100%"
            },
            imageMaxWidth: {
                type: "string",
                default: "450px"
            }
        },
        edit({attributes: e, setAttributes: t}) {
            const {layout: h, showBadgeName: p, showBadgeImage: u, columns: w, imageWidth: E, imageMaxWidth: R} = e, [y, k] = l(null), [v, x] = l(!0);
            return c((() => {
                n({
                    path: "/pathwise-badge-connect/v1/user-badges"
                }).then((e => {
                    e && e.badges ? k(e.badges) : k([]), x(!1);
                })).catch((e => {
                    console.error("Error fetching badges:", e), k([]), x(!1);
                }));
            }), []), v ? React.createElement(d, null, React.createElement(r, null)) : React.createElement(React.Fragment, null, React.createElement(m, null, React.createElement(s, {
                title: a("Display Settings", "pathwise-badge-connect")
            }, React.createElement(i, {
                label: a("Layout", "pathwise-badge-connect"),
                value: h,
                options: [ {
                    label: "Grid",
                    value: "grid"
                }, {
                    label: "Table",
                    value: "table"
                }, {
                    label: "List",
                    value: "list"
                } ],
                onChange: e => t({
                    layout: e
                })
            }), React.createElement(g, {
                label: a("Show Badge Name", "pathwise-badge-connect"),
                checked: p,
                onChange: e => t({
                    showBadgeName: e
                })
            }), React.createElement(g, {
                label: a("Show Badge Image", "pathwise-badge-connect"),
                checked: u,
                onChange: e => t({
                    showBadgeImage: e
                })
            }), ("grid" === h || "table" === h) && React.createElement(o, {
                label: a("Columns", "pathwise-badge-connect"),
                value: w,
                onChange: e => t({
                    columns: e
                }),
                min: 1,
                max: 5
            }), u && React.createElement(React.Fragment, null, React.createElement(b, {
                label: a("Image Width", "pathwise-badge-connect"),
                value: E,
                onChange: e => t({
                    imageWidth: e
                }),
                help: a("Set the width of the badge image (e.g., 100%, 200px).")
            }), React.createElement(b, {
                label: a("Image Max Width", "pathwise-badge-connect"),
                value: R,
                onChange: e => t({
                    imageMaxWidth: e
                }),
                help: a("Set the maximum width of the badge image (e.g., 450px).")
            })))), "grid" === h && React.createElement("div", {
                className: "pbc-badges-block grid",
                style: {
                    "--columns": w
                }
            }, y && y.length > 0 ? y.map((e => React.createElement("div", {
                className: "badge-item",
                key: e.id
            }, u && React.createElement("img", {
                src: e.image,
                alt: e.name,
                style: {
                    width: E,
                    maxWidth: R
                }
            }), p && React.createElement("span", null, e.name)))) : React.createElement("p", null, a("No badges available.", "pathwise-badge-connect"))), "table" === h && React.createElement("table", {
                className: "pbc-badges-block table",
                style: {
                    "--columns": w
                }
            }, React.createElement("tbody", null, y && y.length > 0 ? y.map(((e, t) => {
                const a = t % w == 0, l = (t + 1) % w == 0 || t === y.length - 1;
                return React.createElement(React.Fragment, null, a && React.createElement("tr", {
                    key: `row-start-${t}`
                }), React.createElement("td", {
                    className: "badge-item",
                    key: t
                }, u && React.createElement("img", {
                    src: e.image,
                    alt: e.name,
                    style: {
                        width: E,
                        maxWidth: R
                    }
                }), p && React.createElement("span", null, e.name)), l && React.createElement("tr", {
                    key: `row-end-${t}`
                }));
            })) : React.createElement("tr", null, React.createElement("td", null, a("No badges available.", "pathwise-badge-connect"))))), "list" === h && React.createElement("ul", {
                className: "pbc-badges-block list"
            }, y && y.length > 0 ? y.map(((e, t) => React.createElement("li", {
                className: "badge-item",
                key: t
            }, u && React.createElement("img", {
                src: e.image,
                alt: e.name,
                style: {
                    width: E,
                    maxWidth: R
                }
            }), p && React.createElement("span", null, e.name)))) : React.createElement("li", null, a("No badges available.", "pathwise-badge-connect"))));
        },
        save: () => null
    });
}
//# sourceMappingURL=badges-block.js.map
