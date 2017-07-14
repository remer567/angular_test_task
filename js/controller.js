var myShop = angular.module('myShop', []);
myShop.controller('mainController', function ($scope, $filter) {

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

  // init navigation menu settings
  var headerDropdownMenuItems = {
    searchBy: [{key: 'any', value:'$'},
               {key: 'name', value:'name'},
               {key: 'description', value:'description'}],
    sortBy: [{key: 'none', value:''},
             {key: 'name', value:'name'},
             {key: 'price', value:'price'}],
    pageSize: [8, 12, 16, 20, 24, 28],
    page: [1]
  };
  $scope.listHeaderDropdownMenuItems = headerDropdownMenuItems;
  $scope.inputSearch = '';
  $scope.currentSearchBy = headerDropdownMenuItems.searchBy[0].key;
  var queryBy = headerDropdownMenuItems.searchBy[0].value;
  $scope.currentSortBy = headerDropdownMenuItems.sortBy[0].key;
  var sortParam = headerDropdownMenuItems.sortBy[0].value;
  $scope.currentPageSize = headerDropdownMenuItems.pageSize[0];
  $scope.currentPage = headerDropdownMenuItems.page[0];

  // refreshPage function
  refreshPage = function (isSettingsChanged) {
    if(isSettingsChanged == true)
      $scope.currentPage = 1;

    // filtering goods
    var filteredGoodsOrderBy = $filter('orderBy')(goods, sortParam);
    query = {};
    query[queryBy] = $scope.inputSearch;
    var filteredGoodsSearchBy = $filter('filter')(filteredGoodsOrderBy, query);
    $scope.listGoods = $filter('limitTo')(filteredGoodsSearchBy,
                                          $scope.currentPageSize, ($scope.currentPage - 1) * $scope.currentPageSize);

    // update navigation menu parametrs
    $scope.numberOfGoods = filteredGoodsSearchBy.length;
    if ($scope.numberOfGoods > 0) {
      $scope.isNotFound = false;
      $scope.numberOfPages = Math.ceil($scope.numberOfGoods / $scope.currentPageSize);
      headerDropdownMenuItems.page.length = 0;
      for (var i = 1; i <= $scope.numberOfPages; i++)
        headerDropdownMenuItems.page.push(i);
    }
    else {
      $scope.isNotFound = true;
      $scope.numberOfPages = 1;
      headerDropdownMenuItems.page.length = 0;
      headerDropdownMenuItems.page.push(1);
    }
  };

  refreshPage(true);

  // events
  $scope.inputSearchChange = function() {
    refreshPage(true);
  };

  $scope.searchByClick = function (searchBy) {
    $scope.currentSearchBy = searchBy;
    for (index = 0; index < headerDropdownMenuItems.searchBy.length; index++) {
      if ($scope.currentSearchBy == headerDropdownMenuItems.searchBy[index].key)
        queryBy = headerDropdownMenuItems.searchBy[index].value;
    }
    refreshPage(true);
    };

  $scope.sortByClick = function (typeSort) {
    $scope.currentSortBy = typeSort;
    for (index = 0; index < headerDropdownMenuItems.sortBy.length; index++) {
      if ($scope.currentSortBy == headerDropdownMenuItems.sortBy[index].key)
        sortParam = headerDropdownMenuItems.sortBy[index].value;
    }
    refreshPage(true);
  };

  $scope.pageSizeClick = function (pageSize) {
    $scope.currentPageSize = pageSize;
    refreshPage(true);
  };

  $scope.pageClick = function (page) {
    $scope.currentPage = page;
    refreshPage(false);
  };

  $scope.previousPageClick = function () {
    if ($scope.currentPage - 1 != 0)
      $scope.currentPage--;
      refreshPage(false);
  };

  $scope.nextPageClick = function () {
    if ($scope.currentPage + 1 <= $scope.numberOfPages)
      $scope.currentPage++;
      refreshPage(false);
  };

  $scope.isDisablePreviousPageButton = function () {
    return $scope.currentPage == 1;
  };

  $scope.isDisableNextPageButton = function () {
    return $scope.currentPage == $scope.numberOfPages;
  };

  $scope.openModalDialogButton = function (idModalDialog) {
    $(document).ready(function() {
      idModalDialog = '#modalDialog'+idModalDialog;
      $(idModalDialog).modal('show');
    });
  };

  $scope.signInButton = function () {
    $(document).ready(function () {
      $('#signInModal').modal('show');
    });
  }

  $scope.signUpButton = function () {
    $(document).ready(function () {
      $('#signUpModal').modal('show');
    });
  }

});