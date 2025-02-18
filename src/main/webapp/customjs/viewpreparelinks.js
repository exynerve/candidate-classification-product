Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel']);
Ext.Loader.setConfig({
    enabled: true
});
Ext.tip.QuickTipManager.init();



var webColumns=[
         			{
         				header : 'Prepare Name',
         				dataIndex : 'prepareName',
         				sortable:true,
         				width:250
         			},
         			{
         				header : 'Prepare URL',
         				dataIndex : 'prepareUrl',
         				sortable:true,
         				width    :300,
         				renderer : function(value, metadata, record, rowIndex, colIndex,
         						store) {

         					return "<a  target='_blank' " + "href=" + value+">"+value+"</a>";
         				}
         			},
					{
         				header : 'Type',
         				dataIndex : 'questionType',
         				sortable:true,
         				width    :50
         			}
         			];

var hideConfirmationMsg;
var showConfirmationMsg;
/* Hide the Confirmation Message */
	hideConfirmationMsg = function() {
		var confMsgDiv = Ext.get('confirmationMessage');
		confMsgDiv.dom.innerHTML = "";
		confMsgDiv.dom.style.display = 'none';
	}
	/* Show Confirmation Message */
	showConfirmationMsg = function(msg) {
		var confMsgDiv = Ext.get('confirmationMessage');
		confMsgDiv.dom.innerHTML =  msg;
		confMsgDiv.dom.style.display = 'inline-block';		
	}
	var webSiteStore;
Ext.onReady(function () {

	var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading"});
	loadMask.show();
	
	
Ext.define('Ext.data.proxy.Cors', {
	    
	    extend: 'Ext.data.proxy.Ajax',
	    
	    uses: ['Ext.data.Cors'],
	    
	    alias: 'proxy.cors',
	    
	    alternateClassName: ['Ext.data.CorsProxy'],
	    
	    doRequest: function(operation, callback, scope) {
	        var writer  = this.getWriter(),
	            request = this.buildRequest(operation, callback, scope);
	            
	        if (operation.allowWrite()) {
	            request = writer.write(request);
	        }
	        
	        Ext.apply(request, {
	            headers       : this.headers,
	            timeout       : this.timeout,
	            scope         : this,
	            callback      : this.createRequestCallback(request, operation, callback, scope),
	            method        : this.getMethod(request),
	            disableCaching: false // explicitly set it to false, ServerProxy handles caching
	        });
	        
	        Ext.Cors.request(request);
	        
	        return request;
	    }


	});

	
	Ext.define('webModel',{
		extend : 'Ext.data.Model',
		requires: ['Ext.data.proxy.Cors'],
		fields : [ 
		          	{name:'prepareUrl', mapping:'prepareUrl',type:'string'},
					{name:'questionType', mapping:'questionType',type:'string'},
					{name:'prepareName', mapping:'prepareName',type:'string'}
				 ]
		
	});

	webStore = Ext.create('Ext.data.Store', {
		id : 'webSiteStoreId',
		name : 'webSiteStoreName',
		model : 'webModel',
		proxy : {
			type : 'ajax',
			autoLoad: {start: 0, limit: 15},
			url :view_preparelinks_endpoints,
			extraParams:{
			},
			actionMethods:{
				read:'GET'
			},
			reader : {
				type :'json',
				root:'model',
				totalProperty: 'total'
					}
		},
		listeners:
		{
			'load':function(store, records){
						
				loadMask.hide();
			}
		},
		autoLoad : true
	});
	
	
	var webSiteTableGrid = Ext.create('Ext.grid.Panel', {
		title:'View Prepare Link List',
		forceFit : true,
		id : 'webSiteGrid',
		store : webStore,
		columns : webColumns,
		autoFit : true,
		autoscroll:true,
		stripRows:true,
		renderTo : Ext.getBody(),
		collapsible:true,
		overflowY:'auto',
		bbar: Ext.create('Ext.PagingToolbar', {
            store: webStore,
            displayInfo: true,
            displayMsg: 'Displaying Prepare Links {0} - {1} of {2}',
            emptyMsg: "No Prepare Links to display",
            inputItemWidth: 35
     })
	});

});
	
	
	
