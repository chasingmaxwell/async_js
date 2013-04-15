(function($) {

  $(window).load(function() {

    /**
     * Support the forEach method of the Array object in crappy browsers.
     */
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
          fn.call(scope, this[i], i, this);
        }
      }
    }

    /**
     * Build async_js object and include async_js settings.
     */
    var async_js = $.extend(true, {

      // Set defaults.
      fade: new Array(),
      javascript: new Array(),
      timeout: 1000,
      loadedScripts: 0,

      // Callback to be fired when all scripts are loaded.
      finalCallback: '',

      // Provide delayed fadeIn effect for elements defiend in the fade array.
      delayFade: function(async_js) {
        async_js.fade.forEach(function(element, index, array) {
          if (index < 1) {
            groupFade = $(element);
          } else {
            groupFade = groupFade.add(element);
          }
        });
        groupFade.fadeIn();
      },

      // Cycle through all defined scripts and load them.
      loadScripts: function(async_js) {
        if (async_js.javascript.length > 0) {
          async_js.javascript.forEach(function(element, index, array) {
            async_js.loadScript(async_js, element);
          });
        }
      },

      // Load a script asynchronously.
      loadScript: function(async_js, script) {

        // Load it.
        (function() {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = script.data;
          s.onload = s.onreadystatechange = function() {
            var rs = this.readyState;
            if (rs && rs != 'complete' && rs != 'loaded') {
              return;
            }
            try{
              if (script.callback != undefined && $.isFunction(window[async_js.finalCallback])) {
                window[script.callback]();
              }
              async_js.loadedScripts++;
              if ($.isFunction(window[async_js.finalCallback]) && async_js.loadedScripts == async_js.javascript.length) {
                window[async_js.finalCallback]();
              }
            } catch (e) {
            }
          }
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        })();

        // If there are any elements to fade in connected with this script, keep track of them.
        if (script.fade != undefined && script.fade.length > 0) {
          script.fade.forEach(function(element, index, array) {
            async_js.fade.push(element);
          });
        }
      },

    }, Drupal.settings.async_js);

    /**
     * Get to it!
     */
    async_js.loadScripts(async_js);
    if (async_js.fade.length > 0) {
      setTimeout(function() {async_js.delayFade(async_js)}, async_js.timeout);
    }

  });

})(jQuery);
