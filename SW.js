const CACHE_NAME='pwa_cache';
//rutas para cachear
var urlsToCache=[
    './',
    './css/Proyecto.css',
    './Imagenes/1 (1).jpeg',
    './Imagenes/1 (2).jpeg',
    './Imagenes/1 (3).jpeg',
    './Imagenes/1 (4).jpeg',
    './Imagenes/1 (5).jpeg',
    './Imagenes/1 (6).jpeg',
    './Imagenes/1 (7).jpeg',
    './Imagenes/1 (8).jpeg',
    './Imagenes/1 (9).jpeg',
    './Imagenes/1 (10).jpeg',
    './Imagenes/1 (11).jpeg',
    './Imagenes/1 (12).jpeg',
    './Imagenes/1 (13).jpeg',
    './Imagenes/1 (14).jpeg',
    './Imagenes/1 (15).jpeg',
    './Imagenes/1 (16).jpeg',
    './Imagenes/1 (17).jpeg',
    './Imagenes/1 (18).jpeg',
    './Imagenes/1 (19).jpeg',
    './Imagenes/1 (20).jpeg',
    './Imagenes/1 (21).jpeg',
    './Imagenes/1 (21).jpeg',
    './Imagenes/1 (22).jpeg',
    './Imagenes/1 (23).jpeg',
];

//evento install (de instalación )
//instalación y guardar en cache los recursos estáticos
self.addEventListener('install',e=>{
    e.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache=>{
        return cache.addAll(UrlsToCache)
        .then(()=>{
          self.skipWaiting();
        });
      }).catch(err=>
        console.log('no se ha registrado el cache',err)));
  });
  
  //evento activate activar la aplicación
  //este evento es el que hace que funcione sin conexion
  self.addEventListener('activate',e=>{
    const cacheWhiteList=[CACHE_NAME];
    e.waitUntil(
      caches.keys()
        .then(cacheNames =>{
          return Promise.all(cacheNames.map(cacheName=>{
            if(cacheWhiteList.indexOf(cacheName)===- 1){
                //borramos los elementos que no necesitamos
                return caches.delete(cacheName);
            }
          })
         );
       })
       .then(()=>{
         //activa la cache en el dispositivo
          self.clients.claim();
       })
    );
  });
  
  //evento fetch traer desde el internet
  //comprobarra si la url está en cache y si no la solicita por internet
  self.addEventListener('fetch',e=>{
      e.respondWith(
        caches.match(e.request)
          .then(res=>{
            if(res){
              //devuelvo datos desde caches
              return res;
            }
            return fetch(e.request);
          })
      );
  });
  