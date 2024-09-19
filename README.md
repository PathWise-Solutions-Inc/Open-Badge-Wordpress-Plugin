# Open Badge Factory by Pathwise Solutions Inc.

## Release Notes

### v0.3.0 - Shortcode Integration and Enhanced Badge Display Options (2024-09-19)

**What's New:**

- **Shortcode Integration:**
    - Introduced the `[user_badges]` shortcode, allowing users to display their earned badges anywhere on their site without using the Gutenberg block.
    - Shortcode attributes match the Gutenberg block settings for consistent behavior:
        - `layout`: Choose between 'grid', 'table', or 'list' layouts (`layout="grid"` by default).
        - `columns`: Adjust the number of columns in the grid or table layout (`columns="3"` by default).
        - `show_image`: Toggle the display of badge images (`show_image="1"` by default).
        - `show_name`: Toggle the display of badge names (`show_name="1"` by default).
        - `image_width` and `image_max_width`: Control the badge image width and maximum width (`image_width="100%"` and `image_max_width="450px"` by default).
    - The shortcode seamlessly reuses the existing rendering logic of the Gutenberg block for a unified and efficient approach.

- **Enhanced Table and List Layouts:**
    - Improved the table layout to dynamically handle the specified number of columns, ensuring badges are displayed evenly and aesthetically.
    - The list layout now groups each badge and its name as a cohesive element, enhancing readability and organization.
    - Adjusted CSS to ensure that table layouts span the full width of the available space, providing a more polished display.

**Enhancements:**

- **Consistent Badge Display Across Editor and Shortcode:**
    - Unified rendering logic for badges across both Gutenberg blocks and shortcodes, reducing code duplication and maintenance.
    - Ensured that any customization made in the block editor is faithfully replicated when using the shortcode.

- **Styling Improvements:**
    - Updated CSS to ensure full-width display of table layouts and consistent centering of badge images and names across all layouts.
    - Enhanced flex and grid styles to ensure badges are visually balanced, regardless of the selected layout.

- **Performance Optimizations:**
    - Further optimized server-side rendering and caching for badge data to enhance performance, especially for larger badge sets.

**Bug Fixes:**

- **Shortcode Attribute Handling:**
    - Fixed issues with shortcode attribute handling to ensure that user-provided values are correctly processed and applied.

- **Rendering Consistency:**
    - Addressed inconsistencies between block and shortcode rendering, ensuring all badge display options are honored equally.

---

### v0.2.1 - User Badge Block and Frontend Enhancements (2024-09-18)

**What's New:**

- **User Badges Block:**
    - Added a new Gutenberg block allowing users to display badges they’ve earned from the Open Badge Factory on any page or post.
    - Block includes customizable display options:
        - Layout choices: Grid, Table, or List.
        - Ability to toggle the display of badge names and badge images.
        - Adjustable number of columns in grid view for optimal badge display.
    - Dynamic fetching of the logged-in user’s badges via the REST API and rendering on the front-end.
    - If no badges are available, a default message informs the user.

- **Frontend Badge Display:**
    - Implemented server-side rendering for the User Badges block on the front-end, ensuring badges are displayed properly for both logged-in users and visitors viewing public profiles.
    - Server-side caching enabled for badge data to enhance performance.
    - Badges are dynamically loaded on the front-end, ensuring users always see their latest badge achievements.

- **REST API Enhancements:**
    - Added the `/wp-json/obf-pws/v1/user-badges` endpoint to retrieve a logged-in user’s badges.
    - Permissions check added to ensure only authorized users can access their badges.

**Enhancements:**

- **Improved Block Experience:**
    - Block customization settings allow for different display layouts and more flexible user interface options.
    - Integrated block controls in the editor with live previews to improve the editing experience for admins.

- **Bug Fixes:**
    - Fixed an issue where the badge block would not display any content on the front end after saving a post.
    - Corrected REST API path inconsistencies to ensure proper data fetching for the badge block.

- **Code Refactoring and Cleanup:**
    - Refactored the enqueue scripts to ensure both admin and front-end assets are correctly loaded, improving the plugin’s performance and user experience.

---



### v0.2.0 - Enhanced API Handling and Trigger Management (2024-09-17)

**What's New:**

- **Improved API Response Handling:**
    - **Plain Text Response Support:**
        - Updated the API client to correctly handle plain text responses from the Open Badge Factory API instead of assuming JSON.
        - Adjusted methods like `make_request()`, `ping()`, `issue_badge()`, `get_badges()`, and `get_badge_by_id()` to process API responses accurately.
    - **Enhanced Error Handling:**
        - Improved error handling in `get_triggers()` to correctly handle empty result sets without treating them as errors.
        - Added detailed logging for API requests and responses to facilitate debugging and troubleshooting.
    - **Fixed Log Display Issues:**
        - Resolved issues with the log display in the `Log.vue` component, ensuring that logs are correctly fetched and displayed without errors.
        - Corrected the REST API response structure to remove unnecessary nesting, simplifying the JSON response and improving frontend data handling.

- **Restored and Improved Trigger Functionality:**
    - **Post Title Association:**
        - Fixed an issue where fetching triggers lost associated post titles after refactoring, ensuring that triggers correctly include related post information.
    - **Logging Enhancements:**
        - Added logging using `OBF_Log` when triggers are created, updated, or deleted, enhancing transparency and auditability.
        - Ensured that `trigger_id` is included in log messages for better traceability.
    - **Badge Issuance Tracking:**
        - Added functionality to store issued badges in the `obf_pws_user_badges` table after successful issuance via the API, enabling better tracking of user badges.

- **Code Refactoring and Cleanup:**
    - **Type Corrections:**
        - Corrected return types in functions to avoid fatal errors, improving code reliability.
    - **Improved State Management:**
        - Enhanced the trigger management system by ensuring that temporary triggers are properly handled, preventing duplication.
        - Added checks to prevent duplicate triggers from being added to the state and logic to update existing triggers in place.

**Enhancements:**

- **Better Debug Logging:**
    - Added logging throughout the codebase to track operations such as trigger creation, updates, deletions, and badge issuance, aiding in debugging and monitoring plugin activity.

- **Frontend Improvements:**
    - Improved the performance and reliability of the log display in the admin dashboard.
    - Enhanced the user experience by ensuring logs and triggers display accurate and up-to-date information.

---

### v0.1.0 - Initial Release (2024-08-28)

**Features:**

- **Trigger Management:**
    - Manage triggers for badge issuance, including adding, editing, and deleting triggers.
    - Triggers are linked to badges, extensions (e.g., WordPress, LearnDash), and specific actions like course completion and user creation.
    - View triggers in a dynamic card-style interface.
    - Each trigger has customizable fields: badge, extension, trigger action, and object (related post).

- **Badge Synchronization:**
    - Ability to sync badges with the Open Badge Factory (OBF) API.
    - Displays synced badges in a searchable and filterable interface.
    - Each badge displays key information such as name, description, image, category, available languages, and expiration details.
    - Added functionality to trigger the synchronization process manually.

- **Admin Notices:**
    - Admin notices system to display important notifications within the WordPress dashboard.
    - Notices can be dismissed or can link to specific actions (e.g., API connection issues, client ID/secret configuration).

- **Activity Logging:**
    - Logs activity related to badges and triggers, including user actions, badge issues, and trigger executions.
    - Log entries are searchable and paginated for easier management.
    - Each log displays details such as user, badge, type of action, message, and timestamp.

- **Settings Page:**
    - Settings page for configuring the Open Badge Factory API client ID and client secret.
    - Sync button to trigger badge synchronization manually.
    - Connection status indicator for the Open Badge Factory API.
    - Last synchronization date and time display.

**Database Structure:**
- Created several new database tables to manage badges, triggers, logs, and user-badge relationships:
    - `obf_pws_badges`: Stores badge information synced from the OBF API.
    - `obf_pws_triggers`: Stores trigger information that links actions to badge issuance.
    - `obf_pws_logs`: Stores logs of activity related to badge issuance and trigger executions.
    - `obf_pws_user_badges`: Stores which users have received which badges.
    - `obf_pws_notices`: Stores notices to display in the admin interface.

**REST API Endpoints:**
- Added extensive custom REST API endpoints to interact with badges, triggers, settings, logs, and notices:
    - `/wp-json/obf-pws/v1/connection-status`: Get the connection status with the Open Badge Factory API.
    - `/wp-json/obf-pws/v1/settings`: Retrieve the current settings.
    - `/wp-json/obf-pws/v1/settings`: Save settings (POST).
    - `/wp-json/obf-pws/v1/sync`: Synchronize badges with the Open Badge Factory (POST).
    - `/wp-json/obf-pws/v1/last-sync`: Get the last sync time.
    - `/wp-json/obf-pws/v1/badges`: Retrieve all badges.
    - `/wp-json/obf-pws/v1/triggers`: Get all triggers.
    - `/wp-json/obf-pws/v1/triggers/(?P<id>\d+)`: Get a single trigger by ID.
    - `/wp-json/obf-pws/v1/triggers`: Save or update a trigger (POST).
    - `/wp-json/obf-pws/v1/triggers/(?P<id>\d+)`: Delete a trigger (DELETE).
    - `/wp-json/obf-pws/v1/posts-by-type`: Get all posts by a specified post type.
    - `/wp-json/obf-pws/v1/logs`: Retrieve activity logs.
    - `/wp-json/obf-pws/v1/notices`: Get all active notices.
    - `/wp-json/obf-pws/v1/notices`: Create a new notice (POST).
    - `/wp-json/obf-pws/v1/notices/(?P<id>\d+)`: Delete a notice (DELETE).


**Known Issues:**
- Triggers may appear twice when first created if the list is empty (resolved in v0.2.0).
- Some API connection errors may not provide detailed error messages (improved in future versions).
