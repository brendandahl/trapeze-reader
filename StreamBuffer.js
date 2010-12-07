/**
 * // TODO rename this class its not really a stream buffer anymore
 * This is loosely based off of java's ByteBuffer class.  Allows
 * you to read various binary data formats from a string.
 *
 */
function StreamBuffer(streamText, bigEndian, start, length) {
	var bigEndian = bigEndian || true;
	/* Position is relative, its not always where the char is
	 * the real position = position + offset
	 */
	var position = 0;
	var limit = length || streamText.length;
	var buffer = streamText;
	var offset = start || 0;

	/**
	 * Returns this buffer's limit. 
	 * @return int buffer's limit
	 */
	this.getLimit = function() {
		return limit;
	};
	/**
	 * Returns this buffer's position.
	 *
	 * @return int The position of this buffer
	 */
	this.getPosition = function() {
		return position;
	};
	/**
	 * Set this buffer's position.
	 *
	 * @param newPosition The new position value; must be non-negative and no larger than the current limit 
	 * @return int The position of this buffer
	 */
	this.setPosition = function(newPosition) {
		if(newPosition < 0 || newPosition > limit)
			console.warn("New stream posistion is invalid.");//throw Exception(_exception.EOFReached);
		position = newPosition;
		return position;
	};
	/**
	 * Returns the number of elements between the current position and the limit. 
	 * @return int The number of elements remaining in this buffer
	 */
	this.remaining = function() {
		return limit - position;
	};
	/**
     * Tells whether there are any elements between the current position and
     * the limit. </p>
     *
     * @return  <tt>true</tt> if, and only if, there is at least one element
     *          remaining in this buffer
     */
	this.hasRemaining = function() {
        return position < limit;
    };
	/**
	 * Read an abirtrary byte length number.
	 * ONLY SUPPORTS LITTLE ENDIAN
	 *
	 */
	this.readNumber = function(iNumBytes, iFrom){
		iNumBytes = iNumBytes || 1;
		iFrom = iFrom || position;

		this.setPosition(iFrom + iNumBytes);

		var result = 0;
		for(var i=iFrom + iNumBytes; i>iFrom; i--){
			result = result * 256 + this.getByteAt(i-1);
		}

		return result;
	};
	/**
	 * Creates a new StreamBuffer from this stream.
	 * It will not create a new string with the data but will use the current one
	 * @param int start where the new stream will start
	 * @param int length (optional) defaults to the max new file length
	 * @return StreamBuffer
	 */
	this.subStream = function(start, length) {
		var length = length || (limit - start);
		if(length > (limit - start)) {
			throw "Sub stream length is greater than it could be";
		}
		return new StreamBuffer(buffer, bigEndian, start + offset, length);
	};
	/**
	 * Read a single character. 
	 * @param int iNumChars (optional) defaults to 1
	 * @return char
	 */
	this.read = function(iNumChars) {
		iNumChars = iNumChars || 1;
		if(iNumChars == 1) {
			// Tried just charAt, but it wasn't getting the correct string for certain values :(
			return String.fromCharCode(buffer.charCodeAt(offset + position++) & 0xFF);
		} else {
			var string = buffer.substr(offset + position, iNumChars);
			position += iNumChars;
			return string;
		}
	};
	/**
	 * Read a single character.
	 * @param int iNumChars (optional) defaults to 1
	 * @return char
	 */
	this.readAt = function(pos, iNumChars) {
		iNumChars = iNumChars || 1;
		if(iNumChars == 1) {
			// Tried just charAt, but it wasn't getting the correct string for certain values :(
			return String.fromCharCode(buffer.charCodeAt(offset + pos) & 0xFF);
		} else {
			var string = buffer.substr(offset + pos, iNumChars);
			return string;
		}
	};
	/**
	 * Read a line of text. A line is considered to be terminated by any one of a line feed ('\n'), a carriage return ('\r'), or a carriage return followed immediately by a linefeed. 
	 * // TODO strip off extra linefeed if there is one
	 * @return string
	 */
	this.readLine = function() {
		var line = "";
		while(true) {
			var c = this.read();
			if(c == "\r") {
				var next = this.peek();
				if(next == "\n") {
					this.read();
				}
				break;
			} else if(c == "\n") {
				break;
			}
			line += c;
		}
		return line;
	};
	/**
	 * Reads one char from the buffer but doesn't advance the posistion.
	 * @return char returns -1 if the end of the buffer is reached
	 */
	this.peek = function() {
		var z = buffer;
		if(position >= limit)
			return -1;
		var c = this.read();
		this.setPosition(this.getPosition() - 1);
		return c;
	};
	/**
	 * Moves the file posisition back one.
	 * // TODO this should maybe be removed altogether
	 */
	this.rewindOne = function() {
		this.setPosition(this.getPosition() - 1);
	};
	/**
	 * Reads a single unsigned byte at the position
	 * @param int i position
	 * @return byte(int)
	 */
	this.getByteAt = function(i){
		return buffer.charCodeAt(i + offset) & 0xff;
	};
	/**
	 * The byte order is used when reading or writing multibyte values, and when creating buffers that are views of this byte buffer.
	 * true = bigEndian
	 * false = littleEndian
	 */
	this.order = function() {
		return bigEndian;
	};
	/**
	 * Relative get method. Reads the byte at this buffer's current position, and then increments the position.
	 *
	 * @returns The byte at the buffer's current position 
	 */
	this.get = function() {
		var bite = this.getByteAt(position);
		position++;
		if(bite > 127)
			return bite - 256;
		else
			return bite;
	};
	this.getAt = function(loc) {
		var bite = this.getByteAt(loc);
		if(bite > 127)
			return bite - 256;
		else
			return bite;
	};
	/**
	 * Relative bulk get method. 
	 * @param Array
	 */
	this.getBulk = function(dst) {
		var len = dst.length;
		for(var i = 0; i < len; i++) {
			dst[i] = this.get();
		}
	};
	/**
	 * Relative get method for reading a char value.
	 * Reads the next two bytes at this buffer's current position, composing them into a char value according to the current byte order, and then increments the position by two. 
	 * 
	 * @returns 
	 */
	this.getChar = function() {
		var b1 = this.get();
		var b0 = this.get();
		return String.fromCharCode((b1 << 8) | (b0 & 0xff));
	};
	/**
	 * Relative get method for reading a short value.
	 * Reads the next two bytes at this buffer's current position, composing them into a short value according to the current byte order, and then increments the position by two.
	 *
	 * @returns The short value at the buffer's current position 
	 */
	this.getShort = function() {
		var iShort = bigEndian ? 
			(this.getByteAt(position) << 8) + this.getByteAt(position + 1)
			: (this.getByteAt(position + 1) << 8) + this.getByteAt(position)
		position += 2;
		if (iShort > 32767)
			return iShort - 65536;
		else
			return iShort;
	};
	/**
	 * Relative get method for reading an int value.
	 * Reads the next four bytes at this buffer's current position, composing them into an int value according to the current byte order, and then increments the position by four. 
	 *
	 * @returns The int value at the buffer's current position
	 */
	this.getInt = function() {
		var iByte1 = this.getByteAt(position),
		iByte2 = this.getByteAt(position + 1),
		iByte3 = this.getByteAt(position + 2),
		iByte4 = this.getByteAt(position + 3);

		var iInt = bigEndian ? 
			(((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8) + iByte4
			: (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8) + iByte1;
		position += 4;
		if (iInt > 2147483647)
			return iInt - 4294967296;
		else
			return iInt;
	};
	/**
	 * // TODO
	 * Relative get method for reading a long value.
	 * Reads the next eight bytes at this buffer's current position, composing them into a long value according to the current byte order, and then increments the position by eight. 
	 *
	 * @returns The long value at the buffer's current position 
	 */
	this.getLong = function() {
		// TODO
		this.getInt();
		this.getInt();
		console.warn('getLong not implemented');
	};
	//TODO this should probably be removed
	this.lastIndexOf = function(searchString) {
		return streamText.lastIndexOf(searchString);
	};
	this.toByteArray = function() {
		var ret = new Array(limit);
		for(var i = 0; i < limit; i++) {
			ret[i] = this.getAt(i);
		}
		return ret;
	};
	/**
	 * Simple helper to see where the pos and limit is.
	 * @return string
	 */
	this.toString = function() {
		return "StreamBuffer: pos " + position + " lim " + limit;
	};
};
StreamBuffer.createFromUrl = function(fileURL) {
	var req = new XMLHttpRequest();

	req.open('GET', fileURL, false);

	//XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com] 
	req.overrideMimeType('text/plain; charset=x-user-defined');
	req.send(null);

	if (req.status != 200) throwException(_exception.FileLoadFailed);

	fileContents = req.responseText;

	fileSize = fileContents.length;

	return new StreamBuffer(fileContents);
};