// === ESPERA O HTML CARREGAR COMPLETO ===
document.addEventListener('DOMContentLoaded', function() {

    // ---------- 1. SISTEMA DE ABAS (NAVEGAÇÃO ENTRE OS 11 SLIDES) ----------
    const botoesAbas = document.querySelectorAll('.aba-btn');
    const conteudosAbas = document.querySelectorAll('.aba-conteudo');

    function ativarAba(numeroAba) {
        // Remove a classe 'ativa' de todos os botões e conteúdos
        botoesAbas.forEach(botao => botao.classList.remove('ativa'));
        conteudosAbas.forEach(conteudo => conteudo.classList.remove('ativa'));

        // Adiciona a classe 'ativa' ao botão e conteúdo correspondente
        const botaoAtivo = document.querySelector(`.aba-btn[data-aba="${numeroAba}"]`);
        const conteudoAtivo = document.getElementById(`aba-${numeroAba}`);

        if (botaoAtivo && conteudoAtivo) {
            botaoAtivo.classList.add('ativa');
            conteudoAtivo.classList.add('ativa');
        }
    }

    // Adiciona o evento de clique para cada botão de aba
    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            const numeroAba = this.getAttribute('data-aba');
            ativarAba(numeroAba);
        });
    });

    // ---------- 2. BOTÃO DE CURIOSIDADES (com efeito sonoro) ----------
    const botaoCuriosidade = document.getElementById('botao-curiosidade');
    const textoCuriosidade = document.getElementById('texto-curiosidade');

    // Array com curiosidades sobre sustentabilidade
    const curiosidades = [
        "🌱 Uma árvore adulta absorve até 22 kg de CO₂ por ano.",
        "💡 Lâmpadas LED gastam 80% menos energia que as incandescentes.",
        "♻️ Reciclar uma única lata de alumínio economiza energia suficiente para manter uma TV ligada por 3 horas.",
        "🌊 Mais de 8 milhões de toneladas de plástico vão parar nos oceanos anualmente.",
        "🚲 Se cada pessoa trocar o carro pela bicicleta um dia por semana, reduzimos 5% das emissões de CO₂.",
        "🌍 A energia solar é a fonte de energia que mais cresce no mundo.",
        "🐝 Abelhas são responsáveis pela polinização de 70% das culturas alimentares."
    ];

    if (botaoCuriosidade) {
        botaoCuriosidade.addEventListener('click', function() {
            // Pega uma curiosidade aleatória
            const indice = Math.floor(Math.random() * curiosidades.length);
            textoCuriosidade.textContent = curiosidades[indice];

            // ---------- EFEITO SONORO (SOM DE SINO/NOTIFICAÇÃO) ----------
            try {
                // Cria um som simples com a Web Audio API
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Frequência
                gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume baixo

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.2); // Som curto de 0.2s
            } catch (e) {
                console.log("Navegador não suportou som automático, mas tudo bem.");
            }
        });
    }

    // ---------- 3. FORMULÁRIOS (simular envio com mensagem) ----------
    const formularios = document.querySelectorAll('form');
    formularios.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio real para simular

            // Encontra a mensagem de sucesso dentro do formulário e mostra
            const msgSucesso = this.querySelector('.msg-sucesso');
            if (msgSucesso) {
                msgSucesso.style.display = 'block';
                msgSucesso.style.color = 'green';
                msgSucesso.style.fontWeight = 'bold';
                
                // Esconde a mensagem após 3 segundos
                setTimeout(() => {
                    msgSucesso.style.display = 'none';
                }, 3000);
            }

            // Limpa os campos (opcional)
            this.reset();
        });
    });

    // ---------- 4. AVALIAÇÃO COM EMOJIS ----------
    const emojis = document.querySelectorAll('.avaliacao-emojis span');
    const resultadoAvaliacao = document.getElementById('resultado-avaliacao');

    if (emojis.length > 0) {
        emojis.forEach(emoji => {
            emoji.addEventListener('click', function() {
                // Remove a classe 'selecionado' de todos
                emojis.forEach(e => e.classList.remove('selecionado'));

                // Adiciona a classe 'selecionado' ao clicado
                this.classList.add('selecionado');

                // Pega a nota do atributo data-nota
                const nota = this.getAttribute('data-nota');
                resultadoAvaliacao.textContent = `Você avaliou com ${nota}. Obrigada! 💚`;
            });
        });
    }

    // ---------- 5. EFEITOS SONOROS (COM BOTÕES DIFERENTES) ----------
    const botaoPassaro = document.getElementById('som-passaro');
    const botaoAgua = document.getElementById('som-agua');
    const botaoReciclar = document.getElementById('som-reciclar');

    // Função para tocar um som simples com frequência diferente
    function tocarSom(tipo) {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume baixo

            if (tipo === 'passaro') {
                // Som agudo e rápido
                osc.frequency.setValueAtTime(1500, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
                osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            } else if (tipo === 'agua') {
                // Som de água (ruído)
                osc.stop(); // Para o oscilador, vamos usar ruído
                const bufferSize = 4096;
                const whiteNoise = audioCtx.createScriptProcessor(bufferSize, 1, 1);
                whiteNoise.onaudioprocess = function(e) {
                    const output = e.outputBuffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        output[i] = Math.random() * 2 - 1; // Ruído branco
                    }
                };
                whiteNoise.connect(gain);
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                setTimeout(() => {
                    whiteNoise.disconnect();
                }, 800);
            } else if (tipo === 'reciclar') {
                // Som de "ding" mais grave
                osc.frequency.setValueAtTime(400, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            }
        } catch (e) {
            alert("Seu navegador pode não suportar sons, mas os botões funcionam!");
        }
    }

    if (botaoPassaro) botaoPassaro.addEventListener('click', () => tocarSom('passaro'));
    if (botaoAgua) botaoAgua.addEventListener('click', () => tocarSom('agua'));
    if (botaoReciclar) botaoReciclar.addEventListener('click', () => tocarSom('reciclar'));

    // ---------- 6. EFEITO VISUAL EXTRA: MUDAR COR DE FUNDO AO PASSAR O MOUSE NO TÍTULO ----------
    const titulos = document.querySelectorAll('h2');
    titulos.forEach(titulo => {
        titulo.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgb(245, 251, 230)';
            this.style.transition = '0.5s';
        });
        titulo.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

});