'use strict';

app.factory('Comment', function(FURL, $firebase) {

	var ref = new Firebase(FURL);

	var Comment = {
		comments: function(predictionId) {
			return $firebase(ref.child('comments').child(predictionId)).$asArray();
		},

		addComment: function(predictionId, comment) {
			var prediction_comments = this.comments(predictionId);
			comment.datetime = Firebase.ServerValue.TIMESTAMP;

			if(prediction_comments) {
				return prediction_comments.$add(comment);
			}
		},

		// editComment: function(predictionId, comment) {
		// 	var t = this.comments(comment.$id);
		// 	return t.$update(
		// 		{
		// 			content: comment.content;
		// 		}
		// 	);
		// },

	};

	return Comment;

});