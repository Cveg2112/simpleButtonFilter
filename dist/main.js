var simpleFilter = function(obj){
  var filterTarget = obj.targetEl,
      filterTrigger = obj.triggerEl,
      filterData = obj.dataFilter,
      filterActive = obj.active,
      filterHidden = obj.hidden,
      splitToArray = [],
      filterItem = '';

  var filterCheckState = function(checkItem){
    $(filterTrigger).removeClass(filterActive);
    if( checkItem.hasClass(filterActive) ){
      checkItem.removeClass(filterActive);
    } else {
      checkItem.addClass(filterActive);
    }
  }

  var filterSplitMultipleValues = function(filterItem){
    splitToArray = filterItem.split(',');
    return splitToArray;
  }

  var findFilterItem = function(filterItem){
    if( filterItem === 'all' || filterItem === 'All' ){
      $(filterTarget).removeClass(filterHidden);
    } else {
      // run through the targeted tiles
      $(filterTarget).each(function(){
        filterSplitMultipleValues( $(this).data(filterData) );
        if( splitToArray.indexOf(filterItem) >= 0 ){
          $(this).removeClass(filterHidden);
        } else {
          $(this).addClass(filterHidden);
        }
      });
    }
  }

  $(filterTrigger).on('click', function(){
    filterCheckState( $(this) );
    findFilterItem( $(this).data( filterData ) );
  })
}
