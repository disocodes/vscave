import frappe
import json

def execute():
    create_domain_dashboards()
    create_default_widgets()

def create_domain_dashboards():
    """Create default dashboards for each domain"""
    domains = [
        {
            "name": "Residential Vision",
            "domain": "Residential",
            "config": {
                "refresh_interval": 5,
                "layout": "grid",
                "columns": 3
            }
        },
        {
            "name": "School Vision",
            "domain": "School",
            "config": {
                "refresh_interval": 5,
                "layout": "grid",
                "columns": 3
            }
        },
        {
            "name": "Hospital Vision",
            "domain": "Hospital",
            "config": {
                "refresh_interval": 3,
                "layout": "grid",
                "columns": 3
            }
        }
    ]
    
    for dashboard in domains:
        if not frappe.db.exists("Vision Dashboard", dashboard["name"]):
            doc = frappe.new_doc("Vision Dashboard")
            doc.dashboard_name = dashboard["name"]
            doc.domain = dashboard["domain"]
            doc.config = json.dumps(dashboard["config"])
            doc.enabled = 1
            doc.insert()

def create_default_widgets():
    """Create default widgets for each dashboard"""
    widgets = [
        {
            "dashboard": "Residential Vision",
            "widgets": [
                {
                    "widget_name": "Camera Feed",
                    "widget_type": "Camera",
                    "position": 1,
                    "size": "Large",
                    "config": {
                        "camera_id": 0,
                        "fps": 30
                    }
                },
                {
                    "widget_name": "Motion Analytics",
                    "widget_type": "Analytics",
                    "position": 2,
                    "size": "Medium",
                    "vision_module": "Motion Detection",
                    "config": {
                        "chart_type": "bar",
                        "update_interval": 5
                    }
                }
            ]
        }
    ]
    
    for dashboard in widgets:
        if frappe.db.exists("Vision Dashboard", dashboard["dashboard"]):
            doc = frappe.get_doc("Vision Dashboard", dashboard["dashboard"])
            for widget in dashboard["widgets"]:
                doc.append("widgets", widget)
            doc.save()
