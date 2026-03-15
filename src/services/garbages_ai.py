from transformers import pipeline
from PIL import Image

class GarbageClassifier:

    def init(self):
        self.pipe = pipeline(
            "image-classification",
            model="yangy50/garbage-classification"
        )

    def predict(self, image: Image.Image):
        result = self.pipe(image)

        return {
            "prediction": result[0]["label"],
            "confidence": float(result[0]["score"])
        }