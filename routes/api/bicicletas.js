var express = require('express');
var router = express.Router();
var bicicletaController= require('../../controllers/api/bicicletaContollerAPI');


router.get('/', bicicletaController.bicicleta_list);
router.get('/:id', bicicletaController.bicicleta_item);
router.post('/create', bicicletaController.bicicleta_create);
router.delete('/delete', bicicletaController.bicicleta_delete);
router.post('/update/:id', bicicletaController.bicicleta_update);

module.exports=router;