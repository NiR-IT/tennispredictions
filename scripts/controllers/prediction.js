'use strict';

app.controller('PredController', function($scope, $location, toaster, Prediction, Auth) {
	$scope.createPrediction = function() {
		$scope.prediction.status = 'open';
		$scope.prediction.gravatar = Auth.user.profile.gravatar;
		$scope.prediction.name = Auth.user.profile.name;
		$scope.prediction.poster = Auth.user.uid;

		Prediction.createPrediction($scope.prediction).then(function(ref) {
			$toaster.pop('success', 'Prediction posted successfully.');
			$scope.prediction = {
				player1: '',
				player2: '',
				winner: '',
				venue: '',
				date: '',
				round: '',
				description: '',
				odd: '',
				score: '',
				status: 'open',
				gravatar: '',
				name: '',
				poster: ''
			};
			$location.path('/browse/' + ref.key());
		});
	};

	$scope.editPrediction = function(prediction) {
		Prediction.editPrediction(prediction).then(function() {
			$toaster.pop('success', 'Prediction is updated.');
		});
	};
});