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
      element: "#Cards",
      popover: {
        title: "Bloco principal",
        description: "Neste bloco estaram as principais informações da materia que você deseja saber a nota",
      },
      onHighlighted: () => {
        if (mascote) {
          mascote.src = "../../Imagens/personagem_1.png";
          mascote.style.display = 'block';
        }
      }
    },
    {
      element: "#Codigo",
      popover: {
        title: "Código da disciplina",
        description: "Esse codigo serve para identificar a disciplina, ele é util caso você queira ver o planejamento da disciplina, na documentação com todo roteiro das materias do curso inteiro.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_2.png";
      }
    },
        {
      element: "#Disciplina",
      popover: {
        title: "Nome da disciplina",
        description: "Este é o nome por extenso da disciplina, ele que é mais o modo mais usado para se referir a disciplina.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
        {
      element: "#Professor",
      popover: {
        title: "Nome do professor",
        description: "Este é o nome do professor responsável pela disciplina.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_4.png";
      }
    },
  ],
});

driverObj.drive();