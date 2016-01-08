define(['hogan'], function(Hogan) {
  var t = {
    /* jshint ignore:start */
    'modal' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"modal-dialog\">");t.b("\n" + i);t.b("    <div class=\"modal-content\">");t.b("\n" + i);t.b("        <div class=\"modal-header\">");t.b("\n" + i);if(t.s(t.f("closeButton",c,p,1),c,p,0,122,276,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>");t.b("\n" + i);});c.pop();}t.b("            <h4 class=\"modal-title\" data-i18n=\"");t.b(t.v(t.f("titleI18n",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h4>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"modal-body\"></div>");t.b("\n" + i);t.b("        <div class=\"modal-footer\">");t.b("\n" + i);if(t.s(t.f("buttons",c,p,1),c,p,0,483,686,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <button type=\"button\" class=\"modal-button btn btn-");if(t.s(t.f("style",c,p,1),c,p,0,560,569,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("style",c,p,0)));});c.pop();}if(!t.s(t.f("style",c,p,1),c,p,1,0,0,"")){t.b("default");};t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-i18n=\"");t.b(t.v(t.f("captionI18n",c,p,0)));t.b("\">");t.b(t.v(t.f("caption",c,p,0)));t.b("</button>");t.b("\n" + i);});c.pop();}if(t.s(t.f("closeButton",c,p,1),c,p,0,727,994,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <button type=\"button\" class=\"btn btn-");if(t.s(t.f("closeButtonStyle",c,p,1),c,p,0,798,818,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("closeButtonStyle",c,p,0)));});c.pop();}if(!t.s(t.f("closeButtonStyle",c,p,1),c,p,1,0,0,"")){t.b("default");};t.b("\" data-dismiss=\"modal\" data-i18n=\"");t.b(t.v(t.f("closeButtonCaptionI18n",c,p,0)));t.b("\">");t.b(t.v(t.f("closeButtonCaption",c,p,0)));t.b("</button>");t.b("\n" + i);});c.pop();}t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }})
    /* jshint ignore:end */
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    'modal' : r('modal')
  };
});