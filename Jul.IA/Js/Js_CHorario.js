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
      element: "#Bloco",
      popover: {
        title: "Bloco principal",
        description: "Neste bloco estaram as informações sobre os horarios das aulas, como o dia, horário, nome da disciplina e nome do professor.",
      },
      onHighlighted: () => {
        if (mascote) {
          mascote.src = "../../Imagens/personagem_1.png";
          mascote.style.display = 'block';
        }
      }
    },
    {
      element: "#Dia",
      popover: {
        title: "Dia da semana",
        description: "Nesta parte é possível ver o dia da semana, para facilitar a visualização dos horários das aulas, eles estão organizados por dia da semana.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_2.png";
      }
    },
        {
      element: "#Codigo",
      popover: {
        title: "Codigo da disciplina",
        description: "Este é o código único da disciplina, ele é util para identificar a disciplina de uma forma mais resumida.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
        {
      element: "#Disciplina",
      popover: {
        title: "Nome da disciplina",
        description: "Este é o nome por extenso da disciplina, ele que é mais o modo mais usado para se referir a disciplina.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_4.png";
      }
    },
    {
      element: "#Horario",
      popover: {
        title: "Horario da aula",
        description: "Este é o horário da aula, indicando o início e o fim da mesma.",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_1.png";
      }
    },
    {
      element: "#Proximo",
      popover: {
        title: "Próxima aula",
        description: "Quando a mais aulas na grade, elas apareceram logo em seguida.",
      },
    },
  ],
});

driverObj.drive();