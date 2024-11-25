import frappe
from frappe.desk.doctype.workspace.workspace import append_item

def execute():
    """Set up Vision Workspace"""
    if not frappe.db.exists("Workspace", "Vision"):
        doc = frappe.new_doc("Workspace")
        doc.name = "Vision"
        doc.label = "Vision"
        doc.category = "Modules"
        doc.icon = "camera"
        doc.is_hidden = 0
        doc.sequence_id = 1
        doc.onboarding = "Vision"
        doc.extends = "Vision"
        doc.disable_user_customization = 0
        
        # Add shortcuts
        shortcuts = [
            {
                "type": "DocType",
                "link_to": "Vision Module",
                "label": "Vision Module",
                "color": "grey"
            },
            {
                "type": "DocType",
                "link_to": "Vision Dashboard",
                "label": "Vision Dashboard",
                "color": "grey"
            }
        ]
        
        for shortcut in shortcuts:
            doc.append("shortcuts", shortcut)
        
        # Add links
        links = [
            {
                "type": "DocType",
                "link_to": "Vision Module",
                "label": "Vision Module",
                "dependencies": [],
                "onboard": 1
            },
            {
                "type": "DocType",
                "link_to": "Vision Dashboard",
                "label": "Vision Dashboard",
                "dependencies": [],
                "onboard": 1
            },
            {
                "type": "DocType",
                "link_to": "Vision Settings",
                "label": "Vision Settings",
                "dependencies": [],
                "onboard": 0
            }
        ]
        
        for link in links:
            doc.append("links", link)
        
        doc.insert()
