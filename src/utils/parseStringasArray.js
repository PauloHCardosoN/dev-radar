//Funcão de partir uma String em um Array com base na vírgula
module.exports = function parseStringAsArray(array){
    return array.split(',').map(tech => tech.trim())
}