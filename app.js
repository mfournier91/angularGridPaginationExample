var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination']);

app.controller('MainCtrl', [
'$scope', '$http', 'uiGridConstants', function($scope, $http) {

  var paginationOptions = {
    pageNumber: 1,
    pageSize: 25,
    sort: null
  };

  $scope.gridOptions = {
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    useExternalPagination: true,
    columnDefs: [
      { name: 'name' },
      { name: 'gender', enableSorting: false },
      { name: 'company', enableSorting: false }
    ],
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        console.log('in paginationChanged')
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        getPage();
      });
    }
  };

  var getPage = function() {
      console.log('in get page', paginationOptions)
    //var url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
    var url = `blah?limit=${paginationOptions.pageSize}&page=${paginationOptions.pageNumber}`

    //$http.get(url)
    getData(url)
    .then(function (response) {
      var data = response.data;

      $scope.gridOptions.totalItems = response.total;
      console.log('data before ', $scope.gridOptions.data)
      $scope.gridOptions.data = data.slice();
      console.log('data after ', $scope.gridOptions.data)
    });
  };

  getPage();
}
]);
