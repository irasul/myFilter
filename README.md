# myFilter is an angular directive that creates dropdown filter in a table header. 
# The directive needs to be used as an attribute: i.e.: <div class="filter" title="Year" data="Years" control="year" my-Filter></div>
# Mandatory attributes: 
# 1. title: this attribute is used as the column header
# 2. class=filter: this is going to apply the style
# 3. data=[array to populate the filter choices]: this array is a part of the parent $scope. i.e.: data="Years"
# 4. control=[a class that's in the <td> tag]: this tells the directive which column to control. i.e.: <td class="year">
