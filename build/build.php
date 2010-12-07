<?php
set_time_limit(60 * 5);
// Grab the minified version of all files
$files = array(
	array(
		"filename" =>"util.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"Exceptions.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"GeneralPath.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"external/deflate.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"AsyncFileReader.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"Rectangle2D.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"Faux2dContext.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSDocument.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSArray.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSDictionary.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSStream.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSString.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSName.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSObject.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSObjectKey.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSNumber.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSNull.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSBoolean.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSStreamArray.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSObjectReference.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"cos/COSObjectStreamLocation.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFObject.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDDocument.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDDocumentCatalog.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDPageNode.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDPage.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDStream.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDDocumentInformation.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/PDResources.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/FilterManager.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/FlateFilter.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/LzwFilter.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/ASCII85Filter.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/NoFilter.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/Predictor.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"filter/PNGPredictor.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"BaseParser.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFParser.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFStreamEngine.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFXrefStreamParser.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFObjectStreamParser.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFOperatorMap.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFOperator.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFStreamParser.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"PDFImage.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"AffineTransform.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/graphics/PDGraphicsState.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"pdmodel/text/PDTextState.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"colorspace/PatternSpace.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"colorspace/PDFColorSpace.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"colorspace/AlternateColorSpace.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"colorspace/IndexedColor.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"colorspace/ICC_ColorSpace.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PDFFontEncoding.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PDFFont.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/OutlineFont.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/TTFFont.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/TrueTypeFont.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PDFFontDescriptor.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/FontSupport.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/TrueTypeTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/CmapTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/HeadTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/MaxpTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/LocaTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/GlyfTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/HheaTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/HmtxTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PostTable.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/Glyf.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/GlyfSimple.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/CMap.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/CMapFormat0.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/CMapFormat4.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PDFGlyph.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/GlyfCompound.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PSParser.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/CIDFontType2.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/Type0Font.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/Type1Font.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/Type1CFont.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/Type3Font.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/BuiltInFont.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/BaseFontMap.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/AdobeGlyphList.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"font/PDFCMap.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"function/PDFFunction.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"function/FunctionType0.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"external/base64.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"StreamBuffer.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"Commander.js",
		"main" => true,
		"webWorker" => true
	),
	array(
		"filename" =>"FauxConsole.js",
		"main" => false,
		"webWorker" => true
	),
	array(
		"filename" =>"Image.js",
		"main" => false,
		"webWorker" => true
	),
	array(
		"filename" =>"external/jquerywebworker.js",
		"main" => false,
		"webWorker" => true
	),
	array(
		"filename" =>"FauxWorker.js",
		"main" => true,
		"webWorker" => false
	),
	array(
		"filename" =>"Trapeze.js",
		"main" => true,
		"webWorker" => false
	),
	array(
		"filename" =>"TrapezeWorker.js",
		"main" => true,
		"webWorker" => false
	)
);

// Build the min main
$outputDirectory = '/inetpub/trapeze_prod';
$minUrl = 'http://trapeze/min/?f=';
$mainFiles = array();
foreach($files as $file)
{
	if($file['main'])
		$mainFiles[] = $file['filename'];
}
$mainMinUrl = $minUrl.implode(',', $mainFiles);
$mainMinified = file_get_contents($mainMinUrl);
file_put_contents($outputDirectory.'/trapeze-main-min.js', $mainMinified);

$workerFiles = array();
foreach($files as $file)
{
	if($file['webWorker'])
		$workerFiles[] = $file['filename'];
}
$workerMinUrl = $minUrl.implode(',', $workerFiles);
$workerMinified = file_get_contents($workerMinUrl);
file_put_contents($outputDirectory.'/trapeze-worker-min.js', $workerMinified);
