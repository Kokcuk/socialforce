
exports.getKeyByValue = function (obj, value) {
    for( var prop in obj ) {
         if( obj.hasOwnProperty( prop ) ) {
             if( obj[ prop ] === value )
                 return prop;
         }
     }
}