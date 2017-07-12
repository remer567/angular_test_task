var myShop = angular.module("myShop", []);
myShop.controller("headerController", function ($scope) {

  $scope.listGoods = goods;

  $scope.numberOfGoods = 1;

  if (goods != null) {
    $scope.numberOfGoods = goods.length;
  }

  // Init header DropMenu settings
  var headerDropdownMenuItems = {
    sortBy: ["none", "name", "price"],
    pageSize: [8, 12, 16, 20, 24, 28, 32],
    page: [1]
  };

  $scope.listHeaderDropdownMenuItems = headerDropdownMenuItems;
  $scope.currentSortBy = headerDropdownMenuItems.sortBy[0];
  $scope.currentPageSize = headerDropdownMenuItems.pageSize[0];
  $scope.currentPage = headerDropdownMenuItems.page[0];
  $scope.numberOfPages = Math.ceil($scope.numberOfGoods / $scope.currentPageSize);
  headerDropdownMenuItems.page.length = 0;
  for (var i = 1; i <= $scope.numberOfPages; i++) {
    headerDropdownMenuItems.page.push(i);
  }

  //Init sort parametr
  $scope.sortParam = '';

  // events
  $scope.sortByClick = function (typeSort) {
    $scope.currentSortBy = typeSort;
    // none sort
    if ($scope.currentSortBy == headerDropdownMenuItems.sortBy[0]) $scope.sortParam = '';
    // name sort
    else if ($scope.currentSortBy == headerDropdownMenuItems.sortBy[1]) $scope.sortParam = 'title';
    // price sort
    else if ($scope.currentSortBy == headerDropdownMenuItems.sortBy[2]) $scope.sortParam = 'price';
  };

  $scope.pageSizeClick = function (pageSize) {
    $scope.currentPageSize = pageSize;
    $scope.currentPage = 1;
    $scope.numberOfPages = Math.ceil($scope.numberOfGoods / $scope.currentPageSize);
    headerDropdownMenuItems.page.length = 0;
    for (var i = 1; i <= $scope.numberOfPages; i++) {
      headerDropdownMenuItems.page.push(i);
    }
  };

  $scope.pageClick = function (page) {
    $scope.currentPage = page;
  };

  $scope.previousPageClick = function () {
    if ($scope.currentPage - 1 != 0)
      $scope.currentPage--;
  };

  $scope.nextPageClick = function () {
    if ($scope.currentPage + 1 <= $scope.numberOfGoods)
      $scope.currentPage++;
  };

  $scope.isDisablePreviousPageButton = function () {
    return $scope.currentPage == 1;
  };

  $scope.isDisableNextPageButton = function () {
    return $scope.currentPage == $scope.numberOfPages;
  };

});