app_name = "visioncave"
app_title = "VisionCave"
app_publisher = "VisionCave"
app_description = "Advanced Vision Analytics Platform"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "admin@visioncave.com"
app_license = "MIT"

# Include js/css files in header of desk.html
app_include_css = ["/assets/visioncave/css/visioncave.css"]
app_include_js = ["/assets/visioncave/js/visioncave.js"]

# Includes in <head>
website_context = {
    "js": [
        "assets/visioncave/js/visioncave-web.js"
    ],
    "css": [
        "assets/visioncave/css/visioncave-web.css"
    ]
}

# Document Events
doc_events = {
    "Vision Module": {
        "after_insert": "visioncave.vision.process_module",
        "on_update": "visioncave.vision.update_module"
    }
}

# Scheduled Tasks
scheduler_events = {
    "hourly": [
        "visioncave.tasks.process_analytics"
    ],
    "daily": [
        "visioncave.tasks.cleanup_old_data"
    ]
}
