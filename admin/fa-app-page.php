<?php
/*
 * Template Name: Force Alarm App Sistem
 * Description: Custom Page for Buying Process of Force Alarm
 */

$script_url = plugins_url( 'force-alarm-public.js', 'force-alarm/public/js/force-alarm-public.js' );
$style_url = plugins_url( 'force-alarm-public.css', 'force-alarm/public/css/force-alarm-public.css' );
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Force Alarm</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo $style_url; ?>">
    </head>
    <body>
        <div id="fd_app"></div>
    </body>
    <script src="<?php echo $script_url; ?>"></script>
</html>