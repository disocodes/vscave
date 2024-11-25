import frappe
import json

def execute():
    # Create default Vision Settings
    if not frappe.db.exists("Vision Settings", "Vision Settings"):
        doc = frappe.new_doc("Vision Settings")
        doc.processing_timeout = 30
        doc.max_image_size = 1024
        doc.enable_gpu = 0
        doc.default_model_path = "/models"
        doc.save()
    
    # Create default processing configurations
    create_default_configs()

def create_default_configs():
    """Create default processing configurations"""
    configs = {
        "object_detection": {
            "confidence_threshold": 0.5,
            "nms_threshold": 0.4,
            "max_detections": 100
        },
        "face_detection": {
            "min_face_size": 20,
            "scale_factor": 1.1,
            "min_neighbors": 5
        },
        "motion_detection": {
            "history": 500,
            "var_threshold": 16,
            "detect_shadows": True
        }
    }
    
    for config_name, settings in configs.items():
        if not frappe.db.exists("Vision Config", config_name):
            doc = frappe.new_doc("Vision Config")
            doc.config_name = config_name
            doc.configuration = json.dumps(settings, indent=4)
            doc.is_default = 1
            doc.save()
