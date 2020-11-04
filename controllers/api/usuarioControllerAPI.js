var Usuario = require('../../models/usuario');

exports.usuarios_list = function (req, res) {
	Usuario.find({}, function (err, usuarios) {
		if (err) return console.error(err);
		res.status(200).json({
			usuarios: usuarios
		});
	});
};

exports.usuarios_item = function(req, res){
    Usuario.findById(req.params.id, (err, usuario) => {
    	if (err) console.error(err);
    	if (usuario) {
    		res.status(200).json({usuario});
    	}
    	else {
    		res.status(404).send("Not found Usuario");
    	}
    });
}

exports.usuarios_create = function (req, res) {
	var usuario = new Usuario({ nombre: req.body.nombre });
	usuario.save(function (err) {
		if (err) return console.error(err);
		res.status(200).json(usuario);
	});
};

exports.usuario_reservar = function (req, res) {
	Usuario.findById(req.body.id, function (err, usuario) {
		// console.log(usuario);
		if (err) return console.error(err);
		usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function (err, reserva) {
			// console.log('Reserva !!!');
			if (err) return console.error(err);
			res.status(200).json({
				reserva: reserva
			});
		});
	});
};	