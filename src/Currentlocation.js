function Clocation(){
    var ret = {lon: -0.1257, lat: 51.5085};
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(function(position) {
            ret.lon = position.coords.longitude;
            ret.lat = position.coords.latitude;
           // console.log(position);
            resolve(ret);
        }, function(err){resolve(ret);});
    })
}
export default Clocation;