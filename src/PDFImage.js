goog.provide("trapeze.PDFImage");
goog.require("trapeze.colorspace.ColorSpaceManager");
goog.require("trapeze.colorspace.IndexedColor");
goog.require("trapeze.colorspace.Color");
goog.require("trapeze.StreamBuffer");
trapeze.PDFImage = function() {
	this.width;
	this.height;
	this.bpc;
	this.colorSpace;
};
trapeze.PDFImage.prototype.getImageString = function() {
	// creates a base64 encoded string containing BMP data
	// takes an imagedata object as argument
	// http://www.nihilogic.dk/labs/canvas2image/canvas2image.js
	var oData = this.imageData;
	var aHeader = [];

	var iWidth = oData.width;
	var iHeight = oData.height;

	aHeader.push(0x42); // magic 1
	aHeader.push(0x4D);

	var iFileSize = iWidth*iHeight*3 + 54; // total header size = 54 bytes
	aHeader.push(iFileSize % 256);iFileSize = Math.floor(iFileSize / 256);
	aHeader.push(iFileSize % 256);iFileSize = Math.floor(iFileSize / 256);
	aHeader.push(iFileSize % 256);iFileSize = Math.floor(iFileSize / 256);
	aHeader.push(iFileSize % 256);

	aHeader.push(0); // reserved
	aHeader.push(0);
	aHeader.push(0); // reserved
	aHeader.push(0);

	aHeader.push(54); // dataoffset
	aHeader.push(0);
	aHeader.push(0);
	aHeader.push(0);

	var aInfoHeader = [];
	aInfoHeader.push(40); // info header size
	aInfoHeader.push(0);
	aInfoHeader.push(0);
	aInfoHeader.push(0);

	var iImageWidth = iWidth;
	aInfoHeader.push(iImageWidth % 256);iImageWidth = Math.floor(iImageWidth / 256);
	aInfoHeader.push(iImageWidth % 256);iImageWidth = Math.floor(iImageWidth / 256);
	aInfoHeader.push(iImageWidth % 256);iImageWidth = Math.floor(iImageWidth / 256);
	aInfoHeader.push(iImageWidth % 256);

	var iImageHeight = iHeight;
	aInfoHeader.push(iImageHeight % 256);iImageHeight = Math.floor(iImageHeight / 256);
	aInfoHeader.push(iImageHeight % 256);iImageHeight = Math.floor(iImageHeight / 256);
	aInfoHeader.push(iImageHeight % 256);iImageHeight = Math.floor(iImageHeight / 256);
	aInfoHeader.push(iImageHeight % 256);

	aInfoHeader.push(1); // num of planes
	aInfoHeader.push(0);

	aInfoHeader.push(24); // num of bits per pixel
	aInfoHeader.push(0);

	aInfoHeader.push(0); // compression = none
	aInfoHeader.push(0);
	aInfoHeader.push(0);
	aInfoHeader.push(0);

	var iDataSize = iWidth*iHeight*3;
	aInfoHeader.push(iDataSize % 256);iDataSize = Math.floor(iDataSize / 256);
	aInfoHeader.push(iDataSize % 256);iDataSize = Math.floor(iDataSize / 256);
	aInfoHeader.push(iDataSize % 256);iDataSize = Math.floor(iDataSize / 256);
	aInfoHeader.push(iDataSize % 256);

	for (var i=0;i<16;i++) {
		aInfoHeader.push(0);	// these bytes not used
	}

	var iPadding = (4 - ((iWidth * 3) % 4)) % 4;

	var aImgData = oData.data;

	var strPixelData = "";
	var y = iHeight;
	do {
		var iOffsetY = iWidth*(y-1)*4;
		var strPixelRow = "";
		for (var x=0;x<iWidth;x++) {
			var iOffsetX = 4*x;

			strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+2]);
			strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+1]);
			strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX]);
		}
		for (var c=0;c<iPadding;c++) {
			strPixelRow += String.fromCharCode(0);
		}
		strPixelData += strPixelRow;
	} while (--y);

	var encodeData = function(data) {
		var strData = "";
		if (typeof data == "string") {
			strData = data;
		} else {
			var aData = data;
			for (var i=0;i<aData.length;i++) {
				strData += String.fromCharCode(aData[i]);
			}
		}
		return base64.encode(strData);
	}

	var strEncoded =  encodeData(aHeader.concat(aInfoHeader)) + encodeData(strPixelData);
	return "data:" + 'image/bmp' + ";base64," + strEncoded;
	//return strEncoded;
};
trapeze.PDFImage.create = function(obj, resources, context) {
	var image = new trapeze.PDFImage();
	var dictionary = obj.dictionary;
	 // get the width (required)
	var widthObj = dictionary.getDictionaryObject("Width");
	if (widthObj == null) {
		throw new ParseException("Unable to read image width: " + obj);
	}
	image.width = widthObj.value;

	// get the height (required)
	var heightObj = dictionary.getDictionaryObject("Height");
	if (heightObj == null) {
		throw new ParseException("Unable to get image height: " + obj);
	}
	image.height = heightObj.value;
	
	// TODO
	// figure out if we are an image mask (optional)
	//PDFObject imageMaskObj = obj.getDictRef("ImageMask");
	//if (imageMaskObj != null) {
	//	image.setImageMask(imageMaskObj.getBooleanValue());
	//}
	// read the bpc and colorspace (required except for masks) 
	/*if (image.isImageMask()) {
		image.setBitsPerComponent(1);

		// create the indexed color space for the mask
		// [PATCHED by michal.busta@gmail.com] - default value od Decode according to PDF spec. is [0, 1]
		// so the color arry should be:  
		Color[] colors = {Color.BLACK, trapeze.colorspace.Color.WHITE};
		
		PDFObject imageMaskDecode = obj.getDictRef("Decode");
		if (imageMaskDecode != null) {
			PDFObject[] array = imageMaskDecode.getArray();
			float decode0 = array[0].getFloatValue();
			if (decode0 == 1.0f) {
				colors = new Color[]{Color.WHITE, trapeze.colorspace.Color.BLACK};
			}
		}
		image.setColorSpace(new trapeze.colorspace.IndexedColor(colors));
	} else {*/
		// get the bits per component (required)
		var bpcObj = dictionary.getDictionaryObject("BitsPerComponent");
		if (bpcObj == null) {
			throw new ParseException("Unable to get bits per component: " + obj);
		}
		image.bpc = bpcObj.value;
		
		// get the color space (required)
		var csObj = dictionary.getDictionaryObject("ColorSpace");
		if (csObj == null) {
			throw new ParseException("No ColorSpace for image: " + obj);
		}
		var cs = trapeze.colorspace.ColorSpaceManager.getColorSpace(csObj, resources);
		image.colorSpace = cs;
	//}	
	
	var imageData = context.createImageData(image.width, image.height);
	var pix = imageData.data;
	var data = new trapeze.StreamBuffer(obj.decode());
	function ChunkReader(buffer) {
		
		this.bytestream = buffer;
		this.offset = 0;

		this.readBit = function()
		{
			var b = this.bytestream.getByteAt(this.offset>>>3);
			var tmp = b >> (this.offset & 7);
			this.offset++;
			return tmp&1;
		}

		this.read = function(numBits)
		{
			// Read LSB -> MSB
			var val = 0;
			for(var i = 0; i < numBits; ++i)
				val |= this.readBit() << i;

			return val;
		}
	}
	data = new ChunkReader(data);
	var numComponents = image.colorSpace.getNumComponents();
	
	var n = pix.length;
	for (var i = 0; i < n; i += 4) {
		var components = new Array(numComponents);
		for(var j = 0; j < numComponents; j++) {
			if(cs instanceof trapeze.colorspace.IndexedColor)
				components[j] = data.read(image.bpc);
			else
				components[j] = data.read(image.bpc) / 255;
		}
		var rgb = image.colorSpace.toRGB(components);
		pix[i] = rgb[0];
		pix[i + 1] = rgb[1];
		pix[i + 2] = rgb[2];
		pix[i + 3] = 255;
	}
	image.imageData = imageData;
	return image;
	//context.putImageData(imageData, 0,0);
};