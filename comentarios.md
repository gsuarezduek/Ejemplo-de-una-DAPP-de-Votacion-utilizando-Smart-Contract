Para compilar: 

$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

> code = fs.readFileSync('Votacion.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)

Para deploy:

> abiDefinition = JSON.parse(compiledCode.contracts[':Votacion'].interface)
> ContratoVotacion = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Votacion'].bytecode
> deployedContract = ContratoVotacion.new(['Gaston','Juan','Lean'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> InstanciaContrato = ContratoVotacion.at(deployedContract.address)

Interactuar con el contrato:

> InstanciaContrato.totalVotos.call('Lean')
{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
> InstanciaContrato.totalVotos.call('Lean', {from: web3.eth.accounts[0]})
'0xed5a8e2db9ac9415977327b3449d47e6e3de8fa55d04735b7960a61bf6ac0b83'
> contractInstance.totalVotos.call('Lean').toLocaleString()
'1'
