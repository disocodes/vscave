"""
Basic Object Detection Module
Uses YOLOv5 for object detection
"""

import cv2
import numpy as np

def process_frame(frame, config):
    # Convert frame to blob
    blob = cv2.dnn.blobFromImage(
        frame, 
        1/255.0, 
        (416, 416), 
        swapRB=True, 
        crop=False
    )
    
    # Set the blob as input
    net.setInput(blob)
    
    # Get detections
    detections = net.forward(output_layers)
    
    # Process detections
    results = []
    height, width = frame.shape[:2]
    
    for detection in detections:
        for obj in detection:
            scores = obj[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            
            if confidence > config.get('confidence', 0.5):
                center_x = int(obj[0] * width)
                center_y = int(obj[1] * height)
                w = int(obj[2] * width)
                h = int(obj[3] * height)
                
                x = int(center_x - w/2)
                y = int(center_y - h/2)
                
                results.append({
                    'class': classes[class_id],
                    'confidence': float(confidence),
                    'box': [x, y, w, h]
                })
                
                # Draw box on frame
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    f'{classes[class_id]}: {confidence:.2f}',
                    (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (0, 255, 0),
                    2
                )
    
    return frame, results

# Initialize variables
net = None
output_layers = None
classes = []

def initialize(config):
    global net, output_layers, classes
    
    # Load YOLO model
    weights_path = config.get('weights_path', 'yolov5s.onnx')
    net = cv2.dnn.readNet(weights_path)
    
    # Load classes
    with open(config.get('classes_path', 'coco.names'), 'r') as f:
        classes = [line.strip() for line in f.readlines()]
    
    # Get output layers
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
