if (typeof wp.blockEditor !== "undefined") {
    const {registerBlockType: e, getBlockType: t} = wp.blocks;
    const {__: a} = wp.i18n;
    const {useState: l, useEffect: n} = wp.element;
    const c = wp.apiFetch;
    const {InspectorControls: s} = wp.blockEditor;
    const {PanelBody: o, ToggleControl: m, SelectControl: i, RangeControl: g, Placeholder: r, Spinner: d, TextControl: b} = wp.components;
    if (!t("pbc/badges-block")) {
        e("pbc/badges-block", {
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
                    default: true
                },
                showBadgeImage: {
                    type: "boolean",
                    default: true
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
                const {layout: h, showBadgeName: u, showBadgeImage: p, columns: w, imageWidth: E, imageMaxWidth: R} = e;
                const [y, f] = l(null);
                const [k, v] = l(true);
                n((() => {
                    c({
                        path: "/pathwise-badge-connect/v1/user-badges"
                    }).then((e => {
                        if (e && e.badges) {
                            f(e.badges);
                        } else {
                            f([]);
                        }
                        v(false);
                    })).catch((e => {
                        console.error("Error fetching badges:", e);
                        f([]);
                        v(false);
                    }));
                }), []);
                if (k) {
                    return React.createElement(r, null, React.createElement(d, null));
                }
                return React.createElement(React.Fragment, null, React.createElement(s, null, React.createElement(o, {
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
                }), React.createElement(m, {
                    label: a("Show Badge Name", "pathwise-badge-connect"),
                    checked: u,
                    onChange: e => t({
                        showBadgeName: e
                    })
                }), React.createElement(m, {
                    label: a("Show Badge Image", "pathwise-badge-connect"),
                    checked: p,
                    onChange: e => t({
                        showBadgeImage: e
                    })
                }), (h === "grid" || h === "table") && React.createElement(g, {
                    label: a("Columns", "pathwise-badge-connect"),
                    value: w,
                    onChange: e => t({
                        columns: e
                    }),
                    min: 1,
                    max: 5
                }), p && React.createElement(React.Fragment, null, React.createElement(b, {
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
                })))), h === "grid" && React.createElement("div", {
                    className: `pbc-badges-block grid`,
                    style: {
                        "--columns": w
                    }
                }, y && y.length > 0 ? y.map((e => React.createElement("div", {
                    className: "badge-item",
                    key: e.id
                }, p && React.createElement("img", {
                    src: e.image,
                    alt: e.name,
                    style: {
                        width: E,
                        maxWidth: R
                    }
                }), u && React.createElement("span", null, e.name)))) : React.createElement("p", null, a("No badges available.", "pathwise-badge-connect"))), h === "table" && React.createElement("table", {
                    className: "pbc-badges-block table",
                    style: {
                        "--columns": w
                    }
                }, React.createElement("tbody", null, y && y.length > 0 ? y.map(((e, t) => {
                    const a = t % w === 0;
                    const l = (t + 1) % w === 0 || t === y.length - 1;
                    return React.createElement(React.Fragment, null, a && React.createElement("tr", {
                        key: `row-start-${t}`
                    }), React.createElement("td", {
                        className: "badge-item",
                        key: t
                    }, p && React.createElement("img", {
                        src: e.image,
                        alt: e.name,
                        style: {
                            width: E,
                            maxWidth: R
                        }
                    }), u && React.createElement("span", null, e.name)), l && React.createElement("tr", {
                        key: `row-end-${t}`
                    }));
                })) : React.createElement("tr", null, React.createElement("td", null, a("No badges available.", "pathwise-badge-connect"))))), h === "list" && React.createElement("ul", {
                    className: "pbc-badges-block list"
                }, y && y.length > 0 ? y.map(((e, t) => React.createElement("li", {
                    className: "badge-item",
                    key: t
                }, p && React.createElement("img", {
                    src: e.image,
                    alt: e.name,
                    style: {
                        width: E,
                        maxWidth: R
                    }
                }), u && React.createElement("span", null, e.name)))) : React.createElement("li", null, a("No badges available.", "pathwise-badge-connect"))));
            },
            save() {
                return null;
            }
        });
    }
}
//# sourceMappingURL=badges-block.js.map
