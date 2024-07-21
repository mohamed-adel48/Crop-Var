from rest_framework.views import APIView
from rest_framework.response import Response
import ee
import requests
import os
import rasterio
from rasterio.io import MemoryFile
import torch
from PIL import Image
import numpy as np
from torchvision import transforms
import torch.nn.functional as F
import torch.nn as nn
from torchvision.transforms import ToTensor, Resize
import sys
import datetime


# Model definition (like your EnhancedResNet)
class EnhancedResNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 64)
        self.residual_block = nn.Sequential(
            nn.Linear(64, 64),
            nn.BatchNorm1d(64),  # Batch normalization
            nn.ReLU(),
            nn.Dropout(0.2),  # Dropout with 20% rate
            nn.Linear(64, 64)
        )
        self.fc2 = nn.Linear(64, 8)

    def forward(self, x):
        x = self.fc1(x)
        residual = x
        x = self.residual_block(x)
        x += residual  # Residual connection
        x = nn.ReLU()(x)
        x = self.fc2(x)
        return x

# Earth Engine credentials
credentials = ee.ServiceAccountCredentials('sekkagamerr@gmail.com', 'E:\Github Porjects\django-backend\geoproject\geoapp\crop.json')
ee.Initialize(credentials)

class CropClassificationView(APIView):
    def post(self, request, *args, **kwargs):
        coordinates = request.data.get('coordinates')
        if not coordinates:
            return Response({"error": "Missing coordinates in the request."}, status=400)

        try:
            geometry = ee.Geometry.Polygon(coordinates)
            end_date = datetime.datetime.now()
            start_date = end_date - datetime.timedelta(days=30)            
            end_date_str = end_date.strftime('%Y-%m-%d')
            start_date_str = start_date.strftime('%Y-%m-%d')
            collection = (ee.ImageCollection('COPERNICUS/S2')
                          .filterBounds(geometry)
                          .filterDate(start_date_str, end_date_str)
                          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)))
            print(collection.size().getInfo())
            bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11']
            image = collection.median().select(bands)

            # Download the GeoTIFF file
            download_params = {
                'scale': 10,
                'region': geometry.getInfo(),
                'format': 'GeoTIFF'
            }
            url_norm = image.getDownloadUrl(download_params)
            response = requests.get(url_norm)
            image_bytes = response.content

            # Load the GeoTIFF with rasterio
            with MemoryFile(image_bytes) as memfile:
                with memfile.open() as image_dataset:
                    # Read the image data
                    img_data = image_dataset.read()  # read all bands
                    
                    # Check if image data has correct shape (10 bands)
                    if img_data.shape[0] != len(bands):
                        raise ValueError(f"Expected {len(bands)} bands, got {img_data.shape[0]}")

                    # Flatten the image data to have one pixel per row
                    img_data_flattened = img_data.transpose((1, 2, 0)).reshape(-1, len(bands))

                    # Convert to PyTorch tensor
                    img_tensor = torch.tensor(img_data_flattened, dtype=torch.float32)

                    # Load the model
                    model_path = os.path.join(os.path.dirname(sys.argv[0]), 'fullelfull.pth')
                    model = torch.load(model_path)
                    model.eval()  # Set the model to evaluation mode

                    # Process the data in batches to avoid memory issues
                    predictions = []
                    batch_size = 256
                    for i in range(0, img_tensor.size(0), batch_size):
                        batch = img_tensor[i:i + batch_size]
                        with torch.no_grad():
                            outputs = model(batch)
                        _, batch_predictions = torch.max(outputs, 1)
                        predictions.append(batch_predictions)

                    # Concatenate and reshape the predictions
                    predictions = torch.cat(predictions)
                    predicted_labels = predictions.reshape(img_data.shape[1], img_data.shape[2])
            
                    # Return the results
                    predicted_labels_flat = predicted_labels.flatten()
                    class_counts = np.bincount(predicted_labels_flat)
                    most_frequent_class = np.argmax(class_counts)
                    most_frequent_percentage = (class_counts[most_frequent_class] / predicted_labels_flat.size()) * 100
                    class_dict = {0:"background",1:"land",2:"clover",3:"wheat",4:"water",5:"urban",6:"trees"}
                    print(predicted_labels_flat)
                    return Response({
                        "most_frequent_class_id": int(most_frequent_class),
                        "most_frequent_class_label": class_dict[int(most_frequent_class)],
                        "most_frequent_percentage": most_frequent_percentage,
                        "image_url": url_norm
                    })
                    
        except ee.EEException as e:
            return Response({"error": str(e)}, status=500)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
