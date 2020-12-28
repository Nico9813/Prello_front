# Prello

Prello es una aplicacion web de gestion de proyectos la cual puede ser utilizada para monitorear tareas y el flujo de las mismas a traves de las distintas etapas que atraviesen y provee tambien la asignacion de tareas a un usuario especifico, permitiendo el seguimiento de la situacion actual de todos los usuarios del proyecto.

### Transiciones

Se ofrece la posibilidad de asignar acciones que se ejecuten automaticamente al cambiar una tarea de estado, los tipos de acciones que se permiten actualmente son:
  - **HTTP-request**: se realiza automaticamente la request y se guarda el resultado para poder ser consultado posteriormente.
  
 ## Arquitectura
 
 <img src="https://github.com/Nico9813/Prello_front/blob/master/ArquitecturaPrello.png?raw=true" width="550px" height="500px"/>
 
 - **[API](https://github.com/Nico9813/Prello_API)**: Servidor web flask que es el unico encargado de actualizar y consultar la base de datos. Expone una api de formato REST para poder ser consultada externamente.
 
 - **[RealTimeSv](https://github.com/Nico9813/Prello_front/tree/master/realtimesv)**: Realizado en NodeJS es un servidor simple con el unico objetivo de mantener los distintos clientes actualizados ante una modificacion en un tablero compartido. Permite la subscripcion a un determinado proyecto la cual se realiza al ingresar al sistema y la des-suscripcion que se realiza al salir del mismo.
 
 - **MySqlDatabase**: Base de datos relacional en la que se guardan todos los datos referentes a los usuarios del sistema.
 
 Estos tres servicios se encuentran hosteados en una instancia EC2 de AWS y se ponen en funcionamiento utilizando [docker-compose](https://github.com/Nico9813/Prello_API/blob/master/docker-compose.yml) generando cada servicio en un container distinto. Estos servicios pueden ser accedidos mediante una ip estatica o mediante el dominio [prello-api.nicogomez.com.ar](prello-api.nicogomez.com.ar)
 
  - **[Front](https://github.com/Nico9813/Prello_front/tree/master/prello)**: Realizado con el framework NextJS encargado de consultar los datos a la api y mostrarlos en una interfaz grafica que permita manipularlos facilmente. Hosteada en Vercel y accesible mediante el dominio [prello-front.vercel.app](prello-front.vercel.app)
 
 
 ## Autentificacion
 
 Se utiliza el framework [AUTH0](https://auth0.com/) para controlar la autentificacion a lo largo de todo el sistema. En el front nos permite loguearnos con distintas redes sociales tales como google o facebook otorgandonos un JWT que podemos usar para consultar la API y que esta nos pueda relacionar con los datos de nuestro usuario especifico almacenados.
