import getHomeViewModel from './home.service.js';

export default function renderHome(req, res) {
  //cargando el view model
  const viewModel = getHomeViewModel();
  //cargando la vista
  res.render('index', viewModel);
}
