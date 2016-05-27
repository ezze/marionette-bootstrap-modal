define(['hogan'], function(Hogan) {
  var t = {
    /* jshint ignore:start */
    'modal-text' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("escapeHtml",c,p,1),c,p,0,15,361,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("paragraph",c,p,1),c,p,0,30,142,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("blocks",c,p,1),c,p,0,42,130,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<p");if(t.s(t.f("paragraphCssClass",c,p,1),c,p,0,67,97,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("paragraphCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b(t.v(t.d(".",c,p,0)));t.b("</p>");t.b("\n" + i);});c.pop();}});c.pop();}if(t.s(t.f("list",c,p,1),c,p,0,166,351,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<ul");if(t.s(t.f("listCssClass",c,p,1),c,p,0,187,212,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("listCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);if(t.s(t.f("blocks",c,p,1),c,p,0,242,333,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li");if(t.s(t.f("listItemCssClass",c,p,1),c,p,0,271,300,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("listItemCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b(t.v(t.d(".",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("</ul>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("\n" + i);if(!t.s(t.f("escapeHtml",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("paragraph",c,p,1),c,p,0,408,538,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("blocks",c,p,1),c,p,0,424,526,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <p");if(t.s(t.f("paragraphCssClass",c,p,1),c,p,0,457,487,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("paragraphCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b(t.t(t.d(".",c,p,0)));t.b("</p>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("\n" + i);if(t.s(t.f("list",c,p,1),c,p,0,563,782,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <ul");if(t.s(t.f("listCssClass",c,p,1),c,p,0,588,613,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("listCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);if(t.s(t.f("blocks",c,p,1),c,p,0,651,760,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <li");if(t.s(t.f("listItemCssClass",c,p,1),c,p,0,688,717,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"");t.b(t.v(t.f("listItemCssClass",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b(t.t(t.d(".",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);});c.pop();}};return t.fl(); },partials: {}, subs: {  }})
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