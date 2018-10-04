CKEDITOR.plugins.add( 'pheadings', {
    icons: 'pheadingh2',
    init: function( editor ) {
        editor.addCommand( 'insertPHeadingH2', {
            exec: function( editor ) {
                editor.insertHtml( '<p>&nbsp;</p>' );
            }
        });
    }
});