import frappe
from frappe import _
import json
import cv2
import numpy as np
from PIL import Image
import io
import base64

@frappe.whitelist()
def get_dashboard(domain):
    """Get dashboard configuration for specified domain"""
    dashboard = frappe.get_list(
        'Vision Dashboard',
        filters={'domain': domain, 'enabled': 1},
        fields=['name', 'dashboard_name', 'config']
    )
    
    if not dashboard:
        return None
        
    dashboard = dashboard[0]
    widgets = frappe.get_all(
        'Dashboard Widget',
        filters={'parent': dashboard.name},
        fields=['*']
    )
    
    return {
        'dashboard': dashboard,
        'widgets': widgets
    }

@frappe.whitelist()
def process_image(image_data, module_name):
    """Process image using specified vision module"""
    try:
        # Get vision module
        module = frappe.get_doc('Vision Module', module_name)
        if not module.enabled:
            frappe.throw(_('Vision module is disabled'))

        # Convert base64 to image
        img_data = base64.b64decode(image_data.split(',')[1])
        img = Image.open(io.BytesIO(img_data))
        
        # Convert to OpenCV format
        cv_img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
        
        # Execute module code
        locals_dict = {'image': cv_img, 'cv2': cv2, 'np': np}
        exec(module.code, globals(), locals_dict)
        
        # Get results
        results = locals_dict.get('results', {})
        
        # Convert processed image back to base64
        processed_img = locals_dict.get('processed_image', cv_img)
        _, buffer = cv2.imencode('.jpg', processed_img)
        img_str = base64.b64encode(buffer).decode()
        
        return {
            'success': True,
            'processed_image': f'data:image/jpeg;base64,{img_str}',
            'results': results
        }
        
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _('Vision Processing Error'))
        return {
            'success': False,
            'error': str(e)
        }

@frappe.whitelist()
def save_widget_config(widget_name, config):
    """Save widget configuration"""
    try:
        widget = frappe.get_doc('Dashboard Widget', widget_name)
        widget.config = json.dumps(config)
        widget.save()
        return {'success': True}
    except Exception as e:
        return {'success': False, 'error': str(e)}
