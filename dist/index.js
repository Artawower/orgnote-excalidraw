let hi;
// @__NO_SIDE_EFFECTS__
function lo(e) {
  return {
    lang: e?.lang ?? hi?.lang,
    message: e?.message,
    abortEarly: e?.abortEarly ?? hi?.abortEarly,
    abortPipeEarly: e?.abortPipeEarly ?? hi?.abortPipeEarly
  };
}
let ho;
// @__NO_SIDE_EFFECTS__
function uo(e) {
  return ho?.get(e);
}
let go;
// @__NO_SIDE_EFFECTS__
function po(e) {
  return go?.get(e);
}
let yo;
// @__NO_SIDE_EFFECTS__
function bo(e, t) {
  return yo?.get(e)?.get(t);
}
// @__NO_SIDE_EFFECTS__
function Ra(e) {
  const t = typeof e;
  return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && Object.getPrototypeOf(e)?.constructor?.name) ?? "null" : t;
}
function Gr(e, t, i, r, a) {
  const n = a && "input" in a ? a.input : i.value, o = a?.expected ?? e.expects ?? null, s = a?.received ?? /* @__PURE__ */ Ra(n), f = {
    kind: e.kind,
    type: e.type,
    input: n,
    expected: o,
    received: s,
    message: `Invalid ${t}: ${o ? `Expected ${o} but r` : "R"}eceived ${s}`,
    requirement: e.requirement,
    path: a?.path,
    issues: a?.issues,
    lang: r.lang,
    abortEarly: r.abortEarly,
    abortPipeEarly: r.abortPipeEarly
  }, h = e.kind === "schema", c = a?.message ?? e.message ?? /* @__PURE__ */ bo(e.reference, f.lang) ?? (h ? /* @__PURE__ */ po(f.lang) : null) ?? r.message ?? /* @__PURE__ */ uo(f.lang);
  c !== void 0 && (f.message = typeof c == "function" ? c(f) : c), h && (i.typed = !1), i.issues ? i.issues.push(f) : i.issues = [f];
}
// @__NO_SIDE_EFFECTS__
function Sr(e) {
  return {
    version: 1,
    vendor: "valibot",
    validate(t) {
      return e["~run"]({ value: t }, /* @__PURE__ */ lo());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
  return {
    kind: "metadata",
    type: "metadata",
    reference: xr,
    metadata: e
  };
}
// @__NO_SIDE_EFFECTS__
function wo(e, t, i) {
  return typeof e.fallback == "function" ? e.fallback(t, i) : e.fallback;
}
// @__NO_SIDE_EFFECTS__
function Ia(e, t, i) {
  return typeof e.default == "function" ? e.default(t, i) : e.default;
}
// @__NO_SIDE_EFFECTS__
function _a(e, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: _a,
    expects: /* @__PURE__ */ Ra(e),
    async: !1,
    literal: e,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ Sr(this);
    },
    "~run"(i, r) {
      return i.value === this.literal ? i.typed = !0 : Gr(this, "type", i, r), i;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Oa(e, t) {
  return {
    kind: "schema",
    type: "object",
    reference: Oa,
    expects: "Object",
    async: !1,
    entries: e,
    message: t,
    get "~standard"() {
      return /* @__PURE__ */ Sr(this);
    },
    "~run"(i, r) {
      const a = i.value;
      if (a && typeof a == "object") {
        i.typed = !0, i.value = {};
        for (const n in this.entries) {
          const o = this.entries[n];
          if (n in a || (o.type === "exact_optional" || o.type === "optional" || o.type === "nullish") && o.default !== void 0) {
            const s = n in a ? a[n] : /* @__PURE__ */ Ia(o), f = o["~run"]({ value: s }, r);
            if (f.issues) {
              const h = {
                type: "object",
                origin: "value",
                input: a,
                key: n,
                value: s
              };
              for (const c of f.issues)
                c.path ? c.path.unshift(h) : c.path = [h], i.issues?.push(c);
              if (i.issues || (i.issues = f.issues), r.abortEarly) {
                i.typed = !1;
                break;
              }
            }
            f.typed || (i.typed = !1), i.value[n] = f.value;
          } else if (o.fallback !== void 0) i.value[n] = /* @__PURE__ */ wo(o);
          else if (o.type !== "exact_optional" && o.type !== "optional" && o.type !== "nullish" && (Gr(this, "key", i, r, {
            input: void 0,
            expected: `"${n}"`,
            path: [{
              type: "object",
              origin: "key",
              input: a,
              key: n,
              value: a[n]
            }]
          }), r.abortEarly))
            break;
        }
      } else Gr(this, "type", i, r);
      return i;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
  return {
    kind: "schema",
    type: "optional",
    reference: Bi,
    expects: `(${e.expects} | undefined)`,
    async: !1,
    wrapped: e,
    default: t,
    get "~standard"() {
      return /* @__PURE__ */ Sr(this);
    },
    "~run"(i, r) {
      return i.value === void 0 && (this.default !== void 0 && (i.value = /* @__PURE__ */ Ia(this, i, r)), i.value === void 0) ? (i.typed = !0, i) : this.wrapped["~run"](i, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function zr(e) {
  return {
    kind: "schema",
    type: "string",
    reference: zr,
    expects: "string",
    async: !1,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ Sr(this);
    },
    "~run"(t, i) {
      return typeof t.value == "string" ? t.typed = !0 : Gr(this, "type", t, i), t;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function ui(...e) {
  return {
    ...e[0],
    pipe: e,
    get "~standard"() {
      return /* @__PURE__ */ Sr(this);
    },
    "~run"(t, i) {
      for (const r of e) if (r.kind !== "metadata") {
        if (t.issues && (r.kind === "schema" || r.kind === "transformation")) {
          t.typed = !1;
          break;
        }
        (!t.issues || !i.abortEarly && !i.abortPipeEarly) && (t = r["~run"](t, i));
      }
      return t;
    }
  };
}
const Eo = {
  withStackTrace: !1
}, Pa = (e, t, i = Eo) => {
  const r = t.isOk() ? { type: "Ok", value: t.value } : { type: "Err", value: t.error }, a = i.withStackTrace ? new Error().stack : void 0;
  return {
    data: r,
    message: e,
    stack: a
  };
};
function vt(e, t, i, r) {
  function a(n) {
    return n instanceof i ? n : new i(function(o) {
      o(n);
    });
  }
  return new (i || (i = Promise))(function(n, o) {
    function s(c) {
      try {
        h(r.next(c));
      } catch (l) {
        o(l);
      }
    }
    function f(c) {
      try {
        h(r.throw(c));
      } catch (l) {
        o(l);
      }
    }
    function h(c) {
      c.done ? n(c.value) : a(c.value).then(s, f);
    }
    h((r = r.apply(e, [])).next());
  });
}
function un(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, i = t && e[t], r = 0;
  if (i) return i.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ye(e) {
  return this instanceof Ye ? (this.v = e, this) : new Ye(e);
}
function dn(e, t, i) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = i.apply(e, t || []), a, n = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", o), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function o(d) {
    return function(g) {
      return Promise.resolve(g).then(d, l);
    };
  }
  function s(d, g) {
    r[d] && (a[d] = function(b) {
      return new Promise(function(T, A) {
        n.push([d, b, T, A]) > 1 || f(d, b);
      });
    }, g && (a[d] = g(a[d])));
  }
  function f(d, g) {
    try {
      h(r[d](g));
    } catch (b) {
      u(n[0][3], b);
    }
  }
  function h(d) {
    d.value instanceof Ye ? Promise.resolve(d.value.v).then(c, l) : u(n[0][2], d);
  }
  function c(d) {
    f("next", d);
  }
  function l(d) {
    f("throw", d);
  }
  function u(d, g) {
    d(g), n.shift(), n.length && f(n[0][0], n[0][1]);
  }
}
function mo(e) {
  var t, i;
  return t = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function r(a, n) {
    t[a] = e[a] ? function(o) {
      return (i = !i) ? { value: Ye(e[a](o)), done: !1 } : n ? n(o) : o;
    } : n;
  }
}
function vo(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], i;
  return t ? t.call(e) : (e = typeof un == "function" ? un(e) : e[Symbol.iterator](), i = {}, r("next"), r("throw"), r("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function r(n) {
    i[n] = e[n] && function(o) {
      return new Promise(function(s, f) {
        o = e[n](o), a(s, f, o.done, o.value);
      });
    };
  }
  function a(n, o, s, f) {
    Promise.resolve(f).then(function(h) {
      n({ value: h, done: s });
    }, o);
  }
}
class le {
  constructor(t) {
    this._promise = t;
  }
  static fromSafePromise(t) {
    const i = t.then((r) => new Me(r));
    return new le(i);
  }
  static fromPromise(t, i) {
    const r = t.then((a) => new Me(a)).catch((a) => new Le(i(a)));
    return new le(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromThrowable(t, i) {
    return (...r) => new le(vt(this, void 0, void 0, function* () {
      try {
        return new Me(yield t(...r));
      } catch (a) {
        return new Le(i ? i(a) : a);
      }
    }));
  }
  static combine(t) {
    return Ao(t);
  }
  static combineWithAllErrors(t) {
    return To(t);
  }
  map(t) {
    return new le(this._promise.then((i) => vt(this, void 0, void 0, function* () {
      return i.isErr() ? new Le(i.error) : new Me(yield t(i.value));
    })));
  }
  andThrough(t) {
    return new le(this._promise.then((i) => vt(this, void 0, void 0, function* () {
      if (i.isErr())
        return new Le(i.error);
      const r = yield t(i.value);
      return r.isErr() ? new Le(r.error) : new Me(i.value);
    })));
  }
  andTee(t) {
    return new le(this._promise.then((i) => vt(this, void 0, void 0, function* () {
      if (i.isErr())
        return new Le(i.error);
      try {
        yield t(i.value);
      } catch {
      }
      return new Me(i.value);
    })));
  }
  orTee(t) {
    return new le(this._promise.then((i) => vt(this, void 0, void 0, function* () {
      if (i.isOk())
        return new Me(i.value);
      try {
        yield t(i.error);
      } catch {
      }
      return new Le(i.error);
    })));
  }
  mapErr(t) {
    return new le(this._promise.then((i) => vt(this, void 0, void 0, function* () {
      return i.isOk() ? new Me(i.value) : new Le(yield t(i.error));
    })));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(t) {
    return new le(this._promise.then((i) => {
      if (i.isErr())
        return new Le(i.error);
      const r = t(i.value);
      return r instanceof le ? r._promise : r;
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  orElse(t) {
    return new le(this._promise.then((i) => vt(this, void 0, void 0, function* () {
      return i.isErr() ? t(i.error) : new Me(i.value);
    })));
  }
  match(t, i) {
    return this._promise.then((r) => r.match(t, i));
  }
  unwrapOr(t) {
    return this._promise.then((i) => i.unwrapOr(t));
  }
  /**
   * @deprecated will be removed in 9.0.0.
   *
   * You can use `safeTry` without this method.
   * @example
   * ```typescript
   * safeTry(async function* () {
   *   const okValue = yield* yourResult
   * })
   * ```
   * Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
   */
  safeUnwrap() {
    return dn(this, arguments, function* () {
      return yield Ye(yield Ye(yield* mo(vo(yield Ye(this._promise.then((i) => i.safeUnwrap()))))));
    });
  }
  // Makes ResultAsync implement PromiseLike<Result>
  then(t, i) {
    return this._promise.then(t, i);
  }
  [Symbol.asyncIterator]() {
    return dn(this, arguments, function* () {
      const i = yield Ye(this._promise);
      return i.isErr() && (yield yield Ye(Kr(i.error))), yield Ye(i.value);
    });
  }
}
function Kr(e) {
  return new le(Promise.resolve(new Le(e)));
}
const Na = (e) => {
  let t = nt([]);
  for (const i of e)
    if (i.isErr()) {
      t = Be(i.error);
      break;
    } else
      t.map((r) => r.push(i.value));
  return t;
}, Ao = (e) => le.fromSafePromise(Promise.all(e)).andThen(Na), ka = (e) => {
  let t = nt([]);
  for (const i of e)
    i.isErr() && t.isErr() ? t.error.push(i.error) : i.isErr() && t.isOk() ? t = Be([i.error]) : i.isOk() && t.isOk() && t.value.push(i.value);
  return t;
}, To = (e) => le.fromSafePromise(Promise.all(e)).andThen(ka);
var Xi;
(function(e) {
  function t(a, n) {
    return (...o) => {
      try {
        const s = a(...o);
        return nt(s);
      } catch (s) {
        return Be(n ? n(s) : s);
      }
    };
  }
  e.fromThrowable = t;
  function i(a) {
    return Na(a);
  }
  e.combine = i;
  function r(a) {
    return ka(a);
  }
  e.combineWithAllErrors = r;
})(Xi || (Xi = {}));
function nt(e) {
  return new Me(e);
}
function Be(e) {
  return new Le(e);
}
class Me {
  constructor(t) {
    this.value = t;
  }
  isOk() {
    return !0;
  }
  isErr() {
    return !this.isOk();
  }
  map(t) {
    return nt(t(this.value));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mapErr(t) {
    return nt(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(t) {
    return t(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThrough(t) {
    return t(this.value).map((i) => this.value);
  }
  andTee(t) {
    try {
      t(this.value);
    } catch {
    }
    return nt(this.value);
  }
  orTee(t) {
    return nt(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  orElse(t) {
    return nt(this.value);
  }
  asyncAndThen(t) {
    return t(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  asyncAndThrough(t) {
    return t(this.value).map(() => this.value);
  }
  asyncMap(t) {
    return le.fromSafePromise(t(this.value));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unwrapOr(t) {
    return this.value;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  match(t, i) {
    return t(this.value);
  }
  safeUnwrap() {
    const t = this.value;
    return (function* () {
      return t;
    })();
  }
  _unsafeUnwrap(t) {
    return this.value;
  }
  _unsafeUnwrapErr(t) {
    throw Pa("Called `_unsafeUnwrapErr` on an Ok", this, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-this-alias, require-yield
  *[Symbol.iterator]() {
    return this.value;
  }
}
class Le {
  constructor(t) {
    this.error = t;
  }
  isOk() {
    return !1;
  }
  isErr() {
    return !this.isOk();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map(t) {
    return Be(this.error);
  }
  mapErr(t) {
    return Be(t(this.error));
  }
  andThrough(t) {
    return Be(this.error);
  }
  andTee(t) {
    return Be(this.error);
  }
  orTee(t) {
    try {
      t(this.error);
    } catch {
    }
    return Be(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(t) {
    return Be(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  orElse(t) {
    return t(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asyncAndThen(t) {
    return Kr(this.error);
  }
  asyncAndThrough(t) {
    return Kr(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asyncMap(t) {
    return Kr(this.error);
  }
  unwrapOr(t) {
    return t;
  }
  match(t, i) {
    return i(this.error);
  }
  safeUnwrap() {
    const t = this.error;
    return (function* () {
      throw yield Be(t), new Error("Do not use this generator out of `safeTry`");
    })();
  }
  _unsafeUnwrap(t) {
    throw Pa("Called `_unsafeUnwrap` on an Err", this, t);
  }
  _unsafeUnwrapErr(t) {
    return this.error;
  }
  *[Symbol.iterator]() {
    const t = this;
    return yield t, t;
  }
}
Xi.fromThrowable;
function So(e) {
  return e != null && !(typeof e == "number" && Number.isNaN(e));
}
const Ro = (e) => e instanceof Error ? e : new Error(String(e));
function Io(e) {
  return typeof e == "object" && So(e) && "then" in e && typeof e.then == "function";
}
function _o(e) {
  if (typeof e == "function")
    return e;
  if (typeof e == "string") {
    const t = e;
    return (i) => new Error(t, { cause: i instanceof Error ? i : new Error(String(i)) });
  }
  return Ro;
}
function Nr(e, t) {
  const i = _o(t);
  return function(...r) {
    try {
      const a = e.apply(this, r);
      return Io(a) ? le.fromPromise(a, i) : nt(a);
    } catch (a) {
      return Be(i(a));
    }
  };
}
var me;
(function(e) {
  e.Root = "root", e.Headline = "headline", e.Text = "text", e.Unresolved = "unresolved", e.Operator = "operator", e.Checkbox = "checkbox", e.Indent = "indent", e.NewLine = "newLine", e.Date = "date", e.DateRange = "dateRange", e.Comment = "comment", e.TodoKeyword = "todoKeyword", e.TagList = "tagList", e.List = "list", e.ListItem = "listItem", e.Progress = "progress", e.ListTag = "listTag", e.Bold = "bold", e.Crossed = "crossed", e.InlineCode = "inlineCode", e.Underline = "underline", e.Verbatim = "verbatim", e.Italic = "italic", e.LatexFragment = "latexFragment", e.LatexEnvironment = "latexEnvironment", e.SrcBlock = "srcBlock", e.BlockHeader = "blockHeader", e.PropertyDrawer = "propertyDrawer", e.Property = "property", e.BlockProperty = "blockProperty", e.SrcLanguage = "srcLanguage", e.BlockFooter = "blockFooter", e.BlockBody = "blockBody", e.QuoteBlock = "quoteBlock", e.ExampleBlock = "exampleBlock", e.HtmlBlock = "htmlBlock", e.ExportBlock = "exportBlock", e.CommentBlock = "commentBlock", e.HeaderArg = "headerArg", e.InlineHtml = "inlineHtml", e.FixedWidth = "fixedWidth", e.Priority = "priority", e.Keyword = "keyword", e.Link = "link", e.RawLink = "rawLink", e.LinkUrl = "linkUrl", e.LinkName = "linkName", e.Entity = "entity", e.HorizontalRule = "horizontalRule", e.Planning = "planning", e.PlanningKeyword = "planningKeyword", e.Clock = "clock", e.ClockKeyword = "clockKeyword", e.ClockDuration = "clockDuration", e.Section = "section", e.Title = "title", e.Table = "table", e.TableDelimiter = "tableDelimiter", e.TableCell = "tableCell", e.TableRow = "tableRow";
})(me || (me = {}));
var Ci;
(function(e) {
  e.Headline = "headline", e.Text = "text", e.NewLine = "newLine", e.Keyword = "keyword", e.LatexEnvironmentKeyword = "latexEnvironmentKeyword", e.Bracket = "bracket", e.LatexBracket = "latexBracket", e.Comment = "comment", e.Operator = "operator", e.Indent = "indent", e.Entity = "entity", e.TableDelimiter = "tableDelimiter", e.HorizontalRule = "horizontalRule", e.TableOperator = "tableOperator", e.Link = "link", e.OpenMarkup = "openMarkup", e.CloseMarkup = "closeMarkup", e.PlanningKeyword = "planningKeyword", e.ClockKeyword = "clockKeyword";
})(Ci || (Ci = {}));
Ci.Comment;
me.Operator, me.TodoKeyword, me.Priority;
me.TagList, me.NewLine;
me.Planning, me.PropertyDrawer, me.Property, me.PlanningKeyword, me.Date, me.DateRange, me.Indent;
const Oo = ".orgnote/extensions", Po = "assets", Ua = (e) => encodeURIComponent(e);
class No extends Error {
  constructor(t) {
    super(`Extension asset is not declared: ${t}`), this.name = "ExtensionAssetNotDeclaredError";
  }
}
const ko = (e) => `${Oo}/${Ua(e)}`, Uo = (e) => `${ko(e.name)}/${Ua(e.version)}`, Lo = (e, t) => {
  const i = e.assets?.find((r) => r.path === t);
  if (!i)
    throw new No(t);
  return `${Uo(e)}/${Po}/${i.path}`;
};
var gn;
(function(e) {
  e.Multiline = "multiline", e.Inline = "inline", e.LineClass = "line-class";
})(gn || (gn = {}));
var pr;
(function(e) {
  e.REPORT_BUG = "report bug", e.OPEN_SYSTEM_INFO = "open system info", e.SHOW_LATEST_CHANGES = "show latest changes", e.CHECK_FOR_UPDATES = "check for updates", e.SHOW_LOGS = "show logs", e.APPLY_PWA_UPDATE = "apply pwa update", e.CLEAR_LOGS = "clear logs", e.TOGGLE_SIDEBAR = "toggle sidebar", e.CLOSE_SIDEBAR = "close sidebar", e.OPEN_SIDEBAR = "open sidebar", e.TOGGLE_FILE_MANAGER = "toggle file manager", e.CREATE_NOTE = "create note", e.PROJECT_INFO = "project info", e.TOGGLE_RIGHT_SIDEBAR = "toggle right sidebar", e.OPEN_RIGHT_SIDEBAR = "open right sidebar", e.CLOSE_RIGHT_SIDEBAR = "close right sidebar", e.OPEN_BACKLINKS = "open backlinks", e.OPEN_OUTLINE = "open outline", e.OPEN_LOCAL_GRAPH = "open local graph", e.LOCAL_GRAPH = "local graph", e.TOGGLE_AST_DEBUGGER = "toggle ast debugger", e.SEARCH = "search", e.TOGGLE_COMMANDS = "toggle commands", e.RESTORE_COMPLETION = "restore last completion", e.EXIT_COMMAND_EXECUTOR = "exit command executor", e.NEXT_CANDIDATE = "next candidate", e.PREV_CANDIDATE = "previous candidate", e.ACCEPT_COMPLETION_AUTOCOMPLETE = "accept completion autocomplete", e.EXECUTE_CANDIDATE = "execute candidate", e.SETTINGS = "settings", e.RESET_THEME = "reset theme", e.SELECT_THEME_MODE = "select theme mode", e.TOGGLE_DEBUG_MODE = "toggle debug mode", e.SELECT_THEME = "select theme", e.SYSTEM_SETTINGS = "system settings", e.LANGUAGE_SETTINGS = "language settings", e.INTERFACE_SETTINGS = "interface settings", e.SYNCHRONISATION_SETTINGS = "synchronisation settings", e.SUBSCRIPTION_SETTINGS = "subscription settings", e.KEYBINDINGS_SETTINGS = "keybindings settings", e.DEVELOPER_SETTINGS = "developer settings", e.EXTENSIONS_SETTINGS = "extensions", e.ENCRYPTION_SETTINGS = "encryption settings", e.API_SETTINGS = "api settings", e.AUTHENTICATION_SETTINGS = "authentication settings", e.SOURCE_CODE = "show source code", e.READ_WIKI = "read wiki", e.SPONSOR = "sponsor", e.DELETE_ALL_DATA = "delete all data", e.RESET_SYSTEM = "Reset system", e.DELETE_ALL_NOTES = "delete all notes", e.DELETE_ACCOUNT = "delete account", e.STORAGE_SETTINGS = "storage settings", e.OPEN_MY_NOTES = "my notes", e.OPEN_DASHBOARD = "dashboard", e.OPEN_PUBLIC_NOTE_LIST = "public note list", e.OPEN_NOTE_EDITOR = "edit mode", e.OPEN_NOTE_VIEWER = "view mode", e.OPEN_GRAPH = "graph", e.GRAPH_SETTINGS = "graph settings", e.OPEN_GRAPH_SETTINGS = "open graph settings", e.SELECT_FILE_PATH = "select file path", e.PICK_SYNC_DIR = "pick sync dir", e.SYNC_FILES = "sync files", e.EXPORT_LOCAL_SYNC_CONFIG = "copy CLI sync config", e.DOWNLOAD_LOCAL_SYNC_CONFIG = "download CLI sync config", e.COPY_EMACS_USE_PACKAGE_CONFIG = "copy Emacs use-package config", e.COPY_CLI_INSTALL_COMMAND = "copy CLI install command", e.RELOAD_FILES = "reload files", e.ENCRYPT_NOTE = "encrypt note", e.DECRYPT_NOTE = "decrypt note", e.UPLOAD_PRIVATE_KEY = "upload private key", e.UPLOAD_PUBLIC_KEY = "upload public key", e.GENERATE_GPG_KEYS = "generate gpg keys", e.MAXIMIZE_FILE_MANAGER = "maximize file manager", e.CREATE_FOLDER = "create folder", e.CREATE_FILE = "create file", e.RENAME_FILE = "rename file", e.DELETE_FILE = "delete file", e.COPY_FILE = "copy file", e.MOVE_FILE = "move file", e.SELECT_FILE = "select file", e.SELECT_ALL_FILES = "select all files", e.DESELECT_ALL_FILES = "deselect all files", e.EXECUTE_PENDING_FILE_OPERATION = "paste files here", e.CANCEL_PENDING_FILE_OPERATION = "cancel file operation", e.SORT_FILES = "sort files", e.CONFIRM_FILE_DELETION = "are you sure you want to delete file?", e.NEW_FILE_PATH = "new file path", e.SHOW_MOBILE_FILE_SEARCH = "show mobile file search", e.HIDE_MOBILE_FILE_SEARCH = "hide mobile file search", e.REVEAL_IN_FILE_MANAGER = "reveal in file manager", e.OPEN_NOTE = "open note", e.SHOW_FILE_INFO = "show file info", e.OPEN_FILE_ACTIONS = "open file actions", e.COPY_BUFFER_CONTENT = "copy buffer content", e.CLEAR_NOTE = "clear note", e.COPY_LINK = "copy link", e.OPEN_LINK_IN_NEW_TAB = "open link in new tab", e.OPEN_LINK_IN_ADJACENT_PANE = "open link in adjacent pane", e.TABS = "show tabs", e.SHOW_TAB_SWITCHER = "show tab switcher", e.CLOSE_TAB = "close tab", e.NEW_TAB = "new tab", e.SELECT_TAB_BY_NUMBER = "select tab by number", e.SHOW_OR_OPEN_BUFFER = "show or open buffer", e.RESIZE_PANE_LEFT = "resize pane left", e.RESIZE_PANE_RIGHT = "resize pane right", e.RESIZE_PANE_UP = "resize pane up", e.RESIZE_PANE_DOWN = "resize pane down", e.CLOSE_MODAL = "close modal", e.OPEN_QUEUE_MANAGER = "open queue manager", e.RESTART_QUEUE = "restart queue", e.STOP_QUEUE = "stop queue", e.CLEAR_QUEUE = "clear queue", e.OPEN_CRON = "open cron manager", e.CLEAR_OLD_QUEUE_TASKS = "clear old queue tasks", e.COPY_COMMAND_URL = "copy command url", e.SHOW_PERFORMANCE_REPORT = "show performance report", e.CLEAR_PERFORMANCE_REPORT = "clear performance report", e.IMPORT_EXTENSION = "import extension", e.OPEN_EXTENSIONS_MANAGER = "open extensions manager", e.OPEN_EXTENSION_SETTINGS = "extension settings", e.TOGGLE_EXTENSIONS = "toggle extensions", e.OPEN_NOTIFICATIONS = "open notifications", e.LOGIN = "login", e.LOGOUT = "logout", e.REMOVE_ACCOUNT = "remove account", e.INIT_SEARCH_INDEX = "init search index", e.EDITOR_UNDO = "undo", e.EDITOR_REDO = "redo", e.EDITOR_INSERT_HEADLINE = "insert headline", e.EDITOR_INSERT_CODE_BLOCK = "insert code block", e.EDITOR_INSERT_QUOTE = "insert quote", e.EDITOR_INSERT_LATEX = "insert latex block", e.EDITOR_INSERT_LINK = "insert link", e.EDITOR_INSERT_INTERNAL_LINK = "insert internal link", e.EDITOR_INSERT_IMAGE = "insert image", e.EDITOR_INSERT_BOLD = "insert bold", e.EDITOR_INSERT_ITALIC = "insert italic", e.EDITOR_INSERT_STRIKETHROUGH = "insert strikethrough", e.EDITOR_INSERT_INLINE_CODE = "insert inline code", e.EDITOR_INSERT_BULLET_LIST = "insert bullet list", e.EDITOR_INSERT_NUMERIC_LIST = "insert numeric list", e.EDITOR_INSERT_CHECK_LIST = "insert check list", e.EDITOR_INSERT_HORIZONTAL_RULE = "insert horizontal rule", e.EDITOR_INSERT_HTML_BLOCK = "insert html block", e.EDITOR_INSERT_TABLE = "insert table", e.EDITOR_INSERT_TAG = "insert tag", e.EDITOR_INSERT_DATETIME = "insert datetime", e.EDITOR_ADD_PROPERTY = "add property", e.EDITOR_ADD_PAGE_PROPERTY = "add page property", e.EDITOR_ADD_HEADLINE_PROPERTY = "add headline property", e.EDITOR_CARET_UP = "caret up", e.EDITOR_CARET_DOWN = "caret down", e.EDITOR_HIDE_KEYBOARD = "hide keyboard", e.HISTORY_BACK = "history back", e.HISTORY_FORWARD = "history forward", e.OPEN_FILE_SEARCH = "open file search", e.PREVIEW_NOTE = "preview note", e.SHARE_NOTE_ONETIME = "share current note one time";
})(pr || (pr = {}));
const Bo = {
  GpgKeys: "gpgKeys"
};
Bo.GpgKeys, pr.UPLOAD_PRIVATE_KEY, pr.UPLOAD_PUBLIC_KEY;
/*! OpenPGP.js v6.3.0 - 2025-12-09 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. */
const be = typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Kt = Symbol("doneWritingPromise"), La = Symbol("doneWritingResolve"), Ba = Symbol("doneWritingReject"), er = Symbol("readingIndex");
class De extends Array {
  constructor() {
    super(), Object.setPrototypeOf(this, De.prototype), this[Kt] = new Promise(((t, i) => {
      this[La] = t, this[Ba] = i;
    })), this[Kt].catch((() => {
    }));
  }
}
function Ae(e) {
  return e && e.getReader && Array.isArray(e);
}
function or(e) {
  if (!Ae(e)) {
    const t = e.getWriter(), i = t.releaseLock;
    return t.releaseLock = () => {
      t.closed.catch((function() {
      })), i.call(t);
    }, t;
  }
  this.stream = e;
}
function we(e) {
  if (Ae(e)) return "array";
  if (be.ReadableStream && be.ReadableStream.prototype.isPrototypeOf(e)) return "web";
  if (e && !(be.ReadableStream && e instanceof be.ReadableStream) && typeof e._read == "function" && typeof e._readableState == "object") throw Error("Native Node streams are no longer supported: please manually convert the stream to a WebStream, using e.g. `stream.Readable.toWeb`");
  return !(!e || !e.getReader) && "web-like";
}
function ii(e) {
  return Uint8Array.prototype.isPrototypeOf(e);
}
function Xa(e) {
  if (e.length === 1) return e[0];
  let t = 0;
  for (let a = 0; a < e.length; a++) {
    if (!ii(e[a])) throw Error("concatUint8Array: Data must be in the form of a Uint8Array");
    t += e[a].length;
  }
  const i = new Uint8Array(t);
  let r = 0;
  return e.forEach((function(a) {
    i.set(a, r), r += a.length;
  })), i;
}
De.prototype.getReader = function() {
  return this[er] === void 0 && (this[er] = 0), { read: async () => (await this[Kt], this[er] === this.length ? { value: void 0, done: !0 } : { value: this[this[er]++], done: !1 }) };
}, De.prototype.readToEnd = async function(e) {
  await this[Kt];
  const t = e(this.slice(this[er]));
  return this.length = 0, t;
}, De.prototype.clone = function() {
  const e = new De();
  return e[Kt] = this[Kt].then((() => {
    e.push(...this);
  })), e;
}, or.prototype.write = async function(e) {
  this.stream.push(e);
}, or.prototype.close = async function() {
  this.stream[La]();
}, or.prototype.abort = async function(e) {
  return this.stream[Ba](e), e;
}, or.prototype.releaseLock = function() {
}, typeof be.process == "object" && be.process.versions;
const pn = /* @__PURE__ */ new WeakSet(), ee = Symbol("externalBuffer");
function Ge(e) {
  if (this.stream = e, e[ee] && (this[ee] = e[ee].slice()), Ae(e)) {
    const i = e.getReader();
    return this._read = i.read.bind(i), this._releaseLock = () => {
    }, void (this._cancel = () => {
    });
  }
  if (we(e)) {
    const i = e.getReader();
    return this._read = i.read.bind(i), this._releaseLock = () => {
      i.closed.catch((function() {
      })), i.releaseLock();
    }, void (this._cancel = i.cancel.bind(i));
  }
  let t = !1;
  this._read = async () => t || pn.has(e) ? { value: void 0, done: !0 } : (t = !0, { value: e, done: !1 }), this._releaseLock = () => {
    if (t) try {
      pn.add(e);
    } catch {
    }
  };
}
function en(e) {
  return we(e) ? e : new ReadableStream({ start(t) {
    t.enqueue(e), t.close();
  } });
}
function Ca(e) {
  const t = we(e);
  if (t) {
    if (t !== "array") throw Error("Can't convert Stream to ArrayStream here, call `readToEnd` first");
    return e;
  }
  const i = new De();
  return (async () => {
    const r = br(i);
    await r.write(e), await r.close();
  })(), i;
}
function _e(e) {
  return e.some(((t) => we(t) && !Ae(t))) ? (function(t) {
    t = t.map(en);
    const i = Da((async function(n) {
      await Promise.all(a.map(((o) => Fo(o, n))));
    }));
    let r = Promise.resolve();
    const a = t.map(((n, o) => Co(n, ((s, f) => (r = r.then((() => Di(s, i.writable, { preventClose: o !== t.length - 1 }))), r)))));
    return i.readable;
  })(e) : e.some(((t) => Ae(t))) ? (function(t) {
    const i = new De();
    let r = Promise.resolve();
    return t.forEach(((a, n) => (r = r.then((() => Di(a, i, { preventClose: n !== t.length - 1 }))), r))), i;
  })(e) : typeof e[0] == "string" ? e.join("") : Xa(e);
}
async function Di(e, t, { preventClose: i = !1, preventAbort: r = !1, preventCancel: a = !1 } = {}) {
  if (we(e) && !Ae(e) && !Ae(t)) {
    e = en(e);
    try {
      if (e[ee]) {
        const s = br(t);
        for (let f = 0; f < e[ee].length; f++) await s.ready, await s.write(e[ee][f]);
        s.releaseLock();
      }
      await e.pipeTo(t, { preventClose: i, preventAbort: r, preventCancel: a });
    } catch {
    }
    return;
  }
  we(e) || (e = Ca(e));
  const n = Fa(e), o = br(t);
  try {
    for (; ; ) {
      await o.ready;
      const { done: s, value: f } = await n.read();
      if (s) {
        i || await o.close();
        break;
      }
      await o.write(f);
    }
  } catch (s) {
    r || await o.abort(s);
  } finally {
    n.releaseLock(), o.releaseLock();
  }
}
function Da(e) {
  let t, i, r, a = !1, n = !1;
  return { readable: new ReadableStream({ start(o) {
    r = o;
  }, pull() {
    t ? t() : a = !0;
  }, async cancel(o) {
    n = !0, e && await e(o), i && i(o);
  } }, { highWaterMark: 0 }), writable: new WritableStream({ write: async function(o) {
    if (n) throw Error("Stream is cancelled");
    r.enqueue(o), a ? a = !1 : (await new Promise(((s, f) => {
      t = s, i = f;
    })), t = null, i = null);
  }, close: r.close.bind(r), abort: r.error.bind(r) }) };
}
function Oe(e, t = () => {
}, i = () => {
}, r = { highWaterMark: 0 }) {
  if (we(e)) return Xo(e, t, i, r);
  const a = t(e), n = i();
  return a !== void 0 && n !== void 0 ? _e([a, n]) : a !== void 0 ? a : n;
}
function Xo(e, t, i, r) {
  if (Ae(e)) {
    const a = new De();
    return (async () => {
      const n = br(a);
      try {
        const o = await yr(e), s = await t(o), f = await i();
        let h;
        h = s !== void 0 && f !== void 0 ? _e([s, f]) : s !== void 0 ? s : f, await n.write(h), await n.close();
      } catch (o) {
        await n.abort(o);
      }
    })(), a;
  }
  if (we(e)) {
    let a, n = !1;
    return new ReadableStream({ start() {
      a = e.getReader();
    }, async pull(o) {
      if (n) return o.close(), void e.releaseLock();
      try {
        for (; ; ) {
          const { value: s, done: f } = await a.read();
          n = f;
          const h = await (f ? i : t)(s);
          if (h !== void 0) return void o.enqueue(h);
          if (f) return o.close(), void e.releaseLock();
        }
      } catch (s) {
        o.error(s);
      }
    }, async cancel(o) {
      await a.cancel(o);
    } }, r);
  }
  throw Error("Unreachable");
}
function Co(e, t) {
  if (we(e) && !Ae(e)) {
    let r;
    const a = new TransformStream({ start(s) {
      r = s;
    } }), n = Di(e, a.writable), o = Da((async function(s) {
      r.error(s), await n, await new Promise(((f) => setTimeout(f)));
    }));
    return t(a.readable, o.writable), o.readable;
  }
  e = Ca(e);
  const i = new De();
  return t(e, i), i;
}
function yn(e) {
  if (Ae(e)) return e.clone();
  if (we(e)) {
    const t = (function(i) {
      if (Ae(i)) throw Error("ArrayStream cannot be tee()d, use clone() instead");
      if (we(i)) {
        const r = en(i).tee();
        return r[0][ee] = r[1][ee] = i[ee], r;
      }
      return [Pe(i), Pe(i)];
    })(e);
    return Do(e, t[0]), t[1];
  }
  return Pe(e);
}
function Do(e, t) {
  Object.entries(Object.getOwnPropertyDescriptors(e.constructor.prototype)).forEach((([i, r]) => {
    i !== "constructor" && (r.value ? r.value = r.value.bind(t) : r.get = r.get.bind(t), Object.defineProperty(e, i, r));
  }));
}
function Pe(e, t = 0, i = 1 / 0) {
  if (Ae(e)) throw Error("Not implemented");
  if (we(e)) {
    if (t >= 0 && i >= 0) {
      let r, a = 0;
      return new ReadableStream({ start() {
        r = e.getReader();
      }, async pull(n) {
        try {
          for (; ; ) {
            if (!(a < i)) return n.close(), void e.releaseLock();
            {
              const { value: o, done: s } = await r.read();
              if (s) return n.close(), void e.releaseLock();
              let f;
              if (a + o.length >= t && (f = Pe(o, Math.max(t - a, 0), i - a)), a += o.length, f) return void n.enqueue(f);
            }
          }
        } catch (o) {
          n.error(o);
        }
      }, async cancel(n) {
        await r.cancel(n);
      } }, { highWaterMark: 0 });
    }
    if (t < 0 && (i < 0 || i === 1 / 0)) {
      let r = [];
      return Oe(e, ((a) => {
        a.length >= -t ? r = [a] : r.push(a);
      }), (() => Pe(_e(r), t, i)));
    }
    if (t === 0 && i < 0) {
      let r;
      return Oe(e, ((a) => {
        const n = r ? _e([r, a]) : a;
        if (n.length >= -i) return r = Pe(n, i), Pe(n, t, i);
        r = n;
      }));
    }
    return console.warn(`stream.slice(input, ${t}, ${i}) not implemented efficiently.`), tn((async () => Pe(await yr(e), t, i)));
  }
  return e[ee] && (e = _e(e[ee].concat([e]))), ii(e) ? e.subarray(t, i === 1 / 0 ? e.length : i) : e.slice(t, i);
}
async function yr(e, t = _e) {
  return Ae(e) ? e.readToEnd(t) : we(e) ? Fa(e).readToEnd(t) : e;
}
async function Fo(e, t) {
  if (we(e)) {
    if (e.cancel) {
      const i = await e.cancel(t);
      return await new Promise(((r) => setTimeout(r))), i;
    }
    if (e.destroy) return e.destroy(t), await new Promise(((i) => setTimeout(i))), t;
  }
}
function tn(e) {
  const t = new De();
  return (async () => {
    const i = br(t);
    try {
      await i.write(await e()), await i.close();
    } catch (r) {
      await i.abort(r);
    }
  })(), t;
}
function Fa(e) {
  return new Ge(e);
}
function br(e) {
  return new or(e);
}
Ge.prototype.read = async function() {
  return this[ee] && this[ee].length ? { done: !1, value: this[ee].shift() } : this._read();
}, Ge.prototype.releaseLock = function() {
  this[ee] && (this.stream[ee] = this[ee]), this._releaseLock();
}, Ge.prototype.cancel = function(e) {
  return this._cancel(e);
}, Ge.prototype.readLine = async function() {
  let e, t = [];
  for (; !e; ) {
    let { done: i, value: r } = await this.read();
    if (r += "", i) return t.length ? _e(t) : void 0;
    const a = r.indexOf(`
`) + 1;
    a && (e = _e(t.concat(r.substr(0, a))), t = []), a !== r.length && t.push(r.substr(a));
  }
  return this.unshift(...t), e;
}, Ge.prototype.readByte = async function() {
  const { done: e, value: t } = await this.read();
  if (e) return;
  const i = t[0];
  return this.unshift(Pe(t, 1)), i;
}, Ge.prototype.readBytes = async function(e) {
  const t = [];
  let i = 0;
  for (; ; ) {
    const { done: r, value: a } = await this.read();
    if (r) return t.length ? _e(t) : void 0;
    if (t.push(a), i += a.length, i >= e) {
      const n = _e(t);
      return this.unshift(Pe(n, e)), Pe(n, 0, e);
    }
  }
}, Ge.prototype.peekBytes = async function(e) {
  const t = await this.readBytes(e);
  return this.unshift(t), t;
}, Ge.prototype.unshift = function(...e) {
  this[ee] || (this[ee] = []), e.length === 1 && ii(e[0]) && this[ee].length && e[0].length && this[ee][0].byteOffset >= e[0].length ? this[ee][0] = new Uint8Array(this[ee][0].buffer, this[ee][0].byteOffset - e[0].length, this[ee][0].byteLength + e[0].length) : this[ee].unshift(...e.filter(((t) => t && t.length)));
}, Ge.prototype.readToEnd = async function(e = _e) {
  const t = [];
  for (; ; ) {
    const { done: i, value: r } = await this.read();
    if (i) break;
    t.push(r);
  }
  return e(t);
};
const tr = Symbol("byValue");
var p = { curve: { nistP256: "nistP256", p256: "nistP256", nistP384: "nistP384", p384: "nistP384", nistP521: "nistP521", p521: "nistP521", secp256k1: "secp256k1", ed25519Legacy: "ed25519Legacy", ed25519: "ed25519Legacy", curve25519Legacy: "curve25519Legacy", curve25519: "curve25519Legacy", brainpoolP256r1: "brainpoolP256r1", brainpoolP384r1: "brainpoolP384r1", brainpoolP512r1: "brainpoolP512r1" }, s2k: { simple: 0, salted: 1, iterated: 3, argon2: 4, gnu: 101 }, publicKey: { rsaEncryptSign: 1, rsaEncrypt: 2, rsaSign: 3, elgamal: 16, dsa: 17, ecdh: 18, ecdsa: 19, eddsaLegacy: 22, aedh: 23, aedsa: 24, x25519: 25, x448: 26, ed25519: 27, ed448: 28 }, symmetric: { idea: 1, tripledes: 2, cast5: 3, blowfish: 4, aes128: 7, aes192: 8, aes256: 9, twofish: 10 }, compression: { uncompressed: 0, zip: 1, zlib: 2, bzip2: 3 }, hash: { md5: 1, sha1: 2, ripemd: 3, sha256: 8, sha384: 9, sha512: 10, sha224: 11, sha3_256: 12, sha3_512: 14 }, webHash: { "SHA-1": 2, "SHA-256": 8, "SHA-384": 9, "SHA-512": 10 }, aead: { eax: 1, ocb: 2, gcm: 3, experimentalGCM: 100 }, packet: { publicKeyEncryptedSessionKey: 1, signature: 2, symEncryptedSessionKey: 3, onePassSignature: 4, secretKey: 5, publicKey: 6, secretSubkey: 7, compressedData: 8, symmetricallyEncryptedData: 9, marker: 10, literalData: 11, trust: 12, userID: 13, publicSubkey: 14, userAttribute: 17, symEncryptedIntegrityProtectedData: 18, modificationDetectionCode: 19, aeadEncryptedData: 20, padding: 21 }, literal: { binary: 98, text: 116, utf8: 117, mime: 109 }, signature: { binary: 0, text: 1, standalone: 2, certGeneric: 16, certPersona: 17, certCasual: 18, certPositive: 19, certRevocation: 48, subkeyBinding: 24, keyBinding: 25, key: 31, keyRevocation: 32, subkeyRevocation: 40, timestamp: 64, thirdParty: 80 }, signatureSubpacket: { signatureCreationTime: 2, signatureExpirationTime: 3, exportableCertification: 4, trustSignature: 5, regularExpression: 6, revocable: 7, keyExpirationTime: 9, placeholderBackwardsCompatibility: 10, preferredSymmetricAlgorithms: 11, revocationKey: 12, issuerKeyID: 16, notationData: 20, preferredHashAlgorithms: 21, preferredCompressionAlgorithms: 22, keyServerPreferences: 23, preferredKeyServer: 24, primaryUserID: 25, policyURI: 26, keyFlags: 27, signersUserID: 28, reasonForRevocation: 29, features: 30, signatureTarget: 31, embeddedSignature: 32, issuerFingerprint: 33, preferredAEADAlgorithms: 34, preferredCipherSuites: 39 }, keyFlags: { certifyKeys: 1, signData: 2, encryptCommunication: 4, encryptStorage: 8, splitPrivateKey: 16, authentication: 32, sharedPrivateKey: 128 }, armor: { multipartSection: 0, multipartLast: 1, signed: 2, message: 3, publicKey: 4, privateKey: 5, signature: 6 }, reasonForRevocation: { noReason: 0, keySuperseded: 1, keyCompromised: 2, keyRetired: 3, userIDInvalid: 32 }, features: { modificationDetection: 1, aead: 2, v5Keys: 4, seipdv2: 8 }, write: function(e, t) {
  if (typeof t == "number" && (t = this.read(e, t)), e[t] !== void 0) return e[t];
  throw Error("Invalid enum value.");
}, read: function(e, t) {
  if (e[tr] || (e[tr] = [], Object.entries(e).forEach((([i, r]) => {
    e[tr][r] = i;
  }))), e[tr][t] !== void 0) return e[tr][t];
  throw Error("Invalid enum value.");
} }, Wt = { preferredHashAlgorithm: p.hash.sha512, preferredSymmetricAlgorithm: p.symmetric.aes256, preferredCompressionAlgorithm: p.compression.uncompressed, aeadProtect: !1, parseAEADEncryptedV4KeysAsLegacy: !1, preferredAEADAlgorithm: p.aead.gcm, aeadChunkSizeByte: 12, v6Keys: !1, enableParsingV5Entities: !1, s2kType: p.s2k.iterated, s2kIterationCountByte: 224, s2kArgon2Params: { passes: 3, parallelism: 4, memoryExponent: 16 }, allowUnauthenticatedMessages: !1, allowUnauthenticatedStream: !1, minRSABits: 2047, passwordCollisionCheck: !1, allowInsecureDecryptionWithSigningKeys: !1, allowInsecureVerificationWithReformattedKeys: !1, allowMissingKeyFlags: !1, constantTimePKCS1Decryption: !1, constantTimePKCS1DecryptionSupportedSymmetricAlgorithms: /* @__PURE__ */ new Set([p.symmetric.aes128, p.symmetric.aes192, p.symmetric.aes256]), ignoreUnsupportedPackets: !0, ignoreMalformedPackets: !1, enforceGrammar: !0, additionalAllowedPackets: [], showVersion: !1, showComment: !1, versionString: "OpenPGP.js 6.3.0", commentString: "https://openpgpjs.org", maxUserIDLength: 5120, maxDecompressedMessageSize: 1 / 0, knownNotations: [], nonDeterministicSignaturesViaNotation: !0, useEllipticFallback: !0, rejectHashAlgorithms: /* @__PURE__ */ new Set([p.hash.md5, p.hash.ripemd]), rejectMessageHashAlgorithms: /* @__PURE__ */ new Set([p.hash.md5, p.hash.ripemd, p.hash.sha1]), rejectPublicKeyAlgorithms: /* @__PURE__ */ new Set([p.publicKey.elgamal, p.publicKey.dsa]), rejectCurves: /* @__PURE__ */ new Set([p.curve.secp256k1]) };
const bn = (() => {
  try {
    return process.env.NODE_ENV === "development";
  } catch {
  }
  return !1;
})(), I = { isString: function(e) {
  return typeof e == "string" || e instanceof String;
}, nodeRequire: () => {
}, isArray: function(e) {
  return e instanceof Array;
}, isUint8Array: ii, isStream: we, getNobleCurve: async (e, t) => {
  if (!Wt.useEllipticFallback) throw Error("This curve is only supported in the full build of OpenPGP.js");
  const { nobleCurves: i } = await Promise.resolve().then((function() {
    return q1;
  }));
  switch (e) {
    case p.publicKey.ecdh:
    case p.publicKey.ecdsa: {
      const r = i.get(t);
      if (!r) throw Error("Unsupported curve");
      return r;
    }
    case p.publicKey.x448:
      return i.get("x448");
    case p.publicKey.ed448:
      return i.get("ed448");
    default:
      throw Error("Unsupported curve");
  }
}, readNumber: function(e) {
  let t = 0;
  for (let i = 0; i < e.length; i++) t += 256 ** i * e[e.length - 1 - i];
  return t;
}, writeNumber: function(e, t) {
  const i = new Uint8Array(t);
  for (let r = 0; r < t; r++) i[r] = e >> 8 * (t - r - 1) & 255;
  return i;
}, readDate: function(e) {
  const t = I.readNumber(e);
  return new Date(1e3 * t);
}, writeDate: function(e) {
  const t = Math.floor(e.getTime() / 1e3);
  return I.writeNumber(t, 4);
}, normalizeDate: function(e = Date.now()) {
  return e === null || e === 1 / 0 ? e : new Date(1e3 * Math.floor(+e / 1e3));
}, readMPI: function(e) {
  const t = (e[0] << 8 | e[1]) + 7 >>> 3;
  return I.readExactSubarray(e, 2, 2 + t);
}, readExactSubarray: function(e, t, i) {
  if (e.length < i - t) throw Error("Input array too short");
  return e.subarray(t, i);
}, leftPad(e, t) {
  if (e.length > t) throw Error("Input array too long");
  const i = new Uint8Array(t), r = t - e.length;
  return i.set(e, r), i;
}, uint8ArrayToMPI: function(e) {
  const t = I.uint8ArrayBitLength(e);
  if (t === 0) throw Error("Zero MPI");
  const i = e.subarray(e.length - Math.ceil(t / 8)), r = new Uint8Array([(65280 & t) >> 8, 255 & t]);
  return I.concatUint8Array([r, i]);
}, uint8ArrayBitLength: function(e) {
  let t;
  for (t = 0; t < e.length && e[t] === 0; t++) ;
  if (t === e.length) return 0;
  const i = e.subarray(t);
  return 8 * (i.length - 1) + I.nbits(i[0]);
}, hexToUint8Array: function(e) {
  const t = new Uint8Array(e.length >> 1);
  for (let i = 0; i < e.length >> 1; i++) t[i] = parseInt(e.substr(i << 1, 2), 16);
  return t;
}, uint8ArrayToHex: function(e) {
  const t = "0123456789abcdef";
  let i = "";
  return e.forEach(((r) => {
    i += t[r >> 4] + t[15 & r];
  })), i;
}, stringToUint8Array: function(e) {
  return Oe(e, ((t) => {
    if (!I.isString(t)) throw Error("stringToUint8Array: Data must be in the form of a string");
    const i = new Uint8Array(t.length);
    for (let r = 0; r < t.length; r++) i[r] = t.charCodeAt(r);
    return i;
  }));
}, uint8ArrayToString: function(e) {
  const t = [], r = (e = new Uint8Array(e)).length;
  for (let a = 0; a < r; a += 16384) t.push(String.fromCharCode.apply(String, e.subarray(a, a + 16384 < r ? a + 16384 : r)));
  return t.join("");
}, encodeUTF8: function(e) {
  const t = new TextEncoder("utf-8");
  function i(r, a = !1) {
    return t.encode(r, { stream: !a });
  }
  return Oe(e, i, (() => i("", !0)));
}, decodeUTF8: function(e) {
  const t = new TextDecoder("utf-8");
  function i(r, a = !1) {
    return t.decode(r, { stream: !a });
  }
  return Oe(e, i, (() => i(new Uint8Array(), !0)));
}, concat: _e, concatUint8Array: Xa, equalsUint8Array: function(e, t) {
  if (!I.isUint8Array(e) || !I.isUint8Array(t)) throw Error("Data must be in the form of a Uint8Array");
  if (e.length !== t.length) return !1;
  for (let i = 0; i < e.length; i++) if (e[i] !== t[i]) return !1;
  return !0;
}, findLastIndex: function(e, t) {
  for (let i = e.length; i >= 0; i--) if (t(e[i], i, e)) return i;
  return -1;
}, writeChecksum: function(e) {
  let t = 0;
  for (let i = 0; i < e.length; i++) t = t + e[i] & 65535;
  return I.writeNumber(t, 2);
}, printDebug: function(e) {
  bn && console.log("[OpenPGP.js debug]", e);
}, printDebugError: function(e) {
  bn && console.error("[OpenPGP.js debug]", e);
}, nbits: function(e) {
  let t = 1, i = e >>> 16;
  return i !== 0 && (e = i, t += 16), i = e >> 8, i !== 0 && (e = i, t += 8), i = e >> 4, i !== 0 && (e = i, t += 4), i = e >> 2, i !== 0 && (e = i, t += 2), i = e >> 1, i !== 0 && (e = i, t += 1), t;
}, double: function(e) {
  const t = new Uint8Array(e.length), i = e.length - 1;
  for (let r = 0; r < i; r++) t[r] = e[r] << 1 ^ e[r + 1] >> 7;
  return t[i] = e[i] << 1 ^ 135 * (e[0] >> 7), t;
}, shiftRight: function(e, t) {
  if (t) for (let i = e.length - 1; i >= 0; i--) e[i] >>= t, i > 0 && (e[i] |= e[i - 1] << 8 - t);
  return e;
}, getWebCrypto: function() {
  const e = be !== void 0 && be.crypto && be.crypto.subtle || this.getNodeCrypto()?.webcrypto.subtle;
  if (!e) throw Error("The WebCrypto API is not available");
  return e;
}, getNodeCrypto: function() {
  return this.nodeRequire("crypto");
}, getNodeZlib: function() {
  return this.nodeRequire("zlib");
}, getNodeBuffer: function() {
  return (this.nodeRequire("buffer") || {}).Buffer;
}, getHardwareConcurrency: function() {
  return typeof navigator < "u" ? navigator.hardwareConcurrency || 1 : this.nodeRequire("os").cpus().length;
}, isEmailAddress: function(e) {
  return I.isString(e) ? /^[^\p{C}\p{Z}@<>\\]+@[^\p{C}\p{Z}@<>\\]+[^\p{C}\p{Z}\p{P}]$/u.test(e) : !1;
}, canonicalizeEOL: function(e) {
  let t = !1;
  return Oe(e, ((i) => {
    let r;
    t && (i = I.concatUint8Array([new Uint8Array([13]), i])), i[i.length - 1] === 13 ? (t = !0, i = i.subarray(0, -1)) : t = !1;
    const a = [];
    for (let s = 0; r = i.indexOf(10, s) + 1, r; s = r) i[r - 2] !== 13 && a.push(r);
    if (!a.length) return i;
    const n = new Uint8Array(i.length + a.length);
    let o = 0;
    for (let s = 0; s < a.length; s++) {
      const f = i.subarray(a[s - 1] || 0, a[s]);
      n.set(f, o), o += f.length, n[o - 1] = 13, n[o] = 10, o++;
    }
    return n.set(i.subarray(a[a.length - 1] || 0), o), n;
  }), (() => t ? new Uint8Array([13]) : void 0));
}, nativeEOL: function(e) {
  let t = !1;
  return Oe(e, ((i) => {
    let r;
    (i = t && i[0] !== 10 ? I.concatUint8Array([new Uint8Array([13]), i]) : new Uint8Array(i))[i.length - 1] === 13 ? (t = !0, i = i.subarray(0, -1)) : t = !1;
    let a = 0;
    for (let n = 0; n !== i.length; n = r) {
      r = i.indexOf(13, n) + 1, r || (r = i.length);
      const o = r - (i[r] === 10 ? 1 : 0);
      n && i.copyWithin(a, n, o), a += o - n;
    }
    return i.subarray(0, a);
  }), (() => t ? new Uint8Array([13]) : void 0));
}, removeTrailingSpaces: function(e) {
  return e.split(`
`).map(((t) => {
    let i = t.length - 1;
    for (; i >= 0 && (t[i] === " " || t[i] === "	" || t[i] === "\r"); i--) ;
    return t.substr(0, i + 1);
  })).join(`
`);
}, wrapError: function(e, t) {
  if (!t) return e instanceof Error ? e : Error(e);
  if (e instanceof Error) {
    try {
      e.message += ": " + t.message, e.cause = t;
    } catch {
    }
    return e;
  }
  return Error(e + ": " + t.message, { cause: t });
}, constructAllowedPackets: function(e) {
  const t = {};
  return e.forEach(((i) => {
    if (!i.tag) throw Error("Invalid input: expected a packet class");
    t[i.tag] = i;
  })), t;
}, anyPromise: function(e) {
  return new Promise(((t, i) => {
    let r;
    Promise.all(e.map((async (a) => {
      try {
        t(await a);
      } catch (n) {
        r = n;
      }
    }))).then((() => {
      i(r);
    }));
  }));
}, selectUint8Array: function(e, t, i) {
  const r = Math.max(t.length, i.length), a = new Uint8Array(r);
  let n = 0;
  for (let o = 0; o < a.length; o++) a[o] = t[o] & 256 - e | i[o] & 255 + e, n += e & o < t.length | 1 - e & o < i.length;
  return a.subarray(0, n);
}, selectUint8: function(e, t, i) {
  return t & 256 - e | i & 255 + e;
}, isAES: function(e) {
  return e === p.symmetric.aes128 || e === p.symmetric.aes192 || e === p.symmetric.aes256;
} }, di = I.getNodeBuffer();
let Hr, Vr;
function xo(e) {
  let t = new Uint8Array();
  return Oe(e, ((i) => {
    t = I.concatUint8Array([t, i]);
    const r = [], a = Math.floor(t.length / 45), n = 45 * a, o = Hr(t.subarray(0, n));
    for (let s = 0; s < a; s++) r.push(o.substr(60 * s, 60)), r.push(`
`);
    return t = t.subarray(n), r.join("");
  }), (() => t.length ? Hr(t) + `
` : ""));
}
function zo(e) {
  let t = "";
  return Oe(e, ((i) => {
    t += i;
    let r = 0;
    const a = [" ", "	", "\r", `
`];
    for (let s = 0; s < a.length; s++) {
      const f = a[s];
      for (let h = t.indexOf(f); h !== -1; h = t.indexOf(f, h + 1)) r++;
    }
    let n = t.length;
    for (; n > 0 && (n - r) % 4 != 0; n--) a.includes(t[n]) && r--;
    const o = Vr(t.substr(0, n));
    return t = t.substr(n), o;
  }), (() => Vr(t)));
}
function Pt(e) {
  return zo(e.replace(/-/g, "+").replace(/_/g, "/"));
}
function pe(e, t) {
  let i = xo(e).replace(/[\r\n]/g, "");
  return i = i.replace(/[+]/g, "-").replace(/[/]/g, "_").replace(/[=]/g, ""), i;
}
di ? (Hr = (e) => di.from(e).toString("base64"), Vr = (e) => {
  const t = di.from(e, "base64");
  return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}) : (Hr = (e) => btoa(I.uint8ArrayToString(e)), Vr = (e) => I.stringToUint8Array(atob(e)));
const Se = [Array(255), Array(255), Array(255), Array(255)];
for (let e = 0; e <= 255; e++) {
  let t = e << 16;
  for (let i = 0; i < 8; i++) t = t << 1 ^ (8388608 & t ? 8801531 : 0);
  Se[0][e] = (16711680 & t) >> 16 | 65280 & t | (255 & t) << 16;
}
for (let e = 0; e <= 255; e++) Se[1][e] = Se[0][e] >> 8 ^ Se[0][255 & Se[0][e]];
for (let e = 0; e <= 255; e++) Se[2][e] = Se[1][e] >> 8 ^ Se[0][255 & Se[1][e]];
for (let e = 0; e <= 255; e++) Se[3][e] = Se[2][e] >> 8 ^ Se[0][255 & Se[2][e]];
(function() {
  const e = new ArrayBuffer(2);
  return new DataView(e).setInt16(0, 255, !0), new Int16Array(e)[0] === 255;
})();
const We = BigInt(0), Mr = BigInt(1);
function ae(e) {
  const t = "0123456789ABCDEF";
  let i = "";
  return e.forEach(((r) => {
    i += t[r >> 4] + t[15 & r];
  })), BigInt("0x0" + i);
}
function ce(e, t) {
  const i = e % t;
  return i < We ? i + t : i;
}
function wr(e, t, i) {
  if (i === We) throw Error("Modulo cannot be zero");
  if (i === Mr) return BigInt(0);
  if (t < We) throw Error("Unsopported negative exponent");
  let r = t, a = e;
  a %= i;
  let n = BigInt(1);
  for (; r > We; ) {
    const o = r & Mr;
    r >>= Mr, n = o ? n * a % i : n, a = a * a % i;
  }
  return n;
}
function wn(e) {
  return e >= We ? e : -e;
}
function xa(e, t) {
  const { gcd: i, x: r } = (function(a, n) {
    let o = BigInt(0), s = BigInt(1), f = BigInt(1), h = BigInt(0), c = wn(a), l = wn(n);
    const u = a < We, d = n < We;
    for (; l !== We; ) {
      const g = c / l;
      let b = o;
      o = f - g * o, f = b, b = s, s = h - g * s, h = b, b = l, l = c % l, c = b;
    }
    return { x: u ? -f : f, y: d ? -h : h, gcd: c };
  })(e, t);
  if (i !== Mr) throw Error("Inverse does not exist");
  return ce(r + t, t);
}
function ot(e) {
  const t = e < We ? BigInt(-1) : We, i = BigInt(8);
  let r = 1, a = e;
  for (; (a >>= i) !== t; ) r++;
  return r;
}
function mt(e, t = "be", i) {
  let r = e.toString(16);
  r.length % 2 == 1 && (r = "0" + r);
  const a = r.length / 2, n = new Uint8Array(i || a), o = i ? i - a : 0;
  let s = 0;
  for (; s < a; ) n[s + o] = parseInt(r.slice(2 * s, 2 * s + 2), 16), s++;
  return t !== "be" && n.reverse(), n;
}
const Ko = I.getNodeCrypto();
function Yr(e) {
  const t = typeof crypto < "u" ? crypto : Ko?.webcrypto;
  if (t?.getRandomValues) {
    const i = new Uint8Array(e);
    return t.getRandomValues(i);
  }
  throw Error("No secure random number generator available.");
}
function Mo(e, t) {
  if (t < e) throw Error("Illegal parameter value: max <= min");
  const i = t - e;
  return ce(ae(Yr(ot(i) + 8)), i) + e;
}
BigInt(1);
[7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999].map(((e) => BigInt(e)));
const En = I.getWebCrypto(), jr = I.getNodeCrypto(), Go = jr && jr.getHashes();
function st(e) {
  if (jr && Go.includes(e)) return async function(t) {
    const i = jr.createHash(e);
    return Oe(t, ((r) => {
      i.update(r);
    }), (() => new Uint8Array(i.digest())));
  };
}
function ft(e, t) {
  const i = async () => {
    const { nobleHashes: r } = await Promise.resolve().then((function() {
      return c0;
    })), a = r.get(e);
    if (!a) throw Error("Unsupported hash");
    return a;
  };
  return async function(r) {
    if (Ae(r) && (r = await yr(r)), I.isStream(r)) {
      const a = (await i()).create();
      return Oe(r, ((n) => {
        a.update(n);
      }), (() => a.digest()));
    }
    return En && t ? new Uint8Array(await En.digest(t, r)) : (await i())(r);
  };
}
const Ho = st("md5") || ft("md5"), Vo = st("sha1") || ft("sha1", "SHA-1"), Yo = st("sha224") || ft("sha224"), jo = st("sha256") || ft("sha256", "SHA-256"), qo = st("sha384") || ft("sha384", "SHA-384"), Zo = st("sha512") || ft("sha512", "SHA-512"), Wo = st("ripemd160") || ft("ripemd160"), Qo = st("sha3-256") || ft("sha3_256"), Jo = st("sha3-512") || ft("sha3_512");
function Fi(e, t) {
  switch (e) {
    case p.hash.md5:
      return Ho(t);
    case p.hash.sha1:
      return Vo(t);
    case p.hash.ripemd:
      return Wo(t);
    case p.hash.sha256:
      return jo(t);
    case p.hash.sha384:
      return qo(t);
    case p.hash.sha512:
      return Zo(t);
    case p.hash.sha224:
      return Yo(t);
    case p.hash.sha3_256:
      return Qo(t);
    case p.hash.sha3_512:
      return Jo(t);
    default:
      throw Error("Unsupported hash function");
  }
}
function xe(e) {
  switch (e) {
    case p.hash.md5:
      return 16;
    case p.hash.sha1:
    case p.hash.ripemd:
      return 20;
    case p.hash.sha256:
      return 32;
    case p.hash.sha384:
      return 48;
    case p.hash.sha512:
      return 64;
    case p.hash.sha224:
      return 28;
    case p.hash.sha3_256:
      return 32;
    case p.hash.sha3_512:
      return 64;
    default:
      throw Error("Invalid hash algorithm.");
  }
}
const He = [];
function za(e, t, i) {
  let r;
  if (t.length !== xe(e)) throw Error("Invalid hash length");
  const a = new Uint8Array(He[e].length);
  for (r = 0; r < He[e].length; r++) a[r] = He[e][r];
  const n = a.length + t.length;
  if (i < n + 11) throw Error("Intended encoded message length too short");
  const o = new Uint8Array(i - n - 3).fill(255), s = new Uint8Array(i);
  return s[1] = 1, s.set(o, 2), s.set(a, i - n), s.set(t, i - t.length), s;
}
He[1] = [48, 32, 48, 12, 6, 8, 42, 134, 72, 134, 247, 13, 2, 5, 5, 0, 4, 16], He[2] = [48, 33, 48, 9, 6, 5, 43, 14, 3, 2, 26, 5, 0, 4, 20], He[3] = [48, 33, 48, 9, 6, 5, 43, 36, 3, 2, 1, 5, 0, 4, 20], He[8] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 1, 5, 0, 4, 32], He[9] = [48, 65, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 2, 5, 0, 4, 48], He[10] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 3, 5, 0, 4, 64], He[11] = [48, 45, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 4, 5, 0, 4, 28];
const qr = I.getWebCrypto(), Ka = I.getNodeCrypto(), mn = BigInt(1);
async function $o(e, t, i, r, a, n, o, s, f) {
  if (xe(e) >= i.length) throw Error("Digest size cannot exceed key modulus size");
  if (t && !I.isStream(t)) {
    if (I.getWebCrypto()) try {
      return await (async function(h, c, l, u, d, g, b, T) {
        const A = vn(l, u, d, g, b, T), S = { name: "RSASSA-PKCS1-v1_5", hash: { name: h } }, E = await qr.importKey("jwk", A, S, !1, ["sign"]);
        return new Uint8Array(await qr.sign("RSASSA-PKCS1-v1_5", E, c));
      })(p.read(p.webHash, e), t, i, r, a, n, o, s);
    } catch (h) {
      I.printDebugError(h);
    }
    else if (I.getNodeCrypto()) return (function(h, c, l, u, d, g, b, T) {
      const A = Ka.createSign(p.read(p.hash, h));
      A.write(c), A.end();
      const S = vn(l, u, d, g, b, T);
      return new Uint8Array(A.sign({ key: S, format: "jwk", type: "pkcs1" }));
    })(e, t, i, r, a, n, o, s);
  }
  return (function(h, c, l, u) {
    c = ae(c);
    const d = ae(za(h, u, ot(c)));
    return l = ae(l), mt(wr(d, l, c), "be", ot(c));
  })(e, i, a, f);
}
async function es(e, t, i, r, a, n) {
  if (t && !I.isStream(t)) {
    if (I.getWebCrypto()) try {
      return await (async function(o, s, f, h, c) {
        const l = An(h, c), u = await qr.importKey("jwk", l, { name: "RSASSA-PKCS1-v1_5", hash: { name: o } }, !1, ["verify"]);
        return qr.verify("RSASSA-PKCS1-v1_5", u, f, s);
      })(p.read(p.webHash, e), t, i, r, a);
    } catch (o) {
      I.printDebugError(o);
    }
    else if (I.getNodeCrypto()) return (function(o, s, f, h, c) {
      const l = An(h, c), u = { key: l, format: "jwk", type: "pkcs1" }, d = Ka.createVerify(p.read(p.hash, o));
      d.write(s), d.end();
      try {
        return d.verify(u, f);
      } catch {
        return !1;
      }
    })(e, t, i, r, a);
  }
  return (function(o, s, f, h, c) {
    if (f = ae(f), s = ae(s), h = ae(h), s >= f) throw Error("Signature size cannot exceed modulus size");
    const l = mt(wr(s, h, f), "be", ot(f)), u = za(o, c, ot(f));
    return I.equalsUint8Array(l, u);
  })(e, i, r, a, n);
}
function vn(e, t, i, r, a, n) {
  const o = ae(r), s = ae(a), f = ae(i);
  let h = ce(f, s - mn), c = ce(f, o - mn);
  return c = mt(c), h = mt(h), { kty: "RSA", n: pe(e), e: pe(t), d: pe(i), p: pe(a), q: pe(r), dp: pe(h), dq: pe(c), qi: pe(n), ext: !0 };
}
function An(e, t) {
  return { kty: "RSA", n: pe(e), e: pe(t), ext: !0 };
}
BigInt(1);
const ts = { "2a8648ce3d030107": p.curve.nistP256, "2b81040022": p.curve.nistP384, "2b81040023": p.curve.nistP521, "2b8104000a": p.curve.secp256k1, "2b06010401da470f01": p.curve.ed25519Legacy, "2b060104019755010501": p.curve.curve25519Legacy, "2b2403030208010107": p.curve.brainpoolP256r1, "2b240303020801010b": p.curve.brainpoolP384r1, "2b240303020801010d": p.curve.brainpoolP512r1 };
class jt {
  constructor(t) {
    if (t instanceof jt) this.oid = t.oid;
    else if (I.isArray(t) || I.isUint8Array(t)) {
      if ((t = new Uint8Array(t))[0] === 6) {
        if (t[1] !== t.length - 2) throw Error("Length mismatch in DER encoded oid");
        t = t.subarray(2);
      }
      this.oid = t;
    } else this.oid = "";
  }
  read(t) {
    if (t.length >= 1) {
      const i = t[0];
      if (t.length >= 1 + i) return this.oid = t.subarray(1, 1 + i), 1 + this.oid.length;
    }
    throw Error("Invalid oid");
  }
  write() {
    return I.concatUint8Array([new Uint8Array([this.oid.length]), this.oid]);
  }
  toHex() {
    return I.uint8ArrayToHex(this.oid);
  }
  getName() {
    const t = ts[this.toHex()];
    if (!t) throw Error("Unknown curve object identifier.");
    return t;
  }
}
function rs(e) {
  let t, i = 0;
  const r = e[0];
  return r < 192 ? ([i] = e, t = 1) : r < 255 ? (i = (e[0] - 192 << 8) + e[1] + 192, t = 2) : r === 255 && (i = I.readNumber(e.subarray(1, 5)), t = 5), { len: i, offset: t };
}
function is(e) {
  return e < 192 ? new Uint8Array([e]) : e > 191 && e < 8384 ? new Uint8Array([192 + (e - 192 >> 8), e - 192 & 255]) : I.concatUint8Array([new Uint8Array([255]), I.writeNumber(e, 4)]);
}
class Ne extends Error {
  constructor(...t) {
    super(...t), Error.captureStackTrace && Error.captureStackTrace(this, Ne), this.name = "UnsupportedError";
  }
}
async function ns(e) {
  switch (e) {
    case p.publicKey.ed25519:
      try {
        const t = I.getWebCrypto(), i = await t.generateKey("Ed25519", !0, ["sign", "verify"]).catch(((n) => {
          if (n.name === "OperationError") {
            const o = Error("Unexpected key generation issue");
            throw o.name = "NotSupportedError", o;
          }
          throw n;
        })), r = await t.exportKey("jwk", i.privateKey), a = await t.exportKey("jwk", i.publicKey);
        return { A: new Uint8Array(Pt(a.x)), seed: Pt(r.d) };
      } catch (t) {
        if (t.name !== "NotSupportedError") throw t;
        const { default: i } = await Promise.resolve().then((function() {
          return ci;
        })), r = Yr(rn(e)), { publicKey: a } = i.sign.keyPair.fromSeed(r);
        return { A: a, seed: r };
      }
    case p.publicKey.ed448: {
      const t = await I.getNobleCurve(p.publicKey.ed448), { secretKey: i, publicKey: r } = t.keygen();
      return { A: r, seed: i };
    }
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
async function Ma(e, t, i, r, a, n) {
  if (xe(t) < xe(Ha(e))) throw Error("Hash algorithm too weak for EdDSA.");
  switch (e) {
    case p.publicKey.ed25519:
      try {
        const o = I.getWebCrypto(), s = as(e, r, a), f = await o.importKey("jwk", s, "Ed25519", !1, ["sign"]);
        return { RS: new Uint8Array(await o.sign("Ed25519", f, n)) };
      } catch (o) {
        if (o.name !== "NotSupportedError") throw o;
        const { default: s } = await Promise.resolve().then((function() {
          return ci;
        })), f = I.concatUint8Array([a, r]);
        return { RS: s.sign.detached(n, f) };
      }
    case p.publicKey.ed448:
      return { RS: (await I.getNobleCurve(p.publicKey.ed448)).sign(n, a) };
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
async function Ga(e, t, { RS: i }, r, a, n) {
  if (xe(t) < xe(Ha(e))) throw Error("Hash algorithm too weak for EdDSA.");
  switch (e) {
    case p.publicKey.ed25519:
      try {
        const o = I.getWebCrypto(), s = Va(e, a), f = await o.importKey("jwk", s, "Ed25519", !1, ["verify"]);
        return await o.verify("Ed25519", f, i, n);
      } catch (o) {
        if (o.name !== "NotSupportedError") throw o;
        const { default: s } = await Promise.resolve().then((function() {
          return ci;
        }));
        return s.sign.detached.verify(n, i, a);
      }
    case p.publicKey.ed448:
      return (await I.getNobleCurve(p.publicKey.ed448)).verify(i, n, a);
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
function rn(e) {
  switch (e) {
    case p.publicKey.ed25519:
      return 32;
    case p.publicKey.ed448:
      return 57;
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
function Ha(e) {
  switch (e) {
    case p.publicKey.ed25519:
      return p.hash.sha256;
    case p.publicKey.ed448:
      return p.hash.sha512;
    default:
      throw Error("Unknown EdDSA algo");
  }
}
const Va = (e, t) => {
  if (e === p.publicKey.ed25519)
    return { kty: "OKP", crv: "Ed25519", x: pe(t), ext: !0 };
  throw Error("Unsupported EdDSA algorithm");
}, as = (e, t, i) => {
  if (e === p.publicKey.ed25519) {
    const r = Va(e, t);
    return r.d = pe(i), r;
  }
  throw Error("Unsupported EdDSA algorithm");
};
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
function Ya(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function Zr(e, ...t) {
  if (!Ya(e)) throw Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length)) throw Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function Wr(e, t = !0) {
  if (e.destroyed) throw Error("Hash instance has been destroyed");
  if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function ja(e, t) {
  Zr(e);
  const i = t.outputLen;
  if (e.length < i) throw Error("digestInto() expects output buffer of length at least " + i);
}
function Er(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function xi(...e) {
  for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function os(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function mr(e) {
  if (typeof e == "string") e = (function(t) {
    if (typeof t != "string") throw Error("string expected");
    return new Uint8Array(new TextEncoder().encode(t));
  })(e);
  else {
    if (!Ya(e)) throw Error("Uint8Array expected, got " + typeof e);
    e = qa(e);
  }
  return e;
}
function qa(e) {
  return Uint8Array.from(e);
}
const rt = 16, nn = /* @__PURE__ */ new Uint8Array(16), je = Er(nn), Ie = (e) => (e >>> 0 & 255) << 24 | (e >>> 8 & 255) << 16 | (e >>> 16 & 255) << 8 | e >>> 24 & 255;
class Za {
  constructor(t, i) {
    this.blockLen = rt, this.outputLen = rt, this.s0 = 0, this.s1 = 0, this.s2 = 0, this.s3 = 0, this.finished = !1, Zr(t = mr(t), 16);
    const r = os(t);
    let a = r.getUint32(0, !1), n = r.getUint32(4, !1), o = r.getUint32(8, !1), s = r.getUint32(12, !1);
    const f = [];
    for (let S = 0; S < 128; S++) f.push({ s0: Ie(a), s1: Ie(n), s2: Ie(o), s3: Ie(s) }), { s0: a, s1: n, s2: o, s3: s } = { s3: (l = o) << 31 | (u = s) >>> 1, s2: (c = n) << 31 | l >>> 1, s1: (h = a) << 31 | c >>> 1, s0: h >>> 1 ^ 225 << 24 & -(1 & u) };
    var h, c, l, u;
    const d = (g = i || 1024) > 65536 ? 8 : g > 1024 ? 4 : 2;
    var g;
    if (![1, 2, 4, 8].includes(d)) throw Error("ghash: invalid window size, expected 2, 4 or 8");
    this.W = d;
    const b = 128 / d, T = this.windowSize = 2 ** d, A = [];
    for (let S = 0; S < b; S++) for (let E = 0; E < T; E++) {
      let y = 0, _ = 0, k = 0, N = 0;
      for (let m = 0; m < d; m++) {
        if (!(E >>> d - m - 1 & 1)) continue;
        const { s0: w, s1: O, s2: v, s3: R } = f[d * S + m];
        y ^= w, _ ^= O, k ^= v, N ^= R;
      }
      A.push({ s0: y, s1: _, s2: k, s3: N });
    }
    this.t = A;
  }
  _updateBlock(t, i, r, a) {
    t ^= this.s0, i ^= this.s1, r ^= this.s2, a ^= this.s3;
    const { W: n, t: o, windowSize: s } = this;
    let f = 0, h = 0, c = 0, l = 0;
    const u = (1 << n) - 1;
    let d = 0;
    for (const g of [t, i, r, a]) for (let b = 0; b < 4; b++) {
      const T = g >>> 8 * b & 255;
      for (let A = 8 / n - 1; A >= 0; A--) {
        const S = T >>> n * A & u, { s0: E, s1: y, s2: _, s3: k } = o[d * s + S];
        f ^= E, h ^= y, c ^= _, l ^= k, d += 1;
      }
    }
    this.s0 = f, this.s1 = h, this.s2 = c, this.s3 = l;
  }
  update(t) {
    Wr(this), Zr(t = mr(t));
    const i = Er(t), r = Math.floor(t.length / rt), a = t.length % rt;
    for (let n = 0; n < r; n++) this._updateBlock(i[4 * n + 0], i[4 * n + 1], i[4 * n + 2], i[4 * n + 3]);
    return a && (nn.set(t.subarray(r * rt)), this._updateBlock(je[0], je[1], je[2], je[3]), xi(je)), this;
  }
  destroy() {
    const { t } = this;
    for (const i of t) i.s0 = 0, i.s1 = 0, i.s2 = 0, i.s3 = 0;
  }
  digestInto(t) {
    Wr(this), ja(t, this), this.finished = !0;
    const { s0: i, s1: r, s2: a, s3: n } = this, o = Er(t);
    return o[0] = i, o[1] = r, o[2] = a, o[3] = n, t;
  }
  digest() {
    const t = new Uint8Array(rt);
    return this.digestInto(t), this.destroy(), t;
  }
}
class ss extends Za {
  constructor(t, i) {
    Zr(t = mr(t));
    const r = (function(a) {
      a.reverse();
      const n = 1 & a[15];
      let o = 0;
      for (let s = 0; s < a.length; s++) {
        const f = a[s];
        a[s] = f >>> 1 | o, o = (1 & f) << 7;
      }
      return a[0] ^= 225 & -n, a;
    })(qa(t));
    super(r, i), xi(r);
  }
  update(t) {
    t = mr(t), Wr(this);
    const i = Er(t), r = t.length % rt, a = Math.floor(t.length / rt);
    for (let n = 0; n < a; n++) this._updateBlock(Ie(i[4 * n + 3]), Ie(i[4 * n + 2]), Ie(i[4 * n + 1]), Ie(i[4 * n + 0]));
    return r && (nn.set(t.subarray(a * rt)), this._updateBlock(Ie(je[3]), Ie(je[2]), Ie(je[1]), Ie(je[0])), xi(je)), this;
  }
  digestInto(t) {
    Wr(this), ja(t, this), this.finished = !0;
    const { s0: i, s1: r, s2: a, s3: n } = this, o = Er(t);
    return o[0] = i, o[1] = r, o[2] = a, o[3] = n, t.reverse();
  }
}
function Wa(e) {
  const t = (r, a) => e(a, r.length).update(mr(r)).digest(), i = e(new Uint8Array(16), 0);
  return t.outputLen = i.outputLen, t.blockLen = i.blockLen, t.create = (r, a) => e(r, a), t;
}
Wa(((e, t) => new Za(e, t)));
Wa(((e, t) => new ss(e, t)));
I.getWebCrypto();
I.encodeUTF8("OpenPGP X25519"), I.encodeUTF8("OpenPGP X448");
async function fs(e) {
  switch (e) {
    case p.publicKey.x25519:
      try {
        const t = I.getWebCrypto(), i = await t.generateKey("X25519", !0, ["deriveKey", "deriveBits"]).catch(((n) => {
          if (n.name === "OperationError") {
            const o = Error("Unexpected key generation issue");
            throw o.name = "NotSupportedError", o;
          }
          throw n;
        })), r = await t.exportKey("jwk", i.privateKey), a = await t.exportKey("jwk", i.publicKey);
        if (r.x !== a.x) {
          const n = Error("Unexpected mismatching public point");
          throw n.name = "NotSupportedError", n;
        }
        return { A: new Uint8Array(Pt(a.x)), k: Pt(r.d) };
      } catch (t) {
        if (t.name !== "NotSupportedError") throw t;
        const { default: i } = await Promise.resolve().then((function() {
          return ci;
        })), { secretKey: r, publicKey: a } = i.box.keyPair();
        return { A: a, k: r };
      }
    case p.publicKey.x448: {
      const t = await I.getNobleCurve(p.publicKey.x448), { secretKey: i, publicKey: r } = t.keygen();
      return { A: r, k: i };
    }
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
function cs(e) {
  switch (e) {
    case p.publicKey.x25519:
      return 32;
    case p.publicKey.x448:
      return 56;
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
const gi = I.getWebCrypto(), Qr = I.getNodeCrypto(), Qe = { [p.curve.nistP256]: "P-256", [p.curve.nistP384]: "P-384", [p.curve.nistP521]: "P-521" }, $e = Qr ? Qr.getCurves() : [], Ve = Qr ? { [p.curve.secp256k1]: $e.includes("secp256k1") ? "secp256k1" : void 0, [p.curve.nistP256]: $e.includes("prime256v1") ? "prime256v1" : void 0, [p.curve.nistP384]: $e.includes("secp384r1") ? "secp384r1" : void 0, [p.curve.nistP521]: $e.includes("secp521r1") ? "secp521r1" : void 0, [p.curve.ed25519Legacy]: $e.includes("ED25519") ? "ED25519" : void 0, [p.curve.curve25519Legacy]: $e.includes("X25519") ? "X25519" : void 0, [p.curve.brainpoolP256r1]: $e.includes("brainpoolP256r1") ? "brainpoolP256r1" : void 0, [p.curve.brainpoolP384r1]: $e.includes("brainpoolP384r1") ? "brainpoolP384r1" : void 0, [p.curve.brainpoolP512r1]: $e.includes("brainpoolP512r1") ? "brainpoolP512r1" : void 0 } : {}, ls = { [p.curve.nistP256]: { oid: [6, 8, 42, 134, 72, 206, 61, 3, 1, 7], keyType: p.publicKey.ecdsa, hash: p.hash.sha256, cipher: p.symmetric.aes128, node: Ve[p.curve.nistP256], web: Qe[p.curve.nistP256], payloadSize: 32, sharedSize: 256, wireFormatLeadingByte: 4 }, [p.curve.nistP384]: { oid: [6, 5, 43, 129, 4, 0, 34], keyType: p.publicKey.ecdsa, hash: p.hash.sha384, cipher: p.symmetric.aes192, node: Ve[p.curve.nistP384], web: Qe[p.curve.nistP384], payloadSize: 48, sharedSize: 384, wireFormatLeadingByte: 4 }, [p.curve.nistP521]: { oid: [6, 5, 43, 129, 4, 0, 35], keyType: p.publicKey.ecdsa, hash: p.hash.sha512, cipher: p.symmetric.aes256, node: Ve[p.curve.nistP521], web: Qe[p.curve.nistP521], payloadSize: 66, sharedSize: 528, wireFormatLeadingByte: 4 }, [p.curve.secp256k1]: { oid: [6, 5, 43, 129, 4, 0, 10], keyType: p.publicKey.ecdsa, hash: p.hash.sha256, cipher: p.symmetric.aes128, node: Ve[p.curve.secp256k1], payloadSize: 32, wireFormatLeadingByte: 4 }, [p.curve.ed25519Legacy]: { oid: [6, 9, 43, 6, 1, 4, 1, 218, 71, 15, 1], keyType: p.publicKey.eddsaLegacy, hash: p.hash.sha512, node: !1, payloadSize: 32, wireFormatLeadingByte: 64 }, [p.curve.curve25519Legacy]: { oid: [6, 10, 43, 6, 1, 4, 1, 151, 85, 1, 5, 1], keyType: p.publicKey.ecdh, hash: p.hash.sha256, cipher: p.symmetric.aes128, node: !1, payloadSize: 32, wireFormatLeadingByte: 64 }, [p.curve.brainpoolP256r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 7], keyType: p.publicKey.ecdsa, hash: p.hash.sha256, cipher: p.symmetric.aes128, node: Ve[p.curve.brainpoolP256r1], payloadSize: 32, wireFormatLeadingByte: 4 }, [p.curve.brainpoolP384r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 11], keyType: p.publicKey.ecdsa, hash: p.hash.sha384, cipher: p.symmetric.aes192, node: Ve[p.curve.brainpoolP384r1], payloadSize: 48, wireFormatLeadingByte: 4 }, [p.curve.brainpoolP512r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 13], keyType: p.publicKey.ecdsa, hash: p.hash.sha512, cipher: p.symmetric.aes256, node: Ve[p.curve.brainpoolP512r1], payloadSize: 64, wireFormatLeadingByte: 4 } };
class Nt {
  constructor(t) {
    try {
      this.name = t instanceof jt ? t.getName() : p.write(p.curve, t);
    } catch {
      throw new Ne("Unknown curve");
    }
    const i = ls[this.name];
    this.keyType = i.keyType, this.oid = i.oid, this.hash = i.hash, this.cipher = i.cipher, this.node = i.node, this.web = i.web, this.payloadSize = i.payloadSize, this.sharedSize = i.sharedSize, this.wireFormatLeadingByte = i.wireFormatLeadingByte, this.web && I.getWebCrypto() ? this.type = "web" : this.node && I.getNodeCrypto() ? this.type = "node" : this.name === p.curve.curve25519Legacy ? this.type = "curve25519Legacy" : this.name === p.curve.ed25519Legacy && (this.type = "ed25519Legacy");
  }
  async genKeyPair() {
    switch (this.type) {
      case "web":
        try {
          return await (async function(t, i) {
            const r = await gi.generateKey({ name: "ECDSA", namedCurve: Qe[t] }, !0, ["sign", "verify"]), a = await gi.exportKey("jwk", r.privateKey);
            return { publicKey: hs(await gi.exportKey("jwk", r.publicKey), i), privateKey: Pt(a.d) };
          })(this.name, this.wireFormatLeadingByte);
        } catch (t) {
          return I.printDebugError("Browser did not support generating ec key " + t.message), Tn(this.name);
        }
      case "node":
        return (function(t) {
          const i = Qr.createECDH(Ve[t]);
          return i.generateKeys(), { publicKey: new Uint8Array(i.getPublicKey()), privateKey: new Uint8Array(i.getPrivateKey()) };
        })(this.name);
      case "curve25519Legacy": {
        const { k: t, A: i } = await fs(p.publicKey.x25519), r = t.slice().reverse();
        return r[0] = 127 & r[0] | 64, r[31] &= 248, { publicKey: I.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), i]), privateKey: r };
      }
      case "ed25519Legacy": {
        const { seed: t, A: i } = await ns(p.publicKey.ed25519);
        return { publicKey: I.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), i]), privateKey: t };
      }
      default:
        return Tn(this.name);
    }
  }
}
function ni(e, t) {
  const { payloadSize: i, wireFormatLeadingByte: r, name: a } = e, n = a === p.curve.curve25519Legacy || a === p.curve.ed25519Legacy ? i : 2 * i;
  if (t[0] !== r || t.length !== n + 1) throw Error("Invalid point encoding");
}
async function Tn(e) {
  const t = await I.getNobleCurve(p.publicKey.ecdsa, e), { secretKey: i } = t.keygen();
  return { publicKey: t.getPublicKey(i, !1), privateKey: i };
}
function hs(e, t) {
  const i = Pt(e.x), r = Pt(e.y), a = new Uint8Array(i.length + r.length + 1);
  return a[0] = t, a.set(i, 1), a.set(r, i.length + 1), a;
}
function Qa(e, t, i) {
  const r = e, a = i.slice(1, r + 1), n = i.slice(r + 1, 2 * r + 1);
  return { kty: "EC", crv: t, x: pe(a), y: pe(n), ext: !0 };
}
function us(e, t, i, r) {
  const a = Qa(e, t, i);
  return a.d = pe(r), a;
}
const Jr = I.getWebCrypto(), Ja = I.getNodeCrypto();
async function ds(e, t, i, r, a, n) {
  const o = new Nt(e);
  if (ni(o, r), i && !I.isStream(i)) {
    const f = { publicKey: r, privateKey: a };
    switch (o.type) {
      case "web":
        try {
          return await (async function(h, c, l, u) {
            const d = h.payloadSize, g = us(h.payloadSize, Qe[h.name], u.publicKey, u.privateKey), b = await Jr.importKey("jwk", g, { name: "ECDSA", namedCurve: Qe[h.name], hash: { name: p.read(p.webHash, h.hash) } }, !1, ["sign"]), T = new Uint8Array(await Jr.sign({ name: "ECDSA", namedCurve: Qe[h.name], hash: { name: p.read(p.webHash, c) } }, b, l));
            return { r: T.slice(0, d), s: T.slice(d, d << 1) };
          })(o, t, i, f);
        } catch (h) {
          if (o.name !== "nistP521" && (h.name === "DataError" || h.name === "OperationError")) throw h;
          I.printDebugError("Browser did not support signing: " + h.message);
        }
        break;
      case "node":
        return (function(h, c, l, u) {
          const d = I.nodeRequire("eckey-utils"), g = I.getNodeBuffer(), { privateKey: b } = d.generateDer({ curveName: Ve[h.name], privateKey: g.from(u) }), T = Ja.createSign(p.read(p.hash, c));
          T.write(l), T.end();
          const A = new Uint8Array(T.sign({ key: b, format: "der", type: "sec1", dsaEncoding: "ieee-p1363" })), S = h.payloadSize;
          return { r: A.subarray(0, S), s: A.subarray(S, S << 1) };
        })(o, t, i, a);
    }
  }
  const s = (await I.getNobleCurve(p.publicKey.ecdsa, o.name)).sign(n, a, { lowS: !1 });
  return { r: mt(s.r, "be", o.payloadSize), s: mt(s.s, "be", o.payloadSize) };
}
async function gs(e, t, i, r, a, n) {
  const o = new Nt(e);
  ni(o, a);
  const s = async () => n[0] === 0 && Sn(o, i, n.subarray(1), a);
  if (r && !I.isStream(r)) switch (o.type) {
    case "web":
      try {
        return await (async function(h, c, { r: l, s: u }, d, g) {
          const b = Qa(h.payloadSize, Qe[h.name], g), T = await Jr.importKey("jwk", b, { name: "ECDSA", namedCurve: Qe[h.name], hash: { name: p.read(p.webHash, h.hash) } }, !1, ["verify"]), A = I.concatUint8Array([l, u]).buffer;
          return Jr.verify({ name: "ECDSA", namedCurve: Qe[h.name], hash: { name: p.read(p.webHash, c) } }, T, A, d);
        })(o, t, i, r, a) || s();
      } catch (f) {
        if (o.name !== "nistP521" && (f.name === "DataError" || f.name === "OperationError")) throw f;
        I.printDebugError("Browser did not support verifying: " + f.message);
      }
      break;
    case "node":
      return (function(h, c, { r: l, s: u }, d, g) {
        const b = I.nodeRequire("eckey-utils"), T = I.getNodeBuffer(), { publicKey: A } = b.generateDer({ curveName: Ve[h.name], publicKey: T.from(g) }), S = Ja.createVerify(p.read(p.hash, c));
        S.write(d), S.end();
        const E = I.concatUint8Array([l, u]);
        try {
          return S.verify({ key: A, format: "der", type: "spki", dsaEncoding: "ieee-p1363" }, E);
        } catch {
          return !1;
        }
      })(o, t, i, r, a) || s();
  }
  return await Sn(o, i, n, a) || s();
}
async function Sn(e, t, i, r) {
  return (await I.getNobleCurve(p.publicKey.ecdsa, e.name)).verify(I.concatUint8Array([t.r, t.s]), i, r, { lowS: !1 });
}
async function ps(e, t, i, r, a, n) {
  if (ni(new Nt(e), r), xe(t) < xe(p.hash.sha256)) throw Error("Hash algorithm too weak for EdDSA.");
  const { RS: o } = await Ma(p.publicKey.ed25519, t, 0, r.subarray(1), a, n);
  return { r: o.subarray(0, 32), s: o.subarray(32) };
}
async function ys(e, t, { r: i, s: r }, a, n, o) {
  if (ni(new Nt(e), n), xe(t) < xe(p.hash.sha256)) throw Error("Hash algorithm too weak for EdDSA.");
  const s = I.concatUint8Array([i, r]);
  return Ga(p.publicKey.ed25519, t, { RS: s }, 0, n.subarray(1), o);
}
const pi = BigInt(0), bs = BigInt(1);
class ws {
  constructor(t) {
    if (t) {
      const { hash: i, cipher: r } = t;
      this.hash = i, this.cipher = r;
    } else this.hash = null, this.cipher = null;
  }
  read(t) {
    if (t.length < 4 || t[0] !== 3 || t[1] !== 1) throw new Ne("Cannot read KDFParams");
    return this.hash = t[2], this.cipher = t[3], 4;
  }
  write() {
    return new Uint8Array([3, 1, this.hash, this.cipher]);
  }
}
function zi(e, t) {
  const i = /* @__PURE__ */ new Set([p.publicKey.ed25519, p.publicKey.x25519, p.publicKey.ed448, p.publicKey.x448]), r = Object.keys(t).map(((a) => {
    const n = t[a];
    return I.isUint8Array(n) ? i.has(e) ? n : I.uint8ArrayToMPI(n) : n.write();
  }));
  return I.concatUint8Array(r);
}
function yi(e) {
  try {
    e.getName();
  } catch {
    throw new Ne("Unknown curve OID");
  }
}
function Es(e, t) {
  switch (e) {
    case p.publicKey.ecdsa:
    case p.publicKey.ecdh:
    case p.publicKey.eddsaLegacy:
      return new Nt(t).payloadSize;
    case p.publicKey.ed25519:
    case p.publicKey.ed448:
      return rn(e);
    case p.publicKey.x25519:
    case p.publicKey.x448:
      return cs(e);
    default:
      throw Error("Unknown elliptic algo");
  }
}
I.getWebCrypto();
const Rn = I.getNodeCrypto(), At = Rn ? Rn.getCiphers() : [];
At.includes("idea-cfb"), At.includes("des-ede3-cfb"), At.includes("cast5-cfb"), At.includes("bf-cfb"), At.includes("aes-128-cfb"), At.includes("aes-192-cfb"), At.includes("aes-256-cfb");
I.getWebCrypto();
I.getNodeCrypto();
I.getWebCrypto();
I.getNodeCrypto();
I.getNodeBuffer();
const $a = 16, ms = new Uint8Array($a);
ms[15] = 1;
const vs = new Uint8Array($a);
vs[15] = 2;
I.getWebCrypto();
I.getNodeCrypto();
I.getNodeBuffer();
async function As(e, t, i, r, a, n) {
  switch (e) {
    case p.publicKey.rsaEncryptSign:
    case p.publicKey.rsaEncrypt:
    case p.publicKey.rsaSign: {
      const { n: o, e: s } = r;
      return es(t, a, I.leftPad(i.s, o.length), o, s, n);
    }
    case p.publicKey.dsa: {
      const { g: o, p: s, q: f, y: h } = r, { r: c, s: l } = i;
      return (async function(u, d, g, b, T, A, S, E) {
        if (d = ae(d), g = ae(g), A = ae(A), S = ae(S), T = ae(T), E = ae(E), d <= pi || d >= S || g <= pi || g >= S) return I.printDebug("invalid DSA Signature"), !1;
        const y = ce(ae(b.subarray(0, ot(S))), S), _ = xa(g, S);
        if (_ === pi) return I.printDebug("invalid DSA Signature"), !1;
        T = ce(T, A), E = ce(E, A);
        const k = ce(y * _, S), N = ce(d * _, S);
        return ce(ce(wr(T, k, A) * wr(E, N, A), A), S) === d;
      })(0, c, l, n, o, s, f, h);
    }
    case p.publicKey.ecdsa: {
      const { oid: o, Q: s } = r, f = new Nt(o).payloadSize;
      return gs(o, t, { r: I.leftPad(i.r, f), s: I.leftPad(i.s, f) }, a, s, n);
    }
    case p.publicKey.eddsaLegacy: {
      const { oid: o, Q: s } = r, f = new Nt(o).payloadSize;
      return ys(o, t, { r: I.leftPad(i.r, f), s: I.leftPad(i.s, f) }, 0, s, n);
    }
    case p.publicKey.ed25519:
    case p.publicKey.ed448: {
      const { A: o } = r;
      return Ga(e, t, i, 0, o, n);
    }
    default:
      throw Error("Unknown signature algorithm.");
  }
}
async function Ts(e, t, i, r, a, n) {
  if (!i || !r) throw Error("Missing key parameters");
  switch (e) {
    case p.publicKey.rsaEncryptSign:
    case p.publicKey.rsaEncrypt:
    case p.publicKey.rsaSign: {
      const { n: o, e: s } = i, { d: f, p: h, q: c, u: l } = r;
      return { s: await $o(t, a, o, s, f, h, c, l, n) };
    }
    case p.publicKey.dsa: {
      const { g: o, p: s, q: f } = i, { x: h } = r;
      return (async function(c, l, u, d, g, b) {
        const T = BigInt(0);
        let A, S, E, y;
        d = ae(d), g = ae(g), u = ae(u), b = ae(b), u = ce(u, d), b = ce(b, g);
        const _ = ce(ae(l.subarray(0, ot(g))), g);
        for (; ; ) {
          if (A = Mo(bs, g), S = ce(wr(u, A, d), g), S === T) continue;
          const k = ce(b * S, g);
          if (y = ce(_ + k, g), E = ce(xa(A, g) * y, g), E !== T) break;
        }
        return { r: mt(S, "be", ot(d)), s: mt(E, "be", ot(d)) };
      })(0, n, o, s, f, h);
    }
    case p.publicKey.elgamal:
      throw Error("Signing with Elgamal is not defined in the OpenPGP standard.");
    case p.publicKey.ecdsa: {
      const { oid: o, Q: s } = i, { d: f } = r;
      return ds(o, t, a, s, f, n);
    }
    case p.publicKey.eddsaLegacy: {
      const { oid: o, Q: s } = i, { seed: f } = r;
      return ps(o, t, 0, s, f, n);
    }
    case p.publicKey.ed25519:
    case p.publicKey.ed448: {
      const { A: o } = i, { seed: s } = r;
      return Ma(e, t, 0, o, s, n);
    }
    default:
      throw Error("Unknown signature algorithm.");
  }
}
p.s2k.argon2, p.s2k.iterated;
var Rr = Uint8Array, e2 = Uint16Array, Ss = Int32Array, Rs = new Rr([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), Is = new Rr([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), t2 = function(e, t) {
  for (var i = new e2(31), r = 0; r < 31; ++r) i[r] = t += 1 << e[r - 1];
  var a = new Ss(i[30]);
  for (r = 1; r < 30; ++r) for (var n = i[r]; n < i[r + 1]; ++n) a[n] = n - i[r] << 5 | r;
  return { b: i, r: a };
}, r2 = t2(Rs, 2), _s = r2.b, Os = r2.r;
_s[28] = 258, Os[258] = 28;
for (var In = t2(Is, 0), j0 = In.b, q0 = In.r, Ps = new e2(32768), re = 0; re < 32768; ++re) {
  var Tt = (43690 & re) >> 1 | (21845 & re) << 1;
  Tt = (61680 & (Tt = (52428 & Tt) >> 2 | (13107 & Tt) << 2)) >> 4 | (3855 & Tt) << 4, Ps[re] = ((65280 & Tt) >> 8 | (255 & Tt) << 8) >> 1;
}
var ai = new Rr(288);
for (re = 0; re < 144; ++re) ai[re] = 8;
for (re = 144; re < 256; ++re) ai[re] = 9;
for (re = 256; re < 280; ++re) ai[re] = 7;
for (re = 280; re < 288; ++re) ai[re] = 8;
var Ns = new Rr(32);
for (re = 0; re < 32; ++re) Ns[re] = 5;
var ks = /* @__PURE__ */ new Rr(0), Us = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder();
try {
  Us.decode(ks, { stream: !0 });
} catch {
}
class kt {
  constructor() {
    this.bytes = "";
  }
  read(t) {
    return this.bytes = I.uint8ArrayToString(t.subarray(0, 8)), this.bytes.length;
  }
  write() {
    return I.stringToUint8Array(this.bytes);
  }
  toHex() {
    return I.uint8ArrayToHex(I.stringToUint8Array(this.bytes));
  }
  equals(t, i = !1) {
    return i && (t.isWildcard() || this.isWildcard()) || this.bytes === t.bytes;
  }
  isNull() {
    return this.bytes === "";
  }
  isWildcard() {
    return /^0+$/.test(this.toHex());
  }
  static mapToHex(t) {
    return t.toHex();
  }
  static fromID(t) {
    const i = new kt();
    return i.read(I.hexToUint8Array(t)), i;
  }
  static wildcard() {
    const t = new kt();
    return t.read(new Uint8Array(8)), t;
  }
}
const rr = Symbol("verified"), _n = "salt@notations.openpgpjs.org", Ls = /* @__PURE__ */ new Set([p.signatureSubpacket.issuerKeyID, p.signatureSubpacket.issuerFingerprint, p.signatureSubpacket.embeddedSignature]);
class qt {
  static get tag() {
    return p.packet.signature;
  }
  constructor() {
    this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signatureData = null, this.unhashedSubpackets = [], this.unknownSubpackets = [], this.signedHashValue = null, this.salt = null, this.created = null, this.signatureExpirationTime = null, this.signatureNeverExpires = !0, this.exportable = null, this.trustLevel = null, this.trustAmount = null, this.regularExpression = null, this.revocable = null, this.keyExpirationTime = null, this.keyNeverExpires = null, this.preferredSymmetricAlgorithms = null, this.revocationKeyClass = null, this.revocationKeyAlgorithm = null, this.revocationKeyFingerprint = null, this.issuerKeyID = new kt(), this.rawNotations = [], this.notations = {}, this.preferredHashAlgorithms = null, this.preferredCompressionAlgorithms = null, this.keyServerPreferences = null, this.preferredKeyServer = null, this.isPrimaryUserID = null, this.policyURI = null, this.keyFlags = null, this.signersUserID = null, this.reasonForRevocationFlag = null, this.reasonForRevocationString = null, this.features = null, this.signatureTargetPublicKeyAlgorithm = null, this.signatureTargetHashAlgorithm = null, this.signatureTargetHash = null, this.embeddedSignature = null, this.issuerKeyVersion = null, this.issuerFingerprint = null, this.preferredAEADAlgorithms = null, this.preferredCipherSuites = null, this.revoked = null, this[rr] = null;
  }
  read(t, i = Wt) {
    let r = 0;
    if (this.version = t[r++], this.version === 5 && !i.enableParsingV5Entities) throw new Ne("Support for v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
    if (this.version !== 4 && this.version !== 5 && this.version !== 6) throw new Ne(`Version ${this.version} of the signature packet is unsupported.`);
    if (this.signatureType = t[r++], this.publicKeyAlgorithm = t[r++], this.hashAlgorithm = t[r++], r += this.readSubPackets(t.subarray(r, t.length), !0), !this.created) throw Error("Missing signature creation time subpacket.");
    if (this.signatureData = t.subarray(0, r), r += this.readSubPackets(t.subarray(r, t.length), !1), this.signedHashValue = t.subarray(r, r + 2), r += 2, this.version === 6) {
      const s = t[r++];
      this.salt = t.subarray(r, r + s), r += s;
    }
    const a = t.subarray(r, t.length), { read: n, signatureParams: o } = (function(s, f) {
      let h = 0;
      switch (s) {
        case p.publicKey.rsaEncryptSign:
        case p.publicKey.rsaEncrypt:
        case p.publicKey.rsaSign: {
          const c = I.readMPI(f.subarray(h));
          return h += c.length + 2, { read: h, signatureParams: { s: c } };
        }
        case p.publicKey.dsa:
        case p.publicKey.ecdsa: {
          const c = I.readMPI(f.subarray(h));
          h += c.length + 2;
          const l = I.readMPI(f.subarray(h));
          return h += l.length + 2, { read: h, signatureParams: { r: c, s: l } };
        }
        case p.publicKey.eddsaLegacy: {
          const c = I.readMPI(f.subarray(h));
          h += c.length + 2;
          const l = I.readMPI(f.subarray(h));
          return h += l.length + 2, { read: h, signatureParams: { r: c, s: l } };
        }
        case p.publicKey.ed25519:
        case p.publicKey.ed448: {
          const c = 2 * rn(s), l = I.readExactSubarray(f, h, h + c);
          return h += l.length, { read: h, signatureParams: { RS: l } };
        }
        default:
          throw new Ne("Unknown signature algorithm.");
      }
    })(this.publicKeyAlgorithm, a);
    if (n < a.length) throw Error("Error reading MPIs");
    this.params = o;
  }
  writeParams() {
    return this.params instanceof Promise ? tn((async () => zi(this.publicKeyAlgorithm, await this.params))) : zi(this.publicKeyAlgorithm, this.params);
  }
  write() {
    const t = [];
    return t.push(this.signatureData), t.push(this.writeUnhashedSubPackets()), t.push(this.signedHashValue), this.version === 6 && (t.push(new Uint8Array([this.salt.length])), t.push(this.salt)), t.push(this.writeParams()), I.concat(t);
  }
  async sign(t, i, r = /* @__PURE__ */ new Date(), a = !1, n) {
    this.version = t.version, this.created = I.normalizeDate(r), this.issuerKeyVersion = t.version, this.issuerFingerprint = t.getFingerprintBytes(), this.issuerKeyID = t.getKeyID();
    const o = [new Uint8Array([this.version, this.signatureType, this.publicKeyAlgorithm, this.hashAlgorithm])];
    if (this.version === 6) {
      const c = bi(this.hashAlgorithm);
      if (this.salt === null) this.salt = Yr(c);
      else if (c !== this.salt.length) throw Error("Provided salt does not have the required length");
    } else if (n.nonDeterministicSignaturesViaNotation) {
      if (this.rawNotations.filter((({ name: c }) => c === _n)).length !== 0) throw Error("Unexpected existing salt notation");
      {
        const c = Yr(bi(this.hashAlgorithm));
        this.rawNotations.push({ name: _n, value: c, humanReadable: !1, critical: !1 });
      }
    }
    o.push(this.writeHashedSubPackets()), this.unhashedSubpackets = [], this.signatureData = I.concat(o);
    const s = this.toHash(this.signatureType, i, a), f = await this.hash(this.signatureType, i, s, a);
    this.signedHashValue = Pe(yn(f), 0, 2);
    const h = async () => Ts(this.publicKeyAlgorithm, this.hashAlgorithm, t.publicParams, t.privateParams, s, await yr(f));
    I.isStream(f) ? this.params = h() : (this.params = await h(), this[rr] = !0);
  }
  writeHashedSubPackets() {
    const t = p.signatureSubpacket, i = [];
    let r;
    if (this.created === null) throw Error("Missing signature creation time");
    i.push($(t.signatureCreationTime, !0, I.writeDate(this.created))), this.signatureExpirationTime !== null && i.push($(t.signatureExpirationTime, !0, I.writeNumber(this.signatureExpirationTime, 4))), this.exportable !== null && i.push($(t.exportableCertification, !0, new Uint8Array([this.exportable ? 1 : 0]))), this.trustLevel !== null && (r = new Uint8Array([this.trustLevel, this.trustAmount]), i.push($(t.trustSignature, !0, r))), this.regularExpression !== null && i.push($(t.regularExpression, !0, this.regularExpression)), this.revocable !== null && i.push($(t.revocable, !0, new Uint8Array([this.revocable ? 1 : 0]))), this.keyExpirationTime !== null && i.push($(t.keyExpirationTime, !0, I.writeNumber(this.keyExpirationTime, 4))), this.preferredSymmetricAlgorithms !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.preferredSymmetricAlgorithms)), i.push($(t.preferredSymmetricAlgorithms, !1, r))), this.revocationKeyClass !== null && (r = new Uint8Array([this.revocationKeyClass, this.revocationKeyAlgorithm]), r = I.concat([r, this.revocationKeyFingerprint]), i.push($(t.revocationKey, !1, r))), !this.issuerKeyID.isNull() && this.issuerKeyVersion < 5 && i.push($(t.issuerKeyID, !1, this.issuerKeyID.write())), this.rawNotations.forEach((({ name: o, value: s, humanReadable: f, critical: h }) => {
      r = [new Uint8Array([f ? 128 : 0, 0, 0, 0])];
      const c = I.encodeUTF8(o);
      r.push(I.writeNumber(c.length, 2)), r.push(I.writeNumber(s.length, 2)), r.push(c), r.push(s), r = I.concat(r), i.push($(t.notationData, h, r));
    })), this.preferredHashAlgorithms !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.preferredHashAlgorithms)), i.push($(t.preferredHashAlgorithms, !1, r))), this.preferredCompressionAlgorithms !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.preferredCompressionAlgorithms)), i.push($(t.preferredCompressionAlgorithms, !1, r))), this.keyServerPreferences !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.keyServerPreferences)), i.push($(t.keyServerPreferences, !1, r))), this.preferredKeyServer !== null && i.push($(t.preferredKeyServer, !1, I.encodeUTF8(this.preferredKeyServer))), this.isPrimaryUserID !== null && i.push($(t.primaryUserID, !1, new Uint8Array([this.isPrimaryUserID ? 1 : 0]))), this.policyURI !== null && i.push($(t.policyURI, !1, I.encodeUTF8(this.policyURI))), this.keyFlags !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.keyFlags)), i.push($(t.keyFlags, !0, r))), this.signersUserID !== null && i.push($(t.signersUserID, !1, I.encodeUTF8(this.signersUserID))), this.reasonForRevocationFlag !== null && (r = I.stringToUint8Array(String.fromCharCode(this.reasonForRevocationFlag) + this.reasonForRevocationString), i.push($(t.reasonForRevocation, !0, r))), this.features !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.features)), i.push($(t.features, !1, r))), this.signatureTargetPublicKeyAlgorithm !== null && (r = [new Uint8Array([this.signatureTargetPublicKeyAlgorithm, this.signatureTargetHashAlgorithm])], r.push(I.stringToUint8Array(this.signatureTargetHash)), r = I.concat(r), i.push($(t.signatureTarget, !0, r))), this.embeddedSignature !== null && i.push($(t.embeddedSignature, !0, this.embeddedSignature.write())), this.issuerFingerprint !== null && (r = [new Uint8Array([this.issuerKeyVersion]), this.issuerFingerprint], r = I.concat(r), i.push($(t.issuerFingerprint, this.version >= 5, r))), this.preferredAEADAlgorithms !== null && (r = I.stringToUint8Array(I.uint8ArrayToString(this.preferredAEADAlgorithms)), i.push($(t.preferredAEADAlgorithms, !1, r))), this.preferredCipherSuites !== null && (r = new Uint8Array([].concat(...this.preferredCipherSuites)), i.push($(t.preferredCipherSuites, !1, r)));
    const a = I.concat(i), n = I.writeNumber(a.length, this.version === 6 ? 4 : 2);
    return I.concat([n, a]);
  }
  writeUnhashedSubPackets() {
    const t = this.unhashedSubpackets.map((({ type: a, critical: n, body: o }) => $(a, n, o))), i = I.concat(t), r = I.writeNumber(i.length, this.version === 6 ? 4 : 2);
    return I.concat([r, i]);
  }
  readSubPacket(t, i = !0) {
    let r = 0;
    const a = !!(128 & t[r]), n = 127 & t[r];
    if (r++, i || (this.unhashedSubpackets.push({ type: n, critical: a, body: t.subarray(r, t.length) }), Ls.has(n))) switch (n) {
      case p.signatureSubpacket.signatureCreationTime:
        this.created = I.readDate(t.subarray(r, t.length));
        break;
      case p.signatureSubpacket.signatureExpirationTime: {
        const o = I.readNumber(t.subarray(r, t.length));
        this.signatureNeverExpires = o === 0, this.signatureExpirationTime = o;
        break;
      }
      case p.signatureSubpacket.exportableCertification:
        this.exportable = t[r++] === 1;
        break;
      case p.signatureSubpacket.trustSignature:
        this.trustLevel = t[r++], this.trustAmount = t[r++];
        break;
      case p.signatureSubpacket.regularExpression:
        this.regularExpression = t[r];
        break;
      case p.signatureSubpacket.revocable:
        this.revocable = t[r++] === 1;
        break;
      case p.signatureSubpacket.keyExpirationTime: {
        const o = I.readNumber(t.subarray(r, t.length));
        this.keyExpirationTime = o, this.keyNeverExpires = o === 0;
        break;
      }
      case p.signatureSubpacket.preferredSymmetricAlgorithms:
        this.preferredSymmetricAlgorithms = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.revocationKey:
        this.revocationKeyClass = t[r++], this.revocationKeyAlgorithm = t[r++], this.revocationKeyFingerprint = t.subarray(r, r + 20);
        break;
      case p.signatureSubpacket.issuerKeyID:
        if (this.version === 4) this.issuerKeyID.read(t.subarray(r, t.length));
        else if (i) throw Error("Unexpected Issuer Key ID subpacket");
        break;
      case p.signatureSubpacket.notationData: {
        const o = !!(128 & t[r]);
        r += 4;
        const s = I.readNumber(t.subarray(r, r + 2));
        r += 2;
        const f = I.readNumber(t.subarray(r, r + 2));
        r += 2;
        const h = I.decodeUTF8(t.subarray(r, r + s)), c = t.subarray(r + s, r + s + f);
        this.rawNotations.push({ name: h, humanReadable: o, value: c, critical: a }), o && (this.notations[h] = I.decodeUTF8(c));
        break;
      }
      case p.signatureSubpacket.preferredHashAlgorithms:
        this.preferredHashAlgorithms = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.preferredCompressionAlgorithms:
        this.preferredCompressionAlgorithms = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.keyServerPreferences:
        this.keyServerPreferences = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.preferredKeyServer:
        this.preferredKeyServer = I.decodeUTF8(t.subarray(r, t.length));
        break;
      case p.signatureSubpacket.primaryUserID:
        this.isPrimaryUserID = t[r++] !== 0;
        break;
      case p.signatureSubpacket.policyURI:
        this.policyURI = I.decodeUTF8(t.subarray(r, t.length));
        break;
      case p.signatureSubpacket.keyFlags:
        this.keyFlags = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.signersUserID:
        this.signersUserID = I.decodeUTF8(t.subarray(r, t.length));
        break;
      case p.signatureSubpacket.reasonForRevocation:
        this.reasonForRevocationFlag = t[r++], this.reasonForRevocationString = I.decodeUTF8(t.subarray(r, t.length));
        break;
      case p.signatureSubpacket.features:
        this.features = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.signatureTarget: {
        this.signatureTargetPublicKeyAlgorithm = t[r++], this.signatureTargetHashAlgorithm = t[r++];
        const o = xe(this.signatureTargetHashAlgorithm);
        this.signatureTargetHash = I.uint8ArrayToString(t.subarray(r, r + o));
        break;
      }
      case p.signatureSubpacket.embeddedSignature:
        this.embeddedSignature = new qt(), this.embeddedSignature.read(t.subarray(r, t.length));
        break;
      case p.signatureSubpacket.issuerFingerprint:
        this.issuerKeyVersion = t[r++], this.issuerFingerprint = t.subarray(r, t.length), this.issuerKeyVersion >= 5 ? this.issuerKeyID.read(this.issuerFingerprint) : this.issuerKeyID.read(this.issuerFingerprint.subarray(-8));
        break;
      case p.signatureSubpacket.preferredAEADAlgorithms:
        this.preferredAEADAlgorithms = [...t.subarray(r, t.length)];
        break;
      case p.signatureSubpacket.preferredCipherSuites:
        this.preferredCipherSuites = [];
        for (let o = r; o < t.length; o += 2) this.preferredCipherSuites.push([t[o], t[o + 1]]);
        break;
      default:
        this.unknownSubpackets.push({ type: n, critical: a, body: t.subarray(r, t.length) });
    }
  }
  readSubPackets(t, i = !0, r) {
    const a = this.version === 6 ? 4 : 2, n = I.readNumber(t.subarray(0, a));
    let o = a;
    for (; o < 2 + n; ) {
      const s = rs(t.subarray(o, t.length));
      o += s.offset, this.readSubPacket(t.subarray(o, o + s.len), i, r), o += s.len;
    }
    return o;
  }
  toSign(t, i) {
    const r = p.signature;
    switch (t) {
      case r.binary:
        return i.text !== null ? I.encodeUTF8(i.getText(!0)) : i.getBytes(!0);
      case r.text: {
        const a = i.getBytes(!0);
        return I.canonicalizeEOL(a);
      }
      case r.standalone:
        return new Uint8Array(0);
      case r.certGeneric:
      case r.certPersona:
      case r.certCasual:
      case r.certPositive:
      case r.certRevocation: {
        let a, n;
        if (i.userID) n = 180, a = i.userID;
        else {
          if (!i.userAttribute) throw Error("Either a userID or userAttribute packet needs to be supplied for certification.");
          n = 209, a = i.userAttribute;
        }
        const o = a.write();
        return I.concat([this.toSign(r.key, i), new Uint8Array([n]), I.writeNumber(o.length, 4), o]);
      }
      case r.subkeyBinding:
      case r.subkeyRevocation:
      case r.keyBinding:
        return I.concat([this.toSign(r.key, i), this.toSign(r.key, { key: i.bind })]);
      case r.key:
        if (i.key === void 0) throw Error("Key packet is required for this signature.");
        return i.key.writeForHash(this.version);
      case r.keyRevocation:
        return this.toSign(r.key, i);
      case r.timestamp:
        return new Uint8Array(0);
      case r.thirdParty:
        throw Error("Not implemented");
      default:
        throw Error("Unknown signature type.");
    }
  }
  calculateTrailer(t, i) {
    let r = 0;
    return Oe(yn(this.signatureData), ((a) => {
      r += a.length;
    }), (() => {
      const a = [];
      return this.version !== 5 || this.signatureType !== p.signature.binary && this.signatureType !== p.signature.text || (i ? a.push(new Uint8Array(6)) : a.push(t.writeHeader())), a.push(new Uint8Array([this.version, 255])), this.version === 5 && a.push(new Uint8Array(4)), a.push(I.writeNumber(r, 4)), I.concat(a);
    }));
  }
  toHash(t, i, r = !1) {
    const a = this.toSign(t, i);
    return I.concat([this.salt || new Uint8Array(), a, this.signatureData, this.calculateTrailer(i, r)]);
  }
  async hash(t, i, r, a = !1) {
    if (this.version === 6 && this.salt.length !== bi(this.hashAlgorithm)) throw Error("Signature salt does not have the expected length");
    return r || (r = this.toHash(t, i, a)), Fi(this.hashAlgorithm, r);
  }
  async verify(t, i, r, a = /* @__PURE__ */ new Date(), n = !1, o = Wt) {
    if (!this.issuerKeyID.equals(t.getKeyID())) throw Error("Signature was not issued by the given public key");
    if (this.publicKeyAlgorithm !== t.algorithm) throw Error("Public key algorithm used to sign signature does not match issuer key algorithm.");
    const s = i === p.signature.binary || i === p.signature.text;
    if (!(this[rr] && !s)) {
      let h, c;
      if (this.hashed ? c = await this.hashed : (h = this.toHash(i, r, n), c = await this.hash(i, r, h)), c = await yr(c), this.signedHashValue[0] !== c[0] || this.signedHashValue[1] !== c[1]) throw Error("Signed digest did not match");
      if (this.params = await this.params, this[rr] = await As(this.publicKeyAlgorithm, this.hashAlgorithm, this.params, t.publicParams, h, c), !this[rr]) throw Error("Signature verification failed");
    }
    const f = I.normalizeDate(a);
    if (f && this.created > f) throw Error("Signature creation time is in the future");
    if (f && f >= this.getExpirationTime()) throw Error("Signature is expired");
    if (o.rejectHashAlgorithms.has(this.hashAlgorithm)) throw Error("Insecure hash algorithm: " + p.read(p.hash, this.hashAlgorithm).toUpperCase());
    if (o.rejectMessageHashAlgorithms.has(this.hashAlgorithm) && [p.signature.binary, p.signature.text].includes(this.signatureType)) throw Error("Insecure message hash algorithm: " + p.read(p.hash, this.hashAlgorithm).toUpperCase());
    if (this.unknownSubpackets.forEach((({ type: h, critical: c }) => {
      if (c) throw Error("Unknown critical signature subpacket type " + h);
    })), this.rawNotations.forEach((({ name: h, critical: c }) => {
      if (c && o.knownNotations.indexOf(h) < 0) throw Error("Unknown critical notation: " + h);
    })), this.revocationKeyClass !== null) throw Error("This key is intended to be revoked with an authorized key, which OpenPGP.js does not support.");
  }
  isExpired(t = /* @__PURE__ */ new Date()) {
    const i = I.normalizeDate(t);
    return i !== null && !(this.created <= i && i < this.getExpirationTime());
  }
  getExpirationTime() {
    return this.signatureNeverExpires ? 1 / 0 : new Date(this.created.getTime() + 1e3 * this.signatureExpirationTime);
  }
}
function $(e, t, i) {
  const r = [];
  return r.push(is(i.length + 1)), r.push(new Uint8Array([(t ? 128 : 0) | e])), r.push(i), I.concat(r);
}
function bi(e) {
  switch (e) {
    case p.hash.sha256:
      return 16;
    case p.hash.sha384:
      return 24;
    case p.hash.sha512:
      return 32;
    case p.hash.sha224:
    case p.hash.sha3_256:
      return 16;
    case p.hash.sha3_512:
      return 32;
    default:
      throw Error("Unsupported hash function");
  }
}
class ur {
  static get tag() {
    return p.packet.onePassSignature;
  }
  static fromSignaturePacket(t, i) {
    const r = new ur();
    return r.version = t.version === 6 ? 6 : 3, r.signatureType = t.signatureType, r.hashAlgorithm = t.hashAlgorithm, r.publicKeyAlgorithm = t.publicKeyAlgorithm, r.issuerKeyID = t.issuerKeyID, r.salt = t.salt, r.issuerFingerprint = t.issuerFingerprint, r.flags = i ? 1 : 0, r;
  }
  constructor() {
    this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.salt = null, this.issuerKeyID = null, this.issuerFingerprint = null, this.flags = null;
  }
  read(t) {
    let i = 0;
    if (this.version = t[i++], this.version !== 3 && this.version !== 6) throw new Ne(`Version ${this.version} of the one-pass signature packet is unsupported.`);
    if (this.signatureType = t[i++], this.hashAlgorithm = t[i++], this.publicKeyAlgorithm = t[i++], this.version === 6) {
      const r = t[i++];
      this.salt = t.subarray(i, i + r), i += r, this.issuerFingerprint = t.subarray(i, i + 32), i += 32, this.issuerKeyID = new kt(), this.issuerKeyID.read(this.issuerFingerprint);
    } else this.issuerKeyID = new kt(), this.issuerKeyID.read(t.subarray(i, i + 8)), i += 8;
    return this.flags = t[i++], this;
  }
  write() {
    const t = [new Uint8Array([this.version, this.signatureType, this.hashAlgorithm, this.publicKeyAlgorithm])];
    return this.version === 6 ? t.push(new Uint8Array([this.salt.length]), this.salt, this.issuerFingerprint) : t.push(this.issuerKeyID.write()), t.push(new Uint8Array([this.flags])), I.concatUint8Array(t);
  }
  calculateTrailer(...t) {
    return tn((async () => qt.prototype.calculateTrailer.apply(await this.correspondingSig, t)));
  }
  async verify() {
    const t = await this.correspondingSig;
    if (!t || t.constructor.tag !== p.packet.signature) throw Error("Corresponding signature packet missing");
    if (t.signatureType !== this.signatureType || t.hashAlgorithm !== this.hashAlgorithm || t.publicKeyAlgorithm !== this.publicKeyAlgorithm || !t.issuerKeyID.equals(this.issuerKeyID) || this.version === 3 && t.version === 6 || this.version === 6 && t.version !== 6 || this.version === 6 && !I.equalsUint8Array(t.issuerFingerprint, this.issuerFingerprint) || this.version === 6 && !I.equalsUint8Array(t.salt, this.salt)) throw Error("Corresponding signature packet does not match one-pass signature packet");
    return t.hashed = this.hashed, t.verify.apply(t, arguments);
  }
}
ur.prototype.hash = qt.prototype.hash, ur.prototype.toHash = qt.prototype.toHash, ur.prototype.toSign = qt.prototype.toSign;
var On;
(function(e) {
  e[e.EmptyMessage = 0] = "EmptyMessage", e[e.PlaintextOrEncryptedData = 1] = "PlaintextOrEncryptedData", e[e.EncryptedSessionKeys = 2] = "EncryptedSessionKeys", e[e.StandaloneAdditionalAllowedData = 3] = "StandaloneAdditionalAllowedData";
})(On || (On = {}));
class Mt {
  static get tag() {
    return p.packet.publicKey;
  }
  constructor(t = /* @__PURE__ */ new Date(), i = Wt) {
    this.version = i.v6Keys ? 6 : 4, this.created = I.normalizeDate(t), this.algorithm = null, this.publicParams = null, this.expirationTimeV3 = 0, this.fingerprint = null, this.keyID = null;
  }
  static fromSecretKeyPacket(t) {
    const i = new Mt(), { version: r, created: a, algorithm: n, publicParams: o, keyID: s, fingerprint: f } = t;
    return i.version = r, i.created = a, i.algorithm = n, i.publicParams = o, i.keyID = s, i.fingerprint = f, i;
  }
  async read(t, i = Wt) {
    let r = 0;
    if (this.version = t[r++], this.version === 5 && !i.enableParsingV5Entities) throw new Ne("Support for parsing v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
    if (this.version === 4 || this.version === 5 || this.version === 6) {
      this.created = I.readDate(t.subarray(r, r + 4)), r += 4, this.algorithm = t[r++], this.version >= 5 && (r += 4);
      const { read: a, publicParams: n } = (function(o, s) {
        let f = 0;
        switch (o) {
          case p.publicKey.rsaEncrypt:
          case p.publicKey.rsaEncryptSign:
          case p.publicKey.rsaSign: {
            const h = I.readMPI(s.subarray(f));
            f += h.length + 2;
            const c = I.readMPI(s.subarray(f));
            return f += c.length + 2, { read: f, publicParams: { n: h, e: c } };
          }
          case p.publicKey.dsa: {
            const h = I.readMPI(s.subarray(f));
            f += h.length + 2;
            const c = I.readMPI(s.subarray(f));
            f += c.length + 2;
            const l = I.readMPI(s.subarray(f));
            f += l.length + 2;
            const u = I.readMPI(s.subarray(f));
            return f += u.length + 2, { read: f, publicParams: { p: h, q: c, g: l, y: u } };
          }
          case p.publicKey.elgamal: {
            const h = I.readMPI(s.subarray(f));
            f += h.length + 2;
            const c = I.readMPI(s.subarray(f));
            f += c.length + 2;
            const l = I.readMPI(s.subarray(f));
            return f += l.length + 2, { read: f, publicParams: { p: h, g: c, y: l } };
          }
          case p.publicKey.ecdsa: {
            const h = new jt();
            f += h.read(s), yi(h);
            const c = I.readMPI(s.subarray(f));
            return f += c.length + 2, { read: f, publicParams: { oid: h, Q: c } };
          }
          case p.publicKey.eddsaLegacy: {
            const h = new jt();
            if (f += h.read(s), yi(h), h.getName() !== p.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
            let c = I.readMPI(s.subarray(f));
            return f += c.length + 2, c = I.leftPad(c, 33), { read: f, publicParams: { oid: h, Q: c } };
          }
          case p.publicKey.ecdh: {
            const h = new jt();
            f += h.read(s), yi(h);
            const c = I.readMPI(s.subarray(f));
            f += c.length + 2;
            const l = new ws();
            return f += l.read(s.subarray(f)), { read: f, publicParams: { oid: h, Q: c, kdfParams: l } };
          }
          case p.publicKey.ed25519:
          case p.publicKey.ed448:
          case p.publicKey.x25519:
          case p.publicKey.x448: {
            const h = I.readExactSubarray(s, f, f + Es(o));
            return f += h.length, { read: f, publicParams: { A: h } };
          }
          default:
            throw new Ne("Unknown public key encryption algorithm.");
        }
      })(this.algorithm, t.subarray(r));
      if (this.version === 6 && n.oid && (n.oid.getName() === p.curve.curve25519Legacy || n.oid.getName() === p.curve.ed25519Legacy)) throw Error("Legacy curve25519 cannot be used with v6 keys");
      return this.publicParams = n, r += a, await this.computeFingerprintAndKeyID(), r;
    }
    throw new Ne(`Version ${this.version} of the key packet is unsupported.`);
  }
  write() {
    const t = [];
    t.push(new Uint8Array([this.version])), t.push(I.writeDate(this.created)), t.push(new Uint8Array([this.algorithm]));
    const i = zi(this.algorithm, this.publicParams);
    return this.version >= 5 && t.push(I.writeNumber(i.length, 4)), t.push(i), I.concatUint8Array(t);
  }
  writeForHash(t) {
    const i = this.writePublicKey(), r = 149 + t, a = t >= 5 ? 4 : 2;
    return I.concatUint8Array([new Uint8Array([r]), I.writeNumber(i.length, a), i]);
  }
  isDecrypted() {
    return null;
  }
  getCreationTime() {
    return this.created;
  }
  getKeyID() {
    return this.keyID;
  }
  async computeFingerprintAndKeyID() {
    if (await this.computeFingerprint(), this.keyID = new kt(), this.version >= 5) this.keyID.read(this.fingerprint.subarray(0, 8));
    else {
      if (this.version !== 4) throw Error("Unsupported key version");
      this.keyID.read(this.fingerprint.subarray(12, 20));
    }
  }
  async computeFingerprint() {
    const t = this.writeForHash(this.version);
    if (this.version >= 5) this.fingerprint = await Fi(p.hash.sha256, t);
    else {
      if (this.version !== 4) throw Error("Unsupported key version");
      this.fingerprint = await Fi(p.hash.sha1, t);
    }
  }
  getFingerprintBytes() {
    return this.fingerprint;
  }
  getFingerprint() {
    return I.uint8ArrayToHex(this.getFingerprintBytes());
  }
  hasSameFingerprintAs(t) {
    return this.version === t.version && I.equalsUint8Array(this.writePublicKey(), t.writePublicKey());
  }
  getAlgorithmInfo() {
    const t = {};
    t.algorithm = p.read(p.publicKey, this.algorithm);
    const i = this.publicParams.n || this.publicParams.p;
    return i ? t.bits = I.uint8ArrayBitLength(i) : this.publicParams.oid && (t.curve = this.publicParams.oid.getName()), t;
  }
}
Mt.prototype.readPublicKey = Mt.prototype.read, Mt.prototype.writePublicKey = Mt.prototype.write;
p.packet.publicKey, p.packet.privateKey;
p.packet.publicKey, p.packet.privateKey, p.packet.publicSubkey, p.packet.privateSubkey;
Object.keys(Wt).length;
const Ct = typeof be == "object" && "crypto" in be ? be.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ir(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function vr(e) {
  if (!Number.isSafeInteger(e) || e < 0) throw Error("positive integer expected, got " + e);
}
function Je(e, ...t) {
  if (!Ir(e)) throw Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length)) throw Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function i2(e) {
  if (typeof e != "function" || typeof e.create != "function") throw Error("Hash should be wrapped by utils.createHasher");
  vr(e.outputLen), vr(e.blockLen);
}
function Qt(e, t = !0) {
  if (e.destroyed) throw Error("Hash instance has been destroyed");
  if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function n2(e, t) {
  Je(e);
  const i = t.outputLen;
  if (e.length < i) throw Error("digestInto() expects output buffer of length at least " + i);
}
function ke(...e) {
  for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function wi(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ze(e, t) {
  return e << 32 - t | e >>> t;
}
function wt(e, t) {
  return e << t | e >>> 32 - t >>> 0;
}
const Pn = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68 ? (e) => e : function(e) {
  for (let i = 0; i < e.length; i++) e[i] = (t = e[i]) << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
  var t;
  return e;
}, a2 = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Bs = /* @__PURE__ */ Array.from({ length: 256 }, ((e, t) => t.toString(16).padStart(2, "0")));
function Ot(e) {
  if (Je(e), a2) return e.toHex();
  let t = "";
  for (let i = 0; i < e.length; i++) t += Bs[e[i]];
  return t;
}
const Nn = 48, Xs = 57, kn = 65, Cs = 70, Un = 97, Ds = 102;
function Ln(e) {
  return e >= Nn && e <= Xs ? e - Nn : e >= kn && e <= Cs ? e - (kn - 10) : e >= Un && e <= Ds ? e - (Un - 10) : void 0;
}
function $r(e) {
  if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
  if (a2) return Uint8Array.fromHex(e);
  const t = e.length, i = t / 2;
  if (t % 2) throw Error("hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(i);
  for (let a = 0, n = 0; a < i; a++, n += 2) {
    const o = Ln(e.charCodeAt(n)), s = Ln(e.charCodeAt(n + 1));
    if (o === void 0 || s === void 0) {
      const f = e[n] + e[n + 1];
      throw Error('hex string expected, got non-hex character "' + f + '" at index ' + n);
    }
    r[a] = 16 * o + s;
  }
  return r;
}
function _r(e) {
  return typeof e == "string" && (e = (function(t) {
    if (typeof t != "string") throw Error("string expected");
    return new Uint8Array(new TextEncoder().encode(t));
  })(e)), Je(e), e;
}
function Xe(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    Je(a), t += a.length;
  }
  const i = new Uint8Array(t);
  for (let r = 0, a = 0; r < e.length; r++) {
    const n = e[r];
    i.set(n, a), a += n.length;
  }
  return i;
}
class an {
}
function ct(e) {
  const t = (r) => e().update(_r(r)).digest(), i = e();
  return t.outputLen = i.outputLen, t.blockLen = i.blockLen, t.create = () => e(), t;
}
const Fs = ct;
function oi(e = 32) {
  if (Ct && typeof Ct.getRandomValues == "function") return Ct.getRandomValues(new Uint8Array(e));
  if (Ct && typeof Ct.randomBytes == "function") return Uint8Array.from(Ct.randomBytes(e));
  throw Error("crypto.getRandomValues must be defined");
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const on = /* @__PURE__ */ BigInt(0), Ki = /* @__PURE__ */ BigInt(1);
function Ut(e, t = "") {
  if (typeof e != "boolean")
    throw Error((t && `"${t}"`) + "expected boolean, got type=" + typeof e);
  return e;
}
function Fe(e, t, i = "") {
  const r = Ir(e), a = e?.length, n = t !== void 0;
  if (!r || n && a !== t)
    throw Error((i && `"${i}" `) + "expected Uint8Array" + (n ? " of length " + t : "") + ", got " + (r ? "length=" + a : "type=" + typeof e));
  return e;
}
function kr(e) {
  const t = e.toString(16);
  return 1 & t.length ? "0" + t : t;
}
function o2(e) {
  if (typeof e != "string") throw Error("hex string expected, got " + typeof e);
  return e === "" ? on : BigInt("0x" + e);
}
function si(e) {
  return o2(Ot(e));
}
function Lt(e) {
  return Je(e), o2(Ot(Uint8Array.from(e).reverse()));
}
function sn(e, t) {
  return $r(e.toString(16).padStart(2 * t, "0"));
}
function fn(e, t) {
  return sn(e, t).reverse();
}
function ne(e, t, i) {
  let r;
  if (typeof t == "string") try {
    r = $r(t);
  } catch (n) {
    throw Error(e + " must be hex string or Uint8Array, cause: " + n);
  }
  else {
    if (!Ir(t)) throw Error(e + " must be hex string or Uint8Array");
    r = Uint8Array.from(t);
  }
  const a = r.length;
  if (typeof i == "number" && a !== i) throw Error(e + " of length " + i + " expected, got " + a);
  return r;
}
function Bn(e) {
  return Uint8Array.from(e);
}
const Ei = (e) => typeof e == "bigint" && on <= e;
function Ar(e, t, i, r) {
  if (!(function(a, n, o) {
    return Ei(a) && Ei(n) && Ei(o) && n <= a && a < o;
  })(t, i, r)) throw Error("expected valid " + e + ": " + i + " <= n < " + r + ", got " + t);
}
function s2(e) {
  let t;
  for (t = 0; e > on; e >>= Ki, t += 1) ;
  return t;
}
const Or = (e) => (Ki << BigInt(e)) - Ki;
function $t(e, t, i = {}) {
  if (!e || typeof e != "object") throw Error("expected valid options object");
  function r(a, n, o) {
    const s = e[a];
    if (o && s === void 0) return;
    const f = typeof s;
    if (f !== n || s === null) throw Error(`param "${a}" is invalid: expected ${n}, got ${f}`);
  }
  Object.entries(t).forEach((([a, n]) => r(a, n, !1))), Object.entries(i).forEach((([a, n]) => r(a, n, !0)));
}
function ei(e) {
  const t = /* @__PURE__ */ new WeakMap();
  return (i, ...r) => {
    const a = t.get(i);
    if (a !== void 0) return a;
    const n = e(i, ...r);
    return t.set(i, n), n;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ve = BigInt(0), ye = BigInt(1), Rt = /* @__PURE__ */ BigInt(2), f2 = /* @__PURE__ */ BigInt(3), c2 = /* @__PURE__ */ BigInt(4), l2 = /* @__PURE__ */ BigInt(5), xs = /* @__PURE__ */ BigInt(7), h2 = /* @__PURE__ */ BigInt(8), zs = /* @__PURE__ */ BigInt(9), Xn = /* @__PURE__ */ BigInt(16);
function se(e, t) {
  const i = e % t;
  return i >= ve ? i : t + i;
}
function ie(e, t, i) {
  let r = e;
  for (; t-- > ve; ) r *= r, r %= i;
  return r;
}
function Cn(e, t) {
  if (e === ve) throw Error("invert: expected non-zero number");
  if (t <= ve) throw Error("invert: expected positive modulus, got " + t);
  let i = se(e, t), r = t, a = ve, n = ye;
  for (; i !== ve; ) {
    const o = r % i, s = a - n * (r / i);
    r = i, i = o, a = n, n = s;
  }
  if (r !== ye) throw Error("invert: does not exist");
  return se(a, t);
}
function cn(e, t, i) {
  if (!e.eql(e.sqr(t), i)) throw Error("Cannot find square root");
}
function u2(e, t) {
  const i = (e.ORDER + ye) / c2, r = e.pow(t, i);
  return cn(e, r, t), r;
}
function Ks(e, t) {
  const i = (e.ORDER - l2) / h2, r = e.mul(t, Rt), a = e.pow(r, i), n = e.mul(t, a), o = e.mul(e.mul(n, Rt), a), s = e.mul(n, e.sub(o, e.ONE));
  return cn(e, s, t), s;
}
function Dn(e) {
  if (e < f2) throw Error("sqrt is not defined for small field");
  let t = e - ye, i = 0;
  for (; t % Rt === ve; ) t /= Rt, i++;
  let r = Rt;
  const a = Te(e);
  for (; Fn(a, r) === 1; ) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
  if (i === 1) return u2;
  let n = a.pow(r, t);
  const o = (t + ye) / Rt;
  return function(s, f) {
    if (s.is0(f)) return f;
    if (Fn(s, f) !== 1) throw Error("Cannot find square root");
    let h = i, c = s.mul(s.ONE, n), l = s.pow(f, t), u = s.pow(f, o);
    for (; !s.eql(l, s.ONE); ) {
      if (s.is0(l)) return s.ZERO;
      let d = 1, g = s.sqr(l);
      for (; !s.eql(g, s.ONE); ) if (d++, g = s.sqr(g), d === h) throw Error("Cannot find square root");
      const b = ye << BigInt(h - d - 1), T = s.pow(c, b);
      h = d, c = s.sqr(T), l = s.mul(l, c), u = s.mul(u, T);
    }
    return u;
  };
}
function Ms(e) {
  return e % c2 === f2 ? u2 : e % h2 === l2 ? Ks : e % Xn === zs ? (function(t) {
    const i = Te(t), r = Dn(t), a = r(i, i.neg(i.ONE)), n = r(i, a), o = r(i, i.neg(a)), s = (t + xs) / Xn;
    return (f, h) => {
      let c = f.pow(h, s), l = f.mul(c, a);
      const u = f.mul(c, n), d = f.mul(c, o), g = f.eql(f.sqr(l), h), b = f.eql(f.sqr(u), h);
      c = f.cmov(c, l, g), l = f.cmov(d, u, b);
      const T = f.eql(f.sqr(l), h), A = f.cmov(c, l, T);
      return cn(f, A, h), A;
    };
  })(e) : Dn(e);
}
const Gs = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function d2(e, t, i = !1) {
  const r = Array(t.length).fill(i ? e.ZERO : void 0), a = t.reduce(((o, s, f) => e.is0(s) ? o : (r[f] = o, e.mul(o, s))), e.ONE), n = e.inv(a);
  return t.reduceRight(((o, s, f) => e.is0(s) ? o : (r[f] = e.mul(o, r[f]), e.mul(o, s))), n), r;
}
function Fn(e, t) {
  const i = (e.ORDER - ye) / Rt, r = e.pow(t, i), a = e.eql(r, e.ONE), n = e.eql(r, e.ZERO), o = e.eql(r, e.neg(e.ONE));
  if (!a && !n && !o) throw Error("invalid Legendre symbol result");
  return a ? 1 : n ? 0 : -1;
}
function g2(e, t) {
  t !== void 0 && vr(t);
  const i = t !== void 0 ? t : e.toString(2).length;
  return { nBitLength: i, nByteLength: Math.ceil(i / 8) };
}
function Te(e, t, i = !1, r = {}) {
  if (e <= ve) throw Error("invalid field: expected ORDER > 0, got " + e);
  let a, n, o, s = !1;
  if (typeof t == "object" && t != null) {
    if (r.sqrt || i) throw Error("cannot specify opts in two arguments");
    const u = t;
    u.BITS && (a = u.BITS), u.sqrt && (n = u.sqrt), typeof u.isLE == "boolean" && (i = u.isLE), typeof u.modFromBytes == "boolean" && (s = u.modFromBytes), o = u.allowedLengths;
  } else typeof t == "number" && (a = t), r.sqrt && (n = r.sqrt);
  const { nBitLength: f, nByteLength: h } = g2(e, a);
  if (h > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
  let c;
  const l = Object.freeze({ ORDER: e, isLE: i, BITS: f, BYTES: h, MASK: Or(f), ZERO: ve, ONE: ye, allowedLengths: o, create: (u) => se(u, e), isValid: (u) => {
    if (typeof u != "bigint") throw Error("invalid field element: expected bigint, got " + typeof u);
    return ve <= u && u < e;
  }, is0: (u) => u === ve, isValidNot0: (u) => !l.is0(u) && l.isValid(u), isOdd: (u) => (u & ye) === ye, neg: (u) => se(-u, e), eql: (u, d) => u === d, sqr: (u) => se(u * u, e), add: (u, d) => se(u + d, e), sub: (u, d) => se(u - d, e), mul: (u, d) => se(u * d, e), pow: (u, d) => (function(g, b, T) {
    if (T < ve) throw Error("invalid exponent, negatives unsupported");
    if (T === ve) return g.ONE;
    if (T === ye) return b;
    let A = g.ONE, S = b;
    for (; T > ve; ) T & ye && (A = g.mul(A, S)), S = g.sqr(S), T >>= ye;
    return A;
  })(l, u, d), div: (u, d) => se(u * Cn(d, e), e), sqrN: (u) => u * u, addN: (u, d) => u + d, subN: (u, d) => u - d, mulN: (u, d) => u * d, inv: (u) => Cn(u, e), sqrt: n || ((u) => (c || (c = Ms(e)), c(l, u))), toBytes: (u) => i ? fn(u, h) : sn(u, h), fromBytes: (u, d = !0) => {
    if (o) {
      if (!o.includes(u.length) || u.length > h) throw Error("Field.fromBytes: expected " + o + " bytes, got " + u.length);
      const b = new Uint8Array(h);
      b.set(u, i ? 0 : b.length - u.length), u = b;
    }
    if (u.length !== h) throw Error("Field.fromBytes: expected " + h + " bytes, got " + u.length);
    let g = i ? Lt(u) : si(u);
    if (s && (g = se(g, e)), !d && !l.isValid(g)) throw Error("invalid field element: outside of range 0..ORDER");
    return g;
  }, invertBatch: (u) => d2(l, u), cmov: (u, d, g) => g ? d : u });
  return Object.freeze(l);
}
function p2(e) {
  if (typeof e != "bigint") throw Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function xn(e) {
  const t = p2(e);
  return t + Math.ceil(t / 2);
}
function y2(e, t, i) {
  return e & t ^ ~e & i;
}
function b2(e, t, i) {
  return e & t ^ e & i ^ t & i;
}
class Pr extends an {
  constructor(t, i, r, a) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = i, this.padOffset = r, this.isLE = a, this.buffer = new Uint8Array(t), this.view = wi(this.buffer);
  }
  update(t) {
    Qt(this), Je(t = _r(t));
    const { view: i, buffer: r, blockLen: a } = this, n = t.length;
    for (let o = 0; o < n; ) {
      const s = Math.min(a - this.pos, n - o);
      if (s !== a) r.set(t.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === a && (this.process(i, 0), this.pos = 0);
      else {
        const f = wi(t);
        for (; a <= n - o; o += a) this.process(f, o);
      }
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Qt(this), n2(t, this), this.finished = !0;
    const { buffer: i, view: r, blockLen: a, isLE: n } = this;
    let { pos: o } = this;
    i[o++] = 128, ke(this.buffer.subarray(o)), this.padOffset > a - o && (this.process(r, 0), o = 0);
    for (let l = o; l < a; l++) i[l] = 0;
    (function(l, u, d, g) {
      if (typeof l.setBigUint64 == "function") return l.setBigUint64(u, d, g);
      const b = BigInt(32), T = BigInt(4294967295), A = Number(d >> b & T), S = Number(d & T), E = g ? 4 : 0, y = g ? 0 : 4;
      l.setUint32(u + E, A, g), l.setUint32(u + y, S, g);
    })(r, a - 8, BigInt(8 * this.length), n), this.process(r, 0);
    const s = wi(t), f = this.outputLen;
    if (f % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
    const h = f / 4, c = this.get();
    if (h > c.length) throw Error("_sha2: outputLen bigger than state");
    for (let l = 0; l < h; l++) s.setUint32(4 * l, c[l], n);
  }
  digest() {
    const { buffer: t, outputLen: i } = this;
    this.digestInto(t);
    const r = t.slice(0, i);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: i, buffer: r, length: a, finished: n, destroyed: o, pos: s } = this;
    return t.destroyed = o, t.finished = n, t.length = a, t.pos = s, a % i && t.buffer.set(r), t;
  }
  clone() {
    return this._cloneInto();
  }
}
const lt = /* @__PURE__ */ Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), ht = /* @__PURE__ */ Uint32Array.from([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]), de = /* @__PURE__ */ Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]), ge = /* @__PURE__ */ Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]), Ur = /* @__PURE__ */ BigInt(2 ** 32 - 1), zn = /* @__PURE__ */ BigInt(32);
function Hs(e, t = !1) {
  return t ? { h: Number(e & Ur), l: Number(e >> zn & Ur) } : { h: 0 | Number(e >> zn & Ur), l: 0 | Number(e & Ur) };
}
function w2(e, t = !1) {
  const i = e.length;
  let r = new Uint32Array(i), a = new Uint32Array(i);
  for (let n = 0; n < i; n++) {
    const { h: o, l: s } = Hs(e[n], t);
    [r[n], a[n]] = [o, s];
  }
  return [r, a];
}
const Kn = (e, t, i) => e >>> i, Mn = (e, t, i) => e << 32 - i | t >>> i, Dt = (e, t, i) => e >>> i | t << 32 - i, Ft = (e, t, i) => e << 32 - i | t >>> i, Lr = (e, t, i) => e << 64 - i | t >>> i - 32, Br = (e, t, i) => e >>> i - 32 | t << 64 - i;
function et(e, t, i, r) {
  const a = (t >>> 0) + (r >>> 0);
  return { h: e + i + (a / 2 ** 32 | 0) | 0, l: 0 | a };
}
const Vs = (e, t, i) => (e >>> 0) + (t >>> 0) + (i >>> 0), Ys = (e, t, i, r) => t + i + r + (e / 2 ** 32 | 0) | 0, js = (e, t, i, r) => (e >>> 0) + (t >>> 0) + (i >>> 0) + (r >>> 0), qs = (e, t, i, r, a) => t + i + r + a + (e / 2 ** 32 | 0) | 0, Zs = (e, t, i, r, a) => (e >>> 0) + (t >>> 0) + (i >>> 0) + (r >>> 0) + (a >>> 0), Ws = (e, t, i, r, a, n) => t + i + r + a + n + (e / 2 ** 32 | 0) | 0, Qs = /* @__PURE__ */ Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), ut = /* @__PURE__ */ new Uint32Array(64);
class E2 extends Pr {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = 0 | lt[0], this.B = 0 | lt[1], this.C = 0 | lt[2], this.D = 0 | lt[3], this.E = 0 | lt[4], this.F = 0 | lt[5], this.G = 0 | lt[6], this.H = 0 | lt[7];
  }
  get() {
    const { A: t, B: i, C: r, D: a, E: n, F: o, G: s, H: f } = this;
    return [t, i, r, a, n, o, s, f];
  }
  set(t, i, r, a, n, o, s, f) {
    this.A = 0 | t, this.B = 0 | i, this.C = 0 | r, this.D = 0 | a, this.E = 0 | n, this.F = 0 | o, this.G = 0 | s, this.H = 0 | f;
  }
  process(t, i) {
    for (let l = 0; l < 16; l++, i += 4) ut[l] = t.getUint32(i, !1);
    for (let l = 16; l < 64; l++) {
      const u = ut[l - 15], d = ut[l - 2], g = ze(u, 7) ^ ze(u, 18) ^ u >>> 3, b = ze(d, 17) ^ ze(d, 19) ^ d >>> 10;
      ut[l] = b + ut[l - 7] + g + ut[l - 16] | 0;
    }
    let { A: r, B: a, C: n, D: o, E: s, F: f, G: h, H: c } = this;
    for (let l = 0; l < 64; l++) {
      const u = c + (ze(s, 6) ^ ze(s, 11) ^ ze(s, 25)) + y2(s, f, h) + Qs[l] + ut[l] | 0, d = (ze(r, 2) ^ ze(r, 13) ^ ze(r, 22)) + b2(r, a, n) | 0;
      c = h, h = f, f = s, s = o + u | 0, o = n, n = a, a = r, r = u + d | 0;
    }
    r = r + this.A | 0, a = a + this.B | 0, n = n + this.C | 0, o = o + this.D | 0, s = s + this.E | 0, f = f + this.F | 0, h = h + this.G | 0, c = c + this.H | 0, this.set(r, a, n, o, s, f, h, c);
  }
  roundClean() {
    ke(ut);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), ke(this.buffer);
  }
}
class Js extends E2 {
  constructor() {
    super(28), this.A = 0 | ht[0], this.B = 0 | ht[1], this.C = 0 | ht[2], this.D = 0 | ht[3], this.E = 0 | ht[4], this.F = 0 | ht[5], this.G = 0 | ht[6], this.H = 0 | ht[7];
  }
}
const m2 = w2(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(((e) => BigInt(e)))), $s = m2[0], e1 = m2[1], dt = /* @__PURE__ */ new Uint32Array(80), gt = /* @__PURE__ */ new Uint32Array(80);
class v2 extends Pr {
  constructor(t = 64) {
    super(128, t, 16, !1), this.Ah = 0 | ge[0], this.Al = 0 | ge[1], this.Bh = 0 | ge[2], this.Bl = 0 | ge[3], this.Ch = 0 | ge[4], this.Cl = 0 | ge[5], this.Dh = 0 | ge[6], this.Dl = 0 | ge[7], this.Eh = 0 | ge[8], this.El = 0 | ge[9], this.Fh = 0 | ge[10], this.Fl = 0 | ge[11], this.Gh = 0 | ge[12], this.Gl = 0 | ge[13], this.Hh = 0 | ge[14], this.Hl = 0 | ge[15];
  }
  get() {
    const { Ah: t, Al: i, Bh: r, Bl: a, Ch: n, Cl: o, Dh: s, Dl: f, Eh: h, El: c, Fh: l, Fl: u, Gh: d, Gl: g, Hh: b, Hl: T } = this;
    return [t, i, r, a, n, o, s, f, h, c, l, u, d, g, b, T];
  }
  set(t, i, r, a, n, o, s, f, h, c, l, u, d, g, b, T) {
    this.Ah = 0 | t, this.Al = 0 | i, this.Bh = 0 | r, this.Bl = 0 | a, this.Ch = 0 | n, this.Cl = 0 | o, this.Dh = 0 | s, this.Dl = 0 | f, this.Eh = 0 | h, this.El = 0 | c, this.Fh = 0 | l, this.Fl = 0 | u, this.Gh = 0 | d, this.Gl = 0 | g, this.Hh = 0 | b, this.Hl = 0 | T;
  }
  process(t, i) {
    for (let E = 0; E < 16; E++, i += 4) dt[E] = t.getUint32(i), gt[E] = t.getUint32(i += 4);
    for (let E = 16; E < 80; E++) {
      const y = 0 | dt[E - 15], _ = 0 | gt[E - 15], k = Dt(y, _, 1) ^ Dt(y, _, 8) ^ Kn(y, 0, 7), N = Ft(y, _, 1) ^ Ft(y, _, 8) ^ Mn(y, _, 7), m = 0 | dt[E - 2], w = 0 | gt[E - 2], O = Dt(m, w, 19) ^ Lr(m, w, 61) ^ Kn(m, 0, 6), v = Ft(m, w, 19) ^ Br(m, w, 61) ^ Mn(m, w, 6), R = js(N, v, gt[E - 7], gt[E - 16]), P = qs(R, k, O, dt[E - 7], dt[E - 16]);
      dt[E] = 0 | P, gt[E] = 0 | R;
    }
    let { Ah: r, Al: a, Bh: n, Bl: o, Ch: s, Cl: f, Dh: h, Dl: c, Eh: l, El: u, Fh: d, Fl: g, Gh: b, Gl: T, Hh: A, Hl: S } = this;
    for (let E = 0; E < 80; E++) {
      const y = Dt(l, u, 14) ^ Dt(l, u, 18) ^ Lr(l, u, 41), _ = Ft(l, u, 14) ^ Ft(l, u, 18) ^ Br(l, u, 41), k = l & d ^ ~l & b, N = Zs(S, _, u & g ^ ~u & T, e1[E], gt[E]), m = Ws(N, A, y, k, $s[E], dt[E]), w = 0 | N, O = Dt(r, a, 28) ^ Lr(r, a, 34) ^ Lr(r, a, 39), v = Ft(r, a, 28) ^ Br(r, a, 34) ^ Br(r, a, 39), R = r & n ^ r & s ^ n & s, P = a & o ^ a & f ^ o & f;
      A = 0 | b, S = 0 | T, b = 0 | d, T = 0 | g, d = 0 | l, g = 0 | u, { h: l, l: u } = et(0 | h, 0 | c, 0 | m, 0 | w), h = 0 | s, c = 0 | f, s = 0 | n, f = 0 | o, n = 0 | r, o = 0 | a;
      const U = Vs(w, v, P);
      r = Ys(U, m, O, R), a = 0 | U;
    }
    ({ h: r, l: a } = et(0 | this.Ah, 0 | this.Al, 0 | r, 0 | a)), { h: n, l: o } = et(0 | this.Bh, 0 | this.Bl, 0 | n, 0 | o), { h: s, l: f } = et(0 | this.Ch, 0 | this.Cl, 0 | s, 0 | f), { h, l: c } = et(0 | this.Dh, 0 | this.Dl, 0 | h, 0 | c), { h: l, l: u } = et(0 | this.Eh, 0 | this.El, 0 | l, 0 | u), { h: d, l: g } = et(0 | this.Fh, 0 | this.Fl, 0 | d, 0 | g), { h: b, l: T } = et(0 | this.Gh, 0 | this.Gl, 0 | b, 0 | T), { h: A, l: S } = et(0 | this.Hh, 0 | this.Hl, 0 | A, 0 | S), this.set(r, a, n, o, s, f, h, c, l, u, d, g, b, T, A, S);
  }
  roundClean() {
    ke(dt, gt);
  }
  destroy() {
    ke(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class t1 extends v2 {
  constructor() {
    super(48), this.Ah = 0 | de[0], this.Al = 0 | de[1], this.Bh = 0 | de[2], this.Bl = 0 | de[3], this.Ch = 0 | de[4], this.Cl = 0 | de[5], this.Dh = 0 | de[6], this.Dl = 0 | de[7], this.Eh = 0 | de[8], this.El = 0 | de[9], this.Fh = 0 | de[10], this.Fl = 0 | de[11], this.Gh = 0 | de[12], this.Gl = 0 | de[13], this.Hh = 0 | de[14], this.Hl = 0 | de[15];
  }
}
const ln = /* @__PURE__ */ ct((() => new E2())), r1 = /* @__PURE__ */ ct((() => new Js())), A2 = /* @__PURE__ */ ct((() => new v2())), T2 = /* @__PURE__ */ ct((() => new t1()));
class S2 extends an {
  constructor(t, i) {
    super(), this.finished = !1, this.destroyed = !1, i2(t);
    const r = _r(i);
    if (this.iHash = t.create(), typeof this.iHash.update != "function") throw Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const a = this.blockLen, n = new Uint8Array(a);
    n.set(r.length > a ? t.create().update(r).digest() : r);
    for (let o = 0; o < n.length; o++) n[o] ^= 54;
    this.iHash.update(n), this.oHash = t.create();
    for (let o = 0; o < n.length; o++) n[o] ^= 106;
    this.oHash.update(n), ke(n);
  }
  update(t) {
    return Qt(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Qt(this), Je(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: i, iHash: r, finished: a, destroyed: n, blockLen: o, outputLen: s } = this;
    return t.finished = a, t.destroyed = n, t.blockLen = o, t.outputLen = s, t.oHash = i._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const R2 = (e, t, i) => new S2(e, t).update(i).digest();
R2.create = (e, t) => new S2(e, t);
const Jt = BigInt(0), It = BigInt(1);
function ti(e, t) {
  const i = t.negate();
  return e ? i : t;
}
function _t(e, t) {
  const i = d2(e.Fp, t.map(((r) => r.Z)));
  return t.map(((r, a) => e.fromAffine(r.toAffine(i[a]))));
}
function I2(e, t) {
  if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function mi(e, t) {
  I2(e, t);
  const i = 2 ** e;
  return { windows: Math.ceil(t / e) + 1, windowSize: 2 ** (e - 1), mask: Or(e), maxNumber: i, shiftBy: BigInt(e) };
}
function Gn(e, t, i) {
  const { windowSize: r, mask: a, maxNumber: n, shiftBy: o } = i;
  let s = Number(e & a), f = e >> o;
  s > r && (s -= n, f += It);
  const h = t * r;
  return { nextN: f, offset: h + Math.abs(s) - 1, isZero: s === 0, isNeg: s < 0, isNegF: t % 2 != 0, offsetF: h };
}
const vi = /* @__PURE__ */ new WeakMap(), _2 = /* @__PURE__ */ new WeakMap();
function Ai(e) {
  return _2.get(e) || 1;
}
function Hn(e) {
  if (e !== Jt) throw Error("invalid wNAF");
}
class O2 {
  constructor(t, i) {
    this.BASE = t.BASE, this.ZERO = t.ZERO, this.Fn = t.Fn, this.bits = i;
  }
  _unsafeLadder(t, i, r = this.ZERO) {
    let a = t;
    for (; i > Jt; ) i & It && (r = r.add(a)), a = a.double(), i >>= It;
    return r;
  }
  precomputeWindow(t, i) {
    const { windows: r, windowSize: a } = mi(i, this.bits), n = [];
    let o = t, s = o;
    for (let f = 0; f < r; f++) {
      s = o, n.push(s);
      for (let h = 1; h < a; h++) s = s.add(o), n.push(s);
      o = s.double();
    }
    return n;
  }
  wNAF(t, i, r) {
    if (!this.Fn.isValid(r)) throw Error("invalid scalar");
    let a = this.ZERO, n = this.BASE;
    const o = mi(t, this.bits);
    for (let s = 0; s < o.windows; s++) {
      const { nextN: f, offset: h, isZero: c, isNeg: l, isNegF: u, offsetF: d } = Gn(r, s, o);
      r = f, c ? n = n.add(ti(u, i[d])) : a = a.add(ti(l, i[h]));
    }
    return Hn(r), { p: a, f: n };
  }
  wNAFUnsafe(t, i, r, a = this.ZERO) {
    const n = mi(t, this.bits);
    for (let o = 0; o < n.windows && r !== Jt; o++) {
      const { nextN: s, offset: f, isZero: h, isNeg: c } = Gn(r, o, n);
      if (r = s, !h) {
        const l = i[f];
        a = a.add(c ? l.negate() : l);
      }
    }
    return Hn(r), a;
  }
  getPrecomputes(t, i, r) {
    let a = vi.get(i);
    return a || (a = this.precomputeWindow(i, t), t !== 1 && (typeof r == "function" && (a = r(a)), vi.set(i, a))), a;
  }
  cached(t, i, r) {
    const a = Ai(t);
    return this.wNAF(a, this.getPrecomputes(a, t, r), i);
  }
  unsafe(t, i, r, a) {
    const n = Ai(t);
    return n === 1 ? this._unsafeLadder(t, i, a) : this.wNAFUnsafe(n, this.getPrecomputes(n, t, r), i, a);
  }
  createCache(t, i) {
    I2(i, this.bits), _2.set(t, i), vi.delete(t);
  }
  hasCache(t) {
    return Ai(t) !== 1;
  }
}
function P2(e, t, i, r) {
  (function(u, d) {
    if (!Array.isArray(u)) throw Error("array expected");
    u.forEach(((g, b) => {
      if (!(g instanceof d)) throw Error("invalid point at index " + b);
    }));
  })(i, e), (function(u, d) {
    if (!Array.isArray(u)) throw Error("array of scalars expected");
    u.forEach(((g, b) => {
      if (!d.isValid(g)) throw Error("invalid scalar at index " + b);
    }));
  })(r, t);
  const a = i.length, n = r.length;
  if (a !== n) throw Error("arrays of points and scalars must have equal length");
  const o = e.ZERO, s = s2(BigInt(a));
  let f = 1;
  s > 12 ? f = s - 3 : s > 4 ? f = s - 2 : s > 0 && (f = 2);
  const h = Or(f), c = Array(Number(h) + 1).fill(o);
  let l = o;
  for (let u = Math.floor((t.BITS - 1) / f) * f; u >= 0; u -= f) {
    c.fill(o);
    for (let g = 0; g < n; g++) {
      const b = r[g], T = Number(b >> BigInt(u) & h);
      c[T] = c[T].add(i[g]);
    }
    let d = o;
    for (let g = c.length - 1, b = o; g > 0; g--) b = b.add(c[g]), d = d.add(b);
    if (l = l.add(d), u !== 0) for (let g = 0; g < f; g++) l = l.double();
  }
  return l;
}
function Vn(e, t, i) {
  if (t) {
    if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
    return (function(r) {
      $t(r, Gs.reduce(((a, n) => (a[n] = "function", a)), { ORDER: "bigint", MASK: "bigint", BYTES: "number", BITS: "number" }));
    })(t), t;
  }
  return Te(e, { isLE: i });
}
function N2(e, t, i = {}, r) {
  if (r === void 0 && (r = e === "edwards"), !t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
  for (const s of ["p", "n", "h"]) {
    const f = t[s];
    if (!(typeof f == "bigint" && f > Jt)) throw Error(`CURVE.${s} must be positive bigint`);
  }
  const a = Vn(t.p, i.Fp, r), n = Vn(t.n, i.Fn, r), o = ["Gx", "Gy", "a", e === "weierstrass" ? "b" : "d"];
  for (const s of o) if (!a.isValid(t[s])) throw Error(`CURVE.${s} must be valid field element of CURVE.Fp`);
  return { CURVE: t = Object.freeze(Object.assign({}, t)), Fp: a, Fn: n };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Yn = (e, t) => (e + (e >= 0 ? t : -t) / k2) / t;
function Mi(e) {
  if (!["compact", "recovered", "der"].includes(e)) throw Error('Signature format must be "compact", "recovered", or "der"');
  return e;
}
function Ti(e, t) {
  const i = {};
  for (let r of Object.keys(t)) i[r] = e[r] === void 0 ? t[r] : e[r];
  return Ut(i.lowS, "lowS"), Ut(i.prehash, "prehash"), i.format !== void 0 && Mi(i.format), i;
}
const it = { Err: class extends Error {
  constructor(e = "") {
    super(e);
  }
}, _tlv: { encode: (e, t) => {
  const { Err: i } = it;
  if (e < 0 || e > 256) throw new i("tlv.encode: wrong tag");
  if (1 & t.length) throw new i("tlv.encode: unpadded data");
  const r = t.length / 2, a = kr(r);
  if (a.length / 2 & 128) throw new i("tlv.encode: long form length too big");
  const n = r > 127 ? kr(a.length / 2 | 128) : "";
  return kr(e) + n + a + t;
}, decode(e, t) {
  const { Err: i } = it;
  let r = 0;
  if (e < 0 || e > 256) throw new i("tlv.encode: wrong tag");
  if (t.length < 2 || t[r++] !== e) throw new i("tlv.decode: wrong tlv");
  const a = t[r++];
  let n = 0;
  if (128 & a) {
    const s = 127 & a;
    if (!s) throw new i("tlv.decode(long): indefinite length not supported");
    if (s > 4) throw new i("tlv.decode(long): byte length is too big");
    const f = t.subarray(r, r + s);
    if (f.length !== s) throw new i("tlv.decode: length bytes not complete");
    if (f[0] === 0) throw new i("tlv.decode(long): zero leftmost byte");
    for (const h of f) n = n << 8 | h;
    if (r += s, n < 128) throw new i("tlv.decode(long): not minimal encoding");
  } else n = a;
  const o = t.subarray(r, r + n);
  if (o.length !== n) throw new i("tlv.decode: wrong value length");
  return { v: o, l: t.subarray(r + n) };
} }, _int: { encode(e) {
  const { Err: t } = it;
  if (e < at) throw new t("integer: negative integers are not allowed");
  let i = kr(e);
  if (8 & Number.parseInt(i[0], 16) && (i = "00" + i), 1 & i.length) throw new t("unexpected DER parsing assertion: unpadded hex");
  return i;
}, decode(e) {
  const { Err: t } = it;
  if (128 & e[0]) throw new t("invalid signature integer: negative");
  if (e[0] === 0 && !(128 & e[1])) throw new t("invalid signature integer: unnecessary leading zero");
  return si(e);
} }, toSig(e) {
  const { Err: t, _int: i, _tlv: r } = it, a = ne("signature", e), { v: n, l: o } = r.decode(48, a);
  if (o.length) throw new t("invalid signature: left bytes after parsing");
  const { v: s, l: f } = r.decode(2, n), { v: h, l: c } = r.decode(2, f);
  if (c.length) throw new t("invalid signature: left bytes after parsing");
  return { r: i.decode(s), s: i.decode(h) };
}, hexFromSig(e) {
  const { _tlv: t, _int: i } = it, r = t.encode(2, i.encode(e.r)) + t.encode(2, i.encode(e.s));
  return t.encode(48, r);
} }, at = BigInt(0), Gt = BigInt(1), k2 = BigInt(2), Xr = BigInt(3), i1 = BigInt(4);
function Ht(e, t) {
  const { BYTES: i } = e;
  let r;
  if (typeof t == "bigint") r = t;
  else {
    let a = ne("private key", t);
    try {
      r = e.fromBytes(a);
    } catch {
      throw Error(`invalid private key: expected ui8a of size ${i}, got ${typeof t}`);
    }
  }
  if (!e.isValidNot0(r)) throw Error("invalid private key: out of range [1..N-1]");
  return r;
}
function n1(e, t = {}) {
  const i = N2("weierstrass", e, t), { Fp: r, Fn: a } = i;
  let n = i.CURVE;
  const { h: o, n: s } = n;
  $t(t, {}, { allowInfinityPoint: "boolean", clearCofactor: "function", isTorsionFree: "function", fromBytes: "function", toBytes: "function", endo: "object", wrapPrivateKey: "boolean" });
  const { endo: f } = t;
  if (f && (!r.is0(n.a) || typeof f.beta != "bigint" || !Array.isArray(f.basises))) throw Error('invalid endo: expected "beta": bigint and "basises": array');
  const h = L2(r, a);
  function c() {
    if (!r.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
  }
  const l = t.toBytes || function(O, v, R) {
    const { x: P, y: U } = v.toAffine(), B = r.toBytes(P);
    return Ut(R, "isCompressed"), R ? (c(), Xe(U2(!r.isOdd(U)), B)) : Xe(Uint8Array.of(4), B, r.toBytes(U));
  }, u = t.fromBytes || function(O) {
    Fe(O, void 0, "Point");
    const { publicKey: v, publicKeyUncompressed: R } = h, P = O.length, U = O[0], B = O.subarray(1);
    if (P !== v || U !== 2 && U !== 3) {
      if (P === R && U === 4) {
        const L = r.BYTES, C = r.fromBytes(B.subarray(0, L)), x = r.fromBytes(B.subarray(L, 2 * L));
        if (!g(C, x)) throw Error("bad point: is not on curve");
        return { x: C, y: x };
      }
      throw Error(`bad point: got length ${P}, expected compressed=${v} or uncompressed=${R}`);
    }
    {
      const L = r.fromBytes(B);
      if (!r.isValid(L)) throw Error("bad point: is not on curve, wrong x");
      const C = d(L);
      let x;
      try {
        x = r.sqrt(C);
      } catch (M) {
        const X = M instanceof Error ? ": " + M.message : "";
        throw Error("bad point: is not on curve, sqrt error" + X);
      }
      return c(), !(1 & ~U) !== r.isOdd(x) && (x = r.neg(x)), { x: L, y: x };
    }
  };
  function d(O) {
    const v = r.sqr(O), R = r.mul(v, O);
    return r.add(r.add(R, r.mul(O, n.a)), n.b);
  }
  function g(O, v) {
    const R = r.sqr(v), P = d(O);
    return r.eql(R, P);
  }
  if (!g(n.Gx, n.Gy)) throw Error("bad curve params: generator point");
  const b = r.mul(r.pow(n.a, Xr), i1), T = r.mul(r.sqr(n.b), BigInt(27));
  if (r.is0(r.add(b, T))) throw Error("bad curve params: a or b");
  function A(O, v, R = !1) {
    if (!r.isValid(v) || R && r.is0(v)) throw Error("bad point coordinate " + O);
    return v;
  }
  function S(O) {
    if (!(O instanceof N)) throw Error("ProjectivePoint expected");
  }
  function E(O) {
    if (!f || !f.basises) throw Error("no endo");
    return (function(v, R, P) {
      const [[U, B], [L, C]] = R, x = Yn(C * v, P), M = Yn(-B * v, P);
      let X = v - x * U - M * L, z = -x * B - M * C;
      const D = X < at, F = z < at;
      D && (X = -X), F && (z = -z);
      const K = Or(Math.ceil(s2(P) / 2)) + Gt;
      if (X < at || X >= K || z < at || z >= K) throw Error("splitScalar (endomorphism): failed, k=" + v);
      return { k1neg: D, k1: X, k2neg: F, k2: z };
    })(O, f.basises, a.ORDER);
  }
  const y = ei(((O, v) => {
    const { X: R, Y: P, Z: U } = O;
    if (r.eql(U, r.ONE)) return { x: R, y: P };
    const B = O.is0();
    v == null && (v = B ? r.ONE : r.inv(U));
    const L = r.mul(R, v), C = r.mul(P, v), x = r.mul(U, v);
    if (B) return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(x, r.ONE)) throw Error("invZ was invalid");
    return { x: L, y: C };
  })), _ = ei(((O) => {
    if (O.is0()) {
      if (t.allowInfinityPoint && !r.is0(O.Y)) return;
      throw Error("bad point: ZERO");
    }
    const { x: v, y: R } = O.toAffine();
    if (!r.isValid(v) || !r.isValid(R)) throw Error("bad point: x or y not field elements");
    if (!g(v, R)) throw Error("bad point: equation left != right");
    if (!O.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
    return !0;
  }));
  function k(O, v, R, P, U) {
    return R = new N(r.mul(R.X, O), R.Y, R.Z), v = ti(P, v), R = ti(U, R), v.add(R);
  }
  class N {
    constructor(v, R, P) {
      this.X = A("x", v), this.Y = A("y", R, !0), this.Z = A("z", P), Object.freeze(this);
    }
    static CURVE() {
      return n;
    }
    static fromAffine(v) {
      const { x: R, y: P } = v || {};
      if (!v || !r.isValid(R) || !r.isValid(P)) throw Error("invalid affine point");
      if (v instanceof N) throw Error("projective point not allowed");
      return r.is0(R) && r.is0(P) ? N.ZERO : new N(R, P, r.ONE);
    }
    static fromBytes(v) {
      const R = N.fromAffine(u(Fe(v, void 0, "point")));
      return R.assertValidity(), R;
    }
    static fromHex(v) {
      return N.fromBytes(ne("pointHex", v));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(v = 8, R = !0) {
      return w.createCache(this, v), R || this.multiply(Xr), this;
    }
    assertValidity() {
      _(this);
    }
    hasEvenY() {
      const { y: v } = this.toAffine();
      if (!r.isOdd) throw Error("Field doesn't support isOdd");
      return !r.isOdd(v);
    }
    equals(v) {
      S(v);
      const { X: R, Y: P, Z: U } = this, { X: B, Y: L, Z: C } = v, x = r.eql(r.mul(R, C), r.mul(B, U)), M = r.eql(r.mul(P, C), r.mul(L, U));
      return x && M;
    }
    negate() {
      return new N(this.X, r.neg(this.Y), this.Z);
    }
    double() {
      const { a: v, b: R } = n, P = r.mul(R, Xr), { X: U, Y: B, Z: L } = this;
      let C = r.ZERO, x = r.ZERO, M = r.ZERO, X = r.mul(U, U), z = r.mul(B, B), D = r.mul(L, L), F = r.mul(U, B);
      return F = r.add(F, F), M = r.mul(U, L), M = r.add(M, M), C = r.mul(v, M), x = r.mul(P, D), x = r.add(C, x), C = r.sub(z, x), x = r.add(z, x), x = r.mul(C, x), C = r.mul(F, C), M = r.mul(P, M), D = r.mul(v, D), F = r.sub(X, D), F = r.mul(v, F), F = r.add(F, M), M = r.add(X, X), X = r.add(M, X), X = r.add(X, D), X = r.mul(X, F), x = r.add(x, X), D = r.mul(B, L), D = r.add(D, D), X = r.mul(D, F), C = r.sub(C, X), M = r.mul(D, z), M = r.add(M, M), M = r.add(M, M), new N(C, x, M);
    }
    add(v) {
      S(v);
      const { X: R, Y: P, Z: U } = this, { X: B, Y: L, Z: C } = v;
      let x = r.ZERO, M = r.ZERO, X = r.ZERO;
      const z = n.a, D = r.mul(n.b, Xr);
      let F = r.mul(R, B), K = r.mul(P, L), G = r.mul(U, C), H = r.add(R, P), j = r.add(B, L);
      H = r.mul(H, j), j = r.add(F, K), H = r.sub(H, j), j = r.add(R, U);
      let Y = r.add(B, C);
      return j = r.mul(j, Y), Y = r.add(F, G), j = r.sub(j, Y), Y = r.add(P, U), x = r.add(L, C), Y = r.mul(Y, x), x = r.add(K, G), Y = r.sub(Y, x), X = r.mul(z, j), x = r.mul(D, G), X = r.add(x, X), x = r.sub(K, X), X = r.add(K, X), M = r.mul(x, X), K = r.add(F, F), K = r.add(K, F), G = r.mul(z, G), j = r.mul(D, j), K = r.add(K, G), G = r.sub(F, G), G = r.mul(z, G), j = r.add(j, G), F = r.mul(K, j), M = r.add(M, F), F = r.mul(Y, j), x = r.mul(H, x), x = r.sub(x, F), F = r.mul(H, K), X = r.mul(Y, X), X = r.add(X, F), new N(x, M, X);
    }
    subtract(v) {
      return this.add(v.negate());
    }
    is0() {
      return this.equals(N.ZERO);
    }
    multiply(v) {
      const { endo: R } = t;
      if (!a.isValidNot0(v)) throw Error("invalid scalar: out of range");
      let P, U;
      const B = (L) => w.cached(this, L, ((C) => _t(N, C)));
      if (R) {
        const { k1neg: L, k1: C, k2neg: x, k2: M } = E(v), { p: X, f: z } = B(C), { p: D, f: F } = B(M);
        U = z.add(F), P = k(R.beta, X, D, L, x);
      } else {
        const { p: L, f: C } = B(v);
        P = L, U = C;
      }
      return _t(N, [P, U])[0];
    }
    multiplyUnsafe(v) {
      const { endo: R } = t, P = this;
      if (!a.isValid(v)) throw Error("invalid scalar: out of range");
      if (v === at || P.is0()) return N.ZERO;
      if (v === Gt) return P;
      if (w.hasCache(this)) return this.multiply(v);
      if (R) {
        const { k1neg: U, k1: B, k2neg: L, k2: C } = E(v), { p1: x, p2: M } = (function(X, z, D, F) {
          let K = z, G = X.ZERO, H = X.ZERO;
          for (; D > Jt || F > Jt; ) D & It && (G = G.add(K)), F & It && (H = H.add(K)), K = K.double(), D >>= It, F >>= It;
          return { p1: G, p2: H };
        })(N, P, B, C);
        return k(R.beta, x, M, U, L);
      }
      return w.unsafe(P, v);
    }
    multiplyAndAddUnsafe(v, R, P) {
      const U = this.multiplyUnsafe(R).add(v.multiplyUnsafe(P));
      return U.is0() ? void 0 : U;
    }
    toAffine(v) {
      return y(this, v);
    }
    isTorsionFree() {
      const { isTorsionFree: v } = t;
      return o === Gt || (v ? v(N, this) : w.unsafe(this, s).is0());
    }
    clearCofactor() {
      const { clearCofactor: v } = t;
      return o === Gt ? this : v ? v(N, this) : this.multiplyUnsafe(o);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(o).is0();
    }
    toBytes(v = !0) {
      return Ut(v, "isCompressed"), this.assertValidity(), l(N, this, v);
    }
    toHex(v = !0) {
      return Ot(this.toBytes(v));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(v = !0) {
      return this.toBytes(v);
    }
    _setWindowSize(v) {
      this.precompute(v);
    }
    static normalizeZ(v) {
      return _t(N, v);
    }
    static msm(v, R) {
      return P2(N, a, v, R);
    }
    static fromPrivateKey(v) {
      return N.BASE.multiply(Ht(a, v));
    }
  }
  N.BASE = new N(n.Gx, n.Gy, r.ONE), N.ZERO = new N(r.ZERO, r.ONE, r.ZERO), N.Fp = r, N.Fn = a;
  const m = a.BITS, w = new O2(N, t.endo ? Math.ceil(m / 2) : m);
  return N.BASE.precompute(8), N;
}
function U2(e) {
  return Uint8Array.of(e ? 2 : 3);
}
function L2(e, t) {
  return { secretKey: t.BYTES, publicKey: 1 + e.BYTES, publicKeyUncompressed: 1 + 2 * e.BYTES, publicKeyHasPrefix: !0, signature: 2 * t.BYTES };
}
function a1(e, t = {}) {
  const { Fn: i } = e, r = t.randomBytes || oi, a = Object.assign(L2(e.Fp, i), { seed: xn(i.ORDER) });
  function n(c) {
    try {
      return !!Ht(i, c);
    } catch {
      return !1;
    }
  }
  function o(c = r(a.seed)) {
    return (function(l, u, d = !1) {
      const g = l.length, b = p2(u), T = xn(u);
      if (g < 16 || g < T || g > 1024) throw Error("expected " + T + "-1024 bytes of input, got " + g);
      const A = se(d ? Lt(l) : si(l), u - ye) + ye;
      return d ? fn(A, b) : sn(A, b);
    })(Fe(c, a.seed, "seed"), i.ORDER);
  }
  function s(c, l = !0) {
    return e.BASE.multiply(Ht(i, c)).toBytes(l);
  }
  function f(c) {
    if (typeof c == "bigint") return !1;
    if (c instanceof e) return !0;
    const { secretKey: l, publicKey: u, publicKeyUncompressed: d } = a;
    if (i.allowedLengths || l === u) return;
    const g = ne("key", c).length;
    return g === u || g === d;
  }
  return Object.freeze({ getPublicKey: s, getSharedSecret: function(c, l, u = !0) {
    if (f(c) === !0) throw Error("first arg must be private key");
    if (f(l) === !1) throw Error("second arg must be public key");
    const d = Ht(i, c);
    return e.fromHex(l).multiply(d).toBytes(u);
  }, keygen: function(c) {
    const l = o(c);
    return { secretKey: l, publicKey: s(l) };
  }, Point: e, utils: { isValidSecretKey: n, isValidPublicKey: function(c, l) {
    const { publicKey: u, publicKeyUncompressed: d } = a;
    try {
      const g = c.length;
      return (l !== !0 || g === u) && (l !== !1 || g === d) && !!e.fromBytes(c);
    } catch {
      return !1;
    }
  }, randomSecretKey: o, isValidPrivateKey: n, randomPrivateKey: o, normPrivateKeyToScalar: (c) => Ht(i, c), precompute: (c = 8, l = e.BASE) => l.precompute(c, !1) }, lengths: a });
}
function o1(e, t, i = {}) {
  i2(t), $t(i, {}, { hmac: "function", lowS: "boolean", randomBytes: "function", bits2int: "function", bits2int_modN: "function" });
  const r = i.randomBytes || oi, a = i.hmac || ((m, ...w) => R2(t, m, Xe(...w))), { Fp: n, Fn: o } = e, { ORDER: s, BITS: f } = o, { keygen: h, getPublicKey: c, getSharedSecret: l, utils: u, lengths: d } = a1(e, i), g = { prehash: !1, lowS: typeof i.lowS == "boolean" && i.lowS, format: void 0, extraEntropy: !1 }, b = "compact";
  function T(m) {
    return m > s >> Gt;
  }
  function A(m, w) {
    if (!o.isValidNot0(w)) throw Error(`invalid signature ${m}: out of range 1..Point.Fn.ORDER`);
    return w;
  }
  class S {
    constructor(w, O, v) {
      this.r = A("r", w), this.s = A("s", O), v != null && (this.recovery = v), Object.freeze(this);
    }
    static fromBytes(w, O = b) {
      let v;
      if ((function(B, L) {
        Mi(L);
        const C = d.signature;
        Fe(B, L === "compact" ? C : L === "recovered" ? C + 1 : void 0, L + " signature");
      })(w, O), O === "der") {
        const { r: B, s: L } = it.toSig(Fe(w));
        return new S(B, L);
      }
      O === "recovered" && (v = w[0], O = "compact", w = w.subarray(1));
      const R = o.BYTES, P = w.subarray(0, R), U = w.subarray(R, 2 * R);
      return new S(o.fromBytes(P), o.fromBytes(U), v);
    }
    static fromHex(w, O) {
      return this.fromBytes($r(w), O);
    }
    addRecoveryBit(w) {
      return new S(this.r, this.s, w);
    }
    recoverPublicKey(w) {
      const O = n.ORDER, { r: v, s: R, recovery: P } = this;
      if (P == null || ![0, 1, 2, 3].includes(P)) throw Error("recovery id invalid");
      if (s * k2 < O && P > 1) throw Error("recovery id is ambiguous for h>1 curve");
      const U = P === 2 || P === 3 ? v + s : v;
      if (!n.isValid(U)) throw Error("recovery id 2 or 3 invalid");
      const B = n.toBytes(U), L = e.fromBytes(Xe(U2(!(1 & P)), B)), C = o.inv(U), x = y(ne("msgHash", w)), M = o.create(-x * C), X = o.create(R * C), z = e.BASE.multiplyUnsafe(M).add(L.multiplyUnsafe(X));
      if (z.is0()) throw Error("point at infinify");
      return z.assertValidity(), z;
    }
    hasHighS() {
      return T(this.s);
    }
    toBytes(w = b) {
      if (Mi(w), w === "der") return $r(it.hexFromSig(this));
      const O = o.toBytes(this.r), v = o.toBytes(this.s);
      if (w === "recovered") {
        if (this.recovery == null) throw Error("recovery bit must be present");
        return Xe(Uint8Array.of(this.recovery), O, v);
      }
      return Xe(O, v);
    }
    toHex(w) {
      return Ot(this.toBytes(w));
    }
    assertValidity() {
    }
    static fromCompact(w) {
      return S.fromBytes(ne("sig", w), "compact");
    }
    static fromDER(w) {
      return S.fromBytes(ne("sig", w), "der");
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, o.neg(this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return Ot(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return Ot(this.toBytes("compact"));
    }
  }
  const E = i.bits2int || function(m) {
    if (m.length > 8192) throw Error("input is too large");
    const w = si(m), O = 8 * m.length - f;
    return O > 0 ? w >> BigInt(O) : w;
  }, y = i.bits2int_modN || function(m) {
    return o.create(E(m));
  }, _ = Or(f);
  function k(m) {
    return Ar("num < 2^" + f, m, at, _), o.toBytes(m);
  }
  function N(m, w) {
    return Fe(m, void 0, "message"), w ? Fe(t(m), void 0, "prehashed message") : m;
  }
  return Object.freeze({ keygen: h, getPublicKey: c, getSharedSecret: l, utils: u, lengths: d, Point: e, sign: function(m, w, O = {}) {
    m = ne("message", m);
    const { seed: v, k2sig: R } = (function(U, B, L) {
      if (["recovered", "canonical"].some(((G) => G in L))) throw Error("sign() legacy options not supported");
      const { lowS: C, prehash: x, extraEntropy: M } = Ti(L, g);
      U = N(U, x);
      const X = y(U), z = Ht(o, B), D = [k(z), k(X)];
      if (M != null && M !== !1) {
        const G = M === !0 ? r(d.secretKey) : M;
        D.push(ne("extraEntropy", G));
      }
      const F = Xe(...D), K = X;
      return { seed: F, k2sig: function(G) {
        const H = E(G);
        if (!o.isValidNot0(H)) return;
        const j = o.inv(H), Y = e.BASE.multiply(H).toAffine(), Q = o.create(Y.x);
        if (Q === at) return;
        const W = o.create(j * o.create(K + Q * z));
        if (W === at) return;
        let J = (Y.x === Q ? 0 : 2) | Number(Y.y & Gt), te = W;
        return C && T(W) && (te = o.neg(W), J ^= 1), new S(Q, te, J);
      } };
    })(m, w, O);
    return (function(U, B, L) {
      if (typeof U != "number" || U < 2) throw Error("hashLen must be a number");
      if (typeof B != "number" || B < 2) throw Error("qByteLen must be a number");
      if (typeof L != "function") throw Error("hmacFn must be a function");
      const C = (H) => new Uint8Array(H), x = (H) => Uint8Array.of(H);
      let M = C(U), X = C(U), z = 0;
      const D = () => {
        M.fill(1), X.fill(0), z = 0;
      }, F = (...H) => L(X, M, ...H), K = (H = C(0)) => {
        X = F(x(0), H), M = F(), H.length !== 0 && (X = F(x(1), H), M = F());
      }, G = () => {
        if (z++ >= 1e3) throw Error("drbg: tried 1000 values");
        let H = 0;
        const j = [];
        for (; H < B; ) {
          M = F();
          const Y = M.slice();
          j.push(Y), H += M.length;
        }
        return Xe(...j);
      };
      return (H, j) => {
        let Y;
        for (D(), K(H); !(Y = j(G())); ) K();
        return D(), Y;
      };
    })(t.outputLen, o.BYTES, a)(v, R);
  }, verify: function(m, w, O, v = {}) {
    const { lowS: R, prehash: P, format: U } = Ti(v, g);
    if (O = ne("publicKey", O), w = N(ne("message", w), P), "strict" in v) throw Error("options.strict was renamed to lowS");
    const B = U === void 0 ? (function(L) {
      let C;
      const x = typeof L == "string" || Ir(L), M = !x && L !== null && typeof L == "object" && typeof L.r == "bigint" && typeof L.s == "bigint";
      if (!x && !M) throw Error("invalid signature, expected Uint8Array, hex string or Signature instance");
      if (M) C = new S(L.r, L.s);
      else if (x) {
        try {
          C = S.fromBytes(ne("sig", L), "der");
        } catch (X) {
          if (!(X instanceof it.Err)) throw X;
        }
        if (!C) try {
          C = S.fromBytes(ne("sig", L), "compact");
        } catch {
          return !1;
        }
      }
      return C || !1;
    })(m) : S.fromBytes(ne("sig", m), U);
    if (B === !1) return !1;
    try {
      const L = e.fromBytes(O);
      if (R && B.hasHighS()) return !1;
      const { r: C, s: x } = B, M = y(w), X = o.inv(x), z = o.create(M * X), D = o.create(C * X), F = e.BASE.multiplyUnsafe(z).add(L.multiplyUnsafe(D));
      return F.is0() ? !1 : o.create(F.x) === C;
    } catch {
      return !1;
    }
  }, recoverPublicKey: function(m, w, O = {}) {
    const { prehash: v } = Ti(O, g);
    return w = N(w, v), S.fromBytes(m, "recovered").recoverPublicKey(w).toBytes();
  }, Signature: S, hash: t });
}
function s1(e) {
  const { CURVE: t, curveOpts: i } = (function(a) {
    const n = { a: a.a, b: a.b, p: a.Fp.ORDER, n: a.n, h: a.h, Gx: a.Gx, Gy: a.Gy }, o = a.Fp;
    let s = a.allowedPrivateKeyLengths ? Array.from(new Set(a.allowedPrivateKeyLengths.map(((f) => Math.ceil(f / 2))))) : void 0;
    return { CURVE: n, curveOpts: { Fp: o, Fn: Te(n.n, { BITS: a.nBitLength, allowedLengths: s, modFromBytes: a.wrapPrivateKey }), allowInfinityPoint: a.allowInfinityPoint, endo: a.endo, isTorsionFree: a.isTorsionFree, clearCofactor: a.clearCofactor, fromBytes: a.fromBytes, toBytes: a.toBytes } };
  })(e), r = { hmac: e.hmac, randomBytes: e.randomBytes, lowS: e.lowS, bits2int: e.bits2int, bits2int_modN: e.bits2int_modN };
  return { CURVE: t, curveOpts: i, hash: e.hash, ecdsaOpts: r };
}
function f1(e) {
  const { CURVE: t, curveOpts: i, hash: r, ecdsaOpts: a } = s1(e);
  return (function(n, o) {
    const s = o.Point;
    return Object.assign({}, o, { ProjectivePoint: s, CURVE: Object.assign({}, n, g2(s.Fn.ORDER, s.Fn.BITS)) });
  })(e, o1(n1(t, i), r, a));
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Bt(e, t) {
  const i = (r) => f1({ ...e, hash: r });
  return { ...i(t), create: i };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const B2 = { p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"), n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), h: BigInt(1), a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"), b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5") }, X2 = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"), n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"), h: BigInt(1), a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"), b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"), Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"), Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f") }, C2 = { p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"), h: BigInt(1), a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"), b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"), Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"), Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650") }, c1 = Te(B2.p), l1 = Te(X2.p), h1 = Te(C2.p), u1 = Bt({ ...B2, Fp: c1, lowS: !1 }, ln), d1 = Bt({ ...X2, Fp: l1, lowS: !1 }, T2), g1 = Bt({ ...C2, Fp: h1, lowS: !1, allowedPrivateKeyLengths: [130, 131, 132] }, A2), p1 = BigInt(0), ir = BigInt(1), y1 = BigInt(2), b1 = BigInt(7), w1 = BigInt(256), E1 = BigInt(113), D2 = [], F2 = [], x2 = [];
for (let e = 0, t = ir, i = 1, r = 0; e < 24; e++) {
  [i, r] = [r, (2 * i + 3 * r) % 5], D2.push(2 * (5 * r + i)), F2.push((e + 1) * (e + 2) / 2 % 64);
  let a = p1;
  for (let n = 0; n < 7; n++) t = (t << ir ^ (t >> b1) * E1) % w1, t & y1 && (a ^= ir << (ir << /* @__PURE__ */ BigInt(n)) - ir);
  x2.push(a);
}
const z2 = w2(x2, !0), m1 = z2[0], v1 = z2[1], jn = (e, t, i) => i > 32 ? ((r, a, n) => a << n - 32 | r >>> 64 - n)(e, t, i) : ((r, a, n) => r << n | a >>> 32 - n)(e, t, i), qn = (e, t, i) => i > 32 ? ((r, a, n) => r << n - 32 | a >>> 64 - n)(e, t, i) : ((r, a, n) => a << n | r >>> 32 - n)(e, t, i);
class fi extends an {
  constructor(t, i, r, a = !1, n = 24) {
    if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = t, this.suffix = i, this.outputLen = r, this.enableXOF = a, this.rounds = n, vr(r), !(0 < t && t < 200)) throw Error("only keccak-f1600 function is supported");
    var o;
    this.state = new Uint8Array(200), this.state32 = (o = this.state, new Uint32Array(o.buffer, o.byteOffset, Math.floor(o.byteLength / 4)));
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    Pn(this.state32), (function(t, i = 24) {
      const r = new Uint32Array(10);
      for (let a = 24 - i; a < 24; a++) {
        for (let s = 0; s < 10; s++) r[s] = t[s] ^ t[s + 10] ^ t[s + 20] ^ t[s + 30] ^ t[s + 40];
        for (let s = 0; s < 10; s += 2) {
          const f = (s + 8) % 10, h = (s + 2) % 10, c = r[h], l = r[h + 1], u = jn(c, l, 1) ^ r[f], d = qn(c, l, 1) ^ r[f + 1];
          for (let g = 0; g < 50; g += 10) t[s + g] ^= u, t[s + g + 1] ^= d;
        }
        let n = t[2], o = t[3];
        for (let s = 0; s < 24; s++) {
          const f = F2[s], h = jn(n, o, f), c = qn(n, o, f), l = D2[s];
          n = t[l], o = t[l + 1], t[l] = h, t[l + 1] = c;
        }
        for (let s = 0; s < 50; s += 10) {
          for (let f = 0; f < 10; f++) r[f] = t[s + f];
          for (let f = 0; f < 10; f++) t[s + f] ^= ~r[(f + 2) % 10] & r[(f + 4) % 10];
        }
        t[0] ^= m1[a], t[1] ^= v1[a];
      }
      ke(r);
    })(this.state32, this.rounds), Pn(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Qt(this), Je(t = _r(t));
    const { blockLen: i, state: r } = this, a = t.length;
    for (let n = 0; n < a; ) {
      const o = Math.min(i - this.pos, a - n);
      for (let s = 0; s < o; s++) r[this.pos++] ^= t[n++];
      this.pos === i && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: t, suffix: i, pos: r, blockLen: a } = this;
    t[r] ^= i, 128 & i && r === a - 1 && this.keccak(), t[a - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    Qt(this, !1), Je(t), this.finish();
    const i = this.state, { blockLen: r } = this;
    for (let a = 0, n = t.length; a < n; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, n - a);
      t.set(i.subarray(this.posOut, this.posOut + o), a), this.posOut += o, a += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF) throw Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return vr(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (n2(t, this), this.finished) throw Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, ke(this.state);
  }
  _cloneInto(t) {
    const { blockLen: i, suffix: r, outputLen: a, rounds: n, enableXOF: o } = this;
    return t || (t = new fi(i, r, a, o, n)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = n, t.suffix = r, t.outputLen = a, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const K2 = (e, t, i) => ct((() => new fi(t, e, i))), A1 = K2(6, 136, 32), T1 = K2(6, 72, 64), S1 = (e, t, i) => (function(r) {
  const a = (o, s) => r(s).update(_r(o)).digest(), n = r({});
  return a.outputLen = n.outputLen, a.blockLen = n.blockLen, a.create = (o) => r(o), a;
})(((r = {}) => new fi(t, e, r.dkLen === void 0 ? i : r.dkLen, !0))), R1 = S1(31, 136, 32), pt = BigInt(0), fe = BigInt(1), Si = BigInt(2), I1 = BigInt(8);
function M2(e, t = {}) {
  const i = N2("edwards", e, t, t.FpFnLE), { Fp: r, Fn: a } = i;
  let n = i.CURVE;
  const { h: o } = n;
  $t(t, {}, { uvRatio: "function" });
  const s = Si << BigInt(8 * a.BYTES) - fe, f = (T) => r.create(T), h = t.uvRatio || ((T, A) => {
    try {
      return { isValid: !0, value: r.sqrt(r.div(T, A)) };
    } catch {
      return { isValid: !1, value: pt };
    }
  });
  if (!(function(T, A, S, E) {
    const y = T.sqr(S), _ = T.sqr(E), k = T.add(T.mul(A.a, y), _), N = T.add(T.ONE, T.mul(A.d, T.mul(y, _)));
    return T.eql(k, N);
  })(r, n, n.Gx, n.Gy)) throw Error("bad curve params: generator point");
  function c(T, A, S = !1) {
    return Ar("coordinate " + T, A, S ? fe : pt, s), A;
  }
  function l(T) {
    if (!(T instanceof g)) throw Error("ExtendedPoint expected");
  }
  const u = ei(((T, A) => {
    const { X: S, Y: E, Z: y } = T, _ = T.is0();
    A == null && (A = _ ? I1 : r.inv(y));
    const k = f(S * A), N = f(E * A), m = r.mul(y, A);
    if (_) return { x: pt, y: fe };
    if (m !== fe) throw Error("invZ was invalid");
    return { x: k, y: N };
  })), d = ei(((T) => {
    const { a: A, d: S } = n;
    if (T.is0()) throw Error("bad point: ZERO");
    const { X: E, Y: y, Z: _, T: k } = T, N = f(E * E), m = f(y * y), w = f(_ * _), O = f(w * w), v = f(N * A);
    if (f(w * f(v + m)) !== f(O + f(S * f(N * m)))) throw Error("bad point: equation left != right (1)");
    if (f(E * y) !== f(_ * k)) throw Error("bad point: equation left != right (2)");
    return !0;
  }));
  class g {
    constructor(A, S, E, y) {
      this.X = c("x", A), this.Y = c("y", S), this.Z = c("z", E, !0), this.T = c("t", y), Object.freeze(this);
    }
    static CURVE() {
      return n;
    }
    static fromAffine(A) {
      if (A instanceof g) throw Error("extended point not allowed");
      const { x: S, y: E } = A || {};
      return c("x", S), c("y", E), new g(S, E, fe, f(S * E));
    }
    static fromBytes(A, S = !1) {
      const E = r.BYTES, { a: y, d: _ } = n;
      A = Bn(Fe(A, E, "point")), Ut(S, "zip215");
      const k = Bn(A), N = A[E - 1];
      k[E - 1] = -129 & N;
      const m = Lt(k), w = S ? s : r.ORDER;
      Ar("point.y", m, pt, w);
      const O = f(m * m), v = f(O - fe), R = f(_ * O - y);
      let { isValid: P, value: U } = h(v, R);
      if (!P) throw Error("bad point: invalid y coordinate");
      const B = (U & fe) === fe, L = !!(128 & N);
      if (!S && U === pt && L) throw Error("bad point: x=0 and x_0=1");
      return L !== B && (U = f(-U)), g.fromAffine({ x: U, y: m });
    }
    static fromHex(A, S = !1) {
      return g.fromBytes(ne("point", A), S);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(A = 8, S = !0) {
      return b.createCache(this, A), S || this.multiply(Si), this;
    }
    assertValidity() {
      d(this);
    }
    equals(A) {
      l(A);
      const { X: S, Y: E, Z: y } = this, { X: _, Y: k, Z: N } = A, m = f(S * N), w = f(_ * y), O = f(E * N), v = f(k * y);
      return m === w && O === v;
    }
    is0() {
      return this.equals(g.ZERO);
    }
    negate() {
      return new g(f(-this.X), this.Y, this.Z, f(-this.T));
    }
    double() {
      const { a: A } = n, { X: S, Y: E, Z: y } = this, _ = f(S * S), k = f(E * E), N = f(Si * f(y * y)), m = f(A * _), w = S + E, O = f(f(w * w) - _ - k), v = m + k, R = v - N, P = m - k, U = f(O * R), B = f(v * P), L = f(O * P), C = f(R * v);
      return new g(U, B, C, L);
    }
    add(A) {
      l(A);
      const { a: S, d: E } = n, { X: y, Y: _, Z: k, T: N } = this, { X: m, Y: w, Z: O, T: v } = A, R = f(y * m), P = f(_ * w), U = f(N * E * v), B = f(k * O), L = f((y + _) * (m + w) - R - P), C = B - U, x = B + U, M = f(P - S * R), X = f(L * C), z = f(x * M), D = f(L * M), F = f(C * x);
      return new g(X, z, F, D);
    }
    subtract(A) {
      return this.add(A.negate());
    }
    multiply(A) {
      if (!a.isValidNot0(A)) throw Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: S, f: E } = b.cached(this, A, ((y) => _t(g, y)));
      return _t(g, [S, E])[0];
    }
    multiplyUnsafe(A, S = g.ZERO) {
      if (!a.isValid(A)) throw Error("invalid scalar: expected 0 <= sc < curve.n");
      return A === pt ? g.ZERO : this.is0() || A === fe ? this : b.unsafe(this, A, ((E) => _t(g, E)), S);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(o).is0();
    }
    isTorsionFree() {
      return b.unsafe(this, n.n).is0();
    }
    toAffine(A) {
      return u(this, A);
    }
    clearCofactor() {
      return o === fe ? this : this.multiplyUnsafe(o);
    }
    toBytes() {
      const { x: A, y: S } = this.toAffine(), E = r.toBytes(S);
      return E[E.length - 1] |= A & fe ? 128 : 0, E;
    }
    toHex() {
      return Ot(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(A) {
      return _t(g, A);
    }
    static msm(A, S) {
      return P2(g, a, A, S);
    }
    _setWindowSize(A) {
      this.precompute(A);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  g.BASE = new g(n.Gx, n.Gy, fe, f(n.Gx * n.Gy)), g.ZERO = new g(pt, fe, fe, pt), g.Fp = r, g.Fn = a;
  const b = new O2(g, a.BITS);
  return g.BASE.precompute(8), g;
}
function _1(e, t, i = {}) {
  if (typeof t != "function") throw Error('"hash" function param is required');
  $t(i, {}, { adjustScalarBytes: "function", randomBytes: "function", domain: "function", prehash: "function", mapToCurve: "function" });
  const { prehash: r } = i, { BASE: a, Fp: n, Fn: o } = e, s = i.randomBytes || oi, f = i.adjustScalarBytes || ((E) => E), h = i.domain || ((E, y, _) => {
    if (Ut(_, "phflag"), y.length || _) throw Error("Contexts/pre-hash are not supported");
    return E;
  });
  function c(E) {
    return o.create(Lt(E));
  }
  function l(E) {
    const { head: y, prefix: _, scalar: k } = (function(w) {
      const O = T.secretKey;
      w = ne("private key", w, O);
      const v = ne("hashed private key", t(w), 2 * O), R = f(v.slice(0, O));
      return { head: R, prefix: v.slice(O, 2 * O), scalar: c(R) };
    })(E), N = a.multiply(k), m = N.toBytes();
    return { head: y, prefix: _, scalar: k, point: N, pointBytes: m };
  }
  function u(E) {
    return l(E).pointBytes;
  }
  function d(E = Uint8Array.of(), ...y) {
    const _ = Xe(...y);
    return c(t(h(_, ne("context", E), !!r)));
  }
  const g = { zip215: !0 }, b = n.BYTES, T = { secretKey: b, publicKey: b, signature: 2 * b, seed: b };
  function A(E = s(T.seed)) {
    return Fe(E, T.seed, "seed");
  }
  const S = { getExtendedPublicKey: l, randomSecretKey: A, isValidSecretKey: function(E) {
    return Ir(E) && E.length === o.BYTES;
  }, isValidPublicKey: function(E, y) {
    try {
      return !!e.fromBytes(E, y);
    } catch {
      return !1;
    }
  }, toMontgomery(E) {
    const { y } = e.fromBytes(E), _ = T.publicKey, k = _ === 32;
    if (!k && _ !== 57) throw Error("only defined for 25519 and 448");
    const N = k ? n.div(fe + y, fe - y) : n.div(y - fe, y + fe);
    return n.toBytes(N);
  }, toMontgomerySecret(E) {
    const y = T.secretKey;
    Fe(E, y);
    const _ = t(E.subarray(0, y));
    return f(_).subarray(0, y);
  }, randomPrivateKey: A, precompute: (E = 8, y = e.BASE) => y.precompute(E, !1) };
  return Object.freeze({ keygen: function(E) {
    const y = S.randomSecretKey(E);
    return { secretKey: y, publicKey: u(y) };
  }, getPublicKey: u, sign: function(E, y, _ = {}) {
    E = ne("message", E), r && (E = r(E));
    const { prefix: k, scalar: N, pointBytes: m } = l(y), w = d(_.context, k, E), O = a.multiply(w).toBytes(), v = d(_.context, O, m, E), R = o.create(w + v * N);
    if (!o.isValid(R)) throw Error("sign failed: invalid s");
    return Fe(Xe(O, o.toBytes(R)), T.signature, "result");
  }, verify: function(E, y, _, k = g) {
    const { context: N, zip215: m } = k, w = T.signature;
    E = ne("signature", E, w), y = ne("message", y), _ = ne("publicKey", _, T.publicKey), m !== void 0 && Ut(m, "zip215"), r && (y = r(y));
    const O = w / 2, v = E.subarray(0, O), R = Lt(E.subarray(O, w));
    let P, U, B;
    try {
      P = e.fromBytes(_, m), U = e.fromBytes(v, m), B = a.multiplyUnsafe(R);
    } catch {
      return !1;
    }
    if (!m && P.isSmallOrder()) return !1;
    const L = d(N, U.toBytes(), P.toBytes(), y);
    return U.add(P.multiplyUnsafe(L)).subtract(B).clearCofactor().is0();
  }, utils: S, Point: e, lengths: T });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const nr = BigInt(0), xt = BigInt(1), Cr = BigInt(2);
function O1(e) {
  const t = ($t(i = e, { adjustScalarBytes: "function", powPminus2: "function" }), Object.freeze({ ...i }));
  var i;
  const { P: r, type: a, adjustScalarBytes: n, powPminus2: o, randomBytes: s } = t, f = a === "x25519";
  if (!f && a !== "x448") throw Error("invalid type");
  const h = s || oi, c = f ? 255 : 448, l = f ? 32 : 56, u = BigInt(f ? 9 : 5), d = BigInt(f ? 121665 : 39081), g = f ? Cr ** BigInt(254) : Cr ** BigInt(447), b = f ? BigInt(8) * Cr ** BigInt(251) - xt : BigInt(4) * Cr ** BigInt(445) - xt, T = g + b + xt, A = (w) => se(w, r), S = E(u);
  function E(w) {
    return fn(A(w), l);
  }
  function y(w, O) {
    const v = (function(R, P) {
      Ar("u", R, nr, r), Ar("scalar", P, g, T);
      const U = P, B = R;
      let L = xt, C = nr, x = R, M = xt, X = nr;
      for (let D = BigInt(c - 1); D >= nr; D--) {
        const F = U >> D & xt;
        X ^= F, { x_2: L, x_3: x } = k(X, L, x), { x_2: C, x_3: M } = k(X, C, M), X = F;
        const K = L + C, G = A(K * K), H = L - C, j = A(H * H), Y = G - j, Q = x + M, W = A((x - M) * K), J = A(Q * H), te = W + J, oe = W - J;
        x = A(te * te), M = A(B * A(oe * oe)), L = A(G * j), C = A(Y * (G + A(d * Y)));
      }
      ({ x_2: L, x_3: x } = k(X, L, x)), { x_2: C, x_3: M } = k(X, C, M);
      const z = o(C);
      return A(L * z);
    })((function(R) {
      const P = ne("u coordinate", R, l);
      return f && (P[31] &= 127), A(Lt(P));
    })(O), (function(R) {
      return Lt(n(ne("scalar", R, l)));
    })(w));
    if (v === nr) throw Error("invalid private or public key received");
    return E(v);
  }
  function _(w) {
    return y(w, S);
  }
  function k(w, O, v) {
    const R = A(w * (O - v));
    return { x_2: O = A(O - R), x_3: v = A(v + R) };
  }
  const N = { secretKey: l, publicKey: l, seed: l }, m = (w = h(l)) => (Je(w, N.seed), w);
  return { keygen: function(w) {
    const O = m(w);
    return { secretKey: O, publicKey: _(O) };
  }, getSharedSecret: (w, O) => y(w, O), getPublicKey: (w) => _(w), scalarMult: y, scalarMultBase: _, utils: { randomSecretKey: m, randomPrivateKey: m }, GuBytes: S.slice(), lengths: N };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Xt = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x3fffffffffffffffffffffffffffffffffffffffffffffffffffffff7cca23e9c44edb49aed63690216cc2728dc58f552378c292ab5844f3"), h: BigInt(4), a: BigInt(1), d: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffff6756"), Gx: BigInt("0x4f1970c66bed0ded221d15a622bf36da9e146570470f1767ea6de324a3d3a46412ae1af72ab66511433b80e18b00938e2626a82bc70cc05e"), Gy: BigInt("0x693f46716eb6bc248876203756c9c7624bea73736ca3984087789c1e05a0c2d73ad3ff1ce67c39c4fdbd132c4ed7c8ad9808795bf230fa14") }, P1 = Object.assign({}, Xt, { d: BigInt("0xd78b4bdc7f0daf19f24f38c29373a2ccad46157242a50f37809b1da3412a12e79ccc9c81264cfe9ad080997058fb61c4243cc32dbaa156b9"), Gx: BigInt("0x79a70b2b70400553ae7c9df416c792c61128751ac92969240c25a07d728bdc93e21f7787ed6972249de732f38496cd11698713093e9c04fc"), Gy: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000000000000000000000000000000000000000000000000001") }), N1 = /* @__PURE__ */ ct((() => R1.create({ dkLen: 114 }))), k1 = BigInt(1), Gi = BigInt(2), Zn = BigInt(3);
BigInt(4);
const U1 = BigInt(11), L1 = BigInt(22), Wn = BigInt(44), B1 = BigInt(88), X1 = BigInt(223);
function G2(e) {
  const t = Xt.p, i = e * e * e % t, r = i * i * e % t, a = ie(r, Zn, t) * r % t, n = ie(a, Zn, t) * r % t, o = ie(n, Gi, t) * i % t, s = ie(o, U1, t) * o % t, f = ie(s, L1, t) * s % t, h = ie(f, Wn, t) * f % t, c = ie(h, B1, t) * h % t, l = ie(c, Wn, t) * f % t, u = ie(l, Gi, t) * i % t, d = ie(u, k1, t) * e % t;
  return ie(d, X1, t) * u % t;
}
function H2(e) {
  return e[0] &= 252, e[55] |= 128, e[56] = 0, e;
}
function C1(e, t) {
  const i = Xt.p, r = se(e * e * t, i), a = se(r * e, i), n = se(a * r * t, i), o = se(a * G2(n), i), s = se(o * o, i);
  return { isValid: se(s * t, i) === e, value: o };
}
const D1 = Te(Xt.p, { BITS: 456, isLE: !0 }), Qn = Te(Xt.n, { BITS: 456, isLE: !0 });
function F1(e, t, i) {
  if (t.length > 255) throw Error("context must be smaller than 255, got: " + t.length);
  return Xe((r = "SigEd448", Uint8Array.from(r, ((a, n) => {
    const o = a.charCodeAt(0);
    if (a.length !== 1 || o > 127) throw Error(`string contains non-ASCII character "${r[n]}" with code ${o} at position ${n}`);
    return o;
  }))), new Uint8Array([i ? 1 : 0, t.length]), t, e);
  var r;
}
const x1 = (function(e) {
  const { CURVE: t, curveOpts: i, hash: r, eddsaOpts: a } = (function(n) {
    const o = { a: n.a, d: n.d, p: n.Fp.ORDER, n: n.n, h: n.h, Gx: n.Gx, Gy: n.Gy }, s = { Fp: n.Fp, Fn: Te(o.n, n.nBitLength, !0), uvRatio: n.uvRatio }, f = { randomBytes: n.randomBytes, adjustScalarBytes: n.adjustScalarBytes, domain: n.domain, prehash: n.prehash, mapToCurve: n.mapToCurve };
    return { CURVE: o, curveOpts: s, hash: n.hash, eddsaOpts: f };
  })(e);
  return (function(n, o) {
    const s = o.Point;
    return Object.assign({}, o, { ExtendedPoint: s, CURVE: n, nBitLength: s.Fn.BITS, nByteLength: s.Fn.BYTES });
  })(e, _1(M2(t, i), r, a));
})({ ...Xt, Fp: D1, Fn: Qn, nBitLength: Qn.BITS, hash: N1, adjustScalarBytes: H2, domain: F1, uvRatio: C1 });
M2(P1);
const z1 = /* @__PURE__ */ (() => {
  const e = Xt.p;
  return O1({ P: e, type: "x448", powPminus2: (t) => se(ie(G2(t), Gi, e) * t, e), adjustScalarBytes: H2 });
})(), Hi = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), h: BigInt(1), a: BigInt(0), b: BigInt(7), Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8") }, K1 = { beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"), basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]] }, Jn = /* @__PURE__ */ BigInt(2);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Vi = Te(Hi.p, { sqrt: function(e) {
  const t = Hi.p, i = BigInt(3), r = BigInt(6), a = BigInt(11), n = BigInt(22), o = BigInt(23), s = BigInt(44), f = BigInt(88), h = e * e * e % t, c = h * h * e % t, l = ie(c, i, t) * c % t, u = ie(l, i, t) * c % t, d = ie(u, Jn, t) * h % t, g = ie(d, a, t) * d % t, b = ie(g, n, t) * g % t, T = ie(b, s, t) * b % t, A = ie(T, f, t) * T % t, S = ie(A, s, t) * b % t, E = ie(S, i, t) * c % t, y = ie(E, o, t) * g % t, _ = ie(y, r, t) * h % t, k = ie(_, Jn, t);
  if (!Vi.eql(Vi.sqr(k), e)) throw Error("Cannot find square root");
  return k;
} }), M1 = Bt({ ...Hi, Fp: Vi, lowS: !0, endo: K1 }, ln), V2 = ln, G1 = r1, $n = Te(BigInt("0xa9fb57dba1eea9bc3e660a909d838d726e3bf623d52620282013481d1f6e5377")), H1 = Bt({ a: $n.create(BigInt("0x7d5a0975fc2c3057eef67530417affe7fb8055c126dc5c6ce94a4b44f330b5d9")), b: BigInt("0x26dc5c6ce94a4b44f330b5d9bbd77cbf958416295cf7e1ce6bccdc18ff8c07b6"), Fp: $n, n: BigInt("0xa9fb57dba1eea9bc3e660a909d838d718c397aa3b561a6f7901e0e82974856a7"), Gx: BigInt("0x8bd2aeb9cb7e57cb2c4b482ffc81b7afb9de27e1e3bd23c23a4453bd9ace3262"), Gy: BigInt("0x547ef835c3dac4fd97f8461a14611dc9c27745132ded8e545c1d54c72f046997"), h: BigInt(1), lowS: !1 }, V2), Y2 = A2, j2 = T2, ea = Te(BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b412b1da197fb71123acd3a729901d1a71874700133107ec53")), V1 = Bt({ a: ea.create(BigInt("0x7bc382c63d8c150c3c72080ace05afa0c2bea28e4fb22787139165efba91f90f8aa5814a503ad4eb04a8c7dd22ce2826")), b: BigInt("0x04a8c7dd22ce28268b39b55416f0447c2fb77de107dcd2a62e880ea53eeb62d57cb4390295dbc9943ab78696fa504c11"), Fp: ea, n: BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b31f166e6cac0425a7cf3ab6af6b7fc3103b883202e9046565"), Gx: BigInt("0x1d1c64f068cf45ffa2a63a81b7c13f6b8847a3e77ef14fe3db7fcafe0cbd10e8e826e03436d646aaef87b2e247d4af1e"), Gy: BigInt("0x8abe1d7520f9c2a45cb1eb8e95cfd55262b70b29feec5864e19c054ff99129280e4646217791811142820341263c5315"), h: BigInt(1), lowS: !1 }, j2), ta = Te(BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca703308717d4d9b009bc66842aecda12ae6a380e62881ff2f2d82c68528aa6056583a48f3")), Y1 = Bt({ a: ta.create(BigInt("0x7830a3318b603b89e2327145ac234cc594cbdd8d3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94ca")), b: BigInt("0x3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94cadc083e67984050b75ebae5dd2809bd638016f723"), Fp: ta, n: BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca70330870553e5c414ca92619418661197fac10471db1d381085ddaddb58796829ca90069"), Gx: BigInt("0x81aee4bdd82ed9645a21322e9c4c6a9385ed9f70b5d916c1b43b62eef4d0098eff3b1f78e2d0d48d50d1687b93b97d5f7c6d5047406a5e688b352209bcb9f822"), Gy: BigInt("0x7dde385d566332ecc0eabfa9cf7822fdf209f70024a57b1aa000c55b881f8111b2dcde494a5f485e5bca4bd88a2763aed1ca2b2fa8f0540678cd1e0f3ad80892"), h: BigInt(1), lowS: !1 }, Y2), j1 = new Map(Object.entries({ nistP256: u1, nistP384: d1, nistP521: g1, brainpoolP256r1: H1, brainpoolP384r1: V1, brainpoolP512r1: Y1, secp256k1: M1, x448: z1, ed448: x1 }));
var q1 = /* @__PURE__ */ Object.freeze({ __proto__: null, nobleCurves: j1 });
const ar = /* @__PURE__ */ Uint32Array.from([1732584193, 4023233417, 2562383102, 271733878, 3285377520]), yt = /* @__PURE__ */ new Uint32Array(80);
class Z1 extends Pr {
  constructor() {
    super(64, 20, 8, !1), this.A = 0 | ar[0], this.B = 0 | ar[1], this.C = 0 | ar[2], this.D = 0 | ar[3], this.E = 0 | ar[4];
  }
  get() {
    const { A: t, B: i, C: r, D: a, E: n } = this;
    return [t, i, r, a, n];
  }
  set(t, i, r, a, n) {
    this.A = 0 | t, this.B = 0 | i, this.C = 0 | r, this.D = 0 | a, this.E = 0 | n;
  }
  process(t, i) {
    for (let f = 0; f < 16; f++, i += 4) yt[f] = t.getUint32(i, !1);
    for (let f = 16; f < 80; f++) yt[f] = wt(yt[f - 3] ^ yt[f - 8] ^ yt[f - 14] ^ yt[f - 16], 1);
    let { A: r, B: a, C: n, D: o, E: s } = this;
    for (let f = 0; f < 80; f++) {
      let h, c;
      f < 20 ? (h = y2(a, n, o), c = 1518500249) : f < 40 ? (h = a ^ n ^ o, c = 1859775393) : f < 60 ? (h = b2(a, n, o), c = 2400959708) : (h = a ^ n ^ o, c = 3395469782);
      const l = wt(r, 5) + h + s + c + yt[f] | 0;
      s = o, o = n, n = wt(a, 30), a = r, r = l;
    }
    r = r + this.A | 0, a = a + this.B | 0, n = n + this.C | 0, o = o + this.D | 0, s = s + this.E | 0, this.set(r, a, n, o, s);
  }
  roundClean() {
    ke(yt);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0), ke(this.buffer);
  }
}
const W1 = /* @__PURE__ */ ct((() => new Z1())), Q1 = /* @__PURE__ */ Uint8Array.from([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), q2 = Uint8Array.from(Array(16).fill(0).map(((e, t) => t))), J1 = q2.map(((e) => (9 * e + 5) % 16)), Z2 = /* @__PURE__ */ (() => {
  const e = [[q2], [J1]];
  for (let t = 0; t < 4; t++) for (let i of e) i.push(i[t].map(((r) => Q1[r])));
  return e;
})(), W2 = Z2[0], Q2 = Z2[1], J2 = /* @__PURE__ */ [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map(((e) => Uint8Array.from(e))), $1 = /* @__PURE__ */ W2.map(((e, t) => e.map(((i) => J2[t][i])))), e0 = /* @__PURE__ */ Q2.map(((e, t) => e.map(((i) => J2[t][i])))), t0 = /* @__PURE__ */ Uint32Array.from([0, 1518500249, 1859775393, 2400959708, 2840853838]), r0 = /* @__PURE__ */ Uint32Array.from([1352829926, 1548603684, 1836072691, 2053994217, 0]);
function ra(e, t, i, r) {
  return e === 0 ? t ^ i ^ r : e === 1 ? t & i | ~t & r : e === 2 ? (t | ~i) ^ r : e === 3 ? t & r | i & ~r : t ^ (i | ~r);
}
const Dr = /* @__PURE__ */ new Uint32Array(16);
class i0 extends Pr {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: i, h2: r, h3: a, h4: n } = this;
    return [t, i, r, a, n];
  }
  set(t, i, r, a, n) {
    this.h0 = 0 | t, this.h1 = 0 | i, this.h2 = 0 | r, this.h3 = 0 | a, this.h4 = 0 | n;
  }
  process(t, i) {
    for (let d = 0; d < 16; d++, i += 4) Dr[d] = t.getUint32(i, !0);
    let r = 0 | this.h0, a = r, n = 0 | this.h1, o = n, s = 0 | this.h2, f = s, h = 0 | this.h3, c = h, l = 0 | this.h4, u = l;
    for (let d = 0; d < 5; d++) {
      const g = 4 - d, b = t0[d], T = r0[d], A = W2[d], S = Q2[d], E = $1[d], y = e0[d];
      for (let _ = 0; _ < 16; _++) {
        const k = wt(r + ra(d, n, s, h) + Dr[A[_]] + b, E[_]) + l | 0;
        r = l, l = h, h = 0 | wt(s, 10), s = n, n = k;
      }
      for (let _ = 0; _ < 16; _++) {
        const k = wt(a + ra(g, o, f, c) + Dr[S[_]] + T, y[_]) + u | 0;
        a = u, u = c, c = 0 | wt(f, 10), f = o, o = k;
      }
    }
    this.set(this.h1 + s + c | 0, this.h2 + h + u | 0, this.h3 + l + a | 0, this.h4 + r + o | 0, this.h0 + n + f | 0);
  }
  roundClean() {
    ke(Dr);
  }
  destroy() {
    this.destroyed = !0, ke(this.buffer), this.set(0, 0, 0, 0, 0);
  }
}
const n0 = W1, a0 = /* @__PURE__ */ ct((() => new i0())), o0 = Array.from({ length: 64 }, ((e, t) => Math.floor(2 ** 32 * Math.abs(Math.sin(t + 1))))), ia = (e, t, i) => e & t ^ ~e & i, Fr = /* @__PURE__ */ new Uint32Array([1732584193, 4023233417, 2562383102, 271733878]), Ri = /* @__PURE__ */ new Uint32Array(16);
class s0 extends Pr {
  constructor() {
    super(64, 16, 8, !0), this.A = 0 | Fr[0], this.B = 0 | Fr[1], this.C = 0 | Fr[2], this.D = 0 | Fr[3];
  }
  get() {
    const { A: t, B: i, C: r, D: a } = this;
    return [t, i, r, a];
  }
  set(t, i, r, a) {
    this.A = 0 | t, this.B = 0 | i, this.C = 0 | r, this.D = 0 | a;
  }
  process(t, i) {
    for (let s = 0; s < 16; s++, i += 4) Ri[s] = t.getUint32(i, !0);
    let { A: r, B: a, C: n, D: o } = this;
    for (let s = 0; s < 64; s++) {
      let f, h, c;
      s < 16 ? (f = ia(a, n, o), h = s, c = [7, 12, 17, 22]) : s < 32 ? (f = ia(o, a, n), h = (5 * s + 1) % 16, c = [5, 9, 14, 20]) : s < 48 ? (f = a ^ n ^ o, h = (3 * s + 5) % 16, c = [4, 11, 16, 23]) : (f = n ^ (a | ~o), h = 7 * s % 16, c = [6, 10, 15, 21]), f = f + r + o0[s] + Ri[h], r = o, o = n, n = a, a += wt(f, c[s % 4]);
    }
    r = r + this.A | 0, a = a + this.B | 0, n = n + this.C | 0, o = o + this.D | 0, this.set(r, a, n, o);
  }
  roundClean() {
    Ri.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0), this.buffer.fill(0);
  }
}
const f0 = new Map(Object.entries({ md5: /* @__PURE__ */ Fs((() => new s0())), sha1: n0, sha224: G1, sha256: V2, sha384: j2, sha512: Y2, sha3_256: A1, sha3_512: T1, ripemd160: a0 }));
var c0 = /* @__PURE__ */ Object.freeze({ __proto__: null, nobleHashes: f0 });
const Ii = typeof be == "object" && "crypto" in be ? be.crypto : void 0, Ee = {};
var V = function(e) {
  var t, i = new Float64Array(16);
  if (e) for (t = 0; t < e.length; t++) i[t] = e[t];
  return i;
}, Yi = function() {
  throw Error("no PRNG");
}, $2 = new Uint8Array(32);
$2[0] = 9;
var ji = V(), ri = V([1]), l0 = V([56129, 1]), h0 = V([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), u0 = V([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), na = V([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), aa = V([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), d0 = V([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
function oa(e, t, i, r) {
  e[t] = i >> 24 & 255, e[t + 1] = i >> 16 & 255, e[t + 2] = i >> 8 & 255, e[t + 3] = 255 & i, e[t + 4] = r >> 24 & 255, e[t + 5] = r >> 16 & 255, e[t + 6] = r >> 8 & 255, e[t + 7] = 255 & r;
}
function eo(e, t, i, r) {
  return (function(a, n, o, s, f) {
    var h, c = 0;
    for (h = 0; h < f; h++) c |= a[n + h] ^ o[s + h];
    return (1 & c - 1 >>> 8) - 1;
  })(e, t, i, r, 32);
}
function Et(e, t) {
  var i;
  for (i = 0; i < 16; i++) e[i] = 0 | t[i];
}
function _i(e) {
  var t, i, r = 1;
  for (t = 0; t < 16; t++) i = e[t] + r + 65535, r = Math.floor(i / 65536), e[t] = i - 65536 * r;
  e[0] += r - 1 + 37 * (r - 1);
}
function Vt(e, t, i) {
  for (var r, a = ~(i - 1), n = 0; n < 16; n++) r = a & (e[n] ^ t[n]), e[n] ^= r, t[n] ^= r;
}
function Tr(e, t) {
  var i, r, a, n = V(), o = V();
  for (i = 0; i < 16; i++) o[i] = t[i];
  for (_i(o), _i(o), _i(o), r = 0; r < 2; r++) {
    for (n[0] = o[0] - 65517, i = 1; i < 15; i++) n[i] = o[i] - 65535 - (n[i - 1] >> 16 & 1), n[i - 1] &= 65535;
    n[15] = o[15] - 32767 - (n[14] >> 16 & 1), a = n[15] >> 16 & 1, n[14] &= 65535, Vt(o, n, 1 - a);
  }
  for (i = 0; i < 16; i++) e[2 * i] = 255 & o[i], e[2 * i + 1] = o[i] >> 8;
}
function sa(e, t) {
  var i = new Uint8Array(32), r = new Uint8Array(32);
  return Tr(i, e), Tr(r, t), eo(i, 0, r, 0);
}
function to(e) {
  var t = new Uint8Array(32);
  return Tr(t, e), 1 & t[0];
}
function ro(e, t) {
  var i;
  for (i = 0; i < 16; i++) e[i] = t[2 * i] + (t[2 * i + 1] << 8);
  e[15] &= 32767;
}
function qe(e, t, i) {
  for (var r = 0; r < 16; r++) e[r] = t[r] + i[r];
}
function Ze(e, t, i) {
  for (var r = 0; r < 16; r++) e[r] = t[r] - i[r];
}
function Z(e, t, i) {
  var r, a, n = 0, o = 0, s = 0, f = 0, h = 0, c = 0, l = 0, u = 0, d = 0, g = 0, b = 0, T = 0, A = 0, S = 0, E = 0, y = 0, _ = 0, k = 0, N = 0, m = 0, w = 0, O = 0, v = 0, R = 0, P = 0, U = 0, B = 0, L = 0, C = 0, x = 0, M = 0, X = i[0], z = i[1], D = i[2], F = i[3], K = i[4], G = i[5], H = i[6], j = i[7], Y = i[8], Q = i[9], W = i[10], J = i[11], te = i[12], oe = i[13], he = i[14], ue = i[15];
  n += (r = t[0]) * X, o += r * z, s += r * D, f += r * F, h += r * K, c += r * G, l += r * H, u += r * j, d += r * Y, g += r * Q, b += r * W, T += r * J, A += r * te, S += r * oe, E += r * he, y += r * ue, o += (r = t[1]) * X, s += r * z, f += r * D, h += r * F, c += r * K, l += r * G, u += r * H, d += r * j, g += r * Y, b += r * Q, T += r * W, A += r * J, S += r * te, E += r * oe, y += r * he, _ += r * ue, s += (r = t[2]) * X, f += r * z, h += r * D, c += r * F, l += r * K, u += r * G, d += r * H, g += r * j, b += r * Y, T += r * Q, A += r * W, S += r * J, E += r * te, y += r * oe, _ += r * he, k += r * ue, f += (r = t[3]) * X, h += r * z, c += r * D, l += r * F, u += r * K, d += r * G, g += r * H, b += r * j, T += r * Y, A += r * Q, S += r * W, E += r * J, y += r * te, _ += r * oe, k += r * he, N += r * ue, h += (r = t[4]) * X, c += r * z, l += r * D, u += r * F, d += r * K, g += r * G, b += r * H, T += r * j, A += r * Y, S += r * Q, E += r * W, y += r * J, _ += r * te, k += r * oe, N += r * he, m += r * ue, c += (r = t[5]) * X, l += r * z, u += r * D, d += r * F, g += r * K, b += r * G, T += r * H, A += r * j, S += r * Y, E += r * Q, y += r * W, _ += r * J, k += r * te, N += r * oe, m += r * he, w += r * ue, l += (r = t[6]) * X, u += r * z, d += r * D, g += r * F, b += r * K, T += r * G, A += r * H, S += r * j, E += r * Y, y += r * Q, _ += r * W, k += r * J, N += r * te, m += r * oe, w += r * he, O += r * ue, u += (r = t[7]) * X, d += r * z, g += r * D, b += r * F, T += r * K, A += r * G, S += r * H, E += r * j, y += r * Y, _ += r * Q, k += r * W, N += r * J, m += r * te, w += r * oe, O += r * he, v += r * ue, d += (r = t[8]) * X, g += r * z, b += r * D, T += r * F, A += r * K, S += r * G, E += r * H, y += r * j, _ += r * Y, k += r * Q, N += r * W, m += r * J, w += r * te, O += r * oe, v += r * he, R += r * ue, g += (r = t[9]) * X, b += r * z, T += r * D, A += r * F, S += r * K, E += r * G, y += r * H, _ += r * j, k += r * Y, N += r * Q, m += r * W, w += r * J, O += r * te, v += r * oe, R += r * he, P += r * ue, b += (r = t[10]) * X, T += r * z, A += r * D, S += r * F, E += r * K, y += r * G, _ += r * H, k += r * j, N += r * Y, m += r * Q, w += r * W, O += r * J, v += r * te, R += r * oe, P += r * he, U += r * ue, T += (r = t[11]) * X, A += r * z, S += r * D, E += r * F, y += r * K, _ += r * G, k += r * H, N += r * j, m += r * Y, w += r * Q, O += r * W, v += r * J, R += r * te, P += r * oe, U += r * he, B += r * ue, A += (r = t[12]) * X, S += r * z, E += r * D, y += r * F, _ += r * K, k += r * G, N += r * H, m += r * j, w += r * Y, O += r * Q, v += r * W, R += r * J, P += r * te, U += r * oe, B += r * he, L += r * ue, S += (r = t[13]) * X, E += r * z, y += r * D, _ += r * F, k += r * K, N += r * G, m += r * H, w += r * j, O += r * Y, v += r * Q, R += r * W, P += r * J, U += r * te, B += r * oe, L += r * he, C += r * ue, E += (r = t[14]) * X, y += r * z, _ += r * D, k += r * F, N += r * K, m += r * G, w += r * H, O += r * j, v += r * Y, R += r * Q, P += r * W, U += r * J, B += r * te, L += r * oe, C += r * he, x += r * ue, y += (r = t[15]) * X, o += 38 * (k += r * D), s += 38 * (N += r * F), f += 38 * (m += r * K), h += 38 * (w += r * G), c += 38 * (O += r * H), l += 38 * (v += r * j), u += 38 * (R += r * Y), d += 38 * (P += r * Q), g += 38 * (U += r * W), b += 38 * (B += r * J), T += 38 * (L += r * te), A += 38 * (C += r * oe), S += 38 * (x += r * he), E += 38 * (M += r * ue), n = (r = (n += 38 * (_ += r * z)) + (a = 1) + 65535) - 65536 * (a = Math.floor(r / 65536)), o = (r = o + a + 65535) - 65536 * (a = Math.floor(r / 65536)), s = (r = s + a + 65535) - 65536 * (a = Math.floor(r / 65536)), f = (r = f + a + 65535) - 65536 * (a = Math.floor(r / 65536)), h = (r = h + a + 65535) - 65536 * (a = Math.floor(r / 65536)), c = (r = c + a + 65535) - 65536 * (a = Math.floor(r / 65536)), l = (r = l + a + 65535) - 65536 * (a = Math.floor(r / 65536)), u = (r = u + a + 65535) - 65536 * (a = Math.floor(r / 65536)), d = (r = d + a + 65535) - 65536 * (a = Math.floor(r / 65536)), g = (r = g + a + 65535) - 65536 * (a = Math.floor(r / 65536)), b = (r = b + a + 65535) - 65536 * (a = Math.floor(r / 65536)), T = (r = T + a + 65535) - 65536 * (a = Math.floor(r / 65536)), A = (r = A + a + 65535) - 65536 * (a = Math.floor(r / 65536)), S = (r = S + a + 65535) - 65536 * (a = Math.floor(r / 65536)), E = (r = E + a + 65535) - 65536 * (a = Math.floor(r / 65536)), y = (r = y + a + 65535) - 65536 * (a = Math.floor(r / 65536)), n = (r = (n += a - 1 + 37 * (a - 1)) + (a = 1) + 65535) - 65536 * (a = Math.floor(r / 65536)), o = (r = o + a + 65535) - 65536 * (a = Math.floor(r / 65536)), s = (r = s + a + 65535) - 65536 * (a = Math.floor(r / 65536)), f = (r = f + a + 65535) - 65536 * (a = Math.floor(r / 65536)), h = (r = h + a + 65535) - 65536 * (a = Math.floor(r / 65536)), c = (r = c + a + 65535) - 65536 * (a = Math.floor(r / 65536)), l = (r = l + a + 65535) - 65536 * (a = Math.floor(r / 65536)), u = (r = u + a + 65535) - 65536 * (a = Math.floor(r / 65536)), d = (r = d + a + 65535) - 65536 * (a = Math.floor(r / 65536)), g = (r = g + a + 65535) - 65536 * (a = Math.floor(r / 65536)), b = (r = b + a + 65535) - 65536 * (a = Math.floor(r / 65536)), T = (r = T + a + 65535) - 65536 * (a = Math.floor(r / 65536)), A = (r = A + a + 65535) - 65536 * (a = Math.floor(r / 65536)), S = (r = S + a + 65535) - 65536 * (a = Math.floor(r / 65536)), E = (r = E + a + 65535) - 65536 * (a = Math.floor(r / 65536)), y = (r = y + a + 65535) - 65536 * (a = Math.floor(r / 65536)), n += a - 1 + 37 * (a - 1), e[0] = n, e[1] = o, e[2] = s, e[3] = f, e[4] = h, e[5] = c, e[6] = l, e[7] = u, e[8] = d, e[9] = g, e[10] = b, e[11] = T, e[12] = A, e[13] = S, e[14] = E, e[15] = y;
}
function Ce(e, t) {
  Z(e, t, t);
}
function io(e, t) {
  var i, r = V();
  for (i = 0; i < 16; i++) r[i] = t[i];
  for (i = 253; i >= 0; i--) Ce(r, r), i !== 2 && i !== 4 && Z(r, r, t);
  for (i = 0; i < 16; i++) e[i] = r[i];
}
function no(e, t, i) {
  var r, a, n = new Uint8Array(32), o = new Float64Array(80), s = V(), f = V(), h = V(), c = V(), l = V(), u = V();
  for (a = 0; a < 31; a++) n[a] = t[a];
  for (n[31] = 127 & t[31] | 64, n[0] &= 248, ro(o, i), a = 0; a < 16; a++) f[a] = o[a], c[a] = s[a] = h[a] = 0;
  for (s[0] = c[0] = 1, a = 254; a >= 0; --a) Vt(s, f, r = n[a >>> 3] >>> (7 & a) & 1), Vt(h, c, r), qe(l, s, h), Ze(s, s, h), qe(h, f, c), Ze(f, f, c), Ce(c, l), Ce(u, s), Z(s, h, s), Z(h, f, l), qe(l, s, h), Ze(s, s, h), Ce(f, s), Ze(h, c, u), Z(s, h, l0), qe(s, s, c), Z(h, h, s), Z(s, c, u), Z(c, f, o), Ce(f, l), Vt(s, f, r), Vt(h, c, r);
  for (a = 0; a < 16; a++) o[a + 16] = s[a], o[a + 32] = h[a], o[a + 48] = f[a], o[a + 64] = c[a];
  var d = o.subarray(32), g = o.subarray(16);
  return io(d, d), Z(g, g, d), Tr(e, g), 0;
}
function fa(e, t) {
  return no(e, t, $2);
}
var ca = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
function la(e, t, i, r) {
  for (var a, n, o, s, f, h, c, l, u, d, g, b, T, A, S, E, y, _, k, N, m, w, O, v, R, P, U = new Int32Array(16), B = new Int32Array(16), L = e[0], C = e[1], x = e[2], M = e[3], X = e[4], z = e[5], D = e[6], F = e[7], K = t[0], G = t[1], H = t[2], j = t[3], Y = t[4], Q = t[5], W = t[6], J = t[7], te = 0; r >= 128; ) {
    for (k = 0; k < 16; k++) N = 8 * k + te, U[k] = i[N + 0] << 24 | i[N + 1] << 16 | i[N + 2] << 8 | i[N + 3], B[k] = i[N + 4] << 24 | i[N + 5] << 16 | i[N + 6] << 8 | i[N + 7];
    for (k = 0; k < 80; k++) if (a = L, n = C, o = x, s = M, f = X, h = z, c = D, u = K, d = G, g = H, b = j, T = Y, A = Q, S = W, O = 65535 & (w = J), v = w >>> 16, R = 65535 & (m = F), P = m >>> 16, O += 65535 & (w = (Y >>> 14 | X << 18) ^ (Y >>> 18 | X << 14) ^ (X >>> 9 | Y << 23)), v += w >>> 16, R += 65535 & (m = (X >>> 14 | Y << 18) ^ (X >>> 18 | Y << 14) ^ (Y >>> 9 | X << 23)), P += m >>> 16, O += 65535 & (w = Y & Q ^ ~Y & W), v += w >>> 16, R += 65535 & (m = X & z ^ ~X & D), P += m >>> 16, O += 65535 & (w = ca[2 * k + 1]), v += w >>> 16, R += 65535 & (m = ca[2 * k]), P += m >>> 16, m = U[k % 16], v += (w = B[k % 16]) >>> 16, R += 65535 & m, P += m >>> 16, R += (v += (O += 65535 & w) >>> 16) >>> 16, O = 65535 & (w = _ = 65535 & O | v << 16), v = w >>> 16, R = 65535 & (m = y = 65535 & R | (P += R >>> 16) << 16), P = m >>> 16, O += 65535 & (w = (K >>> 28 | L << 4) ^ (L >>> 2 | K << 30) ^ (L >>> 7 | K << 25)), v += w >>> 16, R += 65535 & (m = (L >>> 28 | K << 4) ^ (K >>> 2 | L << 30) ^ (K >>> 7 | L << 25)), P += m >>> 16, v += (w = K & G ^ K & H ^ G & H) >>> 16, R += 65535 & (m = L & C ^ L & x ^ C & x), P += m >>> 16, l = 65535 & (R += (v += (O += 65535 & w) >>> 16) >>> 16) | (P += R >>> 16) << 16, E = 65535 & O | v << 16, O = 65535 & (w = b), v = w >>> 16, R = 65535 & (m = s), P = m >>> 16, v += (w = _) >>> 16, R += 65535 & (m = y), P += m >>> 16, C = a, x = n, M = o, X = s = 65535 & (R += (v += (O += 65535 & w) >>> 16) >>> 16) | (P += R >>> 16) << 16, z = f, D = h, F = c, L = l, G = u, H = d, j = g, Y = b = 65535 & O | v << 16, Q = T, W = A, J = S, K = E, k % 16 == 15) for (N = 0; N < 16; N++) m = U[N], O = 65535 & (w = B[N]), v = w >>> 16, R = 65535 & m, P = m >>> 16, m = U[(N + 9) % 16], O += 65535 & (w = B[(N + 9) % 16]), v += w >>> 16, R += 65535 & m, P += m >>> 16, y = U[(N + 1) % 16], O += 65535 & (w = ((_ = B[(N + 1) % 16]) >>> 1 | y << 31) ^ (_ >>> 8 | y << 24) ^ (_ >>> 7 | y << 25)), v += w >>> 16, R += 65535 & (m = (y >>> 1 | _ << 31) ^ (y >>> 8 | _ << 24) ^ y >>> 7), P += m >>> 16, y = U[(N + 14) % 16], v += (w = ((_ = B[(N + 14) % 16]) >>> 19 | y << 13) ^ (y >>> 29 | _ << 3) ^ (_ >>> 6 | y << 26)) >>> 16, R += 65535 & (m = (y >>> 19 | _ << 13) ^ (_ >>> 29 | y << 3) ^ y >>> 6), P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, U[N] = 65535 & R | P << 16, B[N] = 65535 & O | v << 16;
    O = 65535 & (w = K), v = w >>> 16, R = 65535 & (m = L), P = m >>> 16, m = e[0], v += (w = t[0]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[0] = L = 65535 & R | P << 16, t[0] = K = 65535 & O | v << 16, O = 65535 & (w = G), v = w >>> 16, R = 65535 & (m = C), P = m >>> 16, m = e[1], v += (w = t[1]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[1] = C = 65535 & R | P << 16, t[1] = G = 65535 & O | v << 16, O = 65535 & (w = H), v = w >>> 16, R = 65535 & (m = x), P = m >>> 16, m = e[2], v += (w = t[2]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[2] = x = 65535 & R | P << 16, t[2] = H = 65535 & O | v << 16, O = 65535 & (w = j), v = w >>> 16, R = 65535 & (m = M), P = m >>> 16, m = e[3], v += (w = t[3]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[3] = M = 65535 & R | P << 16, t[3] = j = 65535 & O | v << 16, O = 65535 & (w = Y), v = w >>> 16, R = 65535 & (m = X), P = m >>> 16, m = e[4], v += (w = t[4]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[4] = X = 65535 & R | P << 16, t[4] = Y = 65535 & O | v << 16, O = 65535 & (w = Q), v = w >>> 16, R = 65535 & (m = z), P = m >>> 16, m = e[5], v += (w = t[5]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[5] = z = 65535 & R | P << 16, t[5] = Q = 65535 & O | v << 16, O = 65535 & (w = W), v = w >>> 16, R = 65535 & (m = D), P = m >>> 16, m = e[6], v += (w = t[6]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[6] = D = 65535 & R | P << 16, t[6] = W = 65535 & O | v << 16, O = 65535 & (w = J), v = w >>> 16, R = 65535 & (m = F), P = m >>> 16, m = e[7], v += (w = t[7]) >>> 16, R += 65535 & m, P += m >>> 16, P += (R += (v += (O += 65535 & w) >>> 16) >>> 16) >>> 16, e[7] = F = 65535 & R | P << 16, t[7] = J = 65535 & O | v << 16, te += 128, r -= 128;
  }
  return r;
}
function sr(e, t, i) {
  var r, a = new Int32Array(8), n = new Int32Array(8), o = new Uint8Array(256), s = i;
  for (a[0] = 1779033703, a[1] = 3144134277, a[2] = 1013904242, a[3] = 2773480762, a[4] = 1359893119, a[5] = 2600822924, a[6] = 528734635, a[7] = 1541459225, n[0] = 4089235720, n[1] = 2227873595, n[2] = 4271175723, n[3] = 1595750129, n[4] = 2917565137, n[5] = 725511199, n[6] = 4215389547, n[7] = 327033209, la(a, n, t, i), i %= 128, r = 0; r < i; r++) o[r] = t[s - i + r];
  for (o[i] = 128, o[(i = 256 - 128 * (i < 112 ? 1 : 0)) - 9] = 0, oa(o, i - 8, s / 536870912 | 0, s << 3), la(a, n, o, i), r = 0; r < 8; r++) oa(e, 8 * r, a[r], n[r]);
  return 0;
}
function qi(e, t) {
  var i = V(), r = V(), a = V(), n = V(), o = V(), s = V(), f = V(), h = V(), c = V();
  Ze(i, e[1], e[0]), Ze(c, t[1], t[0]), Z(i, i, c), qe(r, e[0], e[1]), qe(c, t[0], t[1]), Z(r, r, c), Z(a, e[3], t[3]), Z(a, a, u0), Z(n, e[2], t[2]), qe(n, n, n), Ze(o, r, i), Ze(s, n, a), qe(f, n, a), qe(h, r, i), Z(e[0], o, s), Z(e[1], h, f), Z(e[2], f, s), Z(e[3], o, h);
}
function ha(e, t, i) {
  var r;
  for (r = 0; r < 4; r++) Vt(e[r], t[r], i);
}
function Zi(e, t) {
  var i = V(), r = V(), a = V();
  io(a, t[2]), Z(i, t[0], a), Z(r, t[1], a), Tr(e, r), e[31] ^= to(i) << 7;
}
function ao(e, t, i) {
  var r, a;
  for (Et(e[0], ji), Et(e[1], ri), Et(e[2], ri), Et(e[3], ji), a = 255; a >= 0; --a) ha(e, t, r = i[a / 8 | 0] >> (7 & a) & 1), qi(t, e), qi(e, e), ha(e, t, r);
}
function Wi(e, t) {
  var i = [V(), V(), V(), V()];
  Et(i[0], na), Et(i[1], aa), Et(i[2], ri), Z(i[3], na, aa), ao(e, i, t);
}
function ua(e, t, i) {
  var r, a = new Uint8Array(64), n = [V(), V(), V(), V()];
  for (i || Yi(t, 32), sr(a, t, 32), a[0] &= 248, a[31] &= 127, a[31] |= 64, Wi(n, a), Zi(e, n), r = 0; r < 32; r++) t[r + 32] = e[r];
  return 0;
}
var Oi = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
function oo(e, t) {
  var i, r, a, n;
  for (r = 63; r >= 32; --r) {
    for (i = 0, a = r - 32, n = r - 12; a < n; ++a) t[a] += i - 16 * t[r] * Oi[a - (r - 32)], i = Math.floor((t[a] + 128) / 256), t[a] -= 256 * i;
    t[a] += i, t[r] = 0;
  }
  for (i = 0, a = 0; a < 32; a++) t[a] += i - (t[31] >> 4) * Oi[a], i = t[a] >> 8, t[a] &= 255;
  for (a = 0; a < 32; a++) t[a] -= i * Oi[a];
  for (r = 0; r < 32; r++) t[r + 1] += t[r] >> 8, e[r] = 255 & t[r];
}
function Pi(e) {
  var t, i = new Float64Array(64);
  for (t = 0; t < 64; t++) i[t] = e[t];
  for (t = 0; t < 64; t++) e[t] = 0;
  oo(e, i);
}
function g0(e, t) {
  var i = V(), r = V(), a = V(), n = V(), o = V(), s = V(), f = V();
  return Et(e[2], ri), ro(e[1], t), Ce(a, e[1]), Z(n, a, h0), Ze(a, a, e[2]), qe(n, e[2], n), Ce(o, n), Ce(s, o), Z(f, s, o), Z(i, f, a), Z(i, i, n), (function(h, c) {
    var l, u = V();
    for (l = 0; l < 16; l++) u[l] = c[l];
    for (l = 250; l >= 0; l--) Ce(u, u), l !== 1 && Z(u, u, c);
    for (l = 0; l < 16; l++) h[l] = u[l];
  })(i, i), Z(i, i, a), Z(i, i, n), Z(i, i, n), Z(e[0], i, n), Ce(r, e[0]), Z(r, r, n), sa(r, a) && Z(e[0], e[0], d0), Ce(r, e[0]), Z(r, r, n), sa(r, a) ? -1 : (to(e[0]) === t[31] >> 7 && Ze(e[0], ji, e[0]), Z(e[3], e[0], e[1]), 0);
}
var St = 64;
function zt() {
  for (var e = 0; e < arguments.length; e++) if (!(arguments[e] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array");
}
Ee.scalarMult = function(e, t) {
  if (zt(e, t), e.length !== 32) throw Error("bad n size");
  if (t.length !== 32) throw Error("bad p size");
  var i = new Uint8Array(32);
  return no(i, e, t), i;
}, Ee.box = {}, Ee.box.keyPair = function() {
  var e = new Uint8Array(32), t = new Uint8Array(32);
  return (function(i, r) {
    Yi(r, 32), fa(i, r);
  })(e, t), { publicKey: e, secretKey: t };
}, Ee.box.keyPair.fromSecretKey = function(e) {
  if (zt(e), e.length !== 32) throw Error("bad secret key size");
  var t = new Uint8Array(32);
  return fa(t, e), { publicKey: t, secretKey: new Uint8Array(e) };
}, Ee.sign = function(e, t) {
  if (zt(e, t), t.length !== 64) throw Error("bad secret key size");
  var i = new Uint8Array(St + e.length);
  return (function(r, a, n, o) {
    var s, f, h = new Uint8Array(64), c = new Uint8Array(64), l = new Uint8Array(64), u = new Float64Array(64), d = [V(), V(), V(), V()];
    for (sr(h, o, 32), h[0] &= 248, h[31] &= 127, h[31] |= 64, s = 0; s < n; s++) r[64 + s] = a[s];
    for (s = 0; s < 32; s++) r[32 + s] = h[32 + s];
    for (sr(l, r.subarray(32), n + 32), Pi(l), Wi(d, l), Zi(r, d), s = 32; s < 64; s++) r[s] = o[s];
    for (sr(c, r, n + 64), Pi(c), s = 0; s < 64; s++) u[s] = 0;
    for (s = 0; s < 32; s++) u[s] = l[s];
    for (s = 0; s < 32; s++) for (f = 0; f < 32; f++) u[s + f] += c[s] * h[f];
    oo(r.subarray(32), u);
  })(i, e, e.length, t), i;
}, Ee.sign.detached = function(e, t) {
  for (var i = Ee.sign(e, t), r = new Uint8Array(St), a = 0; a < r.length; a++) r[a] = i[a];
  return r;
}, Ee.sign.detached.verify = function(e, t, i) {
  if (zt(e, t, i), t.length !== St) throw Error("bad signature size");
  if (i.length !== 32) throw Error("bad public key size");
  var r, a = new Uint8Array(St + e.length), n = new Uint8Array(St + e.length);
  for (r = 0; r < St; r++) a[r] = t[r];
  for (r = 0; r < e.length; r++) a[r + St] = e[r];
  return (function(o, s, f, h) {
    var c, l = new Uint8Array(32), u = new Uint8Array(64), d = [V(), V(), V(), V()], g = [V(), V(), V(), V()];
    if (f < 64 || g0(g, h)) return -1;
    for (c = 0; c < f; c++) o[c] = s[c];
    for (c = 0; c < 32; c++) o[c + 32] = h[c];
    if (sr(u, o, f), Pi(u), ao(d, g, u), Wi(g, s.subarray(32)), qi(d, g), Zi(l, d), f -= 64, eo(s, 0, l, 0)) {
      for (c = 0; c < f; c++) o[c] = 0;
      return -1;
    }
    for (c = 0; c < f; c++) o[c] = s[c + 64];
    return f;
  })(n, a, a.length, i) >= 0;
}, Ee.sign.keyPair = function() {
  var e = new Uint8Array(32), t = new Uint8Array(64);
  return ua(e, t), { publicKey: e, secretKey: t };
}, Ee.sign.keyPair.fromSecretKey = function(e) {
  if (zt(e), e.length !== 64) throw Error("bad secret key size");
  for (var t = new Uint8Array(32), i = 0; i < t.length; i++) t[i] = e[32 + i];
  return { publicKey: t, secretKey: new Uint8Array(e) };
}, Ee.sign.keyPair.fromSeed = function(e) {
  if (zt(e), e.length !== 32) throw Error("bad seed size");
  for (var t = new Uint8Array(32), i = new Uint8Array(64), r = 0; r < 32; r++) i[r] = e[r];
  return ua(t, i, !0), { publicKey: t, secretKey: i };
}, Ee.setPRNG = function(e) {
  Yi = e;
}, (function() {
  Ii && Ii.getRandomValues && Ee.setPRNG((function(e, t) {
    var i, r = new Uint8Array(t);
    for (i = 0; i < t; i += 65536) Ii.getRandomValues(r.subarray(i, i + Math.min(t - i, 65536)));
    for (i = 0; i < t; i++) e[i] = r[i];
    (function(a) {
      for (var n = 0; n < a.length; n++) a[n] = 0;
    })(r);
  }));
})();
var ci = /* @__PURE__ */ Object.freeze({ __proto__: null, default: Ee });
function Ni(e, t, i, r, a, n) {
  const o = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756], s = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344], f = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584], h = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928], c = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080], l = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312], u = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154], d = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
  let g, b, T, A, S, E, y, _, k, N, m = 0, w = t.length;
  const O = e.length === 32 ? 3 : 9;
  _ = O === 3 ? i ? [0, 32, 2] : [30, -2, -2] : i ? [0, 32, 2, 62, 30, -2, 64, 96, 2] : [94, 62, -2, 32, 64, 2, 30, -2, -2], i && (t = (function(P) {
    const U = 8 - P.length % 8;
    let B;
    if (!(U < 8)) {
      if (U === 8) return P;
      throw Error("des: invalid padding");
    }
    B = 0;
    const L = new Uint8Array(P.length + U);
    for (let C = 0; C < P.length; C++) L[C] = P[C];
    for (let C = 0; C < U; C++) L[P.length + C] = B;
    return L;
  })(t), w = t.length);
  let v = new Uint8Array(w), R = 0;
  for (; m < w; ) {
    for (E = t[m++] << 24 | t[m++] << 16 | t[m++] << 8 | t[m++], y = t[m++] << 24 | t[m++] << 16 | t[m++] << 8 | t[m++], T = 252645135 & (E >>> 4 ^ y), y ^= T, E ^= T << 4, T = 65535 & (E >>> 16 ^ y), y ^= T, E ^= T << 16, T = 858993459 & (y >>> 2 ^ E), E ^= T, y ^= T << 2, T = 16711935 & (y >>> 8 ^ E), E ^= T, y ^= T << 8, T = 1431655765 & (E >>> 1 ^ y), y ^= T, E ^= T << 1, E = E << 1 | E >>> 31, y = y << 1 | y >>> 31, b = 0; b < O; b += 3) {
      for (k = _[b + 1], N = _[b + 2], g = _[b]; g !== k; g += N) A = y ^ e[g], S = (y >>> 4 | y << 28) ^ e[g + 1], T = E, E = y, y = T ^ (s[A >>> 24 & 63] | h[A >>> 16 & 63] | l[A >>> 8 & 63] | d[63 & A] | o[S >>> 24 & 63] | f[S >>> 16 & 63] | c[S >>> 8 & 63] | u[63 & S]);
      T = E, E = y, y = T;
    }
    E = E >>> 1 | E << 31, y = y >>> 1 | y << 31, T = 1431655765 & (E >>> 1 ^ y), y ^= T, E ^= T << 1, T = 16711935 & (y >>> 8 ^ E), E ^= T, y ^= T << 8, T = 858993459 & (y >>> 2 ^ E), E ^= T, y ^= T << 2, T = 65535 & (E >>> 16 ^ y), y ^= T, E ^= T << 16, T = 252645135 & (E >>> 4 ^ y), y ^= T, E ^= T << 4, v[R++] = E >>> 24, v[R++] = E >>> 16 & 255, v[R++] = E >>> 8 & 255, v[R++] = 255 & E, v[R++] = y >>> 24, v[R++] = y >>> 16 & 255, v[R++] = y >>> 8 & 255, v[R++] = 255 & y;
  }
  return i || (v = (function(P) {
    let U, B = null;
    if (U = 0, !B) {
      for (B = 1; P[P.length - B] === U; ) B++;
      B--;
    }
    return P.subarray(0, P.length - B);
  })(v)), v;
}
function ki(e) {
  const t = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], i = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], r = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], a = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], n = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], o = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], s = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], f = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], h = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], c = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], l = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], u = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], d = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], g = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], b = e.length > 8 ? 3 : 1, T = Array(32 * b), A = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
  let S, E, y, _ = 0, k = 0;
  for (let N = 0; N < b; N++) {
    let m = e[_++] << 24 | e[_++] << 16 | e[_++] << 8 | e[_++], w = e[_++] << 24 | e[_++] << 16 | e[_++] << 8 | e[_++];
    y = 252645135 & (m >>> 4 ^ w), w ^= y, m ^= y << 4, y = 65535 & (w >>> -16 ^ m), m ^= y, w ^= y << -16, y = 858993459 & (m >>> 2 ^ w), w ^= y, m ^= y << 2, y = 65535 & (w >>> -16 ^ m), m ^= y, w ^= y << -16, y = 1431655765 & (m >>> 1 ^ w), w ^= y, m ^= y << 1, y = 16711935 & (w >>> 8 ^ m), m ^= y, w ^= y << 8, y = 1431655765 & (m >>> 1 ^ w), w ^= y, m ^= y << 1, y = m << 8 | w >>> 20 & 240, m = w << 24 | w << 8 & 16711680 | w >>> 8 & 65280 | w >>> 24 & 240, w = y;
    for (let O = 0; O < 16; O++) A[O] ? (m = m << 2 | m >>> 26, w = w << 2 | w >>> 26) : (m = m << 1 | m >>> 27, w = w << 1 | w >>> 27), m &= -15, w &= -15, S = t[m >>> 28] | i[m >>> 24 & 15] | r[m >>> 20 & 15] | a[m >>> 16 & 15] | n[m >>> 12 & 15] | o[m >>> 8 & 15] | s[m >>> 4 & 15], E = f[w >>> 28] | h[w >>> 24 & 15] | c[w >>> 20 & 15] | l[w >>> 16 & 15] | u[w >>> 12 & 15] | d[w >>> 8 & 15] | g[w >>> 4 & 15], y = 65535 & (E >>> 16 ^ S), T[k++] = S ^ y, T[k++] = E ^ y << 16;
  }
  return T;
}
function fr(e) {
  this.key = [];
  for (let t = 0; t < 3; t++) this.key.push(new Uint8Array(e.subarray(8 * t, 8 * t + 8)));
  this.encrypt = function(t) {
    return Ni(ki(this.key[2]), Ni(ki(this.key[1]), Ni(ki(this.key[0]), t, !0), !1), !0);
  };
}
function p0() {
  this.BlockSize = 8, this.KeySize = 16, this.setKey = function(o) {
    if (this.masking = Array(16), this.rotate = Array(16), this.reset(), o.length !== this.KeySize) throw Error("CAST-128: keys must be 16 bytes");
    return this.keySchedule(o), !0;
  }, this.reset = function() {
    for (let o = 0; o < 16; o++) this.masking[o] = 0, this.rotate[o] = 0;
  }, this.getBlockSize = function() {
    return this.BlockSize;
  }, this.encrypt = function(o) {
    const s = Array(o.length);
    for (let f = 0; f < o.length; f += 8) {
      let h, c = o[f] << 24 | o[f + 1] << 16 | o[f + 2] << 8 | o[f + 3], l = o[f + 4] << 24 | o[f + 5] << 16 | o[f + 6] << 8 | o[f + 7];
      h = l, l = c ^ i(l, this.masking[0], this.rotate[0]), c = h, h = l, l = c ^ r(l, this.masking[1], this.rotate[1]), c = h, h = l, l = c ^ a(l, this.masking[2], this.rotate[2]), c = h, h = l, l = c ^ i(l, this.masking[3], this.rotate[3]), c = h, h = l, l = c ^ r(l, this.masking[4], this.rotate[4]), c = h, h = l, l = c ^ a(l, this.masking[5], this.rotate[5]), c = h, h = l, l = c ^ i(l, this.masking[6], this.rotate[6]), c = h, h = l, l = c ^ r(l, this.masking[7], this.rotate[7]), c = h, h = l, l = c ^ a(l, this.masking[8], this.rotate[8]), c = h, h = l, l = c ^ i(l, this.masking[9], this.rotate[9]), c = h, h = l, l = c ^ r(l, this.masking[10], this.rotate[10]), c = h, h = l, l = c ^ a(l, this.masking[11], this.rotate[11]), c = h, h = l, l = c ^ i(l, this.masking[12], this.rotate[12]), c = h, h = l, l = c ^ r(l, this.masking[13], this.rotate[13]), c = h, h = l, l = c ^ a(l, this.masking[14], this.rotate[14]), c = h, h = l, l = c ^ i(l, this.masking[15], this.rotate[15]), c = h, s[f] = l >>> 24 & 255, s[f + 1] = l >>> 16 & 255, s[f + 2] = l >>> 8 & 255, s[f + 3] = 255 & l, s[f + 4] = c >>> 24 & 255, s[f + 5] = c >>> 16 & 255, s[f + 6] = c >>> 8 & 255, s[f + 7] = 255 & c;
    }
    return s;
  }, this.decrypt = function(o) {
    const s = Array(o.length);
    for (let f = 0; f < o.length; f += 8) {
      let h, c = o[f] << 24 | o[f + 1] << 16 | o[f + 2] << 8 | o[f + 3], l = o[f + 4] << 24 | o[f + 5] << 16 | o[f + 6] << 8 | o[f + 7];
      h = l, l = c ^ i(l, this.masking[15], this.rotate[15]), c = h, h = l, l = c ^ a(l, this.masking[14], this.rotate[14]), c = h, h = l, l = c ^ r(l, this.masking[13], this.rotate[13]), c = h, h = l, l = c ^ i(l, this.masking[12], this.rotate[12]), c = h, h = l, l = c ^ a(l, this.masking[11], this.rotate[11]), c = h, h = l, l = c ^ r(l, this.masking[10], this.rotate[10]), c = h, h = l, l = c ^ i(l, this.masking[9], this.rotate[9]), c = h, h = l, l = c ^ a(l, this.masking[8], this.rotate[8]), c = h, h = l, l = c ^ r(l, this.masking[7], this.rotate[7]), c = h, h = l, l = c ^ i(l, this.masking[6], this.rotate[6]), c = h, h = l, l = c ^ a(l, this.masking[5], this.rotate[5]), c = h, h = l, l = c ^ r(l, this.masking[4], this.rotate[4]), c = h, h = l, l = c ^ i(l, this.masking[3], this.rotate[3]), c = h, h = l, l = c ^ a(l, this.masking[2], this.rotate[2]), c = h, h = l, l = c ^ r(l, this.masking[1], this.rotate[1]), c = h, h = l, l = c ^ i(l, this.masking[0], this.rotate[0]), c = h, s[f] = l >>> 24 & 255, s[f + 1] = l >>> 16 & 255, s[f + 2] = l >>> 8 & 255, s[f + 3] = 255 & l, s[f + 4] = c >>> 24 & 255, s[f + 5] = c >> 16 & 255, s[f + 6] = c >> 8 & 255, s[f + 7] = 255 & c;
    }
    return s;
  };
  const e = [, , , ,];
  e[0] = [, , , ,], e[0][0] = [4, 0, 13, 15, 12, 14, 8], e[0][1] = [5, 2, 16, 18, 17, 19, 10], e[0][2] = [6, 3, 23, 22, 21, 20, 9], e[0][3] = [7, 1, 26, 25, 27, 24, 11], e[1] = [, , , ,], e[1][0] = [0, 6, 21, 23, 20, 22, 16], e[1][1] = [1, 4, 0, 2, 1, 3, 18], e[1][2] = [2, 5, 7, 6, 5, 4, 17], e[1][3] = [3, 7, 10, 9, 11, 8, 19], e[2] = [, , , ,], e[2][0] = [4, 0, 13, 15, 12, 14, 8], e[2][1] = [5, 2, 16, 18, 17, 19, 10], e[2][2] = [6, 3, 23, 22, 21, 20, 9], e[2][3] = [7, 1, 26, 25, 27, 24, 11], e[3] = [, , , ,], e[3][0] = [0, 6, 21, 23, 20, 22, 16], e[3][1] = [1, 4, 0, 2, 1, 3, 18], e[3][2] = [2, 5, 7, 6, 5, 4, 17], e[3][3] = [3, 7, 10, 9, 11, 8, 19];
  const t = [, , , ,];
  function i(o, s, f) {
    const h = s + o, c = h << f | h >>> 32 - f;
    return (n[0][c >>> 24] ^ n[1][c >>> 16 & 255]) - n[2][c >>> 8 & 255] + n[3][255 & c];
  }
  function r(o, s, f) {
    const h = s ^ o, c = h << f | h >>> 32 - f;
    return n[0][c >>> 24] - n[1][c >>> 16 & 255] + n[2][c >>> 8 & 255] ^ n[3][255 & c];
  }
  function a(o, s, f) {
    const h = s - o, c = h << f | h >>> 32 - f;
    return (n[0][c >>> 24] + n[1][c >>> 16 & 255] ^ n[2][c >>> 8 & 255]) - n[3][255 & c];
  }
  t[0] = [, , , ,], t[0][0] = [24, 25, 23, 22, 18], t[0][1] = [26, 27, 21, 20, 22], t[0][2] = [28, 29, 19, 18, 25], t[0][3] = [30, 31, 17, 16, 28], t[1] = [, , , ,], t[1][0] = [3, 2, 12, 13, 8], t[1][1] = [1, 0, 14, 15, 13], t[1][2] = [7, 6, 8, 9, 3], t[1][3] = [5, 4, 10, 11, 7], t[2] = [, , , ,], t[2][0] = [19, 18, 28, 29, 25], t[2][1] = [17, 16, 30, 31, 28], t[2][2] = [23, 22, 24, 25, 18], t[2][3] = [21, 20, 26, 27, 22], t[3] = [, , , ,], t[3][0] = [8, 9, 7, 6, 3], t[3][1] = [10, 11, 5, 4, 7], t[3][2] = [12, 13, 3, 2, 8], t[3][3] = [14, 15, 1, 0, 13], this.keySchedule = function(o) {
    const s = [, , , , , , , ,], f = Array(32);
    let h;
    for (let d = 0; d < 4; d++) h = 4 * d, s[d] = o[h] << 24 | o[h + 1] << 16 | o[h + 2] << 8 | o[h + 3];
    const c = [6, 7, 4, 5];
    let l, u = 0;
    for (let d = 0; d < 2; d++) for (let g = 0; g < 4; g++) {
      for (h = 0; h < 4; h++) {
        const b = e[g][h];
        l = s[b[1]], l ^= n[4][s[b[2] >>> 2] >>> 24 - 8 * (3 & b[2]) & 255], l ^= n[5][s[b[3] >>> 2] >>> 24 - 8 * (3 & b[3]) & 255], l ^= n[6][s[b[4] >>> 2] >>> 24 - 8 * (3 & b[4]) & 255], l ^= n[7][s[b[5] >>> 2] >>> 24 - 8 * (3 & b[5]) & 255], l ^= n[c[h]][s[b[6] >>> 2] >>> 24 - 8 * (3 & b[6]) & 255], s[b[0]] = l;
      }
      for (h = 0; h < 4; h++) {
        const b = t[g][h];
        l = n[4][s[b[0] >>> 2] >>> 24 - 8 * (3 & b[0]) & 255], l ^= n[5][s[b[1] >>> 2] >>> 24 - 8 * (3 & b[1]) & 255], l ^= n[6][s[b[2] >>> 2] >>> 24 - 8 * (3 & b[2]) & 255], l ^= n[7][s[b[3] >>> 2] >>> 24 - 8 * (3 & b[3]) & 255], l ^= n[4 + h][s[b[4] >>> 2] >>> 24 - 8 * (3 & b[4]) & 255], f[u] = l, u++;
      }
    }
    for (let d = 0; d < 16; d++) this.masking[d] = f[d], this.rotate[d] = 31 & f[16 + d];
  };
  const n = [, , , , , , , ,];
  n[0] = [821772500, 2678128395, 1810681135, 1059425402, 505495343, 2617265619, 1610868032, 3483355465, 3218386727, 2294005173, 3791863952, 2563806837, 1852023008, 365126098, 3269944861, 584384398, 677919599, 3229601881, 4280515016, 2002735330, 1136869587, 3744433750, 2289869850, 2731719981, 2714362070, 879511577, 1639411079, 575934255, 717107937, 2857637483, 576097850, 2731753936, 1725645e3, 2810460463, 5111599, 767152862, 2543075244, 1251459544, 1383482551, 3052681127, 3089939183, 3612463449, 1878520045, 1510570527, 2189125840, 2431448366, 582008916, 3163445557, 1265446783, 1354458274, 3529918736, 3202711853, 3073581712, 3912963487, 3029263377, 1275016285, 4249207360, 2905708351, 3304509486, 1442611557, 3585198765, 2712415662, 2731849581, 3248163920, 2283946226, 208555832, 2766454743, 1331405426, 1447828783, 3315356441, 3108627284, 2957404670, 2981538698, 3339933917, 1669711173, 286233437, 1465092821, 1782121619, 3862771680, 710211251, 980974943, 1651941557, 430374111, 2051154026, 704238805, 4128970897, 3144820574, 2857402727, 948965521, 3333752299, 2227686284, 718756367, 2269778983, 2731643755, 718440111, 2857816721, 3616097120, 1113355533, 2478022182, 410092745, 1811985197, 1944238868, 2696854588, 1415722873, 1682284203, 1060277122, 1998114690, 1503841958, 82706478, 2315155686, 1068173648, 845149890, 2167947013, 1768146376, 1993038550, 3566826697, 3390574031, 940016341, 3355073782, 2328040721, 904371731, 1205506512, 4094660742, 2816623006, 825647681, 85914773, 2857843460, 1249926541, 1417871568, 3287612, 3211054559, 3126306446, 1975924523, 1353700161, 2814456437, 2438597621, 1800716203, 722146342, 2873936343, 1151126914, 4160483941, 2877670899, 458611604, 2866078500, 3483680063, 770352098, 2652916994, 3367839148, 3940505011, 3585973912, 3809620402, 718646636, 2504206814, 2914927912, 3631288169, 2857486607, 2860018678, 575749918, 2857478043, 718488780, 2069512688, 3548183469, 453416197, 1106044049, 3032691430, 52586708, 3378514636, 3459808877, 3211506028, 1785789304, 218356169, 3571399134, 3759170522, 1194783844, 1523787992, 3007827094, 1975193539, 2555452411, 1341901877, 3045838698, 3776907964, 3217423946, 2802510864, 2889438986, 1057244207, 1636348243, 3761863214, 1462225785, 2632663439, 481089165, 718503062, 24497053, 3332243209, 3344655856, 3655024856, 3960371065, 1195698900, 2971415156, 3710176158, 2115785917, 4027663609, 3525578417, 2524296189, 2745972565, 3564906415, 1372086093, 1452307862, 2780501478, 1476592880, 3389271281, 18495466, 2378148571, 901398090, 891748256, 3279637769, 3157290713, 2560960102, 1447622437, 4284372637, 216884176, 2086908623, 1879786977, 3588903153, 2242455666, 2938092967, 3559082096, 2810645491, 758861177, 1121993112, 215018983, 642190776, 4169236812, 1196255959, 2081185372, 3508738393, 941322904, 4124243163, 2877523539, 1848581667, 2205260958, 3180453958, 2589345134, 3694731276, 550028657, 2519456284, 3789985535, 2973870856, 2093648313, 443148163, 46942275, 2734146937, 1117713533, 1115362972, 1523183689, 3717140224, 1551984063], n[1] = [522195092, 4010518363, 1776537470, 960447360, 4267822970, 4005896314, 1435016340, 1929119313, 2913464185, 1310552629, 3579470798, 3724818106, 2579771631, 1594623892, 417127293, 2715217907, 2696228731, 1508390405, 3994398868, 3925858569, 3695444102, 4019471449, 3129199795, 3770928635, 3520741761, 990456497, 4187484609, 2783367035, 21106139, 3840405339, 631373633, 3783325702, 532942976, 396095098, 3548038825, 4267192484, 2564721535, 2011709262, 2039648873, 620404603, 3776170075, 2898526339, 3612357925, 4159332703, 1645490516, 223693667, 1567101217, 3362177881, 1029951347, 3470931136, 3570957959, 1550265121, 119497089, 972513919, 907948164, 3840628539, 1613718692, 3594177948, 465323573, 2659255085, 654439692, 2575596212, 2699288441, 3127702412, 277098644, 624404830, 4100943870, 2717858591, 546110314, 2403699828, 3655377447, 1321679412, 4236791657, 1045293279, 4010672264, 895050893, 2319792268, 494945126, 1914543101, 2777056443, 3894764339, 2219737618, 311263384, 4275257268, 3458730721, 669096869, 3584475730, 3835122877, 3319158237, 3949359204, 2005142349, 2713102337, 2228954793, 3769984788, 569394103, 3855636576, 1425027204, 108000370, 2736431443, 3671869269, 3043122623, 1750473702, 2211081108, 762237499, 3972989403, 2798899386, 3061857628, 2943854345, 867476300, 964413654, 1591880597, 1594774276, 2179821409, 552026980, 3026064248, 3726140315, 2283577634, 3110545105, 2152310760, 582474363, 1582640421, 1383256631, 2043843868, 3322775884, 1217180674, 463797851, 2763038571, 480777679, 2718707717, 2289164131, 3118346187, 214354409, 200212307, 3810608407, 3025414197, 2674075964, 3997296425, 1847405948, 1342460550, 510035443, 4080271814, 815934613, 833030224, 1620250387, 1945732119, 2703661145, 3966000196, 1388869545, 3456054182, 2687178561, 2092620194, 562037615, 1356438536, 3409922145, 3261847397, 1688467115, 2150901366, 631725691, 3840332284, 549916902, 3455104640, 394546491, 837744717, 2114462948, 751520235, 2221554606, 2415360136, 3999097078, 2063029875, 803036379, 2702586305, 821456707, 3019566164, 360699898, 4018502092, 3511869016, 3677355358, 2402471449, 812317050, 49299192, 2570164949, 3259169295, 2816732080, 3331213574, 3101303564, 2156015656, 3705598920, 3546263921, 143268808, 3200304480, 1638124008, 3165189453, 3341807610, 578956953, 2193977524, 3638120073, 2333881532, 807278310, 658237817, 2969561766, 1641658566, 11683945, 3086995007, 148645947, 1138423386, 4158756760, 1981396783, 2401016740, 3699783584, 380097457, 2680394679, 2803068651, 3334260286, 441530178, 4016580796, 1375954390, 761952171, 891809099, 2183123478, 157052462, 3683840763, 1592404427, 341349109, 2438483839, 1417898363, 644327628, 2233032776, 2353769706, 2201510100, 220455161, 1815641738, 182899273, 2995019788, 3627381533, 3702638151, 2890684138, 1052606899, 588164016, 1681439879, 4038439418, 2405343923, 4229449282, 167996282, 1336969661, 1688053129, 2739224926, 1543734051, 1046297529, 1138201970, 2121126012, 115334942, 1819067631, 1902159161, 1941945968, 2206692869, 1159982321], n[2] = [2381300288, 637164959, 3952098751, 3893414151, 1197506559, 916448331, 2350892612, 2932787856, 3199334847, 4009478890, 3905886544, 1373570990, 2450425862, 4037870920, 3778841987, 2456817877, 286293407, 124026297, 3001279700, 1028597854, 3115296800, 4208886496, 2691114635, 2188540206, 1430237888, 1218109995, 3572471700, 308166588, 570424558, 2187009021, 2455094765, 307733056, 1310360322, 3135275007, 1384269543, 2388071438, 863238079, 2359263624, 2801553128, 3380786597, 2831162807, 1470087780, 1728663345, 4072488799, 1090516929, 532123132, 2389430977, 1132193179, 2578464191, 3051079243, 1670234342, 1434557849, 2711078940, 1241591150, 3314043432, 3435360113, 3091448339, 1812415473, 2198440252, 267246943, 796911696, 3619716990, 38830015, 1526438404, 2806502096, 374413614, 2943401790, 1489179520, 1603809326, 1920779204, 168801282, 260042626, 2358705581, 1563175598, 2397674057, 1356499128, 2217211040, 514611088, 2037363785, 2186468373, 4022173083, 2792511869, 2913485016, 1173701892, 4200428547, 3896427269, 1334932762, 2455136706, 602925377, 2835607854, 1613172210, 41346230, 2499634548, 2457437618, 2188827595, 41386358, 4172255629, 1313404830, 2405527007, 3801973774, 2217704835, 873260488, 2528884354, 2478092616, 4012915883, 2555359016, 2006953883, 2463913485, 575479328, 2218240648, 2099895446, 660001756, 2341502190, 3038761536, 3888151779, 3848713377, 3286851934, 1022894237, 1620365795, 3449594689, 1551255054, 15374395, 3570825345, 4249311020, 4151111129, 3181912732, 310226346, 1133119310, 530038928, 136043402, 2476768958, 3107506709, 2544909567, 1036173560, 2367337196, 1681395281, 1758231547, 3641649032, 306774401, 1575354324, 3716085866, 1990386196, 3114533736, 2455606671, 1262092282, 3124342505, 2768229131, 4210529083, 1833535011, 423410938, 660763973, 2187129978, 1639812e3, 3508421329, 3467445492, 310289298, 272797111, 2188552562, 2456863912, 310240523, 677093832, 1013118031, 901835429, 3892695601, 1116285435, 3036471170, 1337354835, 243122523, 520626091, 277223598, 4244441197, 4194248841, 1766575121, 594173102, 316590669, 742362309, 3536858622, 4176435350, 3838792410, 2501204839, 1229605004, 3115755532, 1552908988, 2312334149, 979407927, 3959474601, 1148277331, 176638793, 3614686272, 2083809052, 40992502, 1340822838, 2731552767, 3535757508, 3560899520, 1354035053, 122129617, 7215240, 2732932949, 3118912700, 2718203926, 2539075635, 3609230695, 3725561661, 1928887091, 2882293555, 1988674909, 2063640240, 2491088897, 1459647954, 4189817080, 2302804382, 1113892351, 2237858528, 1927010603, 4002880361, 1856122846, 1594404395, 2944033133, 3855189863, 3474975698, 1643104450, 4054590833, 3431086530, 1730235576, 2984608721, 3084664418, 2131803598, 4178205752, 267404349, 1617849798, 1616132681, 1462223176, 736725533, 2327058232, 551665188, 2945899023, 1749386277, 2575514597, 1611482493, 674206544, 2201269090, 3642560800, 728599968, 1680547377, 2620414464, 1388111496, 453204106, 4156223445, 1094905244, 2754698257, 2201108165, 3757000246, 2704524545, 3922940700, 3996465027], n[3] = [2645754912, 532081118, 2814278639, 3530793624, 1246723035, 1689095255, 2236679235, 4194438865, 2116582143, 3859789411, 157234593, 2045505824, 4245003587, 1687664561, 4083425123, 605965023, 672431967, 1336064205, 3376611392, 214114848, 4258466608, 3232053071, 489488601, 605322005, 3998028058, 264917351, 1912574028, 756637694, 436560991, 202637054, 135989450, 85393697, 2152923392, 3896401662, 2895836408, 2145855233, 3535335007, 115294817, 3147733898, 1922296357, 3464822751, 4117858305, 1037454084, 2725193275, 2127856640, 1417604070, 1148013728, 1827919605, 642362335, 2929772533, 909348033, 1346338451, 3547799649, 297154785, 1917849091, 4161712827, 2883604526, 3968694238, 1469521537, 3780077382, 3375584256, 1763717519, 136166297, 4290970789, 1295325189, 2134727907, 2798151366, 1566297257, 3672928234, 2677174161, 2672173615, 965822077, 2780786062, 289653839, 1133871874, 3491843819, 35685304, 1068898316, 418943774, 672553190, 642281022, 2346158704, 1954014401, 3037126780, 4079815205, 2030668546, 3840588673, 672283427, 1776201016, 359975446, 3750173538, 555499703, 2769985273, 1324923, 69110472, 152125443, 3176785106, 3822147285, 1340634837, 798073664, 1434183902, 15393959, 216384236, 1303690150, 3881221631, 3711134124, 3960975413, 106373927, 2578434224, 1455997841, 1801814300, 1578393881, 1854262133, 3188178946, 3258078583, 2302670060, 1539295533, 3505142565, 3078625975, 2372746020, 549938159, 3278284284, 2620926080, 181285381, 2865321098, 3970029511, 68876850, 488006234, 1728155692, 2608167508, 836007927, 2435231793, 919367643, 3339422534, 3655756360, 1457871481, 40520939, 1380155135, 797931188, 234455205, 2255801827, 3990488299, 397000196, 739833055, 3077865373, 2871719860, 4022553888, 772369276, 390177364, 3853951029, 557662966, 740064294, 1640166671, 1699928825, 3535942136, 622006121, 3625353122, 68743880, 1742502, 219489963, 1664179233, 1577743084, 1236991741, 410585305, 2366487942, 823226535, 1050371084, 3426619607, 3586839478, 212779912, 4147118561, 1819446015, 1911218849, 530248558, 3486241071, 3252585495, 2886188651, 3410272728, 2342195030, 20547779, 2982490058, 3032363469, 3631753222, 312714466, 1870521650, 1493008054, 3491686656, 615382978, 4103671749, 2534517445, 1932181, 2196105170, 278426614, 6369430, 3274544417, 2913018367, 697336853, 2143000447, 2946413531, 701099306, 1558357093, 2805003052, 3500818408, 2321334417, 3567135975, 216290473, 3591032198, 23009561, 1996984579, 3735042806, 2024298078, 3739440863, 569400510, 2339758983, 3016033873, 3097871343, 3639523026, 3844324983, 3256173865, 795471839, 2951117563, 4101031090, 4091603803, 3603732598, 971261452, 534414648, 428311343, 3389027175, 2844869880, 694888862, 1227866773, 2456207019, 3043454569, 2614353370, 3749578031, 3676663836, 459166190, 4132644070, 1794958188, 51825668, 2252611902, 3084671440, 2036672799, 3436641603, 1099053433, 2469121526, 3059204941, 1323291266, 2061838604, 1018778475, 2233344254, 2553501054, 334295216, 3556750194, 1065731521, 183467730], n[4] = [2127105028, 745436345, 2601412319, 2788391185, 3093987327, 500390133, 1155374404, 389092991, 150729210, 3891597772, 3523549952, 1935325696, 716645080, 946045387, 2901812282, 1774124410, 3869435775, 4039581901, 3293136918, 3438657920, 948246080, 363898952, 3867875531, 1286266623, 1598556673, 68334250, 630723836, 1104211938, 1312863373, 613332731, 2377784574, 1101634306, 441780740, 3129959883, 1917973735, 2510624549, 3238456535, 2544211978, 3308894634, 1299840618, 4076074851, 1756332096, 3977027158, 297047435, 3790297736, 2265573040, 3621810518, 1311375015, 1667687725, 47300608, 3299642885, 2474112369, 201668394, 1468347890, 576830978, 3594690761, 3742605952, 1958042578, 1747032512, 3558991340, 1408974056, 3366841779, 682131401, 1033214337, 1545599232, 4265137049, 206503691, 103024618, 2855227313, 1337551222, 2428998917, 2963842932, 4015366655, 3852247746, 2796956967, 3865723491, 3747938335, 247794022, 3755824572, 702416469, 2434691994, 397379957, 851939612, 2314769512, 218229120, 1380406772, 62274761, 214451378, 3170103466, 2276210409, 3845813286, 28563499, 446592073, 1693330814, 3453727194, 29968656, 3093872512, 220656637, 2470637031, 77972100, 1667708854, 1358280214, 4064765667, 2395616961, 325977563, 4277240721, 4220025399, 3605526484, 3355147721, 811859167, 3069544926, 3962126810, 652502677, 3075892249, 4132761541, 3498924215, 1217549313, 3250244479, 3858715919, 3053989961, 1538642152, 2279026266, 2875879137, 574252750, 3324769229, 2651358713, 1758150215, 141295887, 2719868960, 3515574750, 4093007735, 4194485238, 1082055363, 3417560400, 395511885, 2966884026, 179534037, 3646028556, 3738688086, 1092926436, 2496269142, 257381841, 3772900718, 1636087230, 1477059743, 2499234752, 3811018894, 2675660129, 3285975680, 90732309, 1684827095, 1150307763, 1723134115, 3237045386, 1769919919, 1240018934, 815675215, 750138730, 2239792499, 1234303040, 1995484674, 138143821, 675421338, 1145607174, 1936608440, 3238603024, 2345230278, 2105974004, 323969391, 779555213, 3004902369, 2861610098, 1017501463, 2098600890, 2628620304, 2940611490, 2682542546, 1171473753, 3656571411, 3687208071, 4091869518, 393037935, 159126506, 1662887367, 1147106178, 391545844, 3452332695, 1891500680, 3016609650, 1851642611, 546529401, 1167818917, 3194020571, 2848076033, 3953471836, 575554290, 475796850, 4134673196, 450035699, 2351251534, 844027695, 1080539133, 86184846, 1554234488, 3692025454, 1972511363, 2018339607, 1491841390, 1141460869, 1061690759, 4244549243, 2008416118, 2351104703, 2868147542, 1598468138, 722020353, 1027143159, 212344630, 1387219594, 1725294528, 3745187956, 2500153616, 458938280, 4129215917, 1828119673, 544571780, 3503225445, 2297937496, 1241802790, 267843827, 2694610800, 1397140384, 1558801448, 3782667683, 1806446719, 929573330, 2234912681, 400817706, 616011623, 4121520928, 3603768725, 1761550015, 1968522284, 4053731006, 4192232858, 4005120285, 872482584, 3140537016, 3894607381, 2287405443, 1963876937, 3663887957, 1584857e3, 2975024454, 1833426440, 4025083860], n[5] = [4143615901, 749497569, 1285769319, 3795025788, 2514159847, 23610292, 3974978748, 844452780, 3214870880, 3751928557, 2213566365, 1676510905, 448177848, 3730751033, 4086298418, 2307502392, 871450977, 3222878141, 4110862042, 3831651966, 2735270553, 1310974780, 2043402188, 1218528103, 2736035353, 4274605013, 2702448458, 3936360550, 2693061421, 162023535, 2827510090, 687910808, 23484817, 3784910947, 3371371616, 779677500, 3503626546, 3473927188, 4157212626, 3500679282, 4248902014, 2466621104, 3899384794, 1958663117, 925738300, 1283408968, 3669349440, 1840910019, 137959847, 2679828185, 1239142320, 1315376211, 1547541505, 1690155329, 739140458, 3128809933, 3933172616, 3876308834, 905091803, 1548541325, 4040461708, 3095483362, 144808038, 451078856, 676114313, 2861728291, 2469707347, 993665471, 373509091, 2599041286, 4025009006, 4170239449, 2149739950, 3275793571, 3749616649, 2794760199, 1534877388, 572371878, 2590613551, 1753320020, 3467782511, 1405125690, 4270405205, 633333386, 3026356924, 3475123903, 632057672, 2846462855, 1404951397, 3882875879, 3915906424, 195638627, 2385783745, 3902872553, 1233155085, 3355999740, 2380578713, 2702246304, 2144565621, 3663341248, 3894384975, 2502479241, 4248018925, 3094885567, 1594115437, 572884632, 3385116731, 767645374, 1331858858, 1475698373, 3793881790, 3532746431, 1321687957, 619889600, 1121017241, 3440213920, 2070816767, 2833025776, 1933951238, 4095615791, 890643334, 3874130214, 859025556, 360630002, 925594799, 1764062180, 3920222280, 4078305929, 979562269, 2810700344, 4087740022, 1949714515, 546639971, 1165388173, 3069891591, 1495988560, 922170659, 1291546247, 2107952832, 1813327274, 3406010024, 3306028637, 4241950635, 153207855, 2313154747, 1608695416, 1150242611, 1967526857, 721801357, 1220138373, 3691287617, 3356069787, 2112743302, 3281662835, 1111556101, 1778980689, 250857638, 2298507990, 673216130, 2846488510, 3207751581, 3562756981, 3008625920, 3417367384, 2198807050, 529510932, 3547516680, 3426503187, 2364944742, 102533054, 2294910856, 1617093527, 1204784762, 3066581635, 1019391227, 1069574518, 1317995090, 1691889997, 3661132003, 510022745, 3238594800, 1362108837, 1817929911, 2184153760, 805817662, 1953603311, 3699844737, 120799444, 2118332377, 207536705, 2282301548, 4120041617, 145305846, 2508124933, 3086745533, 3261524335, 1877257368, 2977164480, 3160454186, 2503252186, 4221677074, 759945014, 254147243, 2767453419, 3801518371, 629083197, 2471014217, 907280572, 3900796746, 940896768, 2751021123, 2625262786, 3161476951, 3661752313, 3260732218, 1425318020, 2977912069, 1496677566, 3988592072, 2140652971, 3126511541, 3069632175, 977771578, 1392695845, 1698528874, 1411812681, 1369733098, 1343739227, 3620887944, 1142123638, 67414216, 3102056737, 3088749194, 1626167401, 2546293654, 3941374235, 697522451, 33404913, 143560186, 2595682037, 994885535, 1247667115, 3859094837, 2699155541, 3547024625, 4114935275, 2968073508, 3199963069, 2732024527, 1237921620, 951448369, 1898488916, 1211705605, 2790989240, 2233243581, 3598044975], n[6] = [2246066201, 858518887, 1714274303, 3485882003, 713916271, 2879113490, 3730835617, 539548191, 36158695, 1298409750, 419087104, 1358007170, 749914897, 2989680476, 1261868530, 2995193822, 2690628854, 3443622377, 3780124940, 3796824509, 2976433025, 4259637129, 1551479e3, 512490819, 1296650241, 951993153, 2436689437, 2460458047, 144139966, 3136204276, 310820559, 3068840729, 643875328, 1969602020, 1680088954, 2185813161, 3283332454, 672358534, 198762408, 896343282, 276269502, 3014846926, 84060815, 197145886, 376173866, 3943890818, 3813173521, 3545068822, 1316698879, 1598252827, 2633424951, 1233235075, 859989710, 2358460855, 3503838400, 3409603720, 1203513385, 1193654839, 2792018475, 2060853022, 207403770, 1144516871, 3068631394, 1121114134, 177607304, 3785736302, 326409831, 1929119770, 2983279095, 4183308101, 3474579288, 3200513878, 3228482096, 119610148, 1170376745, 3378393471, 3163473169, 951863017, 3337026068, 3135789130, 2907618374, 1183797387, 2015970143, 4045674555, 2182986399, 2952138740, 3928772205, 384012900, 2454997643, 10178499, 2879818989, 2596892536, 111523738, 2995089006, 451689641, 3196290696, 235406569, 1441906262, 3890558523, 3013735005, 4158569349, 1644036924, 376726067, 1006849064, 3664579700, 2041234796, 1021632941, 1374734338, 2566452058, 371631263, 4007144233, 490221539, 206551450, 3140638584, 1053219195, 1853335209, 3412429660, 3562156231, 735133835, 1623211703, 3104214392, 2738312436, 4096837757, 3366392578, 3110964274, 3956598718, 3196820781, 2038037254, 3877786376, 2339753847, 300912036, 3766732888, 2372630639, 1516443558, 4200396704, 1574567987, 4069441456, 4122592016, 2699739776, 146372218, 2748961456, 2043888151, 35287437, 2596680554, 655490400, 1132482787, 110692520, 1031794116, 2188192751, 1324057718, 1217253157, 919197030, 686247489, 3261139658, 1028237775, 3135486431, 3059715558, 2460921700, 986174950, 2661811465, 4062904701, 2752986992, 3709736643, 367056889, 1353824391, 731860949, 1650113154, 1778481506, 784341916, 357075625, 3608602432, 1074092588, 2480052770, 3811426202, 92751289, 877911070, 3600361838, 1231880047, 480201094, 3756190983, 3094495953, 434011822, 87971354, 363687820, 1717726236, 1901380172, 3926403882, 2481662265, 400339184, 1490350766, 2661455099, 1389319756, 2558787174, 784598401, 1983468483, 30828846, 3550527752, 2716276238, 3841122214, 1765724805, 1955612312, 1277890269, 1333098070, 1564029816, 2704417615, 1026694237, 3287671188, 1260819201, 3349086767, 1016692350, 1582273796, 1073413053, 1995943182, 694588404, 1025494639, 3323872702, 3551898420, 4146854327, 453260480, 1316140391, 1435673405, 3038941953, 3486689407, 1622062951, 403978347, 817677117, 950059133, 4246079218, 3278066075, 1486738320, 1417279718, 481875527, 2549965225, 3933690356, 760697757, 1452955855, 3897451437, 1177426808, 1702951038, 4085348628, 2447005172, 1084371187, 3516436277, 3068336338, 1073369276, 1027665953, 3284188590, 1230553676, 1368340146, 2226246512, 267243139, 2274220762, 4070734279, 2497715176, 2423353163, 2504755875], n[7] = [3793104909, 3151888380, 2817252029, 895778965, 2005530807, 3871412763, 237245952, 86829237, 296341424, 3851759377, 3974600970, 2475086196, 709006108, 1994621201, 2972577594, 937287164, 3734691505, 168608556, 3189338153, 2225080640, 3139713551, 3033610191, 3025041904, 77524477, 185966941, 1208824168, 2344345178, 1721625922, 3354191921, 1066374631, 1927223579, 1971335949, 2483503697, 1551748602, 2881383779, 2856329572, 3003241482, 48746954, 1398218158, 2050065058, 313056748, 4255789917, 393167848, 1912293076, 940740642, 3465845460, 3091687853, 2522601570, 2197016661, 1727764327, 364383054, 492521376, 1291706479, 3264136376, 1474851438, 1685747964, 2575719748, 1619776915, 1814040067, 970743798, 1561002147, 2925768690, 2123093554, 1880132620, 3151188041, 697884420, 2550985770, 2607674513, 2659114323, 110200136, 1489731079, 997519150, 1378877361, 3527870668, 478029773, 2766872923, 1022481122, 431258168, 1112503832, 897933369, 2635587303, 669726182, 3383752315, 918222264, 163866573, 3246985393, 3776823163, 114105080, 1903216136, 761148244, 3571337562, 1690750982, 3166750252, 1037045171, 1888456500, 2010454850, 642736655, 616092351, 365016990, 1185228132, 4174898510, 1043824992, 2023083429, 2241598885, 3863320456, 3279669087, 3674716684, 108438443, 2132974366, 830746235, 606445527, 4173263986, 2204105912, 1844756978, 2532684181, 4245352700, 2969441100, 3796921661, 1335562986, 4061524517, 2720232303, 2679424040, 634407289, 885462008, 3294724487, 3933892248, 2094100220, 339117932, 4048830727, 3202280980, 1458155303, 2689246273, 1022871705, 2464987878, 3714515309, 353796843, 2822958815, 4256850100, 4052777845, 551748367, 618185374, 3778635579, 4020649912, 1904685140, 3069366075, 2670879810, 3407193292, 2954511620, 4058283405, 2219449317, 3135758300, 1120655984, 3447565834, 1474845562, 3577699062, 550456716, 3466908712, 2043752612, 881257467, 869518812, 2005220179, 938474677, 3305539448, 3850417126, 1315485940, 3318264702, 226533026, 965733244, 321539988, 1136104718, 804158748, 573969341, 3708209826, 937399083, 3290727049, 2901666755, 1461057207, 4013193437, 4066861423, 3242773476, 2421326174, 1581322155, 3028952165, 786071460, 3900391652, 3918438532, 1485433313, 4023619836, 3708277595, 3678951060, 953673138, 1467089153, 1930354364, 1533292819, 2492563023, 1346121658, 1685000834, 1965281866, 3765933717, 4190206607, 2052792609, 3515332758, 690371149, 3125873887, 2180283551, 2903598061, 3933952357, 436236910, 289419410, 14314871, 1242357089, 2904507907, 1616633776, 2666382180, 585885352, 3471299210, 2699507360, 1432659641, 277164553, 3354103607, 770115018, 2303809295, 3741942315, 3177781868, 2853364978, 2269453327, 3774259834, 987383833, 1290892879, 225909803, 1741533526, 890078084, 1496906255, 1111072499, 916028167, 243534141, 1252605537, 2204162171, 531204876, 290011180, 3916834213, 102027703, 237315147, 209093447, 1486785922, 220223953, 2758195998, 4175039106, 82940208, 3127791296, 2569425252, 518464269, 1353887104, 3941492737, 2377294467, 3935040926];
}
function cr(e) {
  this.cast5 = new p0(), this.cast5.setKey(e), this.encrypt = function(t) {
    return this.cast5.encrypt(t);
  };
}
fr.keySize = fr.prototype.keySize = 24, fr.blockSize = fr.prototype.blockSize = 8, cr.blockSize = cr.prototype.blockSize = 8, cr.keySize = cr.prototype.keySize = 16;
const Re = 4294967295;
function Ke(e, t) {
  return (e << t | e >>> 32 - t) & Re;
}
function tt(e, t) {
  return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
}
function bt(e, t, i) {
  e.splice(t, 4, 255 & i, i >>> 8 & 255, i >>> 16 & 255, i >>> 24 & 255);
}
function q(e, t) {
  return e >>> 8 * t & 255;
}
function lr(e) {
  this.tf = /* @__PURE__ */ (function() {
    let t = null, i = null, r = -1, a = [], n = [[], [], [], []];
    function o(c) {
      return n[0][q(c, 0)] ^ n[1][q(c, 1)] ^ n[2][q(c, 2)] ^ n[3][q(c, 3)];
    }
    function s(c) {
      return n[0][q(c, 3)] ^ n[1][q(c, 0)] ^ n[2][q(c, 1)] ^ n[3][q(c, 2)];
    }
    function f(c, l) {
      let u = o(l[0]), d = s(l[1]);
      l[2] = Ke(l[2] ^ u + d + a[4 * c + 8] & Re, 31), l[3] = Ke(l[3], 1) ^ u + 2 * d + a[4 * c + 9] & Re, u = o(l[2]), d = s(l[3]), l[0] = Ke(l[0] ^ u + d + a[4 * c + 10] & Re, 31), l[1] = Ke(l[1], 1) ^ u + 2 * d + a[4 * c + 11] & Re;
    }
    function h(c, l) {
      let u = o(l[0]), d = s(l[1]);
      l[2] = Ke(l[2], 1) ^ u + d + a[4 * c + 10] & Re, l[3] = Ke(l[3] ^ u + 2 * d + a[4 * c + 11] & Re, 31), u = o(l[2]), d = s(l[3]), l[0] = Ke(l[0], 1) ^ u + d + a[4 * c + 8] & Re, l[1] = Ke(l[1] ^ u + 2 * d + a[4 * c + 9] & Re, 31);
    }
    return { name: "twofish", blocksize: 16, open: function(c) {
      let l, u, d, g, b;
      t = c;
      const T = [], A = [], S = [];
      let E;
      const y = [];
      let _, k, N;
      const m = [[8, 1, 7, 13, 6, 15, 3, 2, 0, 11, 5, 9, 14, 12, 10, 4], [2, 8, 11, 13, 15, 7, 6, 14, 3, 1, 9, 4, 0, 10, 12, 5]], w = [[14, 12, 11, 8, 1, 2, 3, 5, 15, 4, 10, 6, 7, 0, 9, 13], [1, 14, 2, 11, 4, 12, 3, 7, 6, 13, 10, 5, 15, 9, 0, 8]], O = [[11, 10, 5, 14, 6, 13, 9, 0, 12, 8, 15, 3, 2, 4, 7, 1], [4, 12, 7, 5, 1, 6, 9, 10, 0, 14, 13, 8, 2, 11, 3, 15]], v = [[13, 7, 15, 4, 1, 2, 6, 14, 9, 11, 3, 0, 8, 5, 12, 10], [11, 9, 5, 1, 12, 3, 13, 14, 6, 4, 7, 15, 2, 0, 8, 10]], R = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15], P = [0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 5, 14, 7], U = [[], []], B = [[], [], [], []];
      function L(z) {
        return z ^ z >> 2 ^ [0, 90, 180, 238][3 & z];
      }
      function C(z) {
        return z ^ z >> 1 ^ z >> 2 ^ [0, 238, 180, 90][3 & z];
      }
      function x(z, D) {
        let F, K, G;
        for (F = 0; F < 8; F++) K = D >>> 24, D = D << 8 & Re | z >>> 24, z = z << 8 & Re, G = K << 1, 128 & K && (G ^= 333), D ^= K ^ G << 16, G ^= K >>> 1, 1 & K && (G ^= 166), D ^= G << 24 | G << 8;
        return D;
      }
      function M(z, D) {
        const F = D >> 4, K = 15 & D, G = m[z][F ^ K], H = w[z][R[K] ^ P[F]];
        return v[z][R[H] ^ P[G]] << 4 | O[z][G ^ H];
      }
      function X(z, D) {
        let F = q(z, 0), K = q(z, 1), G = q(z, 2), H = q(z, 3);
        switch (E) {
          case 4:
            F = U[1][F] ^ q(D[3], 0), K = U[0][K] ^ q(D[3], 1), G = U[0][G] ^ q(D[3], 2), H = U[1][H] ^ q(D[3], 3);
          case 3:
            F = U[1][F] ^ q(D[2], 0), K = U[1][K] ^ q(D[2], 1), G = U[0][G] ^ q(D[2], 2), H = U[0][H] ^ q(D[2], 3);
          case 2:
            F = U[0][U[0][F] ^ q(D[1], 0)] ^ q(D[0], 0), K = U[0][U[1][K] ^ q(D[1], 1)] ^ q(D[0], 1), G = U[1][U[0][G] ^ q(D[1], 2)] ^ q(D[0], 2), H = U[1][U[1][H] ^ q(D[1], 3)] ^ q(D[0], 3);
        }
        return B[0][F] ^ B[1][K] ^ B[2][G] ^ B[3][H];
      }
      for (t = t.slice(0, 32), l = t.length; l !== 16 && l !== 24 && l !== 32; ) t[l++] = 0;
      for (l = 0; l < t.length; l += 4) S[l >> 2] = tt(t, l);
      for (l = 0; l < 256; l++) U[0][l] = M(0, l), U[1][l] = M(1, l);
      for (l = 0; l < 256; l++) _ = U[1][l], k = L(_), N = C(_), B[0][l] = _ + (k << 8) + (N << 16) + (N << 24), B[2][l] = k + (N << 8) + (_ << 16) + (N << 24), _ = U[0][l], k = L(_), N = C(_), B[1][l] = N + (N << 8) + (k << 16) + (_ << 24), B[3][l] = k + (_ << 8) + (N << 16) + (k << 24);
      for (E = S.length / 2, l = 0; l < E; l++) u = S[l + l], T[l] = u, d = S[l + l + 1], A[l] = d, y[E - l - 1] = x(u, d);
      for (l = 0; l < 40; l += 2) u = 16843009 * l, d = u + 16843009, u = X(u, T), d = Ke(X(d, A), 8), a[l] = u + d & Re, a[l + 1] = Ke(u + 2 * d, 9);
      for (l = 0; l < 256; l++) switch (u = d = g = b = l, E) {
        case 4:
          u = U[1][u] ^ q(y[3], 0), d = U[0][d] ^ q(y[3], 1), g = U[0][g] ^ q(y[3], 2), b = U[1][b] ^ q(y[3], 3);
        case 3:
          u = U[1][u] ^ q(y[2], 0), d = U[1][d] ^ q(y[2], 1), g = U[0][g] ^ q(y[2], 2), b = U[0][b] ^ q(y[2], 3);
        case 2:
          n[0][l] = B[0][U[0][U[0][u] ^ q(y[1], 0)] ^ q(y[0], 0)], n[1][l] = B[1][U[0][U[1][d] ^ q(y[1], 1)] ^ q(y[0], 1)], n[2][l] = B[2][U[1][U[0][g] ^ q(y[1], 2)] ^ q(y[0], 2)], n[3][l] = B[3][U[1][U[1][b] ^ q(y[1], 3)] ^ q(y[0], 3)];
      }
    }, close: function() {
      a = [], n = [[], [], [], []];
    }, encrypt: function(c, l) {
      i = c, r = l;
      const u = [tt(i, r) ^ a[0], tt(i, r + 4) ^ a[1], tt(i, r + 8) ^ a[2], tt(i, r + 12) ^ a[3]];
      for (let d = 0; d < 8; d++) f(d, u);
      return bt(i, r, u[2] ^ a[4]), bt(i, r + 4, u[3] ^ a[5]), bt(i, r + 8, u[0] ^ a[6]), bt(i, r + 12, u[1] ^ a[7]), r += 16, i;
    }, decrypt: function(c, l) {
      i = c, r = l;
      const u = [tt(i, r) ^ a[4], tt(i, r + 4) ^ a[5], tt(i, r + 8) ^ a[6], tt(i, r + 12) ^ a[7]];
      for (let d = 7; d >= 0; d--) h(d, u);
      bt(i, r, u[2] ^ a[0]), bt(i, r + 4, u[3] ^ a[1]), bt(i, r + 8, u[0] ^ a[2]), bt(i, r + 12, u[1] ^ a[3]), r += 16;
    }, finalize: function() {
      return i;
    } };
  })(), this.tf.open(Array.from(e), 0), this.encrypt = function(t) {
    return this.tf.encrypt(Array.from(t), 0);
  };
}
function Ue() {
}
function hr(e) {
  this.bf = new Ue(), this.bf.init(e), this.encrypt = function(t) {
    return this.bf.encryptBlock(t);
  };
}
lr.keySize = lr.prototype.keySize = 32, lr.blockSize = lr.prototype.blockSize = 16, Ue.prototype.BLOCKSIZE = 8, Ue.prototype.SBOXES = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]], Ue.prototype.PARRAY = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], Ue.prototype.NN = 16, Ue.prototype._clean = function(e) {
  return e < 0 && (e = (2147483647 & e) + 2147483648), e;
}, Ue.prototype._F = function(e) {
  let t;
  const i = 255 & e, r = 255 & (e >>>= 8), a = 255 & (e >>>= 8), n = 255 & (e >>>= 8);
  return t = this.sboxes[0][n] + this.sboxes[1][a], t ^= this.sboxes[2][r], t += this.sboxes[3][i], t;
}, Ue.prototype._encryptBlock = function(e) {
  let t, i = e[0], r = e[1];
  for (t = 0; t < this.NN; ++t) {
    i ^= this.parray[t], r = this._F(i) ^ r;
    const a = i;
    i = r, r = a;
  }
  i ^= this.parray[this.NN + 0], r ^= this.parray[this.NN + 1], e[0] = this._clean(r), e[1] = this._clean(i);
}, Ue.prototype.encryptBlock = function(e) {
  let t;
  const i = [0, 0], r = this.BLOCKSIZE / 2;
  for (t = 0; t < this.BLOCKSIZE / 2; ++t) i[0] = i[0] << 8 | 255 & e[t + 0], i[1] = i[1] << 8 | 255 & e[t + r];
  this._encryptBlock(i);
  const a = [];
  for (t = 0; t < this.BLOCKSIZE / 2; ++t) a[t + 0] = i[0] >>> 24 - 8 * t & 255, a[t + r] = i[1] >>> 24 - 8 * t & 255;
  return a;
}, Ue.prototype._decryptBlock = function(e) {
  let t, i = e[0], r = e[1];
  for (t = this.NN + 1; t > 1; --t) {
    i ^= this.parray[t], r = this._F(i) ^ r;
    const a = i;
    i = r, r = a;
  }
  i ^= this.parray[1], r ^= this.parray[0], e[0] = this._clean(r), e[1] = this._clean(i);
}, Ue.prototype.init = function(e) {
  let t, i = 0;
  for (this.parray = [], t = 0; t < this.NN + 2; ++t) {
    let a = 0;
    for (let n = 0; n < 4; ++n) a = a << 8 | 255 & e[i], ++i >= e.length && (i = 0);
    this.parray[t] = this.PARRAY[t] ^ a;
  }
  for (this.sboxes = [], t = 0; t < 4; ++t) for (this.sboxes[t] = [], i = 0; i < 256; ++i) this.sboxes[t][i] = this.SBOXES[t][i];
  const r = [0, 0];
  for (t = 0; t < this.NN + 2; t += 2) this._encryptBlock(r), this.parray[t + 0] = r[0], this.parray[t + 1] = r[1];
  for (t = 0; t < 4; ++t) for (i = 0; i < 256; i += 2) this._encryptBlock(r), this.sboxes[t][i + 0] = r[0], this.sboxes[t][i + 1] = r[1];
}, hr.keySize = hr.prototype.keySize = 16, hr.blockSize = hr.prototype.blockSize = 8;
new Map(Object.entries({ tripledes: fr, cast5: cr, twofish: lr, blowfish: hr }));
new Uint8Array(new Uint16Array([43981]).buffer)[0];
var da, ga, pa, ya, ba, wa;
(function() {
  if (wa) return ba;
  wa = 1;
  const e = (function() {
    if (ga) return da;
    function i(n) {
      this.name = "Bzip2Error", this.message = n, this.stack = Error().stack;
    }
    ga = 1, i.prototype = Error();
    var r = function(n) {
      throw new i(n);
    }, a = {};
    return a.Bzip2Error = i, a.crcTable = [0, 79764919, 159529838, 222504665, 319059676, 398814059, 445009330, 507990021, 638119352, 583659535, 797628118, 726387553, 890018660, 835552979, 1015980042, 944750013, 1276238704, 1221641927, 1167319070, 1095957929, 1595256236, 1540665371, 1452775106, 1381403509, 1780037320, 1859660671, 1671105958, 1733955601, 2031960084, 2111593891, 1889500026, 1952343757, 2552477408, 2632100695, 2443283854, 2506133561, 2334638140, 2414271883, 2191915858, 2254759653, 3190512472, 3135915759, 3081330742, 3009969537, 2905550212, 2850959411, 2762807018, 2691435357, 3560074640, 3505614887, 3719321342, 3648080713, 3342211916, 3287746299, 3467911202, 3396681109, 4063920168, 4143685023, 4223187782, 4286162673, 3779000052, 3858754371, 3904687514, 3967668269, 881225847, 809987520, 1023691545, 969234094, 662832811, 591600412, 771767749, 717299826, 311336399, 374308984, 453813921, 533576470, 25881363, 88864420, 134795389, 214552010, 2023205639, 2086057648, 1897238633, 1976864222, 1804852699, 1867694188, 1645340341, 1724971778, 1587496639, 1516133128, 1461550545, 1406951526, 1302016099, 1230646740, 1142491917, 1087903418, 2896545431, 2825181984, 2770861561, 2716262478, 3215044683, 3143675388, 3055782693, 3001194130, 2326604591, 2389456536, 2200899649, 2280525302, 2578013683, 2640855108, 2418763421, 2498394922, 3769900519, 3832873040, 3912640137, 3992402750, 4088425275, 4151408268, 4197601365, 4277358050, 3334271071, 3263032808, 3476998961, 3422541446, 3585640067, 3514407732, 3694837229, 3640369242, 1762451694, 1842216281, 1619975040, 1682949687, 2047383090, 2127137669, 1938468188, 2001449195, 1325665622, 1271206113, 1183200824, 1111960463, 1543535498, 1489069629, 1434599652, 1363369299, 622672798, 568075817, 748617968, 677256519, 907627842, 853037301, 1067152940, 995781531, 51762726, 131386257, 177728840, 240578815, 269590778, 349224269, 429104020, 491947555, 4046411278, 4126034873, 4172115296, 4234965207, 3794477266, 3874110821, 3953728444, 4016571915, 3609705398, 3555108353, 3735388376, 3664026991, 3290680682, 3236090077, 3449943556, 3378572211, 3174993278, 3120533705, 3032266256, 2961025959, 2923101090, 2868635157, 2813903052, 2742672763, 2604032198, 2683796849, 2461293480, 2524268063, 2284983834, 2364738477, 2175806836, 2238787779, 1569362073, 1498123566, 1409854455, 1355396672, 1317987909, 1246755826, 1192025387, 1137557660, 2072149281, 2135122070, 1912620623, 1992383480, 1753615357, 1816598090, 1627664531, 1707420964, 295390185, 358241886, 404320391, 483945776, 43990325, 106832002, 186451547, 266083308, 932423249, 861060070, 1041341759, 986742920, 613929101, 542559546, 756411363, 701822548, 3316196985, 3244833742, 3425377559, 3370778784, 3601682597, 3530312978, 3744426955, 3689838204, 3819031489, 3881883254, 3928223919, 4007849240, 4037393693, 4100235434, 4180117107, 4259748804, 2310601993, 2373574846, 2151335527, 2231098320, 2596047829, 2659030626, 2470359227, 2550115596, 2947551409, 2876312838, 2788305887, 2733848168, 3165939309, 3094707162, 3040238851, 2985771188], a.array = function(n) {
      var o = 0, s = 0, f = [0, 1, 3, 7, 15, 31, 63, 127, 255];
      return function(h) {
        for (var c = 0; h > 0; ) {
          var l = 8 - o;
          h >= l ? (c <<= l, c |= f[l] & n[s++], o = 0, h -= l) : (c <<= h, c |= (n[s] & f[h] << 8 - h - o) >> 8 - h - o, o += h, h = 0);
        }
        return c;
      };
    }, a.simple = function(n, o) {
      var s = a.array(n), f = !1, h = 1e5 * a.header(s), c = new Int32Array(h);
      do
        f = a.decompress(s, o, c, h);
      while (!f);
    }, a.header = function(n) {
      this.byteCount = new Int32Array(256), this.symToByte = new Uint8Array(256), this.mtfSymbol = new Int32Array(256), this.selectors = new Uint8Array(32768), n(24) != 4348520 && r("No magic number found");
      var o = n(8) - 48;
      return (o < 1 || o > 9) && r("Not a BZIP archive"), o;
    }, a.decompress = function(n, o, s, f, h) {
      for (var c = -1, l = "", u = 0; u < 6; u++) l += n(8).toString(16);
      if (l == "177245385090") return (0 | n(32)) !== h && r("Error in bzip2: crc32 do not match"), n(null), null;
      l != "314159265359" && r("Invalid bzip data");
      var d = 0 | n(32);
      n(1) && r("unsupported obsolete version");
      var g = n(24);
      g > f && r("Initial position larger than buffer size");
      var b = n(16), T = 0;
      for (u = 0; u < 16; u++) if (b & 1 << 15 - u) {
        var A = n(16);
        for (y = 0; y < 16; y++) A & 1 << 15 - y && (this.symToByte[T++] = 16 * u + y);
      }
      var S = n(3);
      (S < 2 || S > 6) && r("Invalid bzip data");
      var E = n(15);
      for (E == 0 && r("Invalid bzip data"), u = 0; u < S; u++) this.mtfSymbol[u] = u;
      for (u = 0; u < E; u++) {
        for (var y = 0; n(1); y++) y >= S && r("Invalid bzip data");
        var _ = this.mtfSymbol[y];
        for (A = y - 1; A >= 0; A--) this.mtfSymbol[A + 1] = this.mtfSymbol[A];
        this.mtfSymbol[0] = _, this.selectors[u] = _;
      }
      var k, N, m, w, O = T + 2, v = [], R = new Uint8Array(258), P = new Uint16Array(21);
      for (y = 0; y < S; y++) {
        for (b = n(5), u = 0; u < O; u++) {
          for (; (b < 1 || b > 20) && r("Invalid bzip data"), n(1); ) n(1) ? b-- : b++;
          R[u] = b;
        }
        var U, B;
        for (U = B = R[0], u = 1; u < O; u++) R[u] > B ? B = R[u] : R[u] < U && (U = R[u]);
        (k = v[y] = {}).permute = new Int32Array(258), k.limit = new Int32Array(21), k.base = new Int32Array(21), k.minLen = U, k.maxLen = B;
        var L = k.base, C = k.limit, x = 0;
        for (u = U; u <= B; u++) for (b = 0; b < O; b++) R[b] == u && (k.permute[x++] = b);
        for (u = U; u <= B; u++) P[u] = C[u] = 0;
        for (u = 0; u < O; u++) P[R[u]]++;
        for (x = b = 0, u = U; u < B; u++) x += P[u], C[u] = x - 1, x <<= 1, L[u + 1] = x - (b += P[u]);
        C[B] = x + P[B] - 1, L[U] = 0;
      }
      for (u = 0; u < 256; u++) this.mtfSymbol[u] = u, this.byteCount[u] = 0;
      for (N = m = O = w = 0; ; ) {
        for (O-- || (O = 49, w >= E && r("Invalid bzip data"), L = (k = v[this.selectors[w++]]).base, C = k.limit), y = n(u = k.minLen); u > k.maxLen && r("Invalid bzip data"), !(y <= C[u]); ) u++, y = y << 1 | n(1);
        ((y -= L[u]) < 0 || y >= 258) && r("Invalid bzip data");
        var M = k.permute[y];
        if (M != 0 && M != 1) {
          if (N) for (N = 0, m + b > f && r("Invalid bzip data"), _ = this.symToByte[this.mtfSymbol[0]], this.byteCount[_] += b; b--; ) s[m++] = _;
          if (M > T) break;
          for (m >= f && r("Invalid bzip data"), u = M - 1, _ = this.mtfSymbol[u], A = u - 1; A >= 0; A--) this.mtfSymbol[A + 1] = this.mtfSymbol[A];
          this.mtfSymbol[0] = _, _ = this.symToByte[_], this.byteCount[_]++, s[m++] = _;
        } else N || (N = 1, b = 0), b += M == 0 ? N : 2 * N, N <<= 1;
      }
      for ((g < 0 || g >= m) && r("Invalid bzip data"), y = 0, u = 0; u < 256; u++) A = y + this.byteCount[u], this.byteCount[u] = y, y = A;
      for (u = 0; u < m; u++) _ = 255 & s[u], s[this.byteCount[_]] |= u << 8, this.byteCount[_]++;
      var X, z, D, F = 0, K = 0, G = 0;
      for (m && (K = 255 & (F = s[g]), F >>= 8, G = -1); m; ) {
        for (m--, z = K, K = 255 & (F = s[F]), F >>= 8, G++ == 3 ? (X = K, D = z, K = -1) : (X = 1, D = K); X--; ) c = 4294967295 & (c << 8 ^ this.crcTable[255 & (c >> 24 ^ D)]), o(D);
        K != z && (G = 0);
      }
      return (0 | (c = ~c >>> 0)) != (0 | d) && r("Error in bzip2: crc32 do not match"), 4294967295 & (c ^ (h << 1 | h >>> 31));
    }, da = a;
  })(), t = (function() {
    if (ya) return pa;
    ya = 1;
    var i = [0, 1, 3, 7, 15, 31, 63, 127, 255];
    return pa = function(r) {
      var a = 0, n = 0, o = r(), s = function(f) {
        if (f === null && a != 0) return a = 0, void n++;
        for (var h = 0; f > 0; ) {
          n >= o.length && (n = 0, o = r());
          var c = 8 - a;
          a === 0 && f > 0 && s.bytesRead++, f >= c ? (h <<= c, h |= i[c] & o[n++], a = 0, f -= c) : (h <<= f, h |= (o[n] & i[f] << 8 - f - a) >> 8 - f - a, a += f, f = 0);
        }
        return h;
      };
      return s.bytesRead = 0, s;
    };
  })();
  return ba = function(i) {
    const r = [];
    let a = 0, n = 0, o = !1, s = !1, f = null, h = null, c, l = 0;
    function u(d) {
      if (!o) try {
        return (function(g) {
          if (n) {
            const b = 1e5 * n, T = new Int32Array(b), A = [], S = function(E) {
              A.push(E);
            };
            return h = e.decompress(f, S, T, b, h), h === null ? (n = 0, !1) : (g(new Uint8Array(A)), !0);
          }
          return n = e.header(f), h = 0, !1;
        })((function(g) {
          d.enqueue(g), g !== null && (l += g.length);
        }));
      } catch (g) {
        return d.error(g), o = !0, !0;
      }
    }
    return new ReadableStream({ start() {
      c = i.getReader();
    }, async pull(d) {
      try {
        for (; ; ) {
          for (; !(s || f && a - f.bytesRead + 1 >= 25e3 + 1e5 * (n || 4)); ) {
            const { value: g, done: b } = await c.read();
            b ? s = !0 : (r.push(g), a += g.length, f === null && (f = t((function() {
              return r.shift();
            }))));
          }
          for (; s ? f && a > f.bytesRead : f && a - f.bytesRead + 1 >= 25e3 + 1e5 * (n || 4); ) if (u(d)) return;
          if (s && !o && (!f || a <= f.bytesRead)) return void (h === null ? d.close() : d.error(Error("input stream ended prematurely")));
        }
      } catch (g) {
        d.error(g);
      }
    }, async cancel(d) {
      await c.abort(d);
    } }, { highWaterMark: 0 });
  };
})();
var Qi;
(function(e) {
  e.LOADING = "loading", e.LOADING_MESSAGE_1 = "loadingMessage1", e.LOADING_MESSAGE_2 = "loadingMessage2", e.LOADING_MESSAGE_3 = "loadingMessage3", e.LOADING_MESSAGE_4 = "loadingMessage4", e.LOADING_MESSAGE_5 = "loadingMessage5", e.SYSTEM = "system", e.LANGUAGE = "language", e.CLEAR_ALL_LOCAL_DATA = "clear all local data", e.DELETE_ALL_NOTES = "delete all notes", e.REMOVE_ACCOUNT = "remove account", e.PURGE_DATA_WARNING = "be careful, all local data will be purged, unsaved notes will be lost", e.REMOVE_ACCOUNT_WARNING = "deleting an account is an irreversible operation. We do not store your data after deletion and therefore it cannot be recovered", e.PICK_LANGUAGE = "pick language", e.COMMON = "common", e.THEMES = "themes", e.COMPLETION = "completion", e.EDITOR = "editor", e.FORCE_SYNC = "force sync", e.FORCE_SYNC_DESCRIPTION = "this functionality will completely clear the local cache and reload all notes from an external source. Important: Unsaved notes will be deleted.", e.SYNC_PROFILE_CONFIG_DESCRIPTION = "copy this config and save it to ~/.config/orgnote/config.toml in your local CLI environment", e.SYNC_PROFILE_CONFIG_UNAVAILABLE = "choose synchronization mode and create an API token to copy local sync config", e.SYNC_PROFILE_CONFIG_EXPORTED = "local sync config copied", e.SYNC_PROFILE_CONFIG_EXPORTED_DESCRIPTION = "the generated TOML config was copied to clipboard", e.SYNC_PROFILE_CONFIG_DOWNLOADED = "local sync config downloaded", e.SYNC_PROFILE_CONFIG_DOWNLOADED_DESCRIPTION = "the generated TOML config was downloaded as a file", e.EMACS_USE_PACKAGE_CONFIG_COPIED = "Emacs use-package config copied", e.EMACS_USE_PACKAGE_CONFIG_COPIED_DESCRIPTION = "the generated Emacs use-package config was copied to clipboard", e.EMACS_USE_PACKAGE_COPY_CONFIG = "copy Emacs use-package config", e.CLI_INSTALL_DESCRIPTION = "Install orgnote-cli before using local synchronization from terminal.", e.CLI_INSTALL_COMMAND_COPIED = "CLI install command copied", e.CLI_INSTALL_COMMAND_COPIED_DESCRIPTION = "the orgnote-cli install command was copied to clipboard", e.SUBSCRIPTION_KEY = "subscription key", e.ACTIVATE = "activate", e.WANT_SUBSCRIPTION = "want to get a key for synchronization?", e.SEVERAL_OPTIONS = "you have several options!", e.SIGNUP_FOR_BETA = "sign up for beta testing", e.ACTIVE_TESTERS_KEY = "active testers will receive a key in the release version", e.OPEN_SOURCE_DEVELOPER_WRITE = "you are an open-source developer, write to", e.TRY_OWN_SERVER = "try to set up your own server for synchronization (unfortunately instructions are in progress)", e.SUBSCRIBE_PATREON = "subscribe to my patreon", e.ADD = "add", e.ENCRYPTION_PASSWORD = "encryption password", e.GPG_ENCRYPTION_TYPE = "GPG encryption type", e.GPG_PUBLIC_KEY = "GPG public key", e.GPG_PASSPHRASE = "GPG passphrase", e.GPG_PRIVATE_KEY = "GPG private key", e.ENCRYPT_EXISTING_NOTES = "encrypt existing notes", e.ENCRYPTION_KEYS_GEN_WARNING = "be careful, the old encryption keys will be lost. Third-party clients will need to update encryption keys.", e.ENCRYPTED_NOTES_KEY_CHANGE_WARNING = "you have encrypted notes. Changing encryption keys will make them unreadable unless you re-encrypt them manually. Continue?", e.SYNC_FILES = "sync files", e.SYNC_FILES_DESCRIPTION = "synchronize all local files with the remote server", e.SYNC_INVALID_API_RESPONSE = "sync invalid API response", e.GENERATE_GPG_KEYS = "generate new GPG keys", e.UPLOAD = "upload", e.AVAILABLE_FOR_SUBSCRIPTION = "this functionality is only available to registered users with an active subscription.", e.SUCCESSFULLY_SUBSCRIBED = "You are successfully subscribed!", e.CREATE_NEW_TOKEN = "create new token", e.CONFIRM = "confirm", e.CANCEL = "cancel", e.CONFIRM_DELETE_ALL_DATA = "are you sure you want to delete all data? this is an irreversible event", e.RESET_SYSTEM = "Reset system", e.RESET_SYSTEM_WARNING = "A local reset will result in complete local data deletion. Be careful: if there is no backup, it’s impossible to restore the data.", e.RESET_SYSTEM_DESCRIPTION = "Delete all local data, including notes, files, account information, settings, etc.", e.IRREVERSIBLE_EVENT = "This is an irreversible event", e.CONFIRM_DELETE_NOTES = "Are you sure you want to delete all notes? This is an irreversible event", e.CONFIRM_DELETE_ACCOUNT = "Are you sure you want to delete your account? This is an irreversible event", e.EXECUTE_COMMAND = "execute command", e.ITEMS = "items", e.NOT_FOUND = "not found", e.BLANK = "blank", e.VISIT_DEBUG_INFO = "visit debug info on the github", e.ENCRYPT_ACTIVE_NOTE = "encrypt active note", e.DECRYPT_ACTIVE_NOTE = "decrypt active note", e.CHECK_GITHUB_SOURCE_CODE = "check source code on the github page", e.ADD_NEW_TAB = "add new tab", e.NEW_TAB = "new tab", e.SIMPLE_FS_DESCRIPTION = "A simple file system based on IndexedDB. It does not provide real storage on the disk and stores all data in the browser.", e.STORAGE_SETTINGS = "storage settings", e.STORAGE_CHANGE_WARNING = "be careful", e.STORAGE_CHANGE_WARNING_DESCRIPTION = "changing the file system will automatically clear existing data stored in the previous file system.", e.PICK_FILE = "pick file", e.PICK_FOLDER = "pick folder", e.VAULT = "vault", e.CHOOSE_FILE_SYSTEM = "choose file system", e.CHOOSE_VAULT = "choose vault", e.CREATE_DIRECTORY = "create directory", e.DELETE = "delete", e.RENAME = "rename", e.COPY = "copy", e.MOVE = "move", e.SORT_BY_NAME = "sort by name", e.SORT_BY_MODIFIED = "sort by modified", e.SORT_BY_SIZE = "sort by size", e.SORT_ASCENDING = "ascending", e.SORT_DESCENDING = "descending", e.CREATE_FILE = "create file", e.FILE_NAME = "file name", e.DIR_NAME = "directory name", e.FINISH_SETUP = "finish setup", e.FOLDER_NAME = "folder name", e.ANDROID_SAF_FS_DESCRIPTION = "SAF android file system", e.NO_FILE_READER_FOR = "no file reader for", e.CLOSE = "close", e.PICK_NOTE = "pick note", e.CRITICAL_ERROR = "critical error", e.ERROR_DESCRIPTION = "the application encountered an unexpected error and cannot continue normally", e.RELOAD = "reload", e.COPY_LOG = "copy log", e.COPIED_TO_CLIPBOARD = "copied to clipboard", e.BACK_HOME = "back to home", e.ERROR_DETAILS = "error details", e.NO_ERRORS = "no errors recorded", e.BOOT_ERRORS = "boot errors (fallback)", e.APP_ERRORS = "application errors", e.NO_LOGS_MATCH_BY_FILTER = "No logs match the selected filter", e.CONFIRM_DELETE_FILE = "Confirm delete file", e.RETRIES = "retries", e.ERROR = "error", e.INVALID_DATE = "invalid date", e.TASK_DETAILS = "task details", e.DEFAULT_GIT_PROVIDER_DESCRIPTION = "in-memory Git provider using es-git (default)", e.INSTALLED = "installed", e.ALL_AVAILABLE = "all available", e.NO_EXTENSIONS_INSTALLED = "no extensions installed", e.NO_EXTENSIONS_AVAILABLE = "no extensions available", e.NO_EXTENSION_SETTINGS = "no extension settings", e.EXTENSION_SETTINGS = "extension settings", e.INSTALL_FROM_URL = "install from URL", e.ENTER_GIT_REPO_URL = "enter git repository URL", e.DELETE_EXTENSION = "delete extension", e.CONFIRM_DELETE_EXTENSION = "are you sure you want to delete this extension?", e.INSTALL_EXTENSION = "install extension", e.IMPORT_EXTENSION = "import extension", e.REFRESH = "refresh", e.EXTENSIONS = "extensions", e.THEME_MODE_LIGHT = "light", e.THEME_MODE_DARK = "dark", e.THEME_MODE_AUTO = "auto", e.THEME_MODE_LIGHT_DESCRIPTION = "always use light theme", e.THEME_MODE_DARK_DESCRIPTION = "always use dark theme", e.THEME_MODE_AUTO_DESCRIPTION = "follow system preference", e.SELECT_THEME_MODE_PLACEHOLDER = "select theme mode", e.DISABLE_EXTENSION = "disable extension", e.ENABLE_EXTENSION = "enable extension", e.ONLY_GIT_EXTENSIONS_SUPPORTED = "only git extensions can be installed", e.EXTENSION_INSTALLED = "extension installed", e.EXTENSION_INSTALLED_FROM_URL = "extension installed from URL", e.AUTHOR = "author", e.KEYWORDS = "keywords", e.REPOSITORY = "repository", e.PERMISSIONS = "permissions", e.DEVELOPMENT = "development", e.LOGS = "logs", e.SELECT_COMMAND_TO_COPY_URL = "select command to copy URL", e.SELECT_COMMAND = "select command", e.CONFIRM_CLEAR_LOGS = "confirm clear logs", e.SYSTEM_INFO = "system info", e.FONTS = "fonts", e.NOTIFICATIONS = "notifications", e.FILE_DELETED_EXTERNALLY = "file was deleted externally", e.BUFFER_READONLY = "buffer is read-only", e.IMAGE_LOAD_FAILED = "failed to load image", e.IMAGE_NOT_FOUND = "image not found", e.USED_SPACE = "used space", e.STORAGE = "storage", e.AUTHENTICATION_STATUS = "authentication status", e.COMING_SOON = "coming soon", e.AUTH_IDENTIFYING = "identifying", e.AUTH_RETURN_TO_MOBILE = "return to mobile app", e.AUTH_LOGIN_REQUIRED = "login required", e.AUTH_ACTIVATING = "activating", e.AUTH_ENTER_ACTIVATION_KEY = "enter activation key", e.ACTIVATION_FAILED = "activation failed, please check your key and try again", e.ACTIVATION_KEY_NOT_FOUND = "activation key not found", e.ACTIVATION_KEY_ALREADY_USED = "activation key already used", e.ACTIVATION_SERVICE_UNAVAILABLE = "activation service unavailable", e.AUTH_LOGOUT = "logout", e.AUTH_LOGOUT_DESCRIPTION = "sign out from your account", e.AUTH_LOGIN = "login", e.AUTH_LOGIN_DESCRIPTION = "sign in to your account", e.AUTH_INVALID_CALLBACK_PARAMS = "invalid authentication callback parameters", e.AUTH_REMOVE_ACCOUNT_DESCRIPTION = "permanently delete your account", e.AUTH_GROUP = "auth", e.TABS_COUNT = "tabsCount", e.TODAY = "today", e.YESTERDAY = "yesterday", e.TOC_NO_ACTIVE_DOCUMENT = "no active document", e.TOC_NO_HEADLINES_FOUND = "no headlines found", e.PICK_NOTE_TO_LINK = "pick note to link", e.UNTITLED = "untitled", e.NO_SELECTED_NOTE = "no selected note", e.NOTE_INFO_TAGS = "note info tags", e.NOTE_INFO_LINKS = "note info links", e.NOTE_INFO_BACKLINKS = "note info backlinks", e.NOTE_INFO_CREATED = "note info created", e.NOTE_INFO_UPDATED = "note info updated", e.NOTE_INFO_LAST_OPENED = "note info last opened", e.NOTE_INFO_LAST_SYNC = "note info last sync", e.GPG_EMAIL_REQUIRED = "gpg email required", e.GPG_EMAIL_INVALID = "gpg email invalid", e.CLEAR_ALL_NOTIFICATIONS = "clear all notifications", e.NO_NOTIFICATIONS = "no notifications", e.SHOW_LATEST_CHANGES = "show latest changes", e.LATEST_CHANGES_NOTIFICATION_DESCRIPTION = "open latest changes notification description", e.NO_LATEST_CHANGES = "no latest changes", e.UPDATED_TO_VERSION = "updated to version", e.UPDATED_FROM_VERSION = "updated from version", e.OPEN_RELEASE_NOTES = "open release notes", e.CHECK_FOR_UPDATES = "check for updates", e.CHECKING_FOR_UPDATES = "checking for updates", e.UPDATE_AVAILABLE = "update available", e.UPDATE_DOWNLOAD_IN_PROGRESS = "update download in progress", e.NO_UPDATES_AVAILABLE = "no updates available", e.UPDATE_CHECK_FAILED = "update check failed", e.OPEN_UPDATE_PAGE = "open update page", e.ELECTRON_UPDATE_READY = "electron update ready", e.ELECTRON_UPDATE_RESTART_TO_INSTALL = "electron update restart to install", e.ELECTRON_UPDATE_VERSION_READY = "electron update version ready", e.ELECTRON_UPDATE_INSTALL_FAILED = "electron update install failed", e.ELECTRON_UPDATE_FAILED = "electron update failed", e.GRAPH_TITLE = "graph.title", e.GRAPH_DESCRIPTION = "graph.description", e.GRAPH_EMPTY_TITLE = "graph.empty.title", e.GRAPH_EMPTY_DESCRIPTION = "graph.empty.description", e.GRAPH_ERROR_TITLE = "graph.error.title", e.GRAPH_SELECTED_LABEL = "graph.selected.label", e.GRAPH_REFRESH = "graph.refresh", e.GRAPH_NODES_LABEL = "graph.nodes.label", e.GRAPH_EDGES_LABEL = "graph.edges.label", e.GRAPH_SETTINGS_TITLE = "graph.settings.title", e.GRAPH_SETTINGS_GROUP = "graph.settings.group", e.LOCAL_GRAPH_TITLE = "local.graph.title", e.ONBOARDING_WELCOME_TITLE = "Welcome to OrgNote", e.ONBOARDING_WELCOME_DESCRIPTION = "Your knowledge, connected. A Zettelkasten note-taking app built around Org-mode.", e.ONBOARDING_NEXT = "Next", e.ONBOARDING_BACK = "Back", e.ONBOARDING_SKIP = "Skip setup", e.ONBOARDING_SERVER_TITLE = "Server Configuration", e.ONBOARDING_SERVER_DESCRIPTION = "Connect to your self-hosted OrgNote server for synchronization.", e.ONBOARDING_SERVER_COMING_SOON = "Self-hosted sync will be available in a future version.", e.ONBOARDING_SERVER_SUBSCRIPTION_NOTE = "Sync is available for subscribers and beta testers.", e.ONBOARDING_AUTH_TITLE = "Sign in", e.ONBOARDING_AUTH_DESCRIPTION = "Sign in to sync your notes across devices and unlock cloud features.", e.ONBOARDING_AUTH_GITHUB = "Sign in with GitHub", e.ONBOARDING_SYNC_TITLE = "Synchronization setup", e.ONBOARDING_SYNC_DESCRIPTION = "Install the CLI, choose remote synchronization, create an API token, then copy your local sync configuration.", e.ONBOARDING_EMACS_TITLE = "Emacs Integration", e.ONBOARDING_EMACS_DESCRIPTION = "OrgNote is fully compatible with Emacs Org-mode and Org-roam.", e.ONBOARDING_EMACS_COPY_CONFIG = "Copy config", e.ONBOARDING_EMACS_CONFIG_COPIED = "Emacs config copied to clipboard", e.ONBOARDING_EMACS_CONFIG_CONTENT = "Add the following to your Emacs configuration via use-package:", e.ONBOARDING_COMPLETED = "finish", e.SHOW_PERFORMANCE_REPORT_DESCRIPTION = "Show boot and extension timing report", e.SHOW_PERFORMANCE_REPORT = "Show performance report", e.CLEAR_PERFORMANCE_REPORT = "Clear performance measurements", e.CLEAR_PERFORMANCE_REPORT_DESCRIPTION = "Clear all recorded performance measurements", e.MEASUREMENTS = "measurements", e.CLEAR_MEASUREMENTS = "Clear measurements", e.TOTAL_BOOT_TIME = "Total boot time", e.MS = "ms", e.PROPERTIES = "Properties", e.PROPERTY_PLACEHOLDER = "Property", e.EMPTY_VALUE_PLACEHOLDER = "Empty", e.ADD_PROPERTY = "Add property", e.PROPERTY_KEY_REQUIRED = "Property key is required", e.PROPERTY_KEY_INVALID_CHARS = "Use letters, digits, _ or -", e.PROPERTY_KEY_DUPLICATE = "Property key already exists", e.PROPERTY_VALUE_MULTILINE = "Property value must be single-line";
})(Qi || (Qi = {}));
({
  ...Qi,
  ...pr
});
var Ea;
(function(e) {
  e.Home = "Home", e.UserNotes = "UserNotes", e.NoteList = "NoteList", e.NoteDetail = "NoteDetail", e.AuthPage = "AuthPage", e.NotFound = "NotFound", e.UserGraph = "UserGraph", e.EditNote = "EditNote", e.EditCode = "EditCode", e.File = "File", e.Remote = "Remote", e.Embedded = "Embedded", e.SettingsPage = "SettingsPage", e.SystemSettings = "SystemSettings", e.ExtensionsSettings = "ExtensionsSettings", e.LanguageSettings = "LanguageSettings", e.InterfaceSettings = "InterfaceSettings", e.KeybindingSettings = "KeybindingSettings", e.DeveloperSettings = "DeveloperSettings", e.EncryptionSettings = "EncryptionSettings", e.SubscriptionSettings = "SubscriptionSettings", e.StorageSettings = "StorageSettings", e.ApiSettings = "ApiSettings", e.AuthenticationSettings = "AuthenticationSettings", e.SynchronisationSettings = "SynchronisationSettings", e.GraphSettings = "GraphSettings", e.Builtin = "Builtin", e.Extensions = "Extensions", e.Keybindings = "Keybindings", e.RawEditor = "Raw editor", e.WysiwygEditor = "WYSIWYG editor", e.PreviewEditor = "Preview editor", e.Dashboard = "Dashboard", e.ActivationPage = "ActivationPage", e.LoggerPage = "LoggerPage", e.Panes = "Panes", e.InitialPage = "InitialPage", e.Onboarding = "Onboarding", e.Error = "Error";
})(Ea || (Ea = {}));
function y0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yt;
(function(e) {
  e.Upload = "upload", e.Download = "download", e.DeleteLocal = "deleteLocal", e.DeleteRemote = "deleteRemote";
})(Yt || (Yt = {}));
var ma;
(function(e) {
  e.Merged = "merged", e.Ambiguous = "ambiguous";
})(ma || (ma = {}));
Yt.Upload + "", Yt.Download + "", Yt.DeleteLocal + "", Yt.DeleteRemote + "";
var Ui = { exports: {} }, va;
function b0() {
  return va || (va = 1, (function(e) {
    var t = function() {
      this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
    }, i = -1, r = 1, a = 0;
    t.Diff = function(n, o) {
      return [n, o];
    }, t.prototype.diff_main = function(n, o, s, f) {
      typeof f > "u" && (this.Diff_Timeout <= 0 ? f = Number.MAX_VALUE : f = (/* @__PURE__ */ new Date()).getTime() + this.Diff_Timeout * 1e3);
      var h = f;
      if (n == null || o == null)
        throw new Error("Null input. (diff_main)");
      if (n == o)
        return n ? [new t.Diff(a, n)] : [];
      typeof s > "u" && (s = !0);
      var c = s, l = this.diff_commonPrefix(n, o), u = n.substring(0, l);
      n = n.substring(l), o = o.substring(l), l = this.diff_commonSuffix(n, o);
      var d = n.substring(n.length - l);
      n = n.substring(0, n.length - l), o = o.substring(0, o.length - l);
      var g = this.diff_compute_(n, o, c, h);
      return u && g.unshift(new t.Diff(a, u)), d && g.push(new t.Diff(a, d)), this.diff_cleanupMerge(g), g;
    }, t.prototype.diff_compute_ = function(n, o, s, f) {
      var h;
      if (!n)
        return [new t.Diff(r, o)];
      if (!o)
        return [new t.Diff(i, n)];
      var c = n.length > o.length ? n : o, l = n.length > o.length ? o : n, u = c.indexOf(l);
      if (u != -1)
        return h = [
          new t.Diff(r, c.substring(0, u)),
          new t.Diff(a, l),
          new t.Diff(
            r,
            c.substring(u + l.length)
          )
        ], n.length > o.length && (h[0][0] = h[2][0] = i), h;
      if (l.length == 1)
        return [
          new t.Diff(i, n),
          new t.Diff(r, o)
        ];
      var d = this.diff_halfMatch_(n, o);
      if (d) {
        var g = d[0], b = d[1], T = d[2], A = d[3], S = d[4], E = this.diff_main(g, T, s, f), y = this.diff_main(b, A, s, f);
        return E.concat(
          [new t.Diff(a, S)],
          y
        );
      }
      return s && n.length > 100 && o.length > 100 ? this.diff_lineMode_(n, o, f) : this.diff_bisect_(n, o, f);
    }, t.prototype.diff_lineMode_ = function(n, o, s) {
      var f = this.diff_linesToChars_(n, o);
      n = f.chars1, o = f.chars2;
      var h = f.lineArray, c = this.diff_main(n, o, !1, s);
      this.diff_charsToLines_(c, h), this.diff_cleanupSemantic(c), c.push(new t.Diff(a, ""));
      for (var l = 0, u = 0, d = 0, g = "", b = ""; l < c.length; ) {
        switch (c[l][0]) {
          case r:
            d++, b += c[l][1];
            break;
          case i:
            u++, g += c[l][1];
            break;
          case a:
            if (u >= 1 && d >= 1) {
              c.splice(
                l - u - d,
                u + d
              ), l = l - u - d;
              for (var T = this.diff_main(g, b, !1, s), A = T.length - 1; A >= 0; A--)
                c.splice(l, 0, T[A]);
              l = l + T.length;
            }
            d = 0, u = 0, g = "", b = "";
            break;
        }
        l++;
      }
      return c.pop(), c;
    }, t.prototype.diff_bisect_ = function(n, o, s) {
      for (var f = n.length, h = o.length, c = Math.ceil((f + h) / 2), l = c, u = 2 * c, d = new Array(u), g = new Array(u), b = 0; b < u; b++)
        d[b] = -1, g[b] = -1;
      d[l + 1] = 0, g[l + 1] = 0;
      for (var T = f - h, A = T % 2 != 0, S = 0, E = 0, y = 0, _ = 0, k = 0; k < c && !((/* @__PURE__ */ new Date()).getTime() > s); k++) {
        for (var N = -k + S; N <= k - E; N += 2) {
          var m = l + N, w;
          N == -k || N != k && d[m - 1] < d[m + 1] ? w = d[m + 1] : w = d[m - 1] + 1;
          for (var O = w - N; w < f && O < h && n.charAt(w) == o.charAt(O); )
            w++, O++;
          if (d[m] = w, w > f)
            E += 2;
          else if (O > h)
            S += 2;
          else if (A) {
            var v = l + T - N;
            if (v >= 0 && v < u && g[v] != -1) {
              var R = f - g[v];
              if (w >= R)
                return this.diff_bisectSplit_(n, o, w, O, s);
            }
          }
        }
        for (var P = -k + y; P <= k - _; P += 2) {
          var v = l + P, R;
          P == -k || P != k && g[v - 1] < g[v + 1] ? R = g[v + 1] : R = g[v - 1] + 1;
          for (var U = R - P; R < f && U < h && n.charAt(f - R - 1) == o.charAt(h - U - 1); )
            R++, U++;
          if (g[v] = R, R > f)
            _ += 2;
          else if (U > h)
            y += 2;
          else if (!A) {
            var m = l + T - P;
            if (m >= 0 && m < u && d[m] != -1) {
              var w = d[m], O = l + w - m;
              if (R = f - R, w >= R)
                return this.diff_bisectSplit_(n, o, w, O, s);
            }
          }
        }
      }
      return [
        new t.Diff(i, n),
        new t.Diff(r, o)
      ];
    }, t.prototype.diff_bisectSplit_ = function(n, o, s, f, h) {
      var c = n.substring(0, s), l = o.substring(0, f), u = n.substring(s), d = o.substring(f), g = this.diff_main(c, l, !1, h), b = this.diff_main(u, d, !1, h);
      return g.concat(b);
    }, t.prototype.diff_linesToChars_ = function(n, o) {
      var s = [], f = {};
      s[0] = "";
      function h(d) {
        for (var g = "", b = 0, T = -1, A = s.length; T < d.length - 1; ) {
          T = d.indexOf(`
`, b), T == -1 && (T = d.length - 1);
          var S = d.substring(b, T + 1);
          (f.hasOwnProperty ? f.hasOwnProperty(S) : f[S] !== void 0) ? g += String.fromCharCode(f[S]) : (A == c && (S = d.substring(b), T = d.length), g += String.fromCharCode(A), f[S] = A, s[A++] = S), b = T + 1;
        }
        return g;
      }
      var c = 4e4, l = h(n);
      c = 65535;
      var u = h(o);
      return { chars1: l, chars2: u, lineArray: s };
    }, t.prototype.diff_charsToLines_ = function(n, o) {
      for (var s = 0; s < n.length; s++) {
        for (var f = n[s][1], h = [], c = 0; c < f.length; c++)
          h[c] = o[f.charCodeAt(c)];
        n[s][1] = h.join("");
      }
    }, t.prototype.diff_commonPrefix = function(n, o) {
      if (!n || !o || n.charAt(0) != o.charAt(0))
        return 0;
      for (var s = 0, f = Math.min(n.length, o.length), h = f, c = 0; s < h; )
        n.substring(c, h) == o.substring(c, h) ? (s = h, c = s) : f = h, h = Math.floor((f - s) / 2 + s);
      return h;
    }, t.prototype.diff_commonSuffix = function(n, o) {
      if (!n || !o || n.charAt(n.length - 1) != o.charAt(o.length - 1))
        return 0;
      for (var s = 0, f = Math.min(n.length, o.length), h = f, c = 0; s < h; )
        n.substring(n.length - h, n.length - c) == o.substring(o.length - h, o.length - c) ? (s = h, c = s) : f = h, h = Math.floor((f - s) / 2 + s);
      return h;
    }, t.prototype.diff_commonOverlap_ = function(n, o) {
      var s = n.length, f = o.length;
      if (s == 0 || f == 0)
        return 0;
      s > f ? n = n.substring(s - f) : s < f && (o = o.substring(0, s));
      var h = Math.min(s, f);
      if (n == o)
        return h;
      for (var c = 0, l = 1; ; ) {
        var u = n.substring(h - l), d = o.indexOf(u);
        if (d == -1)
          return c;
        l += d, (d == 0 || n.substring(h - l) == o.substring(0, l)) && (c = l, l++);
      }
    }, t.prototype.diff_halfMatch_ = function(n, o) {
      if (this.Diff_Timeout <= 0)
        return null;
      var s = n.length > o.length ? n : o, f = n.length > o.length ? o : n;
      if (s.length < 4 || f.length * 2 < s.length)
        return null;
      var h = this;
      function c(E, y, _) {
        for (var k = E.substring(_, _ + Math.floor(E.length / 4)), N = -1, m = "", w, O, v, R; (N = y.indexOf(k, N + 1)) != -1; ) {
          var P = h.diff_commonPrefix(
            E.substring(_),
            y.substring(N)
          ), U = h.diff_commonSuffix(
            E.substring(0, _),
            y.substring(0, N)
          );
          m.length < U + P && (m = y.substring(N - U, N) + y.substring(N, N + P), w = E.substring(0, _ - U), O = E.substring(_ + P), v = y.substring(0, N - U), R = y.substring(N + P));
        }
        return m.length * 2 >= E.length ? [
          w,
          O,
          v,
          R,
          m
        ] : null;
      }
      var l = c(
        s,
        f,
        Math.ceil(s.length / 4)
      ), u = c(
        s,
        f,
        Math.ceil(s.length / 2)
      ), d;
      if (!l && !u)
        return null;
      u ? l ? d = l[4].length > u[4].length ? l : u : d = u : d = l;
      var g, b, T, A;
      n.length > o.length ? (g = d[0], b = d[1], T = d[2], A = d[3]) : (T = d[0], A = d[1], g = d[2], b = d[3]);
      var S = d[4];
      return [g, b, T, A, S];
    }, t.prototype.diff_cleanupSemantic = function(n) {
      for (var o = !1, s = [], f = 0, h = null, c = 0, l = 0, u = 0, d = 0, g = 0; c < n.length; )
        n[c][0] == a ? (s[f++] = c, l = d, u = g, d = 0, g = 0, h = n[c][1]) : (n[c][0] == r ? d += n[c][1].length : g += n[c][1].length, h && h.length <= Math.max(l, u) && h.length <= Math.max(
          d,
          g
        ) && (n.splice(
          s[f - 1],
          0,
          new t.Diff(i, h)
        ), n[s[f - 1] + 1][0] = r, f--, f--, c = f > 0 ? s[f - 1] : -1, l = 0, u = 0, d = 0, g = 0, h = null, o = !0)), c++;
      for (o && this.diff_cleanupMerge(n), this.diff_cleanupSemanticLossless(n), c = 1; c < n.length; ) {
        if (n[c - 1][0] == i && n[c][0] == r) {
          var b = n[c - 1][1], T = n[c][1], A = this.diff_commonOverlap_(b, T), S = this.diff_commonOverlap_(T, b);
          A >= S ? (A >= b.length / 2 || A >= T.length / 2) && (n.splice(c, 0, new t.Diff(
            a,
            T.substring(0, A)
          )), n[c - 1][1] = b.substring(0, b.length - A), n[c + 1][1] = T.substring(A), c++) : (S >= b.length / 2 || S >= T.length / 2) && (n.splice(c, 0, new t.Diff(
            a,
            b.substring(0, S)
          )), n[c - 1][0] = r, n[c - 1][1] = T.substring(0, T.length - S), n[c + 1][0] = i, n[c + 1][1] = b.substring(S), c++), c++;
        }
        c++;
      }
    }, t.prototype.diff_cleanupSemanticLossless = function(n) {
      function o(S, E) {
        if (!S || !E)
          return 6;
        var y = S.charAt(S.length - 1), _ = E.charAt(0), k = y.match(t.nonAlphaNumericRegex_), N = _.match(t.nonAlphaNumericRegex_), m = k && y.match(t.whitespaceRegex_), w = N && _.match(t.whitespaceRegex_), O = m && y.match(t.linebreakRegex_), v = w && _.match(t.linebreakRegex_), R = O && S.match(t.blanklineEndRegex_), P = v && E.match(t.blanklineStartRegex_);
        return R || P ? 5 : O || v ? 4 : k && !m && w ? 3 : m || w ? 2 : k || N ? 1 : 0;
      }
      for (var s = 1; s < n.length - 1; ) {
        if (n[s - 1][0] == a && n[s + 1][0] == a) {
          var f = n[s - 1][1], h = n[s][1], c = n[s + 1][1], l = this.diff_commonSuffix(f, h);
          if (l) {
            var u = h.substring(h.length - l);
            f = f.substring(0, f.length - l), h = u + h.substring(0, h.length - l), c = u + c;
          }
          for (var d = f, g = h, b = c, T = o(f, h) + o(h, c); h.charAt(0) === c.charAt(0); ) {
            f += h.charAt(0), h = h.substring(1) + c.charAt(0), c = c.substring(1);
            var A = o(f, h) + o(h, c);
            A >= T && (T = A, d = f, g = h, b = c);
          }
          n[s - 1][1] != d && (d ? n[s - 1][1] = d : (n.splice(s - 1, 1), s--), n[s][1] = g, b ? n[s + 1][1] = b : (n.splice(s + 1, 1), s--));
        }
        s++;
      }
    }, t.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, t.whitespaceRegex_ = /\s/, t.linebreakRegex_ = /[\r\n]/, t.blanklineEndRegex_ = /\n\r?\n$/, t.blanklineStartRegex_ = /^\r?\n\r?\n/, t.prototype.diff_cleanupEfficiency = function(n) {
      for (var o = !1, s = [], f = 0, h = null, c = 0, l = !1, u = !1, d = !1, g = !1; c < n.length; )
        n[c][0] == a ? (n[c][1].length < this.Diff_EditCost && (d || g) ? (s[f++] = c, l = d, u = g, h = n[c][1]) : (f = 0, h = null), d = g = !1) : (n[c][0] == i ? g = !0 : d = !0, h && (l && u && d && g || h.length < this.Diff_EditCost / 2 && l + u + d + g == 3) && (n.splice(
          s[f - 1],
          0,
          new t.Diff(i, h)
        ), n[s[f - 1] + 1][0] = r, f--, h = null, l && u ? (d = g = !0, f = 0) : (f--, c = f > 0 ? s[f - 1] : -1, d = g = !1), o = !0)), c++;
      o && this.diff_cleanupMerge(n);
    }, t.prototype.diff_cleanupMerge = function(n) {
      n.push(new t.Diff(a, ""));
      for (var o = 0, s = 0, f = 0, h = "", c = "", l; o < n.length; )
        switch (n[o][0]) {
          case r:
            f++, c += n[o][1], o++;
            break;
          case i:
            s++, h += n[o][1], o++;
            break;
          case a:
            s + f > 1 ? (s !== 0 && f !== 0 && (l = this.diff_commonPrefix(c, h), l !== 0 && (o - s - f > 0 && n[o - s - f - 1][0] == a ? n[o - s - f - 1][1] += c.substring(0, l) : (n.splice(0, 0, new t.Diff(
              a,
              c.substring(0, l)
            )), o++), c = c.substring(l), h = h.substring(l)), l = this.diff_commonSuffix(c, h), l !== 0 && (n[o][1] = c.substring(c.length - l) + n[o][1], c = c.substring(0, c.length - l), h = h.substring(0, h.length - l))), o -= s + f, n.splice(o, s + f), h.length && (n.splice(
              o,
              0,
              new t.Diff(i, h)
            ), o++), c.length && (n.splice(
              o,
              0,
              new t.Diff(r, c)
            ), o++), o++) : o !== 0 && n[o - 1][0] == a ? (n[o - 1][1] += n[o][1], n.splice(o, 1)) : o++, f = 0, s = 0, h = "", c = "";
            break;
        }
      n[n.length - 1][1] === "" && n.pop();
      var u = !1;
      for (o = 1; o < n.length - 1; )
        n[o - 1][0] == a && n[o + 1][0] == a && (n[o][1].substring(n[o][1].length - n[o - 1][1].length) == n[o - 1][1] ? (n[o][1] = n[o - 1][1] + n[o][1].substring(0, n[o][1].length - n[o - 1][1].length), n[o + 1][1] = n[o - 1][1] + n[o + 1][1], n.splice(o - 1, 1), u = !0) : n[o][1].substring(0, n[o + 1][1].length) == n[o + 1][1] && (n[o - 1][1] += n[o + 1][1], n[o][1] = n[o][1].substring(n[o + 1][1].length) + n[o + 1][1], n.splice(o + 1, 1), u = !0)), o++;
      u && this.diff_cleanupMerge(n);
    }, t.prototype.diff_xIndex = function(n, o) {
      var s = 0, f = 0, h = 0, c = 0, l;
      for (l = 0; l < n.length && (n[l][0] !== r && (s += n[l][1].length), n[l][0] !== i && (f += n[l][1].length), !(s > o)); l++)
        h = s, c = f;
      return n.length != l && n[l][0] === i ? c : c + (o - h);
    }, t.prototype.diff_prettyHtml = function(n) {
      for (var o = [], s = /&/g, f = /</g, h = />/g, c = /\n/g, l = 0; l < n.length; l++) {
        var u = n[l][0], d = n[l][1], g = d.replace(s, "&amp;").replace(f, "&lt;").replace(h, "&gt;").replace(c, "&para;<br>");
        switch (u) {
          case r:
            o[l] = '<ins style="background:#e6ffe6;">' + g + "</ins>";
            break;
          case i:
            o[l] = '<del style="background:#ffe6e6;">' + g + "</del>";
            break;
          case a:
            o[l] = "<span>" + g + "</span>";
            break;
        }
      }
      return o.join("");
    }, t.prototype.diff_text1 = function(n) {
      for (var o = [], s = 0; s < n.length; s++)
        n[s][0] !== r && (o[s] = n[s][1]);
      return o.join("");
    }, t.prototype.diff_text2 = function(n) {
      for (var o = [], s = 0; s < n.length; s++)
        n[s][0] !== i && (o[s] = n[s][1]);
      return o.join("");
    }, t.prototype.diff_levenshtein = function(n) {
      for (var o = 0, s = 0, f = 0, h = 0; h < n.length; h++) {
        var c = n[h][0], l = n[h][1];
        switch (c) {
          case r:
            s += l.length;
            break;
          case i:
            f += l.length;
            break;
          case a:
            o += Math.max(s, f), s = 0, f = 0;
            break;
        }
      }
      return o += Math.max(s, f), o;
    }, t.prototype.diff_toDelta = function(n) {
      for (var o = [], s = 0; s < n.length; s++)
        switch (n[s][0]) {
          case r:
            o[s] = "+" + encodeURI(n[s][1]);
            break;
          case i:
            o[s] = "-" + n[s][1].length;
            break;
          case a:
            o[s] = "=" + n[s][1].length;
            break;
        }
      return o.join("	").replace(/%20/g, " ");
    }, t.prototype.diff_fromDelta = function(n, o) {
      for (var s = [], f = 0, h = 0, c = o.split(/\t/g), l = 0; l < c.length; l++) {
        var u = c[l].substring(1);
        switch (c[l].charAt(0)) {
          case "+":
            try {
              s[f++] = new t.Diff(r, decodeURI(u));
            } catch {
              throw new Error("Illegal escape in diff_fromDelta: " + u);
            }
            break;
          case "-":
          // Fall through.
          case "=":
            var d = parseInt(u, 10);
            if (isNaN(d) || d < 0)
              throw new Error("Invalid number in diff_fromDelta: " + u);
            var g = n.substring(h, h += d);
            c[l].charAt(0) == "=" ? s[f++] = new t.Diff(a, g) : s[f++] = new t.Diff(i, g);
            break;
          default:
            if (c[l])
              throw new Error("Invalid diff operation in diff_fromDelta: " + c[l]);
        }
      }
      if (h != n.length)
        throw new Error("Delta length (" + h + ") does not equal source text length (" + n.length + ").");
      return s;
    }, t.prototype.match_main = function(n, o, s) {
      if (n == null || o == null || s == null)
        throw new Error("Null input. (match_main)");
      return s = Math.max(0, Math.min(s, n.length)), n == o ? 0 : n.length ? n.substring(s, s + o.length) == o ? s : this.match_bitap_(n, o, s) : -1;
    }, t.prototype.match_bitap_ = function(n, o, s) {
      if (o.length > this.Match_MaxBits)
        throw new Error("Pattern too long for this browser.");
      var f = this.match_alphabet_(o), h = this;
      function c(w, O) {
        var v = w / o.length, R = Math.abs(s - O);
        return h.Match_Distance ? v + R / h.Match_Distance : R ? 1 : v;
      }
      var l = this.Match_Threshold, u = n.indexOf(o, s);
      u != -1 && (l = Math.min(c(0, u), l), u = n.lastIndexOf(o, s + o.length), u != -1 && (l = Math.min(c(0, u), l)));
      var d = 1 << o.length - 1;
      u = -1;
      for (var g, b, T = o.length + n.length, A, S = 0; S < o.length; S++) {
        for (g = 0, b = T; g < b; )
          c(S, s + b) <= l ? g = b : T = b, b = Math.floor((T - g) / 2 + g);
        T = b;
        var E = Math.max(1, s - b + 1), y = Math.min(s + b, n.length) + o.length, _ = Array(y + 2);
        _[y + 1] = (1 << S) - 1;
        for (var k = y; k >= E; k--) {
          var N = f[n.charAt(k - 1)];
          if (S === 0 ? _[k] = (_[k + 1] << 1 | 1) & N : _[k] = (_[k + 1] << 1 | 1) & N | ((A[k + 1] | A[k]) << 1 | 1) | A[k + 1], _[k] & d) {
            var m = c(S, k - 1);
            if (m <= l)
              if (l = m, u = k - 1, u > s)
                E = Math.max(1, 2 * s - u);
              else
                break;
          }
        }
        if (c(S + 1, s) > l)
          break;
        A = _;
      }
      return u;
    }, t.prototype.match_alphabet_ = function(n) {
      for (var o = {}, s = 0; s < n.length; s++)
        o[n.charAt(s)] = 0;
      for (var s = 0; s < n.length; s++)
        o[n.charAt(s)] |= 1 << n.length - s - 1;
      return o;
    }, t.prototype.patch_addContext_ = function(n, o) {
      if (o.length != 0) {
        if (n.start2 === null)
          throw Error("patch not initialized");
        for (var s = o.substring(n.start2, n.start2 + n.length1), f = 0; o.indexOf(s) != o.lastIndexOf(s) && s.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
          f += this.Patch_Margin, s = o.substring(
            n.start2 - f,
            n.start2 + n.length1 + f
          );
        f += this.Patch_Margin;
        var h = o.substring(n.start2 - f, n.start2);
        h && n.diffs.unshift(new t.Diff(a, h));
        var c = o.substring(
          n.start2 + n.length1,
          n.start2 + n.length1 + f
        );
        c && n.diffs.push(new t.Diff(a, c)), n.start1 -= h.length, n.start2 -= h.length, n.length1 += h.length + c.length, n.length2 += h.length + c.length;
      }
    }, t.prototype.patch_make = function(n, o, s) {
      var f, h;
      if (typeof n == "string" && typeof o == "string" && typeof s > "u")
        f = /** @type {string} */
        n, h = this.diff_main(
          f,
          /** @type {string} */
          o,
          !0
        ), h.length > 2 && (this.diff_cleanupSemantic(h), this.diff_cleanupEfficiency(h));
      else if (n && typeof n == "object" && typeof o > "u" && typeof s > "u")
        h = /** @type {!Array.<!diff_match_patch.Diff>} */
        n, f = this.diff_text1(h);
      else if (typeof n == "string" && o && typeof o == "object" && typeof s > "u")
        f = /** @type {string} */
        n, h = /** @type {!Array.<!diff_match_patch.Diff>} */
        o;
      else if (typeof n == "string" && typeof o == "string" && s && typeof s == "object")
        f = /** @type {string} */
        n, h = /** @type {!Array.<!diff_match_patch.Diff>} */
        s;
      else
        throw new Error("Unknown call format to patch_make.");
      if (h.length === 0)
        return [];
      for (var c = [], l = new t.patch_obj(), u = 0, d = 0, g = 0, b = f, T = f, A = 0; A < h.length; A++) {
        var S = h[A][0], E = h[A][1];
        switch (!u && S !== a && (l.start1 = d, l.start2 = g), S) {
          case r:
            l.diffs[u++] = h[A], l.length2 += E.length, T = T.substring(0, g) + E + T.substring(g);
            break;
          case i:
            l.length1 += E.length, l.diffs[u++] = h[A], T = T.substring(0, g) + T.substring(g + E.length);
            break;
          case a:
            E.length <= 2 * this.Patch_Margin && u && h.length != A + 1 ? (l.diffs[u++] = h[A], l.length1 += E.length, l.length2 += E.length) : E.length >= 2 * this.Patch_Margin && u && (this.patch_addContext_(l, b), c.push(l), l = new t.patch_obj(), u = 0, b = T, d = g);
            break;
        }
        S !== r && (d += E.length), S !== i && (g += E.length);
      }
      return u && (this.patch_addContext_(l, b), c.push(l)), c;
    }, t.prototype.patch_deepCopy = function(n) {
      for (var o = [], s = 0; s < n.length; s++) {
        var f = n[s], h = new t.patch_obj();
        h.diffs = [];
        for (var c = 0; c < f.diffs.length; c++)
          h.diffs[c] = new t.Diff(f.diffs[c][0], f.diffs[c][1]);
        h.start1 = f.start1, h.start2 = f.start2, h.length1 = f.length1, h.length2 = f.length2, o[s] = h;
      }
      return o;
    }, t.prototype.patch_apply = function(n, o) {
      if (n.length == 0)
        return [o, []];
      n = this.patch_deepCopy(n);
      var s = this.patch_addPadding(n);
      o = s + o + s, this.patch_splitMax(n);
      for (var f = 0, h = [], c = 0; c < n.length; c++) {
        var l = n[c].start2 + f, u = this.diff_text1(n[c].diffs), d, g = -1;
        if (u.length > this.Match_MaxBits ? (d = this.match_main(
          o,
          u.substring(0, this.Match_MaxBits),
          l
        ), d != -1 && (g = this.match_main(
          o,
          u.substring(u.length - this.Match_MaxBits),
          l + u.length - this.Match_MaxBits
        ), (g == -1 || d >= g) && (d = -1))) : d = this.match_main(o, u, l), d == -1)
          h[c] = !1, f -= n[c].length2 - n[c].length1;
        else {
          h[c] = !0, f = d - l;
          var b;
          if (g == -1 ? b = o.substring(d, d + u.length) : b = o.substring(d, g + this.Match_MaxBits), u == b)
            o = o.substring(0, d) + this.diff_text2(n[c].diffs) + o.substring(d + u.length);
          else {
            var T = this.diff_main(u, b, !1);
            if (u.length > this.Match_MaxBits && this.diff_levenshtein(T) / u.length > this.Patch_DeleteThreshold)
              h[c] = !1;
            else {
              this.diff_cleanupSemanticLossless(T);
              for (var A = 0, S, E = 0; E < n[c].diffs.length; E++) {
                var y = n[c].diffs[E];
                y[0] !== a && (S = this.diff_xIndex(T, A)), y[0] === r ? o = o.substring(0, d + S) + y[1] + o.substring(d + S) : y[0] === i && (o = o.substring(0, d + S) + o.substring(d + this.diff_xIndex(
                  T,
                  A + y[1].length
                ))), y[0] !== i && (A += y[1].length);
              }
            }
          }
        }
      }
      return o = o.substring(s.length, o.length - s.length), [o, h];
    }, t.prototype.patch_addPadding = function(n) {
      for (var o = this.Patch_Margin, s = "", f = 1; f <= o; f++)
        s += String.fromCharCode(f);
      for (var f = 0; f < n.length; f++)
        n[f].start1 += o, n[f].start2 += o;
      var h = n[0], c = h.diffs;
      if (c.length == 0 || c[0][0] != a)
        c.unshift(new t.Diff(a, s)), h.start1 -= o, h.start2 -= o, h.length1 += o, h.length2 += o;
      else if (o > c[0][1].length) {
        var l = o - c[0][1].length;
        c[0][1] = s.substring(c[0][1].length) + c[0][1], h.start1 -= l, h.start2 -= l, h.length1 += l, h.length2 += l;
      }
      if (h = n[n.length - 1], c = h.diffs, c.length == 0 || c[c.length - 1][0] != a)
        c.push(new t.Diff(a, s)), h.length1 += o, h.length2 += o;
      else if (o > c[c.length - 1][1].length) {
        var l = o - c[c.length - 1][1].length;
        c[c.length - 1][1] += s.substring(0, l), h.length1 += l, h.length2 += l;
      }
      return s;
    }, t.prototype.patch_splitMax = function(n) {
      for (var o = this.Match_MaxBits, s = 0; s < n.length; s++)
        if (!(n[s].length1 <= o)) {
          var f = n[s];
          n.splice(s--, 1);
          for (var h = f.start1, c = f.start2, l = ""; f.diffs.length !== 0; ) {
            var u = new t.patch_obj(), d = !0;
            for (u.start1 = h - l.length, u.start2 = c - l.length, l !== "" && (u.length1 = u.length2 = l.length, u.diffs.push(new t.Diff(a, l))); f.diffs.length !== 0 && u.length1 < o - this.Patch_Margin; ) {
              var g = f.diffs[0][0], b = f.diffs[0][1];
              g === r ? (u.length2 += b.length, c += b.length, u.diffs.push(f.diffs.shift()), d = !1) : g === i && u.diffs.length == 1 && u.diffs[0][0] == a && b.length > 2 * o ? (u.length1 += b.length, h += b.length, d = !1, u.diffs.push(new t.Diff(g, b)), f.diffs.shift()) : (b = b.substring(
                0,
                o - u.length1 - this.Patch_Margin
              ), u.length1 += b.length, h += b.length, g === a ? (u.length2 += b.length, c += b.length) : d = !1, u.diffs.push(new t.Diff(g, b)), b == f.diffs[0][1] ? f.diffs.shift() : f.diffs[0][1] = f.diffs[0][1].substring(b.length));
            }
            l = this.diff_text2(u.diffs), l = l.substring(l.length - this.Patch_Margin);
            var T = this.diff_text1(f.diffs).substring(0, this.Patch_Margin);
            T !== "" && (u.length1 += T.length, u.length2 += T.length, u.diffs.length !== 0 && u.diffs[u.diffs.length - 1][0] === a ? u.diffs[u.diffs.length - 1][1] += T : u.diffs.push(new t.Diff(a, T))), d || n.splice(++s, 0, u);
          }
        }
    }, t.prototype.patch_toText = function(n) {
      for (var o = [], s = 0; s < n.length; s++)
        o[s] = n[s];
      return o.join("");
    }, t.prototype.patch_fromText = function(n) {
      var o = [];
      if (!n)
        return o;
      for (var s = n.split(`
`), f = 0, h = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; f < s.length; ) {
        var c = s[f].match(h);
        if (!c)
          throw new Error("Invalid patch string: " + s[f]);
        var l = new t.patch_obj();
        for (o.push(l), l.start1 = parseInt(c[1], 10), c[2] === "" ? (l.start1--, l.length1 = 1) : c[2] == "0" ? l.length1 = 0 : (l.start1--, l.length1 = parseInt(c[2], 10)), l.start2 = parseInt(c[3], 10), c[4] === "" ? (l.start2--, l.length2 = 1) : c[4] == "0" ? l.length2 = 0 : (l.start2--, l.length2 = parseInt(c[4], 10)), f++; f < s.length; ) {
          var u = s[f].charAt(0);
          try {
            var d = decodeURI(s[f].substring(1));
          } catch {
            throw new Error("Illegal escape in patch_fromText: " + d);
          }
          if (u == "-")
            l.diffs.push(new t.Diff(i, d));
          else if (u == "+")
            l.diffs.push(new t.Diff(r, d));
          else if (u == " ")
            l.diffs.push(new t.Diff(a, d));
          else {
            if (u == "@")
              break;
            if (u !== "") throw new Error('Invalid patch mode "' + u + '" in: ' + d);
          }
          f++;
        }
      }
      return o;
    }, t.patch_obj = function() {
      this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
    }, t.patch_obj.prototype.toString = function() {
      var n, o;
      this.length1 === 0 ? n = this.start1 + ",0" : this.length1 == 1 ? n = this.start1 + 1 : n = this.start1 + 1 + "," + this.length1, this.length2 === 0 ? o = this.start2 + ",0" : this.length2 == 1 ? o = this.start2 + 1 : o = this.start2 + 1 + "," + this.length2;
      for (var s = ["@@ -" + n + " +" + o + ` @@
`], f, h = 0; h < this.diffs.length; h++) {
        switch (this.diffs[h][0]) {
          case r:
            f = "+";
            break;
          case i:
            f = "-";
            break;
          case a:
            f = " ";
            break;
        }
        s[h + 1] = f + encodeURI(this.diffs[h][1]) + `
`;
      }
      return s.join("").replace(/%20/g, " ");
    }, e.exports = t, e.exports.diff_match_patch = t, e.exports.DIFF_DELETE = i, e.exports.DIFF_INSERT = r, e.exports.DIFF_EQUAL = a;
  })(Ui)), Ui.exports;
}
var w0 = b0();
const E0 = /* @__PURE__ */ y0(w0);
new E0();
(!globalThis.EventTarget || !globalThis.Event) && console.error(`
  PartySocket requires a global 'EventTarget' class to be available!
  You can polyfill this global by adding this to your code before any partysocket imports: 
  
  \`\`\`
  import 'partysocket/event-target-polyfill';
  \`\`\`
  Please file an issue at https://github.com/partykit/partykit if you're still having trouble.
`);
var Aa;
typeof process < "u" && typeof ((Aa = process.versions) == null ? void 0 : Aa.node) < "u" && typeof document > "u";
/*!
 * Reconnecting WebSocket
 * by Pedro Ladaria <pedro.ladaria@gmail.com>
 * https://github.com/pladaria/reconnecting-websocket
 * License MIT
 */
const m0 = [
  {
    path: "fonts/Assistant/Assistant-Bold.woff2",
    mediaType: "font/woff2",
    size: 20380,
    integrity: "sha256-4M3TMs4Dl3DpPsRDNrbbZfkxlA9CsDQqrTWgbn+ZHSk="
  },
  {
    path: "fonts/Assistant/Assistant-Medium.woff2",
    mediaType: "font/woff2",
    size: 20320,
    integrity: "sha256-ganygM5qeQ8gyozVIRg8qkMPH3/cB1LDbvHMbcgorFc="
  },
  {
    path: "fonts/Assistant/Assistant-Regular.woff2",
    mediaType: "font/woff2",
    size: 20232,
    integrity: "sha256-dpRfCSJarmW9vSBMtKxA1Mqk/2cVDlB0urGgTRt3j8M="
  },
  {
    path: "fonts/Assistant/Assistant-SemiBold.woff2",
    mediaType: "font/woff2",
    size: 20212,
    integrity: "sha256-u6R6fRsYWkouDSZeyCrqxdvC3Jyw9IKi/1fL3+TlBF0="
  },
  {
    path: "fonts/Cascadia/CascadiaCode-Regular.woff2",
    mediaType: "font/woff2",
    size: 65732,
    integrity: "sha256-W84EHg/M5hfjXvvDNbE3LSeoSstl+0ZMZf+AqzQkqIU="
  },
  {
    path: "fonts/ComicShanns/ComicShanns-Regular-279a7b317d12eb88de06167bd672b4b4.woff2",
    mediaType: "font/woff2",
    size: 17488,
    integrity: "sha256-+pMPzrUppLUbowVdWQMCciwncE9qY1dJWHOVATax4uo="
  },
  {
    path: "fonts/ComicShanns/ComicShanns-Regular-6e066e8de2ac57ea9283adb9c24d7f0c.woff2",
    mediaType: "font/woff2",
    size: 1292,
    integrity: "sha256-eC8kCBuBC43p8E2gVQB85PFEXBirvwlsgx+IiNZZNcE="
  },
  {
    path: "fonts/ComicShanns/ComicShanns-Regular-dc6a8806fa96795d7b3be5026f989a17.woff2",
    mediaType: "font/woff2",
    size: 2816,
    integrity: "sha256-YcN20y4Xc1iPYWNZmu0k/gOHtaXLYivSAEVfIMKzaoc="
  },
  {
    path: "fonts/ComicShanns/ComicShanns-Regular-fcb0fc02dcbee4c9846b3e2508668039.woff2",
    mediaType: "font/woff2",
    size: 9856,
    integrity: "sha256-7mQcLjVzDD5uOCaFXxtsw7NDoBfD4hbk5KLkcBDFOtE="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-349fac6ca4700ffec595a7150a0d1e1d.woff2",
    mediaType: "font/woff2",
    size: 2656,
    integrity: "sha256-oGN8/zZcc0TS96FZBaH3Tc6vVrWsL/kT0VA1i+1pIfA="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-3f2c5db56cc93c5a6873b1361d730c16.woff2",
    mediaType: "font/woff2",
    size: 2104,
    integrity: "sha256-GOqb4d1rWmewV/ROuo40yykPiDCMJyvPNcecGiINDXs="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-41b173a47b57366892116a575a43e2b6.woff2",
    mediaType: "font/woff2",
    size: 8712,
    integrity: "sha256-yWZJpfluL6qRQ+6U5bWQta+wgJL41nxn8JzvMy1m5Kc="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-623ccf21b21ef6b3a0d87738f77eb071.woff2",
    mediaType: "font/woff2",
    size: 824,
    integrity: "sha256-sAQAe+EAJh5YGIz4oPfoUOmXcC811XEQkVmVzYgOSfE="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2",
    mediaType: "font/woff2",
    size: 24956,
    integrity: "sha256-5EI7MY4RQyr/Lm6GXjALfKJw+SMho/VmMiaP7eAcG0g="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-b9dcf9d2e50a1eaf42fc664b50a3fd0d.woff2",
    mediaType: "font/woff2",
    size: 13296,
    integrity: "sha256-tCTRbaQ5i+PphShXpU/3DgQ8ji7FxERNv3+I10abmFk="
  },
  {
    path: "fonts/Excalifont/Excalifont-Regular-be310b9bcd4f1a43f571c46df7809174.woff2",
    mediaType: "font/woff2",
    size: 12220,
    integrity: "sha256-T7itab6a6sVmTZnlqjpoon6kDJiUO4A4f3zVXANPzJM="
  },
  {
    path: "fonts/Liberation/LiberationSans-Regular.woff2",
    mediaType: "font/woff2",
    size: 70668,
    integrity: "sha256-AGorKMu+6uyTfRs2fQlJ9fSO9LLntOHY3Hp5nS1jm+g="
  },
  {
    path: "fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYE98RXi4EwSsbg.woff2",
    mediaType: "font/woff2",
    size: 1416,
    integrity: "sha256-K2Vox6DxYwC8bI0pK9Qmw2H820BpnCy/qyvT6eaZPeo="
  },
  {
    path: "fonts/Lilita/Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ.woff2",
    mediaType: "font/woff2",
    size: 10676,
    integrity: "sha256-jWzQ8phzipLKm/bhP1SpGRr9Bs4E6gDrvyRJnAFxkbc="
  },
  {
    path: "fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTA3j6zbXWjgevT5.woff2",
    mediaType: "font/woff2",
    size: 8392,
    integrity: "sha256-5RLy18n+Bisaz49upk1L/YmnfSZygVCXdifkRce26Tc="
  },
  {
    path: "fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTk3j6zbXWjgevT5.woff2",
    mediaType: "font/woff2",
    size: 11104,
    integrity: "sha256-Pn92/Mh5i4u6TWvMBr2w14j26JcGwdbmSsgdZcpoPBQ="
  },
  {
    path: "fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTo3j6zbXWjgevT5.woff2",
    mediaType: "font/woff2",
    size: 15476,
    integrity: "sha256-eSj0eyEZLLb9svRrcaR0o70v1giUXFrX1+1r3osK4kw="
  },
  {
    path: "fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTQ3j6zbXWjgeg.woff2",
    mediaType: "font/woff2",
    size: 16476,
    integrity: "sha256-bRYmqsZYeG43544K3OP//929davJI9cuRacWi9gAU9o="
  },
  {
    path: "fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTs3j6zbXWjgevT5.woff2",
    mediaType: "font/woff2",
    size: 6116,
    integrity: "sha256-URc5gpjdDbo8laQG/xL764gon6TpE+Olz0gsr+f3Bxo="
  },
  {
    path: "fonts/Virgil/Virgil-Regular.woff2",
    mediaType: "font/woff2",
    size: 56156,
    integrity: "sha256-InnPfa8cQqOlOywUN61y8AUO+2esJj4CRfZ2Ev12ZxQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-019d66dcad46dc156b162d267f981c20.woff2",
    mediaType: "font/woff2",
    size: 58580,
    integrity: "sha256-dAStgIbPI4JpxvaqPst1TayQPHsovojR9oO56rfEY+Y="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-04b718e5623574919c8b0dea5f301444.woff2",
    mediaType: "font/woff2",
    size: 65928,
    integrity: "sha256-z99nuX1e7kPwbU/WyNihE21m4zkcNQA0HO9BvzlnJVk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-069e77aac84590e2e991d0a0176d34f2.woff2",
    mediaType: "font/woff2",
    size: 63964,
    integrity: "sha256-mo5SGiTlMcvq370nUBCMSK75wPE7DAhA4syfrjJXrtQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-06c77b8c66e51ed6c63ccb502dd8b8af.woff2",
    mediaType: "font/woff2",
    size: 55108,
    integrity: "sha256-zC5VOVQhjMQ/X2989UE21NCkMXuI1nCuGUB5dUW97GE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-08e0dc436ad0ad61ba5558db0674d762.woff2",
    mediaType: "font/woff2",
    size: 49736,
    integrity: "sha256-EBlgxwnEoUahgfACgIhhJJ/hPt4o/C2c/yQXVxUZGrw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-093b9ef39a46ceae95a1df18a0a3a326.woff2",
    mediaType: "font/woff2",
    size: 55712,
    integrity: "sha256-gZu8rCRo4bRDY0Qrygp6iUiDwyzlz5so9wfZQwSoo+0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-095c169f3314805276f603a362766abd.woff2",
    mediaType: "font/woff2",
    size: 69968,
    integrity: "sha256-fwW62w7bMRGMaapvm9ILE+c3tXGfgWYX00KlDcUclQY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-09850c4077f3fffe707905872e0e2460.woff2",
    mediaType: "font/woff2",
    size: 65048,
    integrity: "sha256-TNCQ84CoKVAgjl/wuDtj+C2amYiB36Eqi4qObH/SmL8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-0986d134c05864f5025962eef9f994a0.woff2",
    mediaType: "font/woff2",
    size: 53764,
    integrity: "sha256-ds3IAedTaeAf4JB/DmA6aZ3M8foNiApxe43OsMh1GAY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-0b5d723fdc4e249c140f0909e87d03b4.woff2",
    mediaType: "font/woff2",
    size: 53672,
    integrity: "sha256-Slq2NKaDnpgzRGRdgtMdhaF4b9ToHTRPhUQYEViobEU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-0f626226ba1272e832aea87bafd9720e.woff2",
    mediaType: "font/woff2",
    size: 62820,
    integrity: "sha256-wmHeVkOgtv3+s/psQ1SNxicPGXVlMsKVOkyPdKG7Zw0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-0f7fb1e0d5015bb1371343153ecf7ce3.woff2",
    mediaType: "font/woff2",
    size: 75564,
    integrity: "sha256-fZICLpAFY2x3jrzLicqKs6F8fZnhcgHEIs6DPk1ODgQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-0fa55a080fcd0f9dc2e0b0058b793df8.woff2",
    mediaType: "font/woff2",
    size: 65884,
    integrity: "sha256-o1MesVIY7KKCGWQF3KXlAqCwzhTYKCTuXDEE4kHxLFY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-0facdf1ea213ba40261022f5d5ed4493.woff2",
    mediaType: "font/woff2",
    size: 50660,
    integrity: "sha256-RpIBnT8BH/K4wBLvTVvLnWSSWbs+aLjV7e0G/V9pSP8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-10a7ae9a371830a80c3d844acf1c02d7.woff2",
    mediaType: "font/woff2",
    size: 68908,
    integrity: "sha256-ND6BoCJc8ISKDFw98RWJq6E4ao6pVPpUndh0k4TlTBU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-112c051027b2d766c19a519f6ee1f4f7.woff2",
    mediaType: "font/woff2",
    size: 61160,
    integrity: "sha256-ZNVSHKSxkeQUIsKh53Wq5DqDGnIKlsZLQtcKIinhvsc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-11c345711937f0ba4b8f7b6b919c8440.woff2",
    mediaType: "font/woff2",
    size: 62792,
    integrity: "sha256-y1zFOAqohebqLZUC8VZz/+HpbQio4kDK3IqannJ6hdI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-12b52b58eb3df36804b9a654ec9ee194.woff2",
    mediaType: "font/woff2",
    size: 57152,
    integrity: "sha256-0QE34DUYXjYhKp7HDqjCsLEPMLF1+VQ/V0Eqb0ir/d8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-13ae07ed2e272d26d59bc0691cd7117a.woff2",
    mediaType: "font/woff2",
    size: 56140,
    integrity: "sha256-Tw24nnCGte7zqD3EHYHuPUb51652HhUOVoloTpXOsCI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-13d2887ec8ee73c43acdabc52a05af7b.woff2",
    mediaType: "font/woff2",
    size: 64436,
    integrity: "sha256-uKPxrCMj2yoe8ijwIb49E7EZDtfB9K9rDVDQxNRUrbw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-145aa02cdd91946e67dc934e1acffe75.woff2",
    mediaType: "font/woff2",
    size: 37412,
    integrity: "sha256-lvaW3QHyU0zspopsl5X5J8fB3SdvfpcGnMfXbYXJFWw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-15dc6d811c9cd078f9086a740d5a1038.woff2",
    mediaType: "font/woff2",
    size: 53168,
    integrity: "sha256-ti6IdZ6D5omKfHWI+Fh9Bkq6GFuea5t5wVwix7GVIl8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-173945821411c09f70c95f98d590e697.woff2",
    mediaType: "font/woff2",
    size: 73576,
    integrity: "sha256-71aTzSMNzGehIM9ifVnZtmrKt7jzVvmjbDoeLt9Hnwo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-1b611157cd46bb184d4fa4dae2d6a2b8.woff2",
    mediaType: "font/woff2",
    size: 64828,
    integrity: "sha256-W3kVQFjyR9ATplYboHCwRJEbMgbocs6KJHY5IkX53ic="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-1e6fd68f1f3902ce48ce8c69df385622.woff2",
    mediaType: "font/woff2",
    size: 57384,
    integrity: "sha256-eh25G43n3uYEZ+r6OQr1qm6K0xPmtvtiwx56A+om84U="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-1ee544f0f1dac422545c505baa788992.woff2",
    mediaType: "font/woff2",
    size: 51728,
    integrity: "sha256-TEeMBjiw7eJYOIBdb5m63MV/vwIuRFYskZTAx1EY8cE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-1fdc0c67ed57263a80fd108c1f6ccf24.woff2",
    mediaType: "font/woff2",
    size: 56004,
    integrity: "sha256-zcRDwCLoMAlm+R7IsxhZU1eZed1b/7zGa0mP5rcebDk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-203b0e569e3b14aac86a003dc3fa523e.woff2",
    mediaType: "font/woff2",
    size: 75216,
    integrity: "sha256-3fw81hfoPicRkKAfz+uGJc1f+cEFyjYsiAS392LllbI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-20cc1bbf50e7efb442756cb605672c1f.woff2",
    mediaType: "font/woff2",
    size: 56932,
    integrity: "sha256-J9zm83Ni9K0UldqG6aqeyAgjfUHWnT8vE9VMy/5QTIM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-20e7bf72fa05de9adf7dbcc7bf51dde6.woff2",
    mediaType: "font/woff2",
    size: 72224,
    integrity: "sha256-2XQqAY0X/qHaclVlAu8g0CtcuA3dVx5Tm2DOJs0Z1N8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-21430ee05a1248901da8d0de08744d47.woff2",
    mediaType: "font/woff2",
    size: 56656,
    integrity: "sha256-19cTCsSlzlz18KAfQIJnEzzeFu8pZt+zWp/Fo392LPg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-23686f7f29da6e8008c36dd3a80c83d6.woff2",
    mediaType: "font/woff2",
    size: 68952,
    integrity: "sha256-q2C2lQBGjoHrOmeWuOI1YGmeLeG+WWlWvRgyJW+unUQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-23ad2d71b280f00b1363b95b7bea94eb.woff2",
    mediaType: "font/woff2",
    size: 68324,
    integrity: "sha256-6N7HHY7eG5ufPXMl4eoxQyR0qDCVcZvSFJhS/vR5TtU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-23f228f3999c01983860012330e4be08.woff2",
    mediaType: "font/woff2",
    size: 54732,
    integrity: "sha256-IKcjKYmHivytbehLaIcvrK+W+4XGgn8EV9Uywcv2u8w="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-24476a126f129212beb33f66853ea151.woff2",
    mediaType: "font/woff2",
    size: 62844,
    integrity: "sha256-wMFH6RajKoYwby+YZJgth/30G2oMPR7XfCqr0u13KpQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-24a21c1e4449222e8d1898d69ff3a404.woff2",
    mediaType: "font/woff2",
    size: 66072,
    integrity: "sha256-5J8QY/3beSj1DGSQkS30vOEEJ5W9NyzgZzzA2HvuxVk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-25b7f38e18f035f96cb5e547bd2bd08c.woff2",
    mediaType: "font/woff2",
    size: 65836,
    integrity: "sha256-puxLqiXXN7SVJsFStpqY5mNz46sqM3yhx6iV16bYtFs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-29cec36cd205b211da97acabaa62f055.woff2",
    mediaType: "font/woff2",
    size: 66504,
    integrity: "sha256-mrRw32xFago3ZSH1L8ioV4Sa0VxkC2yPrgIPvesM3gs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2a26d20a23b00898ce82f09d2ee47c3f.woff2",
    mediaType: "font/woff2",
    size: 63388,
    integrity: "sha256-2FRxpJgj6HV6+cHH2SD7+0zNuWYOBve0PqKyMltDjQ8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2adbc89c11e65905393d3dfc468b9d5b.woff2",
    mediaType: "font/woff2",
    size: 58256,
    integrity: "sha256-iWqRRfMsbbbrbM3/mYaFnwjjSfUFYo3Z7v8hOd72dcw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2b7441d46298788ac94e610ffcc709b6.woff2",
    mediaType: "font/woff2",
    size: 46548,
    integrity: "sha256-0Ek+3UtwqrbnxNeL4dWXbS+wETxIbyC8IRTY0Pglb10="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2b77e8ebfb2367ab2662396a60e7d320.woff2",
    mediaType: "font/woff2",
    size: 52492,
    integrity: "sha256-bLpWdYkGfhgt0GBU+iTlLOXorI0HJ4hhEl47b20tKjE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2cf96d082d35ea3d8106851223ad0d16.woff2",
    mediaType: "font/woff2",
    size: 59524,
    integrity: "sha256-cUYm+X54tO5y+TVAikhQjp+YVTmUKboj3Aye8PQHQ2g="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2d43040e86ff03ba677f6f9c04cd0805.woff2",
    mediaType: "font/woff2",
    size: 58088,
    integrity: "sha256-yxrI+Hw+TC492SVIDitsZZEArNWSZulXBlcIxcRtc4U="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-2e33e8dc771ef5e1d9127d60a6b73679.woff2",
    mediaType: "font/woff2",
    size: 69776,
    integrity: "sha256-E5QXg9xZdU8rzc08VOe7Zl5DP8H/4cr6Dic93NT2Lb4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-33432927cd87d40cfe393c7482bf221f.woff2",
    mediaType: "font/woff2",
    size: 53216,
    integrity: "sha256-mypstHnRs9KWalvrk7pj8w1rBeg8KYWz+aq0R9gCpLU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-353f33792a8f60dc69323ddf635a269e.woff2",
    mediaType: "font/woff2",
    size: 54160,
    integrity: "sha256-ruRWflSoQoBnd0y8ycqPry2buxDQp4CjdMlQ0obh2NM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-36925dfe329a45086cbb7fc5c20d45ac.woff2",
    mediaType: "font/woff2",
    size: 60896,
    integrity: "sha256-VC/W8Psuq80s/Xmwzsr7N2aRqnSvz79xjI0mFg0M2as="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3717077e38f98d89eae729b6c14e56dc.woff2",
    mediaType: "font/woff2",
    size: 54628,
    integrity: "sha256-NHGNOrLhU+pmmU+bIEdcdry+Ycc9zva31AlvDuwu72s="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3756e81d3e149cf6099163ee79944fec.woff2",
    mediaType: "font/woff2",
    size: 51596,
    integrity: "sha256-nbWWGTXxLK1BcmqoHAjJeDtsceyq99/qHkuPV2je+00="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-395c35dd584b56b0789f58a0559beaf1.woff2",
    mediaType: "font/woff2",
    size: 73932,
    integrity: "sha256-jWu1CXJaJ81M3i2q90O+jsdBFK03Ga3UyAXNHC/dDxM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3c9de2ae0ea4bc91a510942dfa4be8d2.woff2",
    mediaType: "font/woff2",
    size: 58040,
    integrity: "sha256-nE5TXnQdahPsNrspCQWNsTIZGcsUVh5mHGK+jw/9p/k="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3cc70dbb64df5b21f1326cc24dee2195.woff2",
    mediaType: "font/woff2",
    size: 64936,
    integrity: "sha256-caMofomY5HAWtRWa4D9jaTlRa09bJR7nHwxaUhLk32s="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3e1f8f654357353bf0e04ba5c34b5f7f.woff2",
    mediaType: "font/woff2",
    size: 69020,
    integrity: "sha256-jDiH/OlDV1kBnh7Lo+4xUWTQ+KWYziS5TIv+zru3JKQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3e63ed8162808a9e425ed80a8bc79114.woff2",
    mediaType: "font/woff2",
    size: 73700,
    integrity: "sha256-z6/ncAbEu9fs4iMac1+MIZo/qmgx1NVzOrFL2Rd5FXo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-3eaa538115d76932653c21d8dc28f207.woff2",
    mediaType: "font/woff2",
    size: 70944,
    integrity: "sha256-BKexJEwnKkbKdAk34aPnkOj/FC1vz1OTS+DkoWfqzck="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4095eb84ef3874e2600247bee0b04026.woff2",
    mediaType: "font/woff2",
    size: 76200,
    integrity: "sha256-arasNWwxPZjSbJoj6bHVI5Mwl0sJDYq6gYTOmcJPzxY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-41521fade99856108931b4768b1b2648.woff2",
    mediaType: "font/woff2",
    size: 68208,
    integrity: "sha256-LAluSoQ4ltLXNcjxm44ujhKTIC0uCkGt+rFpleMq4H4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-450da755d5bcb70906e1295e559b9602.woff2",
    mediaType: "font/woff2",
    size: 51332,
    integrity: "sha256-4H/cuIbrL5CkmyLj02nrH0gP3vfFCSSdBDe6la867cY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-452225341522a7942f0f6aab1a5c91a3.woff2",
    mediaType: "font/woff2",
    size: 71640,
    integrity: "sha256-pDJxX2/thJmkIMtErP6PceYAr+CqNA/y5jt0H6Bfb64="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4535823663ad81405188a528d8f2b1a2.woff2",
    mediaType: "font/woff2",
    size: 68592,
    integrity: "sha256-88cvCUZZry5vvbsOXbqRCJxPWZDUed2bvl+lrk+Vq0E="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4806e761d750087c2d734fc64596eaff.woff2",
    mediaType: "font/woff2",
    size: 50704,
    integrity: "sha256-Kaoy5vWm9c7pMa7Vaq7bjZdLKRPHFZHGBc5XKYQkl7o="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4a0fdb40036e87b40aa08dd30584cb85.woff2",
    mediaType: "font/woff2",
    size: 59276,
    integrity: "sha256-m+H4ov00H1BY1IMwQGNTW2rFvgQpSEbImgqUb3+zP50="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4a38cc3e9cf104e69ba246d37f8cf135.woff2",
    mediaType: "font/woff2",
    size: 67888,
    integrity: "sha256-s66/JDwr4CNgoUUro7AJDSI/r3p2/eX3SVvyXO39paE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4aca6a43e59aceee2166b0c7e4e85ef1.woff2",
    mediaType: "font/woff2",
    size: 62672,
    integrity: "sha256-zfH4w/8RVHYqo5DYur5e4SRQ161c3DoLjlimbct1uOo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4bfaa8ffa64c5ee560aa2daba7c9cbd3.woff2",
    mediaType: "font/woff2",
    size: 59832,
    integrity: "sha256-BAW6pCjuQXVlD16oUZbS4pUMN0naMskC+UOB7mmztyw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4dc6d5f188d5c96d44815cd1e81aa885.woff2",
    mediaType: "font/woff2",
    size: 68580,
    integrity: "sha256-ogb0J/+EPb3q3cFQmpLXtp+uvCSHHDE42UuvmxkiszU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4ddc14ed3eb0c3e46364317dfc0144a3.woff2",
    mediaType: "font/woff2",
    size: 66140,
    integrity: "sha256-AzgJsNmEimFhaByOnF5+4r8Q4LY5/rgA66Q/h90ypcI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4ee10ae43505e2e0bc62656ced49c0fa.woff2",
    mediaType: "font/woff2",
    size: 68764,
    integrity: "sha256-pw3YqpG4WzqS9O3sZDB9vrpno+gpMAq/OLucogbDGMU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-4f50e5136e136527280bc902c5817561.woff2",
    mediaType: "font/woff2",
    size: 56576,
    integrity: "sha256-WfR3DPXfKbVANspfQubq/dcNLdKKy9zqboJ1ww0iCPA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-51502f1206be09c565f1547c406e9558.woff2",
    mediaType: "font/woff2",
    size: 57744,
    integrity: "sha256-J/Ddm+4ROXEKv3qw9RwON98Fi+9/LkGl+PkZ3AzlT6c="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-51a0e808bbc8361236ac521a119758a3.woff2",
    mediaType: "font/woff2",
    size: 81560,
    integrity: "sha256-b30g9H/uYgqbbPrBAgLuc1CiFme6zVOYCE1ngYQenUw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-52a84a22fd1369bffeaf21da2d6158dc.woff2",
    mediaType: "font/woff2",
    size: 72436,
    integrity: "sha256-uwC+zhRMi1W5JEXgvPATxk63JQWI682NM9Tpcv7Ouh0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5330a2119a716e4e7224ed108b085dac.woff2",
    mediaType: "font/woff2",
    size: 54600,
    integrity: "sha256-w9km8k9B+gQpUflAhU9wlLOUkpuis5PBrQ9puKweGNc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-543fa46ace099a7099dad69123399400.woff2",
    mediaType: "font/woff2",
    size: 66364,
    integrity: "sha256-3FK8+YbyHF7PT5VhTtw/sIYAi8RYmmBqVUXXvoPGquc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-544fc28abe2c5c30e62383fd4dac255f.woff2",
    mediaType: "font/woff2",
    size: 59884,
    integrity: "sha256-GCKRPQ5xKKDWuK/9AZxVHwYCM2jvhgiqOpcYMg0WARw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-54acdfc2166ad7fcbd074f75fd4a56ba.woff2",
    mediaType: "font/woff2",
    size: 55292,
    integrity: "sha256-fF7hThblCbNZuu8bx67YSEdc9ihr1Emlbpr6qgtdjF0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5572b3513ba8df57a3d5d7303ee6b11b.woff2",
    mediaType: "font/woff2",
    size: 57016,
    integrity: "sha256-P6qlFvx01TnKRpQLOSZIyePMTAMemtUiQqqLVPfZ4vg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-56467a5c8840c4d23a60b2f935114848.woff2",
    mediaType: "font/woff2",
    size: 62452,
    integrity: "sha256-BTX9QJQ3l766qwMpLyae6wm5hE4o7gqbILr8/m1vJTw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-56a32a7689abd0326e57c10c6c069bb4.woff2",
    mediaType: "font/woff2",
    size: 57704,
    integrity: "sha256-CGGlGoVkCDSpNq/oFtySYnEqO1/OudJow+8BMTG38ck="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-57862b464a55b18c7bf234ce22907d73.woff2",
    mediaType: "font/woff2",
    size: 63264,
    integrity: "sha256-KrBuXp3JlfqtYkCxsfbt7n6IZez9JKoEHa0L9xqrlPk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-583d166e56ba0de4b77eabb47ef67839.woff2",
    mediaType: "font/woff2",
    size: 70356,
    integrity: "sha256-+8CF79Anh2NMRQds/NP5qUORmx/UkZU70xmTONNlVoE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5882ffa04f32584d26109137e2da4352.woff2",
    mediaType: "font/woff2",
    size: 73288,
    integrity: "sha256-C8ot17+cWB07mqJIVXH5GScnkONGo36tZSLRabmvLUo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-58fd02350d0bc52cf1ca3bb32ce9766e.woff2",
    mediaType: "font/woff2",
    size: 58968,
    integrity: "sha256-P4Q6hUyCr3BCllrn8AtvhpigXoe7znFcvgh6PsR4mf8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5935a5775af3d5c6307ac667bd9ae74e.woff2",
    mediaType: "font/woff2",
    size: 69344,
    integrity: "sha256-xU8tk6obieGZA8SrwwCHQmE9zFK0UFWgWOwT3pnTqR8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-59e9ff77b0efaf684bc09274fb6908c9.woff2",
    mediaType: "font/woff2",
    size: 26052,
    integrity: "sha256-V0JrcvtdakBt8k4rYMmz+NCcCVqt5ArlXCOXLlt9nhw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5a1ce3117cfe90c48e8fb4a9a00f694d.woff2",
    mediaType: "font/woff2",
    size: 50220,
    integrity: "sha256-Fk1Gj73uecBLOJjH5ilZ3j/0NynEB7pg8PjyeXQ1IpI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5a45d991244d4c7140217e1e5f5ca4f4.woff2",
    mediaType: "font/woff2",
    size: 73116,
    integrity: "sha256-t7xMgJlT350O2YzxGpVCupWe08ZqlNMJC7RmOV+UUYQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5a7fac4b8b23a6e4e5ba0c9bf1756c91.woff2",
    mediaType: "font/woff2",
    size: 58396,
    integrity: "sha256-KAKrgDj/Umb+YwPXlmXwts83A2GqZ7ImOeEOH0Y0cms="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5b0ed6971aaab9c8ad563230bd5471a7.woff2",
    mediaType: "font/woff2",
    size: 58980,
    integrity: "sha256-7H5Hkj7RblTRolvyKtBjiEa+eL5uj0YAlknZz3cn5Ys="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-5d2898fbc097a7e24c6f38d80587621e.woff2",
    mediaType: "font/woff2",
    size: 56348,
    integrity: "sha256-lHPZumSaamFPuHe8YFFZDLGdqY5U72EE0l8x8f9S7VU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-603aefd23e350ba7eb124273e3c9bcf1.woff2",
    mediaType: "font/woff2",
    size: 61512,
    integrity: "sha256-zdDhM2TJMrs8ssmuWDaXFs5HyNVcur6GWFv3QucQ+14="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-60a3089806700d379f11827ee9843b6b.woff2",
    mediaType: "font/woff2",
    size: 73984,
    integrity: "sha256-2WTZQUfkbpD9BvDicaGarN6Ais//sj5muJa+f8s1lUQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-60a41c7e1c68f22424e6d22df544bc82.woff2",
    mediaType: "font/woff2",
    size: 59584,
    integrity: "sha256-BTS1Ko27hNQ7E3c7ulzRW7bSVqpPuWxYpDXr45GQT2Y="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-642b26e2e5f5fb780b51b593dbc8c851.woff2",
    mediaType: "font/woff2",
    size: 54540,
    integrity: "sha256-lhv2ADDnyLT1OVzYt0jGl52We3Yp5sWC1o5cEbXS38g="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-66493ba5a8367f2928812f446f47b56a.woff2",
    mediaType: "font/woff2",
    size: 64588,
    integrity: "sha256-O3WciaypEQ7dxIIgNituERO/jjkPQN3qzK3pvsYDAo4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-670ba603758d94268e8606f240a42e12.woff2",
    mediaType: "font/woff2",
    size: 53524,
    integrity: "sha256-HA11wntTADDmTnfZmWcjD3HU6p20Ds3C4QpvHq8fFQ0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-671a2c20b1eb9e4ef8a192833940e319.woff2",
    mediaType: "font/woff2",
    size: 64872,
    integrity: "sha256-Pdd8b6aaT4Dek0M+KGjkV7fQTWhmLY0ELmNI57b/rxU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-684d65f1793cac449dde5d59cb3c47fb.woff2",
    mediaType: "font/woff2",
    size: 56992,
    integrity: "sha256-B50D5VRijtIKGAGIdbG7VoGuiS3VZgQHSWlhnr2fNvI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-69c09cc5fa3e55c74fc4821f76909cc3.woff2",
    mediaType: "font/woff2",
    size: 65168,
    integrity: "sha256-3eRF5f5px6s2PwNN8VfIl1C0IfMeUnV/emQr48VkTyo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-6ae5b42180ad70b971c91e7eefb8eba2.woff2",
    mediaType: "font/woff2",
    size: 64304,
    integrity: "sha256-3B7qjwWS7lBa21OVZqnOvvqB7OOcPnBiSv0Grw4yNyk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-6e092f71c1e634059ada0e52abadce67.woff2",
    mediaType: "font/woff2",
    size: 72236,
    integrity: "sha256-m3cdfsk6q578RwlvM8Fsck1XpGK5nVRzUIB1nMVudJ0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-6f3256af8454371776bc46670d33cc65.woff2",
    mediaType: "font/woff2",
    size: 56504,
    integrity: "sha256-TRzVg1R9CAxrlFUtFHNoXGDmqWNAx0pllhbhbN3mu64="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-6fe5c5973cc06f74b2387a631ea36b88.woff2",
    mediaType: "font/woff2",
    size: 55696,
    integrity: "sha256-cUKgKwCpkrmle3XAXd+qKJVsEfVU+58eP+AzMoXdZ5E="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-70c2eb8d64e71a42a834eb857ea9df51.woff2",
    mediaType: "font/woff2",
    size: 63524,
    integrity: "sha256-iUdAKNzfwDsn9F1a3BEtnVOk2BDH6PDr+V9Zm1CuhO0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-70e811fd7994e61f408c923de6ddd078.woff2",
    mediaType: "font/woff2",
    size: 57028,
    integrity: "sha256-5oGLtE99R9Fs2JNe2fWym48QrA6ABD+FlXuAUB+FvNk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7197d6fda6cba7c3874c53d6381ca239.woff2",
    mediaType: "font/woff2",
    size: 59464,
    integrity: "sha256-Zrd+rTniR57jv0kRkg+1zzkhfGtg482ECAx/5ClDJDA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-72252d73220fa3cd856677888cee1635.woff2",
    mediaType: "font/woff2",
    size: 49972,
    integrity: "sha256-HjSkmyONYcanI+ecKVfzCWh7zKie6uvpkiGIPzArgKI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-72536a3d71b694a0d53dd90ddceae41e.woff2",
    mediaType: "font/woff2",
    size: 67268,
    integrity: "sha256-QFhoMTanv466rcWaq6hkQETv87kXdvawIGlUv4BaMTI="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-726303e0774b4e678bff8c2deb6ca603.woff2",
    mediaType: "font/woff2",
    size: 62376,
    integrity: "sha256-GtNE9oIlS2bVYYf2c/gX/hrIEX1ZyyZhR5brup8klKo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-733171b4ffcd17ea1fe1c0ba627173bf.woff2",
    mediaType: "font/woff2",
    size: 52596,
    integrity: "sha256-rzLxxKGT2YZmVchm1AZ7GQsSH9xTizgM1F6Z8XK0NVs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-739bc1a567439c7cffcd1614644593d2.woff2",
    mediaType: "font/woff2",
    size: 49492,
    integrity: "sha256-m73LcY+hAQ8TwKYFjMqJ11d0Nx52brHt8xmsJdwFfws="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-73e309718fd16cea44b4d54a33581811.woff2",
    mediaType: "font/woff2",
    size: 61808,
    integrity: "sha256-ZQf7gJLvwwnZ/cwwH6tskDMLiZMecAf+ftf9HnIqc4s="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7494dc504ae00ee9cd0505f990f88c5d.woff2",
    mediaType: "font/woff2",
    size: 65456,
    integrity: "sha256-339hMeJlKCsAmByG9MjQ+64IyPo7NGSQlgmr2v6+XQM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-74e2263a91439c25b91d5132ce9f4d62.woff2",
    mediaType: "font/woff2",
    size: 47540,
    integrity: "sha256-MiZF4OJzeu1k5D5F6XJ2kw9nzlqhv+hF62CQsnsKzCk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-761d05e3cd968cf574166867998ef06a.woff2",
    mediaType: "font/woff2",
    size: 57276,
    integrity: "sha256-XaTdgw28tz9iKEafSbEqHMPbHt8A5YdeP1MLpiyQdTg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7718fe60986d8b42b1be9c5ace5ccf25.woff2",
    mediaType: "font/woff2",
    size: 54872,
    integrity: "sha256-7QKUMeut2Tof+uiTR87StoNe2ScDYT0Q89zT03w84Zs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-774d4f764a1299da5d28ec2f2ffe0d69.woff2",
    mediaType: "font/woff2",
    size: 57500,
    integrity: "sha256-YjjPfqb16IF3aI8oH1XI1CfwEQylageG2Fd6t0j7X44="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-79d494361ae093b69e74ee9dbe65bfd4.woff2",
    mediaType: "font/woff2",
    size: 48736,
    integrity: "sha256-b3j1KzK4WmhrriYCtvS9kZflCBQKh8I+s4ztD6UBgI4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-79f007c1c6d07557120982951ea67998.woff2",
    mediaType: "font/woff2",
    size: 64324,
    integrity: "sha256-7NUWDf6TfR6CceLH7+RVacLT9TyU9desr2AENMdYpCM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7a07ddc0f0c0f5f4a9bad6ee3dda66b5.woff2",
    mediaType: "font/woff2",
    size: 54716,
    integrity: "sha256-4UQ0RNeGW0ZQ5R2kJKAuK1inXOHTtdEludRCTAzFz/c="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7ab2bed91166a9dca83a5ebfbe2a7f38.woff2",
    mediaType: "font/woff2",
    size: 56228,
    integrity: "sha256-PWksM3kmJvhOr0jnP7LJ39I3/9OluKiC0PHkpzAZScc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7ccce86603f80a099ddb0cb21d4ae3e3.woff2",
    mediaType: "font/woff2",
    size: 54436,
    integrity: "sha256-ukwvjhJiRVcWJOuEFiPjoTo5T7o5/CFcYHhueG1OTzU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7e4bde7e9c7f84cd34d8a845e384c746.woff2",
    mediaType: "font/woff2",
    size: 65004,
    integrity: "sha256-k0rU6KvhIMHbof8EJ6BL+kMez2HoQC2Tll/fwAAZjmY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7e929f262f30c8ee78bf398150b1a7cd.woff2",
    mediaType: "font/woff2",
    size: 59984,
    integrity: "sha256-A95YA28QKDD1IgNSIdZgUkwB/0rUJA1ic9bLCqjMvMw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7eb9fffd1aa890d07d0f88cc82e6cfe4.woff2",
    mediaType: "font/woff2",
    size: 17252,
    integrity: "sha256-zPEyrlHKog3RSJaybIKbPkX2dtkzvPkfgGi/ZYpPKGA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-7f855356ab893b0d2b9c1c83b8116f0e.woff2",
    mediaType: "font/woff2",
    size: 77420,
    integrity: "sha256-EGD1NaYs6qFcNwnMcdW6Zap7JcqfF1sDm2kqLzZCfDo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-829615148e6357d826b9242eb7fbbd1e.woff2",
    mediaType: "font/woff2",
    size: 80184,
    integrity: "sha256-QlKh3Mp9okugZWIOMEKemi3j7otex8v7ZyyKAId5/vw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-866fa7613df6b3fd272bcfd4530c0bb9.woff2",
    mediaType: "font/woff2",
    size: 72996,
    integrity: "sha256-pKcQQydhVEzjdsRDN1zTwwISp+rCj+PgLDj7alGzCAg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-87599f94b6cc129d505b375798d0d751.woff2",
    mediaType: "font/woff2",
    size: 56752,
    integrity: "sha256-PLjoekIO90EurCsees2QVX4xM/WSarI7MHzdNdMpP3w="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-8c2f33cee3993174f7e87c28e4bf42ee.woff2",
    mediaType: "font/woff2",
    size: 64164,
    integrity: "sha256-awH8u9JeBYiwCe/uiqAsVjFcE7Bx5C8ns6G53tg7n0s="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-8d3bcabb847b56243b16afe62adaaf21.woff2",
    mediaType: "font/woff2",
    size: 50356,
    integrity: "sha256-WiewinY02k4i70CYH/C0N2pcZn/m0xUBPIKDZguzwXU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-8de5b863cb50dfefdd07cb11c774d579.woff2",
    mediaType: "font/woff2",
    size: 70716,
    integrity: "sha256-jcfJqo15MtimKw1+VWy3qUwbsXKKhNUKeVLXW58VmuA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-8e9f97f01034820170065b2921b4fb5e.woff2",
    mediaType: "font/woff2",
    size: 67728,
    integrity: "sha256-4FOHIEW25p+is3Q4ajCYWYVwCSXqCYMetBEpnWHMSKU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-8f476c4c99813d57cbe6eca4727388ad.woff2",
    mediaType: "font/woff2",
    size: 65080,
    integrity: "sha256-AY2Ga17vPAlqdaVvU98U5PPtK2n8VGF4thCVc2oM+S4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-903bb6865f3452e2fda42e3a25547bc5.woff2",
    mediaType: "font/woff2",
    size: 61532,
    integrity: "sha256-T513swb2P2ncI/GHhYxojyBZClgvTWFPiTS4/LMcwBs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-91ddb2969bf2d31ba02ad82998d1314c.woff2",
    mediaType: "font/woff2",
    size: 56276,
    integrity: "sha256-scf2upNKVrue88hWAt40bVlGVHmABOv+2Gy2j97COp8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-938d90c10ff8c20386af7f242c05d6b0.woff2",
    mediaType: "font/woff2",
    size: 52636,
    integrity: "sha256-PUywanLkPc7kEUyjRc+7k8OgN8wnFkytPs2Xmwr/xiw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-93fc8f28a33234bcadf1527cafabd502.woff2",
    mediaType: "font/woff2",
    size: 64544,
    integrity: "sha256-lQ/3qdY2ykt2hIM/+JjKe0w9IQcsMi3WykgoJar28G0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-95429962233afd82db1c27df1500a28c.woff2",
    mediaType: "font/woff2",
    size: 58352,
    integrity: "sha256-Y0dMEpKD2YpEJvKvCc6J5+D8Cov4l6VCPDIw1ROigW0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-9544732d2e62d1a429674f8ee41b5d3a.woff2",
    mediaType: "font/woff2",
    size: 55048,
    integrity: "sha256-tn90/6jhuOo7RhfD+kxoQI7FTjTMUy7HEDGtyLFcM0M="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-9592bfc861f07bcb8d75c196b370e548.woff2",
    mediaType: "font/woff2",
    size: 51572,
    integrity: "sha256-quGqq1AKcbKNHsljgLScyvdVDQa1fbcedXN9F3FfUmE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-95bfd249da4902577b4b7d76ebdd0b44.woff2",
    mediaType: "font/woff2",
    size: 70936,
    integrity: "sha256-zneuuu7olNA6hfHZzOzbNEerJ/d+uOP2hclhRkEZxe8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-968cffdc8ee679da094e77ebf50f58ef.woff2",
    mediaType: "font/woff2",
    size: 54956,
    integrity: "sha256-evJyEfVJE0HYWwUURafdvJ4ovsQ4uBJKGHg3CP72hmc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-97f7f48ce90c9429bf32ae51469db74d.woff2",
    mediaType: "font/woff2",
    size: 65024,
    integrity: "sha256-thJR5iw+zY1VYgH3Xl1G5I8edhnmfsrSw2aQ6NWp7U8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-982b630266d87db93d2539affb1275c6.woff2",
    mediaType: "font/woff2",
    size: 62288,
    integrity: "sha256-ZP/AbQXg6yY/Fh/Dq0V0e8CckWySGVRQYAV2sIZ6Q88="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-98f2ad84457de7f3740d9920b8fa8667.woff2",
    mediaType: "font/woff2",
    size: 57784,
    integrity: "sha256-IOBCLHYzLnWdbaq7lr+pzNwCvoCxfpko44c2g65bmZU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-99a16ef6a64934d5781933dbd9c46b2e.woff2",
    mediaType: "font/woff2",
    size: 56296,
    integrity: "sha256-i9yPlzH4cwphBDcp9APgbmubz+0vtl5x9/xCGuUbN7c="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-9cfb2a77a4e45025105ad29a1748b90d.woff2",
    mediaType: "font/woff2",
    size: 54720,
    integrity: "sha256-ioOhwnwdxC2yZT83uzn7leO7gYDpnqNydmNmyZUkjO4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-9d81066dd2b337c938df6e90380a00dc.woff2",
    mediaType: "font/woff2",
    size: 50168,
    integrity: "sha256-PnRExXBEAtqCnGHhze7oLBhnk5WQ2bJSkHk8WN5UiGc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-9eb5a99df4e76ac3363453ac9ca288b1.woff2",
    mediaType: "font/woff2",
    size: 60796,
    integrity: "sha256-xGQZjgkDsQJcIOI+bfcZkzrbzqX147aPpnvTiOZtxzg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a004ddfcb26e67bd6e678c8ed19e25ce.woff2",
    mediaType: "font/woff2",
    size: 66012,
    integrity: "sha256-Qp9BeYD9Ed9R0bfG4kgeZeLxor8/FlMbPRiVVrIr4g0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a0ca5df4258213d7fc9fce80f65ce760.woff2",
    mediaType: "font/woff2",
    size: 56840,
    integrity: "sha256-RXfOjS8hYd3LsC8RVKmJm8Vad9OnFaNlAmHFaDkVPuY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a1f916d6039285c4ffb900cd654e418f.woff2",
    mediaType: "font/woff2",
    size: 52880,
    integrity: "sha256-NVu9e5zP41ATJfUaixT8usCnhLcrVin35U0oqwAGDqk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a203b91dad570bf05a58c3c3ddb529bf.woff2",
    mediaType: "font/woff2",
    size: 65680,
    integrity: "sha256-Zk8DL/09Z6wIyYjLnfXtnhTvG9KbWZCFquXOAZU1uPQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a365e82ed54697a52f27adcea1315fe8.woff2",
    mediaType: "font/woff2",
    size: 62772,
    integrity: "sha256-dDHXySm2bd73MTICbBe6K90cdJonM7ErFaK9U9oQzuk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a4c34be6d42152e64b0df90bc4607f64.woff2",
    mediaType: "font/woff2",
    size: 62916,
    integrity: "sha256-hcT7TZcxLwJgoNuGHdzY4fFMwDHbTA+ov/8JgRTu0aE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-a7accba310e821da5505f71c03b76bdb.woff2",
    mediaType: "font/woff2",
    size: 66148,
    integrity: "sha256-pjBTnbuLU+7vJtPBTGXoqmUFbm7nDtVdArrYxuLMNLE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-aa0d470430e6391eca720c7cfa44446f.woff2",
    mediaType: "font/woff2",
    size: 56532,
    integrity: "sha256-nn1OZ9MCbmI1gbu4/7l2flzIrkII6hrZWJ4ch3o5auA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-aa5c9ca6cf4fba00433b7aa3fa10671a.woff2",
    mediaType: "font/woff2",
    size: 54892,
    integrity: "sha256-phKk3u4IwYjTBKdaz6oaX2BuwOlZ7jZXJYWiHWOgV2c="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-ac9ceb44437becc3e9c4dbfebab7fc2d.woff2",
    mediaType: "font/woff2",
    size: 55988,
    integrity: "sha256-iM25i4tHcZyzTebZJ9uTEChFl5cpMJ7XydgcLsomfRg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b1220a3c61f85cc0408deedb4c5f57a2.woff2",
    mediaType: "font/woff2",
    size: 58924,
    integrity: "sha256-DFtDZb7FpDmjJTR7jjc84tcz5poxIn2b4aa/sagfgzk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b358f7a51ece39a3247942b1feabdb29.woff2",
    mediaType: "font/woff2",
    size: 67924,
    integrity: "sha256-2kJ9k15Sht23vGe73bU/GfIbGyKgjrGLgSAtag1xBP8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b57aaedfd8ebdf3931f25119dc6a5eb2.woff2",
    mediaType: "font/woff2",
    size: 71976,
    integrity: "sha256-SJNo+EFoGr6MShDYwE6x8918oEMYZu5tmYc4y12VPpQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b5c1596551c256e0e9cf02028595b092.woff2",
    mediaType: "font/woff2",
    size: 60132,
    integrity: "sha256-U93IrskDzGkj576kKQ+MInSNip0/75MQyNtFFEuGAvU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b6d128682ee29e471486354d486a1b90.woff2",
    mediaType: "font/woff2",
    size: 61376,
    integrity: "sha256-b+yRddga6UdHa249I9ipUrP28qvzojahbTsgMK7I7i8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b6fd38ca30869792244804b04bc058da.woff2",
    mediaType: "font/woff2",
    size: 77468,
    integrity: "sha256-cpOUIWdi+o5U3PfYpmI4EsaO6Gj6QjyxUOtzD6FC1f4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b7d203b051eff504ff59ddca7576b6a9.woff2",
    mediaType: "font/woff2",
    size: 48148,
    integrity: "sha256-ASNI/IG62GczwQ2T7cSbMfqY0WEWKnucfL4tAvGE5oQ="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-b96d9226ce77ec94ceca043d712182e6.woff2",
    mediaType: "font/woff2",
    size: 66240,
    integrity: "sha256-VfOCm1Ac8QuSnIbYcDvgJZQUiQEq46I3oPfUveUy4xY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-ba3de316d63c7e339987b16f41a0b879.woff2",
    mediaType: "font/woff2",
    size: 58728,
    integrity: "sha256-IEyYxtlX2pB2r+kxgAPO0JvTtEpM6DZbVVM3/dV0oEs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-bafff7a14c27403dcc6cf1432e8ea836.woff2",
    mediaType: "font/woff2",
    size: 64204,
    integrity: "sha256-FqC2o/VGL8h6UEO7id+uq2Bw+bFb97sz10xvHw6UXX4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-bd77e3c7f9e0b072d96af37f73d1aa32.woff2",
    mediaType: "font/woff2",
    size: 71260,
    integrity: "sha256-di9rkwVkpwY5qJxB44tV5P6TdT/jAGOu4Fd+5qV7FO0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-be549ab72f0719d606a5c01e2c0219b6.woff2",
    mediaType: "font/woff2",
    size: 54436,
    integrity: "sha256-UfiOMz8qWy7TtmcMe3/xItFuawoJ0Cl65N7HDechvPM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c16ed9740b85badf16e86ea782a3062f.woff2",
    mediaType: "font/woff2",
    size: 56800,
    integrity: "sha256-JlCmUPA8HVc2zA8dd093hjnU3y7ugFdm7GlBAQiZY0Q="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c1f94158256bb1f3bf665b053d895af9.woff2",
    mediaType: "font/woff2",
    size: 62244,
    integrity: "sha256-DVpNoTwAERrm6SHeil0+fkB3c860FXcZl6ngjUkPxgM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c40533fdf4cc57177b12803598af7e59.woff2",
    mediaType: "font/woff2",
    size: 56692,
    integrity: "sha256-v1esbHSCPSGT5P1jfg/vnzz2WGfcVzvyh8q1Qe7ihi4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c4a687ac4f0c2766eefc9f77ed99cddf.woff2",
    mediaType: "font/woff2",
    size: 38416,
    integrity: "sha256-+9l4uvFj0s9jeAS1JeffIG4GV9IX09QzmqIE7FhEYKA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c69f61a4ab18d0488c8d1fc12e7028e8.woff2",
    mediaType: "font/woff2",
    size: 64316,
    integrity: "sha256-HX+Nru5QXT94MNDAx0r3r2irwqCwGy6SFHqFI5tyJJ8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c8b71798409ccc126ee264a00aadcf21.woff2",
    mediaType: "font/woff2",
    size: 63208,
    integrity: "sha256-XnjGU6EoUdleJ1T9AQUuZclS+izGA+bkCnwaEE/jZug="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-c99eda15fc26a2941579560f76c3a5cf.woff2",
    mediaType: "font/woff2",
    size: 76564,
    integrity: "sha256-I0ygo+4iZAGFhjcJqR7YV07hDNyXEDx0kT7556ros5k="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cb17fc3db95f6d139afc9d31a8e93293.woff2",
    mediaType: "font/woff2",
    size: 74180,
    integrity: "sha256-Nm0dZCIOhBSTgNhRWQ+obeysBqsEr3tda4SxWT+8A6c="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cbaaefaaf326668277aa24dfa93c4d28.woff2",
    mediaType: "font/woff2",
    size: 63468,
    integrity: "sha256-2RLFavHrNuPPWO4/0FpUz6okdNchv2676v3gFjwQ1rM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cd145ce4a0ea18469358df53c207bc1b.woff2",
    mediaType: "font/woff2",
    size: 55960,
    integrity: "sha256-PvBXcy1i2pVy43P3jSgrIY4PXLjgA9J1ra7xWr0tLL8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cdbce89e82cc1ab53a2decbf5819278f.woff2",
    mediaType: "font/woff2",
    size: 51420,
    integrity: "sha256-/CrJEL6Cc5uZbjkGM2DvzMxbgvTJmgSNhlWIWvw++TM="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-ce4884f96f11589608b76b726a755803.woff2",
    mediaType: "font/woff2",
    size: 65548,
    integrity: "sha256-6h1OPz+mjJGTpy1d8kmYY1DokgkePtrJAluvfhdZze4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cf2cc71752631e579e35b0e423bf2638.woff2",
    mediaType: "font/woff2",
    size: 57424,
    integrity: "sha256-zlqAWO0hU122IOialC+NT+M5aMu0VXwmxFIcU21ejGY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cf6ff4e0f491ca0cf3038187a997b9b4.woff2",
    mediaType: "font/woff2",
    size: 50608,
    integrity: "sha256-mW/R0/5PB4OzD/7AkS6oWMrfcaB37vQby7b0iKoYU+0="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-cfb211578629b7e8153b37240de6a9d5.woff2",
    mediaType: "font/woff2",
    size: 44464,
    integrity: "sha256-0HvfG8FJrlKwX/8BC/WlyX2mfXvWEs15dZORAkRtogc="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-d0cf73942fea1c74edbdf0b3011f4656.woff2",
    mediaType: "font/woff2",
    size: 73392,
    integrity: "sha256-6ALOXrYwbUJyqRiLplxBQjiUzKpx5nnRuPU986z3KY8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-d2666cbed13462c5dc36fa2f15c202ca.woff2",
    mediaType: "font/woff2",
    size: 56820,
    integrity: "sha256-bRV6+DNBBBsREIJLErytlaEmfGCIqtt8/rwf7nfIGic="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-d3716376641d615e2995605b29bca7b6.woff2",
    mediaType: "font/woff2",
    size: 61636,
    integrity: "sha256-m5+p+W0e2RYJEu+rc8SIMyQiX+EJbmqmxvWlNPysKSs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-dac48066b5883d8b4551fc584f0c2a3e.woff2",
    mediaType: "font/woff2",
    size: 50232,
    integrity: "sha256-UP0FLC4LDr+PME6uZJZUhtFyHahfu84RVoMFXwV4W/A="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-dbea1af6dcd9860be40c3d18254338f5.woff2",
    mediaType: "font/woff2",
    size: 54472,
    integrity: "sha256-S7CoNF6AP2WayoE6rcolcDwWv9312JuC3c7CpQ4zhHE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e11567fd2accf9957cd0d3c2be937d87.woff2",
    mediaType: "font/woff2",
    size: 56440,
    integrity: "sha256-3GoJOBpCzjqoAtApvGHtAbQwLwMDod76gjTxMNr6VCg="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e2ead7ea7da0437f085f42ffc05f8d13.woff2",
    mediaType: "font/woff2",
    size: 58972,
    integrity: "sha256-tGSPWuURwdDUsqp1pypUfoQ2qqXxyhXAQuciqfqMd/Q="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e3fcf5180fd466c8915c4e8069491054.woff2",
    mediaType: "font/woff2",
    size: 60612,
    integrity: "sha256-KaVus9GD9x3bdT8ADIvZAtG5o1ygj/LUA8avGZNGYfo="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e480d9c614742d05f0e78f274f1e69e6.woff2",
    mediaType: "font/woff2",
    size: 58960,
    integrity: "sha256-DO7xEj0fRtfJQ09dfx04lrpNHxsP4Adjg9kg6o2pTsU="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e4bca6cfa53e499cae0a6be4894a90e9.woff2",
    mediaType: "font/woff2",
    size: 59352,
    integrity: "sha256-PMdkZm6cLGSDxzyRGzgj107mgLriCfs93ua5dsWZ+fE="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e51ef413167c6e14e0c0fdcc585f2fc9.woff2",
    mediaType: "font/woff2",
    size: 73904,
    integrity: "sha256-kxwn5gJQjqbXEoA9VkfauxZEOBQOMJ/Qvk8VkXlD9IA="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e5f453bb04da18eed01675eeebd88bf8.woff2",
    mediaType: "font/woff2",
    size: 55832,
    integrity: "sha256-q2yWmmt8SB0D8m9o537skytVIyYIybhtcQxI9cIA8lk="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-e656f091b9dc4709722c9f4b84d3c797.woff2",
    mediaType: "font/woff2",
    size: 53564,
    integrity: "sha256-uQz7NeZMf59bfh+0jQw5bET3VzSeVmnmSiXZiAbWQvw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-ec181b795ac1fb5a50d700b6e996d745.woff2",
    mediaType: "font/woff2",
    size: 39516,
    integrity: "sha256-axjira+q00zwVExTkV1lr5SAarYh9d5qYPcY72DJyx4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-ee8bae97908d5147b423f77ad0d3c1bb.woff2",
    mediaType: "font/woff2",
    size: 61720,
    integrity: "sha256-bMuVgbVjB0seEB0vXtHv5cHFPiQG8jE5VDoTn4Gkrl8="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-f0f13b5c60e0af5553bd359f5513be1b.woff2",
    mediaType: "font/woff2",
    size: 58780,
    integrity: "sha256-derELC2HWoYCnApoS3KKuw3IuqVuUDqqrLHEV/CgGqY="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-f2b54d4e7be0eaefe1c2c56836fa5368.woff2",
    mediaType: "font/woff2",
    size: 55180,
    integrity: "sha256-2hqP3jPqalbXC1yHsaQDDD/mY3cu/8vkUBn94LM209w="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-f56414bf9bced67990def8660e306759.woff2",
    mediaType: "font/woff2",
    size: 69364,
    integrity: "sha256-/7anJTuQ9vgrkGGZNatB4GPbCWhpIfbazpQ/XsGDsWs="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-f5d079153c99a25b9be5b8583c4cc8a7.woff2",
    mediaType: "font/woff2",
    size: 67660,
    integrity: "sha256-uOxbRRbdwmmpnzBrnWP/C97NN6gAc2zQ6rKPJUKRsV4="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-f6032fc06eb20480f096199713f70885.woff2",
    mediaType: "font/woff2",
    size: 84024,
    integrity: "sha256-k3tNUiK7QsDhkKP0Chqp+YTtyqno0nXp1L8diO90dUw="
  },
  {
    path: "fonts/Xiaolai/Xiaolai-Regular-f8ee5d36068a42b51d0e4a1116cfcec1.woff2",
    mediaType: "font/woff2",
    size: 47276,
    integrity: "sha256-rggwN7+2kc+WIF4QmihyVfh6RakISP4qY8sLPnrz6QQ="
  },
  {
    path: "runtime.js",
    mediaType: "text/javascript",
    size: 10597345,
    integrity: "sha256-HRzCDEsPncfgraoHg79ZkescmjRflwZjk9TEaicGvr4="
  }
], so = {
  name: "excalidraw",
  version: "0.1.5",
  category: "extension",
  description: "Open and edit Excalidraw drawings",
  source: {
    type: "git",
    repo: "https://github.com/Artawower/orgnote-excalidraw"
  },
  keywords: ["drawing", "diagram", "whiteboard", "excalidraw"],
  license: "GPL-3.0-or-later",
  assets: [...m0]
}, v0 = "__orgnote_pending_font__", A0 = "U+", T0 = "?", Ta = (e, t) => Number.parseInt(e.replaceAll(T0, t), 16), S0 = (e, t) => {
  const i = t.trim().toUpperCase().replace(A0, ""), [r, a] = i.split("-");
  if (!r) return !1;
  const n = Ta(r, "0"), o = Ta(a ?? r, "F");
  return e >= n && e <= o;
}, R0 = (e, t) => {
  if (!t) return !0;
  const i = t.split(",");
  return Array.from(e).some((r) => {
    const a = r.codePointAt(0);
    return a !== void 0 && i.some((n) => S0(a, n));
  });
}, I0 = (e, t) => e.map(String).find(t), _0 = (e, t) => new FontFace(e, `local("${v0}")`, t), O0 = (e, t, i) => t.includes(e.family) && R0(i, e.descriptors.unicodeRange), P0 = (e) => {
  const t = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new WeakMap();
  let a = !1;
  const n = async (c) => {
    const l = await e.readRuntimeAsset(c.uri), u = await new FontFace(
      c.family,
      l,
      c.descriptors
    ).load();
    return a || (document.fonts.delete(c.placeholder), document.fonts.add(u), i.add(u), c.replace(u)), u;
  }, o = async (c) => {
    const l = r.get(c) ?? n(c);
    r.set(c, l), await l;
  };
  return { createFontFace: (c) => {
    const l = I0(c.urls, e.isRuntimeAssetUri);
    if (!l) return new FontFace(c.family, c.sources, c.descriptors);
    const u = _0(c.family, c.descriptors);
    return t.add({
      family: c.family,
      uri: l,
      descriptors: c.descriptors,
      placeholder: u,
      replace: c.replace
    }), u;
  }, resolveFontFaces: async (c, l) => {
    const u = Array.from(t).filter(
      (d) => O0(d, c, l)
    );
    await Promise.all(u.map(o));
  }, release: () => {
    a = !0, t.forEach(({ placeholder: c }) => document.fonts.delete(c)), i.forEach((c) => document.fonts.delete(c)), t.clear(), i.clear();
  } };
}, hn = "orgnote-extension-asset:", N0 = [
  { path: "fonts/Assistant/Assistant-Regular.woff2", weight: "400" },
  { path: "fonts/Assistant/Assistant-Medium.woff2", weight: "500" },
  { path: "fonts/Assistant/Assistant-SemiBold.woff2", weight: "600" },
  { path: "fonts/Assistant/Assistant-Bold.woff2", weight: "700" }
], k0 = "runtime.js";
let dr, Zt, gr, Ji, $i;
const fo = (e) => `${hn}${e}`, Sa = (e) => e.startsWith(hn), li = async (e, t) => {
  const i = t.slice(hn.length), r = Lo(so, i), a = await e.core.useFileSystem().readFile(r, "binary");
  if (!a)
    throw new Error(`Excalidraw runtime asset is missing: ${i}`);
  return Uint8Array.from(a).buffer;
}, U0 = async (e, t) => {
  const i = await li(e, t);
  return new Response(i, {
    status: 200,
    headers: { "Content-Type": "font/woff2" }
  });
}, L0 = async (e, t) => {
  const i = await li(
    e,
    fo(t.path)
  );
  return new FontFace("Assistant", i, {
    weight: t.weight
  }).load();
}, B0 = async (e) => {
  const t = await Promise.all(
    N0.map((i) => L0(e, i))
  );
  return t.forEach((i) => document.fonts.add(i)), () => t.forEach((i) => document.fonts.delete(i));
}, X0 = async (e) => {
  const t = await li(
    e,
    fo(k0)
  ), i = URL.createObjectURL(
    new Blob([t], { type: "text/javascript" })
  );
  Zt = i;
  const r = import(
    /* @vite-ignore */
    i
  );
  return r.catch(() => {
    Zt === i && (URL.revokeObjectURL(i), Zt = void 0);
  }), r;
}, C0 = (e) => {
  const t = B0(e);
  return gr = t, t.then((i) => {
    Ji = i;
  }), t.catch(() => {
    gr === t && (gr = void 0);
  }), t;
}, D0 = (e, t) => {
  e.utils.logger.warn("Unable to load Excalidraw Assistant fonts", t);
}, F0 = (e) => {
  (gr ?? C0(e)).catch((i) => D0(e, i));
}, x0 = (e) => {
  const t = X0(e);
  return dr = t, t.catch(() => {
    dr === t && (dr = void 0);
  }), t;
}, z0 = async (e) => {
  const t = await (dr ?? x0(e));
  return F0(e), t;
}, K0 = () => {
  Ji?.(), Ji = void 0, gr = void 0, $i?.release(), $i = void 0, dr = void 0, Zt && (URL.revokeObjectURL(Zt), Zt = void 0);
}, M0 = (e) => {
  const t = globalThis, i = (a) => {
    const n = a.toString();
    if (!Sa(n))
      throw new Error(`Unsupported Excalidraw runtime asset URI: ${n}`);
    return U0(e, n);
  }, r = P0({
    isRuntimeAssetUri: Sa,
    readRuntimeAsset: (a) => li(e, a)
  });
  return $i = r, t.__orgnoteExcalidrawCreateFontFace = r.createFontFace, t.__orgnoteExcalidrawFetch = i, t.__orgnoteExcalidrawResolveFontFaces = r.resolveFontFaces, () => {
    t.__orgnoteExcalidrawCreateFontFace = void 0, t.__orgnoteExcalidrawFetch = void 0, t.__orgnoteExcalidrawResolveFontFaces = void 0;
  };
}, G0 = (e) => {
  const { defineComponent: t, h: i, onBeforeUnmount: r, onMounted: a, ref: n, watch: o } = e.vue;
  return t({
    name: "ExcalidrawReader",
    props: {
      buffer: { type: Object, required: !0 },
      readonly: Boolean,
      viewState: { type: Object, default: void 0 }
    },
    emits: ["update:content"],
    setup(s, { emit: f }) {
      const h = s, c = n(), l = e.ui.useTheme();
      let u, d, g = !1;
      const b = () => ({
        isReadonly: h.readonly ?? !1,
        theme: l.isDark ? "dark" : "light"
      }), T = (_) => _.cause instanceof Error ? T(_.cause) : _, A = (_) => {
        const k = _ ? T(_) : void 0;
        k && e.utils.logger.error(k.message, k);
        const N = k?.message ? `: ${k.message}` : "";
        e.core.useNotifications().notify({
          message: `Unable to open the Excalidraw drawing${N}`,
          level: "danger"
        });
      }, S = async () => {
        const _ = c.value;
        if (!_) return;
        const k = await Nr(
          z0,
          "Failed to load Excalidraw runtime"
        )(e);
        if (k.isErr()) return A(k.error);
        const N = Nr(
          k.value.createExcalidrawSession,
          "Failed to parse Excalidraw drawing"
        )({
          content: h.buffer.text,
          onContentChange: (w) => f("update:content", w),
          viewState: h.viewState
        });
        if (N.isErr()) return A(N.error);
        d = N.value;
        const m = await Nr(
          k.value.mountExcalidrawHost,
          "Failed to mount Excalidraw canvas"
        )({
          container: _,
          initialData: d.initialData,
          name: h.buffer.title,
          session: d,
          ...b()
        });
        if (m.isErr()) return A(m.error);
        g || (u = m.value), g && m.value.destroy();
      }, E = (_) => {
        if (!d || !u) return;
        const k = Nr(
          d.applyBufferContent,
          "Failed to reload Excalidraw"
        )(_);
        if (k.isErr()) return A();
        k.value && u.applyScene(k.value);
      }, y = () => {
        document.visibilityState === "hidden" && d?.flush();
      };
      return o(() => h.buffer.text, E), o(
        [() => h.readonly, () => l.isDark],
        () => u?.updateAppearance(b())
      ), a(() => {
        document.addEventListener("visibilitychange", y), S();
      }), r(() => {
        g = !0, document.removeEventListener("visibilitychange", y), d?.flush(), u?.destroy();
      }), () => i("div", {
        ref: c,
        class: "excalidraw-reader",
        style: {
          width: "100%",
          height: "100%",
          minHeight: 0,
          overflow: "hidden"
        }
      });
    }
  });
}, co = "excalidraw:editor", H0 = "\\.excalidraw$", V0 = 1, Y0 = (e) => ({
  pattern: H0,
  component: e,
  meta: {
    id: co,
    name: "Excalidraw Editor",
    icon: "sym_o_draw",
    priority: 100,
    viewState: { version: V0 }
  }
});
let Li;
const Z0 = {
  onMounted: (e) => {
    const t = M0(e);
    Li = () => {
      K0(), t();
    }, e.core.useBufferViewer().register(Y0(G0(e)));
  },
  onUnmounted: (e) => {
    e.core.useBufferViewer().unregister(co), Li?.(), Li = void 0;
  }
}, W0 = so;
export {
  Z0 as default,
  Z0 as excalidrawExtension,
  W0 as manifest
};
