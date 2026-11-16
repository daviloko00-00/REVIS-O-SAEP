import ClienteController from "../controllers/ClienteController.js";
import { Router } from 'express'
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentoController.js";
import DashboardController from "../controllers/DashboardController.js";
import authControlller from "../controllers/authControlller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/login', (req, res) => authControlller.login(req, res))
//apartir daqui tudo usa autenticação!!
router.use(authMiddleware);
//rotas para auth
router.post('/logout', (req, res) => authControlller.logout(req, res))
router.post('/me', (req, res) => authControlller.me(req, res))
//clientes
router.get('/clientes', (req, res) => ClienteController.listar(req, res));
router.post('/clientes', (req, res) => ClienteController.criar(req, res));
router.put('/clientes/:id', (req, res) => ClienteController.atualizar(req, res));

//veículos
router.get('/veiculos', (req, res) => VeiculoController.listar(req, res))
router.post('/veiculos', (req, res) => VeiculoController.criar(req, res))


//agendamentos
router.get('/agendamentos', (req, res) => AgendamentoController.listar(req, res))
router.post('/agendamentos', (req, res) => AgendamentoController.criar(req, res))
router.patch('/agendamentos/:id', (req, res) => AgendamentoController.atualizarData(req, res))

//Dashboard
router.get("/dashboard/resumo", (req, res) => DashboardController.resumo(req, res))

export default router;
