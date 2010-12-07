<?php
ob_end_flush(); // Turn off all the output buffers
ob_implicit_flush(true); // Auto flush on output
set_time_limit(60 * 1);

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
//header('Content-type: application/pdf');

$opts = array(
	'http' => array(
		'method'=>"GET",
		'header'=>"Accept-language: en\r\n"
	)
);
$context = stream_context_create($opts);

$data = file_get_contents('http://www.adobe.com/content/dam/Adobe/en/devnet/pdf/pdfs/adobe_supplement_iso32000_1.pdf', false, $context);
$len = strlen($data);
header("Content-Length: $len");
echo $data;
/*$index = 0;
$chunk = 20000;
while($index < $len) {
	echo substr($data, $index, $chunk);
	$index += $chunk;
	sleep(1);
}
//echo $data;*/