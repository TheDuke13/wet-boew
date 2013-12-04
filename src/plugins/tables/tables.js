/**
 * @title WET-BOEW Tables
 * @overview Integrates the DataTables plugin into WET providing searching, sorting, filtering, pagination and other advanced features for tables.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @jeresiv
 */
(function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var selector = ".wb-tables",
	$document = wb.doc,
	i18n, i18nText, defaults,

	/**
	 * Init runs once per plugin element on the page. There may be multiple elements.
	 * It will run more than once per plugin if you don't remove the selector from the timer.
	 * @method init
	 * @param {jQuery Event} event `timerpoke.wb` event that triggered the function call
	 */
	init = function( event ) {
		var elm = event.target,
			$elm;

		// Filter out any events triggered by descendants
		if ( event.currentTarget === elm ) {
			$elm = $( elm );

			// All plugins need to remove their reference from the timer in the init sequence unless they have a requirement to be poked every 0.5 seconds
			wb.remove( selector );

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					oAria: {
						sSortAscending: i18n( "sortAsc" ),
						sSortDescending: i18n( "sortDesc" )
					},
					oPaginate: {
						sFirst: i18n( "first" ),
						sLast: i18n( "last" ),
						sNext: i18n( "nxt" ),
						sPrevious: i18n( "prv" )
					},
					sEmptyTable: i18n( "emptyTbl" ),
					sInfo: i18n( "infoEntr" ),
					sInfoEmpty: i18n( "infoEmpty" ),
					sInfoFiltered: i18n( "infoFilt" ),
					sInfoThousands: i18n( "info1000" ),
					sLengthMenu: i18n( "lenMenu" ),
					sLoadingRecords: i18n( "load" ),
					sProcessing: i18n( "process" ),
					sSearch: i18n( "srch" ),
					sZeroRecords: i18n( "infoEmpty" )
				};
			}

			defaults = {
				asStripeClasses: [],
				oLanguage: i18nText,
				fnDrawCallback: function() {

					if ( $elm.data( "inviewstate" ) === "partial" ){
						$( "html, body" ).scrollTop( $elm.prev().offset().top );
					}

					$elm.trigger( "tables-draw.wb" );
				}
			};

			Modernizr.load({
				load: [ "site!deps/jquery.dataTables" + wb.getMode() + ".js" ],
				complete: function() {
					$elm.dataTable( $.extend( true, defaults, wb.getData( $elm, "wet-boew" ) ) );
				}
			});
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb init.wb-tables", selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

})( jQuery, window, wb );
