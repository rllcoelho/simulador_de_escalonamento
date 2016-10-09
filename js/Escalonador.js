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
		let pL = [];
		while(processosRestantes > 0){
			let tamLista = pL.length();
			let atual = i % tamLista;
			let ant = atual === 0 ? tamLista : atual -1;

			if (i === 0) {
				pL.push(atual);
				this.processos[pL[atual]].chegou = true;
				this.processos[pL[atual]].termino = Math.min(quantum, this.processos[atual].tempoRestante);
				this.processos[pL[atual]].tempoRestante -= quantum;
				this.processos[pL[atual]].termino += this.processos[pL[atual]].tempoRestante >= quantum ? sobrecarga : 0;
			}
			else if (this.processos[pL[atual]].chegou === false &&
				this.processos[pL[atual]].chegada <= this.processos[pL[ant]].termino &&
				this.processos[pL[atual]].tempoRestante > 0) {
					pL.push(atual);//eraaaaado
					this.processos[pL[atual]].chegou = true;
			}

			if(this.processos[pL[atual]].chegou === true && this.processos[atual].tempoRestante > 0){
				this.processos[pL[atual]].termino = this.processos[pL[ant]].termino + Math.min(quantum, this.processos[pL[atual]].tempoRestante);
				this.processos[pL[atual]].tempoRestante -= quantum;
				this.processos[pL[atual]].termino += this.processos[pL[atual]].tempoRestante >= quantum ? sobrecarga : 0;
			}

			if(this.processos[pL[atual]].tempoRestante <= 0){
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
