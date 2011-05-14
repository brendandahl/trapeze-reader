// TODO move these to a object where they belong
function extend(subClass, baseClass) {
   function inheritance() {}
   inheritance.prototype = baseClass.prototype;

   subClass.prototype = new inheritance();
   subClass.prototype.constructor = subClass;
   subClass.baseConstructor = baseClass;
   subClass.superClass = baseClass.prototype;
}

function getBytes(s) {
	var length = s.length;
	var ret = [];
	for(var i = 0; i < length; i++)
		ret.push(s.charCodeAt(i) & 0xFF);
	return ret;
}
function isDigit(c)
{
	if(c >= '0' && c <= '9')
		return true;
	return false;
}
function intToSignedByte(i) {
	if(i > 127)
		return i - 256;
	else
		return i;
}
function toSignedByte(c) {
	var bite = c.charCodeAt(0);
	if(bite > 127)
		return bite - 256;
	else
		return bite;
}
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
