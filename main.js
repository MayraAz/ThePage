if('serviceworker' in navigator){
    console.log('se puede usar el sw');
    navigator.serviceworker.register('./sw.js')
    .then(res=>console.log(`se ha registrado el SW:${res}`))
    .catch(e=>console.log(`ha fallado la instalación del SW:${e}`));
}
else{
    console.log("No soportado");
}

