// Funcion para manejar errores en la aplicación
import createError from 'http-errors';

// Importa el framework Express
import express from 'express';

// Importa módulos para manejar rutas
import path, { dirname } from 'node:path';

// Para cookies
import cookieParser from 'cookie-parser';

// Registrador para saber qué pasa en el servidor
import logger from 'morgan';

// Imports para crear __dirname
import { fileURLToPath } from 'node:url';

// Crear __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Se importan las rutas de la aplicación
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

// Crea la aplicación de Express
const app = express();

// Configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configura los middlewares de la aplicación
app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registramos las rutas
app.use('/', indexRouter);

app.use('/users', usersRouter);

// Catch 404 y enviar al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {

  // Variables locales, solo mostrando error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar página de error
  res.status(err.status || 500);
  res.render('error');
});

export default app;