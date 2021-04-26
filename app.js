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
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        getPage();
      });
    }
  };

  var getPage = function() {
    var url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';

    $http.get(url)
    .then(function (response) {
      var data = response.data;

      $scope.gridOptions.totalItems = 100;
      var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
      $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
    });
  };

  getPage();
}
]);
