(function(){

	let processos = [
		new Processo(0, 5),
		new Processo(5, 10),
		new Processo(2, 15),
		new Processo(3, 20)
	];

	console.log(processos);

	let esc = new Escalonador(processos);

	console.log(esc.fifo());
})();