web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545") )

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidato","type":"bytes32"}],"name":"totalVotos","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listaCandidatos","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidato","type":"bytes32"}],"name":"votarPorCandidato","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidato","type":"bytes32"}],"name":"candidatoValido","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votosRecibidos","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"nombreCandidatos","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

VotacionContract = web3.eth.contract(abi);

contractInstance = VotacionContract.at('0xd35e4f6408f4f2606503d5222114851cc35ff3ef');  //La dirección tenemos que cambiarla con la dirección que hacer el deploy del contrato. Desde la consola de Node.JS la obtenemos con instanciaContrato.address


candidatos = {"Washington" : "candidato-1", "Adams" : "candidato-2", "Jefferson": "candidato-3",  "Madison": "candidato-4" , "Monroe": "candidato-5"}

function votarPorCandidato(candidato){
	nombreCandidato = $("#candidato").val();
	
	contractInstance.votarPorCandidato(nombreCandidato, {from: web3.eth.accounts[0], gas: 4700000}, function(){
		let div_id = candidatos[nombreCandidato];
		$("#" + div_id).html(contractInstance.totalVotos.call(nombreCandidato).toString());
	});	
}

$(document).ready(function(){
	nombreCandidatos = Object.keys(candidatos);
	
	for (var i=0; i<nombreCandidatos.length; i++){
		let name = nombreCandidatos[i];
		let val = contractInstance.totalVotos.call(name).toNumber();
		$("#" + candidatos[name]).html(val);
	}
	
});