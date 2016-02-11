'use strict';

angular.module('weatherApp')
  .controller('MainCtrl', ['$http', function ($http) {

      var _this = this;
      this.timeslots = [];
      this.current_index = 0;
      this.current = null;

      $http.get('/data.json')
        .success(function(data) {
            console.log(data);
            _this.timeslots = _this.filter(data);
        })
        .error(function(msg) {
            console.error("ERROR:" + msg);
        });

      this.setCurrent = function() {
        this.current = this.timeslots[this.current_index];
      };

    this.filter = function(data) {
        for(var i in data) {
            data[i].date = new Date(
                data[i].year,
                (data[i].month - 1),
                data[i].day,
                data[i].hour,
                data[i].minute,
                data[i].second
            );

            data[i].nice_date = data[i].month + "/" + data[i].day + "/" + data[i].year + " " + data[i].hour + ":" + data[i].minute;
        }

        return data;
    }

  }]);
