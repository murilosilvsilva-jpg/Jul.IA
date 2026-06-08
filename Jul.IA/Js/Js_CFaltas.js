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
        title: "Bloco de informações",
        description: "Esse é o bloco que estará as informações que você deseja",
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
        title: "Nome da disciplina e código",
        description: "Aqui fica o Código e o nome da dísciplina",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_2.png";
      }
    },
        {
      element: "#Terceira",
      popover: {
        title: "Aulas",
        description: "Essa aqui é a quantidade de aulas que teve",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
        {
      element: "#Quarta",
      popover: {
        title: "Presença",
        description: "Esse é o numero de presenças que você teve",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_4.png";
      }
    },
    {
      element: "#Quinta",
      popover: {
        title: "Ausência",
        description: "Esse é o numero de faltas que você teve nessa disciplina",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_1.png";
      }
    },
    {
      element: "#Sexta",
      popover: {
        title: "Frequência",
        description: "Aqui temos a sua frequência, calculada e tensformada em prosentagem",
      },
      onHighlighted: () => {
        if (mascote) mascote.src = "../../Imagens/personagem_3.png";
      }
    },
  ],
});

driverObj.drive();