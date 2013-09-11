<?php
include "config.php";
$uploaddir = EDITOR_ROOT.'/files';
$uploadfile = $uploaddir.basename($_FILES['userfile']['name']);

if (!move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)):
    die("error!");
else:
?>
<script>
    cmdExec("InsertImage", "/editor/files/".<?php echo $_FILES["name"]?>);
</script>
<? endif;?>

