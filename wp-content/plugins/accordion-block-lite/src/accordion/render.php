<?php

// Exit if accessed directly 
if( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Attributes
$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : '';

// Wrapper
$class = 'wp-block-tt-accordion ';
$class .= $text_align ? ' has-text-align-' . $text_align : null;
$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $class ) );

// Block content
$block_content = '<ul ' . $wrapper_attributes . '>';
$block_content .= wp_kses_post( $content );
$block_content .= '</ul>';
echo wp_kses_post( $block_content );

?>
