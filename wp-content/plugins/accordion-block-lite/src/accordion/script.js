window.addEventListener( 'load', function() {

	// Accordion buttons
	const accordionButtons = document.querySelectorAll( '.wp-block-tt-accordion-item-header-button' );

	accordionButtons.forEach( button => {
		button.setAttribute( 'aria-expanded', false );

	  	const expanded = button.getAttribute( 'aria-expanded' );
		const number = button.getAttribute( 'id' ).replace( 'wp-block-tt-accordion-item-header-button-', '' );
		const associatedPanel = document.getElementById( `wp-block-tt-accordion-item-panel-${number}` );

		button.setAttribute( 'aria-controls', `wp-block-tt-accordion-item-panel-${number}` );
		associatedPanel.setAttribute( 'aria-labelledby', `wp-block-tt-accordion-item-header-button-${number}` );

		// Button click
		button.addEventListener( 'click', () => {
			button.classList.toggle( 'expanded' );
			associatedPanel.classList.toggle( 'open' );
			if( button.classList.contains( 'expanded' ) ) {
				button.setAttribute( 'aria-expanded', true );
				associatedPanel.removeAttribute( 'hidden' );
			} else {
				button.setAttribute( 'aria-expanded', false );
				associatedPanel.setAttribute( 'hidden', '' );
			}
		} )
	} )

	// Accordion panels
	const accordionPanels = document.querySelectorAll( '.wp-block-tt-accordion-item-panel' );

	accordionPanels.forEach( panel => {
		panel.setAttribute( 'hidden', '' );
		panel.classList.remove( 'open' );
	} )

} );
