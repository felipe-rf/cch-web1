// Dados mockados
const storedData = localStorage.getItem("roomsData");
const mockData = storedData
  ? JSON.parse(storedData)
  : {
      rooms: [
        {
          id: 1,
          type: "cavaleiro",
          name: "Aposento do Cavaleiro",
          description: "Conforto e nobreza para sua estadia",
          price: 350,
          capacity: 2,
          image: "/static/img/aposento.jpeg",
        },
        {
          id: 2,
          type: "real",
          name: "Câmara Real",
          description: "Elegância e sofisticação medieval",
          price: 650,
          capacity: 2,
          image: "/static/img/camera.jpeg",
        },
        {
          id: 3,
          type: "imperial",
          name: "Suíte Imperial",
          description: "O máximo em luxo medieval",
          price: 1200,
          capacity: 4,
          image: "/static/img/suiteMaster.webp",
        },
      ],
      services: [
        {
          id: 1,
          name: "Banquete Medieval",
          description: "Festim completo com pratos típicos da época",
          price: 200,
        },
        {
          id: 2,
          name: "Torneio de Arco e Flecha",
          description: "Aprenda com nossos mestres arqueiros",
          price: 100,
        },
        {
          id: 3,
          name: "Passeio a Cavalo",
          description: "Explore nossos domínios em uma montaria real",
          price: 150,
        },
      ],
      bookings: [],
    };

const img = localStorage.getItem("images");
var carousselImages = img
  ? JSON.parse(img)
  : ["/static/img/hero1.png", "/static/img/hero2.png", "/static/img/hero3.jpg"];
