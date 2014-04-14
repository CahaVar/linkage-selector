linkage-selector
================

html5 + js 联动菜单

#使用方法
使用方法非常简单，您只需要设置三个参数。
- __data-role__ : 将其设为 linkage-selector 即可
- __data-src__ : json数据文件地址
- __data-select__ : 联动菜单中用到的select的name属性，用空格符分隔，区分先后顺序。
```html
<div data-role="linkage-selector" data-src="../provinces.json" data-select="province city">
    <select name="province"></select>
    <select name="city"></select>
</div>
```

然后在html文件</body>之前添加：
```html
<script src="linkage-selector.min.js"></script>
```

再准备一个json文件存放数据：
```json
{
    "data": [
        {
            "label": "上海",
            "value": "上海",
            "data": [
                { "label": "宝山", "value": "宝山" },
                { "label": "黄浦", "value": "黄浦" }
            ]
        },
        {
            "label": "广西",
            "value": "广西",
            "data": [
                { "label": "南宁", "value": "南宁" },
                { "label": "梧州", "value": "梧州" }
            ]
        }
    ]
}
```
也可以省去label属性，此时用value作为option的显示文字。
```json
{
    "data": [
        {
            "value": "上海",
            "data": [
                { "value": "宝山" },
                { "value": "黄浦" }
            ]
        },
        {
            "value": "广西",
            "data": [
                { "value": "南宁" },
                { "value": "梧州" }
            ]
        }
    ]
}
```

OK,就这么简单。请在服务器环境下使用。如果还不明白，可以参考[示例](https://github.com/CahaVar/linkage-selector/tree/master/test)。