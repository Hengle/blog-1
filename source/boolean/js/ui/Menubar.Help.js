Menubar.Help = function ( signals ) {

	var container = new UI.Panel();
	container.setClass( 'menu' );
	container.onMouseOver( function () { options.setDisplay( 'block' ) } );
	container.onMouseOut( function () { options.setDisplay( 'none' ) } );
	container.onClick( function () { options.setDisplay( 'block' ) } );

	var title = new UI.Panel();
	title.setTextContent( 'Help' ).setColor( '#666' );
	title.setMargin( '0px' );
	title.setPadding( '8px' );
	container.add( title );

	//

	var options = new UI.Panel();
	options.setClass( 'options' );
	options.setDisplay( 'none' );
	container.add( options );
	/*
	// source code

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Source code' );
	option.onClick( function () { window.open( 'https://github.com/mrdoob/three.js/tree/master/editor', '_blank' ) } );
	options.add( option );
	*/

	// about

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'About Project' );
	option.onClick( function () { alert("Author: Kanglai Qian, Hongze Zhao, Xianyu Chen"); } );
	options.add( option );

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'About Editor' );
	option.onClick( function () { window.open( 'http://threejs.org', '_blank' ) } );
	options.add( option );

	//

	return container;

}
