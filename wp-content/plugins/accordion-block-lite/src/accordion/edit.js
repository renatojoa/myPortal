// External dependencies
import classnames from 'classnames';

// WordPress dependencies
import { 
	AlignmentToolbar, 
	BlockControls, 
	InnerBlocks, 
	InspectorControls, 
	RichText, 
	useBlockProps
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	RangeControl, 
	__experimentalToggleGroupControl as ToggleGroupControl, 
	__experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Internal dependencies
import { 
	Appender, 
	HeadingLevelDropdown 
} from './utils';
import icons from './icons';

// Editor styles
import './editor.scss';
		
// Edit
export default function Edit( { attributes, setAttributes, clientId } ) {
	
	// Attributes
	const { 
		uid,
		textAlign,
		headerElement,
		headerHeadingLevel
	} = attributes;
	
	// Unique ID
	setAttributes( { uid: clientId } );
	
	// Block content
	const blockContent = () => {	
	
		// Wrapper 
		const wrapperAttributes = useBlockProps( {
			className: classnames( {
				[ `has-text-align-${ textAlign }` ]: textAlign,
			} ),
		} );
		
		return(	
			<ul { ...wrapperAttributes }>
				<InnerBlocks
					allowedBlocks={ ['tt/accordion-item'] }
					template={ [['tt/accordion-item']] }
					renderAppender={ () => (
                        <Appender rootClientId={ uid } />
                    ) }
				/>
			</ul>
		)
	}

	// Inspector controls
	const inspectorControls = () => {			
		return(	
			<>
				<InspectorControls group="settings">
					<PanelBody title={ __( 'Settings', 'accordion-block' ) }>
						<ToggleGroupControl
							label={ __( 'Header Element', 'accordion-block' ) }
							className="components-toggle-group-control-header-element"
							value={ headerElement }
							onChange={ ( value ) => setAttributes( { headerElement: value } ) }
							isBlock	 
						>
							<ToggleGroupControlOption
								label={ __( 'Paragraph', 'accordion-block' ) }
								value="paragraph"
							/>
							<ToggleGroupControlOption
								label={ __( 'Heading', 'accordion-block' ) }
								value="heading"
							/>
						</ToggleGroupControl>
					</PanelBody>
				</InspectorControls>
			</>
		)
	}

	// Block controls
	const blockControls = () => {
		return(	
			<BlockControls >
				{ headerElement === 'heading' && (
					<HeadingLevelDropdown
						selectedLevel={ headerHeadingLevel }
						onChange={ ( value ) => setAttributes( { headerHeadingLevel: value } ) }
					/>
				) }
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
			{ inspectorControls() }
			{ blockControls() }
			{ blockContent() }
		</>
	);
};