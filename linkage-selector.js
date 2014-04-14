'use strict';

(function() {

    var selectors = document.querySelectorAll('[data-role=linkage-selector]');

    var setOptions = function(select, data) {
        select.innerHTML = '';
        for (var i = 0, length = data.length; i < length; i++) {

            var option = document.createElement('option');
            option.value = data[i].value;
            option.innerHTML = data[i].label;

            select.appendChild(option);
        }
    };

    var getData = function(dimension, indexes, data) {
        var tempData = data;
        for (var i = 0; i < dimension - 1; i++) {
            tempData = tempData[indexes[i]].data;
        }
        return tempData;
    };


    for (var i = 0, length = selectors.length; i < length; i++) {

        var selector = selectors[i];
        var selectNames = selector.dataset.select.split(" ");

        selector.selects = selectNames.map(function(name) {
            return selectors[i].querySelector('[name=' + name + ']');
        });

        selector.selectIndexes = [];
        for (var j = 0, length = selector.selects.length; j < length; j++) {
              selector.selectIndexes[j] = 0;
        };

        var xhr = new XMLHttpRequest();
        xhr.open('GET', selector.dataset.src, false);
        xhr.send();

        var data = JSON.parse(xhr.responseText).data;
        var tempDataForInit = data;

        var _onchange = function(selector, index) {
            return function() {
                var thisData = getData(index + 1, selector.selectIndexes, data);
                selector.selectIndexes[index] = thisData.indexOf(selector.selects[index].value);

                var nextData = getData(index + 2, selector.selectIndexes, data);
                setOptions(selector.selects[index + 1], nextData);

            };
        };

        for (var j = 0, length = selector.selects.length; j < length; j++) {

              setOptions(selector.selects[j], tempDataForInit);
              tempDataForInit = tempDataForInit[0].data;

              if (j !== length - 1) {
                  selector.selects[j].onchange = _onchange(selector, j);
              }
        };


    }

}());