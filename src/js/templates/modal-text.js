define(['hogan'], function(Hogan) {
  var t = {
    /* jshint ignore:start */
    'modal-text' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("paragraph",c,p,1),c,p,0,14,126,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("blocks",c,p,1),c,p,0,26,114,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<p");if(t.s(t.f("paragraphCssClass",c,p,1),c,p,0,51,81,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("paragraphCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b(t.v(t.d(".",c,p,0)));t.b("</p>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("\n" + i);if(t.s(t.f("list",c,p,1),c,p,0,151,336,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<ul");if(t.s(t.f("listCssClass",c,p,1),c,p,0,172,197,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("listCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);if(t.s(t.f("blocks",c,p,1),c,p,0,227,318,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li");if(t.s(t.f("listItemCssClass",c,p,1),c,p,0,256,285,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("listItemCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b(t.v(t.d(".",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("</ul>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }})
    /* jshint ignore:end */
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    'modal-text' : r('modal-text')
  };
});