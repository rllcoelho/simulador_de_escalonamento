class Escalonador {
	constructor(processos){
		this._processos = processos	
	}

	get processos(){
		return this._processos;
	}

	fifo () {
		let qtdProcessos = this.processos.length;
		let taTotal = 0;

		this.processos.sort(function(a, b){
			return a.chegada - b.chegada;
		});

		console.log(this.processos);

		this.processos.forEach(function(p, k){
			if (k > 0) {
				if (p.chegada === this.processos[k-1].termino) {
					p.inicio = p.chegada;
				} 
				else {
					p.inicio = this.processos[k-1].termino;
				}
			}
			else{
				p.inicio = p.chegada;
			}
			
			p.termino = p.inicio + p.duracao;
			p.turnaround = p.termino - p.chegada;
			p.esperandoSemExecutar = p.inicio - p.chegada;
			taTotal += p.turnaround;
		});
		return taTotal/qtdProcessos;
	}
}