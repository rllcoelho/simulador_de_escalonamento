(function(){

	let processos = [
		new Processo(0, 4),
		new Processo(2, 2),
		new Processo(4, 1),
		new Processo(6, 3)
	];


	//console.log(processos);

	let esc = new Escalonador(processos);

	console.log(esc.fifo());

	console.log(esc.sjf());

	console.log(esc.roundrobin());

	console.log(esc.deadline());
})();
