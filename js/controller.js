var myShop = angular.module("myShop", []);
myShop.controller("headerController", function ($scope) {

  $scope.listGoods = goods;

  $scope.numberOfGoods = 1;

 /* function fzCtrl($rootScope, $scope) {

    $scope.searcher=function(){
      $( " span " ).removeClass( "red" );
      var word=$scope.searchWord;
      if(word){
        $(document).ready(function(){
          $("#text").html(function(_, html){
            return html.replace(new RegExp(word, 'g'), '<span class="red">'+word+'</span>');
          });

        });}
      ;}

  }*/

  if (goods != null) {
    $scope.numberOfGoods = goods.length;
  }

  // Init header DropMenu settings
  var headerDropdownMenuItems = {
    searchBy: ['any', 'title', 'description'],
    sortBy: ['none', 'title', 'price'],
    pageSize: [8, 12, 16, 20, 24, 28, 32],
    page: [1]
  };

  $scope.listHeaderDropdownMenuItems = headerDropdownMenuItems;
  $scope.currentSearchBy = headerDropdownMenuItems.searchBy[0];
  $scope.currentSortBy = headerDropdownMenuItems.sortBy[0];
  $scope.currentPageSize = headerDropdownMenuItems.pageSize[0];
  $scope.currentPage = headerDropdownMenuItems.page[0];
  $scope.numberOfPages = Math.ceil($scope.numberOfGoods / $scope.currentPageSize);
  headerDropdownMenuItems.page.length = 0;
  for (var i = 1; i <= $scope.numberOfPages; i++) {
    headerDropdownMenuItems.page.push(i);
  }

  // init sort parametr
  $scope.sortParam = '';

  // init search parametrs
  $scope.query = {};
  $scope.queryBy = '$';

  // events
  $scope.searchByClick = function (searchBy) {
    $scope.currentSearchBy = searchBy;
    if ($scope.currentSearchBy == headerDropdownMenuItems.searchBy[0]) $scope.queryBy = '$';
    // name sort
    else if ($scope.currentSearchBy == headerDropdownMenuItems.searchBy[1]) $scope.queryBy  = 'title';
    // price sort
    else if ($scope.currentSearchBy == headerDropdownMenuItems.searchBy[2]) $scope.queryBy = 'description';


  };

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