<%Option Explicit%>
<html>
<head>
<title>Select Local Image</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="global.css" type="text/css">
<SCRIPT LANGUAGE=JavaScript FOR=ImageList EVENT=onclick>
<!--
window.returnValue = "images/" + event.srcElement.title;
window.close();
// -->
</SCRIPT>
</head>

<body bgcolor="#FFFFFF" text="#000000">
<div align="center" class="body">
<p><b>Simply click on an image to copy it to the IFrame</b></p>
<p><font color="#ff0000"><b>Make sure you have clicked in the IFrame before inserting an image, otherwise nothing will happen.</b></font></p>
<table border="1" cellpadding="2" cellspacing="0" id="ImageList">
<%
Dim objFSO
Dim objFolder
Dim objFile

Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
Set objFolder = objFSO.GetFolder(Server.MapPath("images"))
For Each objFile in objFolder.Files
%>
<tr>
<td><a href="#">
<img src="<%="images/" & objFile.Name%>" title="<%=objFile.Name%>" border="0"></a></td>
</tr>
<%
Next
Set objFolder = Nothing
Set objFSO = Nothing
%>
</table>
</div>
<p>&nbsp;</p>
</body>
</html>

