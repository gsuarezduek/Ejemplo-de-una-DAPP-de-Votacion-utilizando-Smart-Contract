pragma solidity ^0.4.23;


contract Votacion {

  
  mapping (bytes32 => uint8) public votosRecibidos;
  // En Solidity, mapping se utiliza para estructurar los datos, ya sean booleanos, enteros u otros.
  // Consiste en 2 partes esenciales, el tipo de dato y el valor de dato -> mapping(_KeyType => _ValueType)
  // En este caso vamos a guardar el nombre del candidato almacenado como tipo de bytes32 y la cantidad de votos asignada como valor en un entero sin signos.

  
  bytes32[] public listaCandidatos;
  // Utilizamos un array de bytes32 para guardar la lista de candidatos
  
  constructor(bytes32[] nombreCandidatos) public {
    listaCandidatos = nombreCandidatos;
  }
  // Este es el constructor que es llamado una sola vez, cuando se implementa (deploy) en la blockchain. 
  // Al implementarlo, pasamos un array con los candidatos que van a participar en la elección. 
  
  
  function totalVotos(bytes32 candidato) view public returns (uint8) {
    require(candidatoValido(candidato));
    return votosRecibidos[candidato];
  }
  // Función que devuelve el total de votos recibido por un candidato
  
  function votarPorCandidato(bytes32 candidato) public {
    require(candidatoValido(candidato));
    votosRecibidos[candidato] += 1;
  }
  // Función que equivale a emitir un voto. Aumenta la cuenta de votos para el candidato especifico. 

  
  function candidatoValido(bytes32 candidato) view public returns (bool) {
    for(uint i = 0; i < listaCandidatos.length; i++) {
      if (listaCandidatos[i] == candidato) {
        return true;
      }
    }
    return false;
  }
  // Función que valida los candidatos. 
  
  
}