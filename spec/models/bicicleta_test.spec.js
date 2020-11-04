var mongoose = require('mongoose');
var Bicicleta = require('../../models/Bicicleta');

describe('Testing Bicicletas', ()=> {
    beforeAll((done) => { mongoose.connection.close(done) });
    
    beforeEach( (done) => {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser: true,useCreateIndex: true});

        var db= mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error revizar'));
        db.once('open',  () => {
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach((done) => {
        Bicicleta.deleteMany({}, function(err, success) {
            if(err) console.log(err);
            mongoose.disconnect();
            done();
        });
    });

    describe('Bicicleta.createInstance',() => {
        it('crea una instancia de bicicleta',() => {
            var bici=Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
           Bicicleta.allBicis((err, bicis) => {
                expect(bicis.length).toBe(0);
                done();
            })
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega sola una bici', (done) => {
          var aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
          Bicicleta.add(aBici, (err, newBici) => {
            if (err) console.log(err);
            Bicicleta.allBicis((err, bicis) => {
              expect(bicis.length).toEqual(1);
              expect(bicis[0].code).toEqual(aBici.code);
              done();
            });
          });
        });

      });

      describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
          Bicicleta.allBicis((err, bicis) => {
            expect(bicis.length).toBe(0);
    
            var aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
            Bicicleta.add(aBici, (err, newBici) => {
              if (err) console.log(err);
              var aBici2 = new Bicicleta({ code: 2, color: 'rojo', modelo: 'urbana' });
              Bicicleta.add(aBici2, (err, newBici) => {
                if (err) console.log(err);
                Bicicleta.findByCode(1, (err, targetBici) => {
                  expect(targetBici.code).toBe(aBici.code);
                  expect(targetBici.color).toBe(aBici.color);
                  expect(targetBici.modelo).toBe(aBici.modelo);
    
                  done();
                });
              });
            });
          });
        });
      });
      

});

/*
var Bicicleta = require('../../models/Bicicleta');


beforeEach(function () {
    Bicicleta.allBicis=[];
});
describe('Bicicleta.allBicis',function() {
    it('comienzo vacio',function() {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});


describe('Bicicleta.add',function () {
    it('agregamos una', function () {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana', [51.5, -0.089]);

         Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);

        expect(Bicicleta.allBicis[0]).toBe(a);
        
    });
 
});


describe('Bicicleta.findId', function () {
    it('deve devolver una bici con id 1',function () {
       
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici1 = new Bicicleta(1, 'rojo', 'urbana');
        var aBici2 = new Bicicleta(2, 'azul', 'urbana');

        Bicicleta.add(aBici1);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici1.color);
        expect(targetBici.modelo).toBe(aBici1.modelo);
    });
});*/