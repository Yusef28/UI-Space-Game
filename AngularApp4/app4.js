var app = angular.module('glist', []);

app.controller("gctrl", function($scope, $interval, $timeout){

	$scope.counter = 0;
	
	var promise
	
	//Player Variables
	$scope.inter = 50;
	$scope.fuel = {name: 'Basic', multiplier: 1, tank:100, loss:0.1};
	$scope.speed = $scope.inter / $scope.fuel.multiplier;
	$scope.fueldisplay = -1;
	
	
	//UI Functions
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
	
	
	//Game Loop Basically
	function count(){
	$scope.counter++;//miles from home
	$scope.fuel.tank -= $scope.fuel.loss;
	$scope.fuel.tank = $scope.fuel.tank.toPrecision(3);
	
	for(i=0; i<$scope.planets.length; i++)
		{
			$scope.planets[i].distancefrom = $scope.planets[i].distance - $scope.counter;
			if($scope.planets[i].stopping == true && $scope.planets[i].distancefrom <= 20){
				$scope.gatherFuel($scope.planets[i]);
				$scope.planets.splice(i, 1);
			}
			
			if($scope.planets[i].distancefrom < 0){
			$scope.planets.splice(i, 1);
			}
		}
	}
	
	
	//function to adjust fuel and player variables
	$scope.gatherFuel = function(planet)
	{
	$scope.stop();
	$timeout(function(){$scope.start()}, 3000);
	$scope.fuel.name = planet.fuel.type;
	$scope.fuel.multiplier = planet.fuel.mult;
	$scope.fuel.tank = 100;
	$scope.fuel.loss = planet.fuel.loss
	$scope.speed = $scope.inter / $scope.fuel.multiplier;
	};

	
	//maybe don't need since galaxies does this
	//$scope.universe = [];
	
	//$scope.galaxies = [];
	$scope.starsystems = [];
	$scope.planets = [];
	
	//$scope.createGalaxies = function(){};
	//$scope.createStarSystems = function(){};
	
	$scope.createPlanets = function(ssp, ssn){//add ss

		var planetNum = Math.floor(Math.random() * 10) +4;//num of planets
		var PSSnum = 1 ;
		
		for(i= 0; i < planetNum; i++){
			PSSnum = i ;//ones column, tens column
			var planet = {
			name: ssn +''+ i,
			distance: PSSnum*500 + Math.random()*200 + 500*ssn,
			distancefrom: 0,
			stopping: false,
			fuel: { type:'Basic',
					price: Math.floor(Math.random()*50)+PSSnum*50,
					loss: 0.1 * Math.random()+0.01,
					mult: Math.floor(Math.random()*PSSnum)+1
					}
				}
			planet.distancefrom = planet.distance;
			$scope.planets.push(planet);
			ssp.push(planet);	//this?		
			}
	
	
		};
	
	$scope.createStarSystems = function(){

		var SSnum = Math.floor(Math.random() * 10) +4;//num of planets
		
		for(k = 0; k < SSnum; k++){//had to use different var here
		var starsystem = {
			name: k, 
			distance: 700 * 15 * k,
			inThisSS: false,
			planets: []}
		
			$scope.createPlanets(starsystem.planets, k);
		$scope.starsystems.push(starsystem);
	
		}
	}
	
	$scope.createStarSystems();

});