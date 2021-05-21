Module.register("MMM-EthermineInfo",{
// ##################################################################################
// Defines config default values
// ##################################################################################
    defaults: {
        minerAdress: undefined,
        updateInterval: 1000,
        fetchIntervall: 120000,
        showHeader: true,
        headerText: "Ethermine Stats for %miner",
        fontSize: 'xx-large',

        initialLoadDelay: 0,

        apiBase: "https://api.ethermine.org",
    },

// ##################################################################################
// import css files
// ##################################################################################
	getStyles: function() {
		return ["MMM-EthermineInfo.css"]
	},

// ##################################################################################
// setup the module
// ##################################################################################
	start: function() {
		console.info('Starting module: ' + this.name)
		this.loaded = false
        this.updateHashrate()


		this.scheduleUpdate()
		
		var self = this
		setInterval(function() {
			self.updateDom()
		}, this.config.updateInterval)

	},
    
// ##################################################################################
// handle all the output stuff
// ##################################################################################
    getDom: function() {
        var wrapper = document.createElement("div")

        if(this.debug != undefined){
            wrapper.innerHTML = this.debug
			wrapper.className = "loading-wrapper"
			return wrapper
        }

        if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING')
			wrapper.className = "loading-wrapper"
			return wrapper
		}

        if (this.config.minerAdress == undefined){
            wrapper.innerHTML = "You need to add your minerAdress in config.js"
			wrapper.className = "dimmed light small"
			return wrapper
        }

        if (this.currentHashrate == undefined) {
            wrapper.innerHTML = "no data"
			wrapper.className = "dimmed light small"
			return wrapper
		}

        if(this.config.showHeader) {
            var header = document.createElement("header")
            header.className = "module-header"
            header.innerHTML = this.config.headerText.replace("%miner", this.config.minerAdress.toString())
            wrapper.appendChild(header)
        }

        var datawrapper = document.createElement("div")

        var currentWraper = document.createElement("div")
        currentWraper.innerHTML = "Current Hashrate: " + (this.currentHashrate/Math.pow(10, 6)).toFixed(2) + "MH/s"
        currentWraper.className = "Current_Hashrate_Wraper"
        currentWraper.style.fontSize = this.config.fontSize
        datawrapper.appendChild(currentWraper)

        var reportedWraper = document.createElement("div")
        reportedWraper.innerHTML = "Reported Hashrate: " + (this.reportedHashrate/Math.pow(10, 6)).toFixed(2) + "MH/s"
        reportedWraper.className = "Reported_Hashrate_Wraper"
        reportedWraper.style.fontSize = this.config.fontSize
        datawrapper.appendChild(reportedWraper)

        wrapper.appendChild(datawrapper)
        return wrapper
    },

// ##################################################################################
// fetch new data
// ##################################################################################
    updateHashrate: function() {
        if (this.config.minerAdress == undefined){
            return
        }
        var url = this.config.apiBase + "/miner/" + this.config.minerAdress + "/dashboard"
        var Request = new XMLHttpRequest()
		Request.open("GET", url, true)
        
        var self = this
        Request.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processHashrate(JSON.parse(this.response))
				} else {
					console.error(self.name + ": Could not load data.")
				}
			}
		}
        Request.send()
    },

// ##################################################################################
// validate data after request, prepare for output
// ##################################################################################
    processHashrate: function(data) {
        this.currentHashrate = data.data.currentStatistics["currentHashrate"]
        this.reportedHashrate = Math.floor(data.data.currentStatistics["reportedHashrate"])

        this.loaded = true
        this.updateDom()
    },

// ##################################################################################
// schedule updates based on define interval
// ##################################################################################
    scheduleUpdate: function(delay) {
		var nextLoad = this.config.fetchIntervall
		var self = this
		setInterval(function() {
			self.updateHashrate()
		}, nextLoad)
	},
})
