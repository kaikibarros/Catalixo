//traduz labels
const labelMap = {
  plastic: 'Plástico',
  paper: 'Papel',
  glass: 'Vidro',
  metal: 'Metal',
  cardboard: 'Papelão'
};

//informações adicionais por material
const infoMap = {
  'Plástico': {
    descricao: 'Materiais plásticos são derivados do petróleo e incluem embalagens, garrafas e utensílios. São leves e versáteis, mas demoram séculos para se decompor.',
    dica: 'Lave as embalagens antes de reciclar. Separe por tipo de plástico quando possível para facilitar o processamento.',
    impacto: 'O plástico representa cerca de 10% do lixo global. Sua reciclagem reduz a extração de petróleo e diminui a poluição dos oceanos.'
  },
  'Papel': {
    descricao: 'O papel é feito de fibras de celulose extraídas de árvores ou materiais reciclados. Inclui jornais, revistas e folhas de escritório.',
    dica: 'Remova grampos, fitas adesivas e plásticos. Amasse o papel para economizar espaço no transporte.',
    impacto: 'A reciclagem de papel economiza água, energia e reduz o desmatamento. Cada tonelada reciclada salva cerca de 17 árvores.'
  },
  'Vidro': {
    descricao: 'O vidro é um material inorgânico feito de sílica, soda e cal. É 100% reciclável e pode ser reutilizado indefinidamente.',
    dica: 'Lave as garrafas e potes antes de reciclar. Quebre apenas se necessário para segurança no transporte.',
    impacto: 'A reciclagem de vidro economiza energia (cerca de 30%) e reduz emissões de CO2. Evita a extração de matérias-primas.'
  },
  'Metal': {
    descricao: 'Materiais metálicos incluem alumínio, ferro e aço. São condutores de eletricidade e resistentes à corrosão.',
    dica: 'Remova restos de comida ou líquidos. Achate latas para economizar espaço.',
    impacto: 'A reciclagem de metais economiza até 95% de energia comparada à produção primária. Reduz emissões e preserva recursos minerais.'
  },
  'Papelão': {
    descricao: 'Papelão ondulado é feito de camadas de papel kraft. Usado em caixas de embalagem e é altamente reciclável.',
    dica: 'Desmonte as caixas e achate-as. Remova fitas adesivas e materiais não-papel.',
    impacto: 'A reciclagem de papelão economiza energia e água. Cada tonelada reciclada reduz emissões de CO2 equivalentes a plantar 17 árvores.'
  }
};

const fileInput = document.getElementById('imageInput');
const dropzone = document.getElementById('dropzone');
const imagePreview = document.getElementById('imagePreview');
const removeButton = document.getElementById('removeButton');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result');

function setPreview(file) {
  console.log('Arquivo selecionado:', file.name, 'Tamanho:', file.size, 'Tipo:', file.type);
  const reader = new FileReader();
  reader.onload = function(e) {
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
    removeButton.style.display = 'block';
  };
  reader.readAsDataURL(file);
}
//opção de apagar preview
function clearPreview() {
  imagePreview.src = '';
  imagePreview.style.display = 'none';
  removeButton.style.display = 'none';
  fileInput.value = '';
  showResult(false);
}

function showLoading(show) {
  loading.style.display = show ? 'flex' : 'none';
}

function showResult(show) {
  resultContainer.style.display = show ? 'block' : 'none';
}

function translatePrediction(prediction) {
  return labelMap[prediction] || prediction || 'Desconhecido';
}

// drag & drop 
dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('dropzone-hover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dropzone-hover');
});

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropzone.classList.remove('dropzone-hover');
  const file = event.dataTransfer.files[0];
  if (file) {
    fileInput.files = event.dataTransfer.files;
    setPreview(file);
  }
});

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    setPreview(file);
  }
});


removeButton.addEventListener('click', clearPreview);

// enviando imagem para o backend
document.getElementById('analyzeButton').addEventListener('click', async function() {
  const file = fileInput.files[0];

  if (!file) {
    alert('Por favor, selecione uma imagem primeiro.');
    return;
  }

  showLoading(true);
  showResult(false);

  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Enviando imagem para análise...');
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData
    });

    console.log('Resposta recebida:', response.status, response.statusText);

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error(`Erro na resposta do servidor: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados recebidos:', data);

    showLoading(false);
    showResult(true);

    const translated = translatePrediction(data.prediction);
    document.getElementById('prediction').textContent = translated;
    document.getElementById('confidence').textContent = `Confiança: ${(data.confidence * 100).toFixed(2)}%`;

    // preencher info adicionais
    const info = infoMap[translated] || {
      dica: 'Consulte seu serviço de reciclagem local.',
      impacto: 'A reciclagem ajuda a preservar o meio ambiente.'
    };
    document.getElementById('tip').textContent = info.dica || 'Não disponível';
    document.getElementById('impact').textContent = info.impacto || 'Não disponível';
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
    showLoading(false);
    alert('Erro ao analisar a imagem. Certifique-se de que o backend está rodando no terminal conforme as instruções do README. Tente novamente.');
  }
});

const predictGarbage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://catalixo.onrender.com/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao chamar a API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default predictGarbage;