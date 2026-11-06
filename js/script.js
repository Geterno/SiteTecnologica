// ===== Tema escuro =====

// Pega o botão e o body da página
const botaoTema = document.querySelector("#botao-tema");
const corpo = document.body;

// Monta o interior do interruptor: ícone do sol, ícone da lua e a bolinha.
// Os ícones são só contorno (stroke) e usam a cor definida no CSS (currentColor).
botaoTema.innerHTML = `
    <svg
        class="icone icone-sol"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">

        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>

    </svg>

    <svg
        class="icone icone-lua"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">

        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>

    </svg>

    <span class="botao-bolinha"></span>
`;

// Informa a leitores de tela se o tema escuro está ligado
function atualizarEstado() {
    botaoTema.setAttribute(
        "aria-pressed",
        corpo.classList.contains("tema-escuro")
    );
}

// Ao carregar a página, restaura o tema que foi salvo
if (localStorage.getItem("tema") === "escuro") {
    corpo.classList.add("tema-escuro");
}

atualizarEstado();

// Ao clicar: alterna o tema e salva a escolha
botaoTema.addEventListener("click", function () {

    corpo.classList.toggle("tema-escuro");

    if (corpo.classList.contains("tema-escuro")) {
        localStorage.setItem("tema", "escuro");
    } else {
        localStorage.setItem("tema", "claro");
    }

    atualizarEstado();

});


// ===== Formulário de contato =====

// Mostra um erro embaixo do campo e marca o campo como inválido
function mostrarErro(campo, mensagem) {

    document.querySelector("#erro-" + campo.id).textContent = mensagem;

    campo.classList.add("invalido");

}

// Apaga o erro de um campo
function limparErro(campo) {

    document.querySelector("#erro-" + campo.id).textContent = "";

    campo.classList.remove("invalido");

}

const formulario = document.querySelector("#form-contato");

// Só existe na página de Contato; nas outras o formulário é null
if (formulario) {

    const statusForm = document.querySelector("#status-form");

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault(); // impede o envio real (e o erro)

        // 1. Pega os campos
        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const assunto = document.querySelector("#assunto");
        const mensagem = document.querySelector("#mensagem");

        let temErro = false;
        statusForm.textContent = "";

        // 2. Valida o nome: não pode ficar vazio
        if (nome.value.trim() === "") {

            mostrarErro(nome, "Digite seu nome.");
            temErro = true;

        } else {

            limparErro(nome);

        }

        // 3. Valida o e-mail: não pode ficar vazio e precisa ter formato básico
        const textoEmail = email.value.trim();

        if (textoEmail === "") {

            mostrarErro(email, "Digite seu e-mail.");
            temErro = true;

        } else if (
            !textoEmail.includes("@") ||
            !textoEmail.includes(".")
        ) {

            mostrarErro(
                email,
                "Digite um e-mail válido, como nome@exemplo.com."
            );

            temErro = true;

        } else {

            limparErro(email);

        }

        // 4. Valida o assunto: precisa escolher uma opção
        if (assunto.value === "") {

            mostrarErro(assunto, "Escolha um assunto.");
            temErro = true;

        } else {

            limparErro(assunto);

        }

        // 5. Valida a mensagem: no mínimo 10 caracteres
        if (mensagem.value.trim().length < 10) {

            mostrarErro(
                mensagem,
                "Escreva pelo menos 10 caracteres."
            );

            temErro = true;

        } else {

            limparErro(mensagem);

        }

        // 6. Só confirma o envio se não houve nenhum erro
        if (!temErro) {

            formulario.reset(); // limpa os campos

            statusForm.textContent =
                "Mensagem enviada com sucesso! Obrigado pelo contato.";

            // Apaga a confirmação depois de 5 segundos
            setTimeout(function () {

                statusForm.textContent = "";

            }, 5000);

        }

    });

}
