/**
 * Copyright (c) 2013 Rodrigo Silveira. All rights reserved
 */
var HVdoo=HVdoo||{};HVdoo.entities=HVdoo.entities||{};HVdoo.entities.Entity=function(a,h,f,g){var d={x:a,y:h},e={w:f,h:g},c=function(){};this.getPos=function(){return d};this.setPos=function(b){d=b};this.getSize=function(){return e};this.setSize=function(b){e=b};this.onUpdate=function(b){c=b};this.update=function(){return c()}};
HVdoo.entities.HeroEntity=function(){var a=function(a,f,g,d,e){HVdoo.entities.Entity.call(this,a,f,g,d);var c=new Image;c.src=e;this.getSprite=function(){var b=this.getPos(),a=this.getSize();return{x:b.x,y:b.y,width:a.w,height:a.h,img:c}}};a.prototype=Object.create(HVdoo.entities.Entity.prototype);return a}();