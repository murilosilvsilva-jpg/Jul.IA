const driver = window.driver.js.driver;

const mascote = document.getElementById('mascote-tour');

['../../Imagens/personagem_1.png', '../../Imagens/personagem_2.png', '../../Imagens/personagem_3.png', '../../Imagens/personagem_4.png'].forEach(src => {
    const img = new Image();
    img.src = src;
});

const driverObj = driver({
  
  showProgress: true,
  onDestroyed: () => {
    if (mascote) mascote.style.display = 'none';
  },
  steps: [
    {
      element: "#Primeiro",
      popover: {
        title: "Essa é a pagina histórico",
        description: "Vou te explicar como funciona",
      },
      onHighlighted: () => {
        if (mascote) {
          mascote.src = "../../Imagens/personagem_1.png";
          mascote.style.display = 'block';
        }
      }
    },
    {
      element: "#Segundo",
      popover: {
        title: "Esses são os seletores dos elementos da pagina",
        description: "Nele você podera filtrar o seu histórico por...",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_2.png";
      }
    },
        {
      element: "#Terceiro",
      popover: {
        title: "Status",
        description: "Aqui você vê se a opção esta ativa ou concluida",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
        {
      element: "#Quarto",
      popover: {
        title: "Periodo",
        description: "Esse filtro é para ter uma busca pelo ano",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_4.png";
      }
    },
    {
      element: "#Quinto",
      popover: {
        title: "Bloco principal",
        description: "Aqui estão as informações importantes",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_1.png";
      }
    },
    {
      element: "#Sexto",
      popover: {
        title: "Informações da disciplina",
        description: "Esses são Codigo da disciplina e nome do professor",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_2.png";
      }
    },
    {
      element: "#Setimo",
      popover: {
        title: "Média",
        description: " Sua media já calculada",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
    {
      element: "#Oitavo",
      popover: {
        title: "Frequência",
        description: "Sua frequência",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_4.png";
      }
    },
        {
      element: "#Nono",
      popover: {
        title: "Semestre",
        description: "O semestre que você cursou essa matéria",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_1.png";
      }
    },
        {
      element: "#Decimo",
      popover: {
        title: "Ano",
        description: "O ano em que você cursou essa matéria",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_2.png";
      }
    },
    {
      element: "#DecimoPrimeiro",
      popover: {
        title: "Status",
        description: "E aqui te diz se você foi aprovado ou reprovado por nota e falta",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
  ],
});

driverObj.drive();