var mongoose  = require('mongoose');
var request= require('request');
var Bicicleta= require('../../models/bicicleta');
var  server= require('../../bin/www');


/*
var base_url = "http://localhost:5000/api/bicicletas";

describe("Bicicletas API", ()=>{

    beforeAll((done) => { mongoose.connection.close(done); });
    beforeEach(function (done) {
        var mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
          const db = mongoose.connection;

          db.on('error', console.error.bind(console, 'connection error'));
          db.once('open', function () {
              console.log('We are connected to test database!');
              done();
          });

    });

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if(err) console.log(err);
            mongoose.disconnect();
            done();
            
        });
    });

    describe("GET BICICLETAS /", ()=>{
        it("Status 200",(done)=>{
            request.get(base_url, function (error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                //console.log(result);
                expect(result.bicicletas.length).toBe(0);
                done();
            });

        });
    });


    describe('POST BICICLETA /create', () => {
		it('STATUS 200', (done) => {
			var headers = { 'content-type': 'application/json' };
			var aBici = '{ "code": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
			request.post({
				headers: headers,
				url: base_url + '/create',
				body: aBici
			}, (error, response, body) => {
          expect(response.statusCode).toBe(200);
          var bici = JSON.parse(body).bicicleta;
          console.log(bici);
          expect(bici.color).toBe('rojo');
          expect(bici.ubicacion[0]).toBe(-34);
          expect(bici.ubicacion[1]).toBe(-54);
					done();
			});
        });
        


        
	});

	
	



});



*/

/*
describe('Bicicleta API ',()=> {
    describe('GET BICICLETAS /', ()=> {
        it('Status 200', function () {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1,'negra', 'urbana',[53.9,-0.9]);
            Bicicleta.add(a);

            request.get('http://localhost:5000/api/bicicletas',function (error,response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create', ()=> {
        it('STATUS 200',(done) =>{
            var headers = {'content-type' : 'application/json'};
            var aBici = JSON.stringify({"id": "10", "color": "rojo", "modelo": "urbana", "lat": "53.9", "lng": "-0.9"});
            request.post({
                headers: headers,
                url: 'http://localhost:5000/api/bicicletas/create',
                body: aBici
                },function (error, response, body) {
                    if(error) {
                        console.log("Error obervado"+error);
                    }
                    expect(response.statusCode).toBe(200);
                    expect(Bicicleta.findById(10).color).toBe("rojo");
                    done();
            });
        });
    });


});*/

var base_url = 'http://localhost:3000/api/bicicletas';

describe("Bicicleta API", function(){
	beforeAll(function(done) {
		mongoose.disconnect((err) => {
			if (err) console.log(err);
			var mongoDB = 'mongodb://localhost/testdb';
			mongoose.connect(mongoDB, {useNewUrlParser: true});
			const db = mongoose.connection;
			db.on('error', console.error.bind(console, 'MongoDB Test connection error'));
			db.once('open', function() {
				console.log("We are connected to test database!");
				done();
			});
		});
	});

	afterEach(function(done) {
		Bicicleta.deleteMany({}, function(err, sucess) {
			if (err) console.log(err);
			done();
		});
	});

	describe("GET BICICLETA", function(){
		it('Status 200', (done) => {
			request.get(base_url, function(error, res, body) {

            
                var result = JSON.parse(body);
               // console.log('array'+JSON.parse(body).bicicletas.length);
				expect(res.statusCode).toBe(200);
				expect(result.bicicletas.length).toBe(0);
				done();
			});
		});
	});

	describe("GET BICICLETA /:id", function(){
		it('Status 200 con id 1', (done) => {
			Bicicleta.allBicis(function(err, bicis) {
				if (err) console.error(err);
				expect(bicis.length).toBe(0);

				var a = new Bicicleta({
					code: 1, color: "negro", modelo: "urbana", ubicacion: [-4.001483,-79.205960]
				});

				Bicicleta.add(a, function(err, nBici) {
					if (err) console.error(err);
					request.get(base_url + "/1", function(error, res, body){
						expect(res.statusCode).toBe(200);
						var bici = JSON.parse(body).bici;
						expect(bici.code).toBe(1);
						expect(bici.color).toBe("negro");
						expect(bici.modelo).toBe("urbana");
						done();
					});
				});
			});
		});
	});

	describe("POST BICICLETA /create", function(){
		it('Status 200', (done) => {
			var headers = {'content-type': 'application/json'};
			var bici = '{ "code": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -34 }';

			request.post({
				headers: headers,
				url: base_url + "/create",
				body: bici
			}, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				var bici = JSON.parse(body).bicicleta;
				expect(bici.color).toBe("rojo");
				expect(bici.ubicacion[0]).toBe(-34);
				expect(bici.ubicacion[1]).toBe(-34);
				done();
			});
		});
	});

	describe("POST BICICLETA /delete", function(){
		it('Status 204', (done) => {
			var a = Bicicleta.createInstance(2, 'rojo', 'urbana', [-4.001483,-79.205960]);
			Bicicleta.add(a, function(err, nBici) {
				if (err) console.error(err);
				var headers = {'content-type': 'application/json'};
				var bici = '{ "code": 2 }';
				request.delete({
					headers: headers,
					url: base_url + "/delete",
					body: bici
				}, function(error, response, body){
					expect(response.statusCode).toBe(204);
					Bicicleta.findByCode(2, function(err, targetBici) {
						expect(targetBici).toBe(null);
						done();
					});
				});
			});
		});
	});

	describe("POST BICICLETA /update", function(){
		it('Status 200', (done) => {
			var a = Bicicleta.createInstance(1, 'rojo', 'urbana', [-4.001483,-79.205960]);
			Bicicleta.add(a, function(err, nBici) {
				if (err) console.error(err);
				var headers = {'content-type': 'application/json'};
				var uBici = '{ "code": 1, "color": "azul", "modelo": "urbana", "lat": -34, "lng": -34 }';
				request.post({
					headers: headers,
					url: base_url + "/update/1",
					body: uBici
				}, function(error, response, body){
					expect(response.statusCode).toBe(200);
					var bicicleta = JSON.parse(body).bicicleta;
					expect(bicicleta.code).toBe(1);
					expect(bicicleta.color).toBe("azul");
					expect(bicicleta.ubicacion[0]).toBe(-34);
					Bicicleta.findByCode(1, function(err, targetBici) {
						expect(targetBici.color).toBe("azul");
						expect(targetBici.ubicacion[0]).toBe(-34);
						done();
					});
				});
			});
		});
	});
});