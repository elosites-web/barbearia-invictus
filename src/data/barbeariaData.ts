/**
 * Dados centrais da Barbearia Invictus - Jundiaí, SP
 * Separados da lógica de apresentação para fácil edição pelo proprietário (Kauan).
 */

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  tag?: string;
  whatsappMessage: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  stars: number;
  dateText?: string;
  quote: string;
  source: string;
  avatarUrl?: string;
  cutPhoto?: {
    title: string;
    webpSrc: string;
    fallbackSrc: string;
    alt: string;
  };
}

export interface GalleryPhoto {
  id: string;
  src: string;
  webpSrc: string;
  fallbackSrc: string;
  title: string;
  category: string;
  isHighRes: boolean;
  alt: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image?: {
    webpSrc: string;
    fallbackSrc: string;
    alt: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BARBEARIA_CONFIG = {
  name: "Barbearia Invictus",
  owner: "Kauan",
  signature: "INVICTUS",
  signatureSub: "BARBEARIA · JUNDIAÍ",
  slogan: "Atendimento de alto nível para quem exige o melhor!",
  heroDescription:
    "Seu estilo merece atenção aos detalhes. Encontre na Barbearia Invictus o cuidado e o atendimento que fazem a diferença.",
  phoneFormatted: "(11) 94268-8432",
  phoneRaw: "5511942688432",
  whatsappUrl: "https://wa.me/5511942688432",
  defaultWhatsappMessage: "Olá! Gostaria de agendar um horário na Barbearia Invictus.",
  email: "barbeariainvictus001@gmail.com",
  address: {
    street: "Rua Rio de Janeiro, 266",
    neighborhood: "Jardim Tarumã",
    city: "Jundiaí",
    state: "SP",
    cep: "13216-570",
    full: "Rua Rio de Janeiro, 266, Jardim Tarumã, Jundiaí - SP, CEP 13216-570",
  },
  socials: {
    instagram: "https://www.instagram.com/barbeariainvictusjdi/",
    facebook: "https://www.facebook.com/barbeariainvictusjdi/",
    googleMaps: "https://www.google.com/maps/place/Barbearia+Invictus/@-23.1653319,-46.8731039,17z/data=!3m1!4b1!4m6!3m5!1s0x94cf26513b99a523:0x4bc92d987a429fd4!8m2!3d-23.1653369!4d-46.870529!16s%2Fg%2F11b76mgwsx?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",
    googleReviews: "https://www.google.com/maps/place/Barbearia+Invictus/@-23.1653369,-46.870529,17z/data=!4m8!3m7!1s0x94cf26513b99a523:0x4bc92d987a429fd4!8m2!3d-23.1653369!4d-46.870529!9m1!1b1!16s%2Fg%2F11b76mgwsx?entry=ttu",
    waze: "https://waze.com/ul?ll=-23.1653369,-46.870529&navigate=yes",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Barbearia+Invictus+Rua+Rio+de+Janeiro+266+Jundiai&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  logoPath: "/assets/aistudio/logotipo-invictus_864dcca7.webp",
  logoFallbackPath: "/assets/aistudio/logotipo-invictus_864dcca7.png",
  emblemPath: "/assets/aistudio/05-emblema-invictus-recorte-de-referencia_3fa9ec85.webp",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "corte",
    name: "Corte de Cabelo",
    price: "R$ 35,00",
    description: "Todo tipo de corte: simples, degradê, social, americano, moicano e outros estilos.",
    tag: "Mais pedido",
    whatsappMessage: "Olá! Gostaria de agendar um Corte de Cabelo (R$ 35,00) na Barbearia Invictus.",
  },
  {
    id: "barba",
    name: "Barba Completa",
    price: "R$ 25,00",
    description: "Todo tipo de barba. Escolha o estilo que mais combina com você!",
    whatsappMessage: "Olá! Gostaria de agendar o serviço de Barba (R$ 25,00) na Barbearia Invictus.",
  },
  {
    id: "desenhos",
    name: "Desenhos e Risquinhos",
    price: "R$ 15,00",
    description: "Detalhes e desenhos para dar personalidade ao seu corte.",
    whatsappMessage: "Olá! Gostaria de agendar Corte com Desenho/Risquinho (R$ 15,00) na Barbearia Invictus.",
  },
  {
    id: "quimica",
    name: "Química",
    price: "R$ 60,00",
    priceNote: "Valor inicial varia conforme o procedimento",
    description: "Luzes, alisamento, cabelo colorido e outros procedimentos. Consulte o valor exato pelo WhatsApp.",
    whatsappMessage: "Olá! Gostaria de consultar e agendar um procedimento de Química (Luzes/Alisamento) na Barbearia Invictus.",
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    src: "/assets/aistudio/01-degrade-com-desenho-lateral_952c4553.webp",
    webpSrc: "/assets/aistudio/01-degrade-com-desenho-lateral_952c4553.webp",
    fallbackSrc: "/assets/aistudio/01-degrade-com-desenho-lateral_952c4553.jpg",
    title: "Degradê com Desenho Lateral",
    category: "Degradê & Desenho",
    isHighRes: true,
    alt: "Degradê impecável com acabamento em cruz na lateral",
  },
  {
    id: "g2",
    src: "/assets/aistudio/02-degrade-com-topo-texturizado_43de514e.webp",
    webpSrc: "/assets/aistudio/02-degrade-com-topo-texturizado_43de514e.webp",
    fallbackSrc: "/assets/aistudio/02-degrade-com-topo-texturizado_43de514e.jpg",
    title: "Degradê com Topo Texturizado",
    category: "Corte & Textura",
    isHighRes: true,
    alt: "Degradê suave na nuca com topo texturizado e mechas",
  },
  {
    id: "g3",
    src: "/assets/aistudio/03-corte-platinado-com-degrade_c757add4.webp",
    webpSrc: "/assets/aistudio/03-corte-platinado-com-degrade_c757add4.webp",
    fallbackSrc: "/assets/aistudio/03-corte-platinado-com-degrade_c757add4.jpg",
    title: "Corte Platinado com Degradê",
    category: "Química & Degradê",
    isHighRes: true,
    alt: "Corte masculino platinado com acabamento degradê perfeito",
  },
  {
    id: "g4",
    src: "/assets/aistudio/04-corte-com-desenho-lateral-google_4116f503.webp",
    webpSrc: "/assets/aistudio/04-corte-com-desenho-lateral-google_4116f503.webp",
    fallbackSrc: "/assets/aistudio/04-corte-com-desenho-lateral-google_4116f503.jpg",
    title: "Detalhe Geométrico na Lateral",
    category: "Arte & Desenho",
    isHighRes: false,
    alt: "Corte com desenho geométrico personalizado na nuca",
  },
  {
    id: "g5",
    src: "/assets/aistudio/05-corte-cacheado-com-degrade-google_525d5b60.webp",
    webpSrc: "/assets/aistudio/05-corte-cacheado-com-degrade-google_525d5b60.webp",
    fallbackSrc: "/assets/aistudio/05-corte-cacheado-com-degrade-google_525d5b60.jpg",
    title: "Corte Cacheado com Fade",
    category: "Cachos & Degradê",
    isHighRes: false,
    alt: "Corte cacheado com degradê suave e acabamento alinhado",
  },
  {
    id: "g6",
    src: "/assets/aistudio/06-corte-com-degrade-google_7796ac22.webp",
    webpSrc: "/assets/aistudio/06-corte-com-degrade-google_7796ac22.webp",
    fallbackSrc: "/assets/aistudio/06-corte-com-degrade-google_7796ac22.jpg",
    title: "Fade Raspado Limpo",
    category: "Degradê Clássico",
    isHighRes: false,
    alt: "Corte curto com fade raspado e linhas bem definidas",
  },
  {
    id: "g7",
    src: "/assets/aistudio/07-corte-com-risco-na-lateral-google_2a341c69.webp",
    webpSrc: "/assets/aistudio/07-corte-com-risco-na-lateral-google_2a341c69.webp",
    fallbackSrc: "/assets/aistudio/07-corte-com-risco-na-lateral-google_2a341c69.jpg",
    title: "Risco Personalizado",
    category: "Personalidade",
    isHighRes: false,
    alt: "Corte moderno com detalhe em formato exclusivo",
  },
  {
    id: "g8",
    src: "/assets/aistudio/08-corte-infantil-com-desenho-google_2667c952.webp",
    webpSrc: "/assets/aistudio/08-corte-infantil-com-desenho-google_2667c952.webp",
    fallbackSrc: "/assets/aistudio/08-corte-infantil-com-desenho-google_2667c952.jpg",
    title: "Corte Infantil com Desenho",
    category: "Atendimento Infantil",
    isHighRes: false,
    alt: "Corte infantil com estrela cadente desenhada na lateral",
  },
  {
    id: "g9",
    src: "/assets/aistudio/09-corte-platinado-com-topo-texturizado-google_f918eae0.webp",
    webpSrc: "/assets/aistudio/09-corte-platinado-com-topo-texturizado-google_f918eae0.webp",
    fallbackSrc: "/assets/aistudio/09-corte-platinado-com-topo-texturizado-google_f918eae0.jpg",
    title: "Luzes com Topo Texturizado",
    category: "Química & Luzes",
    isHighRes: false,
    alt: "Luzes platinadas com efeito texturizado e fade lateral",
  },
];

export const AMENITIES: AmenityItem[] = [
  {
    id: "presencial",
    title: "Atendimento Presencial e Acolhedor",
    description: "Recepção atenciosa, pontualidade e dedicação total ao que você pedir.",
    iconName: "UserCheck",
  },
  {
    id: "climatizado",
    title: "Ambiente Confortável",
    description: "Espaço limpo, higienizado e pensado para o seu bem-estar durante o atendimento.",
    iconName: "Sparkles",
  },
  {
    id: "bebidas",
    title: "Bebidas Disponíveis",
    description: "Água e opções para você relaxar enquanto aguarda ou realiza o serviço.",
    iconName: "Coffee",
  },
  {
    id: "banheiro",
    title: "Banheiro Disponível",
    description: "Estrutura completa e higienizada para maior comodidade dos clientes.",
    iconName: "DoorOpen",
  },
  {
    id: "infantil",
    title: "Atendimento para Crianças",
    description: "Paciência, cuidado e cortes divertidos com desenhos para os pequenos.",
    iconName: "Smile",
  },
  {
    id: "cartoes",
    title: "Cartões de Crédito e Débito",
    description: "Facilidade de pagamento com as principais bandeiras de crédito e débito.",
    iconName: "CreditCard",
  },
  {
    id: "nfc",
    title: "Pagamento por Aproximação (NFC)",
    description: "Praticidade e rapidez para pagar pelo smartphone ou relógio, além de Pix.",
    iconName: "Smartphone",
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Kawa Fonseca",
    stars: 5,
    source: "Avaliação no Google",
    cutPhoto: {
      title: "Degradê com Textura",
      webpSrc: "/assets/aistudio/02-degrade-com-topo-texturizado_43de514e.webp",
      fallbackSrc: "/assets/aistudio/02-degrade-com-topo-texturizado_43de514e.jpg",
      alt: "Corte realizado para Kawa Fonseca na Barbearia Invictus",
    },
    quote:
      "Excelente experiência! Fui muito bem atendido, tudo ocorreu conforme o esperado e a qualidade superou minhas expectativas. Dá para perceber o cuidado e a dedicação em oferecer um bom serviço. Recomendo muito e com certeza voltaria novamente!",
  },
  {
    id: "r2",
    author: "Michel Bezerra dos Santos",
    stars: 5,
    source: "Avaliação no Google",
    cutPhoto: {
      title: "Fade Raspado Limpo",
      webpSrc: "/assets/aistudio/06-corte-com-degrade-google_7796ac22.webp",
      fallbackSrc: "/assets/aistudio/06-corte-com-degrade-google_7796ac22.jpg",
      alt: "Corte fade realizado para Michel Bezerra na Barbearia Invictus",
    },
    quote:
      "Deixo a minha avaliação sobre o Kauan, excelente profissional, sempre atento aos meus pedidos e entregando um trabalho de qualidade. Além de ser um ótimo barbeiro, oferece um atendimento e uma recepção no salão que fazem toda a diferença.",
  },
  {
    id: "r3",
    author: "Ivanusa Vieira",
    stars: 5,
    source: "Avaliação no Google",
    cutPhoto: {
      title: "Corte Infantil com Desenho",
      webpSrc: "/assets/aistudio/08-corte-infantil-com-desenho-google_2667c952.webp",
      fallbackSrc: "/assets/aistudio/08-corte-infantil-com-desenho-google_2667c952.jpg",
      alt: "Corte infantil realizado para o filho de Ivanusa na Barbearia Invictus",
    },
    quote:
      "Levei meu filho para conhecer a barbearia do Kaua, e achamos o atendimento maravilhoso, preços justos e excelente ambiente, muito bem receptivo.",
  },
  {
    id: "r4",
    author: "Marcos Junior",
    stars: 5,
    source: "Avaliação no Google",
    cutPhoto: {
      title: "Risco Personalizado na Lateral",
      webpSrc: "/assets/aistudio/07-corte-com-risco-na-lateral-google_2a341c69.webp",
      fallbackSrc: "/assets/aistudio/07-corte-com-risco-na-lateral-google_2a341c69.jpg",
      alt: "Corte com risco na lateral para Marcos Junior na Barbearia Invictus",
    },
    quote:
      "Pessoal muito atencioso, ambiente limpo e super fácil localização. Os profissionais dedicados e virei cliente fiel.",
  },
  {
    id: "r5",
    author: "Daniel Dan",
    stars: 5,
    source: "Avaliação no Google",
    cutPhoto: {
      title: "Corte Cacheado & Fade",
      webpSrc: "/assets/aistudio/05-corte-cacheado-com-degrade-google_525d5b60.webp",
      fallbackSrc: "/assets/aistudio/05-corte-cacheado-com-degrade-google_525d5b60.jpg",
      alt: "Corte cacheado com degradê para Daniel Dan na Barbearia Invictus",
    },
    quote:
      "É um ambiente super agradável, excelentes profissionais e o trabalho sem dúvida é de qualidade.",
  },
  {
    id: "r6",
    author: "Samuel Gabarão Guimarães",
    stars: 5,
    source: "Avaliação no Google",
    cutPhoto: {
      title: "Corte Platinado & Degradê",
      webpSrc: "/assets/aistudio/03-corte-platinado-com-degrade_c757add4.webp",
      fallbackSrc: "/assets/aistudio/03-corte-platinado-com-degrade_c757add4.jpg",
      alt: "Corte platinado realizado para Samuel Gabarão na Barbearia Invictus",
    },
    quote:
      "Os dois barbeiros cortam super bem, tanto o Kauan, quanto o Leonardo, super indico, cortam super bem e atendem bem também, são bem gentis.",
  },
];

export const OPENING_HOURS = [
  { day: "Segunda-feira", hours: "Fechado", isOpenDay: false },
  { day: "Terça-feira", hours: "09:00 às 19:30", isOpenDay: true, openHour: 9, closeHour: 19.5 },
  { day: "Quarta-feira", hours: "09:00 às 19:30", isOpenDay: true, openHour: 9, closeHour: 19.5 },
  { day: "Quinta-feira", hours: "09:00 às 19:30", isOpenDay: true, openHour: 9, closeHour: 19.5 },
  { day: "Sexta-feira", hours: "09:00 às 20:00", isOpenDay: true, openHour: 9, closeHour: 20 },
  { day: "Sábado", hours: "08:30 às 19:00", isOpenDay: true, openHour: 8.5, closeHour: 19 },
  { day: "Domingo", hours: "Fechado", isOpenDay: false },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Preciso agendar com antecedência ou posso ir direto?",
    answer:
      "Recomendamos sempre o agendamento prévio pelo WhatsApp para garantir seu horário sem espera. Se você estiver passando por perto, também realizamos atendimento por ordem de chegada havendo disponibilidade.",
  },
  {
    question: "Como funciona o valor para procedimentos de química (luzes, platinado)?",
    answer:
      "O valor básico inicia em R$ 60,00 e pode variar de acordo com o tamanho do cabelo e a técnica desejada (platinado total, luzes pontuais, selagem, etc.). Você pode nos mandar uma foto de referência pelo WhatsApp para passarmos o orçamento exato.",
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer:
      "Aceitamos cartões de crédito e débito das principais bandeiras, pagamento por aproximação (NFC pelo celular ou smartwatch) e Pix.",
  },
  {
    question: "Vocês atendem crianças?",
    answer:
      "Sim! Temos muita paciência e cuidado com o atendimento infantil, inclusive realizando cortes com risquinhos e desenhos temáticos que a criançada adora.",
  },
  {
    question: "Onde a barbearia está localizada e como é o acesso?",
    answer:
      "Estamos na Rua Rio de Janeiro, 266, no Jardim Tarumã em Jundiaí - SP. É um local de fácil acesso, com facilidade para estacionar nas imediações.",
  },
];

export const COMMERCIAL_CHECKLIST = [
  {
    itemNumber: 1,
    topic: "Logotipo Oficial",
    status: "Aplicado",
    statusType: "success" as const,
    details:
      "O logotipo oficial disponibilizado para a proposta já está utilizado nos elementos de identidade visual do site (cabeçalho, rodapé e capa interativa do mapa). Caso exista posteriormente um arquivo SVG oficial, a substituição poderá ser considerada.",
  },
  {
    itemNumber: 2,
    topic: "Contato e WhatsApp",
    status: "Configurado — testar antes da publicação",
    statusType: "warning" as const,
    details:
      "O telefone informado ((11) 94268-8432) está configurado nos canais de contato e nos botões de agendamento com mensagens personalizadas por serviço. Confirmar com o proprietário se o número continua correto e se todos os links direcionam para a conversa esperada.",
  },
  {
    itemNumber: 3,
    topic: "Horários de Funcionamento",
    status: "A confirmar",
    statusType: "warning" as const,
    details:
      "Existem divergências entre os horários exibidos no site antigo, os dados do Perfil da Empresa no Google e os horários extraídos do catálogo AppBarber. Nenhum desses horários deve ser tratado como definitivo. Solicitar ao proprietário a validação dos dias, horários e intervalos de almoço antes da publicação.",
  },
  {
    itemNumber: 4,
    topic: "Serviços, Combinações e Preços",
    status: "A confirmar",
    statusType: "warning" as const,
    details:
      "O protótipo apresenta os principais serviços e valores informados inicialmente (Corte R$ 35, Barba R$ 25, Desenho R$ 15, Química a partir de R$ 60). O catálogo AppBarber também contém serviços combinados, procedimentos adicionais e preços sob consulta. Confirmar com Kauan quais serviços, combinações, durações e preços deverão aparecer no site definitivo.",
  },
  {
    itemNumber: 5,
    topic: "Catálogo e Agendamento AppBarber",
    status: "Integração a definir",
    statusType: "neutral" as const,
    details:
      "A Barbearia Invictus já utiliza o AppBarber para apresentar seu catálogo de serviços e receber agendamentos. A nova proposta não substitui o aplicativo nem sugere ter sistema próprio. Avaliar com o proprietário a inclusão de um botão direcionando ao link individual da barbearia no AppBarber, mantendo o WhatsApp como canal direto já em funcionamento.",
  },
  {
    itemNumber: 6,
    topic: "Autorização de Uso das Fotografias",
    status: "Pendente de confirmação",
    statusType: "warning" as const,
    details:
      "Confirmar que a barbearia possui autorização adequada para utilização das fotografias dos clientes e dos trabalhos apresentados no site, especialmente a fotografia que retrata um menor de idade (corte infantil), para a qual deve existir autorização do responsável legal.",
  },
  {
    itemNumber: 7,
    topic: "Domínio e Publicação",
    status: "A definir",
    statusType: "neutral" as const,
    details:
      "A proposta está sendo apresentada em ambiente de protótipo de demonstração. A publicação definitiva dependerá da aprovação do proprietário, definição do domínio (o endereço barbeariainvictus.com.br é citado no código como referência preliminar, sem contratação confirmada), configuração de hospedagem e validação dos dados comerciais.",
  },
  {
    itemNumber: 8,
    topic: "Google e Presença Local",
    status: "Preparação técnica inicial — validação pendente",
    statusType: "neutral" as const,
    details:
      "O projeto possui elementos de SEO local e dados estruturados iniciais (Schema.org BarberShop com endereço, coordenadas e catálogo). Antes da publicação, será necessário revisar os dados comerciais, verificar o Perfil da Empresa no Google, validar os links e conferir a consistência das informações.",
  },
  {
    itemNumber: 9,
    topic: "Privacidade e Publicação",
    status: "Revisão necessária antes da publicação",
    statusType: "warning" as const,
    details:
      "A política de privacidade e os textos relacionados ao tratamento de dados devem ser revisados de acordo com os recursos efetivamente utilizados no site e as informações do responsável pelo estabelecimento (Kauan). Evitar declarações de conformidade jurídica definitiva sem avaliação adequada.",
  },
];
