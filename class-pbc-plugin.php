<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class PBC_Plugin {

	public function __construct() {
		$this->load_dependencies();
		$this->initialize_hooks();
        $this->define_shortcodes();

		// Initialize the trigger executor
		new PBC_Trigger_Executor();
	}

	private function load_dependencies(): void {
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-admin-menu.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-scripts.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-api-client.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-badge.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-trigger.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-rest-controller.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-notice-handler.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-trigger-executor.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-pbc-user-badges.php';
	}

	private function initialize_hooks(): void {
		add_action( 'admin_menu', [ $this, 'register_menu' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
		add_action( 'admin_init', [ $this, 'check_admin_notices' ] );
		add_action( 'init', [ $this, 'register_pbc_block' ] );
	}

	private function define_shortcodes(): void {
		add_shortcode( 'user_badges', [ $this, 'user_badges_shortcode' ] );
	}

	public function register_menu(): void {
		$pbc_admin_menu = new PBC_Admin_Menu();
		$pbc_admin_menu->register_menu();
	}

	public function enqueue_scripts(): void {
		$pbc_scripts = new PBC_Scripts();
		$pbc_scripts->enqueue();
	}

	public function register_rest_routes(): void {
		$pbc_rest_controller = new PBC_REST_Controller();
		$pbc_rest_controller->register_routes();
	}

	public function check_admin_notices(): void {
		$notice_handler = new PBC_Notice_Handler();

		$client_id         = get_option( 'pbc_client_id' );
		$client_secret     = get_option( 'pbc_client_secret' );
		$api_client        = new PBC_API_Client( $client_id, $client_secret );
		$connection_status = $api_client->get_connection_status();

		// Check if Client ID is filled
		if ( empty( $client_id ) ) {
			$notice_handler->create_or_update_notice( 'client_id_missing', 'error', 'Missing Client ID', 'The Client ID is not filled. Please configure on the settings page.' );
		} else {
			$notice_handler->remove_notice( 'client_id_missing' );
		}

		// Check if Client Secret is filled
		if ( empty( $client_secret ) ) {
			$notice_handler->create_or_update_notice( 'client_secret_missing', 'error', 'Missing Client Secret', 'The Client Secret is not filled. Please configure on the settings page.' );
		} else {
			$notice_handler->remove_notice( 'client_secret_missing' );
		}

		// Check if connection to Open Badge Factory API is working
		if ( is_wp_error( $connection_status ) ) {
			$notice_handler->create_or_update_notice( 'api_connection_failed', 'error', 'API Connection Failed', 'Could not connect to the Open Badge Factory API. Please check your credentials.' );
		} else {
			$notice_handler->remove_notice( 'api_connection_failed' );
		}
	}

	public function activate(): void {
		$installed_version = get_option( 'pbc_db_version' );

		// Run schema creation only if the version is missing or outdated.
		if ( $installed_version !== PBC_PLUGIN_VERSION ) {
			$this->create_tables();
			update_option( 'pbc_db_version', PBC_PLUGIN_VERSION );
		}
		$this->create_tables();
		$this->pbc_add_badge_capabilities();
		$this->pbc_local_api_key();
	}

	function pbc_add_badge_capabilities(): void {
		// Define roles that should have the 'read_badges' capability
		$roles = ['administrator', 'editor', 'author', 'subscriber'];

		foreach ($roles as $role_name) {
			$role = get_role($role_name);
			if ($role) {
				$role->add_cap('read_badges');
			}
		}
	}

	public function register_pbc_block(): void {
		if ( !WP_Block_Type_Registry::get_instance()->is_registered( 'pbc/badges-block' ) ) {
			register_block_type( 'pbc/badges-block', [
				'render_callback' => [ $this, 'render_pbc_badges_block' ],
				'attributes'      => [
					'layout'         => [
						'type'    => 'string',
						'default' => 'grid',
					],
					'showBadgeName'  => [
						'type'    => 'boolean',
						'default' => true,
					],
					'showBadgeImage' => [
						'type'    => 'boolean',
						'default' => true,
					],
					'columns'        => [
						'type'    => 'number',
						'default' => 3,
					],
				],
			] );
		}
	}

	public function render_pbc_badges_block( $attributes ): string {
		// Get the badges for the logged-in user
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return '<p>' . __( 'You must be logged in to view badges.', 'pbc' ) . '</p>';
		}

		// Fetch badges from the database
		$badges = $this->get_user_badges_from_database( $user_id );

		if ( empty( $badges ) ) {
			return '<p>' . __( 'No badges available.', 'pbc' ) . '</p>';
		}

		// Prepare layout and attributes
		$layout = $attributes['layout'] ?? 'grid';
		$showBadgeName = $attributes['showBadgeName'] ?? true;
		$showBadgeImage = $attributes['showBadgeImage'] ?? true;
		$columns = $attributes['columns'] ?? 3;
		$imageWidth = $attributes['imageWidth'] ?? '100%';
		$imageMaxWidth = $attributes['imageMaxWidth'] ?? '450px';

		ob_start();

		// Render based on the selected layout
		if ( $layout === 'grid' ) {
			?>
            <div class="pbc-badges-block grid" style="--columns: <?php echo esc_attr( $columns ); ?>;">
				<?php foreach ( $badges as $badge ) : ?>
                    <div class="badge-item">
						<?php if ( $showBadgeImage && ! empty( $badge['image'] ) ) : ?>
                            <img src="<?php echo $badge['image']; ?>" alt="<?php echo esc_attr( $badge['name'] ); ?>"
                                 loading="lazy"
                                 style="width: <?php echo esc_attr( $imageWidth ); ?>; max-width: <?php echo esc_attr( $imageMaxWidth ); ?>;">
						<?php endif; ?>
						<?php if ( $showBadgeName ) : ?>
                            <span><?php echo esc_html( $badge['name'] ); ?></span>
						<?php endif; ?>
                    </div>
				<?php endforeach; ?>
            </div>
			<?php
		} elseif ( $layout === 'table' ) {
			?>
            <table class="pbc-badges-block table" style="--columns: <?php echo esc_attr( $columns ); ?>;">
                <tbody>
				<?php
				$count = 0;
				foreach ( $badges as $badge ) :
					if ( $count % $columns === 0 ) : // Start a new row every $columns badges
						?>
                        <tr>
					<?php endif; ?>
                    <td class="badge-item">
						<?php if ( $showBadgeImage && ! empty( $badge['image'] ) ) : ?>
                            <img src="<?php echo $badge['image']; ?>" alt="<?php echo esc_attr( $badge['name'] ); ?>"
                                 loading="lazy"
                                 style="width: <?php echo esc_attr( $imageWidth ); ?>; max-width: <?php echo esc_attr( $imageMaxWidth ); ?>;">
						<?php endif; ?>
						<?php if ( $showBadgeName ) : ?>
                            <span><?php echo esc_html( $badge['name'] ); ?></span>
						<?php endif; ?>
                    </td>
					<?php
					$count++;
					if ( $count % $columns === 0 ) : // Close the row after $columns badges
						?>
                        </tr>
					<?php endif; ?>
				<?php endforeach; ?>
				<?php
				// Close the last row if it's not complete
				if ( $count % $columns !== 0 ) :
					?>
                    </tr>
				<?php endif; ?>
                </tbody>
            </table>
			<?php
		} elseif ( $layout === 'list' ) {
			?>
            <ul class="pbc-badges-block list">
				<?php foreach ( $badges as $badge ) : ?>
                    <li class="badge-item">
						<?php if ( $showBadgeImage && ! empty( $badge['image'] ) ) : ?>
                            <img src="<?php echo $badge['image']; ?>" alt="<?php echo esc_attr( $badge['name'] ); ?>"
                                 loading="lazy"
                                 style="width: <?php echo esc_attr( $imageWidth ); ?>; max-width: <?php echo esc_attr( $imageMaxWidth ); ?>;">
						<?php endif; ?>
						<?php if ( $showBadgeName ) : ?>
                            <span><?php echo esc_html( $badge['name'] ); ?></span>
						<?php endif; ?>
                    </li>
				<?php endforeach; ?>
            </ul>
			<?php
		}

		return ob_get_clean();
	}

	// Function to handle the shortcode
	public function user_badges_shortcode( $atts ) {
		// Define default attributes that match the Gutenberg editor
		$defaults = [
			'layout'          => 'grid',
			'columns'         => 3,
			'show_image'      => 1,
			'show_name'       => 1,
			'image_width'     => '100%',
			'image_max_width' => '450px',
		];

		// Parse the provided attributes against the defaults
		$attributes = shortcode_atts( $defaults, $atts );

		// Convert attributes to match the format expected by render_pbc_badges_block
		$attributes = [
			'layout'          => $attributes['layout'],
			'columns'         => (int) $attributes['columns'],
			'showBadgeImage'  => (bool) $attributes['show_image'],
			'showBadgeName'   => (bool) $attributes['show_name'],
			'imageWidth'      => $attributes['image_width'],
			'imageMaxWidth'   => $attributes['image_max_width'],
		];

		// Call the existing render function with the mapped attributes
		return $this->render_pbc_badges_block( $attributes );
	}

	// Helper function to get badges from the database
	private function get_user_badges_from_database( $user_id ): array {
		global $wpdb;
		$table_name_user_badges = $wpdb->prefix . 'pbc_user_badges';
		$table_name_badges = $wpdb->prefix . 'pbc_badges';

		return $wpdb->get_results(
			$wpdb->prepare(
				"SELECT b.name, b.image
            FROM {$table_name_user_badges} ub
            LEFT JOIN {$table_name_badges} b ON ub.badge_id = b.id
            WHERE ub.user_id = %d",
				$user_id
			),
			ARRAY_A
		);
	}

	private function create_tables(): void {
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();

		// Create pbc_badges table
		$table_name_badges = $wpdb->prefix . 'pbc_badges';
		$sql_badges = "CREATE TABLE $table_name_badges (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        pbc_client_id VARCHAR(255) NOT NULL,
        pbc_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image MEDIUMTEXT NOT NULL,
        category TEXT NOT NULL,
        alt_language TEXT NOT NULL,
        expires INT(11) NOT NULL,
        modified_time BIGINT(20) UNSIGNED NOT NULL,
        created_time BIGINT(20) UNSIGNED NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

		// Create pbc_triggers table
		$table_name_triggers = $wpdb->prefix . 'pbc_triggers';
		$sql_triggers = "CREATE TABLE $table_name_triggers (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        badge_id BIGINT(20) UNSIGNED NOT NULL,
        extension VARCHAR(255) NOT NULL,
        trigger_type VARCHAR(255) NOT NULL,
        object VARCHAR(255) NOT NULL,
        triggered_count INT UNSIGNED NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

		// Create pbc_logs table
		$table_name_logs = $wpdb->prefix . 'pbc_logs';
		$sql_logs = "CREATE TABLE $table_name_logs (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        trigger_id BIGINT(20) UNSIGNED NULL,
        user_id BIGINT(20) UNSIGNED NULL,
        post_id BIGINT(20) UNSIGNED NULL,
        type VARCHAR(255) NULL,
        message TEXT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

		// Create pbc_notices table
		$table_name_notices = $wpdb->prefix . 'pbc_notices';
		$sql_notices = "CREATE TABLE $table_name_notices (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        slug VARCHAR(100) NOT NULL UNIQUE,
        status BOOLEAN NOT NULL DEFAULT TRUE,
        type VARCHAR(50) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        action VARCHAR(255) NULL,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        completed_date DATETIME NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

		// Create pbc_user_badges table
		$table_name_user_badges = $wpdb->prefix . 'pbc_user_badges';
		$sql_user_badges = "CREATE TABLE $table_name_user_badges (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT(20) UNSIGNED NOT NULL,
        badge_id BIGINT(20) UNSIGNED NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

		// Run the table creation queries.
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql_badges );
		dbDelta( $sql_triggers );
		dbDelta( $sql_logs );
		dbDelta( $sql_notices );
		dbDelta( $sql_user_badges );

		// Drop existing foreign key constraints if they exist.
		// The @ operator suppresses warnings if the constraint isn’t present.
		@$wpdb->query( "ALTER TABLE $table_name_triggers DROP FOREIGN KEY fk_badge_id" );
		@$wpdb->query( "ALTER TABLE $table_name_user_badges DROP FOREIGN KEY fk_user_id" );
		@$wpdb->query( "ALTER TABLE $table_name_user_badges DROP FOREIGN KEY fk_badge_id_user_badges" );

		// Add foreign key constraints.
		$wpdb->query( "ALTER TABLE $table_name_triggers 
        ADD CONSTRAINT fk_badge_id 
        FOREIGN KEY (badge_id) REFERENCES $table_name_badges(id) ON DELETE CASCADE" );

		$wpdb->query( "ALTER TABLE $table_name_user_badges 
        ADD CONSTRAINT fk_user_id 
        FOREIGN KEY (user_id) REFERENCES {$wpdb->prefix}users(ID) ON DELETE CASCADE" );

		$wpdb->query( "ALTER TABLE $table_name_user_badges 
        ADD CONSTRAINT fk_badge_id_user_badges 
        FOREIGN KEY (badge_id) REFERENCES $table_name_badges(id) ON DELETE CASCADE" );
	}

	/**
	 * Retrieve the local API key, or generate one if it doesn't exist.
	 *
	 * @return string The API key.
	 */
	public function pbc_local_api_key(): string {
		$api_key = get_option( 'pbc_api_key' );
		if ( empty( $api_key ) ) {
			// Generate a 32-character API key. Adjust parameters as needed.
			$api_key = wp_generate_password( 32, false, false );
			update_option( 'pbc_api_key', $api_key );
		}
		return $api_key;
	}

}