(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),i=n(29),o=n.n(i),s=(n(67),n(13)),c=n.n(s),l=n(17),u=n(22),p=n(23),d=n(25),f=n(24),h=n(26),g=n(167),m=n(164),v=n(52),w="917849568600-tsfpk9a7ime5mp05mbi2m50pa6dmdvdv.apps.googleusercontent.com",b="AIzaSyC8wpPEEB_lJHis-t6yGkwespbyriKEUas",k=n(54),x=n(48),y=n(163),I=n(166),E=n(162),C=n(168),j=n(30);function D(e){return j(e).format("HH:mm")}var S=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onClick,n=e.tripStartDate,a=e.tripEndDate,i=e.tripStartLocation,o=e.tripEndLocation,s=e.train,c=e.wagon,l=e.seat;return r.a.createElement(g.a,{onClick:t,display:"flex",flexDirection:"row",elevation:"1",padding:8,margin:12,borderBottom:"3px solid #47B881"},r.a.createElement(g.a,{display:"flex",flex:1,alignItems:"center",justifyContent:"center",flexDirection:"column"},r.a.createElement(E.a,{fontWeight:"bold"},i),r.a.createElement(E.a,{size:500},D(n))),r.a.createElement(g.a,{display:"flex",flex:1,alignItems:"center",justifyContent:"center",flexDirection:"column"},r.a.createElement(E.a,{margin:4},j(n).format("DD.MM.YYYY")),r.a.createElement(C.a,{margin:4,icon:"train",color:"#00783E"}),r.a.createElement(E.a,{margin:4},s," / ",c," / ",l)),r.a.createElement(g.a,{display:"flex",flex:1,alignItems:"center",justifyContent:"center",flexDirection:"column"},r.a.createElement(E.a,{fontWeight:"bold"},o),r.a.createElement(E.a,{size:500},D(a))))}}]),t}(a.Component),O=n(55),z=n(35),Q=n(56),A=n(36),R=n(49);function T(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;return e.split(t)[a].split(n)[0]}function U(e,t){var n="".concat(t," ").concat(e);return j(n,"DD.MM.YYYY HH:mm").add(3,"hours")}var M=n(50),Y=n.n(M);function W(){if(!1===gapi.auth2.getAuthInstance().isSignedIn.get())throw new Error("Google API not authenticated")}function B(e){return H.apply(this,arguments)}function H(){return(H=Object(l.a)(c.a.mark(function e(t){var n,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,gapi.client.gmail.users.messages.get({userId:"me",id:t});case 2:return n=e.sent,a=R(n.result),e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function L(){return(L=Object(l.a)(c.a.mark(function e(t,n){var a,r,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,gapi.client.gmail.users.messages.attachments.get({userId:"me",id:n,messageId:t});case 2:return a=e.sent,r=a.result,i=Y.a.toBase64(r.data),e.abrupt("return","data:image/png;base64,".concat(i));case 6:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function q(){return(q=Object(Q.a)(c.a.mark(function e(){var t,n,a,r,i,o,s,l,u;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return W(),e.next=3,Object(z.a)(gapi.client.gmail.users.messages.list({userId:"me",q:"Matkalippu from:tickets@vr.fi"}));case 3:t=e.sent,n=t.result.messages,a=A.chain(n).map("id").slice(0,4).value(),console.log(a),!1,r=0,i=!1;case 10:if(i||!(r<a.length)){e.next=28;break}return e.prev=11,o=a[r],e.next=15,Object(z.a)(B(o));case 15:return s=e.sent,l=F(s.textHtml),u=Object(O.a)({},l,{messageId:o,attachmentId:A.first(s.inline).attachmentId}),e.next=20,u;case 20:e.next=25;break;case 22:e.prev=22,e.t0=e.catch(11),console.error("Failed to parse message",e.t0);case 25:r+=1,e.next=10;break;case 28:case"end":return e.stop()}},e,this,[[11,22]])}))).apply(this,arguments)}function F(e){var t=function(e){var t=T(e,'<td width="90%" valign="top" style="color:#4F5D5D;line-height:1.2;" rowspan="1" colspan="1">',"</td>"),n=T(t,'<span style="font-size:16px;">'," </span>"),a=T(t,'<b style="font-size:16px;">'," \u2192</b>");return{time:n,location:a}}(e),n=function(e){var t=T(e,'<td width="90%" style="color:#4F5D5D;padding-top:5px;" rowspan="1" colspan="1">',"</td>"),n=T(t,'<span style="font-size:16px;line-height:1.2;">'," </span>"),a=T(t,'<b style="font-size:16px;line-height:1.2;">',"</b>");return{time:n,location:a}}(e),a=T(e,'<span style="color:#077f00;">',"</span>",2),r=U(t.time,a),i=U(n.time,a),o=T(e,'<span style="font-size:14px;line-height:1.5;">',","),s=T(e,'<b style="font-size:24px;line-height:1.5;color:#077f00;">'," </b>"),c=T(e,'<b style="font-size:24px;line-height:1.5;color:#077f00;">'," </b>",2),l=T(e,'<span style="font-size:16px;">',"</span>",2);return{from:t.location,to:n.location,startDate:r,endDate:i,train:o,wagon:s,seat:c,type:l}}var J={findMostRelevantTickets:function(){return q.apply(this,arguments)},getQrCodeDataURI:function(e,t){return L.apply(this,arguments)}},G=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={loading:!0,error:null,tickets:[],showingQrCode:!1,qrCodeDataURI:null},n.showQrCodeDialog=function(){var e=Object(l.a)(c.a.mark(function e(t){var a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({showingQrCode:!0}),e.next=3,J.getQrCodeDataURI(t.messageId,t.attachmentId);case 3:a=e.sent,n.setState({qrCodeDataURI:a});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.closeQrCodeDialog=Object(l.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({showingQrCode:!1,qrCodeDataURI:null});case 1:case"end":return e.stop()}},e,this)})),n.fetchTickets=Object(l.a)(c.a.mark(function e(){var t,a,r,i,o,s,l;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({loading:!0,error:null}),e.prev=1,t=!0,a=!1,e.prev=4,i=Object(x.a)(J.findMostRelevantTickets());case 6:return e.next=8,i.next();case 8:return o=e.sent,t=o.done,e.next=12,o.value;case 12:if(s=e.sent,t){e.next=19;break}l=s,n.setState({tickets:Object(k.a)(n.state.tickets).concat([l]),loading:!1,error:null});case 16:t=!0,e.next=6;break;case 19:e.next=25;break;case 21:e.prev=21,e.t0=e.catch(4),a=!0,r=e.t0;case 25:if(e.prev=25,e.prev=26,t||null==i.return){e.next=30;break}return e.next=30,i.return();case 30:if(e.prev=30,!a){e.next=33;break}throw r;case 33:return e.finish(30);case 34:return e.finish(25);case 35:e.next=40;break;case 37:e.prev=37,e.t1=e.catch(1),n.setState({error:e.t1,loading:!1});case 40:case"end":return e.stop()}},e,this,[[1,37],[4,21,25,35],[26,,30,34]])})),n}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchTickets();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,n=t.loading,a=t.error,i=t.tickets,o=t.showingQrCode,s=t.qrCodeDataURI;return n?r.a.createElement(g.a,{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh"},r.a.createElement(y.a,null)):a?r.a.createElement(g.a,null,"Error"):r.a.createElement(g.a,{padding:8},i.map(function(t){return r.a.createElement(S,{tripStartDate:t.startDate,tripStartLocation:t.from,tripEndDate:t.endDate,tripEndLocation:t.to,train:t.train,wagon:t.wagon,seat:t.seat,onClick:function(){return e.showQrCodeDialog({attachmentId:t.attachmentId,messageId:t.messageId})}})}),r.a.createElement(I.a,{isShown:o,title:"Tampere - Tikkurila",onCloseComplete:this.closeQrCodeDialog,hasFooter:!1},r.a.createElement(g.a,{display:"flex",alignItems:"center",justifyContent:"center"},s&&r.a.createElement("img",{src:s,alt:"QR code",height:150,width:150}))))}}]),t}(a.Component),K=w,N=b,P=["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],$="https://www.googleapis.com/auth/gmail.readonly",_=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(f.a)(t).call(this,e))).initClient=Object(l.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,gapi.client.init({apiKey:N,clientId:K,discoveryDocs:P,scope:$});case 2:gapi.auth2.getAuthInstance().isSignedIn.listen(n.updateSigninStatus),n.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());case 4:case"end":return e.stop()}},e,this)})),n.updateSigninStatus=function(){var e=Object(l.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({isSignedIn:t});case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.handleAuthClick=function(e){gapi.auth2.getAuthInstance().signIn()},n.handleSignoutClick=function(e){gapi.auth2.getAuthInstance().signOut()},n.state={isSignedIn:!1},gapi.load("client:auth2",n.initClient),n}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state.isSignedIn;return r.a.createElement(g.a,null,r.a.createElement(g.a,{display:"flex",padding:16,background:"greenTint"},r.a.createElement(g.a,{flex:1,alignItems:"center",display:"flex"},r.a.createElement(m.a,{size:600},"Tickets")),e?r.a.createElement(v.a,{onClick:this.handleSignoutClick},"Sign out"):r.a.createElement(v.a,{intent:"success",appearance:"primary",onClick:this.handleAuthClick},"Sign in")),e&&r.a.createElement(G,null))}}]),t}(a.Component),V=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function X(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available; please refresh."),t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(r.a.createElement(_,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/ticket-finder",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/ticket-finder","/service-worker.js");V?(function(e,t){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):X(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):X(t,e)})}}()},62:function(e,t,n){e.exports=n(153)},67:function(e,t,n){}},[[62,2,1]]]);
//# sourceMappingURL=main.54ffa92e.chunk.js.map