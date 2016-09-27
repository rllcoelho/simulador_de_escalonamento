/*class FIFOprocess{
	constructor(arrival, duration){
		this.arrival = arrival;
		this.duration = duration;
	}

	let
}*/

var FIFOprocesses = [];

function FIFO(){
	for (var i = 0; i < document.getElementById("processes").length/2; i++) {
		FIFOprocesses[i] = {duracao: document.getElementById("processo" + String(i + 1) + "-duracao"), 
							chegada: document.getElementById("processo" + String(i + 1) + "-chegada")};
	}
}

var processo = {
	chegada: 0,
	duracao: 4,
	inicio: 0,
	termino: 4,
	turnaround: 4,
	esperandoSemExecutar: 0
}

 console.log(processo.duracao);

 for (var i = 0; i < 5; i++) {
 	 ('#process' + i++ + "duracao").value
 }
