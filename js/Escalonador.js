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
		let qtdP = this.processos.length;
		let processosRestantes = qtdP;
		let taTotal = 0;

		let quantum = 2;
		let sobrecarga = 1;

		this.processos.sort(function(a, b){
			return a.chegada - b.chegada;
		});

		let i = 0;
		while(processosRestantes > 0){
			let atual = i % qtdP;
			let ant = atual === 0 ? 4 : atual -1;

			if (i === 0) {
				this.processos[atual].termino = Math.min(quantum, this.processos[atual].tempoRestante);
				this.processos[atual].tempoRestante -= quantum;
				this.processos[atual].termino += this.processos[atual].tempoRestante >= quantum ? sobrecarga : 0;
			}
			else if(this.processos[atual].chegada <= this.processos[ant].termino && this.processos[atual].tempoRestante > 0){
				this.processos[atual].termino = this.processos[ant].termino + Math.min(quantum, this.processos[atual].tempoRestante);
				this.processos[atual].tempoRestante -= quantum;
				this.processos[atual].termino += this.processos[atual].tempoRestante >= quantum ? sobrecarga : 0;
			}

			if(this.processos[atual].tempoRestante <= 0){
				processosRestantes--;
			}
			i++;
		}
		this.processos.forEach(function(p){
			p.turnaround = p.termino - p.chegada;
			taTotal += p.turnaround;
		});
		return taTotal/qtdP;
	}
/////////////////////////////////////////////////
	edf () {

	}
}
