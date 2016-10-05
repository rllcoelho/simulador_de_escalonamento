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
			if (this.processos[i % qtdP].tempoRestante > quantum) {
				if (i === 0) {
					this.processos[i % qtdP].turnaround = quantum + sobrecarga;
				}
				else {
					this.processos[i % qtdP].turnaround = this.processos[i % qtdP - 1].termino + quantum + sobrecarga;
					if (i < qtdP) {
						this.processos[i % qtdP].turnaround -= this.processos[i % qtdP].chegada;
					}
				}
			}
			else if (this.processos[i % qtdP].tempoRestante > 0) {
				if (i === 0) {
					this.processos[i % qtdP].turnaround = this.processos[i % qtdP].tempoRestante + sobrecarga;
				}
				else {
					this.processos[i % qtdP].turnaround = this.processos[i % qtdP - 1].termino + this.processos[i % qtdP].tempoRestante + sobrecarga;
					if (i < qtdP) {
						this.processos[i % qtdP].turnaround -= this.processos[i % qtdP].chegada;
					}
				}
			}
			this.processos[i % qtdP].termino = this.processos[i % qtdP].chegada + this.processos[i % qtdP].turnaround;
			this.processos[i % qtdP].tempoRestante -= quantum;
			if(this.processos[i % qtdP].tempoRestante <= 0){
				taTotal += this.processos[i % qtdP].turnaround;
				processosRestantes--;
			}
			i++;
		}
		return taTotal/qtdProcessos;
	}
/////////////////////////////////////////////////
	edf () {

	}
}
