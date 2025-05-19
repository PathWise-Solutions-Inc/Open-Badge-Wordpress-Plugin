/* empty css             */

function e(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return e => e in t;
}

const t = {}, n = [], r = () => {}, o = () => !1, i = e => 111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), s = e => e.startsWith("onUpdate:"), a = Object.assign, c = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), f = Array.isArray, d = e => "[object Map]" === C(e), p = e => "[object Set]" === C(e), h = e => "[object Date]" === C(e), g = e => "function" == typeof e, m = e => "string" == typeof e, v = e => "symbol" == typeof e, y = e => null !== e && "object" == typeof e, b = e => (y(e) || g(e)) && g(e.then) && g(e.catch), w = Object.prototype.toString, C = e => w.call(e), x = e => "[object Object]" === C(e), S = e => m(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e, _ = e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), k = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
}, O = /-(\w)/g, E = k((e => e.replace(O, ((e, t) => t ? t.toUpperCase() : "")))), A = /\B([A-Z])/g, I = k((e => e.replace(A, "-$1").toLowerCase())), P = k((e => e.charAt(0).toUpperCase() + e.slice(1))), j = k((e => e ? `on${P(e)}` : "")), T = (e, t) => !Object.is(e, t), N = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
}, L = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        writable: r,
        value: n
    });
}, M = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
};

let F;

const D = () => F || (F = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});

function R(e) {
    if (f(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n], o = m(r) ? z(r) : R(r);
            if (o) for (const e in o) t[e] = o[e];
        }
        return t;
    }
    if (m(e) || y(e)) return e;
}

const B = /;(?![^(]*\))/g, $ = /:([^]+)/, V = /\/\*[^]*?\*\//g;

function z(e) {
    const t = {};
    return e.replace(V, "").split(B).forEach((e => {
        if (e) {
            const n = e.split($);
            n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
    })), t;
}

function U(e) {
    let t = "";
    if (m(e)) t = e; else if (f(e)) for (let n = 0; n < e.length; n++) {
        const r = U(e[n]);
        r && (t += r + " ");
    } else if (y(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}

const W = e("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function G(e) {
    return !!e || "" === e;
}

function q(e, t) {
    if (e === t) return !0;
    let n = h(e), r = h(t);
    if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
    if (n = v(e), r = v(t), n || r) return e === t;
    if (n = f(e), r = f(t), n || r) return !(!n || !r) && function(e, t) {
        if (e.length !== t.length) return !1;
        let n = !0;
        for (let r = 0; n && r < e.length; r++) n = q(e[r], t[r]);
        return n;
    }(e, t);
    if (n = y(e), r = y(t), n || r) {
        if (!n || !r) return !1;
        if (Object.keys(e).length !== Object.keys(t).length) return !1;
        for (const n in e) {
            const r = e.hasOwnProperty(n), o = t.hasOwnProperty(n);
            if (r && !o || !r && o || !q(e[n], t[n])) return !1;
        }
    }
    return String(e) === String(t);
}

function K(e, t) {
    return e.findIndex((e => q(e, t)));
}

const H = e => !(!e || !0 !== e.__v_isRef), X = e => m(e) ? e : null == e ? "" : f(e) || y(e) && (e.toString === w || !g(e.toString)) ? H(e) ? X(e.value) : JSON.stringify(e, Q, 2) : String(e), Q = (e, t) => H(t) ? Q(e, t.value) : d(t) ? {
    [`Map(${t.size})`]: [ ...t.entries() ].reduce(((e, [t, n], r) => (e[Y(t, r) + " =>"] = n, 
    e)), {})
} : p(t) ? {
    [`Set(${t.size})`]: [ ...t.values() ].map((e => Y(e)))
} : v(t) ? Y(t) : !y(t) || f(t) || x(t) ? t : String(t), Y = (e, t = "") => {
    var n;
    return v(e) ? `Symbol(${null != (n = e.description) ? n : t})` : e;
};

let J, Z;

class ee {
    constructor(e = !1) {
        this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, 
        this.parent = J, !e && J && (this.index = (J.scopes || (J.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    pause() {
        if (this._active) {
            let e, t;
            if (this._isPaused = !0, this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
            for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            let e, t;
            if (this._isPaused = !1, this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
            for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
        }
    }
    run(e) {
        if (this._active) {
            const t = J;
            try {
                return J = this, e();
            } finally {
                J = t;
            }
        }
    }
    on() {
        J = this;
    }
    off() {
        J = this.parent;
    }
    stop(e) {
        if (this._active) {
            let t, n;
            for (this._active = !1, t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
            for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
            if (this.cleanups.length = 0, this.scopes) {
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !e) {
                const e = this.parent.scopes.pop();
                e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
            }
            this.parent = void 0;
        }
    }
}

const te = new WeakSet;

class ne {
    constructor(e) {
        this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, 
        this.cleanup = void 0, this.scheduler = void 0, J && J.active && J.effects.push(this);
    }
    pause() {
        this.flags |= 64;
    }
    resume() {
        64 & this.flags && (this.flags &= -65, te.has(this) && (te.delete(this), this.trigger()));
    }
    notify() {
        2 & this.flags && !(32 & this.flags) || 8 & this.flags || se(this);
    }
    run() {
        if (!(1 & this.flags)) return this.fn();
        this.flags |= 2, be(this), le(this);
        const e = Z, t = ge;
        Z = this, ge = !0;
        try {
            return this.fn();
        } finally {
            ue(this), Z = e, ge = t, this.flags &= -3;
        }
    }
    stop() {
        if (1 & this.flags) {
            for (let e = this.deps; e; e = e.nextDep) pe(e);
            this.deps = this.depsTail = void 0, be(this), this.onStop && this.onStop(), this.flags &= -2;
        }
    }
    trigger() {
        64 & this.flags ? te.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
        fe(this) && this.run();
    }
    get dirty() {
        return fe(this);
    }
}

let re, oe, ie = 0;

function se(e, t = !1) {
    if (e.flags |= 8, t) return e.next = oe, void (oe = e);
    e.next = re, re = e;
}

function ae() {
    ie++;
}

function ce() {
    if (--ie > 0) return;
    if (oe) {
        let e = oe;
        for (oe = void 0; e; ) {
            const t = e.next;
            e.next = void 0, e.flags &= -9, e = t;
        }
    }
    let e;
    for (;re; ) {
        let n = re;
        for (re = void 0; n; ) {
            const r = n.next;
            if (n.next = void 0, n.flags &= -9, 1 & n.flags) try {
                n.trigger();
            } catch (t) {
                e || (e = t);
            }
            n = r;
        }
    }
    if (e) throw e;
}

function le(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, 
    t.dep.activeLink = t;
}

function ue(e) {
    let t, n = e.depsTail, r = n;
    for (;r; ) {
        const e = r.prevDep;
        -1 === r.version ? (r === n && (n = e), pe(r), he(r)) : t = r, r.dep.activeLink = r.prevActiveLink, 
        r.prevActiveLink = void 0, r = e;
    }
    e.deps = t, e.depsTail = n;
}

function fe(e) {
    for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (de(t.dep.computed) || t.dep.version !== t.version)) return !0;
    return !!e._dirty;
}

function de(e) {
    if (4 & e.flags && !(16 & e.flags)) return;
    if (e.flags &= -17, e.globalVersion === we) return;
    e.globalVersion = we;
    const t = e.dep;
    if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !fe(e)) return void (e.flags &= -3);
    const n = Z, r = ge;
    Z = e, ge = !0;
    try {
        le(e);
        const n = e.fn(e._value);
        (0 === t.version || T(n, e._value)) && (e._value = n, t.version++);
    } catch (o) {
        throw t.version++, o;
    } finally {
        Z = n, ge = r, ue(e), e.flags &= -3;
    }
}

function pe(e, t = !1) {
    const {dep: n, prevSub: r, nextSub: o} = e;
    if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), 
    n.subs === e && (n.subs = r, !r && n.computed)) {
        n.computed.flags &= -5;
        for (let e = n.computed.deps; e; e = e.nextDep) pe(e, !0);
    }
    t || --n.sc || !n.map || n.map.delete(n.key);
}

function he(e) {
    const {prevDep: t, nextDep: n} = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}

let ge = !0;

const me = [];

function ve() {
    me.push(ge), ge = !1;
}

function ye() {
    const e = me.pop();
    ge = void 0 === e || e;
}

function be(e) {
    const {cleanup: t} = e;
    if (e.cleanup = void 0, t) {
        const e = Z;
        Z = void 0;
        try {
            t();
        } finally {
            Z = e;
        }
    }
}

let we = 0;

class Ce {
    constructor(e, t) {
        this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
}

class xe {
    constructor(e) {
        this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, 
        this.map = void 0, this.key = void 0, this.sc = 0;
    }
    track(e) {
        if (!Z || !ge || Z === this.computed) return;
        let t = this.activeLink;
        if (void 0 === t || t.sub !== Z) t = this.activeLink = new Ce(Z, this), Z.deps ? (t.prevDep = Z.depsTail, 
        Z.depsTail.nextDep = t, Z.depsTail = t) : Z.deps = Z.depsTail = t, Se(t); else if (-1 === t.version && (t.version = this.version, 
        t.nextDep)) {
            const e = t.nextDep;
            e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = Z.depsTail, 
            t.nextDep = void 0, Z.depsTail.nextDep = t, Z.depsTail = t, Z.deps === t && (Z.deps = e);
        }
        return t;
    }
    trigger(e) {
        this.version++, we++, this.notify(e);
    }
    notify(e) {
        ae();
        try {
            0;
            for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
        } finally {
            ce();
        }
    }
}

function Se(e) {
    if (e.dep.sc++, 4 & e.sub.flags) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let e = t.deps; e; e = e.nextDep) Se(e);
        }
        const n = e.dep.subs;
        n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
    }
}

const _e = new WeakMap, ke = Symbol(""), Oe = Symbol(""), Ee = Symbol("");

function Ae(e, t, n) {
    if (ge && Z) {
        let t = _e.get(e);
        t || _e.set(e, t = new Map);
        let r = t.get(n);
        r || (t.set(n, r = new xe), r.map = t, r.key = n), r.track();
    }
}

function Ie(e, t, n, r, o, i) {
    const s = _e.get(e);
    if (!s) return void we++;
    const a = e => {
        e && e.trigger();
    };
    if (ae(), "clear" === t) s.forEach(a); else {
        const o = f(e), i = o && S(n);
        if (o && "length" === n) {
            const e = Number(r);
            s.forEach(((t, n) => {
                ("length" === n || n === Ee || !v(n) && n >= e) && a(t);
            }));
        } else switch ((void 0 !== n || s.has(void 0)) && a(s.get(n)), i && a(s.get(Ee)), 
        t) {
          case "add":
            o ? i && a(s.get("length")) : (a(s.get(ke)), d(e) && a(s.get(Oe)));
            break;

          case "delete":
            o || (a(s.get(ke)), d(e) && a(s.get(Oe)));
            break;

          case "set":
            d(e) && a(s.get(ke));
        }
    }
    ce();
}

function Pe(e) {
    const t = gt(e);
    return t === e ? t : (Ae(t, 0, Ee), pt(e) ? t : t.map(mt));
}

function je(e) {
    return Ae(e = gt(e), 0, Ee), e;
}

const Te = {
    __proto__: null,
    [Symbol.iterator]() {
        return Ne(this, Symbol.iterator, mt);
    },
    concat(...e) {
        return Pe(this).concat(...e.map((e => f(e) ? Pe(e) : e)));
    },
    entries() {
        return Ne(this, "entries", (e => (e[1] = mt(e[1]), e)));
    },
    every(e, t) {
        return Me(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
        return Me(this, "filter", e, t, (e => e.map(mt)), arguments);
    },
    find(e, t) {
        return Me(this, "find", e, t, mt, arguments);
    },
    findIndex(e, t) {
        return Me(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
        return Me(this, "findLast", e, t, mt, arguments);
    },
    findLastIndex(e, t) {
        return Me(this, "findLastIndex", e, t, void 0, arguments);
    },
    forEach(e, t) {
        return Me(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
        return De(this, "includes", e);
    },
    indexOf(...e) {
        return De(this, "indexOf", e);
    },
    join(e) {
        return Pe(this).join(e);
    },
    lastIndexOf(...e) {
        return De(this, "lastIndexOf", e);
    },
    map(e, t) {
        return Me(this, "map", e, t, void 0, arguments);
    },
    pop() {
        return Re(this, "pop");
    },
    push(...e) {
        return Re(this, "push", e);
    },
    reduce(e, ...t) {
        return Fe(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
        return Fe(this, "reduceRight", e, t);
    },
    shift() {
        return Re(this, "shift");
    },
    some(e, t) {
        return Me(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
        return Re(this, "splice", e);
    },
    toReversed() {
        return Pe(this).toReversed();
    },
    toSorted(e) {
        return Pe(this).toSorted(e);
    },
    toSpliced(...e) {
        return Pe(this).toSpliced(...e);
    },
    unshift(...e) {
        return Re(this, "unshift", e);
    },
    values() {
        return Ne(this, "values", mt);
    }
};

function Ne(e, t, n) {
    const r = je(e), o = r[t]();
    return r === e || pt(e) || (o._next = o.next, o.next = () => {
        const e = o._next();
        return e.value && (e.value = n(e.value)), e;
    }), o;
}

const Le = Array.prototype;

function Me(e, t, n, r, o, i) {
    const s = je(e), a = s !== e && !pt(e), c = s[t];
    if (c !== Le[t]) {
        const t = c.apply(e, i);
        return a ? mt(t) : t;
    }
    let l = n;
    s !== e && (a ? l = function(t, r) {
        return n.call(this, mt(t), r, e);
    } : n.length > 2 && (l = function(t, r) {
        return n.call(this, t, r, e);
    }));
    const u = c.call(s, l, r);
    return a && o ? o(u) : u;
}

function Fe(e, t, n, r) {
    const o = je(e);
    let i = n;
    return o !== e && (pt(e) ? n.length > 3 && (i = function(t, r, o) {
        return n.call(this, t, r, o, e);
    }) : i = function(t, r, o) {
        return n.call(this, t, mt(r), o, e);
    }), o[t](i, ...r);
}

function De(e, t, n) {
    const r = gt(e);
    Ae(r, 0, Ee);
    const o = r[t](...n);
    return -1 !== o && !1 !== o || !ht(n[0]) ? o : (n[0] = gt(n[0]), r[t](...n));
}

function Re(e, t, n = []) {
    ve(), ae();
    const r = gt(e)[t].apply(e, n);
    return ce(), ye(), r;
}

const Be = e("__proto__,__v_isRef,__isVue"), $e = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(v));

function Ve(e) {
    v(e) || (e = String(e));
    const t = gt(this);
    return Ae(t, 0, e), t.hasOwnProperty(e);
}

class ze {
    constructor(e = !1, t = !1) {
        this._isReadonly = e, this._isShallow = t;
    }
    get(e, t, n) {
        if ("__v_skip" === t) return e.__v_skip;
        const r = this._isReadonly, o = this._isShallow;
        if ("__v_isReactive" === t) return !r;
        if ("__v_isReadonly" === t) return r;
        if ("__v_isShallow" === t) return o;
        if ("__v_raw" === t) return n === (r ? o ? it : ot : o ? rt : nt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
        const i = f(e);
        if (!r) {
            let e;
            if (i && (e = Te[t])) return e;
            if ("hasOwnProperty" === t) return Ve;
        }
        const s = Reflect.get(e, t, yt(e) ? e : n);
        return (v(t) ? $e.has(t) : Be(t)) ? s : (r || Ae(e, 0, t), o ? s : yt(s) ? i && S(t) ? s : s.value : y(s) ? r ? lt(s) : at(s) : s);
    }
}

class Ue extends ze {
    constructor(e = !1) {
        super(!1, e);
    }
    set(e, t, n, r) {
        let o = e[t];
        if (!this._isShallow) {
            const t = dt(o);
            if (pt(n) || dt(n) || (o = gt(o), n = gt(n)), !f(e) && yt(o) && !yt(n)) return !t && (o.value = n, 
            !0);
        }
        const i = f(e) && S(t) ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, yt(e) ? e : r);
        return e === gt(r) && (i ? T(n, o) && Ie(e, "set", t, n) : Ie(e, "add", t, n)), 
        s;
    }
    deleteProperty(e, t) {
        const n = u(e, t);
        e[t];
        const r = Reflect.deleteProperty(e, t);
        return r && n && Ie(e, "delete", t, void 0), r;
    }
    has(e, t) {
        const n = Reflect.has(e, t);
        return v(t) && $e.has(t) || Ae(e, 0, t), n;
    }
    ownKeys(e) {
        return Ae(e, 0, f(e) ? "length" : ke), Reflect.ownKeys(e);
    }
}

class We extends ze {
    constructor(e = !1) {
        super(!0, e);
    }
    set(e, t) {
        return !0;
    }
    deleteProperty(e, t) {
        return !0;
    }
}

const Ge = new Ue, qe = new We, Ke = new Ue(!0), He = e => e, Xe = e => Reflect.getPrototypeOf(e);

function Qe(e) {
    return function(...t) {
        return "delete" !== e && ("clear" === e ? void 0 : this);
    };
}

function Ye(e, t) {
    const n = {
        get(n) {
            const r = this.__v_raw, o = gt(r), i = gt(n);
            e || (T(n, i) && Ae(o, 0, n), Ae(o, 0, i));
            const {has: s} = Xe(o), a = t ? He : e ? vt : mt;
            return s.call(o, n) ? a(r.get(n)) : s.call(o, i) ? a(r.get(i)) : void (r !== o && r.get(n));
        },
        get size() {
            const t = this.__v_raw;
            return !e && Ae(gt(t), 0, ke), Reflect.get(t, "size", t);
        },
        has(t) {
            const n = this.__v_raw, r = gt(n), o = gt(t);
            return e || (T(t, o) && Ae(r, 0, t), Ae(r, 0, o)), t === o ? n.has(t) : n.has(t) || n.has(o);
        },
        forEach(n, r) {
            const o = this, i = o.__v_raw, s = gt(i), a = t ? He : e ? vt : mt;
            return !e && Ae(s, 0, ke), i.forEach(((e, t) => n.call(r, a(e), a(t), o)));
        }
    };
    a(n, e ? {
        add: Qe("add"),
        set: Qe("set"),
        delete: Qe("delete"),
        clear: Qe("clear")
    } : {
        add(e) {
            t || pt(e) || dt(e) || (e = gt(e));
            const n = gt(this);
            return Xe(n).has.call(n, e) || (n.add(e), Ie(n, "add", e, e)), this;
        },
        set(e, n) {
            t || pt(n) || dt(n) || (n = gt(n));
            const r = gt(this), {has: o, get: i} = Xe(r);
            let s = o.call(r, e);
            s || (e = gt(e), s = o.call(r, e));
            const a = i.call(r, e);
            return r.set(e, n), s ? T(n, a) && Ie(r, "set", e, n) : Ie(r, "add", e, n), this;
        },
        delete(e) {
            const t = gt(this), {has: n, get: r} = Xe(t);
            let o = n.call(t, e);
            o || (e = gt(e), o = n.call(t, e)), r && r.call(t, e);
            const i = t.delete(e);
            return o && Ie(t, "delete", e, void 0), i;
        },
        clear() {
            const e = gt(this), t = 0 !== e.size, n = e.clear();
            return t && Ie(e, "clear", void 0, void 0), n;
        }
    });
    return [ "keys", "values", "entries", Symbol.iterator ].forEach((r => {
        n[r] = function(e, t, n) {
            return function(...r) {
                const o = this.__v_raw, i = gt(o), s = d(i), a = "entries" === e || e === Symbol.iterator && s, c = "keys" === e && s, l = o[e](...r), u = n ? He : t ? vt : mt;
                return !t && Ae(i, 0, c ? Oe : ke), {
                    next() {
                        const {value: e, done: t} = l.next();
                        return t ? {
                            value: e,
                            done: t
                        } : {
                            value: a ? [ u(e[0]), u(e[1]) ] : u(e),
                            done: t
                        };
                    },
                    [Symbol.iterator]() {
                        return this;
                    }
                };
            };
        }(r, e, t);
    })), n;
}

function Je(e, t) {
    const n = Ye(e, t);
    return (t, r, o) => "__v_isReactive" === r ? !e : "__v_isReadonly" === r ? e : "__v_raw" === r ? t : Reflect.get(u(n, r) && r in t ? n : t, r, o);
}

const Ze = {
    get: Je(!1, !1)
}, et = {
    get: Je(!1, !0)
}, tt = {
    get: Je(!0, !1)
}, nt = new WeakMap, rt = new WeakMap, ot = new WeakMap, it = new WeakMap;

function st(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : function(e) {
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
    }((e => C(e).slice(8, -1))(e));
}

function at(e) {
    return dt(e) ? e : ut(e, !1, Ge, Ze, nt);
}

function ct(e) {
    return ut(e, !1, Ke, et, rt);
}

function lt(e) {
    return ut(e, !0, qe, tt, ot);
}

function ut(e, t, n, r, o) {
    if (!y(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const i = o.get(e);
    if (i) return i;
    const s = st(e);
    if (0 === s) return e;
    const a = new Proxy(e, 2 === s ? r : n);
    return o.set(e, a), a;
}

function ft(e) {
    return dt(e) ? ft(e.__v_raw) : !(!e || !e.__v_isReactive);
}

function dt(e) {
    return !(!e || !e.__v_isReadonly);
}

function pt(e) {
    return !(!e || !e.__v_isShallow);
}

function ht(e) {
    return !!e && !!e.__v_raw;
}

function gt(e) {
    const t = e && e.__v_raw;
    return t ? gt(t) : e;
}

const mt = e => y(e) ? at(e) : e, vt = e => y(e) ? lt(e) : e;

function yt(e) {
    return !!e && !0 === e.__v_isRef;
}

function bt(e, t) {
    return yt(e) ? e : new wt(e, t);
}

class wt {
    constructor(e, t) {
        this.dep = new xe, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : gt(e), 
        this._value = t ? e : mt(e), this.__v_isShallow = t;
    }
    get value() {
        return this.dep.track(), this._value;
    }
    set value(e) {
        const t = this._rawValue, n = this.__v_isShallow || pt(e) || dt(e);
        e = n ? e : gt(e), T(e, t) && (this._rawValue = e, this._value = n ? e : mt(e), 
        this.dep.trigger());
    }
}

function Ct(e) {
    return yt(e) ? e.value : e;
}

const xt = {
    get: (e, t, n) => "__v_raw" === t ? e : Ct(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const o = e[t];
        return yt(o) && !yt(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
    }
};

function St(e) {
    return ft(e) ? e : new Proxy(e, xt);
}

class _t {
    constructor(e, t, n) {
        this.fn = e, this.setter = t, this._value = void 0, this.dep = new xe(this), this.__v_isRef = !0, 
        this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = we - 1, 
        this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
    }
    notify() {
        if (this.flags |= 16, !(8 & this.flags) && Z !== this) return se(this, !0), !0;
    }
    get value() {
        const e = this.dep.track();
        return de(this), e && (e.version = this.dep.version), this._value;
    }
    set value(e) {
        this.setter && this.setter(e);
    }
}

const kt = {}, Ot = new WeakMap;

let Et;

function At(e, n, o = t) {
    const {immediate: i, deep: s, once: a, scheduler: l, augmentJob: u, call: d} = o, p = e => s ? e : pt(e) || !1 === s || 0 === s ? It(e, 1) : It(e);
    let h, m, v, y, b = !1, w = !1;
    if (yt(e) ? (m = () => e.value, b = pt(e)) : ft(e) ? (m = () => p(e), b = !0) : f(e) ? (w = !0, 
    b = e.some((e => ft(e) || pt(e))), m = () => e.map((e => yt(e) ? e.value : ft(e) ? p(e) : g(e) ? d ? d(e, 2) : e() : void 0))) : m = g(e) ? n ? d ? () => d(e, 2) : e : () => {
        if (v) {
            ve();
            try {
                v();
            } finally {
                ye();
            }
        }
        const t = Et;
        Et = h;
        try {
            return d ? d(e, 3, [ y ]) : e(y);
        } finally {
            Et = t;
        }
    } : r, n && s) {
        const e = m, t = !0 === s ? 1 / 0 : s;
        m = () => It(e(), t);
    }
    const C = J, x = () => {
        h.stop(), C && C.active && c(C.effects, h);
    };
    if (a && n) {
        const e = n;
        n = (...t) => {
            e(...t), x();
        };
    }
    let S = w ? new Array(e.length).fill(kt) : kt;
    const _ = e => {
        if (1 & h.flags && (h.dirty || e)) if (n) {
            const e = h.run();
            if (s || b || (w ? e.some(((e, t) => T(e, S[t]))) : T(e, S))) {
                v && v();
                const t = Et;
                Et = h;
                try {
                    const t = [ e, S === kt ? void 0 : w && S[0] === kt ? [] : S, y ];
                    d ? d(n, 3, t) : n(...t), S = e;
                } finally {
                    Et = t;
                }
            }
        } else h.run();
    };
    return u && u(_), h = new ne(m), h.scheduler = l ? () => l(_, !1) : _, y = e => function(e, t = !1, n = Et) {
        if (n) {
            let t = Ot.get(n);
            t || Ot.set(n, t = []), t.push(e);
        }
    }(e, !1, h), v = h.onStop = () => {
        const e = Ot.get(h);
        if (e) {
            if (d) d(e, 4); else for (const t of e) t();
            Ot.delete(h);
        }
    }, n ? i ? _(!0) : S = h.run() : l ? l(_.bind(null, !0), !0) : h.run(), x.pause = h.pause.bind(h), 
    x.resume = h.resume.bind(h), x.stop = x, x;
}

function It(e, t = 1 / 0, n) {
    if (t <= 0 || !y(e) || e.__v_skip) return e;
    if ((n = n || new Set).has(e)) return e;
    if (n.add(e), t--, yt(e)) It(e.value, t, n); else if (f(e)) for (let r = 0; r < e.length; r++) It(e[r], t, n); else if (p(e) || d(e)) e.forEach((e => {
        It(e, t, n);
    })); else if (x(e)) {
        for (const r in e) It(e[r], t, n);
        for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && It(e[r], t, n);
    }
    return e;
}

function Pt(e, t, n, r) {
    try {
        return r ? e(...r) : e();
    } catch (o) {
        Tt(o, t, n);
    }
}

function jt(e, t, n, r) {
    if (g(e)) {
        const o = Pt(e, t, n, r);
        return o && b(o) && o.catch((e => {
            Tt(e, t, n);
        })), o;
    }
    if (f(e)) {
        const o = [];
        for (let i = 0; i < e.length; i++) o.push(jt(e[i], t, n, r));
        return o;
    }
}

function Tt(e, n, r, o = !0) {
    n && n.vnode;
    const {errorHandler: i, throwUnhandledErrorInProduction: s} = n && n.appContext.config || t;
    if (n) {
        let t = n.parent;
        const o = n.proxy, s = `https://vuejs.org/error-reference/#runtime-${r}`;
        for (;t; ) {
            const n = t.ec;
            if (n) for (let t = 0; t < n.length; t++) if (!1 === n[t](e, o, s)) return;
            t = t.parent;
        }
        if (i) return ve(), Pt(i, null, 10, [ e, o, s ]), void ye();
    }
    !function(e, t, n, r = !0, o = !1) {
        if (o) throw e;
        console.error(e);
    }(e, 0, 0, o, s);
}

const Nt = [];

let Lt = -1;

const Mt = [];

let Ft = null, Dt = 0;

const Rt = Promise.resolve();

let Bt = null;

function $t(e) {
    const t = Bt || Rt;
    return e ? t.then(this ? e.bind(this) : e) : t;
}

function Vt(e) {
    if (!(1 & e.flags)) {
        const t = Gt(e), n = Nt[Nt.length - 1];
        !n || !(2 & e.flags) && t >= Gt(n) ? Nt.push(e) : Nt.splice(function(e) {
            let t = Lt + 1, n = Nt.length;
            for (;t < n; ) {
                const r = t + n >>> 1, o = Nt[r], i = Gt(o);
                i < e || i === e && 2 & o.flags ? t = r + 1 : n = r;
            }
            return t;
        }(t), 0, e), e.flags |= 1, zt();
    }
}

function zt() {
    Bt || (Bt = Rt.then(qt));
}

function Ut(e, t, n = Lt + 1) {
    for (;n < Nt.length; n++) {
        const t = Nt[n];
        if (t && 2 & t.flags) {
            if (e && t.id !== e.uid) continue;
            Nt.splice(n, 1), n--, 4 & t.flags && (t.flags &= -2), t(), 4 & t.flags || (t.flags &= -2);
        }
    }
}

function Wt(e) {
    if (Mt.length) {
        const e = [ ...new Set(Mt) ].sort(((e, t) => Gt(e) - Gt(t)));
        if (Mt.length = 0, Ft) return void Ft.push(...e);
        for (Ft = e, Dt = 0; Dt < Ft.length; Dt++) {
            const e = Ft[Dt];
            4 & e.flags && (e.flags &= -2), 8 & e.flags || e(), e.flags &= -2;
        }
        Ft = null, Dt = 0;
    }
}

const Gt = e => null == e.id ? 2 & e.flags ? -1 : 1 / 0 : e.id;

function qt(e) {
    try {
        for (Lt = 0; Lt < Nt.length; Lt++) {
            const e = Nt[Lt];
            !e || 8 & e.flags || (4 & e.flags && (e.flags &= -2), Pt(e, e.i, e.i ? 15 : 14), 
            4 & e.flags || (e.flags &= -2));
        }
    } finally {
        for (;Lt < Nt.length; Lt++) {
            const e = Nt[Lt];
            e && (e.flags &= -2);
        }
        Lt = -1, Nt.length = 0, Wt(), Bt = null, (Nt.length || Mt.length) && qt();
    }
}

let Kt = null, Ht = null;

function Xt(e) {
    const t = Kt;
    return Kt = e, Ht = e && e.type.__scopeId || null, t;
}

function Qt(e, t = Kt, n) {
    if (!t) return e;
    if (e._n) return e;
    const r = (...n) => {
        r._d && qr(-1);
        const o = Xt(t);
        let i;
        try {
            i = e(...n);
        } finally {
            Xt(o), r._d && qr(1);
        }
        return i;
    };
    return r._n = !0, r._c = !0, r._d = !0, r;
}

function Yt(e, n) {
    if (null === Kt) return e;
    const r = xo(Kt), o = e.dirs || (e.dirs = []);
    for (let i = 0; i < n.length; i++) {
        let [e, s, a, c = t] = n[i];
        e && (g(e) && (e = {
            mounted: e,
            updated: e
        }), e.deep && It(s), o.push({
            dir: e,
            instance: r,
            value: s,
            oldValue: void 0,
            arg: a,
            modifiers: c
        }));
    }
    return e;
}

function Jt(e, t, n, r) {
    const o = e.dirs, i = t && t.dirs;
    for (let s = 0; s < o.length; s++) {
        const a = o[s];
        i && (a.oldValue = i[s].value);
        let c = a.dir[r];
        c && (ve(), jt(c, n, 8, [ e.el, a, e, t ]), ye());
    }
}

const Zt = Symbol("_vte"), en = Symbol("_leaveCb"), tn = Symbol("_enterCb");

const nn = [ Function, Array ], rn = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: nn,
    onEnter: nn,
    onAfterEnter: nn,
    onEnterCancelled: nn,
    onBeforeLeave: nn,
    onLeave: nn,
    onAfterLeave: nn,
    onLeaveCancelled: nn,
    onBeforeAppear: nn,
    onAppear: nn,
    onAfterAppear: nn,
    onAppearCancelled: nn
};

function on(e, t, n, r, o) {
    const {appear: i, mode: s, persisted: a = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: p, onLeave: h, onAfterLeave: g, onLeaveCancelled: m, onBeforeAppear: v, onAppear: y, onAfterAppear: b, onAppearCancelled: w} = t, C = String(e.key), x = function(e, t) {
        const {leavingVNodes: n} = e;
        let r = n.get(t.type);
        return r || (r = Object.create(null), n.set(t.type, r)), r;
    }(n, e), S = (e, t) => {
        e && jt(e, r, 9, t);
    }, _ = (e, t) => {
        const n = t[1];
        S(e, t), f(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n();
    }, k = {
        mode: s,
        persisted: a,
        beforeEnter(t) {
            let r = c;
            if (!n.isMounted) {
                if (!i) return;
                r = v || c;
            }
            t[en] && t[en](!0);
            const o = x[C];
            o && Yr(e, o) && o.el[en] && o.el[en](), S(r, [ t ]);
        },
        enter(e) {
            let t = l, r = u, o = d;
            if (!n.isMounted) {
                if (!i) return;
                t = y || l, r = b || u, o = w || d;
            }
            let s = !1;
            const a = e[tn] = t => {
                s || (s = !0, S(t ? o : r, [ e ]), k.delayedLeave && k.delayedLeave(), e[tn] = void 0);
            };
            t ? _(t, [ e, a ]) : a();
        },
        leave(t, r) {
            const o = String(e.key);
            if (t[tn] && t[tn](!0), n.isUnmounting) return r();
            S(p, [ t ]);
            let i = !1;
            const s = t[en] = n => {
                i || (i = !0, r(), S(n ? m : g, [ t ]), t[en] = void 0, x[o] === e && delete x[o]);
            };
            x[o] = e, h ? _(h, [ t, s ]) : s();
        },
        clone: e => on(e, t, n, r)
    };
    return k;
}

function sn(e, t) {
    6 & e.shapeFlag && e.component ? (e.transition = t, sn(e.component.subTree, t)) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), 
    e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}

function an(e, t = !1, n) {
    let r = [], o = 0;
    for (let i = 0; i < e.length; i++) {
        let s = e[i];
        const a = null == n ? s.key : String(n) + String(null != s.key ? s.key : i);
        s.type === Rr ? (128 & s.patchFlag && o++, r = r.concat(an(s.children, t, a))) : (t || s.type !== $r) && r.push(null != a ? no(s, {
            key: a
        }) : s);
    }
    if (o > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r;
}

function cn(e, t) {
    return g(e) ? (() => a({
        name: e.name
    }, t, {
        setup: e
    }))() : e;
}

function ln(e) {
    e.ids = [ e.ids[0] + e.ids[2]++ + "-", 0, 0 ];
}

function un(e, n, r, o, i = !1) {
    if (f(e)) return void e.forEach(((e, t) => un(e, n && (f(n) ? n[t] : n), r, o, i)));
    if (fn(o) && !i) return void (512 & o.shapeFlag && o.type.__asyncResolved && o.component.subTree.component && un(e, n, r, o.component.subTree));
    const s = 4 & o.shapeFlag ? xo(o.component) : o.el, a = i ? null : s, {i: l, r: d} = e, p = n && n.r, h = l.refs === t ? l.refs = {} : l.refs, v = l.setupState, y = gt(v), b = v === t ? () => !1 : e => u(y, e);
    if (null != p && p !== d && (m(p) ? (h[p] = null, b(p) && (v[p] = null)) : yt(p) && (p.value = null)), 
    g(d)) Pt(d, l, 12, [ a, h ]); else {
        const t = m(d), n = yt(d);
        if (t || n) {
            const o = () => {
                if (e.f) {
                    const n = t ? b(d) ? v[d] : h[d] : d.value;
                    i ? f(n) && c(n, s) : f(n) ? n.includes(s) || n.push(s) : t ? (h[d] = [ s ], b(d) && (v[d] = h[d])) : (d.value = [ s ], 
                    e.k && (h[e.k] = d.value));
                } else t ? (h[d] = a, b(d) && (v[d] = a)) : n && (d.value = a, e.k && (h[e.k] = a));
            };
            a ? (o.id = -1, mr(o, r)) : o();
        }
    }
}

D().requestIdleCallback, D().cancelIdleCallback;

const fn = e => !!e.type.__asyncLoader, dn = e => e.type.__isKeepAlive;

function pn(e, t) {
    gn(e, "a", t);
}

function hn(e, t) {
    gn(e, "da", t);
}

function gn(e, t, n = fo) {
    const r = e.__wdc || (e.__wdc = () => {
        let t = n;
        for (;t; ) {
            if (t.isDeactivated) return;
            t = t.parent;
        }
        return e();
    });
    if (vn(t, r, n), n) {
        let e = n.parent;
        for (;e && e.parent; ) dn(e.parent.vnode) && mn(r, t, n, e), e = e.parent;
    }
}

function mn(e, t, n, r) {
    const o = vn(t, e, r, !0);
    _n((() => {
        c(r[t], o);
    }), n);
}

function vn(e, t, n = fo, r = !1) {
    if (n) {
        const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...r) => {
            ve();
            const o = go(n), i = jt(t, n, e, r);
            return o(), ye(), i;
        });
        return r ? o.unshift(i) : o.push(i), i;
    }
}

const yn = e => (t, n = fo) => {
    yo && "sp" !== e || vn(e, ((...e) => t(...e)), n);
}, bn = yn("bm"), wn = yn("m"), Cn = yn("bu"), xn = yn("u"), Sn = yn("bum"), _n = yn("um"), kn = yn("sp"), On = yn("rtg"), En = yn("rtc");

function An(e, t = fo) {
    vn("ec", e, t);
}

function In(e, t) {
    return function(e, t, n = !0, r = !1) {
        const o = Kt || fo;
        if (o) {
            const n = o.type;
            {
                const e = So(n, !1);
                if (e && (e === t || e === E(t) || e === P(E(t)))) return n;
            }
            const i = jn(o[e] || n[e], t) || jn(o.appContext[e], t);
            return !i && r ? n : i;
        }
    }("components", e, !0, t) || e;
}

const Pn = Symbol.for("v-ndc");

function jn(e, t) {
    return e && (e[t] || e[E(t)] || e[P(E(t))]);
}

function Tn(e, t, n, r) {
    let o;
    const i = n, s = f(e);
    if (s || m(e)) {
        let n = !1;
        s && ft(e) && (n = !pt(e), e = je(e)), o = new Array(e.length);
        for (let r = 0, s = e.length; r < s; r++) o[r] = t(n ? mt(e[r]) : e[r], r, void 0, i);
    } else if ("number" == typeof e) {
        o = new Array(e);
        for (let n = 0; n < e; n++) o[n] = t(n + 1, n, void 0, i);
    } else if (y(e)) if (e[Symbol.iterator]) o = Array.from(e, ((e, n) => t(e, n, void 0, i))); else {
        const n = Object.keys(e);
        o = new Array(n.length);
        for (let r = 0, s = n.length; r < s; r++) {
            const s = n[r];
            o[r] = t(e[s], s, r, i);
        }
    } else o = [];
    return o;
}

const Nn = e => e ? vo(e) ? xo(e) : Nn(e.parent) : null, Ln = a(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Nn(e.parent),
    $root: e => Nn(e.root),
    $host: e => e.ce,
    $emit: e => e.emit,
    $options: e => zn(e),
    $forceUpdate: e => e.f || (e.f = () => {
        Vt(e.update);
    }),
    $nextTick: e => e.n || (e.n = $t.bind(e.proxy)),
    $watch: e => Er.bind(e)
}), Mn = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Fn = {
    get({_: e}, n) {
        if ("__v_skip" === n) return !0;
        const {ctx: r, setupState: o, data: i, props: s, accessCache: a, type: c, appContext: l} = e;
        let f;
        if ("$" !== n[0]) {
            const c = a[n];
            if (void 0 !== c) switch (c) {
              case 1:
                return o[n];

              case 2:
                return i[n];

              case 4:
                return r[n];

              case 3:
                return s[n];
            } else {
                if (Mn(o, n)) return a[n] = 1, o[n];
                if (i !== t && u(i, n)) return a[n] = 2, i[n];
                if ((f = e.propsOptions[0]) && u(f, n)) return a[n] = 3, s[n];
                if (r !== t && u(r, n)) return a[n] = 4, r[n];
                Rn && (a[n] = 0);
            }
        }
        const d = Ln[n];
        let p, h;
        return d ? ("$attrs" === n && Ae(e.attrs, 0, ""), d(e)) : (p = c.__cssModules) && (p = p[n]) ? p : r !== t && u(r, n) ? (a[n] = 4, 
        r[n]) : (h = l.config.globalProperties, u(h, n) ? h[n] : void 0);
    },
    set({_: e}, n, r) {
        const {data: o, setupState: i, ctx: s} = e;
        return Mn(i, n) ? (i[n] = r, !0) : o !== t && u(o, n) ? (o[n] = r, !0) : !u(e.props, n) && (("$" !== n[0] || !(n.slice(1) in e)) && (s[n] = r, 
        !0));
    },
    has({_: {data: e, setupState: n, accessCache: r, ctx: o, appContext: i, propsOptions: s}}, a) {
        let c;
        return !!r[a] || e !== t && u(e, a) || Mn(n, a) || (c = s[0]) && u(c, a) || u(o, a) || u(Ln, a) || u(i.config.globalProperties, a);
    },
    defineProperty(e, t, n) {
        return null != n.get ? e._.accessCache[t] = 0 : u(n, "value") && this.set(e, t, n.value, null), 
        Reflect.defineProperty(e, t, n);
    }
};

function Dn(e) {
    return f(e) ? e.reduce(((e, t) => (e[t] = null, e)), {}) : e;
}

let Rn = !0;

function Bn(e) {
    const t = zn(e), n = e.proxy, o = e.ctx;
    Rn = !1, t.beforeCreate && $n(t.beforeCreate, e, "bc");
    const {data: i, computed: s, methods: a, watch: c, provide: l, inject: u, created: d, beforeMount: p, mounted: h, beforeUpdate: m, updated: v, activated: b, deactivated: w, beforeDestroy: C, beforeUnmount: x, destroyed: S, unmounted: _, render: k, renderTracked: O, renderTriggered: E, errorCaptured: A, serverPrefetch: I, expose: P, inheritAttrs: j, components: T, directives: N, filters: L} = t;
    if (u && function(e, t) {
        f(e) && (e = qn(e));
        for (const n in e) {
            const r = e[n];
            let o;
            o = y(r) ? "default" in r ? tr(r.from || n, r.default, !0) : tr(r.from || n) : tr(r), 
            yt(o) ? Object.defineProperty(t, n, {
                enumerable: !0,
                configurable: !0,
                get: () => o.value,
                set: e => o.value = e
            }) : t[n] = o;
        }
    }(u, o, null), a) for (const r in a) {
        const e = a[r];
        g(e) && (o[r] = e.bind(n));
    }
    if (i) {
        const t = i.call(n, n);
        y(t) && (e.data = at(t));
    }
    if (Rn = !0, s) for (const f in s) {
        const e = s[f], t = g(e) ? e.bind(n, n) : g(e.get) ? e.get.bind(n, n) : r, i = !g(e) && g(e.set) ? e.set.bind(n) : r, a = _o({
            get: t,
            set: i
        });
        Object.defineProperty(o, f, {
            enumerable: !0,
            configurable: !0,
            get: () => a.value,
            set: e => a.value = e
        });
    }
    if (c) for (const r in c) Vn(c[r], o, n, r);
    if (l) {
        const e = g(l) ? l.call(n) : l;
        Reflect.ownKeys(e).forEach((t => {
            er(t, e[t]);
        }));
    }
    function M(e, t) {
        f(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n));
    }
    if (d && $n(d, e, "c"), M(bn, p), M(wn, h), M(Cn, m), M(xn, v), M(pn, b), M(hn, w), 
    M(An, A), M(En, O), M(On, E), M(Sn, x), M(_n, _), M(kn, I), f(P)) if (P.length) {
        const t = e.exposed || (e.exposed = {});
        P.forEach((e => {
            Object.defineProperty(t, e, {
                get: () => n[e],
                set: t => n[e] = t
            });
        }));
    } else e.exposed || (e.exposed = {});
    k && e.render === r && (e.render = k), null != j && (e.inheritAttrs = j), T && (e.components = T), 
    N && (e.directives = N), I && ln(e);
}

function $n(e, t, n) {
    jt(f(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n);
}

function Vn(e, t, n, r) {
    let o = r.includes(".") ? Ar(n, r) : () => n[r];
    if (m(e)) {
        const n = t[e];
        g(n) && kr(o, n);
    } else if (g(e)) kr(o, e.bind(n)); else if (y(e)) if (f(e)) e.forEach((e => Vn(e, t, n, r))); else {
        const r = g(e.handler) ? e.handler.bind(n) : t[e.handler];
        g(r) && kr(o, r, e);
    }
}

function zn(e) {
    const t = e.type, {mixins: n, extends: r} = t, {mixins: o, optionsCache: i, config: {optionMergeStrategies: s}} = e.appContext, a = i.get(t);
    let c;
    return a ? c = a : o.length || n || r ? (c = {}, o.length && o.forEach((e => Un(c, e, s, !0))), 
    Un(c, t, s)) : c = t, y(t) && i.set(t, c), c;
}

function Un(e, t, n, r = !1) {
    const {mixins: o, extends: i} = t;
    i && Un(e, i, n, !0), o && o.forEach((t => Un(e, t, n, !0)));
    for (const s in t) if (r && "expose" === s) ; else {
        const r = Wn[s] || n && n[s];
        e[s] = r ? r(e[s], t[s]) : t[s];
    }
    return e;
}

const Wn = {
    data: Gn,
    props: Xn,
    emits: Xn,
    methods: Hn,
    computed: Hn,
    beforeCreate: Kn,
    created: Kn,
    beforeMount: Kn,
    mounted: Kn,
    beforeUpdate: Kn,
    updated: Kn,
    beforeDestroy: Kn,
    beforeUnmount: Kn,
    destroyed: Kn,
    unmounted: Kn,
    activated: Kn,
    deactivated: Kn,
    errorCaptured: Kn,
    serverPrefetch: Kn,
    components: Hn,
    directives: Hn,
    watch: function(e, t) {
        if (!e) return t;
        if (!t) return e;
        const n = a(Object.create(null), e);
        for (const r in t) n[r] = Kn(e[r], t[r]);
        return n;
    },
    provide: Gn,
    inject: function(e, t) {
        return Hn(qn(e), qn(t));
    }
};

function Gn(e, t) {
    return t ? e ? function() {
        return a(g(e) ? e.call(this, this) : e, g(t) ? t.call(this, this) : t);
    } : t : e;
}

function qn(e) {
    if (f(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}

function Kn(e, t) {
    return e ? [ ...new Set([].concat(e, t)) ] : t;
}

function Hn(e, t) {
    return e ? a(Object.create(null), e, t) : t;
}

function Xn(e, t) {
    return e ? f(e) && f(t) ? [ ...new Set([ ...e, ...t ]) ] : a(Object.create(null), Dn(e), Dn(null != t ? t : {})) : t;
}

function Qn() {
    return {
        app: null,
        config: {
            isNativeTag: o,
            performance: !1,
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

let Yn = 0;

function Jn(e, t) {
    return function(t, n = null) {
        g(t) || (t = a({}, t)), null == n || y(n) || (n = null);
        const r = Qn(), o = new WeakSet, i = [];
        let s = !1;
        const c = r.app = {
            _uid: Yn++,
            _component: t,
            _props: n,
            _container: null,
            _context: r,
            _instance: null,
            version: Oo,
            get config() {
                return r.config;
            },
            set config(e) {},
            use: (e, ...t) => (o.has(e) || (e && g(e.install) ? (o.add(e), e.install(c, ...t)) : g(e) && (o.add(e), 
            e(c, ...t))), c),
            mixin: e => (r.mixins.includes(e) || r.mixins.push(e), c),
            component: (e, t) => t ? (r.components[e] = t, c) : r.components[e],
            directive: (e, t) => t ? (r.directives[e] = t, c) : r.directives[e],
            mount(o, i, a) {
                if (!s) {
                    const i = c._ceVNode || to(t, n);
                    return i.appContext = r, !0 === a ? a = "svg" : !1 === a && (a = void 0), e(i, o, a), 
                    s = !0, c._container = o, o.__vue_app__ = c, xo(i.component);
                }
            },
            onUnmount(e) {
                i.push(e);
            },
            unmount() {
                s && (jt(i, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
            },
            provide: (e, t) => (r.provides[e] = t, c),
            runWithContext(e) {
                const t = Zn;
                Zn = c;
                try {
                    return e();
                } finally {
                    Zn = t;
                }
            }
        };
        return c;
    };
}

let Zn = null;

function er(e, t) {
    if (fo) {
        let n = fo.provides;
        const r = fo.parent && fo.parent.provides;
        r === n && (n = fo.provides = Object.create(r)), n[e] = t;
    } else ;
}

function tr(e, t, n = !1) {
    const r = fo || Kt;
    if (r || Zn) {
        const o = Zn ? Zn._context.provides : r ? null == r.parent ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
        if (o && e in o) return o[e];
        if (arguments.length > 1) return n && g(t) ? t.call(r && r.proxy) : t;
    }
}

const nr = {}, rr = () => Object.create(nr), or = e => Object.getPrototypeOf(e) === nr;

function ir(e, n, r, o) {
    const [i, s] = e.propsOptions;
    let a, c = !1;
    if (n) for (let t in n) {
        if (_(t)) continue;
        const l = n[t];
        let f;
        i && u(i, f = E(t)) ? s && s.includes(f) ? (a || (a = {}))[f] = l : r[f] = l : Tr(e.emitsOptions, t) || t in o && l === o[t] || (o[t] = l, 
        c = !0);
    }
    if (s) {
        const n = gt(r), o = a || t;
        for (let t = 0; t < s.length; t++) {
            const a = s[t];
            r[a] = sr(i, n, a, o[a], e, !u(o, a));
        }
    }
    return c;
}

function sr(e, t, n, r, o, i) {
    const s = e[n];
    if (null != s) {
        const e = u(s, "default");
        if (e && void 0 === r) {
            const e = s.default;
            if (s.type !== Function && !s.skipFactory && g(e)) {
                const {propsDefaults: i} = o;
                if (n in i) r = i[n]; else {
                    const s = go(o);
                    r = i[n] = e.call(null, t), s();
                }
            } else r = e;
            o.ce && o.ce._setProp(n, r);
        }
        s[0] && (i && !e ? r = !1 : !s[1] || "" !== r && r !== I(n) || (r = !0));
    }
    return r;
}

const ar = new WeakMap;

function cr(e, r, o = !1) {
    const i = o ? ar : r.propsCache, s = i.get(e);
    if (s) return s;
    const c = e.props, l = {}, d = [];
    let p = !1;
    if (!g(e)) {
        const t = e => {
            p = !0;
            const [t, n] = cr(e, r, !0);
            a(l, t), n && d.push(...n);
        };
        !o && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
    }
    if (!c && !p) return y(e) && i.set(e, n), n;
    if (f(c)) for (let n = 0; n < c.length; n++) {
        const e = E(c[n]);
        lr(e) && (l[e] = t);
    } else if (c) for (const t in c) {
        const e = E(t);
        if (lr(e)) {
            const n = c[t], r = l[e] = f(n) || g(n) ? {
                type: n
            } : a({}, n), o = r.type;
            let i = !1, s = !0;
            if (f(o)) for (let e = 0; e < o.length; ++e) {
                const t = o[e], n = g(t) && t.name;
                if ("Boolean" === n) {
                    i = !0;
                    break;
                }
                "String" === n && (s = !1);
            } else i = g(o) && "Boolean" === o.name;
            r[0] = i, r[1] = s, (i || u(r, "default")) && d.push(e);
        }
    }
    const h = [ l, d ];
    return y(e) && i.set(e, h), h;
}

function lr(e) {
    return "$" !== e[0] && !_(e);
}

const ur = e => "_" === e[0] || "$stable" === e, fr = e => f(e) ? e.map(io) : [ io(e) ], dr = (e, t, n) => {
    if (t._n) return t;
    const r = Qt(((...e) => fr(t(...e))), n);
    return r._c = !1, r;
}, pr = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
        if (ur(o)) continue;
        const n = e[o];
        if (g(n)) t[o] = dr(0, n, r); else if (null != n) {
            const e = fr(n);
            t[o] = () => e;
        }
    }
}, hr = (e, t) => {
    const n = fr(t);
    e.slots.default = () => n;
}, gr = (e, t, n) => {
    for (const r in t) (n || "_" !== r) && (e[r] = t[r]);
}, mr = function(e, t) {
    t && t.pendingBranch ? f(e) ? t.effects.push(...e) : t.effects.push(e) : (f(n = e) ? Mt.push(...n) : Ft && -1 === n.id ? Ft.splice(Dt + 1, 0, n) : 1 & n.flags || (Mt.push(n), 
    n.flags |= 1), zt());
    var n;
};

function vr(e) {
    return function(e) {
        D().__VUE__ = !0;
        const {insert: o, remove: i, patchProp: s, createElement: a, createText: c, createComment: l, setText: f, setElementText: d, parentNode: p, nextSibling: h, setScopeId: g = r, insertStaticContent: m} = e, v = (e, t, n, r = null, o = null, i = null, s = void 0, a = null, c = !!t.dynamicChildren) => {
            if (e === t) return;
            e && !Yr(e, t) && (r = J(e), K(e, o, i, !0), e = null), -2 === t.patchFlag && (c = !1, 
            t.dynamicChildren = null);
            const {type: l, ref: u, shapeFlag: f} = t;
            switch (l) {
              case Br:
                y(e, t, n, r);
                break;

              case $r:
                w(e, t, n, r);
                break;

              case Vr:
                null == e && C(t, n, r, s);
                break;

              case Rr:
                F(e, t, n, r, o, i, s, a, c);
                break;

              default:
                1 & f ? k(e, t, n, r, o, i, s, a, c) : 6 & f ? R(e, t, n, r, o, i, s, a, c) : (64 & f || 128 & f) && l.process(e, t, n, r, o, i, s, a, c, re);
            }
            null != u && o && un(u, e && e.ref, i, t || e, !t);
        }, y = (e, t, n, r) => {
            if (null == e) o(t.el = c(t.children), n, r); else {
                const n = t.el = e.el;
                t.children !== e.children && f(n, t.children);
            }
        }, w = (e, t, n, r) => {
            null == e ? o(t.el = l(t.children || ""), n, r) : t.el = e.el;
        }, C = (e, t, n, r) => {
            [e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
        }, x = ({el: e, anchor: t}, n, r) => {
            let i;
            for (;e && e !== t; ) i = h(e), o(e, n, r), e = i;
            o(t, n, r);
        }, S = ({el: e, anchor: t}) => {
            let n;
            for (;e && e !== t; ) n = h(e), i(e), e = n;
            i(t);
        }, k = (e, t, n, r, o, i, s, a, c) => {
            "svg" === t.type ? s = "svg" : "math" === t.type && (s = "mathml"), null == e ? O(t, n, r, o, i, s, a, c) : j(e, t, o, i, s, a, c);
        }, O = (e, t, n, r, i, c, l, u) => {
            let f, p;
            const {props: h, shapeFlag: g, transition: m, dirs: v} = e;
            if (f = e.el = a(e.type, c, h && h.is, h), 8 & g ? d(f, e.children) : 16 & g && P(e.children, f, null, r, i, yr(e, c), l, u), 
            v && Jt(e, null, r, "created"), A(f, e, e.scopeId, l, r), h) {
                for (const e in h) "value" === e || _(e) || s(f, e, null, h[e], c, r);
                "value" in h && s(f, "value", null, h.value, c), (p = h.onVnodeBeforeMount) && co(p, r, e);
            }
            v && Jt(e, null, r, "beforeMount");
            const y = function(e, t) {
                return (!e || e && !e.pendingBranch) && t && !t.persisted;
            }(i, m);
            y && m.beforeEnter(f), o(f, t, n), ((p = h && h.onVnodeMounted) || y || v) && mr((() => {
                p && co(p, r, e), y && m.enter(f), v && Jt(e, null, r, "mounted");
            }), i);
        }, A = (e, t, n, r, o) => {
            if (n && g(e, n), r) for (let i = 0; i < r.length; i++) g(e, r[i]);
            if (o) {
                let n = o.subTree;
                if (t === n || Dr(n.type) && (n.ssContent === t || n.ssFallback === t)) {
                    const t = o.vnode;
                    A(e, t, t.scopeId, t.slotScopeIds, o.parent);
                }
            }
        }, P = (e, t, n, r, o, i, s, a, c = 0) => {
            for (let l = c; l < e.length; l++) {
                const c = e[l] = a ? so(e[l]) : io(e[l]);
                v(null, c, t, n, r, o, i, s, a);
            }
        }, j = (e, n, r, o, i, a, c) => {
            const l = n.el = e.el;
            let {patchFlag: u, dynamicChildren: f, dirs: p} = n;
            u |= 16 & e.patchFlag;
            const h = e.props || t, g = n.props || t;
            let m;
            if (r && br(r, !1), (m = g.onVnodeBeforeUpdate) && co(m, r, n, e), p && Jt(n, e, r, "beforeUpdate"), 
            r && br(r, !0), (h.innerHTML && null == g.innerHTML || h.textContent && null == g.textContent) && d(l, ""), 
            f ? T(e.dynamicChildren, f, l, r, o, yr(n, i), a) : c || U(e, n, l, null, r, o, yr(n, i), a, !1), 
            u > 0) {
                if (16 & u) M(l, h, g, r, i); else if (2 & u && h.class !== g.class && s(l, "class", null, g.class, i), 
                4 & u && s(l, "style", h.style, g.style, i), 8 & u) {
                    const e = n.dynamicProps;
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t], o = h[n], a = g[n];
                        a === o && "value" !== n || s(l, n, o, a, i, r);
                    }
                }
                1 & u && e.children !== n.children && d(l, n.children);
            } else c || null != f || M(l, h, g, r, i);
            ((m = g.onVnodeUpdated) || p) && mr((() => {
                m && co(m, r, n, e), p && Jt(n, e, r, "updated");
            }), o);
        }, T = (e, t, n, r, o, i, s) => {
            for (let a = 0; a < t.length; a++) {
                const c = e[a], l = t[a], u = c.el && (c.type === Rr || !Yr(c, l) || 70 & c.shapeFlag) ? p(c.el) : n;
                v(c, l, u, null, r, o, i, s, !0);
            }
        }, M = (e, n, r, o, i) => {
            if (n !== r) {
                if (n !== t) for (const t in n) _(t) || t in r || s(e, t, n[t], null, i, o);
                for (const t in r) {
                    if (_(t)) continue;
                    const a = r[t], c = n[t];
                    a !== c && "value" !== t && s(e, t, c, a, i, o);
                }
                "value" in r && s(e, "value", n.value, r.value, i);
            }
        }, F = (e, t, n, r, i, s, a, l, u) => {
            const f = t.el = e ? e.el : c(""), d = t.anchor = e ? e.anchor : c("");
            let {patchFlag: p, dynamicChildren: h, slotScopeIds: g} = t;
            g && (l = l ? l.concat(g) : g), null == e ? (o(f, n, r), o(d, n, r), P(t.children || [], n, d, i, s, a, l, u)) : p > 0 && 64 & p && h && e.dynamicChildren ? (T(e.dynamicChildren, h, n, i, s, a, l), 
            (null != t.key || i && t === i.subTree) && wr(e, t, !0)) : U(e, t, n, d, i, s, a, l, u);
        }, R = (e, t, n, r, o, i, s, a, c) => {
            t.slotScopeIds = a, null == e ? 512 & t.shapeFlag ? o.ctx.activate(t, n, r, s, c) : B(t, n, r, o, i, s, c) : $(e, t, c);
        }, B = (e, n, r, o, i, s, a) => {
            const c = e.component = function(e, n, r) {
                const o = e.type, i = (n ? n.appContext : e.appContext) || lo, s = {
                    uid: uo++,
                    vnode: e,
                    type: o,
                    parent: n,
                    appContext: i,
                    root: null,
                    next: null,
                    subTree: null,
                    effect: null,
                    update: null,
                    job: null,
                    scope: new ee(!0),
                    render: null,
                    proxy: null,
                    exposed: null,
                    exposeProxy: null,
                    withProxy: null,
                    provides: n ? n.provides : Object.create(i.provides),
                    ids: n ? n.ids : [ "", 0, 0 ],
                    accessCache: null,
                    renderCache: [],
                    components: null,
                    directives: null,
                    propsOptions: cr(o, i),
                    emitsOptions: jr(o, i),
                    emit: null,
                    emitted: null,
                    propsDefaults: t,
                    inheritAttrs: o.inheritAttrs,
                    ctx: t,
                    data: t,
                    props: t,
                    attrs: t,
                    slots: t,
                    refs: t,
                    setupState: t,
                    setupContext: null,
                    suspense: r,
                    suspenseId: r ? r.pendingId : 0,
                    asyncDep: null,
                    asyncResolved: !1,
                    isMounted: !1,
                    isUnmounted: !1,
                    isDeactivated: !1,
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
                s.ctx = {
                    _: s
                }, s.root = n ? n.root : s, s.emit = Pr.bind(null, s), e.ce && e.ce(s);
                return s;
            }(e, o, i);
            if (dn(e) && (c.ctx.renderer = re), function(e, t = !1, n = !1) {
                t && ho(t);
                const {props: r, children: o} = e.vnode, i = vo(e);
                (function(e, t, n, r = !1) {
                    const o = {}, i = rr();
                    e.propsDefaults = Object.create(null), ir(e, t, o, i);
                    for (const s in e.propsOptions[0]) s in o || (o[s] = void 0);
                    n ? e.props = r ? o : ct(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
                })(e, r, i, t), ((e, t, n) => {
                    const r = e.slots = rr();
                    if (32 & e.vnode.shapeFlag) {
                        const e = t._;
                        e ? (gr(r, t, n), n && L(r, "_", e, !0)) : pr(t, r);
                    } else t && hr(e, t);
                })(e, o, n);
                const s = i ? function(e, t) {
                    const n = e.type;
                    e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, Fn);
                    const {setup: r} = n;
                    if (r) {
                        ve();
                        const n = e.setupContext = r.length > 1 ? function(e) {
                            const t = t => {
                                e.exposed = t || {};
                            };
                            return {
                                attrs: new Proxy(e.attrs, Co),
                                slots: e.slots,
                                emit: e.emit,
                                expose: t
                            };
                        }(e) : null, o = go(e), i = Pt(r, e, 0, [ e.props, n ]), s = b(i);
                        if (ye(), o(), !s && !e.sp || fn(e) || ln(e), s) {
                            if (i.then(mo, mo), t) return i.then((t => {
                                bo(e, t);
                            })).catch((t => {
                                Tt(t, e, 0);
                            }));
                            e.asyncDep = i;
                        } else bo(e, i);
                    } else wo(e);
                }(e, t) : void 0;
                t && ho(!1);
            }(c, !1, a), c.asyncDep) {
                if (i && i.registerDep(c, V, a), !e.el) {
                    const e = c.subTree = to($r);
                    w(null, e, n, r);
                }
            } else V(c, e, n, r, i, s, a);
        }, $ = (e, t, n) => {
            const r = t.component = e.component;
            if (function(e, t, n) {
                const {props: r, children: o, component: i} = e, {props: s, children: a, patchFlag: c} = t, l = i.emitsOptions;
                if (t.dirs || t.transition) return !0;
                if (!(n && c >= 0)) return !(!o && !a || a && a.$stable) || r !== s && (r ? !s || Fr(r, s, l) : !!s);
                if (1024 & c) return !0;
                if (16 & c) return r ? Fr(r, s, l) : !!s;
                if (8 & c) {
                    const e = t.dynamicProps;
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t];
                        if (s[n] !== r[n] && !Tr(l, n)) return !0;
                    }
                }
                return !1;
            }(e, t, n)) {
                if (r.asyncDep && !r.asyncResolved) return void z(r, t, n);
                r.next = t, r.update();
            } else t.el = e.el, r.vnode = t;
        }, V = (e, t, n, r, o, i, s) => {
            const a = () => {
                if (e.isMounted) {
                    let {next: t, bu: n, u: r, parent: c, vnode: l} = e;
                    {
                        const n = Cr(e);
                        if (n) return t && (t.el = l.el, z(e, t, s)), void n.asyncDep.then((() => {
                            e.isUnmounted || a();
                        }));
                    }
                    let u, f = t;
                    br(e, !1), t ? (t.el = l.el, z(e, t, s)) : t = l, n && N(n), (u = t.props && t.props.onVnodeBeforeUpdate) && co(u, c, t, l), 
                    br(e, !0);
                    const d = Nr(e), h = e.subTree;
                    e.subTree = d, v(h, d, p(h.el), J(h), e, o, i), t.el = d.el, null === f && function({vnode: e, parent: t}, n) {
                        for (;t; ) {
                            const r = t.subTree;
                            if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r !== e) break;
                            (e = t.vnode).el = n, t = t.parent;
                        }
                    }(e, d.el), r && mr(r, o), (u = t.props && t.props.onVnodeUpdated) && mr((() => co(u, c, t, l)), o);
                } else {
                    let s;
                    const {el: a, props: c} = t, {bm: l, m: u, parent: f, root: d, type: p} = e, h = fn(t);
                    br(e, !1), l && N(l), !h && (s = c && c.onVnodeBeforeMount) && co(s, f, t), br(e, !0);
                    {
                        d.ce && d.ce._injectChildStyle(p);
                        const s = e.subTree = Nr(e);
                        v(null, s, n, r, e, o, i), t.el = s.el;
                    }
                    if (u && mr(u, o), !h && (s = c && c.onVnodeMounted)) {
                        const e = t;
                        mr((() => co(s, f, e)), o);
                    }
                    (256 & t.shapeFlag || f && fn(f.vnode) && 256 & f.vnode.shapeFlag) && e.a && mr(e.a, o), 
                    e.isMounted = !0, t = n = r = null;
                }
            };
            e.scope.on();
            const c = e.effect = new ne(a);
            e.scope.off();
            const l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
            u.i = e, u.id = e.uid, c.scheduler = () => Vt(u), br(e, !0), l();
        }, z = (e, n, r) => {
            n.component = e;
            const o = e.vnode.props;
            e.vnode = n, e.next = null, function(e, t, n, r) {
                const {props: o, attrs: i, vnode: {patchFlag: s}} = e, a = gt(o), [c] = e.propsOptions;
                let l = !1;
                if (!(r || s > 0) || 16 & s) {
                    let r;
                    ir(e, t, o, i) && (l = !0);
                    for (const i in a) t && (u(t, i) || (r = I(i)) !== i && u(t, r)) || (c ? !n || void 0 === n[i] && void 0 === n[r] || (o[i] = sr(c, a, i, void 0, e, !0)) : delete o[i]);
                    if (i !== a) for (const e in i) t && u(t, e) || (delete i[e], l = !0);
                } else if (8 & s) {
                    const n = e.vnode.dynamicProps;
                    for (let r = 0; r < n.length; r++) {
                        let s = n[r];
                        if (Tr(e.emitsOptions, s)) continue;
                        const f = t[s];
                        if (c) if (u(i, s)) f !== i[s] && (i[s] = f, l = !0); else {
                            const t = E(s);
                            o[t] = sr(c, a, t, f, e, !1);
                        } else f !== i[s] && (i[s] = f, l = !0);
                    }
                }
                l && Ie(e.attrs, "set", "");
            }(e, n.props, o, r), ((e, n, r) => {
                const {vnode: o, slots: i} = e;
                let s = !0, a = t;
                if (32 & o.shapeFlag) {
                    const e = n._;
                    e ? r && 1 === e ? s = !1 : gr(i, n, r) : (s = !n.$stable, pr(n, i)), a = n;
                } else n && (hr(e, n), a = {
                    default: 1
                });
                if (s) for (const t in i) ur(t) || null != a[t] || delete i[t];
            })(e, n.children, r), ve(), Ut(e), ye();
        }, U = (e, t, n, r, o, i, s, a, c = !1) => {
            const l = e && e.children, u = e ? e.shapeFlag : 0, f = t.children, {patchFlag: p, shapeFlag: h} = t;
            if (p > 0) {
                if (128 & p) return void G(l, f, n, r, o, i, s, a, c);
                if (256 & p) return void W(l, f, n, r, o, i, s, a, c);
            }
            8 & h ? (16 & u && Y(l, o, i), f !== l && d(n, f)) : 16 & u ? 16 & h ? G(l, f, n, r, o, i, s, a, c) : Y(l, o, i, !0) : (8 & u && d(n, ""), 
            16 & h && P(f, n, r, o, i, s, a, c));
        }, W = (e, t, r, o, i, s, a, c, l) => {
            t = t || n;
            const u = (e = e || n).length, f = t.length, d = Math.min(u, f);
            let p;
            for (p = 0; p < d; p++) {
                const n = t[p] = l ? so(t[p]) : io(t[p]);
                v(e[p], n, r, null, i, s, a, c, l);
            }
            u > f ? Y(e, i, s, !0, !1, d) : P(t, r, o, i, s, a, c, l, d);
        }, G = (e, t, r, o, i, s, a, c, l) => {
            let u = 0;
            const f = t.length;
            let d = e.length - 1, p = f - 1;
            for (;u <= d && u <= p; ) {
                const n = e[u], o = t[u] = l ? so(t[u]) : io(t[u]);
                if (!Yr(n, o)) break;
                v(n, o, r, null, i, s, a, c, l), u++;
            }
            for (;u <= d && u <= p; ) {
                const n = e[d], o = t[p] = l ? so(t[p]) : io(t[p]);
                if (!Yr(n, o)) break;
                v(n, o, r, null, i, s, a, c, l), d--, p--;
            }
            if (u > d) {
                if (u <= p) {
                    const e = p + 1, n = e < f ? t[e].el : o;
                    for (;u <= p; ) v(null, t[u] = l ? so(t[u]) : io(t[u]), r, n, i, s, a, c, l), u++;
                }
            } else if (u > p) for (;u <= d; ) K(e[u], i, s, !0), u++; else {
                const h = u, g = u, m = new Map;
                for (u = g; u <= p; u++) {
                    const e = t[u] = l ? so(t[u]) : io(t[u]);
                    null != e.key && m.set(e.key, u);
                }
                let y, b = 0;
                const w = p - g + 1;
                let C = !1, x = 0;
                const S = new Array(w);
                for (u = 0; u < w; u++) S[u] = 0;
                for (u = h; u <= d; u++) {
                    const n = e[u];
                    if (b >= w) {
                        K(n, i, s, !0);
                        continue;
                    }
                    let o;
                    if (null != n.key) o = m.get(n.key); else for (y = g; y <= p; y++) if (0 === S[y - g] && Yr(n, t[y])) {
                        o = y;
                        break;
                    }
                    void 0 === o ? K(n, i, s, !0) : (S[o - g] = u + 1, o >= x ? x = o : C = !0, v(n, t[o], r, null, i, s, a, c, l), 
                    b++);
                }
                const _ = C ? function(e) {
                    const t = e.slice(), n = [ 0 ];
                    let r, o, i, s, a;
                    const c = e.length;
                    for (r = 0; r < c; r++) {
                        const c = e[r];
                        if (0 !== c) {
                            if (o = n[n.length - 1], e[o] < c) {
                                t[r] = o, n.push(r);
                                continue;
                            }
                            for (i = 0, s = n.length - 1; i < s; ) a = i + s >> 1, e[n[a]] < c ? i = a + 1 : s = a;
                            c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
                        }
                    }
                    i = n.length, s = n[i - 1];
                    for (;i-- > 0; ) n[i] = s, s = t[s];
                    return n;
                }(S) : n;
                for (y = _.length - 1, u = w - 1; u >= 0; u--) {
                    const e = g + u, n = t[e], d = e + 1 < f ? t[e + 1].el : o;
                    0 === S[u] ? v(null, n, r, d, i, s, a, c, l) : C && (y < 0 || u !== _[y] ? q(n, r, d, 2) : y--);
                }
            }
        }, q = (e, t, n, r, i = null) => {
            const {el: s, type: a, transition: c, children: l, shapeFlag: u} = e;
            if (6 & u) return void q(e.component.subTree, t, n, r);
            if (128 & u) return void e.suspense.move(t, n, r);
            if (64 & u) return void a.move(e, t, n, re);
            if (a === Rr) {
                o(s, t, n);
                for (let e = 0; e < l.length; e++) q(l[e], t, n, r);
                return void o(e.anchor, t, n);
            }
            if (a === Vr) return void x(e, t, n);
            if (2 !== r && 1 & u && c) if (0 === r) c.beforeEnter(s), o(s, t, n), mr((() => c.enter(s)), i); else {
                const {leave: e, delayLeave: r, afterLeave: i} = c, a = () => o(s, t, n), l = () => {
                    e(s, (() => {
                        a(), i && i();
                    }));
                };
                r ? r(s, a, l) : l();
            } else o(s, t, n);
        }, K = (e, t, n, r = !1, o = !1) => {
            const {type: i, props: s, ref: a, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: f, dirs: d, cacheIndex: p} = e;
            if (-2 === f && (o = !1), null != a && un(a, null, n, e, !0), null != p && (t.renderCache[p] = void 0), 
            256 & u) return void t.ctx.deactivate(e);
            const h = 1 & u && d, g = !fn(e);
            let m;
            if (g && (m = s && s.onVnodeBeforeUnmount) && co(m, t, e), 6 & u) Q(e.component, n, r); else {
                if (128 & u) return void e.suspense.unmount(n, r);
                h && Jt(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, re, r) : l && !l.hasOnce && (i !== Rr || f > 0 && 64 & f) ? Y(l, t, n, !1, !0) : (i === Rr && 384 & f || !o && 16 & u) && Y(c, t, n), 
                r && H(e);
            }
            (g && (m = s && s.onVnodeUnmounted) || h) && mr((() => {
                m && co(m, t, e), h && Jt(e, null, t, "unmounted");
            }), n);
        }, H = e => {
            const {type: t, el: n, anchor: r, transition: o} = e;
            if (t === Rr) return void X(n, r);
            if (t === Vr) return void S(e);
            const s = () => {
                i(n), o && !o.persisted && o.afterLeave && o.afterLeave();
            };
            if (1 & e.shapeFlag && o && !o.persisted) {
                const {leave: t, delayLeave: r} = o, i = () => t(n, s);
                r ? r(e.el, s, i) : i();
            } else s();
        }, X = (e, t) => {
            let n;
            for (;e !== t; ) n = h(e), i(e), e = n;
            i(t);
        }, Q = (e, t, n) => {
            const {bum: r, scope: o, job: i, subTree: s, um: a, m: c, a: l} = e;
            xr(c), xr(l), r && N(r), o.stop(), i && (i.flags |= 8, K(s, e, t, n)), a && mr(a, t), 
            mr((() => {
                e.isUnmounted = !0;
            }), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 
            0 === t.deps && t.resolve());
        }, Y = (e, t, n, r = !1, o = !1, i = 0) => {
            for (let s = i; s < e.length; s++) K(e[s], t, n, r, o);
        }, J = e => {
            if (6 & e.shapeFlag) return J(e.component.subTree);
            if (128 & e.shapeFlag) return e.suspense.next();
            const t = h(e.anchor || e.el), n = t && t[Zt];
            return n ? h(n) : t;
        };
        let Z = !1;
        const te = (e, t, n) => {
            null == e ? t._vnode && K(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), 
            t._vnode = e, Z || (Z = !0, Ut(), Wt(), Z = !1);
        }, re = {
            p: v,
            um: K,
            m: q,
            r: H,
            mt: B,
            mc: P,
            pc: U,
            pbc: T,
            n: J,
            o: e
        };
        let oe;
        return {
            render: te,
            hydrate: oe,
            createApp: Jn(te)
        };
    }(e);
}

function yr({type: e, props: t}, n) {
    return "svg" === n && "foreignObject" === e || "mathml" === n && "annotation-xml" === e && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}

function br({effect: e, job: t}, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}

function wr(e, t, n = !1) {
    const r = e.children, o = t.children;
    if (f(r) && f(o)) for (let i = 0; i < r.length; i++) {
        const e = r[i];
        let t = o[i];
        1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = o[i] = so(o[i]), 
        t.el = e.el), n || -2 === t.patchFlag || wr(e, t)), t.type === Br && (t.el = e.el);
    }
}

function Cr(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Cr(t);
}

function xr(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}

const Sr = Symbol.for("v-scx"), _r = () => tr(Sr);

function kr(e, t, n) {
    return Or(e, t, n);
}

function Or(e, n, o = t) {
    const {immediate: i, deep: s, flush: c, once: l} = o, u = a({}, o), f = n && i || !n && "post" !== c;
    let d;
    if (yo) if ("sync" === c) {
        const e = _r();
        d = e.__watcherHandles || (e.__watcherHandles = []);
    } else if (!f) {
        const e = () => {};
        return e.stop = r, e.resume = r, e.pause = r, e;
    }
    const p = fo;
    u.call = (e, t, n) => jt(e, p, t, n);
    let h = !1;
    "post" === c ? u.scheduler = e => {
        mr(e, p && p.suspense);
    } : "sync" !== c && (h = !0, u.scheduler = (e, t) => {
        t ? e() : Vt(e);
    }), u.augmentJob = e => {
        n && (e.flags |= 4), h && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
    };
    const g = At(e, n, u);
    return yo && (d ? d.push(g) : f && g()), g;
}

function Er(e, t, n) {
    const r = this.proxy, o = m(e) ? e.includes(".") ? Ar(r, e) : () => r[e] : e.bind(r, r);
    let i;
    g(t) ? i = t : (i = t.handler, n = t);
    const s = go(this), a = Or(o, i.bind(r), n);
    return s(), a;
}

function Ar(e, t) {
    const n = t.split(".");
    return () => {
        let t = e;
        for (let e = 0; e < n.length && t; e++) t = t[n[e]];
        return t;
    };
}

const Ir = (e, t) => "modelValue" === t || "model-value" === t ? e.modelModifiers : e[`${t}Modifiers`] || e[`${E(t)}Modifiers`] || e[`${I(t)}Modifiers`];

function Pr(e, n, ...r) {
    if (e.isUnmounted) return;
    const o = e.vnode.props || t;
    let i = r;
    const s = n.startsWith("update:"), a = s && Ir(o, n.slice(7));
    let c;
    a && (a.trim && (i = r.map((e => m(e) ? e.trim() : e))), a.number && (i = r.map(M)));
    let l = o[c = j(n)] || o[c = j(E(n))];
    !l && s && (l = o[c = j(I(n))]), l && jt(l, e, 6, i);
    const u = o[c + "Once"];
    if (u) {
        if (e.emitted) {
            if (e.emitted[c]) return;
        } else e.emitted = {};
        e.emitted[c] = !0, jt(u, e, 6, i);
    }
}

function jr(e, t, n = !1) {
    const r = t.emitsCache, o = r.get(e);
    if (void 0 !== o) return o;
    const i = e.emits;
    let s = {}, c = !1;
    if (!g(e)) {
        const r = e => {
            const n = jr(e, t, !0);
            n && (c = !0, a(s, n));
        };
        !n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
    }
    return i || c ? (f(i) ? i.forEach((e => s[e] = null)) : a(s, i), y(e) && r.set(e, s), 
    s) : (y(e) && r.set(e, null), null);
}

function Tr(e, t) {
    return !(!e || !i(t)) && (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, I(t)) || u(e, t));
}

function Nr(e) {
    const {type: t, vnode: n, proxy: r, withProxy: o, propsOptions: [i], slots: a, attrs: c, emit: l, render: u, renderCache: f, props: d, data: p, setupState: h, ctx: g, inheritAttrs: m} = e, v = Xt(e);
    let y, b;
    try {
        if (4 & n.shapeFlag) {
            const e = o || r, t = e;
            y = io(u.call(t, e, f, d, h, p, g)), b = c;
        } else {
            const e = t;
            0, y = io(e.length > 1 ? e(d, {
                attrs: c,
                slots: a,
                emit: l
            }) : e(d, null)), b = t.props ? c : Lr(c);
        }
    } catch (C) {
        zr.length = 0, Tt(C, e, 1), y = to($r);
    }
    let w = y;
    if (b && !1 !== m) {
        const e = Object.keys(b), {shapeFlag: t} = w;
        e.length && 7 & t && (i && e.some(s) && (b = Mr(b, i)), w = no(w, b, !1, !0));
    }
    return n.dirs && (w = no(w, null, !1, !0), w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs), 
    n.transition && sn(w, n.transition), y = w, Xt(v), y;
}

const Lr = e => {
    let t;
    for (const n in e) ("class" === n || "style" === n || i(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
}, Mr = (e, t) => {
    const n = {};
    for (const r in e) s(r) && r.slice(9) in t || (n[r] = e[r]);
    return n;
};

function Fr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < r.length; o++) {
        const i = r[o];
        if (t[i] !== e[i] && !Tr(n, i)) return !0;
    }
    return !1;
}

const Dr = e => e.__isSuspense;

const Rr = Symbol.for("v-fgt"), Br = Symbol.for("v-txt"), $r = Symbol.for("v-cmt"), Vr = Symbol.for("v-stc"), zr = [];

let Ur = null;

function Wr(e = !1) {
    zr.push(Ur = e ? null : []);
}

let Gr = 1;

function qr(e, t = !1) {
    Gr += e, e < 0 && Ur && t && (Ur.hasOnce = !0);
}

function Kr(e) {
    return e.dynamicChildren = Gr > 0 ? Ur || n : null, zr.pop(), Ur = zr[zr.length - 1] || null, 
    Gr > 0 && Ur && Ur.push(e), e;
}

function Hr(e, t, n, r, o, i) {
    return Kr(eo(e, t, n, r, o, i, !0));
}

function Xr(e, t, n, r, o) {
    return Kr(to(e, t, n, r, o, !0));
}

function Qr(e) {
    return !!e && !0 === e.__v_isVNode;
}

function Yr(e, t) {
    return e.type === t.type && e.key === t.key;
}

const Jr = ({key: e}) => null != e ? e : null, Zr = ({ref: e, ref_key: t, ref_for: n}) => ("number" == typeof e && (e = "" + e), 
null != e ? m(e) || yt(e) || g(e) ? {
    i: Kt,
    r: e,
    k: t,
    f: !!n
} : e : null);

function eo(e, t = null, n = null, r = 0, o = null, i = (e === Rr ? 0 : 1), s = !1, a = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Jr(t),
        ref: t && Zr(t),
        scopeId: Ht,
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
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: Kt
    };
    return a ? (ao(c, n), 128 & i && e.normalize(c)) : n && (c.shapeFlag |= m(n) ? 8 : 16), 
    Gr > 0 && !s && Ur && (c.patchFlag > 0 || 6 & i) && 32 !== c.patchFlag && Ur.push(c), 
    c;
}

const to = function(e, t = null, n = null, r = 0, o = null, i = !1) {
    e && e !== Pn || (e = $r);
    if (Qr(e)) {
        const r = no(e, t, !0);
        return n && ao(r, n), Gr > 0 && !i && Ur && (6 & r.shapeFlag ? Ur[Ur.indexOf(e)] = r : Ur.push(r)), 
        r.patchFlag = -2, r;
    }
    s = e, g(s) && "__vccOpts" in s && (e = e.__vccOpts);
    var s;
    if (t) {
        t = function(e) {
            return e ? ht(e) || or(e) ? a({}, e) : e : null;
        }(t);
        let {class: e, style: n} = t;
        e && !m(e) && (t.class = U(e)), y(n) && (ht(n) && !f(n) && (n = a({}, n)), t.style = R(n));
    }
    const c = m(e) ? 1 : Dr(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : y(e) ? 4 : g(e) ? 2 : 0;
    return eo(e, t, n, r, o, c, i, !0);
};

function no(e, t, n = !1, r = !1) {
    const {props: o, ref: s, patchFlag: a, children: c, transition: l} = e, u = t ? function(...e) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            for (const e in r) if ("class" === e) t.class !== r.class && (t.class = U([ t.class, r.class ])); else if ("style" === e) t.style = R([ t.style, r.style ]); else if (i(e)) {
                const n = t[e], o = r[e];
                !o || n === o || f(n) && n.includes(o) || (t[e] = n ? [].concat(n, o) : o);
            } else "" !== e && (t[e] = r[e]);
        }
        return t;
    }(o || {}, t) : o, d = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: u,
        key: u && Jr(u),
        ref: t && t.ref ? n && s ? f(s) ? s.concat(Zr(t)) : [ s, Zr(t) ] : Zr(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: c,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Rr ? -1 === a ? 16 : 16 | a : a,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: l,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && no(e.ssContent),
        ssFallback: e.ssFallback && no(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    return l && r && sn(d, l.clone(d)), d;
}

function ro(e = " ", t = 0) {
    return to(Br, null, e, t);
}

function oo(e = "", t = !1) {
    return t ? (Wr(), Xr($r, null, e)) : to($r, null, e);
}

function io(e) {
    return null == e || "boolean" == typeof e ? to($r) : f(e) ? to(Rr, null, e.slice()) : Qr(e) ? so(e) : to(Br, null, String(e));
}

function so(e) {
    return null === e.el && -1 !== e.patchFlag || e.memo ? e : no(e);
}

function ao(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (null == t) t = null; else if (f(t)) n = 16; else if ("object" == typeof t) {
        if (65 & r) {
            const n = t.default;
            return void (n && (n._c && (n._d = !1), ao(e, n()), n._c && (n._d = !0)));
        }
        {
            n = 32;
            const r = t._;
            r || or(t) ? 3 === r && Kt && (1 === Kt.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Kt;
        }
    } else g(t) ? (t = {
        default: t,
        _ctx: Kt
    }, n = 32) : (t = String(t), 64 & r ? (n = 16, t = [ ro(t) ]) : n = 8);
    e.children = t, e.shapeFlag |= n;
}

function co(e, t, n, r = null) {
    jt(e, t, 7, [ n, r ]);
}

const lo = Qn();

let uo = 0;

let fo = null;

let po, ho;

{
    const e = D(), t = (t, n) => {
        let r;
        return (r = e[t]) || (r = e[t] = []), r.push(n), e => {
            r.length > 1 ? r.forEach((t => t(e))) : r[0](e);
        };
    };
    po = t("__VUE_INSTANCE_SETTERS__", (e => fo = e)), ho = t("__VUE_SSR_SETTERS__", (e => yo = e));
}

const go = e => {
    const t = fo;
    return po(e), e.scope.on(), () => {
        e.scope.off(), po(t);
    };
}, mo = () => {
    fo && fo.scope.off(), po(null);
};

function vo(e) {
    return 4 & e.vnode.shapeFlag;
}

let yo = !1;

function bo(e, t, n) {
    g(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : y(t) && (e.setupState = St(t)), 
    wo(e);
}

function wo(e, t, n) {
    const o = e.type;
    e.render || (e.render = o.render || r);
    {
        const t = go(e);
        ve();
        try {
            Bn(e);
        } finally {
            ye(), t();
        }
    }
}

const Co = {
    get: (e, t) => (Ae(e, 0, ""), e[t])
};

function xo(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(St((t = e.exposed, 
    !u(t, "__v_skip") && Object.isExtensible(t) && L(t, "__v_skip", !0), t)), {
        get: (t, n) => n in t ? t[n] : n in Ln ? Ln[n](e) : void 0,
        has: (e, t) => t in e || t in Ln
    })) : e.proxy;
    var t;
}

function So(e, t = !0) {
    return g(e) ? e.displayName || e.name : e.name || t && e.__name;
}

const _o = (e, t) => {
    const n = function(e, t, n = !1) {
        let r, o;
        return g(e) ? r = e : (r = e.get, o = e.set), new _t(r, o, n);
    }(e, 0, yo);
    return n;
};

function ko(e, t, n) {
    const r = arguments.length;
    return 2 === r ? y(t) && !f(t) ? Qr(t) ? to(e, null, [ t ]) : to(e, t) : to(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === r && Qr(n) && (n = [ n ]), 
    to(e, t, n));
}

const Oo = "3.5.13";

let Eo;

const Ao = "undefined" != typeof window && window.trustedTypes;

if (Ao) try {
    Eo = Ao.createPolicy("vue", {
        createHTML: e => e
    });
} catch (bh) {}

const Io = Eo ? e => Eo.createHTML(e) : e => e, Po = "undefined" != typeof document ? document : null, jo = Po && Po.createElement("template"), To = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null);
    },
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
        const o = "svg" === t ? Po.createElementNS("http://www.w3.org/2000/svg", e) : "mathml" === t ? Po.createElementNS("http://www.w3.org/1998/Math/MathML", e) : n ? Po.createElement(e, {
            is: n
        }) : Po.createElement(e);
        return "select" === e && r && null != r.multiple && o.setAttribute("multiple", r.multiple), 
        o;
    },
    createText: e => Po.createTextNode(e),
    createComment: e => Po.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t;
    },
    setElementText: (e, t) => {
        e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Po.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, i) {
        const s = n ? n.previousSibling : t.lastChild;
        if (o && (o === i || o.nextSibling)) for (;t.insertBefore(o.cloneNode(!0), n), o !== i && (o = o.nextSibling); ) ; else {
            jo.innerHTML = Io("svg" === r ? `<svg>${e}</svg>` : "mathml" === r ? `<math>${e}</math>` : e);
            const o = jo.content;
            if ("svg" === r || "mathml" === r) {
                const e = o.firstChild;
                for (;e.firstChild; ) o.appendChild(e.firstChild);
                o.removeChild(e);
            }
            t.insertBefore(o, n);
        }
        return [ s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild ];
    }
}, No = "transition", Lo = "animation", Mo = Symbol("_vtc"), Fo = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
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
}, Do = a({}, rn, Fo), Ro = (e, t = []) => {
    f(e) ? e.forEach((e => e(...t))) : e && e(...t);
}, Bo = e => !!e && (f(e) ? e.some((e => e.length > 1)) : e.length > 1);

function $o(e) {
    const t = {};
    for (const a in e) a in Fo || (t[a] = e[a]);
    if (!1 === e.css) return t;
    const {name: n = "v", type: r, duration: o, enterFromClass: i = `${n}-enter-from`, enterActiveClass: s = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = i, appearActiveClass: u = s, appearToClass: f = c, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: h = `${n}-leave-to`} = e, g = function(e) {
        if (null == e) return null;
        if (y(e)) return [ Vo(e.enter), Vo(e.leave) ];
        {
            const t = Vo(e);
            return [ t, t ];
        }
    }(o), m = g && g[0], v = g && g[1], {onBeforeEnter: b, onEnter: w, onEnterCancelled: C, onLeave: x, onLeaveCancelled: S, onBeforeAppear: _ = b, onAppear: k = w, onAppearCancelled: O = C} = t, E = (e, t, n, r) => {
        e._enterCancelled = r, Uo(e, t ? f : c), Uo(e, t ? u : s), n && n();
    }, A = (e, t) => {
        e._isLeaving = !1, Uo(e, d), Uo(e, h), Uo(e, p), t && t();
    }, I = e => (t, n) => {
        const o = e ? k : w, s = () => E(t, e, n);
        Ro(o, [ t, s ]), Wo((() => {
            Uo(t, e ? l : i), zo(t, e ? f : c), Bo(o) || qo(t, r, m, s);
        }));
    };
    return a(t, {
        onBeforeEnter(e) {
            Ro(b, [ e ]), zo(e, i), zo(e, s);
        },
        onBeforeAppear(e) {
            Ro(_, [ e ]), zo(e, l), zo(e, u);
        },
        onEnter: I(!1),
        onAppear: I(!0),
        onLeave(e, t) {
            e._isLeaving = !0;
            const n = () => A(e, t);
            zo(e, d), e._enterCancelled ? (zo(e, p), Qo()) : (Qo(), zo(e, p)), Wo((() => {
                e._isLeaving && (Uo(e, d), zo(e, h), Bo(x) || qo(e, r, v, n));
            })), Ro(x, [ e, n ]);
        },
        onEnterCancelled(e) {
            E(e, !1, void 0, !0), Ro(C, [ e ]);
        },
        onAppearCancelled(e) {
            E(e, !0, void 0, !0), Ro(O, [ e ]);
        },
        onLeaveCancelled(e) {
            A(e), Ro(S, [ e ]);
        }
    });
}

function Vo(e) {
    const t = (e => {
        const t = m(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t;
    })(e);
    return t;
}

function zo(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e[Mo] || (e[Mo] = new Set)).add(t);
}

function Uo(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
    const n = e[Mo];
    n && (n.delete(t), n.size || (e[Mo] = void 0));
}

function Wo(e) {
    requestAnimationFrame((() => {
        requestAnimationFrame(e);
    }));
}

let Go = 0;

function qo(e, t, n, r) {
    const o = e._endId = ++Go, i = () => {
        o === e._endId && r();
    };
    if (null != n) return setTimeout(i, n);
    const {type: s, timeout: a, propCount: c} = Ko(e, t);
    if (!s) return r();
    const l = s + "end";
    let u = 0;
    const f = () => {
        e.removeEventListener(l, d), i();
    }, d = t => {
        t.target === e && ++u >= c && f();
    };
    setTimeout((() => {
        u < c && f();
    }), a + 1), e.addEventListener(l, d);
}

function Ko(e, t) {
    const n = window.getComputedStyle(e), r = e => (n[e] || "").split(", "), o = r(`${No}Delay`), i = r(`${No}Duration`), s = Ho(o, i), a = r(`${Lo}Delay`), c = r(`${Lo}Duration`), l = Ho(a, c);
    let u = null, f = 0, d = 0;
    t === No ? s > 0 && (u = No, f = s, d = i.length) : t === Lo ? l > 0 && (u = Lo, 
    f = l, d = c.length) : (f = Math.max(s, l), u = f > 0 ? s > l ? No : Lo : null, 
    d = u ? u === No ? i.length : c.length : 0);
    return {
        type: u,
        timeout: f,
        propCount: d,
        hasTransform: u === No && /\b(transform|all)(,|$)/.test(r(`${No}Property`).toString())
    };
}

function Ho(e, t) {
    for (;e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map(((t, n) => Xo(t) + Xo(e[n]))));
}

function Xo(e) {
    return "auto" === e ? 0 : 1e3 * Number(e.slice(0, -1).replace(",", "."));
}

function Qo() {
    return document.body.offsetHeight;
}

const Yo = Symbol("_vod"), Jo = Symbol("_vsh"), Zo = Symbol(""), ei = /(^|;)\s*display\s*:/;

const ti = /\s*!important$/;

function ni(e, t, n) {
    if (f(n)) n.forEach((n => ni(e, t, n))); else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
        const r = function(e, t) {
            const n = oi[t];
            if (n) return n;
            let r = E(t);
            if ("filter" !== r && r in e) return oi[t] = r;
            r = P(r);
            for (let o = 0; o < ri.length; o++) {
                const n = ri[o] + r;
                if (n in e) return oi[t] = n;
            }
            return t;
        }(e, t);
        ti.test(n) ? e.setProperty(I(r), n.replace(ti, ""), "important") : e[r] = n;
    }
}

const ri = [ "Webkit", "Moz", "ms" ], oi = {};

const ii = "http://www.w3.org/1999/xlink";

function si(e, t, n, r, o, i = W(t)) {
    r && t.startsWith("xlink:") ? null == n ? e.removeAttributeNS(ii, t.slice(6, t.length)) : e.setAttributeNS(ii, t, n) : null == n || i && !G(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : v(n) ? String(n) : n);
}

function ai(e, t, n, r, o) {
    if ("innerHTML" === t || "textContent" === t) return void (null != n && (e[t] = "innerHTML" === t ? Io(n) : n));
    const i = e.tagName;
    if ("value" === t && "PROGRESS" !== i && !i.includes("-")) {
        const r = "OPTION" === i ? e.getAttribute("value") || "" : e.value, o = null == n ? "checkbox" === e.type ? "on" : "" : String(n);
        return r === o && "_value" in e || (e.value = o), null == n && e.removeAttribute(t), 
        void (e._value = n);
    }
    let s = !1;
    if ("" === n || null == n) {
        const r = typeof e[t];
        "boolean" === r ? n = G(n) : null == n && "string" === r ? (n = "", s = !0) : "number" === r && (n = 0, 
        s = !0);
    }
    try {
        e[t] = n;
    } catch (bh) {}
    s && e.removeAttribute(o || t);
}

function ci(e, t, n, r) {
    e.addEventListener(t, n, r);
}

const li = Symbol("_vei");

function ui(e, t, n, r, o = null) {
    const i = e[li] || (e[li] = {}), s = i[t];
    if (r && s) s.value = r; else {
        const [n, a] = function(e) {
            let t;
            if (fi.test(e)) {
                let n;
                for (t = {}; n = e.match(fi); ) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
            }
            const n = ":" === e[2] ? e.slice(3) : I(e.slice(2));
            return [ n, t ];
        }(t);
        if (r) {
            const s = i[t] = function(e, t) {
                const n = e => {
                    if (e._vts) {
                        if (e._vts <= n.attached) return;
                    } else e._vts = Date.now();
                    jt(function(e, t) {
                        if (f(t)) {
                            const n = e.stopImmediatePropagation;
                            return e.stopImmediatePropagation = () => {
                                n.call(e), e._stopped = !0;
                            }, t.map((e => t => !t._stopped && e && e(t)));
                        }
                        return t;
                    }(e, n.value), t, 5, [ e ]);
                };
                return n.value = e, n.attached = hi(), n;
            }(r, o);
            ci(e, n, s, a);
        } else s && (!function(e, t, n, r) {
            e.removeEventListener(t, n, r);
        }(e, n, s, a), i[t] = void 0);
    }
}

const fi = /(?:Once|Passive|Capture)$/;

let di = 0;

const pi = Promise.resolve(), hi = () => di || (pi.then((() => di = 0)), di = Date.now());

const gi = e => 111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123;

const mi = new WeakMap, vi = new WeakMap, yi = Symbol("_moveCb"), bi = Symbol("_enterCb"), wi = (e => (delete e.props.mode, 
e))({
    name: "TransitionGroup",
    props: a({}, Do, {
        tag: String,
        moveClass: String
    }),
    setup(e, {slots: t}) {
        const n = fo || Kt, r = function() {
            const e = {
                isMounted: !1,
                isLeaving: !1,
                isUnmounting: !1,
                leavingVNodes: new Map
            };
            return wn((() => {
                e.isMounted = !0;
            })), Sn((() => {
                e.isUnmounting = !0;
            })), e;
        }();
        let o, i;
        return xn((() => {
            if (!o.length) return;
            const t = e.moveClass || `${e.name || "v"}-move`;
            if (!function(e, t, n) {
                const r = e.cloneNode(), o = e[Mo];
                o && o.forEach((e => {
                    e.split(/\s+/).forEach((e => e && r.classList.remove(e)));
                }));
                n.split(/\s+/).forEach((e => e && r.classList.add(e))), r.style.display = "none";
                const i = 1 === t.nodeType ? t : t.parentNode;
                i.appendChild(r);
                const {hasTransform: s} = Ko(r);
                return i.removeChild(r), s;
            }(o[0].el, n.vnode.el, t)) return;
            o.forEach(xi), o.forEach(Si);
            const r = o.filter(_i);
            Qo(), r.forEach((e => {
                const n = e.el, r = n.style;
                zo(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
                const o = n[yi] = e => {
                    e && e.target !== n || e && !/transform$/.test(e.propertyName) || (n.removeEventListener("transitionend", o), 
                    n[yi] = null, Uo(n, t));
                };
                n.addEventListener("transitionend", o);
            }));
        })), () => {
            const s = gt(e), a = $o(s);
            let c = s.tag || Rr;
            if (o = [], i) for (let e = 0; e < i.length; e++) {
                const t = i[e];
                t.el && t.el instanceof Element && (o.push(t), sn(t, on(t, a, r, n)), mi.set(t, t.el.getBoundingClientRect()));
            }
            i = t.default ? an(t.default()) : [];
            for (let e = 0; e < i.length; e++) {
                const t = i[e];
                null != t.key && sn(t, on(t, a, r, n));
            }
            return to(c, null, i);
        };
    }
}), Ci = wi;

function xi(e) {
    const t = e.el;
    t[yi] && t[yi](), t[bi] && t[bi]();
}

function Si(e) {
    vi.set(e, e.el.getBoundingClientRect());
}

function _i(e) {
    const t = mi.get(e), n = vi.get(e), r = t.left - n.left, o = t.top - n.top;
    if (r || o) {
        const t = e.el.style;
        return t.transform = t.webkitTransform = `translate(${r}px,${o}px)`, t.transitionDuration = "0s", 
        e;
    }
}

const ki = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return f(t) ? e => N(t, e) : t;
};

function Oi(e) {
    e.target.composing = !0;
}

function Ei(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}

const Ai = Symbol("_assign"), Ii = {
    created(e, {modifiers: {lazy: t, trim: n, number: r}}, o) {
        e[Ai] = ki(o);
        const i = r || o.props && "number" === o.props.type;
        ci(e, t ? "change" : "input", (t => {
            if (t.target.composing) return;
            let r = e.value;
            n && (r = r.trim()), i && (r = M(r)), e[Ai](r);
        })), n && ci(e, "change", (() => {
            e.value = e.value.trim();
        })), t || (ci(e, "compositionstart", Oi), ci(e, "compositionend", Ei), ci(e, "change", Ei));
    },
    mounted(e, {value: t}) {
        e.value = null == t ? "" : t;
    },
    beforeUpdate(e, {value: t, oldValue: n, modifiers: {lazy: r, trim: o, number: i}}, s) {
        if (e[Ai] = ki(s), e.composing) return;
        const a = null == t ? "" : t;
        if ((!i && "number" !== e.type || /^0\d/.test(e.value) ? e.value : M(e.value)) !== a) {
            if (document.activeElement === e && "range" !== e.type) {
                if (r && t === n) return;
                if (o && e.value.trim() === a) return;
            }
            e.value = a;
        }
    }
}, Pi = {
    deep: !0,
    created(e, t, n) {
        e[Ai] = ki(n), ci(e, "change", (() => {
            const t = e._modelValue, n = Mi(e), r = e.checked, o = e[Ai];
            if (f(t)) {
                const e = K(t, n), i = -1 !== e;
                if (r && !i) o(t.concat(n)); else if (!r && i) {
                    const n = [ ...t ];
                    n.splice(e, 1), o(n);
                }
            } else if (p(t)) {
                const e = new Set(t);
                r ? e.add(n) : e.delete(n), o(e);
            } else o(Fi(e, r));
        }));
    },
    mounted: ji,
    beforeUpdate(e, t, n) {
        e[Ai] = ki(n), ji(e, t, n);
    }
};

function ji(e, {value: t, oldValue: n}, r) {
    let o;
    if (e._modelValue = t, f(t)) o = K(t, r.props.value) > -1; else if (p(t)) o = t.has(r.props.value); else {
        if (t === n) return;
        o = q(t, Fi(e, !0));
    }
    e.checked !== o && (e.checked = o);
}

const Ti = {
    created(e, {value: t}, n) {
        e.checked = q(t, n.props.value), e[Ai] = ki(n), ci(e, "change", (() => {
            e[Ai](Mi(e));
        }));
    },
    beforeUpdate(e, {value: t, oldValue: n}, r) {
        e[Ai] = ki(r), t !== n && (e.checked = q(t, r.props.value));
    }
}, Ni = {
    deep: !0,
    created(e, {value: t, modifiers: {number: n}}, r) {
        const o = p(t);
        ci(e, "change", (() => {
            const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => n ? M(Mi(e)) : Mi(e)));
            e[Ai](e.multiple ? o ? new Set(t) : t : t[0]), e._assigning = !0, $t((() => {
                e._assigning = !1;
            }));
        })), e[Ai] = ki(r);
    },
    mounted(e, {value: t}) {
        Li(e, t);
    },
    beforeUpdate(e, t, n) {
        e[Ai] = ki(n);
    },
    updated(e, {value: t}) {
        e._assigning || Li(e, t);
    }
};

function Li(e, t) {
    const n = e.multiple, r = f(t);
    if (!n || r || p(t)) {
        for (let o = 0, i = e.options.length; o < i; o++) {
            const i = e.options[o], s = Mi(i);
            if (n) if (r) {
                const e = typeof s;
                i.selected = "string" === e || "number" === e ? t.some((e => String(e) === String(s))) : K(t, s) > -1;
            } else i.selected = t.has(s); else if (q(Mi(i), t)) return void (e.selectedIndex !== o && (e.selectedIndex = o));
        }
        n || -1 === e.selectedIndex || (e.selectedIndex = -1);
    }
}

function Mi(e) {
    return "_value" in e ? e._value : e.value;
}

function Fi(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
}

const Di = {
    created(e, t, n) {
        Ri(e, t, n, null, "created");
    },
    mounted(e, t, n) {
        Ri(e, t, n, null, "mounted");
    },
    beforeUpdate(e, t, n, r) {
        Ri(e, t, n, r, "beforeUpdate");
    },
    updated(e, t, n, r) {
        Ri(e, t, n, r, "updated");
    }
};

function Ri(e, t, n, r, o) {
    const i = function(e, t) {
        switch (e) {
          case "SELECT":
            return Ni;

          case "TEXTAREA":
            return Ii;

          default:
            switch (t) {
              case "checkbox":
                return Pi;

              case "radio":
                return Ti;

              default:
                return Ii;
            }
        }
    }(e.tagName, n.props && n.props.type)[o];
    i && i(e, t, n, r);
}

const Bi = a({
    patchProp: (e, t, n, r, o, a) => {
        const c = "svg" === o;
        "class" === t ? function(e, t, n) {
            const r = e[Mo];
            r && (t = (t ? [ t, ...r ] : [ ...r ]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
        }(e, r, c) : "style" === t ? function(e, t, n) {
            const r = e.style, o = m(n);
            let i = !1;
            if (n && !o) {
                if (t) if (m(t)) for (const e of t.split(";")) {
                    const t = e.slice(0, e.indexOf(":")).trim();
                    null == n[t] && ni(r, t, "");
                } else for (const e in t) null == n[e] && ni(r, e, "");
                for (const e in n) "display" === e && (i = !0), ni(r, e, n[e]);
            } else if (o) {
                if (t !== n) {
                    const e = r[Zo];
                    e && (n += ";" + e), r.cssText = n, i = ei.test(n);
                }
            } else t && e.removeAttribute("style");
            Yo in e && (e[Yo] = i ? r.display : "", e[Jo] && (r.display = "none"));
        }(e, n, r) : i(t) ? s(t) || ui(e, t, 0, r, a) : ("." === t[0] ? (t = t.slice(1), 
        1) : "^" === t[0] ? (t = t.slice(1), 0) : function(e, t, n, r) {
            if (r) return "innerHTML" === t || "textContent" === t || !!(t in e && gi(t) && g(n));
            if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
            if ("form" === t) return !1;
            if ("list" === t && "INPUT" === e.tagName) return !1;
            if ("type" === t && "TEXTAREA" === e.tagName) return !1;
            if ("width" === t || "height" === t) {
                const t = e.tagName;
                if ("IMG" === t || "VIDEO" === t || "CANVAS" === t || "SOURCE" === t) return !1;
            }
            if (gi(t) && m(n)) return !1;
            return t in e;
        }(e, t, r, c)) ? (ai(e, t, r), e.tagName.includes("-") || "value" !== t && "checked" !== t && "selected" !== t || si(e, t, r, c, 0, "value" !== t)) : !e._isVueCE || !/[A-Z]/.test(t) && m(r) ? ("true-value" === t ? e._trueValue = r : "false-value" === t && (e._falseValue = r), 
        si(e, t, r, c)) : ai(e, E(t), r, 0, t);
    }
}, To);

let $i;

const Vi = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
}, zi = {
    class: "nav-bar"
};

const Ui = Vi({
    name: "NavBar",
    computed: {
        currentTab() {
            return this.$route.query.tab || "badges";
        }
    },
    methods: {
        isActiveTab(e) {
            return this.currentTab === e;
        }
    }
}, [ [ "render", function(e, t, n, r, o, i) {
    const s = In("router-link");
    return Wr(), Hr("nav", zi, [ eo("ul", null, [ eo("li", null, [ to(s, {
        to: {
            query: {
                tab: "badges"
            }
        },
        class: U({
            active: i.isActiveTab("badges")
        })
    }, {
        default: Qt((() => t[0] || (t[0] = [ ro(" Badges ") ]))),
        _: 1
    }, 8, [ "class" ]) ]), eo("li", null, [ to(s, {
        to: {
            query: {
                tab: "triggers"
            }
        },
        class: U({
            active: i.isActiveTab("triggers")
        })
    }, {
        default: Qt((() => t[1] || (t[1] = [ ro(" Triggers ") ]))),
        _: 1
    }, 8, [ "class" ]) ]), eo("li", null, [ to(s, {
        to: {
            query: {
                tab: "settings"
            }
        },
        class: U({
            active: i.isActiveTab("settings")
        })
    }, {
        default: Qt((() => t[2] || (t[2] = [ ro(" Settings ") ]))),
        _: 1
    }, 8, [ "class" ]) ]), eo("li", null, [ to(s, {
        to: {
            query: {
                tab: "log"
            }
        },
        class: U({
            active: i.isActiveTab("log")
        })
    }, {
        default: Qt((() => t[3] || (t[3] = [ ro(" Log ") ]))),
        _: 1
    }, 8, [ "class" ]) ]) ]) ]);
} ], [ "__scopeId", "data-v-7226264f" ] ]);

function Wi() {
    return "undefined" != typeof navigator && "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : {};
}

const Gi = "function" == typeof Proxy;

let qi, Ki;

function Hi() {
    return void 0 !== qi || ("undefined" != typeof window && window.performance ? (qi = !0, 
    Ki = window.performance) : "undefined" != typeof globalThis && (null === (e = globalThis.perf_hooks) || void 0 === e ? void 0 : e.performance) ? (qi = !0, 
    Ki = globalThis.perf_hooks.performance) : qi = !1), qi ? Ki.now() : Date.now();
    var e;
}

class Xi {
    constructor(e, t) {
        this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = e, this.hook = t;
        const n = {};
        if (e.settings) for (const i in e.settings) {
            const t = e.settings[i];
            n[i] = t.defaultValue;
        }
        const r = `__vue-devtools-plugin-settings__${e.id}`;
        let o = Object.assign({}, n);
        try {
            const e = localStorage.getItem(r), t = JSON.parse(e);
            Object.assign(o, t);
        } catch (bh) {}
        this.fallbacks = {
            getSettings: () => o,
            setSettings(e) {
                try {
                    localStorage.setItem(r, JSON.stringify(e));
                } catch (bh) {}
                o = e;
            },
            now: () => Hi()
        }, t && t.on("plugin:settings:set", ((e, t) => {
            e === this.plugin.id && this.fallbacks.setSettings(t);
        })), this.proxiedOn = new Proxy({}, {
            get: (e, t) => this.target ? this.target.on[t] : (...e) => {
                this.onQueue.push({
                    method: t,
                    args: e
                });
            }
        }), this.proxiedTarget = new Proxy({}, {
            get: (e, t) => this.target ? this.target[t] : "on" === t ? this.proxiedOn : Object.keys(this.fallbacks).includes(t) ? (...e) => (this.targetQueue.push({
                method: t,
                args: e,
                resolve: () => {}
            }), this.fallbacks[t](...e)) : (...e) => new Promise((n => {
                this.targetQueue.push({
                    method: t,
                    args: e,
                    resolve: n
                });
            }))
        });
    }
    async setRealTarget(e) {
        this.target = e;
        for (const t of this.onQueue) this.target.on[t.method](...t.args);
        for (const t of this.targetQueue) t.resolve(await this.target[t.method](...t.args));
    }
}

function Qi(e, t) {
    const n = e, r = Wi(), o = Wi().__VUE_DEVTOOLS_GLOBAL_HOOK__, i = Gi && n.enableEarlyProxy;
    if (!o || !r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ && i) {
        const e = i ? new Xi(n, o) : null;
        (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
            pluginDescriptor: n,
            setupFn: t,
            proxy: e
        }), e && t(e.proxiedTarget);
    } else o.emit("devtools-plugin:setup", e, t);
}

function Yi(e, t) {
    Object.keys(e).forEach((function(n) {
        return t(e[n], n);
    }));
}

function Ji(e) {
    return null !== e && "object" == typeof e;
}

function Zi(e, t, n) {
    return t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)), function() {
        var n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
    };
}

function es(e, t) {
    e._actions = Object.create(null), e._mutations = Object.create(null), e._wrappedGetters = Object.create(null), 
    e._modulesNamespaceMap = Object.create(null);
    var n = e.state;
    ns(e, n, [], e._modules.root, !0), ts(e, n, t);
}

function ts(e, t, n) {
    var r = e._state, o = e._scope;
    e.getters = {}, e._makeLocalGettersCache = Object.create(null);
    var i = e._wrappedGetters, s = {}, a = {}, c = new ee(!0);
    c.run((function() {
        Yi(i, (function(t, n) {
            s[n] = function(e, t) {
                return function() {
                    return e(t);
                };
            }(t, e), a[n] = _o((function() {
                return s[n]();
            })), Object.defineProperty(e.getters, n, {
                get: function() {
                    return a[n].value;
                },
                enumerable: !0
            });
        }));
    })), e._state = at({
        data: t
    }), e._scope = c, e.strict && function(e) {
        kr((function() {
            return e._state.data;
        }), (function() {}), {
            deep: !0,
            flush: "sync"
        });
    }(e), r && n && e._withCommit((function() {
        r.data = null;
    })), o && o.stop();
}

function ns(e, t, n, r, o) {
    var i = !n.length, s = e._modules.getNamespace(n);
    if (r.namespaced && (e._modulesNamespaceMap[s], e._modulesNamespaceMap[s] = r), 
    !i && !o) {
        var a = os(t, n.slice(0, -1)), c = n[n.length - 1];
        e._withCommit((function() {
            a[c] = r.state;
        }));
    }
    var l = r.context = function(e, t, n) {
        var r = "" === t, o = {
            dispatch: r ? e.dispatch : function(n, r, o) {
                var i = is(n, r, o), s = i.payload, a = i.options, c = i.type;
                return a && a.root || (c = t + c), e.dispatch(c, s);
            },
            commit: r ? e.commit : function(n, r, o) {
                var i = is(n, r, o), s = i.payload, a = i.options, c = i.type;
                a && a.root || (c = t + c), e.commit(c, s, a);
            }
        };
        return Object.defineProperties(o, {
            getters: {
                get: r ? function() {
                    return e.getters;
                } : function() {
                    return rs(e, t);
                }
            },
            state: {
                get: function() {
                    return os(e.state, n);
                }
            }
        }), o;
    }(e, s, n);
    r.forEachMutation((function(t, n) {
        !function(e, t, n, r) {
            var o = e._mutations[t] || (e._mutations[t] = []);
            o.push((function(t) {
                n.call(e, r.state, t);
            }));
        }(e, s + n, t, l);
    })), r.forEachAction((function(t, n) {
        var r = t.root ? n : s + n, o = t.handler || t;
        !function(e, t, n, r) {
            var o = e._actions[t] || (e._actions[t] = []);
            o.push((function(t) {
                var o, i = n.call(e, {
                    dispatch: r.dispatch,
                    commit: r.commit,
                    getters: r.getters,
                    state: r.state,
                    rootGetters: e.getters,
                    rootState: e.state
                }, t);
                return (o = i) && "function" == typeof o.then || (i = Promise.resolve(i)), e._devtoolHook ? i.catch((function(t) {
                    throw e._devtoolHook.emit("vuex:error", t), t;
                })) : i;
            }));
        }(e, r, o, l);
    })), r.forEachGetter((function(t, n) {
        !function(e, t, n, r) {
            if (e._wrappedGetters[t]) return;
            e._wrappedGetters[t] = function(e) {
                return n(r.state, r.getters, e.state, e.getters);
            };
        }(e, s + n, t, l);
    })), r.forEachChild((function(r, i) {
        ns(e, t, n.concat(i), r, o);
    }));
}

function rs(e, t) {
    if (!e._makeLocalGettersCache[t]) {
        var n = {}, r = t.length;
        Object.keys(e.getters).forEach((function(o) {
            if (o.slice(0, r) === t) {
                var i = o.slice(r);
                Object.defineProperty(n, i, {
                    get: function() {
                        return e.getters[o];
                    },
                    enumerable: !0
                });
            }
        })), e._makeLocalGettersCache[t] = n;
    }
    return e._makeLocalGettersCache[t];
}

function os(e, t) {
    return t.reduce((function(e, t) {
        return e[t];
    }), e);
}

function is(e, t, n) {
    return Ji(e) && e.type && (n = t, t = e, e = e.type), {
        type: e,
        payload: t,
        options: n
    };
}

var ss = "vuex:mutations", as = "vuex:actions", cs = "vuex", ls = 0;

function us(e, t) {
    Qi({
        id: "org.vuejs.vuex",
        app: e,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [ "vuex bindings" ]
    }, (function(n) {
        n.addTimelineLayer({
            id: ss,
            label: "Vuex Mutations",
            color: fs
        }), n.addTimelineLayer({
            id: as,
            label: "Vuex Actions",
            color: fs
        }), n.addInspector({
            id: cs,
            label: "Vuex",
            icon: "storage",
            treeFilterPlaceholder: "Filter stores..."
        }), n.on.getInspectorTree((function(n) {
            if (n.app === e && n.inspectorId === cs) if (n.filter) {
                var r = [];
                gs(r, t._modules.root, n.filter, ""), n.rootNodes = r;
            } else n.rootNodes = [ hs(t._modules.root, "") ];
        })), n.on.getInspectorState((function(n) {
            if (n.app === e && n.inspectorId === cs) {
                var r = n.nodeId;
                rs(t, r), n.state = function(e, t, n) {
                    t = "root" === n ? t : t[n];
                    var r = Object.keys(t), o = {
                        state: Object.keys(e.state).map((function(t) {
                            return {
                                key: t,
                                editable: !0,
                                value: e.state[t]
                            };
                        }))
                    };
                    if (r.length) {
                        var i = function(e) {
                            var t = {};
                            return Object.keys(e).forEach((function(n) {
                                var r = n.split("/");
                                if (r.length > 1) {
                                    var o = t, i = r.pop();
                                    r.forEach((function(e) {
                                        o[e] || (o[e] = {
                                            _custom: {
                                                value: {},
                                                display: e,
                                                tooltip: "Module",
                                                abstract: !0
                                            }
                                        }), o = o[e]._custom.value;
                                    })), o[i] = ms((function() {
                                        return e[n];
                                    }));
                                } else t[n] = ms((function() {
                                    return e[n];
                                }));
                            })), t;
                        }(t);
                        o.getters = Object.keys(i).map((function(e) {
                            return {
                                key: e.endsWith("/") ? ps(e) : e,
                                editable: !1,
                                value: ms((function() {
                                    return i[e];
                                }))
                            };
                        }));
                    }
                    return o;
                }((o = t._modules, (s = (i = r).split("/").filter((function(e) {
                    return e;
                }))).reduce((function(e, t, n) {
                    var r = e[t];
                    if (!r) throw new Error('Missing module "' + t + '" for path "' + i + '".');
                    return n === s.length - 1 ? r : r._children;
                }), "root" === i ? o : o.root._children)), "root" === r ? t.getters : t._makeLocalGettersCache, r);
            }
            var o, i, s;
        })), n.on.editInspectorState((function(n) {
            if (n.app === e && n.inspectorId === cs) {
                var r = n.nodeId, o = n.path;
                "root" !== r && (o = r.split("/").filter(Boolean).concat(o)), t._withCommit((function() {
                    n.set(t._state.data, o, n.state.value);
                }));
            }
        })), t.subscribe((function(e, t) {
            var r = {};
            e.payload && (r.payload = e.payload), r.state = t, n.notifyComponentUpdate(), n.sendInspectorTree(cs), 
            n.sendInspectorState(cs), n.addTimelineEvent({
                layerId: ss,
                event: {
                    time: Date.now(),
                    title: e.type,
                    data: r
                }
            });
        })), t.subscribeAction({
            before: function(e, t) {
                var r = {};
                e.payload && (r.payload = e.payload), e._id = ls++, e._time = Date.now(), r.state = t, 
                n.addTimelineEvent({
                    layerId: as,
                    event: {
                        time: e._time,
                        title: e.type,
                        groupId: e._id,
                        subtitle: "start",
                        data: r
                    }
                });
            },
            after: function(e, t) {
                var r = {}, o = Date.now() - e._time;
                r.duration = {
                    _custom: {
                        type: "duration",
                        display: o + "ms",
                        tooltip: "Action duration",
                        value: o
                    }
                }, e.payload && (r.payload = e.payload), r.state = t, n.addTimelineEvent({
                    layerId: as,
                    event: {
                        time: Date.now(),
                        title: e.type,
                        groupId: e._id,
                        subtitle: "end",
                        data: r
                    }
                });
            }
        });
    }));
}

var fs = 8702998, ds = {
    label: "namespaced",
    textColor: 16777215,
    backgroundColor: 6710886
};

function ps(e) {
    return e && "root" !== e ? e.split("/").slice(-2, -1)[0] : "Root";
}

function hs(e, t) {
    return {
        id: t || "root",
        label: ps(t),
        tags: e.namespaced ? [ ds ] : [],
        children: Object.keys(e._children).map((function(n) {
            return hs(e._children[n], t + n + "/");
        }))
    };
}

function gs(e, t, n, r) {
    r.includes(n) && e.push({
        id: r || "root",
        label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
        tags: t.namespaced ? [ ds ] : []
    }), Object.keys(t._children).forEach((function(o) {
        gs(e, t._children[o], n, r + o + "/");
    }));
}

function ms(e) {
    try {
        return e();
    } catch (bh) {
        return bh;
    }
}

var vs = function(e, t) {
    this.runtime = t, this._children = Object.create(null), this._rawModule = e;
    var n = e.state;
    this.state = ("function" == typeof n ? n() : n) || {};
}, ys = {
    namespaced: {
        configurable: !0
    }
};

ys.namespaced.get = function() {
    return !!this._rawModule.namespaced;
}, vs.prototype.addChild = function(e, t) {
    this._children[e] = t;
}, vs.prototype.removeChild = function(e) {
    delete this._children[e];
}, vs.prototype.getChild = function(e) {
    return this._children[e];
}, vs.prototype.hasChild = function(e) {
    return e in this._children;
}, vs.prototype.update = function(e) {
    this._rawModule.namespaced = e.namespaced, e.actions && (this._rawModule.actions = e.actions), 
    e.mutations && (this._rawModule.mutations = e.mutations), e.getters && (this._rawModule.getters = e.getters);
}, vs.prototype.forEachChild = function(e) {
    Yi(this._children, e);
}, vs.prototype.forEachGetter = function(e) {
    this._rawModule.getters && Yi(this._rawModule.getters, e);
}, vs.prototype.forEachAction = function(e) {
    this._rawModule.actions && Yi(this._rawModule.actions, e);
}, vs.prototype.forEachMutation = function(e) {
    this._rawModule.mutations && Yi(this._rawModule.mutations, e);
}, Object.defineProperties(vs.prototype, ys);

var bs = function(e) {
    this.register([], e, !1);
};

function ws(e, t, n) {
    if (t.update(n), n.modules) for (var r in n.modules) {
        if (!t.getChild(r)) return;
        ws(e.concat(r), t.getChild(r), n.modules[r]);
    }
}

bs.prototype.get = function(e) {
    return e.reduce((function(e, t) {
        return e.getChild(t);
    }), this.root);
}, bs.prototype.getNamespace = function(e) {
    var t = this.root;
    return e.reduce((function(e, n) {
        return e + ((t = t.getChild(n)).namespaced ? n + "/" : "");
    }), "");
}, bs.prototype.update = function(e) {
    ws([], this.root, e);
}, bs.prototype.register = function(e, t, n) {
    var r = this;
    void 0 === n && (n = !0);
    var o = new vs(t, n);
    0 === e.length ? this.root = o : this.get(e.slice(0, -1)).addChild(e[e.length - 1], o);
    t.modules && Yi(t.modules, (function(t, o) {
        r.register(e.concat(o), t, n);
    }));
}, bs.prototype.unregister = function(e) {
    var t = this.get(e.slice(0, -1)), n = e[e.length - 1], r = t.getChild(n);
    r && r.runtime && t.removeChild(n);
}, bs.prototype.isRegistered = function(e) {
    var t = this.get(e.slice(0, -1)), n = e[e.length - 1];
    return !!t && t.hasChild(n);
};

var Cs = function(e) {
    var t = this;
    void 0 === e && (e = {});
    var n = e.plugins;
    void 0 === n && (n = []);
    var r = e.strict;
    void 0 === r && (r = !1);
    var o = e.devtools;
    this._committing = !1, this._actions = Object.create(null), this._actionSubscribers = [], 
    this._mutations = Object.create(null), this._wrappedGetters = Object.create(null), 
    this._modules = new bs(e), this._modulesNamespaceMap = Object.create(null), this._subscribers = [], 
    this._makeLocalGettersCache = Object.create(null), this._scope = null, this._devtools = o;
    var i = this, s = this.dispatch, a = this.commit;
    this.dispatch = function(e, t) {
        return s.call(i, e, t);
    }, this.commit = function(e, t, n) {
        return a.call(i, e, t, n);
    }, this.strict = r;
    var c = this._modules.root.state;
    ns(this, c, [], this._modules.root), ts(this, c), n.forEach((function(e) {
        return e(t);
    }));
}, xs = {
    state: {
        configurable: !0
    }
};

Cs.prototype.install = function(e, t) {
    e.provide(t || "store", this), e.config.globalProperties.$store = this, void 0 !== this._devtools && this._devtools && us(e, this);
}, xs.state.get = function() {
    return this._state.data;
}, xs.state.set = function(e) {}, Cs.prototype.commit = function(e, t, n) {
    var r = this, o = is(e, t, n), i = o.type, s = o.payload, a = {
        type: i,
        payload: s
    }, c = this._mutations[i];
    c && (this._withCommit((function() {
        c.forEach((function(e) {
            e(s);
        }));
    })), this._subscribers.slice().forEach((function(e) {
        return e(a, r.state);
    })));
}, Cs.prototype.dispatch = function(e, t) {
    var n = this, r = is(e, t), o = r.type, i = r.payload, s = {
        type: o,
        payload: i
    }, a = this._actions[o];
    if (a) {
        try {
            this._actionSubscribers.slice().filter((function(e) {
                return e.before;
            })).forEach((function(e) {
                return e.before(s, n.state);
            }));
        } catch (bh) {}
        var c = a.length > 1 ? Promise.all(a.map((function(e) {
            return e(i);
        }))) : a[0](i);
        return new Promise((function(e, t) {
            c.then((function(t) {
                try {
                    n._actionSubscribers.filter((function(e) {
                        return e.after;
                    })).forEach((function(e) {
                        return e.after(s, n.state);
                    }));
                } catch (bh) {}
                e(t);
            }), (function(e) {
                try {
                    n._actionSubscribers.filter((function(e) {
                        return e.error;
                    })).forEach((function(t) {
                        return t.error(s, n.state, e);
                    }));
                } catch (bh) {}
                t(e);
            }));
        }));
    }
}, Cs.prototype.subscribe = function(e, t) {
    return Zi(e, this._subscribers, t);
}, Cs.prototype.subscribeAction = function(e, t) {
    return Zi("function" == typeof e ? {
        before: e
    } : e, this._actionSubscribers, t);
}, Cs.prototype.watch = function(e, t, n) {
    var r = this;
    return kr((function() {
        return e(r.state, r.getters);
    }), t, Object.assign({}, n));
}, Cs.prototype.replaceState = function(e) {
    var t = this;
    this._withCommit((function() {
        t._state.data = e;
    }));
}, Cs.prototype.registerModule = function(e, t, n) {
    void 0 === n && (n = {}), "string" == typeof e && (e = [ e ]), this._modules.register(e, t), 
    ns(this, this.state, e, this._modules.get(e), n.preserveState), ts(this, this.state);
}, Cs.prototype.unregisterModule = function(e) {
    var t = this;
    "string" == typeof e && (e = [ e ]), this._modules.unregister(e), this._withCommit((function() {
        delete os(t.state, e.slice(0, -1))[e[e.length - 1]];
    })), es(this);
}, Cs.prototype.hasModule = function(e) {
    return "string" == typeof e && (e = [ e ]), this._modules.isRegistered(e);
}, Cs.prototype.hotUpdate = function(e) {
    this._modules.update(e), es(this, !0);
}, Cs.prototype._withCommit = function(e) {
    var t = this._committing;
    this._committing = !0, e(), this._committing = t;
}, Object.defineProperties(Cs.prototype, xs);

var Ss = Es((function(e, t) {
    var n = {};
    return Os(t).forEach((function(t) {
        var r = t.key, o = t.val;
        n[r] = function() {
            var t = this.$store.state, n = this.$store.getters;
            if (e) {
                var r = As(this.$store, "mapState", e);
                if (!r) return;
                t = r.context.state, n = r.context.getters;
            }
            return "function" == typeof o ? o.call(this, t, n) : t[o];
        }, n[r].vuex = !0;
    })), n;
})), _s = Es((function(e, t) {
    var n = {};
    return Os(t).forEach((function(t) {
        var r = t.key, o = t.val;
        o = e + o, n[r] = function() {
            if (!e || As(this.$store, "mapGetters", e)) return this.$store.getters[o];
        }, n[r].vuex = !0;
    })), n;
})), ks = Es((function(e, t) {
    var n = {};
    return Os(t).forEach((function(t) {
        var r = t.key, o = t.val;
        n[r] = function() {
            for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n];
            var r = this.$store.dispatch;
            if (e) {
                var i = As(this.$store, "mapActions", e);
                if (!i) return;
                r = i.context.dispatch;
            }
            return "function" == typeof o ? o.apply(this, [ r ].concat(t)) : r.apply(this.$store, [ o ].concat(t));
        };
    })), n;
}));

function Os(e) {
    return function(e) {
        return Array.isArray(e) || Ji(e);
    }(e) ? Array.isArray(e) ? e.map((function(e) {
        return {
            key: e,
            val: e
        };
    })) : Object.keys(e).map((function(t) {
        return {
            key: t,
            val: e[t]
        };
    })) : [];
}

function Es(e) {
    return function(t, n) {
        return "string" != typeof t ? (n = t, t = "") : "/" !== t.charAt(t.length - 1) && (t += "/"), 
        e(t, n);
    };
}

function As(e, t, n) {
    return e._modulesNamespaceMap[n];
}

const Is = {
    name: "AdminNotices",
    computed: {
        ...Ss([ "notices" ]),
        activeNotices() {
            return this.notices.filter((e => e.status));
        }
    },
    methods: {
        ...ks([ "fetchNotices", "dismissNotice" ]),
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
}, Ps = {
    class: "admin-notices"
}, js = {
    class: "notice-header"
}, Ts = {
    class: "notice-title"
}, Ns = [ "onClick" ], Ls = {
    class: "notice-content"
}, Ms = {
    class: "notice-description"
}, Fs = {
    key: 0,
    class: "notice-action"
}, Ds = [ "href" ];

const Rs = {
    class: "app-header"
};

const Bs = {
    id: "pathwise-badge-connect-container"
};

const $s = Vi({
    name: "App",
    components: {
        "app-header": Vi({
            name: "Header",
            components: {
                NavBar: Ui,
                AdminNotices: Vi(Is, [ [ "render", function(e, t, n, r, o, i) {
                    const s = In("font-awesome-icon");
                    return Wr(), Hr("div", Ps, [ to(Ci, {
                        name: "notice",
                        tag: "div"
                    }, {
                        default: Qt((() => [ (Wr(!0), Hr(Rr, null, Tn(i.activeNotices, (e => (Wr(), Hr("div", {
                            key: e.id,
                            class: U([ "notice-card", e.type.toLowerCase() ])
                        }, [ eo("div", js, [ eo("div", Ts, X(e.subject), 1), eo("button", {
                            class: "dismiss-button",
                            onClick: t => i.dismissNotice(e.id)
                        }, [ t[0] || (t[0] = eo("span", {
                            class: "dismiss-label"
                        }, "Dismiss", -1)), to(s, {
                            icon: "times"
                        }) ], 8, Ns) ]), eo("div", Ls, [ eo("div", Ms, X(e.description), 1), e.action ? (Wr(), 
                        Hr("div", Fs, [ eo("a", {
                            href: e.action,
                            class: "action-button"
                        }, "Take Action", 8, Ds) ])) : oo("", !0) ]) ], 2)))), 128)) ])),
                        _: 1
                    }) ]);
                } ], [ "__scopeId", "data-v-0c138ccc" ] ])
            }
        }, [ [ "render", function(e, t, n, r, o, i) {
            const s = In("admin-notices"), a = In("nav-bar");
            return Wr(), Hr("header", Rs, [ t[0] || (t[0] = eo("h1", {
                class: "app-title"
            }, "Pathwise Badge Connect", -1)), t[1] || (t[1] = eo("h2", {
                class: "app-sub-title"
            }, "by Pathwise Solutions Inc.", -1)), to(s), to(a) ]);
        } ] ])
    }
}, [ [ "render", function(e, t, n, r, o, i) {
    const s = In("app-header"), a = In("router-view");
    return Wr(), Hr("div", Bs, [ to(s), eo("main", null, [ to(a) ]) ]);
} ] ]), Vs = "undefined" != typeof document;

function zs(e) {
    return "object" == typeof e || "displayName" in e || "props" in e || "__vccOpts" in e;
}

const Us = Object.assign;

function Ws(e, t) {
    const n = {};
    for (const r in t) {
        const o = t[r];
        n[r] = qs(o) ? o.map(e) : e(o);
    }
    return n;
}

const Gs = () => {}, qs = Array.isArray, Ks = /#/g, Hs = /&/g, Xs = /\//g, Qs = /=/g, Ys = /\?/g, Js = /\+/g, Zs = /%5B/g, ea = /%5D/g, ta = /%5E/g, na = /%60/g, ra = /%7B/g, oa = /%7C/g, ia = /%7D/g, sa = /%20/g;

function aa(e) {
    return encodeURI("" + e).replace(oa, "|").replace(Zs, "[").replace(ea, "]");
}

function ca(e) {
    return aa(e).replace(Js, "%2B").replace(sa, "+").replace(Ks, "%23").replace(Hs, "%26").replace(na, "`").replace(ra, "{").replace(ia, "}").replace(ta, "^");
}

function la(e) {
    return null == e ? "" : function(e) {
        return aa(e).replace(Ks, "%23").replace(Ys, "%3F");
    }(e).replace(Xs, "%2F");
}

function ua(e) {
    try {
        return decodeURIComponent("" + e);
    } catch (t) {}
    return "" + e;
}

const fa = /\/$/;

function da(e, t, n = "/") {
    let r, o = {}, i = "", s = "";
    const a = t.indexOf("#");
    let c = t.indexOf("?");
    return a < c && a >= 0 && (c = -1), c > -1 && (r = t.slice(0, c), i = t.slice(c + 1, a > -1 ? a : t.length), 
    o = e(i)), a > -1 && (r = r || t.slice(0, a), s = t.slice(a, t.length)), r = function(e, t) {
        if (e.startsWith("/")) return e;
        if (!e) return t;
        const n = t.split("/"), r = e.split("/"), o = r[r.length - 1];
        ".." !== o && "." !== o || r.push("");
        let i, s, a = n.length - 1;
        for (i = 0; i < r.length; i++) if (s = r[i], "." !== s) {
            if (".." !== s) break;
            a > 1 && a--;
        }
        return n.slice(0, a).join("/") + "/" + r.slice(i).join("/");
    }(null != r ? r : t, n), {
        fullPath: r + (i && "?") + i + s,
        path: r,
        query: o,
        hash: ua(s)
    };
}

function pa(e, t) {
    return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e;
}

function ha(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}

function ga(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!ma(e[n], t[n])) return !1;
    return !0;
}

function ma(e, t) {
    return qs(e) ? va(e, t) : qs(t) ? va(t, e) : e === t;
}

function va(e, t) {
    return qs(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t;
}

const ya = {
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

var ba, wa, Ca, xa;

function Sa(e) {
    if (!e) if (Vs) {
        const t = document.querySelector("base");
        e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "");
    } else e = "/";
    return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(fa, "");
}

(wa = ba || (ba = {})).pop = "pop", wa.push = "push", (xa = Ca || (Ca = {})).back = "back", 
xa.forward = "forward", xa.unknown = "";

const _a = /^[^#]+#/;

function ka(e, t) {
    return e.replace(_a, "#") + t;
}

const Oa = () => ({
    left: window.scrollX,
    top: window.scrollY
});

function Ea(e) {
    let t;
    if ("el" in e) {
        const n = e.el, r = "string" == typeof n && n.startsWith("#"), o = "string" == typeof n ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!o) return;
        t = function(e, t) {
            const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
            return {
                behavior: t.behavior,
                left: r.left - n.left - (t.left || 0),
                top: r.top - n.top - (t.top || 0)
            };
        }(o, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.scrollX, null != t.top ? t.top : window.scrollY);
}

function Aa(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}

const Ia = new Map;

function Pa(e, t) {
    const {pathname: n, search: r, hash: o} = t, i = e.indexOf("#");
    if (i > -1) {
        let t = o.includes(e.slice(i)) ? e.slice(i).length : 1, n = o.slice(t);
        return "/" !== n[0] && (n = "/" + n), pa(n, "");
    }
    return pa(n, e) + r + o;
}

function ja(e, t, n, r = !1, o = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: o ? Oa() : null
    };
}

function Ta(e) {
    const {history: t, location: n} = window, r = {
        value: Pa(e, n)
    }, o = {
        value: t.state
    };
    function i(r, i, s) {
        const a = e.indexOf("#"), c = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + r : location.protocol + "//" + location.host + e + r;
        try {
            t[s ? "replaceState" : "pushState"](i, "", c), o.value = i;
        } catch (l) {
            console.error(l), n[s ? "replace" : "assign"](c);
        }
    }
    return o.value || i(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0), {
        location: r,
        state: o,
        push: function(e, n) {
            const s = Us({}, o.value, t.state, {
                forward: e,
                scroll: Oa()
            });
            i(s.current, s, !0), i(e, Us({}, ja(r.value, e, null), {
                position: s.position + 1
            }, n), !1), r.value = e;
        },
        replace: function(e, n) {
            i(e, Us({}, t.state, ja(o.value.back, e, o.value.forward, !0), n, {
                position: o.value.position
            }), !0), r.value = e;
        }
    };
}

function Na(e) {
    const t = Ta(e = Sa(e)), n = function(e, t, n, r) {
        let o = [], i = [], s = null;
        const a = ({state: i}) => {
            const a = Pa(e, location), c = n.value, l = t.value;
            let u = 0;
            if (i) {
                if (n.value = a, t.value = i, s && s === c) return void (s = null);
                u = l ? i.position - l.position : 0;
            } else r(a);
            o.forEach((e => {
                e(n.value, c, {
                    delta: u,
                    type: ba.pop,
                    direction: u ? u > 0 ? Ca.forward : Ca.back : Ca.unknown
                });
            }));
        };
        function c() {
            const {history: e} = window;
            e.state && e.replaceState(Us({}, e.state, {
                scroll: Oa()
            }), "");
        }
        return window.addEventListener("popstate", a), window.addEventListener("beforeunload", c, {
            passive: !0
        }), {
            pauseListeners: function() {
                s = n.value;
            },
            listen: function(e) {
                o.push(e);
                const t = () => {
                    const t = o.indexOf(e);
                    t > -1 && o.splice(t, 1);
                };
                return i.push(t), t;
            },
            destroy: function() {
                for (const e of i) e();
                i = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", c);
            }
        };
    }(e, t.state, t.location, t.replace);
    const r = Us({
        location: "",
        base: e,
        go: function(e, t = !0) {
            t || n.pauseListeners(), history.go(e);
        },
        createHref: ka.bind(null, e)
    }, t, n);
    return Object.defineProperty(r, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(r, "state", {
        enumerable: !0,
        get: () => t.state.value
    }), r;
}

function La(e) {
    return "string" == typeof e || "symbol" == typeof e;
}

const Ma = Symbol("");

var Fa, Da;

function Ra(e, t) {
    return Us(new Error, {
        type: e,
        [Ma]: !0
    }, t);
}

function Ba(e, t) {
    return e instanceof Error && Ma in e && (null == t || !!(e.type & t));
}

(Da = Fa || (Fa = {}))[Da.aborted = 4] = "aborted", Da[Da.cancelled = 8] = "cancelled", 
Da[Da.duplicated = 16] = "duplicated";

const $a = "[^/]+?", Va = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}, za = /[.+*?^${}()[\]/\\]/g;

function Ua(e, t) {
    let n = 0;
    for (;n < e.length && n < t.length; ) {
        const r = t[n] - e[n];
        if (r) return r;
        n++;
    }
    return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0;
}

function Wa(e, t) {
    let n = 0;
    const r = e.score, o = t.score;
    for (;n < r.length && n < o.length; ) {
        const e = Ua(r[n], o[n]);
        if (e) return e;
        n++;
    }
    if (1 === Math.abs(o.length - r.length)) {
        if (Ga(r)) return 1;
        if (Ga(o)) return -1;
    }
    return o.length - r.length;
}

function Ga(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}

const qa = {
    type: 0,
    value: ""
}, Ka = /[a-zA-Z0-9_]/;

function Ha(e, t, n) {
    const r = function(e, t) {
        const n = Us({}, Va, t), r = [];
        let o = n.start ? "^" : "";
        const i = [];
        for (const c of e) {
            const e = c.length ? [] : [ 90 ];
            n.strict && !c.length && (o += "/");
            for (let t = 0; t < c.length; t++) {
                const r = c[t];
                let s = 40 + (n.sensitive ? .25 : 0);
                if (0 === r.type) t || (o += "/"), o += r.value.replace(za, "\\$&"), s += 40; else if (1 === r.type) {
                    const {value: e, repeatable: n, optional: l, regexp: u} = r;
                    i.push({
                        name: e,
                        repeatable: n,
                        optional: l
                    });
                    const f = u || $a;
                    if (f !== $a) {
                        s += 10;
                        try {
                            new RegExp(`(${f})`);
                        } catch (a) {
                            throw new Error(`Invalid custom RegExp for param "${e}" (${f}): ` + a.message);
                        }
                    }
                    let d = n ? `((?:${f})(?:/(?:${f}))*)` : `(${f})`;
                    t || (d = l && c.length < 2 ? `(?:/${d})` : "/" + d), l && (d += "?"), o += d, s += 20, 
                    l && (s += -8), n && (s += -20), ".*" === f && (s += -50);
                }
                e.push(s);
            }
            r.push(e);
        }
        if (n.strict && n.end) {
            const e = r.length - 1;
            r[e][r[e].length - 1] += .7000000000000001;
        }
        n.strict || (o += "/?"), n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
        const s = new RegExp(o, n.sensitive ? "" : "i");
        return {
            re: s,
            score: r,
            keys: i,
            parse: function(e) {
                const t = e.match(s), n = {};
                if (!t) return null;
                for (let r = 1; r < t.length; r++) {
                    const e = t[r] || "", o = i[r - 1];
                    n[o.name] = e && o.repeatable ? e.split("/") : e;
                }
                return n;
            },
            stringify: function(t) {
                let n = "", r = !1;
                for (const o of e) {
                    r && n.endsWith("/") || (n += "/"), r = !1;
                    for (const e of o) if (0 === e.type) n += e.value; else if (1 === e.type) {
                        const {value: i, repeatable: s, optional: a} = e, c = i in t ? t[i] : "";
                        if (qs(c) && !s) throw new Error(`Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`);
                        const l = qs(c) ? c.join("/") : c;
                        if (!l) {
                            if (!a) throw new Error(`Missing required param "${i}"`);
                            o.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : r = !0);
                        }
                        n += l;
                    }
                }
                return n || "/";
            }
        };
    }(function(e) {
        if (!e) return [ [] ];
        if ("/" === e) return [ [ qa ] ];
        if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
        function t(e) {
            throw new Error(`ERR (${n})/"${l}": ${e}`);
        }
        let n = 0, r = n;
        const o = [];
        let i;
        function s() {
            i && o.push(i), i = [];
        }
        let a, c = 0, l = "", u = "";
        function f() {
            l && (0 === n ? i.push({
                type: 0,
                value: l
            }) : 1 === n || 2 === n || 3 === n ? (i.length > 1 && ("*" === a || "+" === a) && t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`), 
            i.push({
                type: 1,
                value: l,
                regexp: u,
                repeatable: "*" === a || "+" === a,
                optional: "*" === a || "?" === a
            })) : t("Invalid state to consume buffer"), l = "");
        }
        function d() {
            l += a;
        }
        for (;c < e.length; ) if (a = e[c++], "\\" !== a || 2 === n) switch (n) {
          case 0:
            "/" === a ? (l && f(), s()) : ":" === a ? (f(), n = 1) : d();
            break;

          case 4:
            d(), n = r;
            break;

          case 1:
            "(" === a ? n = 2 : Ka.test(a) ? d() : (f(), n = 0, "*" !== a && "?" !== a && "+" !== a && c--);
            break;

          case 2:
            ")" === a ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + a : n = 3 : u += a;
            break;

          case 3:
            f(), n = 0, "*" !== a && "?" !== a && "+" !== a && c--, u = "";
            break;

          default:
            t("Unknown state");
        } else r = n, n = 4;
        return 2 === n && t(`Unfinished custom RegExp for param "${l}"`), f(), s(), o;
    }(e.path), n), o = Us(r, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}

function Xa(e, t) {
    const n = [], r = new Map;
    function o(e, n, r) {
        const a = !r, c = Ya(e);
        c.aliasOf = r && r.record;
        const l = tc(t, e), u = [ c ];
        if ("alias" in e) {
            const t = "string" == typeof e.alias ? [ e.alias ] : e.alias;
            for (const e of t) u.push(Ya(Us({}, c, {
                components: r ? r.record.components : c.components,
                path: e,
                aliasOf: r ? r.record : c
            })));
        }
        let f, d;
        for (const t of u) {
            const {path: u} = t;
            if (n && "/" !== u[0]) {
                const e = n.record.path, r = "/" === e[e.length - 1] ? "" : "/";
                t.path = n.record.path + (u && r + u);
            }
            if (f = Ha(t, n, l), r ? r.alias.push(f) : (d = d || f, d !== f && d.alias.push(f), 
            a && e.name && !Za(f) && i(e.name)), nc(f) && s(f), c.children) {
                const e = c.children;
                for (let t = 0; t < e.length; t++) o(e[t], f, r && r.children[t]);
            }
            r = r || f;
        }
        return d ? () => {
            i(d);
        } : Gs;
    }
    function i(e) {
        if (La(e)) {
            const t = r.get(e);
            t && (r.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(i), t.alias.forEach(i));
        } else {
            const t = n.indexOf(e);
            t > -1 && (n.splice(t, 1), e.record.name && r.delete(e.record.name), e.children.forEach(i), 
            e.alias.forEach(i));
        }
    }
    function s(e) {
        const t = function(e, t) {
            let n = 0, r = t.length;
            for (;n !== r; ) {
                const o = n + r >> 1;
                Wa(e, t[o]) < 0 ? r = o : n = o + 1;
            }
            const o = function(e) {
                let t = e;
                for (;t = t.parent; ) if (nc(t) && 0 === Wa(e, t)) return t;
                return;
            }(e);
            o && (r = t.lastIndexOf(o, r - 1));
            return r;
        }(e, n);
        n.splice(t, 0, e), e.record.name && !Za(e) && r.set(e.record.name, e);
    }
    return t = tc({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t), e.forEach((e => o(e))), {
        addRoute: o,
        resolve: function(e, t) {
            let o, i, s, a = {};
            if ("name" in e && e.name) {
                if (o = r.get(e.name), !o) throw Ra(1, {
                    location: e
                });
                s = o.record.name, a = Us(Qa(t.params, o.keys.filter((e => !e.optional)).concat(o.parent ? o.parent.keys.filter((e => e.optional)) : []).map((e => e.name))), e.params && Qa(e.params, o.keys.map((e => e.name)))), 
                i = o.stringify(a);
            } else if (null != e.path) i = e.path, o = n.find((e => e.re.test(i))), o && (a = o.parse(i), 
            s = o.record.name); else {
                if (o = t.name ? r.get(t.name) : n.find((e => e.re.test(t.path))), !o) throw Ra(1, {
                    location: e,
                    currentLocation: t
                });
                s = o.record.name, a = Us({}, t.params, e.params), i = o.stringify(a);
            }
            const c = [];
            let l = o;
            for (;l; ) c.unshift(l.record), l = l.parent;
            return {
                name: s,
                path: i,
                params: a,
                matched: c,
                meta: ec(c)
            };
        },
        removeRoute: i,
        clearRoutes: function() {
            n.length = 0, r.clear();
        },
        getRoutes: function() {
            return n;
        },
        getRecordMatcher: function(e) {
            return r.get(e);
        }
    };
}

function Qa(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n;
}

function Ya(e) {
    const t = {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: e.aliasOf,
        beforeEnter: e.beforeEnter,
        props: Ja(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in e ? e.components || null : e.component && {
            default: e.component
        }
    };
    return Object.defineProperty(t, "mods", {
        value: {}
    }), t;
}

function Ja(e) {
    const t = {}, n = e.props || !1;
    if ("component" in e) t.default = n; else for (const r in e.components) t[r] = "object" == typeof n ? n[r] : n;
    return t;
}

function Za(e) {
    for (;e; ) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}

function ec(e) {
    return e.reduce(((e, t) => Us(e, t.meta)), {});
}

function tc(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n;
}

function nc({record: e}) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}

function rc(e) {
    const t = {};
    if ("" === e || "?" === e) return t;
    const n = ("?" === e[0] ? e.slice(1) : e).split("&");
    for (let r = 0; r < n.length; ++r) {
        const e = n[r].replace(Js, " "), o = e.indexOf("="), i = ua(o < 0 ? e : e.slice(0, o)), s = o < 0 ? null : ua(e.slice(o + 1));
        if (i in t) {
            let e = t[i];
            qs(e) || (e = t[i] = [ e ]), e.push(s);
        } else t[i] = s;
    }
    return t;
}

function oc(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = ca(n).replace(Qs, "%3D"), null == r) {
            void 0 !== r && (t += (t.length ? "&" : "") + n);
            continue;
        }
        (qs(r) ? r.map((e => e && ca(e))) : [ r && ca(r) ]).forEach((e => {
            void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e));
        }));
    }
    return t;
}

function ic(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        void 0 !== r && (t[n] = qs(r) ? r.map((e => null == e ? null : "" + e)) : null == r ? r : "" + r);
    }
    return t;
}

const sc = Symbol(""), ac = Symbol(""), cc = Symbol(""), lc = Symbol(""), uc = Symbol("");

function fc() {
    let e = [];
    return {
        add: function(t) {
            return e.push(t), () => {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
            };
        },
        list: () => e.slice(),
        reset: function() {
            e = [];
        }
    };
}

function dc(e, t, n, r, o, i = e => e()) {
    const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () => new Promise(((a, c) => {
        const l = e => {
            var i;
            !1 === e ? c(Ra(4, {
                from: n,
                to: t
            })) : e instanceof Error ? c(e) : "string" == typeof (i = e) || i && "object" == typeof i ? c(Ra(2, {
                from: t,
                to: e
            })) : (s && r.enterCallbacks[o] === s && "function" == typeof e && s.push(e), a());
        }, u = i((() => e.call(r && r.instances[o], t, n, l)));
        let f = Promise.resolve(u);
        e.length < 3 && (f = f.then(l)), f.catch((e => c(e)));
    }));
}

function pc(e, t, n, r, o = e => e()) {
    const i = [];
    for (const s of e) for (const e in s.components) {
        let a = s.components[e];
        if ("beforeRouteEnter" === t || s.instances[e]) if (zs(a)) {
            const c = (a.__vccOpts || a)[t];
            c && i.push(dc(c, n, r, s, e, o));
        } else {
            let c = a();
            i.push((() => c.then((i => {
                if (!i) throw new Error(`Couldn't resolve component "${e}" at "${s.path}"`);
                const a = (c = i).__esModule || "Module" === c[Symbol.toStringTag] || c.default && zs(c.default) ? i.default : i;
                var c;
                s.mods[e] = i, s.components[e] = a;
                const l = (a.__vccOpts || a)[t];
                return l && dc(l, n, r, s, e, o)();
            }))));
        }
    }
    return i;
}

function hc(e) {
    const t = tr(cc), n = tr(lc), r = _o((() => {
        const n = Ct(e.to);
        return t.resolve(n);
    })), o = _o((() => {
        const {matched: e} = r.value, {length: t} = e, o = e[t - 1], i = n.matched;
        if (!o || !i.length) return -1;
        const s = i.findIndex(ha.bind(null, o));
        if (s > -1) return s;
        const a = vc(e[t - 2]);
        return t > 1 && vc(o) === a && i[i.length - 1].path !== a ? i.findIndex(ha.bind(null, e[t - 2])) : s;
    })), i = _o((() => o.value > -1 && function(e, t) {
        for (const n in t) {
            const r = t[n], o = e[n];
            if ("string" == typeof r) {
                if (r !== o) return !1;
            } else if (!qs(o) || o.length !== r.length || r.some(((e, t) => e !== o[t]))) return !1;
        }
        return !0;
    }(n.params, r.value.params))), s = _o((() => o.value > -1 && o.value === n.matched.length - 1 && ga(n.params, r.value.params)));
    return {
        route: r,
        href: _o((() => r.value.href)),
        isActive: i,
        isExactActive: s,
        navigate: function(n = {}) {
            if (function(e) {
                if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
                if (e.defaultPrevented) return;
                if (void 0 !== e.button && 0 !== e.button) return;
                if (e.currentTarget && e.currentTarget.getAttribute) {
                    const t = e.currentTarget.getAttribute("target");
                    if (/\b_blank\b/i.test(t)) return;
                }
                e.preventDefault && e.preventDefault();
                return !0;
            }(n)) {
                const n = t[Ct(e.replace) ? "replace" : "push"](Ct(e.to)).catch(Gs);
                return e.viewTransition && "undefined" != typeof document && "startViewTransition" in document && document.startViewTransition((() => n)), 
                n;
            }
            return Promise.resolve();
        }
    };
}

const gc = cn({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [ String, Object ],
            required: !0
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
    useLink: hc,
    setup(e, {slots: t}) {
        const n = at(hc(e)), {options: r} = tr(cc), o = _o((() => ({
            [yc(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [yc(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        })));
        return () => {
            const r = t.default && (1 === (i = t.default(n)).length ? i[0] : i);
            var i;
            return e.custom ? r : ko("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value
            }, r);
        };
    }
}), mc = gc;

function vc(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}

const yc = (e, t, n) => null != e ? e : null != t ? t : n;

function bc(e, t) {
    if (!e) return null;
    const n = e(t);
    return 1 === n.length ? n[0] : n;
}

const wc = cn({
    name: "RouterView",
    inheritAttrs: !1,
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
        const r = tr(uc), o = _o((() => e.route || r.value)), i = tr(ac, 0), s = _o((() => {
            let e = Ct(i);
            const {matched: t} = o.value;
            let n;
            for (;(n = t[e]) && !n.components; ) e++;
            return e;
        })), a = _o((() => o.value.matched[s.value]));
        er(ac, _o((() => s.value + 1))), er(sc, a), er(uc, o);
        const c = bt(l, !1);
        var l;
        return kr((() => [ c.value, a.value, e.name ]), (([e, t, n], [r, o, i]) => {
            t && (t.instances[n] = e, o && o !== t && e && e === r && (t.leaveGuards.size || (t.leaveGuards = o.leaveGuards), 
            t.updateGuards.size || (t.updateGuards = o.updateGuards))), !e || !t || o && ha(t, o) && r || (t.enterCallbacks[n] || []).forEach((t => t(e)));
        }), {
            flush: "post"
        }), () => {
            const r = o.value, i = e.name, s = a.value, l = s && s.components[i];
            if (!l) return bc(n.default, {
                Component: l,
                route: r
            });
            const u = s.props[i], f = u ? !0 === u ? r.params : "function" == typeof u ? u(r) : u : null, d = ko(l, Us({}, f, t, {
                onVnodeUnmounted: e => {
                    e.component.isUnmounted && (s.instances[i] = null);
                },
                ref: c
            }));
            return bc(n.default, {
                Component: d,
                route: r
            }) || d;
        };
    }
});

function Cc(e, t, n) {
    return (t = function(e) {
        var t = function(e, t) {
            if ("object" != typeof e || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(e, t);
                if ("object" != typeof r) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
        }(e, "string");
        return "symbol" == typeof t ? t : t + "";
    }(t)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function xc(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        }))), n.push.apply(n, r);
    }
    return n;
}

function Sc(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? xc(Object(n), !0).forEach((function(t) {
            Cc(e, t, n[t]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xc(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        }));
    }
    return e;
}

const _c = () => {};

let kc = {}, Oc = {}, Ec = null, Ac = {
    mark: _c,
    measure: _c
};

try {
    "undefined" != typeof window && (kc = window), "undefined" != typeof document && (Oc = document), 
    "undefined" != typeof MutationObserver && (Ec = MutationObserver), "undefined" != typeof performance && (Ac = performance);
} catch (bh) {}

const {userAgent: Ic = ""} = kc.navigator || {}, Pc = kc, jc = Oc, Tc = Ec, Nc = Ac;

Pc.document;

const Lc = !!jc.documentElement && !!jc.head && "function" == typeof jc.addEventListener && "function" == typeof jc.createElement, Mc = ~Ic.indexOf("MSIE") || ~Ic.indexOf("Trident/");

var Fc = {
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
}, Dc = [ "fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone" ], Rc = "classic", Bc = "duotone", $c = [ Rc, Bc, "sharp", "sharp-duotone" ], Vc = new Map([ [ "classic", {
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
} ] ]), zc = [ "fak", "fa-kit", "fakd", "fa-kit-duotone" ], Uc = {
    fak: "kit",
    "fa-kit": "kit"
}, Wc = {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
}, Gc = [ "fak", "fakd" ], qc = {
    kit: "fak"
}, Kc = {
    "kit-duotone": "fakd"
}, Hc = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, Xc = [ "fak", "fa-kit", "fakd", "fa-kit-duotone" ], Qc = {
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
}, Yc = [ "fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", "fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone", "fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands" ], Jc = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], Zc = Jc.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), el = [ ...Object.keys({
    classic: [ "fas", "far", "fal", "fat", "fad" ],
    duotone: [ "fadr", "fadl", "fadt" ],
    sharp: [ "fass", "fasr", "fasl", "fast" ],
    "sharp-duotone": [ "fasds", "fasdr", "fasdl", "fasdt" ]
}), "solid", "regular", "light", "thin", "duotone", "brands", "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Hc.GROUP, Hc.SWAP_OPACITY, Hc.PRIMARY, Hc.SECONDARY ].concat(Jc.map((e => "".concat(e, "x")))).concat(Zc.map((e => "w-".concat(e))));

const tl = "___FONT_AWESOME___", nl = 16, rl = "svg-inline--fa", ol = "data-fa-i2svg", il = "data-fa-pseudo-element", sl = "data-prefix", al = "data-icon", cl = "fontawesome-i2svg", ll = [ "HTML", "HEAD", "STYLE", "SCRIPT" ], ul = (() => {
    try {
        return !0;
    } catch (e) {
        return !1;
    }
})();

function fl(e) {
    return new Proxy(e, {
        get: (e, t) => t in e ? e[t] : e[Rc]
    });
}

const dl = Sc({}, Fc);

dl[Rc] = Sc(Sc(Sc(Sc({}, {
    "fa-duotone": "duotone"
}), Fc[Rc]), Uc), Wc);

const pl = fl(dl), hl = Sc({}, {
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
});

hl[Rc] = Sc(Sc(Sc(Sc({}, {
    duotone: "fad"
}), hl[Rc]), qc), Kc);

const gl = fl(hl), ml = Sc({}, Qc);

ml[Rc] = Sc(Sc({}, ml[Rc]), {
    fak: "fa-kit"
});

const vl = fl(ml), yl = Sc({}, {
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
});

yl[Rc] = Sc(Sc({}, yl[Rc]), {
    "fa-kit": "fak"
}), fl(yl);

const bl = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/, wl = "fa-layers-text", Cl = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;

fl(Sc({}, {
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
}));

const xl = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], Sl = {
    GROUP: "duotone-group",
    PRIMARY: "primary",
    SECONDARY: "secondary"
}, _l = [ "kit", ...el ], kl = Pc.FontAwesomeConfig || {};

if (jc && "function" == typeof jc.querySelector) {
    [ [ "data-family-prefix", "familyPrefix" ], [ "data-css-prefix", "cssPrefix" ], [ "data-family-default", "familyDefault" ], [ "data-style-default", "styleDefault" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-mutate-approach", "mutateApproach" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ].forEach((e => {
        let [t, n] = e;
        const r = function(e) {
            return "" === e || "false" !== e && ("true" === e || e);
        }(function(e) {
            var t = jc.querySelector("script[" + e + "]");
            if (t) return t.getAttribute(e);
        }(t));
        null != r && (kl[n] = r);
    }));
}

const Ol = {
    styleDefault: "solid",
    familyDefault: Rc,
    cssPrefix: "fa",
    replacementClass: rl,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: "async",
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0
};

kl.familyPrefix && (kl.cssPrefix = kl.familyPrefix);

const El = Sc(Sc({}, Ol), kl);

El.autoReplaceSvg || (El.observeMutations = !1);

const Al = {};

Object.keys(Ol).forEach((e => {
    Object.defineProperty(Al, e, {
        enumerable: !0,
        set: function(t) {
            El[e] = t, Il.forEach((e => e(Al)));
        },
        get: function() {
            return El[e];
        }
    });
})), Object.defineProperty(Al, "familyPrefix", {
    enumerable: !0,
    set: function(e) {
        El.cssPrefix = e, Il.forEach((e => e(Al)));
    },
    get: function() {
        return El.cssPrefix;
    }
}), Pc.FontAwesomeConfig = Al;

const Il = [];

const Pl = nl, jl = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: !1,
    flipY: !1
};

function Tl() {
    let e = 12, t = "";
    for (;e-- > 0; ) t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[62 * Math.random() | 0];
    return t;
}

function Nl(e) {
    const t = [];
    for (let n = (e || []).length >>> 0; n--; ) t[n] = e[n];
    return t;
}

function Ll(e) {
    return e.classList ? Nl(e.classList) : (e.getAttribute("class") || "").split(" ").filter((e => e));
}

function Ml(e) {
    return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function Fl(e) {
    return Object.keys(e || {}).reduce(((t, n) => t + "".concat(n, ": ").concat(e[n].trim(), ";")), "");
}

function Dl(e) {
    return e.size !== jl.size || e.x !== jl.x || e.y !== jl.y || e.rotate !== jl.rotate || e.flipX || e.flipY;
}

function Rl() {
    const e = "fa", t = rl, n = Al.cssPrefix, r = Al.replacementClass;
    let o = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}';
    if (n !== e || r !== t) {
        const i = new RegExp("\\.".concat(e, "\\-"), "g"), s = new RegExp("\\--".concat(e, "\\-"), "g"), a = new RegExp("\\.".concat(t), "g");
        o = o.replace(i, ".".concat(n, "-")).replace(s, "--".concat(n, "-")).replace(a, ".".concat(r));
    }
    return o;
}

let Bl = !1;

function $l() {
    Al.autoAddCss && !Bl && (!function(e) {
        if (!e || !Lc) return;
        const t = jc.createElement("style");
        t.setAttribute("type", "text/css"), t.innerHTML = e;
        const n = jc.head.childNodes;
        let r = null;
        for (let o = n.length - 1; o > -1; o--) {
            const e = n[o], t = (e.tagName || "").toUpperCase();
            [ "STYLE", "LINK" ].indexOf(t) > -1 && (r = e);
        }
        jc.head.insertBefore(t, r);
    }(Rl()), Bl = !0);
}

var Vl = {
    mixout: () => ({
        dom: {
            css: Rl,
            insertCss: $l
        }
    }),
    hooks: () => ({
        beforeDOMElementCreation() {
            $l();
        },
        beforeI2svg() {
            $l();
        }
    })
};

const zl = Pc || {};

zl[tl] || (zl[tl] = {}), zl[tl].styles || (zl[tl].styles = {}), zl[tl].hooks || (zl[tl].hooks = {}), 
zl[tl].shims || (zl[tl].shims = []);

var Ul = zl[tl];

const Wl = [], Gl = function() {
    jc.removeEventListener("DOMContentLoaded", Gl), ql = 1, Wl.map((e => e()));
};

let ql = !1;

function Kl(e) {
    const {tag: t, attributes: n = {}, children: r = []} = e;
    return "string" == typeof e ? Ml(e) : "<".concat(t, " ").concat(function(e) {
        return Object.keys(e || {}).reduce(((t, n) => t + "".concat(n, '="').concat(Ml(e[n]), '" ')), "").trim();
    }(n), ">").concat(r.map(Kl).join(""), "</").concat(t, ">");
}

function Hl(e, t, n) {
    if (e && e[t] && e[t][n]) return {
        prefix: t,
        iconName: n,
        icon: e[t][n]
    };
}

Lc && (ql = (jc.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(jc.readyState), 
ql || jc.addEventListener("DOMContentLoaded", Gl));

var Xl = function(e, t, n, r) {
    var o, i, s, a = Object.keys(e), c = a.length, l = t;
    for (void 0 === n ? (o = 1, s = e[a[0]]) : (o = 0, s = n); o < c; o++) s = l(s, e[i = a[o]], i, e);
    return s;
};

function Ql(e) {
    const t = function(e) {
        const t = [];
        let n = 0;
        const r = e.length;
        for (;n < r; ) {
            const o = e.charCodeAt(n++);
            if (o >= 55296 && o <= 56319 && n < r) {
                const r = e.charCodeAt(n++);
                56320 == (64512 & r) ? t.push(((1023 & o) << 10) + (1023 & r) + 65536) : (t.push(o), 
                n--);
            } else t.push(o);
        }
        return t;
    }(e);
    return 1 === t.length ? t[0].toString(16) : null;
}

function Yl(e) {
    return Object.keys(e).reduce(((t, n) => {
        const r = e[n];
        return !!r.icon ? t[r.iconName] = r.icon : t[n] = r, t;
    }), {});
}

function Jl(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const {skipHooks: r = !1} = n, o = Yl(t);
    "function" != typeof Ul.hooks.addPack || r ? Ul.styles[e] = Sc(Sc({}, Ul.styles[e] || {}), o) : Ul.hooks.addPack(e, Yl(t)), 
    "fas" === e && Jl("fa", t);
}

const {styles: Zl, shims: eu} = Ul, tu = Object.keys(vl), nu = tu.reduce(((e, t) => (e[t] = Object.keys(vl[t]), 
e)), {});

let ru = null, ou = {}, iu = {}, su = {}, au = {}, cu = {};

function lu(e, t) {
    const n = t.split("-"), r = n[0], o = n.slice(1).join("-");
    return r !== e || "" === o || (i = o, ~_l.indexOf(i)) ? null : o;
    var i;
}

const uu = () => {
    const e = e => Xl(Zl, ((t, n, r) => (t[r] = Xl(n, e, {}), t)), {});
    ou = e(((e, t, n) => {
        if (t[3] && (e[t[3]] = n), t[2]) {
            t[2].filter((e => "number" == typeof e)).forEach((t => {
                e[t.toString(16)] = n;
            }));
        }
        return e;
    })), iu = e(((e, t, n) => {
        if (e[n] = n, t[2]) {
            t[2].filter((e => "string" == typeof e)).forEach((t => {
                e[t] = n;
            }));
        }
        return e;
    })), cu = e(((e, t, n) => {
        const r = t[2];
        return e[n] = n, r.forEach((t => {
            e[t] = n;
        })), e;
    }));
    const t = "far" in Zl || Al.autoFetchSvg, n = Xl(eu, ((e, n) => {
        const r = n[0];
        let o = n[1];
        const i = n[2];
        return "far" !== o || t || (o = "fas"), "string" == typeof r && (e.names[r] = {
            prefix: o,
            iconName: i
        }), "number" == typeof r && (e.unicodes[r.toString(16)] = {
            prefix: o,
            iconName: i
        }), e;
    }), {
        names: {},
        unicodes: {}
    });
    su = n.names, au = n.unicodes, ru = mu(Al.styleDefault, {
        family: Al.familyDefault
    });
};

var fu;

function du(e, t) {
    return (ou[e] || {})[t];
}

function pu(e, t) {
    return (cu[e] || {})[t];
}

function hu(e) {
    return su[e] || {
        prefix: null,
        iconName: null
    };
}

function gu() {
    return ru;
}

fu = e => {
    ru = mu(e.styleDefault, {
        family: Al.familyDefault
    });
}, Il.push(fu), uu();

function mu(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {family: n = Rc} = t, r = pl[n][e];
    if (n === Bc && !e) return "fad";
    const o = gl[n][e] || gl[n][r], i = e in Ul.styles ? e : null;
    return o || i || null;
}

function vu(e) {
    return e.sort().filter(((e, t, n) => n.indexOf(e) === t));
}

function yu(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {skipLookups: n = !1} = t;
    let r = null;
    const o = Yc.concat(Xc), i = vu(e.filter((e => o.includes(e)))), s = vu(e.filter((e => !Yc.includes(e)))), a = i.filter((e => (r = e, 
    !Dc.includes(e)))), [c = null] = a, l = function(e) {
        let t = Rc;
        const n = tu.reduce(((e, t) => (e[t] = "".concat(Al.cssPrefix, "-").concat(t), e)), {});
        return $c.forEach((r => {
            (e.includes(n[r]) || e.some((e => nu[r].includes(e)))) && (t = r);
        })), t;
    }(i), u = Sc(Sc({}, function(e) {
        let t = [], n = null;
        return e.forEach((e => {
            const r = lu(Al.cssPrefix, e);
            r ? n = r : e && t.push(e);
        })), {
            iconName: n,
            rest: t
        };
    }(s)), {}, {
        prefix: mu(c, {
            family: l
        })
    });
    return Sc(Sc(Sc({}, u), function(e) {
        const {values: t, family: n, canonical: r, givenPrefix: o = "", styles: i = {}, config: s = {}} = e, a = n === Bc, c = t.includes("fa-duotone") || t.includes("fad"), l = "duotone" === s.familyDefault, u = "fad" === r.prefix || "fa-duotone" === r.prefix;
        !a && (c || l || u) && (r.prefix = "fad");
        (t.includes("fa-brands") || t.includes("fab")) && (r.prefix = "fab");
        if (!r.prefix && bu.includes(n)) {
            if (Object.keys(i).find((e => wu.includes(e))) || s.autoFetchSvg) {
                const e = Vc.get(n).defaultShortPrefixId;
                r.prefix = e, r.iconName = pu(r.prefix, r.iconName) || r.iconName;
            }
        }
        "fa" !== r.prefix && "fa" !== o || (r.prefix = gu() || "fas");
        return r;
    }({
        values: e,
        family: l,
        styles: Zl,
        config: Al,
        canonical: u,
        givenPrefix: r
    })), function(e, t, n) {
        let {prefix: r, iconName: o} = n;
        if (e || !r || !o) return {
            prefix: r,
            iconName: o
        };
        const i = "fa" === t ? hu(o) : {}, s = pu(r, o);
        o = i.iconName || s || o, r = i.prefix || r, "far" !== r || Zl.far || !Zl.fas || Al.autoFetchSvg || (r = "fas");
        return {
            prefix: r,
            iconName: o
        };
    }(n, r, u));
}

const bu = $c.filter((e => e !== Rc || e !== Bc)), wu = Object.keys(Qc).filter((e => e !== Rc)).map((e => Object.keys(Qc[e]))).flat();

let Cu = [], xu = {};

const Su = {}, _u = Object.keys(Su);

function ku(e, t) {
    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) r[o - 2] = arguments[o];
    return (xu[e] || []).forEach((e => {
        t = e.apply(null, [ t, ...r ]);
    })), t;
}

function Ou(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
    (xu[e] || []).forEach((e => {
        e.apply(null, n);
    }));
}

function Eu() {
    const e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
    return Su[e] ? Su[e].apply(null, t) : void 0;
}

function Au(e) {
    "fa" === e.prefix && (e.prefix = "fas");
    let {iconName: t} = e;
    const n = e.prefix || gu();
    if (t) return t = pu(n, t) || t, Hl(Iu.definitions, n, t) || Hl(Ul.styles, n, t);
}

const Iu = new class {
    constructor() {
        this.definitions = {};
    }
    add() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        const r = t.reduce(this._pullDefinitions, {});
        Object.keys(r).forEach((e => {
            this.definitions[e] = Sc(Sc({}, this.definitions[e] || {}), r[e]), Jl(e, r[e]);
            const t = vl[Rc][e];
            t && Jl(t, r[e]), uu();
        }));
    }
    reset() {
        this.definitions = {};
    }
    _pullDefinitions(e, t) {
        const n = t.prefix && t.iconName && t.icon ? {
            0: t
        } : t;
        return Object.keys(n).map((t => {
            const {prefix: r, iconName: o, icon: i} = n[t], s = i[2];
            e[r] || (e[r] = {}), s.length > 0 && s.forEach((t => {
                "string" == typeof t && (e[r][t] = i);
            })), e[r][o] = i;
        })), e;
    }
}, Pu = {
    i2svg: function() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return Lc ? (Ou("beforeI2svg", e), Eu("pseudoElements2svg", e), Eu("i2svg", e)) : Promise.reject(new Error("Operation requires a DOM of some kind."));
    },
    watch: function() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const {autoReplaceSvgRoot: t} = e;
        var n;
        !1 === Al.autoReplaceSvg && (Al.autoReplaceSvg = !0), Al.observeMutations = !0, 
        n = () => {
            Tu({
                autoReplaceSvgRoot: t
            }), Ou("watch", e);
        }, Lc && (ql ? setTimeout(n, 0) : Wl.push(n));
    }
}, ju = {
    noAuto: () => {
        Al.autoReplaceSvg = !1, Al.observeMutations = !1, Ou("noAuto");
    },
    config: Al,
    dom: Pu,
    parse: {
        icon: e => {
            if (null === e) return null;
            if ("object" == typeof e && e.prefix && e.iconName) return {
                prefix: e.prefix,
                iconName: pu(e.prefix, e.iconName) || e.iconName
            };
            if (Array.isArray(e) && 2 === e.length) {
                const t = 0 === e[1].indexOf("fa-") ? e[1].slice(3) : e[1], n = mu(e[0]);
                return {
                    prefix: n,
                    iconName: pu(n, t) || t
                };
            }
            if ("string" == typeof e && (e.indexOf("".concat(Al.cssPrefix, "-")) > -1 || e.match(bl))) {
                const t = yu(e.split(" "), {
                    skipLookups: !0
                });
                return {
                    prefix: t.prefix || gu(),
                    iconName: pu(t.prefix, t.iconName) || t.iconName
                };
            }
            if ("string" == typeof e) {
                const t = gu();
                return {
                    prefix: t,
                    iconName: pu(t, e) || e
                };
            }
        }
    },
    library: Iu,
    findIconDefinition: Au,
    toHtml: Kl
}, Tu = function() {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const {autoReplaceSvgRoot: t = jc} = e;
    (Object.keys(Ul.styles).length > 0 || Al.autoFetchSvg) && Lc && Al.autoReplaceSvg && ju.dom.i2svg({
        node: t
    });
};

function Nu(e, t) {
    return Object.defineProperty(e, "abstract", {
        get: t
    }), Object.defineProperty(e, "html", {
        get: function() {
            return e.abstract.map((e => Kl(e)));
        }
    }), Object.defineProperty(e, "node", {
        get: function() {
            if (!Lc) return;
            const t = jc.createElement("div");
            return t.innerHTML = e.html, t.children;
        }
    }), e;
}

function Lu(e) {
    const {icons: {main: t, mask: n}, prefix: r, iconName: o, transform: i, symbol: s, title: a, maskId: c, titleId: l, extra: u, watchable: f = !1} = e, {width: d, height: p} = n.found ? n : t, h = Gc.includes(r), g = [ Al.replacementClass, o ? "".concat(Al.cssPrefix, "-").concat(o) : "" ].filter((e => -1 === u.classes.indexOf(e))).filter((e => "" !== e || !!e)).concat(u.classes).join(" ");
    let m = {
        children: [],
        attributes: Sc(Sc({}, u.attributes), {}, {
            "data-prefix": r,
            "data-icon": o,
            class: g,
            role: u.attributes.role || "img",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 ".concat(d, " ").concat(p)
        })
    };
    const v = h && !~u.classes.indexOf("fa-fw") ? {
        width: "".concat(d / p * 16 * .0625, "em")
    } : {};
    f && (m.attributes[ol] = ""), a && (m.children.push({
        tag: "title",
        attributes: {
            id: m.attributes["aria-labelledby"] || "title-".concat(l || Tl())
        },
        children: [ a ]
    }), delete m.attributes.title);
    const y = Sc(Sc({}, m), {}, {
        prefix: r,
        iconName: o,
        main: t,
        mask: n,
        maskId: c,
        transform: i,
        symbol: s,
        styles: Sc(Sc({}, v), u.styles)
    }), {children: b, attributes: w} = n.found && t.found ? Eu("generateAbstractMask", y) || {
        children: [],
        attributes: {}
    } : Eu("generateAbstractIcon", y) || {
        children: [],
        attributes: {}
    };
    return y.children = b, y.attributes = w, s ? function(e) {
        let {prefix: t, iconName: n, children: r, attributes: o, symbol: i} = e;
        const s = !0 === i ? "".concat(t, "-").concat(Al.cssPrefix, "-").concat(n) : i;
        return [ {
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [ {
                tag: "symbol",
                attributes: Sc(Sc({}, o), {}, {
                    id: s
                }),
                children: r
            } ]
        } ];
    }(y) : function(e) {
        let {children: t, main: n, mask: r, attributes: o, styles: i, transform: s} = e;
        if (Dl(s) && n.found && !r.found) {
            const {width: e, height: t} = n, r = {
                x: e / t / 2,
                y: .5
            };
            o.style = Fl(Sc(Sc({}, i), {}, {
                "transform-origin": "".concat(r.x + s.x / 16, "em ").concat(r.y + s.y / 16, "em")
            }));
        }
        return [ {
            tag: "svg",
            attributes: o,
            children: t
        } ];
    }(y);
}

function Mu(e) {
    const {content: t, width: n, height: r, transform: o, title: i, extra: s, watchable: a = !1} = e, c = Sc(Sc(Sc({}, s.attributes), i ? {
        title: i
    } : {}), {}, {
        class: s.classes.join(" ")
    });
    a && (c[ol] = "");
    const l = Sc({}, s.styles);
    Dl(o) && (l.transform = function(e) {
        let {transform: t, width: n = nl, height: r = nl, startCentered: o = !1} = e, i = "";
        return i += o && Mc ? "translate(".concat(t.x / Pl - n / 2, "em, ").concat(t.y / Pl - r / 2, "em) ") : o ? "translate(calc(-50% + ".concat(t.x / Pl, "em), calc(-50% + ").concat(t.y / Pl, "em)) ") : "translate(".concat(t.x / Pl, "em, ").concat(t.y / Pl, "em) "), 
        i += "scale(".concat(t.size / Pl * (t.flipX ? -1 : 1), ", ").concat(t.size / Pl * (t.flipY ? -1 : 1), ") "), 
        i += "rotate(".concat(t.rotate, "deg) "), i;
    }({
        transform: o,
        startCentered: !0,
        width: n,
        height: r
    }), l["-webkit-transform"] = l.transform);
    const u = Fl(l);
    u.length > 0 && (c.style = u);
    const f = [];
    return f.push({
        tag: "span",
        attributes: c,
        children: [ t ]
    }), i && f.push({
        tag: "span",
        attributes: {
            class: "sr-only"
        },
        children: [ i ]
    }), f;
}

const {styles: Fu} = Ul;

function Du(e) {
    const t = e[0], n = e[1], [r] = e.slice(4);
    let o = null;
    return o = Array.isArray(r) ? {
        tag: "g",
        attributes: {
            class: "".concat(Al.cssPrefix, "-").concat(Sl.GROUP)
        },
        children: [ {
            tag: "path",
            attributes: {
                class: "".concat(Al.cssPrefix, "-").concat(Sl.SECONDARY),
                fill: "currentColor",
                d: r[0]
            }
        }, {
            tag: "path",
            attributes: {
                class: "".concat(Al.cssPrefix, "-").concat(Sl.PRIMARY),
                fill: "currentColor",
                d: r[1]
            }
        } ]
    } : {
        tag: "path",
        attributes: {
            fill: "currentColor",
            d: r
        }
    }, {
        found: !0,
        width: t,
        height: n,
        icon: o
    };
}

const Ru = {
    found: !1,
    width: 512,
    height: 512
};

function Bu(e, t) {
    let n = t;
    return "fa" === t && null !== Al.styleDefault && (t = gu()), new Promise(((r, o) => {
        if ("fa" === n) {
            const n = hu(e) || {};
            e = n.iconName || e, t = n.prefix || t;
        }
        if (e && t && Fu[t] && Fu[t][e]) {
            return r(Du(Fu[t][e]));
        }
        !function(e, t) {
            ul || Al.showMissingIcons || !e || console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
        }(e, t), r(Sc(Sc({}, Ru), {}, {
            icon: Al.showMissingIcons && e && Eu("missingIconAbstract") || {}
        }));
    }));
}

const $u = () => {}, Vu = Al.measurePerformance && Nc && Nc.mark && Nc.measure ? Nc : {
    mark: $u,
    measure: $u
}, zu = 'FA "6.7.2"', Uu = e => {
    Vu.mark("".concat(zu, " ").concat(e, " ends")), Vu.measure("".concat(zu, " ").concat(e), "".concat(zu, " ").concat(e, " begins"), "".concat(zu, " ").concat(e, " ends"));
};

var Wu = e => (Vu.mark("".concat(zu, " ").concat(e, " begins")), () => Uu(e));

const Gu = () => {};

function qu(e) {
    return "string" == typeof (e.getAttribute ? e.getAttribute(ol) : null);
}

function Ku(e) {
    return jc.createElementNS("http://www.w3.org/2000/svg", e);
}

function Hu(e) {
    return jc.createElement(e);
}

function Xu(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {ceFn: n = ("svg" === e.tag ? Ku : Hu)} = t;
    if ("string" == typeof e) return jc.createTextNode(e);
    const r = n(e.tag);
    Object.keys(e.attributes || []).forEach((function(t) {
        r.setAttribute(t, e.attributes[t]);
    }));
    return (e.children || []).forEach((function(e) {
        r.appendChild(Xu(e, {
            ceFn: n
        }));
    })), r;
}

const Qu = {
    replace: function(e) {
        const t = e[0];
        if (t.parentNode) if (e[1].forEach((e => {
            t.parentNode.insertBefore(Xu(e), t);
        })), null === t.getAttribute(ol) && Al.keepOriginalSource) {
            let e = jc.createComment(function(e) {
                let t = " ".concat(e.outerHTML, " ");
                return t = "".concat(t, "Font Awesome fontawesome.com "), t;
            }(t));
            t.parentNode.replaceChild(e, t);
        } else t.remove();
    },
    nest: function(e) {
        const t = e[0], n = e[1];
        if (~Ll(t).indexOf(Al.replacementClass)) return Qu.replace(e);
        const r = new RegExp("".concat(Al.cssPrefix, "-.*"));
        if (delete n[0].attributes.id, n[0].attributes.class) {
            const e = n[0].attributes.class.split(" ").reduce(((e, t) => (t === Al.replacementClass || t.match(r) ? e.toSvg.push(t) : e.toNode.push(t), 
            e)), {
                toNode: [],
                toSvg: []
            });
            n[0].attributes.class = e.toSvg.join(" "), 0 === e.toNode.length ? t.removeAttribute("class") : t.setAttribute("class", e.toNode.join(" "));
        }
        const o = n.map((e => Kl(e))).join("\n");
        t.setAttribute(ol, ""), t.innerHTML = o;
    }
};

function Yu(e) {
    e();
}

function Ju(e, t) {
    const n = "function" == typeof t ? t : Gu;
    if (0 === e.length) n(); else {
        let t = Yu;
        "async" === Al.mutateApproach && (t = Pc.requestAnimationFrame || Yu), t((() => {
            const t = !0 === Al.autoReplaceSvg ? Qu.replace : Qu[Al.autoReplaceSvg] || Qu.replace, r = Wu("mutate");
            e.map(t), r(), n();
        }));
    }
}

let Zu = !1;

function ef() {
    Zu = !0;
}

function tf() {
    Zu = !1;
}

let nf = null;

function rf(e) {
    if (!Tc) return;
    if (!Al.observeMutations) return;
    const {treeCallback: t = Gu, nodeCallback: n = Gu, pseudoElementsCallback: r = Gu, observeMutationsRoot: o = jc} = e;
    nf = new Tc((e => {
        if (Zu) return;
        const o = gu();
        Nl(e).forEach((e => {
            if ("childList" === e.type && e.addedNodes.length > 0 && !qu(e.addedNodes[0]) && (Al.searchPseudoElements && r(e.target), 
            t(e.target)), "attributes" === e.type && e.target.parentNode && Al.searchPseudoElements && r(e.target.parentNode), 
            "attributes" === e.type && qu(e.target) && ~xl.indexOf(e.attributeName)) if ("class" === e.attributeName && function(e) {
                const t = e.getAttribute ? e.getAttribute(sl) : null, n = e.getAttribute ? e.getAttribute(al) : null;
                return t && n;
            }(e.target)) {
                const {prefix: t, iconName: n} = yu(Ll(e.target));
                e.target.setAttribute(sl, t || o), n && e.target.setAttribute(al, n);
            } else (i = e.target) && i.classList && i.classList.contains && i.classList.contains(Al.replacementClass) && n(e.target);
            var i;
        }));
    })), Lc && nf.observe(o, {
        childList: !0,
        attributes: !0,
        characterData: !0,
        subtree: !0
    });
}

function of(e) {
    const t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), r = void 0 !== e.innerText ? e.innerText.trim() : "";
    let o = yu(Ll(e));
    return o.prefix || (o.prefix = gu()), t && n && (o.prefix = t, o.iconName = n), 
    o.iconName && o.prefix || (o.prefix && r.length > 0 && (o.iconName = (i = o.prefix, 
    s = e.innerText, (iu[i] || {})[s] || du(o.prefix, Ql(e.innerText)))), !o.iconName && Al.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (o.iconName = e.firstChild.data)), 
    o;
    var i, s;
}

function sf(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
        styleParser: !0
    };
    const {iconName: n, prefix: r, rest: o} = of(e), i = function(e) {
        const t = Nl(e.attributes).reduce(((e, t) => ("class" !== e.name && "style" !== e.name && (e[t.name] = t.value), 
        e)), {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
        return Al.autoA11y && (n ? t["aria-labelledby"] = "".concat(Al.replacementClass, "-title-").concat(r || Tl()) : (t["aria-hidden"] = "true", 
        t.focusable = "false")), t;
    }(e), s = ku("parseNodeAttributes", {}, e);
    let a = t.styleParser ? function(e) {
        const t = e.getAttribute("style");
        let n = [];
        return t && (n = t.split(";").reduce(((e, t) => {
            const n = t.split(":"), r = n[0], o = n.slice(1);
            return r && o.length > 0 && (e[r] = o.join(":").trim()), e;
        }), {})), n;
    }(e) : [];
    return Sc({
        iconName: n,
        title: e.getAttribute("title"),
        titleId: e.getAttribute("data-fa-title-id"),
        prefix: r,
        transform: jl,
        mask: {
            iconName: null,
            prefix: null,
            rest: []
        },
        maskId: null,
        symbol: !1,
        extra: {
            classes: o,
            styles: a,
            attributes: i
        }
    }, s);
}

const {styles: af} = Ul;

function cf(e) {
    const t = "nest" === Al.autoReplaceSvg ? sf(e, {
        styleParser: !1
    }) : sf(e);
    return ~t.extra.classes.indexOf(wl) ? Eu("generateLayersText", e, t) : Eu("generateSvgReplacementMutation", e, t);
}

function lf(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    if (!Lc) return Promise.resolve();
    const n = jc.documentElement.classList, r = e => n.add("".concat(cl, "-").concat(e)), o = e => n.remove("".concat(cl, "-").concat(e)), i = Al.autoFetchSvg ? [ ...zc, ...Yc ] : Dc.concat(Object.keys(af));
    i.includes("fa") || i.push("fa");
    const s = [ ".".concat(wl, ":not([").concat(ol, "])") ].concat(i.map((e => ".".concat(e, ":not([").concat(ol, "])")))).join(", ");
    if (0 === s.length) return Promise.resolve();
    let a = [];
    try {
        a = Nl(e.querySelectorAll(s));
    } catch (u) {}
    if (!(a.length > 0)) return Promise.resolve();
    r("pending"), o("complete");
    const c = Wu("onTree"), l = a.reduce(((e, t) => {
        try {
            const n = cf(t);
            n && e.push(n);
        } catch (u) {
            ul || "MissingIcon" === u.name && console.error(u);
        }
        return e;
    }), []);
    return new Promise(((e, n) => {
        Promise.all(l).then((n => {
            Ju(n, (() => {
                r("active"), r("complete"), o("pending"), "function" == typeof t && t(), c(), e();
            }));
        })).catch((e => {
            c(), n(e);
        }));
    }));
}

function uf(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    cf(e).then((e => {
        e && Ju([ e ], t);
    }));
}

const ff = function(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const {transform: n = jl, symbol: r = !1, mask: o = null, maskId: i = null, title: s = null, titleId: a = null, classes: c = [], attributes: l = {}, styles: u = {}} = t;
    if (!e) return;
    const {prefix: f, iconName: d, icon: p} = e;
    return Nu(Sc({
        type: "icon"
    }, e), (() => (Ou("beforeDOMElementCreation", {
        iconDefinition: e,
        params: t
    }), Al.autoA11y && (s ? l["aria-labelledby"] = "".concat(Al.replacementClass, "-title-").concat(a || Tl()) : (l["aria-hidden"] = "true", 
    l.focusable = "false")), Lu({
        icons: {
            main: Du(p),
            mask: o ? Du(o.icon) : {
                found: !1,
                width: null,
                height: null,
                icon: {}
            }
        },
        prefix: f,
        iconName: d,
        transform: Sc(Sc({}, jl), n),
        symbol: r,
        title: s,
        maskId: i,
        titleId: a,
        extra: {
            attributes: l,
            styles: u,
            classes: c
        }
    }))));
};

var df = {
    mixout() {
        return {
            icon: (e = ff, function(t) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const r = (t || {}).icon ? t : Au(t || {});
                let {mask: o} = n;
                return o && (o = (o || {}).icon ? o : Au(o || {})), e(r, Sc(Sc({}, n), {}, {
                    mask: o
                }));
            })
        };
        var e;
    },
    hooks: () => ({
        mutationObserverCallbacks: e => (e.treeCallback = lf, e.nodeCallback = uf, e)
    }),
    provides(e) {
        e.i2svg = function(e) {
            const {node: t = jc, callback: n = () => {}} = e;
            return lf(t, n);
        }, e.generateSvgReplacementMutation = function(e, t) {
            const {iconName: n, title: r, titleId: o, prefix: i, transform: s, symbol: a, mask: c, maskId: l, extra: u} = t;
            return new Promise(((t, f) => {
                Promise.all([ Bu(n, i), c.iconName ? Bu(c.iconName, c.prefix) : Promise.resolve({
                    found: !1,
                    width: 512,
                    height: 512,
                    icon: {}
                }) ]).then((c => {
                    let [f, d] = c;
                    t([ e, Lu({
                        icons: {
                            main: f,
                            mask: d
                        },
                        prefix: i,
                        iconName: n,
                        transform: s,
                        symbol: a,
                        maskId: l,
                        title: r,
                        titleId: o,
                        extra: u,
                        watchable: !0
                    }) ]);
                })).catch(f);
            }));
        }, e.generateAbstractIcon = function(e) {
            let {children: t, attributes: n, main: r, transform: o, styles: i} = e;
            const s = Fl(i);
            let a;
            return s.length > 0 && (n.style = s), Dl(o) && (a = Eu("generateAbstractTransformGrouping", {
                main: r,
                transform: o,
                containerWidth: r.width,
                iconWidth: r.width
            })), t.push(a || r.icon), {
                children: t,
                attributes: n
            };
        };
    }
}, pf = {
    mixout: () => ({
        layer(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const {classes: n = []} = t;
            return Nu({
                type: "layer"
            }, (() => {
                Ou("beforeDOMElementCreation", {
                    assembler: e,
                    params: t
                });
                let r = [];
                return e((e => {
                    Array.isArray(e) ? e.map((e => {
                        r = r.concat(e.abstract);
                    })) : r = r.concat(e.abstract);
                })), [ {
                    tag: "span",
                    attributes: {
                        class: [ "".concat(Al.cssPrefix, "-layers"), ...n ].join(" ")
                    },
                    children: r
                } ];
            }));
        }
    })
}, hf = {
    mixout: () => ({
        counter(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const {title: n = null, classes: r = [], attributes: o = {}, styles: i = {}} = t;
            return Nu({
                type: "counter",
                content: e
            }, (() => (Ou("beforeDOMElementCreation", {
                content: e,
                params: t
            }), function(e) {
                const {content: t, title: n, extra: r} = e, o = Sc(Sc(Sc({}, r.attributes), n ? {
                    title: n
                } : {}), {}, {
                    class: r.classes.join(" ")
                }), i = Fl(r.styles);
                i.length > 0 && (o.style = i);
                const s = [];
                return s.push({
                    tag: "span",
                    attributes: o,
                    children: [ t ]
                }), n && s.push({
                    tag: "span",
                    attributes: {
                        class: "sr-only"
                    },
                    children: [ n ]
                }), s;
            }({
                content: e.toString(),
                title: n,
                extra: {
                    attributes: o,
                    styles: i,
                    classes: [ "".concat(Al.cssPrefix, "-layers-counter"), ...r ]
                }
            }))));
        }
    })
}, gf = {
    mixout: () => ({
        text(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const {transform: n = jl, title: r = null, classes: o = [], attributes: i = {}, styles: s = {}} = t;
            return Nu({
                type: "text",
                content: e
            }, (() => (Ou("beforeDOMElementCreation", {
                content: e,
                params: t
            }), Mu({
                content: e,
                transform: Sc(Sc({}, jl), n),
                title: r,
                extra: {
                    attributes: i,
                    styles: s,
                    classes: [ "".concat(Al.cssPrefix, "-layers-text"), ...o ]
                }
            }))));
        }
    }),
    provides(e) {
        e.generateLayersText = function(e, t) {
            const {title: n, transform: r, extra: o} = t;
            let i = null, s = null;
            if (Mc) {
                const t = parseInt(getComputedStyle(e).fontSize, 10), n = e.getBoundingClientRect();
                i = n.width / t, s = n.height / t;
            }
            return Al.autoA11y && !n && (o.attributes["aria-hidden"] = "true"), Promise.resolve([ e, Mu({
                content: e.innerHTML,
                width: i,
                height: s,
                transform: r,
                title: n,
                extra: o,
                watchable: !0
            }) ]);
        };
    }
};

const mf = new RegExp('"', "ug"), vf = [ 1105920, 1112319 ], yf = Sc(Sc(Sc(Sc({}, {
    FontAwesome: {
        normal: "fas",
        400: "fas"
    }
}), {
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
}), {
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
}), {
    "Font Awesome Kit": {
        400: "fak",
        normal: "fak"
    },
    "Font Awesome Kit Duotone": {
        400: "fakd",
        normal: "fakd"
    }
}), bf = Object.keys(yf).reduce(((e, t) => (e[t.toLowerCase()] = yf[t], e)), {}), wf = Object.keys(bf).reduce(((e, t) => {
    const n = bf[t];
    return e[t] = n[900] || [ ...Object.entries(n) ][0][1], e;
}), {});

function Cf(e, t) {
    const n = "".concat("data-fa-pseudo-element-pending").concat(t.replace(":", "-"));
    return new Promise(((r, o) => {
        if (null !== e.getAttribute(n)) return r();
        const i = Nl(e.children).filter((e => e.getAttribute(il) === t))[0], s = Pc.getComputedStyle(e, t), a = s.getPropertyValue("font-family"), c = a.match(Cl), l = s.getPropertyValue("font-weight"), u = s.getPropertyValue("content");
        if (i && !c) return e.removeChild(i), r();
        if (c && "none" !== u && "" !== u) {
            const u = s.getPropertyValue("content");
            let f = function(e, t) {
                const n = e.replace(/^['"]|['"]$/g, "").toLowerCase(), r = parseInt(t), o = isNaN(r) ? "normal" : r;
                return (bf[n] || {})[o] || wf[n];
            }(a, l);
            const {value: d, isSecondary: p} = function(e) {
                const t = e.replace(mf, ""), n = function(e, t) {
                    const n = e.length;
                    let r, o = e.charCodeAt(t);
                    return o >= 55296 && o <= 56319 && n > t + 1 && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? 1024 * (o - 55296) + r - 56320 + 65536 : o;
                }(t, 0), r = n >= vf[0] && n <= vf[1], o = 2 === t.length && t[0] === t[1];
                return {
                    value: Ql(o ? t[0] : t),
                    isSecondary: r || o
                };
            }(u), h = c[0].startsWith("FontAwesome");
            let g = du(f, d), m = g;
            if (h) {
                const e = function(e) {
                    const t = au[e], n = du("fas", e);
                    return t || (n ? {
                        prefix: "fas",
                        iconName: n
                    } : null) || {
                        prefix: null,
                        iconName: null
                    };
                }(d);
                e.iconName && e.prefix && (g = e.iconName, f = e.prefix);
            }
            if (!g || p || i && i.getAttribute(sl) === f && i.getAttribute(al) === m) r(); else {
                e.setAttribute(n, m), i && e.removeChild(i);
                const s = {
                    iconName: null,
                    title: null,
                    titleId: null,
                    prefix: null,
                    transform: jl,
                    symbol: !1,
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
                }, {extra: a} = s;
                a.attributes[il] = t, Bu(g, f).then((o => {
                    const i = Lu(Sc(Sc({}, s), {}, {
                        icons: {
                            main: o,
                            mask: {
                                prefix: null,
                                iconName: null,
                                rest: []
                            }
                        },
                        prefix: f,
                        iconName: m,
                        extra: a,
                        watchable: !0
                    })), c = jc.createElementNS("http://www.w3.org/2000/svg", "svg");
                    "::before" === t ? e.insertBefore(c, e.firstChild) : e.appendChild(c), c.outerHTML = i.map((e => Kl(e))).join("\n"), 
                    e.removeAttribute(n), r();
                })).catch(o);
            }
        } else r();
    }));
}

function xf(e) {
    return Promise.all([ Cf(e, "::before"), Cf(e, "::after") ]);
}

function Sf(e) {
    return !(e.parentNode === document.head || ~ll.indexOf(e.tagName.toUpperCase()) || e.getAttribute(il) || e.parentNode && "svg" === e.parentNode.tagName);
}

function _f(e) {
    if (Lc) return new Promise(((t, n) => {
        const r = Nl(e.querySelectorAll("*")).filter(Sf).map(xf), o = Wu("searchPseudoElements");
        ef(), Promise.all(r).then((() => {
            o(), tf(), t();
        })).catch((() => {
            o(), tf(), n();
        }));
    }));
}

let kf = !1;

const Of = e => e.toLowerCase().split(" ").reduce(((e, t) => {
    const n = t.toLowerCase().split("-"), r = n[0];
    let o = n.slice(1).join("-");
    if (r && "h" === o) return e.flipX = !0, e;
    if (r && "v" === o) return e.flipY = !0, e;
    if (o = parseFloat(o), isNaN(o)) return e;
    switch (r) {
      case "grow":
        e.size = e.size + o;
        break;

      case "shrink":
        e.size = e.size - o;
        break;

      case "left":
        e.x = e.x - o;
        break;

      case "right":
        e.x = e.x + o;
        break;

      case "up":
        e.y = e.y - o;
        break;

      case "down":
        e.y = e.y + o;
        break;

      case "rotate":
        e.rotate = e.rotate + o;
    }
    return e;
}), {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
});

const Ef = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
};

function Af(e) {
    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), 
    e;
}

!function(e, t) {
    let {mixoutsTo: n} = t;
    Cu = e, xu = {}, Object.keys(Su).forEach((e => {
        -1 === _u.indexOf(e) && delete Su[e];
    })), Cu.forEach((e => {
        const t = e.mixout ? e.mixout() : {};
        if (Object.keys(t).forEach((e => {
            "function" == typeof t[e] && (n[e] = t[e]), "object" == typeof t[e] && Object.keys(t[e]).forEach((r => {
                n[e] || (n[e] = {}), n[e][r] = t[e][r];
            }));
        })), e.hooks) {
            const t = e.hooks();
            Object.keys(t).forEach((e => {
                xu[e] || (xu[e] = []), xu[e].push(t[e]);
            }));
        }
        e.provides && e.provides(Su);
    }));
}([ Vl, df, pf, hf, gf, {
    hooks: () => ({
        mutationObserverCallbacks: e => (e.pseudoElementsCallback = _f, e)
    }),
    provides(e) {
        e.pseudoElements2svg = function(e) {
            const {node: t = jc} = e;
            Al.searchPseudoElements && _f(t);
        };
    }
}, {
    mixout: () => ({
        dom: {
            unwatch() {
                ef(), kf = !0;
            }
        }
    }),
    hooks: () => ({
        bootstrap() {
            rf(ku("mutationObserverCallbacks", {}));
        },
        noAuto() {
            nf && nf.disconnect();
        },
        watch(e) {
            const {observeMutationsRoot: t} = e;
            kf ? tf() : rf(ku("mutationObserverCallbacks", {
                observeMutationsRoot: t
            }));
        }
    })
}, {
    mixout: () => ({
        parse: {
            transform: e => Of(e)
        }
    }),
    hooks: () => ({
        parseNodeAttributes(e, t) {
            const n = t.getAttribute("data-fa-transform");
            return n && (e.transform = Of(n)), e;
        }
    }),
    provides(e) {
        e.generateAbstractTransformGrouping = function(e) {
            let {main: t, transform: n, containerWidth: r, iconWidth: o} = e;
            const i = {
                transform: "translate(".concat(r / 2, " 256)")
            }, s = "translate(".concat(32 * n.x, ", ").concat(32 * n.y, ") "), a = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), c = "rotate(".concat(n.rotate, " 0 0)"), l = {
                outer: i,
                inner: {
                    transform: "".concat(s, " ").concat(a, " ").concat(c)
                },
                path: {
                    transform: "translate(".concat(o / 2 * -1, " -256)")
                }
            };
            return {
                tag: "g",
                attributes: Sc({}, l.outer),
                children: [ {
                    tag: "g",
                    attributes: Sc({}, l.inner),
                    children: [ {
                        tag: t.icon.tag,
                        children: t.icon.children,
                        attributes: Sc(Sc({}, t.icon.attributes), l.path)
                    } ]
                } ]
            };
        };
    }
}, {
    hooks: () => ({
        parseNodeAttributes(e, t) {
            const n = t.getAttribute("data-fa-mask"), r = n ? yu(n.split(" ").map((e => e.trim()))) : {
                prefix: null,
                iconName: null,
                rest: []
            };
            return r.prefix || (r.prefix = gu()), e.mask = r, e.maskId = t.getAttribute("data-fa-mask-id"), 
            e;
        }
    }),
    provides(e) {
        e.generateAbstractMask = function(e) {
            let {children: t, attributes: n, main: r, mask: o, maskId: i, transform: s} = e;
            const {width: a, icon: c} = r, {width: l, icon: u} = o, f = function(e) {
                let {transform: t, containerWidth: n, iconWidth: r} = e;
                const o = {
                    transform: "translate(".concat(n / 2, " 256)")
                }, i = "translate(".concat(32 * t.x, ", ").concat(32 * t.y, ") "), s = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), a = "rotate(".concat(t.rotate, " 0 0)");
                return {
                    outer: o,
                    inner: {
                        transform: "".concat(i, " ").concat(s, " ").concat(a)
                    },
                    path: {
                        transform: "translate(".concat(r / 2 * -1, " -256)")
                    }
                };
            }({
                transform: s,
                containerWidth: l,
                iconWidth: a
            }), d = {
                tag: "rect",
                attributes: Sc(Sc({}, Ef), {}, {
                    fill: "white"
                })
            }, p = c.children ? {
                children: c.children.map(Af)
            } : {}, h = {
                tag: "g",
                attributes: Sc({}, f.inner),
                children: [ Af(Sc({
                    tag: c.tag,
                    attributes: Sc(Sc({}, c.attributes), f.path)
                }, p)) ]
            }, g = {
                tag: "g",
                attributes: Sc({}, f.outer),
                children: [ h ]
            }, m = "mask-".concat(i || Tl()), v = "clip-".concat(i || Tl()), y = {
                tag: "mask",
                attributes: Sc(Sc({}, Ef), {}, {
                    id: m,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse"
                }),
                children: [ d, g ]
            }, b = {
                tag: "defs",
                children: [ {
                    tag: "clipPath",
                    attributes: {
                        id: v
                    },
                    children: (w = u, "g" === w.tag ? w.children : [ w ])
                }, y ]
            };
            var w;
            return t.push(b, {
                tag: "rect",
                attributes: Sc({
                    fill: "currentColor",
                    "clip-path": "url(#".concat(v, ")"),
                    mask: "url(#".concat(m, ")")
                }, Ef)
            }), {
                children: t,
                attributes: n
            };
        };
    }
}, {
    provides(e) {
        let t = !1;
        Pc.matchMedia && (t = Pc.matchMedia("(prefers-reduced-motion: reduce)").matches), 
        e.missingIconAbstract = function() {
            const e = [], n = {
                fill: "currentColor"
            }, r = {
                attributeType: "XML",
                repeatCount: "indefinite",
                dur: "2s"
            };
            e.push({
                tag: "path",
                attributes: Sc(Sc({}, n), {}, {
                    d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
                })
            });
            const o = Sc(Sc({}, r), {}, {
                attributeName: "opacity"
            }), i = {
                tag: "circle",
                attributes: Sc(Sc({}, n), {}, {
                    cx: "256",
                    cy: "364",
                    r: "28"
                }),
                children: []
            };
            return t || i.children.push({
                tag: "animate",
                attributes: Sc(Sc({}, r), {}, {
                    attributeName: "r",
                    values: "28;14;28;28;14;28;"
                })
            }, {
                tag: "animate",
                attributes: Sc(Sc({}, o), {}, {
                    values: "1;0;1;1;0;1;"
                })
            }), e.push(i), e.push({
                tag: "path",
                attributes: Sc(Sc({}, n), {}, {
                    opacity: "1",
                    d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
                }),
                children: t ? [] : [ {
                    tag: "animate",
                    attributes: Sc(Sc({}, o), {}, {
                        values: "1;0;0;0;0;1;"
                    })
                } ]
            }), t || e.push({
                tag: "path",
                attributes: Sc(Sc({}, n), {}, {
                    opacity: "0",
                    d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
                }),
                children: [ {
                    tag: "animate",
                    attributes: Sc(Sc({}, o), {}, {
                        values: "0;0;1;1;0;0;"
                    })
                } ]
            }), {
                tag: "g",
                attributes: {
                    class: "missing"
                },
                children: e
            };
        };
    }
}, {
    hooks: () => ({
        parseNodeAttributes(e, t) {
            const n = t.getAttribute("data-fa-symbol"), r = null !== n && ("" === n || n);
            return e.symbol = r, e;
        }
    })
} ], {
    mixoutsTo: ju
});

const If = ju.library, Pf = ju.parse, jf = ju.icon;

function Tf(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        }))), n.push.apply(n, r);
    }
    return n;
}

function Nf(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Tf(Object(n), !0).forEach((function(t) {
            Ff(e, t, n[t]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tf(Object(n)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        }));
    }
    return e;
}

function Lf(e) {
    var t = function(e, t) {
        if ("object" != typeof e || !e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
            var r = n.call(e, t);
            if ("object" != typeof r) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
    }(e, "string");
    return "symbol" == typeof t ? t : t + "";
}

function Mf(e) {
    return (Mf = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
}

function Ff(e, t, n) {
    return (t = Lf(t)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function Df(e, t) {
    if (null == e) return {};
    var n, r, o = function(e, t) {
        if (null == e) return {};
        var n = {};
        for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
            if (t.indexOf(r) >= 0) continue;
            n[r] = e[r];
        }
        return n;
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
    }
    return o;
}

var Rf, Bf, $f, Vf, zf, Uf, Wf, Gf, qf, Kf, Hf, Xf, Qf, Yf, Jf, Zf, ed = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, td = {
    exports: {}
};

Rf = td, Bf = ed, $f = function(e, t, n) {
    if (!qf(t) || Hf(t) || Xf(t) || Qf(t) || Gf(t)) return t;
    var r, o = 0, i = 0;
    if (Kf(t)) for (r = [], i = t.length; o < i; o++) r.push($f(e, t[o], n)); else for (var s in r = {}, 
    t) Object.prototype.hasOwnProperty.call(t, s) && (r[e(s, n)] = $f(e, t[s], n));
    return r;
}, Vf = function(e) {
    return Yf(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, (function(e, t) {
        return t ? t.toUpperCase() : "";
    }))).substr(0, 1).toLowerCase() + e.substr(1);
}, zf = function(e) {
    var t = Vf(e);
    return t.substr(0, 1).toUpperCase() + t.substr(1);
}, Uf = function(e, t) {
    return function(e, t) {
        var n = (t = t || {}).separator || "_", r = t.split || /(?=[A-Z])/;
        return e.split(r).join(n);
    }(e, t).toLowerCase();
}, Wf = Object.prototype.toString, Gf = function(e) {
    return "function" == typeof e;
}, qf = function(e) {
    return e === Object(e);
}, Kf = function(e) {
    return "[object Array]" == Wf.call(e);
}, Hf = function(e) {
    return "[object Date]" == Wf.call(e);
}, Xf = function(e) {
    return "[object RegExp]" == Wf.call(e);
}, Qf = function(e) {
    return "[object Boolean]" == Wf.call(e);
}, Yf = function(e) {
    return (e -= 0) == e;
}, Jf = function(e, t) {
    var n = t && "process" in t ? t.process : t;
    return "function" != typeof n ? e : function(t, r) {
        return n(t, e, r);
    };
}, Zf = {
    camelize: Vf,
    decamelize: Uf,
    pascalize: zf,
    depascalize: Uf,
    camelizeKeys: function(e, t) {
        return $f(Jf(Vf, t), e);
    },
    decamelizeKeys: function(e, t) {
        return $f(Jf(Uf, t), e, t);
    },
    pascalizeKeys: function(e, t) {
        return $f(Jf(zf, t), e);
    },
    depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
    }
}, Rf.exports ? Rf.exports = Zf : Bf.humps = Zf;

var nd = td.exports, rd = [ "class", "style" ];

function od(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("string" == typeof e) return e;
    var r = (e.children || []).map((function(e) {
        return od(e);
    })), o = Object.keys(e.attributes || {}).reduce((function(t, n) {
        var r = e.attributes[n];
        switch (n) {
          case "class":
            t.class = r.split(/\s+/).reduce((function(e, t) {
                return e[t] = !0, e;
            }), {});
            break;

          case "style":
            t.style = r.split(";").map((function(e) {
                return e.trim();
            })).filter((function(e) {
                return e;
            })).reduce((function(e, t) {
                var n = t.indexOf(":"), r = nd.camelize(t.slice(0, n)), o = t.slice(n + 1).trim();
                return e[r] = o, e;
            }), {});
            break;

          default:
            t.attrs[n] = r;
        }
        return t;
    }), {
        attrs: {},
        class: {},
        style: {}
    });
    n.class;
    var i = n.style, s = void 0 === i ? {} : i, a = Df(n, rd);
    return ko(e.tag, Nf(Nf(Nf({}, t), {}, {
        class: o.class,
        style: Nf(Nf({}, o.style), s)
    }, o.attrs), a), r);
}

var id = !1;

try {
    id = !0;
} catch (bh) {}

function sd(e, t) {
    return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? Ff({}, e, t) : {};
}

function ad(e) {
    return e && "object" === Mf(e) && e.prefix && e.iconName && e.icon ? e : Pf.icon ? Pf.icon(e) : null === e ? null : "object" === Mf(e) && e.prefix && e.iconName ? e : Array.isArray(e) && 2 === e.length ? {
        prefix: e[0],
        iconName: e[1]
    } : "string" == typeof e ? {
        prefix: "fas",
        iconName: e
    } : void 0;
}

var cd = cn({
    name: "FontAwesomeIcon",
    props: {
        border: {
            type: Boolean,
            default: !1
        },
        fixedWidth: {
            type: Boolean,
            default: !1
        },
        flip: {
            type: [ Boolean, String ],
            default: !1,
            validator: function(e) {
                return [ !0, !1, "horizontal", "vertical", "both" ].indexOf(e) > -1;
            }
        },
        icon: {
            type: [ Object, Array, String ],
            required: !0
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
            default: !1
        },
        pull: {
            type: String,
            default: null,
            validator: function(e) {
                return [ "right", "left" ].indexOf(e) > -1;
            }
        },
        pulse: {
            type: Boolean,
            default: !1
        },
        rotation: {
            type: [ String, Number ],
            default: null,
            validator: function(e) {
                return [ 90, 180, 270 ].indexOf(Number.parseInt(e, 10)) > -1;
            }
        },
        swapOpacity: {
            type: Boolean,
            default: !1
        },
        size: {
            type: String,
            default: null,
            validator: function(e) {
                return [ "2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x" ].indexOf(e) > -1;
            }
        },
        spin: {
            type: Boolean,
            default: !1
        },
        transform: {
            type: [ String, Object ],
            default: null
        },
        symbol: {
            type: [ Boolean, String ],
            default: !1
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
            default: !1
        },
        bounce: {
            type: Boolean,
            default: !1
        },
        shake: {
            type: Boolean,
            default: !1
        },
        beat: {
            type: Boolean,
            default: !1
        },
        fade: {
            type: Boolean,
            default: !1
        },
        beatFade: {
            type: Boolean,
            default: !1
        },
        flash: {
            type: Boolean,
            default: !1
        },
        spinPulse: {
            type: Boolean,
            default: !1
        },
        spinReverse: {
            type: Boolean,
            default: !1
        }
    },
    setup: function(e, t) {
        var n = t.attrs, r = _o((function() {
            return ad(e.icon);
        })), o = _o((function() {
            return sd("classes", function(e) {
                var t, n = (Ff(Ff(Ff(Ff(Ff(Ff(Ff(Ff(Ff(Ff(t = {
                    "fa-spin": e.spin,
                    "fa-pulse": e.pulse,
                    "fa-fw": e.fixedWidth,
                    "fa-border": e.border,
                    "fa-li": e.listItem,
                    "fa-inverse": e.inverse,
                    "fa-flip": !0 === e.flip,
                    "fa-flip-horizontal": "horizontal" === e.flip || "both" === e.flip,
                    "fa-flip-vertical": "vertical" === e.flip || "both" === e.flip
                }, "fa-".concat(e.size), null !== e.size), "fa-rotate-".concat(e.rotation), null !== e.rotation), "fa-pull-".concat(e.pull), null !== e.pull), "fa-swap-opacity", e.swapOpacity), "fa-bounce", e.bounce), "fa-shake", e.shake), "fa-beat", e.beat), "fa-fade", e.fade), "fa-beat-fade", e.beatFade), "fa-flash", e.flash), 
                Ff(Ff(t, "fa-spin-pulse", e.spinPulse), "fa-spin-reverse", e.spinReverse));
                return Object.keys(n).map((function(e) {
                    return n[e] ? e : null;
                })).filter((function(e) {
                    return e;
                }));
            }(e));
        })), i = _o((function() {
            return sd("transform", "string" == typeof e.transform ? Pf.transform(e.transform) : e.transform);
        })), s = _o((function() {
            return sd("mask", ad(e.mask));
        })), a = _o((function() {
            return jf(r.value, Nf(Nf(Nf(Nf({}, o.value), i.value), s.value), {}, {
                symbol: e.symbol,
                title: e.title,
                titleId: e.titleId,
                maskId: e.maskId
            }));
        }));
        kr(a, (function(e) {
            if (!e) return function() {
                var e;
                !id && console && "function" == typeof console.error && (e = console).error.apply(e, arguments);
            }("Could not find one or more icon(s)", r.value, s.value);
        }), {
            immediate: !0
        });
        var c = _o((function() {
            return a.value ? od(a.value.abstract[0], {}, n) : null;
        }));
        return function() {
            return c.value;
        };
    }
});

const ld = {
    prefix: "fas",
    iconName: "xmark",
    icon: [ 384, 512, [ 128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times" ], "f00d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" ]
}, ud = {
    prefix: "fas",
    iconName: "spinner",
    icon: [ 512, 512, [], "f110", "M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" ]
};

If.add(ud);

const fd = {
    name: "Badges",
    components: {
        FontAwesomeIcon: cd
    },
    data: () => ({
        syncing: !1,
        searchQuery: "",
        loading: !0
    }),
    computed: {
        ..._s([ "getBadges" ]),
        badges() {
            return this.getBadges;
        },
        filteredBadges() {
            return this.badges.filter((e => e.name.toLowerCase().includes(this.searchQuery.toLowerCase())));
        }
    },
    methods: {
        ...ks([ "fetchBadges" ]),
        async syncBadges() {
            this.syncing = !0;
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!e.ok) throw new Error(`Sync failed with status: ${e.status}`);
                const t = await e.json();
                t.success ? await this.fetchBadges() : alert("Failed to sync badges: " + (t.message || "Unknown error"));
            } catch (e) {
                alert("An error occurred while syncing badges: " + e.message), console.error("Sync Error:", e);
            } finally {
                this.syncing = !1;
            }
        }
    },
    async mounted() {
        this.loading = !0, await this.fetchBadges(), this.loading = !1;
    }
}, dd = {
    class: "badges-page"
}, pd = {
    class: "badges-header"
}, hd = [ "disabled" ], gd = {
    key: 0,
    class: "spinner-container"
}, md = {
    key: 1
}, vd = {
    key: 0
}, yd = {
    class: "badge-left"
}, bd = [ "src" ], wd = {
    class: "badge-right"
}, Cd = {
    class: "badge-name"
}, xd = {
    key: 0,
    class: "badge-pill language-pill"
}, Sd = {
    key: 1,
    class: "badge-pill category-pill"
}, _d = {
    key: 2,
    class: "badge-pill expiry-pill"
}, kd = {
    key: 3,
    class: "badge-pill expiry-pill"
}, Od = {
    class: "badge-description"
}, Ed = {
    key: 1
};

const Ad = Vi(fd, [ [ "render", function(e, t, n, r, o, i) {
    const s = In("font-awesome-icon");
    return Wr(), Hr("div", dd, [ eo("div", pd, [ Yt(eo("input", {
        "onUpdate:modelValue": t[0] || (t[0] = e => o.searchQuery = e),
        placeholder: "Search badges...",
        class: "search-input"
    }, null, 512), [ [ Ii, o.searchQuery ] ]), eo("button", {
        onClick: t[1] || (t[1] = (...e) => i.syncBadges && i.syncBadges(...e)),
        class: "sync-button",
        disabled: o.syncing
    }, [ o.syncing ? (Wr(), Xr(s, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : oo("", !0), ro(" " + X(o.syncing ? "Syncing..." : "Sync Badges"), 1) ], 8, hd) ]), o.loading ? (Wr(), 
    Hr("div", gd, [ to(s, {
        icon: "spinner",
        spin: "",
        class: "loading-spinner"
    }) ])) : (Wr(), Hr("div", md, [ i.filteredBadges.length > 0 ? (Wr(), Hr("div", vd, [ (Wr(!0), 
    Hr(Rr, null, Tn(i.filteredBadges, (e => (Wr(), Hr("div", {
        key: e.id,
        class: "badge-card"
    }, [ eo("div", yd, [ eo("img", {
        src: e.image,
        alt: "Badge Image",
        class: "badge-image"
    }, null, 8, bd) ]), eo("div", wd, [ eo("h2", Cd, [ ro(X(e.name) + " ", 1), e.alt_language.length > 0 && "N/A" !== e.alt_language ? (Wr(), 
    Hr("span", xd, X(e.alt_language.join(", ")), 1)) : oo("", !0), e.category.length > 0 ? (Wr(), 
    Hr("span", Sd, X(e.category.join(", ")), 1)) : oo("", !0), 1 === parseInt(e.expires) ? (Wr(), 
    Hr("span", _d, "Expires after 1 day")) : parseInt(e.expires) > 1 ? (Wr(), Hr("span", kd, "Expires after " + X(e.expires) + " days", 1)) : oo("", !0) ]), eo("p", Od, X(e.description.length > 380 ? e.description.slice(0, 370) + "..." : e.description), 1) ]) ])))), 128)) ])) : (Wr(), 
    Hr("p", Ed, "No badges found. Please sync to load badges.")) ])) ]);
} ], [ "__scopeId", "data-v-5d6355ed" ] ]), Id = {
    LearnDash: {
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
    }
};

If.add(ud);

const Pd = {
    name: "Triggers",
    components: {
        FontAwesomeIcon: cd
    },
    data: () => ({
        tempIdCounter: 1,
        showDeleteModal: !1,
        triggerToDelete: null,
        triggerOptions: Id,
        searchQuery: "",
        loading: !0
    }),
    computed: {
        ..._s([ "getBadges", "getTriggers" ]),
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
        ...ks([ "fetchBadges", "fetchTriggers", "saveTriggerToStore", "deleteTrigger" ]),
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
            return (null == (t = this.availableTriggerTypes(e)[e.trigger_type]) ? void 0 : t.objects) || [];
        },
        availableLabel(e) {
            var t;
            return (null == (t = this.availableTriggerTypes(e)[e.trigger_type]) ? void 0 : t.label) || "Object";
        },
        addNewTrigger() {
            if (0 === this.badges.length) return void console.error("No badges available to assign to the trigger.");
            const e = {
                tempId: this.tempIdCounter++,
                badge_id: this.badges[0].id,
                extension: "WordPress",
                trigger_type: "User Created",
                object: "",
                isEditing: !0
            };
            this.$store.commit("addTrigger", e);
        },
        async editTrigger(e) {
            e.isEditing = !0, await this.updateTriggerFields(e);
        },
        async updateTriggerFields(e) {
            const t = this.availableObjects(e)[0];
            if (t) {
                const n = await this.fetchPostsByType(t);
                e.availablePosts = n;
            } else e.availablePosts = [];
        },
        async saveTrigger(e) {
            var t;
            try {
                const n = (null == (t = e.availablePosts.find((t => t.id === e.object))) ? void 0 : t.title) || "", r = await this.saveTriggerToStore({
                    id: e.id,
                    badge_id: e.badge_id,
                    extension: e.extension,
                    trigger_type: e.trigger_type,
                    object: e.object,
                    object_title: n
                });
                if (e.tempId) {
                    -1 !== this.triggers.findIndex((t => t.tempId === e.tempId)) && this.$store.commit("deleteTrigger", e.tempId);
                }
                -1 === this.triggers.findIndex((e => e.id === r.trigger.id)) && this.$store.commit("addTrigger", r.trigger), 
                e.object_title = r.trigger.object_title, e.id = r.trigger.id, e.isEditing = !1;
            } catch (n) {
                console.error("Error saving trigger:", n);
            }
        },
        cancelTrigger(e) {
            if (e.id) {
                const t = this.triggers.find((t => t.id === e.id));
                Object.assign(e, t), e.isEditing = !1;
            } else this.$store.commit("deleteTrigger", e.tempId);
        },
        confirmDelete(e) {
            this.triggerToDelete = e, this.showDeleteModal = !0;
        },
        async deleteTrigger() {
            try {
                this.triggerToDelete.id ? await this.$store.dispatch("deleteTrigger", this.triggerToDelete.id) : this.$store.commit("deleteTrigger", this.triggerToDelete.tempId);
            } catch (e) {
                console.error("Error deleting trigger:", e);
            } finally {
                this.showDeleteModal = !1, this.triggerToDelete = null;
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
                if (!t.ok) throw new Error("Failed to fetch posts");
                return (await t.json()).posts;
            } catch (t) {
                return console.error("An error occurred while fetching posts: " + t.message), [];
            }
        }
    },
    async mounted() {
        this.loading = !0, await this.fetchTriggers(), await this.fetchBadges(), this.loading = !1;
    }
}, jd = {
    class: "triggers-page"
}, Td = {
    class: "triggers-header"
}, Nd = {
    key: 0,
    class: "spinner-container"
}, Ld = {
    key: 1
}, Md = {
    key: 0
}, Fd = {
    class: "trigger-left"
}, Dd = {
    class: "trigger-image"
}, Rd = [ "src" ], Bd = {
    class: "trigger-right"
}, $d = {
    class: "trigger-header"
}, Vd = {
    class: "badge-name-select"
}, zd = {
    key: 0
}, Ud = [ "onUpdate:modelValue" ], Wd = [ "value" ], Gd = {
    key: 1
}, qd = {
    class: "badge-name"
}, Kd = {
    class: "trigger-actions"
}, Hd = [ "onClick" ], Xd = [ "onClick" ], Qd = [ "onClick" ], Yd = [ "onClick" ], Jd = {
    class: "trigger-field-group"
}, Zd = {
    key: 0,
    class: "trigger-fields-row"
}, ep = {
    class: "trigger-field"
}, tp = [ "onUpdate:modelValue", "onChange" ], np = [ "value" ], rp = {
    class: "trigger-field"
}, op = [ "onUpdate:modelValue", "onChange" ], ip = [ "value" ], sp = {
    class: "trigger-field"
}, ap = [ "onUpdate:modelValue" ], cp = [ "value" ], lp = {
    key: 1,
    class: "trigger-fields-row"
}, up = {
    class: "trigger-field"
}, fp = {
    class: "trigger-value"
}, dp = {
    class: "trigger-field"
}, pp = {
    class: "trigger-value"
}, hp = {
    class: "trigger-field"
}, gp = {
    class: "trigger-value"
}, mp = {
    key: 1
}, vp = {
    key: 2,
    class: "modal"
}, yp = {
    class: "modal-content"
};

const bp = Vi(Pd, [ [ "render", function(e, t, n, r, o, i) {
    const s = In("font-awesome-icon");
    return Wr(), Hr("div", jd, [ eo("div", Td, [ Yt(eo("input", {
        "onUpdate:modelValue": t[0] || (t[0] = e => o.searchQuery = e),
        placeholder: "Search triggers...",
        class: "search-input"
    }, null, 512), [ [ Ii, o.searchQuery ] ]), eo("button", {
        onClick: t[1] || (t[1] = (...e) => i.addNewTrigger && i.addNewTrigger(...e)),
        class: "add-trigger-button"
    }, "Add New Trigger") ]), o.loading ? (Wr(), Hr("div", Nd, [ to(s, {
        icon: "spinner",
        spin: "",
        class: "loading-spinner"
    }) ])) : (Wr(), Hr("div", Ld, [ i.filteredTriggers.length > 0 ? (Wr(), Hr("div", Md, [ (Wr(!0), 
    Hr(Rr, null, Tn(i.filteredTriggers, (e => (Wr(), Hr("div", {
        key: e.id || e.tempId,
        class: "trigger-card"
    }, [ eo("div", Fd, [ eo("div", Dd, [ eo("img", {
        src: i.getBadgeImage(e.badge_id),
        alt: "Badge Image"
    }, null, 8, Rd) ]) ]), eo("div", Bd, [ eo("div", $d, [ eo("div", Vd, [ e.isEditing ? (Wr(), 
    Hr("div", zd, [ Yt(eo("select", {
        "onUpdate:modelValue": t => e.badge_id = t,
        class: "select-box"
    }, [ (Wr(!0), Hr(Rr, null, Tn(i.badges, (e => (Wr(), Hr("option", {
        key: e.id,
        value: e.id
    }, X(e.name), 9, Wd)))), 128)) ], 8, Ud), [ [ Ni, e.badge_id ] ]) ])) : (Wr(), Hr("div", Gd, [ eo("label", qd, X(i.getBadgeName(e.badge_id)), 1) ])) ]), eo("div", Kd, [ e.isEditing ? (Wr(), 
    Hr("button", {
        key: 0,
        onClick: t => i.saveTrigger(e),
        class: "save-button"
    }, "Save", 8, Hd)) : oo("", !0), e.isEditing ? (Wr(), Hr("button", {
        key: 1,
        onClick: t => i.cancelTrigger(e),
        class: "cancel-button"
    }, "Cancel", 8, Xd)) : oo("", !0), e.isEditing ? (Wr(), Hr("button", {
        key: 2,
        onClick: t => i.confirmDelete(e),
        class: "delete-button"
    }, "Delete", 8, Qd)) : (Wr(), Hr("button", {
        key: 3,
        onClick: t => i.editTrigger(e),
        class: "edit-button"
    }, "Edit", 8, Yd)) ]) ]), eo("div", Jd, [ e.isEditing ? (Wr(), Hr("div", Zd, [ eo("div", ep, [ t[4] || (t[4] = eo("label", null, "Extension", -1)), Yt(eo("select", {
        "onUpdate:modelValue": t => e.extension = t,
        class: "select-box",
        onChange: t => i.updateTriggerFields(e)
    }, [ (Wr(!0), Hr(Rr, null, Tn(o.triggerOptions, ((e, t) => (Wr(), Hr("option", {
        key: t,
        value: t
    }, X(t), 9, np)))), 128)) ], 40, tp), [ [ Ni, e.extension ] ]) ]), eo("div", rp, [ t[5] || (t[5] = eo("label", null, "Trigger Action", -1)), Yt(eo("select", {
        "onUpdate:modelValue": t => e.trigger_type = t,
        class: "select-box",
        onChange: t => i.updateTriggerFields(e)
    }, [ (Wr(!0), Hr(Rr, null, Tn(i.availableTriggerTypes(e), ((e, t) => (Wr(), Hr("option", {
        key: t,
        value: t
    }, X(t), 9, ip)))), 128)) ], 40, op), [ [ Ni, e.trigger_type ] ]) ]), eo("div", sp, [ eo("label", null, X(i.availableLabel(e)), 1), Yt(eo("select", {
        "onUpdate:modelValue": t => e.object = t,
        class: "select-box"
    }, [ (Wr(!0), Hr(Rr, null, Tn(e.availablePosts, (e => (Wr(), Hr("option", {
        key: e.id,
        value: e.id
    }, X(e.title) + " (ID: " + X(e.id) + ") ", 9, cp)))), 128)) ], 8, ap), [ [ Ni, e.object ] ]) ]) ])) : (Wr(), 
    Hr("div", lp, [ eo("div", up, [ t[6] || (t[6] = eo("label", null, "Extension", -1)), eo("p", fp, X(e.extension), 1) ]), eo("div", dp, [ t[7] || (t[7] = eo("label", null, "Trigger Action", -1)), eo("p", pp, X(e.trigger_type), 1) ]), eo("div", hp, [ eo("label", null, X(i.availableLabel(e)), 1), eo("p", gp, X(e.object_title) + " (ID: " + X(e.object) + ")", 1) ]) ])) ]) ]) ])))), 128)) ])) : (Wr(), 
    Hr("p", mp, "Get started by creating your first badge issuing trigger.")) ])), o.showDeleteModal ? (Wr(), 
    Hr("div", vp, [ eo("div", yp, [ t[8] || (t[8] = eo("h3", null, "Confirm Delete", -1)), t[9] || (t[9] = eo("p", null, "Are you sure you want to delete this trigger?", -1)), eo("button", {
        onClick: t[2] || (t[2] = e => i.deleteTrigger(o.triggerToDelete)),
        class: "confirm-delete-button"
    }, "Yes, Delete"), eo("button", {
        onClick: t[3] || (t[3] = e => o.showDeleteModal = !1),
        class: "confirm-cancel-button"
    }, "Cancel") ]) ])) : oo("", !0) ]);
} ], [ "__scopeId", "data-v-1ff4b462" ] ]);

If.add({
    prefix: "fas",
    iconName: "eye",
    icon: [ 576, 512, [ 128065 ], "f06e", "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" ]
}, {
    prefix: "fas",
    iconName: "eye-slash",
    icon: [ 640, 512, [], "f070", "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" ]
}, {
    prefix: "fas",
    iconName: "check",
    icon: [ 448, 512, [ 10003, 10004 ], "f00c", "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" ]
}, ud, {
    prefix: "fas",
    iconName: "thumbs-up",
    icon: [ 512, 512, [ 128077, 61575 ], "f164", "M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" ]
}, ld);

const wp = {
    name: "Settings",
    components: {
        FontAwesomeIcon: cd
    },
    data: () => ({
        status: "Connecting...",
        lastSync: "Checking...",
        clientId: "",
        clientSecret: "",
        clientIdCancred: "",
        clientSecretCancred: "",
        enableLog: !1,
        purgeLog: "1_month",
        showClientId: !1,
        showClientSecret: !1,
        clientIdChanged: !1,
        clientSecretChanged: !1,
        savingClientId: !1,
        savingClientSecret: !1,
        saveSuccessClientId: !1,
        saveSuccessClientSecret: !1,
        saveErrorClientId: !1,
        saveErrorClientSecret: !1,
        isSyncing: !1,
        syncSuccess: !1,
        syncError: !1,
        syncButtonText: "Sync Now",
        syncButtonClass: "pill-green",
        syncIcon: "sync",
        showClientIdCancred: !1,
        showClientSecretCancred: !1,
        clientIdCancredChanged: !1,
        clientSecretCancredChanged: !1,
        savingClientIdCancred: !1,
        savingClientSecretCancred: !1,
        saveSuccessClientIdCancred: !1,
        saveSuccessClientSecretCancred: !1,
        saveErrorClientIdCancred: !1,
        saveErrorClientSecretCancred: !1
    }),
    computed: {
        badges() {
            return this.$store.getters.getBadges;
        },
        obfStatus() {
            return this.$store.getters.getConnectionStatus("obf");
        },
        obfStatusClass() {
            return this.$store.getters.getConnectionStatusClass("obf");
        },
        cancredStatus() {
            return this.$store.getters.getConnectionStatus("cancred");
        },
        cancredStatusClass() {
            return this.$store.getters.getConnectionStatusClass("cancred");
        }
    },
    methods: {
        timeAgo: function(e) {
            if ("Checking..." === e) return "Checking...";
            const t = new Date, n = Math.floor((t - new Date(e + "Z")) / 1e3);
            if (n < 60) return `${n} secs ago`;
            if (n < 3600) {
                const e = Math.floor(n / 60);
                return `${e} minute${e > 1 ? "s" : ""} ago`;
            }
            if (n < 86400) {
                const e = Math.floor(n / 3600);
                return `${e} hour${e > 1 ? "s" : ""} ago`;
            }
            if (n < 604800) {
                const e = Math.floor(n / 86400);
                return `${e} day${e > 1 ? "s" : ""} ago`;
            }
            if (n < 2419200) {
                const e = Math.floor(n / 604800);
                return `${e} week${e > 1 ? "s" : ""} ago`;
            }
            if (n < 31536e3) {
                const e = Math.floor(n / 2419200);
                return `${e} month${e > 1 ? "s" : ""} ago`;
            }
            {
                const e = Math.floor(n / 31536e3);
                return `${e} year${e > 1 ? "s" : ""} ago`;
            }
        },
        timeAgoClass: function(e) {
            if ("Checking..." === e) return "pill-yellow";
            const t = new Date, n = Math.floor((t - new Date(e + "Z")) / 1e3);
            return n < 60 ? "pill-green" : n < 86400 ? "pill-blue" : n < 604800 ? "pill-yellow" : "pill-red";
        },
        toggleClientIdVisibility() {
            this.showClientId = !this.showClientId;
        },
        toggleClientIdVisibilityCancred() {
            this.showClientIdCancred = !this.showClientIdCancred;
        },
        toggleClientSecretVisibility() {
            this.showClientSecret = !this.showClientSecret;
        },
        toggleClientSecretVisibilityCancred() {
            this.showClientSecretCancred = !this.showClientSecretCancred;
        },
        onInputChange(e) {
            "clientId" === e ? (this.clientIdChanged = !0, this.saveSuccessClientId = !1, this.saveErrorClientId = !1) : "clientSecret" === e ? (this.clientSecretChanged = !0, 
            this.saveSuccessClientSecret = !1, this.saveErrorClientSecret = !1) : "clientIdCancred" === e ? (this.clientIdCancredChanged = !0, 
            this.saveSuccessClientIdCancred = !1, this.saveErrorClientIdCancred = !1) : "clientSecretCancred" === e && (this.clientSecretCancredChanged = !0, 
            this.saveSuccessClientSecretCancred = !1, this.saveErrorClientSecretCancred = !1);
        },
        buttonClass(e) {
            if ("clientId" === e) {
                if (this.savingClientId) return "pill-blue";
                if (this.saveSuccessClientId) return "pill-green";
                if (this.saveErrorClientId) return "pill-red";
            } else if ("clientSecret" === e) {
                if (this.savingClientSecret) return "pill-blue";
                if (this.saveSuccessClientSecret) return "pill-green";
                if (this.saveErrorClientSecret) return "pill-red";
            }
            return "";
        },
        buttonClassCancred(e) {
            if ("clientIdCancred" === e) {
                if (this.savingClientIdCancred) return "pill-blue";
                if (this.saveSuccessClientIdCancred) return "pill-green";
                if (this.saveErrorClientIdCancred) return "pill-red";
            } else if ("clientSecretCancred" === e) {
                if (this.savingClientSecretCancred) return "pill-blue";
                if (this.saveSuccessClientSecretCancred) return "pill-green";
                if (this.saveErrorClientSecretCancred) return "pill-red";
            }
            return "";
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
                if (!e.ok) throw new Error("Failed to fetch last sync time");
                const t = await e.json();
                t.last_sync && (this.lastSync = new Date(t.last_sync));
            } catch (e) {
                console.error("Error fetching last sync time:", e);
            }
        },
        async saveOption(e) {
            try {
                let t;
                "clientId" === e ? (this.savingClientId = !0, this.saveSuccessClientId = !1, t = this.clientId) : "clientSecret" === e && (this.savingClientSecret = !0, 
                this.saveSuccessClientSecret = !1, t = this.clientSecret), await this.saveToWordPressOption({
                    client_id: this.clientId,
                    client_secret: this.clientSecret
                }), await this.reloadConnectionStatus();
            } catch (t) {
                console.error(`Failed to save ${e}:`, t), "clientId" === e ? this.saveErrorClientId = !0 : "clientSecret" === e && (this.saveErrorClientSecret = !0);
            } finally {
                "clientId" === e ? this.savingClientId = !1 : "clientSecret" === e && (this.savingClientSecret = !1);
            }
        },
        async saveOptionCancred(e) {
            try {
                let t;
                "clientIdCancred" === e ? (this.savingClientIdCancred = !0, this.saveSuccessClientIdCancred = !1, 
                t = this.clientIdCancred) : "clientSecretCancred" === e && (this.savingClientSecretCancred = !0, 
                this.saveSuccessClientSecretCancred = !1, t = this.clientSecretCancred), await this.saveToWordPressOptionCancred({
                    client_id: this.clientIdCancred,
                    client_secret: this.clientSecretCancred
                });
            } catch (t) {
                console.error(`Failed to save ${e}:`, t), "clientId" === e && (this.saveSuccessClientId = !0, 
                this.clientIdChanged = !1), "clientIdCancred" === e ? this.saveErrorClientIdCancred = !0 : "clientSecretCancred" === e && (this.saveErrorClientSecretCancred = !0);
            } finally {
                "clientIdCancred" === e ? this.savingClientIdCancred = !1 : "clientSecretCancred" === e && (this.savingClientSecretCancred = !1);
            }
        },
        async reloadConnectionStatus() {
            await this.$store.dispatch("fetchConnectionStatus");
        },
        async saveToWordPressOption(e) {
            const t = await fetch("/wp-json/pathwise-badge-connect/v1/settings/obf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "pbc-api-key": pbcOptions.pbcApiKey,
                    "X-WP-Nonce": pbcOptions.nonce
                },
                body: JSON.stringify(e)
            });
            if (!t.ok) throw new Error("Network response was not ok");
            const n = await t.json();
            if (!n.success) throw new Error(n.message || "Failed to save settings");
        },
        async saveToWordPressOptionCancred(e) {
            const t = await fetch("/wp-json/pathwise-badge-connect/v1/settings/cancred", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "pbc-api-key": pbcOptions.pbcApiKey,
                    "X-WP-Nonce": pbcOptions.nonce
                },
                body: JSON.stringify(e)
            });
            if (!t.ok) throw new Error("Network response was not ok");
            const n = await t.json();
            if (!n.success) throw new Error(n.message || "Failed to save CanCred settings");
        },
        async syncNow() {
            this.isSyncing = !0, this.syncButtonText = "Syncing", this.syncButtonClass = "pill-blue", 
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
                if (!e.ok) throw new Error("Failed to sync badges");
                const t = await e.json();
                if (!t.success) throw new Error(t.message || "Unknown error during sync");
                this.lastSync = new Date(t.last_sync), this.$store.commit("setBadges", t.badges), 
                this.syncSuccess = !0, this.syncButtonText = "Sync Now", this.syncButtonClass = "pill-green", 
                this.syncIcon = "sync";
            } catch (e) {
                console.error("Sync failed:", e), this.syncError = !0, this.syncButtonText = "Error", 
                this.syncButtonClass = "pill-red", this.syncIcon = "times", setTimeout((() => {
                    this.resetSyncButton();
                }), 5e3);
            } finally {
                this.isSyncing = !1;
            }
        },
        resetSyncButton() {
            this.syncButtonText = "Sync Now", this.syncButtonClass = "pill-green", this.syncIcon = "sync", 
            this.syncError = !1;
        }
    },
    async mounted() {
        await this.fetchLastSync(), await this.$store.dispatch("fetchSettings"), await this.$store.dispatch("fetchConnectionStatus"), 
        await this.$store.dispatch("fetchCancredSettings"), await this.$store.dispatch("fetchCancredConnectionStatus");
        const e = this.$store.getters.getObfSettings;
        this.clientId = e.clientId, this.clientSecret = e.clientSecret;
        const t = this.$store.getters.getCancredSettings;
        this.clientIdCancred = t.clientId, this.clientSecretCancred = t.clientSecret;
    }
}, Cp = {
    class: "settings-container"
}, xp = {
    class: "section"
}, Sp = {
    class: "flex-container"
}, _p = {
    class: "flex-item value-item"
}, kp = {
    class: "flex-container"
}, Op = {
    class: "flex-item value-item"
}, Ep = {
    class: "flex-container"
}, Ap = {
    class: "value-item"
}, Ip = [ "disabled" ], Pp = {
    class: "flex-container"
}, jp = {
    class: "flex-item value-item"
}, Tp = {
    class: "input-group"
}, Np = [ "type" ], Lp = [ "disabled" ], Mp = {
    class: "flex-container"
}, Fp = {
    class: "flex-item value-item"
}, Dp = {
    class: "input-group"
}, Rp = [ "type" ], Bp = [ "disabled" ], $p = {
    class: "section"
}, Vp = {
    class: "flex-container"
}, zp = {
    class: "flex-item value-item"
}, Up = {
    class: "input-group"
}, Wp = [ "type" ], Gp = [ "disabled" ], qp = {
    class: "flex-container"
}, Kp = {
    class: "flex-item value-item"
}, Hp = {
    class: "input-group"
}, Xp = [ "type" ], Qp = [ "disabled" ];

const Yp = Vi(wp, [ [ "render", function(e, t, n, r, o, i) {
    const s = In("font-awesome-icon");
    return Wr(), Hr("div", Cp, [ eo("div", xp, [ eo("div", Sp, [ t[17] || (t[17] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "status"
    }, "OpenBadge Connection Status:") ], -1)), eo("div", _p, [ eo("span", {
        class: U(i.obfStatusClass)
    }, X(i.obfStatus), 3) ]) ]), eo("div", kp, [ t[18] || (t[18] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "cancredStatus"
    }, "CanCred Connection Status:") ], -1)), eo("div", Op, [ eo("span", {
        class: U(i.cancredStatusClass)
    }, X(i.cancredStatus), 3) ]) ]), eo("div", Ep, [ t[19] || (t[19] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "lastSync"
    }, "Last Sync:") ], -1)), eo("div", Ap, [ eo("span", {
        class: U([ "pill", i.timeAgoClass(o.lastSync) ])
    }, X(i.timeAgo(o.lastSync)), 3), eo("button", {
        onClick: t[0] || (t[0] = (...e) => i.syncNow && i.syncNow(...e)),
        class: U([ [ "pill", o.syncButtonClass ], "sync-button" ]),
        disabled: o.isSyncing
    }, [ to(s, {
        icon: o.syncIcon,
        spin: o.isSyncing
    }, null, 8, [ "icon", "spin" ]), ro(" " + X(o.syncButtonText), 1) ], 10, Ip) ]) ]), t[25] || (t[25] = eo("hr", null, null, -1)), t[26] || (t[26] = eo("h3", null, "Open Badge Factory API", -1)), eo("div", Pp, [ t[20] || (t[20] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "clientId"
    }, "Open Badge Factory API Client ID:") ], -1)), eo("div", jp, [ eo("div", Tp, [ Yt(eo("input", {
        type: o.showClientId ? "text" : "password",
        id: "clientId",
        "onUpdate:modelValue": t[1] || (t[1] = e => o.clientId = e),
        onInput: t[2] || (t[2] = e => i.onInputChange("clientId"))
    }, null, 40, Np), [ [ Di, o.clientId ] ]), o.clientIdChanged || o.saveSuccessClientId || o.saveErrorClientId ? (Wr(), 
    Hr("button", {
        key: 0,
        onClick: t[3] || (t[3] = e => i.saveOption("clientId")),
        class: U([ "save-button", i.buttonClass("clientId") ]),
        disabled: o.savingClientId
    }, [ o.savingClientId ? (Wr(), Xr(s, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : o.saveSuccessClientId ? (Wr(), Xr(s, {
        key: 1,
        icon: "thumbs-up"
    })) : o.saveErrorClientId ? (Wr(), Xr(s, {
        key: 2,
        icon: "times"
    })) : (Wr(), Xr(s, {
        key: 3,
        icon: "check"
    })) ], 10, Lp)) : oo("", !0), eo("button", {
        onClick: t[4] || (t[4] = (...e) => i.toggleClientIdVisibility && i.toggleClientIdVisibility(...e)),
        class: "toggle-visibility pill-blue"
    }, [ to(s, {
        icon: o.showClientId ? "eye-slash" : "eye"
    }, null, 8, [ "icon" ]) ]) ]) ]) ]), eo("div", Mp, [ t[21] || (t[21] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "clientSecret"
    }, "Open Badge Factory API Client Secret:") ], -1)), eo("div", Fp, [ eo("div", Dp, [ Yt(eo("input", {
        type: o.showClientSecret ? "text" : "password",
        id: "clientSecret",
        "onUpdate:modelValue": t[5] || (t[5] = e => o.clientSecret = e),
        onInput: t[6] || (t[6] = e => i.onInputChange("clientSecret"))
    }, null, 40, Rp), [ [ Di, o.clientSecret ] ]), o.clientSecretChanged || o.saveSuccessClientSecret || o.saveErrorClientSecret ? (Wr(), 
    Hr("button", {
        key: 0,
        onClick: t[7] || (t[7] = e => i.saveOption("clientSecret")),
        class: U([ "save-button", i.buttonClass("clientSecret") ]),
        disabled: o.savingClientSecret
    }, [ o.savingClientSecret ? (Wr(), Xr(s, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : o.saveSuccessClientSecret ? (Wr(), Xr(s, {
        key: 1,
        icon: "thumbs-up"
    })) : o.saveErrorClientSecret ? (Wr(), Xr(s, {
        key: 2,
        icon: "times"
    })) : (Wr(), Xr(s, {
        key: 3,
        icon: "check"
    })) ], 10, Bp)) : oo("", !0), eo("button", {
        onClick: t[8] || (t[8] = (...e) => i.toggleClientSecretVisibility && i.toggleClientSecretVisibility(...e)),
        class: "toggle-visibility pill-blue"
    }, [ to(s, {
        icon: o.showClientSecret ? "eye-slash" : "eye"
    }, null, 8, [ "icon" ]) ]) ]) ]) ]), t[27] || (t[27] = eo("hr", null, null, -1)), eo("div", $p, [ t[24] || (t[24] = eo("h3", null, "CanCred Badge Factory API", -1)), eo("div", Vp, [ t[22] || (t[22] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "clientIdCancred"
    }, "CanCred API Client ID:") ], -1)), eo("div", zp, [ eo("div", Up, [ Yt(eo("input", {
        type: o.showClientIdCancred ? "text" : "password",
        id: "clientIdCancred",
        "onUpdate:modelValue": t[9] || (t[9] = e => o.clientIdCancred = e),
        onInput: t[10] || (t[10] = e => i.onInputChange("clientIdCancred"))
    }, null, 40, Wp), [ [ Di, o.clientIdCancred ] ]), o.clientIdCancredChanged || o.saveSuccessClientIdCancred || o.saveErrorClientIdCancred ? (Wr(), 
    Hr("button", {
        key: 0,
        onClick: t[11] || (t[11] = e => i.saveOptionCancred("clientIdCancred")),
        class: U([ "save-button", i.buttonClassCancred("clientIdCancred") ]),
        disabled: o.savingClientIdCancred
    }, [ o.savingClientIdCancred ? (Wr(), Xr(s, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : o.saveSuccessClientIdCancred ? (Wr(), Xr(s, {
        key: 1,
        icon: "thumbs-up"
    })) : o.saveErrorClientIdCancred ? (Wr(), Xr(s, {
        key: 2,
        icon: "times"
    })) : (Wr(), Xr(s, {
        key: 3,
        icon: "check"
    })) ], 10, Gp)) : oo("", !0), eo("button", {
        onClick: t[12] || (t[12] = (...e) => i.toggleClientIdVisibilityCancred && i.toggleClientIdVisibilityCancred(...e)),
        class: "toggle-visibility pill-blue"
    }, [ to(s, {
        icon: o.showClientIdCancred ? "eye-slash" : "eye"
    }, null, 8, [ "icon" ]) ]) ]) ]) ]), eo("div", qp, [ t[23] || (t[23] = eo("div", {
        class: "flex-item label-item"
    }, [ eo("label", {
        for: "clientSecretCancred"
    }, "CanCred API Client Secret:") ], -1)), eo("div", Kp, [ eo("div", Hp, [ Yt(eo("input", {
        type: o.showClientSecretCancred ? "text" : "password",
        id: "clientSecretCancred",
        "onUpdate:modelValue": t[13] || (t[13] = e => o.clientSecretCancred = e),
        onInput: t[14] || (t[14] = e => i.onInputChange("clientSecretCancred"))
    }, null, 40, Xp), [ [ Di, o.clientSecretCancred ] ]), o.clientSecretCancredChanged || o.saveSuccessClientSecretCancred || o.saveErrorClientSecretCancred ? (Wr(), 
    Hr("button", {
        key: 0,
        onClick: t[15] || (t[15] = e => i.saveOptionCancred("clientSecretCancred")),
        class: U([ "save-button", i.buttonClassCancred("clientSecretCancred") ]),
        disabled: o.savingClientSecretCancred
    }, [ o.savingClientSecretCancred ? (Wr(), Xr(s, {
        key: 0,
        icon: "spinner",
        spin: ""
    })) : o.saveSuccessClientSecretCancred ? (Wr(), Xr(s, {
        key: 1,
        icon: "thumbs-up"
    })) : o.saveErrorClientSecretCancred ? (Wr(), Xr(s, {
        key: 2,
        icon: "times"
    })) : (Wr(), Xr(s, {
        key: 3,
        icon: "check"
    })) ], 10, Qp)) : oo("", !0), eo("button", {
        onClick: t[16] || (t[16] = (...e) => i.toggleClientSecretVisibilityCancred && i.toggleClientSecretVisibilityCancred(...e)),
        class: "toggle-visibility pill-blue"
    }, [ to(s, {
        icon: o.showClientSecretCancred ? "eye-slash" : "eye"
    }, null, 8, [ "icon" ]) ]) ]) ]) ]) ]) ]) ]);
} ], [ "__scopeId", "data-v-c270b6a1" ] ]);

If.add(ud);

const Jp = {
    name: "Log",
    components: {
        FontAwesomeIcon: cd
    },
    data: () => ({
        logs: [],
        searchQuery: "",
        sortColumn: "created_at",
        sortOrder: "desc",
        currentPage: 1,
        perPage: 10,
        loading: !0,
        selectedFilter: "all"
    }),
    computed: {
        filteredLogs() {
            if (!Array.isArray(this.logs)) return [];
            let e = [ ...this.logs ];
            "admin" === this.selectedFilter ? e = e.filter((e => "" === e.post_id)) : "users" === this.selectedFilter && (e = e.filter((e => "" !== e.post_id))), 
            this.searchQuery && (e = e.filter((e => Object.values(e).some((e => String(e).toLowerCase().includes(this.searchQuery.toLowerCase())))))), 
            e = e.sort(((e, t) => {
                const n = "asc" === this.sortOrder ? 1 : -1;
                return e[this.sortColumn] < t[this.sortColumn] ? -1 * n : e[this.sortColumn] > t[this.sortColumn] ? 1 * n : 0;
            }));
            const t = (this.currentPage - 1) * this.perPage, n = this.currentPage * this.perPage;
            return e.slice(t, n);
        },
        totalPages() {
            let e = [ ...this.logs ];
            return "admin" === this.selectedFilter ? e = e.filter((e => "" === e.post_id)) : "users" === this.selectedFilter && (e = e.filter((e => "" !== e.post_id))), 
            this.searchQuery && (e = e.filter((e => Object.values(e).some((e => String(e).toLowerCase().includes(this.searchQuery.toLowerCase())))))), 
            Math.ceil(e.length / this.perPage);
        }
    },
    methods: {
        ...ks([ "fetchLogs" ]),
        async exportToCSV() {
            this.loading = !0;
            try {
                const e = await fetch("/wp-json/pathwise-badge-connect/v1/export-logs", {
                    method: "GET",
                    headers: {
                        "X-WP-Nonce": pbcOptions.nonce,
                        "pbc-api-key": pbcOptions.pbcApiKey
                    }
                });
                if (!e.ok) throw new Error(`Failed to export CSV: ${e.statusText}`);
                const t = await e.blob(), n = window.URL.createObjectURL(t), r = document.createElement("a");
                r.href = n, r.setAttribute("download", "logs-export.csv"), document.body.appendChild(r), 
                r.click(), r.parentNode.removeChild(r);
            } catch (e) {
                console.error("Error exporting CSV:", e), alert("Failed to export logs. Please try again.");
            } finally {
                this.loading = !1;
            }
        },
        async clearLog() {
            if (confirm("Are you sure you want to clear all logs?")) {
                this.loading = !0;
                try {
                    const e = await fetch("/wp-json/pathwise-badge-connect/v1/clear-logs", {
                        method: "DELETE",
                        headers: {
                            "X-WP-Nonce": pbcOptions.nonce,
                            "pbc-api-key": pbcOptions.pbcApiKey
                        }
                    });
                    if (!e.ok) throw new Error(`Failed to clear logs: ${e.statusText}`);
                    alert("Logs cleared successfully."), await this.loadLogs();
                } catch (e) {
                    console.error("Error clearing logs:", e), alert("Failed to clear logs. Please try again.");
                } finally {
                    this.loading = !1;
                }
            }
        },
        async loadLogs() {
            this.loading = !0;
            try {
                const e = await this.fetchLogs();
                e && Array.isArray(e) ? this.logs = e : (console.error("Unexpected response format:", e), 
                this.logs = []);
            } finally {
                this.loading = !1;
            }
        },
        setFilter(e) {
            this.selectedFilter = e, this.currentPage = 1;
        },
        sortBy(e) {
            this.sortColumn === e ? this.sortOrder = "asc" === this.sortOrder ? "desc" : "asc" : (this.sortColumn = e, 
            this.sortOrder = "asc");
        },
        prevPage() {
            this.currentPage > 1 && this.currentPage--;
        },
        nextPage() {
            this.currentPage < this.totalPages && this.currentPage++;
        },
        formatDate: e => new Date(e).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }),
        getBadgeLink: e => e ? "/wp-admin/admin.php?page=pathwise-badge-connect" : "#",
        getPostLink: e => e ? `/wp-admin/post.php?post=${e}&action=edit` : "#",
        getUserLink: e => e ? `/wp-admin/user-edit.php?user_id=${e}` : "#"
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
}, Zp = {
    class: "filter-buttons"
}, eh = {
    key: 0,
    class: "spinner-container"
}, th = {
    key: 1
}, nh = {
    key: 0
}, rh = {
    class: "log-table"
}, oh = [ "href" ], ih = [ "href" ], sh = [ "href" ], ah = {
    key: 1
}, ch = {
    class: "pagination"
}, lh = [ "disabled" ], uh = [ "disabled" ], fh = {
    key: 1,
    class: "no-entries"
};

const dh = Vi(Jp, [ [ "render", function(e, t, n, r, o, i) {
    const s = In("font-awesome-icon");
    return Wr(), Hr("div", null, [ eo("div", Zp, [ eo("button", {
        class: U({
            active: "all" === o.selectedFilter
        }),
        onClick: t[0] || (t[0] = e => i.setFilter("all"))
    }, " All ", 2), eo("button", {
        class: U({
            active: "admin" === o.selectedFilter
        }),
        onClick: t[1] || (t[1] = e => i.setFilter("admin"))
    }, " Admin ", 2), eo("button", {
        class: U({
            active: "users" === o.selectedFilter
        }),
        onClick: t[2] || (t[2] = e => i.setFilter("users"))
    }, " Users ", 2), eo("button", {
        class: "export-button",
        onClick: t[3] || (t[3] = (...e) => i.exportToCSV && i.exportToCSV(...e))
    }, " Export to CSV "), eo("button", {
        class: "clear-log-button",
        onClick: t[4] || (t[4] = (...e) => i.clearLog && i.clearLog(...e))
    }, " Clear Log ") ]), Yt(eo("input", {
        "onUpdate:modelValue": t[5] || (t[5] = e => o.searchQuery = e),
        placeholder: "Search...",
        class: "search-input"
    }, null, 512), [ [ Ii, o.searchQuery ] ]), o.loading ? (Wr(), Hr("div", eh, [ to(s, {
        icon: "spinner",
        spin: "",
        class: "loading-spinner"
    }) ])) : (Wr(), Hr("div", th, [ i.filteredLogs.length > 0 ? (Wr(), Hr("div", nh, [ eo("table", rh, [ eo("thead", null, [ eo("tr", null, [ eo("th", {
        onClick: t[6] || (t[6] = e => i.sortBy("id"))
    }, "ID"), eo("th", {
        onClick: t[7] || (t[7] = e => i.sortBy("user_name"))
    }, "User"), eo("th", {
        onClick: t[8] || (t[8] = e => i.sortBy("badge_name"))
    }, "Badge"), eo("th", {
        onClick: t[9] || (t[9] = e => i.sortBy("type"))
    }, "Type"), eo("th", {
        onClick: t[10] || (t[10] = e => i.sortBy("message"))
    }, "Message"), eo("th", {
        onClick: t[11] || (t[11] = e => i.sortBy("post_title"))
    }, "Where"), eo("th", {
        onClick: t[12] || (t[12] = e => i.sortBy("created_at"))
    }, "When") ]) ]), eo("tbody", null, [ (Wr(!0), Hr(Rr, null, Tn(i.filteredLogs, (e => (Wr(), 
    Hr("tr", {
        key: e.id
    }, [ eo("td", null, X(e.id), 1), eo("td", null, [ eo("a", {
        href: i.getUserLink(e.user_id)
    }, X(e.user_name), 9, oh) ]), eo("td", null, [ eo("a", {
        href: i.getBadgeLink(e.badge_id)
    }, X(e.badge_name), 9, ih) ]), eo("td", null, X(e.type), 1), eo("td", null, X(e.message), 1), eo("td", null, [ e.post_id ? (Wr(), 
    Hr("a", {
        key: 0,
        href: i.getPostLink(e.post_id)
    }, X(e.post_title), 9, sh)) : (Wr(), Hr("span", ah, t[15] || (t[15] = [ eo("a", {
        href: "/wp-admin/admin.php?page=pathwise-badge-connect"
    }, "Badge Admin", -1) ]))) ]), eo("td", null, X(i.formatDate(e.created_at)), 1) ])))), 128)) ]) ]), eo("div", ch, [ eo("button", {
        onClick: t[13] || (t[13] = (...e) => i.prevPage && i.prevPage(...e)),
        disabled: 1 === o.currentPage
    }, "Previous", 8, lh), eo("span", null, "Page " + X(o.currentPage) + " of " + X(i.totalPages), 1), eo("button", {
        onClick: t[14] || (t[14] = (...e) => i.nextPage && i.nextPage(...e)),
        disabled: o.currentPage === i.totalPages
    }, "Next", 8, uh) ]) ])) : (Wr(), Hr("div", fh, " There are currently no entries in the log. ")) ])) ]);
} ], [ "__scopeId", "data-v-0598a141" ] ]), ph = function(e) {
    const t = Xa(e.routes, e), n = e.parseQuery || rc, r = e.stringifyQuery || oc, o = e.history, i = fc(), s = fc(), a = fc(), c = bt(ya, !0);
    let l = ya;
    Vs && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = Ws.bind(null, (e => "" + e)), f = Ws.bind(null, la), d = Ws.bind(null, ua);
    function p(e, i) {
        if (i = Us({}, i || c.value), "string" == typeof e) {
            const r = da(n, e, i.path), s = t.resolve({
                path: r.path
            }, i), a = o.createHref(r.fullPath);
            return Us(r, s, {
                params: d(s.params),
                hash: ua(r.hash),
                redirectedFrom: void 0,
                href: a
            });
        }
        let s;
        if (null != e.path) s = Us({}, e, {
            path: da(n, e.path, i.path).path
        }); else {
            const t = Us({}, e.params);
            for (const e in t) null == t[e] && delete t[e];
            s = Us({}, e, {
                params: f(t)
            }), i.params = f(i.params);
        }
        const a = t.resolve(s, i), l = e.hash || "";
        a.params = u(d(a.params));
        const p = function(e, t) {
            const n = t.query ? e(t.query) : "";
            return t.path + (n && "?") + n + (t.hash || "");
        }(r, Us({}, e, {
            hash: (h = l, aa(h).replace(ra, "{").replace(ia, "}").replace(ta, "^")),
            path: a.path
        }));
        var h;
        const g = o.createHref(p);
        return Us({
            fullPath: p,
            hash: l,
            query: r === oc ? ic(e.query) : e.query || {}
        }, a, {
            redirectedFrom: void 0,
            href: g
        });
    }
    function h(e) {
        return "string" == typeof e ? da(n, e, c.value.path) : Us({}, e);
    }
    function g(e, t) {
        if (l !== e) return Ra(8, {
            from: t,
            to: e
        });
    }
    function m(e) {
        return y(e);
    }
    function v(e) {
        const t = e.matched[e.matched.length - 1];
        if (t && t.redirect) {
            const {redirect: n} = t;
            let r = "function" == typeof n ? n(e) : n;
            return "string" == typeof r && (r = r.includes("?") || r.includes("#") ? r = h(r) : {
                path: r
            }, r.params = {}), Us({
                query: e.query,
                hash: e.hash,
                params: null != r.path ? {} : e.params
            }, r);
        }
    }
    function y(e, t) {
        const n = l = p(e), o = c.value, i = e.state, s = e.force, a = !0 === e.replace, u = v(n);
        if (u) return y(Us(h(u), {
            state: "object" == typeof u ? Us({}, i, u.state) : i,
            force: s,
            replace: a
        }), t || n);
        const f = n;
        let d;
        return f.redirectedFrom = t, !s && function(e, t, n) {
            const r = t.matched.length - 1, o = n.matched.length - 1;
            return r > -1 && r === o && ha(t.matched[r], n.matched[o]) && ga(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
        }(r, o, n) && (d = Ra(16, {
            to: f,
            from: o
        }), j(o, o, !0, !1)), (d ? Promise.resolve(d) : C(f, o)).catch((e => Ba(e) ? Ba(e, 2) ? e : P(e) : I(e, f, o))).then((e => {
            if (e) {
                if (Ba(e, 2)) return y(Us({
                    replace: a
                }, h(e.to), {
                    state: "object" == typeof e.to ? Us({}, i, e.to.state) : i,
                    force: s
                }), t || f);
            } else e = S(f, o, !0, a, i);
            return x(f, o, e), e;
        }));
    }
    function b(e, t) {
        const n = g(e, t);
        return n ? Promise.reject(n) : Promise.resolve();
    }
    function w(e) {
        const t = L.values().next().value;
        return t && "function" == typeof t.runWithContext ? t.runWithContext(e) : e();
    }
    function C(e, t) {
        let n;
        const [r, o, a] = function(e, t) {
            const n = [], r = [], o = [], i = Math.max(t.matched.length, e.matched.length);
            for (let s = 0; s < i; s++) {
                const i = t.matched[s];
                i && (e.matched.find((e => ha(e, i))) ? r.push(i) : n.push(i));
                const a = e.matched[s];
                a && (t.matched.find((e => ha(e, a))) || o.push(a));
            }
            return [ n, r, o ];
        }(e, t);
        n = pc(r.reverse(), "beforeRouteLeave", e, t);
        for (const i of r) i.leaveGuards.forEach((r => {
            n.push(dc(r, e, t));
        }));
        const c = b.bind(null, e, t);
        return n.push(c), F(n).then((() => {
            n = [];
            for (const r of i.list()) n.push(dc(r, e, t));
            return n.push(c), F(n);
        })).then((() => {
            n = pc(o, "beforeRouteUpdate", e, t);
            for (const r of o) r.updateGuards.forEach((r => {
                n.push(dc(r, e, t));
            }));
            return n.push(c), F(n);
        })).then((() => {
            n = [];
            for (const r of a) if (r.beforeEnter) if (qs(r.beforeEnter)) for (const o of r.beforeEnter) n.push(dc(o, e, t)); else n.push(dc(r.beforeEnter, e, t));
            return n.push(c), F(n);
        })).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = pc(a, "beforeRouteEnter", e, t, w), 
        n.push(c), F(n)))).then((() => {
            n = [];
            for (const r of s.list()) n.push(dc(r, e, t));
            return n.push(c), F(n);
        })).catch((e => Ba(e, 8) ? e : Promise.reject(e)));
    }
    function x(e, t, n) {
        a.list().forEach((r => w((() => r(e, t, n)))));
    }
    function S(e, t, n, r, i) {
        const s = g(e, t);
        if (s) return s;
        const a = t === ya, l = Vs ? history.state : {};
        n && (r || a ? o.replace(e.fullPath, Us({
            scroll: a && l && l.scroll
        }, i)) : o.push(e.fullPath, i)), c.value = e, j(e, t, n, a), P();
    }
    let _;
    function k() {
        _ || (_ = o.listen(((e, t, n) => {
            if (!M.listening) return;
            const r = p(e), i = v(r);
            if (i) return void y(Us(i, {
                replace: !0,
                force: !0
            }), r).catch(Gs);
            l = r;
            const s = c.value;
            var a, u;
            Vs && (a = Aa(s.fullPath, n.delta), u = Oa(), Ia.set(a, u)), C(r, s).catch((e => Ba(e, 12) ? e : Ba(e, 2) ? (y(Us(h(e.to), {
                force: !0
            }), r).then((e => {
                Ba(e, 20) && !n.delta && n.type === ba.pop && o.go(-1, !1);
            })).catch(Gs), Promise.reject()) : (n.delta && o.go(-n.delta, !1), I(e, r, s)))).then((e => {
                (e = e || S(r, s, !1)) && (n.delta && !Ba(e, 8) ? o.go(-n.delta, !1) : n.type === ba.pop && Ba(e, 20) && o.go(-1, !1)), 
                x(r, s, e);
            })).catch(Gs);
        })));
    }
    let O, E = fc(), A = fc();
    function I(e, t, n) {
        P(e);
        const r = A.list();
        return r.length ? r.forEach((r => r(e, t, n))) : console.error(e), Promise.reject(e);
    }
    function P(e) {
        return O || (O = !e, k(), E.list().forEach((([t, n]) => e ? n(e) : t())), E.reset()), 
        e;
    }
    function j(t, n, r, o) {
        const {scrollBehavior: i} = e;
        if (!Vs || !i) return Promise.resolve();
        const s = !r && function(e) {
            const t = Ia.get(e);
            return Ia.delete(e), t;
        }(Aa(t.fullPath, 0)) || (o || !r) && history.state && history.state.scroll || null;
        return $t().then((() => i(t, n, s))).then((e => e && Ea(e))).catch((e => I(e, t, n)));
    }
    const T = e => o.go(e);
    let N;
    const L = new Set, M = {
        currentRoute: c,
        listening: !0,
        addRoute: function(e, n) {
            let r, o;
            return La(e) ? (r = t.getRecordMatcher(e), o = n) : o = e, t.addRoute(o, r);
        },
        removeRoute: function(e) {
            const n = t.getRecordMatcher(e);
            n && t.removeRoute(n);
        },
        clearRoutes: t.clearRoutes,
        hasRoute: function(e) {
            return !!t.getRecordMatcher(e);
        },
        getRoutes: function() {
            return t.getRoutes().map((e => e.record));
        },
        resolve: p,
        options: e,
        push: m,
        replace: function(e) {
            return m(Us(h(e), {
                replace: !0
            }));
        },
        go: T,
        back: () => T(-1),
        forward: () => T(1),
        beforeEach: i.add,
        beforeResolve: s.add,
        afterEach: a.add,
        onError: A.add,
        isReady: function() {
            return O && c.value !== ya ? Promise.resolve() : new Promise(((e, t) => {
                E.add([ e, t ]);
            }));
        },
        install(e) {
            e.component("RouterLink", mc), e.component("RouterView", wc), e.config.globalProperties.$router = this, 
            Object.defineProperty(e.config.globalProperties, "$route", {
                enumerable: !0,
                get: () => Ct(c)
            }), Vs && !N && c.value === ya && (N = !0, m(o.location).catch((e => {})));
            const t = {};
            for (const r in ya) Object.defineProperty(t, r, {
                get: () => c.value[r],
                enumerable: !0
            });
            e.provide(cc, this), e.provide(lc, ct(t)), e.provide(uc, c);
            const n = e.unmount;
            L.add(e), e.unmount = function() {
                L.delete(e), L.size < 1 && (l = ya, _ && _(), _ = null, c.value = ya, N = !1, O = !1), 
                n();
            };
        }
    };
    function F(e) {
        return e.reduce(((e, t) => e.then((() => w(t)))), Promise.resolve());
    }
    return M;
}({
    history: ((hh = location.host ? hh || location.pathname + location.search : "").includes("#") || (hh += "#"), 
    Na(hh)),
    routes: [ {
        path: "/",
        name: "adminPage",
        component: null,
        props: e => ({
            tab: e.query.tab
        })
    }, {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    } ]
});

var hh;

const gh = {
    badges: Ad,
    triggers: bp,
    settings: Yp,
    log: dh
};

ph.beforeEach(((e, t, n) => {
    const r = e.query.tab || "badges", o = gh[r];
    if (o) {
        const t = e.matched.find((e => "adminPage" === e.name));
        t ? (t.components = {
            default: o
        }, n()) : (console.error("Could not find the base adminPage route match."), n(!1));
    } else console.warn(`Invalid tab "${r}". Redirecting to default "badges".`), n({
        path: "/",
        query: {
            tab: "badges"
        },
        replace: !0
    });
}));

const mh = new Cs({
    state: {
        badges: [],
        triggers: [],
        notices: [],
        connectionStatuses: {
            obf: {
                status: "Connecting...",
                class: "pill pill-yellow"
            },
            cancred: {
                status: "Connecting...",
                class: "pill pill-yellow"
            }
        },
        obfSettings: {
            clientId: "",
            clientSecret: ""
        },
        cancredSettings: {
            clientId: "",
            clientSecret: ""
        }
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
            -1 !== n && e.triggers.splice(n, 1, t);
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
                status: !1
            } : e));
        },
        setConnectionStatus(e, {provider: t, status: n}) {
            const r = {
                "Connecting...": "pill pill-yellow",
                Connected: "pill pill-green",
                "Credential Error": "pill pill-red",
                "Not Connected": "pill pill-red",
                "Error Checking Status": "pill pill-red",
                "PBC Error": "pill pill-red"
            }[n] || "pill pill-unknown";
            e.connectionStatuses[t] && (e.connectionStatuses[t].status = n, e.connectionStatuses[t].class = r);
        },
        setObfSettings(e, t) {
            e.obfSettings = {
                ...t
            };
        },
        setCancredSettings(e, t) {
            e.cancredSettings = {
                ...t
            };
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
                if (!e.ok) throw new Error("Failed to fetch logs");
                return await e.json();
            } catch (t) {
                return console.error("An error occurred while fetching logs: " + t.message), [];
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
                if (!t.ok) throw new Error("Failed to fetch badges");
                e("setBadges", (await t.json()).badges);
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
                if (!t.ok) throw new Error("Failed to fetch triggers");
                const n = await t.json();
                e("setTriggers", n.triggers.map((e => ({
                    ...e,
                    object_title: e.object_title || ""
                }))));
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
                if (!n.ok) throw new Error("Failed to save trigger");
                const r = await n.json();
                return t.id ? e("updateTrigger", r.trigger) : e("addTrigger", r.trigger), r;
            } catch (n) {
                console.error("An error occurred while saving the trigger: " + n.message);
            }
        },
        async deleteTrigger({commit: e}, t) {
            try {
                if (!(await fetch(`/wp-json/pathwise-badge-connect/v1/triggers/${t}`, {
                    method: "DELETE",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                })).ok) throw new Error("Failed to delete trigger");
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
                if (!t.ok) throw new Error("Failed to fetch notices");
                e("setNotices", (await t.json()).notices);
            } catch (t) {
                console.error("An error occurred while fetching notices: " + t.message);
            }
        },
        async dismissNotice({commit: e}, t) {
            try {
                if (!(await fetch(`/wp-json/pathwise-badge-connect/v1/notices/${t}`, {
                    method: "DELETE",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                })).ok) throw new Error("Failed to dismiss notice");
                e("dismissNotice", t);
            } catch (n) {
                console.error("An error occurred while dismissing the notice: " + n.message);
            }
        },
        async fetchConnectionStatus({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/connection-status?provider=obf", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) throw new Error("Failed to fetch OBF connection status");
                e("setConnectionStatus", {
                    provider: "obf",
                    status: (await t.json()).connection_status
                });
            } catch (t) {
                console.error("Error fetching OBF connection status:", t), e("setConnectionStatus", {
                    provider: "obf",
                    status: "Error Checking Status"
                });
            }
        },
        async fetchCancredConnectionStatus({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/connection-status?provider=cancred", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) throw new Error("Failed to fetch CanCred connection status");
                e("setConnectionStatus", {
                    provider: "cancred",
                    status: (await t.json()).connection_status
                });
            } catch (t) {
                console.error("Error fetching CanCred connection status:", t), e("setConnectionStatus", {
                    provider: "cancred",
                    status: "Error Checking Status"
                });
            }
        },
        async fetchSettings({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/settings/obf", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) throw new Error("Failed to fetch OBF settings");
                const n = await t.json();
                n && n.settings && e("setObfSettings", {
                    clientId: n.settings.client_id,
                    clientSecret: n.settings.client_secret
                });
            } catch (t) {
                console.error("Error fetching OBF settings:", t);
            }
        },
        async fetchCancredSettings({commit: e}) {
            try {
                const t = await fetch("/wp-json/pathwise-badge-connect/v1/settings/cancred", {
                    method: "GET",
                    headers: {
                        "pbc-api-key": pbcOptions.pbcApiKey,
                        "X-WP-Nonce": pbcOptions.nonce
                    }
                });
                if (!t.ok) throw new Error("Failed to fetch CanCred settings");
                const n = await t.json();
                n && n.settings && e("setCancredSettings", {
                    clientId: n.settings.client_id,
                    clientSecret: n.settings.client_secret
                });
            } catch (t) {
                console.error("Error fetching CanCred settings:", t);
            }
        }
    },
    getters: {
        getBadges: e => e.badges,
        getTriggers: e => e.triggers,
        getNotices: e => e.notices,
        getConnectionStatus: e => t => {
            var n;
            return (null == (n = e.connectionStatuses[t]) ? void 0 : n.status) || "";
        },
        getConnectionStatusClass: e => t => {
            var n;
            return (null == (n = e.connectionStatuses[t]) ? void 0 : n.class) || "";
        },
        getObfSettings: e => e.obfSettings,
        getCancredSettings: e => e.cancredSettings
    }
});

const vh = ((...e) => {
    const t = ($i || ($i = vr(Bi))).createApp(...e), {mount: n} = t;
    return t.mount = e => {
        const r = function(e) {
            if (m(e)) {
                return document.querySelector(e);
            }
            return e;
        }(e);
        if (!r) return;
        const o = t._component;
        g(o) || o.render || o.template || (o.template = r.innerHTML), 1 === r.nodeType && (r.textContent = "");
        const i = n(r, !1, function(e) {
            if (e instanceof SVGElement) return "svg";
            if ("function" == typeof MathMLElement && e instanceof MathMLElement) return "mathml";
        }(r));
        return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), 
        i;
    }, t;
})($s), yh = new URLSearchParams(window.location.search).get("tab") || "badges";

ph.replace({
    path: "/",
    query: {
        tab: yh
    }
}).catch((e => {
    console.error("Vue Router initial navigation failed:", e);
})), ph.isReady().then((() => {
    document.addEventListener("DOMContentLoaded", (() => {
        const e = document.getElementById("pathwise-badge-connect");
        e ? (vh.use(ph), vh.use(mh), vh.mount(e), console.log("Vue app mounted successfully!")) : console.error("Vue app target element #pathwise-badge-connect not found in the DOM.");
    }));
})).catch((e => {
    console.error("Vue Router readiness check failed:", e);
}));
//# sourceMappingURL=main.js.map
