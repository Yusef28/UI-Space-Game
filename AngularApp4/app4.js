var app = angular.module('glist', []);

app.controller("gctrl", function($scope, $interval){

	$scope.counter = 0;
	
	var promise
	$scope.inter = 50;
	$scope.fuel = {name: 'Basic', multiplier: 1, tank:100, loss:0.1};
	$scope.speed = $scope.inter * $scope.fuel.multiplier;
	$scope.fueldisplay = -1;
	
	$scope.showFuel = function(i){
	$scope.fueldisplay = i;
	}
	
	$scope.hideFuel = function(){
	$scope.fueldisplay = -1;
	}
	
	$scope.start = function(){
	$scope.stop();
	promise = $interval(count, $scope.speed);
	
	}
	
	$scope.stop = function(){
	$interval.cancel(promise);
	}
	
	$scope.$on('$destroy', function(){
	$scope.stop();
	});
	
	function count(){
	$scope.counter++;//miles from home
	$scope.fuel.tank -= $scope.fuel.loss;
	$scope.fuel.tank = $scope.fuel.tank.toPrecision(3);
	
	for(i=0; i<$scope.planets.length; i++)
		{
			$scope.planets[i].distancefrom = $scope.planets[i].distance - $scope.counter;
			
			if($scope.planets[i].distancefrom < 0){
			$scope.planets.splice(i, 1);
			}
		}
	}
	
	//maybe don't need since galaxies does this
	//$scope.universe = [];
	
	//$scope.galaxies = [];
	//$scope.starsystems = [];
	$scope.planets = [];
	
	//$scope.createGalaxies = function(){};
	//$scope.createStarSystems = function(){};
	
	$scope.createPlanets = function(){

		var planetNum = Math.floor(Math.random() * 10);//num of planets
		var SSnum = 0;
		
		for(i= 0; i < planetNum; i++){
			SSnum = i;
			var planet = {
			name: i,
			distance: i*500 + Math.random()*200,
			distancefrom: 0,
			fuel: { type:'fuel type',
					price: Math.floor(Math.random()*50)+SSnum*50,
					loss: Math.floor(Math.random()*SSnum)/10,
					mult: Math.floor(Math.random()*SSnum)
					}
				}
			$scope.planets.push(planet);		
			}
	
	
		};

	
	$scope.createPlanets();

});