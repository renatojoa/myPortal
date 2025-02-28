<?php

// Exit if accessed directly 
if( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Attributes
$block_id = isset( $attributes['uid'] ) ? $attributes['uid'] : null;
$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : null;
$header_element = isset( $attributes['headerElement'] ) ? $attributes['headerElement'] : 'paragraph';
$header_heading_level = isset( $attributes['headerHeadingLevel'] ) ? $attributes['headerHeadingLevel'] : null;
$header_heading = $header_element === 'heading' ? 'h' . $header_heading_level : 'p';
$header_text = isset( $attributes['headerText'] ) ? $attributes['headerText'] : null;

// Wrapper
$class = 'wp-block-tt-accordion-item ';
$class .= $unique_class = wp_unique_id( 'wp-block-tt-accordion-item-' );
$class .= $text_align ? ' has-text-align-' . $text_align : null;
$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $class ) );

// Block content
$block_content = '<li ' . $wrapper_attributes .'>';
$block_content .= '<' . $header_heading . ' class="wp-block-tt-accordion-item-header">';
$block_content .= '<button class="wp-block-tt-accordion-item-header-button" id="wp-block-tt-accordion-item-header-button-' . $block_id . '" type="button">';
$block_content .= '<span class="wp-block-tt-accordion-item-header-button-text">' . $header_text . '</span>';
$block_content .= '<span class="wp-block-tt-accordion-item-header-button-icon-arrow" aria-hidden="true"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polyline points="4.711,8 12,15.289 19.289,8" stroke="black" stroke-width="2" fill="none" /></svg></span>';
$block_content .= '</button>';
$block_content .= '</' . $header_heading . '>';
$block_content .= '<div class="wp-block-tt-accordion-item-panel open" id="wp-block-tt-accordion-item-panel-' . $block_id . '" role="region">';
$block_content .= wp_kses_post( $content ) . '</div>';
$block_content .= '</li>';
echo wp_kses_post( $block_content );

?>