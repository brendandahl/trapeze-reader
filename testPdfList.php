<?php
	$pdfs = array(
		array(
			'status' => 'high',
			'filename' => 'hello.pdf',
			'name' => 'Hello World'
		)
	);
	usort($pdfs, function($a, $b) {
		$a1 = strtolower($a['name']);
		$b1 = strtolower($b['name']);
		return strcmp($a1, $b1);
	});
?>
<strong>Test PDFs</strong>
<ul>
	<?php foreach($pdfs as $pdf): ?>
		<li>
			<span class="status <?=$pdf['status']?>">&nbsp;&nbsp;&nbsp;&nbsp;</span>
			<a title="<?=isset($pdf['notes']) ? $pdf['notes'] : null?>" href="?file=<?=$pdf['filename']?>"><?=$pdf['name']?></a>
		</li>
	<?php endforeach; ?>
</ul>