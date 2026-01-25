from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = Image.open(input_path)
# Convert to grayscale for potrace
img = img.convert('L')
# Threshold to monochrome (optional but good for potrace)
threshold = 128
img = img.point(lambda p: 255 if p > threshold else 0, mode='1')
img.save(output_path)
