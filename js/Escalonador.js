class Escalonador {
	constructor(processos){
		this._processos = processos
	}

	set quantum(value){
		this._quantum = value;
	}

	get quantum(){
		return this._quantum;
	}

	fifo () {
		let qtdProcessos = this._processos.length;
		let taTotal = 0;

		this._processos.sort(function(a, b){
			return a.chegada - b.chegada;
		});

		this._processos.forEach(function(p, k, ps){
			if (k > 0) {
				if (p.chegada == ps[k-1].termino) {
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
			p.turnaround = parseInt(p.termino) - parseInt(p.chegada);
			p.esperandoSemExecutar = p.inicio - p.chegada;
			taTotal += parseInt(p.turnaround);
		});
		return taTotal/qtdProcessos;
	}

	sjf () {
		let qtdProcessos = this._processos.length;
		let taTotal = 0;

		this._processos.sort(function(a, b){
			if(a.chegada < b.chegada){
				return a.chegada - b.chegada;
			}
			else{
				if(a.duracao < b.duracao){
					return a.duracao - b.duracao;
				}
			}
		});

		this._processos.forEach(function(p, k, ps){
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

	atual () {
		return i % qtdP;
	}

	anterior (atual){
		return atual === 0 ? this._processos.length - 1 : atual - 1;
	}

	anteriorExistente (atual){
		let ant = this.anterior(atual);
		let aux = atual;
		while (true) {
			if(this._processos[ant].existe){
				return ant;
			}
			aux = aux === 0 ? this._processos.length - 1 : aux- 1 ;
			ant = this.anterior(aux);
		}
	}

	roundrobin () {
		let qtdP = this._processos.length;
		let processosRestantes = qtdP;
		let taTotal = 0;

		let quantum = 2;
		let sobrecarga = 1;
		let tempo = 0;

		this._processos.sort(function(a, b){
			return a.chegada - b.chegada;
		});

		let i = 0;
		while(processosRestantes > 0){
			let atual = i % qtdP;

			if (i === 0) {
				this._processos[atual].termino = Math.min(quantum, this._processos[atual].tempoRestante);
				this._processos[atual].tempoRestante -= quantum;
				this._processos[atual].termino += this._processos[atual].tempoRestante >= quantum ? sobrecarga : 0;
				this._processos[atual].existe = true;
			}


			if (this._processos[atual].existe === false &&
				this._processos[atual].chegada <= this._processos[this.anteriorExistente(atual)].termino &&
				this._processos[atual].tempoRestante > 0) {
					this._processos[atual].existe = true;
			}
			if (this._processos[atual].tempoRestante <= 0) {
				this._processos[atual].existe = false;
			}
			else if(i!==0 && this._processos[atual].existe){
				this._processos[atual].termino = this._processos[this.anteriorExistente(atual)].termino + Math.min(quantum, this._processos[atual].tempoRestante);
				this._processos[atual].tempoRestante -= quantum;
				this._processos[atual].termino += this._processos[atual].tempoRestante >= quantum ? sobrecarga : 0;
			}

			if(this._processos[atual].tempoRestante <= 0){
				processosRestantes--;
			}
			i++;
			//TODO	: CONSIDERAR TEMPO TOTAL DE EXECUÇÃO PARA PODER EXECUTAR
			//PROCESSOS QUE POSSAM CHEGAR DEPOIS DE TODOS OS OUTROS PROCESSOS TEREM ACABADO
		}
		this._processos.forEach(function(p){
			p.turnaround = p.termino - p.chegada;
			taTotal += p.turnaround;
		});
		return taTotal/qtdP;
	}

/////////////////////////////////////////////////
	edf () {
		let qtdP = this._processos.length;
		let processosRestantes = qtdP;
		let taTotal = 0;

		let quantum = 2;
		let sobrecarga = 1;
		let tempo = 0;

		this._processos.sort(function(a, b){
			return a.deadline - b.deadline;
		});

		let i = 0;
		while(processosRestantes > 0){
			let atual = i % qtdP;

			if (i === 0) {
				this._processos[atual].termino = Math.min(quantum, this._processos[atual].tempoRestante);
				this._processos[atual].tempoRestante -= quantum;
				this._processos[atual].termino += this._processos[atual].tempoRestante >= quantum ? sobrecarga : 0;
				this._processos[atual].existe = true;
			}


			if (this._processos[atual].existe === false &&
				this._processos[atual].chegada <= this._processos[this.anteriorExistente(atual)].termino &&
				this._processos[atual].tempoRestante > 0) {
					this._processos[atual].existe = true;
			}
			if (this._processos[atual].tempoRestante <= 0) {
				this._processos[atual].existe = false;
			}
			else if(i!==0 && this._processos[atual].existe){
				this._processos[atual].termino = this._processos[this.anteriorExistente(atual)].termino + Math.min(quantum, this._processos[atual].tempoRestante);
				this._processos[atual].tempoRestante -= quantum;
				this._processos[atual].termino += this._processos[atual].tempoRestante >= quantum ? sobrecarga : 0;
			}

			if(this._processos[atual].tempoRestante <= 0){
				processosRestantes--;
			}
			i++;
			//TODO	: CONSIDERAR TEMPO TOTAL DE EXECUÇÃO PARA PODER EXECUTAR
			//PROCESSOS QUE POSSAM CHEGAR DEPOIS DE TODOS OS OUTROS PROCESSOS TEREM ACABADO
		}
		this._processos.forEach(function(p){
			p.turnaround = p.termino - p.chegada;
			taTotal += p.turnaround;
		});
		return taTotal/qtdP;
	}
}
