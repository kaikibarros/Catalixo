from fastapi import FastAPI, UploadFile, File
from PIL import Image
from services.garbages_ai import GarbageClassifier

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