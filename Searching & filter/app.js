var app = angular
  .module("myApp", [])
  .controller("myController", function($scope) {
	$scope.employeeDetails = {"data": [{
"id": 1,
"name": "Jhon",
"phone": "9999999999",
"address":
{
"city": "Pune",
"address_line1":"ABC road",
"address_line2":"XYZ building",
"postal_code":"12455"
}
}, {
"id": 2,
"name": "Jacob",
"phone": "AZ99A99PQ9",
"address":
{
"city": "Pune",
"address_line1":"PQR road",
"address_line2":"ABC building",
"postal_code":"13455"
}
}, {
"id": 3,
"name": "Ari",
"phone": "145458522",
"address":
{
"city": "Mumbai",
"address_line1":"ABC road",
"address_line2":"XYZ building",
"postal_code":"12455"
}
}]
}
	$scope.validateMobileNumber= function(text){
	  var isNum = /^\d+$/.test(text);
	  if(isNum === false){
	    text = "NA"
	  }
	  return text;
	}

	$scope.search = function (searchData) {

		var name = searchData.name.toLowerCase();
		var city = searchData.address.city.toLowerCase();
		var srchText = $scope.searchText != undefined ? $scope.searchText.toLowerCase():"";
         return !!((name.indexOf(srchText || '') !== -1 || city.indexOf(srchText || '') !== -1));
    };
                    
  });