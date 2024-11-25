import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def execute():
    # Create roles if they don't exist
    roles = [
        "Vision Manager",
        "Vision User",
        "Vision Developer"
    ]
    
    for role in roles:
        if not frappe.db.exists("Role", role):
            doc = frappe.new_doc("Role")
            doc.role_name = role
            doc.desk_access = 1
            doc.insert(ignore_permissions=True)
    
    # Set up role permissions
    setup_role_permissions()
    
    # Create custom fields
    setup_custom_fields()

def setup_role_permissions():
    """Set up default role permissions for Vision doctypes"""
    permissions = {
        "Vision Manager": [
            {
                "doctype": "Vision Module",
                "perms": ["read", "write", "create", "delete", "submit", "cancel", "amend"]
            },
            {
                "doctype": "Vision Dashboard",
                "perms": ["read", "write", "create", "delete", "submit", "cancel", "amend"]
            }
        ],
        "Vision Developer": [
            {
                "doctype": "Vision Module",
                "perms": ["read", "write", "create", "submit"]
            }
        ],
        "Vision User": [
            {
                "doctype": "Vision Dashboard",
                "perms": ["read"]
            },
            {
                "doctype": "Vision Module",
                "perms": ["read"]
            }
        ]
    }
    
    for role, role_permissions in permissions.items():
        for perm in role_permissions:
            doctype = perm["doctype"]
            if not frappe.db.exists("Custom DocPerm", {"parent": doctype, "role": role}):
                doc = frappe.new_doc("Custom DocPerm")
                doc.parent = doctype
                doc.parenttype = "DocType"
                doc.parentfield = "permissions"
                doc.role = role
                for p in perm["perms"]:
                    setattr(doc, p, 1)
                doc.insert(ignore_permissions=True)

def setup_custom_fields():
    """Create custom fields for integration with other modules"""
    custom_fields = {
        "User": [
            {
                "fieldname": "vision_settings",
                "label": "Vision Settings",
                "fieldtype": "Section Break",
                "insert_after": "bio"
            },
            {
                "fieldname": "default_vision_dashboard",
                "label": "Default Vision Dashboard",
                "fieldtype": "Link",
                "options": "Vision Dashboard",
                "insert_after": "vision_settings"
            }
        ]
    }
    
    create_custom_fields(custom_fields)
