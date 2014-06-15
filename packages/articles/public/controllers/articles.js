'use strict';

angular.module('mean').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles',
    function($scope, $stateParams, $location, Global, Articles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var article = new Articles({
                    title: this.title,
                    content: this.content
                });
                article.$save(function(response) {
                    $location.path('articles/' + response._id);
                });
		if (article.title === 'Sad') {
		    alert('Awww cheer up! We all have our ups and downs in life. How about spending a night relaxing and wine tasting at the Anchor Brewing Company? MEGAN CHEN is there tonight.');
		} else if (article.title === 'I am hungry...') {
		    alert('There is a nice Japanese restaurant called Live Sushi Bar on 17th St! Grab a nice meal there. JOHN SMITH is there tonight.');
		} else if (article.title === 'Ultimate Frisbee, anyone?') {
		    alert('JOHN SMITH is hosting a game at Jackson Field! Also JANE DOE will be there too.');
		}

                this.title = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function(response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var article = $scope.article;
                if (!article.updated) {
                    article.updated = [];
                }
                article.updated.push(new Date().getTime());

                article.$update(function() {
                    $location.path('articles/' + article._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };
    }
]);
