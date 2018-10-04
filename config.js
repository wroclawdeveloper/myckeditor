/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */
CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbarGroups = [
        { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'editing', groups: [ 'spellchecker', 'find', 'selection', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'document', groups: [ 'mode', 'doctools', 'document' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'about', groups: [ 'about' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },

        '/',
    ];

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Subscript,Superscript,About,Anchor,PasteFromWord,PasteText,Unlink,Strike,Scayt,Indent,Outdent,JustifyRight,JustifyBlock,SpecialChar';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';
    config.extraPlugins = 'imageuploader, pheadings';
    config.removePlugins = 'devtools, tableresizerowandcolumn';
    // Simplify the dialog windows.
    // config.removeDialogTabs = 'image:advanced;';
    config.fontSize_defaultLabel = '16px';
    config.format_tags = 'p;h2;h3;h5';
    config.div_wrapTable = true;
};


CKEDITOR.on( 'dialogDefinition', function( ev ) {
    // Take the dialog name and its definition from the event data.
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    // Check if the definition is from the dialog window you are interested in (the "Link" dialog window).
    if ( dialogName == 'image' ) {
        // Get a reference to the "Link Info" tab.
        var infoTab = dialogDefinition.getContents( 'info' );
        infoTab.remove( 'txtWidth' );
        infoTab.remove( 'txtHeight' );
        infoTab.remove( 'ratioLock' );
        infoTab.remove( 'txtBorder' );
        infoTab.remove( 'txtHSpace' );
        infoTab.remove( 'txtVSpace' );
        infoTab.remove( 'cmbAlign' );

        var advancedTab = dialogDefinition.getContents( 'advanced' );
        // Set the default value for the URL field.
        var txtGenClass = advancedTab.get( 'txtGenClass' );
        txtGenClass.type = 'select';
        txtGenClass.items = [ ['cke-image--left'], ['cke-image--right'], ['cke-image--center'], ['img-fluid'], [''] ];
        txtGenClass[ 'default' ] = 'cke-image--left';

        dialogDefinition.onOk = function (e) {
            var txtGenTitleVal = this.getContentElement('info', 'txtGenTitle').getValue();
            var txtAltVal = this.getContentElement('info', 'txtAlt').getValue();
            var cmbPhotoType = this.getContentElement('info', 'cmbPhotoType');
            var imageSrcUrl = e.sender.originalElement.$.src;
            // var width = e.sender.originalElement.$.width;
            // var height = e.sender.originalElement.$.height;

            switch (cmbPhotoType.getValue()) {
                case '1':
                    if(txtGenTitleVal == '') {
                        var imageStucture = '<table class="table-flex"><tbody><tr><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/></td></tr></tbody></table>';
                    } else {
                        var imageStucture = '<table class="table-flex"><tbody><tr><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td></tr></tbody></table>';
                    }
                    break;
                case '2':
                    if(txtGenTitleVal == '') {
                        var imageStucture = '<img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid cke-image--left"/>';
                    } else {
                        var imageStucture = '<div class="image-text-wrapper image-text-wrapper--left"><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid cke-image--left"/><p class="image-description">' + txtGenTitleVal + '</p><div class="clearfix-image"></div></div>';
                    }
                    break;
                case '3':
                    if(txtGenTitleVal == '') {
                        var imageStucture = '<img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid cke-image--right"/>';
                    } else {
                        var imageStucture = '<div class="image-text-wrapper image-text-wrapper--right"><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid cke-image--right"/><p class="image-description">' + txtGenTitleVal + '</p><div class="clearfix-image"></div></div>';
                    }
                    break;
                case '4':
                    if(txtGenTitleVal == '') {
                        var imageStucture = '<img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/>';
                    } else {
                        var imageStucture = '<div class="image-text-wrapper"><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/><p class="image-description">' + txtGenTitleVal + '</p><div class="clearfix-image"></div></div>';
                    }
                    break;
                case '5':
                    if(txtGenTitleVal == '') {
                        var imageStucture = '<table class="table-flex table-flex-left"><tbody><tr><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/></td></tr></tbody></table>';
                    } else {
                        var imageStucture = '<table class="table-flex table-flex-left"><tbody><tr><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td></tr></tbody></table>';
                    }
                    break;
                case '6':
                    if(txtGenTitleVal == '') {
                        var imageStucture = '<table class="table-flex"><tbody><tr><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/></td></tr></tbody></table>';
                    } else {
                        var imageStucture = '<table class="table-flex"><tbody><tr><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td><td><img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid" /><p class="image-description">' + txtGenTitleVal + '</p></td></tr></tbody></table>';
                    }
                    break;
                case '7':
                    var imageStucture = '<img src="' + imageSrcUrl + '" alt="' + txtAltVal + '" class="img-fluid"/>';
                    break;
                default:
                    var imageStucture = '<div><img src="' + imageSrcUrl + '" alt=""/></div>';
            }

            var imgHtml = CKEDITOR.dom.element.createFromHtml(imageStucture);
            editor.insertElement(imgHtml);
        };

        //Get info tab
        infoTab.add( {
            type: 'select',
            label: 'Rodzaj zdjęcia',
            id: 'cmbPhotoType',
            items: [ ['Dwa średnich obok siebie', '1'], ['Średnie lub małe z lewej strony', '2'], ['Średnie lub małe z prawej strony', '3'], ['Jedno duże', '4'], ['Dwa małych z lewej strony', '5'], ['Trzy małych', '6'], ['Samo zdjęcie', '7']],
            default: '2',
            onChange: function() {
                // var advancedTab = dialogDefinition.getContents( 'advanced' );
                // advancedTab.get( 'txtGenClass' )['default'] = 'cke-image--left';
            }
        });

        //move element from advanced to info tab
        var item = advancedTab.get('txtGenTitle');
        advancedTab.remove( 'txtGenTitle');
        // and now - more API friendly...
        infoTab.add( item );
        // ... or more hacky but better looking
        // var infoElements = infoTab.elements;
        // infoElements.splice( 2, 0, item );

    }

    if ( dialogName == 'table' ) {
        // Get a reference to the "Table Info" tab.
        var infoTab = dialogDefinition.getContents( 'info' );
        txtRows = infoTab.get( 'txtRows' )['default'] = '1';
        txtCols = infoTab.get( 'txtCols' )['default'] = '1';
        txtWidth = infoTab.get( 'txtWidth' )['default'] = '';
        txtCellSpace = infoTab.get( 'txtCellSpace' )['default'] = '2';
        txtCellPad = infoTab.get( 'txtCellPad' )['default'] = '0';
        txtBorder = infoTab.get( 'txtBorder' )['default'] = '0';

        var infoTab = dialogDefinition.getContents( 'advanced' );
        var advCSSClasses = infoTab.get( 'advCSSClasses' );

        advCSSClasses.type = 'select';
        advCSSClasses.items = [ ['tabela pełna szerokość', 'table-custom table-custom-full'], ['tabela połowa szerokości z lewej strony', 'table-custom table-custom-half-left'], ['tabela połowa szerokości z prawej strony', 'table-custom table-custom-half-right']];
        advCSSClasses[ 'default' ] = 'table-custom table-custom-half-left';

        // var oldImplementation = dialogDefinition.onOk;
        // dialogDefinition.onOk = function( e ) {
        //     oldImplementation.apply( this, [].slice.call( arguments ) );
        //     console.log( Object.getOwnPropertyNames(e.sender._.element.$) );
        // };

        // dialogDefinition.onOk = function (e) {
        //     var advCSSClassesVal = this.getContentElement('advanced', 'advCSSClasses').getValue();
        //     var tableSrcVal = e.sender._.editor.element.$.defaultValue;
        //     console.log(e.sender._.editor.element);
        //     if(advCSSClassesVal == 'table-custom table-custom-half-left') {
        //         var tableStucture = '<div>' + tableSrcVal + '</div>';
        //     } else {
        //         var tableStucture = tableSrcVal;
        //     }
        //     var imgHtml = CKEDITOR.dom.element.createFromHtml(tableStucture);
        //     editor.insertElement(imgHtml);
        // }
    }

    if ( dialogName == 'creatediv' ) {
        var infoTab = dialogDefinition.getContents( 'info' );
        txtWidth = infoTab.get( 'class' )['default'] = 'table-responsive';
    }

    if ( dialogName == 'link' ) {
        var infoTab = dialogDefinition.getContents( 'advanced' );
        var advCSSClasses = infoTab.get( 'advCSSClasses' );

        advCSSClasses.type = 'select';
        advCSSClasses.items = [ ['article-link'], ['article-link article-link--animation'], ['article-link article-link--consulting'], ['article-link article-link--marketing'], ['article-link article-link--graphic'], ['article-link article-link--visualization'], ['article-link article-link--site']];
        advCSSClasses[ 'default' ] = 'article-link';
        // dialogDefinition.onOk = function() {}
    }
});

CKEDITOR.env.isCompatible = true;

CKEDITOR.addCss('div{background:#eee;}table{width: 100%;}.image-description {\n' +
    '    font-size: 14px;\n' +
    '    font-style: italic;\n' +
    '    text-align: right;\n' +
    '    margin-top: 5px;\n' +
    '}');
