(function(){

	let btn_TAMedio = getElementById('processes');

	btn_TAMedio.onclick = escalona_processos();

	/*let processos = [
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
	*/
})();

function pega_processos() {
	let processos = [
		new Processo($('#processo1-chegada').value, $('#processo1-duracao').value),
		new Processo($('#processo2-chegada').value, $('#processo2-duracao').value),
		new Processo($('#processo3-chegada').value, $('#processo3-duracao').value),
		new Processo($('#processo4-chegada').value, $('#processo4-duracao').value),
		new Processo($('#processo5-chegada').value, $('#processo5-duracao').value)
	];

	return processos;
}

function escalona_processos(){
	processos = pega_procesos();

	let esc = new Escalonador(processos);
	console.log(esc.fifo());
	console.log(esc.sjf());
	console.log(esc.roundrobin());
}
