class Processo {

	constructor(chegada, duracao /*, inicio, termino, turnaround, esperandoSemExecutar*/){
		this._chegada = chegada
		this._duracao = duracao
		//this._inicio = inicio
		//this._termino = termino
		//this._turnaround = turnaround
		//this._esperandoSemExecutar = esperandoSemExecutar	
	}


	get duracao(){
		return this._duracao;
	}

	get chegada(){
		return this._chegada;
	}

	set inicio(value){
		this._inicio = value;
	}

	get inicio(){
		return this._inicio;
	}

	set termino(value){
		this._termino = value;
	}

	get termino(){
		return this._termino;
	}

	set turnaround(value){
		this._turnaround = value;
	}

	get turnaround(){
		return this._turnaround;
	}

	set esperandoSemExecutar(value){
		this._esperandoSemExecutar = value;
	}

	get esperandoSemExecutar(){
		return this._esperandoSemExecutar;
	}

}