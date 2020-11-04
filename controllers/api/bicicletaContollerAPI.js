var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
	Bicicleta.allBicis((err, bicis) => {
		if (err) return console.error(err);
		res.status(200).json({
			bicicletas: bicis
		});
	});
}

exports.bicicleta_create = function(req, res) {
	var bici = new Bicicleta({
		code: req.body.code, 
		color: req.body.color, 
		modelo: req.body.modelo, 
		ubicacion: [req.body.lat, req.body.lng]
	});
	Bicicleta.add(bici, (err, nBici) => {
		if (err) return console.error(err);
		res.status(200).json({
			bicicleta: bici
		});
	});
}

exports.bicicleta_delete = function(req, res) {
	Bicicleta.removeByCode(req.body.code, (err) => {
		if (err) return console.error(err);
		res.status(204).send();
	});
}

exports.bicicleta_update = function(req, res) {
	Bicicleta.findByCode(req.params.id, (err, bici) => {
		if (err) return console.error(err)
		if (!bici) {
			res.status(404).send("Error in update: Not found Bicicleta");
			return;
		}
		bici.code = req.body.code;
		bici.color = req.body.color;
		bici.modelo = req.body.modelo;
		bici.ubicacion = [req.body.lat, req.body.lng]
		Bicicleta.updateByCode(req.params.id, bici, (err, opResult) => {
			if (err) return console.error(err)
			res.status(200).json({
				bicicleta: bici
			});
		});
	});
}

exports.bicicleta_item = function(req, res){
    Bicicleta.findByCode(req.params.id, (err, bici) => {
    	if (err) return console.error(err);
    	if (bici) {
    		res.status(200).json({bici});
    	}
    	else {
    		res.status(404).send("Not found Bicicleta");
    	}
    });
}

/*
exports.bicicleta_list = function (req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicleta_create =function (req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bicis.ubicaicon=[req.body.lat, req.body.lng];

    Bicicleta.add(bici);
    req.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeById(req.body.id);
    res.status.send();
}
*/