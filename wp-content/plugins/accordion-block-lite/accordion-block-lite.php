<?php
/**
 * Plugin Name:       Accordion Block Lite
 * Plugin URI:        https://github.com/troytempleman/accordion-block-lite
 * Description:       A block that displays vertical list items that can expand and collapse to show and hide their associated sections of content.
 * Version:           0.1.2
 * Requires at least: 6.0
 * Requires PHP:      7.0
 * Author:            Troy Templeman
 * Author URI:        https://troytempleman.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion-block-lite
 * Domain Path:       /languages
 */

// Exit if accessed directly 
if( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Register block
function accordion_block_lite_register() {
	
	// Accordion
	register_block_type( 
		__DIR__ . '/build/accordion'
	);
	// Accordion item
	register_block_type(
		__DIR__ . '/build/accordion-item'
	);
}
add_action( 'init', 'accordion_block_lite_register' );

// Allowed HTML
function accordion_block_lite_allowed_html( $tags ) {
    
	$tags['svg'] = array(
		'version' => array(),
        'xmlns' => array(),
		'width' => array(),
		'height' => array(),
        'fill' => array(),
        'viewbox' => array(),
        'aria-hidden' => array(),
        'focusable' => array(),
    );
    $tags['g'] = array(
        'stroke' => array(),
		'stroke-width' => array(),
    );
    $tags['line'] = array(
        'x1' => array(),
		'x2' => array(),
        'y1' => array(),
		'y2' => array(),
    );
    $tags['polyline'] = array(
        'fill' => array(),
		'points' => array(),
        'stroke' => array(),
		'stroke-width' => array(),
    );
    return $tags;
}
add_filter( 'wp_kses_allowed_html', 'accordion_block_lite_allowed_html', 10, 2 );
