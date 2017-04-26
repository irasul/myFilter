"use strict";
app.directive('myFilter',function(){
	
	return {
		restrict: 'A',
		template: `
			<a ng-click="toggleFilters($id)">{{title}}</a>
			<div class="options" id="opt-{{$id}}">
				<input ng-model="srchFilter" class="srchFilter" placeholder="Search {{title}}" ng-change="searchList(this)">	
				<div class="options_holder">
					<div class="checkbox ng-hide" ng-repeat="r in data" ng-show="r.show">
						<label>
							<input type="checkbox" name="{{title}}Filter" type="checkbox" ng-value="r.name"  checked="checked" control="{{control}}" onchange="filter_x_0_1(this)"/><span ng-bind="r.name"></span> 
						</label>
					</div>
				</div>	
				<div class='clearfix footer'>
					<div style='float:left'>Select <a ng-click="selectAll()">All</a> | <a ng-click="selectNone()">None</a></div> 
					<div style='float:right'><a class="btn" ng-click="toggleFilters($id)">Done</a></div>
				</div>	
			</div>
		`,
		scope:{
			title: "@",
			control: "@",
			keys: "@",
			dataset: "="
		},
		compile: function(element, attributes){
 
			return {
	 			function(scope, element, attributes){
						
	            }
	         }
    },
    controller: function($scope,$element,$attrs){
		$element.addClass('filter');
		$scope.datacol = $scope.dataset.map(i => {return i[$scope.keys]});
		$scope.data=[];
		for(let i = 0 ; i < $scope.datacol.length ; i++){
			let subAry = $scope.data.filter( item => { return item.name == $scope.datacol[i]})	
			if(!subAry.length){
				$scope.data.push({ name: $scope.datacol[i], show: true});
			}
		}

		/*$scope.ary=$scope.$parent[$scope.data];*/

		//console.log($scope.control);
		/*$scope.$parent.$watch($scope.data,function(newValue, oldValue){
				if(newValue != oldValue){
					$scope.ary=$scope.$parent[$scope.data];
					$scope.aryShow = [];
					($scope.ary).forEach(function(){
						$scope.aryShow.push(true);
					});
					
				}
				
		},true);*/
		$scope.toggleFilters = function(id){
			var elm = document.getElementById('opt-'+id).style;
			elm.display=elm.display=="block"?"none":"block";
		}
		
		$scope.selectAll = function(){

			$("input[name='"+$scope.title+"Filter']").each(function(){
				$(this).prop('checked',true);
				$(this).trigger('change');
			});
		}
		$scope.selectNone = function(){
			$("input[name='"+$scope.title+"Filter']").each(function(){
				$(this).prop('checked',false);
				$(this).trigger('change');				
			});
		}

		$scope.searchList = function(){
			if($scope.srchFilter==""){
				$scope.data.forEach(function(e){
					$scope.data[e].show = true;
				});
			}
			else{			
				var r = new RegExp($scope.srchFilter,"gi");
				$scope.data.forEach(function(e){
					var s = new String($scope.data[e].name);
					if(s.match(r)!=null){
						$scope.data[e].show=true;
					}
					else{
						$scope.data[e].show=false;
					}	
				});
			}	
		
		}
			
     }
   };
});


function filter_x_0_1(t){
	var cClass = "."+$(t).attr('control');
	var val = $(t).val();
	var fn = $(t).is(":checked")?function(tx){$(tx).parent().show();}:function(tx){$(tx).parent().hide();}
	$(cClass).each(function(){
		$(this).showOrHide = fn;
		if($(this).text() == val){fn(this)};
	});
}
