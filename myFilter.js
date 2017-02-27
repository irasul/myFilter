app.directive('myFilter',function(){
	
	return {
		restrict: 'A',
		templateUrl: "filter_template.html",
		scope:true,
		compile: function(element, attributes){
 
			return {
	 			function(scope, element, attributes){
					
	            }
	         }
     },
     controller: function($scope,$element,$attrs){
		$scope.title = $attrs.title;
		$scope.control = $attrs.control;
		//console.log($scope.control);
		$scope.$parent.$watch($attrs.data,function(newValue, oldValue){
				if(newValue != oldValue){
					$scope.ary=$scope.$parent[$attrs.data];
					$scope.aryShow = [];
					($scope.ary).forEach(function(){
						$scope.aryShow.push(true);
					});
					
				}
				
		},true);
		$scope.showFilters = function($event){
			//angular.element($event.currentTarget).find(".options").toggle();
			var elm = $event.target.nextElementSibling.style;
			elm.display=elm.display=="block"?"none":"block";
		}
		$scope.hideFilters = function($event){
			var elm = $event.target.parentElement.style;
			elm.display="none";
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
				$.each($scope.ary,function(e){
					$scope.aryShow[e] = true;
				});
			}
			else{			
				var r = new RegExp($scope.srchFilter,"gi");
				$.each($scope.ary,function(e){
					var s = new String($scope.ary[e]);
					if(s.match(r)!=null){
						$scope.aryShow[e] = true;
					}
					else{
						$scope.aryShow[e] = false;
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
