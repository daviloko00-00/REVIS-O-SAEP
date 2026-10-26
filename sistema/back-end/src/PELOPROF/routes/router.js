import  ClienteController  from "../controllers/ClienteController.js";
import {Router} from 'express'
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentoController.js";

const router = Router();

//router.use(authMiddleware);


//clientes
router.get('/clientes', (req, res) => ClienteController.listar(req, res));
router.post('/clientes', (req, res) => ClienteController.criar(req, res));
// router.put('/clientes:id', (req, res) => ClienteController.atualizar(req, res));
//veículos
router.get('/veiculos', (req,res)=>VeiculoController.listar(req,res))


//agendamentos
router.get('/agendamentos', (req, res)=> AgendamentoController.listar(req, res))



export default router;
