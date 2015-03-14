/*!
 The MIT License (MIT)

 Copyright (c) 2015 popAD, LLC dba Rocket Wagon Labs <lukel99@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
;(function(d){var a=5000;var c=function(f,i,h,g){this.x=f;this.y=i;this.size=h;this.color=g};c.prototype.mapXYToCanvasCoordinates=function(f,i){var h=Math.round((this.x/a)*f);var g=Math.round((this.y/a)*i);return{x:h,y:g}};var e={getRandomStar:function(){var f=Math.floor(Math.random()*(a+1));var j=Math.floor(Math.random()*(a+1));var h=this._getWeightedRandomSize();var g=this._getWeightedRandomColor();var i=this._applyRandomShade(g);return new c(f,j,h,this._getRGBColorString(i))},_getWeightedRandomSize:function(){var g=[1,1.5,2];var f=[0.8,0.15,0.05];return this._getWeightedRandom(g,f)},_getWeightedRandomColor:function(){var g=[{r:255,g:189,b:111},{r:255,g:221,b:180},{r:255,g:244,b:232},{r:251,g:248,b:255},{r:202,g:216,b:255},{r:170,g:191,b:255},{r:155,g:176,b:255}];var f=[0.05,0.05,0.05,0.7,0.05,0.05,0.05];return this._getWeightedRandom(g,f)},_getRandomShade:function(){var g=[0.4,0.6,1];var f=[0.5,0.3,0.2];return this._getWeightedRandom(g,f)},_applyRandomShade:function(g){var f=this._getRandomShade();if(f!==1){g.r=Math.floor(g.r*f);g.g=Math.floor(g.g*f);g.b=Math.floor(g.b*f)}return g},_getRGBColorString:function(f){return"rgb("+f.r+","+f.g+","+f.b+")"},_getWeightedRandom:function(m,l){var k=function(n,i){return Math.random()*(i-n)+n};var g=l.reduce(function(i,n){return i+n});var j=k(0,g);var f=0;for(var h=0;h<m.length;h++){f+=l[h];f=+f.toFixed(2);if(j<=f){return m[h]}}}};var b=[];d.fn.starfield=function(t){var l=d.extend({starDensity:1,mouseScale:1,seedMovement:true},t);$this=d(this);var g=$this.width();var s=$this.height();var f=g*s;var r=0.002*l.starDensity;var j=Math.floor(f*r);if(l.seedMovement){var n=5;var m=5}else{var n=0;var m=0}var h=d('<canvas id="rocketwagon-canvas">').css({position:"absolute",left:0,top:0,width:"100%",height:"100%"}).attr({width:$this.width(),height:$this.height()}).prependTo($this);for(var p=0;p<j;p++){b.push(e.getRandomStar())}var k=function(){d.each(b,function(i,u){var w=u.x-n;var v=u.y-m;if(w<0){w+=a}if(v<0){v+=a}if(w>a){w-=a}if(v>a){v-=a}u.x=w;u.y=v})};var q=function(){var v=document.getElementById("rocketwagon-canvas");var w=v.width;var i=v.height;v.setAttribute("width",w.toString());v.setAttribute("height",i.toString());if(v.getContext){var u=v.getContext("2d");u.clearRect(0,0,w,i);u.fillStyle="black";u.fillRect(0,0,w,i);d.each(b,function(x,z){var y=z.mapXYToCanvasCoordinates(w,i);u.fillStyle=z.color;u.fillRect(y.x,y.y,z.size,z.size)})}};$this.mousemove(function(y){var x=d(this);var z=x.offset();var w=g/2;var v=s/2;var u=((y.pageX-z.left)-w);var i=((y.pageY-z.top)-v);n=Math.round(l.mouseScale*(u/40));m=Math.round(l.mouseScale*(i/40))});(function o(){requestAnimationFrame(o);k();q()})();return this}}(jQuery));