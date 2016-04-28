'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Prediction, Auth, Comment, Like) {

	$scope.searchPrediction = '';
	$scope.predictions = Prediction.all;
	$scope.signedIn = Auth.signedIn;
	$scope.listMode = true;

	$scope.user = Auth.user;

	var pagesShown = 1;

	var pageSize = 3;

	$scope.paginationLimit = function() {
 		return pageSize * pagesShown;
	};

	$scope.hasMoreItemsToShow = function() {
 		return pagesShown < ($scope.predictions.length / pageSize);
	};

	$scope.showMoreItems = function() {
		pageSize = pageSize + 2;       
	}; 

	$scope.hasLessItemsToShow = function() {
 		return pageSize > 4;
	};

	$scope.showLessItems = function() {
		pageSize = pageSize - 2;       
	}; 

	if($routeParams.predictionId) {
		var prediction = Prediction.getPrediction($routeParams.predictionId).$asObject();
		$scope.listMode = false;
		setSelectedPrediction(prediction);
	}

	function setSelectedPrediction(prediction) {
		$scope.selectedPrediction = prediction;

		if($scope.signedIn()) {

			Like.isLiked(prediction.$id).then(function(data) {
				$scope.alreadyLiked = data;
			});

			$scope.isPredictionCreator = Prediction.isCreator;
			$scope.isOpen = Prediction.isOpen;
		}

		$scope.comments = Comment.comments(prediction.$id);

		$scope.likes = Like.likes(prediction.$id);

		$scope.block = false;

		$scope.isLikeMaker = Like.isMaker;
	};

	$scope.cancelPrediction = function(predictionId) {
		Prediction.cancelPrediction(predictionId).then(function() {
			toaster.pop('success', 'This prediction is removed successfully.');
		});
	};

	$scope.wonPrediction = function(predictionId) {
		Prediction.wonPrediction(predictionId).then(function() {
			toaster.pop('success', 'Congratulations! Your prediction was successfull!');
		});
	};

	$scope.lostPrediction = function(predictionId) {
		Prediction.lostPrediction(predictionId).then(function() {
			toaster.pop('success', ':( Maybe next time!');
		});
	};

	$scope.backPrediction = function(predictionId) {
		Prediction.backPrediction(predictionId).then(function() {
			toaster.pop('success', 'This prediction does\'t count than!');
		});
	};

	$scope.processPrediction = function(predictionId) {
		Prediction.processPrediction(predictionId).then(function() {
			toaster.pop('success', 'Prediction is still in process.');
		});
	};

	$scope.addComment = function() {
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Comment.addComment($scope.selectedPrediction.$id, comment).then(function() {
			toaster.pop('success', 'Your comment has been added successfully');
			$scope.content = '';
		});
	};

	$scope.likePrediction = function() {
		var like = {
			rate: $scope.rate,
			uid: $scope.user.uid,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Like.likePrediction($scope.selectedPrediction.$id, like).then(function() {
			toaster.pop('success', 'Your like has been added');
			$scope.rate = '';
			$scope.block = true;
			$scope.alreadyLiked = true;
		});
	};

	$scope.cancelLike = function(likeId) {
		Like.cancelLike($scope.selectedPrediction.$id, likeId).then(function() {
			toaster.pop('success', 'Your like has been removed');
		
			$scope.alreadyLiked = false;
			$scope.block = false;
		});
	};

});