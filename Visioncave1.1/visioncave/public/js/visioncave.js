// Vision Module Editor Extension
frappe.ui.form.on('Vision Module', {
    refresh: function(frm) {
        // Add custom buttons
        frm.add_custom_button(__('Test Module'), function() {
            testVisionModule(frm);
        });
        
        // Setup code editor
        setupCodeEditor(frm);
    },
    
    validate: function(frm) {
        // Validate Python code
        validatePythonCode(frm.doc.code);
    }
});

// Dashboard Widget Extension
frappe.ui.form.on('Dashboard Widget', {
    refresh: function(frm) {
        // Add preview
        setupWidgetPreview(frm);
    }
});

// Helper functions
function setupCodeEditor(frm) {
    // Initialize Monaco Editor
    if (!frm.code_editor) {
        frm.code_editor = monaco.editor.create(
            document.getElementById('code_editor'), {
                value: frm.doc.code || '',
                language: 'python',
                theme: 'vs-dark',
                automaticLayout: true
            }
        );
        
        // Update form value when code changes
        frm.code_editor.onDidChangeModelContent(() => {
            frm.doc.code = frm.code_editor.getValue();
        });
    }
}

function testVisionModule(frm) {
    // Create test dialog
    let d = new frappe.ui.Dialog({
        title: __('Test Vision Module'),
        fields: [
            {
                label: __('Test Image'),
                fieldname: 'test_image',
                fieldtype: 'Attach Image'
            }
        ],
        primary_action_label: __('Process'),
        primary_action(values) {
            processTestImage(values.test_image, frm.doc.name);
            d.hide();
        }
    });
    d.show();
}

function processTestImage(image_url, module_name) {
    // Convert image to base64
    fetch(image_url)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Call backend processing
                frappe.call({
                    method: 'visioncave.api.process_image',
                    args: {
                        image_data: reader.result,
                        module_name: module_name
                    },
                    callback: function(r) {
                        if (r.message && r.message.success) {
                            showProcessingResults(r.message);
                        } else {
                            frappe.msgprint(__('Processing failed: ' + r.message.error));
                        }
                    }
                });
            };
            reader.readAsDataURL(blob);
        });
}
