class Escalonador {
	constructor(processos, quantum = 0, sobrecarga = 0){
		this._processos = processos
		this._quantum = quantum
		this._sobrecarga = sobrecarga
	}

	set quantum(value){
		this._quantum = value;
	}

	get quantum(){
		return this._quantum;
	}

	set sobrecarga (value){
		this._sobrecarga = value;
	}

	get sobrecarga(){
		return this._sobrecarga;
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

		this.processos.forEach(function(p, k, ps){
			if (k > 0) {
				if (p.chegada === ps[k-1].termino) {
					p.inicio = p.chegada;
				}
				else {
					p.inicio = ps[k-1].termino;
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

	sjf () {
		let qtdProcessos = this.processos.length;
		let taTotal = 0;

		this.processos.sort(function(a, b){
			if(a.chegada < b.chegada){
				return a.chegada - b.chegada;
			}
			else{
				if(a.duracao < b.duracao){
					return a.duracao - b.duracao;
				}
			}
		});

		console.log(this.processos);

		this.processos.forEach(function(p, k, ps){
			if (k > 0) {
				if (p.chegada === ps[k-1].termino) {
					p.inicio = p.chegada;
				}
				else {
					p.inicio = ps[k-1].termino;
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

	roundrobin () {
		let qtdProcessos = this.processos.length;
		let processosRestantes = qtdProcessos;
		let taTotal = 0;
		let i = 0;

		let quantum = 3;
		let sobrecarga = 1;

		this.processos.sort(function(a, b){
			return a.chegada - b.chegada;
		});

		while(processosRestantes > 0){
			this.processos.forEach(function(p, k, ps){
				if (p.tempoRestante > quantum) {
					if(k === 0){
						if(i !== 0){
							p.turnaround = ps[qtdProcessos-1].turnaround - p.chegada + quantum + sobrecarga;
						}
						else{
							p.turnaround = quantum + sobrecarga;
						}
					}
					else{
						p.turnaround = ps[k-1].turnaround - p.chegada + quantum + sobrecarga;
						//p.segmentos.push({ini: ps[k-1].termino, fim: ps[k-1].termino + quantum});
					}
				}
				else if(p.tempoRestante > 0){
					if(k === 0){
						if(i !== 0){
							p.turnaround = ps[qtdProcessos-1].termino - p.chegada + p.tempoRestante;
						}
						else{
							p.turnaround = p.tempoRestante;
						}
					}
					else{
						p.turnaround = ps[k-1].termino - p.chegada + p.tempoRestante;
						//p.segmentos.push({ini: ps[k-1].termino, fim: ps[k-1].termino + p.tempoRestante});
					}
				}
				p.termino = p.chegada + p.turnaround;
				p.tempoRestante -= quantum;
				if(p.tempoRestante <= 0){
					taTotal += p.turnaround;
					processosRestantes--;
				}
			});
			i++;
		}
		return taTotal/qtdProcessos;
	}

	edf () {

	}
}
