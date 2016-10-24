
var pega_processos = function () {

	let p1chegada = parseInt($('#processo1-chegada').val());
	let p2chegada = parseInt($('#processo2-chegada').val());
	let p3chegada = parseInt($('#processo3-chegada').val());
	let p4chegada = parseInt($('#processo4-chegada').val());
//	let p5chegada = parseInt($('#processo5-chegada').val());

	let p1duracao = parseInt($('#processo1-duracao').val());
	let p2duracao = parseInt($('#processo2-duracao').val());
	let p3duracao = parseInt($('#processo3-duracao').val());
	let p4duracao = parseInt($('#processo4-duracao').val());
//	let p5duracao = parseInt($('#processo5-duracao').val());

	var processos = [
		new Processo(p1chegada, p1duracao),
		new Processo(p2chegada, p2duracao),
		new Processo(p3chegada, p3duracao),
		new Processo(p4chegada, p4duracao),
//		new Processo(p5chegada, p5duracao)
	];

	return processos;
}

var escalona_processos =  function (){
	processos = pega_processos();

	let esc = new Escalonador(processos);
	//console.log(esc.fifo());
	$('#resultadoFIFO').html(esc.fifo());
	$('#resultadoSJF').html(esc.sjf());
//	$('#resultadoRR').html(esc.roundrobin());
	console.log(esc.sjf());
//	console.log(esc.roundrobin());
}
