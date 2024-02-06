from PIL import Image
import os

for file_name in os.listdir():
    if file_name.endswith('.png'):
        img = Image.open(file_name)
        flipped_img = img.transpose(Image.FLIP_LEFT_RIGHT)
        flipped_img.save(file_name)