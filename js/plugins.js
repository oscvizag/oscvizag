/**
 * Owl Carousel v2.2.0
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.$element.is(":visible")?(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized"))):!1:!1},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&h+e>b?d=a:"right"===c&&b>h-f-e&&h-f+e>b?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),-1===d},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||1>c?a=d:(0>a||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(0>e),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&i>=d-e&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.leave("animating"),void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}}))},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null);
},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;e>a;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):0>b&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){return g[b]!==d?(e=c?b:!0,!1):void 0}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
!function(t){var e={},l=function(e){var l=[],o=e.dir&&"left"===e.dir?"scrollLeft":"scrollTop";return this.each(function(){var e=t(this);if(this!==document&&this!==window)return!document.scrollingElement||this!==document.documentElement&&this!==document.body?void(e[o]()>0?l.push(this):(e[o](1),e[o]()>0&&l.push(this),e[o](0))):(l.push(document.scrollingElement),!1)}),l.length||this.each(function(){this===document.documentElement&&"smooth"===t(this).css("scrollBehavior")&&(l=[this]),l.length||"BODY"!==this.nodeName||(l=[this])}),"first"===e.el&&l.length>1&&(l=[l[0]]),l},o=/^([\-\+]=)(\d+)/;t.fn.extend({scrollable:function(t){var e=l.call(this,{dir:t});return this.pushStack(e)},firstScrollable:function(t){var e=l.call(this,{el:"first",dir:t});return this.pushStack(e)},smoothScroll:function(e,l){if("options"===(e=e||{}))return l?this.each(function(){var e=t(this),o=t.extend(e.data("ssOpts")||{},l);t(this).data("ssOpts",o)}):this.first().data("ssOpts");var o=t.extend({},t.fn.smoothScroll.defaults,e),s=function(e){var l=function(t){return t.replace(/(:|\.|\/)/g,"\\$1")},s=t(this),n=t.extend({},o,s.data("ssOpts")||{}),r=o.exclude,i=n.excludeWithin,c=0,a=0,h=!0,f={},u=t.smoothScroll.filterPath(location.pathname),d=t.smoothScroll.filterPath(this.pathname),m=location.hostname===this.hostname||!this.hostname,p=n.scrollTarget||d===u,g=l(this.hash);if(g&&!t(g).length&&(h=!1),n.scrollTarget||m&&p&&g){for(;h&&c<r.length;)s.is(l(r[c++]))&&(h=!1);for(;h&&a<i.length;)s.closest(i[a++]).length&&(h=!1)}else h=!1;h&&(n.preventDefault&&e.preventDefault(),t.extend(f,n,{scrollTarget:n.scrollTarget||g,link:this}),t.smoothScroll(f))};return null!==e.delegateSelector?this.off("click.smoothscroll",e.delegateSelector).on("click.smoothscroll",e.delegateSelector,s):this.off("click.smoothscroll").on("click.smoothscroll",s),this}});var s=function(t){var e={relative:""},l="string"==typeof t&&o.exec(t);return"number"==typeof t?e.px=t:l&&(e.relative=l[1],e.px=parseFloat(l[2])||0),e},n=function(e){var l=t(e.scrollTarget);e.autoFocus&&l.length&&(l[0].focus(),l.is(document.activeElement)||(l.prop({tabIndex:-1}),l[0].focus())),e.afterScroll.call(e.link,e)};t.smoothScroll=function(l,o){if("options"===l&&"object"==typeof o)return t.extend(e,o);var r,i,c,a,h=s(l),f=0,u="offset",d="scrollTop",m={},p={};h.px?r=t.extend({link:null},t.fn.smoothScroll.defaults,e):((r=t.extend({link:null},t.fn.smoothScroll.defaults,l||{},e)).scrollElement&&(u="position","static"===r.scrollElement.css("position")&&r.scrollElement.css("position","relative")),o&&(h=s(o))),d="left"===r.direction?"scrollLeft":d,r.scrollElement?(i=r.scrollElement,h.px||/^(?:HTML|BODY)$/.test(i[0].nodeName)||(f=i[d]())):i=t("html, body").firstScrollable(r.direction),r.beforeScroll.call(i,r),a=h.px?h:{relative:"",px:t(r.scrollTarget)[u]()&&t(r.scrollTarget)[u]()[r.direction]||0},m[d]=a.relative+(a.px+f+r.offset),"auto"===(c=r.speed)&&(c=Math.abs(m[d]-i[d]())/r.autoCoefficient),p={duration:c,easing:r.easing,complete:function(){n(r)}},r.step&&(p.step=r.step),i.length?i.stop().animate(m,p):n(r)},t.smoothScroll.version="2.2.0",t.smoothScroll.filterPath=function(t){return(t=t||"").replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},t.fn.smoothScroll.defaults={exclude:[],excludeWithin:[],offset:0,direction:"top",delegateSelector:null,scrollElement:null,scrollTarget:null,autoFocus:!1,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0}}(jQuery);


!function(t){var e={},l=function(e){var l=[],o=e.dir&&"left"===e.dir?"scrollLeft":"scrollTop";return this.each(function(){var e=t(this);if(this!==document&&this!==window)return!document.scrollingElement||this!==document.documentElement&&this!==document.body?void(e[o]()>0?l.push(this):(e[o](1),e[o]()>0&&l.push(this),e[o](0))):(l.push(document.scrollingElement),!1)}),l.length||this.each(function(){this===document.documentElement&&"smooth"===t(this).css("scrollBehavior")&&(l=[this]),l.length||"BODY"!==this.nodeName||(l=[this])}),"first"===e.el&&l.length>1&&(l=[l[0]]),l},o=/^([\-\+]=)(\d+)/;t.fn.extend({scrollable:function(t){var e=l.call(this,{dir:t});return this.pushStack(e)},firstScrollable:function(t){var e=l.call(this,{el:"first",dir:t});return this.pushStack(e)},smoothScroll:function(e,l){if("options"===(e=e||{}))return l?this.each(function(){var e=t(this),o=t.extend(e.data("ssOpts")||{},l);t(this).data("ssOpts",o)}):this.first().data("ssOpts");var o=t.extend({},t.fn.smoothScroll.defaults,e),s=function(e){var l=function(t){return t.replace(/(:|\.|\/)/g,"\\$1")},s=t(this),n=t.extend({},o,s.data("ssOpts")||{}),r=o.exclude,i=n.excludeWithin,c=0,a=0,h=!0,f={},u=t.smoothScroll.filterPath(location.pathname),d=t.smoothScroll.filterPath(this.pathname),m=location.hostname===this.hostname||!this.hostname,p=n.scrollTarget||d===u,g=l(this.hash);if(g&&!t(g).length&&(h=!1),n.scrollTarget||m&&p&&g){for(;h&&c<r.length;)s.is(l(r[c++]))&&(h=!1);for(;h&&a<i.length;)s.closest(i[a++]).length&&(h=!1)}else h=!1;h&&(n.preventDefault&&e.preventDefault(),t.extend(f,n,{scrollTarget:n.scrollTarget||g,link:this}),t.smoothScroll(f))};return null!==e.delegateSelector?this.off("click.smoothscroll",e.delegateSelector).on("click.smoothscroll",e.delegateSelector,s):this.off("click.smoothscroll").on("click.smoothscroll",s),this}});var s=function(t){var e={relative:""},l="string"==typeof t&&o.exec(t);return"number"==typeof t?e.px=t:l&&(e.relative=l[1],e.px=parseFloat(l[2])||0),e},n=function(e){var l=t(e.scrollTarget);e.autoFocus&&l.length&&(l[0].focus(),l.is(document.activeElement)||(l.prop({tabIndex:-1}),l[0].focus())),e.afterScroll.call(e.link,e)};t.smoothScroll=function(l,o){if("options"===l&&"object"==typeof o)return t.extend(e,o);var r,i,c,a,h=s(l),f=0,u="offset",d="scrollTop",m={},p={};h.px?r=t.extend({link:null},t.fn.smoothScroll.defaults,e):((r=t.extend({link:null},t.fn.smoothScroll.defaults,l||{},e)).scrollElement&&(u="position","static"===r.scrollElement.css("position")&&r.scrollElement.css("position","relative")),o&&(h=s(o))),d="left"===r.direction?"scrollLeft":d,r.scrollElement?(i=r.scrollElement,h.px||/^(?:HTML|BODY)$/.test(i[0].nodeName)||(f=i[d]())):i=t("html, body").firstScrollable(r.direction),r.beforeScroll.call(i,r),a=h.px?h:{relative:"",px:t(r.scrollTarget)[u]()&&t(r.scrollTarget)[u]()[r.direction]||0},m[d]=a.relative+(a.px+f+r.offset),"auto"===(c=r.speed)&&(c=Math.abs(m[d]-i[d]())/r.autoCoefficient),p={duration:c,easing:r.easing,complete:function(){n(r)}},r.step&&(p.step=r.step),i.length?i.stop().animate(m,p):n(r)},t.smoothScroll.version="2.2.0",t.smoothScroll.filterPath=function(t){return(t=t||"").replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},t.fn.smoothScroll.defaults={exclude:[],excludeWithin:[],offset:0,direction:"top",delegateSelector:null,scrollElement:null,scrollTarget:null,autoFocus:!1,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0}}(jQuery);


!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?t(require("jquery")):t(jQuery)}(function(t){var e=function(o,i){this.$element=t(o),this.options=t.extend({},e.DEFAULTS,this.dataOptions(),i),this.init()};e.DEFAULTS={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:function(t,e){return t.toFixed(e.decimals)},onUpdate:null,onComplete:null},e.prototype.init=function(){this.value=this.options.from,this.loops=Math.ceil(this.options.speed/this.options.refreshInterval),this.loopCount=0,this.increment=(this.options.to-this.options.from)/this.loops},e.prototype.dataOptions=function(){var t={from:this.$element.data("from"),to:this.$element.data("to"),speed:this.$element.data("speed"),refreshInterval:this.$element.data("refresh-interval"),decimals:this.$element.data("decimals")},e=Object.keys(t);for(var o in e){var i=e[o];void 0===t[i]&&delete t[i]}return t},e.prototype.update=function(){this.value+=this.increment,this.loopCount++,this.render(),"function"==typeof this.options.onUpdate&&this.options.onUpdate.call(this.$element,this.value),this.loopCount>=this.loops&&(clearInterval(this.interval),this.value=this.options.to,"function"==typeof this.options.onComplete&&this.options.onComplete.call(this.$element,this.value))},e.prototype.render=function(){var t=this.options.formatter.call(this.$element,this.value,this.options);this.$element.text(t)},e.prototype.restart=function(){this.stop(),this.init(),this.start()},e.prototype.start=function(){this.stop(),this.render(),this.interval=setInterval(this.update.bind(this),this.options.refreshInterval)},e.prototype.stop=function(){this.interval&&clearInterval(this.interval)},e.prototype.toggle=function(){this.interval?this.stop():this.start()},t.fn.countTo=function(o){return this.each(function(){var i=t(this),n=i.data("countTo"),s="object"==typeof o?o:{},r="string"==typeof o?o:"start";(!n||"object"==typeof o)&&(n&&n.stop(),i.data("countTo",n=new e(this,s))),n[r].call(n)})}});
!function(t,e){"use strict";t.MixItUp=function(){this._execAction("_constructor",0),t.extend(this,{selectors:{target:".mix",filter:".filter",sort:".sort"},animation:{enable:!0,effects:"fade scale",duration:600,easing:"ease",perspectiveDistance:"3000",perspectiveOrigin:"50% 50%",queue:!0,queueLimit:1,animateChangeLayout:!1,animateResizeContainer:!0,animateResizeTargets:!1,staggerSequence:!1,reverseOut:!1},callbacks:{onMixLoad:!1,onMixStart:!1,onMixBusy:!1,onMixEnd:!1,onMixFail:!1,_user:!1},controls:{enable:!0,live:!1,toggleFilterButtons:!1,toggleLogic:"or",activeClass:"active"},layout:{display:"inline-block",containerClass:"",containerClassFail:"fail"},load:{filter:"all",sort:!1},_$body:null,_$container:null,_$targets:null,_$parent:null,_$sortButtons:null,_$filterButtons:null,_suckMode:!1,_mixing:!1,_sorting:!1,_clicking:!1,_loading:!0,_changingLayout:!1,_changingClass:!1,_changingDisplay:!1,_origOrder:[],_startOrder:[],_newOrder:[],_activeFilter:null,_toggleArray:[],_toggleString:"",_activeSort:"default:asc",_newSort:null,_startHeight:null,_newHeight:null,_incPadding:!0,_newDisplay:null,_newClass:null,_targetsBound:0,_targetsDone:0,_queue:[],_$show:t(),_$hide:t()}),this._execAction("_constructor",1)},t.MixItUp.prototype={constructor:t.MixItUp,_instances:{},_handled:{_filter:{},_sort:{}},_bound:{_filter:{},_sort:{}},_actions:{},_filters:{},extend:function(e){for(var i in e)t.MixItUp.prototype[i]=e[i]},addAction:function(e,i,s,a){t.MixItUp.prototype._addHook("_actions",e,i,s,a)},addFilter:function(e,i,s,a){t.MixItUp.prototype._addHook("_filters",e,i,s,a)},_addHook:function(e,i,s,a,n){var r=t.MixItUp.prototype[e],o={};n=1===n||"post"===n?"post":"pre",o[i]={},o[i][n]={},o[i][n][s]=a,t.extend(!0,r,o)},_init:function(e,i){if(this._execAction("_init",0,arguments),i&&t.extend(!0,this,i),this._$body=t("body"),this._domNode=e,this._$container=t(e),this._$container.addClass(this.layout.containerClass),this._id=e.id,this._platformDetect(),this._brake=this._getPrefixedCSS("transition","none"),this._refresh(!0),this._$parent=this._$targets.parent().length?this._$targets.parent():this._$container,this.load.sort&&(this._newSort=this._parseSort(this.load.sort),this._newSortString=this.load.sort,this._activeSort=this.load.sort,this._sort(),this._printSort()),this._activeFilter="all"===this.load.filter?this.selectors.target:"none"===this.load.filter?"":this.load.filter,this.controls.enable&&this._bindHandlers(),this.controls.toggleFilterButtons){this._buildToggleArray();for(var s=0;s<this._toggleArray.length;s++)this._updateControls({filter:this._toggleArray[s],sort:this._activeSort},!0)}else this.controls.enable&&this._updateControls({filter:this._activeFilter,sort:this._activeSort});this._filter(),this._init=!0,this._$container.data("mixItUp",this),this._execAction("_init",1,arguments),this._buildState(),this._$targets.css(this._brake),this._goMix(this.animation.enable)},_platformDetect:function(){var t=["Webkit","Moz","O","ms"],i=["webkit","moz"],s=window.navigator.appVersion.match(/Chrome\/(\d+)\./)||!1,a="undefined"!=typeof InstallTrigger,n=function(e){for(var i=0;i<t.length;i++)if(t[i]+"Transition"in e.style)return{prefix:"-"+t[i].toLowerCase()+"-",vendor:t[i]};return"transition"in e.style&&""}(this._domNode);this._execAction("_platformDetect",0),this._chrome=!!s&&parseInt(s[1],10),this._ff=!!a&&parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]),this._prefix=n.prefix,this._vendor=n.vendor,this._suckMode=!window.atob||!this._prefix,this._suckMode&&(this.animation.enable=!1),this._ff&&this._ff<=4&&(this.animation.enable=!1);for(var r=0;r<i.length&&!window.requestAnimationFrame;r++)window.requestAnimationFrame=window[i[r]+"RequestAnimationFrame"];"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"==typeof"test".__proto__?function(t){return t.__proto__}:function(t){return t.constructor.prototype}),this._domNode.nextElementSibling===e&&Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var t=this.nextSibling;t;){if(1===t.nodeType)return t;t=t.nextSibling}return null}}),this._execAction("_platformDetect",1)},_refresh:function(t,i){this._execAction("_refresh",0,arguments),this._$targets=this._$container.find(this.selectors.target);for(var s=0;s<this._$targets.length;s++){if((c=this._$targets[s]).dataset===e||i){c.dataset={};for(var a=0;a<c.attributes.length;a++){var n=c.attributes[a],r=n.name,o=n.value;if(r.indexOf("data-")>-1){var l=this._helpers._camelCase(r.substring(5,r.length));c.dataset[l]=o}}}c.mixParent===e&&(c.mixParent=this._id)}if(this._$targets.length&&t||!this._origOrder.length&&this._$targets.length){this._origOrder=[];for(s=0;s<this._$targets.length;s++){var c=this._$targets[s];this._origOrder.push(c)}}this._execAction("_refresh",1,arguments)},_bindHandlers:function(){var i=this,s=t.MixItUp.prototype._bound._filter,a=t.MixItUp.prototype._bound._sort;i._execAction("_bindHandlers",0),i.controls.live?i._$body.on("click.mixItUp."+i._id,i.selectors.sort,function(){i._processClick(t(this),"sort")}).on("click.mixItUp."+i._id,i.selectors.filter,function(){i._processClick(t(this),"filter")}):(i._$sortButtons=t(i.selectors.sort),i._$filterButtons=t(i.selectors.filter),i._$sortButtons.on("click.mixItUp."+i._id,function(){i._processClick(t(this),"sort")}),i._$filterButtons.on("click.mixItUp."+i._id,function(){i._processClick(t(this),"filter")})),s[i.selectors.filter]=s[i.selectors.filter]===e?1:s[i.selectors.filter]+1,a[i.selectors.sort]=a[i.selectors.sort]===e?1:a[i.selectors.sort]+1,i._execAction("_bindHandlers",1)},_processClick:function(i,s){var a=this,n=function(i,s,n){var r=t.MixItUp.prototype;r._handled["_"+s][a.selectors[s]]=r._handled["_"+s][a.selectors[s]]===e?1:r._handled["_"+s][a.selectors[s]]+1,r._handled["_"+s][a.selectors[s]]===r._bound["_"+s][a.selectors[s]]&&(i[(n?"remove":"add")+"Class"](a.controls.activeClass),delete r._handled["_"+s][a.selectors[s]])};if(a._execAction("_processClick",0,arguments),!a._mixing||a.animation.queue&&a._queue.length<a.animation.queueLimit){if(a._clicking=!0,"sort"===s){var r=i.attr("data-sort");(!i.hasClass(a.controls.activeClass)||r.indexOf("random")>-1)&&(t(a.selectors.sort).removeClass(a.controls.activeClass),n(i,s),a.sort(r))}if("filter"===s){var o,l=i.attr("data-filter"),c="or"===a.controls.toggleLogic?",":"";a.controls.toggleFilterButtons?(a._buildToggleArray(),i.hasClass(a.controls.activeClass)?(n(i,s,!0),o=a._toggleArray.indexOf(l),a._toggleArray.splice(o,1)):(n(i,s),a._toggleArray.push(l)),a._toggleArray=t.grep(a._toggleArray,function(t){return t}),a._toggleString=a._toggleArray.join(c),a.filter(a._toggleString)):i.hasClass(a.controls.activeClass)||(t(a.selectors.filter).removeClass(a.controls.activeClass),n(i,s),a.filter(l))}a._execAction("_processClick",1,arguments)}else"function"==typeof a.callbacks.onMixBusy&&a.callbacks.onMixBusy.call(a._domNode,a._state,a),a._execAction("_processClickBusy",1,arguments)},_buildToggleArray:function(){var t=this._activeFilter.replace(/\s/g,"");if(this._execAction("_buildToggleArray",0,arguments),"or"===this.controls.toggleLogic)this._toggleArray=t.split(",");else{this._toggleArray=t.split("."),!this._toggleArray[0]&&this._toggleArray.shift();for(var e,i=0;e=this._toggleArray[i];i++)this._toggleArray[i]="."+e}this._execAction("_buildToggleArray",1,arguments)},_updateControls:function(i,s){var a=this,n={filter:i.filter,sort:i.sort},r=function(t,e){try{s&&"filter"===o&&"none"!==n.filter&&""!==n.filter?t.filter(e).addClass(a.controls.activeClass):t.removeClass(a.controls.activeClass).filter(e).addClass(a.controls.activeClass)}catch(t){}},o="filter",l=null;a._execAction("_updateControls",0,arguments),i.filter===e&&(n.filter=a._activeFilter),i.sort===e&&(n.sort=a._activeSort),n.filter===a.selectors.target&&(n.filter="all");for(var c=0;c<2;c++)(l=a.controls.live?t(a.selectors[o]):a["_$"+o+"Buttons"])&&r(l,"[data-"+o+'="'+n[o]+'"]'),o="sort";a._execAction("_updateControls",1,arguments)},_filter:function(){this._execAction("_filter",0);for(var e=0;e<this._$targets.length;e++){var i=t(this._$targets[e]);i.is(this._activeFilter)?this._$show=this._$show.add(i):this._$hide=this._$hide.add(i)}this._execAction("_filter",1)},_sort:function(){var t=this;t._execAction("_sort",0),t._startOrder=[];for(var e=0;e<t._$targets.length;e++){var i=t._$targets[e];t._startOrder.push(i)}switch(t._newSort[0].sortBy){case"default":t._newOrder=t._origOrder;break;case"random":t._newOrder=function(t){for(var e=t.slice(),i=e.length,s=i;s--;){var a=parseInt(Math.random()*i),n=e[s];e[s]=e[a],e[a]=n}return e}(t._startOrder);break;case"custom":t._newOrder=t._newSort[0].order;break;default:t._newOrder=t._startOrder.concat().sort(function(e,i){return t._compare(e,i)})}t._execAction("_sort",1)},_compare:function(t,e,i){i=i||0;var s=this,a=s._newSort[i].order,n=function(t){return t.dataset[s._newSort[i].sortBy]||0},r=isNaN(1*n(t))?n(t).toLowerCase():1*n(t),o=isNaN(1*n(e))?n(e).toLowerCase():1*n(e);return r<o?"asc"===a?-1:1:r>o?"asc"===a?1:-1:r===o&&s._newSort.length>i+1?s._compare(t,e,i+1):0},_printSort:function(t){var e=t?this._startOrder:this._newOrder,i=this._$parent[0].querySelectorAll(this.selectors.target),s=i.length?i[i.length-1].nextElementSibling:null,a=document.createDocumentFragment();this._execAction("_printSort",0,arguments);for(var n=0;n<i.length;n++){var r=i[n],o=r.nextSibling;"absolute"!==r.style.position&&(o&&"#text"===o.nodeName&&this._$parent[0].removeChild(o),this._$parent[0].removeChild(r))}for(n=0;n<e.length;n++){var l=e[n];if("default"!==this._newSort[0].sortBy||"desc"!==this._newSort[0].order||t)a.appendChild(l),a.appendChild(document.createTextNode(" "));else{var c=a.firstChild;a.insertBefore(l,c),a.insertBefore(document.createTextNode(" "),l)}}s?this._$parent[0].insertBefore(a,s):this._$parent[0].appendChild(a),this._execAction("_printSort",1,arguments)},_parseSort:function(t){for(var e="string"==typeof t?t.split(" "):[t],i=[],s=0;s<e.length;s++){var a="string"==typeof t?e[s].split(":"):["custom",e[s]],n={sortBy:this._helpers._camelCase(a[0]),order:a[1]||"asc"};if(i.push(n),"default"===n.sortBy||"random"===n.sortBy)break}return this._execFilter("_parseSort",i,arguments)},_parseEffects:function(){var t=this,e={opacity:"",transformIn:"",transformOut:"",filter:""},i=function(e,i,s){if(t.animation.effects.indexOf(e)>-1){if(i){var a=t.animation.effects.indexOf(e+"(");if(a>-1){var n=t.animation.effects.substring(a);return{val:/\(([^)]+)\)/.exec(n)[1]}}}return!0}return!1},s=function(t,e){return e?"-"===t.charAt(0)?t.substr(1,t.length):"-"+t:t},a=function(t,a){for(var n=[["scale",".01"],["translateX","20px"],["translateY","20px"],["translateZ","20px"],["rotateX","90deg"],["rotateY","90deg"],["rotateZ","180deg"]],r=0;r<n.length;r++){var o=n[r][0],l=n[r][1],c=a&&"scale"!==o;e[t]+=i(o)?o+"("+s(i(o,!0).val||l,c)+") ":""}};return e.opacity=i("fade")?i("fade",!0).val||"0":"1",a("transformIn"),t.animation.reverseOut?a("transformOut",!0):e.transformOut=e.transformIn,e.transition={},e.transition=t._getPrefixedCSS("transition","all "+t.animation.duration+"ms "+t.animation.easing+", opacity "+t.animation.duration+"ms linear"),t.animation.stagger=!!i("stagger"),t.animation.staggerDuration=parseInt(i("stagger")&&i("stagger",!0).val?i("stagger",!0).val:100),t._execFilter("_parseEffects",e)},_buildState:function(t){var e;if(this._execAction("_buildState",0),e={activeFilter:""===this._activeFilter?"none":this._activeFilter,activeSort:t&&this._newSortString?this._newSortString:this._activeSort,fail:!this._$show.length&&""!==this._activeFilter,$targets:this._$targets,$show:this._$show,$hide:this._$hide,totalTargets:this._$targets.length,totalShow:this._$show.length,totalHide:this._$hide.length,display:t&&this._newDisplay?this._newDisplay:this.layout.display},t)return this._execFilter("_buildState",e);this._state=e,this._execAction("_buildState",1)},_goMix:function(t){var e=this,i=function(){e._chrome&&31===e._chrome&&n(e._$parent[0]),e._setInter(),s()},s=function(){var t=window.pageYOffset,i=window.pageXOffset;document.documentElement.scrollHeight;e._getInterMixData(),e._setFinal(),e._getFinalMixData(),window.pageYOffset!==t&&window.scrollTo(i,t),e._prepTargets(),window.requestAnimationFrame?requestAnimationFrame(a):setTimeout(function(){a()},20)},a=function(){e._animateTargets(),0===e._targetsBound&&e._cleanUp()},n=function(t){var e=t.parentElement,i=document.createElement("div"),s=document.createDocumentFragment();e.insertBefore(i,t),s.appendChild(t),e.replaceChild(t,i)},r=e._buildState(!0);e._execAction("_goMix",0,arguments),!e.animation.duration&&(t=!1),e._mixing=!0,e._$container.removeClass(e.layout.containerClassFail),"function"==typeof e.callbacks.onMixStart&&e.callbacks.onMixStart.call(e._domNode,e._state,r,e),e._$container.trigger("mixStart",[e._state,r,e]),e._getOrigMixData(),t&&!e._suckMode?window.requestAnimationFrame?requestAnimationFrame(i):i():e._cleanUp(),e._execAction("_goMix",1,arguments)},_getTargetData:function(t,e){var i;t.dataset[e+"PosX"]=t.offsetLeft,t.dataset[e+"PosY"]=t.offsetTop,this.animation.animateResizeTargets&&(i=this._suckMode?{marginBottom:"",marginRight:""}:window.getComputedStyle(t),t.dataset[e+"MarginBottom"]=parseInt(i.marginBottom),t.dataset[e+"MarginRight"]=parseInt(i.marginRight),t.dataset[e+"Width"]=t.offsetWidth,t.dataset[e+"Height"]=t.offsetHeight)},_getOrigMixData:function(){var t=this._suckMode?{boxSizing:""}:window.getComputedStyle(this._$parent[0]),e=t.boxSizing||t[this._vendor+"BoxSizing"];this._incPadding="border-box"===e,this._execAction("_getOrigMixData",0),!this._suckMode&&(this.effects=this._parseEffects()),this._$toHide=this._$hide.filter(":visible"),this._$toShow=this._$show.filter(":hidden"),this._$pre=this._$targets.filter(":visible"),this._startHeight=this._incPadding?this._$parent.outerHeight():this._$parent.height();for(var i=0;i<this._$pre.length;i++){var s=this._$pre[i];this._getTargetData(s,"orig")}this._execAction("_getOrigMixData",1)},_setInter:function(){this._execAction("_setInter",0),this._changingLayout&&this.animation.animateChangeLayout?(this._$toShow.css("display",this._newDisplay),this._changingClass&&this._$container.removeClass(this.layout.containerClass).addClass(this._newClass)):this._$toShow.css("display",this.layout.display),this._execAction("_setInter",1)},_getInterMixData:function(){this._execAction("_getInterMixData",0);for(var t=0;t<this._$toShow.length;t++){var e=this._$toShow[t];this._getTargetData(e,"inter")}for(t=0;t<this._$pre.length;t++){e=this._$pre[t];this._getTargetData(e,"inter")}this._execAction("_getInterMixData",1)},_setFinal:function(){this._execAction("_setFinal",0),this._sorting&&this._printSort(),this._$toHide.removeStyle("display"),this._changingLayout&&this.animation.animateChangeLayout&&this._$pre.css("display",this._newDisplay),this._execAction("_setFinal",1)},_getFinalMixData:function(){this._execAction("_getFinalMixData",0);for(var t=0;t<this._$toShow.length;t++){var e=this._$toShow[t];this._getTargetData(e,"final")}for(t=0;t<this._$pre.length;t++){e=this._$pre[t];this._getTargetData(e,"final")}this._newHeight=this._incPadding?this._$parent.outerHeight():this._$parent.height(),this._sorting&&this._printSort(!0),this._$toShow.removeStyle("display"),this._$pre.css("display",this.layout.display),this._changingClass&&this.animation.animateChangeLayout&&this._$container.removeClass(this._newClass).addClass(this.layout.containerClass),this._execAction("_getFinalMixData",1)},_prepTargets:function(){var e={_in:this._getPrefixedCSS("transform",this.effects.transformIn),_out:this._getPrefixedCSS("transform",this.effects.transformOut)};this._execAction("_prepTargets",0),this.animation.animateResizeContainer&&this._$parent.css("height",this._startHeight+"px");for(var i=0;i<this._$toShow.length;i++){var s=this._$toShow[i],a=t(s);s.style.opacity=this.effects.opacity,s.style.display=this._changingLayout&&this.animation.animateChangeLayout?this._newDisplay:this.layout.display,a.css(e._in),this.animation.animateResizeTargets&&(s.style.width=s.dataset.finalWidth+"px",s.style.height=s.dataset.finalHeight+"px",s.style.marginRight=-(s.dataset.finalWidth-s.dataset.interWidth)+1*s.dataset.finalMarginRight+"px",s.style.marginBottom=-(s.dataset.finalHeight-s.dataset.interHeight)+1*s.dataset.finalMarginBottom+"px")}for(i=0;i<this._$pre.length;i++){s=this._$pre[i],a=t(s);var n={x:s.dataset.origPosX-s.dataset.interPosX,y:s.dataset.origPosY-s.dataset.interPosY};e=this._getPrefixedCSS("transform","translate("+n.x+"px,"+n.y+"px)");a.css(e),this.animation.animateResizeTargets&&(s.style.width=s.dataset.origWidth+"px",s.style.height=s.dataset.origHeight+"px",s.dataset.origWidth-s.dataset.finalWidth&&(s.style.marginRight=-(s.dataset.origWidth-s.dataset.interWidth)+1*s.dataset.origMarginRight+"px"),s.dataset.origHeight-s.dataset.finalHeight&&(s.style.marginBottom=-(s.dataset.origHeight-s.dataset.interHeight)+1*s.dataset.origMarginBottom+"px"))}this._execAction("_prepTargets",1)},_animateTargets:function(){this._execAction("_animateTargets",0),this._targetsDone=0,this._targetsBound=0,this._$parent.css(this._getPrefixedCSS("perspective",this.animation.perspectiveDistance+"px")).css(this._getPrefixedCSS("perspective-origin",this.animation.perspectiveOrigin)),this.animation.animateResizeContainer&&this._$parent.css(this._getPrefixedCSS("transition","height "+this.animation.duration+"ms ease")).css("height",this._newHeight+"px");for(var e=0;e<this._$toShow.length;e++){var i=this._$toShow[e],s=t(i),a={x:i.dataset.finalPosX-i.dataset.interPosX,y:i.dataset.finalPosY-i.dataset.interPosY},n=this._getDelay(e),r={};i.style.opacity="";for(var o=0;o<2;o++){var l=0===o?l=this._prefix:"";this._ff&&this._ff<=20&&(r[l+"transition-property"]="all",r[l+"transition-timing-function"]=this.animation.easing+"ms",r[l+"transition-duration"]=this.animation.duration+"ms"),r[l+"transition-delay"]=n+"ms",r[l+"transform"]="translate("+a.x+"px,"+a.y+"px)"}(this.effects.transform||this.effects.opacity)&&this._bindTargetDone(s),this._ff&&this._ff<=20?s.css(r):s.css(this.effects.transition).css(r)}for(e=0;e<this._$pre.length;e++){i=this._$pre[e],s=t(i),a={x:i.dataset.finalPosX-i.dataset.interPosX,y:i.dataset.finalPosY-i.dataset.interPosY},n=this._getDelay(e);i.dataset.finalPosX===i.dataset.origPosX&&i.dataset.finalPosY===i.dataset.origPosY||this._bindTargetDone(s),s.css(this._getPrefixedCSS("transition","all "+this.animation.duration+"ms "+this.animation.easing+" "+n+"ms")),s.css(this._getPrefixedCSS("transform","translate("+a.x+"px,"+a.y+"px)")),this.animation.animateResizeTargets&&(i.dataset.origWidth-i.dataset.finalWidth&&1*i.dataset.finalWidth&&(i.style.width=i.dataset.finalWidth+"px",i.style.marginRight=-(i.dataset.finalWidth-i.dataset.interWidth)+1*i.dataset.finalMarginRight+"px"),i.dataset.origHeight-i.dataset.finalHeight&&1*i.dataset.finalHeight&&(i.style.height=i.dataset.finalHeight+"px",i.style.marginBottom=-(i.dataset.finalHeight-i.dataset.interHeight)+1*i.dataset.finalMarginBottom+"px"))}this._changingClass&&this._$container.removeClass(this.layout.containerClass).addClass(this._newClass);for(e=0;e<this._$toHide.length;e++){i=this._$toHide[e],s=t(i),n=this._getDelay(e);var c={};for(o=0;o<2;o++){c[(l=0===o?l=this._prefix:"")+"transition-delay"]=n+"ms",c[l+"transform"]=this.effects.transformOut,c.opacity=this.effects.opacity}s.css(this.effects.transition).css(c),(this.effects.transform||this.effects.opacity)&&this._bindTargetDone(s)}this._execAction("_animateTargets",1)},_bindTargetDone:function(e){var i=this,s=e[0];i._execAction("_bindTargetDone",0,arguments),s.dataset.bound||(s.dataset.bound=!0,i._targetsBound++,e.on("webkitTransitionEnd.mixItUp transitionend.mixItUp",function(a){(a.originalEvent.propertyName.indexOf("transform")>-1||a.originalEvent.propertyName.indexOf("opacity")>-1)&&t(a.originalEvent.target).is(i.selectors.target)&&(e.off(".mixItUp"),delete s.dataset.bound,i._targetDone())})),i._execAction("_bindTargetDone",1,arguments)},_targetDone:function(){this._execAction("_targetDone",0),this._targetsDone++,this._targetsDone===this._targetsBound&&this._cleanUp(),this._execAction("_targetDone",1)},_cleanUp:function(){var e=this,i=e.animation.animateResizeTargets?"transform opacity width height margin-bottom margin-right":"transform opacity";e._execAction("_cleanUp",0),e._changingLayout?e._$show.css("display",e._newDisplay):e._$show.css("display",e.layout.display),e._$targets.css(e._brake),e._$targets.removeStyle(i,e._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),e._$hide.removeStyle("display"),e._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",e._prefix),e._sorting&&(e._printSort(),e._activeSort=e._newSortString,e._sorting=!1),e._changingLayout&&(e._changingDisplay&&(e.layout.display=e._newDisplay,e._changingDisplay=!1),e._changingClass&&(e._$parent.removeClass(e.layout.containerClass).addClass(e._newClass),e.layout.containerClass=e._newClass,e._changingClass=!1),e._changingLayout=!1),e._refresh(),e._buildState(),e._state.fail&&e._$container.addClass(e.layout.containerClassFail),e._$show=t(),e._$hide=t(),window.requestAnimationFrame&&requestAnimationFrame(function(){e._$targets.removeStyle("transition",e._prefix)}),e._mixing=!1,"function"==typeof e.callbacks._user&&e.callbacks._user.call(e._domNode,e._state,e),"function"==typeof e.callbacks.onMixEnd&&e.callbacks.onMixEnd.call(e._domNode,e._state,e),e._$container.trigger("mixEnd",[e._state,e]),e._state.fail&&("function"==typeof e.callbacks.onMixFail&&e.callbacks.onMixFail.call(e._domNode,e._state,e),e._$container.trigger("mixFail",[e._state,e])),e._loading&&("function"==typeof e.callbacks.onMixLoad&&e.callbacks.onMixLoad.call(e._domNode,e._state,e),e._$container.trigger("mixLoad",[e._state,e])),e._queue.length&&(e._execAction("_queue",0),e.multiMix(e._queue[0][0],e._queue[0][1],e._queue[0][2]),e._queue.splice(0,1)),e._execAction("_cleanUp",1),e._loading=!1},_getPrefixedCSS:function(t,e,i){var s={},a="",n=-1;for(n=0;n<2;n++)s[(a=0===n?this._prefix:"")+t]=i?a+e:e;return this._execFilter("_getPrefixedCSS",s,arguments)},_getDelay:function(t){var e="function"==typeof this.animation.staggerSequence?this.animation.staggerSequence.call(this._domNode,t,this._state):t,i=this.animation.stagger?e*this.animation.staggerDuration:0;return this._execFilter("_getDelay",i,arguments)},_parseMultiMixArgs:function(t){for(var e={command:null,animate:this.animation.enable,callback:null},i=0;i<t.length;i++){var s=t[i];null!==s&&("object"==typeof s||"string"==typeof s?e.command=s:"boolean"==typeof s?e.animate=s:"function"==typeof s&&(e.callback=s))}return this._execFilter("_parseMultiMixArgs",e,arguments)},_parseInsertArgs:function(e){for(var i={index:0,$object:t(),multiMix:{filter:this._state.activeFilter},callback:null},s=0;s<e.length;s++){var a=e[s];"number"==typeof a?i.index=a:"object"==typeof a&&a instanceof t?i.$object=a:"object"==typeof a&&this._helpers._isElement(a)?i.$object=t(a):"object"==typeof a&&null!==a?i.multiMix=a:"boolean"!=typeof a||a?"function"==typeof a&&(i.callback=a):i.multiMix=!1}return this._execFilter("_parseInsertArgs",i,arguments)},_execAction:function(t,e,i){var s=e?"post":"pre";if(!this._actions.isEmptyObject&&this._actions.hasOwnProperty(t))for(var a in this._actions[t][s])this._actions[t][s][a].call(this,i)},_execFilter:function(t,e,i){if(this._filters.isEmptyObject||!this._filters.hasOwnProperty(t))return e;for(var s in this._filters[t])return this._filters[t][s].call(this,i)},_helpers:{_camelCase:function(t){return t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},_isElement:function(t){return window.HTMLElement?t instanceof HTMLElement:null!==t&&1===t.nodeType&&"string"===t.nodeName}},isMixing:function(){return this._execFilter("isMixing",this._mixing)},filter:function(){var t=this._parseMultiMixArgs(arguments);this._clicking&&(this._toggleString=""),this.multiMix({filter:t.command},t.animate,t.callback)},sort:function(){var t=this._parseMultiMixArgs(arguments);this.multiMix({sort:t.command},t.animate,t.callback)},changeLayout:function(){var t=this._parseMultiMixArgs(arguments);this.multiMix({changeLayout:t.command},t.animate,t.callback)},multiMix:function(){var t=this._parseMultiMixArgs(arguments);if(this._execAction("multiMix",0,arguments),this._mixing)this.animation.queue&&this._queue.length<this.animation.queueLimit?(this._queue.push(arguments),this.controls.enable&&!this._clicking&&this._updateControls(t.command),this._execAction("multiMixQueue",1,arguments)):("function"==typeof this.callbacks.onMixBusy&&this.callbacks.onMixBusy.call(this._domNode,this._state,this),this._$container.trigger("mixBusy",[this._state,this]),this._execAction("multiMixBusy",1,arguments));else{this.controls.enable&&!this._clicking&&(this.controls.toggleFilterButtons&&this._buildToggleArray(),this._updateControls(t.command,this.controls.toggleFilterButtons)),this._queue.length<2&&(this._clicking=!1),delete this.callbacks._user,t.callback&&(this.callbacks._user=t.callback);var i=t.command.sort,s=t.command.filter,a=t.command.changeLayout;this._refresh(),i&&(this._newSort=this._parseSort(i),this._newSortString=i,this._sorting=!0,this._sort()),s!==e&&(s="all"===s?this.selectors.target:s,this._activeFilter=s),this._filter(),a&&(this._newDisplay="string"==typeof a?a:a.display||this.layout.display,this._newClass=a.containerClass||"",this._newDisplay===this.layout.display&&this._newClass===this.layout.containerClass||(this._changingLayout=!0,this._changingClass=this._newClass!==this.layout.containerClass,this._changingDisplay=this._newDisplay!==this.layout.display)),this._$targets.css(this._brake),this._goMix(t.animate^this.animation.enable?t.animate:this.animation.enable),this._execAction("multiMix",1,arguments)}},insert:function(){var t=this,e=t._parseInsertArgs(arguments),i="function"==typeof e.callback?e.callback:null,s=document.createDocumentFragment(),a=(t._refresh(),t._$targets.length?e.index<t._$targets.length||!t._$targets.length?t._$targets[e.index]:t._$targets[t._$targets.length-1].nextElementSibling:t._$parent[0].children[0]);if(t._execAction("insert",0,arguments),e.$object){for(var n=0;n<e.$object.length;n++){var r=e.$object[n];s.appendChild(r),s.appendChild(document.createTextNode(" "))}t._$parent[0].insertBefore(s,a)}t._execAction("insert",1,arguments),"object"==typeof e.multiMix&&t.multiMix(e.multiMix,i)},prepend:function(){var t=this._parseInsertArgs(arguments);this.insert(0,t.$object,t.multiMix,t.callback)},append:function(){var t=this._parseInsertArgs(arguments);this.insert(this._state.totalTargets,t.$object,t.multiMix,t.callback)},getOption:function(t){return t?this._execFilter("getOption",function(t,i){for(var s=i.split("."),a=s.pop(),n=s.length,r=1,o=s[0]||i;(t=t[o])&&r<n;)o=s[r],r++;if(t!==e)return t[a]!==e?t[a]:t}(this,t),arguments):this},setOptions:function(e){this._execAction("setOptions",0,arguments),"object"==typeof e&&t.extend(!0,this,e),this._execAction("setOptions",1,arguments)},getState:function(){return this._execFilter("getState",this._state,this)},forceRefresh:function(){this._refresh(!1,!0)},destroy:function(e){var i=t.MixItUp.prototype._bound._filter,s=t.MixItUp.prototype._bound._sort;this._execAction("destroy",0,arguments),this._$body.add(t(this.selectors.sort)).add(t(this.selectors.filter)).off(".mixItUp");for(var a=0;a<this._$targets.length;a++){var n=this._$targets[a];e&&(n.style.display=""),delete n.mixParent}this._execAction("destroy",1,arguments),i[this.selectors.filter]&&i[this.selectors.filter]>1?i[this.selectors.filter]--:1===i[this.selectors.filter]&&delete i[this.selectors.filter],s[this.selectors.sort]&&s[this.selectors.sort]>1?s[this.selectors.sort]--:1===s[this.selectors.sort]&&delete s[this.selectors.sort],delete t.MixItUp.prototype._instances[this._id]}},t.fn.mixItUp=function(){var i,s=arguments,a=[];return i=this.each(function(){if(s&&"string"==typeof s[0]){var i=t.MixItUp.prototype._instances[this.id];if("isLoaded"===s[0])a.push(!!i);else{var n=i[s[0]](s[1],s[2],s[3]);n!==e&&a.push(n)}}else!function(e,i){var s=new t.MixItUp;s._execAction("_instantiate",0,arguments),e.id=e.id?e.id:"MixItUp"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase(),s._instances[e.id]||(s._instances[e.id]=s,s._init(e,i)),s._execAction("_instantiate",1,arguments)}(this,s[0])}),a.length?a.length>1?a:a[0]:i},t.fn.removeStyle=function(i,s){return s=s||"",this.each(function(){for(var a=this,n=i.split(" "),r=0;r<n.length;r++)for(var o=0;o<4;o++){switch(o){case 0:var l=n[r];break;case 1:l=t.MixItUp.prototype._helpers._camelCase(l);break;case 2:l=s+n[r];break;case 3:l=t.MixItUp.prototype._helpers._camelCase(s+n[r])}if(a.style[l]!==e&&"unknown"!=typeof a.style[l]&&a.style[l].length>0&&(a.style[l]=""),!s&&1===o)break}a.attributes&&a.attributes.style&&a.attributes.style!==e&&""===a.attributes.style.value&&a.attributes.removeNamedItem("style")})}}(jQuery);
/*!
 * Lightbox v2.9.0
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
}(this, function ($) {

  function Lightbox(options) {
    this.album = [];
    this.currentImageIndex = void 0;
    this.init();

    // options
    this.options = $.extend({}, this.constructor.defaults);
    this.option(options);
  }

  // Descriptions of all options available on the demo site:
  // http://lokeshdhakar.com/projects/lightbox2/index.html#options
  Lightbox.defaults = {
    albumLabel: 'Image %1 of %2',
    alwaysShowNavOnTouchDevices: false,
    fadeDuration: 600,
    fitImagesInViewport: true,
    imageFadeDuration: 600,
    // maxWidth: 800,
    // maxHeight: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: true,
    wrapAround: false,
    disableScrolling: false,
    /*
    Sanitize Title
    If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
    This will free you to add html tags, such as links, in the caption.

    If the caption data is user submitted or from some other untrusted source, then set this to true
    to prevent xss and other injection attacks.
     */
    sanitizeTitle: false
  };

  Lightbox.prototype.option = function(options) {
    $.extend(this.options, options);
  };

  Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
    return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
  };

  Lightbox.prototype.init = function() {
    var self = this;
    // Both enable and build methods require the body tag to be in the DOM.
    $(document).ready(function() {
      self.enable();
      self.build();
    });
  };

  // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
  // that contain 'lightbox'. When these are clicked, start lightbox.
  Lightbox.prototype.enable = function() {
    var self = this;
    $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
      self.start($(event.currentTarget));
      return false;
    });
  };

  // Build html for the lightbox and the overlay.
  // Attach event handlers to the new DOM elements. click click click
  Lightbox.prototype.build = function() {
    var self = this;
    $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));

    // Cache jQuery objects
    this.$lightbox       = $('#lightbox');
    this.$overlay        = $('#lightboxOverlay');
    this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
    this.$container      = this.$lightbox.find('.lb-container');
    this.$image          = this.$lightbox.find('.lb-image');
    this.$nav            = this.$lightbox.find('.lb-nav');

    // Store css values for future lookup
    this.containerPadding = {
      top: parseInt(this.$container.css('padding-top'), 10),
      right: parseInt(this.$container.css('padding-right'), 10),
      bottom: parseInt(this.$container.css('padding-bottom'), 10),
      left: parseInt(this.$container.css('padding-left'), 10)
    };

    this.imageBorderWidth = {
      top: parseInt(this.$image.css('border-top-width'), 10),
      right: parseInt(this.$image.css('border-right-width'), 10),
      bottom: parseInt(this.$image.css('border-bottom-width'), 10),
      left: parseInt(this.$image.css('border-left-width'), 10)
    };

    // Attach event handlers to the newly minted DOM elements
    this.$overlay.hide().on('click', function() {
      self.end();
      return false;
    });

    this.$lightbox.hide().on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$outerContainer.on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$lightbox.find('.lb-prev').on('click', function() {
      if (self.currentImageIndex === 0) {
        self.changeImage(self.album.length - 1);
      } else {
        self.changeImage(self.currentImageIndex - 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-next').on('click', function() {
      if (self.currentImageIndex === self.album.length - 1) {
        self.changeImage(0);
      } else {
        self.changeImage(self.currentImageIndex + 1);
      }
      return false;
    });

    /*
      Show context menu for image on right-click

      There is a div containing the navigation that spans the entire image and lives above of it. If
      you right-click, you are right clicking this div and not the image. This prevents users from
      saving the image or using other context menu actions with the image.

      To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
      set pointer-events to none on the nav div. This is so that the upcoming right-click event on
      the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
      we set the pointer events back to auto for the nav div so it can capture hover and left-click
      events as usual.
     */
    this.$nav.on('mousedown', function(event) {
      if (event.which === 3) {
        self.$nav.css('pointer-events', 'none');

        self.$lightbox.one('contextmenu', function() {
          setTimeout(function() {
              this.$nav.css('pointer-events', 'auto');
          }.bind(self), 0);
        });
      }
    });


    this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
      self.end();
      return false;
    });
  };

  // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
  Lightbox.prototype.start = function($link) {
    var self    = this;
    var $window = $(window);

    $window.on('resize', $.proxy(this.sizeOverlay, this));

    $('select, object, embed').css({
      visibility: 'hidden'
    });

    this.sizeOverlay();

    this.album = [];
    var imageNumber = 0;

    function addToAlbum($link) {
      self.album.push({
        link: $link.attr('href'),
        title: $link.attr('data-title') || $link.attr('title')
      });
    }

    // Support both data-lightbox attribute and rel attribute implementations
    var dataLightboxValue = $link.attr('data-lightbox');
    var $links;

    if (dataLightboxValue) {
      $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
      for (var i = 0; i < $links.length; i = ++i) {
        addToAlbum($($links[i]));
        if ($links[i] === $link[0]) {
          imageNumber = i;
        }
      }
    } else {
      if ($link.attr('rel') === 'lightbox') {
        // If image is not part of a set
        addToAlbum($link);
      } else {
        // If image is part of a set
        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
        for (var j = 0; j < $links.length; j = ++j) {
          addToAlbum($($links[j]));
          if ($links[j] === $link[0]) {
            imageNumber = j;
          }
        }
      }
    }

    // Position Lightbox
    var top  = $window.scrollTop() + this.options.positionFromTop;
    var left = $window.scrollLeft();
    this.$lightbox.css({
      top: top + 'px',
      left: left + 'px'
    }).fadeIn(this.options.fadeDuration);

    // Disable scrolling of the page while open
    if (this.options.disableScrolling) {
      $('body').addClass('lb-disable-scrolling');
    }

    this.changeImage(imageNumber);
  };

  // Hide most UI elements in preparation for the animated resizing of the lightbox.
  Lightbox.prototype.changeImage = function(imageNumber) {
    var self = this;

    this.disableKeyboardNav();
    var $image = this.$lightbox.find('.lb-image');

    this.$overlay.fadeIn(this.options.fadeDuration);

    $('.lb-loader').fadeIn('slow');
    this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

    this.$outerContainer.addClass('animating');

    // When image to show is preloaded, we send the width and height to sizeContainer()
    var preloader = new Image();
    preloader.onload = function() {
      var $preloader;
      var imageHeight;
      var imageWidth;
      var maxImageHeight;
      var maxImageWidth;
      var windowHeight;
      var windowWidth;

      $image.attr('src', self.album[imageNumber].link);

      $preloader = $(preloader);

      $image.width(preloader.width);
      $image.height(preloader.height);

      if (self.options.fitImagesInViewport) {
        // Fit image inside the viewport.
        // Take into account the border around the image and an additional 10px gutter on each side.

        windowWidth    = $(window).width();
        windowHeight   = $(window).height();
        maxImageWidth  = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
        maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - 120;

        // Check if image size is larger then maxWidth|maxHeight in settings
        if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
          maxImageWidth = self.options.maxWidth;
        }
        if (self.options.maxHeight && self.options.maxHeight < maxImageWidth) {
          maxImageHeight = self.options.maxHeight;
        }

        // Is there a fitting issue?
        if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
          if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
            imageWidth  = maxImageWidth;
            imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          } else {
            imageHeight = maxImageHeight;
            imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
            $image.width(imageWidth);
            $image.height(imageHeight);
          }
        }
      }
      self.sizeContainer($image.width(), $image.height());
    };

    preloader.src          = this.album[imageNumber].link;
    this.currentImageIndex = imageNumber;
  };

  // Stretch overlay to fit the viewport
  Lightbox.prototype.sizeOverlay = function() {
    this.$overlay
      .width($(document).width())
      .height($(document).height());
  };

  // Animate the size of the lightbox to fit the image we are showing
  Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
    var self = this;

    var oldWidth  = this.$outerContainer.outerWidth();
    var oldHeight = this.$outerContainer.outerHeight();
    var newWidth  = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
    var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

    function postResize() {
      self.$lightbox.find('.lb-dataContainer').width(newWidth);
      self.$lightbox.find('.lb-prevLink').height(newHeight);
      self.$lightbox.find('.lb-nextLink').height(newHeight);
      self.showImage();
    }

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.$outerContainer.animate({
        width: newWidth,
        height: newHeight
      }, this.options.resizeDuration, 'swing', function() {
        postResize();
      });
    } else {
      postResize();
    }
  };

  // Display the image and its details and begin preload neighboring images.
  Lightbox.prototype.showImage = function() {
    this.$lightbox.find('.lb-loader').stop(true).hide();
    this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);

    this.updateNav();
    this.updateDetails();
    this.preloadNeighboringImages();
    this.enableKeyboardNav();
  };

  // Display previous and next navigation if appropriate.
  Lightbox.prototype.updateNav = function() {
    // Check to see if the browser supports touch events. If so, we take the conservative approach
    // and assume that mouse hover events are not supported and always show prev/next navigation
    // arrows in image sets.
    var alwaysShowNav = false;
    try {
      document.createEvent('TouchEvent');
      alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
    } catch (e) {}

    this.$lightbox.find('.lb-nav').show();

    if (this.album.length > 1) {
      if (this.options.wrapAround) {
        if (alwaysShowNav) {
          this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
        }
        this.$lightbox.find('.lb-prev, .lb-next').show();
      } else {
        if (this.currentImageIndex > 0) {
          this.$lightbox.find('.lb-prev').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev').css('opacity', '1');
          }
        }
        if (this.currentImageIndex < this.album.length - 1) {
          this.$lightbox.find('.lb-next').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-next').css('opacity', '1');
          }
        }
      }
    }
  };

  // Display caption, image number, and closing button.
  Lightbox.prototype.updateDetails = function() {
    var self = this;

    // Enable anchor clicks in the injected caption html.
    // Thanks Nate Wright for the fix. @https://github.com/NateWr
    if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
      this.album[this.currentImageIndex].title !== '') {
      var $caption = this.$lightbox.find('.lb-caption');
      if (this.options.sanitizeTitle) {
        $caption.text(this.album[this.currentImageIndex].title);
      } else {
        $caption.html(this.album[this.currentImageIndex].title);
      }
      $caption.fadeIn('fast')
        .find('a').on('click', function(event) {
          if ($(this).attr('target') !== undefined) {
            window.open($(this).attr('href'), $(this).attr('target'));
          } else {
            location.href = $(this).attr('href');
          }
        });
    }

    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
    } else {
      this.$lightbox.find('.lb-number').hide();
    }

    this.$outerContainer.removeClass('animating');

    this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
      return self.sizeOverlay();
    });
  };

  // Preload previous and next images in set.
  Lightbox.prototype.preloadNeighboringImages = function() {
    if (this.album.length > this.currentImageIndex + 1) {
      var preloadNext = new Image();
      preloadNext.src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      var preloadPrev = new Image();
      preloadPrev.src = this.album[this.currentImageIndex - 1].link;
    }
  };

  Lightbox.prototype.enableKeyboardNav = function() {
    $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
  };

  Lightbox.prototype.disableKeyboardNav = function() {
    $(document).off('.keyboard');
  };

  Lightbox.prototype.keyboardAction = function(event) {
    var KEYCODE_ESC        = 27;
    var KEYCODE_LEFTARROW  = 37;
    var KEYCODE_RIGHTARROW = 39;

    var keycode = event.keyCode;
    var key     = String.fromCharCode(keycode).toLowerCase();
    if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
      this.end();
    } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
      if (this.currentImageIndex !== 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(this.album.length - 1);
      }
    } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
      if (this.currentImageIndex !== this.album.length - 1) {
        this.changeImage(this.currentImageIndex + 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(0);
      }
    }
  };

  // Closing time. :-(
  Lightbox.prototype.end = function() {
    this.disableKeyboardNav();
    $(window).off('resize', this.sizeOverlay);
    this.$lightbox.fadeOut(this.options.fadeDuration);
    this.$overlay.fadeOut(this.options.fadeDuration);
    $('select, object, embed').css({
      visibility: 'visible'
    });
    if (this.options.disableScrolling) {
      $('body').removeClass('lb-disable-scrolling');
    }
  };

  return new Lightbox();
}));