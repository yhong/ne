window.MyApp = {}; 
var isHTMLMode=false
var idContent = null;
var IMG_16_ICO_URL = "http://img.nayuda.com/library/ico/16x16/";
var EDITOR_HOME = "/editor";

var styleList = [
        { value: "<body>",   text:"Normal" },
        { value: "<h1>",     text:"Heading 1" },
        { value: "<h2>",     text:"Heading 2" },
        { value: "<h3>",     text:"Heading 3" },
        { value: "<h4>",     text:"Heading 4" },
        { value: "<h5>",     text:"Heading 5" },
        { value: "<menu>",   text:"Directory List" },
        { value: "<pre>",    text:"Formatted" },
        { value: "<address>",text:"Address" }
];

var fontList = [
        { value: "Arial",           text:"Arial" },
        { value: "Arial Black",     text:"Arial Black" },
        { value: "Arial Narrow",    text:"Arial Narrow" },
        { value: "Comic Sans MS",   text:"Comic Sans MS" },
        { value: "Courier New",     text:"Courier New" },
        { value: "System",          text:"System" },
        { value: "Tahoma",          text:"Tahoma" },
        { value: "Times New Roman", text:"Times New Roman" },
        { value: "Verdana",         text:"Verdana" },
        { value: "Wingdings",       text:"Wingdings" }
];

function getButton(img, js_func, title){
    return '<img style="margin:0px;" hspace="0" vspace="0" align=absmiddle src="' + IMG_16_ICO_URL + '/' + img + '" alt="' + title + '" onClick="' + js_func + '" onmouseover="button_over(this);" onmouseout="button_out(this);" onmousedown="button_down(this);" onmouseup="button_up(this);">';
}

function start_editor(params){
    document.getElementById(params.id).style.display = "none";
    if(!params.width){
        params.width = "600";
    }

    document.write('<table border="0" cellpadding="1" cellspacing="0">');
    document.write('   <tr>');
    document.write('       <td bgcolor="#efefef">');

    document.write('        <table border="0" cellpadding="0" cellspacing="0">');

    if(!params.toolbar || params.toolbar == "true"){
        document.write('    <tr id="toolbar">');
        document.write('       <td align="top" bgcolor="#cfcdde">');
        document.write('           <table border="0" cellpadding="0" cellspacing="0">');
        document.write('               <tr>');
        document.write('                  <td style="padding-left:7px;">');
        document.write('                    <select onchange="SetParagraph(this[this.selectedIndex].value);this.selectedIndex=0">');
        document.write('                      <option selected>Style</option>');
                                                for(var i=0; i< styleList.length; i++){
                                                    document.write('<option value="' + styleList[i].value + '">' + styleList[i].text + '</option>');
                                                }
        document.write('                    </select>');
        document.write('                    <select onchange="cmdExec(\'fontname\',this[this.selectedIndex].value);">');
        document.write('                        <option selected>Font</option>');
                                                for(var i=0; i< fontList.length; i++){
                                                    document.write('<option value="' + fontList[i].value + '">' + fontList[i].text + '</option>');
                                                }
        document.write('                    </select>');
        document.write('                    <select onchange="cmdExec(\'fontsize\', this[this.selectedIndex].value);">');
        document.write('                        <option selected>Size</option>');
                                                for(var i=1; i< 14; i++){
                                                    document.write('<option value="' + i + '">' + i + '</option>');
                                                }
        document.write('                    </select>');
        document.write('               </td>');
        document.write('               <td nowrap style="height:22px; padding:0 7px 0 7px;">');
        document.write(                     getButton("actions/insert-image-2.ico", "uploadImages()", "Upload Images"));
        /*
        document.write(                     getButton("actions/insert-image-inline.ico", "insertImageLocal()", "Insert Local Image"));
        */
        document.write(                     getButton("actions/insert-image-link.ico", "insertImageLink()", "Insert Link to External Image"));
        document.write(                     getButton("actions/insert-link.ico", "cmdExec('createLink')", "Insert L Image"));
        document.write('               </td>');
        document.write('            </tr>');
        document.write('           </table>');

        document.write('           <table border="0" cellpadding="0" cellspacing="0" ID="Table1">');
        document.write('           <tr>');
        document.write('              <td nowrap style="height:22px; padding:0 0px 0 7px;">');
        document.write(                     getButton("actions/view-preview.ico", "doPreview()", "Page Preview"));
        document.write('             </td>');

        document.write('              <td style="height:22px; padding:0 7px 0 7px;">|</td>');

        document.write('              <td nowrap style="height:22px;">');
       /* 
        document.write(                     getButton("actions/edit-cut-2.ico", "cmdExec('cut')", "Cut"));
        document.write(                     getButton("actions/edit-copy-7.ico", "cmdExec('copy')", "Copy"));
        document.write(                     getButton("actions/edit-paste-2.ico", "cmdExec('paste')", "Paste"));
       */ 
        document.write(                     getButton("actions/edit-undo-7.ico", "cmdExec('undo')", "Undo"));
        document.write(                     getButton("actions/edit-redo-7.ico", "cmdExec('redo')", "Redo"));
        document.write('             </td>');

        document.write('               <td style="height:22px; padding:0 7px 0 7px;">|</td>');
        document.write('               <td nowrap style="height:22px;">');
        document.write(                     getButton("actions/format-text-bold-5.ico", "cmdExec('bold')", "Bold"));
        document.write(                     getButton("actions/format-text-underline-5.ico", "cmdExec('underline')", "Underline"));
        document.write(                     getButton("actions/format-text-italic-5.ico", "cmdExec('italic')", "Italic"));
        document.write(                     getButton("actions/format-text-strikethrough-4.ico", "cmdExec('strikethrough')", "Strike-Through"));
        document.write(                     getButton("actions/format-text-sup.ico", "cmdExec('superscript')", "Super-Script"));
        document.write(                     getButton("actions/format-text-sub.ico", "cmdExec('subscript')", "Sub-Script"));
        document.write('               </td>');

        document.write('               <td style="height:22px; padding:0 7px 0 7px;">|</td>');

        document.write('               <td nowrap style="height:22px;">');
        document.write(                     getButton("actions/format-justify-left-4.ico", "cmdExec('justifyleft')", "Justfy-Left"));
        document.write(                     getButton("actions/format-justify-center-4.ico", "cmdExec('justifycenter')", "Justfy-Center"));
        document.write(                     getButton("actions/format-justify-right-4.ico", "cmdExec('justifyright')", "Justfy-Right"));
        document.write('               </td>');

        document.write('               <td style="height:22px; padding:0 7px 0 7px;">|</td>');

        document.write('               <td nowrap style="height:22px;">');
        document.write(                 getButton("actions/format-list-ordered.ico", "cmdExec('insertorderedlist')", "Ordered List"));
        document.write(                 getButton("actions/format-list-unordered.ico", "cmdExec('insertunorderedlist')", "Unordered List"));
        document.write(                 getButton("actions/text-indent.ico", "cmdExec('indent')", "Increase Indent"));
        document.write(                 getButton("actions/text-indent-remove.ico", "cmdExec('outdent')", "Decrease Indent"));
        document.write('               </td>');

        document.write('               <td style="height:22px; padding:0 7px 0 7px;">|</td>');

        document.write('               <td nowrap style="height:22px; padding:0 7px 0 0px;">');
        document.write(                  getButton("actions/insert-horizontal-rule.ico", "cmdExec('inserthorizontalrule')", "Insert Horizontal Rule"));
        document.write(                  getButton("actions/color-swatch.ico", "foreColor()", "Forecolor"));
        document.write(                  getButton("actions/insert-table.ico", "tableDialog()", "Insert Table"));
        document.write('               </td>');
        document.write('          </tr>');
        document.write('          </table>');

        document.write('        </td>');
        document.write('    </tr>');
    }

    document.write('       <tr>');
    document.write('          <td bgcolor="#ffffff"><iframe width="' + params.width + '" id="idContent" height="280" border="0"></iframe></td>');
    document.write('       </tr>');
    document.write('       <tr>');
    document.write('           <td bgcolor="#ffffff" align="right">');
    document.write('              <table border="0" cellpadding="0" cellspacing="0" align="left">');
    document.write('             <tr>');
    document.write('                 <td style="font-size:12px;"><input type="checkbox" onclick="setMode(this.checked)"> Edit HTML');
    //document.write('                   <input name="_CONTENT_" type="hidden" value="">');
    document.write('                 </td>');
    document.write('               </tr>');
    document.write('             </table>');
    //document.write('             <input type="button" name="Submit" value="Save and Submit" onclick="SubmitContent(\'' + params.id + '\');">');
    document.write('          </td>');
    document.write('       </tr>');
    document.write('       </table>');
    document.write('    </td>');
    document.write(' </tr>');
    document.write(' </table>');

    var obj = document.getElementById("idContent");
    obj.contentDocument.open("text/html");
    obj.contentDocument.write(document.getElementById(params.id).value);
    obj.contentDocument.close();
}


function button_over(eButton)   {
    eButton.style.backgroundColor = "#B5BDD6";
    eButton.style.borderColor = "darkblue darkblue darkblue darkblue";
    eButton.style.borderWidth = '1px';
    eButton.style.borderStyle = 'solid'; 
}

function button_out(eButton) {
    eButton.style.backgroundColor = "#cfcdde";
    eButton.style.borderColor = "#cfcdde";
}

function button_down(eButton) {
    eButton.style.backgroundColor = "#8494B5";
    eButton.style.borderColor = "darkblue darkblue darkblue darkblue";
}

function button_up(eButton) {
    eButton.style.backgroundColor = "#B5BDD6";
    eButton.style.borderColor = "darkblue darkblue darkblue darkblue";
    eButton = null; 
}


function cmdExec(cmd,opt) {
    if (isHTMLMode) {
    alert("Please uncheck 'Edit HTML'");
        return;
    }
    idContent.document.execCommand(cmd,"",opt);
    idContent.focus();
}

function setMode(bMode) {
    var sTmp;
    isHTMLMode = bMode;
    if (isHTMLMode) {
        sTmp=idContent.document.body.innerHTML;
        if(document.all){
            idContent.document.body.innerText=sTmp;
        }else{
            idContent.document.body.textContent=sTmp;
        }
        document.getElementById("toolbar").style.display = 'none';
    } else {
        if(document.all){
            sTmp=idContent.document.body.innerText;
        }else{
            sTmp=idContent.document.body.textContent;
        }
        idContent.document.body.innerHTML=sTmp;
        document.getElementById("toolbar").style.display = 'inline';
    }
    idContent.focus();
}

function createLink() {
    if (isHTMLMode) {
        alert("Please uncheck 'Edit HTML'");
        return;
    }
    cmdExec("CreateLink");
}

function insertImageLink() {
    if (isHTMLMode) {
        alert("Please uncheck 'Edit HTML'");
        return;
    }
    var sImgSrc=prompt("Insert Image File (You can use your local image file) : ", "http://");
    if(sImgSrc!=null) cmdExec("InsertImage",sImgSrc);
}

function insertImageLocal() {
    if (isHTMLMode) {
        alert("Please uncheck 'Edit HTML'");
        return;
    }
    var sImgSrc = showModalDialog(EDITOR_HOME + "/select_image.php","","dialogHeight: 500px; dialogWidth: 400px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
    if(sImgSrc!=null) cmdExec("InsertImage",sImgSrc);
}

function uploadImages() {
        var newWindow;
        var props = 'scrollBars=yes,resizable=yes,toolbar=no,menubar=no,location=no,directories=no,width=500,height=180,top=100,left=200';
        newWindow = window.open(EDITOR_HOME + '/upload.php', 'Upload_Images_to_server', props);
}

function SubmitContent(id) {
        if (isHTMLMode) {
            alert("Please uncheck 'Edit HTML'");
            return (false);
        }

        //document.editor._CONTENT_.value = idContent.document.body.innerHTML;
        document.getElementById(id).value = idContent.document.body.innerHTML;
        //document.editor.submit();
}


function getEditorContent() {
        return idContent.document.body.innerHTML;
}

function foreColor()    {
        var arr = showModalDialog(EDITOR_HOME + "/set_color.php","","font-family:Verdana; font-size:12; resizable:no; dialogWidth:500px; dialogHeight:280px;" );
        if (arr != null) cmdExec("ForeColor",arr);  
}

var rtNumRows = null;
var rtNumCols = null;
var rtTblAlign = null;
var rtTblWidth = null;

function tableDialog()
{
    //----- Creates A Table Dialog And Passes Values To createTable() -----
    showModalDialog(EDITOR_HOME + "/table.htm", window, "status:false;dialogWidth:240px;dialogHeight:150px;");
}

function createTable()
{
    //----- Creates User Defined Tables -----
    //var cursor = idContent.document.selection.createRange();
    var cursor = null;
    if(document.all){
        cursor = idContent.document.selection.createRange();
    }

    if (rtNumRows == "" || rtNumRows == "0")
    {
        rtNumRows = "1";
    }
    if (rtNumCols == "" || rtNumCols == "0")
    {
        rtNumCols = "1";
    }
    var rttrnum=1
    var rttdnum=1
    var rtNewTable = "<table border='1' align='" + rtTblAlign + "' cellpadding='0' cellspacing='0' width='" + rtTblWidth + "'>";

    while (rttrnum <= rtNumRows)
    {
        rttrnum=rttrnum+1;
        rtNewTable = rtNewTable + "<tr>";
        while (rttdnum <= rtNumCols){
            rtNewTable = rtNewTable + "<td>&nbsp;</td>";
            rttdnum=rttdnum+1;
        }
        rttdnum=1;
        rtNewTable = rtNewTable + "</tr>";
    }
    rtNewTable = rtNewTable + "</table>";
    idContent.focus();

    if(document.all){
        cursor.pasteHTML(rtNewTable);
    }else{
        idContent.document.execCommand("insertHTML", false, rtNewTable);
    }
}

function doPreview(){
    temp = idContent.document.body.innerHTML;
    preWindow= open('', 'previewWindow', 'width=500,height=440,status=yes,scrollbars=yes,resizable=yes,toolbar=no,menubar=yes');
    preWindow.document.open();
    preWindow.document.write(temp);
    preWindow.document.close();
}

function SetParagraph(value) {
    idContent.focus();
    if (value == '<body>')
    {
        idContent.document.execCommand('formatBlock','','Normal');
        idContent.document.execCommand('removeFormat');
        return;
    }
        idContent.document.execCommand('formatblock','',value);
}

document.onreadystatechange = function() {
    var obj = document.getElementById("idContent");
    if(obj){
        idContent = obj.contentWindow;
        idContent.document.designMode = "On";
        idContent.focus();
    }
}
