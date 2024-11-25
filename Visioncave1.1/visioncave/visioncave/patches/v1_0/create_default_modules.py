import frappe
import os

def execute():
    create_basic_modules()
    create_example_modules()

def create_basic_modules():
    """Create basic vision processing modules"""
    modules = [
        {
            "module_name": "Basic Object Detection",
            "module_type": "Detection",
            "code": get_module_code("object_detection"),
            "config": {
                "model": "yolov5s",
                "confidence": 0.5
            }
        },
        {
            "module_name": "Motion Detection",
            "module_type": "Detection",
            "code": get_module_code("motion_detection"),
            "config": {
                "sensitivity": 20,
                "blur_size": 21
            }
        },
        {
            "module_name": "Face Detection",
            "module_type": "Detection",
            "code": get_module_code("face_detection"),
            "config": {
                "scale_factor": 1.1,
                "min_neighbors": 5
            }
        }
    ]
    
    for module in modules:
        if not frappe.db.exists("Vision Module", module["module_name"]):
            doc = frappe.new_doc("Vision Module")
            doc.update(module)
            doc.enabled = 1
            doc.insert()

def create_example_modules():
    """Create example modules for different domains"""
    examples = [
        {
            "module_name": "People Counter",
            "module_type": "Custom",
            "code": get_module_code("people_counter"),
            "config": {
                "count_threshold": 5,
                "alert_threshold": 10
            }
        },
        {
            "module_name": "Vehicle Counter",
            "module_type": "Custom",
            "code": get_module_code("vehicle_counter"),
            "config": {
                "vehicle_types": ["car", "truck", "bus"],
                "count_interval": 300
            }
        }
    ]
    
    for example in examples:
        if not frappe.db.exists("Vision Module", example["module_name"]):
            doc = frappe.new_doc("Vision Module")
            doc.update(example)
            doc.enabled = 1
            doc.insert()

def get_module_code(module_name):
    """Get module code from template file"""
    code_path = os.path.join(
        os.path.dirname(frappe.get_module("visioncave").__file__),
        "vision_modules",
        f"{module_name}.py"
    )
    
    if os.path.exists(code_path):
        with open(code_path, 'r') as f:
            return f.read()
    return ""
