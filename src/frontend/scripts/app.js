// =====================
// CONFIG
// =====================
const API_URL = "https://catalixo.onrender.com";

// =====================
// TRADUÇÃO DE LABELS
// =====================
const labelMap = {
  plastic: 'Plástico',
  paper: 'Papel',
  glass: 'Vidro',
  metal: 'Metal',
  cardboard: 'Papelão'
};

// =====================
// INFORMAÇÕES DOS MATERIAIS
// =====================
const infoMap = {
  'Plástico': {
    descricao: 'Materiais plásticos são derivados do petróleo e incluem embalagens, garrafas e utensílios.',
    dica: 'Lave as embalagens antes de reciclar.',
    impacto: 'A reciclagem reduz a poluição dos oceanos.'
  },
  'Papel': {
    descricao: 'O papel é feito de fibras de celulose.',
    dica: 'Remova grampos e fitas.',
    impacto: 'Cada tonelada reciclada salva cerca de 17 árvores.'
  },
  'Vidro': {
    descricao: 'O vidro é 100% reciclável.',
    dica: 'Lave antes de reciclar.',
    impacto: 'Economiza cerca de 30% de energia.'
  },
  'Metal': {
    descricao: 'Inclui alumínio e aço.',
    dica: 'Achate latas.',
    impacto: 'Economiza até 95% de energia.'
  },
  'Papelão': {
    descricao: 'Muito usado em caixas.',
    dica: 'Desmonte as caixas.',
    impacto: 'Reduz emissões de CO2.'
  }
};

// =====================
// ELEMENTOS
// =====================
const fileInput = document.getElementById('imageInput');
const dropzone = document.getElementById('dropzone');
const imagePreview = document.getElementById('imagePreview');
const removeButton = document.getElementById('removeButton');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result');

// =====================
// PREVIEW
// =====================
function setPreview(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
    removeButton.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function clearPreview() {
  imagePreview.src = '';
  imagePreview.style.display = 'none';
  removeButton.style.display = 'none';
  fileInput.value = '';
  showResult(false);
}

// =====================
// UI
// =====================
function showLoading(show) {
  loading.style.display = show ? 'flex' : 'none';
}

function showResult(show) {
  resultContainer.style.display = show ? 'block' : 'none';
}

function translatePrediction(prediction) {
  return labelMap[prediction] || prediction || 'Desconhecido';
}

// =====================
// DRAG & DROP
// =====================
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

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) setPreview(file);
});

removeButton.addEventListener('click', clearPreview);

// =====================
// CHAMADA DA API
// =====================
const predictGarbage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  return await response.json();
};

// =====================
// BOTÃO ANALISAR
// =====================
document.getElementById('analyzeButton').addEventListener('click', async () => {
  const file = fileInput.files[0];

  if (!file) {
    alert('Selecione uma imagem primeiro.');
    return;
  }

  showLoading(true);
  showResult(false);

  try {
    const data = await predictGarbage(file);

    showLoading(false);
    showResult(true);

    const translated = translatePrediction(data.prediction);

    document.getElementById('prediction').textContent = translated;
    document.getElementById('confidence').textContent =
      `Confiança: ${(data.confidence * 100).toFixed(2)}%`;

    const info = infoMap[translated] || {
      dica: 'Consulte a coleta seletiva local.',
      impacto: 'Reciclar ajuda o meio ambiente.'
    };

    document.getElementById('tip').textContent = info.dica;
    document.getElementById('impact').textContent = info.impacto;

  } catch (error) {
    console.error(error);
    showLoading(false);
    alert('Erro ao analisar imagem. Verifique o backend.');
  }
});