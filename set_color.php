<html>
<head>
<title>Select Color</title>

<style TYPE="text/css">
    body   {margin-left:10; font-family:Verdana; font-size:92%; background:menu}
    button {width:5em}
    p      {text-align:center}
    table  {cursor:hand}
    input  {font-family:Verdana; font-size: 92%}
</style>

<script language=JavaScript >

    function assignColor(color){
        var SelColor = document.getElementById("SelColor");
        SelColor.value = color;
    }

    function selectColor(color){
        var RGB = document.getElementById("RGB");
        if(RGB.innerText){
            RGB.innerText = color;
        }else{
            RGB.textContent = color;
        }
    }

    function unSelectColor(){
        var RGB = document.getElementById("RGB");
        if(RGB.innerText){
            RGB.innerText = " ";
        }else{
            RGB.textContent = " ";
        }
    }

    function ok(){
        var SelColor = document.getElementById("SelColor");
        window.returnValue = SelColor.value;
        window.close();
    }

    function init(){
        var SelColor = document.getElementById("SelColor");
        SelColor.focus();
    }
</script>

</head>

<body onload="init()">
<br>
<?
// Assign acceptable color components in hex.
// This is the 216 color web-safe palette.
$arrColors = Array("00", "33", "66", "99", "CC", "FF");

// Note that the same array is used for all the colors since
// it's really just a mechanish to hold the hex values.

// You do this to save the processing time that would o/w
// result from doing this computation on each pass of the loop.
$iMinColor = 0;
$iMaxColor = count($arrColors);

// Table the colors for neat display
?>
<table id="ColorTable" border="1" bordercolor="silver" bordercolorlight="white" bordercolordark="black" cellspacing="0" cellpadding="0">
<?
// Loop through reds
for($iR = $iMinColor; $iR < $iMaxColor; $iR++){
    // Put in a row break so we can see the whole thing on one page
    echo "<tr>\n";
    // Loop through greens
    for($iG = $iMinColor; $iG < $iMaxColor; $iG++){
        // Loop through blues
        for($iB = $iMinColor; $iB < $iMaxColor; $iB++){
            // calculate the color and show it
            $strColor = "#".$arrColors[$iR].$arrColors[$iG].$arrColors[$iB];
            echo "<td bgcolor='".$strColor."' title='".$strColor."' onClick='assignColor(\"".$strColor."\")' onMouseOver='selectColor(\"".$strColor."\")' onMouseOut='unSelectColor()'>&nbsp;&nbsp;</td>";

        }
    } 
    echo "</tr>\n";
}
?>
</table>
<P>
<label FOR="SelColor">Color:</label>
<input type="text" size=20 id="SelColor">
<BR>
<span id="RGB">&nbsp;</span>

<P>
<button id="Ok" type="button" onClick="ok()">OK</button>
<button onClick="window.close();">Cancel</button>

</body>
</html>

