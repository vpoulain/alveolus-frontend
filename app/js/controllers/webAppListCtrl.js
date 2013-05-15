'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppListCtrl', []).
controller('WebAppListCtrl', function($scope,$routeParams,WebappService,CategoryService) {



	go();

	function catDisplay(){
		$scope.subcats = new Array();


		WebappService.getFeaturedApps({catId: $routeParams.catId}, function(data){
			var c = new Object();
			c.name ='Sélection de l\'équipe';
			c.alveoles = data;
			$scope.subcats.push(c);

			//On doit attendre que la requête des app featured soit terminée pour être sur que les subcats soient dans le bon ordre
			WebappService.getAppsFromCat({catId: $routeParams.catId}, function(data){
				var c = new Object();
				c.name ='Toutes les alvéoles';
				c.alveoles = data.webapps;
				$scope.subcats.push(c);
			});
		});

		$scope.numColumns = 4;
		$scope.rows = [];
		$scope.cols = [];

		$scope.$watch("webApps.length", function(){
			// $scope.rows.length = Math.ceil($scope.webApps.length / $scope.numColumns);
			// $scope.cols.length = $scope.numColumns;        
		});
	}

	function getSelectionName(id){
		for(var i in $scope.selectionCats){
			if($scope.selectionCats[i].id == id){
				return $scope.selectionCats[i].name;
			}
		}
		return null;
	}

	function display(){
		setPageName($scope.cats);
		setSelectionCats();

		if($routeParams.catId){
			console.log('Liste catégorie');

			//Affichage par catégorie
			catDisplay();
		}

		else if($routeParams.selectionId){

			console.log('Liste sélection');

			//Affichage par sélection
			selectionDisplay();
		}

		else if($routeParams.content){
			console.log('Résultat recherche');

			//Affichage du résultat de la recherche
			resultDisplay();
		}	

	}

	function go(){
		$scope.subcats = new Array();
		// On commence par charger les catégories
		$scope.cats = CategoryService.getCategories(function(){
			//On lance l'affichage
			display();		
		});
		//Watcher pour ne pas requeter à chaque fois
		$scope.$watch('cats',function(newValue){
			if(newValue && newValue.length > 0 ){
				//On lance l'affichage
				display();
			}
		});

	}

	function selectionDisplay(){

		switch(parseInt($routeParams.selectionId)){
			case 1:
			//Sélection de l'équipe
			$scope.pageName = getSelectionName(1);
			break;
			case 2:
			//Les plus commentéees
			$scope.pageName = getSelectionName(2);
			WebappService.getMostCommented(function(data){
				$scope.mostCommentedApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			case 3:
			//Les mieux notées
			$scope.pageName = getSelectionName(3);
			WebappService.getBest(function(data){
				$scope.bestApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			case 4:
			//Les plus récentes
			$scope.pageName = getSelectionName(4);
			WebappService.getMostRecent(function(data){
				$scope.mostRecentApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			case 5:
			//Les plus partagées
			$scope.pageName = getSelectionName(5);
			WebappService.getMostShared(function(data){
				$scope.mostSharedApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			default:
			break;

		}

	}

	function setPageName(cats){
		if($routeParams.catId){
			$scope.pageName=cats[parseInt($routeParams.catId)-1].name;
		}
		else if($routeParams.selectionId && $routeParams.selectionId == 1){
			$scope.subcats = [];

			for(var i in cats){
				var r = new Object();
				r.name = cats[i].name;
				r.alveoles = null;
				$scope.subcats.push(r);
			}

		} else {
			$scope.subcats = [];
			var r = new Object();
			r.name = '';
			r.alveoles = null;
			$scope.subcats.push(r);
		}
		
	}

	function setSelectionCats(){
		$scope.selectionCats = [
		{
			'name':'Sélection de l\'équipe',
			'id':1
		},
		{
			'name':'Les plus commentées',
			'id':2
		},
		{
			'name':'Les mieux notées',
			'id':3
		},
		{
			'name':'Les plus récentes',
			'id':4
		},
		{
			'name':'Les plus partagées',
			'id':5
		}
		]
	}

	function resultDisplay(){
		$scope.pageName = $routeParams.content;
	}

});