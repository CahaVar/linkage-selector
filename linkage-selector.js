'use strict';

(function() {

    var selectors = document.querySelectorAll('[data-role=linkage-selector]');


    var setOptions = function(select, data, index) {
        select.innerHTML = '';
        for (var i = 0; i < data.length; i++) {

            var option = document.createElement('option');
            option.value = data[i].value;
            if (data[i].label === undefined) {
                option.innerHTML = option.value;
            } else {
                option.innerHTML = data[i].label;
            }

            select.appendChild(option);
        }
        select.selectedIndex = index | 0;
    };

    var getData = function(dimension, indexes, data) {
        var tempData = data;
        for (var i = 0; i < dimension - 1; i++) {
            tempData = tempData[indexes[i]].data;
        }
        return tempData;
    };

    var _onchange = function(selector, index, data) {
        return function() {
            var thisData = getData(index + 1, selector.selectIndexes, data);
            for (var i = 0; i < thisData.length; i++) {
                if (thisData[i].value === selector.selects[index].value) {
                    selector.selectIndexes[index] = i;
                    break;
                }
            }

            var nextData = getData(index + 2, selector.selectIndexes, data);
            setOptions(selector.selects[index + 1], nextData, selector.selectIndexes[i]);
            if (selector.selects[index + 1].onchange) {
                selector.selects[index + 1].onchange();
            }
        };
    };

    var _callback = function(xhr, selector) {
        return function() {
            if (xhr.readyState === 4 && xhr.status === 200) {

                var data = JSON.parse(xhr.responseText).data;
                var tempDataForInit = data; // 第1级数据

                if (selector.dataset.init) {
                    var initSelectValues = selector.dataset.init.split(' ');
                    for (var i = 0; i < tempDataForInit.length; i++) {
                        if (tempDataForInit[i].value === initSelectValues[0]) {
                            selector.selectIndexes[0] = i;
                        }
                    }
                }


                for (var i = 0, length = selector.selects.length; i < length; i++) {

                    setOptions(selector.selects[i], tempDataForInit, selector.selectIndexes[i]);
                    tempDataForInit = getData(i + 2, selector.selectIndexes, data);

                    if (selector.dataset.init) {
                        for (var j = 0; j < tempDataForInit.length; j++) {
                            if (tempDataForInit[j].value === initSelectValues[i + 1]) {
                                selector.selectIndexes[i + 1] = j;
                            }
                        }
                    }

                    if (i !== length - 1) {
                        selector.selects[i].onchange = _onchange(selector, i, data);
                    }
                };
            }
        };
    };

    var xhrs = [];

    for (var i = 0; i < selectors.length; i++) {
        var selector = selectors[i];
        var selectNames = selector.dataset.select.split(' ');

        selector.selects = selectNames.map(function(name) {
            return selectors[i].querySelector('[name=' + name + ']');
        });

        selector.selectIndexes = [];
        for (var j = 0, length = selector.selects.length; j < length; j++) {
              selector.selectIndexes[j] = 0;
        };

        xhrs[i] = new XMLHttpRequest();

        xhrs[i].onreadystatechange = _callback(xhrs[i], selector);
        xhrs[i].open('GET', selector.dataset.src, true);
        xhrs[i].send();

    }

}());