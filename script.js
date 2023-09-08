/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var ms = u(() => {
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (s) {
          let c = window.getComputedStyle(s, null),
            f = c.getPropertyValue("position"),
            v = c.getPropertyValue("overflow"),
            d = c.getPropertyValue("display");
          (!f || f === "static") && (s.style.position = "relative"),
            v !== "hidden" && (s.style.overflow = "hidden"),
            (!d || d === "inline") && (s.style.display = "block"),
            s.clientHeight === 0 && (s.style.height = "100%"),
            s.className.indexOf("object-fit-polyfill") === -1 &&
              (s.className += " object-fit-polyfill");
        },
        o = function (s) {
          let c = window.getComputedStyle(s, null),
            f = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let v in f)
            c.getPropertyValue(v) !== f[v] && (s.style[v] = f[v]);
        },
        i = function (s) {
          let c = s.parentNode;
          n(c),
            o(s),
            (s.style.position = "absolute"),
            (s.style.height = "100%"),
            (s.style.width = "auto"),
            s.clientWidth > c.clientWidth
              ? ((s.style.top = "0"),
                (s.style.marginTop = "0"),
                (s.style.left = "50%"),
                (s.style.marginLeft = s.clientWidth / -2 + "px"))
              : ((s.style.width = "100%"),
                (s.style.height = "auto"),
                (s.style.left = "0"),
                (s.style.marginLeft = "0"),
                (s.style.top = "50%"),
                (s.style.marginTop = s.clientHeight / -2 + "px"));
        },
        a = function (s) {
          if (typeof s > "u" || s instanceof Event)
            s = document.querySelectorAll("[data-object-fit]");
          else if (s && s.nodeName) s = [s];
          else if (typeof s == "object" && s.length && s[0].nodeName) s = s;
          else return !1;
          for (let c = 0; c < s.length; c++) {
            if (!s[c].nodeName) continue;
            let f = s[c].nodeName.toLowerCase();
            if (f === "img") {
              if (t) continue;
              s[c].complete
                ? i(s[c])
                : s[c].addEventListener("load", function () {
                    i(this);
                  });
            } else
              f === "video"
                ? s[c].readyState > 0
                  ? i(s[c])
                  : s[c].addEventListener("loadedmetadata", function () {
                      i(this);
                    })
                : i(s[c]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", a)
        : a(),
        window.addEventListener("resize", a),
        (window.objectFitPolyfill = a);
    })();
  });
  var Os = u(() => {
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (o) => {
          e(!o.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (o) {
            if (Webflow.env("design")) return;
            let i = $(o.currentTarget),
              a = $(`video#${i.attr("aria-controls")}`).get(0);
            if (a)
              if (a.paused) {
                let s = a.play();
                r(i),
                  s &&
                    typeof s.catch == "function" &&
                    s.catch(() => {
                      t(i);
                    });
              } else a.pause(), t(i);
          });
      });
    })();
  });
  var Gi = u(() => {
    window.tram = (function (e) {
      function t(l, h) {
        var y = new V.Bare();
        return y.init(l, h);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (h) {
          return "-" + h.toLowerCase();
        });
      }
      function n(l) {
        var h = parseInt(l.slice(1), 16),
          y = (h >> 16) & 255,
          m = (h >> 8) & 255,
          g = 255 & h;
        return [y, m, g];
      }
      function o(l, h, y) {
        return (
          "#" + ((1 << 24) | (l << 16) | (h << 8) | y).toString(16).slice(1)
        );
      }
      function i() {}
      function a(l, h) {
        f("Type warning: Expected: [" + l + "] Got: [" + typeof h + "] " + h);
      }
      function s(l, h, y) {
        f("Units do not match [" + l + "]: " + h + ", " + y);
      }
      function c(l, h, y) {
        if ((h !== void 0 && (y = h), l === void 0)) return y;
        var m = y;
        return (
          Fi.test(l) || !on.test(l)
            ? (m = parseInt(l, 10))
            : on.test(l) && (m = 1e3 * parseFloat(l)),
          0 > m && (m = 0),
          m === m ? m : y
        );
      }
      function f(l) {
        le.debug && window && window.console.warn(l);
      }
      function v(l) {
        for (var h = -1, y = l ? l.length : 0, m = []; ++h < y; ) {
          var g = l[h];
          g && m.push(g);
        }
        return m;
      }
      var d = (function (l, h, y) {
          function m(te) {
            return typeof te == "object";
          }
          function g(te) {
            return typeof te == "function";
          }
          function O() {}
          function z(te, ve) {
            function W() {
              var qe = new ae();
              return g(qe.init) && qe.init.apply(qe, arguments), qe;
            }
            function ae() {}
            ve === y && ((ve = te), (te = Object)), (W.Bare = ae);
            var ue,
              Ie = (O[l] = te[l]),
              it = (ae[l] = W[l] = new O());
            return (
              (it.constructor = W),
              (W.mixin = function (qe) {
                return (ae[l] = W[l] = z(W, qe)[l]), W;
              }),
              (W.open = function (qe) {
                if (
                  ((ue = {}),
                  g(qe) ? (ue = qe.call(W, it, Ie, W, te)) : m(qe) && (ue = qe),
                  m(ue))
                )
                  for (var mr in ue) h.call(ue, mr) && (it[mr] = ue[mr]);
                return g(it.init) || (it.init = te), W;
              }),
              W.open(ve)
            );
          }
          return z;
        })("prototype", {}.hasOwnProperty),
        E = {
          ease: [
            "ease",
            function (l, h, y, m) {
              var g = (l /= m) * l,
                O = g * l;
              return (
                h +
                y * (-2.75 * O * g + 11 * g * g + -15.5 * O + 8 * g + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, h, y, m) {
              var g = (l /= m) * l,
                O = g * l;
              return h + y * (-1 * O * g + 3 * g * g + -3 * O + 2 * g);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, h, y, m) {
              var g = (l /= m) * l,
                O = g * l;
              return (
                h +
                y * (0.3 * O * g + -1.6 * g * g + 2.2 * O + -1.8 * g + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, h, y, m) {
              var g = (l /= m) * l,
                O = g * l;
              return h + y * (2 * O * g + -5 * g * g + 2 * O + 2 * g);
            },
          ],
          linear: [
            "linear",
            function (l, h, y, m) {
              return (y * l) / m + h;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, h, y, m) {
              return y * (l /= m) * l + h;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, h, y, m) {
              return -y * (l /= m) * (l - 2) + h;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, h, y, m) {
              return (l /= m / 2) < 1
                ? (y / 2) * l * l + h
                : (-y / 2) * (--l * (l - 2) - 1) + h;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, h, y, m) {
              return y * (l /= m) * l * l + h;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, h, y, m) {
              return y * ((l = l / m - 1) * l * l + 1) + h;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, h, y, m) {
              return (l /= m / 2) < 1
                ? (y / 2) * l * l * l + h
                : (y / 2) * ((l -= 2) * l * l + 2) + h;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, h, y, m) {
              return y * (l /= m) * l * l * l + h;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, h, y, m) {
              return -y * ((l = l / m - 1) * l * l * l - 1) + h;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, h, y, m) {
              return (l /= m / 2) < 1
                ? (y / 2) * l * l * l * l + h
                : (-y / 2) * ((l -= 2) * l * l * l - 2) + h;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, h, y, m) {
              return y * (l /= m) * l * l * l * l + h;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, h, y, m) {
              return y * ((l = l / m - 1) * l * l * l * l + 1) + h;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, h, y, m) {
              return (l /= m / 2) < 1
                ? (y / 2) * l * l * l * l * l + h
                : (y / 2) * ((l -= 2) * l * l * l * l + 2) + h;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, h, y, m) {
              return -y * Math.cos((l / m) * (Math.PI / 2)) + y + h;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, h, y, m) {
              return y * Math.sin((l / m) * (Math.PI / 2)) + h;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, h, y, m) {
              return (-y / 2) * (Math.cos((Math.PI * l) / m) - 1) + h;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, h, y, m) {
              return l === 0 ? h : y * Math.pow(2, 10 * (l / m - 1)) + h;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, h, y, m) {
              return l === m
                ? h + y
                : y * (-Math.pow(2, (-10 * l) / m) + 1) + h;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, h, y, m) {
              return l === 0
                ? h
                : l === m
                ? h + y
                : (l /= m / 2) < 1
                ? (y / 2) * Math.pow(2, 10 * (l - 1)) + h
                : (y / 2) * (-Math.pow(2, -10 * --l) + 2) + h;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, h, y, m) {
              return -y * (Math.sqrt(1 - (l /= m) * l) - 1) + h;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, h, y, m) {
              return y * Math.sqrt(1 - (l = l / m - 1) * l) + h;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, h, y, m) {
              return (l /= m / 2) < 1
                ? (-y / 2) * (Math.sqrt(1 - l * l) - 1) + h
                : (y / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + h;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, h, y, m, g) {
              return (
                g === void 0 && (g = 1.70158),
                y * (l /= m) * l * ((g + 1) * l - g) + h
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, h, y, m, g) {
              return (
                g === void 0 && (g = 1.70158),
                y * ((l = l / m - 1) * l * ((g + 1) * l + g) + 1) + h
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, h, y, m, g) {
              return (
                g === void 0 && (g = 1.70158),
                (l /= m / 2) < 1
                  ? (y / 2) * l * l * (((g *= 1.525) + 1) * l - g) + h
                  : (y / 2) *
                      ((l -= 2) * l * (((g *= 1.525) + 1) * l + g) + 2) +
                    h
              );
            },
          ],
        },
        I = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        S = document,
        A = window,
        L = "bkwld-tram",
        b = /[\-\.0-9]/g,
        w = /[A-Z]/,
        T = "number",
        q = /^(rgb|#)/,
        N = /(em|cm|mm|in|pt|pc|px)$/,
        P = /(em|cm|mm|in|pt|pc|px|%)$/,
        G = /(deg|rad|turn)$/,
        K = "unitless",
        Y = /(all|none) 0s ease 0s/,
        re = /^(width|height)$/,
        J = " ",
        M = S.createElement("a"),
        _ = ["Webkit", "Moz", "O", "ms"],
        D = ["-webkit-", "-moz-", "-o-", "-ms-"],
        F = function (l) {
          if (l in M.style) return { dom: l, css: l };
          var h,
            y,
            m = "",
            g = l.split("-");
          for (h = 0; h < g.length; h++)
            m += g[h].charAt(0).toUpperCase() + g[h].slice(1);
          for (h = 0; h < _.length; h++)
            if (((y = _[h] + m), y in M.style))
              return { dom: y, css: D[h] + l };
        },
        X = (t.support = {
          bind: Function.prototype.bind,
          transform: F("transform"),
          transition: F("transition"),
          backface: F("backface-visibility"),
          timing: F("transition-timing-function"),
        });
      if (X.transition) {
        var Q = X.timing.dom;
        if (((M.style[Q] = E["ease-in-back"][0]), !M.style[Q]))
          for (var ee in I) E[ee][0] = I[ee];
      }
      var x = (t.frame = (function () {
          var l =
            A.requestAnimationFrame ||
            A.webkitRequestAnimationFrame ||
            A.mozRequestAnimationFrame ||
            A.oRequestAnimationFrame ||
            A.msRequestAnimationFrame;
          return l && X.bind
            ? l.bind(A)
            : function (h) {
                A.setTimeout(h, 16);
              };
        })()),
        H = (t.now = (function () {
          var l = A.performance,
            h = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return h && X.bind
            ? h.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        k = d(function (l) {
          function h(Z, ce) {
            var ge = v(("" + Z).split(J)),
              fe = ge[0];
            ce = ce || {};
            var Pe = Tr[fe];
            if (!Pe) return f("Unsupported property: " + fe);
            if (!ce.weak || !this.props[fe]) {
              var He = Pe[0],
                De = this.props[fe];
              return (
                De || (De = this.props[fe] = new He.Bare()),
                De.init(this.$el, ge, Pe, ce),
                De
              );
            }
          }
          function y(Z, ce, ge) {
            if (Z) {
              var fe = typeof Z;
              if (
                (ce ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                fe == "number" && ce)
              )
                return (
                  (this.timer = new se({
                    duration: Z,
                    context: this,
                    complete: O,
                  })),
                  void (this.active = !0)
                );
              if (fe == "string" && ce) {
                switch (Z) {
                  case "hide":
                    W.call(this);
                    break;
                  case "stop":
                    z.call(this);
                    break;
                  case "redraw":
                    ae.call(this);
                    break;
                  default:
                    h.call(this, Z, ge && ge[1]);
                }
                return O.call(this);
              }
              if (fe == "function") return void Z.call(this, this);
              if (fe == "object") {
                var Pe = 0;
                it.call(
                  this,
                  Z,
                  function (Te, _I) {
                    Te.span > Pe && (Pe = Te.span), Te.stop(), Te.animate(_I);
                  },
                  function (Te) {
                    "wait" in Te && (Pe = c(Te.wait, 0));
                  }
                ),
                  Ie.call(this),
                  Pe > 0 &&
                    ((this.timer = new se({ duration: Pe, context: this })),
                    (this.active = !0),
                    ce && (this.timer.complete = O));
                var He = this,
                  De = !1,
                  an = {};
                x(function () {
                  it.call(He, Z, function (Te) {
                    Te.active && ((De = !0), (an[Te.name] = Te.nextStyle));
                  }),
                    De && He.$el.css(an);
                });
              }
            }
          }
          function m(Z) {
            (Z = c(Z, 0)),
              this.active
                ? this.queue.push({ options: Z })
                : ((this.timer = new se({
                    duration: Z,
                    context: this,
                    complete: O,
                  })),
                  (this.active = !0));
          }
          function g(Z) {
            return this.active
              ? (this.queue.push({ options: Z, args: arguments }),
                void (this.timer.complete = O))
              : f(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function O() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var Z = this.queue.shift();
              y.call(this, Z.options, !0, Z.args);
            }
          }
          function z(Z) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ce;
            typeof Z == "string"
              ? ((ce = {}), (ce[Z] = 1))
              : (ce = typeof Z == "object" && Z != null ? Z : this.props),
              it.call(this, ce, qe),
              Ie.call(this);
          }
          function te(Z) {
            z.call(this, Z), it.call(this, Z, mr, hI);
          }
          function ve(Z) {
            typeof Z != "string" && (Z = "block"), (this.el.style.display = Z);
          }
          function W() {
            z.call(this), (this.el.style.display = "none");
          }
          function ae() {
            this.el.offsetHeight;
          }
          function ue() {
            z.call(this), e.removeData(this.el, L), (this.$el = this.el = null);
          }
          function Ie() {
            var Z,
              ce,
              ge = [];
            this.upstream && ge.push(this.upstream);
            for (Z in this.props)
              (ce = this.props[Z]), ce.active && ge.push(ce.string);
            (ge = ge.join(",")),
              this.style !== ge &&
                ((this.style = ge), (this.el.style[X.transition.dom] = ge));
          }
          function it(Z, ce, ge) {
            var fe,
              Pe,
              He,
              De,
              an = ce !== qe,
              Te = {};
            for (fe in Z)
              (He = Z[fe]),
                fe in nt
                  ? (Te.transform || (Te.transform = {}),
                    (Te.transform[fe] = He))
                  : (w.test(fe) && (fe = r(fe)),
                    fe in Tr
                      ? (Te[fe] = He)
                      : (De || (De = {}), (De[fe] = He)));
            for (fe in Te) {
              if (((He = Te[fe]), (Pe = this.props[fe]), !Pe)) {
                if (!an) continue;
                Pe = h.call(this, fe);
              }
              ce.call(this, Pe, He);
            }
            ge && De && ge.call(this, De);
          }
          function qe(Z) {
            Z.stop();
          }
          function mr(Z, ce) {
            Z.set(ce);
          }
          function hI(Z) {
            this.$el.css(Z);
          }
          function Be(Z, ce) {
            l[Z] = function () {
              return this.children
                ? gI.call(this, ce, arguments)
                : (this.el && ce.apply(this, arguments), this);
            };
          }
          function gI(Z, ce) {
            var ge,
              fe = this.children.length;
            for (ge = 0; fe > ge; ge++) Z.apply(this.children[ge], ce);
            return this;
          }
          (l.init = function (Z) {
            if (
              ((this.$el = e(Z)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              le.keepInherited && !le.fallback)
            ) {
              var ce = rt(this.el, "transition");
              ce && !Y.test(ce) && (this.upstream = ce);
            }
            X.backface &&
              le.hideBackface &&
              We(this.el, X.backface.css, "hidden");
          }),
            Be("add", h),
            Be("start", y),
            Be("wait", m),
            Be("then", g),
            Be("next", O),
            Be("stop", z),
            Be("set", te),
            Be("show", ve),
            Be("hide", W),
            Be("redraw", ae),
            Be("destroy", ue);
        }),
        V = d(k, function (l) {
          function h(y, m) {
            var g = e.data(y, L) || e.data(y, L, new k.Bare());
            return g.el || g.init(y), m ? g.start(m) : g;
          }
          l.init = function (y, m) {
            var g = e(y);
            if (!g.length) return this;
            if (g.length === 1) return h(g[0], m);
            var O = [];
            return (
              g.each(function (z, te) {
                O.push(h(te, m));
              }),
              (this.children = O),
              this
            );
          };
        }),
        U = d(function (l) {
          function h() {
            var O = this.get();
            this.update("auto");
            var z = this.get();
            return this.update(O), z;
          }
          function y(O, z, te) {
            return z !== void 0 && (te = z), O in E ? O : te;
          }
          function m(O) {
            var z = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(O);
            return (z ? o(z[1], z[2], z[3]) : O).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var g = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (O, z, te, ve) {
            (this.$el = O), (this.el = O[0]);
            var W = z[0];
            te[2] && (W = te[2]),
              Ir[W] && (W = Ir[W]),
              (this.name = W),
              (this.type = te[1]),
              (this.duration = c(z[1], this.duration, g.duration)),
              (this.ease = y(z[2], this.ease, g.ease)),
              (this.delay = c(z[3], this.delay, g.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = re.test(this.name)),
              (this.unit = ve.unit || this.unit || le.defaultUnit),
              (this.angle = ve.angle || this.angle || le.defaultAngle),
              le.fallback || ve.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    J +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? J + E[this.ease][0] : "") +
                    (this.delay ? J + this.delay + "ms" : "")));
          }),
            (l.set = function (O) {
              (O = this.convert(O, this.type)), this.update(O), this.redraw();
            }),
            (l.transition = function (O) {
              (this.active = !0),
                (O = this.convert(O, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  O == "auto" && (O = h.call(this))),
                (this.nextStyle = O);
            }),
            (l.fallback = function (O) {
              var z =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (O = this.convert(O, this.type)),
                this.auto &&
                  (z == "auto" && (z = this.convert(this.get(), this.type)),
                  O == "auto" && (O = h.call(this))),
                (this.tween = new R({
                  from: z,
                  to: O,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return rt(this.el, this.name);
            }),
            (l.update = function (O) {
              We(this.el, this.name, O);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                We(this.el, this.name, this.get()));
              var O = this.tween;
              O && O.context && O.destroy();
            }),
            (l.convert = function (O, z) {
              if (O == "auto" && this.auto) return O;
              var te,
                ve = typeof O == "number",
                W = typeof O == "string";
              switch (z) {
                case T:
                  if (ve) return O;
                  if (W && O.replace(b, "") === "") return +O;
                  te = "number(unitless)";
                  break;
                case q:
                  if (W) {
                    if (O === "" && this.original) return this.original;
                    if (z.test(O))
                      return O.charAt(0) == "#" && O.length == 7 ? O : m(O);
                  }
                  te = "hex or rgb string";
                  break;
                case N:
                  if (ve) return O + this.unit;
                  if (W && z.test(O)) return O;
                  te = "number(px) or string(unit)";
                  break;
                case P:
                  if (ve) return O + this.unit;
                  if (W && z.test(O)) return O;
                  te = "number(px) or string(unit or %)";
                  break;
                case G:
                  if (ve) return O + this.angle;
                  if (W && z.test(O)) return O;
                  te = "number(deg) or string(angle)";
                  break;
                case K:
                  if (ve || (W && P.test(O))) return O;
                  te = "number(unitless) or string(unit or %)";
              }
              return a(te, O), O;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        p = d(U, function (l, h) {
          l.init = function () {
            h.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), q));
          };
        }),
        B = d(U, function (l, h) {
          (l.init = function () {
            h.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (y) {
              this.$el[this.name](y);
            });
        }),
        j = d(U, function (l, h) {
          function y(m, g) {
            var O, z, te, ve, W;
            for (O in m)
              (ve = nt[O]),
                (te = ve[0]),
                (z = ve[1] || O),
                (W = this.convert(m[O], te)),
                g.call(this, z, W, te);
          }
          (l.init = function () {
            h.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                nt.perspective &&
                  le.perspective &&
                  ((this.current.perspective = le.perspective),
                  We(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (m) {
              y.call(this, m, function (g, O) {
                this.current[g] = O;
              }),
                We(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (m) {
              var g = this.values(m);
              this.tween = new Se({
                current: this.current,
                values: g,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var O,
                z = {};
              for (O in this.current) z[O] = O in g ? g[O] : this.current[O];
              (this.active = !0), (this.nextStyle = this.style(z));
            }),
            (l.fallback = function (m) {
              var g = this.values(m);
              this.tween = new Se({
                current: this.current,
                values: g,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              We(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (m) {
              var g,
                O = "";
              for (g in m) O += g + "(" + m[g] + ") ";
              return O;
            }),
            (l.values = function (m) {
              var g,
                O = {};
              return (
                y.call(this, m, function (z, te, ve) {
                  (O[z] = te),
                    this.current[z] === void 0 &&
                      ((g = 0),
                      ~z.indexOf("scale") && (g = 1),
                      (this.current[z] = this.convert(g, ve)));
                }),
                O
              );
            });
        }),
        R = d(function (l) {
          function h(W) {
            te.push(W) === 1 && x(y);
          }
          function y() {
            var W,
              ae,
              ue,
              Ie = te.length;
            if (Ie)
              for (x(y), ae = H(), W = Ie; W--; )
                (ue = te[W]), ue && ue.render(ae);
          }
          function m(W) {
            var ae,
              ue = e.inArray(W, te);
            ue >= 0 &&
              ((ae = te.slice(ue + 1)),
              (te.length = ue),
              ae.length && (te = te.concat(ae)));
          }
          function g(W) {
            return Math.round(W * ve) / ve;
          }
          function O(W, ae, ue) {
            return o(
              W[0] + ue * (ae[0] - W[0]),
              W[1] + ue * (ae[1] - W[1]),
              W[2] + ue * (ae[2] - W[2])
            );
          }
          var z = { ease: E.ease[1], from: 0, to: 1 };
          (l.init = function (W) {
            (this.duration = W.duration || 0), (this.delay = W.delay || 0);
            var ae = W.ease || z.ease;
            E[ae] && (ae = E[ae][1]),
              typeof ae != "function" && (ae = z.ease),
              (this.ease = ae),
              (this.update = W.update || i),
              (this.complete = W.complete || i),
              (this.context = W.context || this),
              (this.name = W.name);
            var ue = W.from,
              Ie = W.to;
            ue === void 0 && (ue = z.from),
              Ie === void 0 && (Ie = z.to),
              (this.unit = W.unit || ""),
              typeof ue == "number" && typeof Ie == "number"
                ? ((this.begin = ue), (this.change = Ie - ue))
                : this.format(Ie, ue),
              (this.value = this.begin + this.unit),
              (this.start = H()),
              W.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = H()), (this.active = !0), h(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), m(this));
            }),
            (l.render = function (W) {
              var ae,
                ue = W - this.start;
              if (this.delay) {
                if (ue <= this.delay) return;
                ue -= this.delay;
              }
              if (ue < this.duration) {
                var Ie = this.ease(ue, 0, 1, this.duration);
                return (
                  (ae = this.startRGB
                    ? O(this.startRGB, this.endRGB, Ie)
                    : g(this.begin + Ie * this.change)),
                  (this.value = ae + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ae = this.endHex || this.begin + this.change),
                (this.value = ae + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (W, ae) {
              if (((ae += ""), (W += ""), W.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ae)),
                  (this.endRGB = n(W)),
                  (this.endHex = W),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ue = ae.replace(b, ""),
                  Ie = W.replace(b, "");
                ue !== Ie && s("tween", ae, W), (this.unit = ue);
              }
              (ae = parseFloat(ae)),
                (W = parseFloat(W)),
                (this.begin = this.value = ae),
                (this.change = W - ae);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = i);
            });
          var te = [],
            ve = 1e3;
        }),
        se = d(R, function (l) {
          (l.init = function (h) {
            (this.duration = h.duration || 0),
              (this.complete = h.complete || i),
              (this.context = h.context),
              this.play();
          }),
            (l.render = function (h) {
              var y = h - this.start;
              y < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Se = d(R, function (l, h) {
          (l.init = function (y) {
            (this.context = y.context),
              (this.update = y.update),
              (this.tweens = []),
              (this.current = y.current);
            var m, g;
            for (m in y.values)
              (g = y.values[m]),
                this.current[m] !== g &&
                  this.tweens.push(
                    new R({
                      name: m,
                      from: this.current[m],
                      to: g,
                      duration: y.duration,
                      delay: y.delay,
                      ease: y.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (y) {
              var m,
                g,
                O = this.tweens.length,
                z = !1;
              for (m = O; m--; )
                (g = this.tweens[m]),
                  g.context &&
                    (g.render(y), (this.current[g.name] = g.value), (z = !0));
              return z
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((h.destroy.call(this), this.tweens)) {
                var y,
                  m = this.tweens.length;
                for (y = m; y--; ) this.tweens[y].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        le = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !X.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!X.transition) return (le.fallback = !0);
        le.agentTests.push("(" + l + ")");
        var h = new RegExp(le.agentTests.join("|"), "i");
        le.fallback = h.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new R(l);
        }),
        (t.delay = function (l, h, y) {
          return new se({ complete: h, duration: l, context: y });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var We = e.style,
        rt = e.css,
        Ir = { transform: X.transform && X.transform.css },
        Tr = {
          color: [p, q],
          background: [p, q, "background-color"],
          "outline-color": [p, q],
          "border-color": [p, q],
          "border-top-color": [p, q],
          "border-right-color": [p, q],
          "border-bottom-color": [p, q],
          "border-left-color": [p, q],
          "border-width": [U, N],
          "border-top-width": [U, N],
          "border-right-width": [U, N],
          "border-bottom-width": [U, N],
          "border-left-width": [U, N],
          "border-spacing": [U, N],
          "letter-spacing": [U, N],
          margin: [U, N],
          "margin-top": [U, N],
          "margin-right": [U, N],
          "margin-bottom": [U, N],
          "margin-left": [U, N],
          padding: [U, N],
          "padding-top": [U, N],
          "padding-right": [U, N],
          "padding-bottom": [U, N],
          "padding-left": [U, N],
          "outline-width": [U, N],
          opacity: [U, T],
          top: [U, P],
          right: [U, P],
          bottom: [U, P],
          left: [U, P],
          "font-size": [U, P],
          "text-indent": [U, P],
          "word-spacing": [U, P],
          width: [U, P],
          "min-width": [U, P],
          "max-width": [U, P],
          height: [U, P],
          "min-height": [U, P],
          "max-height": [U, P],
          "line-height": [U, K],
          "scroll-top": [B, T, "scrollTop"],
          "scroll-left": [B, T, "scrollLeft"],
        },
        nt = {};
      X.transform &&
        ((Tr.transform = [j]),
        (nt = {
          x: [P, "translateX"],
          y: [P, "translateY"],
          rotate: [G],
          rotateX: [G],
          rotateY: [G],
          scale: [T],
          scaleX: [T],
          scaleY: [T],
          skew: [G],
          skewX: [G],
          skewY: [G],
        })),
        X.transform &&
          X.backface &&
          ((nt.z = [P, "translateZ"]),
          (nt.rotateZ = [G]),
          (nt.scaleZ = [T]),
          (nt.perspective = [N]));
      var Fi = /ms/,
        on = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var As = u((LW, Ss) => {
    var yI = window.$,
      II = Gi() && yI.tram;
    Ss.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        o = Function.prototype,
        i = r.push,
        a = r.slice,
        s = r.concat,
        c = n.toString,
        f = n.hasOwnProperty,
        v = r.forEach,
        d = r.map,
        E = r.reduce,
        I = r.reduceRight,
        S = r.filter,
        A = r.every,
        L = r.some,
        b = r.indexOf,
        w = r.lastIndexOf,
        T = Array.isArray,
        q = Object.keys,
        N = o.bind,
        P =
          (e.each =
          e.forEach =
            function (_, D, F) {
              if (_ == null) return _;
              if (v && _.forEach === v) _.forEach(D, F);
              else if (_.length === +_.length) {
                for (var X = 0, Q = _.length; X < Q; X++)
                  if (D.call(F, _[X], X, _) === t) return;
              } else
                for (var ee = e.keys(_), X = 0, Q = ee.length; X < Q; X++)
                  if (D.call(F, _[ee[X]], ee[X], _) === t) return;
              return _;
            });
      (e.map = e.collect =
        function (_, D, F) {
          var X = [];
          return _ == null
            ? X
            : d && _.map === d
            ? _.map(D, F)
            : (P(_, function (Q, ee, x) {
                X.push(D.call(F, Q, ee, x));
              }),
              X);
        }),
        (e.find = e.detect =
          function (_, D, F) {
            var X;
            return (
              G(_, function (Q, ee, x) {
                if (D.call(F, Q, ee, x)) return (X = Q), !0;
              }),
              X
            );
          }),
        (e.filter = e.select =
          function (_, D, F) {
            var X = [];
            return _ == null
              ? X
              : S && _.filter === S
              ? _.filter(D, F)
              : (P(_, function (Q, ee, x) {
                  D.call(F, Q, ee, x) && X.push(Q);
                }),
                X);
          });
      var G =
        (e.some =
        e.any =
          function (_, D, F) {
            D || (D = e.identity);
            var X = !1;
            return _ == null
              ? X
              : L && _.some === L
              ? _.some(D, F)
              : (P(_, function (Q, ee, x) {
                  if (X || (X = D.call(F, Q, ee, x))) return t;
                }),
                !!X);
          });
      (e.contains = e.include =
        function (_, D) {
          return _ == null
            ? !1
            : b && _.indexOf === b
            ? _.indexOf(D) != -1
            : G(_, function (F) {
                return F === D;
              });
        }),
        (e.delay = function (_, D) {
          var F = a.call(arguments, 2);
          return setTimeout(function () {
            return _.apply(null, F);
          }, D);
        }),
        (e.defer = function (_) {
          return e.delay.apply(e, [_, 1].concat(a.call(arguments, 1)));
        }),
        (e.throttle = function (_) {
          var D, F, X;
          return function () {
            D ||
              ((D = !0),
              (F = arguments),
              (X = this),
              II.frame(function () {
                (D = !1), _.apply(X, F);
              }));
          };
        }),
        (e.debounce = function (_, D, F) {
          var X,
            Q,
            ee,
            x,
            H,
            k = function () {
              var V = e.now() - x;
              V < D
                ? (X = setTimeout(k, D - V))
                : ((X = null), F || ((H = _.apply(ee, Q)), (ee = Q = null)));
            };
          return function () {
            (ee = this), (Q = arguments), (x = e.now());
            var V = F && !X;
            return (
              X || (X = setTimeout(k, D)),
              V && ((H = _.apply(ee, Q)), (ee = Q = null)),
              H
            );
          };
        }),
        (e.defaults = function (_) {
          if (!e.isObject(_)) return _;
          for (var D = 1, F = arguments.length; D < F; D++) {
            var X = arguments[D];
            for (var Q in X) _[Q] === void 0 && (_[Q] = X[Q]);
          }
          return _;
        }),
        (e.keys = function (_) {
          if (!e.isObject(_)) return [];
          if (q) return q(_);
          var D = [];
          for (var F in _) e.has(_, F) && D.push(F);
          return D;
        }),
        (e.has = function (_, D) {
          return f.call(_, D);
        }),
        (e.isObject = function (_) {
          return _ === Object(_);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var K = /(.)^/,
        Y = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        re = /\\|'|\r|\n|\u2028|\u2029/g,
        J = function (_) {
          return "\\" + Y[_];
        },
        M = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (_, D, F) {
          !D && F && (D = F), (D = e.defaults({}, D, e.templateSettings));
          var X = RegExp(
              [
                (D.escape || K).source,
                (D.interpolate || K).source,
                (D.evaluate || K).source,
              ].join("|") + "|$",
              "g"
            ),
            Q = 0,
            ee = "__p+='";
          _.replace(X, function (V, U, p, B, j) {
            return (
              (ee += _.slice(Q, j).replace(re, J)),
              (Q = j + V.length),
              U
                ? (ee +=
                    `'+
((__t=(` +
                    U +
                    `))==null?'':_.escape(__t))+
'`)
                : p
                ? (ee +=
                    `'+
((__t=(` +
                    p +
                    `))==null?'':__t)+
'`)
                : B &&
                  (ee +=
                    `';
` +
                    B +
                    `
__p+='`),
              V
            );
          }),
            (ee += `';
`);
          var x = D.variable;
          if (x) {
            if (!M.test(x))
              throw new Error("variable is not a bare identifier: " + x);
          } else
            (ee =
              `with(obj||{}){
` +
              ee +
              `}
`),
              (x = "obj");
          ee =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ee +
            `return __p;
`;
          var H;
          try {
            H = new Function(D.variable || "obj", "_", ee);
          } catch (V) {
            throw ((V.source = ee), V);
          }
          var k = function (V) {
            return H.call(this, V, e);
          };
          return (
            (k.source =
              "function(" +
              x +
              `){
` +
              ee +
              "}"),
            k
          );
        }),
        e
      );
    })();
  });
  var Ke = u((xW, Ls) => {
    var de = {},
      Bt = {},
      Ht = [],
      Xi = window.Webflow || [],
      yt = window.jQuery,
      ke = yt(window),
      TI = yt(document),
      ot = yt.isFunction,
      je = (de._ = As()),
      ws = (de.tram = Gi() && yt.tram),
      un = !1,
      Vi = !1;
    ws.config.hideBackface = !1;
    ws.config.keepInherited = !0;
    de.define = function (e, t, r) {
      Bt[e] && Cs(Bt[e]);
      var n = (Bt[e] = t(yt, je, r) || {});
      return Rs(n), n;
    };
    de.require = function (e) {
      return Bt[e];
    };
    function Rs(e) {
      de.env() &&
        (ot(e.design) && ke.on("__wf_design", e.design),
        ot(e.preview) && ke.on("__wf_preview", e.preview)),
        ot(e.destroy) && ke.on("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && mI(e);
    }
    function mI(e) {
      if (un) {
        e.ready();
        return;
      }
      je.contains(Ht, e.ready) || Ht.push(e.ready);
    }
    function Cs(e) {
      ot(e.design) && ke.off("__wf_design", e.design),
        ot(e.preview) && ke.off("__wf_preview", e.preview),
        ot(e.destroy) && ke.off("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && OI(e);
    }
    function OI(e) {
      Ht = je.filter(Ht, function (t) {
        return t !== e.ready;
      });
    }
    de.push = function (e) {
      if (un) {
        ot(e) && e();
        return;
      }
      Xi.push(e);
    };
    de.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var sn = navigator.userAgent.toLowerCase(),
      Ns = (de.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      SI = (de.env.chrome =
        /chrome/.test(sn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(sn.match(/chrome\/(\d+)\./)[1], 10)),
      AI = (de.env.ios = /(ipod|iphone|ipad)/.test(sn));
    de.env.safari = /safari/.test(sn) && !SI && !AI;
    var Ui;
    Ns &&
      TI.on("touchstart mousedown", function (e) {
        Ui = e.target;
      });
    de.validClick = Ns
      ? function (e) {
          return e === Ui || yt.contains(e, Ui);
        }
      : function () {
          return !0;
        };
    var qs = "resize.webflow orientationchange.webflow load.webflow",
      bI = "scroll.webflow " + qs;
    de.resize = Wi(ke, qs);
    de.scroll = Wi(ke, bI);
    de.redraw = Wi();
    function Wi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = je.throttle(function (o) {
          je.each(r, function (i) {
            i(o);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (o) {
          typeof o == "function" && (je.contains(r, o) || r.push(o));
        }),
        (n.off = function (o) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = je.filter(r, function (i) {
            return i !== o;
          });
        }),
        n
      );
    }
    de.location = function (e) {
      window.location = e;
    };
    de.env() && (de.location = function () {});
    de.ready = function () {
      (un = !0), Vi ? wI() : je.each(Ht, bs), je.each(Xi, bs), de.resize.up();
    };
    function bs(e) {
      ot(e) && e();
    }
    function wI() {
      (Vi = !1), je.each(Bt, Rs);
    }
    var Ct;
    de.load = function (e) {
      Ct.then(e);
    };
    function Ps() {
      Ct && (Ct.reject(), ke.off("load", Ct.resolve)),
        (Ct = new yt.Deferred()),
        ke.on("load", Ct.resolve);
    }
    de.destroy = function (e) {
      (e = e || {}),
        (Vi = !0),
        ke.triggerHandler("__wf_destroy"),
        e.domready != null && (un = e.domready),
        je.each(Bt, Cs),
        de.resize.off(),
        de.scroll.off(),
        de.redraw.off(),
        (Ht = []),
        (Xi = []),
        Ct.state() === "pending" && Ps();
    };
    yt(de.ready);
    Ps();
    Ls.exports = window.Webflow = de;
  });
  var Ds = u((MW, Ms) => {
    var xs = Ke();
    xs.define(
      "brand",
      (Ms.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          o = e("body"),
          i = "",
          a = window.location,
          s = /PhantomJS/i.test(navigator.userAgent),
          c =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          f;
        t.ready = function () {
          var I = n.attr("data-wf-status"),
            S = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(S) && a.hostname !== S && (I = !0),
            I &&
              !s &&
              ((f = f || d()),
              E(),
              setTimeout(E, 500),
              e(r).off(c, v).on(c, v));
        };
        function v() {
          var I =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(f).attr("style", I ? "display: none !important;" : "");
        }
        function d() {
          var I = e('<a class=""></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            S = e("<img>")
              .attr(
                "src",
                ""
              )
              .attr("alt", "")
              .css({ marginRight: "8px", width: "16px" }),
            A = e("<img>")
              .attr(
                "src",
                ""
              )
              .attr("alt", "Made in Webflow");
          return I.append(S, A), I[0];
        }
        function E() {
          var I = o.children(i),
            S = I.length && I.get(0) === f,
            A = xs.env("editor");
          if (S) {
            A && I.remove();
            return;
          }
          I.length && I.remove(), A || o.append(f);
        }
        return t;
      })
    );
  });
  var Gs = u((DW, Fs) => {
    var Bi = Ke();
    Bi.define(
      "edit",
      (Fs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Bi.env("test") || Bi.env("frame")) && !r.fixture && !RI())
        )
          return { exit: 1 };
        var n = {},
          o = e(window),
          i = e(document.documentElement),
          a = document.location,
          s = "hashchange",
          c,
          f = r.load || E,
          v = !1;
        try {
          v =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        v
          ? f()
          : a.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(a.search) ||
              /\?edit$/.test(a.href)) &&
            f()
          : o.on(s, d).triggerHandler(s);
        function d() {
          c || (/\?edit/.test(a.hash) && f());
        }
        function E() {
          (c = !0),
            (window.WebflowEditor = !0),
            o.off(s, d),
            w(function (q) {
              e.ajax({
                url: b("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: i.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: I(q),
              });
            });
        }
        function I(q) {
          return function (N) {
            if (!N) {
              console.error("Could not load editor data");
              return;
            }
            (N.thirdPartyCookiesSupported = q),
              S(L(N.bugReporterScriptPath), function () {
                S(L(N.scriptPath), function () {
                  window.WebflowEditor(N);
                });
              });
          };
        }
        function S(q, N) {
          e.ajax({ type: "GET", url: q, dataType: "script", cache: !0 }).then(
            N,
            A
          );
        }
        function A(q, N, P) {
          throw (console.error("Could not load editor script: " + N), P);
        }
        function L(q) {
          return q.indexOf("//") >= 0
            ? q
            : b("https://editor-api.webflow.com" + q);
        }
        function b(q) {
          return q.replace(/([^:])\/\//g, "$1/");
        }
        function w(q) {
          var N = window.document.createElement("iframe");
          (N.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (N.style.display = "none"),
            (N.sandbox = "allow-scripts allow-same-origin");
          var P = function (G) {
            G.data === "WF_third_party_cookies_unsupported"
              ? (T(N, P), q(!1))
              : G.data === "WF_third_party_cookies_supported" &&
                (T(N, P), q(!0));
          };
          (N.onerror = function () {
            T(N, P), q(!1);
          }),
            window.addEventListener("message", P, !1),
            window.document.body.appendChild(N);
        }
        function T(q, N) {
          window.removeEventListener("message", N, !1), q.remove();
        }
        return n;
      })
    );
    function RI() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Xs = u((FW, Us) => {
    var CI = Ke();
    CI.define(
      "focus-visible",
      (Us.exports = function () {
        function e(r) {
          var n = !0,
            o = !1,
            i = null,
            a = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function s(T) {
            return !!(
              T &&
              T !== document &&
              T.nodeName !== "HTML" &&
              T.nodeName !== "BODY" &&
              "classList" in T &&
              "contains" in T.classList
            );
          }
          function c(T) {
            var q = T.type,
              N = T.tagName;
            return !!(
              (N === "INPUT" && a[q] && !T.readOnly) ||
              (N === "TEXTAREA" && !T.readOnly) ||
              T.isContentEditable
            );
          }
          function f(T) {
            T.getAttribute("data-wf-focus-visible") ||
              T.setAttribute("data-wf-focus-visible", "true");
          }
          function v(T) {
            T.getAttribute("data-wf-focus-visible") &&
              T.removeAttribute("data-wf-focus-visible");
          }
          function d(T) {
            T.metaKey ||
              T.altKey ||
              T.ctrlKey ||
              (s(r.activeElement) && f(r.activeElement), (n = !0));
          }
          function E() {
            n = !1;
          }
          function I(T) {
            s(T.target) && (n || c(T.target)) && f(T.target);
          }
          function S(T) {
            s(T.target) &&
              T.target.hasAttribute("data-wf-focus-visible") &&
              ((o = !0),
              window.clearTimeout(i),
              (i = window.setTimeout(function () {
                o = !1;
              }, 100)),
              v(T.target));
          }
          function A() {
            document.visibilityState === "hidden" && (o && (n = !0), L());
          }
          function L() {
            document.addEventListener("mousemove", w),
              document.addEventListener("mousedown", w),
              document.addEventListener("mouseup", w),
              document.addEventListener("pointermove", w),
              document.addEventListener("pointerdown", w),
              document.addEventListener("pointerup", w),
              document.addEventListener("touchmove", w),
              document.addEventListener("touchstart", w),
              document.addEventListener("touchend", w);
          }
          function b() {
            document.removeEventListener("mousemove", w),
              document.removeEventListener("mousedown", w),
              document.removeEventListener("mouseup", w),
              document.removeEventListener("pointermove", w),
              document.removeEventListener("pointerdown", w),
              document.removeEventListener("pointerup", w),
              document.removeEventListener("touchmove", w),
              document.removeEventListener("touchstart", w),
              document.removeEventListener("touchend", w);
          }
          function w(T) {
            (T.target.nodeName && T.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), b());
          }
          document.addEventListener("keydown", d, !0),
            document.addEventListener("mousedown", E, !0),
            document.addEventListener("pointerdown", E, !0),
            document.addEventListener("touchstart", E, !0),
            document.addEventListener("visibilitychange", A, !0),
            L(),
            r.addEventListener("focus", I, !0),
            r.addEventListener("blur", S, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Bs = u((GW, Ws) => {
    var Vs = Ke();
    Vs.define(
      "focus",
      (Ws.exports = function () {
        var e = [],
          t = !1;
        function r(a) {
          t &&
            (a.preventDefault(),
            a.stopPropagation(),
            a.stopImmediatePropagation(),
            e.unshift(a));
        }
        function n(a) {
          var s = a.target,
            c = s.tagName;
          return (
            (/^a$/i.test(c) && s.href != null) ||
            (/^(button|textarea)$/i.test(c) && s.disabled !== !0) ||
            (/^input$/i.test(c) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(s.type) &&
              !s.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(c) &&
              !Number.isNaN(Number.parseFloat(s.tabIndex))) ||
            /^audio$/i.test(c) ||
            (/^video$/i.test(c) && s.controls === !0)
          );
        }
        function o(a) {
          n(a) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, a.target.focus(); e.length > 0; ) {
                var s = e.pop();
                s.target.dispatchEvent(new MouseEvent(s.type, s));
              }
            }, 0));
        }
        function i() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Vs.env.safari &&
            (document.addEventListener("mousedown", o, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: i };
      })
    );
  });
  var ks = u((UW, js) => {
    "use strict";
    var Hi = window.jQuery,
      at = {},
      cn = [],
      Hs = ".w-ix",
      ln = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Hi(t).triggerHandler(at.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Hi(t).triggerHandler(at.types.OUTRO));
        },
      };
    at.triggers = {};
    at.types = { INTRO: "w-ix-intro" + Hs, OUTRO: "w-ix-outro" + Hs };
    at.init = function () {
      for (var e = cn.length, t = 0; t < e; t++) {
        var r = cn[t];
        r[0](0, r[1]);
      }
      (cn = []), Hi.extend(at.triggers, ln);
    };
    at.async = function () {
      for (var e in ln) {
        var t = ln[e];
        ln.hasOwnProperty(e) &&
          (at.triggers[e] = function (r, n) {
            cn.push([t, n]);
          });
      }
    };
    at.async();
    js.exports = at;
  });
  var ki = u((XW, Ys) => {
    "use strict";
    var ji = ks();
    function Ks(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var NI = window.jQuery,
      fn = {},
      zs = ".w-ix",
      qI = {
        reset: function (e, t) {
          ji.triggers.reset(e, t);
        },
        intro: function (e, t) {
          ji.triggers.intro(e, t), Ks(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          ji.triggers.outro(e, t), Ks(t, "COMPONENT_INACTIVE");
        },
      };
    fn.triggers = {};
    fn.types = { INTRO: "w-ix-intro" + zs, OUTRO: "w-ix-outro" + zs };
    NI.extend(fn.triggers, qI);
    Ys.exports = fn;
  });
  var $s = u((VW, vt) => {
    function Ki(e) {
      return (
        (vt.exports = Ki =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (vt.exports.__esModule = !0),
        (vt.exports.default = vt.exports),
        Ki(e)
      );
    }
    (vt.exports = Ki),
      (vt.exports.__esModule = !0),
      (vt.exports.default = vt.exports);
  });
  var Nt = u((WW, Or) => {
    var PI = $s().default;
    function Qs(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (Qs = function (o) {
        return o ? r : t;
      })(e);
    }
    function LI(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (PI(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = Qs(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, i, a)
            : (n[i] = e[i]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Or.exports = LI),
      (Or.exports.__esModule = !0),
      (Or.exports.default = Or.exports);
  });
  var ze = u((BW, Sr) => {
    function xI(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Sr.exports = xI),
      (Sr.exports.__esModule = !0),
      (Sr.exports.default = Sr.exports);
  });
  var he = u((HW, Zs) => {
    var dn = function (e) {
      return e && e.Math == Math && e;
    };
    Zs.exports =
      dn(typeof globalThis == "object" && globalThis) ||
      dn(typeof window == "object" && window) ||
      dn(typeof self == "object" && self) ||
      dn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var jt = u((jW, Js) => {
    Js.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var qt = u((kW, eu) => {
    var MI = jt();
    eu.exports = !MI(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var pn = u((KW, tu) => {
    var Ar = Function.prototype.call;
    tu.exports = Ar.bind
      ? Ar.bind(Ar)
      : function () {
          return Ar.apply(Ar, arguments);
        };
  });
  var ou = u((iu) => {
    "use strict";
    var ru = {}.propertyIsEnumerable,
      nu = Object.getOwnPropertyDescriptor,
      DI = nu && !ru.call({ 1: 2 }, 1);
    iu.f = DI
      ? function (t) {
          var r = nu(this, t);
          return !!r && r.enumerable;
        }
      : ru;
  });
  var zi = u((YW, au) => {
    au.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Ye = u(($W, uu) => {
    var su = Function.prototype,
      Yi = su.bind,
      $i = su.call,
      FI = Yi && Yi.bind($i);
    uu.exports = Yi
      ? function (e) {
          return e && FI($i, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return $i.apply(e, arguments);
            }
          );
        };
  });
  var fu = u((QW, lu) => {
    var cu = Ye(),
      GI = cu({}.toString),
      UI = cu("".slice);
    lu.exports = function (e) {
      return UI(GI(e), 8, -1);
    };
  });
  var pu = u((ZW, du) => {
    var XI = he(),
      VI = Ye(),
      WI = jt(),
      BI = fu(),
      Qi = XI.Object,
      HI = VI("".split);
    du.exports = WI(function () {
      return !Qi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return BI(e) == "String" ? HI(e, "") : Qi(e);
        }
      : Qi;
  });
  var Zi = u((JW, vu) => {
    var jI = he(),
      kI = jI.TypeError;
    vu.exports = function (e) {
      if (e == null) throw kI("Can't call method on " + e);
      return e;
    };
  });
  var br = u((eB, Eu) => {
    var KI = pu(),
      zI = Zi();
    Eu.exports = function (e) {
      return KI(zI(e));
    };
  });
  var st = u((tB, hu) => {
    hu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var kt = u((rB, gu) => {
    var YI = st();
    gu.exports = function (e) {
      return typeof e == "object" ? e !== null : YI(e);
    };
  });
  var wr = u((nB, _u) => {
    var Ji = he(),
      $I = st(),
      QI = function (e) {
        return $I(e) ? e : void 0;
      };
    _u.exports = function (e, t) {
      return arguments.length < 2 ? QI(Ji[e]) : Ji[e] && Ji[e][t];
    };
  });
  var Iu = u((iB, yu) => {
    var ZI = Ye();
    yu.exports = ZI({}.isPrototypeOf);
  });
  var mu = u((oB, Tu) => {
    var JI = wr();
    Tu.exports = JI("navigator", "userAgent") || "";
  });
  var Cu = u((aB, Ru) => {
    var wu = he(),
      eo = mu(),
      Ou = wu.process,
      Su = wu.Deno,
      Au = (Ou && Ou.versions) || (Su && Su.version),
      bu = Au && Au.v8,
      $e,
      vn;
    bu &&
      (($e = bu.split(".")),
      (vn = $e[0] > 0 && $e[0] < 4 ? 1 : +($e[0] + $e[1])));
    !vn &&
      eo &&
      (($e = eo.match(/Edge\/(\d+)/)),
      (!$e || $e[1] >= 74) &&
        (($e = eo.match(/Chrome\/(\d+)/)), $e && (vn = +$e[1])));
    Ru.exports = vn;
  });
  var to = u((sB, qu) => {
    var Nu = Cu(),
      eT = jt();
    qu.exports =
      !!Object.getOwnPropertySymbols &&
      !eT(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Nu && Nu < 41)
        );
      });
  });
  var ro = u((uB, Pu) => {
    var tT = to();
    Pu.exports = tT && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var no = u((cB, Lu) => {
    var rT = he(),
      nT = wr(),
      iT = st(),
      oT = Iu(),
      aT = ro(),
      sT = rT.Object;
    Lu.exports = aT
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = nT("Symbol");
          return iT(t) && oT(t.prototype, sT(e));
        };
  });
  var Mu = u((lB, xu) => {
    var uT = he(),
      cT = uT.String;
    xu.exports = function (e) {
      try {
        return cT(e);
      } catch {
        return "Object";
      }
    };
  });
  var Fu = u((fB, Du) => {
    var lT = he(),
      fT = st(),
      dT = Mu(),
      pT = lT.TypeError;
    Du.exports = function (e) {
      if (fT(e)) return e;
      throw pT(dT(e) + " is not a function");
    };
  });
  var Uu = u((dB, Gu) => {
    var vT = Fu();
    Gu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : vT(r);
    };
  });
  var Vu = u((pB, Xu) => {
    var ET = he(),
      io = pn(),
      oo = st(),
      ao = kt(),
      hT = ET.TypeError;
    Xu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && oo((r = e.toString)) && !ao((n = io(r, e)))) ||
        (oo((r = e.valueOf)) && !ao((n = io(r, e)))) ||
        (t !== "string" && oo((r = e.toString)) && !ao((n = io(r, e))))
      )
        return n;
      throw hT("Can't convert object to primitive value");
    };
  });
  var Bu = u((vB, Wu) => {
    Wu.exports = !1;
  });
  var En = u((EB, ju) => {
    var Hu = he(),
      gT = Object.defineProperty;
    ju.exports = function (e, t) {
      try {
        gT(Hu, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Hu[e] = t;
      }
      return t;
    };
  });
  var hn = u((hB, Ku) => {
    var _T = he(),
      yT = En(),
      ku = "__core-js_shared__",
      IT = _T[ku] || yT(ku, {});
    Ku.exports = IT;
  });
  var so = u((gB, Yu) => {
    var TT = Bu(),
      zu = hn();
    (Yu.exports = function (e, t) {
      return zu[e] || (zu[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: TT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var Qu = u((_B, $u) => {
    var mT = he(),
      OT = Zi(),
      ST = mT.Object;
    $u.exports = function (e) {
      return ST(OT(e));
    };
  });
  var It = u((yB, Zu) => {
    var AT = Ye(),
      bT = Qu(),
      wT = AT({}.hasOwnProperty);
    Zu.exports =
      Object.hasOwn ||
      function (t, r) {
        return wT(bT(t), r);
      };
  });
  var uo = u((IB, Ju) => {
    var RT = Ye(),
      CT = 0,
      NT = Math.random(),
      qT = RT((1).toString);
    Ju.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + qT(++CT + NT, 36);
    };
  });
  var co = u((TB, ic) => {
    var PT = he(),
      LT = so(),
      ec = It(),
      xT = uo(),
      tc = to(),
      nc = ro(),
      Kt = LT("wks"),
      Pt = PT.Symbol,
      rc = Pt && Pt.for,
      MT = nc ? Pt : (Pt && Pt.withoutSetter) || xT;
    ic.exports = function (e) {
      if (!ec(Kt, e) || !(tc || typeof Kt[e] == "string")) {
        var t = "Symbol." + e;
        tc && ec(Pt, e)
          ? (Kt[e] = Pt[e])
          : nc && rc
          ? (Kt[e] = rc(t))
          : (Kt[e] = MT(t));
      }
      return Kt[e];
    };
  });
  var uc = u((mB, sc) => {
    var DT = he(),
      FT = pn(),
      oc = kt(),
      ac = no(),
      GT = Uu(),
      UT = Vu(),
      XT = co(),
      VT = DT.TypeError,
      WT = XT("toPrimitive");
    sc.exports = function (e, t) {
      if (!oc(e) || ac(e)) return e;
      var r = GT(e, WT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = FT(r, e, t)), !oc(n) || ac(n))
        )
          return n;
        throw VT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), UT(e, t);
    };
  });
  var lo = u((OB, cc) => {
    var BT = uc(),
      HT = no();
    cc.exports = function (e) {
      var t = BT(e, "string");
      return HT(t) ? t : t + "";
    };
  });
  var po = u((SB, fc) => {
    var jT = he(),
      lc = kt(),
      fo = jT.document,
      kT = lc(fo) && lc(fo.createElement);
    fc.exports = function (e) {
      return kT ? fo.createElement(e) : {};
    };
  });
  var vo = u((AB, dc) => {
    var KT = qt(),
      zT = jt(),
      YT = po();
    dc.exports =
      !KT &&
      !zT(function () {
        return (
          Object.defineProperty(YT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var Eo = u((vc) => {
    var $T = qt(),
      QT = pn(),
      ZT = ou(),
      JT = zi(),
      em = br(),
      tm = lo(),
      rm = It(),
      nm = vo(),
      pc = Object.getOwnPropertyDescriptor;
    vc.f = $T
      ? pc
      : function (t, r) {
          if (((t = em(t)), (r = tm(r)), nm))
            try {
              return pc(t, r);
            } catch {}
          if (rm(t, r)) return JT(!QT(ZT.f, t, r), t[r]);
        };
  });
  var Rr = u((wB, hc) => {
    var Ec = he(),
      im = kt(),
      om = Ec.String,
      am = Ec.TypeError;
    hc.exports = function (e) {
      if (im(e)) return e;
      throw am(om(e) + " is not an object");
    };
  });
  var Cr = u((yc) => {
    var sm = he(),
      um = qt(),
      cm = vo(),
      gc = Rr(),
      lm = lo(),
      fm = sm.TypeError,
      _c = Object.defineProperty;
    yc.f = um
      ? _c
      : function (t, r, n) {
          if ((gc(t), (r = lm(r)), gc(n), cm))
            try {
              return _c(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw fm("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var gn = u((CB, Ic) => {
    var dm = qt(),
      pm = Cr(),
      vm = zi();
    Ic.exports = dm
      ? function (e, t, r) {
          return pm.f(e, t, vm(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var go = u((NB, Tc) => {
    var Em = Ye(),
      hm = st(),
      ho = hn(),
      gm = Em(Function.toString);
    hm(ho.inspectSource) ||
      (ho.inspectSource = function (e) {
        return gm(e);
      });
    Tc.exports = ho.inspectSource;
  });
  var Sc = u((qB, Oc) => {
    var _m = he(),
      ym = st(),
      Im = go(),
      mc = _m.WeakMap;
    Oc.exports = ym(mc) && /native code/.test(Im(mc));
  });
  var _o = u((PB, bc) => {
    var Tm = so(),
      mm = uo(),
      Ac = Tm("keys");
    bc.exports = function (e) {
      return Ac[e] || (Ac[e] = mm(e));
    };
  });
  var _n = u((LB, wc) => {
    wc.exports = {};
  });
  var Lc = u((xB, Pc) => {
    var Om = Sc(),
      qc = he(),
      yo = Ye(),
      Sm = kt(),
      Am = gn(),
      Io = It(),
      To = hn(),
      bm = _o(),
      wm = _n(),
      Rc = "Object already initialized",
      Oo = qc.TypeError,
      Rm = qc.WeakMap,
		 
		 
      yn,
      Nr,
      In,
      Cm = function (e) {
        return In(e) ? Nr(e) : yn(e, {});
      },
      Nm = function (e) {
        return function (t) {
          var r;
          if (!Sm(t) || (r = Nr(t)).type !== e)
            throw Oo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    Om || To.state
      ? ((Tt = To.state || (To.state = new Rm())),
        (Cc = yo(Tt.get)),
        (mo = yo(Tt.has)),
        (Nc = yo(Tt.set)),
        (yn = function (e, t) {
          if (mo(Tt, e)) throw new Oo(Rc);
          return (t.facade = e), Nc(Tt, e, t), t;
        }),
        (Nr = function (e) {
          return Cc(Tt, e) || {};
        }),
        (In = function (e) {
          return mo(Tt, e);
        }))
      : ((Lt = bm("state")),
        (wm[Lt] = !0),
        (yn = function (e, t) {
          if (Io(e, Lt)) throw new Oo(Rc);
          return (t.facade = e), Am(e, Lt, t), t;
        }),
        (Nr = function (e) {
          return Io(e, Lt) ? e[Lt] : {};
        }),
        (In = function (e) {
          return Io(e, Lt);
        }));
    var Tt, Cc, mo, Nc, Lt;
    Pc.exports = { set: yn, get: Nr, has: In, enforce: Cm, getterFor: Nm };
  });
  var Dc = u((MB, Mc) => {
    var So = qt(),
      qm = It(),
      xc = Function.prototype,
      Pm = So && Object.getOwnPropertyDescriptor,
      Ao = qm(xc, "name"),
      Lm = Ao && function () {}.name === "something",
      xm = Ao && (!So || (So && Pm(xc, "name").configurable));
    Mc.exports = { EXISTS: Ao, PROPER: Lm, CONFIGURABLE: xm };
  });
  var Vc = u((DB, Xc) => {
    var Mm = he(),
      Fc = st(),
      Dm = It(),
      Gc = gn(),
      Fm = En(),
      Gm = go(),
      Uc = Lc(),
      Um = Dc().CONFIGURABLE,
      Xm = Uc.get,
      Vm = Uc.enforce,
      Wm = String(String).split("String");
    (Xc.exports = function (e, t, r, n) {
      var o = n ? !!n.unsafe : !1,
        i = n ? !!n.enumerable : !1,
        a = n ? !!n.noTargetGet : !1,
        s = n && n.name !== void 0 ? n.name : t,
        c;
      if (
        (Fc(r) &&
          (String(s).slice(0, 7) === "Symbol(" &&
            (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!Dm(r, "name") || (Um && r.name !== s)) && Gc(r, "name", s),
          (c = Vm(r)),
          c.source || (c.source = Wm.join(typeof s == "string" ? s : ""))),
        e === Mm)
      ) {
        i ? (e[t] = r) : Fm(t, r);
        return;
      } else o ? !a && e[t] && (i = !0) : delete e[t];
      i ? (e[t] = r) : Gc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Fc(this) && Xm(this).source) || Gm(this);
    });
  });
  var bo = u((FB, Wc) => {
    var Bm = Math.ceil,
      Hm = Math.floor;
    Wc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? Hm : Bm)(t);
    };
  });
  var Hc = u((GB, Bc) => {
    var jm = bo(),
      km = Math.max,
      Km = Math.min;
    Bc.exports = function (e, t) {
      var r = jm(e);
      return r < 0 ? km(r + t, 0) : Km(r, t);
    };
  });
  var kc = u((UB, jc) => {
    var zm = bo(),
      Ym = Math.min;
    jc.exports = function (e) {
      return e > 0 ? Ym(zm(e), 9007199254740991) : 0;
    };
  });
  var zc = u((XB, Kc) => {
    var $m = kc();
    Kc.exports = function (e) {
      return $m(e.length);
    };
  });
  var wo = u((VB, $c) => {
    var Qm = br(),
      Zm = Hc(),
      Jm = zc(),
      Yc = function (e) {
        return function (t, r, n) {
          var o = Qm(t),
            i = Jm(o),
            a = Zm(n, i),
            s;
          if (e && r != r) {
            for (; i > a; ) if (((s = o[a++]), s != s)) return !0;
          } else
            for (; i > a; a++)
              if ((e || a in o) && o[a] === r) return e || a || 0;
          return !e && -1;
        };
      };
    $c.exports = { includes: Yc(!0), indexOf: Yc(!1) };
  });
  var Co = u((WB, Zc) => {
    var eO = Ye(),
      Ro = It(),
      tO = br(),
      rO = wo().indexOf,
      nO = _n(),
      Qc = eO([].push);
    Zc.exports = function (e, t) {
      var r = tO(e),
        n = 0,
        o = [],
        i;
      for (i in r) !Ro(nO, i) && Ro(r, i) && Qc(o, i);
      for (; t.length > n; ) Ro(r, (i = t[n++])) && (~rO(o, i) || Qc(o, i));
      return o;
    };
  });
  var Tn = u((BB, Jc) => {
    Jc.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var tl = u((el) => {
    var iO = Co(),
      oO = Tn(),
      aO = oO.concat("length", "prototype");
    el.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return iO(t, aO);
      };
  });
  var nl = u((rl) => {
    rl.f = Object.getOwnPropertySymbols;
  });
  var ol = u((kB, il) => {
    var sO = wr(),
      uO = Ye(),
      cO = tl(),
      lO = nl(),
      fO = Rr(),
      dO = uO([].concat);
    il.exports =
      sO("Reflect", "ownKeys") ||
      function (t) {
        var r = cO.f(fO(t)),
          n = lO.f;
        return n ? dO(r, n(t)) : r;
      };
  });
  var sl = u((KB, al) => {
    var pO = It(),
      vO = ol(),
      EO = Eo(),
      hO = Cr();
    al.exports = function (e, t) {
      for (var r = vO(t), n = hO.f, o = EO.f, i = 0; i < r.length; i++) {
        var a = r[i];
        pO(e, a) || n(e, a, o(t, a));
      }
    };
  });
  var cl = u((zB, ul) => {
    var gO = jt(),
      _O = st(),
      yO = /#|\.prototype\./,
      qr = function (e, t) {
        var r = TO[IO(e)];
        return r == OO ? !0 : r == mO ? !1 : _O(t) ? gO(t) : !!t;
      },
      IO = (qr.normalize = function (e) {
        return String(e).replace(yO, ".").toLowerCase();
      }),
      TO = (qr.data = {}),
      mO = (qr.NATIVE = "N"),
      OO = (qr.POLYFILL = "P");
    ul.exports = qr;
  });
  var fl = u((YB, ll) => {
    var No = he(),
      SO = Eo().f,
      AO = gn(),
      bO = Vc(),
      wO = En(),
      RO = sl(),
      CO = cl();
    ll.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        o = e.stat,
        i,
        a,
        s,
        c,
        f,
        v;
      if (
        (n
          ? (a = No)
          : o
          ? (a = No[r] || wO(r, {}))
          : (a = (No[r] || {}).prototype),
        a)
      )
        for (s in t) {
          if (
            ((f = t[s]),
            e.noTargetGet ? ((v = SO(a, s)), (c = v && v.value)) : (c = a[s]),
            (i = CO(n ? s : r + (o ? "." : "#") + s, e.forced)),
            !i && c !== void 0)
          ) {
            if (typeof f == typeof c) continue;
            RO(f, c);
          }
          (e.sham || (c && c.sham)) && AO(f, "sham", !0), bO(a, s, f, e);
        }
    };
  });
  var pl = u(($B, dl) => {
    var NO = Co(),
      qO = Tn();
    dl.exports =
      Object.keys ||
      function (t) {
        return NO(t, qO);
      };
  });
  var El = u((QB, vl) => {
    var PO = qt(),
      LO = Cr(),
      xO = Rr(),
      MO = br(),
      DO = pl();
    vl.exports = PO
      ? Object.defineProperties
      : function (t, r) {
          xO(t);
          for (var n = MO(r), o = DO(r), i = o.length, a = 0, s; i > a; )
            LO.f(t, (s = o[a++]), n[s]);
          return t;
        };
  });
  var gl = u((ZB, hl) => {
    var FO = wr();
    hl.exports = FO("document", "documentElement");
  });
  var Al = u((JB, Sl) => {
    var GO = Rr(),
				
      UO = El(),
      _l = Tn(),
      XO = _n(),
      VO = gl(),
      WO = po(),
      BO = _o(),
      yl = ">",
      Il = "<",
      Po = "prototype",
      Lo = "script",
      ml = BO("IE_PROTO"),
      qo = function () {},
      Ol = function (e) {
        return Il + Lo + yl + e + Il + "/" + Lo + yl;
      },
      Tl = function (e) {
        e.write(Ol("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      HO = function () {
        var e = WO("iframe"),
          t = "java" + Lo + ":",
          r;
        return (
          (e.style.display = "none"),
          VO.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Ol("document.F=Object")),
          r.close(),
          r.F
        );
      },
      mn,
      On = function () {
        try {
          mn = new ActiveXObject("htmlfile");
        } catch {}
        On =
          typeof document < "u"
            ? document.domain && mn
              ? Tl(mn)
              : HO()
            : Tl(mn);
        for (var e = _l.length; e--; ) delete On[Po][_l[e]];
        return On();
      };
    XO[ml] = !0;
    Sl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((qo[Po] = GO(t)), (n = new qo()), (qo[Po] = null), (n[ml] = t))
            : (n = On()),
          r === void 0 ? n : UO(n, r)
        );
      };
  });
  var wl = u((eH, bl) => {
    var jO = co(),
      kO = Al(),
      KO = Cr(),
      xo = jO("unscopables"),
      Mo = Array.prototype;
    Mo[xo] == null && KO.f(Mo, xo, { configurable: !0, value: kO(null) });
    bl.exports = function (e) {
      Mo[xo][e] = !0;
    };
  });
  var Rl = u(() => {
    "use strict";
    var zO = fl(),
      YO = wo().includes,
      $O = wl();
    zO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return YO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    $O("includes");
  });
  var Nl = u((nH, Cl) => {
    var QO = he(),
      ZO = Ye();
    Cl.exports = function (e, t) {
      return ZO(QO[e].prototype[t]);
    };
  });
  var Pl = u((iH, ql) => {
    Rl();
    var JO = Nl();
    ql.exports = JO("Array", "includes");
  });
  var xl = u((oH, Ll) => {
    var eS = Pl();
    Ll.exports = eS;
  });
  var Dl = u((aH, Ml) => {
    var tS = xl();
    Ml.exports = tS;
  });
  var Do = u((sH, Fl) => {
    var rS =
      typeof global == "object" && global && global.Object === Object && global;
    Fl.exports = rS;
  });
  var Qe = u((uH, Gl) => {
    var nS = Do(),
      iS = typeof self == "object" && self && self.Object === Object && self,
      oS = nS || iS || Function("return this")();
    Gl.exports = oS;
  });
  var zt = u((cH, Ul) => {
    var aS = Qe(),
      sS = aS.Symbol;
    Ul.exports = sS;
  });
  var Bl = u((lH, Wl) => {
    var Xl = zt(),
      Vl = Object.prototype,
      uS = Vl.hasOwnProperty,
      cS = Vl.toString,
      Pr = Xl ? Xl.toStringTag : void 0;
    function lS(e) {
      var t = uS.call(e, Pr),
        r = e[Pr];
      try {
        e[Pr] = void 0;
        var n = !0;
      } catch {}
      var o = cS.call(e);
      return n && (t ? (e[Pr] = r) : delete e[Pr]), o;
    }
    Wl.exports = lS;
  });
  var jl = u((fH, Hl) => {
    var fS = Object.prototype,
      dS = fS.toString;
    function pS(e) {
      return dS.call(e);
    }
    Hl.exports = pS;
  });
  var mt = u((dH, zl) => {
    var kl = zt(),
      vS = Bl(),
      ES = jl(),
      hS = "[object Null]",
      gS = "[object Undefined]",
      Kl = kl ? kl.toStringTag : void 0;
    function _S(e) {
      return e == null
        ? e === void 0
          ? gS
          : hS
        : Kl && Kl in Object(e)
        ? vS(e)
        : ES(e);
    }
    zl.exports = _S;
  });
  var Fo = u((pH, Yl) => {
    function yS(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    Yl.exports = yS;
  });
  var Go = u((vH, $l) => {
    var IS = Fo(),
      TS = IS(Object.getPrototypeOf, Object);
    $l.exports = TS;
  });
  var Et = u((EH, Ql) => {
    function mS(e) {
      return e != null && typeof e == "object";
    }
    Ql.exports = mS;
  });
  var Uo = u((hH, Jl) => {
    var OS = mt(),
      SS = Go(),
      AS = Et(),
      bS = "[object Object]",
      wS = Function.prototype,
      RS = Object.prototype,
      Zl = wS.toString,
      CS = RS.hasOwnProperty,
      NS = Zl.call(Object);
    function qS(e) {
      if (!AS(e) || OS(e) != bS) return !1;
      var t = SS(e);
      if (t === null) return !0;
      var r = CS.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && Zl.call(r) == NS;
    }
    Jl.exports = qS;
  });
  var ef = u((Xo) => {
    "use strict";
    Object.defineProperty(Xo, "__esModule", { value: !0 });
    Xo.default = PS;
    function PS(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var tf = u((Wo, Vo) => {
    "use strict";
    Object.defineProperty(Wo, "__esModule", { value: !0 });
    var LS = ef(),
      xS = MS(LS);
    function MS(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Yt;
    typeof self < "u"
      ? (Yt = self)
      : typeof window < "u"
      ? (Yt = window)
      : typeof global < "u"
      ? (Yt = global)
      : typeof Vo < "u"
      ? (Yt = Vo)
      : (Yt = Function("return this")());
    var DS = (0, xS.default)(Yt);
    Wo.default = DS;
  });
  var Bo = u((Lr) => {
    "use strict";
    Lr.__esModule = !0;
    Lr.ActionTypes = void 0;
    Lr.default = af;
    var FS = Uo(),
      GS = of(FS),
      US = tf(),
      rf = of(US);
    function of(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var nf = (Lr.ActionTypes = { INIT: "@@redux/INIT" });
    function af(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(af)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var o = e,
        i = t,
        a = [],
        s = a,
        c = !1;
      function f() {
        s === a && (s = a.slice());
      }
      function v() {
        return i;
      }
      function d(A) {
        if (typeof A != "function")
          throw new Error("Expected listener to be a function.");
        var L = !0;
        return (
          f(),
          s.push(A),
          function () {
            if (L) {
              (L = !1), f();
              var w = s.indexOf(A);
              s.splice(w, 1);
            }
          }
        );
      }
      function E(A) {
        if (!(0, GS.default)(A))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof A.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0), (i = o(i, A));
        } finally {
          c = !1;
        }
        for (var L = (a = s), b = 0; b < L.length; b++) L[b]();
        return A;
      }
      function I(A) {
        if (typeof A != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (o = A), E({ type: nf.INIT });
      }
      function S() {
        var A,
          L = d;
        return (
          (A = {
            subscribe: function (w) {
              if (typeof w != "object")
                throw new TypeError("Expected the observer to be an object.");
              function T() {
                w.next && w.next(v());
              }
              T();
              var q = L(T);
              return { unsubscribe: q };
            },
          }),
          (A[rf.default] = function () {
            return this;
          }),
          A
        );
      }
      return (
        E({ type: nf.INIT }),
        (n = { dispatch: E, subscribe: d, getState: v, replaceReducer: I }),
        (n[rf.default] = S),
        n
      );
    }
  });
  var jo = u((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    Ho.default = XS;
    function XS(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var cf = u((ko) => {
    "use strict";
    ko.__esModule = !0;
    ko.default = jS;
    var sf = Bo(),
      VS = Uo(),
      IH = uf(VS),
      WS = jo(),
      TH = uf(WS);
    function uf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function BS(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function HS(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: sf.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var o =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: o }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                sf.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function jS(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        typeof e[o] == "function" && (r[o] = e[o]);
      }
      var i = Object.keys(r);
      if (!1) var a;
      var s;
      try {
        HS(r);
      } catch (c) {
        s = c;
      }
      return function () {
        var f =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          v = arguments[1];
        if (s) throw s;
        if (!1) var d;
        for (var E = !1, I = {}, S = 0; S < i.length; S++) {
          var A = i[S],
            L = r[A],
            b = f[A],
            w = L(b, v);
          if (typeof w > "u") {
            var T = BS(A, v);
            throw new Error(T);
          }
          (I[A] = w), (E = E || w !== b);
        }
        return E ? I : f;
      };
    }
  });
  var ff = u((Ko) => {
    "use strict";
    Ko.__esModule = !0;
    Ko.default = kS;
    function lf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function kS(e, t) {
      if (typeof e == "function") return lf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
        var i = r[o],
          a = e[i];
        typeof a == "function" && (n[i] = lf(a, t));
      }
      return n;
    }
  });
  var Yo = u((zo) => {
    "use strict";
    zo.__esModule = !0;
    zo.default = KS;
    function KS() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (i) {
          return i;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        o = t.slice(0, -1);
      return function () {
        return o.reduceRight(function (i, a) {
          return a(i);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var df = u(($o) => {
    "use strict";
    $o.__esModule = !0;
    var zS =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    $o.default = ZS;
    var YS = Yo(),
      $S = QS(YS);
    function QS(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function ZS() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (o, i, a) {
          var s = n(o, i, a),
            c = s.dispatch,
            f = [],
            v = {
              getState: s.getState,
              dispatch: function (E) {
                return c(E);
              },
            };
          return (
            (f = t.map(function (d) {
              return d(v);
            })),
            (c = $S.default.apply(void 0, f)(s.dispatch)),
            zS({}, s, { dispatch: c })
          );
        };
      };
    }
  });
  var Qo = u((Xe) => {
    "use strict";
    Xe.__esModule = !0;
    Xe.compose =
      Xe.applyMiddleware =
      Xe.bindActionCreators =
      Xe.combineReducers =
      Xe.createStore =
        void 0;
    var JS = Bo(),
      eA = $t(JS),
      tA = cf(),
      rA = $t(tA),
      nA = ff(),
      iA = $t(nA),
      oA = df(),
      aA = $t(oA),
      sA = Yo(),
      uA = $t(sA),
      cA = jo(),
      bH = $t(cA);
    function $t(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Xe.createStore = eA.default;
    Xe.combineReducers = rA.default;
    Xe.bindActionCreators = iA.default;
    Xe.applyMiddleware = aA.default;
    Xe.compose = uA.default;
  });
  var pf = u((be) => {
    "use strict";
    Object.defineProperty(be, "__esModule", { value: !0 });
    be.QuickEffectIds =
      be.QuickEffectDirectionConsts =
      be.EventTypeConsts =
      be.EventLimitAffectedElements =
      be.EventContinuousMouseAxes =
      be.EventBasedOn =
      be.EventAppliesTo =
        void 0;
    var lA = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    };
    be.EventTypeConsts = lA;
    var fA = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
    be.EventAppliesTo = fA;
    var dA = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
    be.EventBasedOn = dA;
    var pA = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
    be.EventContinuousMouseAxes = pA;
    var vA = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
    };
    be.EventLimitAffectedElements = vA;
    var EA = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
    };
    be.QuickEffectIds = EA;
    var hA = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
    };
    be.QuickEffectDirectionConsts = hA;
  });
  var Zo = u((Qt) => {
    "use strict";
    Object.defineProperty(Qt, "__esModule", { value: !0 });
    Qt.ActionTypeConsts = Qt.ActionAppliesTo = void 0;
    var gA = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      OBJECT_VALUE: "OBJECT_VALUE",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      PLUGIN_SPLINE: "PLUGIN_SPLINE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    };
    Qt.ActionTypeConsts = gA;
    var _A = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
    };
    Qt.ActionAppliesTo = _A;
  });
  var vf = u((Sn) => {
    "use strict";
    Object.defineProperty(Sn, "__esModule", { value: !0 });
    Sn.InteractionTypeConsts = void 0;
    var yA = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
    Sn.InteractionTypeConsts = yA;
  });
  var Ef = u((An) => {
    "use strict";
    Object.defineProperty(An, "__esModule", { value: !0 });
    An.ReducedMotionTypes = void 0;
    var IA = Zo(),
      {
        TRANSFORM_MOVE: TA,
        TRANSFORM_SCALE: mA,
        TRANSFORM_ROTATE: OA,
        TRANSFORM_SKEW: SA,
        STYLE_SIZE: AA,
        STYLE_FILTER: bA,
        STYLE_FONT_VARIATION: wA,
      } = IA.ActionTypeConsts,
      RA = {
				 
				 
				 
        [TA]: !0,
        [mA]: !0,
        [OA]: !0,
        [SA]: !0,
        [AA]: !0,
        [bA]: !0,
        [wA]: !0,
      };
    An.ReducedMotionTypes = RA;
  });
  var hf = u((ie) => {
    "use strict";
    Object.defineProperty(ie, "__esModule", { value: !0 });
    ie.IX2_VIEWPORT_WIDTH_CHANGED =
      ie.IX2_TEST_FRAME_RENDERED =
      ie.IX2_STOP_REQUESTED =
      ie.IX2_SESSION_STOPPED =
      ie.IX2_SESSION_STARTED =
      ie.IX2_SESSION_INITIALIZED =
      ie.IX2_RAW_DATA_IMPORTED =
      ie.IX2_PREVIEW_REQUESTED =
      ie.IX2_PLAYBACK_REQUESTED =
      ie.IX2_PARAMETER_CHANGED =
      ie.IX2_MEDIA_QUERIES_DEFINED =
      ie.IX2_INSTANCE_STARTED =
      ie.IX2_INSTANCE_REMOVED =
      ie.IX2_INSTANCE_ADDED =
      ie.IX2_EVENT_STATE_CHANGED =
      ie.IX2_EVENT_LISTENER_ADDED =
      ie.IX2_ELEMENT_STATE_CHANGED =
      ie.IX2_CLEAR_REQUESTED =
      ie.IX2_ANIMATION_FRAME_CHANGED =
      ie.IX2_ACTION_LIST_PLAYBACK_CHANGED =
        void 0;
    var CA = "IX2_RAW_DATA_IMPORTED";
    ie.IX2_RAW_DATA_IMPORTED = CA;
    var NA = "IX2_SESSION_INITIALIZED";
    ie.IX2_SESSION_INITIALIZED = NA;
    var qA = "IX2_SESSION_STARTED";
    ie.IX2_SESSION_STARTED = qA;
    var PA = "IX2_SESSION_STOPPED";
    ie.IX2_SESSION_STOPPED = PA;
    var LA = "IX2_PREVIEW_REQUESTED";
    ie.IX2_PREVIEW_REQUESTED = LA;
    var xA = "IX2_PLAYBACK_REQUESTED";
    ie.IX2_PLAYBACK_REQUESTED = xA;
    var MA = "IX2_STOP_REQUESTED";
    ie.IX2_STOP_REQUESTED = MA;
    var DA = "IX2_CLEAR_REQUESTED";
    ie.IX2_CLEAR_REQUESTED = DA;
    var FA = "IX2_EVENT_LISTENER_ADDED";
    ie.IX2_EVENT_LISTENER_ADDED = FA;
    var GA = "IX2_EVENT_STATE_CHANGED";
    ie.IX2_EVENT_STATE_CHANGED = GA;
    var UA = "IX2_ANIMATION_FRAME_CHANGED";
    ie.IX2_ANIMATION_FRAME_CHANGED = UA;
    var XA = "IX2_PARAMETER_CHANGED";
    ie.IX2_PARAMETER_CHANGED = XA;
    var VA = "IX2_INSTANCE_ADDED";
    ie.IX2_INSTANCE_ADDED = VA;
    var WA = "IX2_INSTANCE_STARTED";
    ie.IX2_INSTANCE_STARTED = WA;
    var BA = "IX2_INSTANCE_REMOVED";
    ie.IX2_INSTANCE_REMOVED = BA;
    var HA = "IX2_ELEMENT_STATE_CHANGED";
    ie.IX2_ELEMENT_STATE_CHANGED = HA;
    var jA = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
    ie.IX2_ACTION_LIST_PLAYBACK_CHANGED = jA;
    var kA = "IX2_VIEWPORT_WIDTH_CHANGED";
    ie.IX2_VIEWPORT_WIDTH_CHANGED = kA;
    var KA = "IX2_MEDIA_QUERIES_DEFINED";
    ie.IX2_MEDIA_QUERIES_DEFINED = KA;
    var zA = "IX2_TEST_FRAME_RENDERED";
    ie.IX2_TEST_FRAME_RENDERED = zA;
  });
  var gf = u((C) => {
    "use strict";
    Object.defineProperty(C, "__esModule", { value: !0 });
    C.W_MOD_JS =
      C.W_MOD_IX =
      C.WILL_CHANGE =
      C.WIDTH =
      C.WF_PAGE =
      C.TRANSLATE_Z =
      C.TRANSLATE_Y =
      C.TRANSLATE_X =
      C.TRANSLATE_3D =
      C.TRANSFORM =
      C.SKEW_Y =
      C.SKEW_X =
      C.SKEW =
      C.SIBLINGS =
      C.SCALE_Z =
      C.SCALE_Y =
      C.SCALE_X =
      C.SCALE_3D =
      C.ROTATE_Z =
      C.ROTATE_Y =
      C.ROTATE_X =
      C.RENDER_TRANSFORM =
      C.RENDER_STYLE =
      C.RENDER_PLUGIN =
      C.RENDER_GENERAL =
      C.PRESERVE_3D =
      C.PLAIN_OBJECT =
      C.PARENT =
      C.OPACITY =
      C.IX2_ID_DELIMITER =
      C.IMMEDIATE_CHILDREN =
      C.HTML_ELEMENT =
      C.HEIGHT =
      C.FONT_VARIATION_SETTINGS =
      C.FLEX =
      C.FILTER =
      C.DISPLAY =
      C.CONFIG_Z_VALUE =
      C.CONFIG_Z_UNIT =
      C.CONFIG_Y_VALUE =
      C.CONFIG_Y_UNIT =
      C.CONFIG_X_VALUE =
      C.CONFIG_X_UNIT =
      C.CONFIG_VALUE =
      C.CONFIG_UNIT =
      C.COMMA_DELIMITER =
      C.COLOR =
      C.COLON_DELIMITER =
      C.CHILDREN =
      C.BOUNDARY_SELECTOR =
      C.BORDER_COLOR =
      C.BAR_DELIMITER =
      C.BACKGROUND_COLOR =
      C.BACKGROUND =
      C.AUTO =
      C.ABSTRACT_NODE =
        void 0;
    var YA = "|";
    C.IX2_ID_DELIMITER = YA;
    var $A = "data-wf-page";
    C.WF_PAGE = $A;
    var QA = "w-mod-js";
    C.W_MOD_JS = QA;
    var ZA = "w-mod-ix";
    C.W_MOD_IX = ZA;
    var JA = ".w-dyn-item";
    C.BOUNDARY_SELECTOR = JA;
    var eb = "xValue";
    C.CONFIG_X_VALUE = eb;
    var tb = "yValue";
    C.CONFIG_Y_VALUE = tb;
    var rb = "zValue";
    C.CONFIG_Z_VALUE = rb;
    var nb = "value";
    C.CONFIG_VALUE = nb;
    var ib = "xUnit";
    C.CONFIG_X_UNIT = ib;
    var ob = "yUnit";
    C.CONFIG_Y_UNIT = ob;
    var ab = "zUnit";
    C.CONFIG_Z_UNIT = ab;
    var sb = "unit";
    C.CONFIG_UNIT = sb;
    var ub = "transform";
    C.TRANSFORM = ub;
    var cb = "translateX";
    C.TRANSLATE_X = cb;
    var lb = "translateY";
    C.TRANSLATE_Y = lb;
    var fb = "translateZ";
    C.TRANSLATE_Z = fb;
    var db = "translate3d";
    C.TRANSLATE_3D = db;
    var pb = "scaleX";
    C.SCALE_X = pb;
    var vb = "scaleY";
    C.SCALE_Y = vb;
    var Eb = "scaleZ";
    C.SCALE_Z = Eb;
    var hb = "scale3d";
    C.SCALE_3D = hb;
    var gb = "rotateX";
    C.ROTATE_X = gb;
    var _b = "rotateY";
    C.ROTATE_Y = _b;
    var yb = "rotateZ";
    C.ROTATE_Z = yb;
    var Ib = "skew";
    C.SKEW = Ib;
    var Tb = "skewX";
    C.SKEW_X = Tb;
    var mb = "skewY";
    C.SKEW_Y = mb;
    var Ob = "opacity";
    C.OPACITY = Ob;
    var Sb = "filter";
    C.FILTER = Sb;
    var Ab = "font-variation-settings";
    C.FONT_VARIATION_SETTINGS = Ab;
    var bb = "width";
    C.WIDTH = bb;
    var wb = "height";
    C.HEIGHT = wb;
    var Rb = "backgroundColor";
    C.BACKGROUND_COLOR = Rb;
    var Cb = "background";
    C.BACKGROUND = Cb;
    var Nb = "borderColor";
    C.BORDER_COLOR = Nb;
    var qb = "color";
    C.COLOR = qb;
    var Pb = "display";
    C.DISPLAY = Pb;
    var Lb = "flex";
    C.FLEX = Lb;
    var xb = "willChange";
    C.WILL_CHANGE = xb;
    var Mb = "AUTO";
    C.AUTO = Mb;
    var Db = ",";
    C.COMMA_DELIMITER = Db;
    var Fb = ":";
    C.COLON_DELIMITER = Fb;
    var Gb = "|";
    C.BAR_DELIMITER = Gb;
    var Ub = "CHILDREN";
    C.CHILDREN = Ub;
    var Xb = "IMMEDIATE_CHILDREN";
    C.IMMEDIATE_CHILDREN = Xb;
    var Vb = "SIBLINGS";
    C.SIBLINGS = Vb;
    var Wb = "PARENT";
    C.PARENT = Wb;
    var Bb = "preserve-3d";
    C.PRESERVE_3D = Bb;
    var Hb = "HTML_ELEMENT";
    C.HTML_ELEMENT = Hb;
    var jb = "PLAIN_OBJECT";
    C.PLAIN_OBJECT = jb;
    var kb = "ABSTRACT_NODE";
    C.ABSTRACT_NODE = kb;
    var Kb = "RENDER_TRANSFORM";
    C.RENDER_TRANSFORM = Kb;
    var zb = "RENDER_GENERAL";
    C.RENDER_GENERAL = zb;
    var Yb = "RENDER_STYLE";
    C.RENDER_STYLE = Yb;
    var $b = "RENDER_PLUGIN";
    C.RENDER_PLUGIN = $b;
  });
  var Fe = u((me) => {
    "use strict";
    var _f = Nt().default;
    Object.defineProperty(me, "__esModule", { value: !0 });
    var bn = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
    me.IX2EngineConstants = me.IX2EngineActionTypes = void 0;
    var Jo = pf();
    Object.keys(Jo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(bn, e) ||
        (e in me && me[e] === Jo[e]) ||
        Object.defineProperty(me, e, {
          enumerable: !0,
          get: function () {
            return Jo[e];
          },
        });
    });
    var ea = Zo();
    Object.keys(ea).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(bn, e) ||
        (e in me && me[e] === ea[e]) ||
        Object.defineProperty(me, e, {
          enumerable: !0,
          get: function () {
            return ea[e];
          },
        });
    });
    var ta = vf();
    Object.keys(ta).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(bn, e) ||
        (e in me && me[e] === ta[e]) ||
        Object.defineProperty(me, e, {
          enumerable: !0,
          get: function () {
            return ta[e];
          },
        });
    });
    var ra = Ef();
    Object.keys(ra).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(bn, e) ||
        (e in me && me[e] === ra[e]) ||
        Object.defineProperty(me, e, {
          enumerable: !0,
          get: function () {
            return ra[e];
          },
        });
    });
    var Qb = _f(hf());
    me.IX2EngineActionTypes = Qb;
    var Zb = _f(gf());
    me.IX2EngineConstants = Zb;
  });
  var yf = u((wn) => {
    "use strict";
    Object.defineProperty(wn, "__esModule", { value: !0 });
    wn.ixData = void 0;
    var Jb = Fe(),
      { IX2_RAW_DATA_IMPORTED: e0 } = Jb.IX2EngineActionTypes,
      t0 = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case e0:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      };
    wn.ixData = t0;
  });
  var Zt = u((DH, ht) => {
    function na() {
      return (
        (ht.exports = na =
          Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
        (ht.exports.__esModule = !0),
        (ht.exports.default = ht.exports),
        na.apply(this, arguments)
      );
    }
    (ht.exports = na),
      (ht.exports.__esModule = !0),
      (ht.exports.default = ht.exports);
  });
  var Jt = u((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var r0 =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = Cn;
    _e.addLast = mf;
    _e.addFirst = Of;
    _e.removeLast = Sf;
    _e.removeFirst = Af;
    _e.insert = bf;
    _e.removeAt = wf;
    _e.replaceAt = Rf;
    _e.getIn = Nn;
    _e.set = qn;
    _e.setIn = Pn;
    _e.update = Nf;
    _e.updateIn = qf;
    _e.merge = Pf;
    _e.mergeDeep = Lf;
    _e.mergeIn = xf;
    _e.omit = Mf;
    _e.addDefaults = Df;
    var If = "INVALID_ARGS";
    function Tf(e) {
      throw new Error(e);
    }
    function ia(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var n0 = {}.hasOwnProperty;
    function Cn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = ia(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        r[o] = e[o];
      }
      return r;
    }
    function Ge(e, t, r) {
      var n = r;
      n == null && Tf(If);
      for (
        var o = !1, i = arguments.length, a = Array(i > 3 ? i - 3 : 0), s = 3;
        s < i;
        s++
      )
        a[s - 3] = arguments[s];
      for (var c = 0; c < a.length; c++) {
        var f = a[c];
        if (f != null) {
          var v = ia(f);
          if (v.length)
            for (var d = 0; d <= v.length; d++) {
              var E = v[d];
              if (!(e && n[E] !== void 0)) {
                var I = f[E];
                t && Rn(n[E]) && Rn(I) && (I = Ge(e, t, n[E], I)),
                  !(I === void 0 || I === n[E]) &&
                    (o || ((o = !0), (n = Cn(n))), (n[E] = I));
              }
            }
        }
      }
      return n;
    }
    function Rn(e) {
      var t = typeof e > "u" ? "undefined" : r0(e);
      return e != null && (t === "object" || t === "function");
    }
    function mf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Of(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Sf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Af(e) {
      return e.length ? e.slice(1) : e;
    }
    function bf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function wf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Rf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, o = Array(n), i = 0; i < n; i++) o[i] = e[i];
      return (o[t] = r), o;
    }
    function Nn(e, t) {
      if ((!Array.isArray(t) && Tf(If), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var o = t[n];
          if (((r = r?.[o]), r === void 0)) return r;
        }
        return r;
      }
    }
    function qn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        o = e ?? n;
      if (o[t] === r) return o;
      var i = Cn(o);
      return (i[t] = r), i;
    }
    function Cf(e, t, r, n) {
      var o = void 0,
        i = t[n];
      if (n === t.length - 1) o = r;
      else {
        var a =
          Rn(e) && Rn(e[i]) ? e[i] : typeof t[n + 1] == "number" ? [] : {};
        o = Cf(a, t, r, n + 1);
      }
      return qn(e, i, o);
    }
    function Pn(e, t, r) {
      return t.length ? Cf(e, t, r, 0) : r;
    }
    function Nf(e, t, r) {
      var n = e?.[t],
        o = r(n);
      return qn(e, t, o);
    }
    function qf(e, t, r) {
      var n = Nn(e, t),
        o = r(n);
      return Pn(e, t, o);
    }
    function Pf(e, t, r, n, o, i) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
        c < a;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Ge.call.apply(Ge, [null, !1, !1, e, t, r, n, o, i].concat(s))
        : Ge(!1, !1, e, t, r, n, o, i);
    }
    function Lf(e, t, r, n, o, i) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
        c < a;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Ge.call.apply(Ge, [null, !1, !0, e, t, r, n, o, i].concat(s))
        : Ge(!1, !0, e, t, r, n, o, i);
    }
    function xf(e, t, r, n, o, i, a) {
      var s = Nn(e, t);
      s == null && (s = {});
      for (
        var c = void 0,
          f = arguments.length,
          v = Array(f > 7 ? f - 7 : 0),
          d = 7;
        d < f;
        d++
      )
        v[d - 7] = arguments[d];
      return (
        v.length
          ? (c = Ge.call.apply(Ge, [null, !1, !1, s, r, n, o, i, a].concat(v)))
          : (c = Ge(!1, !1, s, r, n, o, i, a)),
        Pn(e, t, c)
      );
    }
    function Mf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, o = 0; o < r.length; o++)
        if (n0.call(e, r[o])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var i = {}, a = ia(e), s = 0; s < a.length; s++) {
        var c = a[s];
        r.indexOf(c) >= 0 || (i[c] = e[c]);
      }
      return i;
    }
    function Df(e, t, r, n, o, i) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
        c < a;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Ge.call.apply(Ge, [null, !0, !1, e, t, r, n, o, i].concat(s))
        : Ge(!0, !1, e, t, r, n, o, i);
    }
    var i0 = {
      clone: Cn,
      addLast: mf,
      addFirst: Of,
      removeLast: Sf,
      removeFirst: Af,
      insert: bf,
      removeAt: wf,
      replaceAt: Rf,
      getIn: Nn,
      set: qn,
      setIn: Pn,
      update: Nf,
      updateIn: qf,
      merge: Pf,
      mergeDeep: Lf,
      mergeIn: xf,
      omit: Mf,
      addDefaults: Df,
    };
    _e.default = i0;
  });
  var Gf = u((Ln) => {
    "use strict";
    var o0 = ze().default;
    Object.defineProperty(Ln, "__esModule", { value: !0 });
    Ln.ixRequest = void 0;
    var a0 = o0(Zt()),
      s0 = Fe(),
      u0 = Jt(),
      {
        IX2_PREVIEW_REQUESTED: c0,
        IX2_PLAYBACK_REQUESTED: l0,
        IX2_STOP_REQUESTED: f0,
        IX2_CLEAR_REQUESTED: d0,
      } = s0.IX2EngineActionTypes,
      p0 = { preview: {}, playback: {}, stop: {}, clear: {} },
      Ff = Object.create(null, {
        [c0]: { value: "preview" },
        [l0]: { value: "playback" },
        [f0]: { value: "stop" },
        [d0]: { value: "clear" },
      }),
      v0 = (e = p0, t) => {
        if (t.type in Ff) {
          let r = [Ff[t.type]];
          return (0, u0.setIn)(e, [r], (0, a0.default)({}, t.payload));
        }
        return e;
      };
    Ln.ixRequest = v0;
  });
  var Xf = u((xn) => {
    "use strict";
    Object.defineProperty(xn, "__esModule", { value: !0 });
    xn.ixSession = void 0;
    var E0 = Fe(),
      ut = Jt(),
      {
        IX2_SESSION_INITIALIZED: h0,
        IX2_SESSION_STARTED: g0,
        IX2_TEST_FRAME_RENDERED: _0,
        IX2_SESSION_STOPPED: y0,
        IX2_EVENT_LISTENER_ADDED: I0,
        IX2_EVENT_STATE_CHANGED: T0,
        IX2_ANIMATION_FRAME_CHANGED: m0,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: O0,
        IX2_VIEWPORT_WIDTH_CHANGED: S0,
        IX2_MEDIA_QUERIES_DEFINED: A0,
      } = E0.IX2EngineActionTypes,
      Uf = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      },
      b0 = 20,
      w0 = (e = Uf, t) => {
        switch (t.type) {
          case h0: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, ut.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case g0:
            return (0, ut.set)(e, "active", !0);
          case _0: {
            let {
              payload: { step: r = b0 },
            } = t;
            return (0, ut.set)(e, "tick", e.tick + r);
          }
          case y0:
            return Uf;
          case m0: {
            let {
              payload: { now: r },
            } = t;
            return (0, ut.set)(e, "tick", r);
          }
          case I0: {
            let r = (0, ut.addLast)(e.eventListeners, t.payload);
            return (0, ut.set)(e, "eventListeners", r);
          }
          case T0: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, ut.setIn)(e, ["eventState", r], n);
          }
          case O0: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, ut.setIn)(e, ["playbackState", r], n);
          }
          case S0: {
            let { width: r, mediaQueries: n } = t.payload,
              o = n.length,
              i = null;
            for (let a = 0; a < o; a++) {
              let { key: s, min: c, max: f } = n[a];
              if (r >= c && r <= f) {
                i = s;
                break;
              }
            }
            return (0, ut.merge)(e, { viewportWidth: r, mediaQueryKey: i });
          }
          case A0:
            return (0, ut.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      };
    xn.ixSession = w0;
  });
  var Wf = u((XH, Vf) => {
    function R0() {
      (this.__data__ = []), (this.size = 0);
    }
    Vf.exports = R0;
  });
  var Mn = u((VH, Bf) => {
    function C0(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Bf.exports = C0;
  });
  var xr = u((WH, Hf) => {
    var N0 = Mn();
    function q0(e, t) {
      for (var r = e.length; r--; ) if (N0(e[r][0], t)) return r;
      return -1;
    }
    Hf.exports = q0;
  });
  var kf = u((BH, jf) => {
    var P0 = xr(),
      L0 = Array.prototype,
      x0 = L0.splice;
    function M0(e) {
      var t = this.__data__,
        r = P0(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : x0.call(t, r, 1), --this.size, !0;
    }
    jf.exports = M0;
  });
  var zf = u((HH, Kf) => {
    var D0 = xr();
    function F0(e) {
      var t = this.__data__,
        r = D0(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    Kf.exports = F0;
  });
  var $f = u((jH, Yf) => {
    var G0 = xr();
    function U0(e) {
      return G0(this.__data__, e) > -1;
    }
    Yf.exports = U0;
  });
  var Zf = u((kH, Qf) => {
    var X0 = xr();
    function V0(e, t) {
      var r = this.__data__,
        n = X0(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Qf.exports = V0;
  });
  var Mr = u((KH, Jf) => {
    var W0 = Wf(),
      B0 = kf(),
      H0 = zf(),
      j0 = $f(),
      k0 = Zf();
    function er(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    er.prototype.clear = W0;
    er.prototype.delete = B0;
    er.prototype.get = H0;
    er.prototype.has = j0;
    er.prototype.set = k0;
    Jf.exports = er;
  });
  var td = u((zH, ed) => {
    var K0 = Mr();
    function z0() {
      (this.__data__ = new K0()), (this.size = 0);
    }
    ed.exports = z0;
  });
  var nd = u((YH, rd) => {
    function Y0(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    rd.exports = Y0;
  });
  var od = u(($H, id) => {
    function $0(e) {
      return this.__data__.get(e);
    }
    id.exports = $0;
  });
  var sd = u((QH, ad) => {
    function Q0(e) {
      return this.__data__.has(e);
    }
    ad.exports = Q0;
  });
  var ct = u((ZH, ud) => {
    function Z0(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    ud.exports = Z0;
  });
  var oa = u((JH, cd) => {
    var J0 = mt(),
      ew = ct(),
      tw = "[object AsyncFunction]",
      rw = "[object Function]",
      nw = "[object GeneratorFunction]",
      iw = "[object Proxy]";
    function ow(e) {
      if (!ew(e)) return !1;
      var t = J0(e);
      return t == rw || t == nw || t == tw || t == iw;
    }
    cd.exports = ow;
  });
  var fd = u((ej, ld) => {
    var aw = Qe(),
      sw = aw["__core-js_shared__"];
    ld.exports = sw;
  });
  var vd = u((tj, pd) => {
    var aa = fd(),
      dd = (function () {
        var e = /[^.]+$/.exec((aa && aa.keys && aa.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function uw(e) {
      return !!dd && dd in e;
    }
    pd.exports = uw;
  });
  var sa = u((rj, Ed) => {
    var cw = Function.prototype,
      lw = cw.toString;
    function fw(e) {
      if (e != null) {
        try {
          return lw.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Ed.exports = fw;
  });
  var gd = u((nj, hd) => {
    var dw = oa(),
      pw = vd(),
      vw = ct(),
      Ew = sa(),
      hw = /[\\^$.*+?()[\]{}|]/g,
      gw = /^\[object .+?Constructor\]$/,
      _w = Function.prototype,
      yw = Object.prototype,
      Iw = _w.toString,
      Tw = yw.hasOwnProperty,
      mw = RegExp(
        "^" +
			
          Iw.call(Tw)
            .replace(hw, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function Ow(e) {
      if (!vw(e) || pw(e)) return !1;
      var t = dw(e) ? mw : gw;
      return t.test(Ew(e));
    }
    hd.exports = Ow;
  });
  var yd = u((ij, _d) => {
    function Sw(e, t) {
      return e?.[t];
    }
    _d.exports = Sw;
  });
  var Ot = u((oj, Id) => {
    var Aw = gd(),
      bw = yd();
    function ww(e, t) {
      var r = bw(e, t);
      return Aw(r) ? r : void 0;
    }
    Id.exports = ww;
  });
  var Dn = u((aj, Td) => {
    var Rw = Ot(),
      Cw = Qe(),
      Nw = Rw(Cw, "Map");
    Td.exports = Nw;
  });
  var Dr = u((sj, md) => {
    var qw = Ot(),
      Pw = qw(Object, "create");
    md.exports = Pw;
  });
  var Ad = u((uj, Sd) => {
    var Od = Dr();
    function Lw() {
      (this.__data__ = Od ? Od(null) : {}), (this.size = 0);
    }
    Sd.exports = Lw;
  });
  var wd = u((cj, bd) => {
    function xw(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    bd.exports = xw;
  });
  var Cd = u((lj, Rd) => {
    var Mw = Dr(),
      Dw = "__lodash_hash_undefined__",
      Fw = Object.prototype,
      Gw = Fw.hasOwnProperty;
    function Uw(e) {
      var t = this.__data__;
      if (Mw) {
        var r = t[e];
        return r === Dw ? void 0 : r;
      }
      return Gw.call(t, e) ? t[e] : void 0;
    }
    Rd.exports = Uw;
  });
  var qd = u((fj, Nd) => {
    var Xw = Dr(),
      Vw = Object.prototype,
      Ww = Vw.hasOwnProperty;
    function Bw(e) {
      var t = this.__data__;
      return Xw ? t[e] !== void 0 : Ww.call(t, e);
    }
    Nd.exports = Bw;
  });
  var Ld = u((dj, Pd) => {
    var Hw = Dr(),
      jw = "__lodash_hash_undefined__";
    function kw(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = Hw && t === void 0 ? jw : t),
        this
      );
    }
    Pd.exports = kw;
  });
  var Md = u((pj, xd) => {
    var Kw = Ad(),
      zw = wd(),
      Yw = Cd(),
      $w = qd(),
      Qw = Ld();
    function tr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    tr.prototype.clear = Kw;
    tr.prototype.delete = zw;
    tr.prototype.get = Yw;
    tr.prototype.has = $w;
    tr.prototype.set = Qw;
    xd.exports = tr;
  });
  var Gd = u((vj, Fd) => {
    var Dd = Md(),
      Zw = Mr(),
      Jw = Dn();
    function eR() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Dd(),
          map: new (Jw || Zw)(),
          string: new Dd(),
        });
    }
    Fd.exports = eR;
  });
  var Xd = u((Ej, Ud) => {
    function tR(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Ud.exports = tR;
  });
  var Fr = u((hj, Vd) => {
    var rR = Xd();
    function nR(e, t) {
      var r = e.__data__;
      return rR(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Vd.exports = nR;
  });
  var Bd = u((gj, Wd) => {
    var iR = Fr();
    function oR(e) {
      var t = iR(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Wd.exports = oR;
  });
  var jd = u((_j, Hd) => {
    var aR = Fr();
    function sR(e) {
      return aR(this, e).get(e);
    }
    Hd.exports = sR;
  });
  var Kd = u((yj, kd) => {
    var uR = Fr();
    function cR(e) {
      return uR(this, e).has(e);
    }
    kd.exports = cR;
  });
  var Yd = u((Ij, zd) => {
    var lR = Fr();
    function fR(e, t) {
      var r = lR(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    zd.exports = fR;
  });
  var Fn = u((Tj, $d) => {
    var dR = Gd(),
      pR = Bd(),
      vR = jd(),
      ER = Kd(),
      hR = Yd();
    function rr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    rr.prototype.clear = dR;
    rr.prototype.delete = pR;
    rr.prototype.get = vR;
    rr.prototype.has = ER;
    rr.prototype.set = hR;
    $d.exports = rr;
  });
  var Zd = u((mj, Qd) => {
    var gR = Mr(),
      _R = Dn(),
      yR = Fn(),
      IR = 200;
    function TR(e, t) {
      var r = this.__data__;
      if (r instanceof gR) {
        var n = r.__data__;
        if (!_R || n.length < IR - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new yR(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    Qd.exports = TR;
  });
  var ua = u((Oj, Jd) => {
    var mR = Mr(),
      OR = td(),
      SR = nd(),
      AR = od(),
      bR = sd(),
      wR = Zd();
    function nr(e) {
      var t = (this.__data__ = new mR(e));
      this.size = t.size;
    }
    nr.prototype.clear = OR;
    nr.prototype.delete = SR;
    nr.prototype.get = AR;
    nr.prototype.has = bR;
    nr.prototype.set = wR;
    Jd.exports = nr;
  });
  var tp = u((Sj, ep) => {
    var RR = "__lodash_hash_undefined__";
    function CR(e) {
      return this.__data__.set(e, RR), this;
    }
    ep.exports = CR;
  });
  var np = u((Aj, rp) => {
    function NR(e) {
      return this.__data__.has(e);
    }
    rp.exports = NR;
  });
  var op = u((bj, ip) => {
    var qR = Fn(),
      PR = tp(),
      LR = np();
    function Gn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new qR(); ++t < r; ) this.add(e[t]);
    }
    Gn.prototype.add = Gn.prototype.push = PR;
    Gn.prototype.has = LR;
    ip.exports = Gn;
  });
  var sp = u((wj, ap) => {
    function xR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    ap.exports = xR;
  });
  var cp = u((Rj, up) => {
    function MR(e, t) {
      return e.has(t);
    }
    up.exports = MR;
  });
  var ca = u((Cj, lp) => {
    var DR = op(),
      FR = sp(),
      GR = cp(),
      UR = 1,
      XR = 2;
    function VR(e, t, r, n, o, i) {
      var a = r & UR,
        s = e.length,
        c = t.length;
      if (s != c && !(a && c > s)) return !1;
      var f = i.get(e),
        v = i.get(t);
      if (f && v) return f == t && v == e;
      var d = -1,
        E = !0,
        I = r & XR ? new DR() : void 0;
      for (i.set(e, t), i.set(t, e); ++d < s; ) {
        var S = e[d],
          A = t[d];
        if (n) var L = a ? n(A, S, d, t, e, i) : n(S, A, d, e, t, i);
        if (L !== void 0) {
          if (L) continue;
          E = !1;
          break;
        }
        if (I) {
          if (
            !FR(t, function (b, w) {
              if (!GR(I, w) && (S === b || o(S, b, r, n, i))) return I.push(w);
            })
          ) {
            E = !1;
            break;
          }
        } else if (!(S === A || o(S, A, r, n, i))) {
          E = !1;
          break;
        }
      }
      return i.delete(e), i.delete(t), E;
    }
    lp.exports = VR;
  });
  var dp = u((Nj, fp) => {
    var WR = Qe(),
      BR = WR.Uint8Array;
    fp.exports = BR;
  });
  var vp = u((qj, pp) => {
    function HR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, o) {
          r[++t] = [o, n];
        }),
        r
      );
    }
    pp.exports = HR;
  });
  var hp = u((Pj, Ep) => {
    function jR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Ep.exports = jR;
  });
  var Tp = u((Lj, Ip) => {
    var gp = zt(),
      _p = dp(),
      kR = Mn(),
      KR = ca(),
      zR = vp(),
      YR = hp(),
      $R = 1,
      QR = 2,
      ZR = "[object Boolean]",
      JR = "[object Date]",
      eC = "[object Error]",
      tC = "[object Map]",
      rC = "[object Number]",
      nC = "[object RegExp]",
      iC = "[object Set]",
      oC = "[object String]",
      aC = "[object Symbol]",
      sC = "[object ArrayBuffer]",
      uC = "[object DataView]",
      yp = gp ? gp.prototype : void 0,
      la = yp ? yp.valueOf : void 0;
    function cC(e, t, r, n, o, i, a) {
      switch (r) {
        case uC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case sC:
          return !(e.byteLength != t.byteLength || !i(new _p(e), new _p(t)));
        case ZR:
				
        case JR:
							
				
															
				
        case rC:
          return kR(+e, +t);
        case eC:
          return e.name == t.name && e.message == t.message;
        case nC:
        case oC:
          return e == t + "";
				
					 
        case tC:
          var s = zR;
        case iC:
          var c = n & $R;
          if ((s || (s = YR), e.size != t.size && !c)) return !1;
          var f = a.get(e);
          if (f) return f == t;
          (n |= QR), a.set(e, t);
          var v = KR(s(e), s(t), n, o, i, a);
          return a.delete(e), v;
        case aC:
          if (la) return la.call(e) == la.call(t);
      }
      return !1;
    }
    Ip.exports = cC;
  });
  var Un = u((xj, mp) => {
    function lC(e, t) {
      for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
      return e;
    }
    mp.exports = lC;
  });
  var we = u((Mj, Op) => {
    var fC = Array.isArray;
    Op.exports = fC;
  });
  var fa = u((Dj, Sp) => {
    var dC = Un(),
      pC = we();
    function vC(e, t, r) {
      var n = t(e);
      return pC(e) ? n : dC(n, r(e));
    }
    Sp.exports = vC;
  });
  var bp = u((Fj, Ap) => {
    function EC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
        var a = e[r];
        t(a, r, e) && (i[o++] = a);
      }
      return i;
    }
    Ap.exports = EC;
  });
  var da = u((Gj, wp) => {
    function hC() {
      return [];
    }
    wp.exports = hC;
  });
  var pa = u((Uj, Cp) => {
    var gC = bp(),
      _C = da(),
      yC = Object.prototype,
      IC = yC.propertyIsEnumerable,
      Rp = Object.getOwnPropertySymbols,
      TC = Rp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                gC(Rp(e), function (t) {
                  return IC.call(e, t);
                }));
          }
        : _C;
    Cp.exports = TC;
  });
  var qp = u((Xj, Np) => {
    function mC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Np.exports = mC;
  });
  var Lp = u((Vj, Pp) => {
    var OC = mt(),
      SC = Et(),
      AC = "[object Arguments]";
    function bC(e) {
      return SC(e) && OC(e) == AC;
    }
    Pp.exports = bC;
  });
  var Gr = u((Wj, Dp) => {
    var xp = Lp(),
      wC = Et(),
      Mp = Object.prototype,
      RC = Mp.hasOwnProperty,
      CC = Mp.propertyIsEnumerable,
      NC = xp(
        (function () {
          return arguments;
        })()
      )
        ? xp
        : function (e) {
            return wC(e) && RC.call(e, "callee") && !CC.call(e, "callee");
          };
    Dp.exports = NC;
  });
  var Gp = u((Bj, Fp) => {
    function qC() {
      return !1;
    }
    Fp.exports = qC;
  });
  var Xn = u((Ur, ir) => {
    var PC = Qe(),
      LC = Gp(),
      Vp = typeof Ur == "object" && Ur && !Ur.nodeType && Ur,
      Up = Vp && typeof ir == "object" && ir && !ir.nodeType && ir,
      xC = Up && Up.exports === Vp,
      Xp = xC ? PC.Buffer : void 0,
      MC = Xp ? Xp.isBuffer : void 0,
      DC = MC || LC;
    ir.exports = DC;
  });
  var Vn = u((Hj, Wp) => {
    var FC = 9007199254740991,
      GC = /^(?:0|[1-9]\d*)$/;
    function UC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? FC),
        !!t &&
          (r == "number" || (r != "symbol" && GC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Wp.exports = UC;
  });
  var Wn = u((jj, Bp) => {
    var XC = 9007199254740991;
    function VC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= XC;
    }
    Bp.exports = VC;
  });
  var jp = u((kj, Hp) => {
    var WC = mt(),
      BC = Wn(),
      HC = Et(),
      jC = "[object Arguments]",
      kC = "[object Array]",
      KC = "[object Boolean]",
      zC = "[object Date]",
      YC = "[object Error]",
      $C = "[object Function]",
      QC = "[object Map]",
      ZC = "[object Number]",
      JC = "[object Object]",
      eN = "[object RegExp]",
      tN = "[object Set]",
      rN = "[object String]",
      nN = "[object WeakMap]",
      iN = "[object ArrayBuffer]",
      oN = "[object DataView]",
      aN = "[object Float32Array]",
      sN = "[object Float64Array]",
      uN = "[object Int8Array]",
      cN = "[object Int16Array]",
      lN = "[object Int32Array]",
      fN = "[object Uint8Array]",
      dN = "[object Uint8ClampedArray]",
      pN = "[object Uint16Array]",
      vN = "[object Uint32Array]",
      Ee = {};
    Ee[aN] =
      Ee[sN] =
      Ee[uN] =
      Ee[cN] =
      Ee[lN] =
      Ee[fN] =
      Ee[dN] =
      Ee[pN] =
      Ee[vN] =
        !0;
    Ee[jC] =
      Ee[kC] =
      Ee[iN] =
      Ee[KC] =
      Ee[oN] =
      Ee[zC] =
      Ee[YC] =
      Ee[$C] =
      Ee[QC] =
      Ee[ZC] =
      Ee[JC] =
      Ee[eN] =
      Ee[tN] =
      Ee[rN] =
      Ee[nN] =
        !1;
    function EN(e) {
      return HC(e) && BC(e.length) && !!Ee[WC(e)];
    }
    Hp.exports = EN;
  });
  var Kp = u((Kj, kp) => {
    function hN(e) {
      return function (t) {
        return e(t);
      };
    }
    kp.exports = hN;
  });
  var Yp = u((Xr, or) => {
    var gN = Do(),
      zp = typeof Xr == "object" && Xr && !Xr.nodeType && Xr,
      Vr = zp && typeof or == "object" && or && !or.nodeType && or,
      _N = Vr && Vr.exports === zp,
      va = _N && gN.process,
      yN = (function () {
        try {
          var e = Vr && Vr.require && Vr.require("util").types;
          return e || (va && va.binding && va.binding("util"));
        } catch {}
      })();
    or.exports = yN;
  });
  var Bn = u((zj, Zp) => {
    var IN = jp(),
      TN = Kp(),
      $p = Yp(),
      Qp = $p && $p.isTypedArray,
      mN = Qp ? TN(Qp) : IN;
    Zp.exports = mN;
  });
  var Ea = u((Yj, Jp) => {
    var ON = qp(),
      SN = Gr(),
      AN = we(),
      bN = Xn(),
      wN = Vn(),
      RN = Bn(),
      CN = Object.prototype,
      NN = CN.hasOwnProperty;
    function qN(e, t) {
      var r = AN(e),
        n = !r && SN(e),
        o = !r && !n && bN(e),
        i = !r && !n && !o && RN(e),
        a = r || n || o || i,
        s = a ? ON(e.length, String) : [],
        c = s.length;
      for (var f in e)
        (t || NN.call(e, f)) &&
          !(
            a &&
            (f == "length" ||
              (o && (f == "offset" || f == "parent")) ||
              (i &&
                (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
              wN(f, c))
          ) &&
          s.push(f);
      return s;
    }
    Jp.exports = qN;
  });
  var Hn = u(($j, ev) => {
    var PN = Object.prototype;
    function LN(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || PN;
      return e === r;
    }
    ev.exports = LN;
  });
  var rv = u((Qj, tv) => {
    var xN = Fo(),
      MN = xN(Object.keys, Object);
    tv.exports = MN;
  });
  var jn = u((Zj, nv) => {
    var DN = Hn(),
      FN = rv(),
      GN = Object.prototype,
      UN = GN.hasOwnProperty;
    function XN(e) {
      if (!DN(e)) return FN(e);
      var t = [];
      for (var r in Object(e)) UN.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    nv.exports = XN;
  });
  var xt = u((Jj, iv) => {
    var VN = oa(),
      WN = Wn();
    function BN(e) {
      return e != null && WN(e.length) && !VN(e);
    }
    iv.exports = BN;
  });
  var Wr = u((e5, ov) => {
    var HN = Ea(),
      jN = jn(),
      kN = xt();
    function KN(e) {
      return kN(e) ? HN(e) : jN(e);
    }
    ov.exports = KN;
  });
  var sv = u((t5, av) => {
    var zN = fa(),
      YN = pa(),
      $N = Wr();
    function QN(e) {
      return zN(e, $N, YN);
    }
    av.exports = QN;
  });
  var lv = u((r5, cv) => {
    var uv = sv(),
      ZN = 1,
      JN = Object.prototype,
      eq = JN.hasOwnProperty;
    function tq(e, t, r, n, o, i) {
      var a = r & ZN,
        s = uv(e),
        c = s.length,
        f = uv(t),
        v = f.length;
      if (c != v && !a) return !1;
      for (var d = c; d--; ) {
        var E = s[d];
        if (!(a ? E in t : eq.call(t, E))) return !1;
      }
      var I = i.get(e),
        S = i.get(t);
      if (I && S) return I == t && S == e;
      var A = !0;
      i.set(e, t), i.set(t, e);
      for (var L = a; ++d < c; ) {
        E = s[d];
        var b = e[E],
          w = t[E];
        if (n) var T = a ? n(w, b, E, t, e, i) : n(b, w, E, e, t, i);
        if (!(T === void 0 ? b === w || o(b, w, r, n, i) : T)) {
          A = !1;
          break;
        }
        L || (L = E == "constructor");
      }
      if (A && !L) {
        var q = e.constructor,
          N = t.constructor;
        q != N &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof q == "function" &&
            q instanceof q &&
            typeof N == "function" &&
            N instanceof N
          ) &&
          (A = !1);
      }
      return i.delete(e), i.delete(t), A;
    }
    cv.exports = tq;
  });
  var dv = u((n5, fv) => {
    var rq = Ot(),
      nq = Qe(),
      iq = rq(nq, "DataView");
    fv.exports = iq;
  });
  var vv = u((i5, pv) => {
    var oq = Ot(),
      aq = Qe(),
      sq = oq(aq, "Promise");
    pv.exports = sq;
  });
  var hv = u((o5, Ev) => {
    var uq = Ot(),
      cq = Qe(),
      lq = uq(cq, "Set");
    Ev.exports = lq;
  });
  var ha = u((a5, gv) => {
    var fq = Ot(),
      dq = Qe(),
      pq = fq(dq, "WeakMap");
    gv.exports = pq;
  });
  var kn = u((s5, Sv) => {
    var ga = dv(),
      _a = Dn(),
      ya = vv(),
      Ia = hv(),
      Ta = ha(),
      Ov = mt(),
      ar = sa(),
      _v = "[object Map]",
      vq = "[object Object]",
      yv = "[object Promise]",
      Iv = "[object Set]",
      Tv = "[object WeakMap]",
      mv = "[object DataView]",
      Eq = ar(ga),
      hq = ar(_a),
      gq = ar(ya),
      _q = ar(Ia),
      yq = ar(Ta),
      Mt = Ov;
    ((ga && Mt(new ga(new ArrayBuffer(1))) != mv) ||
      (_a && Mt(new _a()) != _v) ||
      (ya && Mt(ya.resolve()) != yv) ||
      (Ia && Mt(new Ia()) != Iv) ||
      (Ta && Mt(new Ta()) != Tv)) &&
      (Mt = function (e) {
        var t = Ov(e),
          r = t == vq ? e.constructor : void 0,
          n = r ? ar(r) : "";
        if (n)
          switch (n) {
					
						
					
						
					
						
            case Eq:
              return mv;
            case hq:
              return _v;
            case gq:
              return yv;
            case _q:
              return Iv;
            case yq:
              return Tv;
          }
        return t;
      });
    Sv.exports = Mt;
  });
  var Pv = u((u5, qv) => {
    var ma = ua(),
      Iq = ca(),
      Tq = Tp(),
      mq = lv(),
      Av = kn(),
      bv = we(),
      wv = Xn(),
      Oq = Bn(),
      Sq = 1,
      Rv = "[object Arguments]",
      Cv = "[object Array]",
      Kn = "[object Object]",
      Aq = Object.prototype,
      Nv = Aq.hasOwnProperty;
    function bq(e, t, r, n, o, i) {
      var a = bv(e),
        s = bv(t),
        c = a ? Cv : Av(e),
        f = s ? Cv : Av(t);
      (c = c == Rv ? Kn : c), (f = f == Rv ? Kn : f);
      var v = c == Kn,
        d = f == Kn,
        E = c == f;
      if (E && wv(e)) {
        if (!wv(t)) return !1;
        (a = !0), (v = !1);
      }
      if (E && !v)
        return (
          i || (i = new ma()),
          a || Oq(e) ? Iq(e, t, r, n, o, i) : Tq(e, t, c, r, n, o, i)
        );
      if (!(r & Sq)) {
        var I = v && Nv.call(e, "__wrapped__"),
          S = d && Nv.call(t, "__wrapped__");
        if (I || S) {
          var A = I ? e.value() : e,
            L = S ? t.value() : t;
          return i || (i = new ma()), o(A, L, r, n, i);
        }
      }
      return E ? (i || (i = new ma()), mq(e, t, r, n, o, i)) : !1;
    }
    qv.exports = bq;
  });
  var Oa = u((c5, Mv) => {
    var wq = Pv(),
      Lv = Et();
    function xv(e, t, r, n, o) {
      return e === t
        ? !0
        : e == null || t == null || (!Lv(e) && !Lv(t))
        ? e !== e && t !== t
        : wq(e, t, r, n, xv, o);
    }
    Mv.exports = xv;
  });
  var Fv = u((l5, Dv) => {
    var Rq = ua(),
      Cq = Oa(),
      Nq = 1,
      qq = 2;
    function Pq(e, t, r, n) {
      var o = r.length,
        i = o,
        a = !n;
      if (e == null) return !i;
      for (e = Object(e); o--; ) {
        var s = r[o];
        if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
      }
      for (; ++o < i; ) {
        s = r[o];
        var c = s[0],
          f = e[c],
          v = s[1];
        if (a && s[2]) {
          if (f === void 0 && !(c in e)) return !1;
        } else {
          var d = new Rq();
          if (n) var E = n(f, v, c, e, t, d);
          if (!(E === void 0 ? Cq(v, f, Nq | qq, n, d) : E)) return !1;
        }
      }
      return !0;
    }
    Dv.exports = Pq;
  });
  var Sa = u((f5, Gv) => {
    var Lq = ct();
    function xq(e) {
      return e === e && !Lq(e);
    }
    Gv.exports = xq;
  });
  var Xv = u((d5, Uv) => {
    var Mq = Sa(),
      Dq = Wr();
    function Fq(e) {
      for (var t = Dq(e), r = t.length; r--; ) {
        var n = t[r],
          o = e[n];
        t[r] = [n, o, Mq(o)];
      }
      return t;
    }
    Uv.exports = Fq;
  });
  var Aa = u((p5, Vv) => {
    function Gq(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Vv.exports = Gq;
  });
  var Bv = u((v5, Wv) => {
    var Uq = Fv(),
      Xq = Xv(),
      Vq = Aa();
    function Wq(e) {
      var t = Xq(e);
      return t.length == 1 && t[0][2]
        ? Vq(t[0][0], t[0][1])
        : function (r) {
            return r === e || Uq(r, e, t);
          };
    }
    Wv.exports = Wq;
  });
  var Br = u((E5, Hv) => {
    var Bq = mt(),
      Hq = Et(),
      jq = "[object Symbol]";
    function kq(e) {
      return typeof e == "symbol" || (Hq(e) && Bq(e) == jq);
    }
    Hv.exports = kq;
  });
  var zn = u((h5, jv) => {
    var Kq = we(),
      zq = Br(),
      Yq = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      $q = /^\w*$/;
    function Qq(e, t) {
      if (Kq(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        zq(e)
        ? !0
        : $q.test(e) || !Yq.test(e) || (t != null && e in Object(t));
    }
    jv.exports = Qq;
  });
  var zv = u((g5, Kv) => {
    var kv = Fn(),
      Zq = "Expected a function";
    function ba(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(Zq);
      var r = function () {
        var n = arguments,
          o = t ? t.apply(this, n) : n[0],
          i = r.cache;
        if (i.has(o)) return i.get(o);
        var a = e.apply(this, n);
        return (r.cache = i.set(o, a) || i), a;
      };
      return (r.cache = new (ba.Cache || kv)()), r;
    }
    ba.Cache = kv;
    Kv.exports = ba;
  });
  var $v = u((_5, Yv) => {
    var Jq = zv(),
      eP = 500;
    function tP(e) {
      var t = Jq(e, function (n) {
          return r.size === eP && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    Yv.exports = tP;
  });
  var Zv = u((y5, Qv) => {
    var rP = $v(),
      nP =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      iP = /\\(\\)?/g,
      oP = rP(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(nP, function (r, n, o, i) {
            t.push(o ? i.replace(iP, "$1") : n || r);
          }),
          t
        );
      });
    Qv.exports = oP;
  });
  var wa = u((I5, Jv) => {
    function aP(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
        o[r] = t(e[r], r, e);
      return o;
    }
    Jv.exports = aP;
  });
  var oE = u((T5, iE) => {
    var eE = zt(),
      sP = wa(),
      uP = we(),
      cP = Br(),
      lP = 1 / 0,
      tE = eE ? eE.prototype : void 0,
      rE = tE ? tE.toString : void 0;
    function nE(e) {
      if (typeof e == "string") return e;
      if (uP(e)) return sP(e, nE) + "";
      if (cP(e)) return rE ? rE.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -lP ? "-0" : t;
    }
    iE.exports = nE;
  });
  var sE = u((m5, aE) => {
    var fP = oE();
    function dP(e) {
      return e == null ? "" : fP(e);
    }
    aE.exports = dP;
  });
  var Hr = u((O5, uE) => {
    var pP = we(),
      vP = zn(),
      EP = Zv(),
      hP = sE();
    function gP(e, t) {
      return pP(e) ? e : vP(e, t) ? [e] : EP(hP(e));
    }
    uE.exports = gP;
  });
  var sr = u((S5, cE) => {
    var _P = Br(),
      yP = 1 / 0;
    function IP(e) {
      if (typeof e == "string" || _P(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -yP ? "-0" : t;
    }
    cE.exports = IP;
  });
  var Yn = u((A5, lE) => {
    var TP = Hr(),
      mP = sr();
    function OP(e, t) {
      t = TP(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[mP(t[r++])];
      return r && r == n ? e : void 0;
    }
    lE.exports = OP;
  });
  var $n = u((b5, fE) => {
    var SP = Yn();
    function AP(e, t, r) {
      var n = e == null ? void 0 : SP(e, t);
      return n === void 0 ? r : n;
    }
    fE.exports = AP;
  });
  var pE = u((w5, dE) => {
    function bP(e, t) {
      return e != null && t in Object(e);
    }
    dE.exports = bP;
  });
  var EE = u((R5, vE) => {
    var wP = Hr(),
      RP = Gr(),
      CP = we(),
      NP = Vn(),
      qP = Wn(),
      PP = sr();
    function LP(e, t, r) {
      t = wP(t, e);
      for (var n = -1, o = t.length, i = !1; ++n < o; ) {
        var a = PP(t[n]);
        if (!(i = e != null && r(e, a))) break;
        e = e[a];
      }
      return i || ++n != o
        ? i
        : ((o = e == null ? 0 : e.length),
          !!o && qP(o) && NP(a, o) && (CP(e) || RP(e)));
    }
    vE.exports = LP;
  });
  var gE = u((C5, hE) => {
    var xP = pE(),
      MP = EE();
    function DP(e, t) {
      return e != null && MP(e, t, xP);
    }
    hE.exports = DP;
  });
  var yE = u((N5, _E) => {
    var FP = Oa(),
      GP = $n(),
      UP = gE(),
      XP = zn(),
      VP = Sa(),
      WP = Aa(),
      BP = sr(),
      HP = 1,
      jP = 2;
    function kP(e, t) {
      return XP(e) && VP(t)
        ? WP(BP(e), t)
        : function (r) {
            var n = GP(r, e);
            return n === void 0 && n === t ? UP(r, e) : FP(t, n, HP | jP);
          };
    }
    _E.exports = kP;
  });
  var Qn = u((q5, IE) => {
    function KP(e) {
      return e;
    }
    IE.exports = KP;
  });
  var Ra = u((P5, TE) => {
    function zP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    TE.exports = zP;
  });
  var OE = u((L5, mE) => {
    var YP = Yn();
    function $P(e) {
      return function (t) {
        return YP(t, e);
      };
    }
    mE.exports = $P;
  });
  var AE = u((x5, SE) => {
    var QP = Ra(),
      ZP = OE(),
      JP = zn(),
      eL = sr();
    function tL(e) {
      return JP(e) ? QP(eL(e)) : ZP(e);
    }
    SE.exports = tL;
  });
  var St = u((M5, bE) => {
    var rL = Bv(),
      nL = yE(),
      iL = Qn(),
      oL = we(),
      aL = AE();
    function sL(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? iL
        : typeof e == "object"
        ? oL(e)
          ? nL(e[0], e[1])
          : rL(e)
        : aL(e);
    }
    bE.exports = sL;
  });
  var Ca = u((D5, wE) => {
    var uL = St(),
      cL = xt(),
      lL = Wr();
    function fL(e) {
      return function (t, r, n) {
        var o = Object(t);
        if (!cL(t)) {
          var i = uL(r, 3);
          (t = lL(t)),
            (r = function (s) {
              return i(o[s], s, o);
            });
        }
        var a = e(t, r, n);
        return a > -1 ? o[i ? t[a] : a] : void 0;
      };
    }
    wE.exports = fL;
  });
  var Na = u((F5, RE) => {
    function dL(e, t, r, n) {
      for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
        if (t(e[i], i, e)) return i;
      return -1;
    }
    RE.exports = dL;
  });
  var NE = u((G5, CE) => {
    var pL = /\s/;
    function vL(e) {
      for (var t = e.length; t-- && pL.test(e.charAt(t)); );
      return t;
    }
    CE.exports = vL;
  });
  var PE = u((U5, qE) => {
    var EL = NE(),
      hL = /^\s+/;
    function gL(e) {
      return e && e.slice(0, EL(e) + 1).replace(hL, "");
    }
    qE.exports = gL;
  });
  var Zn = u((X5, ME) => {
    var _L = PE(),
      LE = ct(),
      yL = Br(),
      xE = 0 / 0,
      IL = /^[-+]0x[0-9a-f]+$/i,
      TL = /^0b[01]+$/i,
      mL = /^0o[0-7]+$/i,
      OL = parseInt;
    function SL(e) {
      if (typeof e == "number") return e;
      if (yL(e)) return xE;
      if (LE(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = LE(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = _L(e);
      var r = TL.test(e);
      return r || mL.test(e) ? OL(e.slice(2), r ? 2 : 8) : IL.test(e) ? xE : +e;
    }
    ME.exports = SL;
  });
  var GE = u((V5, FE) => {
    var AL = Zn(),
      DE = 1 / 0,
      bL = 17976931348623157e292;
    function wL(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = AL(e)), e === DE || e === -DE)) {
        var t = e < 0 ? -1 : 1;
        return t * bL;
      }
      return e === e ? e : 0;
    }
    FE.exports = wL;
  });
  var qa = u((W5, UE) => {
    var RL = GE();
    function CL(e) {
      var t = RL(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    UE.exports = CL;
  });
  var VE = u((B5, XE) => {
    var NL = Na(),
      qL = St(),
      PL = qa(),
      LL = Math.max;
    function xL(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var o = r == null ? 0 : PL(r);
      return o < 0 && (o = LL(n + o, 0)), NL(e, qL(t, 3), o);
    }
    XE.exports = xL;
  });
  var Pa = u((H5, WE) => {
    var ML = Ca(),
      DL = VE(),
      FL = ML(DL);
    WE.exports = FL;
  });
  var ei = u((Le) => {
    "use strict";
    var GL = ze().default;
    Object.defineProperty(Le, "__esModule", { value: !0 });
    Le.withBrowser =
      Le.TRANSFORM_STYLE_PREFIXED =
      Le.TRANSFORM_PREFIXED =
      Le.IS_BROWSER_ENV =
      Le.FLEX_PREFIXED =
      Le.ELEMENT_MATCHES =
        void 0;
    var UL = GL(Pa()),
      HE = typeof window < "u";
    Le.IS_BROWSER_ENV = HE;
    var Jn = (e, t) => (HE ? e() : t);
    Le.withBrowser = Jn;
    var XL = Jn(() =>
      (0, UL.default)(
        [
          "matches",
          "matchesSelector",
          "mozMatchesSelector",
          "msMatchesSelector",
          "oMatchesSelector",
          "webkitMatchesSelector",
        ],
        (e) => e in Element.prototype
      )
    );
    Le.ELEMENT_MATCHES = XL;
    var VL = Jn(() => {
      let e = document.createElement("i"),
        t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
        r = "";
      try {
        let { length: n } = t;
        for (let o = 0; o < n; o++) {
          let i = t[o];
          if (((e.style.display = i), e.style.display === i)) return i;
        }
        return r;
      } catch {
        return r;
      }
    }, "flex");
    Le.FLEX_PREFIXED = VL;
    var jE = Jn(() => {
      let e = document.createElement("i");
      if (e.style.transform == null) {
        let t = ["Webkit", "Moz", "ms"],
          r = "Transform",
          { length: n } = t;
        for (let o = 0; o < n; o++) {
          let i = t[o] + r;
          if (e.style[i] !== void 0) return i;
        }
      }
      return "transform";
    }, "transform");
    Le.TRANSFORM_PREFIXED = jE;
    var BE = jE.split("transform")[0],
      WL = BE ? BE + "TransformStyle" : "transformStyle";
    Le.TRANSFORM_STYLE_PREFIXED = WL;
  });
  var La = u((k5, $E) => {
    var BL = 4,
      HL = 0.001,
      jL = 1e-7,
      kL = 10,
      jr = 11,
      ti = 1 / (jr - 1),
      KL = typeof Float32Array == "function";
    function kE(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function KE(e, t) {
      return 3 * t - 6 * e;
    }
    function zE(e) {
      return 3 * e;
    }
    function ri(e, t, r) {
      return ((kE(t, r) * e + KE(t, r)) * e + zE(t)) * e;
    }
    function YE(e, t, r) {
      return 3 * kE(t, r) * e * e + 2 * KE(t, r) * e + zE(t);
    }
    function zL(e, t, r, n, o) {
      var i,
        a,
        s = 0;
      do
        (a = t + (r - t) / 2), (i = ri(a, n, o) - e), i > 0 ? (r = a) : (t = a);
      while (Math.abs(i) > jL && ++s < kL);
      return a;
    }
    function YL(e, t, r, n) {
      for (var o = 0; o < BL; ++o) {
        var i = YE(t, r, n);
        if (i === 0) return t;
        var a = ri(t, r, n) - e;
        t -= a / i;
      }
      return t;
    }
    $E.exports = function (t, r, n, o) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var i = KL ? new Float32Array(jr) : new Array(jr);
      if (t !== r || n !== o)
        for (var a = 0; a < jr; ++a) i[a] = ri(a * ti, t, n);
      function s(c) {
        for (var f = 0, v = 1, d = jr - 1; v !== d && i[v] <= c; ++v) f += ti;
        --v;
        var E = (c - i[v]) / (i[v + 1] - i[v]),
          I = f + E * ti,
          S = YE(I, t, n);
        return S >= HL ? YL(c, I, t, n) : S === 0 ? I : zL(c, f, f + ti, t, n);
      }
      return function (f) {
        return t === r && n === o
          ? f
          : f === 0
          ? 0
          : f === 1
          ? 1
          : ri(s(f), r, o);
      };
    };
  });
  var xa = u((ne) => {
    "use strict";
    var $L = ze().default;
    Object.defineProperty(ne, "__esModule", { value: !0 });
    ne.bounce = Px;
    ne.bouncePast = Lx;
    ne.easeOut = ne.easeInOut = ne.easeIn = ne.ease = void 0;
    ne.inBack = Ox;
    ne.inCirc = yx;
    ne.inCubic = ix;
    ne.inElastic = bx;
    ne.inExpo = hx;
    ne.inOutBack = Ax;
    ne.inOutCirc = Tx;
    ne.inOutCubic = ax;
    ne.inOutElastic = Rx;
    ne.inOutExpo = _x;
    ne.inOutQuad = nx;
    ne.inOutQuart = cx;
    ne.inOutQuint = dx;
    ne.inOutSine = Ex;
    ne.inQuad = tx;
    ne.inQuart = sx;
    ne.inQuint = lx;
    ne.inSine = px;
    ne.outBack = Sx;
    ne.outBounce = mx;
    ne.outCirc = Ix;
    ne.outCubic = ox;
    ne.outElastic = wx;
    ne.outExpo = gx;
    ne.outQuad = rx;
    ne.outQuart = ux;
    ne.outQuint = fx;
    ne.outSine = vx;
    ne.swingFrom = Nx;
    ne.swingFromTo = Cx;
    ne.swingTo = qx;
    var ni = $L(La()),
      gt = 1.70158,
      QL = (0, ni.default)(0.25, 0.1, 0.25, 1);
    ne.ease = QL;
    var ZL = (0, ni.default)(0.42, 0, 1, 1);
    ne.easeIn = ZL;
    var JL = (0, ni.default)(0, 0, 0.58, 1);
    ne.easeOut = JL;
    var ex = (0, ni.default)(0.42, 0, 0.58, 1);
    ne.easeInOut = ex;
    function tx(e) {
      return Math.pow(e, 2);
    }
    function rx(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function nx(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function ix(e) {
      return Math.pow(e, 3);
    }
    function ox(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function ax(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 3)
        : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function sx(e) {
      return Math.pow(e, 4);
    }
    function ux(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function cx(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 4)
        : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function lx(e) {
      return Math.pow(e, 5);
    }
    function fx(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function dx(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 5)
        : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function px(e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function vx(e) {
      return Math.sin(e * (Math.PI / 2));
    }
    function Ex(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function hx(e) {
      return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function gx(e) {
      return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function _x(e) {
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (e /= 0.5) < 1
        ? 0.5 * Math.pow(2, 10 * (e - 1))
        : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function yx(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function Ix(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function Tx(e) {
      return (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function mx(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function Ox(e) {
      let t = gt;
      return e * e * ((t + 1) * e - t);
    }
    function Sx(e) {
      let t = gt;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function Ax(e) {
      let t = gt;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function bx(e) {
      let t = gt,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
    }
    function wx(e) {
      let t = gt,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
    }
    function Rx(e) {
      let t = gt,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
    }
    function Cx(e) {
      let t = gt;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function Nx(e) {
      let t = gt;
      return e * e * ((t + 1) * e - t);
    }
    function qx(e) {
      let t = gt;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function Px(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function Lx(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
        ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
        : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  });
  var Da = u((kr) => {
    "use strict";
    var xx = ze().default,
      Mx = Nt().default;
    Object.defineProperty(kr, "__esModule", { value: !0 });
    kr.applyEasing = Gx;
    kr.createBezierEasing = Fx;
    kr.optimizeFloat = Ma;
    var QE = Mx(xa()),
      Dx = xx(La());
    function Ma(e, t = 5, r = 10) {
      let n = Math.pow(r, t),
        o = Number(Math.round(e * n) / n);
      return Math.abs(o) > 1e-4 ? o : 0;
    }
    function Fx(e) {
      return (0, Dx.default)(...e);
    }
    function Gx(e, t, r) {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Ma(r ? (t > 0 ? r(t) : t) : t > 0 && e && QE[e] ? QE[e](t) : t);
    }
  });
  var th = u((ur) => {
    "use strict";
    Object.defineProperty(ur, "__esModule", { value: !0 });
    ur.createElementState = eh;
    ur.ixElements = void 0;
    ur.mergeActionState = Fa;
    var ii = Jt(),
      JE = Fe(),
      {
        HTML_ELEMENT: Y5,
        PLAIN_OBJECT: Ux,
        ABSTRACT_NODE: $5,
        CONFIG_X_VALUE: Xx,
        CONFIG_Y_VALUE: Vx,
        CONFIG_Z_VALUE: Wx,
        CONFIG_VALUE: Bx,
        CONFIG_X_UNIT: Hx,
        CONFIG_Y_UNIT: jx,
        CONFIG_Z_UNIT: kx,
        CONFIG_UNIT: Kx,
      } = JE.IX2EngineConstants,
      {
        IX2_SESSION_STOPPED: zx,
        IX2_INSTANCE_ADDED: Yx,
        IX2_ELEMENT_STATE_CHANGED: $x,
      } = JE.IX2EngineActionTypes,
      ZE = {},
      Qx = "refState",
      Zx = (e = ZE, t = {}) => {
        switch (t.type) {
          case zx:
            return ZE;
          case Yx: {
            let {
                elementId: r,
                element: n,
                origin: o,
                actionItem: i,
                refType: a,
              } = t.payload,
              { actionTypeId: s } = i,
              c = e;
            return (
              (0, ii.getIn)(c, [r, n]) !== n && (c = eh(c, n, a, r, i)),
              Fa(c, r, s, o, i)
            );
          }
          case $x: {
            let {
              elementId: r,
              actionTypeId: n,
              current: o,
              actionItem: i,
            } = t.payload;
            return Fa(e, r, n, o, i);
          }
          default:
            return e;
        }
      };
    ur.ixElements = Zx;
    function eh(e, t, r, n, o) {
      let i =
        r === Ux ? (0, ii.getIn)(o, ["config", "target", "objectId"]) : null;
      return (0, ii.mergeIn)(e, [n], { id: n, ref: t, refId: i, refType: r });
    }
    function Fa(e, t, r, n, o) {
      let i = eM(o),
        a = [t, Qx, r];
      return (0, ii.mergeIn)(e, a, n, i);
    }
    var Jx = [
			   
			   
			   
      [Xx, Hx],
      [Vx, jx],
      [Wx, kx],
      [Bx, Kx],
    ];
    function eM(e) {
      let { config: t } = e;
      return Jx.reduce((r, n) => {
        let o = n[0],
          i = n[1],
          a = t[o],
          s = t[i];
        return a != null && s != null && (r[i] = s), r;
      }, {});
    }
  });
  var rh = u((Re) => {
    "use strict";
    Object.defineProperty(Re, "__esModule", { value: !0 });
    Re.renderPlugin =
      Re.getPluginOrigin =
      Re.getPluginDuration =
      Re.getPluginDestination =
      Re.getPluginConfig =
      Re.createPluginInstance =
      Re.clearPlugin =
        void 0;
    var tM = (e) => e.value;
    Re.getPluginConfig = tM;
    var rM = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Re.getPluginDuration = rM;
    var nM = (e) => e || { value: 0 };
    Re.getPluginOrigin = nM;
    var iM = (e) => ({ value: e.value });
    Re.getPluginDestination = iM;
    var oM = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Re.createPluginInstance = oM;
    var aM = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Re.renderPlugin = aM;
    var sM = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Re.clearPlugin = sM;
  });
  var ih = u((Ce) => {
    "use strict";
    Object.defineProperty(Ce, "__esModule", { value: !0 });
    Ce.renderPlugin =
      Ce.getPluginOrigin =
      Ce.getPluginDuration =
      Ce.getPluginDestination =
      Ce.getPluginConfig =
      Ce.createPluginInstance =
      Ce.clearPlugin =
        void 0;
    var uM = (e) => document.querySelector(`[data-w-id="${e}"]`),
      cM = () => window.Webflow.require("spline"),
      lM = (e, t) => e.filter((r) => !t.includes(r)),
      fM = (e, t) => e.value[t];
    Ce.getPluginConfig = fM;
    var dM = () => null;
    Ce.getPluginDuration = dM;
    var nh = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      pM = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let i = Object.keys(e),
            a = lM(n, i);
          return a.length ? a.reduce((c, f) => ((c[f] = nh[f]), c), e) : e;
        }
        return n.reduce((i, a) => ((i[a] = nh[a]), i), {});
      };
    Ce.getPluginOrigin = pM;
    var vM = (e) => e.value;
    Ce.getPluginDestination = vM;
    var EM = (e, t) => {
      var r, n;
      let o =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return o ? uM(o) : null;
    };
    Ce.createPluginInstance = EM;
    var hM = (e, t, r) => {
      let n = cM().getInstance(e),
        o = r.config.target.objectId;
      if (!n || !o) return;
      let i = n.spline.findObjectById(o);
      if (!i) return;
      let { PLUGIN_SPLINE: a } = t;
      a.positionX != null && (i.position.x = a.positionX),
        a.positionY != null && (i.position.y = a.positionY),
        a.positionZ != null && (i.position.z = a.positionZ),
        a.rotationX != null && (i.rotation.x = a.rotationX),
        a.rotationY != null && (i.rotation.y = a.rotationY),
        a.rotationZ != null && (i.rotation.z = a.rotationZ),
        a.scaleX != null && (i.scale.x = a.scaleX),
        a.scaleY != null && (i.scale.y = a.scaleY),
        a.scaleZ != null && (i.scale.z = a.scaleZ);
    };
    Ce.renderPlugin = hM;
    var gM = () => null;
    Ce.clearPlugin = gM;
  });
  var uh = u((oi) => {
    "use strict";
    var sh = Nt().default,
      _M = ze().default;
    Object.defineProperty(oi, "__esModule", { value: !0 });
    oi.pluginMethodMap = void 0;
    var oh = _M(Zt()),
      ah = Fe(),
      yM = sh(rh()),
      IM = sh(ih()),
      TM = new Map([
        [ah.ActionTypeConsts.PLUGIN_LOTTIE, (0, oh.default)({}, yM)],
        [ah.ActionTypeConsts.PLUGIN_SPLINE, (0, oh.default)({}, IM)],
      ]);
    oi.pluginMethodMap = TM;
  });
  var Ga = u((Ae) => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    Ae.getPluginOrigin =
      Ae.getPluginDuration =
      Ae.getPluginDestination =
      Ae.getPluginConfig =
      Ae.createPluginInstance =
      Ae.clearPlugin =
        void 0;
    Ae.isPluginType = OM;
    Ae.renderPlugin = void 0;
    var mM = ei(),
      ch = uh();
    function OM(e) {
      return ch.pluginMethodMap.has(e);
    }
    var Dt = (e) => (t) => {
        if (!mM.IS_BROWSER_ENV) return () => null;
        let r = ch.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
      SM = Dt("getPluginConfig");
    Ae.getPluginConfig = SM;
    var AM = Dt("getPluginOrigin");
    Ae.getPluginOrigin = AM;
    var bM = Dt("getPluginDuration");
    Ae.getPluginDuration = bM;
    var wM = Dt("getPluginDestination");
    Ae.getPluginDestination = wM;
    var RM = Dt("createPluginInstance");
    Ae.createPluginInstance = RM;
    var CM = Dt("renderPlugin");
    Ae.renderPlugin = CM;
    var NM = Dt("clearPlugin");
    Ae.clearPlugin = NM;
  });
  var fh = u((rk, lh) => {
    function qM(e, t) {
      return e == null || e !== e ? t : e;
    }
    lh.exports = qM;
  });
  var ph = u((nk, dh) => {
    function PM(e, t, r, n) {
      var o = -1,
        i = e == null ? 0 : e.length;
      for (n && i && (r = e[++o]); ++o < i; ) r = t(r, e[o], o, e);
      return r;
    }
    dh.exports = PM;
  });
  var Eh = u((ik, vh) => {
    function LM(e) {
      return function (t, r, n) {
        for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
          var c = a[e ? s : ++o];
          if (r(i[c], c, i) === !1) break;
        }
        return t;
      };
    }
    vh.exports = LM;
  });
  var gh = u((ok, hh) => {
    var xM = Eh(),
      MM = xM();
    hh.exports = MM;
  });
  var Ua = u((ak, _h) => {
    var DM = gh(),
      FM = Wr();
    function GM(e, t) {
      return e && DM(e, t, FM);
    }
    _h.exports = GM;
  });
  var Ih = u((sk, yh) => {
    var UM = xt();
    function XM(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!UM(r)) return e(r, n);
        for (
          var o = r.length, i = t ? o : -1, a = Object(r);
          (t ? i-- : ++i < o) && n(a[i], i, a) !== !1;

        );
        return r;
      };
    }
    yh.exports = XM;
  });
  var Xa = u((uk, Th) => {
    var VM = Ua(),
      WM = Ih(),
      BM = WM(VM);
    Th.exports = BM;
  });
  var Oh = u((ck, mh) => {
    function HM(e, t, r, n, o) {
      return (
        o(e, function (i, a, s) {
          r = n ? ((n = !1), i) : t(r, i, a, s);
        }),
        r
      );
    }
    mh.exports = HM;
  });
  var Ah = u((lk, Sh) => {
    var jM = ph(),
      kM = Xa(),
      KM = St(),
      zM = Oh(),
      YM = we();
    function $M(e, t, r) {
      var n = YM(e) ? jM : zM,
        o = arguments.length < 3;
      return n(e, KM(t, 4), r, o, kM);
    }
    Sh.exports = $M;
  });
  var wh = u((fk, bh) => {
    var QM = Na(),
      ZM = St(),
      JM = qa(),
      eD = Math.max,
      tD = Math.min;
    function rD(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var o = n - 1;
      return (
        r !== void 0 &&
          ((o = JM(r)), (o = r < 0 ? eD(n + o, 0) : tD(o, n - 1))),
        QM(e, ZM(t, 3), o, !0)
      );
    }
    bh.exports = rD;
  });
  var Ch = u((dk, Rh) => {
    var nD = Ca(),
      iD = wh(),
      oD = nD(iD);
    Rh.exports = oD;
  });
  var qh = u((ai) => {
    "use strict";
    Object.defineProperty(ai, "__esModule", { value: !0 });
    ai.default = void 0;
    var aD = Object.prototype.hasOwnProperty;
    function Nh(e, t) {
      return e === t
        ? e !== 0 || t !== 0 || 1 / e === 1 / t
        : e !== e && t !== t;
    }
    function sD(e, t) {
      if (Nh(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let o = 0; o < r.length; o++)
        if (!aD.call(t, r[o]) || !Nh(e[r[o]], t[r[o]])) return !1;
      return !0;
    }
    var uD = sD;
    ai.default = uD;
  });
  var $h = u((pe) => {
    "use strict";
    var li = ze().default;
    Object.defineProperty(pe, "__esModule", { value: !0 });
    pe.cleanupHTMLElement = aF;
    pe.clearAllStyles = oF;
    pe.clearObjectCache = bD;
    pe.getActionListProgress = uF;
    pe.getAffectedElements = Ka;
    pe.getComputedStyle = xD;
    pe.getDestinationValues = VD;
    pe.getElementId = ND;
    pe.getInstanceId = RD;
    pe.getInstanceOrigin = FD;
    pe.getItemConfigByKey = void 0;
    pe.getMaxDurationItemIndex = Yh;
    pe.getNamespacedParameterId = fF;
    pe.getRenderType = kh;
    pe.getStyleProp = WD;
    pe.mediaQueriesEqual = pF;
    pe.observeStore = LD;
    pe.reduceListToGroup = cF;
    pe.reifyState = qD;
    pe.renderHTMLElement = BD;
    Object.defineProperty(pe, "shallowEqual", {
      enumerable: !0,
      get: function () {
        return Uh.default;
      },
    });
    pe.shouldAllowMediaQuery = dF;
    pe.shouldNamespaceEventParameter = lF;
    pe.stringifyTarget = vF;
    var At = li(fh()),
      Ba = li(Ah()),
      Wa = li(Ch()),
      Ph = Jt(),
      Ft = Fe(),
      Uh = li(qh()),
      cD = Da(),
      dt = Ga(),
      xe = ei(),
      {
        BACKGROUND: lD,
        TRANSFORM: fD,
        TRANSLATE_3D: dD,
        SCALE_3D: pD,
        ROTATE_X: vD,
        ROTATE_Y: ED,
        ROTATE_Z: hD,
        SKEW: gD,
        PRESERVE_3D: _D,
        FLEX: yD,
        OPACITY: ui,
        FILTER: Kr,
        FONT_VARIATION_SETTINGS: zr,
        WIDTH: lt,
        HEIGHT: ft,
        BACKGROUND_COLOR: Xh,
        BORDER_COLOR: ID,
        COLOR: TD,
        CHILDREN: Lh,
        IMMEDIATE_CHILDREN: mD,
        SIBLINGS: xh,
        PARENT: OD,
        DISPLAY: ci,
        WILL_CHANGE: cr,
        AUTO: bt,
        COMMA_DELIMITER: Yr,
        COLON_DELIMITER: SD,
        BAR_DELIMITER: Va,
        RENDER_TRANSFORM: Vh,
        RENDER_GENERAL: Ha,
        RENDER_STYLE: ja,
        RENDER_PLUGIN: Wh,
      } = Ft.IX2EngineConstants,
      {
        TRANSFORM_MOVE: lr,
        TRANSFORM_SCALE: fr,
        TRANSFORM_ROTATE: dr,
        TRANSFORM_SKEW: $r,
        STYLE_OPACITY: Bh,
        STYLE_FILTER: Qr,
        STYLE_FONT_VARIATION: Zr,
        STYLE_SIZE: pr,
        STYLE_BACKGROUND_COLOR: vr,
        STYLE_BORDER: Er,
        STYLE_TEXT_COLOR: hr,
        GENERAL_DISPLAY: fi,
        OBJECT_VALUE: AD,
      } = Ft.ActionTypeConsts,
      Hh = (e) => e.trim(),
      ka = Object.freeze({ [vr]: Xh, [Er]: ID, [hr]: TD }),
      jh = Object.freeze({
        [xe.TRANSFORM_PREFIXED]: fD,
        [Xh]: lD,
        [ui]: ui,
				 
				 
				 
        [Kr]: Kr,
        [lt]: lt,
        [ft]: ft,
        [zr]: zr,
      }),
      si = new Map();
    function bD() {
      si.clear();
    }
    var wD = 1;
    function RD() {
      return "i" + wD++;
    }
    var CD = 1;
    function ND(e, t) {
      for (let r in e) {
        let n = e[r];
        if (n && n.ref === t) return n.id;
      }
      return "e" + CD++;
    }
    function qD({ events: e, actionLists: t, site: r } = {}) {
      let n = (0, Ba.default)(
          e,
          (a, s) => {
            let { eventTypeId: c } = s;
            return a[c] || (a[c] = {}), (a[c][s.id] = s), a;
          },
          {}
        ),
        o = r && r.mediaQueries,
        i = [];
      return (
        o
          ? (i = o.map((a) => a.key))
          : ((o = []), console.warn("IX2 missing mediaQueries in site data")),
        {
          ixData: {
            events: e,
            actionLists: t,
            eventTypeMap: n,
            mediaQueries: o,
            mediaQueryKeys: i,
          },
        }
      );
    }
    var PD = (e, t) => e === t;
    function LD({ store: e, select: t, onChange: r, comparator: n = PD }) {
      let { getState: o, subscribe: i } = e,
        a = i(c),
        s = t(o());
      function c() {
        let f = t(o());
        if (f == null) {
          a();
          return;
        }
        n(f, s) || ((s = f), r(s, e));
      }
      return a;
    }
    function Mh(e) {
      let t = typeof e;
      if (t === "string") return { id: e };
      if (e != null && t === "object") {
        let {
          id: r,
          objectId: n,
          selector: o,
          selectorGuids: i,
          appliesTo: a,
          useEventTarget: s,
        } = e;
        return {
          id: r,
          objectId: n,
          selector: o,
          selectorGuids: i,
          appliesTo: a,
          useEventTarget: s,
        };
      }
      return {};
    }
    function Ka({
      config: e,
      event: t,
      eventTarget: r,
      elementRoot: n,
      elementApi: o,
    }) {
      var i, a, s;
      if (!o) throw new Error("IX2 missing elementApi");
      let { targets: c } = e;
      if (Array.isArray(c) && c.length > 0)
        return c.reduce(
          (F, X) =>
            F.concat(
              Ka({
                config: { target: X },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: o,
              })
            ),
          []
        );
      let {
          getValidDocument: f,
          getQuerySelector: v,
          queryDocument: d,
          getChildElements: E,
          getSiblingElements: I,
          matchSelector: S,
          elementContains: A,
          isSiblingNode: L,
        } = o,
        { target: b } = e;
      if (!b) return [];
      let {
        id: w,
        objectId: T,
        selector: q,
        selectorGuids: N,
        appliesTo: P,
        useEventTarget: G,
      } = Mh(b);
      if (T) return [si.has(T) ? si.get(T) : si.set(T, {}).get(T)];
      if (P === Ft.EventAppliesTo.PAGE) {
        let F = f(w);
        return F ? [F] : [];
      }
      let Y =
          ((i =
            t == null ||
            (a = t.action) === null ||
            a === void 0 ||
            (s = a.config) === null ||
            s === void 0
              ? void 0
              : s.affectedElements) !== null && i !== void 0
            ? i
            : {})[w || q] || {},
        re = !!(Y.id || Y.selector),
        J,
        M,
        _,
        D = t && v(Mh(t.target));
      if (
        (re
          ? ((J = Y.limitAffectedElements), (M = D), (_ = v(Y)))
          : (M = _ = v({ id: w, selector: q, selectorGuids: N })),
        t && G)
      ) {
        let F = r && (_ || G === !0) ? [r] : d(D);
        if (_) {
          if (G === OD) return d(_).filter((X) => F.some((Q) => A(X, Q)));
          if (G === Lh) return d(_).filter((X) => F.some((Q) => A(Q, X)));
          if (G === xh) return d(_).filter((X) => F.some((Q) => L(Q, X)));
        }
        return F;
      }
      return M == null || _ == null
        ? []
        : xe.IS_BROWSER_ENV && n
        ? d(_).filter((F) => n.contains(F))
        : J === Lh
        ? d(M, _)
        : J === mD
        ? E(d(M)).filter(S(_))
        : J === xh
        ? I(d(M)).filter(S(_))
        : d(_);
    }
    function xD({ element: e, actionItem: t }) {
      if (!xe.IS_BROWSER_ENV) return {};
      let { actionTypeId: r } = t;
      switch (r) {
				
        case pr:
        case vr:
        case Er:
        case hr:
        case fi:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    var Dh = /px/,
      MD = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = HD[n.type]), r),
          e || {}
        ),
      DD = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = jD[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        );
    function FD(e, t = {}, r = {}, n, o) {
      let { getStyle: i } = o,
        { actionTypeId: a } = n;
      if ((0, dt.isPluginType)(a)) return (0, dt.getPluginOrigin)(a)(t[a], n);
      switch (n.actionTypeId) {
				
        case lr:
        case fr:
        case dr:
														 
        case $r:
          return t[n.actionTypeId] || za[n.actionTypeId];
        case Qr:
          return MD(t[n.actionTypeId], n.config.filters);
        case Zr:
          return DD(t[n.actionTypeId], n.config.fontVariations);
        case Bh:
          return { value: (0, At.default)(parseFloat(i(e, ui)), 1) };
        case pr: {
          let s = i(e, lt),
            c = i(e, ft),
            f,
            v;
          return (
            n.config.widthUnit === bt
              ? (f = Dh.test(s) ? parseFloat(s) : parseFloat(r.width))
              : (f = (0, At.default)(parseFloat(s), parseFloat(r.width))),
            n.config.heightUnit === bt
              ? (v = Dh.test(c) ? parseFloat(c) : parseFloat(r.height))
              : (v = (0, At.default)(parseFloat(c), parseFloat(r.height))),
            { widthValue: f, heightValue: v }
          );
        }
				
        case vr:
        case Er:
        case hr:
          return rF({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: r,
            getStyle: i,
          });
        case fi:
          return { value: (0, At.default)(i(e, ci), r.display) };
        case AD:
          return t[n.actionTypeId] || { value: 0 };
        default:
          return;
      }
    }
    var GD = (e, t) => (t && (e[t.type] = t.value || 0), e),
      UD = (e, t) => (t && (e[t.type] = t.value || 0), e),
      XD = (e, t, r) => {
        if ((0, dt.isPluginType)(e)) return (0, dt.getPluginConfig)(e)(r, t);
        switch (e) {
          case Qr: {
            let n = (0, Wa.default)(r.filters, ({ type: o }) => o === t);
            return n ? n.value : 0;
          }
          case Zr: {
            let n = (0, Wa.default)(r.fontVariations, ({ type: o }) => o === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      };
    pe.getItemConfigByKey = XD;
    function VD({ element: e, actionItem: t, elementApi: r }) {
      if ((0, dt.isPluginType)(t.actionTypeId))
        return (0, dt.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
				
        case lr:
        case fr:
        case dr:
        case $r: {
          let { xValue: n, yValue: o, zValue: i } = t.config;
          return { xValue: n, yValue: o, zValue: i };
        }
        case pr: {
          let { getStyle: n, setStyle: o, getProperty: i } = r,
            { widthUnit: a, heightUnit: s } = t.config,
            { widthValue: c, heightValue: f } = t.config;
          if (!xe.IS_BROWSER_ENV) return { widthValue: c, heightValue: f };
          if (a === bt) {
							 
																 
		   
						 
            let v = n(e, lt);
            o(e, lt, ""), (c = i(e, "offsetWidth")), o(e, lt, v);
          }
          if (s === bt) {
            let v = n(e, ft);
            o(e, ft, ""), (f = i(e, "offsetHeight")), o(e, ft, v);
          }
          return { widthValue: c, heightValue: f };
        }
				
        case vr:
        case Er:
        case hr: {
          let { rValue: n, gValue: o, bValue: i, aValue: a } = t.config;
          return { rValue: n, gValue: o, bValue: i, aValue: a };
        }
				
												 
        case Qr:
          return t.config.filters.reduce(GD, {});
        case Zr:
          return t.config.fontVariations.reduce(UD, {});
        default: {
          let { value: n } = t.config;
          return { value: n };
        }
      }
    }
    function kh(e) {
      if (/^TRANSFORM_/.test(e)) return Vh;
      if (/^STYLE_/.test(e)) return ja;
      if (/^GENERAL_/.test(e)) return Ha;
      if (/^PLUGIN_/.test(e)) return Wh;
    }
    function WD(e, t) {
      return e === ja ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function BD(e, t, r, n, o, i, a, s, c) {
      switch (s) {
        case Vh:
          return zD(e, t, r, o, a);
        case ja:
          return nF(e, t, r, o, i, a);
        case Ha:
          return iF(e, o, a);
        case Wh: {
							 
				  
          let { actionTypeId: f } = o;
          if ((0, dt.isPluginType)(f)) return (0, dt.renderPlugin)(f)(c, t, o);
        }
      }
    }
    var za = {
        [lr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [fr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [dr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [$r]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
      HD = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      }),
      jD = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
      kD = (e, t) => {
        let r = (0, Wa.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      },
      KD = Object.keys(za);
    function zD(e, t, r, n, o) {
      let i = KD.map((s) => {
          let c = za[s],
            {
              xValue: f = c.xValue,
              yValue: v = c.yValue,
              zValue: d = c.zValue,
              xUnit: E = "",
              yUnit: I = "",
              zUnit: S = "",
            } = t[s] || {};
          switch (s) {
					
														   
            case lr:
              return `${dD}(${f}${E}, ${v}${I}, ${d}${S})`;
            case fr:
              return `${pD}(${f}${E}, ${v}${I}, ${d}${S})`;
            case dr:
              return `${vD}(${f}${E}) ${ED}(${v}${I}) ${hD}(${d}${S})`;
            case $r:
              return `${gD}(${f}${E}, ${v}${I})`;
            default:
              return "";
          }
        }).join(" "),
        { setStyle: a } = o;
      Gt(e, xe.TRANSFORM_PREFIXED, o),
        a(e, xe.TRANSFORM_PREFIXED, i),
        QD(n, r) && a(e, xe.TRANSFORM_STYLE_PREFIXED, _D);
    }
    function YD(e, t, r, n) {
      let o = (0, Ba.default)(t, (a, s, c) => `${a} ${c}(${s}${kD(c, r)})`, ""),
        { setStyle: i } = n;
      Gt(e, Kr, n), i(e, Kr, o);
    }
    function $D(e, t, r, n) {
      let o = (0, Ba.default)(
          t,
          (a, s, c) => (a.push(`"${c}" ${s}`), a),
          []
        ).join(", "),
        { setStyle: i } = n;
      Gt(e, zr, n), i(e, zr, o);
    }
    function QD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
      return (
									 
        (e === lr && n !== void 0) ||
        (e === fr && n !== void 0) ||
        (e === dr && (t !== void 0 || r !== void 0))
      );
    }
    var ZD = "\\(([^)]+)\\)",
      JD = /^rgb/,
      eF = RegExp(`rgba?${ZD}`);
    function tF(e, t) {
      let r = e.exec(t);
      return r ? r[1] : "";
    }
    function rF({
      element: e,
      actionTypeId: t,
      computedStyle: r,
      getStyle: n,
    }) {
      let o = ka[t],
        i = n(e, o),
        a = JD.test(i) ? i : r[o],
        s = tF(eF, a).split(Yr);
      return {
        rValue: (0, At.default)(parseInt(s[0], 10), 255),
        gValue: (0, At.default)(parseInt(s[1], 10), 255),
        bValue: (0, At.default)(parseInt(s[2], 10), 255),
        aValue: (0, At.default)(parseFloat(s[3]), 1),
      };
    }
    function nF(e, t, r, n, o, i) {
      let { setStyle: a } = i;
      switch (n.actionTypeId) {
        case pr: {
          let { widthUnit: s = "", heightUnit: c = "" } = n.config,
            { widthValue: f, heightValue: v } = r;
          f !== void 0 &&
            (s === bt && (s = "px"), Gt(e, lt, i), a(e, lt, f + s)),
            v !== void 0 &&
              (c === bt && (c = "px"), Gt(e, ft, i), a(e, ft, v + c));
          break;
        }
        case Qr: {
          YD(e, r, n.config, i);
          break;
        }
        case Zr: {
          $D(e, r, n.config, i);
          break;
        }
				
        case vr:
        case Er:
        case hr: {
          let s = ka[n.actionTypeId],
            c = Math.round(r.rValue),
            f = Math.round(r.gValue),
            v = Math.round(r.bValue),
            d = r.aValue;
          Gt(e, s, i),
            a(
              e,
              s,
              d >= 1 ? `rgb(${c},${f},${v})` : `rgba(${c},${f},${v},${d})`
            );
          break;
        }
        default: {
          let { unit: s = "" } = n.config;
          Gt(e, o, i), a(e, o, r.value + s);
          break;
        }
      }
    }
    function iF(e, t, r) {
      let { setStyle: n } = r;
      switch (t.actionTypeId) {
        case fi: {
          let { value: o } = t.config;
          o === yD && xe.IS_BROWSER_ENV
            ? n(e, ci, xe.FLEX_PREFIXED)
            : n(e, ci, o);
          return;
        }
      }
    }
    function Gt(e, t, r) {
      if (!xe.IS_BROWSER_ENV) return;
      let n = jh[t];
      if (!n) return;
      let { getStyle: o, setStyle: i } = r,
        a = o(e, cr);
      if (!a) {
        i(e, cr, n);
        return;
      }
      let s = a.split(Yr).map(Hh);
      s.indexOf(n) === -1 && i(e, cr, s.concat(n).join(Yr));
    }
    function Kh(e, t, r) {
      if (!xe.IS_BROWSER_ENV) return;
      let n = jh[t];
      if (!n) return;
      let { getStyle: o, setStyle: i } = r,
        a = o(e, cr);
      !a ||
        a.indexOf(n) === -1 ||
        i(
          e,
          cr,
          a
            .split(Yr)
            .map(Hh)
            .filter((s) => s !== n)
            .join(Yr)
        );
    }
    function oF({ store: e, elementApi: t }) {
      let { ixData: r } = e.getState(),
        { events: n = {}, actionLists: o = {} } = r;
      Object.keys(n).forEach((i) => {
        let a = n[i],
          { config: s } = a.action,
          { actionListId: c } = s,
          f = o[c];
        f && Fh({ actionList: f, event: a, elementApi: t });
      }),
        Object.keys(o).forEach((i) => {
          Fh({ actionList: o[i], elementApi: t });
        });
    }
    function Fh({ actionList: e = {}, event: t, elementApi: r }) {
      let { actionItemGroups: n, continuousParameterGroups: o } = e;
      n &&
        n.forEach((i) => {
          Gh({ actionGroup: i, event: t, elementApi: r });
        }),
        o &&
          o.forEach((i) => {
            let { continuousActionGroups: a } = i;
            a.forEach((s) => {
              Gh({ actionGroup: s, event: t, elementApi: r });
            });
          });
    }
    function Gh({ actionGroup: e, event: t, elementApi: r }) {
      let { actionItems: n } = e;
      n.forEach(({ actionTypeId: o, config: i }) => {
        let a;
        (0, dt.isPluginType)(o)
          ? (a = (0, dt.clearPlugin)(o))
          : (a = zh({ effect: sF, actionTypeId: o, elementApi: r })),
          Ka({ config: i, event: t, elementApi: r }).forEach(a);
      });
    }
    function aF(e, t, r) {
      let { setStyle: n, getStyle: o } = r,
        { actionTypeId: i } = t;
      if (i === pr) {
        let { config: a } = t;
        a.widthUnit === bt && n(e, lt, ""), a.heightUnit === bt && n(e, ft, "");
      }
      o(e, cr) && zh({ effect: Kh, actionTypeId: i, elementApi: r })(e);
    }
    var zh =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
				  
          case lr:
          case fr:
          case dr:
										   
				  
          case $r:
            e(n, xe.TRANSFORM_PREFIXED, r);
            break;
          case Qr:
            e(n, Kr, r);
            break;
          case Zr:
            e(n, zr, r);
            break;
          case Bh:
            e(n, ui, r);
            break;
          case pr:
            e(n, lt, r), e(n, ft, r);
            break;
          case vr:
          case Er:
          case hr:
            e(n, ka[t], r);
            break;
          case fi:
            e(n, ci, r);
            break;
        }
      };
    function sF(e, t, r) {
      let { setStyle: n } = r;
      Kh(e, t, r),
        n(e, t, ""),
        t === xe.TRANSFORM_PREFIXED && n(e, xe.TRANSFORM_STYLE_PREFIXED, "");
    }
    function Yh(e) {
      let t = 0,
        r = 0;
      return (
        e.forEach((n, o) => {
          let { config: i } = n,
            a = i.delay + i.duration;
          a >= t && ((t = a), (r = o));
        }),
        r
      );
    }
    function uF(e, t) {
      let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
        { actionItem: o, verboseTimeElapsed: i = 0 } = t,
        a = 0,
        s = 0;
      return (
        r.forEach((c, f) => {
          if (n && f === 0) return;
          let { actionItems: v } = c,
            d = v[Yh(v)],
            { config: E, actionTypeId: I } = d;
          o.id === d.id && (s = a + i);
          let S = kh(I) === Ha ? 0 : E.duration;
          a += E.delay + S;
        }),
        a > 0 ? (0, cD.optimizeFloat)(s / a) : 0
      );
    }
    function cF({ actionList: e, actionItemId: t, rawData: r }) {
      let { actionItemGroups: n, continuousParameterGroups: o } = e,
        i = [],
        a = (s) => (
          i.push((0, Ph.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
          s.id === t
        );
      return (
        n && n.some(({ actionItems: s }) => s.some(a)),
        o &&
          o.some((s) => {
            let { continuousActionGroups: c } = s;
            return c.some(({ actionItems: f }) => f.some(a));
          }),
        (0, Ph.setIn)(r, ["actionLists"], {
          [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
        })
      );
    }
    function lF(e, { basedOn: t }) {
      return (
        (e === Ft.EventTypeConsts.SCROLLING_IN_VIEW &&
          (t === Ft.EventBasedOn.ELEMENT || t == null)) ||
        (e === Ft.EventTypeConsts.MOUSE_MOVE && t === Ft.EventBasedOn.ELEMENT)
      );
    }
    function fF(e, t) {
      return e + SD + t;
    }
    function dF(e, t) {
      return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function pF(e, t) {
      return (0, Uh.default)(e && e.sort(), t && t.sort());
    }
    function vF(e) {
      if (typeof e == "string") return e;
      if (e.pluginElement && e.objectId)
        return e.pluginElement + Va + e.objectId;
      let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
      return t + Va + r + Va + n;
    }
  });
  var Ut = u((Me) => {
    "use strict";
    var gr = Nt().default;
    Object.defineProperty(Me, "__esModule", { value: !0 });
    Me.IX2VanillaUtils =
      Me.IX2VanillaPlugins =
      Me.IX2ElementsReducer =
      Me.IX2Easings =
      Me.IX2EasingUtils =
      Me.IX2BrowserSupport =
        void 0;
    var EF = gr(ei());
    Me.IX2BrowserSupport = EF;
    var hF = gr(xa());
    Me.IX2Easings = hF;
    var gF = gr(Da());
    Me.IX2EasingUtils = gF;
    var _F = gr(th());
    Me.IX2ElementsReducer = _F;
    var yF = gr(Ga());
    Me.IX2VanillaPlugins = yF;
    var IF = gr($h());
    Me.IX2VanillaUtils = IF;
  });
  var eg = u((pi) => {
    "use strict";
    Object.defineProperty(pi, "__esModule", { value: !0 });
    pi.ixInstances = void 0;
    var Qh = Fe(),
      Zh = Ut(),
      _r = Jt(),
      {
        IX2_RAW_DATA_IMPORTED: TF,
        IX2_SESSION_STOPPED: mF,
        IX2_INSTANCE_ADDED: OF,
        IX2_INSTANCE_STARTED: SF,
        IX2_INSTANCE_REMOVED: AF,
        IX2_ANIMATION_FRAME_CHANGED: bF,
      } = Qh.IX2EngineActionTypes,
      {
        optimizeFloat: di,
        applyEasing: Jh,
        createBezierEasing: wF,
      } = Zh.IX2EasingUtils,
      { RENDER_GENERAL: RF } = Qh.IX2EngineConstants,
      {
        getItemConfigByKey: Ya,
        getRenderType: CF,
        getStyleProp: NF,
      } = Zh.IX2VanillaUtils,
      qF = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: o,
            destinationKeys: i,
            smoothing: a,
            restingValue: s,
            actionTypeId: c,
            customEasingFn: f,
            skipMotion: v,
            skipToValue: d,
          } = e,
          { parameters: E } = t.payload,
          I = Math.max(1 - a, 0.01),
          S = E[n];
        S == null && ((I = 1), (S = s));
        let A = Math.max(S, 0) || 0,
          L = di(A - r),
          b = v ? d : di(r + L * I),
          w = b * 100;
        if (b === r && e.current) return e;
        let T, q, N, P;
        for (let K = 0, { length: Y } = o; K < Y; K++) {
          let { keyframe: re, actionItems: J } = o[K];
          if ((K === 0 && (T = J[0]), w >= re)) {
            T = J[0];
            let M = o[K + 1],
              _ = M && w !== re;
            (q = _ ? M.actionItems[0] : null),
              _ && ((N = re / 100), (P = (M.keyframe - re) / 100));
          }
        }
        let G = {};
        if (T && !q)
          for (let K = 0, { length: Y } = i; K < Y; K++) {
            let re = i[K];
            G[re] = Ya(c, re, T.config);
          }
        else if (T && q && N !== void 0 && P !== void 0) {
          let K = (b - N) / P,
            Y = T.config.easing,
            re = Jh(Y, K, f);
          for (let J = 0, { length: M } = i; J < M; J++) {
            let _ = i[J],
              D = Ya(c, _, T.config),
              Q = (Ya(c, _, q.config) - D) * re + D;
            G[_] = Q;
          }
        }
        return (0, _r.merge)(e, { position: b, current: G });
      },
      PF = (e, t) => {
        let {
            active: r,
            origin: n,
            start: o,
            immediate: i,
            renderType: a,
            verbose: s,
            actionItem: c,
            destination: f,
            destinationKeys: v,
            pluginDuration: d,
            instanceDelay: E,
            customEasingFn: I,
            skipMotion: S,
          } = e,
          A = c.config.easing,
          { duration: L, delay: b } = c.config;
        d != null && (L = d),
          (b = E ?? b),
          a === RF ? (L = 0) : (i || S) && (L = b = 0);
        let { now: w } = t.payload;
        if (r && n) {
          let T = w - (o + b);
          if (s) {
            let K = w - o,
              Y = L + b,
              re = di(Math.min(Math.max(0, K / Y), 1));
            e = (0, _r.set)(e, "verboseTimeElapsed", Y * re);
          }
          if (T < 0) return e;
          let q = di(Math.min(Math.max(0, T / L), 1)),
            N = Jh(A, q, I),
            P = {},
            G = null;
          return (
            v.length &&
              (G = v.reduce((K, Y) => {
                let re = f[Y],
                  J = parseFloat(n[Y]) || 0,
                  _ = (parseFloat(re) - J) * N + J;
                return (K[Y] = _), K;
              }, {})),
            (P.current = G),
            (P.position = q),
            q === 1 && ((P.active = !1), (P.complete = !0)),
            (0, _r.merge)(e, P)
          );
        }
        return e;
      },
      LF = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case TF:
            return t.payload.ixInstances || Object.freeze({});
          case mF:
            return Object.freeze({});
          case OF: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: o,
                eventId: i,
                eventTarget: a,
                eventStateKey: s,
                actionListId: c,
                groupIndex: f,
                isCarrier: v,
                origin: d,
                destination: E,
                immediate: I,
                verbose: S,
                continuous: A,
                parameterId: L,
                actionGroups: b,
                smoothing: w,
                restingValue: T,
                pluginInstance: q,
                pluginDuration: N,
                instanceDelay: P,
                skipMotion: G,
                skipToValue: K,
              } = t.payload,
              { actionTypeId: Y } = o,
              re = CF(Y),
              J = NF(re, Y),
              M = Object.keys(E).filter((D) => E[D] != null),
              { easing: _ } = o.config;
            return (0, _r.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: d,
              destination: E,
              destinationKeys: M,
              immediate: I,
              verbose: S,
              current: null,
              actionItem: o,
              actionTypeId: Y,
              eventId: i,
              eventTarget: a,
              eventStateKey: s,
              actionListId: c,
              groupIndex: f,
              renderType: re,
              isCarrier: v,
              styleProp: J,
              continuous: A,
              parameterId: L,
              actionGroups: b,
              smoothing: w,
              restingValue: T,
              pluginInstance: q,
              pluginDuration: N,
              instanceDelay: P,
              skipMotion: G,
              skipToValue: K,
              customEasingFn:
                Array.isArray(_) && _.length === 4 ? wF(_) : void 0,
            });
          }
          case SF: {
            let { instanceId: r, time: n } = t.payload;
            return (0, _r.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case AF: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              o = Object.keys(e),
              { length: i } = o;
            for (let a = 0; a < i; a++) {
              let s = o[a];
              s !== r && (n[s] = e[s]);
            }
            return n;
          }
          case bF: {
            let r = e,
              n = Object.keys(e),
              { length: o } = n;
            for (let i = 0; i < o; i++) {
              let a = n[i],
                s = e[a],
                c = s.continuous ? qF : PF;
              r = (0, _r.set)(r, a, c(s, t));
            }
            return r;
          }
          default:
            return e;
        }
      };
    pi.ixInstances = LF;
  });
  var tg = u((vi) => {
    "use strict";
    Object.defineProperty(vi, "__esModule", { value: !0 });
    vi.ixParameters = void 0;
    var xF = Fe(),
      {
        IX2_RAW_DATA_IMPORTED: MF,
        IX2_SESSION_STOPPED: DF,
        IX2_PARAMETER_CHANGED: FF,
      } = xF.IX2EngineActionTypes,
      GF = (e = {}, t) => {
        switch (t.type) {
          case MF:
            return t.payload.ixParameters || {};
          case DF:
            return {};
          case FF: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      };
    vi.ixParameters = GF;
  });
  var rg = u((Ei) => {
    "use strict";
    Object.defineProperty(Ei, "__esModule", { value: !0 });
    Ei.default = void 0;
    var UF = Qo(),
      XF = yf(),
      VF = Gf(),
      WF = Xf(),
      BF = Ut(),
      HF = eg(),
      jF = tg(),
      { ixElements: kF } = BF.IX2ElementsReducer,
      KF = (0, UF.combineReducers)({
        ixData: XF.ixData,
        ixRequest: VF.ixRequest,
        ixSession: WF.ixSession,
        ixElements: kF,
        ixInstances: HF.ixInstances,
        ixParameters: jF.ixParameters,
      });
    Ei.default = KF;
  });
  var ng = u((yk, Jr) => {
    function zF(e, t) {
      if (e == null) return {};
      var r = {},
        n = Object.keys(e),
        o,
        i;
      for (i = 0; i < n.length; i++)
        (o = n[i]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
      return r;
    }
    (Jr.exports = zF),
      (Jr.exports.__esModule = !0),
      (Jr.exports.default = Jr.exports);
  });
  var og = u((Ik, ig) => {
    var YF = mt(),
      $F = we(),
      QF = Et(),
      ZF = "[object String]";
    function JF(e) {
      return typeof e == "string" || (!$F(e) && QF(e) && YF(e) == ZF);
    }
    ig.exports = JF;
  });
  var sg = u((Tk, ag) => {
    var e1 = Ra(),
      t1 = e1("length");
    ag.exports = t1;
  });
  var cg = u((mk, ug) => {
    var r1 = "\\ud800-\\udfff",
      n1 = "\\u0300-\\u036f",
      i1 = "\\ufe20-\\ufe2f",
      o1 = "\\u20d0-\\u20ff",
      a1 = n1 + i1 + o1,
      s1 = "\\ufe0e\\ufe0f",
      u1 = "\\u200d",
      c1 = RegExp("[" + u1 + r1 + a1 + s1 + "]");
    function l1(e) {
      return c1.test(e);
    }
    ug.exports = l1;
  });
  var _g = u((Ok, gg) => {
    var fg = "\\ud800-\\udfff",
      f1 = "\\u0300-\\u036f",
      d1 = "\\ufe20-\\ufe2f",
      p1 = "\\u20d0-\\u20ff",
      v1 = f1 + d1 + p1,
      E1 = "\\ufe0e\\ufe0f",
      h1 = "[" + fg + "]",
      $a = "[" + v1 + "]",
      Qa = "\\ud83c[\\udffb-\\udfff]",
      g1 = "(?:" + $a + "|" + Qa + ")",
      dg = "[^" + fg + "]",
      pg = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      vg = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      _1 = "\\u200d",
      Eg = g1 + "?",
      hg = "[" + E1 + "]?",
      y1 = "(?:" + _1 + "(?:" + [dg, pg, vg].join("|") + ")" + hg + Eg + ")*",
      I1 = hg + Eg + y1,
      T1 = "(?:" + [dg + $a + "?", $a, pg, vg, h1].join("|") + ")",
      lg = RegExp(Qa + "(?=" + Qa + ")|" + T1 + I1, "g");
    function m1(e) {
      for (var t = (lg.lastIndex = 0); lg.test(e); ) ++t;
      return t;
    }
    gg.exports = m1;
  });
  var Ig = u((Sk, yg) => {
    var O1 = sg(),
      S1 = cg(),
      A1 = _g();
    function b1(e) {
      return S1(e) ? A1(e) : O1(e);
    }
    yg.exports = b1;
  });
  var mg = u((Ak, Tg) => {
    var w1 = jn(),
      R1 = kn(),
      C1 = xt(),
      N1 = og(),
      q1 = Ig(),
      P1 = "[object Map]",
      L1 = "[object Set]";
    function x1(e) {
      if (e == null) return 0;
      if (C1(e)) return N1(e) ? q1(e) : e.length;
      var t = R1(e);
      return t == P1 || t == L1 ? e.size : w1(e).length;
    }
    Tg.exports = x1;
  });
  var Sg = u((bk, Og) => {
    var M1 = "Expected a function";
    function D1(e) {
      if (typeof e != "function") throw new TypeError(M1);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Og.exports = D1;
  });
  var Za = u((wk, Ag) => {
    var F1 = Ot(),
      G1 = (function () {
        try {
          var e = F1(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Ag.exports = G1;
  });
  var Ja = u((Rk, wg) => {
    var bg = Za();
    function U1(e, t, r) {
      t == "__proto__" && bg
        ? bg(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    wg.exports = U1;
  });
  var Cg = u((Ck, Rg) => {
    var X1 = Ja(),
      V1 = Mn(),
      W1 = Object.prototype,
      B1 = W1.hasOwnProperty;
    function H1(e, t, r) {
      var n = e[t];
      (!(B1.call(e, t) && V1(n, r)) || (r === void 0 && !(t in e))) &&
        X1(e, t, r);
    }
    Rg.exports = H1;
  });
  var Pg = u((Nk, qg) => {
    var j1 = Cg(),
      k1 = Hr(),
      K1 = Vn(),
      Ng = ct(),
      z1 = sr();
    function Y1(e, t, r, n) {
      if (!Ng(e)) return e;
      t = k1(t, e);
      for (var o = -1, i = t.length, a = i - 1, s = e; s != null && ++o < i; ) {
        var c = z1(t[o]),
          f = r;
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return e;
        if (o != a) {
          var v = s[c];
          (f = n ? n(v, c, s) : void 0),
            f === void 0 && (f = Ng(v) ? v : K1(t[o + 1]) ? [] : {});
        }
        j1(s, c, f), (s = s[c]);
      }
      return e;
    }
    qg.exports = Y1;
  });
  var xg = u((qk, Lg) => {
    var $1 = Yn(),
      Q1 = Pg(),
      Z1 = Hr();
    function J1(e, t, r) {
      for (var n = -1, o = t.length, i = {}; ++n < o; ) {
        var a = t[n],
          s = $1(e, a);
        r(s, a) && Q1(i, Z1(a, e), s);
      }
      return i;
    }
    Lg.exports = J1;
  });
  var Dg = u((Pk, Mg) => {
    var e2 = Un(),
      t2 = Go(),
      r2 = pa(),
      n2 = da(),
      i2 = Object.getOwnPropertySymbols,
      o2 = i2
        ? function (e) {
            for (var t = []; e; ) e2(t, r2(e)), (e = t2(e));
            return t;
          }
        : n2;
    Mg.exports = o2;
  });
  var Gg = u((Lk, Fg) => {
    function a2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    Fg.exports = a2;
  });
  var Xg = u((xk, Ug) => {
    var s2 = ct(),
      u2 = Hn(),
      c2 = Gg(),
      l2 = Object.prototype,
      f2 = l2.hasOwnProperty;
    function d2(e) {
      if (!s2(e)) return c2(e);
      var t = u2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !f2.call(e, n))) || r.push(n);
      return r;
    }
    Ug.exports = d2;
  });
  var Wg = u((Mk, Vg) => {
    var p2 = Ea(),
      v2 = Xg(),
      E2 = xt();
    function h2(e) {
      return E2(e) ? p2(e, !0) : v2(e);
    }
    Vg.exports = h2;
  });
  var Hg = u((Dk, Bg) => {
    var g2 = fa(),
      _2 = Dg(),
      y2 = Wg();
    function I2(e) {
      return g2(e, y2, _2);
    }
    Bg.exports = I2;
  });
  var kg = u((Fk, jg) => {
    var T2 = wa(),
      m2 = St(),
      O2 = xg(),
      S2 = Hg();
    function A2(e, t) {
      if (e == null) return {};
      var r = T2(S2(e), function (n) {
        return [n];
      });
      return (
        (t = m2(t)),
        O2(e, r, function (n, o) {
          return t(n, o[0]);
        })
      );
    }
    jg.exports = A2;
  });
  var zg = u((Gk, Kg) => {
    var b2 = St(),
      w2 = Sg(),
      R2 = kg();
    function C2(e, t) {
      return R2(e, w2(b2(t)));
    }
    Kg.exports = C2;
  });
  var $g = u((Uk, Yg) => {
    var N2 = jn(),
      q2 = kn(),
      P2 = Gr(),
      L2 = we(),
      x2 = xt(),
      M2 = Xn(),
      D2 = Hn(),
      F2 = Bn(),
      G2 = "[object Map]",
      U2 = "[object Set]",
      X2 = Object.prototype,
      V2 = X2.hasOwnProperty;
    function W2(e) {
      if (e == null) return !0;
      if (
        x2(e) &&
        (L2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          M2(e) ||
          F2(e) ||
          P2(e))
      )
        return !e.length;
      var t = q2(e);
      if (t == G2 || t == U2) return !e.size;
      if (D2(e)) return !N2(e).length;
      for (var r in e) if (V2.call(e, r)) return !1;
      return !0;
    }
    Yg.exports = W2;
  });
  var Zg = u((Xk, Qg) => {
    var B2 = Ja(),
      H2 = Ua(),
      j2 = St();
    function k2(e, t) {
      var r = {};
      return (
        (t = j2(t, 3)),
        H2(e, function (n, o, i) {
          B2(r, o, t(n, o, i));
        }),
        r
      );
    }
    Qg.exports = k2;
  });
  var e_ = u((Vk, Jg) => {
    function K2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    Jg.exports = K2;
  });
  var r_ = u((Wk, t_) => {
    var z2 = Qn();
    function Y2(e) {
      return typeof e == "function" ? e : z2;
    }
    t_.exports = Y2;
  });
  var i_ = u((Bk, n_) => {
    var $2 = e_(),
      Q2 = Xa(),
      Z2 = r_(),
      J2 = we();
    function eG(e, t) {
      var r = J2(e) ? $2 : Q2;
      return r(e, Z2(t));
    }
    n_.exports = eG;
  });
  var a_ = u((Hk, o_) => {
    var tG = Qe(),
      rG = function () {
        return tG.Date.now();
      };
    o_.exports = rG;
  });
  var c_ = u((jk, u_) => {
    var nG = ct(),
      es = a_(),
      s_ = Zn(),
      iG = "Expected a function",
      oG = Math.max,
      aG = Math.min;
    function sG(e, t, r) {
      var n,
        o,
        i,
        a,
        s,
        c,
        f = 0,
        v = !1,
        d = !1,
        E = !0;
      if (typeof e != "function") throw new TypeError(iG);
      (t = s_(t) || 0),
        nG(r) &&
          ((v = !!r.leading),
          (d = "maxWait" in r),
          (i = d ? oG(s_(r.maxWait) || 0, t) : i),
          (E = "trailing" in r ? !!r.trailing : E));
      function I(P) {
        var G = n,
          K = o;
        return (n = o = void 0), (f = P), (a = e.apply(K, G)), a;
      }
      function S(P) {
        return (f = P), (s = setTimeout(b, t)), v ? I(P) : a;
      }
      function A(P) {
        var G = P - c,
          K = P - f,
          Y = t - G;
        return d ? aG(Y, i - K) : Y;
      }
      function L(P) {
        var G = P - c,
          K = P - f;
        return c === void 0 || G >= t || G < 0 || (d && K >= i);
      }
      function b() {
        var P = es();
        if (L(P)) return w(P);
        s = setTimeout(b, A(P));
      }
      function w(P) {
        return (s = void 0), E && n ? I(P) : ((n = o = void 0), a);
      }
      function T() {
        s !== void 0 && clearTimeout(s), (f = 0), (n = c = o = s = void 0);
      }
      function q() {
        return s === void 0 ? a : w(es());
      }
      function N() {
        var P = es(),
          G = L(P);
        if (((n = arguments), (o = this), (c = P), G)) {
          if (s === void 0) return S(c);
          if (d) return clearTimeout(s), (s = setTimeout(b, t)), I(c);
        }
        return s === void 0 && (s = setTimeout(b, t)), a;
      }
      return (N.cancel = T), (N.flush = q), N;
    }
    u_.exports = sG;
  });
  var f_ = u((kk, l_) => {
    var uG = c_(),
      cG = ct(),
      lG = "Expected a function";
    function fG(e, t, r) {
      var n = !0,
        o = !0;
      if (typeof e != "function") throw new TypeError(lG);
      return (
        cG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (o = "trailing" in r ? !!r.trailing : o)),
        uG(e, t, { leading: n, maxWait: t, trailing: o })
      );
    }
    l_.exports = fG;
  });
  var hi = u((oe) => {
    "use strict";
    var dG = ze().default;
    Object.defineProperty(oe, "__esModule", { value: !0 });
    oe.viewportWidthChanged =
      oe.testFrameRendered =
      oe.stopRequested =
      oe.sessionStopped =
      oe.sessionStarted =
      oe.sessionInitialized =
      oe.rawDataImported =
      oe.previewRequested =
      oe.playbackRequested =
      oe.parameterChanged =
      oe.mediaQueriesDefined =
      oe.instanceStarted =
      oe.instanceRemoved =
      oe.instanceAdded =
      oe.eventStateChanged =
      oe.eventListenerAdded =
      oe.elementStateChanged =
      oe.clearRequested =
      oe.animationFrameChanged =
      oe.actionListPlaybackChanged =
        void 0;
    var d_ = dG(Zt()),
      p_ = Fe(),
      pG = Ut(),
      {
        IX2_RAW_DATA_IMPORTED: vG,
        IX2_SESSION_INITIALIZED: EG,
        IX2_SESSION_STARTED: hG,
        IX2_SESSION_STOPPED: gG,
        IX2_PREVIEW_REQUESTED: _G,
        IX2_PLAYBACK_REQUESTED: yG,
        IX2_STOP_REQUESTED: IG,
        IX2_CLEAR_REQUESTED: TG,
        IX2_EVENT_LISTENER_ADDED: mG,
        IX2_TEST_FRAME_RENDERED: OG,
        IX2_EVENT_STATE_CHANGED: SG,
        IX2_ANIMATION_FRAME_CHANGED: AG,
        IX2_PARAMETER_CHANGED: bG,
        IX2_INSTANCE_ADDED: wG,
        IX2_INSTANCE_STARTED: RG,
        IX2_INSTANCE_REMOVED: CG,
        IX2_ELEMENT_STATE_CHANGED: NG,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: qG,
        IX2_VIEWPORT_WIDTH_CHANGED: PG,
        IX2_MEDIA_QUERIES_DEFINED: LG,
      } = p_.IX2EngineActionTypes,
      { reifyState: xG } = pG.IX2VanillaUtils,
      MG = (e) => ({ type: vG, payload: (0, d_.default)({}, xG(e)) });
    oe.rawDataImported = MG;
    var DG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
      type: EG,
      payload: { hasBoundaryNodes: e, reducedMotion: t },
    });
    oe.sessionInitialized = DG;
    var FG = () => ({ type: hG });
    oe.sessionStarted = FG;
    var GG = () => ({ type: gG });
    oe.sessionStopped = GG;
    var UG = ({ rawData: e, defer: t }) => ({
      type: _G,
      payload: { defer: t, rawData: e },
    });
    oe.previewRequested = UG;
    var XG = ({
      actionTypeId: e = p_.ActionTypeConsts.GENERAL_START_ACTION,
      actionListId: t,
      actionItemId: r,
      eventId: n,
      allowEvents: o,
      immediate: i,
      testManual: a,
      verbose: s,
      rawData: c,
    }) => ({
      type: yG,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: r,
        testManual: a,
        eventId: n,
        allowEvents: o,
        immediate: i,
        verbose: s,
        rawData: c,
      },
    });
    oe.playbackRequested = XG;
    var VG = (e) => ({ type: IG, payload: { actionListId: e } });
    oe.stopRequested = VG;
    var WG = () => ({ type: TG });
    oe.clearRequested = WG;
    var BG = (e, t) => ({
      type: mG,
      payload: { target: e, listenerParams: t },
    });
    oe.eventListenerAdded = BG;
    var HG = (e = 1) => ({ type: OG, payload: { step: e } });
    oe.testFrameRendered = HG;
    var jG = (e, t) => ({ type: SG, payload: { stateKey: e, newState: t } });
    oe.eventStateChanged = jG;
    var kG = (e, t) => ({ type: AG, payload: { now: e, parameters: t } });
    oe.animationFrameChanged = kG;
    var KG = (e, t) => ({ type: bG, payload: { key: e, value: t } });
    oe.parameterChanged = KG;
    var zG = (e) => ({ type: wG, payload: (0, d_.default)({}, e) });
    oe.instanceAdded = zG;
    var YG = (e, t) => ({ type: RG, payload: { instanceId: e, time: t } });
    oe.instanceStarted = YG;
    var $G = (e) => ({ type: CG, payload: { instanceId: e } });
    oe.instanceRemoved = $G;
    var QG = (e, t, r, n) => ({
      type: NG,
      payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
    });
    oe.elementStateChanged = QG;
    var ZG = ({ actionListId: e, isPlaying: t }) => ({
      type: qG,
      payload: { actionListId: e, isPlaying: t },
    });
    oe.actionListPlaybackChanged = ZG;
    var JG = ({ width: e, mediaQueries: t }) => ({
      type: PG,
      payload: { width: e, mediaQueries: t },
    });
    oe.viewportWidthChanged = JG;
    var eU = () => ({ type: LG });
    oe.mediaQueriesDefined = eU;
  });
  var h_ = u((Ne) => {
    "use strict";
    Object.defineProperty(Ne, "__esModule", { value: !0 });
    Ne.elementContains = dU;
    Ne.getChildElements = vU;
    Ne.getClosestElement = void 0;
    Ne.getProperty = sU;
    Ne.getQuerySelector = cU;
    Ne.getRefType = gU;
    Ne.getSiblingElements = EU;
    Ne.getStyle = aU;
    Ne.getValidDocument = lU;
    Ne.isSiblingNode = pU;
    Ne.matchSelector = uU;
    Ne.queryDocument = fU;
    Ne.setStyle = oU;
    var tU = Ut(),
      rU = Fe(),
      { ELEMENT_MATCHES: ts } = tU.IX2BrowserSupport,
      {
        IX2_ID_DELIMITER: v_,
        HTML_ELEMENT: nU,
        PLAIN_OBJECT: iU,
        WF_PAGE: E_,
      } = rU.IX2EngineConstants;
    function oU(e, t, r) {
      e.style[t] = r;
    }
    function aU(e, t) {
      return e.style[t];
    }
    function sU(e, t) {
      return e[t];
    }
    function uU(e) {
      return (t) => t[ts](e);
    }
    function cU({ id: e, selector: t }) {
      if (e) {
        let r = e;
        if (e.indexOf(v_) !== -1) {
          let n = e.split(v_),
            o = n[0];
          if (((r = n[1]), o !== document.documentElement.getAttribute(E_)))
            return null;
        }
        return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
      }
      return t;
    }
    function lU(e) {
      return e == null || e === document.documentElement.getAttribute(E_)
        ? document
        : null;
    }
    function fU(e, t) {
      return Array.prototype.slice.call(
        document.querySelectorAll(t ? e + " " + t : e)
      );
    }
    function dU(e, t) {
      return e.contains(t);
    }
    function pU(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function vU(e) {
      let t = [];
      for (let r = 0, { length: n } = e || []; r < n; r++) {
        let { children: o } = e[r],
          { length: i } = o;
        if (i) for (let a = 0; a < i; a++) t.push(o[a]);
      }
      return t;
    }
    function EU(e = []) {
      let t = [],
        r = [];
      for (let n = 0, { length: o } = e; n < o; n++) {
        let { parentNode: i } = e[n];
        if (!i || !i.children || !i.children.length || r.indexOf(i) !== -1)
          continue;
        r.push(i);
        let a = i.firstElementChild;
        for (; a != null; )
          e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
      }
      return t;
    }
    var hU = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[ts] && r[ts](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
    Ne.getClosestElement = hU;
    function gU(e) {
      return e != null && typeof e == "object"
        ? e instanceof Element
          ? nU
          : iU
        : null;
    }
  });
  var rs = u((Yk, __) => {
    var _U = ct(),
      g_ = Object.create,
      yU = (function () {
        function e() {}
        return function (t) {
          if (!_U(t)) return {};
          if (g_) return g_(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    __.exports = yU;
  });
  var gi = u(($k, y_) => {
    function IU() {}
    y_.exports = IU;
  });
  var yi = u((Qk, I_) => {
    var TU = rs(),
      mU = gi();
    function _i(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    _i.prototype = TU(mU.prototype);
    _i.prototype.constructor = _i;
    I_.exports = _i;
  });
  var S_ = u((Zk, O_) => {
    var T_ = zt(),
      OU = Gr(),
      SU = we(),
      m_ = T_ ? T_.isConcatSpreadable : void 0;
    function AU(e) {
      return SU(e) || OU(e) || !!(m_ && e && e[m_]);
    }
    O_.exports = AU;
  });
  var w_ = u((Jk, b_) => {
    var bU = Un(),
      wU = S_();
    function A_(e, t, r, n, o) {
      var i = -1,
        a = e.length;
      for (r || (r = wU), o || (o = []); ++i < a; ) {
        var s = e[i];
        t > 0 && r(s)
          ? t > 1
            ? A_(s, t - 1, r, n, o)
            : bU(o, s)
          : n || (o[o.length] = s);
      }
      return o;
    }
    b_.exports = A_;
  });
  var C_ = u((eK, R_) => {
    var RU = w_();
    function CU(e) {
      var t = e == null ? 0 : e.length;
      return t ? RU(e, 1) : [];
    }
    R_.exports = CU;
  });
  var q_ = u((tK, N_) => {
    function NU(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    N_.exports = NU;
  });
  var x_ = u((rK, L_) => {
    var qU = q_(),
      P_ = Math.max;
    function PU(e, t, r) {
      return (
        (t = P_(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, o = -1, i = P_(n.length - t, 0), a = Array(i);
            ++o < i;

          )
            a[o] = n[t + o];
          o = -1;
          for (var s = Array(t + 1); ++o < t; ) s[o] = n[o];
          return (s[t] = r(a)), qU(e, this, s);
        }
      );
    }
    L_.exports = PU;
  });
  var D_ = u((nK, M_) => {
    function LU(e) {
      return function () {
        return e;
      };
    }
    M_.exports = LU;
  });
  var U_ = u((iK, G_) => {
    var xU = D_(),
      F_ = Za(),
      MU = Qn(),
      DU = F_
        ? function (e, t) {
            return F_(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: xU(t),
              writable: !0,
            });
          }
        : MU;
    G_.exports = DU;
  });
  var V_ = u((oK, X_) => {
    var FU = 800,
      GU = 16,
      UU = Date.now;
    function XU(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = UU(),
          o = GU - (n - r);
        if (((r = n), o > 0)) {
          if (++t >= FU) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    X_.exports = XU;
  });
  var B_ = u((aK, W_) => {
    var VU = U_(),
      WU = V_(),
      BU = WU(VU);
    W_.exports = BU;
  });
  var j_ = u((sK, H_) => {
    var HU = C_(),
      jU = x_(),
      kU = B_();
    function KU(e) {
      return kU(jU(e, void 0, HU), e + "");
    }
    H_.exports = KU;
  });
  var z_ = u((uK, K_) => {
    var k_ = ha(),
      zU = k_ && new k_();
    K_.exports = zU;
  });
  var $_ = u((cK, Y_) => {
    function YU() {}
    Y_.exports = YU;
  });
  var ns = u((lK, Z_) => {
    var Q_ = z_(),
      $U = $_(),
      QU = Q_
        ? function (e) {
            return Q_.get(e);
          }
        : $U;
    Z_.exports = QU;
  });
  var ey = u((fK, J_) => {
    var ZU = {};
    J_.exports = ZU;
  });
  var is = u((dK, ry) => {
    var ty = ey(),
      JU = Object.prototype,
      eX = JU.hasOwnProperty;
    function tX(e) {
      for (
        var t = e.name + "", r = ty[t], n = eX.call(ty, t) ? r.length : 0;
        n--;

      ) {
        var o = r[n],
          i = o.func;
        if (i == null || i == e) return o.name;
      }
      return t;
    }
    ry.exports = tX;
  });
  var Ti = u((pK, ny) => {
    var rX = rs(),
      nX = gi(),
      iX = 4294967295;
    function Ii(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = iX),
        (this.__views__ = []);
    }
    Ii.prototype = rX(nX.prototype);
    Ii.prototype.constructor = Ii;
    ny.exports = Ii;
  });
  var oy = u((vK, iy) => {
    function oX(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    iy.exports = oX;
  });
  var sy = u((EK, ay) => {
    var aX = Ti(),
      sX = yi(),
      uX = oy();
    function cX(e) {
      if (e instanceof aX) return e.clone();
      var t = new sX(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = uX(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    ay.exports = cX;
  });
  var ly = u((hK, cy) => {
    var lX = Ti(),
      uy = yi(),
      fX = gi(),
      dX = we(),
      pX = Et(),
      vX = sy(),
      EX = Object.prototype,
      hX = EX.hasOwnProperty;
    function mi(e) {
      if (pX(e) && !dX(e) && !(e instanceof lX)) {
        if (e instanceof uy) return e;
        if (hX.call(e, "__wrapped__")) return vX(e);
      }
      return new uy(e);
    }
    mi.prototype = fX.prototype;
    mi.prototype.constructor = mi;
    cy.exports = mi;
  });
  var dy = u((gK, fy) => {
    var gX = Ti(),
      _X = ns(),
      yX = is(),
      IX = ly();
    function TX(e) {
      var t = yX(e),
        r = IX[t];
      if (typeof r != "function" || !(t in gX.prototype)) return !1;
      if (e === r) return !0;
      var n = _X(r);
      return !!n && e === n[0];
    }
    fy.exports = TX;
  });
  var hy = u((_K, Ey) => {
    var py = yi(),
      mX = j_(),
      OX = ns(),
      os = is(),
      SX = we(),
      vy = dy(),
      AX = "Expected a function",
      bX = 8,
      wX = 32,
      RX = 128,
      CX = 256;
    function NX(e) {
      return mX(function (t) {
        var r = t.length,
          n = r,
          o = py.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var i = t[n];
          if (typeof i != "function") throw new TypeError(AX);
          if (o && !a && os(i) == "wrapper") var a = new py([], !0);
        }
        for (n = a ? n : r; ++n < r; ) {
          i = t[n];
          var s = os(i),
            c = s == "wrapper" ? OX(i) : void 0;
          c &&
          vy(c[0]) &&
          c[1] == (RX | bX | wX | CX) &&
          !c[4].length &&
          c[9] == 1
            ? (a = a[os(c[0])].apply(a, c[3]))
            : (a = i.length == 1 && vy(i) ? a[s]() : a.thru(i));
        }
        return function () {
          var f = arguments,
            v = f[0];
          if (a && f.length == 1 && SX(v)) return a.plant(v).value();
          for (var d = 0, E = r ? t[d].apply(this, f) : v; ++d < r; )
            E = t[d].call(this, E);
          return E;
        };
      });
    }
    Ey.exports = NX;
  });
  var _y = u((yK, gy) => {
    var qX = hy(),
      PX = qX();
    gy.exports = PX;
  });
  var Iy = u((IK, yy) => {
    function LX(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    yy.exports = LX;
  });
  var my = u((TK, Ty) => {
    var xX = Iy(),
      as = Zn();
    function MX(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = as(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = as(t)), (t = t === t ? t : 0)),
        xX(as(e), t, r)
      );
    }
    Ty.exports = MX;
  });
  var Xy = u((wi) => {
    "use strict";
    var bi = ze().default;
    Object.defineProperty(wi, "__esModule", { value: !0 });
    wi.default = void 0;
    var Ve = bi(Zt()),
      DX = bi(_y()),
      FX = bi($n()),
      GX = bi(my()),
      Xt = Fe(),
      ss = fs(),
      Oi = hi(),
      UX = Ut(),
      {
        MOUSE_CLICK: XX,
        MOUSE_SECOND_CLICK: VX,
        MOUSE_DOWN: WX,
        MOUSE_UP: BX,
        MOUSE_OVER: HX,
        MOUSE_OUT: jX,
        DROPDOWN_CLOSE: kX,
        DROPDOWN_OPEN: KX,
        SLIDER_ACTIVE: zX,
        SLIDER_INACTIVE: YX,
        TAB_ACTIVE: $X,
        TAB_INACTIVE: QX,
        NAVBAR_CLOSE: ZX,
        NAVBAR_OPEN: JX,
        MOUSE_MOVE: eV,
        PAGE_SCROLL_DOWN: qy,
        SCROLL_INTO_VIEW: Py,
        SCROLL_OUT_OF_VIEW: tV,
        PAGE_SCROLL_UP: rV,
        SCROLLING_IN_VIEW: nV,
        PAGE_FINISH: Ly,
        ECOMMERCE_CART_CLOSE: iV,
        ECOMMERCE_CART_OPEN: oV,
        PAGE_START: xy,
        PAGE_SCROLL: aV,
      } = Xt.EventTypeConsts,
      us = "COMPONENT_ACTIVE",
      My = "COMPONENT_INACTIVE",
      { COLON_DELIMITER: Oy } = Xt.IX2EngineConstants,
      { getNamespacedParameterId: Sy } = UX.IX2VanillaUtils,
      Dy = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
      tn = Dy(({ element: e, nativeEvent: t }) => e === t.target),
      sV = Dy(({ element: e, nativeEvent: t }) => e.contains(t.target)),
      pt = (0, DX.default)([tn, sV]),
      Fy = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            o = n[t];
          if (o && !cV[o.eventTypeId]) return o;
        }
        return null;
      },
      uV = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!Fy(e, n);
      },
      Ue = ({ store: e, event: t, element: r, eventStateKey: n }, o) => {
        let { action: i, id: a } = t,
          { actionListId: s, autoStopEventId: c } = i.config,
          f = Fy(e, c);
        return (
          f &&
            (0, ss.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: r,
              eventStateKey: c + Oy + n.split(Oy)[1],
              actionListId: (0, FX.default)(f, "action.config.actionListId"),
            }),
          (0, ss.stopActionGroup)({
            store: e,
            eventId: a,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          (0, ss.startActionGroup)({
            store: e,
            eventId: a,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          o
        );
      },
      Ze = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
      rn = { handler: Ze(pt, Ue) },
      Gy = (0, Ve.default)({}, rn, { types: [us, My].join(" ") }),
      cs = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ],
      Ay = "mouseover mouseout",
      ls = { types: cs },
      cV = { PAGE_START: xy, PAGE_FINISH: Ly },
      en = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, GX.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })(),
      lV = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        ),
      fV = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: o } = t,
          i = e.contains(n);
        if (r === "mouseover" && i) return !0;
        let a = e.contains(o);
        return !!(r === "mouseout" && i && a);
      },
      dV = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: o } = en(),
          i = r.scrollOffsetValue,
          c = r.scrollOffsetUnit === "PX" ? i : (o * (i || 0)) / 100;
        return lV(t.getBoundingClientRect(), {
          left: 0,
          top: c,
          right: n,
          bottom: o - c,
        });
      },
      Uy = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          o = [us, My].indexOf(n) !== -1 ? n === us : r.isActive,
          i = (0, Ve.default)({}, r, { isActive: o });
        return ((!r || i.isActive !== r.isActive) && e(t, i)) || i;
      },
      by = (e) => (t, r) => {
        let n = { elementHovered: fV(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      },
      pV = (e) => (t, r) => {
        let n = (0, Ve.default)({}, r, { elementVisible: dV(t) });
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      },
      wy =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: o, innerHeight: i } = en(),
            {
              event: { config: a, eventTypeId: s },
            } = t,
            { scrollOffsetValue: c, scrollOffsetUnit: f } = a,
            v = f === "PX",
            d = o - i,
            E = Number((n / d).toFixed(2));
          if (r && r.percentTop === E) return r;
          let I = (v ? c : (i * (c || 0)) / 100) / d,
            S,
            A,
            L = 0;
          r &&
            ((S = E > r.percentTop),
            (A = r.scrollingDown !== S),
            (L = A ? E : r.anchorTop));
          let b = s === qy ? E >= L + I : E <= L - I,
            w = (0, Ve.default)({}, r, {
              percentTop: E,
              inBounds: b,
              anchorTop: L,
              scrollingDown: S,
            });
          return (r && b && (A || w.inBounds !== r.inBounds) && e(t, w)) || w;
        },
      vV = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom,
      EV = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      },
      hV = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      },
      Ry =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        },
      Si = (e = !0) =>
        (0, Ve.default)({}, Gy, {
          handler: Ze(
            e ? pt : tn,
            Uy((t, r) => (r.isActive ? rn.handler(t, r) : r))
          ),
        }),
      Ai = (e = !0) =>
        (0, Ve.default)({}, Gy, {
          handler: Ze(
            e ? pt : tn,
            Uy((t, r) => (r.isActive ? r : rn.handler(t, r)))
          ),
        }),
      Cy = (0, Ve.default)({}, ls, {
        handler: pV((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: o } = e,
            { ixData: i } = o.getState(),
            { events: a } = i;
          return !a[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === Py) === r
            ? (Ue(e), (0, Ve.default)({}, t, { triggered: !0 }))
            : t;
        }),
      }),
      Ny = 0.05,
      gV = {
				   
				   
				   
				   
					 
					 
				   
        [zX]: Si(),
        [YX]: Ai(),
        [KX]: Si(),
        [kX]: Ai(),
        [JX]: Si(!1),
        [ZX]: Ai(!1),
        [$X]: Si(),
        [QX]: Ai(),
        [oV]: { types: "ecommerce-cart-open", handler: Ze(pt, Ue) },
        [iV]: { types: "ecommerce-cart-close", handler: Ze(pt, Ue) },
        [XX]: {
          types: "click",
          handler: Ze(
            pt,
            Ry((e, { clickCount: t }) => {
              uV(e) ? t === 1 && Ue(e) : Ue(e);
            })
          ),
        },
        [VX]: {
          types: "click",
          handler: Ze(
            pt,
            Ry((e, { clickCount: t }) => {
              t === 2 && Ue(e);
            })
          ),
        },
        [WX]: (0, Ve.default)({}, rn, { types: "mousedown" }),
        [BX]: (0, Ve.default)({}, rn, { types: "mouseup" }),
        [HX]: {
          types: Ay,
          handler: Ze(
            pt,
            by((e, t) => {
              t.elementHovered && Ue(e);
            })
          ),
        },
        [jX]: {
          types: Ay,
          handler: Ze(
            pt,
            by((e, t) => {
              t.elementHovered || Ue(e);
            })
          ),
        },
        [eV]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: o,
            },
            i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: a,
                selectedAxis: s,
                continuousParameterGroupId: c,
                reverse: f,
                restingState: v = 0,
              } = r,
              {
                clientX: d = i.clientX,
                clientY: E = i.clientY,
                pageX: I = i.pageX,
                pageY: S = i.pageY,
              } = n,
              A = s === "X_AXIS",
              L = n.type === "mouseout",
              b = v / 100,
              w = c,
              T = !1;
            switch (a) {
              case Xt.EventBasedOn.VIEWPORT: {
                b = A
                  ? Math.min(d, window.innerWidth) / window.innerWidth
                  : Math.min(E, window.innerHeight) / window.innerHeight;
                break;
              }
              case Xt.EventBasedOn.PAGE: {
                let {
                  scrollLeft: q,
                  scrollTop: N,
                  scrollWidth: P,
                  scrollHeight: G,
                } = en();
                b = A ? Math.min(q + I, P) / P : Math.min(N + S, G) / G;
                break;
              }
              case Xt.EventBasedOn.ELEMENT:
              default: {
                w = Sy(o, c);
                let q = n.type.indexOf("mouse") === 0;
                if (q && pt({ element: t, nativeEvent: n }) !== !0) break;
                let N = t.getBoundingClientRect(),
                  { left: P, top: G, width: K, height: Y } = N;
                if (!q && !vV({ left: d, top: E }, N)) break;
                (T = !0), (b = A ? (d - P) / K : (E - G) / Y);
                break;
              }
            }
            return (
              L && (b > 1 - Ny || b < Ny) && (b = Math.round(b)),
              (a !== Xt.EventBasedOn.ELEMENT || T || T !== i.elementHovered) &&
                ((b = f ? 1 - b : b),
                e.dispatch((0, Oi.parameterChanged)(w, b))),
              { elementHovered: T, clientX: d, clientY: E, pageX: I, pageY: S }
            );
          },
        },
        [aV]: {
          types: cs,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: o, scrollHeight: i, clientHeight: a } = en(),
              s = o / (i - a);
            (s = n ? 1 - s : s), e.dispatch((0, Oi.parameterChanged)(r, s));
          },
        },
        [nV]: {
          types: cs,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            o = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: i,
                scrollTop: a,
                scrollWidth: s,
                scrollHeight: c,
                clientHeight: f,
              } = en(),
              {
                basedOn: v,
                selectedAxis: d,
                continuousParameterGroupId: E,
                startsEntering: I,
                startsExiting: S,
                addEndOffset: A,
                addStartOffset: L,
                addOffsetValue: b = 0,
                endOffsetValue: w = 0,
              } = r,
              T = d === "X_AXIS";
            if (v === Xt.EventBasedOn.VIEWPORT) {
              let q = T ? i / s : a / c;
              return (
                q !== o.scrollPercent &&
                  t.dispatch((0, Oi.parameterChanged)(E, q)),
                { scrollPercent: q }
              );
            } else {
              let q = Sy(n, E),
                N = e.getBoundingClientRect(),
                P = (L ? b : 0) / 100,
                G = (A ? w : 0) / 100;
              (P = I ? P : 1 - P), (G = S ? G : 1 - G);
              let K = N.top + Math.min(N.height * P, f),
                re = N.top + N.height * G - K,
                J = Math.min(f + re, c),
                _ = Math.min(Math.max(0, f - K), J) / J;
              return (
                _ !== o.scrollPercent &&
                  t.dispatch((0, Oi.parameterChanged)(q, _)),
                { scrollPercent: _ }
              );
            }
          },
        },
        [Py]: Cy,
        [tV]: Cy,
        [qy]: (0, Ve.default)({}, ls, {
          handler: wy((e, t) => {
            t.scrollingDown && Ue(e);
          }),
        }),
        [rV]: (0, Ve.default)({}, ls, {
          handler: wy((e, t) => {
            t.scrollingDown || Ue(e);
          }),
        }),
        [Ly]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Ze(tn, EV(Ue)),
        },
        [xy]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Ze(tn, hV(Ue)),
        },
      };
    wi.default = gV;
  });
  var fs = u((Rt) => {
    "use strict";
    var et = ze().default,
      _V = Nt().default;
    Object.defineProperty(Rt, "__esModule", { value: !0 });
    Rt.observeRequests = zV;
    Rt.startActionGroup = gs;
    Rt.startEngine = Pi;
    Rt.stopActionGroup = hs;
    Rt.stopAllActionGroups = Yy;
    Rt.stopEngine = Li;
    var yV = et(Zt()),
      IV = et(ng()),
      TV = et(Pa()),
      wt = et($n()),
      mV = et(mg()),
      OV = et(zg()),
      SV = et($g()),
      AV = et(Zg()),
      nn = et(i_()),
      bV = et(f_()),
      Je = Fe(),
      By = Ut(),
      ye = hi(),
      Oe = _V(h_()),
      wV = et(Xy()),
      RV = ["store", "computedStyle"],
      CV = Object.keys(Je.QuickEffectIds),
      ds = (e) => CV.includes(e),
      {
        COLON_DELIMITER: ps,
        BOUNDARY_SELECTOR: Ri,
        HTML_ELEMENT: Hy,
        RENDER_GENERAL: NV,
        W_MOD_IX: Vy,
      } = Je.IX2EngineConstants,
      {
        getAffectedElements: Ci,
        getElementId: qV,
        getDestinationValues: vs,
        observeStore: Vt,
        getInstanceId: PV,
        renderHTMLElement: LV,
        clearAllStyles: jy,
        getMaxDurationItemIndex: xV,
        getComputedStyle: MV,
        getInstanceOrigin: DV,
        reduceListToGroup: FV,
        shouldNamespaceEventParameter: GV,
        getNamespacedParameterId: UV,
        shouldAllowMediaQuery: Ni,
        cleanupHTMLElement: XV,
        clearObjectCache: VV,
        stringifyTarget: WV,
        mediaQueriesEqual: BV,
        shallowEqual: HV,
      } = By.IX2VanillaUtils,
      {
        isPluginType: qi,
        createPluginInstance: Es,
        getPluginDuration: jV,
      } = By.IX2VanillaPlugins,
      Wy = navigator.userAgent,
      kV = Wy.match(/iPad/i) || Wy.match(/iPhone/),
      KV = 12;
    function zV(e) {
      Vt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: QV }),
        Vt({
          store: e,
          select: ({ ixRequest: t }) => t.playback,
          onChange: ZV,
        }),
        Vt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: JV }),
        Vt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: eW });
    }
    function YV(e) {
      Vt({
        store: e,
        select: ({ ixSession: t }) => t.mediaQueryKey,
        onChange: () => {
          Li(e),
            jy({ store: e, elementApi: Oe }),
            Pi({ store: e, allowEvents: !0 }),
            ky();
        },
      });
    }
    function $V(e, t) {
      let r = Vt({
        store: e,
        select: ({ ixSession: n }) => n.tick,
        onChange: (n) => {
          t(n), r();
        },
      });
    }
    function QV({ rawData: e, defer: t }, r) {
      let n = () => {
        Pi({ store: r, rawData: e, allowEvents: !0 }), ky();
      };
      t ? setTimeout(n, 0) : n();
    }
    function ky() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function ZV(e, t) {
      let {
          actionTypeId: r,
          actionListId: n,
          actionItemId: o,
          eventId: i,
          allowEvents: a,
          immediate: s,
          testManual: c,
          verbose: f = !0,
        } = e,
        { rawData: v } = e;
      if (n && o && v && s) {
        let d = v.actionLists[n];
        d && (v = FV({ actionList: d, actionItemId: o, rawData: v }));
      }
      if (
        (Pi({ store: t, rawData: v, allowEvents: a, testManual: c }),
        (n && r === Je.ActionTypeConsts.GENERAL_START_ACTION) || ds(r))
      ) {
        hs({ store: t, actionListId: n }),
          zy({ store: t, actionListId: n, eventId: i });
        let d = gs({
          store: t,
          eventId: i,
          actionListId: n,
          immediate: s,
          verbose: f,
        });
        f &&
          d &&
          t.dispatch(
            (0, ye.actionListPlaybackChanged)({
              actionListId: n,
              isPlaying: !s,
            })
          );
      }
    }
    function JV({ actionListId: e }, t) {
      e ? hs({ store: t, actionListId: e }) : Yy({ store: t }), Li(t);
    }
    function eW(e, t) {
      Li(t), jy({ store: t, elementApi: Oe });
    }
    function Pi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
      let { ixSession: o } = e.getState();
      t && e.dispatch((0, ye.rawDataImported)(t)),
        o.active ||
          (e.dispatch(
            (0, ye.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(Ri),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          r &&
            (aW(e),
            tW(),
            e.getState().ixSession.hasDefinedMediaQueries && YV(e)),
          e.dispatch((0, ye.sessionStarted)()),
          rW(e, n));
    }
    function tW() {
      let { documentElement: e } = document;
      e.className.indexOf(Vy) === -1 && (e.className += ` ${Vy}`);
    }
    function rW(e, t) {
      let r = (n) => {
        let { ixSession: o, ixParameters: i } = e.getState();
        o.active &&
          (e.dispatch((0, ye.animationFrameChanged)(n, i)),
          t ? $V(e, r) : requestAnimationFrame(r));
      };
      r(window.performance.now());
    }
    function Li(e) {
      let { ixSession: t } = e.getState();
      if (t.active) {
        let { eventListeners: r } = t;
        r.forEach(nW), VV(), e.dispatch((0, ye.sessionStopped)());
      }
    }
    function nW({ target: e, listenerParams: t }) {
      e.removeEventListener.apply(e, t);
    }
    function iW({
      store: e,
      eventStateKey: t,
      eventTarget: r,
      eventId: n,
      eventConfig: o,
      actionListId: i,
      parameterGroup: a,
      smoothing: s,
      restingValue: c,
    }) {
      let { ixData: f, ixSession: v } = e.getState(),
        { events: d } = f,
        E = d[n],
        { eventTypeId: I } = E,
        S = {},
        A = {},
        L = [],
        { continuousActionGroups: b } = a,
        { id: w } = a;
      GV(I, o) && (w = UV(t, w));
      let T = v.hasBoundaryNodes && r ? Oe.getClosestElement(r, Ri) : null;
      b.forEach((q) => {
        let { keyframe: N, actionItems: P } = q;
        P.forEach((G) => {
          let { actionTypeId: K } = G,
            { target: Y } = G.config;
          if (!Y) return;
          let re = Y.boundaryMode ? T : null,
            J = WV(Y) + ps + K;
          if (((A[J] = oW(A[J], N, G)), !S[J])) {
            S[J] = !0;
            let { config: M } = G;
            Ci({
              config: M,
              event: E,
              eventTarget: r,
              elementRoot: re,
              elementApi: Oe,
            }).forEach((_) => {
              L.push({ element: _, key: J });
            });
          }
        });
      }),
        L.forEach(({ element: q, key: N }) => {
          let P = A[N],
            G = (0, wt.default)(P, "[0].actionItems[0]", {}),
            { actionTypeId: K } = G,
            Y = qi(K) ? Es(K)(q, G) : null,
            re = vs({ element: q, actionItem: G, elementApi: Oe }, Y);
          _s({
            store: e,
            element: q,
            eventId: n,
            actionListId: i,
            actionItem: G,
            destination: re,
            continuous: !0,
            parameterId: w,
            actionGroups: P,
            smoothing: s,
            restingValue: c,
            pluginInstance: Y,
          });
        });
    }
    function oW(e = [], t, r) {
      let n = [...e],
        o;
      return (
        n.some((i, a) => (i.keyframe === t ? ((o = a), !0) : !1)),
        o == null && ((o = n.length), n.push({ keyframe: t, actionItems: [] })),
        n[o].actionItems.push(r),
        n
      );
    }
    function aW(e) {
      let { ixData: t } = e.getState(),
        { eventTypeMap: r } = t;
      Ky(e),
        (0, nn.default)(r, (o, i) => {
          let a = wV.default[i];
          if (!a) {
            console.warn(`IX2 event type not configured: ${i}`);
            return;
          }
          dW({ logic: a, store: e, events: o });
        });
      let { ixSession: n } = e.getState();
      n.eventListeners.length && uW(e);
    }
    var sW = ["resize", "orientationchange"];
    function uW(e) {
      let t = () => {
        Ky(e);
      };
      sW.forEach((r) => {
        window.addEventListener(r, t),
          e.dispatch((0, ye.eventListenerAdded)(window, [r, t]));
      }),
        t();
    }
    function Ky(e) {
      let { ixSession: t, ixData: r } = e.getState(),
        n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let { mediaQueries: o } = r;
        e.dispatch((0, ye.viewportWidthChanged)({ width: n, mediaQueries: o }));
      }
    }
    var cW = (e, t) => (0, OV.default)((0, AV.default)(e, t), SV.default),
      lW = (e, t) => {
        (0, nn.default)(e, (r, n) => {
          r.forEach((o, i) => {
            let a = n + ps + i;
            t(o, n, a);
          });
        });
      },
      fW = (e) => {
        let t = { target: e.target, targets: e.targets };
        return Ci({ config: t, elementApi: Oe });
      };
    function dW({ logic: e, store: t, events: r }) {
      pW(r);
      let { types: n, handler: o } = e,
        { ixData: i } = t.getState(),
        { actionLists: a } = i,
        s = cW(r, fW);
      if (!(0, mV.default)(s)) return;
      (0, nn.default)(s, (d, E) => {
        let I = r[E],
          { action: S, id: A, mediaQueries: L = i.mediaQueryKeys } = I,
          { actionListId: b } = S.config;
        BV(L, i.mediaQueryKeys) || t.dispatch((0, ye.mediaQueriesDefined)()),
          S.actionTypeId === Je.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
            (Array.isArray(I.config) ? I.config : [I.config]).forEach((T) => {
              let { continuousParameterGroupId: q } = T,
                N = (0, wt.default)(a, `${b}.continuousParameterGroups`, []),
                P = (0, TV.default)(N, ({ id: Y }) => Y === q),
                G = (T.smoothing || 0) / 100,
                K = (T.restingState || 0) / 100;
              P &&
                d.forEach((Y, re) => {
                  let J = A + ps + re;
                  iW({
                    store: t,
                    eventStateKey: J,
                    eventTarget: Y,
                    eventId: A,
                    eventConfig: T,
                    actionListId: b,
                    parameterGroup: P,
                    smoothing: G,
                    restingValue: K,
                  });
                });
            }),
          (S.actionTypeId === Je.ActionTypeConsts.GENERAL_START_ACTION ||
            ds(S.actionTypeId)) &&
            zy({ store: t, actionListId: b, eventId: A });
      });
      let c = (d) => {
          let { ixSession: E } = t.getState();
          lW(s, (I, S, A) => {
            let L = r[S],
              b = E.eventState[A],
              { action: w, mediaQueries: T = i.mediaQueryKeys } = L;
            if (!Ni(T, E.mediaQueryKey)) return;
            let q = (N = {}) => {
              let P = o(
                {
                  store: t,
                  element: I,
                  event: L,
                  eventConfig: N,
                  nativeEvent: d,
                  eventStateKey: A,
                },
                b
              );
              HV(P, b) || t.dispatch((0, ye.eventStateChanged)(A, P));
            };
            w.actionTypeId === Je.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
              ? (Array.isArray(L.config) ? L.config : [L.config]).forEach(q)
              : q();
          });
        },
        f = (0, bV.default)(c, KV),
        v = ({ target: d = document, types: E, throttle: I }) => {
          E.split(" ")
            .filter(Boolean)
            .forEach((S) => {
              let A = I ? f : c;
              d.addEventListener(S, A),
                t.dispatch((0, ye.eventListenerAdded)(d, [S, A]));
            });
        };
      Array.isArray(n) ? n.forEach(v) : typeof n == "string" && v(e);
    }
    function pW(e) {
      if (!kV) return;
      let t = {},
        r = "";
      for (let n in e) {
        let { eventTypeId: o, target: i } = e[n],
          a = Oe.getQuerySelector(i);
        t[a] ||
          ((o === Je.EventTypeConsts.MOUSE_CLICK ||
            o === Je.EventTypeConsts.MOUSE_SECOND_CLICK) &&
            ((t[a] = !0),
            (r += a + "{cursor: pointer;touch-action: manipulation;}")));
      }
      if (r) {
        let n = document.createElement("style");
        (n.textContent = r), document.body.appendChild(n);
      }
    }
    function zy({ store: e, actionListId: t, eventId: r }) {
      let { ixData: n, ixSession: o } = e.getState(),
        { actionLists: i, events: a } = n,
        s = a[r],
        c = i[t];
      if (c && c.useFirstGroupAsInitialState) {
        let f = (0, wt.default)(c, "actionItemGroups[0].actionItems", []),
          v = (0, wt.default)(s, "mediaQueries", n.mediaQueryKeys);
        if (!Ni(v, o.mediaQueryKey)) return;
        f.forEach((d) => {
          var E;
          let { config: I, actionTypeId: S } = d,
            A =
              (I == null || (E = I.target) === null || E === void 0
                ? void 0
                : E.useEventTarget) === !0
                ? { target: s.target, targets: s.targets }
                : I,
            L = Ci({ config: A, event: s, elementApi: Oe }),
            b = qi(S);
          L.forEach((w) => {
            let T = b ? Es(S)(w, d) : null;
            _s({
              destination: vs({ element: w, actionItem: d, elementApi: Oe }, T),
              immediate: !0,
              store: e,
              element: w,
              eventId: r,
              actionItem: d,
              actionListId: t,
              pluginInstance: T,
            });
          });
        });
      }
    }
    function Yy({ store: e }) {
      let { ixInstances: t } = e.getState();
      (0, nn.default)(t, (r) => {
        if (!r.continuous) {
          let { actionListId: n, verbose: o } = r;
          ys(r, e),
            o &&
              e.dispatch(
                (0, ye.actionListPlaybackChanged)({
                  actionListId: n,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function hs({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: o,
    }) {
      let { ixInstances: i, ixSession: a } = e.getState(),
        s = a.hasBoundaryNodes && r ? Oe.getClosestElement(r, Ri) : null;
      (0, nn.default)(i, (c) => {
        let f = (0, wt.default)(c, "actionItem.config.target.boundaryMode"),
          v = n ? c.eventStateKey === n : !0;
        if (c.actionListId === o && c.eventId === t && v) {
          if (s && f && !Oe.elementContains(s, c.element)) return;
          ys(c, e),
            c.verbose &&
              e.dispatch(
                (0, ye.actionListPlaybackChanged)({
                  actionListId: o,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function gs({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: o,
      groupIndex: i = 0,
      immediate: a,
      verbose: s,
    }) {
      var c;
      let { ixData: f, ixSession: v } = e.getState(),
        { events: d } = f,
        E = d[t] || {},
        { mediaQueries: I = f.mediaQueryKeys } = E,
        S = (0, wt.default)(f, `actionLists.${o}`, {}),
        { actionItemGroups: A, useFirstGroupAsInitialState: L } = S;
      if (!A || !A.length) return !1;
      i >= A.length && (0, wt.default)(E, "config.loop") && (i = 0),
        i === 0 && L && i++;
      let w =
          (i === 0 || (i === 1 && L)) &&
          ds((c = E.action) === null || c === void 0 ? void 0 : c.actionTypeId)
            ? E.config.delay
            : void 0,
        T = (0, wt.default)(A, [i, "actionItems"], []);
      if (!T.length || !Ni(I, v.mediaQueryKey)) return !1;
      let q = v.hasBoundaryNodes && r ? Oe.getClosestElement(r, Ri) : null,
        N = xV(T),
        P = !1;
      return (
        T.forEach((G, K) => {
          let { config: Y, actionTypeId: re } = G,
            J = qi(re),
            { target: M } = Y;
          if (!M) return;
          let _ = M.boundaryMode ? q : null;
          Ci({
            config: Y,
            event: E,
            eventTarget: r,
            elementRoot: _,
            elementApi: Oe,
          }).forEach((F, X) => {
            let Q = J ? Es(re)(F, G) : null,
              ee = J ? jV(re)(F, G) : null;
            P = !0;
            let x = N === K && X === 0,
              H = MV({ element: F, actionItem: G }),
              k = vs({ element: F, actionItem: G, elementApi: Oe }, Q);
            _s({
              store: e,
              element: F,
              actionItem: G,
              eventId: t,
              eventTarget: r,
              eventStateKey: n,
              actionListId: o,
              groupIndex: i,
              isCarrier: x,
              computedStyle: H,
              destination: k,
              immediate: a,
              verbose: s,
              pluginInstance: Q,
              pluginDuration: ee,
              instanceDelay: w,
            });
          });
        }),
        P
      );
    }
    function _s(e) {
      var t;
      let { store: r, computedStyle: n } = e,
        o = (0, IV.default)(e, RV),
        {
          element: i,
          actionItem: a,
          immediate: s,
          pluginInstance: c,
          continuous: f,
          restingValue: v,
          eventId: d,
        } = o,
        E = !f,
        I = PV(),
        { ixElements: S, ixSession: A, ixData: L } = r.getState(),
        b = qV(S, i),
        { refState: w } = S[b] || {},
        T = Oe.getRefType(i),
        q = A.reducedMotion && Je.ReducedMotionTypes[a.actionTypeId],
        N;
      if (q && f)
        switch (
          (t = L.events[d]) === null || t === void 0 ? void 0 : t.eventTypeId
        ) {
          case Je.EventTypeConsts.MOUSE_MOVE:
          case Je.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
            N = v;
            break;
          default:
            N = 0.5;
            break;
        }
      let P = DV(i, w, n, a, Oe, c);
      if (
        (r.dispatch(
          (0, ye.instanceAdded)(
            (0, yV.default)(
              {
                instanceId: I,
                elementId: b,
                origin: P,
                refType: T,
                skipMotion: q,
                skipToValue: N,
              },
              o
            )
          )
        ),
        $y(document.body, "ix2-animation-started", I),
        s)
      ) {
        vW(r, I);
        return;
      }
      Vt({ store: r, select: ({ ixInstances: G }) => G[I], onChange: Qy }),
        E && r.dispatch((0, ye.instanceStarted)(I, A.tick));
    }
    function ys(e, t) {
      $y(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState(),
      });
      let { elementId: r, actionItem: n } = e,
        { ixElements: o } = t.getState(),
        { ref: i, refType: a } = o[r] || {};
      a === Hy && XV(i, n, Oe), t.dispatch((0, ye.instanceRemoved)(e.id));
    }
    function $y(e, t, r) {
      let n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function vW(e, t) {
      let { ixParameters: r } = e.getState();
      e.dispatch((0, ye.instanceStarted)(t, 0)),
        e.dispatch((0, ye.animationFrameChanged)(performance.now(), r));
      let { ixInstances: n } = e.getState();
      Qy(n[t], e);
    }
    function Qy(e, t) {
      let {
          active: r,
          continuous: n,
          complete: o,
          elementId: i,
          actionItem: a,
          actionTypeId: s,
          renderType: c,
          current: f,
          groupIndex: v,
          eventId: d,
          eventTarget: E,
          eventStateKey: I,
          actionListId: S,
          isCarrier: A,
          styleProp: L,
          verbose: b,
          pluginInstance: w,
        } = e,
        { ixData: T, ixSession: q } = t.getState(),
        { events: N } = T,
        P = N[d] || {},
        { mediaQueries: G = T.mediaQueryKeys } = P;
      if (Ni(G, q.mediaQueryKey) && (n || r || o)) {
        if (f || (c === NV && o)) {
          t.dispatch((0, ye.elementStateChanged)(i, s, f, a));
          let { ixElements: K } = t.getState(),
            { ref: Y, refType: re, refState: J } = K[i] || {},
            M = J && J[s];
          (re === Hy || qi(s)) && LV(Y, J, M, d, a, L, Oe, c, w);
        }
        if (o) {
          if (A) {
            let K = gs({
              store: t,
              eventId: d,
              eventTarget: E,
              eventStateKey: I,
              actionListId: S,
              groupIndex: v + 1,
              verbose: b,
            });
            b &&
              !K &&
              t.dispatch(
                (0, ye.actionListPlaybackChanged)({
                  actionListId: S,
                  isPlaying: !1,
                })
              );
          }
          ys(e, t);
        }
      }
    }
  });
  var Jy = u((_t) => {
    "use strict";
    var EW = Nt().default,
      hW = ze().default;
    Object.defineProperty(_t, "__esModule", { value: !0 });
    _t.actions = void 0;
    _t.destroy = Zy;
    _t.init = TW;
    _t.setEnv = IW;
    _t.store = void 0;
    Dl();
    var gW = Qo(),
      _W = hW(rg()),
      Is = fs(),
      yW = EW(hi());
    _t.actions = yW;
    var xi = (0, gW.createStore)(_W.default);
    _t.store = xi;
    function IW(e) {
      e() && (0, Is.observeRequests)(xi);
    }
    function TW(e) {
      Zy(), (0, Is.startEngine)({ store: xi, rawData: e, allowEvents: !0 });
    }
    function Zy() {
      (0, Is.stopEngine)(xi);
    }
  });
  var nI = u((AK, rI) => {
    var eI = Ke(),
      tI = Jy();
    tI.setEnv(eI.env);
    eI.define(
      "ix2",
      (rI.exports = function () {
        return tI;
      })
    );
  });
  var oI = u((bK, iI) => {
    var yr = Ke();
    yr.define(
      "links",
      (iI.exports = function (e, t) {
        var r = {},
          n = e(window),
          o,
          i = yr.env(),
          a = window.location,
          s = document.createElement("a"),
          c = "w--current",
          f = /index\.(html|php)$/,
          v = /\/$/,
          d,
          E;
        r.ready = r.design = r.preview = I;
        function I() {
          (o = i && yr.env("design")),
            (E = yr.env("slug") || a.pathname || ""),
            yr.scroll.off(A),
            (d = []);
          for (var b = document.links, w = 0; w < b.length; ++w) S(b[w]);
          d.length && (yr.scroll.on(A), A());
        }
        function S(b) {
          var w =
            (o && b.getAttribute("href-disabled")) || b.getAttribute("href");
          if (((s.href = w), !(w.indexOf(":") >= 0))) {
            var T = e(b);
            if (
              s.hash.length > 1 &&
              s.host + s.pathname === a.host + a.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
              var q = e(s.hash);
              q.length && d.push({ link: T, sec: q, active: !1 });
              return;
            }
            if (!(w === "#" || w === "")) {
              var N = s.href === a.href || w === E || (f.test(w) && v.test(E));
              L(T, c, N);
            }
          }
        }
        function A() {
          var b = n.scrollTop(),
            w = n.height();
          t.each(d, function (T) {
            var q = T.link,
              N = T.sec,
              P = N.offset().top,
              G = N.outerHeight(),
              K = w * 0.5,
              Y = N.is(":visible") && P + G - K >= b && P + K <= b + w;
            T.active !== Y && ((T.active = Y), L(q, c, Y));
          });
        }
        function L(b, w, T) {
          var q = b.hasClass(w);
          (T && q) || (!T && !q) || (T ? b.addClass(w) : b.removeClass(w));
        }
        return r;
      })
    );
  });
  var sI = u((wK, aI) => {
    var Mi = Ke();
    Mi.define(
      "scroll",
      (aI.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = S() ? null : window.history,
          o = e(window),
          i = e(document),
          a = e(document.body),
          s =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (M) {
              window.setTimeout(M, 15);
            },
          c = Mi.env("editor") ? ".w-editor-body" : "body",
          f =
            "header, " +
            c +
            " > .header, " +
            c +
            " > .w-nav:not([data-no-scroll])",
          v = 'a[href="#"]',
          d = 'a[href*="#"]:not(.w-tab-link):not(' + v + ")",
          E = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          I = document.createElement("style");
        I.appendChild(document.createTextNode(E));
        function S() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var A = /^#[a-zA-Z0-9][\w:.-]*$/;
        function L(M) {
          return A.test(M.hash) && M.host + M.pathname === r.host + r.pathname;
        }
        let b =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function w() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            b.matches
          );
        }
        function T(M, _) {
          var D;
          switch (_) {
            case "add":
              (D = M.attr("tabindex")),
                D
                  ? M.attr("data-wf-tabindex-swap", D)
                  : M.attr("tabindex", "-1");
              break;
            case "remove":
              (D = M.attr("data-wf-tabindex-swap")),
                D
                  ? (M.attr("tabindex", D),
                    M.removeAttr("data-wf-tabindex-swap"))
                  : M.removeAttr("tabindex");
              break;
          }
          M.toggleClass("wf-force-outline-none", _ === "add");
        }
        function q(M) {
          var _ = M.currentTarget;
          if (
            !(
              Mi.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(_.className))
            )
          ) {
            var D = L(_) ? _.hash : "";
            if (D !== "") {
              var F = e(D);
              F.length &&
                (M && (M.preventDefault(), M.stopPropagation()),
                N(D, M),
                window.setTimeout(
                  function () {
                    P(F, function () {
                      T(F, "add"),
                        F.get(0).focus({ preventScroll: !0 }),
                        T(F, "remove");
                    });
                  },
                  M ? 0 : 300
                ));
            }
          }
        }
        function N(M) {
          if (
            r.hash !== M &&
            n &&
            n.pushState &&
            !(Mi.env.chrome && r.protocol === "file:")
          ) {
            var _ = n.state && n.state.hash;
            _ !== M && n.pushState({ hash: M }, "", M);
          }
        }
        function P(M, _) {
          var D = o.scrollTop(),
            F = G(M);
          if (D !== F) {
            var X = K(M, D, F),
              Q = Date.now(),
              ee = function () {
                var x = Date.now() - Q;
                window.scroll(0, Y(D, F, x, X)),
                  x <= X ? s(ee) : typeof _ == "function" && _();
              };
            s(ee);
          }
        }
        function G(M) {
          var _ = e(f),
            D = _.css("position") === "fixed" ? _.outerHeight() : 0,
            F = M.offset().top - D;
          if (M.data("scroll") === "mid") {
            var X = o.height() - D,
              Q = M.outerHeight();
            Q < X && (F -= Math.round((X - Q) / 2));
          }
          return F;
        }
        function K(M, _, D) {
          if (w()) return 0;
          var F = 1;
          return (
            a.add(M).each(function (X, Q) {
              var ee = parseFloat(Q.getAttribute("data-scroll-time"));
              !isNaN(ee) && ee >= 0 && (F = ee);
            }),
            (472.143 * Math.log(Math.abs(_ - D) + 125) - 2e3) * F
          );
        }
        function Y(M, _, D, F) {
          return D > F ? _ : M + (_ - M) * re(D / F);
        }
        function re(M) {
          return M < 0.5
            ? 4 * M * M * M
            : (M - 1) * (2 * M - 2) * (2 * M - 2) + 1;
        }
        function J() {
          var { WF_CLICK_EMPTY: M, WF_CLICK_SCROLL: _ } = t;
          i.on(_, d, q),
            i.on(M, v, function (D) {
              D.preventDefault();
            }),
            document.head.insertBefore(I, document.head.firstChild);
        }
        return { ready: J };
      })
    );
  });
  var cI = u((RK, uI) => {
    var mW = Ke();
    mW.define(
      "touch",
      (uI.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (i) {
            return (
              (i = typeof i == "string" ? e(i).get(0) : i), i ? new n(i) : null
            );
          });
        function n(i) {
          var a = !1,
            s = !1,
            c = Math.min(Math.round(window.innerWidth * 0.04), 40),
            f,
            v;
          i.addEventListener("touchstart", d, !1),
            i.addEventListener("touchmove", E, !1),
            i.addEventListener("touchend", I, !1),
            i.addEventListener("touchcancel", S, !1),
            i.addEventListener("mousedown", d, !1),
            i.addEventListener("mousemove", E, !1),
            i.addEventListener("mouseup", I, !1),
            i.addEventListener("mouseout", S, !1);
          function d(L) {
            var b = L.touches;
            (b && b.length > 1) ||
              ((a = !0),
              b ? ((s = !0), (f = b[0].clientX)) : (f = L.clientX),
              (v = f));
          }
          function E(L) {
            if (a) {
              if (s && L.type === "mousemove") {
                L.preventDefault(), L.stopPropagation();
                return;
              }
              var b = L.touches,
                w = b ? b[0].clientX : L.clientX,
                T = w - v;
              (v = w),
                Math.abs(T) > c &&
                  r &&
                  String(r()) === "" &&
                  (o("swipe", L, { direction: T > 0 ? "right" : "left" }), S());
            }
          }
          function I(L) {
            if (a && ((a = !1), s && L.type === "mouseup")) {
              L.preventDefault(), L.stopPropagation(), (s = !1);
              return;
            }
          }
          function S() {
            a = !1;
          }
          function A() {
            i.removeEventListener("touchstart", d, !1),
              i.removeEventListener("touchmove", E, !1),
              i.removeEventListener("touchend", I, !1),
              i.removeEventListener("touchcancel", S, !1),
              i.removeEventListener("mousedown", d, !1),
              i.removeEventListener("mousemove", E, !1),
              i.removeEventListener("mouseup", I, !1),
              i.removeEventListener("mouseout", S, !1),
              (i = null);
          }
          this.destroy = A;
        }
        function o(i, a, s) {
          var c = e.Event(i, { originalEvent: a });
          e(a.target).trigger(c, s);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var dI = u((CK, fI) => {
    var Wt = Ke(),
      OW = ki(),
      tt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      lI = !0,
      SW = /^#[a-zA-Z0-9\-_]+$/;
    Wt.define(
      "dropdown",
      (fI.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          o = Wt.env(),
          i = !1,
          a,
          s = Wt.env.touch,
          c = ".w-dropdown",
          f = "w--open",
          v = OW.triggers,
          d = 900,
          E = "focusout" + c,
          I = "keydown" + c,
          S = "mouseenter" + c,
          A = "mousemove" + c,
          L = "mouseleave" + c,
          b = (s ? "click" : "mouseup") + c,
          w = "w-close" + c,
          T = "setting" + c,
          q = e(document),
          N;
        (n.ready = P),
          (n.design = function () {
            i && _(), (i = !1), P();
          }),
          (n.preview = function () {
            (i = !0), P();
          });
        function P() {
          (a = o && Wt.env("design")), (N = q.find(c)), N.each(G);
        }
        function G(p, B) {
          var j = e(B),
            R = e.data(B, c);
          R ||
            (R = e.data(B, c, {
              open: !1,
              el: j,
              config: {},
              selectedIdx: -1,
            })),
            (R.toggle = R.el.children(".w-dropdown-toggle")),
            (R.list = R.el.children(".w-dropdown-list")),
            (R.links = R.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (R.complete = X(R)),
            (R.mouseLeave = ee(R)),
            (R.mouseUpOutside = F(R)),
            (R.mouseMoveOutside = x(R)),
            K(R);
          var se = R.toggle.attr("id"),
            Se = R.list.attr("id");
          se || (se = "w-dropdown-toggle-" + p),
            Se || (Se = "w-dropdown-list-" + p),
            R.toggle.attr("id", se),
            R.toggle.attr("aria-controls", Se),
            R.toggle.attr("aria-haspopup", "menu"),
            R.toggle.attr("aria-expanded", "false"),
            R.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            R.toggle.prop("tagName") !== "BUTTON" &&
              (R.toggle.attr("role", "button"),
              R.toggle.attr("tabindex") || R.toggle.attr("tabindex", "0")),
            R.list.attr("id", Se),
            R.list.attr("aria-labelledby", se),
            R.links.each(function (We, rt) {
              rt.hasAttribute("tabindex") || rt.setAttribute("tabindex", "0"),
                SW.test(rt.hash) &&
                  rt.addEventListener("click", M.bind(null, R));
            }),
            R.el.off(c),
            R.toggle.off(c),
            R.nav && R.nav.off(c);
          var le = re(R, lI);
          a && R.el.on(T, Y(R)),
            a ||
              (o && ((R.hovering = !1), M(R)),
              R.config.hover && R.toggle.on(S, Q(R)),
              R.el.on(w, le),
              R.el.on(I, H(R)),
              R.el.on(E, U(R)),
              R.toggle.on(b, le),
              R.toggle.on(I, V(R)),
              (R.nav = R.el.closest(".w-nav")),
              R.nav.on(w, le));
        }
        function K(p) {
          var B = Number(p.el.css("z-index"));
          (p.manageZ = B === d || B === d + 1),
            (p.config = {
              hover: p.el.attr("data-hover") === "true" && !s,
              delay: p.el.attr("data-delay"),
            });
        }
        function Y(p) {
          return function (B, j) {
            (j = j || {}),
              K(p),
              j.open === !0 && J(p, !0),
              j.open === !1 && M(p, { immediate: !0 });
          };
        }
        function re(p, B) {
          return r(function (j) {
            if (p.open || (j && j.type === "w-close"))
              return M(p, { forceClose: B });
            J(p);
          });
        }
        function J(p) {
          if (!p.open) {
            D(p),
              (p.open = !0),
              p.list.addClass(f),
              p.toggle.addClass(f),
              p.toggle.attr("aria-expanded", "true"),
              v.intro(0, p.el[0]),
              Wt.redraw.up(),
              p.manageZ && p.el.css("z-index", d + 1);
            var B = Wt.env("editor");
            a || q.on(b, p.mouseUpOutside),
              p.hovering && !B && p.el.on(L, p.mouseLeave),
              p.hovering && B && q.on(A, p.mouseMoveOutside),
              window.clearTimeout(p.delayId);
          }
        }
        function M(p, { immediate: B, forceClose: j } = {}) {
          if (p.open && !(p.config.hover && p.hovering && !j)) {
            p.toggle.attr("aria-expanded", "false"), (p.open = !1);
            var R = p.config;
            if (
              (v.outro(0, p.el[0]),
              q.off(b, p.mouseUpOutside),
              q.off(A, p.mouseMoveOutside),
              p.el.off(L, p.mouseLeave),
              window.clearTimeout(p.delayId),
              !R.delay || B)
            )
              return p.complete();
            p.delayId = window.setTimeout(p.complete, R.delay);
          }
        }
        function _() {
          q.find(c).each(function (p, B) {
            e(B).triggerHandler(w);
          });
        }
        function D(p) {
          var B = p.el[0];
          N.each(function (j, R) {
            var se = e(R);
            se.is(B) || se.has(B).length || se.triggerHandler(w);
          });
        }
        function F(p) {
          return (
            p.mouseUpOutside && q.off(b, p.mouseUpOutside),
            r(function (B) {
              if (p.open) {
                var j = e(B.target);
                if (!j.closest(".w-dropdown-toggle").length) {
                  var R = e.inArray(p.el[0], j.parents(c)) === -1,
                    se = Wt.env("editor");
                  if (R) {
                    if (se) {
                      var Se =
                          j.parents().length === 1 &&
                          j.parents("svg").length === 1,
                        le = j.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (Se || le) return;
                    }
                    M(p);
                  }
                }
              }
            })
          );
        }
        function X(p) {
          return function () {
            p.list.removeClass(f),
              p.toggle.removeClass(f),
              p.manageZ && p.el.css("z-index", "");
          };
        }
        function Q(p) {
          return function () {
            (p.hovering = !0), J(p);
          };
        }
        function ee(p) {
          return function () {
            (p.hovering = !1), p.links.is(":focus") || M(p);
          };
        }
        function x(p) {
          return r(function (B) {
            if (p.open) {
              var j = e(B.target),
                R = e.inArray(p.el[0], j.parents(c)) === -1;
              if (R) {
                var se = j.parents(".w-editor-bem-EditorHoverControls").length,
                  Se = j.parents(".w-editor-bem-RTToolbar").length,
                  le = e(".w-editor-bem-EditorOverlay"),
                  We =
                    le.find(".w-editor-edit-outline").length ||
                    le.find(".w-editor-bem-RTToolbar").length;
                if (se || Se || We) return;
                (p.hovering = !1), M(p);
              }
            }
          });
        }
        function H(p) {
          return function (B) {
            if (!(a || !p.open))
              switch (
                ((p.selectedIdx = p.links.index(document.activeElement)),
                B.keyCode)
              ) {
                case tt.HOME:
                  return p.open
                    ? ((p.selectedIdx = 0), k(p), B.preventDefault())
                    : void 0;
                case tt.END:
                  return p.open
                    ? ((p.selectedIdx = p.links.length - 1),
                      k(p),
                      B.preventDefault())
                    : void 0;
                case tt.ESCAPE:
                  return M(p), p.toggle.focus(), B.stopPropagation();
                case tt.ARROW_RIGHT:
                case tt.ARROW_DOWN:
                  return (
                    (p.selectedIdx = Math.min(
                      p.links.length - 1,
                      p.selectedIdx + 1
                    )),
                    k(p),
                    B.preventDefault()
                  );
                case tt.ARROW_LEFT:
                case tt.ARROW_UP:
                  return (
                    (p.selectedIdx = Math.max(-1, p.selectedIdx - 1)),
                    k(p),
                    B.preventDefault()
                  );
              }
          };
        }
        function k(p) {
          p.links[p.selectedIdx] && p.links[p.selectedIdx].focus();
        }
        function V(p) {
          var B = re(p, lI);
          return function (j) {
            if (!a) {
              if (!p.open)
                switch (j.keyCode) {
                  case tt.ARROW_UP:
                  case tt.ARROW_DOWN:
                    return j.stopPropagation();
                }
              switch (j.keyCode) {
                case tt.SPACE:
                case tt.ENTER:
                  return B(), j.stopPropagation(), j.preventDefault();
              }
            }
          };
        }
        function U(p) {
          return r(function (B) {
            var { relatedTarget: j, target: R } = B,
              se = p.el[0],
              Se = se.contains(j) || se.contains(R);
            return Se || M(p), B.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var pI = u((Ts) => {
    "use strict";
    Object.defineProperty(Ts, "__esModule", { value: !0 });
    Ts.default = AW;
    function AW(e, t, r, n, o, i, a, s, c, f, v, d, E) {
      return function (I) {
        e(I);
        var S = I.form,
          A = {
            name: S.attr("data-name") || S.attr("name") || "Untitled Form",
            pageId: S.attr("data-wf-page-id") || "",
            elementId: S.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              S.html()
            ),
            trackingCookies: n(),
          };
        let L = S.attr("data-wf-flow");
        L && (A.wfFlow = L), o(I);
        var b = i(S, A.fields);
        if (b) return a(b);
        if (((A.fileUploads = s(S)), c(I), !f)) {
          v(I);
          return;
        }
        d.ajax({
          url: E,
          type: "POST",
          data: A,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (w) {
            w && w.code === 200 && (I.success = !0), v(I);
          })
          .fail(function () {
            v(I);
          });
      };
    }
  });
  var EI = u((qK, vI) => {
    var Di = Ke();
    Di.define(
      "forms",
      (vI.exports = function (e, t) {
        var r = {},
          n = e(document),
          o,
          i = window.location,
          a = window.XDomainRequest && !window.atob,
          s = ".w-form",
          c,
          f = /e(-)?mail/i,
          v = /^\S+@\S+$/,
          d = window.alert,
          E = Di.env(),
          I,
          S,
          A,
          L = /list-manage[1-9]?.com/i,
          b = t.debounce(function () {
            d(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              w(), !E && !I && q();
            };
        function w() {
          (c = e("html").attr("data-wf-site")),
            (S = "https://webflow.com/api/v1/form/" + c),
            a &&
              S.indexOf("https://webflow.com") >= 0 &&
              (S = S.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (A = `${S}/signFile`),
            (o = e(s + " form")),
            o.length && o.each(T);
        }
        function T(x, H) {
          var k = e(H),
            V = e.data(H, s);
          V || (V = e.data(H, s, { form: k })), N(V);
          var U = k.closest("div.w-form");
          (V.done = U.find("> .w-form-done")),
            (V.fail = U.find("> .w-form-fail")),
            (V.fileUploads = U.find(".w-file-upload")),
            V.fileUploads.each(function (j) {
              X(j, V);
            });
          var p =
            V.form.attr("aria-label") || V.form.attr("data-name") || "Form";
          V.done.attr("aria-label") || V.form.attr("aria-label", p),
            V.done.attr("tabindex", "-1"),
            V.done.attr("role", "region"),
            V.done.attr("aria-label") ||
              V.done.attr("aria-label", p + " success"),
            V.fail.attr("tabindex", "-1"),
            V.fail.attr("role", "region"),
            V.fail.attr("aria-label") ||
              V.fail.attr("aria-label", p + " failure");
          var B = (V.action = k.attr("action"));
          if (
            ((V.handler = null),
            (V.redirect = k.attr("data-redirect")),
            L.test(B))
          ) {
            V.handler = _;
            return;
          }
          if (!B) {
            if (c) {
              V.handler = (() => {
                let j = pI().default;
                return j(N, i, Di, re, F, G, d, K, P, c, D, e, S);
              })();
              return;
            }
            b();
          }
        }
        function q() {
          (I = !0),
            n.on("submit", s + " form", function (j) {
              var R = e.data(this, s);
              R.handler && ((R.evt = j), R.handler(R));
            });
          let x = ".w-checkbox-input",
            H = ".w-radio-input",
            k = "w--redirected-checked",
            V = "w--redirected-focus",
            U = "w--redirected-focus-visible",
            p = ":focus-visible, [data-wf-focus-visible]",
            B = [
              ["checkbox", x],
              ["radio", H],
            ];
          n.on(
            "change",
            s + ' form input[type="checkbox"]:not(' + x + ")",
            (j) => {
              e(j.target).siblings(x).toggleClass(k);
            }
          ),
            n.on("change", s + ' form input[type="radio"]', (j) => {
              e(`input[name="${j.target.name}"]:not(${x})`).map((se, Se) =>
                e(Se).siblings(H).removeClass(k)
              );
              let R = e(j.target);
              R.hasClass("w-radio-input") || R.siblings(H).addClass(k);
            }),
            B.forEach(([j, R]) => {
              n.on(
                "focus",
                s + ` form input[type="${j}"]:not(` + R + ")",
                (se) => {
                  e(se.target).siblings(R).addClass(V),
                    e(se.target).filter(p).siblings(R).addClass(U);
                }
              ),
                n.on(
                  "blur",
                  s + ` form input[type="${j}"]:not(` + R + ")",
                  (se) => {
                    e(se.target).siblings(R).removeClass(`${V} ${U}`);
                  }
                );
            });
        }
        function N(x) {
          var H = (x.btn = x.form.find(':input[type="submit"]'));
          (x.wait = x.btn.attr("data-wait") || null),
            (x.success = !1),
            H.prop("disabled", !1),
            x.label && H.val(x.label);
        }
        function P(x) {
          var H = x.btn,
            k = x.wait;
          H.prop("disabled", !0), k && ((x.label = H.val()), H.val(k));
        }
        function G(x, H) {
          var k = null;
          return (
            (H = H || {}),
            x
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (V, U) {
                var p = e(U),
                  B = p.attr("type"),
                  j =
                    p.attr("data-name") || p.attr("name") || "Field " + (V + 1),
                  R = p.val();
                if (B === "checkbox") R = p.is(":checked");
                else if (B === "radio") {
                  if (H[j] === null || typeof H[j] == "string") return;
                  R =
                    x
                      .find('input[name="' + p.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof R == "string" && (R = e.trim(R)),
                  (H[j] = R),
                  (k = k || J(p, B, j, R));
              }),
            k
          );
        }
        function K(x) {
          var H = {};
          return (
            x.find(':input[type="file"]').each(function (k, V) {
              var U = e(V),
                p = U.attr("data-name") || U.attr("name") || "File " + (k + 1),
                B = U.attr("data-value");
              typeof B == "string" && (B = e.trim(B)), (H[p] = B);
            }),
            H
          );
        }
        let Y = { _mkto_trk: "marketo" };
        function re() {
          return document.cookie.split("; ").reduce(function (H, k) {
            let V = k.split("="),
              U = V[0];
            if (U in Y) {
              let p = Y[U],
                B = V.slice(1).join("=");
              H[p] = B;
            }
            return H;
          }, {});
        }
        function J(x, H, k, V) {
          var U = null;
          return (
            H === "password"
              ? (U = "Passwords cannot be submitted.")
              : x.attr("required")
              ? V
                ? f.test(x.attr("type")) &&
                  (v.test(V) ||
                    (U = "Please enter a valid email address for: " + k))
                : (U = "Please fill out the required field: " + k)
              : k === "g-recaptcha-response" &&
                !V &&
                (U = "Please confirm you\u2019re not a robot."),
            U
          );
        }
        function M(x) {
          F(x), D(x);
        }
        function _(x) {
          N(x);
          var H = x.form,
            k = {};
          if (/^https/.test(i.href) && !/^https/.test(x.action)) {
            H.attr("method", "post");
            return;
          }
          F(x);
          var V = G(H, k);
          if (V) return d(V);
          P(x);
          var U;
          t.each(k, function (R, se) {
            f.test(se) && (k.EMAIL = R),
              /^((full[ _-]?)?name)$/i.test(se) && (U = R),
              /^(first[ _-]?name)$/i.test(se) && (k.FNAME = R),
              /^(last[ _-]?name)$/i.test(se) && (k.LNAME = R);
          }),
            U &&
              !k.FNAME &&
              ((U = U.split(" ")),
              (k.FNAME = U[0]),
              (k.LNAME = k.LNAME || U[1]));
          var p = x.action.replace("/post?", "/post-json?") + "&c=?",
            B = p.indexOf("u=") + 2;
          B = p.substring(B, p.indexOf("&", B));
          var j = p.indexOf("id=") + 3;
          (j = p.substring(j, p.indexOf("&", j))),
            (k["b_" + B + "_" + j] = ""),
            e
              .ajax({ url: p, data: k, dataType: "jsonp" })
              .done(function (R) {
                (x.success = R.result === "success" || /already/.test(R.msg)),
                  x.success || console.info("MailChimp error: " + R.msg),
                  D(x);
              })
              .fail(function () {
                D(x);
              });
        }
        function D(x) {
          var H = x.form,
            k = x.redirect,
            V = x.success;
          if (V && k) {
            Di.location(k);
            return;
          }
          x.done.toggle(V),
            x.fail.toggle(!V),
            V ? x.done.focus() : x.fail.focus(),
            H.toggle(!V),
            N(x);
        }
        function F(x) {
          x.evt && x.evt.preventDefault(), (x.evt = null);
        }
        function X(x, H) {
          if (!H.fileUploads || !H.fileUploads[x]) return;
          var k,
            V = e(H.fileUploads[x]),
            U = V.find("> .w-file-upload-default"),
            p = V.find("> .w-file-upload-uploading"),
            B = V.find("> .w-file-upload-success"),
            j = V.find("> .w-file-upload-error"),
            R = U.find(".w-file-upload-input"),
            se = U.find(".w-file-upload-label"),
            Se = se.children(),
            le = j.find(".w-file-upload-error-msg"),
            We = B.find(".w-file-upload-file"),
            rt = B.find(".w-file-remove-link"),
            Ir = We.find(".w-file-upload-file-name"),
            Tr = le.attr("data-w-size-error"),
            nt = le.attr("data-w-type-error"),
            Fi = le.attr("data-w-generic-error");
          if (
            (E ||
              se.on("click keydown", function (g) {
                (g.type === "keydown" && g.which !== 13 && g.which !== 32) ||
                  (g.preventDefault(), R.click());
              }),
            se.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            rt.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            E)
          )
            R.on("click", function (g) {
              g.preventDefault();
            }),
              se.on("click", function (g) {
                g.preventDefault();
              }),
              Se.on("click", function (g) {
                g.preventDefault();
              });
          else {
            rt.on("click keydown", function (g) {
              if (g.type === "keydown") {
                if (g.which !== 13 && g.which !== 32) return;
                g.preventDefault();
              }
              R.removeAttr("data-value"),
                R.val(""),
                Ir.html(""),
                U.toggle(!0),
                B.toggle(!1),
                se.focus();
            }),
              R.on("change", function (g) {
                (k = g.target && g.target.files && g.target.files[0]),
                  k &&
                    (U.toggle(!1),
                    j.toggle(!1),
                    p.toggle(!0),
                    p.focus(),
                    Ir.text(k.name),
                    m() || P(H),
                    (H.fileUploads[x].uploading = !0),
                    Q(k, h));
              });
            var on = se.outerHeight();
            R.height(on), R.width(1);
          }
          function l(g) {
            var O = g.responseJSON && g.responseJSON.msg,
              z = Fi;
            typeof O == "string" && O.indexOf("InvalidFileTypeError") === 0
              ? (z = nt)
              : typeof O == "string" &&
                O.indexOf("MaxFileSizeError") === 0 &&
                (z = Tr),
              le.text(z),
              R.removeAttr("data-value"),
              R.val(""),
              p.toggle(!1),
              U.toggle(!0),
              j.toggle(!0),
              j.focus(),
              (H.fileUploads[x].uploading = !1),
              m() || N(H);
          }
          function h(g, O) {
            if (g) return l(g);
            var z = O.fileName,
              te = O.postData,
              ve = O.fileId,
              W = O.s3Url;
            R.attr("data-value", ve), ee(W, te, k, z, y);
          }
          function y(g) {
            if (g) return l(g);
            p.toggle(!1),
              B.css("display", "inline-block"),
              B.focus(),
              (H.fileUploads[x].uploading = !1),
              m() || N(H);
          }
          function m() {
            var g = (H.fileUploads && H.fileUploads.toArray()) || [];
            return g.some(function (O) {
              return O.uploading;
            });
          }
        }
        function Q(x, H) {
          var k = new URLSearchParams({ name: x.name, size: x.size });
          e.ajax({ type: "GET", url: `${A}?${k}`, crossDomain: !0 })
            .done(function (V) {
              H(null, V);
            })
            .fail(function (V) {
              H(V);
            });
        }
        function ee(x, H, k, V, U) {
          var p = new FormData();
          for (var B in H) p.append(B, H[B]);
          p.append("file", k, V),
            e
              .ajax({
                type: "POST",
                url: x,
                data: p,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                U(null);
              })
              .fail(function (j) {
                U(j);
              });
        }
        return r;
      })
    );
  });
  ms();
  Os();
  Ds();
  Gs();
  Xs();
  Bs();
  ki();
  nI();
  oI();
  sI();
  cI();
  dI();
  EI();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: 0,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691450494325,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691450494325,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691451204029,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691451204029,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107f09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107f09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691451213611,
    },
    "e-10": {
      id: "e-10",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-9",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107f09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107f09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691451213612,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "baf964e8-dc29-35df-4ded-2a38d744ed61",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "baf964e8-dc29-35df-4ded-2a38d744ed61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691520881974,
    },
    "e-14": {
      id: "e-14",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-13",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "baf964e8-dc29-35df-4ded-2a38d744ed61",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "baf964e8-dc29-35df-4ded-2a38d744ed61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691520881974,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8dbc3546-7f93-9587-a724-7fbd50c05ed7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8dbc3546-7f93-9587-a724-7fbd50c05ed7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691887032182,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-15",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8dbc3546-7f93-9587-a724-7fbd50c05ed7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8dbc3546-7f93-9587-a724-7fbd50c05ed7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691887032183,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8dbc3546-7f93-9587-a724-7fbd50c05ed8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8dbc3546-7f93-9587-a724-7fbd50c05ed8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1691887538273,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8dbc3546-7f93-9587-a724-7fbd50c05ed8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8dbc3546-7f93-9587-a724-7fbd50c05ed8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691887538273,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf3c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf3c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692490685229,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf40",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf40",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692916952855,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64fb91bf1c281c02d0fbaf3d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64fb91bf1c281c02d0fbaf3d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692917051264,
    },
  },
  actionLists: {
    "a-3": {
      id: "a-3",
      title: "Thumbnails hover IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
                },
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-3-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 1500,
                target: {
                  useEventTarget: true,
                  id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
                },
                yValue: 8,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-3-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 2000,
                target: {
                  useEventTarget: true,
                  id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107ee3",
                },
                yValue: -8,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691450560516,
    },
    "a-4": {
      id: "a-4",
      title: "Thumbnails hover OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64fb91bf1c281c02d0fbaf36|fd879f5c-03bd-ed8d-6387-04d489107f09",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691451291155,
    },
    "a-2": {
      id: "a-2",
      title: "Home Button Hover_IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_default",
                  selectorGuids: ["53114932-bd2a-0d15-f554-4c279edfad4a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_hover_bgd",
                  selectorGuids: ["1d428aef-1dde-180c-0d5a-2398bdfff7f0"],
                },
                xValue: 0,
                yValue: 99,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_color",
                  selectorGuids: ["f6fa0ed7-77c7-7136-0316-d85ec9cf2645"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.082, 1.001],
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_color",
                  selectorGuids: ["f6fa0ed7-77c7-7136-0316-d85ec9cf2645"],
                },
                xValue: 1.15,
                yValue: 1.15,
                locked: true,
              },
            },
            {
              id: "a-2-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_default",
                  selectorGuids: ["53114932-bd2a-0d15-f554-4c279edfad4a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-2-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_hover_bgd",
                  selectorGuids: ["1d428aef-1dde-180c-0d5a-2398bdfff7f0"],
                },
                yValue: -72,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-2-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.076, 1.001],
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_hover_bgd",
                  selectorGuids: ["1d428aef-1dde-180c-0d5a-2398bdfff7f0"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691427980916,
    },
    "a-5": {
      id: "a-5",
      title: "Home Button Hover_OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.082, 1.001],
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_color",
                  selectorGuids: ["f6fa0ed7-77c7-7136-0316-d85ec9cf2645"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_color",
                  selectorGuids: ["f6fa0ed7-77c7-7136-0316-d85ec9cf2645"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".logo_default",
                  selectorGuids: ["53114932-bd2a-0d15-f554-4c279edfad4a"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691427980916,
    },
    "a-6": {
      id: "a-6",
      title: "Menu Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".top",
                  selectorGuids: ["f1e63e3a-689d-204a-db23-abd61b1cea8b"],
                },
                yValue: 10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".bottom",
                  selectorGuids: ["e6f5ec00-4340-2370-456c-fb261c19c0c7"],
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".middle",
                  selectorGuids: ["c6a1e6ab-8de3-fc85-4713-b44ea56b8f9e"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 800,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".top",
                  selectorGuids: ["f1e63e3a-689d-204a-db23-abd61b1cea8b"],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-6-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 800,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".bottom",
                  selectorGuids: ["e6f5ec00-4340-2370-456c-fb261c19c0c7"],
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691887036405,
    },
    "a-7": {
      id: "a-7",
      title: "Menu Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".top",
                  selectorGuids: ["f1e63e3a-689d-204a-db23-abd61b1cea8b"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-7-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".bottom",
                  selectorGuids: ["e6f5ec00-4340-2370-456c-fb261c19c0c7"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-7-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".middle",
                  selectorGuids: ["c6a1e6ab-8de3-fc85-4713-b44ea56b8f9e"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".top",
                  selectorGuids: ["f1e63e3a-689d-204a-db23-abd61b1cea8b"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-7-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".bottom",
                  selectorGuids: ["e6f5ec00-4340-2370-456c-fb261c19c0c7"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691887218521,
    },
    "a-8": {
      id: "a-8",
      title: "Dropdown Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-list",
                  selectorGuids: ["91b55bd0-3ab4-43f7-d539-207ec361000b"],
                },
                xValue: 90,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-list",
                  selectorGuids: ["91b55bd0-3ab4-43f7-d539-207ec361000b"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.55, 0.055, 0.675, 0.19],
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-list",
                  selectorGuids: ["91b55bd0-3ab4-43f7-d539-207ec361000b"],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: [0.55, 0.055, 0.675, 0.19],
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-list",
                  selectorGuids: ["91b55bd0-3ab4-43f7-d539-207ec361000b"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691887566185,
    },
    "a-9": {
      id: "a-9",
      title: "Dropdown Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.55, 0.055, 0.675, 0.19],
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-list",
                  selectorGuids: ["91b55bd0-3ab4-43f7-d539-207ec361000b"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-9-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.55, 0.055, 0.675, 0.19],
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-list",
                  selectorGuids: ["91b55bd0-3ab4-43f7-d539-207ec361000b"],
                },
                xValue: 90,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691888082545,
    },
    "a-11": {
      id: "a-11",
      title: "Scroll progress",
      continuousParameterGroups: [
        {
          id: "a-11-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-11-n",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
								  
                    target: { id: "1cde0f86-1cb1-d416-5a61-2a7a6d58381d" },
                    widthValue: 0,
                    widthUnit: "%",
                    heightUnit: "PX",
                    locked: false,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-11-n-2",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
								  
                    target: { id: "1cde0f86-1cb1-d416-5a61-2a7a6d58381d" },
                    widthValue: 100,
                    widthUnit: "%",
                    heightUnit: "PX",
                    locked: false,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692628991079,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
