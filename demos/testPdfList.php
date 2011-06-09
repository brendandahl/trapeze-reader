<?php
	$pdfs = array(
		array(
			'status' => 'low',
			'filename' => 'Canon_ICC_Profile_Guide.pdf',
			'name' => 'Canon_ICC_Profile_Guide'
		),
		array(
			'status' => 'full',
			'filename' => 'clock.pdf',
			'name' => 'clock'
		),
		array(
			'status' => 'high',
			'filename' => 'cweb.pdf',
			'name' => 'cweb'
		),
		array(
			'status' => 'full',
			'filename' => 'demo.pdf',
			'name' => 'demo'
		),
		array(
			'status' => 'high',
			'filename' => 'drillSpeedChart.pdf',
			'name' => 'drillSpeedChart (LZW)'
		),
		array(
			'status' => 'full',
			'filename' => 'excel.pdf',
			'name' => 'excel'
		),
		array(
			'status' => 'full',
			'filename' => 'flower.pdf',
			'name' => 'flower'
		),
		array(
			'status' => 'low',
			'filename' => 'fw4.pdf',
			'name' => 'fw4'
		),
		array(
			'status' => 'full',
			'filename' => 'gettysburg.pdf',
			'name' => 'gettysburg'
		),
		array(
			'status' => 'medium',
			'notes' => 'low in chrome',
			'filename' => 'goodgraphs.pdf',
			'name' => 'goodgraphs'
		),
		array(
			'status' => 'full',
			'filename' => 'hello.pdf',
			'name' => 'Hello World'
		),
		array(
			'status' => 'full',
			'filename' => 'issue_21.pdf',
			'name' => 'issue_21'
		),
		array(
			'status' => 'full',
			'filename' => 'issue_26.pdf',
			'name' => 'issue_26'
		),
		array(
			'status' => 'high',
			'filename' => 'issue_63.pdf',
			'name' => 'issue_63'
		),
		array(
			'status' => 'high',
			'filename' => 'mmtofraction.pdf',
			'name' => 'mmtofraction'
		),
		array(
			'status' => 'high',
			'filename' => 'multipage.pdf',
			'name' => 'multipage'
		),
		array(
			'status' => 'full',
			'filename' => 'ollix_test_2005-03-11_bin.pdf',
			'name' => 'ollix_test_2005'
		),
		array(
			'status' => 'full',
			'filename' => 'pac.pdf',
			'name' => 'Pac Man'
		),
		array(
			'status' => 'high',
			'filename' => 'Ruby-Language-QuickRef.pdf',
			'name' => 'Ruby-Language-QuickRef'
		),
		array(
			'status' => 'full',
			'filename' => 'rotation.pdf',
			'name' => 'rotation'
		),
		array(
			'status' => 'full',
			'filename' => 'sample.pdf',
			'name' => 'sample'
		),
		array(
			'status' => 'high',
			'filename' => 'sampleForSpec.pdf',
			'name' => 'sampleForSpec'
		),
		array(
			'status' => 'full',
			'filename' => 'simple-openoffice.pdf',
			'name' => 'simple-openoffice'
		),
		array(
			'status' => 'full',
			'filename' => 'templateA4.pdf',
			'name' => 'templateA4'
		),
		array(
			'status' => 'high',
			'filename' => 'Test.pdf',
			'name' => 'Test'
		),
		array(
			'status' => 'high',
			'filename' => 'Type1CFont.pdf',
			'name' => 'Type1CFont'
		),
		array(
			'status' => 'high',
			'filename' => 'willians_wiedler.pdf',
			'name' => 'willians_wiedler'
		),
		array(
			'status' => 'high',
			'filename' => 'webinspect.pdf',
			'name' => 'Web Inspect'
		),
		array(
			'status' => 'low',
			'filename' => 'SF2032_Roth_IRA_DistReq.pdf',
			'name' => 'SF2032_Roth_IRA_DistReq.pdf'
		),
		array(
			'status' => 'high',
			'filename' => 'google analytics.pdf',
			'name' => 'google analytics'
		),
		array(
			'status' => 'high',
			'filename' => 'source.pdf',
			'name' => 'source'
		),
		array(
			'status' => 'medium',
			'filename' => 'survey.pdf',
			'name' => 'survey'
		),
		array(
			'status' => 'high',
			'filename' => 'f1040.pdf',
			'notes' => 'Seems to be missing the first page though',
			'name' => 'IRS 140'
		),
		array(
			'status' => null,
			'filename' => 'p90xFitTest.pdf',
			'name' => 'p90xFitTest'
		),
		array(
			'status' => 'medium',
			'filename' => 'BuileHill2011HolidayFunfairVouchers.pdf',
			'name' => 'Ticket 2'
		)
	);

	// Also add any missing ones in the sample folder
	$handle = opendir('samples');
	if($handle === false)
		throw new Exception("Could not open the input directory '$dir'");
	$files = array();
	while(false !== ($filename = readdir($handle)))
	{
		if($filename != "." && $filename != ".." && is_file('samples/'.$filename))
		{
			$found = false;
			foreach($pdfs as $pdf)
			{
				if($pdf['filename'] == $filename)
				{
					$found = true;
					break;
				}
			}
			if(!$found)
			{
				$pdfs[] = array('status' => null, 'filename' => $filename, 'name' => 'Unknown - '.$filename);
			}
		}
	}

	usort($pdfs, function($a, $b) {
		$a1 = strtolower($a['name']);
		$b1 = strtolower($b['name']);
		return strcmp($a1, $b1);
	});
?>
<strong>Test PDFs</strong>
<ul>
	<?php foreach($pdfs as $pdf): ?>
		<?php if(file_exists('samples/'.$pdf['filename'])): ?>
			<li>
				<span class="status <?=$pdf['status']?>">&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<a title="<?=isset($pdf['notes']) ? $pdf['notes'] : null?>" href="?file=<?=$pdf['filename']?>"><?=$pdf['name']?></a>
			</li>
		<?php endif; ?>
	<?php endforeach; ?>
</ul>