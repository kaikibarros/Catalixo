from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from services.garbages_ai import GarbageClassifier

app = FastAPI()

#configurando pra liberar o cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = GarbageClassifier()

@app.get("/")
def read_root():
    return {"Aplicação Fastapi rodando normalmente"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = Image.open(file.file)

    result = classifier.predict(image)

    return result