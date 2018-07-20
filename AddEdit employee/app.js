var app = angular.module("myApp", ['ngRoute']);


	app.config(function($routeProvider) {
        $routeProvider

            
            .when('/', {
                templateUrl : '/employee_details.html',
                controller  : 'employeeDetailsController'
            })
						.when('/:value', {
							templateUrl : '/employee_details.html',
							controller  : 'employeeDetailsController'
					})
            .when('/employees/add', {
                templateUrl : 'addEmp.html',
                controller  : 'addEmployeeController'
            })

			.when('/employees/:id/edit', {
                templateUrl : '/editEmp.html',
                controller  : 'editEmployeeController'
						})
						.otherwise({
							redirect: '/'
					});
    });

	app.factory('shareEmpDetails', function() {
	  var list = [];

	  return {
	    addEmp: addEmp,
			getEmp: getEmp,
			updateEmp:updateEmp
	  };

	  function addEmp(emp) {
			if(list.length >0){
				list[0].push(emp);
			}else{
				list.push(emp);
			}
		}

	  function getEmp() {
	    return list;
		}
		function updateEmp(id,data){
			console.log(list[0][id])
			for(var i=0;i<list[0].length;i++){
				if(list[0][i].id === parseInt(id)){
					list[0][i] = data;
				}
			}
		}
	});
  app.controller("employeeDetailsController", function($scope,$location,shareEmpDetails,$rootScope,$routeParams) {

  	var dummyData = {
   "data":[
      {
         "id":1,
         "name":"Jhon",
         "phone":"9999999999",
         "address":{
            "city":"Pune",
            "address_line1":"ABC road",
            "address_line2":"XYZ building",
            "postal_code":"12455"
         }
      },
      {
         "id":2,
         "name":"Jacob",
         "phone":"AZ99A99PQ9",
         "address":{
            "city":"Pune",
            "address_line1":"PQR road",
            "address_line2":"ABC building",
            "postal_code":"13455"
         }
      },
      {
         "id":3,
         "name":"Ari",
         "phone":"145458522",
         "address":{
            "city":"Mumbai",
            "address_line1":"ABC road",
            "address_line2":"XYZ building",
            "postal_code":"12455"
         }
      }
   ]
}
	$scope.employeeDetails = angular.copy(dummyData);
	
	$scope.validateMobileNumber= function(text){
	  var isnum = /^\d+$/.test(text);
	  if(isnum === false){
	    text = "NA"
	  }
	  return text;
	}

		$scope.addNewEmployee = function(){
			$location.path('/employees/add')
		}
    $scope.editEmployee= function(id,index){
		$location.path('/employees/'+id+'/edit')	
		}
		var value = $routeParams.value;
		if(value != undefined && value === "true"){
				for (var i = $scope.employeeDetails.data.length - 1; i >= 0; i--) {
					$scope.employeeDetails.data.splice(i, 1);
				}
				var serviceData = shareEmpDetails.getEmp();
				for(var j=0;j<serviceData[0].length;j++){
					serviceData[0][j]["id"]  = $scope.employeeDetails.data.length+1;
					$scope.employeeDetails.data.push(serviceData[0][j])
				}
		}else{
			shareEmpDetails.addEmp(dummyData.data);
		}
   
});


  app.controller("addEmployeeController",function($scope,$location,$rootScope,shareEmpDetails){
  	$scope.employee ={} ;

  	$scope.save = function(empDetails,form){
  		shareEmpDetails.addEmp(empDetails)
  		$location.path('/'+true)
  	}
  });

  app.controller("editEmployeeController",function($scope,$location,$rootScope,shareEmpDetails,$routeParams){
  	var id = $routeParams.id;
  	if(shareEmpDetails.getEmp().length >0){
			var empData = shareEmpDetails.getEmp();
			var filteredData = empData[0].filter(x => x.id === parseInt(id))
			$scope.employee = angular.copy(filteredData[0])
		}
		$scope.save = function(empDetails,form){
  		shareEmpDetails.updateEmp(id,empDetails)
  		$location.path('/'+true)
  	}
  });