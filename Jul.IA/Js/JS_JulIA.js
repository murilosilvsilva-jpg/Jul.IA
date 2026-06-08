
// Elementos da interface do chat
const avatar = document.getElementById("avatar");
const chatContainer = document.getElementById("chat-container");
const inputMsg = document.getElementById("input-msg");
const chatBody = document.querySelector(".chat-body");
const btbEnviar = document.getElementById("btn-enviar");

// Contadores e variáveis globais
let linkStepCounter = 0;
const driverCssUrl = 'https://unpkg.com/driver.js/dist/driver.min.css';
const driverScriptUrl = 'https://unpkg.com/driver.js/dist/driver.min.js';

// Função para carregar Driver.js dinamicamente
function loadDriverResources() {
    return new Promise((resolve) => {
        if (window.Driver) return resolve();

        if (!document.querySelector(`link[href="${driverCssUrl}"]`)) {
            const l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = driverCssUrl;
            document.head.appendChild(l);
        }

        if (!document.querySelector(`script[src="${driverScriptUrl}"]`)) {
            const s = document.createElement('script');
            s.src = driverScriptUrl;
            s.onload = () => resolve();
            s.onerror = () => resolve();
            document.head.appendChild(s);
        } else {
            const existing = document.querySelector(`script[src="${driverScriptUrl}"]`);
            if (window.Driver) resolve(); else {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () => resolve());
            }
        }
    });
}

// Função para iniciar tour de um link
function startTourForLink(el, title, description) {
    loadDriverResources().then(() => {
        if (!window.Driver) {
            window.location.href = el.href;
            return;
        }
        try {
            const driver = new Driver({ allowClose: true, animate: true });
            driver.defineSteps([{
                element: el,
                popover: {
                    title: title || el.textContent.trim(),
                    description: description || el.textContent.trim()
                }
            }]);
            driver.start();
            el.setAttribute('data-tour-shown', 'true');
        } catch (e) {
            window.location.href = el.href;
        }
    });
}

// Função para enviar mensagem
function enviarMensagem() {
    if (!inputMsg || !chatBody) return;

    const texto = inputMsg.value.trim();
    if (!texto) {
        inputMsg.style.border = "1px solid red";
        return;
    }

    inputMsg.style.border = "1px solid #cfc7c7";

    const userMessage = document.createElement("div");
    userMessage.className = "msg user";
    userMessage.textContent = texto;
    chatBody.appendChild(userMessage);

    const respostaBot = document.createElement("div");
    respostaBot.className = "msg assistant";
    respostaBot.textContent = "Carregando...";
    chatBody.appendChild(respostaBot);
    chatBody.scrollTop = chatBody.scrollHeight;

    if (btbEnviar) {
        btbEnviar.disabled = true;
        btbEnviar.style.cursor = "not-allowed";
    }
    inputMsg.disabled = true;
    inputMsg.value = "";

    setTimeout(() => {
        respostaBot.textContent = "Desculpe, não temos essa funcionalidade no momento. Se precisar de mais informções se dirija ao balcão da Fatec, ou mande um email para: f137acad@cps.sp.gov.br";
        if (btbEnviar) {
            btbEnviar.disabled = false;
            btbEnviar.style.cursor = "pointer";
        }
        inputMsg.disabled = false;
        inputMsg.focus();
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 200);
}

// Mensagens iniciais exibidas quando o chat carrega
const mensagensIniciais = [
    { type: 'text', text: 'Olá, eu sou a Jul.IA, a assistente virtual do CPS SIGA!' },
    { type: 'link', text: 'Clique aqui para acessar suas notas!', href: 'Chat/Notas.html' },
    { type: 'link', text: 'Clique aqui para acessar suas faltas!', href: 'Chat/Faltas.html' },
    { type: 'link', text: 'Clique aqui para acessar seu horário!', href: 'Chat/Horario.html' },
    { type: 'link', text: 'Clique aqui para acessar suas disciplinas!', href: 'Chat/Disciplinas.html' },
    { type: 'link', text: 'Clique aqui para acessar seu histórico!', href: 'Chat/Historico.html' },
    { type: 'text', text: 'Caso nenhuma das opções acima se aplique, por favor, me informe como posso ajudar.' }
];

// 1. FUNÇÃO AUXILIAR: cria uma mensagem simples no formato de balão do chat
function criarMensagem(texto, classes = 'msg') {
    const elemento = document.createElement('div');
    elemento.className = classes;
    elemento.textContent = texto;
    return elemento;
}

// 2. FUNÇÃO AUXILIAR: cria uma mensagem de link para o chat
function criarLinkMensagem(texto, href) {
    const link = document.createElement('a');
    link.href = href;
    link.className = 'chat-link';
    linkStepCounter += 1;
    link.setAttribute('data-driver-step', 'link-' + linkStepCounter);
    link.appendChild(criarMensagem(texto, 'msg msg_txt'));
    link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = href;
    });
    return link;
}

// 3. FUNÇÃO AUXILIAR: exibe as mensagens uma a uma com atraso entre elas
function exibirMensagensSequenciais(mensagens, delay = 800) {
    return new Promise((resolve) => {
        let indice = 0;
        const intervalo = setInterval(() => {
            if (indice >= mensagens.length) {
                clearInterval(intervalo);
                resolve();
                return;
            }
            chatBody.appendChild(mensagens[indice]);
            chatBody.scrollTop = chatBody.scrollHeight;
            indice += 1;
        }, delay);
    });
}

// 4. CARREGA AS MENSAGENS INICIAIS NO CHAT COM EFEITO DE "CARREGANDO..."
function carregarMensagensIniciais() {
    if (!chatBody) return;

    const loadingMessage = criarMensagem('Carregando...', 'msg assistant');

    chatBody.innerHTML = '';
    chatBody.appendChild(loadingMessage);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.innerHTML = '';

        // Sempre recriar as mensagens para evitar perda de event listeners
        const mensagensParaExibir = mensagensIniciais.map(item => {
            if (item.type === 'text') {
                return criarMensagem(item.text);
            }
            return criarLinkMensagem(item.text, item.href);
        });

        exibirMensagensSequenciais(mensagensParaExibir, 500).then(() => {
            loadDriverResources();
        });
    }, 100);
}

// 5. LÓGICA DE TRANSIÇÃO DO AVATAR (COM ESPERA DE 2 SEGUNDOS)
if (avatar && chatContainer) {
    avatar.addEventListener("click", () => {
        avatar.classList.add('escondido');
        if (avatar.classList.contains('minimizado')) {
            chatContainer.classList.remove('aberto');
        }

        setTimeout(() => {
            const virouMinimizado = avatar.classList.toggle('minimizado');

            if (virouMinimizado) {
                chatContainer.classList.add('aberto');
                carregarMensagensIniciais();
                if (inputMsg) inputMsg.focus();
            } else {
                chatContainer.classList.remove('aberto');
            }

            avatar.classList.remove('escondido');
        }, 500);
    });
}

// Listener para Enter key no input
if (inputMsg) {
    inputMsg.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });
}