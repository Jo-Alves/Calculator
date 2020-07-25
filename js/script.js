(function () {

	const $display = document.querySelector(".display"), btnDigits = document.querySelectorAll(".digit"),
		btnOperators = document.querySelectorAll(".operator"), btnResult = document.querySelector(".result"),
		btnComma = document.querySelector(".comma"), btnBack = document.querySelector(".back"),
		btnInitialize = document.querySelector(".ac");

	let operator = "", indexValue = 0, pressedBtnOperator = false, getResultInvokedFunction = false, pressedBtnResult = false, value = [0, 0], countOperatorPressed = 0;

	/*  
	** Para ter a escutar do evento click e realizado o forEach e cada vex que é clicado em um botão de digitos
	** o evento click é acionado
	*/

	btnDigits.forEach(digit => {
		digit.addEventListener("click", SetDigit)
	})

	/*  
	** Para ter a escutar do evento click e realizado o forEach e cada vex que é clicado em um botão de operação
	** o evento click é acionado
	*/

	btnOperators.forEach(operator => {
		operator.addEventListener("click", SetOperator)
	})

	btnInitialize.addEventListener("click", Initialize)

	btnComma.addEventListener("click", SetComma)

	btnResult.addEventListener("click", GetResult)

	btnBack.addEventListener("click", BackDigit)

	function BackDigit() {
		// se pressedBtnOperator ou pressedBtnResultfor verdadeira não será permitido a exclusão do último digito

		if (pressedBtnOperator || pressedBtnResult)
			return;

		// se a quantidade de caracteres for igual a um o display mostrará zero em nossa tela 
		// e o array value de acordo com o seu índice receberá zero e função será retornada

		if ($display.innerText.length === 1) {
			$display.innerText = "0";
			value[indexValue] = 0;
			return;
		}

		$display.innerText = $display.innerText.substr(0, $display.innerText.length - 1);
		value[indexValue] = parseFloat($display.innerText);
	}

	function GetResult(event) {
		switch (operator) {
			case "+":
				value[0] = value[0] + value[1];
				break;
			case "-":
				value[0] = value[0] - value[1];
				break;
			case "*":
				value[0] = value[0] * value[1];
				break;
			case "/":
				value[0] = value[0] / value[1];
				break;
		}

		// O display exibirá o resultado que foi inserido na primeira posição do array value e a variavel getResultInvokedFunction recebe 
		// verdadeira dando a entender que houve a operação

		$display.innerText = value[0].toString();
		getResultInvokedFunction = true;

		// Se o evento vem do botão btnResult a variável pressedBtnResult recebe verdadeira indicando que o botão de igual foi acionado

		if (event) {
			pressedBtnResult = true;
		}

		// O indexValue volta ao valor padrão

		indexValue = 0;

		// Se o valor do resultado inserido no display for maior que doze será adicionado uma class no Html e CSs para diminuir a fonte da tela

		if ($display.innerText.length > 12) {
			$display.classList.add("displaySize");
		}
		else
			$display.classList.remove("displaySize");
	}

	function SetOperator(event) {

		// De início o countOperatorPressed será inclementado
		// para saber quantas vezes a tecla de operação foi pressionado

		++countOperatorPressed;

		//Se o botão do resultado não foi pressionado e o countOperatorPressed foi pressionado uma vez
		// a função GetResult() será invocada para que o a operação entre o value[0] e value[1] seja realizada
		// se não o pressedBtnResult recebe false;

		if (!pressedBtnResult && countOperatorPressed === 1) {
			GetResult();
		}
		else
			pressedBtnResult = false;

		// Se o a função do GetResult foi invocada a segunda posição do array value receberá o valor contido no display
		// para que  após ser pressionado a tecla de operação a tecla de resultado for pressionado o primeira posição do array 
		// value seja calculado com o valor que está contido com o valor que está na segunda posição do array value

		if (getResultInvokedFunction) {
			value[1] = parseFloat($display.innerText);
		}

		operator = event.target.innerText;
		indexValue = 1;
		pressedBtnOperator = true;
	}

	function SetComma(event) {

		// Apos o Botão btnResult for pressionado ao digitar novos valores a Função Initialize será invocada novamente

		if (pressedBtnResult) {
			Initialize();
		}

		if (pressedBtnOperator) {
			$display.innerText = "0.";
			pressedBtnOperator = false;
		}

		// Se a virgula (ponto) não foi incluida o tamanho dos caracteres da tela for menor que 10 
		// O display.innerText reberá a virgula (ponto)

		if ($display.innerText.indexOf(event.target.innerText) === -1 && $display.innerText.length < 10)
			$display.innerText += event.target.innerText;
	}

	function SetDigit(event) {

		// O sizeDisplay é o valor Maximo de caracteres que  tela display deve ter

		let sizeDisplay = 10;

		// Se o primeiro Valor do array após ser feito o cálculo for Infinity ou NaN 
		// os  comando abaixo da condição não será realizados

		if (!isFinite(value[0]) | isNaN(value[0]))
			return;

		// Apos o Botão btnResult for pressionado ao digitar novos valores a Função Initialize será invocada novamente

		if (pressedBtnResult) {
			Initialize();
		}

		if ($display.innerText === "0" || pressedBtnOperator || getResultInvokedFunction) {
			if ($display.innerText !== "0.")
				$display.innerText = "";

			$display.classList.remove("displaySize");
			pressedBtnOperator = false;
			getResultInvokedFunction = false;
		}

		// Aqui nós verificamos se no display tiver contido um virgula(ponto) o valor da variavel sizeDisplay passa a inclementar mais um

		if ($display.innerText.indexOf(".") > -1)
			sizeDisplay += 1;

		//Se os caracteres corremponderem o tamanho do valor da variável sizeDisplay
		//não será permitido a inserção de digtos no display

		if ($display.innerText.length >= sizeDisplay)
			return;

		$display.innerText += event.target.innerText;
		value[indexValue] = parseFloat($display.innerText);
		countOperatorPressed = 0;
	}

	function Initialize() {
		$display.innerText = "0";
		value = [0, 0];
		operator = "";
		indexValue = 0;
		$display.classList.remove("displaySize");
		pressedBtnOperator = false;
		getResultInvokedFunction = false;
		pressedBtnResult = false;
		countOperatorPressed = 0;
	}

})()