# Google analytics Measurement Protocol 

Simple tool for [Google analytics Measurement Protocol] [1]

#Usage

Set your tracking Id in ga.js

````Javascript
    gaId : 'UA-58883190-0',
````
Page Tracking
````Javascript
    //Page Tracking
    ga.pageview(hostname, page, title);
````
Event  Tracking
````Javascript
    //Page Tracking
    ga.event(category, action, label, value);
````
Transaction Hit
````Javascript
    //Page Tracking
    ga.transaction(id, affiliation, revenue, shipping, tax, currencyCode);
````
Item Hit
````Javascript
    //Page Tracking
    ga.item(transactionID, name, price, quantity, code, variation, currencyCode);
````
Social Interactions
````Javascript
    //Page Tracking
    ga.social(action, network, target);
````
Exception Tracking
````Javascript
    //Page Tracking
    ga.exception(description, isFatal);
````
User Timing Tracking
````Javascript
    //Page Tracking
    ga.timing(category, variable, time, label);
````
App / Screen Tracking
````Javascript
    //Page Tracking
    ga.screenview(appName, appVersion, appId, screenName, appInstallerID);
````

# Dependencies

Requires jQuery 1.x or higher.


[1]: https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/DmitryNaum/google-analytics-measurement-protocol-tool/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

