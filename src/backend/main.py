from fastapi import FastAPI, UploadFile, File
from PIL import Image
from services.garbages_ai import GarbageClassifier
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
classifier = GarbageClassifier()

@app.get("/")
def read_root():
    return {"Aplicação Fastapi rodando normalmente"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = Image.open(file.file)

    result = classifier.predict(image)

    return result

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #substituir pelo domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)