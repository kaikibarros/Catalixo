[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GBRRvVcH)
# ♻️ Catalixo

O **Catalixo** é uma aplicação que utiliza **Inteligência Artificial e Visão Computacional** para identificar resíduos recicláveis a partir de imagens.

A proposta do projeto é facilitar o descarte correto de lixo, contribuindo para práticas mais sustentáveis e promovendo educação ambiental.

---

## 📌 Caso de Uso

O sistema permite que o usuário envie uma imagem de um resíduo, e a IA classifica automaticamente o material.

### Fluxo da aplicação:

1. Usuário envia uma imagem (upload)
2. A IA analisa o resíduo
3. O sistema retorna a categoria do material
4. São exibidas dicas de reciclagem e impacto ambiental

### Categorias identificadas:

* 📦 Papelão
* 🟦 Vidro
* 🔩 Metal
* 📄 Papel
* 🧴 Plástico

---

## 🧠 Modelo de IA

O projeto utiliza um modelo pré-treinado de classificação de imagens disponível no Hugging Face:

🔗 https://huggingface.co/yangy50/garbage-classification

Esse modelo é responsável por identificar o tipo de resíduo a partir da imagem enviada.

**Detalhes:**

* Baseado em Vision Transformer (ViT)
* Treinado com milhares de imagens de resíduos
* Classifica diferentes tipos de materiais recicláveis
* Utilizado via biblioteca Transformers no backend

---

## 🧠 Tecnologias utilizadas

### Backend

* Python
* FastAPI
* Transformers (Hugging Face)

### Frontend

* HTML
* CSS
* JavaScript

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

---

### 2. Instalar dependências

```bash
pip install -r requirements.txt
```

---

### 3. Rodar o backend

```bash
cd src
python -m uvicorn backend.main:app --reload
```

O backend ficará disponível em:

```
http://localhost:8000
```

---

### 4. Rodar o frontend

Abra o arquivo:

```
frontend/app.html
```

Ou utilize um servidor local (recomendado):

```bash
cd frontend
python -m http.server 5500
```

Acesse:

```
http://localhost:5500
```

---

## 🧪 Teste da API

Acesse:

```
http://localhost:8000/docs
```

Utilize o endpoint `/predict` para enviar imagens e testar a IA diretamente.

---

## 👩‍💻 Integrantes

* Beatriz Martins
* Mel Lopes
* Kaiki Bezerra
* Gabriel Willian
* Pedro Delmiro
* Wesley Oliveira
* Daniel Levi

