from fastapi import FastAPI, UploadFile, File
from PIL import Image
from services.garbages_ai import GarbageClassifier
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = None

@app.get("/")
def read_root():
    return {"status": "ok"}

def get_classifier():
    global classifier
    if classifier is None:
        print("🔄 Carregando modelo...")
        classifier = GarbageClassifier()
    return classifier

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        model = get_classifier()

        image = Image.open(file.file)
        result = model.predict(image)

        return result

    except Exception as e:
        return {"error": str(e)}