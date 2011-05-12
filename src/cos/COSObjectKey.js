function COSObjectKey(num, gen) {
	if(typeof num == "string")
		this.number = parseInt(num);
	else
		this.number = num;
	if(typeof gen == "string")
		this.generation = parseInt(gen);
	else
		this.generation = gen;
}
COSObjectKey.prototype = {
	getKey: function() {
		return this.number + "-" + this.generation;
	},
	toString: function() {
		return "COSObjectKey: " + this.getKey();
	}
}