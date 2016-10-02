class Processo {

	constructor(chegada, duracao){
		this._chegada = chegada
		this._duracao = duracao
		this._tempoRestante = duracao
		this._segmentos = new Array()
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

	set segmentos(value){
		this._segmentos = value;
	}

	get segmentos(){
		return this._segmentos;
	}

	set tempoRestante(value){
		this._tempoRestante = value;
	}

	get tempoRestante(){
		return this._tempoRestante;
	}

}
