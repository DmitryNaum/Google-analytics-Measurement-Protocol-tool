/**
 * Работа со статистикой google analytics
 */
var ga = {
    gaId   : 'UA-58883190-3',
    server : 'http://www.google-analytics.com/collect',
    
    getUID : function()
    {
        if (!localStorage.getItem('userID'))
        {
            localStorage.setItem('userID', this.GUID());
        }
        
        return localStorage.getItem('userID');
    },
    
    guidElement : function () {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      },

    GUID : function () {
        return this.guidElement() + this.guidElement() + '-' + this.guidElement() + '-' + this.guidElement() + '-' +
               this.guidElement() + '-' + this.guidElement() + this.guidElement() + this.guidElement(); 
    },
    
    merge:function()
    {
        var result = {};
        for (argumentIndex in arguments)
        {
            var obj = arguments[argumentIndex];
            for (index in obj)
            {
                result[index] = obj[index];
            }
        }               
        return result;
    },
    
    /**
     * @param string hitType
     * @param string params
     * @returns {jqXHR}
     */
    send : function(hitType, params){
        var requiredData = {
            v   : "1",
            tid : this.gaId,
            cid : this.getUID(),
            t   : hitType
        };
        
        analyticsData = this.merge(requiredData, params);
        
        return $.get(this.server, analyticsData);
    },
    
    /**
     * 
     * @param {type} hostname
     * @param {type} page
     * @param {type} title
     * @returns {jqXHR}
     */
    pageview : function(hostname, page, title){
        return this.send('pageview', 
            {
                dh : hostname,
                dp : page,
                dt : title
            }
        );
    },
    /**
     * 
     * @param {type} category
     * @param {type} action
     * @param {type} label
     * @param {type} value
     * @returns {jqXHR}
     */
    event : function(category, action, label, value)
    {
        if (!category)
        {
            throw 'Category is required';
        }
        if (!action)
        {
            throw 'Action is required';
        }
        return this.send('event', 
            {
                ec : category,
                ea : action,
                el : label,
                ev : value
            }
        );
    },
    
    /**
     * 
     * @param {type} id
     * @param {type} affiliation
     * @param {type} revenue
     * @param {type} shipping
     * @param {type} tax
     * @param {type} currencyCode
     * @returns {jqXHR}
     */
    transaction : function(id, affiliation, revenue, shipping, tax, currencyCode)
    {
        if (!id)
        {
            throw 'ID is required';
        }
        
        return this.send('transaction', 
            {
                ti : id,
                ta : affiliation,
                tr : revenue,
                ts : shipping,
                tt : tax,
                cu : currencyCode
            }
        );
    },
    
    /**
     * 
     * @param {type} transactionID
     * @param {type} name
     * @param {type} price
     * @param {type} quantity
     * @param {type} code
     * @param {type} variation
     * @param {type} currencyCode
     * @returns {jqXHR}
     */
    item : function(transactionID, name, price, quantity, code, variation, currencyCode)
    {
        if (!transactionID)
        {
            throw 'Transaction ID is required';
        }
        if (!name)
        {
            throw 'Name is required';
        }
        
        return this.send('item', 
            {
                ti : transactionID,
                in : name,
                ip : price,
                iq : quantity,
                ic : code,
                iv : variation,
                cu : currencyCode
            }
        );
    },
    
    /**
     * 
     * @param {type} action
     * @param {type} network
     * @param {type} target
     * @returns {jqXHR}
     */
    social : function(action, network, target)
    {
        if (!action)
        {
            throw 'Action is required';
        }
        if (!network)
        {
            throw 'Social Network is required';
        }
        if (!target)
        {
            throw 'Social Target is required';
        }
        
        return this.send('social', 
            {
               sa : action,
               sn : network,
               st : target
            }
        );
    },
    
    /**
     * 
     * @param {type} description
     * @param {type} isFatal
     * @returns {jqXHR}
     */
    exception : function(description, isFatal)
    {
        return this.send('exception', 
            {
               exd : description,
               exf : isFatal
            }
        );
    },
    
    /**
     * 
     * @param {type} category
     * @param {type} variable
     * @param {type} time
     * @param {type} label
     * @returns {jqXHR}
     */
    timing : function(category, variable, time, label)
    {
        return this.send('timing', 
            {
               utc : category,
               utv : variable,
               utt : time,
               utl : label
            }
        );
    },
    
    /**
     * 
     * @param {type} appName
     * @param {type} appVersion
     * @param {type} appId
     * @param {type} screenName
     * @param {type} appInstallerID
     * @returns {jqXHR}
     */
    screenview : function(appName, appVersion, appId, screenName, appInstallerID)
    {
        return this.send('screenview', 
            {
               an   : appName,
               av   : appVersion,
               aid  : appId,
               cd   : screenName,
               aiid : appInstallerID
            }
        );
    }
};