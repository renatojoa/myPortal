// External dependencies
import classnames from 'classnames';

// WordPress dependencies
import { 
	AlignmentToolbar, 
	BlockControls, 
	InnerBlocks, 
	RichText, 
	useBlockProps 
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Internal dependencies
import icons from './icons';

// Edit
export default function Edit( { attributes, setAttributes, context, clientId } ) {

	// Attributes
	const { 
		uid,
		textAlign,
		headerElement,
		headerHeadingLevel,
		headerText
	} = attributes;
	
	// Set attributes with parent values
	setAttributes( {
		headerElement: context[ "accordion/headerElement" ],
		headerHeadingLevel: context[ "accordion/headerHeadingLevel" ]
		
	} );
	
	// Block ID
	setAttributes( { uid: clientId } );
	
	// Block content
	const blockContent = () => {	
		
		// Wrapper 
		const wrapperAttributes = useBlockProps( {
			className: classnames( {
				[ `has-text-align-${ textAlign }` ]: textAlign
			} ),
		} );
		
		// Heading
		const Heading = headerElement === 'heading' ? 'h' + headerHeadingLevel : 'p';
		
		// Button
		const button = useRef();
		
		// Panel
		const panel = useRef();
		
		// Toggle
		function toggle() {
			const state = 'true' === button.current.getAttribute('aria-expanded');
			button.current.setAttribute('aria-expanded', ! state);
			if( state ) {
				panel.current.classList.remove("open");
				panel.current.hidden = true;
			} else {
				panel.current.classList.add("open");
				panel.current.hidden = false;
			}
		}
		
		// All other blocks
		const allOtherBlocks = wp.blocks.getBlockTypes().map( block => block.name ).filter( name => name !== 'tt/accordion-item' );
		
		return(	
			<li { ...wrapperAttributes }>
				<Heading className="wp-block-tt-accordion-item-header">
					<button 
						ref={ button }
						onClick={ toggle }
						className="wp-block-tt-accordion-item-header-button" 
						id={ "wp-block-tt-accordion-item-header-button-" + uid } 
						aria-expanded="false"
						aria-controls={ "wp-block-tt-accordion-item-panel-" + uid }
						type="button"
					>
						<RichText
							tagName="span"
							className="wp-block-tt-accordion-item-header-button-text"
							value={ headerText }
							allowedFormats={ ['core/bold', 'core/italic'] }
							placeholder={ __( 'Add title', 'accordion-item' ) }
							onChange={ ( value ) => setAttributes( { headerText: value } ) }
						/>
						<span 
							className="wp-block-tt-accordion-item-header-button-icon-arrow"
						>
							<Icon
						    	icon={ icons.arrow }
						    />
						</span>
					</button>
				</Heading>
				<div 
					ref={ panel } 
					className="wp-block-tt-accordion-item-panel open" 
					id={ "wp-block-tt-accordion-item-panel-" + uid } 
					aria-labelledby={ "wp-block-tt-accordion-item-header-button-" + uid } 
					role="region"
					hidden
				>
					<InnerBlocks 
						allowedBlocks={ allOtherBlocks } 
					/>
				</div>
			</li>
		)
	}

	// Block controls
	const blockControls = () => {
		return(	
			<BlockControls group="block">
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) => setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>
		)
	}
	
	// Editor
	return (
		<>
			{ blockControls() }
			{ blockContent() }
		</>
	);
};