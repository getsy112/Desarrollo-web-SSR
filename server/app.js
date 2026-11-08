// Funcion para manejar errores en la aplicación
import createError from 'http-errors';
// Importa el framework Express
import express from 'express';
// Importa módulos para manejar rutas
import path, { dirname } from 'node:path';
// Para cookies
import cookieParser from 'cookie-parser';
// Registrador para saber qué pasa en el servidor
import morgan from 'morgan';
//Importando biblioteca DEBUG
//import createDebug from 'debug'; 
// Imports para crear __dirname
import { fileURLToPath } from 'node:url';
//importando el templete engine handlebars
//import hbs from 'hbs';
// Se importan las rutas de la aplicación
//importando wiston
import indexRouter from '#routes/index.js';
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from '#routes/users.js';
//importando el registrador del helper de vite
//import { registerViteHelper } from './lib/vite.js';
// Crear objeto de debug
import configureHandlebars from './lib/handlebars.js';
import logger from './lib/winston.js';
//const debug = createDebug('desarrollo-web-ssr:app');
// Crear las variables __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crea la aplicación de Express
//debug(" 🔨Creando Backend")
logger.debug('🔨creando backend');
const app = express();

// Configura el motor de vistas
configureHandlebars(app);

// Configur los middlewares de la aplicación
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Archivos esaticos para producción
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configuración de archivos estáticos
//debug(" 🔨Creando servidor de archivos estáticos")
logger.debug('🔨Configuración de archivos estáticos');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registramos las rutas
//debug(" 🛤️ Registrando rutas")
logger.debug('🖼 Registramos las rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 y enviar al manejador de errores
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores

app.use((err, req, res, _next) => { 

  // Variables locales, solo mostrando error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar página de error
  res.status(err.status || 500);
  res.render('error');
});

//Ejemplo de codigo inalcanzable 
//(()=>{
  //let age = 10;
  //return age
  //if (age == 18) {
    //console.log ("Codigo")
 // }     
//})

export default app;