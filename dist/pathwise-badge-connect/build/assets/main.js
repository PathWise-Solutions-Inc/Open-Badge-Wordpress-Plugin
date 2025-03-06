/* empty css             */

/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function e(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return e => e in t;
}

const t = {};

const n = [];

const s = () => {};

const r = () => false;

const o = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);

const i = e => e.startsWith("onUpdate:");

const a = Object.assign;

const c = (e, t) => {
    const n = e.indexOf(t);
    if (n > -1) {
        e.splice(n, 1);
    }
};

const l = Object.prototype.hasOwnProperty;

const f = (e, t) => l.call(e, t);

const u = Array.isArray;

const d = e => x(e) === "[object Map]";

const p = e => x(e) === "[object Set]";

const h = e => x(e) === "[object Date]";

const g = e => typeof e === "function";

const m = e => typeof e === "string";

const v = e => typeof e === "symbol";

const y = e => e !== null && typeof e === "object";

const b = e => (y(e) || g(e)) && g(e.then) && g(e.catch);

const w = Object.prototype.toString;

const x = e => w.call(e);

const _ = e => x(e).slice(8, -1);

const k = e => x(e) === "[object Object]";

const C = e => m(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;

const S = e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");

const O = e => {
    const t = Object.create(null);
    return n => {
        const s = t[n];
        return s || (t[n] = e(n));
    };
};

const E = /-(\w)/g;

const A = O((e => e.replace(E, ((e, t) => t ? t.toUpperCase() : ""))));

const P = /\B([A-Z])/g;

const j = O((e => e.replace(P, "-$1").toLowerCase()));

const T = O((e => e.charAt(0).toUpperCase() + e.slice(1)));

const I = O((e => {
    const t = e ? `on${T(e)}` : ``;
    return t;
}));

const N = (e, t) => !Object.is(e, t);

const L = (e, ...t) => {
    for (let n = 0; n < e.length; n++) {
        e[n](...t);
    }
};

const M = (e, t, n, s = false) => {
    Object.defineProperty(e, t, {
        configurable: true,
        enumerable: false,
        writable: s,
        value: n
    });
};

const F = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
};

const D = e => {
    const t = m(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
};

let R;

const B = () => R || (R = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});

function $(e) {
    if (u(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n];
            const r = m(s) ? W(s) : $(s);
            if (r) {
                for (const e in r) {
                    t[e] = r[e];
                }
            }
        }
        return t;
    } else if (m(e) || y(e)) {
        return e;
    }
}

const z = /;(?![^(]*\))/g;

const V = /:([^]+)/;

const U = /\/\*[^]*?\*\//g;

function W(e) {
    const t = {};
    e.replace(U, "").split(z).forEach((e => {
        if (e) {
            const n = e.split(V);
            n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
    }));
    return t;
}

function G(e) {
    let t = "";
    if (m(e)) {
        t = e;
    } else if (u(e)) {
        for (let n = 0; n < e.length; n++) {
            const s = G(e[n]);
            if (s) {
                t += s + " ";
            }
        }
    } else if (y(e)) {
        for (const n in e) {
            if (e[n]) {
                t += n + " ";
            }
        }
    }
    return t.trim();
}

const q = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;

const H = e(q);

function K(e) {
    return !!e || e === "";
}

function Q(e, t) {
    if (e.length !== t.length) return false;
    let n = true;
    for (let s = 0; n && s < e.length; s++) {
        n = X(e[s], t[s]);
    }
    return n;
}

function X(e, t) {
    if (e === t) return true;
    let n = h(e);
    let s = h(t);
    if (n || s) {
        return n && s ? e.getTime() === t.getTime() : false;
    }
    n = v(e);
    s = v(t);
    if (n || s) {
        return e === t;
    }
    n = u(e);
    s = u(t);
    if (n || s) {
        return n && s ? Q(e, t) : false;
    }
    n = y(e);
    s = y(t);
    if (n || s) {
        if (!n || !s) {
            return false;
        }
        const r = Object.keys(e).length;
        const o = Object.keys(t).length;
        if (r !== o) {
            return false;
        }
        for (const n in e) {
            const s = e.hasOwnProperty(n);
            const r = t.hasOwnProperty(n);
            if (s && !r || !s && r || !X(e[n], t[n])) {
                return false;
            }
        }
    }
    return String(e) === String(t);
}

function Y(e, t) {
    return e.findIndex((e => X(e, t)));
}

const J = e => !!(e && e["__v_isRef"] === true);

const Z = e => m(e) ? e : e == null ? "" : u(e) || y(e) && (e.toString === w || !g(e.toString)) ? J(e) ? Z(e.value) : JSON.stringify(e, ee, 2) : String(e);

const ee = (e, t) => {
    if (J(t)) {
        return ee(e, t.value);
    } else if (d(t)) {
        return {
            [`Map(${t.size})`]: [ ...t.entries() ].reduce(((e, [t, n], s) => {
                e[te(t, s) + " =>"] = n;
                return e;
            }), {})
        };
    } else if (p(t)) {
        return {
            [`Set(${t.size})`]: [ ...t.values() ].map((e => te(e)))
        };
    } else if (v(t)) {
        return te(t);
    } else if (y(t) && !u(t) && !k(t)) {
        return String(t);
    }
    return t;
};

const te = (e, t = "") => {
    var n;
    return v(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};

/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ let ne;

class se {
    constructor(e = false) {
        this.detached = e;
        this._active = true;
        this.effects = [];
        this.cleanups = [];
        this._isPaused = false;
        this.parent = ne;
        if (!e && ne) {
            this.index = (ne.scopes || (ne.scopes = [])).push(this) - 1;
        }
    }
    get active() {
        return this._active;
    }
    pause() {
        if (this._active) {
            this._isPaused = true;
            let e, t;
            if (this.scopes) {
                for (e = 0, t = this.scopes.length; e < t; e++) {
                    this.scopes[e].pause();
                }
            }
            for (e = 0, t = this.effects.length; e < t; e++) {
                this.effects[e].pause();
            }
        }
    }
    resume() {
        if (this._active) {
            if (this._isPaused) {
                this._isPaused = false;
                let e, t;
                if (this.scopes) {
                    for (e = 0, t = this.scopes.length; e < t; e++) {
                        this.scopes[e].resume();
                    }
                }
                for (e = 0, t = this.effects.length; e < t; e++) {
                    this.effects[e].resume();
                }
            }
        }
    }
    run(e) {
        if (this._active) {
            const t = ne;
            try {
                ne = this;
                return e();
            } finally {
                ne = t;
            }
        }
    }
    on() {
        ne = this;
    }
    off() {
        ne = this.parent;
    }
    stop(e) {
        if (this._active) {
            this._active = false;
            let t, n;
            for (t = 0, n = this.effects.length; t < n; t++) {
                this.effects[t].stop();
            }
            this.effects.length = 0;
            for (t = 0, n = this.cleanups.length; t < n; t++) {
                this.cleanups[t]();
            }
            this.cleanups.length = 0;
            if (this.scopes) {
                for (t = 0, n = this.scopes.length; t < n; t++) {
                    this.scopes[t].stop(true);
                }
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !e) {
                const e = this.parent.scopes.pop();
                if (e && e !== this) {
                    this.parent.scopes[this.index] = e;
                    e.index = this.index;
                }
            }
            this.parent = void 0;
        }
    }
}

function re(e) {
    return new se(e);
}

function oe() {
    return ne;
}

let ie;

const ae = new WeakSet;

class ce {
    constructor(e) {
        this.fn = e;
        this.deps = void 0;
        this.depsTail = void 0;
        this.flags = 1 | 4;
        this.next = void 0;
        this.cleanup = void 0;
        this.scheduler = void 0;
        if (ne && ne.active) {
            ne.effects.push(this);
        }
    }
    pause() {
        this.flags |= 64;
    }
    resume() {
        if (this.flags & 64) {
            this.flags &= -65;
            if (ae.has(this)) {
                ae.delete(this);
                this.trigger();
            }
        }
    }
    notify() {
        if (this.flags & 2 && !(this.flags & 32)) {
            return;
        }
        if (!(this.flags & 8)) {
            de(this);
        }
    }
    run() {
        if (!(this.flags & 1)) {
            return this.fn();
        }
        this.flags |= 2;
        Se(this);
        ge(this);
        const e = ie;
        const t = xe;
        ie = this;
        xe = true;
        try {
            return this.fn();
        } finally {
            me(this);
            ie = e;
            xe = t;
            this.flags &= -3;
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let e = this.deps; e; e = e.nextDep) {
                be(e);
            }
            this.deps = this.depsTail = void 0;
            Se(this);
            this.onStop && this.onStop();
            this.flags &= -2;
        }
    }
    trigger() {
        if (this.flags & 64) {
            ae.add(this);
        } else if (this.scheduler) {
            this.scheduler();
        } else {
            this.runIfDirty();
        }
    }
    runIfDirty() {
        if (ve(this)) {
            this.run();
        }
    }
    get dirty() {
        return ve(this);
    }
}

let le = 0;

let fe;

let ue;

function de(e, t = false) {
    e.flags |= 8;
    if (t) {
        e.next = ue;
        ue = e;
        return;
    }
    e.next = fe;
    fe = e;
}

function pe() {
    le++;
}

function he() {
    if (--le > 0) {
        return;
    }
    if (ue) {
        let e = ue;
        ue = void 0;
        while (e) {
            const t = e.next;
            e.next = void 0;
            e.flags &= -9;
            e = t;
        }
    }
    let e;
    while (fe) {
        let n = fe;
        fe = void 0;
        while (n) {
            const s = n.next;
            n.next = void 0;
            n.flags &= -9;
            if (n.flags & 1) {
                try {
                    n.trigger();
                } catch (t) {
                    if (!e) e = t;
                }
            }
            n = s;
        }
    }
    if (e) throw e;
}

function ge(e) {
    for (let t = e.deps; t; t = t.nextDep) {
        t.version = -1;
        t.prevActiveLink = t.dep.activeLink;
        t.dep.activeLink = t;
    }
}

function me(e) {
    let t;
    let n = e.depsTail;
    let s = n;
    while (s) {
        const e = s.prevDep;
        if (s.version === -1) {
            if (s === n) n = e;
            be(s);
            we(s);
        } else {
            t = s;
        }
        s.dep.activeLink = s.prevActiveLink;
        s.prevActiveLink = void 0;
        s = e;
    }
    e.deps = t;
    e.depsTail = n;
}

function ve(e) {
    for (let t = e.deps; t; t = t.nextDep) {
        if (t.dep.version !== t.version || t.dep.computed && (ye(t.dep.computed) || t.dep.version !== t.version)) {
            return true;
        }
    }
    if (e._dirty) {
        return true;
    }
    return false;
}

function ye(e) {
    if (e.flags & 4 && !(e.flags & 16)) {
        return;
    }
    e.flags &= -17;
    if (e.globalVersion === Oe) {
        return;
    }
    e.globalVersion = Oe;
    const t = e.dep;
    e.flags |= 2;
    if (t.version > 0 && !e.isSSR && e.deps && !ve(e)) {
        e.flags &= -3;
        return;
    }
    const n = ie;
    const s = xe;
    ie = e;
    xe = true;
    try {
        ge(e);
        const n = e.fn(e._value);
        if (t.version === 0 || N(n, e._value)) {
            e._value = n;
            t.version++;
        }
    } catch (r) {
        t.version++;
        throw r;
    } finally {
        ie = n;
        xe = s;
        me(e);
        e.flags &= -3;
    }
}

function be(e, t = false) {
    const {dep: n, prevSub: s, nextSub: r} = e;
    if (s) {
        s.nextSub = r;
        e.prevSub = void 0;
    }
    if (r) {
        r.prevSub = s;
        e.nextSub = void 0;
    }
    if (n.subs === e) {
        n.subs = s;
        if (!s && n.computed) {
            n.computed.flags &= -5;
            for (let e = n.computed.deps; e; e = e.nextDep) {
                be(e, true);
            }
        }
    }
    if (!t && ! --n.sc && n.map) {
        n.map.delete(n.key);
    }
}

function we(e) {
    const {prevDep: t, nextDep: n} = e;
    if (t) {
        t.nextDep = n;
        e.prevDep = void 0;
    }
    if (n) {
        n.prevDep = t;
        e.nextDep = void 0;
    }
}

let xe = true;

const _e = [];

function ke() {
    _e.push(xe);
    xe = false;
}

function Ce() {
    const e = _e.pop();
    xe = e === void 0 ? true : e;
}

function Se(e) {
    const {cleanup: t} = e;
    e.cleanup = void 0;
    if (t) {
        const e = ie;
        ie = void 0;
        try {
            t();
        } finally {
            ie = e;
        }
    }
}

let Oe = 0;

class Ee {
    constructor(e, t) {
        this.sub = e;
        this.dep = t;
        this.version = t.version;
        this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
}

class Ae {
    constructor(e) {
        this.computed = e;
        this.version = 0;
        this.activeLink = void 0;
        this.subs = void 0;
        this.map = void 0;
        this.key = void 0;
        this.sc = 0;
    }
    track(e) {
        if (!ie || !xe || ie === this.computed) {
            return;
        }
        let t = this.activeLink;
        if (t === void 0 || t.sub !== ie) {
            t = this.activeLink = new Ee(ie, this);
            if (!ie.deps) {
                ie.deps = ie.depsTail = t;
            } else {
                t.prevDep = ie.depsTail;
                ie.depsTail.nextDep = t;
                ie.depsTail = t;
            }
            Pe(t);
        } else if (t.version === -1) {
            t.version = this.version;
            if (t.nextDep) {
                const e = t.nextDep;
                e.prevDep = t.prevDep;
                if (t.prevDep) {
                    t.prevDep.nextDep = e;
                }
                t.prevDep = ie.depsTail;
                t.nextDep = void 0;
                ie.depsTail.nextDep = t;
                ie.depsTail = t;
                if (ie.deps === t) {
                    ie.deps = e;
                }
            }
        }
        return t;
    }
    trigger(e) {
        this.version++;
        Oe++;
        this.notify(e);
    }
    notify(e) {
        pe();
        try {
            if (false) ;
            for (let e = this.subs; e; e = e.prevSub) {
                if (e.sub.notify()) {
                    e.sub.dep.notify();
                }
            }
        } finally {
            he();
        }
    }
}

function Pe(e) {
    e.dep.sc++;
    if (e.sub.flags & 4) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 4 | 16;
            for (let e = t.deps; e; e = e.nextDep) {
                Pe(e);
            }
        }
        const n = e.dep.subs;
        if (n !== e) {
            e.prevSub = n;
            if (n) n.nextSub = e;
        }
        e.dep.subs = e;
    }
}

const je = new WeakMap;

const Te = Symbol("");

const Ie = Symbol("");

const Ne = Symbol("");

function Le(e, t, n) {
    if (xe && ie) {
        let t = je.get(e);
        if (!t) {
            je.set(e, t = new Map);
        }
        let s = t.get(n);
        if (!s) {
            t.set(n, s = new Ae);
            s.map = t;
            s.key = n;
        }
        {
            s.track();
        }
    }
}

function Me(e, t, n, s, r, o) {
    const i = je.get(e);
    if (!i) {
        Oe++;
        return;
    }
    const a = e => {
        if (e) {
            {
                e.trigger();
            }
        }
    };
    pe();
    if (t === "clear") {
        i.forEach(a);
    } else {
        const r = u(e);
        const o = r && C(n);
        if (r && n === "length") {
            const e = Number(s);
            i.forEach(((t, n) => {
                if (n === "length" || n === Ne || !v(n) && n >= e) {
                    a(t);
                }
            }));
        } else {
            if (n !== void 0 || i.has(void 0)) {
                a(i.get(n));
            }
            if (o) {
                a(i.get(Ne));
            }
            switch (t) {
              case "add":
                if (!r) {
                    a(i.get(Te));
                    if (d(e)) {
                        a(i.get(Ie));
                    }
                } else if (o) {
                    a(i.get("length"));
                }
                break;

              case "delete":
                if (!r) {
                    a(i.get(Te));
                    if (d(e)) {
                        a(i.get(Ie));
                    }
                }
                break;

              case "set":
                if (d(e)) {
                    a(i.get(Te));
                }
                break;
            }
        }
    }
    he();
}

function Fe(e) {
    const t = Ot(e);
    if (t === e) return t;
    Le(t, "iterate", Ne);
    return Ct(e) ? t : t.map(At);
}

function De(e) {
    Le(e = Ot(e), "iterate", Ne);
    return e;
}

const Re = {
    __proto__: null,
    [Symbol.iterator]() {
        return Be(this, Symbol.iterator, At);
    },
    concat(...e) {
        return Fe(this).concat(...e.map((e => u(e) ? Fe(e) : e)));
    },
    entries() {
        return Be(this, "entries", (e => {
            e[1] = At(e[1]);
            return e;
        }));
    },
    every(e, t) {
        return ze(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
        return ze(this, "filter", e, t, (e => e.map(At)), arguments);
    },
    find(e, t) {
        return ze(this, "find", e, t, At, arguments);
    },
    findIndex(e, t) {
        return ze(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
        return ze(this, "findLast", e, t, At, arguments);
    },
    findLastIndex(e, t) {
        return ze(this, "findLastIndex", e, t, void 0, arguments);
    },
    forEach(e, t) {
        return ze(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
        return Ue(this, "includes", e);
    },
    indexOf(...e) {
        return Ue(this, "indexOf", e);
    },
    join(e) {
        return Fe(this).join(e);
    },
    lastIndexOf(...e) {
        return Ue(this, "lastIndexOf", e);
    },
    map(e, t) {
        return ze(this, "map", e, t, void 0, arguments);
    },
    pop() {
        return We(this, "pop");
    },
    push(...e) {
        return We(this, "push", e);
    },
    reduce(e, ...t) {
        return Ve(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
        return Ve(this, "reduceRight", e, t);
    },
    shift() {
        return We(this, "shift");
    },
    some(e, t) {
        return ze(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
        return We(this, "splice", e);
    },
    toReversed() {
        return Fe(this).toReversed();
    },
    toSorted(e) {
        return Fe(this).toSorted(e);
    },
    toSpliced(...e) {
        return Fe(this).toSpliced(...e);
    },
    unshift(...e) {
        return We(this, "unshift", e);
    },
    values() {
        return Be(this, "values", At);
    }
};

function Be(e, t, n) {
    const s = De(e);
    const r = s[t]();
    if (s !== e && !Ct(e)) {
        r._next = r.next;
        r.next = () => {
            const e = r._next();
            if (e.value) {
                e.value = n(e.value);
            }
            return e;
        };
    }
    return r;
}

const $e = Array.prototype;

function ze(e, t, n, s, r, o) {
    const i = De(e);
    const a = i !== e && !Ct(e);
    const c = i[t];
    if (c !== $e[t]) {
        const t = c.apply(e, o);
        return a ? At(t) : t;
    }
    let l = n;
    if (i !== e) {
        if (a) {
            l = function(t, s) {
                return n.call(this, At(t), s, e);
            };
        } else if (n.length > 2) {
            l = function(t, s) {
                return n.call(this, t, s, e);
            };
        }
    }
    const f = c.call(i, l, s);
    return a && r ? r(f) : f;
}

function Ve(e, t, n, s) {
    const r = De(e);
    let o = n;
    if (r !== e) {
        if (!Ct(e)) {
            o = function(t, s, r) {
                return n.call(this, t, At(s), r, e);
            };
        } else if (n.length > 3) {
            o = function(t, s, r) {
                return n.call(this, t, s, r, e);
            };
        }
    }
    return r[t](o, ...s);
}

function Ue(e, t, n) {
    const s = Ot(e);
    Le(s, "iterate", Ne);
    const r = s[t](...n);
    if ((r === -1 || r === false) && St(n[0])) {
        n[0] = Ot(n[0]);
        return s[t](...n);
    }
    return r;
}

function We(e, t, n = []) {
    ke();
    pe();
    const s = Ot(e)[t].apply(e, n);
    he();
    Ce();
    return s;
}

const Ge = e(`__proto__,__v_isRef,__isVue`);

const qe = new Set(Object.getOwnPropertyNames(Symbol).filter((e => e !== "arguments" && e !== "caller")).map((e => Symbol[e])).filter(v));

function He(e) {
    if (!v(e)) e = String(e);
    const t = Ot(this);
    Le(t, "has", e);
    return t.hasOwnProperty(e);
}

class Ke {
    constructor(e = false, t = false) {
        this._isReadonly = e;
        this._isShallow = t;
    }
    get(e, t, n) {
        if (t === "__v_skip") return e["__v_skip"];
        const s = this._isReadonly, r = this._isShallow;
        if (t === "__v_isReactive") {
            return !s;
        } else if (t === "__v_isReadonly") {
            return s;
        } else if (t === "__v_isShallow") {
            return r;
        } else if (t === "__v_raw") {
            if (n === (s ? r ? ht : pt : r ? dt : ut).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n)) {
                return e;
            }
            return;
        }
        const o = u(e);
        if (!s) {
            let e;
            if (o && (e = Re[t])) {
                return e;
            }
            if (t === "hasOwnProperty") {
                return He;
            }
        }
        const i = Reflect.get(e, t, jt(e) ? e : n);
        if (v(t) ? qe.has(t) : Ge(t)) {
            return i;
        }
        if (!s) {
            Le(e, "get", t);
        }
        if (r) {
            return i;
        }
        if (jt(i)) {
            return o && C(t) ? i : i.value;
        }
        if (y(i)) {
            return s ? bt(i) : vt(i);
        }
        return i;
    }
}

class Qe extends Ke {
    constructor(e = false) {
        super(false, e);
    }
    set(e, t, n, s) {
        let r = e[t];
        if (!this._isShallow) {
            const t = kt(r);
            if (!Ct(n) && !kt(n)) {
                r = Ot(r);
                n = Ot(n);
            }
            if (!u(e) && jt(r) && !jt(n)) {
                if (t) {
                    return false;
                } else {
                    r.value = n;
                    return true;
                }
            }
        }
        const o = u(e) && C(t) ? Number(t) < e.length : f(e, t);
        const i = Reflect.set(e, t, n, jt(e) ? e : s);
        if (e === Ot(s)) {
            if (!o) {
                Me(e, "add", t, n);
            } else if (N(n, r)) {
                Me(e, "set", t, n);
            }
        }
        return i;
    }
    deleteProperty(e, t) {
        const n = f(e, t);
        e[t];
        const s = Reflect.deleteProperty(e, t);
        if (s && n) {
            Me(e, "delete", t, void 0);
        }
        return s;
    }
    has(e, t) {
        const n = Reflect.has(e, t);
        if (!v(t) || !qe.has(t)) {
            Le(e, "has", t);
        }
        return n;
    }
    ownKeys(e) {
        Le(e, "iterate", u(e) ? "length" : Te);
        return Reflect.ownKeys(e);
    }
}

class Xe extends Ke {
    constructor(e = false) {
        super(true, e);
    }
    set(e, t) {
        return true;
    }
    deleteProperty(e, t) {
        return true;
    }
}

const Ye = new Qe;

const Je = new Xe;

const Ze = new Qe(true);

const et = new Xe(true);

const tt = e => e;

const nt = e => Reflect.getPrototypeOf(e);

function st(e, t, n) {
    return function(...s) {
        const r = this["__v_raw"];
        const o = Ot(r);
        const i = d(o);
        const a = e === "entries" || e === Symbol.iterator && i;
        const c = e === "keys" && i;
        const l = r[e](...s);
        const f = n ? tt : t ? Pt : At;
        !t && Le(o, "iterate", c ? Ie : Te);
        return {
            next() {
                const {value: e, done: t} = l.next();
                return t ? {
                    value: e,
                    done: t
                } : {
                    value: a ? [ f(e[0]), f(e[1]) ] : f(e),
                    done: t
                };
            },
            [Symbol.iterator]() {
                return this;
            }
        };
    };
}

function rt(e) {
    return function(...t) {
        return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
}

function ot(e, t) {
    const n = {
        get(n) {
            const s = this["__v_raw"];
            const r = Ot(s);
            const o = Ot(n);
            if (!e) {
                if (N(n, o)) {
                    Le(r, "get", n);
                }
                Le(r, "get", o);
            }
            const {has: i} = nt(r);
            const a = t ? tt : e ? Pt : At;
            if (i.call(r, n)) {
                return a(s.get(n));
            } else if (i.call(r, o)) {
                return a(s.get(o));
            } else if (s !== r) {
                s.get(n);
            }
        },
        get size() {
            const t = this["__v_raw"];
            !e && Le(Ot(t), "iterate", Te);
            return Reflect.get(t, "size", t);
        },
        has(t) {
            const n = this["__v_raw"];
            const s = Ot(n);
            const r = Ot(t);
            if (!e) {
                if (N(t, r)) {
                    Le(s, "has", t);
                }
                Le(s, "has", r);
            }
            return t === r ? n.has(t) : n.has(t) || n.has(r);
        },
        forEach(n, s) {
            const r = this;
            const o = r["__v_raw"];
            const i = Ot(o);
            const a = t ? tt : e ? Pt : At;
            !e && Le(i, "iterate", Te);
            return o.forEach(((e, t) => n.call(s, a(e), a(t), r)));
        }
    };
    a(n, e ? {
        add: rt("add"),
        set: rt("set"),
        delete: rt("delete"),
        clear: rt("clear")
    } : {
        add(e) {
            if (!t && !Ct(e) && !kt(e)) {
                e = Ot(e);
            }
            const n = Ot(this);
            const s = nt(n);
            const r = s.has.call(n, e);
            if (!r) {
                n.add(e);
                Me(n, "add", e, e);
            }
            return this;
        },
        set(e, n) {
            if (!t && !Ct(n) && !kt(n)) {
                n = Ot(n);
            }
            const s = Ot(this);
            const {has: r, get: o} = nt(s);
            let i = r.call(s, e);
            if (!i) {
                e = Ot(e);
                i = r.call(s, e);
            }
            const a = o.call(s, e);
            s.set(e, n);
            if (!i) {
                Me(s, "add", e, n);
            } else if (N(n, a)) {
                Me(s, "set", e, n);
            }
            return this;
        },
        delete(e) {
            const t = Ot(this);
            const {has: n, get: s} = nt(t);
            let r = n.call(t, e);
            if (!r) {
                e = Ot(e);
                r = n.call(t, e);
            }
            s ? s.call(t, e) : void 0;
            const o = t.delete(e);
            if (r) {
                Me(t, "delete", e, void 0);
            }
            return o;
        },
        clear() {
            const e = Ot(this);
            const t = e.size !== 0;
            const n = e.clear();
            if (t) {
                Me(e, "clear", void 0, void 0);
            }
            return n;
        }
    });
    const s = [ "keys", "values", "entries", Symbol.iterator ];
    s.forEach((s => {
        n[s] = st(s, e, t);
    }));
    return n;
}

function it(e, t) {
    const n = ot(e, t);
    return (t, s, r) => {
        if (s === "__v_isReactive") {
            return !e;
        } else if (s === "__v_isReadonly") {
            return e;
        } else if (s === "__v_raw") {
            return t;
        }
        return Reflect.get(f(n, s) && s in t ? n : t, s, r);
    };
}

const at = {
    get: it(false, false)
};

const ct = {
    get: it(false, true)
};

const lt = {
    get: it(true, false)
};

const ft = {
    get: it(true, true)
};

const ut = new WeakMap;

const dt = new WeakMap;

const pt = new WeakMap;

const ht = new WeakMap;

function gt(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;

      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;

      default:
        return 0;
    }
}

function mt(e) {
    return e["__v_skip"] || !Object.isExtensible(e) ? 0 : gt(_(e));
}

function vt(e) {
    if (kt(e)) {
        return e;
    }
    return xt(e, false, Ye, at, ut);
}

function yt(e) {
    return xt(e, false, Ze, ct, dt);
}

function bt(e) {
    return xt(e, true, Je, lt, pt);
}

function wt(e) {
    return xt(e, true, et, ft, ht);
}

function xt(e, t, n, s, r) {
    if (!y(e)) {
        return e;
    }
    if (e["__v_raw"] && !(t && e["__v_isReactive"])) {
        return e;
    }
    const o = r.get(e);
    if (o) {
        return o;
    }
    const i = mt(e);
    if (i === 0) {
        return e;
    }
    const a = new Proxy(e, i === 2 ? s : n);
    r.set(e, a);
    return a;
}

function _t(e) {
    if (kt(e)) {
        return _t(e["__v_raw"]);
    }
    return !!(e && e["__v_isReactive"]);
}

function kt(e) {
    return !!(e && e["__v_isReadonly"]);
}

function Ct(e) {
    return !!(e && e["__v_isShallow"]);
}

function St(e) {
    return e ? !!e["__v_raw"] : false;
}

function Ot(e) {
    const t = e && e["__v_raw"];
    return t ? Ot(t) : e;
}

function Et(e) {
    if (!f(e, "__v_skip") && Object.isExtensible(e)) {
        M(e, "__v_skip", true);
    }
    return e;
}

const At = e => y(e) ? vt(e) : e;

const Pt = e => y(e) ? bt(e) : e;

function jt(e) {
    return e ? e["__v_isRef"] === true : false;
}

function Tt(e) {
    return Nt(e, false);
}

function It(e) {
    return Nt(e, true);
}

function Nt(e, t) {
    if (jt(e)) {
        return e;
    }
    return new Lt(e, t);
}

class Lt {
    constructor(e, t) {
        this.dep = new Ae;
        this["__v_isRef"] = true;
        this["__v_isShallow"] = false;
        this._rawValue = t ? e : Ot(e);
        this._value = t ? e : At(e);
        this["__v_isShallow"] = t;
    }
    get value() {
        {
            this.dep.track();
        }
        return this._value;
    }
    set value(e) {
        const t = this._rawValue;
        const n = this["__v_isShallow"] || Ct(e) || kt(e);
        e = n ? e : Ot(e);
        if (N(e, t)) {
            this._rawValue = e;
            this._value = n ? e : At(e);
            {
                this.dep.trigger();
            }
        }
    }
}

function Mt(e) {
    return jt(e) ? e.value : e;
}

const Ft = {
    get: (e, t, n) => t === "__v_raw" ? e : Mt(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        if (jt(r) && !jt(n)) {
            r.value = n;
            return true;
        } else {
            return Reflect.set(e, t, n, s);
        }
    }
};

function Dt(e) {
    return _t(e) ? e : new Proxy(e, Ft);
}

class Rt {
    constructor(e, t, n) {
        this.fn = e;
        this.setter = t;
        this._value = void 0;
        this.dep = new Ae(this);
        this.__v_isRef = true;
        this.deps = void 0;
        this.depsTail = void 0;
        this.flags = 16;
        this.globalVersion = Oe - 1;
        this.next = void 0;
        this.effect = this;
        this["__v_isReadonly"] = !t;
        this.isSSR = n;
    }
    notify() {
        this.flags |= 16;
        if (!(this.flags & 8) && ie !== this) {
            de(this, true);
            return true;
        }
    }
    get value() {
        const e = this.dep.track();
        ye(this);
        if (e) {
            e.version = this.dep.version;
        }
        return this._value;
    }
    set value(e) {
        if (this.setter) {
            this.setter(e);
        }
    }
}

function Bt(e, t, n = false) {
    let s;
    let r;
    if (g(e)) {
        s = e;
    } else {
        s = e.get;
        r = e.set;
    }
    const o = new Rt(s, r, n);
    return o;
}

const $t = {};

const zt = new WeakMap;

let Vt = void 0;

function Ut(e, t = false, n = Vt) {
    if (n) {
        let t = zt.get(n);
        if (!t) zt.set(n, t = []);
        t.push(e);
    }
}

function Wt(e, n, r = t) {
    const {immediate: o, deep: i, once: a, scheduler: l, augmentJob: f, call: d} = r;
    const p = e => {
        if (i) return e;
        if (Ct(e) || i === false || i === 0) return Gt(e, 1);
        return Gt(e);
    };
    let h;
    let m;
    let v;
    let y;
    let b = false;
    let w = false;
    if (jt(e)) {
        m = () => e.value;
        b = Ct(e);
    } else if (_t(e)) {
        m = () => p(e);
        b = true;
    } else if (u(e)) {
        w = true;
        b = e.some((e => _t(e) || Ct(e)));
        m = () => e.map((e => {
            if (jt(e)) {
                return e.value;
            } else if (_t(e)) {
                return p(e);
            } else if (g(e)) {
                return d ? d(e, 2) : e();
            } else ;
        }));
    } else if (g(e)) {
        if (n) {
            m = d ? () => d(e, 2) : e;
        } else {
            m = () => {
                if (v) {
                    ke();
                    try {
                        v();
                    } finally {
                        Ce();
                    }
                }
                const t = Vt;
                Vt = h;
                try {
                    return d ? d(e, 3, [ y ]) : e(y);
                } finally {
                    Vt = t;
                }
            };
        }
    } else {
        m = s;
    }
    if (n && i) {
        const e = m;
        const t = i === true ? Infinity : i;
        m = () => Gt(e(), t);
    }
    const x = oe();
    const _ = () => {
        h.stop();
        if (x && x.active) {
            c(x.effects, h);
        }
    };
    if (a && n) {
        const e = n;
        n = (...t) => {
            e(...t);
            _();
        };
    }
    let k = w ? new Array(e.length).fill($t) : $t;
    const C = e => {
        if (!(h.flags & 1) || !h.dirty && !e) {
            return;
        }
        if (n) {
            const e = h.run();
            if (i || b || (w ? e.some(((e, t) => N(e, k[t]))) : N(e, k))) {
                if (v) {
                    v();
                }
                const t = Vt;
                Vt = h;
                try {
                    const t = [ e, k === $t ? void 0 : w && k[0] === $t ? [] : k, y ];
                    d ? d(n, 3, t) : n(...t);
                    k = e;
                } finally {
                    Vt = t;
                }
            }
        } else {
            h.run();
        }
    };
    if (f) {
        f(C);
    }
    h = new ce(m);
    h.scheduler = l ? () => l(C, false) : C;
    y = e => Ut(e, false, h);
    v = h.onStop = () => {
        const e = zt.get(h);
        if (e) {
            if (d) {
                d(e, 4);
            } else {
                for (const t of e) t();
            }
            zt.delete(h);
        }
    };
    if (n) {
        if (o) {
            C(true);
        } else {
            k = h.run();
        }
    } else if (l) {
        l(C.bind(null, true), true);
    } else {
        h.run();
    }
    _.pause = h.pause.bind(h);
    _.resume = h.resume.bind(h);
    _.stop = _;
    return _;
}

function Gt(e, t = Infinity, n) {
    if (t <= 0 || !y(e) || e["__v_skip"]) {
        return e;
    }
    n = n || new Set;
    if (n.has(e)) {
        return e;
    }
    n.add(e);
    t--;
    if (jt(e)) {
        Gt(e.value, t, n);
    } else if (u(e)) {
        for (let s = 0; s < e.length; s++) {
            Gt(e[s], t, n);
        }
    } else if (p(e) || d(e)) {
        e.forEach((e => {
            Gt(e, t, n);
        }));
    } else if (k(e)) {
        for (const s in e) {
            Gt(e[s], t, n);
        }
        for (const s of Object.getOwnPropertySymbols(e)) {
            if (Object.prototype.propertyIsEnumerable.call(e, s)) {
                Gt(e[s], t, n);
            }
        }
    }
    return e;
}

/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ const qt = [];

let Ht = false;

function Kt(e, ...t) {
    if (Ht) return;
    Ht = true;
    ke();
    const n = qt.length ? qt[qt.length - 1].component : null;
    const s = n && n.appContext.config.warnHandler;
    const r = Qt();
    if (s) {
        en(s, n, 11, [ e + t.map((e => {
            var t, n;
            return (n = (t = e.toString) == null ? void 0 : t.call(e)) != null ? n : JSON.stringify(e);
        })).join(""), n && n.proxy, r.map((({vnode: e}) => `at <${Eo(n, e.type)}>`)).join("\n"), r ]);
    } else {
        const n = [ `[Vue warn]: ${e}`, ...t ];
        if (r.length && true) {
            n.push(`\n`, ...Xt(r));
        }
        console.warn(...n);
    }
    Ce();
    Ht = false;
}

function Qt() {
    let e = qt[qt.length - 1];
    if (!e) {
        return [];
    }
    const t = [];
    while (e) {
        const n = t[0];
        if (n && n.vnode === e) {
            n.recurseCount++;
        } else {
            t.push({
                vnode: e,
                recurseCount: 0
            });
        }
        const s = e.component && e.component.parent;
        e = s && s.vnode;
    }
    return t;
}

function Xt(e) {
    const t = [];
    e.forEach(((e, n) => {
        t.push(...n === 0 ? [] : [ `\n` ], ...Yt(e));
    }));
    return t;
}

function Yt({vnode: e, recurseCount: t}) {
    const n = t > 0 ? `... (${t} recursive calls)` : ``;
    const s = e.component ? e.component.parent == null : false;
    const r = ` at <${Eo(e.component, e.type, s)}`;
    const o = `>` + n;
    return e.props ? [ r, ...Jt(e.props), o ] : [ r + o ];
}

function Jt(e) {
    const t = [];
    const n = Object.keys(e);
    n.slice(0, 3).forEach((n => {
        t.push(...Zt(n, e[n]));
    }));
    if (n.length > 3) {
        t.push(` ...`);
    }
    return t;
}

function Zt(e, t, n) {
    if (m(t)) {
        t = JSON.stringify(t);
        return n ? t : [ `${e}=${t}` ];
    } else if (typeof t === "number" || typeof t === "boolean" || t == null) {
        return n ? t : [ `${e}=${t}` ];
    } else if (jt(t)) {
        t = Zt(e, Ot(t.value), true);
        return n ? t : [ `${e}=Ref<`, t, `>` ];
    } else if (g(t)) {
        return [ `${e}=fn${t.name ? `<${t.name}>` : ``}` ];
    } else {
        t = Ot(t);
        return n ? t : [ `${e}=`, t ];
    }
}

function en(e, t, n, s) {
    try {
        return s ? e(...s) : e();
    } catch (r) {
        nn(r, t, n);
    }
}

function tn(e, t, n, s) {
    if (g(e)) {
        const r = en(e, t, n, s);
        if (r && b(r)) {
            r.catch((e => {
                nn(e, t, n);
            }));
        }
        return r;
    }
    if (u(e)) {
        const r = [];
        for (let o = 0; o < e.length; o++) {
            r.push(tn(e[o], t, n, s));
        }
        return r;
    }
}

function nn(e, n, s, r = true) {
    const o = n ? n.vnode : null;
    const {errorHandler: i, throwUnhandledErrorInProduction: a} = n && n.appContext.config || t;
    if (n) {
        let t = n.parent;
        const r = n.proxy;
        const o = `https://vuejs.org/error-reference/#runtime-${s}`;
        while (t) {
            const n = t.ec;
            if (n) {
                for (let t = 0; t < n.length; t++) {
                    if (n[t](e, r, o) === false) {
                        return;
                    }
                }
            }
            t = t.parent;
        }
        if (i) {
            ke();
            en(i, null, 10, [ e, r, o ]);
            Ce();
            return;
        }
    }
    sn(e, s, o, r, a);
}

function sn(e, t, n, s = true, r = false) {
    if (r) {
        throw e;
    } else {
        console.error(e);
    }
}

const rn = [];

let on = -1;

const an = [];

let cn = null;

let ln = 0;

const fn = Promise.resolve();

let un = null;

function dn(e) {
    const t = un || fn;
    return e ? t.then(this ? e.bind(this) : e) : t;
}

function pn(e) {
    let t = on + 1;
    let n = rn.length;
    while (t < n) {
        const s = t + n >>> 1;
        const r = rn[s];
        const o = bn(r);
        if (o < e || o === e && r.flags & 2) {
            t = s + 1;
        } else {
            n = s;
        }
    }
    return t;
}

function hn(e) {
    if (!(e.flags & 1)) {
        const t = bn(e);
        const n = rn[rn.length - 1];
        if (!n || !(e.flags & 2) && t >= bn(n)) {
            rn.push(e);
        } else {
            rn.splice(pn(t), 0, e);
        }
        e.flags |= 1;
        gn();
    }
}

function gn() {
    if (!un) {
        un = fn.then(wn);
    }
}

function mn(e) {
    if (!u(e)) {
        if (cn && e.id === -1) {
            cn.splice(ln + 1, 0, e);
        } else if (!(e.flags & 1)) {
            an.push(e);
            e.flags |= 1;
        }
    } else {
        an.push(...e);
    }
    gn();
}

function vn(e, t, n = on + 1) {
    for (;n < rn.length; n++) {
        const t = rn[n];
        if (t && t.flags & 2) {
            if (e && t.id !== e.uid) {
                continue;
            }
            rn.splice(n, 1);
            n--;
            if (t.flags & 4) {
                t.flags &= -2;
            }
            t();
            if (!(t.flags & 4)) {
                t.flags &= -2;
            }
        }
    }
}

function yn(e) {
    if (an.length) {
        const e = [ ...new Set(an) ].sort(((e, t) => bn(e) - bn(t)));
        an.length = 0;
        if (cn) {
            cn.push(...e);
            return;
        }
        cn = e;
        for (ln = 0; ln < cn.length; ln++) {
            const e = cn[ln];
            if (e.flags & 4) {
                e.flags &= -2;
            }
            if (!(e.flags & 8)) e();
            e.flags &= -2;
        }
        cn = null;
        ln = 0;
    }
}

const bn = e => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;

function wn(e) {
    try {
        for (on = 0; on < rn.length; on++) {
            const e = rn[on];
            if (e && !(e.flags & 8)) {
                if (false) ;
                if (e.flags & 4) {
                    e.flags &= ~1;
                }
                en(e, e.i, e.i ? 15 : 14);
                if (!(e.flags & 4)) {
                    e.flags &= ~1;
                }
            }
        }
    } finally {
        for (;on < rn.length; on++) {
            const e = rn[on];
            if (e) {
                e.flags &= -2;
            }
        }
        on = -1;
        rn.length = 0;
        yn();
        un = null;
        if (rn.length || an.length) {
            wn();
        }
    }
}

let xn = null;

let _n = null;

function kn(e) {
    const t = xn;
    xn = e;
    _n = e && e.type.__scopeId || null;
    return t;
}

function Cn(e, t = xn, n) {
    if (!t) return e;
    if (e._n) {
        return e;
    }
    const s = (...n) => {
        if (s._d) {
            Br(-1);
        }
        const r = kn(t);
        let o;
        try {
            o = e(...n);
        } finally {
            kn(r);
            if (s._d) {
                Br(1);
            }
        }
        return o;
    };
    s._n = true;
    s._c = true;
    s._d = true;
    return s;
}

function Sn(e, n) {
    if (xn === null) {
        return e;
    }
    const s = ko(xn);
    const r = e.dirs || (e.dirs = []);
    for (let o = 0; o < n.length; o++) {
        let [e, i, a, c = t] = n[o];
        if (e) {
            if (g(e)) {
                e = {
                    mounted: e,
                    updated: e
                };
            }
            if (e.deep) {
                Gt(i);
            }
            r.push({
                dir: e,
                instance: s,
                value: i,
                oldValue: void 0,
                arg: a,
                modifiers: c
            });
        }
    }
    return e;
}

function On(e, t, n, s) {
    const r = e.dirs;
    const o = t && t.dirs;
    for (let i = 0; i < r.length; i++) {
        const a = r[i];
        if (o) {
            a.oldValue = o[i].value;
        }
        let c = a.dir[s];
        if (c) {
            ke();
            tn(c, n, 8, [ e.el, a, e, t ]);
            Ce();
        }
    }
}

const En = Symbol("_vte");

const An = e => e.__isTeleport;

const Pn = Symbol("_leaveCb");

const jn = Symbol("_enterCb");

function Tn() {
    const e = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: new Map
    };
    Xn((() => {
        e.isMounted = true;
    }));
    Zn((() => {
        e.isUnmounting = true;
    }));
    return e;
}

const In = [ Function, Array ];

const Nn = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: In,
    onEnter: In,
    onAfterEnter: In,
    onEnterCancelled: In,
    onBeforeLeave: In,
    onLeave: In,
    onAfterLeave: In,
    onLeaveCancelled: In,
    onBeforeAppear: In,
    onAppear: In,
    onAfterAppear: In,
    onAppearCancelled: In
};

function Ln(e, t) {
    const {leavingVNodes: n} = e;
    let s = n.get(t.type);
    if (!s) {
        s = Object.create(null);
        n.set(t.type, s);
    }
    return s;
}

function Mn(e, t, n, s, r) {
    const {appear: o, mode: i, persisted: a = false, onBeforeEnter: c, onEnter: l, onAfterEnter: f, onEnterCancelled: d, onBeforeLeave: p, onLeave: h, onAfterLeave: g, onLeaveCancelled: m, onBeforeAppear: v, onAppear: y, onAfterAppear: b, onAppearCancelled: w} = t;
    const x = String(e.key);
    const _ = Ln(n, e);
    const k = (e, t) => {
        e && tn(e, s, 9, t);
    };
    const C = (e, t) => {
        const n = t[1];
        k(e, t);
        if (u(e)) {
            if (e.every((e => e.length <= 1))) n();
        } else if (e.length <= 1) {
            n();
        }
    };
    const S = {
        mode: i,
        persisted: a,
        beforeEnter(t) {
            let s = c;
            if (!n.isMounted) {
                if (o) {
                    s = v || c;
                } else {
                    return;
                }
            }
            if (t[Pn]) {
                t[Pn](true);
            }
            const r = _[x];
            if (r && Wr(e, r) && r.el[Pn]) {
                r.el[Pn]();
            }
            k(s, [ t ]);
        },
        enter(e) {
            let t = l;
            let s = f;
            let r = d;
            if (!n.isMounted) {
                if (o) {
                    t = y || l;
                    s = b || f;
                    r = w || d;
                } else {
                    return;
                }
            }
            let i = false;
            const a = e[jn] = t => {
                if (i) return;
                i = true;
                if (t) {
                    k(r, [ e ]);
                } else {
                    k(s, [ e ]);
                }
                if (S.delayedLeave) {
                    S.delayedLeave();
                }
                e[jn] = void 0;
            };
            if (t) {
                C(t, [ e, a ]);
            } else {
                a();
            }
        },
        leave(t, s) {
            const r = String(e.key);
            if (t[jn]) {
                t[jn](true);
            }
            if (n.isUnmounting) {
                return s();
            }
            k(p, [ t ]);
            let o = false;
            const i = t[Pn] = n => {
                if (o) return;
                o = true;
                s();
                if (n) {
                    k(m, [ t ]);
                } else {
                    k(g, [ t ]);
                }
                t[Pn] = void 0;
                if (_[r] === e) {
                    delete _[r];
                }
            };
            _[r] = e;
            if (h) {
                C(h, [ t, i ]);
            } else {
                i();
            }
        },
        clone(e) {
            const r = Mn(e, t, n, s);
            return r;
        }
    };
    return S;
}

function Fn(e, t) {
    if (e.shapeFlag & 6 && e.component) {
        e.transition = t;
        Fn(e.component.subTree, t);
    } else if (e.shapeFlag & 128) {
        e.ssContent.transition = t.clone(e.ssContent);
        e.ssFallback.transition = t.clone(e.ssFallback);
    } else {
        e.transition = t;
    }
}

function Dn(e, t = false, n) {
    let s = [];
    let r = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        if (i.type === jr) {
            if (i.patchFlag & 128) r++;
            s = s.concat(Dn(i.children, t, a));
        } else if (t || i.type !== Ir) {
            s.push(a != null ? Yr(i, {
                key: a
            }) : i);
        }
    }
    if (r > 1) {
        for (let e = 0; e < s.length; e++) {
            s[e].patchFlag = -2;
        }
    }
    return s;
}

/*! #__NO_SIDE_EFFECTS__ */ function Rn(e, t) {
    return g(e) ? (() => a({
        name: e.name
    }, t, {
        setup: e
    }))() : e;
}

function Bn(e) {
    e.ids = [ e.ids[0] + e.ids[2]++ + "-", 0, 0 ];
}

function $n(e, n, s, r, o = false) {
    if (u(e)) {
        e.forEach(((e, t) => $n(e, n && (u(n) ? n[t] : n), s, r, o)));
        return;
    }
    if (zn(r) && !o) {
        if (r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component) {
            $n(e, n, s, r.component.subTree);
        }
        return;
    }
    const i = r.shapeFlag & 4 ? ko(r.component) : r.el;
    const a = o ? null : i;
    const {i: l, r: d} = e;
    const p = n && n.r;
    const h = l.refs === t ? l.refs = {} : l.refs;
    const v = l.setupState;
    const y = Ot(v);
    const b = v === t ? () => false : e => f(y, e);
    if (p != null && p !== d) {
        if (m(p)) {
            h[p] = null;
            if (b(p)) {
                v[p] = null;
            }
        } else if (jt(p)) {
            p.value = null;
        }
    }
    if (g(d)) {
        en(d, l, 12, [ a, h ]);
    } else {
        const t = m(d);
        const n = jt(d);
        if (t || n) {
            const r = () => {
                if (e.f) {
                    const n = t ? b(d) ? v[d] : h[d] : d.value;
                    if (o) {
                        u(n) && c(n, i);
                    } else {
                        if (!u(n)) {
                            if (t) {
                                h[d] = [ i ];
                                if (b(d)) {
                                    v[d] = h[d];
                                }
                            } else {
                                d.value = [ i ];
                                if (e.k) h[e.k] = d.value;
                            }
                        } else if (!n.includes(i)) {
                            n.push(i);
                        }
                    }
                } else if (t) {
                    h[d] = a;
                    if (b(d)) {
                        v[d] = a;
                    }
                } else if (n) {
                    d.value = a;
                    if (e.k) h[e.k] = a;
                } else ;
            };
            if (a) {
                r.id = -1;
                tr(r, s);
            } else {
                r();
            }
        }
    }
}

B().requestIdleCallback || (e => setTimeout(e, 1));

B().cancelIdleCallback || (e => clearTimeout(e));

const zn = e => !!e.type.__asyncLoader;

const Vn = e => e.type.__isKeepAlive;

function Un(e, t) {
    Gn(e, "a", t);
}

function Wn(e, t) {
    Gn(e, "da", t);
}

function Gn(e, t, n = co) {
    const s = e.__wdc || (e.__wdc = () => {
        let t = n;
        while (t) {
            if (t.isDeactivated) {
                return;
            }
            t = t.parent;
        }
        return e();
    });
    Hn(t, s, n);
    if (n) {
        let e = n.parent;
        while (e && e.parent) {
            if (Vn(e.parent.vnode)) {
                qn(s, t, n, e);
            }
            e = e.parent;
        }
    }
}

function qn(e, t, n, s) {
    const r = Hn(t, e, s, true);
    es((() => {
        c(s[t], r);
    }), n);
}

function Hn(e, t, n = co, s = false) {
    if (n) {
        const r = n[e] || (n[e] = []);
        const o = t.__weh || (t.__weh = (...s) => {
            ke();
            const r = po(n);
            const o = tn(t, n, e, s);
            r();
            Ce();
            return o;
        });
        if (s) {
            r.unshift(o);
        } else {
            r.push(o);
        }
        return o;
    }
}

const Kn = e => (t, n = co) => {
    if (!mo || e === "sp") {
        Hn(e, ((...e) => t(...e)), n);
    }
};

const Qn = Kn("bm");

const Xn = Kn("m");

const Yn = Kn("bu");

const Jn = Kn("u");

const Zn = Kn("bum");

const es = Kn("um");

const ts = Kn("sp");

const ns = Kn("rtg");

const ss = Kn("rtc");

function rs(e, t = co) {
    Hn("ec", e, t);
}

const os = "components";

function is(e, t) {
    return cs(os, e, true, t) || e;
}

const as = Symbol.for("v-ndc");

function cs(e, t, n = true, s = false) {
    const r = xn || co;
    if (r) {
        const n = r.type;
        {
            const e = Oo(n, false);
            if (e && (e === t || e === A(t) || e === T(A(t)))) {
                return n;
            }
        }
        const o = ls(r[e] || n[e], t) || ls(r.appContext[e], t);
        if (!o && s) {
            return n;
        }
        return o;
    }
}

function ls(e, t) {
    return e && (e[t] || e[A(t)] || e[T(A(t))]);
}

function fs(e, t, n, s) {
    let r;
    const o = n;
    const i = u(e);
    if (i || m(e)) {
        const n = i && _t(e);
        let s = false;
        if (n) {
            s = !Ct(e);
            e = De(e);
        }
        r = new Array(e.length);
        for (let i = 0, a = e.length; i < a; i++) {
            r[i] = t(s ? At(e[i]) : e[i], i, void 0, o);
        }
    } else if (typeof e === "number") {
        r = new Array(e);
        for (let n = 0; n < e; n++) {
            r[n] = t(n + 1, n, void 0, o);
        }
    } else if (y(e)) {
        if (e[Symbol.iterator]) {
            r = Array.from(e, ((e, n) => t(e, n, void 0, o)));
        } else {
            const n = Object.keys(e);
            r = new Array(n.length);
            for (let s = 0, i = n.length; s < i; s++) {
                const i = n[s];
                r[s] = t(e[i], i, s, o);
            }
        }
    } else {
        r = [];
    }
    return r;
}

const us = e => {
    if (!e) return null;
    if (go(e)) return ko(e);
    return us(e.parent);
};

const ds = a(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => us(e.parent),
    $root: e => us(e.root),
    $host: e => e.ce,
    $emit: e => e.emit,
    $options: e => xs(e),
    $forceUpdate: e => e.f || (e.f = () => {
        hn(e.update);
    }),
    $nextTick: e => e.n || (e.n = dn.bind(e.proxy)),
    $watch: e => gr.bind(e)
});

const ps = (e, n) => e !== t && !e.__isScriptSetup && f(e, n);

const hs = {
    get({_: e}, n) {
        if (n === "__v_skip") {
            return true;
        }
        const {ctx: s, setupState: r, data: o, props: i, accessCache: a, type: c, appContext: l} = e;
        let u;
        if (n[0] !== "$") {
            const c = a[n];
            if (c !== void 0) {
                switch (c) {
                  case 1:
                    return r[n];

                  case 2:
                    return o[n];

                  case 4:
                    return s[n];

                  case 3:
                    return i[n];
                }
            } else if (ps(r, n)) {
                a[n] = 1;
                return r[n];
            } else if (o !== t && f(o, n)) {
                a[n] = 2;
                return o[n];
            } else if ((u = e.propsOptions[0]) && f(u, n)) {
                a[n] = 3;
                return i[n];
            } else if (s !== t && f(s, n)) {
                a[n] = 4;
                return s[n];
            } else if (ms) {
                a[n] = 0;
            }
        }
        const d = ds[n];
        let p, h;
        if (d) {
            if (n === "$attrs") {
                Le(e.attrs, "get", "");
            }
            return d(e);
        } else if ((p = c.__cssModules) && (p = p[n])) {
            return p;
        } else if (s !== t && f(s, n)) {
            a[n] = 4;
            return s[n];
        } else if (h = l.config.globalProperties, f(h, n)) {
            {
                return h[n];
            }
        } else ;
    },
    set({_: e}, n, s) {
        const {data: r, setupState: o, ctx: i} = e;
        if (ps(o, n)) {
            o[n] = s;
            return true;
        } else if (r !== t && f(r, n)) {
            r[n] = s;
            return true;
        } else if (f(e.props, n)) {
            return false;
        }
        if (n[0] === "$" && n.slice(1) in e) {
            return false;
        } else {
            {
                i[n] = s;
            }
        }
        return true;
    },
    has({_: {data: e, setupState: n, accessCache: s, ctx: r, appContext: o, propsOptions: i}}, a) {
        let c;
        return !!s[a] || e !== t && f(e, a) || ps(n, a) || (c = i[0]) && f(c, a) || f(r, a) || f(ds, a) || f(o.config.globalProperties, a);
    },
    defineProperty(e, t, n) {
        if (n.get != null) {
            e._.accessCache[t] = 0;
        } else if (f(n, "value")) {
            this.set(e, t, n.value, null);
        }
        return Reflect.defineProperty(e, t, n);
    }
};

function gs(e) {
    return u(e) ? e.reduce(((e, t) => (e[t] = null, e)), {}) : e;
}

let ms = true;

function vs(e) {
    const t = xs(e);
    const n = e.proxy;
    const r = e.ctx;
    ms = false;
    if (t.beforeCreate) {
        bs(t.beforeCreate, e, "bc");
    }
    const {data: o, computed: i, methods: a, watch: c, provide: l, inject: f, created: d, beforeMount: p, mounted: h, beforeUpdate: m, updated: v, activated: b, deactivated: w, beforeDestroy: x, beforeUnmount: _, destroyed: k, unmounted: C, render: S, renderTracked: O, renderTriggered: E, errorCaptured: A, serverPrefetch: P, expose: j, inheritAttrs: T, components: I, directives: N, filters: L} = t;
    const M = null;
    if (f) {
        ys(f, r, M);
    }
    if (a) {
        for (const e in a) {
            const t = a[e];
            if (g(t)) {
                {
                    r[e] = t.bind(n);
                }
            }
        }
    }
    if (o) {
        const t = o.call(n, n);
        if (!y(t)) ; else {
            e.data = vt(t);
        }
    }
    ms = true;
    if (i) {
        for (const e in i) {
            const t = i[e];
            const o = g(t) ? t.bind(n, n) : g(t.get) ? t.get.bind(n, n) : s;
            const a = !g(t) && g(t.set) ? t.set.bind(n) : s;
            const c = Po({
                get: o,
                set: a
            });
            Object.defineProperty(r, e, {
                enumerable: true,
                configurable: true,
                get: () => c.value,
                set: e => c.value = e
            });
        }
    }
    if (c) {
        for (const e in c) {
            ws(c[e], r, n, e);
        }
    }
    if (l) {
        const e = g(l) ? l.call(n) : l;
        Reflect.ownKeys(e).forEach((t => {
            Ms(t, e[t]);
        }));
    }
    if (d) {
        bs(d, e, "c");
    }
    function F(e, t) {
        if (u(t)) {
            t.forEach((t => e(t.bind(n))));
        } else if (t) {
            e(t.bind(n));
        }
    }
    F(Qn, p);
    F(Xn, h);
    F(Yn, m);
    F(Jn, v);
    F(Un, b);
    F(Wn, w);
    F(rs, A);
    F(ss, O);
    F(ns, E);
    F(Zn, _);
    F(es, C);
    F(ts, P);
    if (u(j)) {
        if (j.length) {
            const t = e.exposed || (e.exposed = {});
            j.forEach((e => {
                Object.defineProperty(t, e, {
                    get: () => n[e],
                    set: t => n[e] = t
                });
            }));
        } else if (!e.exposed) {
            e.exposed = {};
        }
    }
    if (S && e.render === s) {
        e.render = S;
    }
    if (T != null) {
        e.inheritAttrs = T;
    }
    if (I) e.components = I;
    if (N) e.directives = N;
    if (P) {
        Bn(e);
    }
}

function ys(e, t, n = s) {
    if (u(e)) {
        e = Os(e);
    }
    for (const s in e) {
        const n = e[s];
        let r;
        if (y(n)) {
            if ("default" in n) {
                r = Fs(n.from || s, n.default, true);
            } else {
                r = Fs(n.from || s);
            }
        } else {
            r = Fs(n);
        }
        if (jt(r)) {
            Object.defineProperty(t, s, {
                enumerable: true,
                configurable: true,
                get: () => r.value,
                set: e => r.value = e
            });
        } else {
            t[s] = r;
        }
    }
}

function bs(e, t, n) {
    tn(u(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n);
}

function ws(e, t, n, s) {
    let r = s.includes(".") ? mr(n, s) : () => n[s];
    if (m(e)) {
        const n = t[e];
        if (g(n)) {
            {
                pr(r, n);
            }
        }
    } else if (g(e)) {
        {
            pr(r, e.bind(n));
        }
    } else if (y(e)) {
        if (u(e)) {
            e.forEach((e => ws(e, t, n, s)));
        } else {
            const s = g(e.handler) ? e.handler.bind(n) : t[e.handler];
            if (g(s)) {
                pr(r, s, e);
            }
        }
    } else ;
}

function xs(e) {
    const t = e.type;
    const {mixins: n, extends: s} = t;
    const {mixins: r, optionsCache: o, config: {optionMergeStrategies: i}} = e.appContext;
    const a = o.get(t);
    let c;
    if (a) {
        c = a;
    } else if (!r.length && !n && !s) {
        {
            c = t;
        }
    } else {
        c = {};
        if (r.length) {
            r.forEach((e => _s(c, e, i, true)));
        }
        _s(c, t, i);
    }
    if (y(t)) {
        o.set(t, c);
    }
    return c;
}

function _s(e, t, n, s = false) {
    const {mixins: r, extends: o} = t;
    if (o) {
        _s(e, o, n, true);
    }
    if (r) {
        r.forEach((t => _s(e, t, n, true)));
    }
    for (const i in t) {
        if (s && i === "expose") ; else {
            const s = ks[i] || n && n[i];
            e[i] = s ? s(e[i], t[i]) : t[i];
        }
    }
    return e;
}

const ks = {
    data: Cs,
    props: Ps,
    emits: Ps,
    methods: As,
    computed: As,
    beforeCreate: Es,
    created: Es,
    beforeMount: Es,
    mounted: Es,
    beforeUpdate: Es,
    updated: Es,
    beforeDestroy: Es,
    beforeUnmount: Es,
    destroyed: Es,
    unmounted: Es,
    activated: Es,
    deactivated: Es,
    errorCaptured: Es,
    serverPrefetch: Es,
    components: As,
    directives: As,
    watch: js,
    provide: Cs,
    inject: Ss
};

function Cs(e, t) {
    if (!t) {
        return e;
    }
    if (!e) {
        return t;
    }
    return function n() {
        return a(g(e) ? e.call(this, this) : e, g(t) ? t.call(this, this) : t);
    };
}

function Ss(e, t) {
    return As(Os(e), Os(t));
}

function Os(e) {
    if (u(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            t[e[n]] = e[n];
        }
        return t;
    }
    return e;
}

function Es(e, t) {
    return e ? [ ...new Set([].concat(e, t)) ] : t;
}

function As(e, t) {
    return e ? a(Object.create(null), e, t) : t;
}

function Ps(e, t) {
    if (e) {
        if (u(e) && u(t)) {
            return [ ...new Set([ ...e, ...t ]) ];
        }
        return a(Object.create(null), gs(e), gs(t != null ? t : {}));
    } else {
        return t;
    }
}

function js(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = a(Object.create(null), e);
    for (const s in t) {
        n[s] = Es(e[s], t[s]);
    }
    return n;
}

function Ts() {
    return {
        app: null,
        config: {
            isNativeTag: r,
            performance: false,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    };
}

let Is = 0;

function Ns(e, t) {
    return function t(n, s = null) {
        if (!g(n)) {
            n = a({}, n);
        }
        if (s != null && !y(s)) {
            s = null;
        }
        const r = Ts();
        const o = new WeakSet;
        const i = [];
        let c = false;
        const l = r.app = {
            _uid: Is++,
            _component: n,
            _props: s,
            _container: null,
            _context: r,
            _instance: null,
            version: To,
            get config() {
                return r.config;
            },
            set config(e) {},
            use(e, ...t) {
                if (o.has(e)) ; else if (e && g(e.install)) {
                    o.add(e);
                    e.install(l, ...t);
                } else if (g(e)) {
                    o.add(e);
                    e(l, ...t);
                } else ;
                return l;
            },
            mixin(e) {
                {
                    if (!r.mixins.includes(e)) {
                        r.mixins.push(e);
                    }
                }
                return l;
            },
            component(e, t) {
                if (!t) {
                    return r.components[e];
                }
                r.components[e] = t;
                return l;
            },
            directive(e, t) {
                if (!t) {
                    return r.directives[e];
                }
                r.directives[e] = t;
                return l;
            },
            mount(t, o, i) {
                if (!c) {
                    const o = l._ceVNode || Kr(n, s);
                    o.appContext = r;
                    if (i === true) {
                        i = "svg";
                    } else if (i === false) {
                        i = void 0;
                    }
                    {
                        e(o, t, i);
                    }
                    c = true;
                    l._container = t;
                    t.__vue_app__ = l;
                    return ko(o.component);
                }
            },
            onUnmount(e) {
                i.push(e);
            },
            unmount() {
                if (c) {
                    tn(i, l._instance, 16);
                    e(null, l._container);
                    delete l._container.__vue_app__;
                }
            },
            provide(e, t) {
                r.provides[e] = t;
                return l;
            },
            runWithContext(e) {
                const t = Ls;
                Ls = l;
                try {
                    return e();
                } finally {
                    Ls = t;
                }
            }
        };
        return l;
    };
}

let Ls = null;

function Ms(e, t) {
    if (!co) ; else {
        let n = co.provides;
        const s = co.parent && co.parent.provides;
        if (s === n) {
            n = co.provides = Object.create(s);
        }
        n[e] = t;
    }
}

function Fs(e, t, n = false) {
    const s = co || xn;
    if (s || Ls) {
        const r = Ls ? Ls._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
        if (r && e in r) {
            return r[e];
        } else if (arguments.length > 1) {
            return n && g(t) ? t.call(s && s.proxy) : t;
        } else ;
    }
}

const Ds = {};

const Rs = () => Object.create(Ds);

const Bs = e => Object.getPrototypeOf(e) === Ds;

function $s(e, t, n, s = false) {
    const r = {};
    const o = Rs();
    e.propsDefaults = Object.create(null);
    Vs(e, t, r, o);
    for (const i in e.propsOptions[0]) {
        if (!(i in r)) {
            r[i] = void 0;
        }
    }
    if (n) {
        e.props = s ? r : yt(r);
    } else {
        if (!e.type.props) {
            e.props = o;
        } else {
            e.props = r;
        }
    }
    e.attrs = o;
}

function zs(e, t, n, s) {
    const {props: r, attrs: o, vnode: {patchFlag: i}} = e;
    const a = Ot(r);
    const [c] = e.propsOptions;
    let l = false;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const n = e.vnode.dynamicProps;
            for (let s = 0; s < n.length; s++) {
                let i = n[s];
                if (wr(e.emitsOptions, i)) {
                    continue;
                }
                const u = t[i];
                if (c) {
                    if (f(o, i)) {
                        if (u !== o[i]) {
                            o[i] = u;
                            l = true;
                        }
                    } else {
                        const t = A(i);
                        r[t] = Us(c, a, t, u, e, false);
                    }
                } else {
                    if (u !== o[i]) {
                        o[i] = u;
                        l = true;
                    }
                }
            }
        }
    } else {
        if (Vs(e, t, r, o)) {
            l = true;
        }
        let s;
        for (const o in a) {
            if (!t || !f(t, o) && ((s = j(o)) === o || !f(t, s))) {
                if (c) {
                    if (n && (n[o] !== void 0 || n[s] !== void 0)) {
                        r[o] = Us(c, a, o, void 0, e, true);
                    }
                } else {
                    delete r[o];
                }
            }
        }
        if (o !== a) {
            for (const e in o) {
                if (!t || !f(t, e) && true) {
                    delete o[e];
                    l = true;
                }
            }
        }
    }
    if (l) {
        Me(e.attrs, "set", "");
    }
}

function Vs(e, n, s, r) {
    const [o, i] = e.propsOptions;
    let a = false;
    let c;
    if (n) {
        for (let t in n) {
            if (S(t)) {
                continue;
            }
            const l = n[t];
            let u;
            if (o && f(o, u = A(t))) {
                if (!i || !i.includes(u)) {
                    s[u] = l;
                } else {
                    (c || (c = {}))[u] = l;
                }
            } else if (!wr(e.emitsOptions, t)) {
                if (!(t in r) || l !== r[t]) {
                    r[t] = l;
                    a = true;
                }
            }
        }
    }
    if (i) {
        const n = Ot(s);
        const r = c || t;
        for (let t = 0; t < i.length; t++) {
            const a = i[t];
            s[a] = Us(o, n, a, r[a], e, !f(r, a));
        }
    }
    return a;
}

function Us(e, t, n, s, r, o) {
    const i = e[n];
    if (i != null) {
        const e = f(i, "default");
        if (e && s === void 0) {
            const e = i.default;
            if (i.type !== Function && !i.skipFactory && g(e)) {
                const {propsDefaults: o} = r;
                if (n in o) {
                    s = o[n];
                } else {
                    const i = po(r);
                    s = o[n] = e.call(null, t);
                    i();
                }
            } else {
                s = e;
            }
            if (r.ce) {
                r.ce._setProp(n, s);
            }
        }
        if (i[0]) {
            if (o && !e) {
                s = false;
            } else if (i[1] && (s === "" || s === j(n))) {
                s = true;
            }
        }
    }
    return s;
}

const Ws = new WeakMap;

function Gs(e, s, r = false) {
    const o = r ? Ws : s.propsCache;
    const i = o.get(e);
    if (i) {
        return i;
    }
    const c = e.props;
    const l = {};
    const d = [];
    let p = false;
    if (!g(e)) {
        const t = e => {
            p = true;
            const [t, n] = Gs(e, s, true);
            a(l, t);
            if (n) d.push(...n);
        };
        if (!r && s.mixins.length) {
            s.mixins.forEach(t);
        }
        if (e.extends) {
            t(e.extends);
        }
        if (e.mixins) {
            e.mixins.forEach(t);
        }
    }
    if (!c && !p) {
        if (y(e)) {
            o.set(e, n);
        }
        return n;
    }
    if (u(c)) {
        for (let e = 0; e < c.length; e++) {
            const n = A(c[e]);
            if (qs(n)) {
                l[n] = t;
            }
        }
    } else if (c) {
        for (const e in c) {
            const t = A(e);
            if (qs(t)) {
                const n = c[e];
                const s = l[t] = u(n) || g(n) ? {
                    type: n
                } : a({}, n);
                const r = s.type;
                let o = false;
                let i = true;
                if (u(r)) {
                    for (let e = 0; e < r.length; ++e) {
                        const t = r[e];
                        const n = g(t) && t.name;
                        if (n === "Boolean") {
                            o = true;
                            break;
                        } else if (n === "String") {
                            i = false;
                        }
                    }
                } else {
                    o = g(r) && r.name === "Boolean";
                }
                s[0] = o;
                s[1] = i;
                if (o || f(s, "default")) {
                    d.push(t);
                }
            }
        }
    }
    const h = [ l, d ];
    if (y(e)) {
        o.set(e, h);
    }
    return h;
}

function qs(e) {
    if (e[0] !== "$" && !S(e)) {
        return true;
    }
    return false;
}

const Hs = e => e[0] === "_" || e === "$stable";

const Ks = e => u(e) ? e.map(eo) : [ eo(e) ];

const Qs = (e, t, n) => {
    if (t._n) {
        return t;
    }
    const s = Cn(((...e) => {
        if (false) ;
        return Ks(t(...e));
    }), n);
    s._c = false;
    return s;
};

const Xs = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
        if (Hs(r)) continue;
        const n = e[r];
        if (g(n)) {
            t[r] = Qs(r, n, s);
        } else if (n != null) {
            const e = Ks(n);
            t[r] = () => e;
        }
    }
};

const Ys = (e, t) => {
    const n = Ks(t);
    e.slots.default = () => n;
};

const Js = (e, t, n) => {
    for (const s in t) {
        if (n || s !== "_") {
            e[s] = t[s];
        }
    }
};

const Zs = (e, t, n) => {
    const s = e.slots = Rs();
    if (e.vnode.shapeFlag & 32) {
        const e = t._;
        if (e) {
            Js(s, t, n);
            if (n) {
                M(s, "_", e, true);
            }
        } else {
            Xs(t, s);
        }
    } else if (t) {
        Ys(e, t);
    }
};

const er = (e, n, s) => {
    const {vnode: r, slots: o} = e;
    let i = true;
    let a = t;
    if (r.shapeFlag & 32) {
        const e = n._;
        if (e) {
            if (s && e === 1) {
                i = false;
            } else {
                Js(o, n, s);
            }
        } else {
            i = !n.$stable;
            Xs(n, o);
        }
        a = n;
    } else if (n) {
        Ys(e, n);
        a = {
            default: 1
        };
    }
    if (i) {
        for (const e in o) {
            if (!Hs(e) && a[e] == null) {
                delete o[e];
            }
        }
    }
};

const tr = Pr;

function nr(e) {
    return sr(e);
}

function sr(e, r) {
    const o = B();
    o.__VUE__ = true;
    const {insert: i, remove: a, patchProp: c, createElement: l, createText: f, createComment: u, setText: d, setElementText: p, parentNode: h, nextSibling: g, setScopeId: m = s, insertStaticContent: v} = e;
    const y = (e, t, n, s = null, r = null, o = null, i = void 0, a = null, c = !!t.dynamicChildren) => {
        if (e === t) {
            return;
        }
        if (e && !Wr(e, t)) {
            s = Q(e);
            W(e, r, o, true);
            e = null;
        }
        if (t.patchFlag === -2) {
            c = false;
            t.dynamicChildren = null;
        }
        const {type: l, ref: f, shapeFlag: u} = t;
        switch (l) {
          case Tr:
            b(e, t, n, s);
            break;

          case Ir:
            w(e, t, n, s);
            break;

          case Nr:
            if (e == null) {
                x(t, n, s, i);
            }
            break;

          case jr:
            I(e, t, n, s, r, o, i, a, c);
            break;

          default:
            if (u & 1) {
                C(e, t, n, s, r, o, i, a, c);
            } else if (u & 6) {
                N(e, t, n, s, r, o, i, a, c);
            } else if (u & 64) {
                l.process(e, t, n, s, r, o, i, a, c, J);
            } else if (u & 128) {
                l.process(e, t, n, s, r, o, i, a, c, J);
            } else ;
        }
        if (f != null && r) {
            $n(f, e && e.ref, o, t || e, !t);
        }
    };
    const b = (e, t, n, s) => {
        if (e == null) {
            i(t.el = f(t.children), n, s);
        } else {
            const n = t.el = e.el;
            if (t.children !== e.children) {
                d(n, t.children);
            }
        }
    };
    const w = (e, t, n, s) => {
        if (e == null) {
            i(t.el = u(t.children || ""), n, s);
        } else {
            t.el = e.el;
        }
    };
    const x = (e, t, n, s) => {
        [e.el, e.anchor] = v(e.children, t, n, s, e.el, e.anchor);
    };
    const _ = ({el: e, anchor: t}, n, s) => {
        let r;
        while (e && e !== t) {
            r = g(e);
            i(e, n, s);
            e = r;
        }
        i(t, n, s);
    };
    const k = ({el: e, anchor: t}) => {
        let n;
        while (e && e !== t) {
            n = g(e);
            a(e);
            e = n;
        }
        a(t);
    };
    const C = (e, t, n, s, r, o, i, a, c) => {
        if (t.type === "svg") {
            i = "svg";
        } else if (t.type === "math") {
            i = "mathml";
        }
        if (e == null) {
            O(t, n, s, r, o, i, a, c);
        } else {
            P(e, t, r, o, i, a, c);
        }
    };
    const O = (e, t, n, s, r, o, a, f) => {
        let u;
        let d;
        const {props: h, shapeFlag: g, transition: m, dirs: v} = e;
        u = e.el = l(e.type, o, h && h.is, h);
        if (g & 8) {
            p(u, e.children);
        } else if (g & 16) {
            A(e.children, u, null, s, r, rr(e, o), a, f);
        }
        if (v) {
            On(e, null, s, "created");
        }
        E(u, e, e.scopeId, a, s);
        if (h) {
            for (const e in h) {
                if (e !== "value" && !S(e)) {
                    c(u, e, null, h[e], o, s);
                }
            }
            if ("value" in h) {
                c(u, "value", null, h.value, o);
            }
            if (d = h.onVnodeBeforeMount) {
                ro(d, s, e);
            }
        }
        if (v) {
            On(e, null, s, "beforeMount");
        }
        const y = ir(r, m);
        if (y) {
            m.beforeEnter(u);
        }
        i(u, t, n);
        if ((d = h && h.onVnodeMounted) || y || v) {
            tr((() => {
                d && ro(d, s, e);
                y && m.enter(u);
                v && On(e, null, s, "mounted");
            }), r);
        }
    };
    const E = (e, t, n, s, r) => {
        if (n) {
            m(e, n);
        }
        if (s) {
            for (let t = 0; t < s.length; t++) {
                m(e, s[t]);
            }
        }
        if (r) {
            let n = r.subTree;
            if (t === n || Ar(n.type) && (n.ssContent === t || n.ssFallback === t)) {
                const t = r.vnode;
                E(e, t, t.scopeId, t.slotScopeIds, r.parent);
            }
        }
    };
    const A = (e, t, n, s, r, o, i, a, c = 0) => {
        for (let l = c; l < e.length; l++) {
            const c = e[l] = a ? to(e[l]) : eo(e[l]);
            y(null, c, t, n, s, r, o, i, a);
        }
    };
    const P = (e, n, s, r, o, i, a) => {
        const l = n.el = e.el;
        let {patchFlag: f, dynamicChildren: u, dirs: d} = n;
        f |= e.patchFlag & 16;
        const h = e.props || t;
        const g = n.props || t;
        let m;
        s && or(s, false);
        if (m = g.onVnodeBeforeUpdate) {
            ro(m, s, n, e);
        }
        if (d) {
            On(n, e, s, "beforeUpdate");
        }
        s && or(s, true);
        if (h.innerHTML && g.innerHTML == null || h.textContent && g.textContent == null) {
            p(l, "");
        }
        if (u) {
            j(e.dynamicChildren, u, l, s, r, rr(n, o), i);
        } else if (!a) {
            $(e, n, l, null, s, r, rr(n, o), i, false);
        }
        if (f > 0) {
            if (f & 16) {
                T(l, h, g, s, o);
            } else {
                if (f & 2) {
                    if (h.class !== g.class) {
                        c(l, "class", null, g.class, o);
                    }
                }
                if (f & 4) {
                    c(l, "style", h.style, g.style, o);
                }
                if (f & 8) {
                    const e = n.dynamicProps;
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t];
                        const r = h[n];
                        const i = g[n];
                        if (i !== r || n === "value") {
                            c(l, n, r, i, o, s);
                        }
                    }
                }
            }
            if (f & 1) {
                if (e.children !== n.children) {
                    p(l, n.children);
                }
            }
        } else if (!a && u == null) {
            T(l, h, g, s, o);
        }
        if ((m = g.onVnodeUpdated) || d) {
            tr((() => {
                m && ro(m, s, n, e);
                d && On(n, e, s, "updated");
            }), r);
        }
    };
    const j = (e, t, n, s, r, o, i) => {
        for (let a = 0; a < t.length; a++) {
            const c = e[a];
            const l = t[a];
            const f = c.el && (c.type === jr || !Wr(c, l) || c.shapeFlag & (6 | 64)) ? h(c.el) : n;
            y(c, l, f, null, s, r, o, i, true);
        }
    };
    const T = (e, n, s, r, o) => {
        if (n !== s) {
            if (n !== t) {
                for (const t in n) {
                    if (!S(t) && !(t in s)) {
                        c(e, t, n[t], null, o, r);
                    }
                }
            }
            for (const t in s) {
                if (S(t)) continue;
                const i = s[t];
                const a = n[t];
                if (i !== a && t !== "value") {
                    c(e, t, a, i, o, r);
                }
            }
            if ("value" in s) {
                c(e, "value", n.value, s.value, o);
            }
        }
    };
    const I = (e, t, n, s, r, o, a, c, l) => {
        const u = t.el = e ? e.el : f("");
        const d = t.anchor = e ? e.anchor : f("");
        let {patchFlag: p, dynamicChildren: h, slotScopeIds: g} = t;
        if (g) {
            c = c ? c.concat(g) : g;
        }
        if (e == null) {
            i(u, n, s);
            i(d, n, s);
            A(t.children || [], n, d, r, o, a, c, l);
        } else {
            if (p > 0 && p & 64 && h && e.dynamicChildren) {
                j(e.dynamicChildren, h, n, r, o, a, c);
                if (t.key != null || r && t === r.subTree) {
                    ar(e, t, true);
                }
            } else {
                $(e, t, n, d, r, o, a, c, l);
            }
        }
    };
    const N = (e, t, n, s, r, o, i, a, c) => {
        t.slotScopeIds = a;
        if (e == null) {
            if (t.shapeFlag & 512) {
                r.ctx.activate(t, n, s, i, c);
            } else {
                M(t, n, s, r, o, i, c);
            }
        } else {
            F(e, t, c);
        }
    };
    const M = (e, t, n, s, r, o, i) => {
        const a = e.component = ao(e, s, r);
        if (Vn(e)) {
            a.ctx.renderer = J;
        }
        {
            vo(a, false, i);
        }
        if (a.asyncDep) {
            r && r.registerDep(a, D, i);
            if (!e.el) {
                const e = a.subTree = Kr(Ir);
                w(null, e, t, n);
            }
        } else {
            D(a, e, t, n, r, o, i);
        }
    };
    const F = (e, t, n) => {
        const s = t.component = e.component;
        if (Sr(e, t, n)) {
            if (s.asyncDep && !s.asyncResolved) {
                R(s, t, n);
                return;
            } else {
                s.next = t;
                s.update();
            }
        } else {
            t.el = e.el;
            s.vnode = t;
        }
    };
    const D = (e, t, n, s, r, o, i) => {
        const a = () => {
            if (!e.isMounted) {
                let i;
                const {el: a, props: c} = t;
                const {bm: l, m: f, parent: u, root: d, type: p} = e;
                const h = zn(t);
                or(e, false);
                if (l) {
                    L(l);
                }
                if (!h && (i = c && c.onVnodeBeforeMount)) {
                    ro(i, u, t);
                }
                or(e, true);
                {
                    if (d.ce) {
                        d.ce._injectChildStyle(p);
                    }
                    const i = e.subTree = _r(e);
                    y(null, i, n, s, e, r, o);
                    t.el = i.el;
                }
                if (f) {
                    tr(f, r);
                }
                if (!h && (i = c && c.onVnodeMounted)) {
                    const e = t;
                    tr((() => ro(i, u, e)), r);
                }
                if (t.shapeFlag & 256 || u && zn(u.vnode) && u.vnode.shapeFlag & 256) {
                    e.a && tr(e.a, r);
                }
                e.isMounted = true;
                t = n = s = null;
            } else {
                let {next: t, bu: n, u: s, parent: c, vnode: l} = e;
                {
                    const n = lr(e);
                    if (n) {
                        if (t) {
                            t.el = l.el;
                            R(e, t, i);
                        }
                        n.asyncDep.then((() => {
                            if (!e.isUnmounted) {
                                a();
                            }
                        }));
                        return;
                    }
                }
                let f = t;
                let u;
                or(e, false);
                if (t) {
                    t.el = l.el;
                    R(e, t, i);
                } else {
                    t = l;
                }
                if (n) {
                    L(n);
                }
                if (u = t.props && t.props.onVnodeBeforeUpdate) {
                    ro(u, c, t, l);
                }
                or(e, true);
                const d = _r(e);
                const p = e.subTree;
                e.subTree = d;
                y(p, d, h(p.el), Q(p), e, r, o);
                t.el = d.el;
                if (f === null) {
                    Er(e, d.el);
                }
                if (s) {
                    tr(s, r);
                }
                if (u = t.props && t.props.onVnodeUpdated) {
                    tr((() => ro(u, c, t, l)), r);
                }
            }
        };
        e.scope.on();
        const c = e.effect = new ce(a);
        e.scope.off();
        const l = e.update = c.run.bind(c);
        const f = e.job = c.runIfDirty.bind(c);
        f.i = e;
        f.id = e.uid;
        c.scheduler = () => hn(f);
        or(e, true);
        l();
    };
    const R = (e, t, n) => {
        t.component = e;
        const s = e.vnode.props;
        e.vnode = t;
        e.next = null;
        zs(e, t.props, s, n);
        er(e, t.children, n);
        ke();
        vn(e);
        Ce();
    };
    const $ = (e, t, n, s, r, o, i, a, c = false) => {
        const l = e && e.children;
        const f = e ? e.shapeFlag : 0;
        const u = t.children;
        const {patchFlag: d, shapeFlag: h} = t;
        if (d > 0) {
            if (d & 128) {
                V(l, u, n, s, r, o, i, a, c);
                return;
            } else if (d & 256) {
                z(l, u, n, s, r, o, i, a, c);
                return;
            }
        }
        if (h & 8) {
            if (f & 16) {
                K(l, r, o);
            }
            if (u !== l) {
                p(n, u);
            }
        } else {
            if (f & 16) {
                if (h & 16) {
                    V(l, u, n, s, r, o, i, a, c);
                } else {
                    K(l, r, o, true);
                }
            } else {
                if (f & 8) {
                    p(n, "");
                }
                if (h & 16) {
                    A(u, n, s, r, o, i, a, c);
                }
            }
        }
    };
    const z = (e, t, s, r, o, i, a, c, l) => {
        e = e || n;
        t = t || n;
        const f = e.length;
        const u = t.length;
        const d = Math.min(f, u);
        let p;
        for (p = 0; p < d; p++) {
            const n = t[p] = l ? to(t[p]) : eo(t[p]);
            y(e[p], n, s, null, o, i, a, c, l);
        }
        if (f > u) {
            K(e, o, i, true, false, d);
        } else {
            A(t, s, r, o, i, a, c, l, d);
        }
    };
    const V = (e, t, s, r, o, i, a, c, l) => {
        let f = 0;
        const u = t.length;
        let d = e.length - 1;
        let p = u - 1;
        while (f <= d && f <= p) {
            const n = e[f];
            const r = t[f] = l ? to(t[f]) : eo(t[f]);
            if (Wr(n, r)) {
                y(n, r, s, null, o, i, a, c, l);
            } else {
                break;
            }
            f++;
        }
        while (f <= d && f <= p) {
            const n = e[d];
            const r = t[p] = l ? to(t[p]) : eo(t[p]);
            if (Wr(n, r)) {
                y(n, r, s, null, o, i, a, c, l);
            } else {
                break;
            }
            d--;
            p--;
        }
        if (f > d) {
            if (f <= p) {
                const e = p + 1;
                const n = e < u ? t[e].el : r;
                while (f <= p) {
                    y(null, t[f] = l ? to(t[f]) : eo(t[f]), s, n, o, i, a, c, l);
                    f++;
                }
            }
        } else if (f > p) {
            while (f <= d) {
                W(e[f], o, i, true);
                f++;
            }
        } else {
            const h = f;
            const g = f;
            const m = new Map;
            for (f = g; f <= p; f++) {
                const e = t[f] = l ? to(t[f]) : eo(t[f]);
                if (e.key != null) {
                    m.set(e.key, f);
                }
            }
            let v;
            let b = 0;
            const w = p - g + 1;
            let x = false;
            let _ = 0;
            const k = new Array(w);
            for (f = 0; f < w; f++) k[f] = 0;
            for (f = h; f <= d; f++) {
                const n = e[f];
                if (b >= w) {
                    W(n, o, i, true);
                    continue;
                }
                let r;
                if (n.key != null) {
                    r = m.get(n.key);
                } else {
                    for (v = g; v <= p; v++) {
                        if (k[v - g] === 0 && Wr(n, t[v])) {
                            r = v;
                            break;
                        }
                    }
                }
                if (r === void 0) {
                    W(n, o, i, true);
                } else {
                    k[r - g] = f + 1;
                    if (r >= _) {
                        _ = r;
                    } else {
                        x = true;
                    }
                    y(n, t[r], s, null, o, i, a, c, l);
                    b++;
                }
            }
            const C = x ? cr(k) : n;
            v = C.length - 1;
            for (f = w - 1; f >= 0; f--) {
                const e = g + f;
                const n = t[e];
                const d = e + 1 < u ? t[e + 1].el : r;
                if (k[f] === 0) {
                    y(null, n, s, d, o, i, a, c, l);
                } else if (x) {
                    if (v < 0 || f !== C[v]) {
                        U(n, s, d, 2);
                    } else {
                        v--;
                    }
                }
            }
        }
    };
    const U = (e, t, n, s, r = null) => {
        const {el: o, type: a, transition: c, children: l, shapeFlag: f} = e;
        if (f & 6) {
            U(e.component.subTree, t, n, s);
            return;
        }
        if (f & 128) {
            e.suspense.move(t, n, s);
            return;
        }
        if (f & 64) {
            a.move(e, t, n, J);
            return;
        }
        if (a === jr) {
            i(o, t, n);
            for (let e = 0; e < l.length; e++) {
                U(l[e], t, n, s);
            }
            i(e.anchor, t, n);
            return;
        }
        if (a === Nr) {
            _(e, t, n);
            return;
        }
        const u = s !== 2 && f & 1 && c;
        if (u) {
            if (s === 0) {
                c.beforeEnter(o);
                i(o, t, n);
                tr((() => c.enter(o)), r);
            } else {
                const {leave: e, delayLeave: s, afterLeave: r} = c;
                const a = () => i(o, t, n);
                const l = () => {
                    e(o, (() => {
                        a();
                        r && r();
                    }));
                };
                if (s) {
                    s(o, a, l);
                } else {
                    l();
                }
            }
        } else {
            i(o, t, n);
        }
    };
    const W = (e, t, n, s = false, r = false) => {
        const {type: o, props: i, ref: a, children: c, dynamicChildren: l, shapeFlag: f, patchFlag: u, dirs: d, cacheIndex: p} = e;
        if (u === -2) {
            r = false;
        }
        if (a != null) {
            $n(a, null, n, e, true);
        }
        if (p != null) {
            t.renderCache[p] = void 0;
        }
        if (f & 256) {
            t.ctx.deactivate(e);
            return;
        }
        const h = f & 1 && d;
        const g = !zn(e);
        let m;
        if (g && (m = i && i.onVnodeBeforeUnmount)) {
            ro(m, t, e);
        }
        if (f & 6) {
            H(e.component, n, s);
        } else {
            if (f & 128) {
                e.suspense.unmount(n, s);
                return;
            }
            if (h) {
                On(e, null, t, "beforeUnmount");
            }
            if (f & 64) {
                e.type.remove(e, t, n, J, s);
            } else if (l && !l.hasOnce && (o !== jr || u > 0 && u & 64)) {
                K(l, t, n, false, true);
            } else if (o === jr && u & (128 | 256) || !r && f & 16) {
                K(c, t, n);
            }
            if (s) {
                G(e);
            }
        }
        if (g && (m = i && i.onVnodeUnmounted) || h) {
            tr((() => {
                m && ro(m, t, e);
                h && On(e, null, t, "unmounted");
            }), n);
        }
    };
    const G = e => {
        const {type: t, el: n, anchor: s, transition: r} = e;
        if (t === jr) {
            {
                q(n, s);
            }
            return;
        }
        if (t === Nr) {
            k(e);
            return;
        }
        const o = () => {
            a(n);
            if (r && !r.persisted && r.afterLeave) {
                r.afterLeave();
            }
        };
        if (e.shapeFlag & 1 && r && !r.persisted) {
            const {leave: t, delayLeave: s} = r;
            const i = () => t(n, o);
            if (s) {
                s(e.el, o, i);
            } else {
                i();
            }
        } else {
            o();
        }
    };
    const q = (e, t) => {
        let n;
        while (e !== t) {
            n = g(e);
            a(e);
            e = n;
        }
        a(t);
    };
    const H = (e, t, n) => {
        const {bum: s, scope: r, job: o, subTree: i, um: a, m: c, a: l} = e;
        fr(c);
        fr(l);
        if (s) {
            L(s);
        }
        r.stop();
        if (o) {
            o.flags |= 8;
            W(i, e, t, n);
        }
        if (a) {
            tr(a, t);
        }
        tr((() => {
            e.isUnmounted = true;
        }), t);
        if (t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId) {
            t.deps--;
            if (t.deps === 0) {
                t.resolve();
            }
        }
    };
    const K = (e, t, n, s = false, r = false, o = 0) => {
        for (let i = o; i < e.length; i++) {
            W(e[i], t, n, s, r);
        }
    };
    const Q = e => {
        if (e.shapeFlag & 6) {
            return Q(e.component.subTree);
        }
        if (e.shapeFlag & 128) {
            return e.suspense.next();
        }
        const t = g(e.anchor || e.el);
        const n = t && t[En];
        return n ? g(n) : t;
    };
    let X = false;
    const Y = (e, t, n) => {
        if (e == null) {
            if (t._vnode) {
                W(t._vnode, null, null, true);
            }
        } else {
            y(t._vnode || null, e, t, null, null, null, n);
        }
        t._vnode = e;
        if (!X) {
            X = true;
            vn();
            yn();
            X = false;
        }
    };
    const J = {
        p: y,
        um: W,
        m: U,
        r: G,
        mt: M,
        mc: A,
        pc: $,
        pbc: j,
        n: Q,
        o: e
    };
    let Z;
    return {
        render: Y,
        hydrate: Z,
        createApp: Ns(Y)
    };
}

function rr({type: e, props: t}, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}

function or({effect: e, job: t}, n) {
    if (n) {
        e.flags |= 32;
        t.flags |= 4;
    } else {
        e.flags &= -33;
        t.flags &= -5;
    }
}

function ir(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
}

function ar(e, t, n = false) {
    const s = e.children;
    const r = t.children;
    if (u(s) && u(r)) {
        for (let e = 0; e < s.length; e++) {
            const t = s[e];
            let o = r[e];
            if (o.shapeFlag & 1 && !o.dynamicChildren) {
                if (o.patchFlag <= 0 || o.patchFlag === 32) {
                    o = r[e] = to(r[e]);
                    o.el = t.el;
                }
                if (!n && o.patchFlag !== -2) ar(t, o);
            }
            if (o.type === Tr) {
                o.el = t.el;
            }
        }
    }
}

function cr(e) {
    const t = e.slice();
    const n = [ 0 ];
    let s, r, o, i, a;
    const c = e.length;
    for (s = 0; s < c; s++) {
        const c = e[s];
        if (c !== 0) {
            r = n[n.length - 1];
            if (e[r] < c) {
                t[s] = r;
                n.push(s);
                continue;
            }
            o = 0;
            i = n.length - 1;
            while (o < i) {
                a = o + i >> 1;
                if (e[n[a]] < c) {
                    o = a + 1;
                } else {
                    i = a;
                }
            }
            if (c < e[n[o]]) {
                if (o > 0) {
                    t[s] = n[o - 1];
                }
                n[o] = s;
            }
        }
    }
    o = n.length;
    i = n[o - 1];
    while (o-- > 0) {
        n[o] = i;
        i = t[i];
    }
    return n;
}

function lr(e) {
    const t = e.subTree.component;
    if (t) {
        if (t.asyncDep && !t.asyncResolved) {
            return t;
        } else {
            return lr(t);
        }
    }
}

function fr(e) {
    if (e) {
        for (let t = 0; t < e.length; t++) e[t].flags |= 8;
    }
}

const ur = Symbol.for("v-scx");

const dr = () => {
    {
        const e = Fs(ur);
        return e;
    }
};

function pr(e, t, n) {
    return hr(e, t, n);
}

function hr(e, n, r = t) {
    const {immediate: o, deep: i, flush: c, once: l} = r;
    const f = a({}, r);
    const u = n && o || !n && c !== "post";
    let d;
    if (mo) {
        if (c === "sync") {
            const e = dr();
            d = e.__watcherHandles || (e.__watcherHandles = []);
        } else if (!u) {
            const e = () => {};
            e.stop = s;
            e.resume = s;
            e.pause = s;
            return e;
        }
    }
    const p = co;
    f.call = (e, t, n) => tn(e, p, t, n);
    let h = false;
    if (c === "post") {
        f.scheduler = e => {
            tr(e, p && p.suspense);
        };
    } else if (c !== "sync") {
        h = true;
        f.scheduler = (e, t) => {
            if (t) {
                e();
            } else {
                hn(e);
            }
        };
    }
    f.augmentJob = e => {
        if (n) {
            e.flags |= 4;
        }
        if (h) {
            e.flags |= 2;
            if (p) {
                e.id = p.uid;
                e.i = p;
            }
        }
    };
    const g = Wt(e, n, f);
    if (mo) {
        if (d) {
            d.push(g);
        } else if (u) {
            g();
        }
    }
    return g;
}

function gr(e, t, n) {
    const s = this.proxy;
    const r = m(e) ? e.includes(".") ? mr(s, e) : () => s[e] : e.bind(s, s);
    let o;
    if (g(t)) {
        o = t;
    } else {
        o = t.handler;
        n = t;
    }
    const i = po(this);
    const a = hr(r, o.bind(s), n);
    i();
    return a;
}

function mr(e, t) {
    const n = t.split(".");
    return () => {
        let t = e;
        for (let e = 0; e < n.length && t; e++) {
            t = t[n[e]];
        }
        return t;
    };
}

const vr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${A(t)}Modifiers`] || e[`${j(t)}Modifiers`];

function yr(e, n, ...s) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || t;
    let o = s;
    const i = n.startsWith("update:");
    const a = i && vr(r, n.slice(7));
    if (a) {
        if (a.trim) {
            o = s.map((e => m(e) ? e.trim() : e));
        }
        if (a.number) {
            o = s.map(F);
        }
    }
    let c;
    let l = r[c = I(n)] || r[c = I(A(n))];
    if (!l && i) {
        l = r[c = I(j(n))];
    }
    if (l) {
        tn(l, e, 6, o);
    }
    const f = r[c + `Once`];
    if (f) {
        if (!e.emitted) {
            e.emitted = {};
        } else if (e.emitted[c]) {
            return;
        }
        e.emitted[c] = true;
        tn(f, e, 6, o);
    }
}

function br(e, t, n = false) {
    const s = t.emitsCache;
    const r = s.get(e);
    if (r !== void 0) {
        return r;
    }
    const o = e.emits;
    let i = {};
    let c = false;
    if (!g(e)) {
        const s = e => {
            const n = br(e, t, true);
            if (n) {
                c = true;
                a(i, n);
            }
        };
        if (!n && t.mixins.length) {
            t.mixins.forEach(s);
        }
        if (e.extends) {
            s(e.extends);
        }
        if (e.mixins) {
            e.mixins.forEach(s);
        }
    }
    if (!o && !c) {
        if (y(e)) {
            s.set(e, null);
        }
        return null;
    }
    if (u(o)) {
        o.forEach((e => i[e] = null));
    } else {
        a(i, o);
    }
    if (y(e)) {
        s.set(e, i);
    }
    return i;
}

function wr(e, t) {
    if (!e || !o(t)) {
        return false;
    }
    t = t.slice(2).replace(/Once$/, "");
    return f(e, t[0].toLowerCase() + t.slice(1)) || f(e, j(t)) || f(e, t);
}

function xr() {}

function _r(e) {
    const {type: t, vnode: n, proxy: s, withProxy: r, propsOptions: [o], slots: a, attrs: c, emit: l, render: f, renderCache: u, props: d, data: p, setupState: h, ctx: g, inheritAttrs: m} = e;
    const v = kn(e);
    let y;
    let b;
    try {
        if (n.shapeFlag & 4) {
            const e = r || s;
            const t = false ? new Proxy(e, {
                get(e, t, n) {
                    Kt(`Property '${String(t)}' was accessed via 'this'. Avoid using 'this' in templates.`);
                    return Reflect.get(e, t, n);
                }
            }) : e;
            y = eo(f.call(t, e, u, false ? wt(d) : d, h, p, g));
            b = c;
        } else {
            const e = t;
            if (false) ;
            y = eo(e.length > 1 ? e(false ? wt(d) : d, false ? {
                get attrs() {
                    xr();
                    return wt(c);
                },
                slots: a,
                emit: l
            } : {
                attrs: c,
                slots: a,
                emit: l
            }) : e(false ? wt(d) : d, null));
            b = t.props ? c : kr(c);
        }
    } catch (x) {
        Lr.length = 0;
        nn(x, e, 1);
        y = Kr(Ir);
    }
    let w = y;
    if (b && m !== false) {
        const e = Object.keys(b);
        const {shapeFlag: t} = w;
        if (e.length) {
            if (t & (1 | 6)) {
                if (o && e.some(i)) {
                    b = Cr(b, o);
                }
                w = Yr(w, b, false, true);
            }
        }
    }
    if (n.dirs) {
        w = Yr(w, null, false, true);
        w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs;
    }
    if (n.transition) {
        Fn(w, n.transition);
    }
    {
        y = w;
    }
    kn(v);
    return y;
}

const kr = e => {
    let t;
    for (const n in e) {
        if (n === "class" || n === "style" || o(n)) {
            (t || (t = {}))[n] = e[n];
        }
    }
    return t;
};

const Cr = (e, t) => {
    const n = {};
    for (const s in e) {
        if (!i(s) || !(s.slice(9) in t)) {
            n[s] = e[s];
        }
    }
    return n;
};

function Sr(e, t, n) {
    const {props: s, children: r, component: o} = e;
    const {props: i, children: a, patchFlag: c} = t;
    const l = o.emitsOptions;
    if (t.dirs || t.transition) {
        return true;
    }
    if (n && c >= 0) {
        if (c & 1024) {
            return true;
        }
        if (c & 16) {
            if (!s) {
                return !!i;
            }
            return Or(s, i, l);
        } else if (c & 8) {
            const e = t.dynamicProps;
            for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (i[n] !== s[n] && !wr(l, n)) {
                    return true;
                }
            }
        }
    } else {
        if (r || a) {
            if (!a || !a.$stable) {
                return true;
            }
        }
        if (s === i) {
            return false;
        }
        if (!s) {
            return !!i;
        }
        if (!i) {
            return true;
        }
        return Or(s, i, l);
    }
    return false;
}

function Or(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) {
        return true;
    }
    for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (t[o] !== e[o] && !wr(n, o)) {
            return true;
        }
    }
    return false;
}

function Er({vnode: e, parent: t}, n) {
    while (t) {
        const s = t.subTree;
        if (s.suspense && s.suspense.activeBranch === e) {
            s.el = e.el;
        }
        if (s === e) {
            (e = t.vnode).el = n;
            t = t.parent;
        } else {
            break;
        }
    }
}

const Ar = e => e.__isSuspense;

function Pr(e, t) {
    if (t && t.pendingBranch) {
        if (u(e)) {
            t.effects.push(...e);
        } else {
            t.effects.push(e);
        }
    } else {
        mn(e);
    }
}

const jr = Symbol.for("v-fgt");

const Tr = Symbol.for("v-txt");

const Ir = Symbol.for("v-cmt");

const Nr = Symbol.for("v-stc");

const Lr = [];

let Mr = null;

function Fr(e = false) {
    Lr.push(Mr = e ? null : []);
}

function Dr() {
    Lr.pop();
    Mr = Lr[Lr.length - 1] || null;
}

let Rr = 1;

function Br(e, t = false) {
    Rr += e;
    if (e < 0 && Mr && t) {
        Mr.hasOnce = true;
    }
}

function $r(e) {
    e.dynamicChildren = Rr > 0 ? Mr || n : null;
    Dr();
    if (Rr > 0 && Mr) {
        Mr.push(e);
    }
    return e;
}

function zr(e, t, n, s, r, o) {
    return $r(Hr(e, t, n, s, r, o, true));
}

function Vr(e, t, n, s, r) {
    return $r(Kr(e, t, n, s, r, true));
}

function Ur(e) {
    return e ? e.__v_isVNode === true : false;
}

function Wr(e, t) {
    return e.type === t.type && e.key === t.key;
}

const Gr = ({key: e}) => e != null ? e : null;

const qr = ({ref: e, ref_key: t, ref_for: n}) => {
    if (typeof e === "number") {
        e = "" + e;
    }
    return e != null ? m(e) || jt(e) || g(e) ? {
        i: xn,
        r: e,
        k: t,
        f: !!n
    } : e : null;
};

function Hr(e, t = null, n = null, s = 0, r = null, o = (e === jr ? 0 : 1), i = false, a = false) {
    const c = {
        __v_isVNode: true,
        __v_skip: true,
        type: e,
        props: t,
        key: t && Gr(t),
        ref: t && qr(t),
        scopeId: _n,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: xn
    };
    if (a) {
        no(c, n);
        if (o & 128) {
            e.normalize(c);
        }
    } else if (n) {
        c.shapeFlag |= m(n) ? 8 : 16;
    }
    if (Rr > 0 && !i && Mr && (c.patchFlag > 0 || o & 6) && c.patchFlag !== 32) {
        Mr.push(c);
    }
    return c;
}

const Kr = Qr;

function Qr(e, t = null, n = null, s = 0, r = null, o = false) {
    if (!e || e === as) {
        e = Ir;
    }
    if (Ur(e)) {
        const s = Yr(e, t, true);
        if (n) {
            no(s, n);
        }
        if (Rr > 0 && !o && Mr) {
            if (s.shapeFlag & 6) {
                Mr[Mr.indexOf(e)] = s;
            } else {
                Mr.push(s);
            }
        }
        s.patchFlag = -2;
        return s;
    }
    if (Ao(e)) {
        e = e.__vccOpts;
    }
    if (t) {
        t = Xr(t);
        let {class: e, style: n} = t;
        if (e && !m(e)) {
            t.class = G(e);
        }
        if (y(n)) {
            if (St(n) && !u(n)) {
                n = a({}, n);
            }
            t.style = $(n);
        }
    }
    const i = m(e) ? 1 : Ar(e) ? 128 : An(e) ? 64 : y(e) ? 4 : g(e) ? 2 : 0;
    return Hr(e, t, n, s, r, i, o, true);
}

function Xr(e) {
    if (!e) return null;
    return St(e) || Bs(e) ? a({}, e) : e;
}

function Yr(e, t, n = false, s = false) {
    const {props: r, ref: o, patchFlag: i, children: a, transition: c} = e;
    const l = t ? so(r || {}, t) : r;
    const f = {
        __v_isVNode: true,
        __v_skip: true,
        type: e.type,
        props: l,
        key: l && Gr(l),
        ref: t && t.ref ? n && o ? u(o) ? o.concat(qr(t)) : [ o, qr(t) ] : qr(t) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: a,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== jr ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: c,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Yr(e.ssContent),
        ssFallback: e.ssFallback && Yr(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    if (c && s) {
        Fn(f, c.clone(f));
    }
    return f;
}

function Jr(e = " ", t = 0) {
    return Kr(Tr, null, e, t);
}

function Zr(e = "", t = false) {
    return t ? (Fr(), Vr(Ir, null, e)) : Kr(Ir, null, e);
}

function eo(e) {
    if (e == null || typeof e === "boolean") {
        return Kr(Ir);
    } else if (u(e)) {
        return Kr(jr, null, e.slice());
    } else if (Ur(e)) {
        return to(e);
    } else {
        return Kr(Tr, null, String(e));
    }
}

function to(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Yr(e);
}

function no(e, t) {
    let n = 0;
    const {shapeFlag: s} = e;
    if (t == null) {
        t = null;
    } else if (u(t)) {
        n = 16;
    } else if (typeof t === "object") {
        if (s & (1 | 64)) {
            const n = t.default;
            if (n) {
                n._c && (n._d = false);
                no(e, n());
                n._c && (n._d = true);
            }
            return;
        } else {
            n = 32;
            const s = t._;
            if (!s && !Bs(t)) {
                t._ctx = xn;
            } else if (s === 3 && xn) {
                if (xn.slots._ === 1) {
                    t._ = 1;
                } else {
                    t._ = 2;
                    e.patchFlag |= 1024;
                }
            }
        }
    } else if (g(t)) {
        t = {
            default: t,
            _ctx: xn
        };
        n = 32;
    } else {
        t = String(t);
        if (s & 64) {
            n = 16;
            t = [ Jr(t) ];
        } else {
            n = 8;
        }
    }
    e.children = t;
    e.shapeFlag |= n;
}

function so(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const e in s) {
            if (e === "class") {
                if (t.class !== s.class) {
                    t.class = G([ t.class, s.class ]);
                }
            } else if (e === "style") {
                t.style = $([ t.style, s.style ]);
            } else if (o(e)) {
                const n = t[e];
                const r = s[e];
                if (r && n !== r && !(u(n) && n.includes(r))) {
                    t[e] = n ? [].concat(n, r) : r;
                }
            } else if (e !== "") {
                t[e] = s[e];
            }
        }
    }
    return t;
}

function ro(e, t, n, s = null) {
    tn(e, t, 7, [ n, s ]);
}

const oo = Ts();

let io = 0;

function ao(e, n, s) {
    const r = e.type;
    const o = (n ? n.appContext : e.appContext) || oo;
    const i = {
        uid: io++,
        vnode: e,
        type: r,
        parent: n,
        appContext: o,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new se(true),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: n ? n.provides : Object.create(o.provides),
        ids: n ? n.ids : [ "", 0, 0 ],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Gs(r, o),
        emitsOptions: br(r, o),
        emit: null,
        emitted: null,
        propsDefaults: t,
        inheritAttrs: r.inheritAttrs,
        ctx: t,
        data: t,
        props: t,
        attrs: t,
        slots: t,
        refs: t,
        setupState: t,
        setupContext: null,
        suspense: s,
        suspenseId: s ? s.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    {
        i.ctx = {
            _: i
        };
    }
    i.root = n ? n.root : i;
    i.emit = yr.bind(null, i);
    if (e.ce) {
        e.ce(i);
    }
    return i;
}

let co = null;

const lo = () => co || xn;

let fo;

let uo;

{
    const e = B();
    const t = (t, n) => {
        let s;
        if (!(s = e[t])) s = e[t] = [];
        s.push(n);
        return e => {
            if (s.length > 1) s.forEach((t => t(e))); else s[0](e);
        };
    };
    fo = t(`__VUE_INSTANCE_SETTERS__`, (e => co = e));
    uo = t(`__VUE_SSR_SETTERS__`, (e => mo = e));
}

const po = e => {
    const t = co;
    fo(e);
    e.scope.on();
    return () => {
        e.scope.off();
        fo(t);
    };
};

const ho = () => {
    co && co.scope.off();
    fo(null);
};

function go(e) {
    return e.vnode.shapeFlag & 4;
}

let mo = false;

function vo(e, t = false, n = false) {
    t && uo(t);
    const {props: s, children: r} = e.vnode;
    const o = go(e);
    $s(e, s, o, t);
    Zs(e, r, n);
    const i = o ? yo(e, t) : void 0;
    t && uo(false);
    return i;
}

function yo(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null);
    e.proxy = new Proxy(e.ctx, hs);
    const {setup: s} = n;
    if (s) {
        ke();
        const n = e.setupContext = s.length > 1 ? _o(e) : null;
        const r = po(e);
        const o = en(s, e, 0, [ e.props, n ]);
        const i = b(o);
        Ce();
        r();
        if ((i || e.sp) && !zn(e)) {
            Bn(e);
        }
        if (i) {
            o.then(ho, ho);
            if (t) {
                return o.then((t => {
                    bo(e, t);
                })).catch((t => {
                    nn(t, e, 0);
                }));
            } else {
                e.asyncDep = o;
            }
        } else {
            bo(e, o);
        }
    } else {
        wo(e);
    }
}

function bo(e, t, n) {
    if (g(t)) {
        if (e.type.__ssrInlineRender) {
            e.ssrRender = t;
        } else {
            e.render = t;
        }
    } else if (y(t)) {
        e.setupState = Dt(t);
    } else ;
    wo(e);
}

function wo(e, t, n) {
    const r = e.type;
    if (!e.render) {
        e.render = r.render || s;
    }
    {
        const t = po(e);
        ke();
        try {
            vs(e);
        } finally {
            Ce();
            t();
        }
    }
}

const xo = {
    get(e, t) {
        Le(e, "get", "");
        return e[t];
    }
};

function _o(e) {
    const t = t => {
        e.exposed = t || {};
    };
    {
        return {
            attrs: new Proxy(e.attrs, xo),
            slots: e.slots,
            emit: e.emit,
            expose: t
        };
    }
}

function ko(e) {
    if (e.exposed) {
        return e.exposeProxy || (e.exposeProxy = new Proxy(Dt(Et(e.exposed)), {
            get(t, n) {
                if (n in t) {
                    return t[n];
                } else if (n in ds) {
                    return ds[n](e);
                }
            },
            has(e, t) {
                return t in e || t in ds;
            }
        }));
    } else {
        return e.proxy;
    }
}

const Co = /(?:^|[-_])(\w)/g;

const So = e => e.replace(Co, (e => e.toUpperCase())).replace(/[-_]/g, "");

function Oo(e, t = true) {
    return g(e) ? e.displayName || e.name : e.name || t && e.__name;
}

function Eo(e, t, n = false) {
    let s = Oo(t);
    if (!s && t.__file) {
        const e = t.__file.match(/([^/\\]+)\.\w+$/);
        if (e) {
            s = e[1];
        }
    }
    if (!s && e && e.parent) {
        const n = e => {
            for (const n in e) {
                if (e[n] === t) {
                    return n;
                }
            }
        };
        s = n(e.components || e.parent.type.components) || n(e.appContext.components);
    }
    return s ? So(s) : n ? `App` : `Anonymous`;
}

function Ao(e) {
    return g(e) && "__vccOpts" in e;
}

const Po = (e, t) => {
    const n = Bt(e, t, mo);
    return n;
};

function jo(e, t, n) {
    const s = arguments.length;
    if (s === 2) {
        if (y(t) && !u(t)) {
            if (Ur(t)) {
                return Kr(e, null, [ t ]);
            }
            return Kr(e, t);
        } else {
            return Kr(e, null, t);
        }
    } else {
        if (s > 3) {
            n = Array.prototype.slice.call(arguments, 2);
        } else if (s === 3 && Ur(n)) {
            n = [ n ];
        }
        return Kr(e, t, n);
    }
}

const To = "3.5.13";

/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/ let Io = void 0;

const No = typeof window !== "undefined" && window.trustedTypes;

if (No) {
    try {
        Io = No.createPolicy("vue", {
            createHTML: e => e
        });
    } catch (Wv) {}
}

const Lo = Io ? e => Io.createHTML(e) : e => e;

const Mo = "http://www.w3.org/2000/svg";

const Fo = "http://www.w3.org/1998/Math/MathML";

const Do = typeof document !== "undefined" ? document : null;

const Ro = Do && Do.createElement("template");

const Bo = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null);
    },
    remove: e => {
        const t = e.parentNode;
        if (t) {
            t.removeChild(e);
        }
    },
    createElement: (e, t, n, s) => {
        const r = t === "svg" ? Do.createElementNS(Mo, e) : t === "mathml" ? Do.createElementNS(Fo, e) : n ? Do.createElement(e, {
            is: n
        }) : Do.createElement(e);
        if (e === "select" && s && s.multiple != null) {
            r.setAttribute("multiple", s.multiple);
        }
        return r;
    },
    createText: e => Do.createTextNode(e),
    createComment: e => Do.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t;
    },
    setElementText: (e, t) => {
        e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Do.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
        const i = n ? n.previousSibling : t.lastChild;
        if (r && (r === o || r.nextSibling)) {
            while (true) {
                t.insertBefore(r.cloneNode(true), n);
                if (r === o || !(r = r.nextSibling)) break;
            }
        } else {
            Ro.innerHTML = Lo(s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e);
            const r = Ro.content;
            if (s === "svg" || s === "mathml") {
                const e = r.firstChild;
                while (e.firstChild) {
                    r.appendChild(e.firstChild);
                }
                r.removeChild(e);
            }
            t.insertBefore(r, n);
        }
        return [ i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild ];
    }
};

const $o = "transition";

const zo = "animation";

const Vo = Symbol("_vtc");

const Uo = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: true
    },
    duration: [ String, Number, Object ],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};

const Wo = a({}, Nn, Uo);

const Go = (e, t = []) => {
    if (u(e)) {
        e.forEach((e => e(...t)));
    } else if (e) {
        e(...t);
    }
};

const qo = e => e ? u(e) ? e.some((e => e.length > 1)) : e.length > 1 : false;

function Ho(e) {
    const t = {};
    for (const a in e) {
        if (!(a in Uo)) {
            t[a] = e[a];
        }
    }
    if (e.css === false) {
        return t;
    }
    const {name: n = "v", type: s, duration: r, enterFromClass: o = `${n}-enter-from`, enterActiveClass: i = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = o, appearActiveClass: f = i, appearToClass: u = c, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: h = `${n}-leave-to`} = e;
    const g = Ko(r);
    const m = g && g[0];
    const v = g && g[1];
    const {onBeforeEnter: y, onEnter: b, onEnterCancelled: w, onLeave: x, onLeaveCancelled: _, onBeforeAppear: k = y, onAppear: C = b, onAppearCancelled: S = w} = t;
    const O = (e, t, n, s) => {
        e._enterCancelled = s;
        Yo(e, t ? u : c);
        Yo(e, t ? f : i);
        n && n();
    };
    const E = (e, t) => {
        e._isLeaving = false;
        Yo(e, d);
        Yo(e, h);
        Yo(e, p);
        t && t();
    };
    const A = e => (t, n) => {
        const r = e ? C : b;
        const i = () => O(t, e, n);
        Go(r, [ t, i ]);
        Jo((() => {
            Yo(t, e ? l : o);
            Xo(t, e ? u : c);
            if (!qo(r)) {
                ei(t, s, m, i);
            }
        }));
    };
    return a(t, {
        onBeforeEnter(e) {
            Go(y, [ e ]);
            Xo(e, o);
            Xo(e, i);
        },
        onBeforeAppear(e) {
            Go(k, [ e ]);
            Xo(e, l);
            Xo(e, f);
        },
        onEnter: A(false),
        onAppear: A(true),
        onLeave(e, t) {
            e._isLeaving = true;
            const n = () => E(e, t);
            Xo(e, d);
            if (!e._enterCancelled) {
                ri();
                Xo(e, p);
            } else {
                Xo(e, p);
                ri();
            }
            Jo((() => {
                if (!e._isLeaving) {
                    return;
                }
                Yo(e, d);
                Xo(e, h);
                if (!qo(x)) {
                    ei(e, s, v, n);
                }
            }));
            Go(x, [ e, n ]);
        },
        onEnterCancelled(e) {
            O(e, false, void 0, true);
            Go(w, [ e ]);
        },
        onAppearCancelled(e) {
            O(e, true, void 0, true);
            Go(S, [ e ]);
        },
        onLeaveCancelled(e) {
            E(e);
            Go(_, [ e ]);
        }
    });
}

function Ko(e) {
    if (e == null) {
        return null;
    } else if (y(e)) {
        return [ Qo(e.enter), Qo(e.leave) ];
    } else {
        const t = Qo(e);
        return [ t, t ];
    }
}

function Qo(e) {
    const t = D(e);
    return t;
}

function Xo(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.add(t)));
    (e[Vo] || (e[Vo] = new Set)).add(t);
}

function Yo(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
    const n = e[Vo];
    if (n) {
        n.delete(t);
        if (!n.size) {
            e[Vo] = void 0;
        }
    }
}

function Jo(e) {
    requestAnimationFrame((() => {
        requestAnimationFrame(e);
    }));
}

let Zo = 0;

function ei(e, t, n, s) {
    const r = e._endId = ++Zo;
    const o = () => {
        if (r === e._endId) {
            s();
        }
    };
    if (n != null) {
        return setTimeout(o, n);
    }
    const {type: i, timeout: a, propCount: c} = ti(e, t);
    if (!i) {
        return s();
    }
    const l = i + "end";
    let f = 0;
    const u = () => {
        e.removeEventListener(l, d);
        o();
    };
    const d = t => {
        if (t.target === e && ++f >= c) {
            u();
        }
    };
    setTimeout((() => {
        if (f < c) {
            u();
        }
    }), a + 1);
    e.addEventListener(l, d);
}

function ti(e, t) {
    const n = window.getComputedStyle(e);
    const s = e => (n[e] || "").split(", ");
    const r = s(`${$o}Delay`);
    const o = s(`${$o}Duration`);
    const i = ni(r, o);
    const a = s(`${zo}Delay`);
    const c = s(`${zo}Duration`);
    const l = ni(a, c);
    let f = null;
    let u = 0;
    let d = 0;
    if (t === $o) {
        if (i > 0) {
            f = $o;
            u = i;
            d = o.length;
        }
    } else if (t === zo) {
        if (l > 0) {
            f = zo;
            u = l;
            d = c.length;
        }
    } else {
        u = Math.max(i, l);
        f = u > 0 ? i > l ? $o : zo : null;
        d = f ? f === $o ? o.length : c.length : 0;
    }
    const p = f === $o && /\b(transform|all)(,|$)/.test(s(`${$o}Property`).toString());
    return {
        type: f,
        timeout: u,
        propCount: d,
        hasTransform: p
    };
}

function ni(e, t) {
    while (e.length < t.length) {
        e = e.concat(e);
    }
    return Math.max(...t.map(((t, n) => si(t) + si(e[n]))));
}

function si(e) {
    if (e === "auto") return 0;
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}

function ri() {
    return document.body.offsetHeight;
}

function oi(e, t, n) {
    const s = e[Vo];
    if (s) {
        t = (t ? [ t, ...s ] : [ ...s ]).join(" ");
    }
    if (t == null) {
        e.removeAttribute("class");
    } else if (n) {
        e.setAttribute("class", t);
    } else {
        e.className = t;
    }
}

const ii = Symbol("_vod");

const ai = Symbol("_vsh");

const ci = Symbol("");

const li = /(^|;)\s*display\s*:/;

function fi(e, t, n) {
    const s = e.style;
    const r = m(n);
    let o = false;
    if (n && !r) {
        if (t) {
            if (!m(t)) {
                for (const e in t) {
                    if (n[e] == null) {
                        di(s, e, "");
                    }
                }
            } else {
                for (const e of t.split(";")) {
                    const t = e.slice(0, e.indexOf(":")).trim();
                    if (n[t] == null) {
                        di(s, t, "");
                    }
                }
            }
        }
        for (const e in n) {
            if (e === "display") {
                o = true;
            }
            di(s, e, n[e]);
        }
    } else {
        if (r) {
            if (t !== n) {
                const e = s[ci];
                if (e) {
                    n += ";" + e;
                }
                s.cssText = n;
                o = li.test(n);
            }
        } else if (t) {
            e.removeAttribute("style");
        }
    }
    if (ii in e) {
        e[ii] = o ? s.display : "";
        if (e[ai]) {
            s.display = "none";
        }
    }
}

const ui = /\s*!important$/;

function di(e, t, n) {
    if (u(n)) {
        n.forEach((n => di(e, t, n)));
    } else {
        if (n == null) n = "";
        if (t.startsWith("--")) {
            e.setProperty(t, n);
        } else {
            const s = gi(e, t);
            if (ui.test(n)) {
                e.setProperty(j(s), n.replace(ui, ""), "important");
            } else {
                e[s] = n;
            }
        }
    }
}

const pi = [ "Webkit", "Moz", "ms" ];

const hi = {};

function gi(e, t) {
    const n = hi[t];
    if (n) {
        return n;
    }
    let s = A(t);
    if (s !== "filter" && s in e) {
        return hi[t] = s;
    }
    s = T(s);
    for (let r = 0; r < pi.length; r++) {
        const n = pi[r] + s;
        if (n in e) {
            return hi[t] = n;
        }
    }
    return t;
}

const mi = "http://www.w3.org/1999/xlink";

function vi(e, t, n, s, r, o = H(t)) {
    if (s && t.startsWith("xlink:")) {
        if (n == null) {
            e.removeAttributeNS(mi, t.slice(6, t.length));
        } else {
            e.setAttributeNS(mi, t, n);
        }
    } else {
        if (n == null || o && !K(n)) {
            e.removeAttribute(t);
        } else {
            e.setAttribute(t, o ? "" : v(n) ? String(n) : n);
        }
    }
}

function yi(e, t, n, s, r) {
    if (t === "innerHTML" || t === "textContent") {
        if (n != null) {
            e[t] = t === "innerHTML" ? Lo(n) : n;
        }
        return;
    }
    const o = e.tagName;
    if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
        const s = o === "OPTION" ? e.getAttribute("value") || "" : e.value;
        const r = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
        if (s !== r || !("_value" in e)) {
            e.value = r;
        }
        if (n == null) {
            e.removeAttribute(t);
        }
        e._value = n;
        return;
    }
    let i = false;
    if (n === "" || n == null) {
        const s = typeof e[t];
        if (s === "boolean") {
            n = K(n);
        } else if (n == null && s === "string") {
            n = "";
            i = true;
        } else if (s === "number") {
            n = 0;
            i = true;
        }
    }
    try {
        e[t] = n;
    } catch (Wv) {}
    i && e.removeAttribute(r || t);
}

function bi(e, t, n, s) {
    e.addEventListener(t, n, s);
}

function wi(e, t, n, s) {
    e.removeEventListener(t, n, s);
}

const xi = Symbol("_vei");

function _i(e, t, n, s, r = null) {
    const o = e[xi] || (e[xi] = {});
    const i = o[t];
    if (s && i) {
        i.value = s;
    } else {
        const [n, a] = Ci(t);
        if (s) {
            const i = o[t] = Ai(s, r);
            bi(e, n, i, a);
        } else if (i) {
            wi(e, n, i, a);
            o[t] = void 0;
        }
    }
}

const ki = /(?:Once|Passive|Capture)$/;

function Ci(e) {
    let t;
    if (ki.test(e)) {
        t = {};
        let n;
        while (n = e.match(ki)) {
            e = e.slice(0, e.length - n[0].length);
            t[n[0].toLowerCase()] = true;
        }
    }
    const n = e[2] === ":" ? e.slice(3) : j(e.slice(2));
    return [ n, t ];
}

let Si = 0;

const Oi = Promise.resolve();

const Ei = () => Si || (Oi.then((() => Si = 0)), Si = Date.now());

function Ai(e, t) {
    const n = e => {
        if (!e._vts) {
            e._vts = Date.now();
        } else if (e._vts <= n.attached) {
            return;
        }
        tn(Pi(e, n.value), t, 5, [ e ]);
    };
    n.value = e;
    n.attached = Ei();
    return n;
}

function Pi(e, t) {
    if (u(t)) {
        const n = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
            n.call(e);
            e._stopped = true;
        };
        return t.map((e => t => !t._stopped && e && e(t)));
    } else {
        return t;
    }
}

const ji = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123;

const Ti = (e, t, n, s, r, a) => {
    const c = r === "svg";
    if (t === "class") {
        oi(e, s, c);
    } else if (t === "style") {
        fi(e, n, s);
    } else if (o(t)) {
        if (!i(t)) {
            _i(e, t, n, s, a);
        }
    } else if (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), 
    false) : Ii(e, t, s, c)) {
        yi(e, t, s);
        if (!e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected")) {
            vi(e, t, s, c, a, t !== "value");
        }
    } else if (e._isVueCE && (/[A-Z]/.test(t) || !m(s))) {
        yi(e, A(t), s, a, t);
    } else {
        if (t === "true-value") {
            e._trueValue = s;
        } else if (t === "false-value") {
            e._falseValue = s;
        }
        vi(e, t, s, c);
    }
};

function Ii(e, t, n, s) {
    if (s) {
        if (t === "innerHTML" || t === "textContent") {
            return true;
        }
        if (t in e && ji(t) && g(n)) {
            return true;
        }
        return false;
    }
    if (t === "spellcheck" || t === "draggable" || t === "translate") {
        return false;
    }
    if (t === "form") {
        return false;
    }
    if (t === "list" && e.tagName === "INPUT") {
        return false;
    }
    if (t === "type" && e.tagName === "TEXTAREA") {
        return false;
    }
    if (t === "width" || t === "height") {
        const t = e.tagName;
        if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") {
            return false;
        }
    }
    if (ji(t) && m(n)) {
        return false;
    }
    return t in e;
}

const Ni = new WeakMap;

const Li = new WeakMap;

const Mi = Symbol("_moveCb");

const Fi = Symbol("_enterCb");

const Di = e => {
    delete e.props.mode;
    return e;
};

const Ri = Di({
    name: "TransitionGroup",
    props: a({}, Wo, {
        tag: String,
        moveClass: String
    }),
    setup(e, {slots: t}) {
        const n = lo();
        const s = Tn();
        let r;
        let o;
        Jn((() => {
            if (!r.length) {
                return;
            }
            const t = e.moveClass || `${e.name || "v"}-move`;
            if (!Ui(r[0].el, n.vnode.el, t)) {
                return;
            }
            r.forEach($i);
            r.forEach(zi);
            const s = r.filter(Vi);
            ri();
            s.forEach((e => {
                const n = e.el;
                const s = n.style;
                Xo(n, t);
                s.transform = s.webkitTransform = s.transitionDuration = "";
                const r = n[Mi] = e => {
                    if (e && e.target !== n) {
                        return;
                    }
                    if (!e || /transform$/.test(e.propertyName)) {
                        n.removeEventListener("transitionend", r);
                        n[Mi] = null;
                        Yo(n, t);
                    }
                };
                n.addEventListener("transitionend", r);
            }));
        }));
        return () => {
            const i = Ot(e);
            const a = Ho(i);
            let c = i.tag || jr;
            r = [];
            if (o) {
                for (let e = 0; e < o.length; e++) {
                    const t = o[e];
                    if (t.el && t.el instanceof Element) {
                        r.push(t);
                        Fn(t, Mn(t, a, s, n));
                        Ni.set(t, t.el.getBoundingClientRect());
                    }
                }
            }
            o = t.default ? Dn(t.default()) : [];
            for (let e = 0; e < o.length; e++) {
                const t = o[e];
                if (t.key != null) {
                    Fn(t, Mn(t, a, s, n));
                }
            }
            return Kr(c, null, o);
        };
    }
});

const Bi = Ri;

function $i(e) {
    const t = e.el;
    if (t[Mi]) {
        t[Mi]();
    }
    if (t[Fi]) {
        t[Fi]();
    }
}

function zi(e) {
    Li.set(e, e.el.getBoundingClientRect());
}

function Vi(e) {
    const t = Ni.get(e);
    const n = Li.get(e);
    const s = t.left - n.left;
    const r = t.top - n.top;
    if (s || r) {
        const t = e.el.style;
        t.transform = t.webkitTransform = `translate(${s}px,${r}px)`;
        t.transitionDuration = "0s";
        return e;
    }
}

function Ui(e, t, n) {
    const s = e.cloneNode();
    const r = e[Vo];
    if (r) {
        r.forEach((e => {
            e.split(/\s+/).forEach((e => e && s.classList.remove(e)));
        }));
    }
    n.split(/\s+/).forEach((e => e && s.classList.add(e)));
    s.style.display = "none";
    const o = t.nodeType === 1 ? t : t.parentNode;
    o.appendChild(s);
    const {hasTransform: i} = ti(s);
    o.removeChild(s);
    return i;
}

const Wi = e => {
    const t = e.props["onUpdate:modelValue"] || false;
    return u(t) ? e => L(t, e) : t;
};

function Gi(e) {
    e.target.composing = true;
}

function qi(e) {
    const t = e.target;
    if (t.composing) {
        t.composing = false;
        t.dispatchEvent(new Event("input"));
    }
}

const Hi = Symbol("_assign");

const Ki = {
    created(e, {modifiers: {lazy: t, trim: n, number: s}}, r) {
        e[Hi] = Wi(r);
        const o = s || r.props && r.props.type === "number";
        bi(e, t ? "change" : "input", (t => {
            if (t.target.composing) return;
            let s = e.value;
            if (n) {
                s = s.trim();
            }
            if (o) {
                s = F(s);
            }
            e[Hi](s);
        }));
        if (n) {
            bi(e, "change", (() => {
                e.value = e.value.trim();
            }));
        }
        if (!t) {
            bi(e, "compositionstart", Gi);
            bi(e, "compositionend", qi);
            bi(e, "change", qi);
        }
    },
    mounted(e, {value: t}) {
        e.value = t == null ? "" : t;
    },
    beforeUpdate(e, {value: t, oldValue: n, modifiers: {lazy: s, trim: r, number: o}}, i) {
        e[Hi] = Wi(i);
        if (e.composing) return;
        const a = (o || e.type === "number") && !/^0\d/.test(e.value) ? F(e.value) : e.value;
        const c = t == null ? "" : t;
        if (a === c) {
            return;
        }
        if (document.activeElement === e && e.type !== "range") {
            if (s && t === n) {
                return;
            }
            if (r && e.value.trim() === c) {
                return;
            }
        }
        e.value = c;
    }
};

const Qi = {
    deep: true,
    created(e, t, n) {
        e[Hi] = Wi(n);
        bi(e, "change", (() => {
            const t = e._modelValue;
            const n = ea(e);
            const s = e.checked;
            const r = e[Hi];
            if (u(t)) {
                const e = Y(t, n);
                const o = e !== -1;
                if (s && !o) {
                    r(t.concat(n));
                } else if (!s && o) {
                    const n = [ ...t ];
                    n.splice(e, 1);
                    r(n);
                }
            } else if (p(t)) {
                const e = new Set(t);
                if (s) {
                    e.add(n);
                } else {
                    e.delete(n);
                }
                r(e);
            } else {
                r(ta(e, s));
            }
        }));
    },
    mounted: Xi,
    beforeUpdate(e, t, n) {
        e[Hi] = Wi(n);
        Xi(e, t, n);
    }
};

function Xi(e, {value: t, oldValue: n}, s) {
    e._modelValue = t;
    let r;
    if (u(t)) {
        r = Y(t, s.props.value) > -1;
    } else if (p(t)) {
        r = t.has(s.props.value);
    } else {
        if (t === n) return;
        r = X(t, ta(e, true));
    }
    if (e.checked !== r) {
        e.checked = r;
    }
}

const Yi = {
    created(e, {value: t}, n) {
        e.checked = X(t, n.props.value);
        e[Hi] = Wi(n);
        bi(e, "change", (() => {
            e[Hi](ea(e));
        }));
    },
    beforeUpdate(e, {value: t, oldValue: n}, s) {
        e[Hi] = Wi(s);
        if (t !== n) {
            e.checked = X(t, s.props.value);
        }
    }
};

const Ji = {
    deep: true,
    created(e, {value: t, modifiers: {number: n}}, s) {
        const r = p(t);
        bi(e, "change", (() => {
            const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => n ? F(ea(e)) : ea(e)));
            e[Hi](e.multiple ? r ? new Set(t) : t : t[0]);
            e._assigning = true;
            dn((() => {
                e._assigning = false;
            }));
        }));
        e[Hi] = Wi(s);
    },
    mounted(e, {value: t}) {
        Zi(e, t);
    },
    beforeUpdate(e, t, n) {
        e[Hi] = Wi(n);
    },
    updated(e, {value: t}) {
        if (!e._assigning) {
            Zi(e, t);
        }
    }
};

function Zi(e, t) {
    const n = e.multiple;
    const s = u(t);
    if (n && !s && !p(t)) {
        return;
    }
    for (let r = 0, o = e.options.length; r < o; r++) {
        const o = e.options[r];
        const i = ea(o);
        if (n) {
            if (s) {
                const e = typeof i;
                if (e === "string" || e === "number") {
                    o.selected = t.some((e => String(e) === String(i)));
                } else {
                    o.selected = Y(t, i) > -1;
                }
            } else {
                o.selected = t.has(i);
            }
        } else if (X(ea(o), t)) {
            if (e.selectedIndex !== r) e.selectedIndex = r;
            return;
        }
    }
    if (!n && e.selectedIndex !== -1) {
        e.selectedIndex = -1;
    }
}

function ea(e) {
    return "_value" in e ? e._value : e.value;
}

function ta(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
}

const na = {
    created(e, t, n) {
        ra(e, t, n, null, "created");
    },
    mounted(e, t, n) {
        ra(e, t, n, null, "mounted");
    },
    beforeUpdate(e, t, n, s) {
        ra(e, t, n, s, "beforeUpdate");
    },
    updated(e, t, n, s) {
        ra(e, t, n, s, "updated");
    }
};

function sa(e, t) {
    switch (e) {
      case "SELECT":
        return Ji;

      case "TEXTAREA":
        return Ki;

      default:
        switch (t) {
          case "checkbox":
            return Qi;

          case "radio":
            return Yi;

          default:
            return Ki;
        }
    }
}

function ra(e, t, n, s, r) {
    const o = sa(e.tagName, n.props && n.props.type);
    const i = o[r];
    i && i(e, t, n, s);
}

const oa = a({
    patchProp: Ti
}, Bo);

let ia;

function aa() {
    return ia || (ia = nr(oa));
}

const ca = (...e) => {
    const t = aa().createApp(...e);
    const {mount: n} = t;
    t.mount = e => {
        const s = fa(e);
        if (!s) return;
        const r = t._component;
        if (!g(r) && !r.render && !r.template) {
            r.template = s.innerHTML;
        }
        if (s.nodeType === 1) {
            s.textContent = "";
        }
        const o = n(s, false, la(s));
        if (s instanceof Element) {
            s.removeAttribute("v-cloak");
            s.setAttribute("data-v-app", "");
        }
        return o;
    };
    return t;
};

function la(e) {
    if (e instanceof SVGElement) {
        return "svg";
    }
    if (typeof MathMLElement === "function" && e instanceof MathMLElement) {
        return "mathml";
    }
}

function fa(e) {
    if (m(e)) {
        const t = document.querySelector(e);
        return t;
    }
    return e;
}

const ua = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) {
        n[s] = r;
    }
    return n;
};

const da = {
    name: "NavBar",
    computed: {
        currentTab() {
            return this.$route.query.tab || "";
        }
    },
    methods: {
        isActiveTab(e) {
            return this.currentTab === e;
        }
    }
};

const pa = {
    class: "nav-bar"
};

function ha(e, t, n, s, r, o) {
    const i = is("router-link");
    return Fr(), zr("nav", pa, [ Hr("ul", null, [ Hr("li", null, [ Kr(i, {
        to: {
            path: "/wp-admin/admin.php",
            query: {
                page: "pathwise-badge-connect"
            }
        },
        class: G({
            active: o.isActiveTab("")
        })
    }, {
        default: Cn((() => t[0] || (t[0] = [ Jr(" Badges ") ]))),
        _: 1
    }, 8, [ "class" ]) ]), Hr("li", null, [ Kr(i, {
        to: {
            path: "/wp-admin/admin.php",
            query: {
                page: "pathwise-badge-connect",
                tab: "triggers"
            }
        },
        class: G({
            active: o.isActiveTab("triggers")
        })
    }, {
        default: Cn((() => t[1] || (t[1] = [ Jr(" Triggers ") ]))),
        _: 1
    }, 8, [ "class" ]) ]), Hr("li", null, [ Kr(i, {
        to: {
            path: "/wp-admin/admin.php",
            query: {
                page: "pathwise-badge-connect",
                tab: "settings"
            }
        },
        class: G({
            active: o.isActiveTab("settings")
        })
    }, {
        default: Cn((() => t[2] || (t[2] = [ Jr(" Settings ") ]))),
        _: 1
    }, 8, [ "class" ]) ]), Hr("li", null, [ Kr(i, {
        to: {
            path: "/wp-admin/admin.php",
            query: {
                page: "pathwise-badge-connect",
                tab: "log"
            }
        },
        class: G({
            active: o.isActiveTab("log")
        })
    }, {
        default: Cn((() => t[3] || (t[3] = [ Jr(" Log ") ]))),
        _: 1
    }, 8, [ "class" ]) ]) ]) ]);
}

const ga = ua(da, [ [ "render", ha ], [ "__scopeId", "data-v-cbb64805" ] ]);

function ma() {
    return va().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}

function va() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
}

const ya = typeof Proxy === "function";

const ba = "devtools-plugin:setup";

const wa = "plugin:settings:set";

let xa;

let _a;

function ka() {
    var e;
    if (xa !== void 0) {
        return xa;
    }
    if (typeof window !== "undefined" && window.performance) {
        xa = true;
        _a = window.performance;
    } else if (typeof globalThis !== "undefined" && ((e = globalThis.perf_hooks) === null || e === void 0 ? void 0 : e.performance)) {
        xa = true;
        _a = globalThis.perf_hooks.performance;
    } else {
        xa = false;
    }
    return xa;
}

function Ca() {
    return ka() ? _a.now() : Date.now();
}

class Sa {
    constructor(e, t) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = e;
        this.hook = t;
        const n = {};
        if (e.settings) {
            for (const t in e.settings) {
                const s = e.settings[t];
                n[t] = s.defaultValue;
            }
        }
        const s = `__vue-devtools-plugin-settings__${e.id}`;
        let r = Object.assign({}, n);
        try {
            const e = localStorage.getItem(s);
            const t = JSON.parse(e);
            Object.assign(r, t);
        } catch (Wv) {}
        this.fallbacks = {
            getSettings() {
                return r;
            },
            setSettings(e) {
                try {
                    localStorage.setItem(s, JSON.stringify(e));
                } catch (Wv) {}
                r = e;
            },
            now() {
                return Ca();
            }
        };
        if (t) {
            t.on(wa, ((e, t) => {
                if (e === this.plugin.id) {
                    this.fallbacks.setSettings(t);
                }
            }));
        }
        this.proxiedOn = new Proxy({}, {
            get: (e, t) => {
                if (this.target) {
                    return this.target.on[t];
                } else {
                    return (...e) => {
                        this.onQueue.push({
                            method: t,
                            args: e
                        });
                    };
                }
            }
        });
        this.proxiedTarget = new Proxy({}, {
            get: (e, t) => {
                if (this.target) {
                    return this.target[t];
                } else if (t === "on") {
                    return this.proxiedOn;
                } else if (Object.keys(this.fallbacks).includes(t)) {
                    return (...e) => {
                        this.targetQueue.push({
                            method: t,
                            args: e,
                            resolve: () => {}
                        });
                        return this.fallbacks[t](...e);
                    };
                } else {
                    return (...e) => new Promise((n => {
                        this.targetQueue.push({
                            method: t,
                            args: e,
                            resolve: n
                        });
                    }));
                }
            }
        });
    }
    async setRealTarget(e) {
        this.target = e;
        for (const t of this.onQueue) {
            this.target.on[t.method](...t.args);
        }
        for (const t of this.targetQueue) {
            t.resolve(await this.target[t.method](...t.args));
        }
    }
}

function Oa(e, t) {
    const n = e;
    const s = va();
    const r = ma();
    const o = ya && n.enableEarlyProxy;
    if (r && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !o)) {
        r.emit(ba, e, t);
    } else {
        const e = o ? new Sa(n, r) : null;
        const i = s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || [];
        i.push({
            pluginDescriptor: n,
            setupFn: t,
            proxy: e
        });
        if (e) {
            t(e.proxiedTarget);
        }
    }
}

/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */ var Ea = "store";

function Aa(e, t) {
    Object.keys(e).forEach((function(n) {
        return t(e[n], n);
    }));
}

function Pa(e) {
    return e !== null && typeof e === "object";
}

function ja(e) {
    return e && typeof e.then === "function";
}

function Ta(e, t) {
    return function() {
        return e(t);
    };
}

function Ia(e, t, n) {
    if (t.indexOf(e) < 0) {
        n && n.prepend ? t.unshift(e) : t.push(e);
    }
    return function() {
        var n = t.indexOf(e);
        if (n > -1) {
            t.splice(n, 1);
        }
    };
}

function Na(e, t) {
    e._actions = Object.create(null);
    e._mutations = Object.create(null);
    e._wrappedGetters = Object.create(null);
    e._modulesNamespaceMap = Object.create(null);
    var n = e.state;
    Ma(e, n, [], e._modules.root, true);
    La(e, n, t);
}

function La(e, t, n) {
    var s = e._state;
    var r = e._scope;
    e.getters = {};
    e._makeLocalGettersCache = Object.create(null);
    var o = e._wrappedGetters;
    var i = {};
    var a = {};
    var c = re(true);
    c.run((function() {
        Aa(o, (function(t, n) {
            i[n] = Ta(t, e);
            a[n] = Po((function() {
                return i[n]();
            }));
            Object.defineProperty(e.getters, n, {
                get: function() {
                    return a[n].value;
                },
                enumerable: true
            });
        }));
    }));
    e._state = vt({
        data: t
    });
    e._scope = c;
    if (e.strict) {
        za(e);
    }
    if (s) {
        if (n) {
            e._withCommit((function() {
                s.data = null;
            }));
        }
    }
    if (r) {
        r.stop();
    }
}

function Ma(e, t, n, s, r) {
    var o = !n.length;
    var i = e._modules.getNamespace(n);
    if (s.namespaced) {
        if (e._modulesNamespaceMap[i] && false) ;
        e._modulesNamespaceMap[i] = s;
    }
    if (!o && !r) {
        var a = Va(t, n.slice(0, -1));
        var c = n[n.length - 1];
        e._withCommit((function() {
            a[c] = s.state;
        }));
    }
    var l = s.context = Fa(e, i, n);
    s.forEachMutation((function(t, n) {
        var s = i + n;
        Ra(e, s, t, l);
    }));
    s.forEachAction((function(t, n) {
        var s = t.root ? n : i + n;
        var r = t.handler || t;
        Ba(e, s, r, l);
    }));
    s.forEachGetter((function(t, n) {
        var s = i + n;
        $a(e, s, t, l);
    }));
    s.forEachChild((function(s, o) {
        Ma(e, t, n.concat(o), s, r);
    }));
}

function Fa(e, t, n) {
    var s = t === "";
    var r = {
        dispatch: s ? e.dispatch : function(n, s, r) {
            var o = Ua(n, s, r);
            var i = o.payload;
            var a = o.options;
            var c = o.type;
            if (!a || !a.root) {
                c = t + c;
            }
            return e.dispatch(c, i);
        },
        commit: s ? e.commit : function(n, s, r) {
            var o = Ua(n, s, r);
            var i = o.payload;
            var a = o.options;
            var c = o.type;
            if (!a || !a.root) {
                c = t + c;
            }
            e.commit(c, i, a);
        }
    };
    Object.defineProperties(r, {
        getters: {
            get: s ? function() {
                return e.getters;
            } : function() {
                return Da(e, t);
            }
        },
        state: {
            get: function() {
                return Va(e.state, n);
            }
        }
    });
    return r;
}

function Da(e, t) {
    if (!e._makeLocalGettersCache[t]) {
        var n = {};
        var s = t.length;
        Object.keys(e.getters).forEach((function(r) {
            if (r.slice(0, s) !== t) {
                return;
            }
            var o = r.slice(s);
            Object.defineProperty(n, o, {
                get: function() {
                    return e.getters[r];
                },
                enumerable: true
            });
        }));
        e._makeLocalGettersCache[t] = n;
    }
    return e._makeLocalGettersCache[t];
}

function Ra(e, t, n, s) {
    var r = e._mutations[t] || (e._mutations[t] = []);
    r.push((function t(r) {
        n.call(e, s.state, r);
    }));
}

function Ba(e, t, n, s) {
    var r = e._actions[t] || (e._actions[t] = []);
    r.push((function t(r) {
        var o = n.call(e, {
            dispatch: s.dispatch,
            commit: s.commit,
            getters: s.getters,
            state: s.state,
            rootGetters: e.getters,
            rootState: e.state
        }, r);
        if (!ja(o)) {
            o = Promise.resolve(o);
        }
        if (e._devtoolHook) {
            return o.catch((function(t) {
                e._devtoolHook.emit("vuex:error", t);
                throw t;
            }));
        } else {
            return o;
        }
    }));
}

function $a(e, t, n, s) {
    if (e._wrappedGetters[t]) {
        return;
    }
    e._wrappedGetters[t] = function e(t) {
        return n(s.state, s.getters, t.state, t.getters);
    };
}

function za(e) {
    pr((function() {
        return e._state.data;
    }), (function() {}), {
        deep: true,
        flush: "sync"
    });
}

function Va(e, t) {
    return t.reduce((function(e, t) {
        return e[t];
    }), e);
}

function Ua(e, t, n) {
    if (Pa(e) && e.type) {
        n = t;
        t = e;
        e = e.type;
    }
    return {
        type: e,
        payload: t,
        options: n
    };
}

var Wa = "vuex bindings";

var Ga = "vuex:mutations";

var qa = "vuex:actions";

var Ha = "vuex";

var Ka = 0;

function Qa(e, t) {
    Oa({
        id: "org.vuejs.vuex",
        app: e,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [ Wa ]
    }, (function(n) {
        n.addTimelineLayer({
            id: Ga,
            label: "Vuex Mutations",
            color: Xa
        });
        n.addTimelineLayer({
            id: qa,
            label: "Vuex Actions",
            color: Xa
        });
        n.addInspector({
            id: Ha,
            label: "Vuex",
            icon: "storage",
            treeFilterPlaceholder: "Filter stores..."
        });
        n.on.getInspectorTree((function(n) {
            if (n.app === e && n.inspectorId === Ha) {
                if (n.filter) {
                    var s = [];
                    nc(s, t._modules.root, n.filter, "");
                    n.rootNodes = s;
                } else {
                    n.rootNodes = [ tc(t._modules.root, "") ];
                }
            }
        }));
        n.on.getInspectorState((function(n) {
            if (n.app === e && n.inspectorId === Ha) {
                var s = n.nodeId;
                Da(t, s);
                n.state = sc(oc(t._modules, s), s === "root" ? t.getters : t._makeLocalGettersCache, s);
            }
        }));
        n.on.editInspectorState((function(n) {
            if (n.app === e && n.inspectorId === Ha) {
                var s = n.nodeId;
                var r = n.path;
                if (s !== "root") {
                    r = s.split("/").filter(Boolean).concat(r);
                }
                t._withCommit((function() {
                    n.set(t._state.data, r, n.state.value);
                }));
            }
        }));
        t.subscribe((function(e, t) {
            var s = {};
            if (e.payload) {
                s.payload = e.payload;
            }
            s.state = t;
            n.notifyComponentUpdate();
            n.sendInspectorTree(Ha);
            n.sendInspectorState(Ha);
            n.addTimelineEvent({
                layerId: Ga,
                event: {
                    time: Date.now(),
                    title: e.type,
                    data: s
                }
            });
        }));
        t.subscribeAction({
            before: function(e, t) {
                var s = {};
                if (e.payload) {
                    s.payload = e.payload;
                }
                e._id = Ka++;
                e._time = Date.now();
                s.state = t;
                n.addTimelineEvent({
                    layerId: qa,
                    event: {
                        time: e._time,
                        title: e.type,
                        groupId: e._id,
                        subtitle: "start",
                        data: s
                    }
                });
            },
            after: function(e, t) {
                var s = {};
                var r = Date.now() - e._time;
                s.duration = {
                    _custom: {
                        type: "duration",
                        display: r + "ms",
                        tooltip: "Action duration",
                        value: r
                    }
                };
                if (e.payload) {
                    s.payload = e.payload;
                }
                s.state = t;
                n.addTimelineEvent({
                    layerId: qa,
                    event: {
                        time: Date.now(),
                        title: e.type,
                        groupId: e._id,
                        subtitle: "end",
                        data: s
                    }
                });
            }
        });
    }));
}

var Xa = 8702998;

var Ya = 6710886;

var Ja = 16777215;

var Za = {
    label: "namespaced",
    textColor: Ja,
    backgroundColor: Ya
};

function ec(e) {
    return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}

function tc(e, t) {
    return {
        id: t || "root",
        label: ec(t),
        tags: e.namespaced ? [ Za ] : [],
        children: Object.keys(e._children).map((function(n) {
            return tc(e._children[n], t + n + "/");
        }))
    };
}

function nc(e, t, n, s) {
    if (s.includes(n)) {
        e.push({
            id: s || "root",
            label: s.endsWith("/") ? s.slice(0, s.length - 1) : s || "Root",
            tags: t.namespaced ? [ Za ] : []
        });
    }
    Object.keys(t._children).forEach((function(r) {
        nc(e, t._children[r], n, s + r + "/");
    }));
}

function sc(e, t, n) {
    t = n === "root" ? t : t[n];
    var s = Object.keys(t);
    var r = {
        state: Object.keys(e.state).map((function(t) {
            return {
                key: t,
                editable: true,
                value: e.state[t]
            };
        }))
    };
    if (s.length) {
        var o = rc(t);
        r.getters = Object.keys(o).map((function(e) {
            return {
                key: e.endsWith("/") ? ec(e) : e,
                editable: false,
                value: ic((function() {
                    return o[e];
                }))
            };
        }));
    }
    return r;
}

function rc(e) {
    var t = {};
    Object.keys(e).forEach((function(n) {
        var s = n.split("/");
        if (s.length > 1) {
            var r = t;
            var o = s.pop();
            s.forEach((function(e) {
                if (!r[e]) {
                    r[e] = {
                        _custom: {
                            value: {},
                            display: e,
                            tooltip: "Module",
                            abstract: true
                        }
                    };
                }
                r = r[e]._custom.value;
            }));
            r[o] = ic((function() {
                return e[n];
            }));
        } else {
            t[n] = ic((function() {
                return e[n];
            }));
        }
    }));
    return t;
}

function oc(e, t) {
    var n = t.split("/").filter((function(e) {
        return e;
    }));
    return n.reduce((function(e, s, r) {
        var o = e[s];
        if (!o) {
            throw new Error('Missing module "' + s + '" for path "' + t + '".');
        }
        return r === n.length - 1 ? o : o._children;
    }), t === "root" ? e : e.root._children);
}

function ic(e) {
    try {
        return e();
    } catch (Wv) {
        return Wv;
    }
}

var ac = function e(t, n) {
    this.runtime = n;
    this._children = Object.create(null);
    this._rawModule = t;
    var s = t.state;
    this.state = (typeof s === "function" ? s() : s) || {};
};

var cc = {
    namespaced: {
        configurable: true
    }
};

cc.namespaced.get = function() {
    return !!this._rawModule.namespaced;
};

ac.prototype.addChild = function e(t, n) {
    this._children[t] = n;
};

ac.prototype.removeChild = function e(t) {
    delete this._children[t];
};

ac.prototype.getChild = function e(t) {
    return this._children[t];
};

ac.prototype.hasChild = function e(t) {
    return t in this._children;
};

ac.prototype.update = function e(t) {
    this._rawModule.namespaced = t.namespaced;
    if (t.actions) {
        this._rawModule.actions = t.actions;
    }
    if (t.mutations) {
        this._rawModule.mutations = t.mutations;
    }
    if (t.getters) {
        this._rawModule.getters = t.getters;
    }
};

ac.prototype.forEachChild = function e(t) {
    Aa(this._children, t);
};

ac.prototype.forEachGetter = function e(t) {
    if (this._rawModule.getters) {
        Aa(this._rawModule.getters, t);
    }
};

ac.prototype.forEachAction = function e(t) {
    if (this._rawModule.actions) {
        Aa(this._rawModule.actions, t);
    }
};

ac.prototype.forEachMutation = function e(t) {
    if (this._rawModule.mutations) {
        Aa(this._rawModule.mutations, t);
    }
};

Object.defineProperties(ac.prototype, cc);

var lc = function e(t) {
    this.register([], t, false);
};

lc.prototype.get = function e(t) {
    return t.reduce((function(e, t) {
        return e.getChild(t);
    }), this.root);
};

lc.prototype.getNamespace = function e(t) {
    var n = this.root;
    return t.reduce((function(e, t) {
        n = n.getChild(t);
        return e + (n.namespaced ? t + "/" : "");
    }), "");
};

lc.prototype.update = function e(t) {
    fc([], this.root, t);
};

lc.prototype.register = function e(t, n, s) {
    var r = this;
    if (s === void 0) s = true;
    var o = new ac(n, s);
    if (t.length === 0) {
        this.root = o;
    } else {
        var i = this.get(t.slice(0, -1));
        i.addChild(t[t.length - 1], o);
    }
    if (n.modules) {
        Aa(n.modules, (function(e, n) {
            r.register(t.concat(n), e, s);
        }));
    }
};

lc.prototype.unregister = function e(t) {
    var n = this.get(t.slice(0, -1));
    var s = t[t.length - 1];
    var r = n.getChild(s);
    if (!r) {
        return;
    }
    if (!r.runtime) {
        return;
    }
    n.removeChild(s);
};

lc.prototype.isRegistered = function e(t) {
    var n = this.get(t.slice(0, -1));
    var s = t[t.length - 1];
    if (n) {
        return n.hasChild(s);
    }
    return false;
};

function fc(e, t, n) {
    t.update(n);
    if (n.modules) {
        for (var s in n.modules) {
            if (!t.getChild(s)) {
                return;
            }
            fc(e.concat(s), t.getChild(s), n.modules[s]);
        }
    }
}

function uc(e) {
    return new dc(e);
}

var dc = function e(t) {
    var n = this;
    if (t === void 0) t = {};
    var s = t.plugins;
    if (s === void 0) s = [];
    var r = t.strict;
    if (r === void 0) r = false;
    var o = t.devtools;
    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new lc(t);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = Object.create(null);
    this._scope = null;
    this._devtools = o;
    var i = this;
    var a = this;
    var c = a.dispatch;
    var l = a.commit;
    this.dispatch = function e(t, n) {
        return c.call(i, t, n);
    };
    this.commit = function e(t, n, s) {
        return l.call(i, t, n, s);
    };
    this.strict = r;
    var f = this._modules.root.state;
    Ma(this, f, [], this._modules.root);
    La(this, f);
    s.forEach((function(e) {
        return e(n);
    }));
};

var pc = {
    state: {
        configurable: true
    }
};

dc.prototype.install = function e(t, n) {
    t.provide(n || Ea, this);
    t.config.globalProperties.$store = this;
    var s = this._devtools !== void 0 ? this._devtools : false;
    if (s) {
        Qa(t, this);
    }
};

pc.state.get = function() {
    return this._state.data;
};

pc.state.set = function(e) {};

dc.prototype.commit = function e(t, n, s) {
    var r = this;
    var o = Ua(t, n, s);
    var i = o.type;
    var a = o.payload;
    var c = {
        type: i,
        payload: a
    };
    var l = this._mutations[i];
    if (!l) {
        return;
    }
    this._withCommit((function() {
        l.forEach((function e(t) {
            t(a);
        }));
    }));
    this._subscribers.slice().forEach((function(e) {
        return e(c, r.state);
    }));
};

dc.prototype.dispatch = function e(t, n) {
    var s = this;
    var r = Ua(t, n);
    var o = r.type;
    var i = r.payload;
    var a = {
        type: o,
        payload: i
    };
    var c = this._actions[o];
    if (!c) {
        return;
    }
    try {
        this._actionSubscribers.slice().filter((function(e) {
            return e.before;
        })).forEach((function(e) {
            return e.before(a, s.state);
        }));
    } catch (Wv) {}
    var l = c.length > 1 ? Promise.all(c.map((function(e) {
        return e(i);
    }))) : c[0](i);
    return new Promise((function(e, t) {
        l.then((function(t) {
            try {
                s._actionSubscribers.filter((function(e) {
                    return e.after;
                })).forEach((function(e) {
                    return e.after(a, s.state);
                }));
            } catch (Wv) {}
            e(t);
        }), (function(e) {
            try {
                s._actionSubscribers.filter((function(e) {
                    return e.error;
                })).forEach((function(t) {
                    return t.error(a, s.state, e);
                }));
            } catch (Wv) {}
            t(e);
        }));
    }));
};

dc.prototype.subscribe = function e(t, n) {
    return Ia(t, this._subscribers, n);
};

dc.prototype.subscribeAction = function e(t, n) {
    var s = typeof t === "function" ? {
        before: t
    } : t;
    return Ia(s, this._actionSubscribers, n);
};

dc.prototype.watch = function e(t, n, s) {
    var r = this;
    return pr((function() {
        return t(r.state, r.getters);
    }), n, Object.assign({}, s));
};

dc.prototype.replaceState = function e(t) {
    var n = this;
    this._withCommit((function() {
        n._state.data = t;
    }));
};

dc.prototype.registerModule = function e(t, n, s) {
    if (s === void 0) s = {};
    if (typeof t === "string") {
        t = [ t ];
    }
    this._modules.register(t, n);
    Ma(this, this.state, t, this._modules.get(t), s.preserveState);
    La(this, this.state);
};

dc.prototype.unregisterModule = function e(t) {
    var n = this;
    if (typeof t === "string") {
        t = [ t ];
    }
    this._modules.unregister(t);
    this._withCommit((function() {
        var e = Va(n.state, t.slice(0, -1));
        delete e[t[t.length - 1]];
    }));
    Na(this);
};

dc.prototype.hasModule = function e(t) {
    if (typeof t === "string") {
        t = [ t ];
    }
    return this._modules.isRegistered(t);
};

dc.prototype.hotUpdate = function e(t) {
    this._modules.update(t);
    Na(this, true);
};

dc.prototype._withCommit = function e(t) {
    var n = this._committing;
    this._committing = true;
    t();
    this._committing = n;
};

Object.defineProperties(dc.prototype, pc);

var hc = bc((function(e, t) {
    var n = {};
    vc(t).forEach((function(t) {
        var s = t.key;
        var r = t.val;
        n[s] = function t() {
            var n = this.$store.state;
            var s = this.$store.getters;
            if (e) {
                var o = wc(this.$store, "mapState", e);
                if (!o) {
                    return;
                }
                n = o.context.state;
                s = o.context.getters;
            }
            return typeof r === "function" ? r.call(this, n, s) : n[r];
        };
        n[s].vuex = true;
    }));
    return n;
}));

var gc = bc((function(e, t) {
    var n = {};
    vc(t).forEach((function(t) {
        var s = t.key;
        var r = t.val;
        r = e + r;
        n[s] = function t() {
            if (e && !wc(this.$store, "mapGetters", e)) {
                return;
            }
            return this.$store.getters[r];
        };
        n[s].vuex = true;
    }));
    return n;
}));

var mc = bc((function(e, t) {
    var n = {};
    vc(t).forEach((function(t) {
        var s = t.key;
        var r = t.val;
        n[s] = function t() {
            var n = [], s = arguments.length;
            while (s--) n[s] = arguments[s];
            var o = this.$store.dispatch;
            if (e) {
                var i = wc(this.$store, "mapActions", e);
                if (!i) {
                    return;
                }
                o = i.context.dispatch;
            }
            return typeof r === "function" ? r.apply(this, [ o ].concat(n)) : o.apply(this.$store, [ r ].concat(n));
        };
    }));
    return n;
}));

function vc(e) {
    if (!yc(e)) {
        return [];
    }
    return Array.isArray(e) ? e.map((function(e) {
        return {
            key: e,
            val: e
        };
    })) : Object.keys(e).map((function(t) {
        return {
            key: t,
            val: e[t]
        };
    }));
}

function yc(e) {
    return Array.isArray(e) || Pa(e);
}

function bc(e) {
    return function(t, n) {
        if (typeof t !== "string") {
            n = t;
            t = "";
        } else if (t.charAt(t.length - 1) !== "/") {
            t += "/";
        }
        return e(t, n);
    };
}

function wc(e, t, n) {
    var s = e._modulesNamespaceMap[n];
    return s;
}

const xc = {
    name: "AdminNotices",
    computed: {
        ...hc([ "notices" ]),
        activeNotices() {
            return this.notices.filter((e => e.status));
        }
    },
    methods: {
        ...mc([ "fetchNotices", "dismissNotice" ]),
        async loadNotices() {
            await this.fetchNotices();
        },
        async dismissNotice(e) {
            await this.$store.dispatch("dismissNotice", e);
        }
    },
    mounted() {
        this.loadNotices();
    }
};

const _c = {
    class: "admin-notices"
};

const kc = {
    class: "notice-header"
};

const Cc = {
    class: "notice-title"
};

const Sc = [ "onClick" ];

const Oc = {
    class: "notice-content"
};

const Ec = {
    class: "notice-description"
};

const Ac = {
    key: 0,
    class: "notice-action"
};

const Pc = [ "href" ];

function jc(e, t, n, s, r, o) {
    const i = is("font-awesome-icon");
    return Fr(), zr("div", _c, [ Kr(Bi, {
        name: "notice",
        tag: "div"
    }, {
        default: Cn((() => [ (Fr(true), zr(jr, null, fs(o.activeNotices, (e => (Fr(), zr("div", {
            key: e.id,
            class: G([ "notice-card", e.type.toLowerCase() ])
        }, [ Hr("div", kc, [ Hr("div", Cc, Z(e.subject), 1), Hr("button", {
            class: "dismiss-button",
            onClick: t => o.dismissNotice(e.id)
        }, [ t[0] || (t[0] = Hr("span", {
            class: "dismiss-label"
        }, "Dismiss", -1)), Kr(i, {
            icon: "times"
        }) ], 8, Sc) ]), Hr("div", Oc, [ Hr("div", Ec, Z(e.description), 1), e.action ? (Fr(), 
        zr("div", Ac, [ Hr("a", {
            href: e.action,
            class: "action-button"
        }, "Take Action", 8, Pc) ])) : Zr("", true) ]) ], 2)))), 128)) ])),
        _: 1
    }) ]);
}

const Tc = ua(xc, [ [ "render", jc ], [ "__scopeId", "data-v-0c138ccc" ] ]);

const Ic = {
    name: "Header",
    components: {
        NavBar: ga,
        AdminNotices: Tc
    }
};

const Nc = {
    class: "app-header"
};

function Lc(e, t, n, s, r, o) {
    const i = is("admin-notices");
    const a = is("nav-bar");
    return Fr(), zr("header", Nc, [ t[0] || (t[0] = Hr("h1", {
        class: "app-title"
    }, "Pathwise Badge Connect", -1)), t[1] || (t[1] = Hr("h2", {
        class: "app-sub-title"
    }, "by Pathwise Solutions Inc.", -1)), Kr(i), Kr(a) ]);
}

const Mc = ua(Ic, [ [ "render", Lc ] ]);

const Fc = {
    name: "App",
    components: {
        "app-header": Mc
    }
};

const Dc = {
    id: "pathwise-badge-connect-container"
};

function Rc(e, t, n, s, r, o) {
    const i = is("app-header");
    const a = is("router-view");
    return Fr(), zr("div", Dc, [ Kr(i), Hr("main", null, [ Kr(a) ]) ]);
}

const Bc = ua(Fc, [ [ "render", Rc ] ]);

/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */ const $c = typeof document !== "undefined";

function zc(e) {
    return typeof e === "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}

function Vc(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && zc(e.default);
}

const Uc = Object.assign;

function Wc(e, t) {
    const n = {};
    for (const s in t) {
        const r = t[s];
        n[s] = qc(r) ? r.map(e) : e(r);
    }
    return n;
}

const Gc = () => {};

const qc = Array.isArray;

const Hc = /#/g;

const Kc = /&/g;

const Qc = /\//g;

const Xc = /=/g;

const Yc = /\?/g;

const Jc = /\+/g;

const Zc = /%5B/g;

const el = /%5D/g;

const tl = /%5E/g;

const nl = /%60/g;

const sl = /%7B/g;

const rl = /%7C/g;

const ol = /%7D/g;

const il = /%20/g;

function al(e) {
    return encodeURI("" + e).replace(rl, "|").replace(Zc, "[").replace(el, "]");
}

function cl(e) {
    return al(e).replace(sl, "{").replace(ol, "}").replace(tl, "^");
}

function ll(e) {
    return al(e).replace(Jc, "%2B").replace(il, "+").replace(Hc, "%23").replace(Kc, "%26").replace(nl, "`").replace(sl, "{").replace(ol, "}").replace(tl, "^");
}

function fl(e) {
    return ll(e).replace(Xc, "%3D");
}

function ul(e) {
    return al(e).replace(Hc, "%23").replace(Yc, "%3F");
}

function dl(e) {
    return e == null ? "" : ul(e).replace(Qc, "%2F");
}

function pl(e) {
    try {
        return decodeURIComponent("" + e);
    } catch (t) {}
    return "" + e;
}

const hl = /\/$/;

const gl = e => e.replace(hl, "");

function ml(e, t, n = "/") {
    let s, r = {}, o = "", i = "";
    const a = t.indexOf("#");
    let c = t.indexOf("?");
    if (a < c && a >= 0) {
        c = -1;
    }
    if (c > -1) {
        s = t.slice(0, c);
        o = t.slice(c + 1, a > -1 ? a : t.length);
        r = e(o);
    }
    if (a > -1) {
        s = s || t.slice(0, a);
        i = t.slice(a, t.length);
    }
    s = Cl(s != null ? s : t, n);
    return {
        fullPath: s + (o && "?") + o + i,
        path: s,
        query: r,
        hash: pl(i)
    };
}

function vl(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
}

function yl(e, t) {
    if (!t || !e.toLowerCase().startsWith(t.toLowerCase())) return e;
    return e.slice(t.length) || "/";
}

function bl(e, t, n) {
    const s = t.matched.length - 1;
    const r = n.matched.length - 1;
    return s > -1 && s === r && wl(t.matched[s], n.matched[r]) && xl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}

function wl(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}

function xl(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return false;
    for (const n in e) {
        if (!_l(e[n], t[n])) return false;
    }
    return true;
}

function _l(e, t) {
    return qc(e) ? kl(e, t) : qc(t) ? kl(t, e) : e === t;
}

function kl(e, t) {
    return qc(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : e.length === 1 && e[0] === t;
}

function Cl(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/");
    const s = e.split("/");
    const r = s[s.length - 1];
    if (r === ".." || r === ".") {
        s.push("");
    }
    let o = n.length - 1;
    let i;
    let a;
    for (i = 0; i < s.length; i++) {
        a = s[i];
        if (a === ".") continue;
        if (a === "..") {
            if (o > 1) o--;
        } else break;
    }
    return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}

const Sl = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
};

var Ol;

(function(e) {
    e["pop"] = "pop";
    e["push"] = "push";
})(Ol || (Ol = {}));

var El;

(function(e) {
    e["back"] = "back";
    e["forward"] = "forward";
    e["unknown"] = "";
})(El || (El = {}));

function Al(e) {
    if (!e) {
        if ($c) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/";
            e = e.replace(/^\w+:\/\/[^\/]+/, "");
        } else {
            e = "/";
        }
    }
    if (e[0] !== "/" && e[0] !== "#") e = "/" + e;
    return gl(e);
}

const Pl = /^[^#]+#/;

function jl(e, t) {
    return e.replace(Pl, "#") + t;
}

function Tl(e, t) {
    const n = document.documentElement.getBoundingClientRect();
    const s = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: s.left - n.left - (t.left || 0),
        top: s.top - n.top - (t.top || 0)
    };
}

const Il = () => ({
    left: window.scrollX,
    top: window.scrollY
});

function Nl(e) {
    let t;
    if ("el" in e) {
        const n = e.el;
        const s = typeof n === "string" && n.startsWith("#");
        const r = typeof n === "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!r) {
            return;
        }
        t = Tl(r, e);
    } else {
        t = e;
    }
    if ("scrollBehavior" in document.documentElement.style) window.scrollTo(t); else {
        window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
    }
}

function Ll(e, t) {
    const n = history.state ? history.state.position - t : -1;
    return n + e;
}

const Ml = new Map;

function Fl(e, t) {
    Ml.set(e, t);
}

function Dl(e) {
    const t = Ml.get(e);
    Ml.delete(e);
    return t;
}

let Rl = () => location.protocol + "//" + location.host;

function Bl(e, t) {
    const {pathname: n, search: s, hash: r} = t;
    const o = e.indexOf("#");
    if (o > -1) {
        let t = r.includes(e.slice(o)) ? e.slice(o).length : 1;
        let n = r.slice(t);
        if (n[0] !== "/") n = "/" + n;
        return yl(n, "");
    }
    const i = yl(n, e);
    return i + s + r;
}

function $l(e, t, n, s) {
    let r = [];
    let o = [];
    let i = null;
    const a = ({state: o}) => {
        const a = Bl(e, location);
        const c = n.value;
        const l = t.value;
        let f = 0;
        if (o) {
            n.value = a;
            t.value = o;
            if (i && i === c) {
                i = null;
                return;
            }
            f = l ? o.position - l.position : 0;
        } else {
            s(a);
        }
        r.forEach((e => {
            e(n.value, c, {
                delta: f,
                type: Ol.pop,
                direction: f ? f > 0 ? El.forward : El.back : El.unknown
            });
        }));
    };
    function c() {
        i = n.value;
    }
    function l(e) {
        r.push(e);
        const t = () => {
            const t = r.indexOf(e);
            if (t > -1) r.splice(t, 1);
        };
        o.push(t);
        return t;
    }
    function f() {
        const {history: e} = window;
        if (!e.state) return;
        e.replaceState(Uc({}, e.state, {
            scroll: Il()
        }), "");
    }
    function u() {
        for (const e of o) e();
        o = [];
        window.removeEventListener("popstate", a);
        window.removeEventListener("beforeunload", f);
    }
    window.addEventListener("popstate", a);
    window.addEventListener("beforeunload", f, {
        passive: true
    });
    return {
        pauseListeners: c,
        listen: l,
        destroy: u
    };
}

function zl(e, t, n, s = false, r = false) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: r ? Il() : null
    };
}

function Vl(e) {
    const {history: t, location: n} = window;
    const s = {
        value: Bl(e, n)
    };
    const r = {
        value: t.state
    };
    if (!r.value) {
        o(s.value, {
            back: null,
            current: s.value,
            forward: null,
            position: t.length - 1,
            replaced: true,
            scroll: null
        }, true);
    }
    function o(s, o, i) {
        const a = e.indexOf("#");
        const c = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + s : Rl() + e + s;
        try {
            t[i ? "replaceState" : "pushState"](o, "", c);
            r.value = o;
        } catch (l) {
            {
                console.error(l);
            }
            n[i ? "replace" : "assign"](c);
        }
    }
    function i(e, n) {
        const i = Uc({}, t.state, zl(r.value.back, e, r.value.forward, true), n, {
            position: r.value.position
        });
        o(e, i, true);
        s.value = e;
    }
    function a(e, n) {
        const i = Uc({}, r.value, t.state, {
            forward: e,
            scroll: Il()
        });
        o(i.current, i, true);
        const a = Uc({}, zl(s.value, e, null), {
            position: i.position + 1
        }, n);
        o(e, a, false);
        s.value = e;
    }
    return {
        location: s,
        state: r,
        push: a,
        replace: i
    };
}

function Ul(e) {
    e = Al(e);
    const t = Vl(e);
    const n = $l(e, t.state, t.location, t.replace);
    function s(e, t = true) {
        if (!t) n.pauseListeners();
        history.go(e);
    }
    const r = Uc({
        location: "",
        base: e,
        go: s,
        createHref: jl.bind(null, e)
    }, t, n);
    Object.defineProperty(r, "location", {
        enumerable: true,
        get: () => t.location.value
    });
    Object.defineProperty(r, "state", {
        enumerable: true,
        get: () => t.state.value
    });
    return r;
}

function Wl(e) {
    e = location.host ? e || location.pathname + location.search : "";
    if (!e.includes("#")) e += "#";
    return Ul(e);
}

function Gl(e) {
    return typeof e === "string" || e && typeof e === "object";
}

function ql(e) {
    return typeof e === "string" || typeof e === "symbol";
}

const Hl = Symbol("");

var Kl;

(function(e) {
    e[e["aborted"] = 4] = "aborted";
    e[e["cancelled"] = 8] = "cancelled";
    e[e["duplicated"] = 16] = "duplicated";
})(Kl || (Kl = {}));

function Ql(e, t) {
    {
        return Uc(new Error, {
            type: e,
            [Hl]: true
        }, t);
    }
}

function Xl(e, t) {
    return e instanceof Error && Hl in e && (t == null || !!(e.type & t));
}

const Yl = "[^/]+?";

const Jl = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
};

const Zl = /[.+*?^${}()[\]/\\]/g;

function ef(e, t) {
    const n = Uc({}, Jl, t);
    const s = [];
    let r = n.start ? "^" : "";
    const o = [];
    for (const f of e) {
        const e = f.length ? [] : [ 90 ];
        if (n.strict && !f.length) r += "/";
        for (let t = 0; t < f.length; t++) {
            const s = f[t];
            let i = 40 + (n.sensitive ? .25 : 0);
            if (s.type === 0) {
                if (!t) r += "/";
                r += s.value.replace(Zl, "\\$&");
                i += 40;
            } else if (s.type === 1) {
                const {value: e, repeatable: n, optional: a, regexp: c} = s;
                o.push({
                    name: e,
                    repeatable: n,
                    optional: a
                });
                const u = c ? c : Yl;
                if (u !== Yl) {
                    i += 10;
                    try {
                        new RegExp(`(${u})`);
                    } catch (l) {
                        throw new Error(`Invalid custom RegExp for param "${e}" (${u}): ` + l.message);
                    }
                }
                let d = n ? `((?:${u})(?:/(?:${u}))*)` : `(${u})`;
                if (!t) d = a && f.length < 2 ? `(?:/${d})` : "/" + d;
                if (a) d += "?";
                r += d;
                i += 20;
                if (a) i += -8;
                if (n) i += -20;
                if (u === ".*") i += -50;
            }
            e.push(i);
        }
        s.push(e);
    }
    if (n.strict && n.end) {
        const e = s.length - 1;
        s[e][s[e].length - 1] += .7000000000000001;
    }
    if (!n.strict) r += "/?";
    if (n.end) r += "$"; else if (n.strict && !r.endsWith("/")) r += "(?:/|$)";
    const i = new RegExp(r, n.sensitive ? "" : "i");
    function a(e) {
        const t = e.match(i);
        const n = {};
        if (!t) return null;
        for (let s = 1; s < t.length; s++) {
            const e = t[s] || "";
            const r = o[s - 1];
            n[r.name] = e && r.repeatable ? e.split("/") : e;
        }
        return n;
    }
    function c(t) {
        let n = "";
        let s = false;
        for (const r of e) {
            if (!s || !n.endsWith("/")) n += "/";
            s = false;
            for (const e of r) {
                if (e.type === 0) {
                    n += e.value;
                } else if (e.type === 1) {
                    const {value: o, repeatable: i, optional: a} = e;
                    const c = o in t ? t[o] : "";
                    if (qc(c) && !i) {
                        throw new Error(`Provided param "${o}" is an array but it is not repeatable (* or + modifiers)`);
                    }
                    const l = qc(c) ? c.join("/") : c;
                    if (!l) {
                        if (a) {
                            if (r.length < 2) {
                                if (n.endsWith("/")) n = n.slice(0, -1); else s = true;
                            }
                        } else throw new Error(`Missing required param "${o}"`);
                    }
                    n += l;
                }
            }
        }
        return n || "/";
    }
    return {
        re: i,
        score: s,
        keys: o,
        parse: a,
        stringify: c
    };
}

function tf(e, t) {
    let n = 0;
    while (n < e.length && n < t.length) {
        const s = t[n] - e[n];
        if (s) return s;
        n++;
    }
    if (e.length < t.length) {
        return e.length === 1 && e[0] === 40 + 40 ? -1 : 1;
    } else if (e.length > t.length) {
        return t.length === 1 && t[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
}

function nf(e, t) {
    let n = 0;
    const s = e.score;
    const r = t.score;
    while (n < s.length && n < r.length) {
        const e = tf(s[n], r[n]);
        if (e) return e;
        n++;
    }
    if (Math.abs(r.length - s.length) === 1) {
        if (sf(s)) return 1;
        if (sf(r)) return -1;
    }
    return r.length - s.length;
}

function sf(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}

const rf = {
    type: 0,
    value: ""
};

const of = /[a-zA-Z0-9_]/;

function af(e) {
    if (!e) return [ [] ];
    if (e === "/") return [ [ rf ] ];
    if (!e.startsWith("/")) {
        throw new Error(`Invalid path "${e}"`);
    }
    function t(e) {
        throw new Error(`ERR (${n})/"${l}": ${e}`);
    }
    let n = 0;
    let s = n;
    const r = [];
    let o;
    function i() {
        if (o) r.push(o);
        o = [];
    }
    let a = 0;
    let c;
    let l = "";
    let f = "";
    function u() {
        if (!l) return;
        if (n === 0) {
            o.push({
                type: 0,
                value: l
            });
        } else if (n === 1 || n === 2 || n === 3) {
            if (o.length > 1 && (c === "*" || c === "+")) t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`);
            o.push({
                type: 1,
                value: l,
                regexp: f,
                repeatable: c === "*" || c === "+",
                optional: c === "*" || c === "?"
            });
        } else {
            t("Invalid state to consume buffer");
        }
        l = "";
    }
    function d() {
        l += c;
    }
    while (a < e.length) {
        c = e[a++];
        if (c === "\\" && n !== 2) {
            s = n;
            n = 4;
            continue;
        }
        switch (n) {
          case 0:
            if (c === "/") {
                if (l) {
                    u();
                }
                i();
            } else if (c === ":") {
                u();
                n = 1;
            } else {
                d();
            }
            break;

          case 4:
            d();
            n = s;
            break;

          case 1:
            if (c === "(") {
                n = 2;
            } else if (of.test(c)) {
                d();
            } else {
                u();
                n = 0;
                if (c !== "*" && c !== "?" && c !== "+") a--;
            }
            break;

          case 2:
            if (c === ")") {
                if (f[f.length - 1] == "\\") f = f.slice(0, -1) + c; else n = 3;
            } else {
                f += c;
            }
            break;

          case 3:
            u();
            n = 0;
            if (c !== "*" && c !== "?" && c !== "+") a--;
            f = "";
            break;

          default:
            t("Unknown state");
            break;
        }
    }
    if (n === 2) t(`Unfinished custom RegExp for param "${l}"`);
    u();
    i();
    return r;
}

function cf(e, t, n) {
    const s = ef(af(e.path), n);
    const r = Uc(s, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    if (t) {
        if (!r.record.aliasOf === !t.record.aliasOf) t.children.push(r);
    }
    return r;
}

function lf(e, t) {
    const n = [];
    const s = new Map;
    t = gf({
        strict: false,
        end: true,
        sensitive: false
    }, t);
    function r(e) {
        return s.get(e);
    }
    function o(e, n, s) {
        const r = !s;
        const a = uf(e);
        a.aliasOf = s && s.record;
        const l = gf(t, e);
        const f = [ a ];
        if ("alias" in e) {
            const t = typeof e.alias === "string" ? [ e.alias ] : e.alias;
            for (const e of t) {
                f.push(uf(Uc({}, a, {
                    components: s ? s.record.components : a.components,
                    path: e,
                    aliasOf: s ? s.record : a
                })));
            }
        }
        let u;
        let d;
        for (const t of f) {
            const {path: f} = t;
            if (n && f[0] !== "/") {
                const e = n.record.path;
                const s = e[e.length - 1] === "/" ? "" : "/";
                t.path = n.record.path + (f && s + f);
            }
            u = cf(t, n, l);
            if (s) {
                s.alias.push(u);
            } else {
                d = d || u;
                if (d !== u) d.alias.push(u);
                if (r && e.name && !pf(u)) {
                    i(e.name);
                }
            }
            if (yf(u)) {
                c(u);
            }
            if (a.children) {
                const e = a.children;
                for (let t = 0; t < e.length; t++) {
                    o(e[t], u, s && s.children[t]);
                }
            }
            s = s || u;
        }
        return d ? () => {
            i(d);
        } : Gc;
    }
    function i(e) {
        if (ql(e)) {
            const t = s.get(e);
            if (t) {
                s.delete(e);
                n.splice(n.indexOf(t), 1);
                t.children.forEach(i);
                t.alias.forEach(i);
            }
        } else {
            const t = n.indexOf(e);
            if (t > -1) {
                n.splice(t, 1);
                if (e.record.name) s.delete(e.record.name);
                e.children.forEach(i);
                e.alias.forEach(i);
            }
        }
    }
    function a() {
        return n;
    }
    function c(e) {
        const t = mf(e, n);
        n.splice(t, 0, e);
        if (e.record.name && !pf(e)) s.set(e.record.name, e);
    }
    function l(e, t) {
        let r;
        let o = {};
        let i;
        let a;
        if ("name" in e && e.name) {
            r = s.get(e.name);
            if (!r) throw Ql(1, {
                location: e
            });
            a = r.record.name;
            o = Uc(ff(t.params, r.keys.filter((e => !e.optional)).concat(r.parent ? r.parent.keys.filter((e => e.optional)) : []).map((e => e.name))), e.params && ff(e.params, r.keys.map((e => e.name))));
            i = r.stringify(o);
        } else if (e.path != null) {
            i = e.path;
            r = n.find((e => e.re.test(i)));
            if (r) {
                o = r.parse(i);
                a = r.record.name;
            }
        } else {
            r = t.name ? s.get(t.name) : n.find((e => e.re.test(t.path)));
            if (!r) throw Ql(1, {
                location: e,
                currentLocation: t
            });
            a = r.record.name;
            o = Uc({}, t.params, e.params);
            i = r.stringify(o);
        }
        const c = [];
        let l = r;
        while (l) {
            c.unshift(l.record);
            l = l.parent;
        }
        return {
            name: a,
            path: i,
            params: o,
            matched: c,
            meta: hf(c)
        };
    }
    e.forEach((e => o(e)));
    function f() {
        n.length = 0;
        s.clear();
    }
    return {
        addRoute: o,
        resolve: l,
        removeRoute: i,
        clearRoutes: f,
        getRoutes: a,
        getRecordMatcher: r
    };
}

function ff(e, t) {
    const n = {};
    for (const s of t) {
        if (s in e) n[s] = e[s];
    }
    return n;
}

function uf(e) {
    const t = {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: e.aliasOf,
        beforeEnter: e.beforeEnter,
        props: df(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in e ? e.components || null : e.component && {
            default: e.component
        }
    };
    Object.defineProperty(t, "mods", {
        value: {}
    });
    return t;
}

function df(e) {
    const t = {};
    const n = e.props || false;
    if ("component" in e) {
        t.default = n;
    } else {
        for (const s in e.components) t[s] = typeof n === "object" ? n[s] : n;
    }
    return t;
}

function pf(e) {
    while (e) {
        if (e.record.aliasOf) return true;
        e = e.parent;
    }
    return false;
}

function hf(e) {
    return e.reduce(((e, t) => Uc(e, t.meta)), {});
}

function gf(e, t) {
    const n = {};
    for (const s in e) {
        n[s] = s in t ? t[s] : e[s];
    }
    return n;
}

function mf(e, t) {
    let n = 0;
    let s = t.length;
    while (n !== s) {
        const r = n + s >> 1;
        const o = nf(e, t[r]);
        if (o < 0) {
            s = r;
        } else {
            n = r + 1;
        }
    }
    const r = vf(e);
    if (r) {
        s = t.lastIndexOf(r, s - 1);
    }
    return s;
}

function vf(e) {
    let t = e;
    while (t = t.parent) {
        if (yf(t) && nf(e, t) === 0) {
            return t;
        }
    }
    return;
}

function yf({record: e}) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}

function bf(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const n = e[0] === "?";
    const s = (n ? e.slice(1) : e).split("&");
    for (let r = 0; r < s.length; ++r) {
        const e = s[r].replace(Jc, " ");
        const n = e.indexOf("=");
        const o = pl(n < 0 ? e : e.slice(0, n));
        const i = n < 0 ? null : pl(e.slice(n + 1));
        if (o in t) {
            let e = t[o];
            if (!qc(e)) {
                e = t[o] = [ e ];
            }
            e.push(i);
        } else {
            t[o] = i;
        }
    }
    return t;
}

function wf(e) {
    let t = "";
    for (let n in e) {
        const s = e[n];
        n = fl(n);
        if (s == null) {
            if (s !== void 0) {
                t += (t.length ? "&" : "") + n;
            }
            continue;
        }
        const r = qc(s) ? s.map((e => e && ll(e))) : [ s && ll(s) ];
        r.forEach((e => {
            if (e !== void 0) {
                t += (t.length ? "&" : "") + n;
                if (e != null) t += "=" + e;
            }
        }));
    }
    return t;
}

function xf(e) {
    const t = {};
    for (const n in e) {
        const s = e[n];
        if (s !== void 0) {
            t[n] = qc(s) ? s.map((e => e == null ? null : "" + e)) : s == null ? s : "" + s;
        }
    }
    return t;
}

const _f = Symbol("");

const kf = Symbol("");

const Cf = Symbol("");

const Sf = Symbol("");

const Of = Symbol("");

function Ef() {
    let e = [];
    function t(t) {
        e.push(t);
        return () => {
            const n = e.indexOf(t);
            if (n > -1) e.splice(n, 1);
        };
    }
    function n() {
        e = [];
    }
    return {
        add: t,
        list: () => e.slice(),
        reset: n
    };
}

function Af(e, t, n, s, r, o = e => e()) {
    const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
    return () => new Promise(((a, c) => {
        const l = e => {
            if (e === false) {
                c(Ql(4, {
                    from: n,
                    to: t
                }));
            } else if (e instanceof Error) {
                c(e);
            } else if (Gl(e)) {
                c(Ql(2, {
                    from: t,
                    to: e
                }));
            } else {
                if (i && s.enterCallbacks[r] === i && typeof e === "function") {
                    i.push(e);
                }
                a();
            }
        };
        const f = o((() => e.call(s && s.instances[r], t, n, l)));
        let u = Promise.resolve(f);
        if (e.length < 3) u = u.then(l);
        u.catch((e => c(e)));
    }));
}

function Pf(e, t, n, s, r = e => e()) {
    const o = [];
    for (const i of e) {
        for (const e in i.components) {
            let a = i.components[e];
            if (t !== "beforeRouteEnter" && !i.instances[e]) continue;
            if (zc(a)) {
                const c = a.__vccOpts || a;
                const l = c[t];
                l && o.push(Af(l, n, s, i, e, r));
            } else {
                let c = a();
                o.push((() => c.then((o => {
                    if (!o) throw new Error(`Couldn't resolve component "${e}" at "${i.path}"`);
                    const a = Vc(o) ? o.default : o;
                    i.mods[e] = o;
                    i.components[e] = a;
                    const c = a.__vccOpts || a;
                    const l = c[t];
                    return l && Af(l, n, s, i, e, r)();
                }))));
            }
        }
    }
    return o;
}

function jf(e) {
    const t = Fs(Cf);
    const n = Fs(Sf);
    const s = Po((() => {
        const n = Mt(e.to);
        return t.resolve(n);
    }));
    const r = Po((() => {
        const {matched: e} = s.value;
        const {length: t} = e;
        const r = e[t - 1];
        const o = n.matched;
        if (!r || !o.length) return -1;
        const i = o.findIndex(wl.bind(null, r));
        if (i > -1) return i;
        const a = Ff(e[t - 2]);
        return t > 1 && Ff(r) === a && o[o.length - 1].path !== a ? o.findIndex(wl.bind(null, e[t - 2])) : i;
    }));
    const o = Po((() => r.value > -1 && Mf(n.params, s.value.params)));
    const i = Po((() => r.value > -1 && r.value === n.matched.length - 1 && xl(n.params, s.value.params)));
    function a(n = {}) {
        if (Lf(n)) {
            const n = t[Mt(e.replace) ? "replace" : "push"](Mt(e.to)).catch(Gc);
            if (e.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
                document.startViewTransition((() => n));
            }
            return n;
        }
        return Promise.resolve();
    }
    return {
        route: s,
        href: Po((() => s.value.href)),
        isActive: o,
        isExactActive: i,
        navigate: a
    };
}

function Tf(e) {
    return e.length === 1 ? e[0] : e;
}

const If = Rn({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [ String, Object ],
            required: true
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: jf,
    setup(e, {slots: t}) {
        const n = vt(jf(e));
        const {options: s} = Fs(Cf);
        const r = Po((() => ({
            [Df(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
            [Df(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        })));
        return () => {
            const s = t.default && Tf(t.default(n));
            return e.custom ? s : jo("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value
            }, s);
        };
    }
});

const Nf = If;

function Lf(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;
    if (e.button !== void 0 && e.button !== 0) return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
    }
    if (e.preventDefault) e.preventDefault();
    return true;
}

function Mf(e, t) {
    for (const n in t) {
        const s = t[n];
        const r = e[n];
        if (typeof s === "string") {
            if (s !== r) return false;
        } else {
            if (!qc(r) || r.length !== s.length || s.some(((e, t) => e !== r[t]))) return false;
        }
    }
    return true;
}

function Ff(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}

const Df = (e, t, n) => e != null ? e : t != null ? t : n;

const Rf = Rn({
    name: "RouterView",
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: n}) {
        const s = Fs(Of);
        const r = Po((() => e.route || s.value));
        const o = Fs(kf, 0);
        const i = Po((() => {
            let e = Mt(o);
            const {matched: t} = r.value;
            let n;
            while ((n = t[e]) && !n.components) {
                e++;
            }
            return e;
        }));
        const a = Po((() => r.value.matched[i.value]));
        Ms(kf, Po((() => i.value + 1)));
        Ms(_f, a);
        Ms(Of, r);
        const c = Tt();
        pr((() => [ c.value, a.value, e.name ]), (([e, t, n], [s, r, o]) => {
            if (t) {
                t.instances[n] = e;
                if (r && r !== t && e && e === s) {
                    if (!t.leaveGuards.size) {
                        t.leaveGuards = r.leaveGuards;
                    }
                    if (!t.updateGuards.size) {
                        t.updateGuards = r.updateGuards;
                    }
                }
            }
            if (e && t && (!r || !wl(t, r) || !s)) {
                (t.enterCallbacks[n] || []).forEach((t => t(e)));
            }
        }), {
            flush: "post"
        });
        return () => {
            const s = r.value;
            const o = e.name;
            const i = a.value;
            const l = i && i.components[o];
            if (!l) {
                return Bf(n.default, {
                    Component: l,
                    route: s
                });
            }
            const f = i.props[o];
            const u = f ? f === true ? s.params : typeof f === "function" ? f(s) : f : null;
            const d = e => {
                if (e.component.isUnmounted) {
                    i.instances[o] = null;
                }
            };
            const p = jo(l, Uc({}, u, t, {
                onVnodeUnmounted: d,
                ref: c
            }));
            return Bf(n.default, {
                Component: p,
                route: s
            }) || p;
        };
    }
});

function Bf(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}

const $f = Rf;

function zf(e) {
    const t = lf(e.routes, e);
    const n = e.parseQuery || bf;
    const s = e.stringifyQuery || wf;
    const r = e.history;
    const o = Ef();
    const i = Ef();
    const a = Ef();
    const c = It(Sl);
    let l = Sl;
    if ($c && e.scrollBehavior && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }
    const f = Wc.bind(null, (e => "" + e));
    const u = Wc.bind(null, dl);
    const d = Wc.bind(null, pl);
    function p(e, n) {
        let s;
        let r;
        if (ql(e)) {
            s = t.getRecordMatcher(e);
            r = n;
        } else {
            r = e;
        }
        return t.addRoute(r, s);
    }
    function h(e) {
        const n = t.getRecordMatcher(e);
        if (n) {
            t.removeRoute(n);
        }
    }
    function g() {
        return t.getRoutes().map((e => e.record));
    }
    function m(e) {
        return !!t.getRecordMatcher(e);
    }
    function v(e, o) {
        o = Uc({}, o || c.value);
        if (typeof e === "string") {
            const s = ml(n, e, o.path);
            const i = t.resolve({
                path: s.path
            }, o);
            const a = r.createHref(s.fullPath);
            return Uc(s, i, {
                params: d(i.params),
                hash: pl(s.hash),
                redirectedFrom: void 0,
                href: a
            });
        }
        let i;
        if (e.path != null) {
            i = Uc({}, e, {
                path: ml(n, e.path, o.path).path
            });
        } else {
            const t = Uc({}, e.params);
            for (const e in t) {
                if (t[e] == null) {
                    delete t[e];
                }
            }
            i = Uc({}, e, {
                params: u(t)
            });
            o.params = u(o.params);
        }
        const a = t.resolve(i, o);
        const l = e.hash || "";
        a.params = f(d(a.params));
        const p = vl(s, Uc({}, e, {
            hash: cl(l),
            path: a.path
        }));
        const h = r.createHref(p);
        return Uc({
            fullPath: p,
            hash: l,
            query: s === wf ? xf(e.query) : e.query || {}
        }, a, {
            redirectedFrom: void 0,
            href: h
        });
    }
    function y(e) {
        return typeof e === "string" ? ml(n, e, c.value.path) : Uc({}, e);
    }
    function b(e, t) {
        if (l !== e) {
            return Ql(8, {
                from: t,
                to: e
            });
        }
    }
    function w(e) {
        return k(e);
    }
    function x(e) {
        return w(Uc(y(e), {
            replace: true
        }));
    }
    function _(e) {
        const t = e.matched[e.matched.length - 1];
        if (t && t.redirect) {
            const {redirect: n} = t;
            let s = typeof n === "function" ? n(e) : n;
            if (typeof s === "string") {
                s = s.includes("?") || s.includes("#") ? s = y(s) : {
                    path: s
                };
                s.params = {};
            }
            return Uc({
                query: e.query,
                hash: e.hash,
                params: s.path != null ? {} : e.params
            }, s);
        }
    }
    function k(e, t) {
        const n = l = v(e);
        const r = c.value;
        const o = e.state;
        const i = e.force;
        const a = e.replace === true;
        const f = _(n);
        if (f) return k(Uc(y(f), {
            state: typeof f === "object" ? Uc({}, o, f.state) : o,
            force: i,
            replace: a
        }), t || n);
        const u = n;
        u.redirectedFrom = t;
        let d;
        if (!i && bl(s, r, n)) {
            d = Ql(16, {
                to: u,
                from: r
            });
            D(r, r, true, false);
        }
        return (d ? Promise.resolve(d) : O(u, r)).catch((e => Xl(e) ? Xl(e, 2) ? e : F(e) : L(e, u, r))).then((e => {
            if (e) {
                if (Xl(e, 2)) {
                    return k(Uc({
                        replace: a
                    }, y(e.to), {
                        state: typeof e.to === "object" ? Uc({}, o, e.to.state) : o,
                        force: i
                    }), t || u);
                }
            } else {
                e = A(u, r, true, a, o);
            }
            E(u, r, e);
            return e;
        }));
    }
    function C(e, t) {
        const n = b(e, t);
        return n ? Promise.reject(n) : Promise.resolve();
    }
    function S(e) {
        const t = $.values().next().value;
        return t && typeof t.runWithContext === "function" ? t.runWithContext(e) : e();
    }
    function O(e, t) {
        let n;
        const [s, r, a] = Vf(e, t);
        n = Pf(s.reverse(), "beforeRouteLeave", e, t);
        for (const o of s) {
            o.leaveGuards.forEach((s => {
                n.push(Af(s, e, t));
            }));
        }
        const c = C.bind(null, e, t);
        n.push(c);
        return V(n).then((() => {
            n = [];
            for (const s of o.list()) {
                n.push(Af(s, e, t));
            }
            n.push(c);
            return V(n);
        })).then((() => {
            n = Pf(r, "beforeRouteUpdate", e, t);
            for (const s of r) {
                s.updateGuards.forEach((s => {
                    n.push(Af(s, e, t));
                }));
            }
            n.push(c);
            return V(n);
        })).then((() => {
            n = [];
            for (const s of a) {
                if (s.beforeEnter) {
                    if (qc(s.beforeEnter)) {
                        for (const r of s.beforeEnter) n.push(Af(r, e, t));
                    } else {
                        n.push(Af(s.beforeEnter, e, t));
                    }
                }
            }
            n.push(c);
            return V(n);
        })).then((() => {
            e.matched.forEach((e => e.enterCallbacks = {}));
            n = Pf(a, "beforeRouteEnter", e, t, S);
            n.push(c);
            return V(n);
        })).then((() => {
            n = [];
            for (const s of i.list()) {
                n.push(Af(s, e, t));
            }
            n.push(c);
            return V(n);
        })).catch((e => Xl(e, 8) ? e : Promise.reject(e)));
    }
    function E(e, t, n) {
        a.list().forEach((s => S((() => s(e, t, n)))));
    }
    function A(e, t, n, s, o) {
        const i = b(e, t);
        if (i) return i;
        const a = t === Sl;
        const l = !$c ? {} : history.state;
        if (n) {
            if (s || a) r.replace(e.fullPath, Uc({
                scroll: a && l && l.scroll
            }, o)); else r.push(e.fullPath, o);
        }
        c.value = e;
        D(e, t, n, a);
        F();
    }
    let P;
    function j() {
        if (P) return;
        P = r.listen(((e, t, n) => {
            if (!z.listening) return;
            const s = v(e);
            const o = _(s);
            if (o) {
                k(Uc(o, {
                    replace: true,
                    force: true
                }), s).catch(Gc);
                return;
            }
            l = s;
            const i = c.value;
            if ($c) {
                Fl(Ll(i.fullPath, n.delta), Il());
            }
            O(s, i).catch((e => {
                if (Xl(e, 4 | 8)) {
                    return e;
                }
                if (Xl(e, 2)) {
                    k(Uc(y(e.to), {
                        force: true
                    }), s).then((e => {
                        if (Xl(e, 4 | 16) && !n.delta && n.type === Ol.pop) {
                            r.go(-1, false);
                        }
                    })).catch(Gc);
                    return Promise.reject();
                }
                if (n.delta) {
                    r.go(-n.delta, false);
                }
                return L(e, s, i);
            })).then((e => {
                e = e || A(s, i, false);
                if (e) {
                    if (n.delta && !Xl(e, 8)) {
                        r.go(-n.delta, false);
                    } else if (n.type === Ol.pop && Xl(e, 4 | 16)) {
                        r.go(-1, false);
                    }
                }
                E(s, i, e);
            })).catch(Gc);
        }));
    }
    let T = Ef();
    let I = Ef();
    let N;
    function L(e, t, n) {
        F(e);
        const s = I.list();
        if (s.length) {
            s.forEach((s => s(e, t, n)));
        } else {
            console.error(e);
        }
        return Promise.reject(e);
    }
    function M() {
        if (N && c.value !== Sl) return Promise.resolve();
        return new Promise(((e, t) => {
            T.add([ e, t ]);
        }));
    }
    function F(e) {
        if (!N) {
            N = !e;
            j();
            T.list().forEach((([t, n]) => e ? n(e) : t()));
            T.reset();
        }
        return e;
    }
    function D(t, n, s, r) {
        const {scrollBehavior: o} = e;
        if (!$c || !o) return Promise.resolve();
        const i = !s && Dl(Ll(t.fullPath, 0)) || (r || !s) && history.state && history.state.scroll || null;
        return dn().then((() => o(t, n, i))).then((e => e && Nl(e))).catch((e => L(e, t, n)));
    }
    const R = e => r.go(e);
    let B;
    const $ = new Set;
    const z = {
        currentRoute: c,
        listening: true,
        addRoute: p,
        removeRoute: h,
        clearRoutes: t.clearRoutes,
        hasRoute: m,
        getRoutes: g,
        resolve: v,
        options: e,
        push: w,
        replace: x,
        go: R,
        back: () => R(-1),
        forward: () => R(1),
        beforeEach: o.add,
        beforeResolve: i.add,
        afterEach: a.add,
        onError: I.add,
        isReady: M,
        install(e) {
            const t = this;
            e.component("RouterLink", Nf);
            e.component("RouterView", $f);
            e.config.globalProperties.$router = t;
            Object.defineProperty(e.config.globalProperties, "$route", {
                enumerable: true,
                get: () => Mt(c)
            });
            if ($c && !B && c.value === Sl) {
                B = true;
                w(r.location).catch((e => {}));
            }
            const n = {};
            for (const r in Sl) {
                Object.defineProperty(n, r, {
                    get: () => c.value[r],
                    enumerable: true
                });
            }
            e.provide(Cf, t);
            e.provide(Sf, yt(n));
            e.provide(Of, c);
            const s = e.unmount;
            $.add(e);
            e.unmount = function() {
                $.delete(e);
                if ($.size < 1) {
                    l = Sl;
                    P && P();
                    P = null;
                    c.value = Sl;
                    B = false;
                    N = false;
                }
                s();
            };
        }
    };
    function V(e) {
        return e.reduce(((e, t) => e.then((() => S(t)))), Promise.resolve());
    }
    return z;
}

function Vf(e, t) {
    const n = [];
    const s = [];
    const r = [];
    const o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const o = t.matched[i];
        if (o) {
            if (e.matched.find((e => wl(e, o)))) s.push(o); else n.push(o);
        }
        const a = e.matched[i];
        if (a) {
            if (!t.matched.find((e => wl(e, a)))) {
                r.push(a);
            }
        }
    }
    return [ n, s, r ];
}

/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */ function Uf(e, t, n) {
    return (t = Hf(t)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
    }) : e[t] = n, e;
}

function Wf(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(e);
        t && (s = s.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        }))), n.push.apply(n, s);
    }
    return n;
}

function Gf(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Wf(Object(n), true).forEach((function(t) {
            Uf(e, t, n[t]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Wf(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        }));
    }
    return e;
}

function qf(e, t) {
    if ("object" != typeof e || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
        var s = n.call(e, t);
        if ("object" != typeof s) return s;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(e);
}

function Hf(e) {
    var t = qf(e, "string");
    return "symbol" == typeof t ? t : t + "";
}

const Kf = () => {};

let Qf = {};

let Xf = {};

let Yf = null;

let Jf = {
    mark: Kf,
    measure: Kf
};

try {
    if (typeof window !== "undefined") Qf = window;
    if (typeof document !== "undefined") Xf = document;
    if (typeof MutationObserver !== "undefined") Yf = MutationObserver;
    if (typeof performance !== "undefined") Jf = performance;
} catch (Wv) {}

const {userAgent: Zf = ""} = Qf.navigator || {};

const eu = Qf;

const tu = Xf;

const nu = Yf;

const su = Jf;

!!eu.document;

const ru = !!tu.documentElement && !!tu.head && typeof tu.addEventListener === "function" && typeof tu.createElement === "function";

const ou = ~Zf.indexOf("MSIE") || ~Zf.indexOf("Trident/");

var iu = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/, au = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;

var cu = {
    classic: {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fab: "brands",
        "fa-brands": "brands"
    },
    duotone: {
        fa: "solid",
        fad: "solid",
        "fa-solid": "solid",
        "fa-duotone": "solid",
        fadr: "regular",
        "fa-regular": "regular",
        fadl: "light",
        "fa-light": "light",
        fadt: "thin",
        "fa-thin": "thin"
    },
    sharp: {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid",
        fasr: "regular",
        "fa-regular": "regular",
        fasl: "light",
        "fa-light": "light",
        fast: "thin",
        "fa-thin": "thin"
    },
    "sharp-duotone": {
        fa: "solid",
        fasds: "solid",
        "fa-solid": "solid",
        fasdr: "regular",
        "fa-regular": "regular",
        fasdl: "light",
        "fa-light": "light",
        fasdt: "thin",
        "fa-thin": "thin"
    }
}, lu = {
    GROUP: "duotone-group",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, fu = [ "fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone" ];

var uu = "classic", du = "duotone", pu = "sharp", hu = "sharp-duotone", gu = [ uu, du, pu, hu ];

var mu = {
    classic: {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
    },
    duotone: {
        900: "fad",
        400: "fadr",
        300: "fadl",
        100: "fadt"
    },
    sharp: {
        900: "fass",
        400: "fasr",
        300: "fasl",
        100: "fast"
    },
    "sharp-duotone": {
        900: "fasds",
        400: "fasdr",
        300: "fasdl",
        100: "fasdt"
    }
};

var vu = {
    "Font Awesome 6 Free": {
        900: "fas",
        400: "far"
    },
    "Font Awesome 6 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat"
    },
    "Font Awesome 6 Brands": {
        400: "fab",
        normal: "fab"
    },
    "Font Awesome 6 Duotone": {
        900: "fad",
        400: "fadr",
        normal: "fadr",
        300: "fadl",
        100: "fadt"
    },
    "Font Awesome 6 Sharp": {
        900: "fass",
        400: "fasr",
        normal: "fasr",
        300: "fasl",
        100: "fast"
    },
    "Font Awesome 6 Sharp Duotone": {
        900: "fasds",
        400: "fasdr",
        normal: "fasdr",
        300: "fasdl",
        100: "fasdt"
    }
};

var yu = new Map([ [ "classic", {
    defaultShortPrefixId: "fas",
    defaultStyleId: "solid",
    styleIds: [ "solid", "regular", "light", "thin", "brands" ],
    futureStyleIds: [],
    defaultFontWeight: 900
} ], [ "sharp", {
    defaultShortPrefixId: "fass",
    defaultStyleId: "solid",
    styleIds: [ "solid", "regular", "light", "thin" ],
    futureStyleIds: [],
    defaultFontWeight: 900
} ], [ "duotone", {
    defaultShortPrefixId: "fad",
    defaultStyleId: "solid",
    styleIds: [ "solid", "regular", "light", "thin" ],
    futureStyleIds: [],
    defaultFontWeight: 900
} ], [ "sharp-duotone", {
    defaultShortPrefixId: "fasds",
    defaultStyleId: "solid",
    styleIds: [ "solid", "regular", "light", "thin" ],
    futureStyleIds: [],
    defaultFontWeight: 900
} ] ]), bu = {
    classic: {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        brands: "fab"
    },
    duotone: {
        solid: "fad",
        regular: "fadr",
        light: "fadl",
        thin: "fadt"
    },
    sharp: {
        solid: "fass",
        regular: "fasr",
        light: "fasl",
        thin: "fast"
    },
    "sharp-duotone": {
        solid: "fasds",
        regular: "fasdr",
        light: "fasdl",
        thin: "fasdt"
    }
};

var wu = [ "fak", "fa-kit", "fakd", "fa-kit-duotone" ], xu = {
    kit: {
        fak: "kit",
        "fa-kit": "kit"
    },
    "kit-duotone": {
        fakd: "kit-duotone",
        "fa-kit-duotone": "kit-duotone"
    }
}, _u = [ "kit" ];

var ku = {
    kit: {
        "fa-kit": "fak"
    }
};

var Cu = [ "fak", "fakd" ], Su = {
    kit: {
        fak: "fa-kit"
    }
};

var Ou = {
    kit: {
        kit: "fak"
    },
    "kit-duotone": {
        "kit-duotone": "fakd"
    }
};

var Eu = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, Au = [ "fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone" ];

var Pu = [ "fak", "fa-kit", "fakd", "fa-kit-duotone" ];

var ju = {
    "Font Awesome Kit": {
        400: "fak",
        normal: "fak"
    },
    "Font Awesome Kit Duotone": {
        400: "fakd",
        normal: "fakd"
    }
};

var Tu = {
    classic: {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat"
    },
    duotone: {
        "fa-regular": "fadr",
        "fa-light": "fadl",
        "fa-thin": "fadt"
    },
    sharp: {
        "fa-solid": "fass",
        "fa-regular": "fasr",
        "fa-light": "fasl",
        "fa-thin": "fast"
    },
    "sharp-duotone": {
        "fa-solid": "fasds",
        "fa-regular": "fasdr",
        "fa-light": "fasdl",
        "fa-thin": "fasdt"
    }
}, Iu = {
    classic: [ "fas", "far", "fal", "fat", "fad" ],
    duotone: [ "fadr", "fadl", "fadt" ],
    sharp: [ "fass", "fasr", "fasl", "fast" ],
    "sharp-duotone": [ "fasds", "fasdr", "fasdl", "fasdt" ]
}, Nu = {
    classic: {
        fab: "fa-brands",
        fad: "fa-duotone",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin"
    },
    duotone: {
        fadr: "fa-regular",
        fadl: "fa-light",
        fadt: "fa-thin"
    },
    sharp: {
        fass: "fa-solid",
        fasr: "fa-regular",
        fasl: "fa-light",
        fast: "fa-thin"
    },
    "sharp-duotone": {
        fasds: "fa-solid",
        fasdr: "fa-regular",
        fasdl: "fa-light",
        fasdt: "fa-thin"
    }
}, Lu = [ "fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands" ], Mu = [ "fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", ...Au, ...Lu ], Fu = [ "solid", "regular", "light", "thin", "duotone", "brands" ], Du = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], Ru = Du.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), Bu = [ ...Object.keys(Iu), ...Fu, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Eu.GROUP, Eu.SWAP_OPACITY, Eu.PRIMARY, Eu.SECONDARY ].concat(Du.map((e => "".concat(e, "x")))).concat(Ru.map((e => "w-".concat(e))));

var $u = {
    "Font Awesome 5 Free": {
        900: "fas",
        400: "far"
    },
    "Font Awesome 5 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal"
    },
    "Font Awesome 5 Brands": {
        400: "fab",
        normal: "fab"
    },
    "Font Awesome 5 Duotone": {
        900: "fad"
    }
};

const zu = "___FONT_AWESOME___";

const Vu = 16;

const Uu = "fa";

const Wu = "svg-inline--fa";

const Gu = "data-fa-i2svg";

const qu = "data-fa-pseudo-element";

const Hu = "data-fa-pseudo-element-pending";

const Ku = "data-prefix";

const Qu = "data-icon";

const Xu = "fontawesome-i2svg";

const Yu = "async";

const Ju = [ "HTML", "HEAD", "STYLE", "SCRIPT" ];

const Zu = (() => {
    try {
        return true;
    } catch (e) {
        return false;
    }
})();

function ed(e) {
    return new Proxy(e, {
        get(e, t) {
            return t in e ? e[t] : e[uu];
        }
    });
}

const td = Gf({}, cu);

td[uu] = Gf(Gf(Gf(Gf({}, {
    "fa-duotone": "duotone"
}), cu[uu]), xu["kit"]), xu["kit-duotone"]);

const nd = ed(td);

const sd = Gf({}, bu);

sd[uu] = Gf(Gf(Gf(Gf({}, {
    duotone: "fad"
}), sd[uu]), Ou["kit"]), Ou["kit-duotone"]);

const rd = ed(sd);

const od = Gf({}, Nu);

od[uu] = Gf(Gf({}, od[uu]), Su["kit"]);

const id = ed(od);

const ad = Gf({}, Tu);

ad[uu] = Gf(Gf({}, ad[uu]), ku["kit"]);

ed(ad);

const cd = iu;

const ld = "fa-layers-text";

const fd = au;

const ud = Gf({}, mu);

ed(ud);

const dd = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ];

const pd = lu;

const hd = [ ..._u, ...Bu ];

const gd = eu.FontAwesomeConfig || {};

function md(e) {
    var t = tu.querySelector("script[" + e + "]");
    if (t) {
        return t.getAttribute(e);
    }
}

function vd(e) {
    if (e === "") return true;
    if (e === "false") return false;
    if (e === "true") return true;
    return e;
}

if (tu && typeof tu.querySelector === "function") {
    const e = [ [ "data-family-prefix", "familyPrefix" ], [ "data-css-prefix", "cssPrefix" ], [ "data-family-default", "familyDefault" ], [ "data-style-default", "styleDefault" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-mutate-approach", "mutateApproach" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ];
    e.forEach((e => {
        let [t, n] = e;
        const s = vd(md(t));
        if (s !== void 0 && s !== null) {
            gd[n] = s;
        }
    }));
}

const yd = {
    styleDefault: "solid",
    familyDefault: uu,
    cssPrefix: Uu,
    replacementClass: Wu,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: "async",
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
};

if (gd.familyPrefix) {
    gd.cssPrefix = gd.familyPrefix;
}

const bd = Gf(Gf({}, yd), gd);

if (!bd.autoReplaceSvg) bd.observeMutations = false;

const wd = {};

Object.keys(yd).forEach((e => {
    Object.defineProperty(wd, e, {
        enumerable: true,
        set: function(t) {
            bd[e] = t;
            xd.forEach((e => e(wd)));
        },
        get: function() {
            return bd[e];
        }
    });
}));

Object.defineProperty(wd, "familyPrefix", {
    enumerable: true,
    set: function(e) {
        bd.cssPrefix = e;
        xd.forEach((e => e(wd)));
    },
    get: function() {
        return bd.cssPrefix;
    }
});

eu.FontAwesomeConfig = wd;

const xd = [];

function _d(e) {
    xd.push(e);
    return () => {
        xd.splice(xd.indexOf(e), 1);
    };
}

const kd = Vu;

const Cd = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
};

function Sd(e) {
    if (!e || !ru) {
        return;
    }
    const t = tu.createElement("style");
    t.setAttribute("type", "text/css");
    t.innerHTML = e;
    const n = tu.head.childNodes;
    let s = null;
    for (let r = n.length - 1; r > -1; r--) {
        const e = n[r];
        const t = (e.tagName || "").toUpperCase();
        if ([ "STYLE", "LINK" ].indexOf(t) > -1) {
            s = e;
        }
    }
    tu.head.insertBefore(t, s);
    return e;
}

const Od = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Ed() {
    let e = 12;
    let t = "";
    while (e-- > 0) {
        t += Od[Math.random() * 62 | 0];
    }
    return t;
}

function Ad(e) {
    const t = [];
    for (let n = (e || []).length >>> 0; n--; ) {
        t[n] = e[n];
    }
    return t;
}

function Pd(e) {
    if (e.classList) {
        return Ad(e.classList);
    } else {
        return (e.getAttribute("class") || "").split(" ").filter((e => e));
    }
}

function jd(e) {
    return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function Td(e) {
    return Object.keys(e || {}).reduce(((t, n) => t + "".concat(n, '="').concat(jd(e[n]), '" ')), "").trim();
}

function Id(e) {
    return Object.keys(e || {}).reduce(((t, n) => t + "".concat(n, ": ").concat(e[n].trim(), ";")), "");
}

function Nd(e) {
    return e.size !== Cd.size || e.x !== Cd.x || e.y !== Cd.y || e.rotate !== Cd.rotate || e.flipX || e.flipY;
}

function Ld(e) {
    let {transform: t, containerWidth: n, iconWidth: s} = e;
    const r = {
        transform: "translate(".concat(n / 2, " 256)")
    };
    const o = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") ");
    const i = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") ");
    const a = "rotate(".concat(t.rotate, " 0 0)");
    const c = {
        transform: "".concat(o, " ").concat(i, " ").concat(a)
    };
    const l = {
        transform: "translate(".concat(s / 2 * -1, " -256)")
    };
    return {
        outer: r,
        inner: c,
        path: l
    };
}

function Md(e) {
    let {transform: t, width: n = Vu, height: s = Vu, startCentered: r = false} = e;
    let o = "";
    if (r && ou) {
        o += "translate(".concat(t.x / kd - n / 2, "em, ").concat(t.y / kd - s / 2, "em) ");
    } else if (r) {
        o += "translate(calc(-50% + ".concat(t.x / kd, "em), calc(-50% + ").concat(t.y / kd, "em)) ");
    } else {
        o += "translate(".concat(t.x / kd, "em, ").concat(t.y / kd, "em) ");
    }
    o += "scale(".concat(t.size / kd * (t.flipX ? -1 : 1), ", ").concat(t.size / kd * (t.flipY ? -1 : 1), ") ");
    o += "rotate(".concat(t.rotate, "deg) ");
    return o;
}

var Fd = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}';

function Dd() {
    const e = Uu;
    const t = Wu;
    const n = wd.cssPrefix;
    const s = wd.replacementClass;
    let r = Fd;
    if (n !== e || s !== t) {
        const o = new RegExp("\\.".concat(e, "\\-"), "g");
        const i = new RegExp("\\--".concat(e, "\\-"), "g");
        const a = new RegExp("\\.".concat(t), "g");
        r = r.replace(o, ".".concat(n, "-")).replace(i, "--".concat(n, "-")).replace(a, ".".concat(s));
    }
    return r;
}

let Rd = false;

function Bd() {
    if (wd.autoAddCss && !Rd) {
        Sd(Dd());
        Rd = true;
    }
}

var $d = {
    mixout() {
        return {
            dom: {
                css: Dd,
                insertCss: Bd
            }
        };
    },
    hooks() {
        return {
            beforeDOMElementCreation() {
                Bd();
            },
            beforeI2svg() {
                Bd();
            }
        };
    }
};

const zd = eu || {};

if (!zd[zu]) zd[zu] = {};

if (!zd[zu].styles) zd[zu].styles = {};

if (!zd[zu].hooks) zd[zu].hooks = {};

if (!zd[zu].shims) zd[zu].shims = [];

var Vd = zd[zu];

const Ud = [];

const Wd = function() {
    tu.removeEventListener("DOMContentLoaded", Wd);
    Gd = 1;
    Ud.map((e => e()));
};

let Gd = false;

if (ru) {
    Gd = (tu.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(tu.readyState);
    if (!Gd) tu.addEventListener("DOMContentLoaded", Wd);
}

function qd(e) {
    if (!ru) return;
    Gd ? setTimeout(e, 0) : Ud.push(e);
}

function Hd(e) {
    const {tag: t, attributes: n = {}, children: s = []} = e;
    if (typeof e === "string") {
        return jd(e);
    } else {
        return "<".concat(t, " ").concat(Td(n), ">").concat(s.map(Hd).join(""), "</").concat(t, ">");
    }
}

function Kd(e, t, n) {
    if (e && e[t] && e[t][n]) {
        return {
            prefix: t,
            iconName: n,
            icon: e[t][n]
        };
    }
}

var Qd = function e(t, n, s, r) {
    var o = Object.keys(t), i = o.length, a = n, c, l, f;
    if (s === void 0) {
        c = 1;
        f = t[o[0]];
    } else {
        c = 0;
        f = s;
    }
    for (;c < i; c++) {
        l = o[c];
        f = a(f, t[l], l, t);
    }
    return f;
};

function Xd(e) {
    const t = [];
    let n = 0;
    const s = e.length;
    while (n < s) {
        const r = e.charCodeAt(n++);
        if (r >= 55296 && r <= 56319 && n < s) {
            const s = e.charCodeAt(n++);
            if ((s & 64512) == 56320) {
                t.push(((r & 1023) << 10) + (s & 1023) + 65536);
            } else {
                t.push(r);
                n--;
            }
        } else {
            t.push(r);
        }
    }
    return t;
}

function Yd(e) {
    const t = Xd(e);
    return t.length === 1 ? t[0].toString(16) : null;
}

function Jd(e, t) {
    const n = e.length;
    let s = e.charCodeAt(t);
    let r;
    if (s >= 55296 && s <= 56319 && n > t + 1) {
        r = e.charCodeAt(t + 1);
        if (r >= 56320 && r <= 57343) {
            return (s - 55296) * 1024 + r - 56320 + 65536;
        }
    }
    return s;
}

function Zd(e) {
    return Object.keys(e).reduce(((t, n) => {
        const s = e[n];
        const r = !!s.icon;
        if (r) {
            t[s.iconName] = s.icon;
        } else {
            t[n] = s;
        }
        return t;
    }), {});
}

function ep(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const {skipHooks: s = false} = n;
    const r = Zd(t);
    if (typeof Vd.hooks.addPack === "function" && !s) {
        Vd.hooks.addPack(e, Zd(t));
    } else {
        Vd.styles[e] = Gf(Gf({}, Vd.styles[e] || {}), r);
    }
    if (e === "fas") {
        ep("fa", t);
    }
}

const {styles: tp, shims: np} = Vd;

const sp = Object.keys(id);

const rp = sp.reduce(((e, t) => {
    e[t] = Object.keys(id[t]);
    return e;
}), {});

let op = null;

let ip = {};

let ap = {};

let cp = {};

let lp = {};

let fp = {};

function up(e) {
    return ~hd.indexOf(e);
}

function dp(e, t) {
    const n = t.split("-");
    const s = n[0];
    const r = n.slice(1).join("-");
    if (s === e && r !== "" && !up(r)) {
        return r;
    } else {
        return null;
    }
}

const pp = () => {
    const e = e => Qd(tp, ((t, n, s) => {
        t[s] = Qd(n, e, {});
        return t;
    }), {});
    ip = e(((e, t, n) => {
        if (t[3]) {
            e[t[3]] = n;
        }
        if (t[2]) {
            const s = t[2].filter((e => typeof e === "number"));
            s.forEach((t => {
                e[t.toString(16)] = n;
            }));
        }
        return e;
    }));
    ap = e(((e, t, n) => {
        e[n] = n;
        if (t[2]) {
            const s = t[2].filter((e => typeof e === "string"));
            s.forEach((t => {
                e[t] = n;
            }));
        }
        return e;
    }));
    fp = e(((e, t, n) => {
        const s = t[2];
        e[n] = n;
        s.forEach((t => {
            e[t] = n;
        }));
        return e;
    }));
    const t = "far" in tp || wd.autoFetchSvg;
    const n = Qd(np, ((e, n) => {
        const s = n[0];
        let r = n[1];
        const o = n[2];
        if (r === "far" && !t) {
            r = "fas";
        }
        if (typeof s === "string") {
            e.names[s] = {
                prefix: r,
                iconName: o
            };
        }
        if (typeof s === "number") {
            e.unicodes[s.toString(16)] = {
                prefix: r,
                iconName: o
            };
        }
        return e;
    }), {
        names: {},
        unicodes: {}
    });
    cp = n.names;
    lp = n.unicodes;
    op = _p(wd.styleDefault, {
        family: wd.familyDefault
    });
};

_d((e => {
    op = _p(e.styleDefault, {
        family: wd.familyDefault
    });
}));

pp();

function hp(e, t) {
    return (ip[e] || {})[t];
}

function gp(e, t) {
    return (ap[e] || {})[t];
}

function mp(e, t) {
    return (fp[e] || {})[t];
}

function vp(e) {
    return cp[e] || {
        prefix: null,
        iconName: null
    };
}

function yp(e) {
    const t = lp[e];
    const n = hp("fas", e);
    return t || (n ? {
        prefix: "fas",
        iconName: n
    } : null) || {
        prefix: null,
        iconName: null
    };
}

function bp() {
    return op;
}

const wp = () => ({
    prefix: null,
    iconName: null,
    rest: []
});

function xp(e) {
    let t = uu;
    const n = sp.reduce(((e, t) => {
        e[t] = "".concat(wd.cssPrefix, "-").concat(t);
        return e;
    }), {});
    gu.forEach((s => {
        if (e.includes(n[s]) || e.some((e => rp[s].includes(e)))) {
            t = s;
        }
    }));
    return t;
}

function _p(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {family: n = uu} = t;
    const s = nd[n][e];
    if (n === du && !e) {
        return "fad";
    }
    const r = rd[n][e] || rd[n][s];
    const o = e in Vd.styles ? e : null;
    const i = r || o || null;
    return i;
}

function kp(e) {
    let t = [];
    let n = null;
    e.forEach((e => {
        const s = dp(wd.cssPrefix, e);
        if (s) {
            n = s;
        } else if (e) {
            t.push(e);
        }
    }));
    return {
        iconName: n,
        rest: t
    };
}

function Cp(e) {
    return e.sort().filter(((e, t, n) => n.indexOf(e) === t));
}

function Sp(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {skipLookups: n = false} = t;
    let s = null;
    const r = Mu.concat(Pu);
    const o = Cp(e.filter((e => r.includes(e))));
    const i = Cp(e.filter((e => !Mu.includes(e))));
    const a = o.filter((e => {
        s = e;
        return !fu.includes(e);
    }));
    const [c = null] = a;
    const l = xp(o);
    const f = Gf(Gf({}, kp(i)), {}, {
        prefix: _p(c, {
            family: l
        })
    });
    return Gf(Gf(Gf({}, f), Pp({
        values: e,
        family: l,
        styles: tp,
        config: wd,
        canonical: f,
        givenPrefix: s
    })), Op(n, s, f));
}

function Op(e, t, n) {
    let {prefix: s, iconName: r} = n;
    if (e || !s || !r) {
        return {
            prefix: s,
            iconName: r
        };
    }
    const o = t === "fa" ? vp(r) : {};
    const i = mp(s, r);
    r = o.iconName || i || r;
    s = o.prefix || s;
    if (s === "far" && !tp["far"] && tp["fas"] && !wd.autoFetchSvg) {
        s = "fas";
    }
    return {
        prefix: s,
        iconName: r
    };
}

const Ep = gu.filter((e => e !== uu || e !== du));

const Ap = Object.keys(Nu).filter((e => e !== uu)).map((e => Object.keys(Nu[e]))).flat();

function Pp(e) {
    const {values: t, family: n, canonical: s, givenPrefix: r = "", styles: o = {}, config: i = {}} = e;
    const a = n === du;
    const c = t.includes("fa-duotone") || t.includes("fad");
    const l = i.familyDefault === "duotone";
    const f = s.prefix === "fad" || s.prefix === "fa-duotone";
    if (!a && (c || l || f)) {
        s.prefix = "fad";
    }
    if (t.includes("fa-brands") || t.includes("fab")) {
        s.prefix = "fab";
    }
    if (!s.prefix && Ep.includes(n)) {
        const e = Object.keys(o).find((e => Ap.includes(e)));
        if (e || i.autoFetchSvg) {
            const e = yu.get(n).defaultShortPrefixId;
            s.prefix = e;
            s.iconName = mp(s.prefix, s.iconName) || s.iconName;
        }
    }
    if (s.prefix === "fa" || r === "fa") {
        s.prefix = bp() || "fas";
    }
    return s;
}

class jp {
    constructor() {
        this.definitions = {};
    }
    add() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
            t[n] = arguments[n];
        }
        const s = t.reduce(this._pullDefinitions, {});
        Object.keys(s).forEach((e => {
            this.definitions[e] = Gf(Gf({}, this.definitions[e] || {}), s[e]);
            ep(e, s[e]);
            const t = id[uu][e];
            if (t) ep(t, s[e]);
            pp();
        }));
    }
    reset() {
        this.definitions = {};
    }
    _pullDefinitions(e, t) {
        const n = t.prefix && t.iconName && t.icon ? {
            0: t
        } : t;
        Object.keys(n).map((t => {
            const {prefix: s, iconName: r, icon: o} = n[t];
            const i = o[2];
            if (!e[s]) e[s] = {};
            if (i.length > 0) {
                i.forEach((t => {
                    if (typeof t === "string") {
                        e[s][t] = o;
                    }
                }));
            }
            e[s][r] = o;
        }));
        return e;
    }
}

let Tp = [];

let Ip = {};

const Np = {};

const Lp = Object.keys(Np);

function Mp(e, t) {
    let {mixoutsTo: n} = t;
    Tp = e;
    Ip = {};
    Object.keys(Np).forEach((e => {
        if (Lp.indexOf(e) === -1) {
            delete Np[e];
        }
    }));
    Tp.forEach((e => {
        const t = e.mixout ? e.mixout() : {};
        Object.keys(t).forEach((e => {
            if (typeof t[e] === "function") {
                n[e] = t[e];
            }
            if (typeof t[e] === "object") {
                Object.keys(t[e]).forEach((s => {
                    if (!n[e]) {
                        n[e] = {};
                    }
                    n[e][s] = t[e][s];
                }));
            }
        }));
        if (e.hooks) {
            const t = e.hooks();
            Object.keys(t).forEach((e => {
                if (!Ip[e]) {
                    Ip[e] = [];
                }
                Ip[e].push(t[e]);
            }));
        }
        if (e.provides) {
            e.provides(Np);
        }
    }));
    return n;
}

function Fp(e, t) {
    for (var n = arguments.length, s = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++) {
        s[r - 2] = arguments[r];
    }
    const o = Ip[e] || [];
    o.forEach((e => {
        t = e.apply(null, [ t, ...s ]);
    }));
    return t;
}

function Dp(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) {
        n[s - 1] = arguments[s];
    }
    const r = Ip[e] || [];
    r.forEach((e => {
        e.apply(null, n);
    }));
    return void 0;
}

function Rp() {
    const e = arguments[0];
    const t = Array.prototype.slice.call(arguments, 1);
    return Np[e] ? Np[e].apply(null, t) : void 0;
}

function Bp(e) {
    if (e.prefix === "fa") {
        e.prefix = "fas";
    }
    let {iconName: t} = e;
    const n = e.prefix || bp();
    if (!t) return;
    t = mp(n, t) || t;
    return Kd($p.definitions, n, t) || Kd(Vd.styles, n, t);
}

const $p = new jp;

const zp = () => {
    wd.autoReplaceSvg = false;
    wd.observeMutations = false;
    Dp("noAuto");
};

const Vp = {
    i2svg: function() {
        let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (ru) {
            Dp("beforeI2svg", e);
            Rp("pseudoElements2svg", e);
            return Rp("i2svg", e);
        } else {
            return Promise.reject(new Error("Operation requires a DOM of some kind."));
        }
    },
    watch: function() {
        let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const {autoReplaceSvgRoot: t} = e;
        if (wd.autoReplaceSvg === false) {
            wd.autoReplaceSvg = true;
        }
        wd.observeMutations = true;
        qd((() => {
            Gp({
                autoReplaceSvgRoot: t
            });
            Dp("watch", e);
        }));
    }
};

const Up = {
    icon: e => {
        if (e === null) {
            return null;
        }
        if (typeof e === "object" && e.prefix && e.iconName) {
            return {
                prefix: e.prefix,
                iconName: mp(e.prefix, e.iconName) || e.iconName
            };
        }
        if (Array.isArray(e) && e.length === 2) {
            const t = e[1].indexOf("fa-") === 0 ? e[1].slice(3) : e[1];
            const n = _p(e[0]);
            return {
                prefix: n,
                iconName: mp(n, t) || t
            };
        }
        if (typeof e === "string" && (e.indexOf("".concat(wd.cssPrefix, "-")) > -1 || e.match(cd))) {
            const t = Sp(e.split(" "), {
                skipLookups: true
            });
            return {
                prefix: t.prefix || bp(),
                iconName: mp(t.prefix, t.iconName) || t.iconName
            };
        }
        if (typeof e === "string") {
            const t = bp();
            return {
                prefix: t,
                iconName: mp(t, e) || e
            };
        }
    }
};

const Wp = {
    noAuto: zp,
    config: wd,
    dom: Vp,
    parse: Up,
    library: $p,
    findIconDefinition: Bp,
    toHtml: Hd
};

const Gp = function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {autoReplaceSvgRoot: t = tu} = e;
    if ((Object.keys(Vd.styles).length > 0 || wd.autoFetchSvg) && ru && wd.autoReplaceSvg) Wp.dom.i2svg({
        node: t
    });
};

function qp(e, t) {
    Object.defineProperty(e, "abstract", {
        get: t
    });
    Object.defineProperty(e, "html", {
        get: function() {
            return e.abstract.map((e => Hd(e)));
        }
    });
    Object.defineProperty(e, "node", {
        get: function() {
            if (!ru) return;
            const t = tu.createElement("div");
            t.innerHTML = e.html;
            return t.children;
        }
    });
    return e;
}

function Hp(e) {
    let {children: t, main: n, mask: s, attributes: r, styles: o, transform: i} = e;
    if (Nd(i) && n.found && !s.found) {
        const {width: e, height: t} = n;
        const s = {
            x: e / t / 2,
            y: .5
        };
        r["style"] = Id(Gf(Gf({}, o), {}, {
            "transform-origin": "".concat(s.x + i.x / 16, "em ").concat(s.y + i.y / 16, "em")
        }));
    }
    return [ {
        tag: "svg",
        attributes: r,
        children: t
    } ];
}

function Kp(e) {
    let {prefix: t, iconName: n, children: s, attributes: r, symbol: o} = e;
    const i = o === true ? "".concat(t, "-").concat(wd.cssPrefix, "-").concat(n) : o;
    return [ {
        tag: "svg",
        attributes: {
            style: "display: none;"
        },
        children: [ {
            tag: "symbol",
            attributes: Gf(Gf({}, r), {}, {
                id: i
            }),
            children: s
        } ]
    } ];
}

function Qp(e) {
    const {icons: {main: t, mask: n}, prefix: s, iconName: r, transform: o, symbol: i, title: a, maskId: c, titleId: l, extra: f, watchable: u = false} = e;
    const {width: d, height: p} = n.found ? n : t;
    const h = Cu.includes(s);
    const g = [ wd.replacementClass, r ? "".concat(wd.cssPrefix, "-").concat(r) : "" ].filter((e => f.classes.indexOf(e) === -1)).filter((e => e !== "" || !!e)).concat(f.classes).join(" ");
    let m = {
        children: [],
        attributes: Gf(Gf({}, f.attributes), {}, {
            "data-prefix": s,
            "data-icon": r,
            class: g,
            role: f.attributes.role || "img",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 ".concat(d, " ").concat(p)
        })
    };
    const v = h && !~f.classes.indexOf("fa-fw") ? {
        width: "".concat(d / p * 16 * .0625, "em")
    } : {};
    if (u) {
        m.attributes[Gu] = "";
    }
    if (a) {
        m.children.push({
            tag: "title",
            attributes: {
                id: m.attributes["aria-labelledby"] || "title-".concat(l || Ed())
            },
            children: [ a ]
        });
        delete m.attributes.title;
    }
    const y = Gf(Gf({}, m), {}, {
        prefix: s,
        iconName: r,
        main: t,
        mask: n,
        maskId: c,
        transform: o,
        symbol: i,
        styles: Gf(Gf({}, v), f.styles)
    });
    const {children: b, attributes: w} = n.found && t.found ? Rp("generateAbstractMask", y) || {
        children: [],
        attributes: {}
    } : Rp("generateAbstractIcon", y) || {
        children: [],
        attributes: {}
    };
    y.children = b;
    y.attributes = w;
    if (i) {
        return Kp(y);
    } else {
        return Hp(y);
    }
}

function Xp(e) {
    const {content: t, width: n, height: s, transform: r, title: o, extra: i, watchable: a = false} = e;
    const c = Gf(Gf(Gf({}, i.attributes), o ? {
        title: o
    } : {}), {}, {
        class: i.classes.join(" ")
    });
    if (a) {
        c[Gu] = "";
    }
    const l = Gf({}, i.styles);
    if (Nd(r)) {
        l["transform"] = Md({
            transform: r,
            startCentered: true,
            width: n,
            height: s
        });
        l["-webkit-transform"] = l["transform"];
    }
    const f = Id(l);
    if (f.length > 0) {
        c["style"] = f;
    }
    const u = [];
    u.push({
        tag: "span",
        attributes: c,
        children: [ t ]
    });
    if (o) {
        u.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [ o ]
        });
    }
    return u;
}

function Yp(e) {
    const {content: t, title: n, extra: s} = e;
    const r = Gf(Gf(Gf({}, s.attributes), n ? {
        title: n
    } : {}), {}, {
        class: s.classes.join(" ")
    });
    const o = Id(s.styles);
    if (o.length > 0) {
        r["style"] = o;
    }
    const i = [];
    i.push({
        tag: "span",
        attributes: r,
        children: [ t ]
    });
    if (n) {
        i.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [ n ]
        });
    }
    return i;
}

const {styles: Jp} = Vd;

function Zp(e) {
    const t = e[0];
    const n = e[1];
    const [s] = e.slice(4);
    let r = null;
    if (Array.isArray(s)) {
        r = {
            tag: "g",
            attributes: {
                class: "".concat(wd.cssPrefix, "-").concat(pd.GROUP)
            },
            children: [ {
                tag: "path",
                attributes: {
                    class: "".concat(wd.cssPrefix, "-").concat(pd.SECONDARY),
                    fill: "currentColor",
                    d: s[0]
                }
            }, {
                tag: "path",
                attributes: {
                    class: "".concat(wd.cssPrefix, "-").concat(pd.PRIMARY),
                    fill: "currentColor",
                    d: s[1]
                }
            } ]
        };
    } else {
        r = {
            tag: "path",
            attributes: {
                fill: "currentColor",
                d: s
            }
        };
    }
    return {
        found: true,
        width: t,
        height: n,
        icon: r
    };
}

const eh = {
    found: false,
    width: 512,
    height: 512
};

function th(e, t) {
    if (!Zu && !wd.showMissingIcons && e) {
        console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
    }
}

function nh(e, t) {
    let n = t;
    if (t === "fa" && wd.styleDefault !== null) {
        t = bp();
    }
    return new Promise(((s, r) => {
        if (n === "fa") {
            const n = vp(e) || {};
            e = n.iconName || e;
            t = n.prefix || t;
        }
        if (e && t && Jp[t] && Jp[t][e]) {
            const n = Jp[t][e];
            return s(Zp(n));
        }
        th(e, t);
        s(Gf(Gf({}, eh), {}, {
            icon: wd.showMissingIcons && e ? Rp("missingIconAbstract") || {} : {}
        }));
    }));
}

const sh = () => {};

const rh = wd.measurePerformance && su && su.mark && su.measure ? su : {
    mark: sh,
    measure: sh
};

const oh = 'FA "6.7.2"';

const ih = e => {
    rh.mark("".concat(oh, " ").concat(e, " begins"));
    return () => ah(e);
};

const ah = e => {
    rh.mark("".concat(oh, " ").concat(e, " ends"));
    rh.measure("".concat(oh, " ").concat(e), "".concat(oh, " ").concat(e, " begins"), "".concat(oh, " ").concat(e, " ends"));
};

var ch = {
    begin: ih,
    end: ah
};

const lh = () => {};

function fh(e) {
    const t = e.getAttribute ? e.getAttribute(Gu) : null;
    return typeof t === "string";
}

function uh(e) {
    const t = e.getAttribute ? e.getAttribute(Ku) : null;
    const n = e.getAttribute ? e.getAttribute(Qu) : null;
    return t && n;
}

function dh(e) {
    return e && e.classList && e.classList.contains && e.classList.contains(wd.replacementClass);
}

function ph() {
    if (wd.autoReplaceSvg === true) {
        return yh.replace;
    }
    const e = yh[wd.autoReplaceSvg];
    return e || yh.replace;
}

function hh(e) {
    return tu.createElementNS("http://www.w3.org/2000/svg", e);
}

function gh(e) {
    return tu.createElement(e);
}

function mh(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {ceFn: n = (e.tag === "svg" ? hh : gh)} = t;
    if (typeof e === "string") {
        return tu.createTextNode(e);
    }
    const s = n(e.tag);
    Object.keys(e.attributes || []).forEach((function(t) {
        s.setAttribute(t, e.attributes[t]);
    }));
    const r = e.children || [];
    r.forEach((function(e) {
        s.appendChild(mh(e, {
            ceFn: n
        }));
    }));
    return s;
}

function vh(e) {
    let t = " ".concat(e.outerHTML, " ");
    t = "".concat(t, "Font Awesome fontawesome.com ");
    return t;
}

const yh = {
    replace: function(e) {
        const t = e[0];
        if (t.parentNode) {
            e[1].forEach((e => {
                t.parentNode.insertBefore(mh(e), t);
            }));
            if (t.getAttribute(Gu) === null && wd.keepOriginalSource) {
                let e = tu.createComment(vh(t));
                t.parentNode.replaceChild(e, t);
            } else {
                t.remove();
            }
        }
    },
    nest: function(e) {
        const t = e[0];
        const n = e[1];
        if (~Pd(t).indexOf(wd.replacementClass)) {
            return yh.replace(e);
        }
        const s = new RegExp("".concat(wd.cssPrefix, "-.*"));
        delete n[0].attributes.id;
        if (n[0].attributes.class) {
            const e = n[0].attributes.class.split(" ").reduce(((e, t) => {
                if (t === wd.replacementClass || t.match(s)) {
                    e.toSvg.push(t);
                } else {
                    e.toNode.push(t);
                }
                return e;
            }), {
                toNode: [],
                toSvg: []
            });
            n[0].attributes.class = e.toSvg.join(" ");
            if (e.toNode.length === 0) {
                t.removeAttribute("class");
            } else {
                t.setAttribute("class", e.toNode.join(" "));
            }
        }
        const r = n.map((e => Hd(e))).join("\n");
        t.setAttribute(Gu, "");
        t.innerHTML = r;
    }
};

function bh(e) {
    e();
}

function wh(e, t) {
    const n = typeof t === "function" ? t : lh;
    if (e.length === 0) {
        n();
    } else {
        let t = bh;
        if (wd.mutateApproach === Yu) {
            t = eu.requestAnimationFrame || bh;
        }
        t((() => {
            const t = ph();
            const s = ch.begin("mutate");
            e.map(t);
            s();
            n();
        }));
    }
}

let xh = false;

function _h() {
    xh = true;
}

function kh() {
    xh = false;
}

let Ch = null;

function Sh(e) {
    if (!nu) {
        return;
    }
    if (!wd.observeMutations) {
        return;
    }
    const {treeCallback: t = lh, nodeCallback: n = lh, pseudoElementsCallback: s = lh, observeMutationsRoot: r = tu} = e;
    Ch = new nu((e => {
        if (xh) return;
        const r = bp();
        Ad(e).forEach((e => {
            if (e.type === "childList" && e.addedNodes.length > 0 && !fh(e.addedNodes[0])) {
                if (wd.searchPseudoElements) {
                    s(e.target);
                }
                t(e.target);
            }
            if (e.type === "attributes" && e.target.parentNode && wd.searchPseudoElements) {
                s(e.target.parentNode);
            }
            if (e.type === "attributes" && fh(e.target) && ~dd.indexOf(e.attributeName)) {
                if (e.attributeName === "class" && uh(e.target)) {
                    const {prefix: t, iconName: n} = Sp(Pd(e.target));
                    e.target.setAttribute(Ku, t || r);
                    if (n) e.target.setAttribute(Qu, n);
                } else if (dh(e.target)) {
                    n(e.target);
                }
            }
        }));
    }));
    if (!ru) return;
    Ch.observe(r, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    });
}

function Oh() {
    if (!Ch) return;
    Ch.disconnect();
}

function Eh(e) {
    const t = e.getAttribute("style");
    let n = [];
    if (t) {
        n = t.split(";").reduce(((e, t) => {
            const n = t.split(":");
            const s = n[0];
            const r = n.slice(1);
            if (s && r.length > 0) {
                e[s] = r.join(":").trim();
            }
            return e;
        }), {});
    }
    return n;
}

function Ah(e) {
    const t = e.getAttribute("data-prefix");
    const n = e.getAttribute("data-icon");
    const s = e.innerText !== void 0 ? e.innerText.trim() : "";
    let r = Sp(Pd(e));
    if (!r.prefix) {
        r.prefix = bp();
    }
    if (t && n) {
        r.prefix = t;
        r.iconName = n;
    }
    if (r.iconName && r.prefix) {
        return r;
    }
    if (r.prefix && s.length > 0) {
        r.iconName = gp(r.prefix, e.innerText) || hp(r.prefix, Yd(e.innerText));
    }
    if (!r.iconName && wd.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE) {
        r.iconName = e.firstChild.data;
    }
    return r;
}

function Ph(e) {
    const t = Ad(e.attributes).reduce(((e, t) => {
        if (e.name !== "class" && e.name !== "style") {
            e[t.name] = t.value;
        }
        return e;
    }), {});
    const n = e.getAttribute("title");
    const s = e.getAttribute("data-fa-title-id");
    if (wd.autoA11y) {
        if (n) {
            t["aria-labelledby"] = "".concat(wd.replacementClass, "-title-").concat(s || Ed());
        } else {
            t["aria-hidden"] = "true";
            t["focusable"] = "false";
        }
    }
    return t;
}

function jh() {
    return {
        iconName: null,
        title: null,
        titleId: null,
        prefix: null,
        transform: Cd,
        symbol: false,
        mask: {
            iconName: null,
            prefix: null,
            rest: []
        },
        maskId: null,
        extra: {
            classes: [],
            styles: {},
            attributes: {}
        }
    };
}

function Th(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        styleParser: true
    };
    const {iconName: n, prefix: s, rest: r} = Ah(e);
    const o = Ph(e);
    const i = Fp("parseNodeAttributes", {}, e);
    let a = t.styleParser ? Eh(e) : [];
    return Gf({
        iconName: n,
        title: e.getAttribute("title"),
        titleId: e.getAttribute("data-fa-title-id"),
        prefix: s,
        transform: Cd,
        mask: {
            iconName: null,
            prefix: null,
            rest: []
        },
        maskId: null,
        symbol: false,
        extra: {
            classes: r,
            styles: a,
            attributes: o
        }
    }, i);
}

const {styles: Ih} = Vd;

function Nh(e) {
    const t = wd.autoReplaceSvg === "nest" ? Th(e, {
        styleParser: false
    }) : Th(e);
    if (~t.extra.classes.indexOf(ld)) {
        return Rp("generateLayersText", e, t);
    } else {
        return Rp("generateSvgReplacementMutation", e, t);
    }
}

function Lh() {
    return [ ...wu, ...Mu ];
}

function Mh(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (!ru) return Promise.resolve();
    const n = tu.documentElement.classList;
    const s = e => n.add("".concat(Xu, "-").concat(e));
    const r = e => n.remove("".concat(Xu, "-").concat(e));
    const o = wd.autoFetchSvg ? Lh() : fu.concat(Object.keys(Ih));
    if (!o.includes("fa")) {
        o.push("fa");
    }
    const i = [ ".".concat(ld, ":not([").concat(Gu, "])") ].concat(o.map((e => ".".concat(e, ":not([").concat(Gu, "])")))).join(", ");
    if (i.length === 0) {
        return Promise.resolve();
    }
    let a = [];
    try {
        a = Ad(e.querySelectorAll(i));
    } catch (f) {}
    if (a.length > 0) {
        s("pending");
        r("complete");
    } else {
        return Promise.resolve();
    }
    const c = ch.begin("onTree");
    const l = a.reduce(((e, t) => {
        try {
            const n = Nh(t);
            if (n) {
                e.push(n);
            }
        } catch (f) {
            if (!Zu) {
                if (f.name === "MissingIcon") {
                    console.error(f);
                }
            }
        }
        return e;
    }), []);
    return new Promise(((e, n) => {
        Promise.all(l).then((n => {
            wh(n, (() => {
                s("active");
                s("complete");
                r("pending");
                if (typeof t === "function") t();
                c();
                e();
            }));
        })).catch((e => {
            c();
            n(e);
        }));
    }));
}

function Fh(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    Nh(e).then((e => {
        if (e) {
            wh([ e ], t);
        }
    }));
}

function Dh(e) {
    return function(t) {
        let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const s = (t || {}).icon ? t : Bp(t || {});
        let {mask: r} = n;
        if (r) {
            r = (r || {}).icon ? r : Bp(r || {});
        }
        return e(s, Gf(Gf({}, n), {}, {
            mask: r
        }));
    };
}

const Rh = function(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {transform: n = Cd, symbol: s = false, mask: r = null, maskId: o = null, title: i = null, titleId: a = null, classes: c = [], attributes: l = {}, styles: f = {}} = t;
    if (!e) return;
    const {prefix: u, iconName: d, icon: p} = e;
    return qp(Gf({
        type: "icon"
    }, e), (() => {
        Dp("beforeDOMElementCreation", {
            iconDefinition: e,
            params: t
        });
        if (wd.autoA11y) {
            if (i) {
                l["aria-labelledby"] = "".concat(wd.replacementClass, "-title-").concat(a || Ed());
            } else {
                l["aria-hidden"] = "true";
                l["focusable"] = "false";
            }
        }
        return Qp({
            icons: {
                main: Zp(p),
                mask: r ? Zp(r.icon) : {
                    found: false,
                    width: null,
                    height: null,
                    icon: {}
                }
            },
            prefix: u,
            iconName: d,
            transform: Gf(Gf({}, Cd), n),
            symbol: s,
            title: i,
            maskId: o,
            titleId: a,
            extra: {
                attributes: l,
                styles: f,
                classes: c
            }
        });
    }));
};

var Bh = {
    mixout() {
        return {
            icon: Dh(Rh)
        };
    },
    hooks() {
        return {
            mutationObserverCallbacks(e) {
                e.treeCallback = Mh;
                e.nodeCallback = Fh;
                return e;
            }
        };
    },
    provides(e) {
        e.i2svg = function(e) {
            const {node: t = tu, callback: n = () => {}} = e;
            return Mh(t, n);
        };
        e.generateSvgReplacementMutation = function(e, t) {
            const {iconName: n, title: s, titleId: r, prefix: o, transform: i, symbol: a, mask: c, maskId: l, extra: f} = t;
            return new Promise(((t, u) => {
                Promise.all([ nh(n, o), c.iconName ? nh(c.iconName, c.prefix) : Promise.resolve({
                    found: false,
                    width: 512,
                    height: 512,
                    icon: {}
                }) ]).then((c => {
                    let [u, d] = c;
                    t([ e, Qp({
                        icons: {
                            main: u,
                            mask: d
                        },
                        prefix: o,
                        iconName: n,
                        transform: i,
                        symbol: a,
                        maskId: l,
                        title: s,
                        titleId: r,
                        extra: f,
                        watchable: true
                    }) ]);
                })).catch(u);
            }));
        };
        e.generateAbstractIcon = function(e) {
            let {children: t, attributes: n, main: s, transform: r, styles: o} = e;
            const i = Id(o);
            if (i.length > 0) {
                n["style"] = i;
            }
            let a;
            if (Nd(r)) {
                a = Rp("generateAbstractTransformGrouping", {
                    main: s,
                    transform: r,
                    containerWidth: s.width,
                    iconWidth: s.width
                });
            }
            t.push(a || s.icon);
            return {
                children: t,
                attributes: n
            };
        };
    }
};

var $h = {
    mixout() {
        return {
            layer(e) {
                let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                const {classes: n = []} = t;
                return qp({
                    type: "layer"
                }, (() => {
                    Dp("beforeDOMElementCreation", {
                        assembler: e,
                        params: t
                    });
                    let s = [];
                    e((e => {
                        Array.isArray(e) ? e.map((e => {
                            s = s.concat(e.abstract);
                        })) : s = s.concat(e.abstract);
                    }));
                    return [ {
                        tag: "span",
                        attributes: {
                            class: [ "".concat(wd.cssPrefix, "-layers"), ...n ].join(" ")
                        },
                        children: s
                    } ];
                }));
            }
        };
    }
};

var zh = {
    mixout() {
        return {
            counter(e) {
                let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                const {title: n = null, classes: s = [], attributes: r = {}, styles: o = {}} = t;
                return qp({
                    type: "counter",
                    content: e
                }, (() => {
                    Dp("beforeDOMElementCreation", {
                        content: e,
                        params: t
                    });
                    return Yp({
                        content: e.toString(),
                        title: n,
                        extra: {
                            attributes: r,
                            styles: o,
                            classes: [ "".concat(wd.cssPrefix, "-layers-counter"), ...s ]
                        }
                    });
                }));
            }
        };
    }
};

var Vh = {
    mixout() {
        return {
            text(e) {
                let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                const {transform: n = Cd, title: s = null, classes: r = [], attributes: o = {}, styles: i = {}} = t;
                return qp({
                    type: "text",
                    content: e
                }, (() => {
                    Dp("beforeDOMElementCreation", {
                        content: e,
                        params: t
                    });
                    return Xp({
                        content: e,
                        transform: Gf(Gf({}, Cd), n),
                        title: s,
                        extra: {
                            attributes: o,
                            styles: i,
                            classes: [ "".concat(wd.cssPrefix, "-layers-text"), ...r ]
                        }
                    });
                }));
            }
        };
    },
    provides(e) {
        e.generateLayersText = function(e, t) {
            const {title: n, transform: s, extra: r} = t;
            let o = null;
            let i = null;
            if (ou) {
                const t = parseInt(getComputedStyle(e).fontSize, 10);
                const n = e.getBoundingClientRect();
                o = n.width / t;
                i = n.height / t;
            }
            if (wd.autoA11y && !n) {
                r.attributes["aria-hidden"] = "true";
            }
            return Promise.resolve([ e, Xp({
                content: e.innerHTML,
                width: o,
                height: i,
                transform: s,
                title: n,
                extra: r,
                watchable: true
            }) ]);
        };
    }
};

const Uh = new RegExp('"', "ug");

const Wh = [ 1105920, 1112319 ];

const Gh = Gf(Gf(Gf(Gf({}, {
    FontAwesome: {
        normal: "fas",
        400: "fas"
    }
}), vu), $u), ju);

const qh = Object.keys(Gh).reduce(((e, t) => {
    e[t.toLowerCase()] = Gh[t];
    return e;
}), {});

const Hh = Object.keys(qh).reduce(((e, t) => {
    const n = qh[t];
    e[t] = n[900] || [ ...Object.entries(n) ][0][1];
    return e;
}), {});

function Kh(e) {
    const t = e.replace(Uh, "");
    const n = Jd(t, 0);
    const s = n >= Wh[0] && n <= Wh[1];
    const r = t.length === 2 ? t[0] === t[1] : false;
    return {
        value: r ? Yd(t[0]) : Yd(t),
        isSecondary: s || r
    };
}

function Qh(e, t) {
    const n = e.replace(/^['"]|['"]$/g, "").toLowerCase();
    const s = parseInt(t);
    const r = isNaN(s) ? "normal" : s;
    return (qh[n] || {})[r] || Hh[n];
}

function Xh(e, t) {
    const n = "".concat(Hu).concat(t.replace(":", "-"));
    return new Promise(((s, r) => {
        if (e.getAttribute(n) !== null) {
            return s();
        }
        const o = Ad(e.children);
        const i = o.filter((e => e.getAttribute(qu) === t))[0];
        const a = eu.getComputedStyle(e, t);
        const c = a.getPropertyValue("font-family");
        const l = c.match(fd);
        const f = a.getPropertyValue("font-weight");
        const u = a.getPropertyValue("content");
        if (i && !l) {
            e.removeChild(i);
            return s();
        } else if (l && u !== "none" && u !== "") {
            const o = a.getPropertyValue("content");
            let u = Qh(c, f);
            const {value: d, isSecondary: p} = Kh(o);
            const h = l[0].startsWith("FontAwesome");
            let g = hp(u, d);
            let m = g;
            if (h) {
                const e = yp(d);
                if (e.iconName && e.prefix) {
                    g = e.iconName;
                    u = e.prefix;
                }
            }
            if (g && !p && (!i || i.getAttribute(Ku) !== u || i.getAttribute(Qu) !== m)) {
                e.setAttribute(n, m);
                if (i) {
                    e.removeChild(i);
                }
                const o = jh();
                const {extra: a} = o;
                a.attributes[qu] = t;
                nh(g, u).then((r => {
                    const i = Qp(Gf(Gf({}, o), {}, {
                        icons: {
                            main: r,
                            mask: wp()
                        },
                        prefix: u,
                        iconName: m,
                        extra: a,
                        watchable: true
                    }));
                    const c = tu.createElementNS("http://www.w3.org/2000/svg", "svg");
                    if (t === "::before") {
                        e.insertBefore(c, e.firstChild);
                    } else {
                        e.appendChild(c);
                    }
                    c.outerHTML = i.map((e => Hd(e))).join("\n");
                    e.removeAttribute(n);
                    s();
                })).catch(r);
            } else {
                s();
            }
        } else {
            s();
        }
    }));
}

function Yh(e) {
    return Promise.all([ Xh(e, "::before"), Xh(e, "::after") ]);
}

function Jh(e) {
    return e.parentNode !== document.head && !~Ju.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(qu) && (!e.parentNode || e.parentNode.tagName !== "svg");
}

function Zh(e) {
    if (!ru) return;
    return new Promise(((t, n) => {
        const s = Ad(e.querySelectorAll("*")).filter(Jh).map(Yh);
        const r = ch.begin("searchPseudoElements");
        _h();
        Promise.all(s).then((() => {
            r();
            kh();
            t();
        })).catch((() => {
            r();
            kh();
            n();
        }));
    }));
}

var eg = {
    hooks() {
        return {
            mutationObserverCallbacks(e) {
                e.pseudoElementsCallback = Zh;
                return e;
            }
        };
    },
    provides(e) {
        e.pseudoElements2svg = function(e) {
            const {node: t = tu} = e;
            if (wd.searchPseudoElements) {
                Zh(t);
            }
        };
    }
};

let tg = false;

var ng = {
    mixout() {
        return {
            dom: {
                unwatch() {
                    _h();
                    tg = true;
                }
            }
        };
    },
    hooks() {
        return {
            bootstrap() {
                Sh(Fp("mutationObserverCallbacks", {}));
            },
            noAuto() {
                Oh();
            },
            watch(e) {
                const {observeMutationsRoot: t} = e;
                if (tg) {
                    kh();
                } else {
                    Sh(Fp("mutationObserverCallbacks", {
                        observeMutationsRoot: t
                    }));
                }
            }
        };
    }
};

const sg = e => {
    let t = {
        size: 16,
        x: 0,
        y: 0,
        flipX: false,
        flipY: false,
        rotate: 0
    };
    return e.toLowerCase().split(" ").reduce(((e, t) => {
        const n = t.toLowerCase().split("-");
        const s = n[0];
        let r = n.slice(1).join("-");
        if (s && r === "h") {
            e.flipX = true;
            return e;
        }
        if (s && r === "v") {
            e.flipY = true;
            return e;
        }
        r = parseFloat(r);
        if (isNaN(r)) {
            return e;
        }
        switch (s) {
          case "grow":
            e.size = e.size + r;
            break;

          case "shrink":
            e.size = e.size - r;
            break;

          case "left":
            e.x = e.x - r;
            break;

          case "right":
            e.x = e.x + r;
            break;

          case "up":
            e.y = e.y - r;
            break;

          case "down":
            e.y = e.y + r;
            break;

          case "rotate":
            e.rotate = e.rotate + r;
            break;
        }
        return e;
    }), t);
};

var rg = {
    mixout() {
        return {
            parse: {
                transform: e => sg(e)
            }
        };
    },
    hooks() {
        return {
            parseNodeAttributes(e, t) {
                const n = t.getAttribute("data-fa-transform");
                if (n) {
                    e.transform = sg(n);
                }
                return e;
            }
        };
    },
    provides(e) {
        e.generateAbstractTransformGrouping = function(e) {
            let {main: t, transform: n, containerWidth: s, iconWidth: r} = e;
            const o = {
                transform: "translate(".concat(s / 2, " 256)")
            };
            const i = "translate(".concat(n.x * 32, ", ").concat(n.y * 32, ") ");
            const a = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") ");
            const c = "rotate(".concat(n.rotate, " 0 0)");
            const l = {
                transform: "".concat(i, " ").concat(a, " ").concat(c)
            };
            const f = {
                transform: "translate(".concat(r / 2 * -1, " -256)")
            };
            const u = {
                outer: o,
                inner: l,
                path: f
            };
            return {
                tag: "g",
                attributes: Gf({}, u.outer),
                children: [ {
                    tag: "g",
                    attributes: Gf({}, u.inner),
                    children: [ {
                        tag: t.icon.tag,
                        children: t.icon.children,
                        attributes: Gf(Gf({}, t.icon.attributes), u.path)
                    } ]
                } ]
            };
        };
    }
};

const og = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
};

function ig(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (e.attributes && (e.attributes.fill || t)) {
        e.attributes.fill = "black";
    }
    return e;
}

function ag(e) {
    if (e.tag === "g") {
        return e.children;
    } else {
        return [ e ];
    }
}

var cg = {
    hooks() {
        return {
            parseNodeAttributes(e, t) {
                const n = t.getAttribute("data-fa-mask");
                const s = !n ? wp() : Sp(n.split(" ").map((e => e.trim())));
                if (!s.prefix) {
                    s.prefix = bp();
                }
                e.mask = s;
                e.maskId = t.getAttribute("data-fa-mask-id");
                return e;
            }
        };
    },
    provides(e) {
        e.generateAbstractMask = function(e) {
            let {children: t, attributes: n, main: s, mask: r, maskId: o, transform: i} = e;
            const {width: a, icon: c} = s;
            const {width: l, icon: f} = r;
            const u = Ld({
                transform: i,
                containerWidth: l,
                iconWidth: a
            });
            const d = {
                tag: "rect",
                attributes: Gf(Gf({}, og), {}, {
                    fill: "white"
                })
            };
            const p = c.children ? {
                children: c.children.map(ig)
            } : {};
            const h = {
                tag: "g",
                attributes: Gf({}, u.inner),
                children: [ ig(Gf({
                    tag: c.tag,
                    attributes: Gf(Gf({}, c.attributes), u.path)
                }, p)) ]
            };
            const g = {
                tag: "g",
                attributes: Gf({}, u.outer),
                children: [ h ]
            };
            const m = "mask-".concat(o || Ed());
            const v = "clip-".concat(o || Ed());
            const y = {
                tag: "mask",
                attributes: Gf(Gf({}, og), {}, {
                    id: m,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse"
                }),
                children: [ d, g ]
            };
            const b = {
                tag: "defs",
                children: [ {
                    tag: "clipPath",
                    attributes: {
                        id: v
                    },
                    children: ag(f)
                }, y ]
            };
            t.push(b, {
                tag: "rect",
                attributes: Gf({
                    fill: "currentColor",
                    "clip-path": "url(#".concat(v, ")"),
                    mask: "url(#".concat(m, ")")
                }, og)
            });
            return {
                children: t,
                attributes: n
            };
        };
    }
};

var lg = {
    provides(e) {
        let t = false;
        if (eu.matchMedia) {
            t = eu.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }
        e.missingIconAbstract = function() {
            const e = [];
            const n = {
                fill: "currentColor"
            };
            const s = {
                attributeType: "XML",
                repeatCount: "indefinite",
                dur: "2s"
            };
            e.push({
                tag: "path",
                attributes: Gf(Gf({}, n), {}, {
                    d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
                })
            });
            const r = Gf(Gf({}, s), {}, {
                attributeName: "opacity"
            });
            const o = {
                tag: "circle",
                attributes: Gf(Gf({}, n), {}, {
                    cx: "256",
                    cy: "364",
                    r: "28"
                }),
                children: []
            };
            if (!t) {
                o.children.push({
                    tag: "animate",
                    attributes: Gf(Gf({}, s), {}, {
                        attributeName: "r",
                        values: "28;14;28;28;14;28;"
                    })
                }, {
                    tag: "animate",
                    attributes: Gf(Gf({}, r), {}, {
                        values: "1;0;1;1;0;1;"
                    })
                });
            }
            e.push(o);
            e.push({
                tag: "path",
                attributes: Gf(Gf({}, n), {}, {
                    opacity: "1",
                    d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
                }),
                children: t ? [] : [ {
                    tag: "animate",
                    attributes: Gf(Gf({}, r), {}, {
                        values: "1;0;0;0;0;1;"
                    })
                } ]
            });
            if (!t) {
                e.push({
                    tag: "path",
                    attributes: Gf(Gf({}, n), {}, {
                        opacity: "0",
                        d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
                    }),
                    children: [ {
                        tag: "animate",
                        attributes: Gf(Gf({}, r), {}, {
                            values: "0;0;1;1;0;0;"
                        })
                    } ]
                });
            }
            return {
                tag: "g",
                attributes: {
                    class: "missing"
                },
                children: e
            };
        };
    }
};

var fg = {
    hooks() {
        return {
            parseNodeAttributes(e, t) {
                const n = t.getAttribute("data-fa-symbol");
                const s = n === null ? false : n === "" ? true : n;
                e["symbol"] = s;
                return e;
            }
        };
    }
};

var ug = [ $d, Bh, $h, zh, Vh, eg, ng, rg, cg, lg, fg ];

Mp(ug, {
    mixoutsTo: Wp
});

Wp.noAuto;

Wp.config;

const dg = Wp.library;

Wp.dom;

const pg = Wp.parse;

Wp.findIconDefinition;

Wp.toHtml;

const hg = Wp.icon;

Wp.layer;

Wp.text;

Wp.counter;

function gg(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(e);
        t && (s = s.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        }))), n.push.apply(n, s);
    }
    return n;
}

function mg(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? gg(Object(n), true).forEach((function(t) {
            wg(e, t, n[t]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gg(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        }));
    }
    return e;
}

function vg(e, t) {
    if ("object" != typeof e || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
        var s = n.call(e, t);
        if ("object" != typeof s) return s;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(e);
}

function yg(e) {
    var t = vg(e, "string");
    return "symbol" == typeof t ? t : t + "";
}

function bg(e) {
    "@babel/helpers - typeof";
    return bg = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, bg(e);
}

function wg(e, t, n) {
    t = yg(t);
    if (t in e) {
        Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        e[t] = n;
    }
    return e;
}

function xg(e, t) {
    if (e == null) return {};
    var n = {};
    for (var s in e) {
        if (Object.prototype.hasOwnProperty.call(e, s)) {
            if (t.indexOf(s) >= 0) continue;
            n[s] = e[s];
        }
    }
    return n;
}

function _g(e, t) {
    if (e == null) return {};
    var n = xg(e, t);
    var s, r;
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (r = 0; r < o.length; r++) {
            s = o[r];
            if (t.indexOf(s) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(e, s)) continue;
            n[s] = e[s];
        }
    }
    return n;
}

var kg = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};

var Cg = {
    exports: {}
};

(function(e) {
    (function(t) {
        var n = function(e, t, s) {
            if (!l(t) || u(t) || d(t) || p(t) || c(t)) {
                return t;
            }
            var r, o = 0, i = 0;
            if (f(t)) {
                r = [];
                for (i = t.length; o < i; o++) {
                    r.push(n(e, t[o], s));
                }
            } else {
                r = {};
                for (var a in t) {
                    if (Object.prototype.hasOwnProperty.call(t, a)) {
                        r[e(a, s)] = n(e, t[a], s);
                    }
                }
            }
            return r;
        };
        var s = function(e, t) {
            t = t || {};
            var n = t.separator || "_";
            var s = t.split || /(?=[A-Z])/;
            return e.split(s).join(n);
        };
        var r = function(e) {
            if (h(e)) {
                return e;
            }
            e = e.replace(/[\-_\s]+(.)?/g, (function(e, t) {
                return t ? t.toUpperCase() : "";
            }));
            return e.substr(0, 1).toLowerCase() + e.substr(1);
        };
        var o = function(e) {
            var t = r(e);
            return t.substr(0, 1).toUpperCase() + t.substr(1);
        };
        var i = function(e, t) {
            return s(e, t).toLowerCase();
        };
        var a = Object.prototype.toString;
        var c = function(e) {
            return typeof e === "function";
        };
        var l = function(e) {
            return e === Object(e);
        };
        var f = function(e) {
            return a.call(e) == "[object Array]";
        };
        var u = function(e) {
            return a.call(e) == "[object Date]";
        };
        var d = function(e) {
            return a.call(e) == "[object RegExp]";
        };
        var p = function(e) {
            return a.call(e) == "[object Boolean]";
        };
        var h = function(e) {
            e = e - 0;
            return e === e;
        };
        var g = function(e, t) {
            var n = t && "process" in t ? t.process : t;
            if (typeof n !== "function") {
                return e;
            }
            return function(t, s) {
                return n(t, e, s);
            };
        };
        var m = {
            camelize: r,
            decamelize: i,
            pascalize: o,
            depascalize: i,
            camelizeKeys: function(e, t) {
                return n(g(r, t), e);
            },
            decamelizeKeys: function(e, t) {
                return n(g(i, t), e, t);
            },
            pascalizeKeys: function(e, t) {
                return n(g(o, t), e);
            },
            depascalizeKeys: function() {
                return this.decamelizeKeys.apply(this, arguments);
            }
        };
        if (e.exports) {
            e.exports = m;
        } else {
            t.humps = m;
        }
    })(kg);
})(Cg);

var Sg = Cg.exports;

var Og = [ "class", "style" ];

function Eg(e) {
    return e.split(";").map((function(e) {
        return e.trim();
    })).filter((function(e) {
        return e;
    })).reduce((function(e, t) {
        var n = t.indexOf(":");
        var s = Sg.camelize(t.slice(0, n));
        var r = t.slice(n + 1).trim();
        e[s] = r;
        return e;
    }), {});
}

function Ag(e) {
    return e.split(/\s+/).reduce((function(e, t) {
        e[t] = true;
        return e;
    }), {});
}

function Pg(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (typeof e === "string") {
        return e;
    }
    var s = (e.children || []).map((function(e) {
        return Pg(e);
    }));
    var r = Object.keys(e.attributes || {}).reduce((function(t, n) {
        var s = e.attributes[n];
        switch (n) {
          case "class":
            t.class = Ag(s);
            break;

          case "style":
            t.style = Eg(s);
            break;

          default:
            t.attrs[n] = s;
        }
        return t;
    }), {
        attrs: {},
        class: {},
        style: {}
    });
    n.class;
    var o = n.style, i = o === void 0 ? {} : o, a = _g(n, Og);
    return jo(e.tag, mg(mg(mg({}, t), {}, {
        class: r.class,
        style: mg(mg({}, r.style), i)
    }, r.attrs), a), s);
}

var jg = false;

try {
    jg = true;
} catch (Wv) {}

function Tg() {
    if (!jg && console && typeof console.error === "function") {
        var e;
        (e = console).error.apply(e, arguments);
    }
}

function Ig(e, t) {
    return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? wg({}, e, t) : {};
}

function Ng(e) {
    var t;
    var n = (t = {
        "fa-spin": e.spin,
        "fa-pulse": e.pulse,
        "fa-fw": e.fixedWidth,
        "fa-border": e.border,
        "fa-li": e.listItem,
        "fa-inverse": e.inverse,
        "fa-flip": e.flip === true,
        "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
        "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
    }, wg(wg(wg(wg(wg(wg(wg(wg(wg(wg(t, "fa-".concat(e.size), e.size !== null), "fa-rotate-".concat(e.rotation), e.rotation !== null), "fa-pull-".concat(e.pull), e.pull !== null), "fa-swap-opacity", e.swapOpacity), "fa-bounce", e.bounce), "fa-shake", e.shake), "fa-beat", e.beat), "fa-fade", e.fade), "fa-beat-fade", e.beatFade), "fa-flash", e.flash), 
    wg(wg(t, "fa-spin-pulse", e.spinPulse), "fa-spin-reverse", e.spinReverse));
    return Object.keys(n).map((function(e) {
        return n[e] ? e : null;
    })).filter((function(e) {
        return e;
    }));
}

function Lg(e) {
    if (e && bg(e) === "object" && e.prefix && e.iconName && e.icon) {
        return e;
    }
    if (pg.icon) {
        return pg.icon(e);
    }
    if (e === null) {
        return null;
    }
    if (bg(e) === "object" && e.prefix && e.iconName) {
        return e;
    }
    if (Array.isArray(e) && e.length === 2) {
        return {
            prefix: e[0],
            iconName: e[1]
        };
    }
    if (typeof e === "string") {
        return {
            prefix: "fas",
            iconName: e
        };
    }
}

var Mg = Rn({
    name: "FontAwesomeIcon",
    props: {
        border: {
            type: Boolean,
            default: false
        },
        fixedWidth: {
            type: Boolean,
            default: false
        },
        flip: {
            type: [ Boolean, String ],
            default: false,
            validator: function e(t) {
                return [ true, false, "horizontal", "vertical", "both" ].indexOf(t) > -1;
            }
        },
        icon: {
            type: [ Object, Array, String ],
            required: true
        },
        mask: {
            type: [ Object, Array, String ],
            default: null
        },
        maskId: {
            type: String,
            default: null
        },
        listItem: {
            type: Boolean,
            default: false
        },
        pull: {
            type: String,
            default: null,
            validator: function e(t) {
                return [ "right", "left" ].indexOf(t) > -1;
            }
        },
        pulse: {
            type: Boolean,
            default: false
        },
        rotation: {
            type: [ String, Number ],
            default: null,
            validator: function e(t) {
                return [ 90, 180, 270 ].indexOf(Number.parseInt(t, 10)) > -1;
            }
        },
        swapOpacity: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null,
            validator: function e(t) {
                return [ "2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x" ].indexOf(t) > -1;
            }
        },
        spin: {
            type: Boolean,
            default: false
        },
        transform: {
            type: [ String, Object ],
            default: null
        },
        symbol: {
            type: [ Boolean, String ],
            default: false
        },
        title: {
            type: String,
            default: null
        },
        titleId: {
            type: String,
            default: null
        },
        inverse: {
            type: Boolean,
            default: false
        },
        bounce: {
            type: Boolean,
            default: false
        },
        shake: {
            type: Boolean,
            default: false
        },
        beat: {
            type: Boolean,
            default: false
        },
        fade: {
            type: Boolean,
            default: false
        },
        beatFade: {
            type: Boolean,
            default: false
        },
        flash: {
            type: Boolean,
            default: false
        },
        spinPulse: {
            type: Boolean,
            default: false
        },
        spinReverse: {
            type: Boolean,
            default: false
        }
    },
    setup: function e(t, n) {
        var s = n.attrs;
        var r = Po((function() {
            return Lg(t.icon);
        }));
        var o = Po((function() {
            return Ig("classes", Ng(t));
        }));
        var i = Po((function() {
            return Ig("transform", typeof t.transform === "string" ? pg.transform(t.transform) : t.transform);
        }));
        var a = Po((function() {
            return Ig("mask", Lg(t.mask));
        }));
        var c = Po((function() {
            return hg(r.value, mg(mg(mg(mg({}, o.value), i.value), a.value), {}, {
                symbol: t.symbol,
                title: t.title,
                titleId: t.titleId,
                maskId: t.maskId
            }));
        }));
        pr(c, (function(e) {
            if (!e) {
                return Tg("Could not find one or more icon(s)", r.value, a.value);
            }
        }), {
            immediate: true
        });
        var l = Po((function() {
            return c.value ? Pg(c.value.abstract[0], {}, s) : null;
        }));
        return function() {
            return l.value;
        };
    }
});

/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */ const Fg = {
    prefix: "fas",
    iconName: "eye-slash",
    icon: [ 640, 512, [], "f070", "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" ]
};

const Dg = {
    prefix: "fas",
    iconName: "eye",
    icon: [ 576, 512, [ 128065 ], "f06e", "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" ]
};

const Rg = {
    prefix: "fas",
    iconName: "xmark",
    icon: [ 384, 512, [ 128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times" ], "f00d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" ]
};

const Bg = Rg;

const $g = {
    prefix: "fas",
    iconName: "spinner",
    icon: [ 512, 512, [], "f110", "M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" ]
};

const zg = {
    prefix: "fas",
    iconName: "check",
    icon: [ 448, 512, [ 10003, 10004 ], "f00c", "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" ]
};

const Vg = {
    prefix: "fas",
    iconName: "thumbs-up",
    icon: [ 512, 512, [ 128077, 61575 ], "f164", "M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" ]
};

dg.add($g);

const Ug = {
    name: "Badges",
    components: {
        FontAwesomeIcon: Mg
    },
    data() {
        return {
            syncing: false,
            searchQuery: "",
            loading: true
        };
    },
    computed: {
        ...gc([ "getBadges" ]),
        badges() {
            return this.getBadges;
        },
        filteredBadges() {
            return this.badges.filter((e => e.name.toLowerCase().includes(this.searchQuery.toLowerCase())));
        }
    },
    methods: {
        ...mc([ "fetchBadges" ]),
        async syncBadges() {
            this.syncing = true;
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!e.ok) {
                    throw new Error(`Sync failed with status: ${e.status}`);
                }
                const t = await e.json();
                if (t.success) {
                    await this.fetchBadges();
                } else {
                    alert("Failed to sync badges: " + (t.message || "Unknown error"));
                }
            } catch (e) {
                alert("An error occurred while syncing badges: " + e.message);
                console.error("Sync Error:", e);
            } finally {
                this.syncing = false;
            }
        }
    },
    async mounted() {
        this.loading = true;
        await this.fetchBadges();
        this.loading = false;
    }
};

const Wg = {
    class: "badges-page"
};

const Gg = {
    class: "badges-header"
};

const qg = [ "disabled" ];

const Hg = {
    key: 0,
    class: "spinner-container"
};

const Kg = {
    key: 1
};

const Qg = {
    key: 0
};

const Xg = {
    class: "badge-left"
};

const Yg = [ "src" ];

const Jg = {
    class: "badge-right"
};

const Zg = {
    class: "badge-name"
};

const em = {
    key: 0,
    class: "badge-pill language-pill"
};

const tm = {
    key: 1,
    class: "badge-pill category-pill"
};

const nm = {
    key: 2,
    class: "badge-pill expiry-pill"
};

const sm = {
    key: 3,
    class: "badge-pill expiry-pill"
};

const rm = {
    class: "badge-description"
};

const om = {
    key: 1
};

function im(e, t, n, s, r, o) {
    const i = is("font-awesome-icon");
    return Fr(), zr("div", Wg, [ Hr("div", Gg, [ Sn(Hr("input", {
        "onUpdate:modelValue": t[0] || (t[0] = e => r.searchQuery = e),
        placeholder: "Search badges...",
        class: "search-input"
    }, null, 512), [ [ Ki, r.searchQuery ] ]), Hr("button", {
        onClick: t[1] || (t[1] = (...e) => o.syncBadges && o.syncBadges(...e)),
        class: "sync-button",
        disabled: r.syncing
    }, [ r.syncing ? (Fr(), Vr(i, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : Zr("", true), Jr(" " + Z(r.syncing ? "Syncing..." : "Sync Badges"), 1) ], 8, qg) ]), r.loading ? (Fr(), 
    zr("div", Hg, [ Kr(i, {
        icon: "spinner",
        spin: "",
        class: "loading-spinner"
    }) ])) : (Fr(), zr("div", Kg, [ o.filteredBadges.length > 0 ? (Fr(), zr("div", Qg, [ (Fr(true), 
    zr(jr, null, fs(o.filteredBadges, (e => (Fr(), zr("div", {
        key: e.id,
        class: "badge-card"
    }, [ Hr("div", Xg, [ Hr("img", {
        src: e.image,
        alt: "Badge Image",
        class: "badge-image"
    }, null, 8, Yg) ]), Hr("div", Jg, [ Hr("h2", Zg, [ Jr(Z(e.name) + " ", 1), e.alt_language.length > 0 && e.alt_language !== "N/A" ? (Fr(), 
    zr("span", em, Z(e.alt_language.join(", ")), 1)) : Zr("", true), e.category.length > 0 ? (Fr(), 
    zr("span", tm, Z(e.category.join(", ")), 1)) : Zr("", true), parseInt(e.expires) === 1 ? (Fr(), 
    zr("span", nm, "Expires after 1 day")) : parseInt(e.expires) > 1 ? (Fr(), zr("span", sm, "Expires after " + Z(e.expires) + " days", 1)) : Zr("", true) ]), Hr("p", rm, Z(e.description.length > 380 ? e.description.slice(0, 370) + "..." : e.description), 1) ]) ])))), 128)) ])) : (Fr(), 
    zr("p", om, "No badges found. Please sync to load badges.")) ])) ]);
}

const am = ua(Ug, [ [ "render", im ], [ "__scopeId", "data-v-5d6355ed" ] ]);

const cm = {
    "Course Complete": {
        label: "Course",
        objects: [ "sfwd-courses" ]
    },
    "Lesson Complete": {
        label: "Lesson",
        objects: [ "sfwd-lessons" ]
    },
    "Topic Complete": {
        label: "Topic",
        objects: [ "sfwd-topic" ]
    },
    "Quiz Complete": {
        label: "Quiz",
        objects: [ "sfwd-quiz" ]
    }
};

const lm = {
    LearnDash: cm
};

dg.add($g);

const fm = {
    name: "Triggers",
    components: {
        FontAwesomeIcon: Mg
    },
    data() {
        return {
            tempIdCounter: 1,
            showDeleteModal: false,
            triggerToDelete: null,
            triggerOptions: lm,
            searchQuery: "",
            loading: true
        };
    },
    computed: {
        ...gc([ "getBadges", "getTriggers" ]),
        badges() {
            return this.getBadges;
        },
        triggers() {
            return this.getTriggers;
        },
        filteredTriggers() {
            return this.triggers.filter((e => this.getBadgeName(e.badge_id).toLowerCase().includes(this.searchQuery.toLowerCase()) || e.extension.toLowerCase().includes(this.searchQuery.toLowerCase()) || e.trigger_type.toLowerCase().includes(this.searchQuery.toLowerCase())));
        }
    },
    methods: {
        ...mc([ "fetchBadges", "fetchTriggers", "saveTriggerToStore", "deleteTrigger" ]),
        getBadgeImage(e) {
            const t = this.badges.find((t => t.id === e));
            return t ? t.image : "";
        },
        getBadgeName(e) {
            const t = this.badges.find((t => t.id === e));
            return t ? t.name : "Select Badge";
        },
        availableTriggerTypes(e) {
            return this.triggerOptions[e.extension] || {};
        },
        availableObjects(e) {
            var t;
            return ((t = this.availableTriggerTypes(e)[e.trigger_type]) == null ? void 0 : t.objects) || [];
        },
        availableLabel(e) {
            var t;
            return ((t = this.availableTriggerTypes(e)[e.trigger_type]) == null ? void 0 : t.label) || "Object";
        },
        addNewTrigger() {
            if (this.badges.length === 0) {
                console.error("No badges available to assign to the trigger.");
                return;
            }
            const e = {
                tempId: this.tempIdCounter++,
                badge_id: this.badges[0].id,
                extension: "WordPress",
                trigger_type: "User Created",
                object: "",
                isEditing: true
            };
            this.$store.commit("addTrigger", e);
        },
        async editTrigger(e) {
            e.isEditing = true;
            await this.updateTriggerFields(e);
        },
        async updateTriggerFields(e) {
            const t = this.availableObjects(e)[0];
            if (t) {
                const n = await this.fetchPostsByType(t);
                e.availablePosts = n;
            } else {
                e.availablePosts = [];
            }
        },
        async saveTrigger(e) {
            var t;
            try {
                const n = ((t = e.availablePosts.find((t => t.id === e.object))) == null ? void 0 : t.title) || "";
                const s = await this.saveTriggerToStore({
                    id: e.id,
                    badge_id: e.badge_id,
                    extension: e.extension,
                    trigger_type: e.trigger_type,
                    object: e.object,
                    object_title: n
                });
                if (e.tempId) {
                    const t = this.triggers.findIndex((t => t.tempId === e.tempId));
                    if (t !== -1) {
                        this.$store.commit("deleteTrigger", e.tempId);
                    }
                }
                const r = this.triggers.findIndex((e => e.id === s.trigger.id));
                if (r === -1) {
                    this.$store.commit("addTrigger", s.trigger);
                }
                e.object_title = s.trigger.object_title;
                e.id = s.trigger.id;
                e.isEditing = false;
            } catch (n) {
                console.error("Error saving trigger:", n);
            }
        },
        cancelTrigger(e) {
            if (!e.id) {
                this.$store.commit("deleteTrigger", e.tempId);
            } else {
                const t = this.triggers.find((t => t.id === e.id));
                Object.assign(e, t);
                e.isEditing = false;
            }
        },
        confirmDelete(e) {
            this.triggerToDelete = e;
            this.showDeleteModal = true;
        },
        async deleteTrigger() {
            try {
                if (this.triggerToDelete.id) {
                    await this.$store.dispatch("deleteTrigger", this.triggerToDelete.id);
                } else {
                    this.$store.commit("deleteTrigger", this.triggerToDelete.tempId);
                }
            } catch (e) {
                console.error("Error deleting trigger:", e);
            } finally {
                this.showDeleteModal = false;
                this.triggerToDelete = null;
            }
        },
        async fetchPostsByType(e) {
            try {
                const t = await fetch(`/wp-json/pathwise-badge-connect/v1/posts-by-type?post_type=${e}`, {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const n = await t.json();
                return n.posts;
            } catch (t) {
                console.error("An error occurred while fetching posts: " + t.message);
                return [];
            }
        }
    },
    async mounted() {
        this.loading = true;
        await this.fetchTriggers();
        await this.fetchBadges();
        this.loading = false;
    }
};

const um = {
    class: "triggers-page"
};

const dm = {
    class: "triggers-header"
};

const pm = {
    key: 0,
    class: "spinner-container"
};

const hm = {
    key: 1
};

const gm = {
    key: 0
};

const mm = {
    class: "trigger-left"
};

const vm = {
    class: "trigger-image"
};

const ym = [ "src" ];

const bm = {
    class: "trigger-right"
};

const wm = {
    class: "trigger-header"
};

const xm = {
    class: "badge-name-select"
};

const _m = {
    key: 0
};

const km = [ "onUpdate:modelValue" ];

const Cm = [ "value" ];

const Sm = {
    key: 1
};

const Om = {
    class: "badge-name"
};

const Em = {
    class: "trigger-actions"
};

const Am = [ "onClick" ];

const Pm = [ "onClick" ];

const jm = [ "onClick" ];

const Tm = [ "onClick" ];

const Im = {
    class: "trigger-field-group"
};

const Nm = {
    key: 0,
    class: "trigger-fields-row"
};

const Lm = {
    class: "trigger-field"
};

const Mm = [ "onUpdate:modelValue", "onChange" ];

const Fm = [ "value" ];

const Dm = {
    class: "trigger-field"
};

const Rm = [ "onUpdate:modelValue", "onChange" ];

const Bm = [ "value" ];

const $m = {
    class: "trigger-field"
};

const zm = [ "onUpdate:modelValue" ];

const Vm = [ "value" ];

const Um = {
    key: 1,
    class: "trigger-fields-row"
};

const Wm = {
    class: "trigger-field"
};

const Gm = {
    class: "trigger-value"
};

const qm = {
    class: "trigger-field"
};

const Hm = {
    class: "trigger-value"
};

const Km = {
    class: "trigger-field"
};

const Qm = {
    class: "trigger-value"
};

const Xm = {
    key: 1
};

const Ym = {
    key: 2,
    class: "modal"
};

const Jm = {
    class: "modal-content"
};

function Zm(e, t, n, s, r, o) {
    const i = is("font-awesome-icon");
    return Fr(), zr("div", um, [ Hr("div", dm, [ Sn(Hr("input", {
        "onUpdate:modelValue": t[0] || (t[0] = e => r.searchQuery = e),
        placeholder: "Search triggers...",
        class: "search-input"
    }, null, 512), [ [ Ki, r.searchQuery ] ]), Hr("button", {
        onClick: t[1] || (t[1] = (...e) => o.addNewTrigger && o.addNewTrigger(...e)),
        class: "add-trigger-button"
    }, "Add New Trigger") ]), r.loading ? (Fr(), zr("div", pm, [ Kr(i, {
        icon: "spinner",
        spin: "",
        class: "loading-spinner"
    }) ])) : (Fr(), zr("div", hm, [ o.filteredTriggers.length > 0 ? (Fr(), zr("div", gm, [ (Fr(true), 
    zr(jr, null, fs(o.filteredTriggers, (e => (Fr(), zr("div", {
        key: e.id || e.tempId,
        class: "trigger-card"
    }, [ Hr("div", mm, [ Hr("div", vm, [ Hr("img", {
        src: o.getBadgeImage(e.badge_id),
        alt: "Badge Image"
    }, null, 8, ym) ]) ]), Hr("div", bm, [ Hr("div", wm, [ Hr("div", xm, [ e.isEditing ? (Fr(), 
    zr("div", _m, [ Sn(Hr("select", {
        "onUpdate:modelValue": t => e.badge_id = t,
        class: "select-box"
    }, [ (Fr(true), zr(jr, null, fs(o.badges, (e => (Fr(), zr("option", {
        key: e.id,
        value: e.id
    }, Z(e.name), 9, Cm)))), 128)) ], 8, km), [ [ Ji, e.badge_id ] ]) ])) : (Fr(), zr("div", Sm, [ Hr("label", Om, Z(o.getBadgeName(e.badge_id)), 1) ])) ]), Hr("div", Em, [ e.isEditing ? (Fr(), 
    zr("button", {
        key: 0,
        onClick: t => o.saveTrigger(e),
        class: "save-button"
    }, "Save", 8, Am)) : Zr("", true), e.isEditing ? (Fr(), zr("button", {
        key: 1,
        onClick: t => o.cancelTrigger(e),
        class: "cancel-button"
    }, "Cancel", 8, Pm)) : Zr("", true), e.isEditing ? (Fr(), zr("button", {
        key: 2,
        onClick: t => o.confirmDelete(e),
        class: "delete-button"
    }, "Delete", 8, jm)) : (Fr(), zr("button", {
        key: 3,
        onClick: t => o.editTrigger(e),
        class: "edit-button"
    }, "Edit", 8, Tm)) ]) ]), Hr("div", Im, [ e.isEditing ? (Fr(), zr("div", Nm, [ Hr("div", Lm, [ t[4] || (t[4] = Hr("label", null, "Extension", -1)), Sn(Hr("select", {
        "onUpdate:modelValue": t => e.extension = t,
        class: "select-box",
        onChange: t => o.updateTriggerFields(e)
    }, [ (Fr(true), zr(jr, null, fs(r.triggerOptions, ((e, t) => (Fr(), zr("option", {
        key: t,
        value: t
    }, Z(t), 9, Fm)))), 128)) ], 40, Mm), [ [ Ji, e.extension ] ]) ]), Hr("div", Dm, [ t[5] || (t[5] = Hr("label", null, "Trigger Action", -1)), Sn(Hr("select", {
        "onUpdate:modelValue": t => e.trigger_type = t,
        class: "select-box",
        onChange: t => o.updateTriggerFields(e)
    }, [ (Fr(true), zr(jr, null, fs(o.availableTriggerTypes(e), ((e, t) => (Fr(), zr("option", {
        key: t,
        value: t
    }, Z(t), 9, Bm)))), 128)) ], 40, Rm), [ [ Ji, e.trigger_type ] ]) ]), Hr("div", $m, [ Hr("label", null, Z(o.availableLabel(e)), 1), Sn(Hr("select", {
        "onUpdate:modelValue": t => e.object = t,
        class: "select-box"
    }, [ (Fr(true), zr(jr, null, fs(e.availablePosts, (e => (Fr(), zr("option", {
        key: e.id,
        value: e.id
    }, Z(e.title) + " (ID: " + Z(e.id) + ") ", 9, Vm)))), 128)) ], 8, zm), [ [ Ji, e.object ] ]) ]) ])) : (Fr(), 
    zr("div", Um, [ Hr("div", Wm, [ t[6] || (t[6] = Hr("label", null, "Extension", -1)), Hr("p", Gm, Z(e.extension), 1) ]), Hr("div", qm, [ t[7] || (t[7] = Hr("label", null, "Trigger Action", -1)), Hr("p", Hm, Z(e.trigger_type), 1) ]), Hr("div", Km, [ Hr("label", null, Z(o.availableLabel(e)), 1), Hr("p", Qm, Z(e.object_title) + " (ID: " + Z(e.object) + ")", 1) ]) ])) ]) ]) ])))), 128)) ])) : (Fr(), 
    zr("p", Xm, "Get started by creating your first badge issuing trigger.")) ])), r.showDeleteModal ? (Fr(), 
    zr("div", Ym, [ Hr("div", Jm, [ t[8] || (t[8] = Hr("h3", null, "Confirm Delete", -1)), t[9] || (t[9] = Hr("p", null, "Are you sure you want to delete this trigger?", -1)), Hr("button", {
        onClick: t[2] || (t[2] = e => o.deleteTrigger(r.triggerToDelete)),
        class: "confirm-delete-button"
    }, "Yes, Delete"), Hr("button", {
        onClick: t[3] || (t[3] = e => r.showDeleteModal = false),
        class: "confirm-cancel-button"
    }, "Cancel") ]) ])) : Zr("", true) ]);
}

const ev = ua(fm, [ [ "render", Zm ], [ "__scopeId", "data-v-1ff4b462" ] ]);

function tv(e) {
    if (e === "Checking...") {
        return "Checking...";
    }
    const t = new Date;
    const n = Math.floor((t - new Date(e + "Z")) / 1e3);
    if (n < 60) {
        return `${n} secs ago`;
    } else if (n < 3600) {
        const e = Math.floor(n / 60);
        return `${e} minute${e > 1 ? "s" : ""} ago`;
    } else if (n < 86400) {
        const e = Math.floor(n / 3600);
        return `${e} hour${e > 1 ? "s" : ""} ago`;
    } else if (n < 604800) {
        const e = Math.floor(n / 86400);
        return `${e} day${e > 1 ? "s" : ""} ago`;
    } else if (n < 2419200) {
        const e = Math.floor(n / 604800);
        return `${e} week${e > 1 ? "s" : ""} ago`;
    } else if (n < 31536e3) {
        const e = Math.floor(n / 2419200);
        return `${e} month${e > 1 ? "s" : ""} ago`;
    } else {
        const e = Math.floor(n / 31536e3);
        return `${e} year${e > 1 ? "s" : ""} ago`;
    }
}

function nv(e) {
    if (e === "Checking...") {
        return "pill-yellow";
    }
    const t = new Date;
    const n = Math.floor((t - new Date(e + "Z")) / 1e3);
    if (n < 60) {
        return "pill-green";
    } else if (n < 86400) {
        return "pill-blue";
    } else if (n < 604800) {
        return "pill-yellow";
    } else {
        return "pill-red";
    }
}

dg.add(Dg, Fg, zg, $g, Vg, Bg);

const sv = {
    name: "Settings",
    components: {
        FontAwesomeIcon: Mg
    },
    data() {
        return {
            status: "Connecting...",
            lastSync: "Checking...",
            clientId: "",
            clientSecret: "",
            enableLog: false,
            purgeLog: "1_month",
            showClientId: false,
            showClientSecret: false,
            clientIdChanged: false,
            clientSecretChanged: false,
            savingClientId: false,
            savingClientSecret: false,
            saveSuccessClientId: false,
            saveSuccessClientSecret: false,
            saveErrorClientId: false,
            saveErrorClientSecret: false,
            isSyncing: false,
            syncSuccess: false,
            syncError: false,
            syncButtonText: "Sync Now",
            syncButtonClass: "pill-green",
            syncIcon: "sync"
        };
    },
    computed: {
        badges() {
            return this.$store.getters.getBadges;
        },
        status() {
            return this.$store.getters.getConnectionStatus;
        },
        statusClass() {
            return this.$store.getters.getConnectionStatusClass;
        }
    },
    methods: {
        timeAgo: tv,
        timeAgoClass: nv,
        toggleClientIdVisibility() {
            this.showClientId = !this.showClientId;
        },
        toggleClientSecretVisibility() {
            this.showClientSecret = !this.showClientSecret;
        },
        onInputChange(e) {
            if (e === "clientId") {
                this.clientIdChanged = true;
                this.saveSuccessClientId = false;
                this.saveErrorClientId = false;
            } else if (e === "clientSecret") {
                this.clientSecretChanged = true;
                this.saveSuccessClientSecret = false;
                this.saveErrorClientSecret = false;
            }
        },
        buttonClass(e) {
            if (e === "clientId") {
                if (this.savingClientId) return "pill-blue";
                if (this.saveSuccessClientId) return "pill-green";
                if (this.saveErrorClientId) return "pill-red";
            } else if (e === "clientSecret") {
                if (this.savingClientSecret) return "pill-blue";
                if (this.saveSuccessClientSecret) return "pill-green";
                if (this.saveErrorClientSecret) return "pill-red";
            }
            return "";
        },
        async fetchSettings() {
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/settings", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!e.ok) {
                    throw new Error("Failed to fetch settings");
                }
                const t = await e.json();
                if (t && t.settings) {
                    this.clientId = t.settings.client_id;
                    this.clientSecret = t.settings.client_secret;
                }
            } catch (e) {
                console.error("Error fetching settings:", e);
            }
        },
        async fetchLastSync() {
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/last-sync", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!e.ok) {
                    throw new Error("Failed to fetch last sync time");
                }
                const t = await e.json();
                if (t.last_sync) {
                    this.lastSync = new Date(t.last_sync);
                }
            } catch (e) {
                console.error("Error fetching last sync time:", e);
            }
        },
        async saveOption(e) {
            try {
                let t;
                if (e === "clientId") {
                    this.savingClientId = true;
                    this.saveSuccessClientId = false;
                    t = this.clientId;
                } else if (e === "clientSecret") {
                    this.savingClientSecret = true;
                    this.saveSuccessClientSecret = false;
                    t = this.clientSecret;
                }
                await this.saveToWordPressOption({
                    client_id: this.clientId,
                    client_secret: this.clientSecret
                });
                await this.reloadConnectionStatus();
            } catch (t) {
                console.error(`Failed to save ${e}:`, t);
                if (e === "clientId") {
                    this.saveErrorClientId = true;
                } else if (e === "clientSecret") {
                    this.saveErrorClientSecret = true;
                }
            } finally {
                if (e === "clientId") {
                    this.savingClientId = false;
                } else if (e === "clientSecret") {
                    this.savingClientSecret = false;
                }
            }
        },
        async reloadConnectionStatus() {
            await this.$store.dispatch("fetchConnectionStatus");
        },
        async saveToWordPressOption(e) {
            const t = await fetch("/wp-json/pathwise-badge-connect/v1/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "pbc-api-key": pbcOptions.pbcApiKey,
                    "X-WP-Nonce": pbcOptions.nonce
                },
                body: JSON.stringify(e)
            });
            if (!t.ok) {
                throw new Error("Network response was not ok");
            }
            const n = await t.json();
            if (!n.success) {
                throw new Error(n.message || "Failed to save settings");
            }
        },
        async syncNow() {
            this.isSyncing = true;
            this.syncButtonText = "Syncing";
            this.syncButtonClass = "pill-blue";
            this.syncIcon = "spinner";
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!e.ok) {
                    throw new Error("Failed to sync badges");
                }
                const t = await e.json();
                if (t.success) {
                    this.lastSync = new Date(t.last_sync);
                    this.$store.commit("setBadges", t.badges);
                    this.syncSuccess = true;
                    this.syncButtonText = "Sync Now";
                    this.syncButtonClass = "pill-green";
                    this.syncIcon = "sync";
                } else {
                    throw new Error(t.message || "Unknown error during sync");
                }
            } catch (e) {
                console.error("Sync failed:", e);
                this.syncError = true;
                this.syncButtonText = "Error";
                this.syncButtonClass = "pill-red";
                this.syncIcon = "times";
                setTimeout((() => {
                    this.resetSyncButton();
                }), 5e3);
            } finally {
                this.isSyncing = false;
            }
        },
        resetSyncButton() {
            this.syncButtonText = "Sync Now";
            this.syncButtonClass = "pill-green";
            this.syncIcon = "sync";
            this.syncError = false;
        }
    },
    async mounted() {
        await this.fetchSettings();
        await this.fetchLastSync();
        await this.reloadConnectionStatus();
    }
};

const rv = {
    class: "settings-container"
};

const ov = {
    class: "section"
};

const iv = {
    class: "flex-container"
};

const av = {
    class: "flex-item value-item"
};

const cv = {
    class: "flex-container"
};

const lv = {
    class: "value-item"
};

const fv = [ "disabled" ];

const uv = {
    class: "flex-container"
};

const dv = {
    class: "flex-item value-item"
};

const pv = {
    class: "input-group"
};

const hv = [ "type" ];

const gv = [ "disabled" ];

const mv = {
    class: "flex-container"
};

const vv = {
    class: "flex-item value-item"
};

const yv = {
    class: "input-group"
};

const bv = [ "type" ];

const wv = [ "disabled" ];

function xv(e, t, n, s, r, o) {
    const i = is("font-awesome-icon");
    return Fr(), zr("div", rv, [ Hr("div", ov, [ t[13] || (t[13] = Hr("h3", null, "Open Badge Factory API", -1)), Hr("div", iv, [ t[9] || (t[9] = Hr("div", {
        class: "flex-item label-item"
    }, [ Hr("label", {
        for: "status"
    }, "Connection Status:") ], -1)), Hr("div", av, [ Hr("span", {
        class: G(o.statusClass)
    }, Z(o.status), 3) ]) ]), Hr("div", cv, [ t[10] || (t[10] = Hr("div", {
        class: "flex-item label-item"
    }, [ Hr("label", {
        for: "lastSync"
    }, "Last Sync:") ], -1)), Hr("div", lv, [ Hr("span", {
        class: G([ "pill", o.timeAgoClass(r.lastSync) ])
    }, Z(o.timeAgo(r.lastSync)), 3), Hr("button", {
        onClick: t[0] || (t[0] = (...e) => o.syncNow && o.syncNow(...e)),
        class: G([ [ "pill", r.syncButtonClass ], "sync-button" ]),
        disabled: r.isSyncing
    }, [ Kr(i, {
        icon: r.syncIcon,
        spin: r.isSyncing
    }, null, 8, [ "icon", "spin" ]), Jr(" " + Z(r.syncButtonText), 1) ], 10, fv) ]) ]), t[14] || (t[14] = Hr("hr", null, null, -1)), Hr("div", uv, [ t[11] || (t[11] = Hr("div", {
        class: "flex-item label-item"
    }, [ Hr("label", {
        for: "clientId"
    }, "Open Badge Factory API Client ID:") ], -1)), Hr("div", dv, [ Hr("div", pv, [ Sn(Hr("input", {
        type: r.showClientId ? "text" : "password",
        id: "clientId",
        "onUpdate:modelValue": t[1] || (t[1] = e => r.clientId = e),
        onInput: t[2] || (t[2] = e => o.onInputChange("clientId"))
    }, null, 40, hv), [ [ na, r.clientId ] ]), r.clientIdChanged || r.saveSuccessClientId || r.saveErrorClientId ? (Fr(), 
    zr("button", {
        key: 0,
        onClick: t[3] || (t[3] = e => o.saveOption("clientId")),
        class: G([ "save-button", o.buttonClass("clientId") ]),
        disabled: r.savingClientId
    }, [ r.savingClientId ? (Fr(), Vr(i, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : r.saveSuccessClientId ? (Fr(), Vr(i, {
        key: 1,
        icon: "thumbs-up"
    })) : r.saveErrorClientId ? (Fr(), Vr(i, {
        key: 2,
        icon: "times"
    })) : (Fr(), Vr(i, {
        key: 3,
        icon: "check"
    })) ], 10, gv)) : Zr("", true), Hr("button", {
        onClick: t[4] || (t[4] = (...e) => o.toggleClientIdVisibility && o.toggleClientIdVisibility(...e)),
        class: "toggle-visibility pill-blue"
    }, [ Kr(i, {
        icon: r.showClientId ? "eye-slash" : "eye"
    }, null, 8, [ "icon" ]) ]) ]) ]) ]), Hr("div", mv, [ t[12] || (t[12] = Hr("div", {
        class: "flex-item label-item"
    }, [ Hr("label", {
        for: "clientSecret"
    }, "Open Badge Factory API Client Secret:") ], -1)), Hr("div", vv, [ Hr("div", yv, [ Sn(Hr("input", {
        type: r.showClientSecret ? "text" : "password",
        id: "clientSecret",
        "onUpdate:modelValue": t[5] || (t[5] = e => r.clientSecret = e),
        onInput: t[6] || (t[6] = e => o.onInputChange("clientSecret"))
    }, null, 40, bv), [ [ na, r.clientSecret ] ]), r.clientSecretChanged || r.saveSuccessClientSecret || r.saveErrorClientSecret ? (Fr(), 
    zr("button", {
        key: 0,
        onClick: t[7] || (t[7] = e => o.saveOption("clientSecret")),
        class: G([ "save-button", o.buttonClass("clientSecret") ]),
        disabled: r.savingClientSecret
    }, [ r.savingClientSecret ? (Fr(), Vr(i, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : r.saveSuccessClientSecret ? (Fr(), Vr(i, {
        key: 1,
        icon: "thumbs-up"
    })) : r.saveErrorClientSecret ? (Fr(), Vr(i, {
        key: 2,
        icon: "times"
    })) : (Fr(), Vr(i, {
        key: 3,
        icon: "check"
    })) ], 10, wv)) : Zr("", true), Hr("button", {
        onClick: t[8] || (t[8] = (...e) => o.toggleClientSecretVisibility && o.toggleClientSecretVisibility(...e)),
        class: "toggle-visibility pill-blue"
    }, [ Kr(i, {
        icon: r.showClientSecret ? "eye-slash" : "eye"
    }, null, 8, [ "icon" ]) ]) ]) ]) ]) ]) ]);
}

const _v = ua(sv, [ [ "render", xv ], [ "__scopeId", "data-v-27f7087f" ] ]);

dg.add($g);

const kv = {
    name: "Log",
    components: {
        FontAwesomeIcon: Mg
    },
    data() {
        return {
            logs: [],
            searchQuery: "",
            sortColumn: "created_at",
            sortOrder: "desc",
            currentPage: 1,
            perPage: 10,
            loading: true,
            selectedFilter: "all"
        };
    },
    computed: {
        filteredLogs() {
            if (!Array.isArray(this.logs)) {
                return [];
            }
            let e = [ ...this.logs ];
            if (this.selectedFilter === "admin") {
                e = e.filter((e => e.post_id === ""));
            } else if (this.selectedFilter === "users") {
                e = e.filter((e => e.post_id !== ""));
            }
            if (this.searchQuery) {
                e = e.filter((e => Object.values(e).some((e => String(e).toLowerCase().includes(this.searchQuery.toLowerCase())))));
            }
            e = e.sort(((e, t) => {
                const n = this.sortOrder === "asc" ? 1 : -1;
                if (e[this.sortColumn] < t[this.sortColumn]) return -1 * n;
                if (e[this.sortColumn] > t[this.sortColumn]) return 1 * n;
                return 0;
            }));
            const t = (this.currentPage - 1) * this.perPage;
            const n = this.currentPage * this.perPage;
            return e.slice(t, n);
        },
        totalPages() {
            let e = [ ...this.logs ];
            if (this.selectedFilter === "admin") {
                e = e.filter((e => e.post_id === ""));
            } else if (this.selectedFilter === "users") {
                e = e.filter((e => e.post_id !== ""));
            }
            if (this.searchQuery) {
                e = e.filter((e => Object.values(e).some((e => String(e).toLowerCase().includes(this.searchQuery.toLowerCase())))));
            }
            return Math.ceil(e.length / this.perPage);
        }
    },
    methods: {
        ...mc([ "fetchLogs" ]),
        async exportToCSV() {
            this.loading = true;
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/export-logs", {
                    method: "GET",
                    headers: {
                        "X-WP-Nonce": pbcOptions.nonce,
                        "pbc-api-key": pbcOptions.pbcApiKey
                    }
                });
                if (!e.ok) {
                    throw new Error(`Failed to export CSV: ${e.statusText}`);
                }
                const t = await e.blob();
                const n = window.URL.createObjectURL(t);
                const s = document.createElement("a");
                s.href = n;
                s.setAttribute("download", "logs-export.csv");
                document.body.appendChild(s);
                s.click();
                s.parentNode.removeChild(s);
            } catch (e) {
                console.error("Error exporting CSV:", e);
                alert("Failed to export logs. Please try again.");
            } finally {
                this.loading = false;
            }
        },
        async clearLog() {
            const e = confirm("Are you sure you want to clear all logs?");
            if (!e) return;
            this.loading = true;
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/clear-logs", {
                    method: "DELETE",
                    headers: {
                        "X-WP-Nonce": pbcOptions.nonce,
                        "pbc-api-key": pbcOptions.pbcApiKey
                    }
                });
                if (!e.ok) {
                    throw new Error(`Failed to clear logs: ${e.statusText}`);
                }
                alert("Logs cleared successfully.");
                await this.loadLogs();
            } catch (t) {
                console.error("Error clearing logs:", t);
                alert("Failed to clear logs. Please try again.");
            } finally {
                this.loading = false;
            }
        },
        async loadLogs() {
            this.loading = true;
            try {
                const e = await this.fetchLogs();
                if (e && Array.isArray(e)) {
                    this.logs = e;
                } else {
                    console.error("Unexpected response format:", e);
                    this.logs = [];
                }
            } finally {
                this.loading = false;
            }
        },
        setFilter(e) {
            this.selectedFilter = e;
            this.currentPage = 1;
        },
        sortBy(e) {
            if (this.sortColumn === e) {
                this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
            } else {
                this.sortColumn = e;
                this.sortOrder = "asc";
            }
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        formatDate(e) {
            const t = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            };
            return new Date(e).toLocaleDateString("en-US", t);
        },
        getBadgeLink(e) {
            return e ? `/wp-admin/admin.php?page=pathwise-badge-connect` : "#";
        },
        getPostLink(e) {
            return e ? `/wp-admin/post.php?post=${e}&action=edit` : "#";
        },
        getUserLink(e) {
            return e ? `/wp-admin/user-edit.php?user_id=${e}` : "#";
        }
    },
    watch: {
        selectedFilter() {
            this.currentPage = 1;
        },
        searchQuery() {
            this.currentPage = 1;
        }
    },
    async mounted() {
        await this.loadLogs();
    }
};

const Cv = {
    class: "filter-buttons"
};

const Sv = {
    key: 0,
    class: "spinner-container"
};

const Ov = {
    key: 1
};

const Ev = {
    key: 0
};

const Av = {
    class: "log-table"
};

const Pv = [ "href" ];

const jv = [ "href" ];

const Tv = [ "href" ];

const Iv = {
    key: 1
};

const Nv = {
    class: "pagination"
};

const Lv = [ "disabled" ];

const Mv = [ "disabled" ];

const Fv = {
    key: 1,
    class: "no-entries"
};

function Dv(e, t, n, s, r, o) {
    const i = is("font-awesome-icon");
    return Fr(), zr("div", null, [ Hr("div", Cv, [ Hr("button", {
        class: G({
            active: r.selectedFilter === "all"
        }),
        onClick: t[0] || (t[0] = e => o.setFilter("all"))
    }, " All ", 2), Hr("button", {
        class: G({
            active: r.selectedFilter === "admin"
        }),
        onClick: t[1] || (t[1] = e => o.setFilter("admin"))
    }, " Admin ", 2), Hr("button", {
        class: G({
            active: r.selectedFilter === "users"
        }),
        onClick: t[2] || (t[2] = e => o.setFilter("users"))
    }, " Users ", 2), Hr("button", {
        class: "export-button",
        onClick: t[3] || (t[3] = (...e) => o.exportToCSV && o.exportToCSV(...e))
    }, " Export to CSV "), Hr("button", {
        class: "clear-log-button",
        onClick: t[4] || (t[4] = (...e) => o.clearLog && o.clearLog(...e))
    }, " Clear Log ") ]), Sn(Hr("input", {
        "onUpdate:modelValue": t[5] || (t[5] = e => r.searchQuery = e),
        placeholder: "Search...",
        class: "search-input"
    }, null, 512), [ [ Ki, r.searchQuery ] ]), r.loading ? (Fr(), zr("div", Sv, [ Kr(i, {
        icon: "spinner",
        spin: "",
        class: "loading-spinner"
    }) ])) : (Fr(), zr("div", Ov, [ o.filteredLogs.length > 0 ? (Fr(), zr("div", Ev, [ Hr("table", Av, [ Hr("thead", null, [ Hr("tr", null, [ Hr("th", {
        onClick: t[6] || (t[6] = e => o.sortBy("id"))
    }, "ID"), Hr("th", {
        onClick: t[7] || (t[7] = e => o.sortBy("user_name"))
    }, "User"), Hr("th", {
        onClick: t[8] || (t[8] = e => o.sortBy("badge_name"))
    }, "Badge"), Hr("th", {
        onClick: t[9] || (t[9] = e => o.sortBy("type"))
    }, "Type"), Hr("th", {
        onClick: t[10] || (t[10] = e => o.sortBy("message"))
    }, "Message"), Hr("th", {
        onClick: t[11] || (t[11] = e => o.sortBy("post_title"))
    }, "Where"), Hr("th", {
        onClick: t[12] || (t[12] = e => o.sortBy("created_at"))
    }, "When") ]) ]), Hr("tbody", null, [ (Fr(true), zr(jr, null, fs(o.filteredLogs, (e => (Fr(), 
    zr("tr", {
        key: e.id
    }, [ Hr("td", null, Z(e.id), 1), Hr("td", null, [ Hr("a", {
        href: o.getUserLink(e.user_id)
    }, Z(e.user_name), 9, Pv) ]), Hr("td", null, [ Hr("a", {
        href: o.getBadgeLink(e.badge_id)
    }, Z(e.badge_name), 9, jv) ]), Hr("td", null, Z(e.type), 1), Hr("td", null, Z(e.message), 1), Hr("td", null, [ e.post_id ? (Fr(), 
    zr("a", {
        key: 0,
        href: o.getPostLink(e.post_id)
    }, Z(e.post_title), 9, Tv)) : (Fr(), zr("span", Iv, t[15] || (t[15] = [ Hr("a", {
        href: "/wp-admin/admin.php?page=pathwise-badge-connect"
    }, "Badge Admin", -1) ]))) ]), Hr("td", null, Z(o.formatDate(e.created_at)), 1) ])))), 128)) ]) ]), Hr("div", Nv, [ Hr("button", {
        onClick: t[13] || (t[13] = (...e) => o.prevPage && o.prevPage(...e)),
        disabled: r.currentPage === 1
    }, "Previous", 8, Lv), Hr("span", null, "Page " + Z(r.currentPage) + " of " + Z(o.totalPages), 1), Hr("button", {
        onClick: t[14] || (t[14] = (...e) => o.nextPage && o.nextPage(...e)),
        disabled: r.currentPage === o.totalPages
    }, "Next", 8, Mv) ]) ])) : (Fr(), zr("div", Fv, " There are currently no entries in the log. ")) ])) ]);
}

const Rv = ua(kv, [ [ "render", Dv ], [ "__scopeId", "data-v-0598a141" ] ]);

const Bv = [ {
    path: "/wp-admin/admin.php",
    component: {
        render: e => e("router-view")
    },
    props: e => ({
        tab: e.query.tab
    })
} ];

const $v = zf({
    history: Wl(),
    routes: Bv
});

const zv = {
    badges: am,
    triggers: ev,
    settings: _v,
    log: Rv
};

$v.beforeEach(((e, t, n) => {
    const s = e.query.tab || "badges";
    const r = zv[s] || am;
    if (r) {
        e.matched[0].components.default = r;
        n();
    } else {
        n("/wp-admin/admin.php?tab=badges");
    }
}));

const Vv = uc({
    state: {
        badges: [],
        triggers: [],
        notices: [],
        connectionStatus: "Connecting...",
        connectionStatusClass: "pill pill-yellow"
    },
    mutations: {
        setBadges(e, t) {
            e.badges = t;
        },
        setTriggers(e, t) {
            e.triggers = t.map((e => ({
                ...e,
                object_title: e.object_title || ""
            })));
        },
        addTrigger(e, t) {
            e.triggers.unshift(t);
        },
        updateTrigger(e, t) {
            const n = e.triggers.findIndex((e => e.id === t.id));
            if (n !== -1) {
                e.triggers.splice(n, 1, t);
            }
        },
        deleteTrigger(e, t) {
            e.triggers = e.triggers.filter((e => e.id !== t && e.tempId !== t));
        },
        setNotices(e, t) {
            e.notices = t;
        },
        dismissNotice(e, t) {
            e.notices = e.notices.map((e => e.id === t ? {
                ...e,
                status: false
            } : e));
        },
        setConnectionStatus(e, t) {
            e.connectionStatus = t;
            switch (t) {
              case "Connecting...":
                e.connectionStatusClass = "pill pill-yellow";
                break;

              case "Connected":
                e.connectionStatusClass = "pill pill-green";
                break;

              case "Credential Error":
              case "Not Connected":
              case "Error Checking Status":
              case "PBC Error":
                e.connectionStatusClass = "pill pill-red";
                break;

              default:
                e.connectionStatusClass = "pill pill-unknown";
                break;
            }
        }
    },
    actions: {
        async fetchLogs({commit: e}) {
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/logs", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!e.ok) {
                    throw new Error("Failed to fetch logs");
                }
                const t = await e.json();
                return t;
            } catch (t) {
                console.error("An error occurred while fetching logs: " + t.message);
                return [];
            }
        },
        async fetchBadges({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/badges", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) {
                    throw new Error("Failed to fetch badges");
                }
                const n = await t.json();
                e("setBadges", n.badges);
            } catch (t) {
                console.error("An error occurred while fetching badges: " + t.message);
            }
        },
        async fetchTriggers({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/triggers", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) {
                    throw new Error("Failed to fetch triggers");
                }
                const n = await t.json();
                const s = n.triggers.map((e => ({
                    ...e,
                    object_title: e.object_title || ""
                })));
                e("setTriggers", s);
            } catch (t) {
                console.error("An error occurred while fetching triggers: " + t.message);
            }
        },
        async saveTriggerToStore({commit: e}, t) {
            try {
                const n = await fetch("/wp-json/pathwise-badge-connect/v1/triggers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    },
                    body: JSON.stringify(t)
                });
                if (!n.ok) {
                    throw new Error("Failed to save trigger");
                }
                const s = await n.json();
                if (t.id) {
                    e("updateTrigger", s.trigger);
                } else {
                    e("addTrigger", s.trigger);
                }
                return s;
            } catch (n) {
                console.error("An error occurred while saving the trigger: " + n.message);
            }
        },
        async deleteTrigger({commit: e}, t) {
            try {
                const n = await fetch(`/wp-json/pathwise-badge-connect/v1/triggers/${t}`, {
                    method: "DELETE",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!n.ok) {
                    throw new Error("Failed to delete trigger");
                }
                e("deleteTrigger", t);
            } catch (n) {
                console.error("An error occurred while deleting the trigger: " + n.message);
            }
        },
        async fetchNotices({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/notices", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) {
                    throw new Error("Failed to fetch notices");
                }
                const n = await t.json();
                e("setNotices", n.notices);
            } catch (t) {
                console.error("An error occurred while fetching notices: " + t.message);
            }
        },
        async dismissNotice({commit: e}, t) {
            try {
                const n = await fetch(`/wp-json/pathwise-badge-connect/v1/notices/${t}`, {
                    method: "DELETE",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!n.ok) {
                    throw new Error("Failed to dismiss notice");
                }
                e("dismissNotice", t);
            } catch (n) {
                console.error("An error occurred while dismissing the notice: " + n.message);
            }
        },
        async fetchConnectionStatus({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/connection-status", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) {
                    throw new Error("Failed to fetch connection status");
                }
                const n = await t.json();
                const s = n.connection_status || "Error checking status";
                e("setConnectionStatus", s);
            } catch (t) {
                console.error("Error fetching connection status:", t);
                e("setConnectionStatus", "Error checking status");
            }
        }
    },
    getters: {
        getBadges: e => e.badges,
        getTriggers: e => e.triggers,
        getNotices: e => e.notices,
        getConnectionStatus: e => e.connectionStatus,
        getConnectionStatusClass: e => e.connectionStatusClass
    }
});

dg.add(Bg, Dg, Fg, $g, zg, Vg);

const Uv = ca(Bc);

Uv.use($v);

Uv.use(Vv);

Uv.component("font-awesome-icon", Mg);

Uv.mount("#pathwise-badge-connect");
//# sourceMappingURL=main.js.map
