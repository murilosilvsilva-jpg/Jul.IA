const driver = window.driver.js.driver;

// 1. Pegamos a referência da Júlia no HTML
const mascote = document.getElementById('mascote-tour');

// [Opcional] Pré-carrega as 4 poses na memória para a troca ser instantânea e não "piscar"
['../../Imagens/personagem_1.png', '../../Imagens/personagem_2.png', '../../Imagens/personagem_3.png', '../../Imagens/personagem_4.png'].forEach(src => {
    const img = new Image();
    img.src = src;
});

const driverObj = driver({
    showProgress: true,
    
    // Quando o usuário fechar o tour ou ele terminar, a Júlia some da tela
    onDestroyed: () => {
        if (mascote) mascote.style.display = 'none';
    },
    
    steps: [
        {
            element: "#Primeiro",
            popover: {
                title: "Bloco de Informações",
                description: "Aqui ficam as informações das materia vigentes",
            },
            // Quando entrar no passo 1: Mostra a Júlia na Pose 1
            onHighlighted: () => {
                if (mascote) {
                    mascote.src = "../../Imagens/personagem_1.png"; // Caminho da pose 1
                    mascote.style.display = 'block'; // Garante que ela apareça
                }
            }
        },
        {
            element: "#Segundo",
            popover: {
                title: "Código",
                description: "Esse é o codigo da disciplina",
            },
            // Quando entrar no passo 2: Muda para a Pose 2
            onHighlighted: () => {
                if (mascote) mascote.src = "../../Imagens/personagem_2.png"; // Caminho da pose 2
            }
        },
        {
            element: "#Terceira",
            popover: {
                title: "Nome da Disciplina",
                description: "Esse é o nome da disciplina",
            },
            // Quando entrar no passo 3: Muda para a Pose 3
            onHighlighted: () => {
                if (mascote) mascote.src = "../../Imagens/personagem_3.png"; // Caminho da pose 3
            }
        },
        {
            element: "#Quarta",
            popover: {
                title: "Nome do Professor",
                description: "E por fim , esse é o nome do professor da disciplina",
            },
            // Quando entrar no passo 4: Muda para a Pose 4
            onHighlighted: () => {
                if (mascote) mascote.src = "../../Imagens/personagem_4.png"; // Caminho da pose 4
            }
        },
    ],
});

driverObj.drive();