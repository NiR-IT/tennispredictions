'use strict';

app.factory('Like', function(FURL, $firebase, $q, Auth) {

	var ref = new Firebase(FURL);
	var user = Auth.user;

	var Like = {

		likes: function(predictionId) {
			return $firebase(ref.child('likes').child(predictionId)).$asArray();
		},

		likePrediction: function(predictionId, like) {
			var prediction_likes = this.likes(predictionId);

			if(prediction_likes) {
				return prediction_likes.$add(like);
			}
		},

		isLiked: function(predictionId) {
			if(user && user.provider) {
				var d = $q.defer();

				$firebase(ref.child('likes').child(predictionId).orderByChild("uid")
					.equalTo(user.uid))
					.$asArray()
					.$loaded().then(function(data) {
						d.resolve(data.length > 0);
					}, function() {
						d.reject(false);
					});

				return d.promise;
			}
		},

		isMaker: function(like) {
			return (user && user.provider && user.uid === like.uid);
		},

		getLike: function(predictionId, likeId) {
			return $firebase(ref.child('likes').child(predictionId).child(likeId));
		},

		cancelLike: function(predictionId, likeId) {
			return this.getLike(predictionId, likeId).$remove();
		}



	};

	return Like;

});