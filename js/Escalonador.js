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
			//Se o tempo que resta de duração do processo for maior que o quantum, 
			// entra aqui e soma o quantum e a sobrecarga ao turnaround do processo.
			if (this.processos[i % qtdP].tempoRestante > quantum) {
				if (i === 0) {
					this.processos[i % qtdP].termino = quantum + sobrecarga;
				}
				//Se não for o primeiro processo, pega o valor 
				else {
					let ant = i !== 4 ? i% qtdP -1 : 0;
					this.processos[i % qtdP].termino = this.processos[ant].termino + quantum + sobrecarga;
				}
			}
			//Se o tempo que resta de duração do processo for menor ou igual ao quantum e maior que zero, 
			// entra aqui e soma somente o tempo restante ao turnaround do processo.
			else if (this.processos[i % qtdP].tempoRestante > 0) {
				if (i === 0) {
					this.processos[i % qtdP].termino = this.processos[i % qtdP].tempoRestante;
				}
				else {
					let ant = i !== 4 ? i% qtdP -1 : 0;
					this.processos[i % qtdP].termino = this.processos[ant].termino + this.processos[i % qtdP].tempoRestante;
				}
			}
			//this.processos[i % qtdP].termino = this.processos[i % qtdP].chegada + this.processos[i % qtdP].turnaround;
			this.processos[i % qtdP].tempoRestante -= quantum;
			if(this.processos[i % qtdP].tempoRestante <= 0){
				taTotal += this.processos[i % qtdP].turnaround;
				processosRestantes--;
			}
			i++;

		}
		this.processos.forEach(function (p){
			p.turnaround = p.termino - p.chegada;
		});
		return taTotal/qtdP;
	}

	roundrobin2 (){
		let qtdP = this.processos.length;
		let processosRestantes = qtdP;
		let taTotal = 0;

		let quantum = 2;
		let sobrecarga = 1;

		let ps = [];

		this.processos.sort(function(a, b){
			return a.chegada - b.chegada;
		});

		while (processosRestantes > 0){
			
		}
	}

/////////////////////////////////////////////////
	edf () {

	}
}
