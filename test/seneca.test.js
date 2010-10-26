/* Copyright (c) 2010 Ricebridge */

var common   = require('common');
var entity   = require('entity');
var seneca   = require('seneca');

var E = common.E;

var sys     = common.sys;
var eyes    = common.eyes;

var Entity = entity.Entity;
var Seneca = seneca.Seneca;

/*
global.explain = (function(){
  var log = [];
  var f = function(msg) {
    log.push(msg);
  }
  f.log = log;
  return f;
})();
*/


module.exports = {
  get: function(assert) {
    //explain('get');

    var entity = Entity.$init('mem:');
    var seneca = Seneca.init(entity);

    var ent1 = entity.$make({$base:'foo',$name:'bar',p1:'v1'});
    ent1.p2 = 100;

    ent1.$save( function(err,ent1) {
      //eyes.inspect(ent1,'ent1');

      seneca.act({id:ent1.id,base:'foo',name:'bar',zone:'entity',method:'GET',result:function(res){
        eyes.inspect(res,'res');

        //sys.puts(explain.log.join('\n'));
      }});
    });
  },

  action: function(assert) {
    var entity = Entity.$init('mem:');
    var seneca = Seneca.init(entity);

    var a1  = 0;

    seneca.add({op:'foo'},function(args,cb){
      assert.equal(100,args.a1);
      a1 = args.a1;
      cb('res');
    });

    seneca.act({zone:'action',op:'foo',a1:100}, function(res) {
      assert.equal('res',res);
      assert.equal(100,a1);

      sys.puts('action');
    });

    assert.equal(100,a1);
  }
}