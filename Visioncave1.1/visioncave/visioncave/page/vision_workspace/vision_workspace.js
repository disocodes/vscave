frappe.pages['vision-workspace'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Vision Workspace',
        single_column: true
    });

    // Add custom buttons
    page.add_menu_item('New Vision Module', () => {
        frappe.new_doc('Vision Module');
    });

    page.add_menu_item('New Dashboard', () => {
        frappe.new_doc('Vision Dashboard');
    });

    // Add filters
    page.add_field({
        fieldname: 'domain',
        label: 'Domain',
        fieldtype: 'Select',
        options: ['Residential', 'School', 'Hospital', 'Minesite', 'Traffic'],
        change() {
            // Refresh workspace based on selected domain
            loadDashboard(this.get_value());
        }
    });

    // Initialize workspace
    initializeWorkspace(page);
}

function initializeWorkspace(page) {
    // Create main container
    const container = $('<div class="vision-workspace"></div>').appendTo(page.main);
    
    // Add workspace sections
    container.append(`
        <div class="row">
            <div class="col-md-8">
                <div class="vision-main-content">
                    <!-- Main content area -->
                    <div class="camera-feed-container"></div>
                    <div class="analytics-container"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="vision-sidebar">
                    <!-- Sidebar with controls and stats -->
                    <div class="controls-container"></div>
                    <div class="stats-container"></div>
                </div>
            </div>
        </div>
    `);

    // Initialize components
    initializeCameraFeed();
    initializeAnalytics();
    initializeControls();
}

function loadDashboard(domain) {
    frappe.call({
        method: 'visioncave.api.get_dashboard',
        args: {
            domain: domain
        },
        callback: function(r) {
            if (r.message) {
                updateWorkspace(r.message);
            }
        }
    });
}
