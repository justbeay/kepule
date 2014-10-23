define(["angular"], function(angular) {
	angular.module('ngComponent', [])
	
	.constant('datepickerConfig', {
	  dayFormat: 'dd',
	  monthFormat: 'MMMM',
	  yearFormat: 'yyyy',
	  dayHeaderFormat: 'EEE',
	  dayTitleFormat: 'MMMM yyyy',
	  monthTitleFormat: 'yyyy',
	  showWeeks: true,
	  startingDay: 0,
	  yearRange: 20
	})

	.directive( 'datepicker', ['dateFilter', '$parse', 'datepickerConfig', function (dateFilter, $parse, datepickerConfig) {
	  return {
	    restrict: 'EA',
	    replace: true,
	    scope: {
	      showpicker: '=showPicker',
	      model: '=ngModel',
	      dateDisabled: '&'
	    },
	    template: "<table ng-show=\"showpicker\" class=\"well well-large\">\n" +
				    "  <thead>\n" +
				    "    <tr class=\"text-center\">\n" +
				    "      <th><button dateFlag=\"dateFlag\" class=\"btn pull-left\" ng-click=\"move(-1)\"><i class=\"icon-chevron-left\"></i></button></th>\n" +
				    "      <th ng-show=\"rows[0].length - 2 + showWeekNumbers == 5\" colspan=\"5\"><button class=\"btn btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
				    "      <th ng-show=\"rows[0].length - 2 + showWeekNumbers == 3\" colspan=\"3\"><button class=\"btn btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
				    "      <th ng-show=\"rows[0].length - 2 + showWeekNumbers == 1\" colspan=\"1\"><button class=\"btn btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
				    "      <th><button dateFlag=\"dateFlag\" class=\"btn pull-right\" ng-click=\"move(1)\"><i class=\"icon-chevron-right\"></i></button></th>\n" +
				    "    </tr>\n" +
				    "    <tr class=\"text-center\" ng-show=\"labels.length > 0\">\n" +
				    "      <th ng-show=\"showWeekNumbers\">#</th>\n" +
				    "      <th ng-repeat=\"label in labels\">{{label}}</th>\n" +
				    "    </tr>\n" +
				    "  </thead>\n" +
				    "  <tbody>\n" +
				    "    <tr ng-repeat=\"row in rows\">\n" +
				    "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
				    "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
				    "        <button dateFlag=\"dateFlag\" style=\"width:100%;\" class=\"btn\" ng-class=\"{'btn-info': dt.isSelected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{muted: ! dt.isCurrent}\">{{dt.label}}</span></button>\n" +
				    "      </td>\n" +
				    "    </tr>\n" +
				    "  </tbody>\n" +
				    "</table>\n" +
				    "",
	    link: function(scope, element, attrs) {
	    	function closePicker(e) {
	    		var target = e.target;
	    		if ($(target).hasClass("transDate") || $(target).parent().hasClass("transDate")) {
	    			return;
	    		}
	    		if (element.find($(target)).length) {
	    			return;
	    		}
	    		if ($(target).attr("dateFlag") || $(target).parent().attr("dateFlag")) {
	    			return;
	    		}
	    		scope.$parent.$apply(function() {
	    			scope.showpicker = false;
	    		});
	    	}
	    	
	    	$("body").bind("click", closePicker);
	    	scope.$on("$destory", function() {
	    		$("body").unbind("click", closePicker);
	    	});
	    	
	      scope.mode = 'day'; // Initial mode
	      
	      // Configuration parameters
	      var selected = new Date(), showWeeks, minDate, maxDate, format = {};
	      format.day   = angular.isDefined(attrs.dayFormat) ? scope.$eval(attrs.dayFormat) : datepickerConfig.dayFormat;
	      format.month = angular.isDefined(attrs.monthFormat) ? scope.$eval(attrs.monthFormat) : datepickerConfig.monthFormat;
	      format.year  = angular.isDefined(attrs.yearFormat) ? scope.$eval(attrs.yearFormat) : datepickerConfig.yearFormat;
	      format.dayHeader  = angular.isDefined(attrs.dayHeaderFormat) ? scope.$eval(attrs.dayHeaderFormat) : datepickerConfig.dayHeaderFormat;
	      format.dayTitle   = angular.isDefined(attrs.dayTitleFormat) ? scope.$eval(attrs.dayTitleFormat) : datepickerConfig.dayTitleFormat;
	      format.monthTitle = angular.isDefined(attrs.monthTitleFormat) ? scope.$eval(attrs.monthTitleFormat) : datepickerConfig.monthTitleFormat;
	      var startingDay   = angular.isDefined(attrs.startingDay) ? scope.$eval(attrs.startingDay) : datepickerConfig.startingDay;
	      var yearRange = angular.isDefined(attrs.yearRange) ? scope.$eval(attrs.yearRange) : datepickerConfig.yearRange;

	      if (attrs.showWeeks) {
	        scope.$parent.$watch($parse(attrs.showWeeks), function(value) {
	          showWeeks = !! value;
	          updateShowWeekNumbers();
	        });
	      } else {
	        showWeeks = datepickerConfig.showWeeks;
	        updateShowWeekNumbers();
	      }

	      if (attrs.min) {
	        scope.$parent.$watch($parse(attrs.min), function(value) {
	          minDate = new Date(value);
	          refill();
	        });
	      }
	      if (attrs.max) {
	        scope.$parent.$watch($parse(attrs.max), function(value) {
	          maxDate = new Date(value);
	          refill();
	        });
	      }

	      function updateCalendar (rows, labels, title) {
	        scope.rows = rows;
	        scope.labels = labels;
	        scope.title = title;
	      }

	      // Define whether the week number are visible
	      function updateShowWeekNumbers() {
	        scope.showWeekNumbers = ( scope.mode === 'day' && showWeeks );
	      }

	      function compare( date1, date2 ) {
	        if ( scope.mode === 'year') {
	          return date2.getFullYear() - date1.getFullYear();
	        } else if ( scope.mode === 'month' ) {
	          return new Date( date2.getFullYear(), date2.getMonth() ) - new Date( date1.getFullYear(), date1.getMonth() );
	        } else if ( scope.mode === 'day' ) {
	          return (new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) - new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) );
	        }
	      }

	      function isDisabled(date) {
	        return ((minDate && compare(date, minDate) > 0) || (maxDate && compare(date, maxDate) < 0) || (scope.dateDisabled && scope.dateDisabled({ date: date, mode: scope.mode })));
	      }

	      // Split array into smaller arrays
	      var split = function(a, size) {
	        var arrays = [];
	        while (a.length > 0) {
	          arrays.push(a.splice(0, size));
	        }
	        return arrays;
	      };
	      var getDaysInMonth = function( year, month ) {
	        return new Date(year, month + 1, 0).getDate();
	      };

	      var fill = {
	        day: function() {
	          var days = [], labels = [], lastDate = null;

	          function addDays( dt, n, isCurrentMonth ) {
	            for (var i =0; i < n; i ++) {
	              days.push( {date: new Date(dt), isCurrent: isCurrentMonth, isSelected: isSelected(dt), label: dateFilter(dt, format.day), disabled: isDisabled(dt) } );
	              dt.setDate( dt.getDate() + 1 );
	            }
	            lastDate = dt;
	          }

	          var d = new Date(selected);
	          d.setDate(1);

	          var difference = startingDay - d.getDay();
	          var numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference;

	          if ( numDisplayedFromPreviousMonth > 0 ) {
	            d.setDate( - numDisplayedFromPreviousMonth + 1 );
	            addDays(d, numDisplayedFromPreviousMonth, false);
	          }
	          addDays(lastDate || d, getDaysInMonth(selected.getFullYear(), selected.getMonth()), true);
	          addDays(lastDate, (7 - days.length % 7) % 7, false);

	          // Day labels
	          for (i = 0; i < 7; i++) {
	            labels.push(  dateFilter(days[i].date, format.dayHeader) );
	          }
	          updateCalendar( split( days, 7 ), labels, dateFilter(selected, format.dayTitle) );
	        },
	        month: function() {
	          var months = [], i = 0, year = selected.getFullYear();
	          while ( i < 12 ) {
	            var dt = new Date(year, i++, 1);
	            months.push( {date: dt, isCurrent: true, isSelected: isSelected(dt), label: dateFilter(dt, format.month), disabled: isDisabled(dt)} );
	          }
	          updateCalendar( split( months, 3 ), [], dateFilter(selected, format.monthTitle) );
	        },
	        year: function() {
	          var years = [], year = parseInt((selected.getFullYear() - 1) / yearRange, 10) * yearRange + 1;
	          for ( var i = 0; i < yearRange; i++ ) {
	            var dt = new Date(year + i, 0, 1);
	            years.push( {date: dt, isCurrent: true, isSelected: isSelected(dt), label: dateFilter(dt, format.year), disabled: isDisabled(dt)} );
	          }
	          var title = years[0].label + ' - ' + years[years.length - 1].label;
	          updateCalendar( split( years, 5 ), [], title );
	        }
	      };
	      var refill = function() {
	        fill[scope.mode]();
	      };
	      var isSelected = function( dt ) {
	        if ( scope.model && scope.model.getFullYear() === dt.getFullYear() ) {
	          if ( scope.mode === 'year' ) {
	            return true;
	          }
	          if ( scope.model.getMonth() === dt.getMonth() ) {
	            return ( scope.mode === 'month' || (scope.mode === 'day' && scope.model.getDate() === dt.getDate()) );
	          }
	        }
	        return false;
	      };

	      scope.$watch('model', function ( dt, olddt ) {
	        if ( angular.isDate(dt) ) {
	          selected = angular.copy(dt);
	        }

	        if ( ! angular.equals(dt, olddt) ) {
	          refill();
	        }
	      });
	      scope.$watch('mode', function() {
	        updateShowWeekNumbers();
	        refill();
	      });

	      scope.select = function( dt ) {
	        selected = new Date(dt);

	        if ( scope.mode === 'year' ) {
	          scope.mode = 'month';
	          selected.setFullYear( dt.getFullYear() );
	        } else if ( scope.mode === 'month' ) {
	          scope.mode = 'day';
	          selected.setMonth( dt.getMonth() );
	        } else if ( scope.mode === 'day' ) {
	          scope.model = new Date(selected);
	          scope.showpicker = false;
	        }
	      };
	      scope.move = function(step) {
	        if (scope.mode === 'day') {
	          selected.setMonth( selected.getMonth() + step );
	        } else if (scope.mode === 'month') {
	          selected.setFullYear( selected.getFullYear() + step );
	        } else if (scope.mode === 'year') {
	          selected.setFullYear( selected.getFullYear() + step * yearRange );
	        }
	        refill();
	      };
	      scope.toggleMode = function() {
	        scope.mode = ( scope.mode === 'day' ) ? 'month' : ( scope.mode === 'month' ) ? 'year' : 'day';
	      };
	      scope.getWeekNumber = function(row) {
	        if ( scope.mode !== 'day' || ! scope.showWeekNumbers || row.length !== 7 ) {
	          return;
	        }

	        var index = ( startingDay > 4 ) ? 11 - startingDay : 4 - startingDay; // Thursday
	        var d = new Date( row[ index ].date );
	        d.setHours(0, 0, 0);
	        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + 1) / 7); // 86400000 = 1000*60*60*24;
	      };
	    }
	  };
	}])

	.directive("ngChk", ["$compile", function($compile) {
		return {
			priority: -1000,
			link: function(scope, element, attrs) {
				var formname = attrs.formname,
					form = scope[formname],
					model = attrs.ngModel,
					formModel = form[model];
				formModel.$setValidity("custom_pattern");
				formModel.$setValidity("custom_focus");
				formModel.$setValidity("custom_focus_status");
				formModel.$error["custom_pattern"] = false;
				formModel.$error["custom_focus"] = false;
				formModel.$error["custom_focus_status"] = false;
				
				function msgHandler() {
					var msg = scope[attrs.ngChk].apply(scope);
					if (msg) {
						if (msg.flag == "error") {
							formModel.$error["custom_pattern"] = false;
							$html.find(".tip.error").html(msg.msg);
						} else if (msg.flag == "tip") {
							formModel.$error["custom_pattern"] = true;
							$html.find(".tip").html(msg.msg);
						}
					}
				}
				
				element.focus(function() {
					formModel.$error["custom_focus_status"] = true;
					scope.$apply(function() {
						formModel.$error["custom_focus"] = true;
						msgHandler();
					});
				});
				element.blur(function() {
					scope.$apply(function() {
						formModel.$error["custom_focus"] = false;
						msgHandler();
					});
				});
				scope.$watch(model, function(model) {
					if (model != undefined) {
						msgHandler();
					}
				});
				
				var $html = $('<div ng-show="' + formname + '.' + model + '.$error.custom_focus" class="errorForm">'+
								'<div ng-show="' + formname + '.' + model + '.$error.custom_pattern">'+
									'<div class="tipBefore"></div>'+
									'<div class="tipIcon"></div>'+
									'<div class="tip"></div>'+
								'</div>'+
								'<div ng-show="!' + formname + '.' + model + '.$error.custom_pattern">'+
									'<div class="tipBefore"></div>'+
									'<div class="tipIcon error"></div>'+
									'<div class="tip error"></div>'+
								'</div>'+
							'</div>'+
							'<div ng-show="!' + formname + '.' + model + '.$error.custom_focus" class="errorForm">'+
								'<div class="tipIcon" ng-show="' + formname + '.' + model + '.$error.custom_pattern"></div>'+
								'<div ng-show="!' + formname + '.' + model + '.$error.custom_pattern && ' +
									formname + '.' + model + '.$error.custom_focus_status">'+
									'<div class="tipBefore"></div>'+
									'<div class="tipIcon error"></div>'+
									'<div class="tip error"></div>'+
								'</div>'+
							'</div>');
				element.after($compile($html)(scope));
			}
		};
	}])

	.directive("ngSub", function() {
		return function(scope, element, attrs) {
			element.bind('click', function(event) {
				var inputCtrls = document[attrs.formname];
				for (var i = 0; i < inputCtrls.length; i++) {
					var ctrl = inputCtrls[i];
					if (!ctrl.getAttribute("ng-chk")) {
						continue;
					}
					var msg = scope[ctrl.getAttribute("ng-chk")].apply(scope);
					if (msg && msg.flag == "error") {
						ctrl.focus();
						return;
					}
				}
				if (element.hasClass("disabled") || element.hasClass("disabled2")) {
					return;
				}
				scope.$apply(attrs.ngSub);
			});
		};
	})

	.directive('ngDropdown', ['$document', '$location', function ($document, $location) {
		var openElement = null,
		closeMenu = angular.noop;
		return {
			restrict : 'CA',
			link: function(scope, element, attrs) {
				scope.$watch('$location.path', function() {
					closeMenu();
				});
				element.parent().bind('click', function() {
					closeMenu();
				});
				element.bind('click', function(event) {

					var elementWasOpen = (element === openElement);

					event.preventDefault();
					event.stopPropagation();

					if (!!openElement) {
						closeMenu();
					}

					if (!elementWasOpen) {
						element.parent().addClass('open');
						openElement = element;
						closeMenu = function(event) {
							if (event) {
								event.preventDefault();
								event.stopPropagation();
							}
							$document.unbind('click', closeMenu);
							element.parent().removeClass('open');
							closeMenu = angular.noop;
							openElement = null;
						};
						$document.bind('click', closeMenu);
					}
				});
			}
		};
	}])
	;
});


