<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class OBF_Plugin {

	public function __construct() {
		$this->load_dependencies();
		$this->initialize_hooks();
        $this->define_shortcodes();

		// Initialize the trigger executor
		new OBF_Trigger_Executor();
	}

	private function load_dependencies(): void {
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-admin-menu.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-scripts.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-api-client.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-badge.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-trigger.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-rest-controller.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-notice-handler.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-trigger-executor.php';
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-obf-user-badges.php';
	}

	private function initialize_hooks(): void {
		add_action( 'admin_menu', [ $this, 'register_menu' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
		add_action( 'admin_init', [ $this, 'check_admin_notices' ] );
		add_action( 'init', [ $this, 'register_obf_block' ] );
	}

	private function define_shortcodes(): void {
		add_shortcode( 'user_badges', [ $this, 'user_badges_shortcode' ] );
	}

	public function register_menu(): void {
		$obf_admin_menu = new OBF_Admin_Menu();
		$obf_admin_menu->register_menu();
	}

	public function enqueue_scripts(): void {
		$obf_scripts = new OBF_Scripts();
		$obf_scripts->enqueue();
	}

	public function register_rest_routes(): void {
		$obf_rest_controller = new OBF_REST_Controller();
		$obf_rest_controller->register_routes();
	}

	public function check_admin_notices(): void {
		$notice_handler = new OBF_Notice_Handler();

		$client_id         = get_option( 'obf_client_id' );
		$client_secret     = get_option( 'obf_client_secret' );
		$api_client        = new OBF_API_Client( $client_id, $client_secret );
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
		$this->create_tables();
		$this->obf_add_badge_capabilities();
	}

	function obf_add_badge_capabilities(): void {
		// Define roles that should have the 'read_badges' capability
		$roles = ['administrator', 'editor', 'author', 'subscriber'];

		foreach ($roles as $role_name) {
			$role = get_role($role_name);
			if ($role) {
				$role->add_cap('read_badges');
			}
		}
	}

	public function register_obf_block(): void {
		if ( !WP_Block_Type_Registry::get_instance()->is_registered( 'obf/badges-block' ) ) {
			register_block_type( 'obf/badges-block', [
				'render_callback' => [ $this, 'render_obf_badges_block' ],
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

	public function render_obf_badges_block( $attributes ): string {
		// Get the badges for the logged-in user
		$user_id = get_current_user_id();
		if ( ! $user_id ) {
			return '<p>' . __( 'You must be logged in to view badges.', 'obf' ) . '</p>';
		}

		// Fetch badges from the database
		$badges = $this->get_user_badges_from_database( $user_id );

		if ( empty( $badges ) ) {
			return '<p>' . __( 'No badges available.', 'obf' ) . '</p>';
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
            <div class="obf-badges-block grid" style="--columns: <?php echo esc_attr( $columns ); ?>;">
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
            <table class="obf-badges-block table" style="--columns: <?php echo esc_attr( $columns ); ?>;">
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
            <ul class="obf-badges-block list">
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

		// Convert attributes to match the format expected by render_obf_badges_block
		$attributes = [
			'layout'          => $attributes['layout'],
			'columns'         => (int) $attributes['columns'],
			'showBadgeImage'  => (bool) $attributes['show_image'],
			'showBadgeName'   => (bool) $attributes['show_name'],
			'imageWidth'      => $attributes['image_width'],
			'imageMaxWidth'   => $attributes['image_max_width'],
		];

		// Call the existing render function with the mapped attributes
		return $this->render_obf_badges_block( $attributes );
	}

	// Helper function to get badges from the database
	private function get_user_badges_from_database( $user_id ): array {
		global $wpdb;
		$table_name_user_badges = $wpdb->prefix . 'obf_pws_user_badges';
		$table_name_badges = $wpdb->prefix . 'obf_pws_badges';

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

		// Create obf_pws_badges table
		$table_name_badges = $wpdb->prefix . 'obf_pws_badges';
		$sql_badges        = "CREATE TABLE $table_name_badges (
	        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	        obf_client_id VARCHAR(255) NOT NULL,
	        obf_id VARCHAR(255) NOT NULL,
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

		// Create obf_pws_triggers table
		$table_name_triggers = $wpdb->prefix . 'obf_pws_triggers';
		$sql_triggers        = "CREATE TABLE $table_name_triggers (
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

		// Create obf_pws_logs table
		$table_name_logs = $wpdb->prefix . 'obf_pws_logs';
		$sql_logs        = "CREATE TABLE $table_name_logs (
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

		// Create obf_pws_notices table
		$table_name_notices = $wpdb->prefix . 'obf_pws_notices';
		$sql_notices        = "CREATE TABLE $table_name_notices (
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

		// Create obf_pws_user_badges table
		$table_name_user_badges = $wpdb->prefix . 'obf_pws_user_badges';
		$sql_user_badges        = "CREATE TABLE $table_name_user_badges (
	        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	        user_id BIGINT(20) UNSIGNED NOT NULL,
	        badge_id BIGINT(20) UNSIGNED NOT NULL,
	        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	        PRIMARY KEY (id)
	    ) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql_badges );
		dbDelta( $sql_triggers );
		dbDelta( $sql_logs );
		dbDelta( $sql_notices );
		dbDelta( $sql_user_badges );

		// Add foreign key constraints if they don't exist
		if ( ! $this->foreign_key_exists( $table_name_triggers, 'fk_badge_id' ) ) {
			$wpdb->query( "ALTER TABLE $table_name_triggers 
            ADD CONSTRAINT fk_badge_id 
            FOREIGN KEY (badge_id) REFERENCES {$wpdb->prefix}obf_pws_badges(id) ON DELETE CASCADE" );
		}

		if ( ! $this->foreign_key_exists( $table_name_user_badges, 'fk_user_id' ) ) {
			$wpdb->query( "ALTER TABLE $table_name_user_badges 
            ADD CONSTRAINT fk_user_id 
            FOREIGN KEY (user_id) REFERENCES {$wpdb->prefix}users(ID) ON DELETE CASCADE" );
		}

		if ( ! $this->foreign_key_exists( $table_name_user_badges, 'fk_badge_id_user_badges' ) ) {
			$wpdb->query( "ALTER TABLE $table_name_user_badges 
            ADD CONSTRAINT fk_badge_id_user_badges 
            FOREIGN KEY (badge_id) REFERENCES {$wpdb->prefix}obf_pws_badges(id) ON DELETE CASCADE" );
		}
	}

	private function foreign_key_exists( $table, $key_name ): ?string {
		global $wpdb;
		$query = $wpdb->prepare(
			"SELECT CONSTRAINT_NAME 
			 FROM information_schema.KEY_COLUMN_USAGE 
			 WHERE TABLE_NAME = %s 
			 AND CONSTRAINT_NAME = %s",
			$table, $key_name
		);
		return $wpdb->get_var( $query );
	}

}