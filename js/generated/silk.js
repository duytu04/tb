function rr(a) {
  if (a === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return a;
}
function Vo(a, e) {
  a.prototype = Object.create(e.prototype), a.prototype.constructor = a, a.__proto__ = e;
}
/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var St = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Ki = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Rs, Ye, ae, Dt = 1e8, ne = 1 / Dt, us = Math.PI * 2, lu = us / 4, fu = 0, Uo = Math.sqrt, cu = Math.cos, hu = Math.sin, Ae = function(e) {
  return typeof e == "string";
}, pe = function(e) {
  return typeof e == "function";
}, ar = function(e) {
  return typeof e == "number";
}, As = function(e) {
  return typeof e > "u";
}, Zt = function(e) {
  return typeof e == "object";
}, ut = function(e) {
  return e !== !1;
}, zs = function() {
  return typeof window < "u";
}, fn = function(e) {
  return pe(e) || Ae(e);
}, Wo = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, He = Array.isArray, du = /random\([^)]+\)/g, _u = /,\s*/g, so = /(?:-?\.?\d|\.)+/gi, qo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, ai = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Hn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, $o = /[+-]=-?[.\d]+/, pu = /[^,'"\[\]\s]+/gi, gu = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, fe, Wt, ls, Fs, Ct = {}, Rn = {}, Go, Ho = function(e) {
  return (Rn = mi(e, Ct)) && ht;
}, Ls = function(e, r) {
  return console.warn("Invalid property", e, "set to", r, "Missing plugin? gsap.registerPlugin()");
}, Zi = function(e, r) {
  return !r && console.warn(e);
}, Ko = function(e, r) {
  return e && (Ct[e] = r) && Rn && (Rn[e] = r) || Ct;
}, Qi = function() {
  return 0;
}, mu = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Tn = {
  suppressEvents: !0,
  kill: !1
}, yu = {
  suppressEvents: !0
}, Is = {}, wr = [], fs = {}, Zo, yt = {}, Kn = {}, oo = 30, Sn = [], Ys = "", Xs = function(e) {
  var r = e[0], t, i;
  if (Zt(r) || pe(r) || (e = [e]), !(t = (r._gsap || {}).harness)) {
    for (i = Sn.length; i-- && !Sn[i].targetTest(r); )
      ;
    t = Sn[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new ya(e[i], t))) || e.splice(i, 1);
  return e;
}, Nr = function(e) {
  return e._gsap || Xs(Rt(e))[0]._gsap;
}, Qo = function(e, r, t) {
  return (t = e[r]) && pe(t) ? e[r]() : As(t) && e.getAttribute && e.getAttribute(r) || t;
}, lt = function(e, r) {
  return (e = e.split(",")).forEach(r) || e;
}, ve = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, le = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, fi = function(e, r) {
  var t = r.charAt(0), i = parseFloat(r.substr(2));
  return e = parseFloat(e), t === "+" ? e + i : t === "-" ? e - i : t === "*" ? e * i : e / i;
}, vu = function(e, r) {
  for (var t = r.length, i = 0; e.indexOf(r[i]) < 0 && ++i < t; )
    ;
  return i < t;
}, An = function() {
  var e = wr.length, r = wr.slice(0), t, i;
  for (fs = {}, wr.length = 0, t = 0; t < e; t++)
    i = r[t], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Bs = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, Jo = function(e, r, t, i) {
  wr.length && !Ye && An(), e.render(r, t, !!(Ye && r < 0 && Bs(e))), wr.length && !Ye && An();
}, jo = function(e) {
  var r = parseFloat(e);
  return (r || r === 0) && (e + "").match(pu).length < 2 ? r : Ae(e) ? e.trim() : e;
}, ea = function(e) {
  return e;
}, kt = function(e, r) {
  for (var t in r)
    t in e || (e[t] = r[t]);
  return e;
}, xu = function(e) {
  return function(r, t) {
    for (var i in t)
      i in r || i === "duration" && e || i === "ease" || (r[i] = t[i]);
  };
}, mi = function(e, r) {
  for (var t in r)
    e[t] = r[t];
  return e;
}, ao = function a(e, r) {
  for (var t in r)
    t !== "__proto__" && t !== "constructor" && t !== "prototype" && (e[t] = Zt(r[t]) ? a(e[t] || (e[t] = {}), r[t]) : r[t]);
  return e;
}, zn = function(e, r) {
  var t = {}, i;
  for (i in e)
    i in r || (t[i] = e[i]);
  return t;
}, Ii = function(e) {
  var r = e.parent || fe, t = e.keyframes ? xu(He(e.keyframes)) : kt;
  if (ut(e.inherit))
    for (; r; )
      t(e, r.vars.defaults), r = r.parent || r._dp;
  return e;
}, wu = function(e, r) {
  for (var t = e.length, i = t === r.length; i && t-- && e[t] === r[t]; )
    ;
  return t < 0;
}, ta = function(e, r, t, i, n) {
  var s = e[i], o;
  if (n)
    for (o = r[n]; s && s[n] > o; )
      s = s._prev;
  return s ? (r._next = s._next, s._next = r) : (r._next = e[t], e[t] = r), r._next ? r._next._prev = r : e[i] = r, r._prev = s, r.parent = r._dp = e, r;
}, Un = function(e, r, t, i) {
  t === void 0 && (t = "_first"), i === void 0 && (i = "_last");
  var n = r._prev, s = r._next;
  n ? n._next = s : e[t] === r && (e[t] = s), s ? s._prev = n : e[i] === r && (e[i] = n), r._next = r._prev = r.parent = null;
}, Sr = function(e, r) {
  e.parent && (!r || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Vr = function(e, r) {
  if (e && (!r || r._end > e._dur || r._start < 0))
    for (var t = e; t; )
      t._dirty = 1, t = t.parent;
  return e;
}, bu = function(e) {
  for (var r = e.parent; r && r.parent; )
    r._dirty = 1, r.totalDuration(), r = r.parent;
  return e;
}, cs = function(e, r, t, i) {
  return e._startAt && (Ye ? e._startAt.revert(Tn) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(r, !0, i));
}, Tu = function a(e) {
  return !e || e._ts && a(e.parent);
}, uo = function(e) {
  return e._repeat ? yi(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, yi = function(e, r) {
  var t = Math.floor(e = le(e / r));
  return e && t === e ? t - 1 : t;
}, Fn = function(e, r) {
  return (e - r._start) * r._ts + (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur);
}, Wn = function(e) {
  return e._end = le(e._start + (e._tDur / Math.abs(e._ts || e._rts || ne) || 0));
}, qn = function(e, r) {
  var t = e._dp;
  return t && t.smoothChildTiming && e._ts && (e._start = le(t._time - (e._ts > 0 ? r / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - r) / -e._ts)), Wn(e), t._dirty || Vr(t, e)), e;
}, ra = function(e, r) {
  var t;
  if ((r._time || !r._dur && r._initted || r._start < e._time && (r._dur || !r.add)) && (t = Fn(e.rawTime(), r), (!r._dur || on(0, r.totalDuration(), t) - r._tTime > ne) && r.render(t, !0)), Vr(e, r)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (t = e; t._dp; )
        t.rawTime() >= 0 && t.totalTime(t._tTime), t = t._dp;
    e._zTime = -ne;
  }
}, $t = function(e, r, t, i) {
  return r.parent && Sr(r), r._start = le((ar(t) ? t : t || e !== fe ? Mt(e, t, r) : e._time) + r._delay), r._end = le(r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)), ta(e, r, "_first", "_last", e._sort ? "_start" : 0), hs(r) || (e._recent = r), i || ra(e, r), e._ts < 0 && qn(e, e._tTime), e;
}, ia = function(e, r) {
  return (Ct.ScrollTrigger || Ls("scrollTrigger", r)) && Ct.ScrollTrigger.create(r, e);
}, na = function(e, r, t, i, n) {
  if (Vs(e, r, n), !e._initted)
    return 1;
  if (!t && e._pt && !Ye && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Zo !== xt.frame)
    return wr.push(e), e._lazy = [n, i], 1;
}, Su = function a(e) {
  var r = e.parent;
  return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || a(r));
}, hs = function(e) {
  var r = e.data;
  return r === "isFromStart" || r === "isStart";
}, Cu = function(e, r, t, i) {
  var n = e.ratio, s = r < 0 || !r && (!e._start && Su(e) && !(!e._initted && hs(e)) || (e._ts < 0 || e._dp._ts < 0) && !hs(e)) ? 0 : 1, o = e._rDelay, u = 0, l, f, d;
  if (o && e._repeat && (u = on(0, e._tDur, r), f = yi(u, o), e._yoyo && f & 1 && (s = 1 - s), f !== yi(e._tTime, o) && (n = 1 - s, e.vars.repeatRefresh && e._initted && e.invalidate())), s !== n || Ye || i || e._zTime === ne || !r && e._zTime) {
    if (!e._initted && na(e, r, i, t, u))
      return;
    for (d = e._zTime, e._zTime = r || (t ? ne : 0), t || (t = r && !d), e.ratio = s, e._from && (s = 1 - s), e._time = 0, e._tTime = u, l = e._pt; l; )
      l.r(s, l.d), l = l._next;
    r < 0 && cs(e, r, t, !0), e._onUpdate && !t && bt(e, "onUpdate"), u && e._repeat && !t && e.parent && bt(e, "onRepeat"), (r >= e._tDur || r < 0) && e.ratio === s && (s && Sr(e, 1), !t && !Ye && (bt(e, s ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = r);
}, ku = function(e, r, t) {
  var i;
  if (t > r)
    for (i = e._first; i && i._start <= t; ) {
      if (i.data === "isPause" && i._start > r)
        return i;
      i = i._next;
    }
  else
    for (i = e._last; i && i._start >= t; ) {
      if (i.data === "isPause" && i._start < r)
        return i;
      i = i._prev;
    }
}, vi = function(e, r, t, i) {
  var n = e._repeat, s = le(r) || 0, o = e._tTime / e._tDur;
  return o && !i && (e._time *= s / e._dur), e._dur = s, e._tDur = n ? n < 0 ? 1e10 : le(s * (n + 1) + e._rDelay * n) : s, o > 0 && !i && qn(e, e._tTime = e._tDur * o), e.parent && Wn(e), t || Vr(e.parent, e), e;
}, lo = function(e) {
  return e instanceof at ? Vr(e) : vi(e, e._dur);
}, Pu = {
  _start: 0,
  endTime: Qi,
  totalDuration: Qi
}, Mt = function a(e, r, t) {
  var i = e.labels, n = e._recent || Pu, s = e.duration() >= Dt ? n.endTime(!1) : e._dur, o, u, l;
  return Ae(r) && (isNaN(r) || r in i) ? (u = r.charAt(0), l = r.substr(-1) === "%", o = r.indexOf("="), u === "<" || u === ">" ? (o >= 0 && (r = r.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (l ? (o < 0 ? n : t).totalDuration() / 100 : 1)) : o < 0 ? (r in i || (i[r] = s), i[r]) : (u = parseFloat(r.charAt(o - 1) + r.substr(o + 1)), l && t && (u = u / 100 * (He(t) ? t[0] : t).totalDuration()), o > 1 ? a(e, r.substr(0, o - 1), t) + u : s + u)) : r == null ? s : +r;
}, Yi = function(e, r, t) {
  var i = ar(r[1]), n = (i ? 2 : 1) + (e < 2 ? 0 : 1), s = r[n], o, u;
  if (i && (s.duration = r[1]), s.parent = t, e) {
    for (o = s, u = t; u && !("immediateRender" in o); )
      o = u.vars.defaults || {}, u = ut(u.vars.inherit) && u.parent;
    s.immediateRender = ut(o.immediateRender), e < 2 ? s.runBackwards = 1 : s.startAt = r[n - 1];
  }
  return new Se(r[0], s, r[n + 1]);
}, Mr = function(e, r) {
  return e || e === 0 ? r(e) : r;
}, on = function(e, r, t) {
  return t < e ? e : t > r ? r : t;
}, $e = function(e, r) {
  return !Ae(e) || !(r = gu.exec(e)) ? "" : r[1];
}, Mu = function(e, r, t) {
  return Mr(t, function(i) {
    return on(e, r, i);
  });
}, ds = [].slice, sa = function(e, r) {
  return e && Zt(e) && "length" in e && (!r && !e.length || e.length - 1 in e && Zt(e[0])) && !e.nodeType && e !== Wt;
}, Ou = function(e, r, t) {
  return t === void 0 && (t = []), e.forEach(function(i) {
    var n;
    return Ae(i) && !r || sa(i, 1) ? (n = t).push.apply(n, Rt(i)) : t.push(i);
  }) || t;
}, Rt = function(e, r, t) {
  return ae && !r && ae.selector ? ae.selector(e) : Ae(e) && !t && (ls || !xi()) ? ds.call((r || Fs).querySelectorAll(e), 0) : He(e) ? Ou(e, t) : sa(e) ? ds.call(e, 0) : e ? [e] : [];
}, _s = function(e) {
  return e = Rt(e)[0] || Zi("Invalid scope") || {}, function(r) {
    var t = e.current || e.nativeElement || e;
    return Rt(r, t.querySelectorAll ? t : t === e ? Zi("Invalid scope") || Fs.createElement("div") : e);
  };
}, oa = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, aa = function(e) {
  if (pe(e))
    return e;
  var r = Zt(e) ? e : {
    each: e
  }, t = Ur(r.ease), i = r.from || 0, n = parseFloat(r.base) || 0, s = {}, o = i > 0 && i < 1, u = isNaN(i) || o, l = r.axis, f = i, d = i;
  return Ae(i) ? f = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !o && u && (f = i[0], d = i[1]), function(_, c, g) {
    var h = (g || r).length, p = s[h], v, b, S, w, T, M, x, P, k;
    if (!p) {
      if (k = r.grid === "auto" ? 0 : (r.grid || [1, Dt])[1], !k) {
        for (x = -Dt; x < (x = g[k++].getBoundingClientRect().left) && k < h; )
          ;
        k < h && k--;
      }
      for (p = s[h] = [], v = u ? Math.min(k, h) * f - 0.5 : i % k, b = k === Dt ? 0 : u ? h * d / k - 0.5 : i / k | 0, x = 0, P = Dt, M = 0; M < h; M++)
        S = M % k - v, w = b - (M / k | 0), p[M] = T = l ? Math.abs(l === "y" ? w : S) : Uo(S * S + w * w), T > x && (x = T), T < P && (P = T);
      i === "random" && oa(p), p.max = x - P, p.min = P, p.v = h = (parseFloat(r.amount) || parseFloat(r.each) * (k > h ? h - 1 : l ? l === "y" ? h / k : k : Math.max(k, h / k)) || 0) * (i === "edges" ? -1 : 1), p.b = h < 0 ? n - h : n, p.u = $e(r.amount || r.each) || 0, t = t && h < 0 ? Vu(t) : t;
    }
    return h = (p[_] - p.min) / p.max || 0, le(p.b + (t ? t(h) : h) * p.v) + p.u;
  };
}, ps = function(e) {
  var r = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(t) {
    var i = le(Math.round(parseFloat(t) / e) * e * r);
    return (i - i % 1) / r + (ar(t) ? 0 : $e(t));
  };
}, ua = function(e, r) {
  var t = He(e), i, n;
  return !t && Zt(e) && (i = t = e.radius || Dt, e.values ? (e = Rt(e.values), (n = !ar(e[0])) && (i *= i)) : e = ps(e.increment)), Mr(r, t ? pe(e) ? function(s) {
    return n = e(s), Math.abs(n - s) <= i ? n : s;
  } : function(s) {
    for (var o = parseFloat(n ? s.x : s), u = parseFloat(n ? s.y : 0), l = Dt, f = 0, d = e.length, _, c; d--; )
      n ? (_ = e[d].x - o, c = e[d].y - u, _ = _ * _ + c * c) : _ = Math.abs(e[d] - o), _ < l && (l = _, f = d);
    return f = !i || l <= i ? e[f] : s, n || f === s || ar(s) ? f : f + $e(s);
  } : ps(e));
}, la = function(e, r, t, i) {
  return Mr(He(e) ? !r : t === !0 ? !!(t = 0) : !i, function() {
    return He(e) ? e[~~(Math.random() * e.length)] : (t = t || 1e-5) && (i = t < 1 ? Math.pow(10, (t + "").length - 2) : 1) && Math.floor(Math.round((e - t / 2 + Math.random() * (r - e + t * 0.99)) / t) * t * i) / i;
  });
}, Eu = function() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  return function(i) {
    return r.reduce(function(n, s) {
      return s(n);
    }, i);
  };
}, Du = function(e, r) {
  return function(t) {
    return e(parseFloat(t)) + (r || $e(t));
  };
}, Ru = function(e, r, t) {
  return ca(e, r, 0, 1, t);
}, fa = function(e, r, t) {
  return Mr(t, function(i) {
    return e[~~r(i)];
  });
}, Au = function a(e, r, t) {
  var i = r - e;
  return He(e) ? fa(e, a(0, e.length), r) : Mr(t, function(n) {
    return (i + (n - e) % i) % i + e;
  });
}, zu = function a(e, r, t) {
  var i = r - e, n = i * 2;
  return He(e) ? fa(e, a(0, e.length - 1), r) : Mr(t, function(s) {
    return s = (n + (s - e) % n) % n || 0, e + (s > i ? n - s : s);
  });
}, Ji = function(e) {
  return e.replace(du, function(r) {
    var t = r.indexOf("[") + 1, i = r.substring(t || 7, t ? r.indexOf("]") : r.length - 1).split(_u);
    return la(t ? i : +i[0], t ? 0 : +i[1], +i[2] || 1e-5);
  });
}, ca = function(e, r, t, i, n) {
  var s = r - e, o = i - t;
  return Mr(n, function(u) {
    return t + ((u - e) / s * o || 0);
  });
}, Fu = function a(e, r, t, i) {
  var n = isNaN(e + r) ? 0 : function(c) {
    return (1 - c) * e + c * r;
  };
  if (!n) {
    var s = Ae(e), o = {}, u, l, f, d, _;
    if (t === !0 && (i = 1) && (t = null), s)
      e = {
        p: e
      }, r = {
        p: r
      };
    else if (He(e) && !He(r)) {
      for (f = [], d = e.length, _ = d - 2, l = 1; l < d; l++)
        f.push(a(e[l - 1], e[l]));
      d--, n = function(g) {
        g *= d;
        var h = Math.min(_, ~~g);
        return f[h](g - h);
      }, t = r;
    } else i || (e = mi(He(e) ? [] : {}, e));
    if (!f) {
      for (u in r)
        Ns.call(o, e, u, "get", r[u]);
      n = function(g) {
        return qs(g, o) || (s ? e.p : e);
      };
    }
  }
  return Mr(t, n);
}, fo = function(e, r, t) {
  var i = e.labels, n = Dt, s, o, u;
  for (s in i)
    o = i[s] - r, o < 0 == !!t && o && n > (o = Math.abs(o)) && (u = s, n = o);
  return u;
}, bt = function(e, r, t) {
  var i = e.vars, n = i[r], s = ae, o = e._ctx, u, l, f;
  if (n)
    return u = i[r + "Params"], l = i.callbackScope || e, t && wr.length && An(), o && (ae = o), f = u ? n.apply(l, u) : n.call(l), ae = s, f;
}, Ei = function(e) {
  return Sr(e), e.scrollTrigger && e.scrollTrigger.kill(!!Ye), e.progress() < 1 && bt(e, "onInterrupt"), e;
}, ui, ha = [], da = function(e) {
  if (e)
    if (e = !e.name && e.default || e, zs() || e.headless) {
      var r = e.name, t = pe(e), i = r && !t && e.init ? function() {
        this._props = [];
      } : e, n = {
        init: Qi,
        render: qs,
        add: Ns,
        kill: Ju,
        modifier: Qu,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Ws,
        aliases: {},
        register: 0
      };
      if (xi(), e !== i) {
        if (yt[r])
          return;
        kt(i, kt(zn(e, n), s)), mi(i.prototype, mi(n, zn(e, s))), yt[i.prop = r] = i, e.targetTest && (Sn.push(i), Is[r] = 1), r = (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) + "Plugin";
      }
      Ko(r, i), e.register && e.register(ht, i, ft);
    } else
      ha.push(e);
}, ie = 255, Di = {
  aqua: [0, ie, ie],
  lime: [0, ie, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ie],
  navy: [0, 0, 128],
  white: [ie, ie, ie],
  olive: [128, 128, 0],
  yellow: [ie, ie, 0],
  orange: [ie, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ie, 0, 0],
  pink: [ie, 192, 203],
  cyan: [0, ie, ie],
  transparent: [ie, ie, ie, 0]
}, Zn = function(e, r, t) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? r + (t - r) * e * 6 : e < 0.5 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r) * ie + 0.5 | 0;
}, _a = function(e, r, t) {
  var i = e ? ar(e) ? [e >> 16, e >> 8 & ie, e & ie] : 0 : Di.black, n, s, o, u, l, f, d, _, c, g;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Di[e])
      i = Di[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (n = e.charAt(1), s = e.charAt(2), o = e.charAt(3), e = "#" + n + n + s + s + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & ie, i & ie, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & ie, e & ie];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = g = e.match(so), !r)
        u = +i[0] % 360 / 360, l = +i[1] / 100, f = +i[2] / 100, s = f <= 0.5 ? f * (l + 1) : f + l - f * l, n = f * 2 - s, i.length > 3 && (i[3] *= 1), i[0] = Zn(u + 1 / 3, n, s), i[1] = Zn(u, n, s), i[2] = Zn(u - 1 / 3, n, s);
      else if (~e.indexOf("="))
        return i = e.match(qo), t && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(so) || Di.transparent;
    i = i.map(Number);
  }
  return r && !g && (n = i[0] / ie, s = i[1] / ie, o = i[2] / ie, d = Math.max(n, s, o), _ = Math.min(n, s, o), f = (d + _) / 2, d === _ ? u = l = 0 : (c = d - _, l = f > 0.5 ? c / (2 - d - _) : c / (d + _), u = d === n ? (s - o) / c + (s < o ? 6 : 0) : d === s ? (o - n) / c + 2 : (n - s) / c + 4, u *= 60), i[0] = ~~(u + 0.5), i[1] = ~~(l * 100 + 0.5), i[2] = ~~(f * 100 + 0.5)), t && i.length < 4 && (i[3] = 1), i;
}, pa = function(e) {
  var r = [], t = [], i = -1;
  return e.split(br).forEach(function(n) {
    var s = n.match(ai) || [];
    r.push.apply(r, s), t.push(i += s.length + 1);
  }), r.c = t, r;
}, co = function(e, r, t) {
  var i = "", n = (e + i).match(br), s = r ? "hsla(" : "rgba(", o = 0, u, l, f, d;
  if (!n)
    return e;
  if (n = n.map(function(_) {
    return (_ = _a(_, r, 1)) && s + (r ? _[0] + "," + _[1] + "%," + _[2] + "%," + _[3] : _.join(",")) + ")";
  }), t && (f = pa(e), u = t.c, u.join(i) !== f.c.join(i)))
    for (l = e.replace(br, "1").split(ai), d = l.length - 1; o < d; o++)
      i += l[o] + (~u.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : t).shift());
  if (!l)
    for (l = e.split(br), d = l.length - 1; o < d; o++)
      i += l[o] + n[o];
  return i + l[d];
}, br = (function() {
  var a = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Di)
    a += "|" + e + "\\b";
  return new RegExp(a + ")", "gi");
})(), Lu = /hsl[a]?\(/, ga = function(e) {
  var r = e.join(" "), t;
  if (br.lastIndex = 0, br.test(r))
    return t = Lu.test(r), e[1] = co(e[1], t), e[0] = co(e[0], t, pa(e[1])), !0;
}, ji, xt = (function() {
  var a = Date.now, e = 500, r = 33, t = a(), i = t, n = 1e3 / 240, s = n, o = [], u, l, f, d, _, c, g = function h(p) {
    var v = a() - i, b = p === !0, S, w, T, M;
    if ((v > e || v < 0) && (t += v - r), i += v, T = i - t, S = T - s, (S > 0 || b) && (M = ++d.frame, _ = T - d.time * 1e3, d.time = T = T / 1e3, s += S + (S >= n ? 4 : n - S), w = 1), b || (u = l(h)), w)
      for (c = 0; c < o.length; c++)
        o[c](T, _, M, p);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(p) {
      return _ / (1e3 / (p || 60));
    },
    wake: function() {
      Go && (!ls && zs() && (Wt = ls = window, Fs = Wt.document || {}, Ct.gsap = ht, (Wt.gsapVersions || (Wt.gsapVersions = [])).push(ht.version), Ho(Rn || Wt.GreenSockGlobals || !Wt.gsap && Wt || {}), ha.forEach(da)), f = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && d.sleep(), l = f || function(p) {
        return setTimeout(p, s - d.time * 1e3 + 1 | 0);
      }, ji = 1, g(2));
    },
    sleep: function() {
      (f ? cancelAnimationFrame : clearTimeout)(u), ji = 0, l = Qi;
    },
    lagSmoothing: function(p, v) {
      e = p || 1 / 0, r = Math.min(v || 33, e);
    },
    fps: function(p) {
      n = 1e3 / (p || 240), s = d.time * 1e3 + n;
    },
    add: function(p, v, b) {
      var S = v ? function(w, T, M, x) {
        p(w, T, M, x), d.remove(S);
      } : p;
      return d.remove(p), o[b ? "unshift" : "push"](S), xi(), S;
    },
    remove: function(p, v) {
      ~(v = o.indexOf(p)) && o.splice(v, 1) && c >= v && c--;
    },
    _listeners: o
  }, d;
})(), xi = function() {
  return !ji && xt.wake();
}, G = {}, Iu = /^[\d.\-M][\d.\-,\s]/, Yu = /["']/g, Xu = function(e) {
  for (var r = {}, t = e.substr(1, e.length - 3).split(":"), i = t[0], n = 1, s = t.length, o, u, l; n < s; n++)
    u = t[n], o = n !== s - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, o), r[i] = isNaN(l) ? l.replace(Yu, "").trim() : +l, i = u.substr(o + 1).trim();
  return r;
}, Bu = function(e) {
  var r = e.indexOf("(") + 1, t = e.indexOf(")"), i = e.indexOf("(", r);
  return e.substring(r, ~i && i < t ? e.indexOf(")", t + 1) : t);
}, Nu = function(e) {
  var r = (e + "").split("("), t = G[r[0]];
  return t && r.length > 1 && t.config ? t.config.apply(null, ~e.indexOf("{") ? [Xu(r[1])] : Bu(e).split(",").map(jo)) : G._CE && Iu.test(e) ? G._CE("", e) : t;
}, Vu = function(e) {
  return function(r) {
    return 1 - e(1 - r);
  };
}, Ur = function(e, r) {
  return e && (pe(e) ? e : G[e] || Nu(e)) || r;
}, Qr = function(e, r, t, i) {
  t === void 0 && (t = function(u) {
    return 1 - r(1 - u);
  }), i === void 0 && (i = function(u) {
    return u < 0.5 ? r(u * 2) / 2 : 1 - r((1 - u) * 2) / 2;
  });
  var n = {
    easeIn: r,
    easeOut: t,
    easeInOut: i
  }, s;
  return lt(e, function(o) {
    G[o] = Ct[o] = n, G[s = o.toLowerCase()] = t;
    for (var u in n)
      G[s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = G[o + "." + u] = n[u];
  }), n;
}, ma = function(e) {
  return function(r) {
    return r < 0.5 ? (1 - e(1 - r * 2)) / 2 : 0.5 + e((r - 0.5) * 2) / 2;
  };
}, Qn = function a(e, r, t) {
  var i = r >= 1 ? r : 1, n = (t || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1), s = n / us * (Math.asin(1 / i) || 0), o = function(f) {
    return f === 1 ? 1 : i * Math.pow(2, -10 * f) * hu((f - s) * n) + 1;
  }, u = e === "out" ? o : e === "in" ? function(l) {
    return 1 - o(1 - l);
  } : ma(o);
  return n = us / n, u.config = function(l, f) {
    return a(e, l, f);
  }, u;
}, Jn = function a(e, r) {
  r === void 0 && (r = 1.70158);
  var t = function(s) {
    return s ? --s * s * ((r + 1) * s + r) + 1 : 0;
  }, i = e === "out" ? t : e === "in" ? function(n) {
    return 1 - t(1 - n);
  } : ma(t);
  return i.config = function(n) {
    return a(e, n);
  }, i;
};
lt("Linear,Quad,Cubic,Quart,Quint,Strong", function(a, e) {
  var r = e < 5 ? e + 1 : e;
  Qr(a + ",Power" + (r - 1), e ? function(t) {
    return Math.pow(t, r);
  } : function(t) {
    return t;
  }, function(t) {
    return 1 - Math.pow(1 - t, r);
  }, function(t) {
    return t < 0.5 ? Math.pow(t * 2, r) / 2 : 1 - Math.pow((1 - t) * 2, r) / 2;
  });
});
G.Linear.easeNone = G.none = G.Linear.easeIn;
Qr("Elastic", Qn("in"), Qn("out"), Qn());
(function(a, e) {
  var r = 1 / e, t = 2 * r, i = 2.5 * r, n = function(o) {
    return o < r ? a * o * o : o < t ? a * Math.pow(o - 1.5 / e, 2) + 0.75 : o < i ? a * (o -= 2.25 / e) * o + 0.9375 : a * Math.pow(o - 2.625 / e, 2) + 0.984375;
  };
  Qr("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Qr("Expo", function(a) {
  return Math.pow(2, 10 * (a - 1)) * a + a * a * a * a * a * a * (1 - a);
});
Qr("Circ", function(a) {
  return -(Uo(1 - a * a) - 1);
});
Qr("Sine", function(a) {
  return a === 1 ? 1 : -cu(a * lu) + 1;
});
Qr("Back", Jn("in"), Jn("out"), Jn());
G.SteppedEase = G.steps = Ct.SteppedEase = {
  config: function(e, r) {
    e === void 0 && (e = 1);
    var t = 1 / e, i = e + (r ? 0 : 1), n = r ? 1 : 0, s = 1 - ne;
    return function(o) {
      return ((i * on(0, s, o) | 0) + n) * t;
    };
  }
};
Ki.ease = G["quad.out"];
lt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
  return Ys += a + "," + a + "Params,";
});
var ya = function(e, r) {
  this.id = fu++, e._gsap = this, this.target = e, this.harness = r, this.get = r ? r.get : Qo, this.set = r ? r.getSetter : Ws;
}, en = /* @__PURE__ */ (function() {
  function a(r) {
    this.vars = r, this._delay = +r.delay || 0, (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) && (this._rDelay = r.repeatDelay || 0, this._yoyo = !!r.yoyo || !!r.yoyoEase), this._ts = 1, vi(this, +r.duration, 1, 1), this.data = r.data, ae && (this._ctx = ae, ae.data.push(this)), ji || xt.wake();
  }
  var e = a.prototype;
  return e.delay = function(t) {
    return t || t === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay;
  }, e.duration = function(t) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(t) {
    return arguments.length ? (this._dirty = 0, vi(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(t, i) {
    if (xi(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (qn(this, t), !n._dp || n.parent || ra(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && $t(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== t || !this._dur && !i || this._initted && Math.abs(this._zTime) === ne || !this._initted && this._dur && t || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), Jo(this, t, i)), this;
  }, e.time = function(t, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + uo(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(t, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * t, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(t, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - t : t) + uo(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(t, i) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (t - 1) * n, i) : this._repeat ? yi(this._tTime, n) + 1 : 1;
  }, e.timeScale = function(t, i) {
    if (!arguments.length)
      return this._rts === -ne ? 0 : this._rts;
    if (this._rts === t)
      return this;
    var n = this.parent && this._ts ? Fn(this.parent._time, this) : this._tTime;
    return this._rts = +t || 0, this._ts = this._ps || t === -ne ? 0 : this._rts, this.totalTime(on(-Math.abs(this._delay), this.totalDuration(), n), i !== !1), Wn(this), bu(this);
  }, e.paused = function(t) {
    return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (xi(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== ne && (this._tTime -= ne)))), this) : this._ps;
  }, e.startTime = function(t) {
    if (arguments.length) {
      this._start = le(t);
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && $t(i, this, this._start - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(t) {
    return this._start + (ut(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(t) {
    var i = this.parent || this._dp;
    return i ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Fn(i.rawTime(t), this) : this._tTime : this._tTime;
  }, e.revert = function(t) {
    t === void 0 && (t = yu);
    var i = Ye;
    return Ye = t, Bs(this) && (this.timeline && this.timeline.revert(t), this.totalTime(-0.01, t.suppressEvents)), this.data !== "nested" && t.kill !== !1 && this.kill(), Ye = i, this;
  }, e.globalTime = function(t) {
    for (var i = this, n = arguments.length ? t : i.rawTime(); i; )
      n = i._start + n / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(t) : n;
  }, e.repeat = function(t) {
    return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, lo(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(t) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = t, lo(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(t) {
    return arguments.length ? (this._yoyo = t, this) : this._yoyo;
  }, e.seek = function(t, i) {
    return this.totalTime(Mt(this, t), ut(i));
  }, e.restart = function(t, i) {
    return this.play().totalTime(t ? -this._delay : 0, ut(i)), this._dur || (this._zTime = -ne), this;
  }, e.play = function(t, i) {
    return t != null && this.seek(t, i), this.reversed(!1).paused(!1);
  }, e.reverse = function(t, i) {
    return t != null && this.seek(t || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, e.pause = function(t, i) {
    return t != null && this.seek(t, i), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(t) {
    return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -ne : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -ne, this;
  }, e.isActive = function() {
    var t = this.parent || this._dp, i = this._start, n;
    return !!(!t || this._ts && this._initted && t.isActive() && (n = t.rawTime(!0)) >= i && n < this.endTime(!0) - ne);
  }, e.eventCallback = function(t, i, n) {
    var s = this.vars;
    return arguments.length > 1 ? (i ? (s[t] = i, n && (s[t + "Params"] = n), t === "onUpdate" && (this._onUpdate = i)) : delete s[t], this) : s[t];
  }, e.then = function(t) {
    var i = this, n = i._prom;
    return new Promise(function(s) {
      var o = pe(t) ? t : ea, u = function() {
        var f = i.then;
        i.then = null, n && n(), pe(o) && (o = o(i)) && (o.then || o === i) && (i.then = f), s(o), i.then = f;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? u() : i._prom = u;
    });
  }, e.kill = function() {
    Ei(this);
  }, a;
})();
kt(en.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -ne,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var at = /* @__PURE__ */ (function(a) {
  Vo(e, a);
  function e(t, i) {
    var n;
    return t === void 0 && (t = {}), n = a.call(this, t) || this, n.labels = {}, n.smoothChildTiming = !!t.smoothChildTiming, n.autoRemoveChildren = !!t.autoRemoveChildren, n._sort = ut(t.sortChildren), fe && $t(t.parent || fe, rr(n), i), t.reversed && n.reverse(), t.paused && n.paused(!0), t.scrollTrigger && ia(rr(n), t.scrollTrigger), n;
  }
  var r = e.prototype;
  return r.to = function(i, n, s) {
    return Yi(0, arguments, this), this;
  }, r.from = function(i, n, s) {
    return Yi(1, arguments, this), this;
  }, r.fromTo = function(i, n, s, o) {
    return Yi(2, arguments, this), this;
  }, r.set = function(i, n, s) {
    return n.duration = 0, n.parent = this, Ii(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Se(i, n, Mt(this, s), 1), this;
  }, r.call = function(i, n, s) {
    return $t(this, Se.delayedCall(0, i, n), s);
  }, r.staggerTo = function(i, n, s, o, u, l, f) {
    return s.duration = n, s.stagger = s.stagger || o, s.onComplete = l, s.onCompleteParams = f, s.parent = this, new Se(i, s, Mt(this, u)), this;
  }, r.staggerFrom = function(i, n, s, o, u, l, f) {
    return s.runBackwards = 1, Ii(s).immediateRender = ut(s.immediateRender), this.staggerTo(i, n, s, o, u, l, f);
  }, r.staggerFromTo = function(i, n, s, o, u, l, f, d) {
    return o.startAt = s, Ii(o).immediateRender = ut(o.immediateRender), this.staggerTo(i, n, o, u, l, f, d);
  }, r.render = function(i, n, s) {
    var o = this._time, u = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, f = i <= 0 ? 0 : le(i), d = this._zTime < 0 != i < 0 && (this._initted || !l), _, c, g, h, p, v, b, S, w, T, M, x;
    if (this !== fe && f > u && i >= 0 && (f = u), f !== this._tTime || s || d) {
      if (o !== this._time && l && (f += this._time - o, i += this._time - o), _ = f, w = this._start, S = this._ts, v = !S, d && (l || (o = this._zTime), (i || !n) && (this._zTime = i)), this._repeat) {
        if (M = this._yoyo, p = l + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(p * 100 + i, n, s);
        if (_ = le(f % p), f === u ? (h = this._repeat, _ = l) : (T = le(f / p), h = ~~T, h && h === T && (_ = l, h--), _ > l && (_ = l)), T = yi(this._tTime, p), !o && this._tTime && T !== h && this._tTime - T * p - this._dur <= 0 && (T = h), M && h & 1 && (_ = l - _, x = 1), h !== T && !this._lock) {
          var P = M && T & 1, k = P === (M && h & 1);
          if (h < T && (P = !P), o = P ? 0 : f % l ? l : f, this._lock = 1, this.render(o || (x ? 0 : le(h * p)), n, !l)._lock = 0, this._tTime = f, !n && this.parent && bt(this, "onRepeat"), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, T = h), o && o !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, u = this._tDur, k && (this._lock = 2, o = P ? l : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (b = ku(this, le(o), le(_)), b && (f -= _ - (_ = b._start))), this._tTime = f, this._time = _, this._act = !!S, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && f && l && !n && !T && (bt(this, "onStart"), this._tTime !== f))
        return this;
      if (_ >= o && i >= 0)
        for (c = this._first; c; ) {
          if (g = c._next, (c._act || _ >= c._start) && c._ts && b !== c) {
            if (c.parent !== this)
              return this.render(i, n, s);
            if (c.render(c._ts > 0 ? (_ - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (_ - c._start) * c._ts, n, s), _ !== this._time || !this._ts && !v) {
              b = 0, g && (f += this._zTime = -ne);
              break;
            }
          }
          c = g;
        }
      else {
        c = this._last;
        for (var C = i < 0 ? i : _; c; ) {
          if (g = c._prev, (c._act || C <= c._end) && c._ts && b !== c) {
            if (c.parent !== this)
              return this.render(i, n, s);
            if (c.render(c._ts > 0 ? (C - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (C - c._start) * c._ts, n, s || Ye && Bs(c)), _ !== this._time || !this._ts && !v) {
              b = 0, g && (f += this._zTime = C ? -ne : ne);
              break;
            }
          }
          c = g;
        }
      }
      if (b && !n && (this.pause(), b.render(_ >= o ? 0 : -ne)._zTime = _ >= o ? 1 : -1, this._ts))
        return this._start = w, Wn(this), this.render(i, n, s);
      this._onUpdate && !n && bt(this, "onUpdate", !0), (f === u && this._tTime >= this.totalDuration() || !f && o) && (w === this._start || Math.abs(S) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (f === u && this._ts > 0 || !f && this._ts < 0) && Sr(this, 1), !n && !(i < 0 && !o) && (f || o || !u) && (bt(this, f === u && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, r.add = function(i, n) {
    var s = this;
    if (ar(n) || (n = Mt(this, n, i)), !(i instanceof en)) {
      if (He(i))
        return i.forEach(function(o) {
          return s.add(o, n);
        }), this;
      if (Ae(i))
        return this.addLabel(i, n);
      if (pe(i))
        i = Se.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? $t(this, i, n) : this;
  }, r.getChildren = function(i, n, s, o) {
    i === void 0 && (i = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -Dt);
    for (var u = [], l = this._first; l; )
      l._start >= o && (l instanceof Se ? n && u.push(l) : (s && u.push(l), i && u.push.apply(u, l.getChildren(!0, n, s)))), l = l._next;
    return u;
  }, r.getById = function(i) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === i)
        return n[s];
  }, r.remove = function(i) {
    return Ae(i) ? this.removeLabel(i) : pe(i) ? this.killTweensOf(i) : (i.parent === this && Un(this, i), i === this._recent && (this._recent = this._last), Vr(this));
  }, r.totalTime = function(i, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = le(xt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), a.prototype.totalTime.call(this, i, n), this._forcing = 0, this) : this._tTime;
  }, r.addLabel = function(i, n) {
    return this.labels[i] = Mt(this, n), this;
  }, r.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, r.addPause = function(i, n, s) {
    var o = Se.delayedCall(0, n || Qi, s);
    return o.data = "isPause", this._hasPause = 1, $t(this, o, Mt(this, i));
  }, r.removePause = function(i) {
    var n = this._first;
    for (i = Mt(this, i); n; )
      n._start === i && n.data === "isPause" && Sr(n), n = n._next;
  }, r.killTweensOf = function(i, n, s) {
    for (var o = this.getTweensOf(i, s), u = o.length; u--; )
      gr !== o[u] && o[u].kill(i, n);
    return this;
  }, r.getTweensOf = function(i, n) {
    for (var s = [], o = Rt(i), u = this._first, l = ar(n), f; u; )
      u instanceof Se ? vu(u._targets, o) && (l ? (!gr || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && s.push(u) : (f = u.getTweensOf(o, n)).length && s.push.apply(s, f), u = u._next;
    return s;
  }, r.tweenTo = function(i, n) {
    n = n || {};
    var s = this, o = Mt(s, i), u = n, l = u.startAt, f = u.onStart, d = u.onStartParams, _ = u.immediateRender, c, g = Se.to(s, kt({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: o,
      overwrite: "auto",
      duration: n.duration || Math.abs((o - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || ne,
      onStart: function() {
        if (s.pause(), !c) {
          var p = n.duration || Math.abs((o - (l && "time" in l ? l.time : s._time)) / s.timeScale());
          g._dur !== p && vi(g, p, 0, 1).render(g._time, !0, !0), c = 1;
        }
        f && f.apply(g, d || []);
      }
    }, n));
    return _ ? g.render(0) : g;
  }, r.tweenFromTo = function(i, n, s) {
    return this.tweenTo(n, kt({
      startAt: {
        time: Mt(this, i)
      }
    }, s));
  }, r.recent = function() {
    return this._recent;
  }, r.nextLabel = function(i) {
    return i === void 0 && (i = this._time), fo(this, Mt(this, i));
  }, r.previousLabel = function(i) {
    return i === void 0 && (i = this._time), fo(this, Mt(this, i), 1);
  }, r.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + ne);
  }, r.shiftChildren = function(i, n, s) {
    s === void 0 && (s = 0);
    var o = this._first, u = this.labels, l;
    for (i = le(i); o; )
      o._start >= s && (o._start += i, o._end += i), o = o._next;
    if (n)
      for (l in u)
        u[l] >= s && (u[l] += i);
    return Vr(this);
  }, r.invalidate = function(i) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(i), n = n._next;
    return a.prototype.invalidate.call(this, i);
  }, r.clear = function(i) {
    i === void 0 && (i = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Vr(this);
  }, r.totalDuration = function(i) {
    var n = 0, s = this, o = s._last, u = Dt, l, f, d;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i));
    if (s._dirty) {
      for (d = s.parent; o; )
        l = o._prev, o._dirty && o.totalDuration(), f = o._start, f > u && s._sort && o._ts && !s._lock ? (s._lock = 1, $t(s, o, f - o._delay, 1)._lock = 0) : u = f, f < 0 && o._ts && (n -= f, (!d && !s._dp || d && d.smoothChildTiming) && (s._start += le(f / s._ts), s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), u = 0), o._end > n && o._ts && (n = o._end), o = l;
      vi(s, s === fe && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, e.updateRoot = function(i) {
    if (fe._ts && (Jo(fe, Fn(i, fe)), Zo = xt.frame), xt.frame >= oo) {
      oo += St.autoSleep || 120;
      var n = fe._first;
      if ((!n || !n._ts) && St.autoSleep && xt._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || xt.sleep();
      }
    }
  }, e;
})(en);
kt(at.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Uu = function(e, r, t, i, n, s, o) {
  var u = new ft(this._pt, e, r, 0, 1, Sa, null, n), l = 0, f = 0, d, _, c, g, h, p, v, b;
  for (u.b = t, u.e = i, t += "", i += "", (v = ~i.indexOf("random(")) && (i = Ji(i)), s && (b = [t, i], s(b, e, r), t = b[0], i = b[1]), _ = t.match(Hn) || []; d = Hn.exec(i); )
    g = d[0], h = i.substring(l, d.index), c ? c = (c + 1) % 5 : h.substr(-5) === "rgba(" && (c = 1), g !== _[f++] && (p = parseFloat(_[f - 1]) || 0, u._pt = {
      _next: u._pt,
      p: h || f === 1 ? h : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: p,
      c: g.charAt(1) === "=" ? fi(p, g) - p : parseFloat(g) - p,
      m: c && c < 4 ? Math.round : 0
    }, l = Hn.lastIndex);
  return u.c = l < i.length ? i.substring(l, i.length) : "", u.fp = o, ($o.test(i) || v) && (u.e = 0), this._pt = u, u;
}, Ns = function(e, r, t, i, n, s, o, u, l, f) {
  pe(i) && (i = i(n || 0, e, s));
  var d = e[r], _ = t !== "get" ? t : pe(d) ? l ? e[r.indexOf("set") || !pe(e["get" + r.substr(3)]) ? r : "get" + r.substr(3)](l) : e[r]() : d, c = pe(d) ? l ? Hu : ba : Us, g;
  if (Ae(i) && (~i.indexOf("random(") && (i = Ji(i)), i.charAt(1) === "=" && (g = fi(_, i) + ($e(_) || 0), (g || g === 0) && (i = g))), !f || _ !== i || gs)
    return !isNaN(_ * i) && i !== "" ? (g = new ft(this._pt, e, r, +_ || 0, i - (_ || 0), typeof d == "boolean" ? Zu : Ta, 0, c), l && (g.fp = l), o && g.modifier(o, this, e), this._pt = g) : (!d && !(r in e) && Ls(r, i), Uu.call(this, e, r, _, i, c, u || St.stringFilter, l));
}, Wu = function(e, r, t, i, n) {
  if (pe(e) && (e = Xi(e, n, r, t, i)), !Zt(e) || e.style && e.nodeType || He(e) || Wo(e))
    return Ae(e) ? Xi(e, n, r, t, i) : e;
  var s = {}, o;
  for (o in e)
    s[o] = Xi(e[o], n, r, t, i);
  return s;
}, va = function(e, r, t, i, n, s) {
  var o, u, l, f;
  if (yt[e] && (o = new yt[e]()).init(n, o.rawVars ? r[e] : Wu(r[e], i, n, s, t), t, i, s) !== !1 && (t._pt = u = new ft(t._pt, n, e, 0, 1, o.render, o, 0, o.priority), t !== ui))
    for (l = t._ptLookup[t._targets.indexOf(n)], f = o._props.length; f--; )
      l[o._props[f]] = u;
  return o;
}, gr, gs, Vs = function a(e, r, t) {
  var i = e.vars, n = i.ease, s = i.startAt, o = i.immediateRender, u = i.lazy, l = i.onUpdate, f = i.runBackwards, d = i.yoyoEase, _ = i.keyframes, c = i.autoRevert, g = e._dur, h = e._startAt, p = e._targets, v = e.parent, b = v && v.data === "nested" ? v.vars.targets : p, S = e._overwrite === "auto" && !Rs, w = e.timeline, T = i.easeReverse || d, M, x, P, k, C, B, E, H, I, K, q, A, Z;
  if (w && (!_ || !n) && (n = "none"), e._ease = Ur(n, Ki.ease), e._rEase = T && (Ur(T) || e._ease), e._from = !w && !!i.runBackwards, e._from && (e.ratio = 1), !w || _ && !i.stagger) {
    if (H = p[0] ? Nr(p[0]).harness : 0, A = H && i[H.prop], M = zn(i, Is), h && (h._zTime < 0 && h.progress(1), r < 0 && f && o && !c ? h.render(-1, !0) : h.revert(f && g ? Tn : mu), h._lazy = 0), s) {
      if (Sr(e._startAt = Se.set(p, kt({
        data: "isStart",
        overwrite: !1,
        parent: v,
        immediateRender: !0,
        lazy: !h && ut(u),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return bt(e, "onUpdate");
        },
        stagger: 0
      }, s))), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (Ye || !o && !c) && e._startAt.revert(Tn), o && g && r <= 0 && t <= 0) {
        r && (e._zTime = r);
        return;
      }
    } else if (f && g && !h) {
      if (r && (o = !1), P = kt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: o && !h && ut(u),
        immediateRender: o,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: v
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, M), A && (P[H.prop] = A), Sr(e._startAt = Se.set(p, P)), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (Ye ? e._startAt.revert(Tn) : e._startAt.render(-1, !0)), e._zTime = r, !o)
        a(e._startAt, ne, ne);
      else if (!r)
        return;
    }
    for (e._pt = e._ptCache = 0, u = g && ut(u) || u && !g, x = 0; x < p.length; x++) {
      if (C = p[x], E = C._gsap || Xs(p)[x]._gsap, e._ptLookup[x] = K = {}, fs[E.id] && wr.length && An(), q = b === p ? x : b.indexOf(C), H && (I = new H()).init(C, A || M, e, q, b) !== !1 && (e._pt = k = new ft(e._pt, C, I.name, 0, 1, I.render, I, 0, I.priority), I._props.forEach(function(te) {
        K[te] = k;
      }), I.priority && (B = 1)), !H || A)
        for (P in M)
          yt[P] && (I = va(P, M, e, q, C, b)) ? I.priority && (B = 1) : K[P] = k = Ns.call(e, C, P, "get", M[P], q, b, 0, i.stringFilter);
      e._op && e._op[x] && e.kill(C, e._op[x]), S && e._pt && (gr = e, fe.killTweensOf(C, K, e.globalTime(r)), Z = !e.parent, gr = 0), e._pt && u && (fs[E.id] = 1);
    }
    B && Ca(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = l, e._initted = (!e._op || e._pt) && !Z, _ && r <= 0 && w.render(Dt, !0, !0);
}, qu = function(e, r, t, i, n, s, o, u) {
  var l = (e._pt && e._ptCache || (e._ptCache = {}))[r], f, d, _, c;
  if (!l)
    for (l = e._ptCache[r] = [], _ = e._ptLookup, c = e._targets.length; c--; ) {
      if (f = _[c][r], f && f.d && f.d._pt)
        for (f = f.d._pt; f && f.p !== r && f.fp !== r; )
          f = f._next;
      if (!f)
        return gs = 1, e.vars[r] = "+=0", Vs(e, o), gs = 0, u ? Zi(r + " not eligible for reset. Try splitting into individual properties") : 1;
      l.push(f);
    }
  for (c = l.length; c--; )
    d = l[c], f = d._pt || d, f.s = (i || i === 0) && !n ? i : f.s + (i || 0) + s * f.c, f.c = t - f.s, d.e && (d.e = ve(t) + $e(d.e)), d.b && (d.b = f.s + $e(d.b));
}, $u = function(e, r) {
  var t = e[0] ? Nr(e[0]).harness : 0, i = t && t.aliases, n, s, o, u;
  if (!i)
    return r;
  n = mi({}, r);
  for (s in i)
    if (s in n)
      for (u = i[s].split(","), o = u.length; o--; )
        n[u[o]] = n[s];
  return n;
}, Gu = function(e, r, t, i) {
  var n = r.ease || i || "power1.inOut", s, o;
  if (He(r))
    o = t[e] || (t[e] = []), r.forEach(function(u, l) {
      return o.push({
        t: l / (r.length - 1) * 100,
        v: u,
        e: n
      });
    });
  else
    for (s in r)
      o = t[s] || (t[s] = []), s === "ease" || o.push({
        t: parseFloat(e),
        v: r[s],
        e: n
      });
}, Xi = function(e, r, t, i, n) {
  return pe(e) ? e.call(r, t, i, n) : Ae(e) && ~e.indexOf("random(") ? Ji(e) : e;
}, xa = Ys + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", wa = {};
lt(xa + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
  return wa[a] = 1;
});
var Se = /* @__PURE__ */ (function(a) {
  Vo(e, a);
  function e(t, i, n, s) {
    var o;
    typeof i == "number" && (n.duration = i, i = n, n = null), o = a.call(this, s ? i : Ii(i)) || this;
    var u = o.vars, l = u.duration, f = u.delay, d = u.immediateRender, _ = u.stagger, c = u.overwrite, g = u.keyframes, h = u.defaults, p = u.scrollTrigger, v = i.parent || fe, b = (He(t) || Wo(t) ? ar(t[0]) : "length" in i) ? [t] : Rt(t), S, w, T, M, x, P, k, C;
    if (o._targets = b.length ? Xs(b) : Zi("GSAP target " + t + " not found. https://gsap.com", !St.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = c, g || _ || fn(l) || fn(f)) {
      i = o.vars;
      var B = i.easeReverse || i.yoyoEase;
      if (S = o.timeline = new at({
        data: "nested",
        defaults: h || {},
        targets: v && v.data === "nested" ? v.vars.targets : b
      }), S.kill(), S.parent = S._dp = rr(o), S._start = 0, _ || fn(l) || fn(f)) {
        if (M = b.length, k = _ && aa(_), Zt(_))
          for (x in _)
            ~xa.indexOf(x) && (C || (C = {}), C[x] = _[x]);
        for (w = 0; w < M; w++)
          T = zn(i, wa), T.stagger = 0, B && (T.easeReverse = B), C && mi(T, C), P = b[w], T.duration = +Xi(l, rr(o), w, P, b), T.delay = (+Xi(f, rr(o), w, P, b) || 0) - o._delay, !_ && M === 1 && T.delay && (o._delay = f = T.delay, o._start += f, T.delay = 0), S.to(P, T, k ? k(w, P, b) : 0), S._ease = G.none;
        S.duration() ? l = f = 0 : o.timeline = 0;
      } else if (g) {
        Ii(kt(S.vars.defaults, {
          ease: "none"
        })), S._ease = Ur(g.ease || i.ease || "none");
        var E = 0, H, I, K;
        if (He(g))
          g.forEach(function(q) {
            return S.to(b, q, ">");
          }), S.duration();
        else {
          T = {};
          for (x in g)
            x === "ease" || x === "easeEach" || Gu(x, g[x], T, g.easeEach);
          for (x in T)
            for (H = T[x].sort(function(q, A) {
              return q.t - A.t;
            }), E = 0, w = 0; w < H.length; w++)
              I = H[w], K = {
                ease: I.e,
                duration: (I.t - (w ? H[w - 1].t : 0)) / 100 * l
              }, K[x] = I.v, S.to(b, K, E), E += K.duration;
          S.duration() < l && S.to({}, {
            duration: l - S.duration()
          });
        }
      }
      l || o.duration(l = S.duration());
    } else
      o.timeline = 0;
    return c === !0 && !Rs && (gr = rr(o), fe.killTweensOf(b), gr = 0), $t(v, rr(o), n), i.reversed && o.reverse(), i.paused && o.paused(!0), (d || !l && !g && o._start === le(v._time) && ut(d) && Tu(rr(o)) && v.data !== "nested") && (o._tTime = -ne, o.render(Math.max(0, -f) || 0)), p && ia(rr(o), p), o;
  }
  var r = e.prototype;
  return r.render = function(i, n, s) {
    var o = this._time, u = this._tDur, l = this._dur, f = i < 0, d = i > u - ne && !f ? u : i < ne ? 0 : i, _, c, g, h, p, v, b, S;
    if (!l)
      Cu(this, i, n, s);
    else if (d !== this._tTime || !i || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f || this._lazy) {
      if (_ = d, S = this.timeline, this._repeat) {
        if (h = l + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(h * 100 + i, n, s);
        if (_ = le(d % h), d === u ? (g = this._repeat, _ = l) : (p = le(d / h), g = ~~p, g && g === p ? (_ = l, g--) : _ > l && (_ = l)), v = this._yoyo && g & 1, v && (_ = l - _), p = yi(this._tTime, h), _ === o && !s && this._initted && g === p)
          return this._tTime = d, this;
        g !== p && this.vars.repeatRefresh && !v && !this._lock && _ !== h && this._initted && (this._lock = s = 1, this.render(le(h * g), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (na(this, f ? i : _, s, n, d))
          return this._tTime = 0, this;
        if (o !== this._time && !(s && this.vars.repeatRefresh && g !== p))
          return this;
        if (l !== this._dur)
          return this.render(i, n, s);
      }
      if (this._rEase) {
        var w = _ < o;
        if (w !== this._inv) {
          var T = w ? o : l - o;
          this._inv = w, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = o, this._invRecip = T ? (w ? -1 : 1) / T : 0, this._invScale = w ? -this.ratio : 1 - this.ratio, this._invEase = w ? this._rEase : this._ease;
        }
        this.ratio = b = this._invRatio + this._invScale * this._invEase((_ - this._invTime) * this._invRecip);
      } else
        this.ratio = b = this._ease(_ / l);
      if (this._from && (this.ratio = b = 1 - b), this._tTime = d, this._time = _, !this._act && this._ts && (this._act = 1, this._lazy = 0), !o && d && !n && !p && (bt(this, "onStart"), this._tTime !== d))
        return this;
      for (c = this._pt; c; )
        c.r(b, c.d), c = c._next;
      S && S.render(i < 0 ? i : S._dur * S._ease(_ / this._dur), n, s) || this._startAt && (this._zTime = i), this._onUpdate && !n && (f && cs(this, i, n, s), bt(this, "onUpdate")), this._repeat && g !== p && this.vars.onRepeat && !n && this.parent && bt(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (f && !this._onUpdate && cs(this, i, !0, !0), (i || !l) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Sr(this, 1), !n && !(f && !o) && (d || o || v) && (bt(this, d === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, r.targets = function() {
    return this._targets;
  }, r.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), a.prototype.invalidate.call(this, i);
  }, r.resetTo = function(i, n, s, o, u) {
    ji || xt.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), f;
    return this._initted || Vs(this, l), f = this._ease(l / this._dur), qu(this, i, n, s, o, f, l, u) ? this.resetTo(i, n, s, o, 1) : (qn(this, 0), this.parent || ta(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, r.kill = function(i, n) {
    if (n === void 0 && (n = "all"), !i && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Ei(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Ye), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, n, gr && gr.vars.overwrite !== !0)._first || Ei(this), this.parent && s !== this.timeline.totalDuration() && vi(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var o = this._targets, u = i ? Rt(i) : o, l = this._ptLookup, f = this._pt, d, _, c, g, h, p, v;
    if ((!n || n === "all") && wu(o, u))
      return n === "all" && (this._pt = 0), Ei(this);
    for (d = this._op = this._op || [], n !== "all" && (Ae(n) && (h = {}, lt(n, function(b) {
      return h[b] = 1;
    }), n = h), n = $u(o, n)), v = o.length; v--; )
      if (~u.indexOf(o[v])) {
        _ = l[v], n === "all" ? (d[v] = n, g = _, c = {}) : (c = d[v] = d[v] || {}, g = n);
        for (h in g)
          p = _ && _[h], p && ((!("kill" in p.d) || p.d.kill(h) === !0) && Un(this, p, "_pt"), delete _[h]), c !== "all" && (c[h] = 1);
      }
    return this._initted && !this._pt && f && Ei(this), this;
  }, e.to = function(i, n) {
    return new e(i, n, arguments[2]);
  }, e.from = function(i, n) {
    return Yi(1, arguments);
  }, e.delayedCall = function(i, n, s, o) {
    return new e(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: o
    });
  }, e.fromTo = function(i, n, s) {
    return Yi(2, arguments);
  }, e.set = function(i, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new e(i, n);
  }, e.killTweensOf = function(i, n, s) {
    return fe.killTweensOf(i, n, s);
  }, e;
})(en);
kt(Se.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
lt("staggerTo,staggerFrom,staggerFromTo", function(a) {
  Se[a] = function() {
    var e = new at(), r = ds.call(arguments, 0);
    return r.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), e[a].apply(e, r);
  };
});
var Us = function(e, r, t) {
  return e[r] = t;
}, ba = function(e, r, t) {
  return e[r](t);
}, Hu = function(e, r, t, i) {
  return e[r](i.fp, t);
}, Ku = function(e, r, t) {
  return e.setAttribute(r, t);
}, Ws = function(e, r) {
  return pe(e[r]) ? ba : As(e[r]) && e.setAttribute ? Ku : Us;
}, Ta = function(e, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e6) / 1e6, r);
}, Zu = function(e, r) {
  return r.set(r.t, r.p, !!(r.s + r.c * e), r);
}, Sa = function(e, r) {
  var t = r._pt, i = "";
  if (!e && r.b)
    i = r.b;
  else if (e === 1 && r.e)
    i = r.e;
  else {
    for (; t; )
      i = t.p + (t.m ? t.m(t.s + t.c * e) : Math.round((t.s + t.c * e) * 1e4) / 1e4) + i, t = t._next;
    i += r.c;
  }
  r.set(r.t, r.p, i, r);
}, qs = function(e, r) {
  for (var t = r._pt; t; )
    t.r(e, t.d), t = t._next;
}, Qu = function(e, r, t, i) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === i && n.modifier(e, r, t), n = s;
}, Ju = function(e) {
  for (var r = this._pt, t, i; r; )
    i = r._next, r.p === e && !r.op || r.op === e ? Un(this, r, "_pt") : r.dep || (t = 1), r = i;
  return !t;
}, ju = function(e, r, t, i) {
  i.mSet(e, r, i.m.call(i.tween, t, i.mt), i);
}, Ca = function(e) {
  for (var r = e._pt, t, i, n, s; r; ) {
    for (t = r._next, i = n; i && i.pr > r.pr; )
      i = i._next;
    (r._prev = i ? i._prev : s) ? r._prev._next = r : n = r, (r._next = i) ? i._prev = r : s = r, r = t;
  }
  e._pt = n;
}, ft = /* @__PURE__ */ (function() {
  function a(r, t, i, n, s, o, u, l, f) {
    this.t = t, this.s = n, this.c = s, this.p = i, this.r = o || Ta, this.d = u || this, this.set = l || Us, this.pr = f || 0, this._next = r, r && (r._prev = this);
  }
  var e = a.prototype;
  return e.modifier = function(t, i, n) {
    this.mSet = this.mSet || this.set, this.set = ju, this.m = t, this.mt = n, this.tween = i;
  }, a;
})();
lt(Ys + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(a) {
  return Is[a] = 1;
});
Ct.TweenMax = Ct.TweenLite = Se;
Ct.TimelineLite = Ct.TimelineMax = at;
fe = new at({
  sortChildren: !1,
  defaults: Ki,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
St.stringFilter = ga;
var Wr = [], Cn = {}, el = [], ho = 0, tl = 0, jn = function(e) {
  return (Cn[e] || el).map(function(r) {
    return r();
  });
}, ms = function() {
  var e = Date.now(), r = [];
  e - ho > 2 && (jn("matchMediaInit"), Wr.forEach(function(t) {
    var i = t.queries, n = t.conditions, s, o, u, l;
    for (o in i)
      s = Wt.matchMedia(i[o]).matches, s && (u = 1), s !== n[o] && (n[o] = s, l = 1);
    l && (t.revert(), u && r.push(t));
  }), jn("matchMediaRevert"), r.forEach(function(t) {
    return t.onMatch(t, function(i) {
      return t.add(null, i);
    });
  }), ho = e, jn("matchMedia"));
}, ka = /* @__PURE__ */ (function() {
  function a(r, t) {
    this.selector = t && _s(t), this.data = [], this._r = [], this.isReverted = !1, this.id = tl++, r && this.add(r);
  }
  var e = a.prototype;
  return e.add = function(t, i, n) {
    pe(t) && (n = i, i = t, t = pe);
    var s = this, o = function() {
      var l = ae, f = s.selector, d;
      return l && l !== s && l.data.push(s), n && (s.selector = _s(n)), ae = s, d = i.apply(s, arguments), pe(d) && s._r.push(d), ae = l, s.selector = f, s.isReverted = !1, d;
    };
    return s.last = o, t === pe ? o(s, function(u) {
      return s.add(null, u);
    }) : t ? s[t] = o : o;
  }, e.ignore = function(t) {
    var i = ae;
    ae = null, t(this), ae = i;
  }, e.getTweens = function() {
    var t = [];
    return this.data.forEach(function(i) {
      return i instanceof a ? t.push.apply(t, i.getTweens()) : i instanceof Se && !(i.parent && i.parent.data === "nested") && t.push(i);
    }), t;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(t, i) {
    var n = this;
    if (t ? (function() {
      for (var o = n.getTweens(), u = n.data.length, l; u--; )
        l = n.data[u], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(f) {
          return o.splice(o.indexOf(f), 1);
        }));
      for (o.map(function(f) {
        return {
          g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
          t: f
        };
      }).sort(function(f, d) {
        return d.g - f.g || -1 / 0;
      }).forEach(function(f) {
        return f.t.revert(t);
      }), u = n.data.length; u--; )
        l = n.data[u], l instanceof at ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof Se) && l.revert && l.revert(t);
      n._r.forEach(function(f) {
        return f(t, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(o) {
      return o.kill && o.kill();
    }), this.clear(), i)
      for (var s = Wr.length; s--; )
        Wr[s].id === this.id && Wr.splice(s, 1);
  }, e.revert = function(t) {
    this.kill(t || {});
  }, a;
})(), rl = /* @__PURE__ */ (function() {
  function a(r) {
    this.contexts = [], this.scope = r, ae && ae.data.push(this);
  }
  var e = a.prototype;
  return e.add = function(t, i, n) {
    Zt(t) || (t = {
      matches: t
    });
    var s = new ka(0, n || this.scope), o = s.conditions = {}, u, l, f;
    ae && !s.selector && (s.selector = ae.selector), this.contexts.push(s), i = s.add("onMatch", i), s.queries = t;
    for (l in t)
      l === "all" ? f = 1 : (u = Wt.matchMedia(t[l]), u && (Wr.indexOf(s) < 0 && Wr.push(s), (o[l] = u.matches) && (f = 1), u.addListener ? u.addListener(ms) : u.addEventListener("change", ms)));
    return f && i(s, function(d) {
      return s.add(null, d);
    }), this;
  }, e.revert = function(t) {
    this.kill(t || {});
  }, e.kill = function(t) {
    this.contexts.forEach(function(i) {
      return i.kill(t, !0);
    });
  }, a;
})(), Ln = {
  registerPlugin: function() {
    for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
      r[t] = arguments[t];
    r.forEach(function(i) {
      return da(i);
    });
  },
  timeline: function(e) {
    return new at(e);
  },
  getTweensOf: function(e, r) {
    return fe.getTweensOf(e, r);
  },
  getProperty: function(e, r, t, i) {
    Ae(e) && (e = Rt(e)[0]);
    var n = Nr(e || {}).get, s = t ? ea : jo;
    return t === "native" && (t = ""), e && (r ? s((yt[r] && yt[r].get || n)(e, r, t, i)) : function(o, u, l) {
      return s((yt[o] && yt[o].get || n)(e, o, u, l));
    });
  },
  quickSetter: function(e, r, t) {
    if (e = Rt(e), e.length > 1) {
      var i = e.map(function(f) {
        return ht.quickSetter(f, r, t);
      }), n = i.length;
      return function(f) {
        for (var d = n; d--; )
          i[d](f);
      };
    }
    e = e[0] || {};
    var s = yt[r], o = Nr(e), u = o.harness && (o.harness.aliases || {})[r] || r, l = s ? function(f) {
      var d = new s();
      ui._pt = 0, d.init(e, t ? f + t : f, ui, 0, [e]), d.render(1, d), ui._pt && qs(1, ui);
    } : o.set(e, u);
    return s ? l : function(f) {
      return l(e, u, t ? f + t : f, o, 1);
    };
  },
  quickTo: function(e, r, t) {
    var i, n = ht.to(e, kt((i = {}, i[r] = "+=0.1", i.paused = !0, i.stagger = 0, i), t || {})), s = function(u, l, f) {
      return n.resetTo(r, u, l, f);
    };
    return s.tween = n, s;
  },
  isTweening: function(e) {
    return fe.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Ur(e.ease, Ki.ease)), ao(Ki, e || {});
  },
  config: function(e) {
    return ao(St, e || {});
  },
  registerEffect: function(e) {
    var r = e.name, t = e.effect, i = e.plugins, n = e.defaults, s = e.extendTimeline;
    (i || "").split(",").forEach(function(o) {
      return o && !yt[o] && !Ct[o] && Zi(r + " effect requires " + o + " plugin.");
    }), Kn[r] = function(o, u, l) {
      return t(Rt(o), kt(u || {}, n), l);
    }, s && (at.prototype[r] = function(o, u, l) {
      return this.add(Kn[r](o, Zt(u) ? u : (l = u) && {}, this), l);
    });
  },
  registerEase: function(e, r) {
    G[e] = Ur(r);
  },
  parseEase: function(e, r) {
    return arguments.length ? Ur(e, r) : G;
  },
  getById: function(e) {
    return fe.getById(e);
  },
  exportRoot: function(e, r) {
    e === void 0 && (e = {});
    var t = new at(e), i, n;
    for (t.smoothChildTiming = ut(e.smoothChildTiming), fe.remove(t), t._dp = 0, t._time = t._tTime = fe._time, i = fe._first; i; )
      n = i._next, (r || !(!i._dur && i instanceof Se && i.vars.onComplete === i._targets[0])) && $t(t, i, i._start - i._delay), i = n;
    return $t(fe, t, 0), t;
  },
  context: function(e, r) {
    return e ? new ka(e, r) : ae;
  },
  matchMedia: function(e) {
    return new rl(e);
  },
  matchMediaRefresh: function() {
    return Wr.forEach(function(e) {
      var r = e.conditions, t, i;
      for (i in r)
        r[i] && (r[i] = !1, t = 1);
      t && e.revert();
    }) || ms();
  },
  addEventListener: function(e, r) {
    var t = Cn[e] || (Cn[e] = []);
    ~t.indexOf(r) || t.push(r);
  },
  removeEventListener: function(e, r) {
    var t = Cn[e], i = t && t.indexOf(r);
    i >= 0 && t.splice(i, 1);
  },
  utils: {
    wrap: Au,
    wrapYoyo: zu,
    distribute: aa,
    random: la,
    snap: ua,
    normalize: Ru,
    getUnit: $e,
    clamp: Mu,
    splitColor: _a,
    toArray: Rt,
    selector: _s,
    mapRange: ca,
    pipe: Eu,
    unitize: Du,
    interpolate: Fu,
    shuffle: oa
  },
  install: Ho,
  effects: Kn,
  ticker: xt,
  updateRoot: at.updateRoot,
  plugins: yt,
  globalTimeline: fe,
  core: {
    PropTween: ft,
    globals: Ko,
    Tween: Se,
    Timeline: at,
    Animation: en,
    getCache: Nr,
    _removeLinkedListItem: Un,
    reverting: function() {
      return Ye;
    },
    context: function(e) {
      return e && ae && (ae.data.push(e), e._ctx = ae), ae;
    },
    suppressOverwrites: function(e) {
      return Rs = e;
    }
  }
};
lt("to,from,fromTo,delayedCall,set,killTweensOf", function(a) {
  return Ln[a] = Se[a];
});
xt.add(at.updateRoot);
ui = Ln.to({}, {
  duration: 0
});
var il = function(e, r) {
  for (var t = e._pt; t && t.p !== r && t.op !== r && t.fp !== r; )
    t = t._next;
  return t;
}, nl = function(e, r) {
  var t = e._targets, i, n, s;
  for (i in r)
    for (n = t.length; n--; )
      s = e._ptLookup[n][i], s && (s = s.d) && (s._pt && (s = il(s, i)), s && s.modifier && s.modifier(r[i], e, t[n], i));
}, es = function(e, r) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, n, s) {
      s._onInit = function(o) {
        var u, l;
        if (Ae(n) && (u = {}, lt(n, function(f) {
          return u[f] = 1;
        }), n = u), r) {
          u = {};
          for (l in n)
            u[l] = r(n[l]);
          n = u;
        }
        nl(o, n);
      };
    }
  };
}, ht = Ln.registerPlugin({
  name: "attr",
  init: function(e, r, t, i, n) {
    var s, o, u;
    this.tween = t;
    for (s in r)
      u = e.getAttribute(s) || "", o = this.add(e, "setAttribute", (u || 0) + "", r[s], i, n, 0, 0, s), o.op = s, o.b = u, this._props.push(s);
  },
  render: function(e, r) {
    for (var t = r._pt; t; )
      Ye ? t.set(t.t, t.p, t.b, t) : t.r(e, t.d), t = t._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, r) {
    for (var t = r.length; t--; )
      this.add(e, t, e[t] || 0, r[t], 0, 0, 0, 0, 0, 1);
  }
}, es("roundProps", ps), es("modifiers"), es("snap", ua)) || Ln;
Se.version = at.version = ht.version = "3.15.0";
Go = 1;
zs() && xi();
G.Power0;
G.Power1;
G.Power2;
G.Power3;
G.Power4;
G.Linear;
G.Quad;
G.Cubic;
G.Quart;
G.Quint;
G.Strong;
G.Elastic;
G.Back;
G.SteppedEase;
G.Bounce;
G.Sine;
G.Expo;
G.Circ;
/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var _o, mr, ci, $s, Xr, po, Gs, sl = function() {
  return typeof window < "u";
}, ur = {}, Lr = 180 / Math.PI, hi = Math.PI / 180, ti = Math.atan2, go = 1e8, Hs = /([A-Z])/g, ol = /(left|right|width|margin|padding|x)/i, al = /[\s,\(]\S/, Gt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ys = function(e, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
}, ul = function(e, r) {
  return r.set(r.t, r.p, e === 1 ? r.e : Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
}, ll = function(e, r) {
  return r.set(r.t, r.p, e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b, r);
}, fl = function(e, r) {
  return r.set(r.t, r.p, e === 1 ? r.e : e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b, r);
}, cl = function(e, r) {
  var t = r.s + r.c * e;
  r.set(r.t, r.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + r.u, r);
}, Pa = function(e, r) {
  return r.set(r.t, r.p, e ? r.e : r.b, r);
}, Ma = function(e, r) {
  return r.set(r.t, r.p, e !== 1 ? r.b : r.e, r);
}, hl = function(e, r, t) {
  return e.style[r] = t;
}, dl = function(e, r, t) {
  return e.style.setProperty(r, t);
}, _l = function(e, r, t) {
  return e._gsap[r] = t;
}, pl = function(e, r, t) {
  return e._gsap.scaleX = e._gsap.scaleY = t;
}, gl = function(e, r, t, i, n) {
  var s = e._gsap;
  s.scaleX = s.scaleY = t, s.renderTransform(n, s);
}, ml = function(e, r, t, i, n) {
  var s = e._gsap;
  s[r] = t, s.renderTransform(n, s);
}, ce = "transform", ct = ce + "Origin", yl = function a(e, r) {
  var t = this, i = this.target, n = i.style, s = i._gsap;
  if (e in ur && n) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Gt[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(o) {
        return t.tfm[o] = ir(i, o);
      }) : this.tfm[e] = s.x ? s[e] : ir(i, e), e === ct && (this.tfm.zOrigin = s.zOrigin);
    else
      return Gt.transform.split(",").forEach(function(o) {
        return a.call(t, o, r);
      });
    if (this.props.indexOf(ce) >= 0)
      return;
    s.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(ct, r, "")), e = ce;
  }
  (n || r) && this.props.push(e, r, n[e]);
}, Oa = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, vl = function() {
  var e = this.props, r = this.target, t = r.style, i = r._gsap, n, s;
  for (n = 0; n < e.length; n += 3)
    e[n + 1] ? e[n + 1] === 2 ? r[e[n]](e[n + 2]) : r[e[n]] = e[n + 2] : e[n + 2] ? t[e[n]] = e[n + 2] : t.removeProperty(e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(Hs, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      i[s] = this.tfm[s];
    i.svg && (i.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), n = Gs(), (!n || !n.isStart) && !t[ce] && (Oa(t), i.zOrigin && t[ct] && (t[ct] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, Ea = function(e, r) {
  var t = {
    target: e,
    props: [],
    revert: vl,
    save: yl
  };
  return e._gsap || ht.core.getCache(e), r && e.style && e.nodeType && r.split(",").forEach(function(i) {
    return t.save(i);
  }), t;
}, Da, vs = function(e, r) {
  var t = mr.createElementNS ? mr.createElementNS((r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : mr.createElement(e);
  return t && t.style ? t : mr.createElement(e);
}, Tt = function a(e, r, t) {
  var i = getComputedStyle(e);
  return i[r] || i.getPropertyValue(r.replace(Hs, "-$1").toLowerCase()) || i.getPropertyValue(r) || !t && a(e, wi(r) || r, 1) || "";
}, mo = "O,Moz,ms,Ms,Webkit".split(","), wi = function(e, r, t) {
  var i = r || Xr, n = i.style, s = 5;
  if (e in n && !t)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(mo[s] + e in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? mo[s] : "") + e;
}, xs = function() {
  sl() && window.document && (_o = window, mr = _o.document, ci = mr.documentElement, Xr = vs("div") || {
    style: {}
  }, vs("div"), ce = wi(ce), ct = ce + "Origin", Xr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Da = !!wi("perspective"), Gs = ht.core.reverting, $s = 1);
}, yo = function(e) {
  var r = e.ownerSVGElement, t = vs("svg", r && r.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = e.cloneNode(!0), n;
  i.style.display = "block", t.appendChild(i), ci.appendChild(t);
  try {
    n = i.getBBox();
  } catch {
  }
  return t.removeChild(i), ci.removeChild(t), n;
}, vo = function(e, r) {
  for (var t = r.length; t--; )
    if (e.hasAttribute(r[t]))
      return e.getAttribute(r[t]);
}, Ra = function(e) {
  var r, t;
  try {
    r = e.getBBox();
  } catch {
    r = yo(e), t = 1;
  }
  return r && (r.width || r.height) || t || (r = yo(e)), r && !r.width && !r.x && !r.y ? {
    x: +vo(e, ["x", "cx", "x1"]) || 0,
    y: +vo(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : r;
}, Aa = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Ra(e));
}, Cr = function(e, r) {
  if (r) {
    var t = e.style, i;
    r in ur && r !== ct && (r = ce), t.removeProperty ? (i = r.substr(0, 2), (i === "ms" || r.substr(0, 6) === "webkit") && (r = "-" + r), t.removeProperty(i === "--" ? r : r.replace(Hs, "-$1").toLowerCase())) : t.removeAttribute(r);
  }
}, yr = function(e, r, t, i, n, s) {
  var o = new ft(e._pt, r, t, 0, 1, s ? Ma : Pa);
  return e._pt = o, o.b = i, o.e = n, e._props.push(t), o;
}, xo = {
  deg: 1,
  rad: 1,
  turn: 1
}, xl = {
  grid: 1,
  flex: 1
}, kr = function a(e, r, t, i) {
  var n = parseFloat(t) || 0, s = (t + "").trim().substr((n + "").length) || "px", o = Xr.style, u = ol.test(r), l = e.tagName.toLowerCase() === "svg", f = (l ? "client" : "offset") + (u ? "Width" : "Height"), d = 100, _ = i === "px", c = i === "%", g, h, p, v;
  if (i === s || !n || xo[i] || xo[s])
    return n;
  if (s !== "px" && !_ && (n = a(e, r, t, "px")), v = e.getCTM && Aa(e), (c || s === "%") && (ur[r] || ~r.indexOf("adius")))
    return g = v ? e.getBBox()[u ? "width" : "height"] : e[f], ve(c ? n / g * d : n / 100 * g);
  if (o[u ? "width" : "height"] = d + (_ ? s : i), h = i !== "rem" && ~r.indexOf("adius") || i === "em" && e.appendChild && !l ? e : e.parentNode, v && (h = (e.ownerSVGElement || {}).parentNode), (!h || h === mr || !h.appendChild) && (h = mr.body), p = h._gsap, p && c && p.width && u && p.time === xt.time && !p.uncache)
    return ve(n / p.width * d);
  if (c && (r === "height" || r === "width")) {
    var b = e.style[r];
    e.style[r] = d + i, g = e[f], b ? e.style[r] = b : Cr(e, r);
  } else
    (c || s === "%") && !xl[Tt(h, "display")] && (o.position = Tt(e, "position")), h === e && (o.position = "static"), h.appendChild(Xr), g = Xr[f], h.removeChild(Xr), o.position = "absolute";
  return u && c && (p = Nr(h), p.time = xt.time, p.width = h[f]), ve(_ ? g * n / d : g && n ? d / g * n : 0);
}, ir = function(e, r, t, i) {
  var n;
  return $s || xs(), r in Gt && r !== "transform" && (r = Gt[r], ~r.indexOf(",") && (r = r.split(",")[0])), ur[r] && r !== "transform" ? (n = rn(e, i), n = r !== "transformOrigin" ? n[r] : n.svg ? n.origin : Yn(Tt(e, ct)) + " " + n.zOrigin + "px") : (n = e.style[r], (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) && (n = In[r] && In[r](e, r, t) || Tt(e, r) || Qo(e, r) || (r === "opacity" ? 1 : 0))), t && !~(n + "").trim().indexOf(" ") ? kr(e, r, n, t) + t : n;
}, wl = function(e, r, t, i) {
  if (!t || t === "none") {
    var n = wi(r, e, 1), s = n && Tt(e, n, 1);
    s && s !== t ? (r = n, t = s) : r === "borderColor" && (t = Tt(e, "borderTopColor"));
  }
  var o = new ft(this._pt, e.style, r, 0, 1, Sa), u = 0, l = 0, f, d, _, c, g, h, p, v, b, S, w, T;
  if (o.b = t, o.e = i, t += "", i += "", i.substring(0, 6) === "var(--" && (i = Tt(e, i.substring(4, i.indexOf(")")))), i === "auto" && (h = e.style[r], e.style[r] = i, i = Tt(e, r) || i, h ? e.style[r] = h : Cr(e, r)), f = [t, i], ga(f), t = f[0], i = f[1], _ = t.match(ai) || [], T = i.match(ai) || [], T.length) {
    for (; d = ai.exec(i); )
      p = d[0], b = i.substring(u, d.index), g ? g = (g + 1) % 5 : (b.substr(-5) === "rgba(" || b.substr(-5) === "hsla(") && (g = 1), p !== (h = _[l++] || "") && (c = parseFloat(h) || 0, w = h.substr((c + "").length), p.charAt(1) === "=" && (p = fi(c, p) + w), v = parseFloat(p), S = p.substr((v + "").length), u = ai.lastIndex - S.length, S || (S = S || St.units[r] || w, u === i.length && (i += S, o.e += S)), w !== S && (c = kr(e, r, h, S) || 0), o._pt = {
        _next: o._pt,
        p: b || l === 1 ? b : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: c,
        c: v - c,
        m: g && g < 4 || r === "zIndex" ? Math.round : 0
      });
    o.c = u < i.length ? i.substring(u, i.length) : "";
  } else
    o.r = r === "display" && i === "none" ? Ma : Pa;
  return $o.test(i) && (o.e = 0), this._pt = o, o;
}, wo = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, bl = function(e) {
  var r = e.split(" "), t = r[0], i = r[1] || "50%";
  return (t === "top" || t === "bottom" || i === "left" || i === "right") && (e = t, t = i, i = e), r[0] = wo[t] || t, r[1] = wo[i] || i, r.join(" ");
}, Tl = function(e, r) {
  if (r.tween && r.tween._time === r.tween._dur) {
    var t = r.t, i = t.style, n = r.u, s = t._gsap, o, u, l;
    if (n === "all" || n === !0)
      i.cssText = "", u = 1;
    else
      for (n = n.split(","), l = n.length; --l > -1; )
        o = n[l], ur[o] && (u = 1, o = o === "transformOrigin" ? ct : ce), Cr(t, o);
    u && (Cr(t, ce), s && (s.svg && t.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", rn(t, 1), s.uncache = 1, Oa(i)));
  }
}, In = {
  clearProps: function(e, r, t, i, n) {
    if (n.data !== "isFromStart") {
      var s = e._pt = new ft(e._pt, r, t, 0, 0, Tl);
      return s.u = i, s.pr = -10, s.tween = n, e._props.push(t), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, tn = [1, 0, 0, 1, 0, 0], za = {}, Fa = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, bo = function(e) {
  var r = Tt(e, ce);
  return Fa(r) ? tn : r.substr(7).match(qo).map(ve);
}, Ks = function(e, r) {
  var t = e._gsap || Nr(e), i = e.style, n = bo(e), s, o, u, l;
  return t.svg && e.getAttribute("transform") ? (u = e.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? tn : n) : (n === tn && !e.offsetParent && e !== ci && !t.svg && (u = i.display, i.display = "block", s = e.parentNode, (!s || !e.offsetParent && !e.getBoundingClientRect().width) && (l = 1, o = e.nextElementSibling, ci.appendChild(e)), n = bo(e), u ? i.display = u : Cr(e, "display"), l && (o ? s.insertBefore(e, o) : s ? s.appendChild(e) : ci.removeChild(e))), r && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ws = function(e, r, t, i, n, s) {
  var o = e._gsap, u = n || Ks(e, !0), l = o.xOrigin || 0, f = o.yOrigin || 0, d = o.xOffset || 0, _ = o.yOffset || 0, c = u[0], g = u[1], h = u[2], p = u[3], v = u[4], b = u[5], S = r.split(" "), w = parseFloat(S[0]) || 0, T = parseFloat(S[1]) || 0, M, x, P, k;
  t ? u !== tn && (x = c * p - g * h) && (P = w * (p / x) + T * (-h / x) + (h * b - p * v) / x, k = w * (-g / x) + T * (c / x) - (c * b - g * v) / x, w = P, T = k) : (M = Ra(e), w = M.x + (~S[0].indexOf("%") ? w / 100 * M.width : w), T = M.y + (~(S[1] || S[0]).indexOf("%") ? T / 100 * M.height : T)), i || i !== !1 && o.smooth ? (v = w - l, b = T - f, o.xOffset = d + (v * c + b * h) - v, o.yOffset = _ + (v * g + b * p) - b) : o.xOffset = o.yOffset = 0, o.xOrigin = w, o.yOrigin = T, o.smooth = !!i, o.origin = r, o.originIsAbsolute = !!t, e.style[ct] = "0px 0px", s && (yr(s, o, "xOrigin", l, w), yr(s, o, "yOrigin", f, T), yr(s, o, "xOffset", d, o.xOffset), yr(s, o, "yOffset", _, o.yOffset)), e.setAttribute("data-svg-origin", w + " " + T);
}, rn = function(e, r) {
  var t = e._gsap || new ya(e);
  if ("x" in t && !r && !t.uncache)
    return t;
  var i = e.style, n = t.scaleX < 0, s = "px", o = "deg", u = getComputedStyle(e), l = Tt(e, ct) || "0", f, d, _, c, g, h, p, v, b, S, w, T, M, x, P, k, C, B, E, H, I, K, q, A, Z, te, m, se, Ke, zt, he, ze;
  return f = d = _ = h = p = v = b = S = w = 0, c = g = 1, t.svg = !!(e.getCTM && Aa(e)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (i[ce] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[ce] !== "none" ? u[ce] : "")), i.scale = i.rotate = i.translate = "none"), x = Ks(e, t.svg), t.svg && (t.uncache ? (Z = e.getBBox(), l = t.xOrigin - Z.x + "px " + (t.yOrigin - Z.y) + "px", A = "") : A = !r && e.getAttribute("data-svg-origin"), ws(e, A || l, !!A || t.originIsAbsolute, t.smooth !== !1, x)), T = t.xOrigin || 0, M = t.yOrigin || 0, x !== tn && (B = x[0], E = x[1], H = x[2], I = x[3], f = K = x[4], d = q = x[5], x.length === 6 ? (c = Math.sqrt(B * B + E * E), g = Math.sqrt(I * I + H * H), h = B || E ? ti(E, B) * Lr : 0, b = H || I ? ti(H, I) * Lr + h : 0, b && (g *= Math.abs(Math.cos(b * hi))), t.svg && (f -= T - (T * B + M * H), d -= M - (T * E + M * I))) : (ze = x[6], zt = x[7], m = x[8], se = x[9], Ke = x[10], he = x[11], f = x[12], d = x[13], _ = x[14], P = ti(ze, Ke), p = P * Lr, P && (k = Math.cos(-P), C = Math.sin(-P), A = K * k + m * C, Z = q * k + se * C, te = ze * k + Ke * C, m = K * -C + m * k, se = q * -C + se * k, Ke = ze * -C + Ke * k, he = zt * -C + he * k, K = A, q = Z, ze = te), P = ti(-H, Ke), v = P * Lr, P && (k = Math.cos(-P), C = Math.sin(-P), A = B * k - m * C, Z = E * k - se * C, te = H * k - Ke * C, he = I * C + he * k, B = A, E = Z, H = te), P = ti(E, B), h = P * Lr, P && (k = Math.cos(P), C = Math.sin(P), A = B * k + E * C, Z = K * k + q * C, E = E * k - B * C, q = q * k - K * C, B = A, K = Z), p && Math.abs(p) + Math.abs(h) > 359.9 && (p = h = 0, v = 180 - v), c = ve(Math.sqrt(B * B + E * E + H * H)), g = ve(Math.sqrt(q * q + ze * ze)), P = ti(K, q), b = Math.abs(P) > 2e-4 ? P * Lr : 0, w = he ? 1 / (he < 0 ? -he : he) : 0), t.svg && (A = e.getAttribute("transform"), t.forceCSS = e.setAttribute("transform", "") || !Fa(Tt(e, ce)), A && e.setAttribute("transform", A))), Math.abs(b) > 90 && Math.abs(b) < 270 && (n ? (c *= -1, b += h <= 0 ? 180 : -180, h += h <= 0 ? 180 : -180) : (g *= -1, b += b <= 0 ? 180 : -180)), r = r || t.uncache, t.x = f - ((t.xPercent = f && (!r && t.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetWidth * t.xPercent / 100 : 0) + s, t.y = d - ((t.yPercent = d && (!r && t.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * t.yPercent / 100 : 0) + s, t.z = _ + s, t.scaleX = ve(c), t.scaleY = ve(g), t.rotation = ve(h) + o, t.rotationX = ve(p) + o, t.rotationY = ve(v) + o, t.skewX = b + o, t.skewY = S + o, t.transformPerspective = w + s, (t.zOrigin = parseFloat(l.split(" ")[2]) || !r && t.zOrigin || 0) && (i[ct] = Yn(l)), t.xOffset = t.yOffset = 0, t.force3D = St.force3D, t.renderTransform = t.svg ? Cl : Da ? La : Sl, t.uncache = 0, t;
}, Yn = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, ts = function(e, r, t) {
  var i = $e(r);
  return ve(parseFloat(r) + parseFloat(kr(e, "x", t + "px", i))) + i;
}, Sl = function(e, r) {
  r.z = "0px", r.rotationY = r.rotationX = "0deg", r.force3D = 0, La(e, r);
}, zr = "0deg", Pi = "0px", Fr = ") ", La = function(e, r) {
  var t = r || this, i = t.xPercent, n = t.yPercent, s = t.x, o = t.y, u = t.z, l = t.rotation, f = t.rotationY, d = t.rotationX, _ = t.skewX, c = t.skewY, g = t.scaleX, h = t.scaleY, p = t.transformPerspective, v = t.force3D, b = t.target, S = t.zOrigin, w = "", T = v === "auto" && e && e !== 1 || v === !0;
  if (S && (d !== zr || f !== zr)) {
    var M = parseFloat(f) * hi, x = Math.sin(M), P = Math.cos(M), k;
    M = parseFloat(d) * hi, k = Math.cos(M), s = ts(b, s, x * k * -S), o = ts(b, o, -Math.sin(M) * -S), u = ts(b, u, P * k * -S + S);
  }
  p !== Pi && (w += "perspective(" + p + Fr), (i || n) && (w += "translate(" + i + "%, " + n + "%) "), (T || s !== Pi || o !== Pi || u !== Pi) && (w += u !== Pi || T ? "translate3d(" + s + ", " + o + ", " + u + ") " : "translate(" + s + ", " + o + Fr), l !== zr && (w += "rotate(" + l + Fr), f !== zr && (w += "rotateY(" + f + Fr), d !== zr && (w += "rotateX(" + d + Fr), (_ !== zr || c !== zr) && (w += "skew(" + _ + ", " + c + Fr), (g !== 1 || h !== 1) && (w += "scale(" + g + ", " + h + Fr), b.style[ce] = w || "translate(0, 0)";
}, Cl = function(e, r) {
  var t = r || this, i = t.xPercent, n = t.yPercent, s = t.x, o = t.y, u = t.rotation, l = t.skewX, f = t.skewY, d = t.scaleX, _ = t.scaleY, c = t.target, g = t.xOrigin, h = t.yOrigin, p = t.xOffset, v = t.yOffset, b = t.forceCSS, S = parseFloat(s), w = parseFloat(o), T, M, x, P, k;
  u = parseFloat(u), l = parseFloat(l), f = parseFloat(f), f && (f = parseFloat(f), l += f, u += f), u || l ? (u *= hi, l *= hi, T = Math.cos(u) * d, M = Math.sin(u) * d, x = Math.sin(u - l) * -_, P = Math.cos(u - l) * _, l && (f *= hi, k = Math.tan(l - f), k = Math.sqrt(1 + k * k), x *= k, P *= k, f && (k = Math.tan(f), k = Math.sqrt(1 + k * k), T *= k, M *= k)), T = ve(T), M = ve(M), x = ve(x), P = ve(P)) : (T = d, P = _, M = x = 0), (S && !~(s + "").indexOf("px") || w && !~(o + "").indexOf("px")) && (S = kr(c, "x", s, "px"), w = kr(c, "y", o, "px")), (g || h || p || v) && (S = ve(S + g - (g * T + h * x) + p), w = ve(w + h - (g * M + h * P) + v)), (i || n) && (k = c.getBBox(), S = ve(S + i / 100 * k.width), w = ve(w + n / 100 * k.height)), k = "matrix(" + T + "," + M + "," + x + "," + P + "," + S + "," + w + ")", c.setAttribute("transform", k), b && (c.style[ce] = k);
}, kl = function(e, r, t, i, n) {
  var s = 360, o = Ae(n), u = parseFloat(n) * (o && ~n.indexOf("rad") ? Lr : 1), l = u - i, f = i + l + "deg", d, _;
  return o && (d = n.split("_")[1], d === "short" && (l %= s, l !== l % (s / 2) && (l += l < 0 ? s : -s)), d === "cw" && l < 0 ? l = (l + s * go) % s - ~~(l / s) * s : d === "ccw" && l > 0 && (l = (l - s * go) % s - ~~(l / s) * s)), e._pt = _ = new ft(e._pt, r, t, i, l, ul), _.e = f, _.u = "deg", e._props.push(t), _;
}, To = function(e, r) {
  for (var t in r)
    e[t] = r[t];
  return e;
}, Pl = function(e, r, t) {
  var i = To({}, t._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = t.style, o, u, l, f, d, _, c, g;
  i.svg ? (l = t.getAttribute("transform"), t.setAttribute("transform", ""), s[ce] = r, o = rn(t, 1), Cr(t, ce), t.setAttribute("transform", l)) : (l = getComputedStyle(t)[ce], s[ce] = r, o = rn(t, 1), s[ce] = l);
  for (u in ur)
    l = i[u], f = o[u], l !== f && n.indexOf(u) < 0 && (c = $e(l), g = $e(f), d = c !== g ? kr(t, u, l, g) : parseFloat(l), _ = parseFloat(f), e._pt = new ft(e._pt, o, u, d, _ - d, ys), e._pt.u = g || 0, e._props.push(u));
  To(o, i);
};
lt("padding,margin,Width,Radius", function(a, e) {
  var r = "Top", t = "Right", i = "Bottom", n = "Left", s = (e < 3 ? [r, t, i, n] : [r + n, r + t, i + t, i + n]).map(function(o) {
    return e < 2 ? a + o : "border" + o + a;
  });
  In[e > 1 ? "border" + a : a] = function(o, u, l, f, d) {
    var _, c;
    if (arguments.length < 4)
      return _ = s.map(function(g) {
        return ir(o, g, l);
      }), c = _.join(" "), c.split(_[0]).length === 5 ? _[0] : c;
    _ = (f + "").split(" "), c = {}, s.forEach(function(g, h) {
      return c[g] = _[h] = _[h] || _[(h - 1) / 2 | 0];
    }), o.init(u, c, d);
  };
});
var Ia = {
  name: "css",
  register: xs,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, r, t, i, n) {
    var s = this._props, o = e.style, u = t.vars.startAt, l, f, d, _, c, g, h, p, v, b, S, w, T, M, x, P, k;
    $s || xs(), this.styles = this.styles || Ea(e), P = this.styles.props, this.tween = t;
    for (h in r)
      if (h !== "autoRound" && (f = r[h], !(yt[h] && va(h, r, t, i, e, n)))) {
        if (c = typeof f, g = In[h], c === "function" && (f = f.call(t, i, e, n), c = typeof f), c === "string" && ~f.indexOf("random(") && (f = Ji(f)), g)
          g(this, e, h, f, t) && (x = 1);
        else if (h.substr(0, 2) === "--")
          l = (getComputedStyle(e).getPropertyValue(h) + "").trim(), f += "", br.lastIndex = 0, br.test(l) || (p = $e(l), v = $e(f), v ? p !== v && (l = kr(e, h, l, v) + v) : p && (f += p)), this.add(o, "setProperty", l, f, i, n, 0, 0, h), s.push(h), P.push(h, 0, o[h]);
        else if (c !== "undefined") {
          if (u && h in u ? (l = typeof u[h] == "function" ? u[h].call(t, i, e, n) : u[h], Ae(l) && ~l.indexOf("random(") && (l = Ji(l)), $e(l + "") || l === "auto" || (l += St.units[h] || $e(ir(e, h)) || ""), (l + "").charAt(1) === "=" && (l = ir(e, h))) : l = ir(e, h), _ = parseFloat(l), b = c === "string" && f.charAt(1) === "=" && f.substr(0, 2), b && (f = f.substr(2)), d = parseFloat(f), h in Gt && (h === "autoAlpha" && (_ === 1 && ir(e, "visibility") === "hidden" && d && (_ = 0), P.push("visibility", 0, o.visibility), yr(this, o, "visibility", _ ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), h !== "scale" && h !== "transform" && (h = Gt[h], ~h.indexOf(",") && (h = h.split(",")[0]))), S = h in ur, S) {
            if (this.styles.save(h), k = f, c === "string" && f.substring(0, 6) === "var(--") {
              if (f = Tt(e, f.substring(4, f.indexOf(")"))), f.substring(0, 5) === "calc(") {
                var C = e.style.perspective;
                e.style.perspective = f, f = Tt(e, "perspective"), C ? e.style.perspective = C : Cr(e, "perspective");
              }
              d = parseFloat(f);
            }
            if (w || (T = e._gsap, T.renderTransform && !r.parseTransform || rn(e, r.parseTransform), M = r.smoothOrigin !== !1 && T.smooth, w = this._pt = new ft(this._pt, o, ce, 0, 1, T.renderTransform, T, 0, -1), w.dep = 1), h === "scale")
              this._pt = new ft(this._pt, T, "scaleY", T.scaleY, (b ? fi(T.scaleY, b + d) : d) - T.scaleY || 0, ys), this._pt.u = 0, s.push("scaleY", h), h += "X";
            else if (h === "transformOrigin") {
              P.push(ct, 0, o[ct]), f = bl(f), T.svg ? ws(e, f, 0, M, 0, this) : (v = parseFloat(f.split(" ")[2]) || 0, v !== T.zOrigin && yr(this, T, "zOrigin", T.zOrigin, v), yr(this, o, h, Yn(l), Yn(f)));
              continue;
            } else if (h === "svgOrigin") {
              ws(e, f, 1, M, 0, this);
              continue;
            } else if (h in za) {
              kl(this, T, h, _, b ? fi(_, b + f) : f);
              continue;
            } else if (h === "smoothOrigin") {
              yr(this, T, "smooth", T.smooth, f);
              continue;
            } else if (h === "force3D") {
              T[h] = f;
              continue;
            } else if (h === "transform") {
              Pl(this, f, e);
              continue;
            }
          } else h in o || (h = wi(h) || h);
          if (S || (d || d === 0) && (_ || _ === 0) && !al.test(f) && h in o)
            p = (l + "").substr((_ + "").length), d || (d = 0), v = $e(f) || (h in St.units ? St.units[h] : p), p !== v && (_ = kr(e, h, l, v)), this._pt = new ft(this._pt, S ? T : o, h, _, (b ? fi(_, b + d) : d) - _, !S && (v === "px" || h === "zIndex") && r.autoRound !== !1 ? cl : ys), this._pt.u = v || 0, S && k !== f ? (this._pt.b = l, this._pt.e = k, this._pt.r = fl) : p !== v && v !== "%" && (this._pt.b = l, this._pt.r = ll);
          else if (h in o)
            wl.call(this, e, h, l, b ? b + f : f);
          else if (h in e)
            this.add(e, h, l || e[h], b ? b + f : f, i, n);
          else if (h !== "parseTransform") {
            Ls(h, f);
            continue;
          }
          S || (h in o ? P.push(h, 0, o[h]) : typeof e[h] == "function" ? P.push(h, 2, e[h]()) : P.push(h, 1, l || e[h])), s.push(h);
        }
      }
    x && Ca(this);
  },
  render: function(e, r) {
    if (r.tween._time || !Gs())
      for (var t = r._pt; t; )
        t.r(e, t.d), t = t._next;
    else
      r.styles.revert();
  },
  get: ir,
  aliases: Gt,
  getSetter: function(e, r, t) {
    var i = Gt[r];
    return i && i.indexOf(",") < 0 && (r = i), r in ur && r !== ct && (e._gsap.x || ir(e, "x")) ? t && po === t ? r === "scale" ? pl : _l : (po = t || {}) && (r === "scale" ? gl : ml) : e.style && !As(e.style[r]) ? hl : ~r.indexOf("-") ? dl : Ws(e, r);
  },
  core: {
    _removeProperty: Cr,
    _getMatrix: Ks
  }
};
ht.utils.checkPrefix = wi;
ht.core.getStyleSaver = Ea;
(function(a, e, r, t) {
  var i = lt(a + "," + e + "," + r, function(n) {
    ur[n] = 1;
  });
  lt(e, function(n) {
    St.units[n] = "deg", za[n] = 1;
  }), Gt[i[13]] = a + "," + e, lt(t, function(n) {
    var s = n.split(":");
    Gt[s[1]] = i[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
lt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a) {
  St.units[a] = "px";
});
ht.registerPlugin(Ia);
var Ce = ht.registerPlugin(Ia) || ht;
Ce.core.Tween;
function Ml(a, e) {
  for (var r = 0; r < e.length; r++) {
    var t = e[r];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(a, t.key, t);
  }
}
function Ol(a, e, r) {
  return e && Ml(a.prototype, e), a;
}
/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ie, kn, wt, vr, xr, di, Ya, Ir, _i, Xa, sr, Bt, Ba, Na = function() {
  return Ie || typeof window < "u" && (Ie = window.gsap) && Ie.registerPlugin && Ie;
}, Va = 1, li = [], U = [], Kt = [], Bi = Date.now, bs = function(e, r) {
  return r;
}, El = function() {
  var e = _i.core, r = e.bridge || {}, t = e._scrollers, i = e._proxies;
  t.push.apply(t, U), i.push.apply(i, Kt), U = t, Kt = i, bs = function(s, o) {
    return r[s](o);
  };
}, Tr = function(e, r) {
  return ~Kt.indexOf(e) && Kt[Kt.indexOf(e) + 1][r];
}, Ni = function(e) {
  return !!~Xa.indexOf(e);
}, et = function(e, r, t, i, n) {
  return e.addEventListener(r, t, {
    passive: i !== !1,
    capture: !!n
  });
}, je = function(e, r, t, i) {
  return e.removeEventListener(r, t, !!i);
}, cn = "scrollLeft", hn = "scrollTop", Ts = function() {
  return sr && sr.isPressed || U.cache++;
}, Xn = function(e, r) {
  var t = function i(n) {
    if (n || n === 0) {
      Va && (wt.history.scrollRestoration = "manual");
      var s = sr && sr.isPressed;
      n = i.v = Math.round(n) || (sr && sr.iOS ? 1 : 0), e(n), i.cacheID = U.cache, s && bs("ss", n);
    } else (r || U.cache !== i.cacheID || bs("ref")) && (i.cacheID = U.cache, i.v = e());
    return i.v + i.offset;
  };
  return t.offset = 0, e && t;
}, nt = {
  s: cn,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Xn(function(a) {
    return arguments.length ? wt.scrollTo(a, Me.sc()) : wt.pageXOffset || vr[cn] || xr[cn] || di[cn] || 0;
  })
}, Me = {
  s: hn,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: nt,
  sc: Xn(function(a) {
    return arguments.length ? wt.scrollTo(nt.sc(), a) : wt.pageYOffset || vr[hn] || xr[hn] || di[hn] || 0;
  })
}, ot = function(e, r) {
  return (r && r._ctx && r._ctx.selector || Ie.utils.toArray)(e)[0] || (typeof e == "string" && Ie.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Dl = function(e, r) {
  for (var t = r.length; t--; )
    if (r[t] === e || r[t].contains(e))
      return !0;
  return !1;
}, Pr = function(e, r) {
  var t = r.s, i = r.sc;
  Ni(e) && (e = vr.scrollingElement || xr);
  var n = U.indexOf(e), s = i === Me.sc ? 1 : 2;
  !~n && (n = U.push(e) - 1), U[n + s] || et(e, "scroll", Ts);
  var o = U[n + s], u = o || (U[n + s] = Xn(Tr(e, t), !0) || (Ni(e) ? i : Xn(function(l) {
    return arguments.length ? e[t] = l : e[t];
  })));
  return u.target = e, o || (u.smooth = Ie.getProperty(e, "scrollBehavior") === "smooth"), u;
}, Ss = function(e, r, t) {
  var i = e, n = e, s = Bi(), o = s, u = r || 50, l = Math.max(500, u * 3), f = function(g, h) {
    var p = Bi();
    h || p - s > u ? (n = i, i = g, o = s, s = p) : t ? i += g : i = n + (g - n) / (p - o) * (s - o);
  }, d = function() {
    n = i = t ? 0 : i, o = s = 0;
  }, _ = function(g) {
    var h = o, p = n, v = Bi();
    return (g || g === 0) && g !== i && f(g), s === o || v - o > l ? 0 : (i + (t ? p : -p)) / ((t ? v : s) - h) * 1e3;
  };
  return {
    update: f,
    reset: d,
    getVelocity: _
  };
}, Mi = function(e, r) {
  return r && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, So = function(e) {
  var r = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(r) >= Math.abs(t) ? r : t;
}, Ua = function() {
  _i = Ie.core.globals().ScrollTrigger, _i && _i.core && El();
}, Wa = function(e) {
  return Ie = e || Na(), !kn && Ie && typeof document < "u" && document.body && (wt = window, vr = document, xr = vr.documentElement, di = vr.body, Xa = [wt, vr, xr, di], Ie.utils.clamp, Ba = Ie.core.context || function() {
  }, Ir = "onpointerenter" in di ? "pointer" : "mouse", Ya = xe.isTouch = wt.matchMedia && wt.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in wt || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Bt = xe.eventTypes = ("ontouchstart" in xr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in xr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Va = 0;
  }, 500), kn = 1), _i || Ua(), kn;
};
nt.op = Me;
U.cache = 0;
var xe = /* @__PURE__ */ (function() {
  function a(r) {
    this.init(r);
  }
  var e = a.prototype;
  return e.init = function(t) {
    kn || Wa(Ie) || console.warn("Please gsap.registerPlugin(Observer)"), _i || Ua();
    var i = t.tolerance, n = t.dragMinimum, s = t.type, o = t.target, u = t.lineHeight, l = t.debounce, f = t.preventDefault, d = t.onStop, _ = t.onStopDelay, c = t.ignore, g = t.wheelSpeed, h = t.event, p = t.onDragStart, v = t.onDragEnd, b = t.onDrag, S = t.onPress, w = t.onRelease, T = t.onRight, M = t.onLeft, x = t.onUp, P = t.onDown, k = t.onChangeX, C = t.onChangeY, B = t.onChange, E = t.onToggleX, H = t.onToggleY, I = t.onHover, K = t.onHoverEnd, q = t.onMove, A = t.ignoreCheck, Z = t.isNormalizer, te = t.onGestureStart, m = t.onGestureEnd, se = t.onWheel, Ke = t.onEnable, zt = t.onDisable, he = t.onClick, ze = t.scrollSpeed, Xe = t.capture, we = t.allowClicks, Ze = t.lockAxis, Be = t.onLockAxis;
    this.target = o = ot(o) || xr, this.vars = t, c && (c = Ie.utils.toArray(c)), i = i || 1e-9, n = n || 0, g = g || 1, ze = ze || 1, s = s || "wheel,touch,pointer", l = l !== !1, u || (u = parseFloat(wt.getComputedStyle(di).lineHeight) || 22);
    var lr, Qe, Je, Q, ge, st, dt, y = this, _t = 0, Qt = 0, fr = t.passive || !f && t.passive !== !1, de = Pr(o, nt), Jt = Pr(o, Me), cr = de(), Or = Jt(), Oe = ~s.indexOf("touch") && !~s.indexOf("pointer") && Bt[0] === "pointerdown", hr = Ni(o), me = o.ownerDocument || vr, Ft = [0, 0, 0], Pt = [0, 0, 0], jt = 0, Ti = function() {
      return jt = Bi();
    }, be = function(z, J) {
      return (y.event = z) && c && Dl(z.target, c) || J && Oe && z.pointerType !== "touch" || A && A(z, J);
    }, an = function() {
      y._vx.reset(), y._vy.reset(), Qe.pause(), d && d(y);
    }, er = function() {
      var z = y.deltaX = So(Ft), J = y.deltaY = So(Pt), O = Math.abs(z) >= i, F = Math.abs(J) >= i;
      B && (O || F) && B(y, z, J, Ft, Pt), O && (T && y.deltaX > 0 && T(y), M && y.deltaX < 0 && M(y), k && k(y), E && y.deltaX < 0 != _t < 0 && E(y), _t = y.deltaX, Ft[0] = Ft[1] = Ft[2] = 0), F && (P && y.deltaY > 0 && P(y), x && y.deltaY < 0 && x(y), C && C(y), H && y.deltaY < 0 != Qt < 0 && H(y), Qt = y.deltaY, Pt[0] = Pt[1] = Pt[2] = 0), (Q || Je) && (q && q(y), Je && (p && Je === 1 && p(y), b && b(y), Je = 0), Q = !1), st && !(st = !1) && Be && Be(y), ge && (se(y), ge = !1), lr = 0;
    }, Jr = function(z, J, O) {
      Ft[O] += z, Pt[O] += J, y._vx.update(z), y._vy.update(J), l ? lr || (lr = requestAnimationFrame(er)) : er();
    }, jr = function(z, J) {
      Ze && !dt && (y.axis = dt = Math.abs(z) > Math.abs(J) ? "x" : "y", st = !0), dt !== "y" && (Ft[2] += z, y._vx.update(z, !0)), dt !== "x" && (Pt[2] += J, y._vy.update(J, !0)), l ? lr || (lr = requestAnimationFrame(er)) : er();
    }, dr = function(z) {
      if (!be(z, 1)) {
        z = Mi(z, f);
        var J = z.clientX, O = z.clientY, F = J - y.x, R = O - y.y, L = y.isDragging;
        y.x = J, y.y = O, (L || (F || R) && (Math.abs(y.startX - J) >= n || Math.abs(y.startY - O) >= n)) && (Je || (Je = L ? 2 : 1), L || (y.isDragging = !0), jr(F, R));
      }
    }, Er = y.onPress = function(Y) {
      be(Y, 1) || Y && Y.button || (y.axis = dt = null, Qe.pause(), y.isPressed = !0, Y = Mi(Y), _t = Qt = 0, y.startX = y.x = Y.clientX, y.startY = y.y = Y.clientY, y._vx.reset(), y._vy.reset(), et(Z ? o : me, Bt[1], dr, fr, !0), y.deltaX = y.deltaY = 0, S && S(y));
    }, W = y.onRelease = function(Y) {
      if (!be(Y, 1)) {
        je(Z ? o : me, Bt[1], dr, !0);
        var z = !isNaN(y.y - y.startY), J = y.isDragging, O = J && (Math.abs(y.x - y.startX) > 3 || Math.abs(y.y - y.startY) > 3), F = Mi(Y);
        !O && z && (y._vx.reset(), y._vy.reset(), f && we && Ie.delayedCall(0.08, function() {
          if (Bi() - jt > 300 && !Y.defaultPrevented) {
            if (Y.target.click)
              Y.target.click();
            else if (me.createEvent) {
              var R = me.createEvent("MouseEvents");
              R.initMouseEvent("click", !0, !0, wt, 1, F.screenX, F.screenY, F.clientX, F.clientY, !1, !1, !1, !1, 0, null), Y.target.dispatchEvent(R);
            }
          }
        })), y.isDragging = y.isGesturing = y.isPressed = !1, d && J && !Z && Qe.restart(!0), Je && er(), v && J && v(y), w && w(y, O);
      }
    }, Dr = function(z) {
      return z.touches && z.touches.length > 1 && (y.isGesturing = !0) && te(z, y.isDragging);
    }, Lt = function() {
      return (y.isGesturing = !1) || m(y);
    }, It = function(z) {
      if (!be(z)) {
        var J = de(), O = Jt();
        Jr((J - cr) * ze, (O - Or) * ze, 1), cr = J, Or = O, d && Qe.restart(!0);
      }
    }, Yt = function(z) {
      if (!be(z)) {
        z = Mi(z, f), se && (ge = !0);
        var J = (z.deltaMode === 1 ? u : z.deltaMode === 2 ? wt.innerHeight : 1) * g;
        Jr(z.deltaX * J, z.deltaY * J, 0), d && !Z && Qe.restart(!0);
      }
    }, Rr = function(z) {
      if (!be(z)) {
        var J = z.clientX, O = z.clientY, F = J - y.x, R = O - y.y;
        y.x = J, y.y = O, Q = !0, d && Qe.restart(!0), (F || R) && jr(F, R);
      }
    }, ei = function(z) {
      y.event = z, I(y);
    }, tr = function(z) {
      y.event = z, K(y);
    }, Si = function(z) {
      return be(z) || Mi(z, f) && he(y);
    };
    Qe = y._dc = Ie.delayedCall(_ || 0.25, an).pause(), y.deltaX = y.deltaY = 0, y._vx = Ss(0, 50, !0), y._vy = Ss(0, 50, !0), y.scrollX = de, y.scrollY = Jt, y.isDragging = y.isGesturing = y.isPressed = !1, Ba(this), y.enable = function(Y) {
      return y.isEnabled || (et(hr ? me : o, "scroll", Ts), s.indexOf("scroll") >= 0 && et(hr ? me : o, "scroll", It, fr, Xe), s.indexOf("wheel") >= 0 && et(o, "wheel", Yt, fr, Xe), (s.indexOf("touch") >= 0 && Ya || s.indexOf("pointer") >= 0) && (et(o, Bt[0], Er, fr, Xe), et(me, Bt[2], W), et(me, Bt[3], W), we && et(o, "click", Ti, !0, !0), he && et(o, "click", Si), te && et(me, "gesturestart", Dr), m && et(me, "gestureend", Lt), I && et(o, Ir + "enter", ei), K && et(o, Ir + "leave", tr), q && et(o, Ir + "move", Rr)), y.isEnabled = !0, y.isDragging = y.isGesturing = y.isPressed = Q = Je = !1, y._vx.reset(), y._vy.reset(), cr = de(), Or = Jt(), Y && Y.type && Er(Y), Ke && Ke(y)), y;
    }, y.disable = function() {
      y.isEnabled && (li.filter(function(Y) {
        return Y !== y && Ni(Y.target);
      }).length || je(hr ? me : o, "scroll", Ts), y.isPressed && (y._vx.reset(), y._vy.reset(), je(Z ? o : me, Bt[1], dr, !0)), je(hr ? me : o, "scroll", It, Xe), je(o, "wheel", Yt, Xe), je(o, Bt[0], Er, Xe), je(me, Bt[2], W), je(me, Bt[3], W), je(o, "click", Ti, !0), je(o, "click", Si), je(me, "gesturestart", Dr), je(me, "gestureend", Lt), je(o, Ir + "enter", ei), je(o, Ir + "leave", tr), je(o, Ir + "move", Rr), y.isEnabled = y.isPressed = y.isDragging = !1, zt && zt(y));
    }, y.kill = y.revert = function() {
      y.disable();
      var Y = li.indexOf(y);
      Y >= 0 && li.splice(Y, 1), sr === y && (sr = 0);
    }, li.push(y), Z && Ni(o) && (sr = y), y.enable(h);
  }, Ol(a, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), a;
})();
xe.version = "3.15.0";
xe.create = function(a) {
  return new xe(a);
};
xe.register = Wa;
xe.getAll = function() {
  return li.slice();
};
xe.getById = function(a) {
  return li.filter(function(e) {
    return e.vars.id === a;
  })[0];
};
Na() && Ie.registerPlugin(xe);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var D, si, V, ee, vt, j, Zs, Bn, nn, Vi, Ri, dn, We, $n, Cs, rt, Co, ko, oi, qa, rs, $a, tt, ks, Ga, Ha, pr, Ps, Qs, pi, Js, Ui, Ms, is, _n = 1, qe = Date.now, ns = qe(), At = 0, Ai = 0, Po = function(e, r, t) {
  var i = mt(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + r + "Clamp"] = i, i ? e.substr(6, e.length - 7) : e;
}, Mo = function(e, r) {
  return r && (!mt(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, Rl = function a() {
  return Ai && requestAnimationFrame(a);
}, Oo = function() {
  return $n = 1;
}, Eo = function() {
  return $n = 0;
}, qt = function(e) {
  return e;
}, zi = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ka = function() {
  return typeof window < "u";
}, Za = function() {
  return D || Ka() && (D = window.gsap) && D.registerPlugin && D;
}, Hr = function(e) {
  return !!~Zs.indexOf(e);
}, Qa = function(e) {
  return (e === "Height" ? Js : V["inner" + e]) || vt["client" + e] || j["client" + e];
}, Ja = function(e) {
  return Tr(e, "getBoundingClientRect") || (Hr(e) ? function() {
    return Dn.width = V.innerWidth, Dn.height = Js, Dn;
  } : function() {
    return nr(e);
  });
}, Al = function(e, r, t) {
  var i = t.d, n = t.d2, s = t.a;
  return (s = Tr(e, "getBoundingClientRect")) ? function() {
    return s()[i];
  } : function() {
    return (r ? Qa(n) : e["client" + n]) || 0;
  };
}, zl = function(e, r) {
  return !r || ~Kt.indexOf(e) ? Ja(e) : function() {
    return Dn;
  };
}, Ht = function(e, r) {
  var t = r.s, i = r.d2, n = r.d, s = r.a;
  return Math.max(0, (t = "scroll" + i) && (s = Tr(e, t)) ? s() - Ja(e)()[n] : Hr(e) ? (vt[t] || j[t]) - Qa(i) : e[t] - e["offset" + i]);
}, pn = function(e, r) {
  for (var t = 0; t < oi.length; t += 3)
    (!r || ~r.indexOf(oi[t + 1])) && e(oi[t], oi[t + 1], oi[t + 2]);
}, mt = function(e) {
  return typeof e == "string";
}, Ge = function(e) {
  return typeof e == "function";
}, Fi = function(e) {
  return typeof e == "number";
}, Yr = function(e) {
  return typeof e == "object";
}, Oi = function(e, r, t) {
  return e && e.progress(r ? 0 : 1) && t && e.pause();
}, ri = function(e, r, t) {
  if (e.enabled) {
    var i = e._ctx ? e._ctx.add(function() {
      return r(e, t);
    }) : r(e, t);
    i && i.totalTime && (e.callbackAnimation = i);
  }
}, ii = Math.abs, ja = "left", eu = "top", js = "right", eo = "bottom", qr = "width", $r = "height", Wi = "Right", qi = "Left", $i = "Top", Gi = "Bottom", Te = "padding", Ot = "margin", bi = "Width", to = "Height", Pe = "px", Et = function(e) {
  return V.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, Fl = function(e) {
  var r = Et(e).position;
  e.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, Do = function(e, r) {
  for (var t in r)
    t in e || (e[t] = r[t]);
  return e;
}, nr = function(e, r) {
  var t = r && Et(e)[Cs] !== "matrix(1, 0, 0, 1, 0, 0)" && D.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), i = e.getBoundingClientRect ? e.getBoundingClientRect() : e.scrollingElement.getBoundingClientRect();
  return t && t.progress(0).kill(), i;
}, Nn = function(e, r) {
  var t = r.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, tu = function(e) {
  var r = [], t = e.labels, i = e.duration(), n;
  for (n in t)
    r.push(t[n] / i);
  return r;
}, Ll = function(e) {
  return function(r) {
    return D.utils.snap(tu(e), r);
  };
}, ro = function(e) {
  var r = D.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(i, n) {
    return i - n;
  });
  return t ? function(i, n, s) {
    s === void 0 && (s = 1e-3);
    var o;
    if (!n)
      return r(i);
    if (n > 0) {
      for (i -= s, o = 0; o < t.length; o++)
        if (t[o] >= i)
          return t[o];
      return t[o - 1];
    } else
      for (o = t.length, i += s; o--; )
        if (t[o] <= i)
          return t[o];
    return t[0];
  } : function(i, n, s) {
    s === void 0 && (s = 1e-3);
    var o = r(i);
    return !n || Math.abs(o - i) < s || o - i < 0 == n < 0 ? o : r(n < 0 ? i - e : i + e);
  };
}, Il = function(e) {
  return function(r, t) {
    return ro(tu(e))(r, t.direction);
  };
}, gn = function(e, r, t, i) {
  return t.split(",").forEach(function(n) {
    return e(r, n, i);
  });
}, Re = function(e, r, t, i, n) {
  return e.addEventListener(r, t, {
    passive: !i,
    capture: !!n
  });
}, De = function(e, r, t, i) {
  return e.removeEventListener(r, t, !!i);
}, mn = function(e, r, t) {
  t = t && t.wheelHandler, t && (e(r, "wheel", t), e(r, "touchmove", t));
}, Ro = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, yn = {
  toggleActions: "play",
  anticipatePin: 0
}, Vn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Pn = function(e, r) {
  if (mt(e)) {
    var t = e.indexOf("="), i = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (i *= r / 100), e = e.substr(0, t - 1)), e = i + (e in Vn ? Vn[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0);
  }
  return e;
}, vn = function(e, r, t, i, n, s, o, u) {
  var l = n.startColor, f = n.endColor, d = n.fontSize, _ = n.indent, c = n.fontWeight, g = ee.createElement("div"), h = Hr(t) || Tr(t, "pinType") === "fixed", p = e.indexOf("scroller") !== -1, v = h ? j : t.tagName === "IFRAME" ? t.contentDocument.body : t, b = e.indexOf("start") !== -1, S = b ? l : f, w = "border-color:" + S + ";font-size:" + d + ";color:" + S + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return w += "position:" + ((p || u) && h ? "fixed;" : "absolute;"), (p || u || !h) && (w += (i === Me ? js : eo) + ":" + (s + parseFloat(_)) + "px;"), o && (w += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"), g._isStart = b, g.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")), g.style.cssText = w, g.innerText = r || r === 0 ? e + "-" + r : e, v.children[0] ? v.insertBefore(g, v.children[0]) : v.appendChild(g), g._offset = g["offset" + i.op.d2], Mn(g, 0, i, b), g;
}, Mn = function(e, r, t, i) {
  var n = {
    display: "block"
  }, s = t[i ? "os2" : "p2"], o = t[i ? "p2" : "os2"];
  e._isFlipped = i, n[t.a + "Percent"] = i ? -100 : 0, n[t.a] = i ? "1px" : 0, n["border" + s + bi] = 1, n["border" + o + bi] = 0, n[t.p] = r + "px", D.set(e, n);
}, N = [], Os = {}, sn, Ao = function() {
  return qe() - At > 34 && (sn || (sn = requestAnimationFrame(or)));
}, ni = function() {
  (!tt || !tt.isPressed || tt.startX > j.clientWidth) && (U.cache++, tt ? sn || (sn = requestAnimationFrame(or)) : or(), At || Zr("scrollStart"), At = qe());
}, ss = function() {
  Ha = V.innerWidth, Ga = V.innerHeight;
}, Li = function(e) {
  U.cache++, (e === !0 || !We && !$a && !ee.fullscreenElement && !ee.webkitFullscreenElement && (!ks || Ha !== V.innerWidth || Math.abs(V.innerHeight - Ga) > V.innerHeight * 0.25)) && Bn.restart(!0);
}, Kr = {}, Yl = [], ru = function a() {
  return De(X, "scrollEnd", a) || Br(!0);
}, Zr = function(e) {
  return Kr[e] && Kr[e].map(function(r) {
    return r();
  }) || Yl;
}, gt = [], iu = function(e) {
  for (var r = 0; r < gt.length; r += 5)
    (!e || gt[r + 4] && gt[r + 4].query === e) && (gt[r].style.cssText = gt[r + 1], gt[r].getBBox && gt[r].setAttribute("transform", gt[r + 2] || ""), gt[r + 3].uncache = 1);
}, nu = function() {
  return U.forEach(function(e) {
    return Ge(e) && ++e.cacheID && (e.rec = e());
  });
}, io = function(e, r) {
  var t;
  for (rt = 0; rt < N.length; rt++)
    t = N[rt], t && (!r || t._ctx === r) && (e ? t.kill(1) : t.revert(!0, !0));
  Ui = !0, r && iu(r), r || Zr("revert");
}, su = function(e, r) {
  U.cache++, (r || !it) && U.forEach(function(t) {
    return Ge(t) && t.cacheID++ && (t.rec = 0);
  }), mt(e) && (V.history.scrollRestoration = Qs = e);
}, it, Gr = 0, zo, Xl = function() {
  if (zo !== Gr) {
    var e = zo = Gr;
    requestAnimationFrame(function() {
      return e === Gr && Br(!0);
    });
  }
}, ou = function() {
  j.appendChild(pi), Js = !tt && pi.offsetHeight || V.innerHeight, j.removeChild(pi);
}, Fo = function(e) {
  return nn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(r) {
    return r.style.display = e ? "none" : "block";
  });
}, Br = function(e, r) {
  if (vt = ee.documentElement, j = ee.body, Zs = [V, ee, vt, j], At && !e && !Ui) {
    Re(X, "scrollEnd", ru);
    return;
  }
  ou(), it = X.isRefreshing = !0, Ui || nu();
  var t = Zr("refreshInit");
  qa && X.sort(), r || io(), U.forEach(function(i) {
    Ge(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), N.slice(0).forEach(function(i) {
    return i.refresh();
  }), Ui = !1, N.forEach(function(i) {
    if (i._subPinOffset && i.pin) {
      var n = i.vars.horizontal ? "offsetWidth" : "offsetHeight", s = i.pin[n];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[n] - s), i.refresh();
    }
  }), Ms = 1, Fo(!0), N.forEach(function(i) {
    var n = Ht(i.scroller, i._dir), s = i.vars.end === "max" || i._endClamp && i.end > n, o = i._startClamp && i.start >= n;
    (s || o) && i.setPositions(o ? n - 1 : i.start, s ? Math.max(o ? n : i.start + 1, n) : i.end, !0);
  }), Fo(!1), Ms = 0, t.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), U.forEach(function(i) {
    Ge(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), su(Qs, 1), Bn.pause(), Gr++, it = 2, or(2), N.forEach(function(i) {
    return Ge(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), it = X.isRefreshing = !1, Zr("refresh");
}, Es = 0, On = 1, Hi, or = function(e) {
  if (e === 2 || !it && !Ui) {
    X.isUpdating = !0, Hi && Hi.update(0);
    var r = N.length, t = qe(), i = t - ns >= 50, n = r && N[0].scroll();
    if (On = Es > n ? -1 : 1, it || (Es = n), i && (At && !$n && t - At > 200 && (At = 0, Zr("scrollEnd")), Ri = ns, ns = t), On < 0) {
      for (rt = r; rt-- > 0; )
        N[rt] && N[rt].update(0, i);
      On = 1;
    } else
      for (rt = 0; rt < r; rt++)
        N[rt] && N[rt].update(0, i);
    X.isUpdating = !1;
  }
  sn = 0;
}, Ds = [ja, eu, eo, js, Ot + Gi, Ot + Wi, Ot + $i, Ot + qi, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], En = Ds.concat([qr, $r, "boxSizing", "max" + bi, "max" + to, "position", Ot, Te, Te + $i, Te + Wi, Te + Gi, Te + qi]), Bl = function(e, r, t) {
  gi(t);
  var i = e._gsap;
  if (i.spacerIsNative)
    gi(i.spacerState);
  else if (e._gsap.swappedIn) {
    var n = r.parentNode;
    n && (n.insertBefore(e, r), n.removeChild(r));
  }
  e._gsap.swappedIn = !1;
}, os = function(e, r, t, i) {
  if (!e._gsap.swappedIn) {
    for (var n = Ds.length, s = r.style, o = e.style, u; n--; )
      u = Ds[n], s[u] = t[u];
    s.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (s.display = "inline-block"), o[eo] = o[js] = "auto", s.flexBasis = t.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[qr] = Nn(e, nt) + Pe, s[$r] = Nn(e, Me) + Pe, s[Te] = o[Ot] = o[eu] = o[ja] = "0", gi(i), o[qr] = o["max" + bi] = t[qr], o[$r] = o["max" + to] = t[$r], o[Te] = t[Te], e.parentNode !== r && (e.parentNode.insertBefore(r, e), r.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Nl = /([A-Z])/g, gi = function(e) {
  if (e) {
    var r = e.t.style, t = e.length, i = 0, n, s;
    for ((e.t._gsap || D.core.getCache(e.t)).uncache = 1; i < t; i += 2)
      s = e[i + 1], n = e[i], s ? r[n] = s : r[n] && r.removeProperty(n.replace(Nl, "-$1").toLowerCase());
  }
}, xn = function(e) {
  for (var r = En.length, t = e.style, i = [], n = 0; n < r; n++)
    i.push(En[n], t[En[n]]);
  return i.t = e, i;
}, Vl = function(e, r, t) {
  for (var i = [], n = e.length, s = t ? 8 : 0, o; s < n; s += 2)
    o = e[s], i.push(o, o in r ? r[o] : e[s + 1]);
  return i.t = e.t, i;
}, Dn = {
  left: 0,
  top: 0
}, Lo = function(e, r, t, i, n, s, o, u, l, f, d, _, c, g) {
  Ge(e) && (e = e(u)), mt(e) && e.substr(0, 3) === "max" && (e = _ + (e.charAt(4) === "=" ? Pn("0" + e.substr(3), t) : 0));
  var h = c ? c.time() : 0, p, v, b;
  if (c && c.seek(0), isNaN(e) || (e = +e), Fi(e))
    c && (e = D.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, _, e)), o && Mn(o, t, i, !0);
  else {
    Ge(r) && (r = r(u));
    var S = (e || "0").split(" "), w, T, M, x;
    b = ot(r, u) || j, w = nr(b) || {}, (!w || !w.left && !w.top) && Et(b).display === "none" && (x = b.style.display, b.style.display = "block", w = nr(b), x ? b.style.display = x : b.style.removeProperty("display")), T = Pn(S[0], w[i.d]), M = Pn(S[1] || "0", t), e = w[i.p] - l[i.p] - f + T + n - M, o && Mn(o, M, i, t - M < 20 || o._isStart && M > 20), t -= t - M;
  }
  if (g && (u[g] = e || -1e-3, e < 0 && (e = 0)), s) {
    var P = e + t, k = s._isStart;
    p = "scroll" + i.d2, Mn(s, P, i, k && P > 20 || !k && (d ? Math.max(j[p], vt[p]) : s.parentNode[p]) <= P + 1), d && (l = nr(o), d && (s.style[i.op.p] = l[i.op.p] - i.op.m - s._offset + Pe));
  }
  return c && b && (p = nr(b), c.seek(_), v = nr(b), c._caScrollDist = p[i.p] - v[i.p], e = e / c._caScrollDist * _), c && c.seek(h), c ? e : Math.round(e);
}, Ul = /(webkit|moz|length|cssText|inset)/i, Io = function(e, r, t, i) {
  if (e.parentNode !== r) {
    var n = e.style, s, o;
    if (r === j) {
      e._stOrig = n.cssText, o = Et(e);
      for (s in o)
        !+s && !Ul.test(s) && o[s] && typeof n[s] == "string" && s !== "0" && (n[s] = o[s]);
      n.top = t, n.left = i;
    } else
      n.cssText = e._stOrig;
    D.core.getCache(e).uncache = 1, r.appendChild(e);
  }
}, au = function(e, r, t) {
  var i = r, n = i;
  return function(s) {
    var o = Math.round(e());
    return o !== i && o !== n && Math.abs(o - i) > 3 && Math.abs(o - n) > 3 && (s = o, t && t()), n = i, i = Math.round(s), i;
  };
}, wn = function(e, r, t) {
  var i = {};
  i[r.p] = "+=" + t, D.set(e, i);
}, Yo = function(e, r) {
  var t = Pr(e, r), i = "_scroll" + r.p2, n = function s(o, u, l, f, d) {
    var _ = s.tween, c = u.onComplete, g = {};
    l = l || t();
    var h = au(t, l, function() {
      _.kill(), s.tween = 0;
    });
    return d = f && d || 0, f = f || o - l, _ && _.kill(), u[i] = o, u.inherit = !1, u.modifiers = g, g[i] = function() {
      return h(l + f * _.ratio + d * _.ratio * _.ratio);
    }, u.onUpdate = function() {
      U.cache++, s.tween && or();
    }, u.onComplete = function() {
      s.tween = 0, c && c.call(_);
    }, _ = s.tween = D.to(e, u), _;
  };
  return e[i] = t, t.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Re(e, "wheel", t.wheelHandler), X.isTouch && Re(e, "touchmove", t.wheelHandler), n;
}, X = /* @__PURE__ */ (function() {
  function a(r, t) {
    si || a.register(D) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Ps(this), this.init(r, t);
  }
  var e = a.prototype;
  return e.init = function(t, i) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Ai) {
      this.update = this.refresh = this.kill = qt;
      return;
    }
    t = Do(mt(t) || Fi(t) || t.nodeType ? {
      trigger: t
    } : t, yn);
    var n = t, s = n.onUpdate, o = n.toggleClass, u = n.id, l = n.onToggle, f = n.onRefresh, d = n.scrub, _ = n.trigger, c = n.pin, g = n.pinSpacing, h = n.invalidateOnRefresh, p = n.anticipatePin, v = n.onScrubComplete, b = n.onSnapComplete, S = n.once, w = n.snap, T = n.pinReparent, M = n.pinSpacer, x = n.containerAnimation, P = n.fastScrollEnd, k = n.preventOverlaps, C = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? nt : Me, B = !d && d !== 0, E = ot(t.scroller || V), H = D.core.getCache(E), I = Hr(E), K = ("pinType" in t ? t.pinType : Tr(E, "pinType") || I && "fixed") === "fixed", q = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], A = B && t.toggleActions.split(" "), Z = "markers" in t ? t.markers : yn.markers, te = I ? 0 : parseFloat(Et(E)["border" + C.p2 + bi]) || 0, m = this, se = t.onRefreshInit && function() {
      return t.onRefreshInit(m);
    }, Ke = Al(E, I, C), zt = zl(E, I), he = 0, ze = 0, Xe = 0, we = Pr(E, C), Ze, Be, lr, Qe, Je, Q, ge, st, dt, y, _t, Qt, fr, de, Jt, cr, Or, Oe, hr, me, Ft, Pt, jt, Ti, be, an, er, Jr, jr, dr, Er, W, Dr, Lt, It, Yt, Rr, ei, tr;
    if (m._startClamp = m._endClamp = !1, m._dir = C, p *= 45, m.scroller = E, m.scroll = x ? x.time.bind(x) : we, Qe = we(), m.vars = t, i = i || t.animation, "refreshPriority" in t && (qa = 1, t.refreshPriority === -9999 && (Hi = m)), H.tweenScroll = H.tweenScroll || {
      top: Yo(E, Me),
      left: Yo(E, nt)
    }, m.tweenTo = Ze = H.tweenScroll[C.p], m.scrubDuration = function(O) {
      Dr = Fi(O) && O, Dr ? W ? W.duration(O) : W = D.to(i, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Dr,
        paused: !0,
        onComplete: function() {
          return v && v(m);
        }
      }) : (W && W.progress(1).kill(), W = 0);
    }, i && (i.vars.lazy = !1, i._initted && !m.isReverted || i.vars.immediateRender !== !1 && t.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), m.animation = i.pause(), i.scrollTrigger = m, m.scrubDuration(d), dr = 0, u || (u = i.vars.id)), w && ((!Yr(w) || w.push) && (w = {
      snapTo: w
    }), "scrollBehavior" in j.style && D.set(I ? [j, vt] : E, {
      scrollBehavior: "auto"
    }), U.forEach(function(O) {
      return Ge(O) && O.target === (I ? ee.scrollingElement || vt : E) && (O.smooth = !1);
    }), lr = Ge(w.snapTo) ? w.snapTo : w.snapTo === "labels" ? Ll(i) : w.snapTo === "labelsDirectional" ? Il(i) : w.directional !== !1 ? function(O, F) {
      return ro(w.snapTo)(O, qe() - ze < 500 ? 0 : F.direction);
    } : D.utils.snap(w.snapTo), Lt = w.duration || {
      min: 0.1,
      max: 2
    }, Lt = Yr(Lt) ? Vi(Lt.min, Lt.max) : Vi(Lt, Lt), It = D.delayedCall(w.delay || Dr / 2 || 0.1, function() {
      var O = we(), F = qe() - ze < 500, R = Ze.tween;
      if ((F || Math.abs(m.getVelocity()) < 10) && !R && !$n && he !== O) {
        var L = (O - Q) / de, Ee = i && !B ? i.totalProgress() : L, $ = F ? 0 : (Ee - Er) / (qe() - Ri) * 1e3 || 0, ye = D.utils.clamp(-L, 1 - L, ii($ / 2) * $ / 0.185), Ne = L + (w.inertia === !1 ? 0 : ye), _e, oe, re = w, Xt = re.onStart, ue = re.onInterrupt, pt = re.onComplete;
        if (_e = lr(Ne, m), Fi(_e) || (_e = Ne), oe = Math.max(0, Math.round(Q + _e * de)), O <= ge && O >= Q && oe !== O) {
          if (R && !R._initted && R.data <= ii(oe - O))
            return;
          w.inertia === !1 && (ye = _e - L), Ze(oe, {
            duration: Lt(ii(Math.max(ii(Ne - Ee), ii(_e - Ee)) * 0.185 / $ / 0.05 || 0)),
            ease: w.ease || "power3",
            data: ii(oe - O),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return It.restart(!0) && ue && ri(m, ue);
            },
            onComplete: function() {
              m.update(), he = we(), i && !B && (W ? W.resetTo("totalProgress", _e, i._tTime / i._tDur) : i.progress(_e)), dr = Er = i && !B ? i.totalProgress() : m.progress, b && b(m), pt && ri(m, pt);
            }
          }, O, ye * de, oe - O - ye * de), Xt && ri(m, Xt, Ze.tween);
        }
      } else m.isActive && he !== O && It.restart(!0);
    }).pause()), u && (Os[u] = m), _ = m.trigger = ot(_ || c !== !0 && c), tr = _ && _._gsap && _._gsap.stRevert, tr && (tr = tr(m)), c = c === !0 ? _ : ot(c), mt(o) && (o = {
      targets: _,
      className: o
    }), c && (g === !1 || g === Ot || (g = !g && c.parentNode && c.parentNode.style && Et(c.parentNode).display === "flex" ? !1 : Te), m.pin = c, Be = D.core.getCache(c), Be.spacer ? Jt = Be.pinState : (M && (M = ot(M), M && !M.nodeType && (M = M.current || M.nativeElement), Be.spacerIsNative = !!M, M && (Be.spacerState = xn(M))), Be.spacer = Oe = M || ee.createElement("div"), Oe.classList.add("pin-spacer"), u && Oe.classList.add("pin-spacer-" + u), Be.pinState = Jt = xn(c)), t.force3D !== !1 && D.set(c, {
      force3D: !0
    }), m.spacer = Oe = Be.spacer, jr = Et(c), Ti = jr[g + C.os2], me = D.getProperty(c), Ft = D.quickSetter(c, C.a, Pe), os(c, Oe, jr), Or = xn(c)), Z) {
      Qt = Yr(Z) ? Do(Z, Ro) : Ro, y = vn("scroller-start", u, E, C, Qt, 0), _t = vn("scroller-end", u, E, C, Qt, 0, y), hr = y["offset" + C.op.d2];
      var Si = ot(Tr(E, "content") || E);
      st = this.markerStart = vn("start", u, Si, C, Qt, hr, 0, x), dt = this.markerEnd = vn("end", u, Si, C, Qt, hr, 0, x), x && (ei = D.quickSetter([st, dt], C.a, Pe)), !K && !(Kt.length && Tr(E, "fixedMarkers") === !0) && (Fl(I ? j : E), D.set([y, _t], {
        force3D: !0
      }), an = D.quickSetter(y, C.a, Pe), Jr = D.quickSetter(_t, C.a, Pe));
    }
    if (x) {
      var Y = x.vars.onUpdate, z = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        m.update(0, 0, 1), Y && Y.apply(x, z || []);
      });
    }
    if (m.previous = function() {
      return N[N.indexOf(m) - 1];
    }, m.next = function() {
      return N[N.indexOf(m) + 1];
    }, m.revert = function(O, F) {
      if (!F)
        return m.kill(!0);
      var R = O !== !1 || !m.enabled, L = We;
      R !== m.isReverted && (R && (Yt = Math.max(we(), m.scroll.rec || 0), Xe = m.progress, Rr = i && i.progress()), st && [st, dt, y, _t].forEach(function(Ee) {
        return Ee.style.display = R ? "none" : "block";
      }), R && (We = m, m.update(R)), c && (!T || !m.isActive) && (R ? Bl(c, Oe, Jt) : os(c, Oe, Et(c), be)), R || m.update(R), We = L, m.isReverted = R);
    }, m.refresh = function(O, F, R, L) {
      if (!((We || !m.enabled) && !F)) {
        if (c && O && At) {
          Re(a, "scrollEnd", ru);
          return;
        }
        !it && se && se(m), We = m, Ze.tween && !R && (Ze.tween.kill(), Ze.tween = 0), W && W.pause(), h && i && (i.revert({
          kill: !1
        }).invalidate(), i.getChildren ? i.getChildren(!0, !0, !1).forEach(function(_r) {
          return _r.vars.immediateRender && _r.render(0, !0, !0);
        }) : i.vars.immediateRender && i.render(0, !0, !0)), m.isReverted || m.revert(!0, !0), m._subPinOffset = !1;
        var Ee = Ke(), $ = zt(), ye = x ? x.duration() : Ht(E, C), Ne = de <= 0.01 || !de, _e = 0, oe = L || 0, re = Yr(R) ? R.end : t.end, Xt = t.endTrigger || _, ue = Yr(R) ? R.start : t.start || (t.start === 0 || !_ ? 0 : c ? "0 0" : "0 100%"), pt = m.pinnedContainer = t.pinnedContainer && ot(t.pinnedContainer, m), Nt = _ && Math.max(0, N.indexOf(m)) || 0, Fe = Nt, Le, Ve, Ar, un, Ue, ke, Vt, Gn, no, Ci, Ut, ki, ln;
        for (Z && Yr(R) && (ki = D.getProperty(y, C.p), ln = D.getProperty(_t, C.p)); Fe-- > 0; )
          ke = N[Fe], ke.end || ke.refresh(0, 1) || (We = m), Vt = ke.pin, Vt && (Vt === _ || Vt === c || Vt === pt) && !ke.isReverted && (Ci || (Ci = []), Ci.unshift(ke), ke.revert(!0, !0)), ke !== N[Fe] && (Nt--, Fe--);
        for (Ge(ue) && (ue = ue(m)), ue = Po(ue, "start", m), Q = Lo(ue, _, Ee, C, we(), st, y, m, $, te, K, ye, x, m._startClamp && "_startClamp") || (c ? -1e-3 : 0), Ge(re) && (re = re(m)), mt(re) && !re.indexOf("+=") && (~re.indexOf(" ") ? re = (mt(ue) ? ue.split(" ")[0] : "") + re : (_e = Pn(re.substr(2), Ee), re = mt(ue) ? ue : (x ? D.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, Q) : Q) + _e, Xt = _)), re = Po(re, "end", m), ge = Math.max(Q, Lo(re || (Xt ? "100% 0" : ye), Xt, Ee, C, we() + _e, dt, _t, m, $, te, K, ye, x, m._endClamp && "_endClamp")) || -1e-3, _e = 0, Fe = Nt; Fe--; )
          ke = N[Fe] || {}, Vt = ke.pin, Vt && ke.start - ke._pinPush <= Q && !x && ke.end > 0 && (Le = ke.end - (m._startClamp ? Math.max(0, ke.start) : ke.start), (Vt === _ && ke.start - ke._pinPush < Q || Vt === pt) && isNaN(ue) && (_e += Le * (1 - ke.progress)), Vt === c && (oe += Le));
        if (Q += _e, ge += _e, m._startClamp && (m._startClamp += _e), m._endClamp && !it && (m._endClamp = ge || -1e-3, ge = Math.min(ge, Ht(E, C))), de = ge - Q || (Q -= 0.01) && 1e-3, Ne && (Xe = D.utils.clamp(0, 1, D.utils.normalize(Q, ge, Yt))), m._pinPush = oe, st && _e && (Le = {}, Le[C.a] = "+=" + _e, pt && (Le[C.p] = "-=" + we()), D.set([st, dt], Le)), c && !(Ms && m.end >= Ht(E, C)))
          Le = Et(c), un = C === Me, Ar = we(), Pt = parseFloat(me(C.a)) + oe, !ye && ge > 1 && (Ut = (I ? ee.scrollingElement || vt : E).style, Ut = {
            style: Ut,
            value: Ut["overflow" + C.a.toUpperCase()]
          }, I && Et(j)["overflow" + C.a.toUpperCase()] !== "scroll" && (Ut.style["overflow" + C.a.toUpperCase()] = "scroll")), os(c, Oe, Le), Or = xn(c), Ve = nr(c, !0), Gn = K && Pr(E, un ? nt : Me)(), g ? (be = [g + C.os2, de + oe + Pe], be.t = Oe, Fe = g === Te ? Nn(c, C) + de + oe : 0, Fe && (be.push(C.d, Fe + Pe), Oe.style.flexBasis !== "auto" && (Oe.style.flexBasis = Fe + Pe)), gi(be), pt && N.forEach(function(_r) {
            _r.pin === pt && _r.vars.pinSpacing !== !1 && (_r._subPinOffset = !0);
          }), K && we(Yt)) : (Fe = Nn(c, C), Fe && Oe.style.flexBasis !== "auto" && (Oe.style.flexBasis = Fe + Pe)), K && (Ue = {
            top: Ve.top + (un ? Ar - Q : Gn) + Pe,
            left: Ve.left + (un ? Gn : Ar - Q) + Pe,
            boxSizing: "border-box",
            position: "fixed"
          }, Ue[qr] = Ue["max" + bi] = Math.ceil(Ve.width) + Pe, Ue[$r] = Ue["max" + to] = Math.ceil(Ve.height) + Pe, Ue[Ot] = Ue[Ot + $i] = Ue[Ot + Wi] = Ue[Ot + Gi] = Ue[Ot + qi] = "0", Ue[Te] = Le[Te], Ue[Te + $i] = Le[Te + $i], Ue[Te + Wi] = Le[Te + Wi], Ue[Te + Gi] = Le[Te + Gi], Ue[Te + qi] = Le[Te + qi], cr = Vl(Jt, Ue, T), it && we(0)), i ? (no = i._initted, rs(1), i.render(i.duration(), !0, !0), jt = me(C.a) - Pt + de + oe, er = Math.abs(de - jt) > 1, K && er && cr.splice(cr.length - 2, 2), i.render(0, !0, !0), no || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), rs(0)) : jt = de, Ut && (Ut.value ? Ut.style["overflow" + C.a.toUpperCase()] = Ut.value : Ut.style.removeProperty("overflow-" + C.a));
        else if (_ && we() && !x)
          for (Ve = _.parentNode; Ve && Ve !== j; )
            Ve._pinOffset && (Q -= Ve._pinOffset, ge -= Ve._pinOffset), Ve = Ve.parentNode;
        Ci && Ci.forEach(function(_r) {
          return _r.revert(!1, !0);
        }), m.start = Q, m.end = ge, Qe = Je = it ? Yt : we(), !x && !it && (Qe < Yt && we(Yt), m.scroll.rec = 0), m.revert(!1, !0), ze = qe(), It && (he = -1, It.restart(!0)), We = 0, i && B && (i._initted || Rr) && i.progress() !== Rr && i.progress(Rr || 0, !0).render(i.time(), !0, !0), (Ne || Xe !== m.progress || x || h || i && !i._initted) && (i && !B && (i._initted || Xe || i.vars.immediateRender !== !1) && i.totalProgress(x && Q < -1e-3 && !Xe ? D.utils.normalize(Q, ge, 0) : Xe, !0), m.progress = Ne || (Qe - Q) / de === Xe ? 0 : Xe), c && g && (Oe._pinOffset = Math.round(m.progress * jt)), W && W.invalidate(), isNaN(ki) || (ki -= D.getProperty(y, C.p), ln -= D.getProperty(_t, C.p), wn(y, C, ki), wn(st, C, ki - (L || 0)), wn(_t, C, ln), wn(dt, C, ln - (L || 0))), Ne && !it && m.update(), f && !it && !fr && (fr = !0, f(m), fr = !1);
      }
    }, m.getVelocity = function() {
      return (we() - Je) / (qe() - Ri) * 1e3 || 0;
    }, m.endAnimation = function() {
      Oi(m.callbackAnimation), i && (W ? W.progress(1) : i.paused() ? B || Oi(i, m.direction < 0, 1) : Oi(i, i.reversed()));
    }, m.labelToScroll = function(O) {
      return i && i.labels && (Q || m.refresh() || Q) + i.labels[O] / i.duration() * de || 0;
    }, m.getTrailing = function(O) {
      var F = N.indexOf(m), R = m.direction > 0 ? N.slice(0, F).reverse() : N.slice(F + 1);
      return (mt(O) ? R.filter(function(L) {
        return L.vars.preventOverlaps === O;
      }) : R).filter(function(L) {
        return m.direction > 0 ? L.end <= Q : L.start >= ge;
      });
    }, m.update = function(O, F, R) {
      if (!(x && !R && !O)) {
        var L = it === !0 ? Yt : m.scroll(), Ee = O ? 0 : (L - Q) / de, $ = Ee < 0 ? 0 : Ee > 1 ? 1 : Ee || 0, ye = m.progress, Ne, _e, oe, re, Xt, ue, pt, Nt;
        if (F && (Je = Qe, Qe = x ? we() : L, w && (Er = dr, dr = i && !B ? i.totalProgress() : $)), p && c && !We && !_n && At && (!$ && Q < L + (L - Je) / (qe() - Ri) * p ? $ = 1e-4 : $ === 1 && ge > L + (L - Je) / (qe() - Ri) * p && ($ = 0.9999)), $ !== ye && m.enabled) {
          if (Ne = m.isActive = !!$ && $ < 1, _e = !!ye && ye < 1, ue = Ne !== _e, Xt = ue || !!$ != !!ye, m.direction = $ > ye ? 1 : -1, m.progress = $, Xt && !We && (oe = $ && !ye ? 0 : $ === 1 ? 1 : ye === 1 ? 2 : 3, B && (re = !ue && A[oe + 1] !== "none" && A[oe + 1] || A[oe], Nt = i && (re === "complete" || re === "reset" || re in i))), k && (ue || Nt) && (Nt || d || !i) && (Ge(k) ? k(m) : m.getTrailing(k).forEach(function(Ar) {
            return Ar.endAnimation();
          })), B || (W && !We && !_n ? (W._dp._time - W._start !== W._time && W.render(W._dp._time - W._start), W.resetTo ? W.resetTo("totalProgress", $, i._tTime / i._tDur) : (W.vars.totalProgress = $, W.invalidate().restart())) : i && i.totalProgress($, !!(We && (ze || O)))), c) {
            if (O && g && (Oe.style[g + C.os2] = Ti), !K)
              Ft(zi(Pt + jt * $));
            else if (Xt) {
              if (pt = !O && $ > ye && ge + 1 > L && L + 1 >= Ht(E, C), T)
                if (!O && (Ne || pt)) {
                  var Fe = nr(c, !0), Le = L - Q;
                  Io(c, j, Fe.top + (C === Me ? Le : 0) + Pe, Fe.left + (C === Me ? 0 : Le) + Pe);
                } else
                  Io(c, Oe);
              gi(Ne || pt ? cr : Or), er && $ < 1 && Ne || Ft(Pt + ($ === 1 && !pt ? jt : 0));
            }
          }
          w && !Ze.tween && !We && !_n && It.restart(!0), o && (ue || S && $ && ($ < 1 || !is)) && nn(o.targets).forEach(function(Ar) {
            return Ar.classList[Ne || S ? "add" : "remove"](o.className);
          }), s && !B && !O && s(m), Xt && !We ? (B && (Nt && (re === "complete" ? i.pause().totalProgress(1) : re === "reset" ? i.restart(!0).pause() : re === "restart" ? i.restart(!0) : i[re]()), s && s(m)), (ue || !is) && (l && ue && ri(m, l), q[oe] && ri(m, q[oe]), S && ($ === 1 ? m.kill(!1, 1) : q[oe] = 0), ue || (oe = $ === 1 ? 1 : 3, q[oe] && ri(m, q[oe]))), P && !Ne && Math.abs(m.getVelocity()) > (Fi(P) ? P : 2500) && (Oi(m.callbackAnimation), W ? W.progress(1) : Oi(i, re === "reverse" ? 1 : !$, 1))) : B && s && !We && s(m);
        }
        if (Jr) {
          var Ve = x ? L / x.duration() * (x._caScrollDist || 0) : L;
          an(Ve + (y._isFlipped ? 1 : 0)), Jr(Ve);
        }
        ei && ei(-L / x.duration() * (x._caScrollDist || 0));
      }
    }, m.enable = function(O, F) {
      m.enabled || (m.enabled = !0, Re(E, "resize", Li), I || Re(E, "scroll", ni), se && Re(a, "refreshInit", se), O !== !1 && (m.progress = Xe = 0, Qe = Je = he = we()), F !== !1 && m.refresh());
    }, m.getTween = function(O) {
      return O && Ze ? Ze.tween : W;
    }, m.setPositions = function(O, F, R, L) {
      if (x) {
        var Ee = x.scrollTrigger, $ = x.duration(), ye = Ee.end - Ee.start;
        O = Ee.start + ye * O / $, F = Ee.start + ye * F / $;
      }
      m.refresh(!1, !1, {
        start: Mo(O, R && !!m._startClamp),
        end: Mo(F, R && !!m._endClamp)
      }, L), m.update();
    }, m.adjustPinSpacing = function(O) {
      if (be && O) {
        var F = be.indexOf(C.d) + 1;
        be[F] = parseFloat(be[F]) + O + Pe, be[1] = parseFloat(be[1]) + O + Pe, gi(be);
      }
    }, m.disable = function(O, F) {
      if (O !== !1 && m.revert(!0, !0), m.enabled && (m.enabled = m.isActive = !1, F || W && W.pause(), Yt = 0, Be && (Be.uncache = 1), se && De(a, "refreshInit", se), It && (It.pause(), Ze.tween && Ze.tween.kill() && (Ze.tween = 0)), !I)) {
        for (var R = N.length; R--; )
          if (N[R].scroller === E && N[R] !== m)
            return;
        De(E, "resize", Li), I || De(E, "scroll", ni);
      }
    }, m.kill = function(O, F) {
      m.disable(O, F), W && !F && W.kill(), u && delete Os[u];
      var R = N.indexOf(m);
      R >= 0 && N.splice(R, 1), R === rt && On > 0 && rt--, R = 0, N.forEach(function(L) {
        return L.scroller === m.scroller && (R = 1);
      }), R || it || (m.scroll.rec = 0), i && (i.scrollTrigger = null, O && i.revert({
        kill: !1
      }), F || i.kill()), st && [st, dt, y, _t].forEach(function(L) {
        return L.parentNode && L.parentNode.removeChild(L);
      }), Hi === m && (Hi = 0), c && (Be && (Be.uncache = 1), R = 0, N.forEach(function(L) {
        return L.pin === c && R++;
      }), R || (Be.spacer = 0)), t.onKill && t.onKill(m);
    }, N.push(m), m.enable(!1, !1), tr && tr(m), i && i.add && !de) {
      var J = m.update;
      m.update = function() {
        m.update = J, U.cache++, Q || ge || m.refresh();
      }, D.delayedCall(0.01, m.update), de = 0.01, Q = ge = 0;
    } else
      m.refresh();
    c && Xl();
  }, a.register = function(t) {
    return si || (D = t || Za(), Ka() && window.document && a.enable(), si = Ai), si;
  }, a.defaults = function(t) {
    if (t)
      for (var i in t)
        yn[i] = t[i];
    return yn;
  }, a.disable = function(t, i) {
    Ai = 0, N.forEach(function(s) {
      return s[i ? "kill" : "disable"](t);
    }), De(V, "wheel", ni), De(ee, "scroll", ni), clearInterval(dn), De(ee, "touchcancel", qt), De(j, "touchstart", qt), gn(De, ee, "pointerdown,touchstart,mousedown", Oo), gn(De, ee, "pointerup,touchend,mouseup", Eo), Bn.kill(), pn(De);
    for (var n = 0; n < U.length; n += 3)
      mn(De, U[n], U[n + 1]), mn(De, U[n], U[n + 2]);
  }, a.enable = function() {
    if (V = window, ee = document, vt = ee.documentElement, j = ee.body, D) {
      if (nn = D.utils.toArray, Vi = D.utils.clamp, Ps = D.core.context || qt, rs = D.core.suppressOverwrites || qt, Qs = V.history.scrollRestoration || "auto", Es = V.pageYOffset || 0, D.core.globals("ScrollTrigger", a), j) {
        Ai = 1, pi = document.createElement("div"), pi.style.height = "100vh", pi.style.position = "absolute", ou(), Rl(), xe.register(D), a.isTouch = xe.isTouch, pr = xe.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), ks = xe.isTouch === 1, Re(V, "wheel", ni), Zs = [V, ee, vt, j], D.matchMedia ? (a.matchMedia = function(f) {
          var d = D.matchMedia(), _;
          for (_ in f)
            d.add(_, f[_]);
          return d;
        }, D.addEventListener("matchMediaInit", function() {
          nu(), io();
        }), D.addEventListener("matchMediaRevert", function() {
          return iu();
        }), D.addEventListener("matchMedia", function() {
          Br(0, 1), Zr("matchMedia");
        }), D.matchMedia().add("(orientation: portrait)", function() {
          return ss(), ss;
        })) : console.warn("Requires GSAP 3.11.0 or later"), ss(), Re(ee, "scroll", ni);
        var t = j.hasAttribute("style"), i = j.style, n = i.borderTopStyle, s = D.core.Animation.prototype, o, u;
        for (s.revert || Object.defineProperty(s, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), i.borderTopStyle = "solid", o = nr(j), Me.m = Math.round(o.top + Me.sc()) || 0, nt.m = Math.round(o.left + nt.sc()) || 0, n ? i.borderTopStyle = n : i.removeProperty("border-top-style"), t || (j.setAttribute("style", ""), j.removeAttribute("style")), dn = setInterval(Ao, 250), D.delayedCall(0.5, function() {
          return _n = 0;
        }), Re(ee, "touchcancel", qt), Re(j, "touchstart", qt), gn(Re, ee, "pointerdown,touchstart,mousedown", Oo), gn(Re, ee, "pointerup,touchend,mouseup", Eo), Cs = D.utils.checkPrefix("transform"), En.push(Cs), si = qe(), Bn = D.delayedCall(0.2, Br).pause(), oi = [ee, "visibilitychange", function() {
          var f = V.innerWidth, d = V.innerHeight;
          ee.hidden ? (Co = f, ko = d) : (Co !== f || ko !== d) && Li();
        }, ee, "DOMContentLoaded", Br, V, "load", Br, V, "resize", Li], pn(Re), N.forEach(function(f) {
          return f.enable(0, 1);
        }), u = 0; u < U.length; u += 3)
          mn(De, U[u], U[u + 1]), mn(De, U[u], U[u + 2]);
      } else if (ee) {
        var l = function f() {
          a.enable(), ee.removeEventListener("DOMContentLoaded", f);
        };
        ee.addEventListener("DOMContentLoaded", l);
      }
    }
  }, a.config = function(t) {
    "limitCallbacks" in t && (is = !!t.limitCallbacks);
    var i = t.syncInterval;
    i && clearInterval(dn) || (dn = i) && setInterval(Ao, i), "ignoreMobileResize" in t && (ks = a.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (pn(De) || pn(Re, t.autoRefreshEvents || "none"), $a = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, a.scrollerProxy = function(t, i) {
    var n = ot(t), s = U.indexOf(n), o = Hr(n);
    ~s && U.splice(s, o ? 6 : 2), i && (o ? Kt.unshift(V, i, j, i, vt, i) : Kt.unshift(n, i));
  }, a.clearMatchMedia = function(t) {
    N.forEach(function(i) {
      return i._ctx && i._ctx.query === t && i._ctx.kill(!0, !0);
    });
  }, a.isInViewport = function(t, i, n) {
    var s = (mt(t) ? ot(t) : t).getBoundingClientRect(), o = s[n ? qr : $r] * i || 0;
    return n ? s.right - o > 0 && s.left + o < V.innerWidth : s.bottom - o > 0 && s.top + o < V.innerHeight;
  }, a.positionInViewport = function(t, i, n) {
    mt(t) && (t = ot(t));
    var s = t.getBoundingClientRect(), o = s[n ? qr : $r], u = i == null ? o / 2 : i in Vn ? Vn[i] * o : ~i.indexOf("%") ? parseFloat(i) * o / 100 : parseFloat(i) || 0;
    return n ? (s.left + u) / V.innerWidth : (s.top + u) / V.innerHeight;
  }, a.killAll = function(t) {
    if (N.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), t !== !0) {
      var i = Kr.killAll || [];
      Kr = {}, i.forEach(function(n) {
        return n();
      });
    }
  }, a;
})();
X.version = "3.15.0";
X.saveStyles = function(a) {
  return a ? nn(a).forEach(function(e) {
    if (e && e.style) {
      var r = gt.indexOf(e);
      r >= 0 && gt.splice(r, 5), gt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), D.core.getCache(e), Ps());
    }
  }) : gt;
};
X.revert = function(a, e) {
  return io(!a, e);
};
X.create = function(a, e) {
  return new X(a, e);
};
X.refresh = function(a) {
  return a ? Li(!0) : (si || X.register()) && Br(!0);
};
X.update = function(a) {
  return ++U.cache && or(a === !0 ? 2 : 0);
};
X.clearScrollMemory = su;
X.maxScroll = function(a, e) {
  return Ht(a, e ? nt : Me);
};
X.getScrollFunc = function(a, e) {
  return Pr(ot(a), e ? nt : Me);
};
X.getById = function(a) {
  return Os[a];
};
X.getAll = function() {
  return N.filter(function(a) {
    return a.vars.id !== "ScrollSmoother";
  });
};
X.isScrolling = function() {
  return !!At;
};
X.snapDirectional = ro;
X.addEventListener = function(a, e) {
  var r = Kr[a] || (Kr[a] = []);
  ~r.indexOf(e) || r.push(e);
};
X.removeEventListener = function(a, e) {
  var r = Kr[a], t = r && r.indexOf(e);
  t >= 0 && r.splice(t, 1);
};
X.batch = function(a, e) {
  var r = [], t = {}, i = e.interval || 0.016, n = e.batchMax || 1e9, s = function(l, f) {
    var d = [], _ = [], c = D.delayedCall(i, function() {
      f(d, _), d = [], _ = [];
    }).pause();
    return function(g) {
      d.length || c.restart(!0), d.push(g.trigger), _.push(g), n <= d.length && c.progress(1);
    };
  }, o;
  for (o in e)
    t[o] = o.substr(0, 2) === "on" && Ge(e[o]) && o !== "onRefreshInit" ? s(o, e[o]) : e[o];
  return Ge(n) && (n = n(), Re(X, "refresh", function() {
    return n = e.batchMax();
  })), nn(a).forEach(function(u) {
    var l = {};
    for (o in t)
      l[o] = t[o];
    l.trigger = u, r.push(X.create(l));
  }), r;
};
var Xo = function(e, r, t, i) {
  return r > i ? e(i) : r < 0 && e(0), t > i ? (i - r) / (t - r) : t < 0 ? r / (r - t) : 1;
}, as = function a(e, r) {
  r === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (xe.isTouch ? " pinch-zoom" : "") : "none", e === vt && a(j, r);
}, bn = {
  auto: 1,
  scroll: 1
}, Wl = function(e) {
  var r = e.event, t = e.target, i = e.axis, n = (r.changedTouches ? r.changedTouches[0] : r).target, s = n._gsap || D.core.getCache(n), o = qe(), u;
  if (!s._isScrollT || o - s._isScrollT > 2e3) {
    for (; n && n !== j && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(bn[(u = Et(n)).overflowY] || bn[u.overflowX])); )
      n = n.parentNode;
    s._isScroll = n && n !== t && !Hr(n) && (bn[(u = Et(n)).overflowY] || bn[u.overflowX]), s._isScrollT = o;
  }
  (s._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, uu = function(e, r, t, i) {
  return xe.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: i = i && Wl,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return t && Re(ee, xe.eventTypes[0], No, !1, !0);
    },
    onDisable: function() {
      return De(ee, xe.eventTypes[0], No, !0);
    }
  });
}, ql = /(input|label|select|textarea)/i, Bo, No = function(e) {
  var r = ql.test(e.target.tagName);
  (r || Bo) && (e._gsapAllow = !0, Bo = r);
}, $l = function(e) {
  Yr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var r = e, t = r.normalizeScrollX, i = r.momentum, n = r.allowNestedScroll, s = r.onRelease, o, u, l = ot(e.target) || vt, f = D.core.globals().ScrollSmoother, d = f && f.get(), _ = pr && (e.content && ot(e.content) || d && e.content !== !1 && !d.smooth() && d.content()), c = Pr(l, Me), g = Pr(l, nt), h = 1, p = (xe.isTouch && V.visualViewport ? V.visualViewport.scale * V.visualViewport.width : V.outerWidth) / V.innerWidth, v = 0, b = Ge(i) ? function() {
    return i(o);
  } : function() {
    return i || 2.8;
  }, S, w, T = uu(l, e.type, !0, n), M = function() {
    return w = !1;
  }, x = qt, P = qt, k = function() {
    u = Ht(l, Me), P = Vi(pr ? 1 : 0, u), t && (x = Vi(0, Ht(l, nt))), S = Gr;
  }, C = function() {
    _._gsap.y = zi(parseFloat(_._gsap.y) + c.offset) + "px", _.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(_._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, B = function() {
    if (w) {
      requestAnimationFrame(M);
      var Z = zi(o.deltaY / 2), te = P(c.v - Z);
      if (_ && te !== c.v + c.offset) {
        c.offset = te - c.v;
        var m = zi((parseFloat(_ && _._gsap.y) || 0) - c.offset);
        _.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + m + ", 0, 1)", _._gsap.y = m + "px", c.cacheID = U.cache, or();
      }
      return !0;
    }
    c.offset && C(), w = !0;
  }, E, H, I, K, q = function() {
    k(), E.isActive() && E.vars.scrollY > u && (c() > u ? E.progress(1) && c(u) : E.resetTo("scrollY", u));
  };
  return _ && D.set(_, {
    y: "+=0"
  }), e.ignoreCheck = function(A) {
    return pr && A.type === "touchmove" && B() || h > 1.05 && A.type !== "touchstart" || o.isGesturing || A.touches && A.touches.length > 1;
  }, e.onPress = function() {
    w = !1;
    var A = h;
    h = zi((V.visualViewport && V.visualViewport.scale || 1) / p), E.pause(), A !== h && as(l, h > 1.01 ? !0 : t ? !1 : "x"), H = g(), I = c(), k(), S = Gr;
  }, e.onRelease = e.onGestureStart = function(A, Z) {
    if (c.offset && C(), !Z)
      K.restart(!0);
    else {
      U.cache++;
      var te = b(), m, se;
      t && (m = g(), se = m + te * 0.05 * -A.velocityX / 0.227, te *= Xo(g, m, se, Ht(l, nt)), E.vars.scrollX = x(se)), m = c(), se = m + te * 0.05 * -A.velocityY / 0.227, te *= Xo(c, m, se, Ht(l, Me)), E.vars.scrollY = P(se), E.invalidate().duration(te).play(0.01), (pr && E.vars.scrollY >= u || m >= u - 1) && D.to({}, {
        onUpdate: q,
        duration: te
      });
    }
    s && s(A);
  }, e.onWheel = function() {
    E._ts && E.pause(), qe() - v > 1e3 && (S = 0, v = qe());
  }, e.onChange = function(A, Z, te, m, se) {
    if (Gr !== S && k(), Z && t && g(x(m[2] === Z ? H + (A.startX - A.x) : g() + Z - m[1])), te) {
      c.offset && C();
      var Ke = se[2] === te, zt = Ke ? I + A.startY - A.y : c() + te - se[1], he = P(zt);
      Ke && zt !== he && (I += he - zt), c(he);
    }
    (te || Z) && or();
  }, e.onEnable = function() {
    as(l, t ? !1 : "x"), X.addEventListener("refresh", q), Re(V, "resize", q), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = g.smooth = !1), T.enable();
  }, e.onDisable = function() {
    as(l, !0), De(V, "resize", q), X.removeEventListener("refresh", q), T.kill();
  }, e.lockAxis = e.lockAxis !== !1, o = new xe(e), o.iOS = pr, pr && !c() && c(1), pr && D.ticker.add(qt), K = o._dc, E = D.to(o, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: au(c, c(), function() {
        return E.pause();
      })
    },
    onUpdate: or,
    onComplete: K.vars.onComplete
  }), o;
};
X.sort = function(a) {
  if (Ge(a))
    return N.sort(a);
  var e = V.pageYOffset || 0;
  return X.getAll().forEach(function(r) {
    return r._sortY = r.trigger ? e + r.trigger.getBoundingClientRect().top : r.start + V.innerHeight;
  }), N.sort(a || function(r, t) {
    return (r.vars.refreshPriority || 0) * -1e6 + (r.vars.containerAnimation ? 1e6 : r._sortY) - ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6);
  });
};
X.observe = function(a) {
  return new xe(a);
};
X.normalizeScroll = function(a) {
  if (typeof a > "u")
    return tt;
  if (a === !0 && tt)
    return tt.enable();
  if (a === !1) {
    tt && tt.kill(), tt = a;
    return;
  }
  var e = a instanceof xe ? a : $l(a);
  return tt && tt.target === e.target && tt.kill(), Hr(e.target) && (tt = e), e;
};
X.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Ss,
  _inputObserver: uu,
  _scrollers: U,
  _proxies: Kt,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      At || Zr("scrollStart"), At = qe();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return We;
    }
  }
};
Za() && D.registerPlugin(X);
Ce.registerPlugin(X);
function Gl(a) {
  const e = document.querySelector(".envelope-scene"), r = document.getElementById("envelope-overlay");
  let t;
  return {
    open(i) {
      var n;
      (n = a == null ? void 0 : a.burst) == null || n.call(a), t = Ce.timeline({ defaults: { ease: "power2.inOut" } }), t.call(() => e.classList.add("is-opening", "is-unsealing")).call(() => e.classList.add("is-flap-open"), [], 0.38).call(() => e.classList.add("is-letter-rising"), [], 1.05).call(() => {
        e.classList.add("is-portal"), r.classList.add("is-transitioning");
      }, [], 2.02).call(i, [], 2.92);
    },
    dispose() {
      t == null || t.kill(), a == null || a.dispose();
    }
  };
}
function Hl() {
  const a = document.getElementById("petals-canvas"), e = matchMedia("(prefers-reduced-motion: reduce)");
  if (!a || e.matches) return;
  const r = a.getContext("2d"), t = [];
  let i = 0, n = 0, s = 0, o = 0, u = window.scrollY, l = 0;
  function f() {
    const h = Math.min(devicePixelRatio, 1.5);
    i = innerWidth, n = innerHeight, a.width = i * h, a.height = n * h, a.style.width = `${i}px`, a.style.height = `${n}px`, r.setTransform(h, 0, 0, h, 0, 0);
  }
  function d(h, p = !1) {
    h.x = Math.random() * i, h.y = p ? Math.random() * n : -26, h.size = 5.5 + Math.random() * 6.5, h.speed = 0.28 + Math.random() * 0.42, h.sway = Math.random() * Math.PI * 2, h.swaySpeed = 8e-3 + Math.random() * 6e-3, h.spin = Math.random() * Math.PI * 2, h.spinSpeed = 0.012 + Math.random() * 0.01, h.opacity = 0.16 + Math.random() * 0.22, h.colorType = Math.floor(Math.random() * 3);
  }
  f();
  const _ = innerWidth < 768 ? 14 : 22;
  for (let h = 0; h < _; h++) {
    const p = {};
    d(p, !0), t.push(p);
  }
  window.addEventListener("scroll", () => {
    const h = window.scrollY;
    l = Math.max(-2, Math.min(2, (h - u) * 0.04)), u = h;
  }, { passive: !0 });
  let c = 0;
  window.addEventListener("touchstart", (h) => {
    var p;
    (p = h.touches) != null && p.length && (c = h.touches[0].clientY);
  }, { passive: !0 }), window.addEventListener("touchmove", (h) => {
    var p;
    if ((p = h.touches) != null && p.length) {
      const v = h.touches[0].clientY - c;
      l = Math.max(-2.5, Math.min(2.5, -v * 0.08)), c = h.touches[0].clientY;
    }
  }, { passive: !0 });
  function g(h = 0) {
    if (document.hidden || e.matches) {
      s = 0;
      return;
    }
    s = requestAnimationFrame(g), !(h - o < 30) && (o = h, l *= 0.92, r.clearRect(0, 0, i, n), t.forEach((p) => {
      p.y += p.speed + l * 0.25, p.sway += p.swaySpeed, p.spin += p.spinSpeed, p.x += Math.sin(p.sway) * 0.35, p.y > n + 25 && d(p), p.y < -30 && (p.y = n + 10), r.save(), r.translate(p.x, p.y), r.rotate(p.spin), r.scale(Math.cos(p.spin), Math.sin(p.sway) * 0.35 + 0.65), r.globalAlpha = p.opacity;
      const v = r.createLinearGradient(0, -p.size, 0, p.size);
      p.colorType === 0 ? (v.addColorStop(0, "#FFE8B3"), v.addColorStop(0.5, "#D4AF37"), v.addColorStop(1, "#B38B29")) : p.colorType === 1 ? (v.addColorStop(0, "#FFFDF5"), v.addColorStop(0.7, "#E5C478"), v.addColorStop(1, "#C5A059")) : (v.addColorStop(0, "#FFEFCC"), v.addColorStop(1, "#D8A843")), r.fillStyle = v, r.beginPath(), r.moveTo(0, -p.size), r.bezierCurveTo(p.size * 0.95, -p.size * 0.45, p.size * 0.95, p.size * 0.5, 0, p.size), r.bezierCurveTo(-p.size * 0.95, p.size * 0.5, -p.size * 0.95, -p.size * 0.45, 0, -p.size), r.fill(), r.restore();
    }));
  }
  addEventListener("resize", f, { passive: !0 }), document.addEventListener("visibilitychange", () => {
    !document.hidden && !s && !e.matches && (s = requestAnimationFrame(g));
  }), s = requestAnimationFrame(g);
}
function Kl() {
  const a = Ce.matchMedia();
  a.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
    const e = document.querySelectorAll(".event-card, .family-card, .gallery-slide-card"), r = [];
    return e.forEach((t) => {
      const i = Ce.quickTo(t, "rotationX", { duration: 0.42, ease: "power2.out" }), n = Ce.quickTo(t, "rotationY", { duration: 0.42, ease: "power2.out" }), s = (u) => {
        const l = t.getBoundingClientRect();
        i((0.5 - (u.clientY - l.top) / l.height) * 4.2), n(((u.clientX - l.left) / l.width - 0.5) * 5.2);
      }, o = () => {
        i(0), n(0);
      };
      t.addEventListener("pointermove", s), t.addEventListener("pointerleave", o), r.push(() => {
        t.removeEventListener("pointermove", s), t.removeEventListener("pointerleave", o), Ce.set(t, { clearProps: "rotationX,rotationY" });
      });
    }), () => r.forEach((t) => t());
  }), a.add("(hover: none) and (pointer: coarse) and (prefers-reduced-motion: no-preference)", () => {
    const e = document.querySelectorAll(".event-card, .family-card"), r = [];
    return e.forEach((t) => {
      const i = () => {
        Ce.to(t, { scale: 0.982, duration: 0.18, ease: "power2.out" });
      }, n = () => {
        Ce.to(t, { scale: 1, duration: 0.32, ease: "back.out(1.4)" });
      };
      t.addEventListener("touchstart", i, { passive: !0 }), t.addEventListener("touchend", n, { passive: !0 }), t.addEventListener("touchcancel", n, { passive: !0 }), r.push(() => {
        t.removeEventListener("touchstart", i), t.removeEventListener("touchend", n), t.removeEventListener("touchcancel", n), Ce.set(t, { clearProps: "scale" });
      });
    }), () => r.forEach((t) => t());
  });
}
function Zl() {
  const a = Ce.matchMedia();
  ["#hero", "#family", "#events", "#story", "#memory-film", "#gallery", "#rsvp", "#guestbook"].forEach((t) => {
    var i;
    return (i = document.querySelector(t)) == null ? void 0 : i.classList.add("cinematic-scene");
  });
  const r = (t, i, n, s = {}) => document.querySelector(t) ? Ce.fromTo(t, {
    transformPerspective: 1400,
    transformOrigin: "50% 50%",
    opacity: 0.28,
    ...n
  }, {
    x: 0,
    y: 0,
    z: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scale: 1,
    opacity: 1,
    stagger: s.stagger || 0,
    ease: "none",
    scrollTrigger: {
      trigger: i,
      start: s.start || "top 90%",
      end: s.end || "top 34%",
      scrub: s.scrub || 0.65,
      invalidateOnRefresh: !0
    }
  }) : null;
  a.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    document.documentElement.dataset.cinematicScroll = "true", Ce.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: !0
      }
    }).to(".hero-copy", { y: -54, z: -100, opacity: 0.36, ease: "none" }, 0).to(".hero-photo-wrapper", { y: 34, z: 110, rotationY: -3.8, rotationX: 1.8, scale: 1.038, ease: "none" }, 0).to(".countdown-box", { y: 64, z: 75, rotationX: -2.4, ease: "none" }, 0), r(
      "#family .invitation-intro-card > .section-subtitle, #family .invitation-intro-card > .section-title, #family .invitation-intro-card > .ornament-divider, #family .intro-lead-text",
      "#family",
      { y: 62, z: -115, rotationX: 7 },
      { stagger: 0.035, start: "top 92%", end: "top 42%" }
    ), r(
      "#family .family-card",
      "#family .families-grid",
      { y: 82, z: -145, rotationY: 7.5, rotationX: 2.5 },
      { stagger: 0.08, start: "top 92%", end: "top 38%" }
    ), r(
      "#events .section-title-wrap",
      "#events",
      { y: 64, z: -125, rotationX: 8 },
      { start: "top 92%", end: "top 48%" }
    ), r(
      "#events .event-card",
      "#events .events-grid",
      { y: 92, z: -175, rotationX: 8.5, scale: 0.94 },
      { stagger: 0.09, start: "top 90%", end: "top 26%", scrub: 0.8 }
    ), document.querySelectorAll("#story .timeline-item").forEach((i, n) => {
      Ce.fromTo(i, {
        x: n % 2 ? 74 : -74,
        y: 44,
        z: -145,
        rotationY: n % 2 ? -8 : 8,
        opacity: 0.22,
        transformPerspective: 1500,
        transformOrigin: n % 2 ? "100% 50%" : "0% 50%"
      }, {
        x: 0,
        y: 0,
        z: 0,
        rotationY: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: i,
          start: "top 92%",
          end: "top 43%",
          scrub: 0.7,
          toggleClass: "is-focused",
          invalidateOnRefresh: !0
        }
      });
    }), r(
      "#memory-film .memory-film-copy",
      "#memory-film",
      { x: -84, z: -135, rotationY: 7 },
      { start: "top 90%", end: "top 36%" }
    ), r(
      "#memory-film .memory-film-player",
      "#memory-film",
      { x: 88, z: -180, rotationY: -8, scale: 0.94 },
      { start: "top 86%", end: "top 30%", scrub: 0.8 }
    ), r(
      "#gallery .section-title-wrap",
      "#gallery",
      { y: 58, z: -105, rotationX: 6 },
      { start: "top 92%", end: "top 50%" }
    ), r(
      "#gallery .gallery-slide-card",
      "#gallery .gallery-slider-wrapper",
      { y: 76, z: -190, rotationY: 9, scale: 0.9 },
      { stagger: 0.055, start: "top 94%", end: "top 28%", scrub: 0.85 }
    ), r(
      "#rsvp .section-title-wrap",
      "#rsvp",
      { y: 52, z: -105, rotationX: 6 },
      { start: "top 92%", end: "top 52%" }
    ), r(
      "#rsvp .rsvp-wrapper",
      "#rsvp .rsvp-wrapper",
      { y: 92, z: -190, rotationX: 8.5, scale: 0.955 },
      { start: "top 94%", end: "top 28%", scrub: 0.8 }
    ), r(
      "#guestbook .section-title-wrap, #guestbook .wish-item",
      "#guestbook",
      { y: 70, z: -120, rotationX: 6 },
      { stagger: 0.045, start: "top 92%", end: "top 32%" }
    ), r(
      ".footer .footer-thank-you, .footer .footer-names, .footer .footer-quote",
      ".footer",
      { y: 72, z: -130, rotationX: 7, scale: 0.95 },
      { stagger: 0.045, start: "top 94%", end: "top 44%" }
    );
  }), a.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
    document.documentElement.dataset.cinematicScroll = "true", Ce.timeline({
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.5 }
    }).to(".hero-copy", { y: -36, opacity: 0.34, ease: "none" }, 0).to(".hero-photo-wrapper", { y: 28, scale: 1.045, rotationX: 2.8, ease: "none" }, 0).to(".countdown-box", { y: 38, scale: 0.965, ease: "none" }, 0);
    const i = (s, o, u, l = {}) => {
      document.querySelectorAll(s).forEach((f) => {
        Ce.fromTo(f, {
          transformPerspective: 1100,
          transformOrigin: "50% 50%",
          opacity: 0.32,
          ...u
        }, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: o || f,
            start: l.start || "top 93%",
            end: l.end || "top 65%",
            scrub: l.scrub || 0.42,
            invalidateOnRefresh: !0
          }
        });
      });
    };
    i(
      "#family .family-card",
      "#family .families-grid",
      { y: 52, rotationX: 6.8, scale: 0.94 },
      { scrub: 0.45 }
    ), i(
      "#events .event-card",
      "#events .events-grid",
      { y: 56, rotationX: 7.2, scale: 0.93 },
      { scrub: 0.45 }
    ), document.querySelectorAll("#story .timeline-item").forEach((s) => {
      Ce.fromTo(s, {
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
        y: 44,
        rotationX: 5.5,
        scale: 0.94,
        opacity: 0.32
      }, {
        y: 0,
        rotationX: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: s,
          start: "top 92%",
          end: "top 60%",
          scrub: 0.42,
          toggleClass: "is-focused",
          invalidateOnRefresh: !0
        }
      });
    }), i(
      "#memory-film .memory-film-player",
      "#memory-film",
      { y: 48, rotationX: 6.5, scale: 0.92 },
      { scrub: 0.45 }
    ), i(
      "#gallery .gallery-slider-wrapper",
      "#gallery",
      { y: 45, rotationX: 5.5, scale: 0.93 },
      { scrub: 0.45 }
    ), i(
      "#rsvp .rsvp-wrapper",
      "#rsvp",
      { y: 42, rotationX: 4.5, scale: 0.95 }
    ), i(
      "#guestbook .wish-item",
      "#guestbook",
      { y: 34, rotationX: 4, scale: 0.96 }
    ), i(
      ".footer .footer-thank-you",
      ".footer",
      { y: 32, rotationX: 4, scale: 0.96 }
    ), [
      "#family .invitation-intro-card",
      "#events .section-title-wrap",
      "#story .section-title-wrap",
      "#memory-film .memory-film-copy",
      "#gallery .section-title-wrap",
      "#rsvp .section-title-wrap",
      "#guestbook .section-title-wrap"
    ].forEach((s) => {
      document.querySelectorAll(s).forEach((o) => {
        Ce.fromTo(o, { y: 26, opacity: 0.45 }, {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: o,
            start: "top 94%",
            end: "top 70%",
            scrub: 0.35,
            invalidateOnRefresh: !0
          }
        });
      });
    });
  }), matchMedia("(prefers-reduced-motion: reduce)").matches && (document.documentElement.dataset.cinematicScroll = "reduced");
}
async function Ql() {
  var e;
  document.documentElement.dataset.weddingReady || await new Promise((r) => document.addEventListener("wedding:ready", r, { once: !0 }));
  let a;
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
    try {
      const { createEnvelopeAtmosphere: r } = await import("./silk-scene-C3YXL0wU.js");
      a = r(document.getElementById("silk-stage"));
    } catch (r) {
      console.info("Không tải được lớp ánh sáng 3D, thiệp vẫn dùng chuyển động gốc.", r.message);
    }
  window.SilkOpening.setScene(Gl(a)), Hl(), Kl(), Zl(), document.addEventListener("wedding:opened", () => {
    X.refresh(), requestAnimationFrame(() => X.update());
  }), (e = document.fonts) == null || e.ready.then(() => X.refresh()), addEventListener("load", () => X.refresh(), { once: !0 }), document.addEventListener("visibilitychange", () => {
    document.hidden ? Ce.globalTimeline.pause() : Ce.globalTimeline.resume();
  }), document.documentElement.dataset.silkReady = "true";
}
Ql().catch((a) => console.info("Thiệp dùng chuyển động dự phòng.", a.message));
